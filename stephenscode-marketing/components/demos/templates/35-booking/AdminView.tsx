'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Mail,
  MessageSquare,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
  XCircle,
} from 'lucide-react'
import {
  SERVICE_NAMES as SERVICES,
  STAFF,
  TIME_SLOTS,
  type Appointment,
  type AppointmentStatus,
  addDays,
  formatDateLong,
  formatDateShort,
  loadAppointments,
  saveAppointments,
  seedAppointments,
  timeToMinutes,
  toISODate,
} from './bookingStore'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('calendar')
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments)
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('day')
  const [viewDate, setViewDate] = useState(() => toISODate(new Date()))
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [newAppt, setNewAppt] = useState({ client: '', service: SERVICES[0], staff: STAFF[0].name, date: '', time: TIME_SLOTS[0] })
  const [scheduleStaff, setScheduleStaff] = useState<string | null>(null)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [sentReminders, setSentReminders] = useState<Record<string, { email?: boolean; sms?: boolean }>>({})
  const [toast, setToast] = useState<string | null>(null)
  const loadedRef = useRef(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const today = toISODate(new Date())

  useEffect(() => {
    setAppointments(loadAppointments())
    loadedRef.current = true
  }, [])

  useEffect(() => {
    if (!loadedRef.current) return
    saveAppointments(appointments)
  }, [appointments])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2500)
  }

  const activeAppointments = appointments.filter(a => a.status !== 'cancelled')
  const todaysAppointments = activeAppointments.filter(a => a.date === today)
  const tomorrowCount = activeAppointments.filter(a => a.date === addDays(today, 1)).length
  const confirmedCount = activeAppointments.filter(a => a.status === 'confirmed').length
  const pendingCount = activeAppointments.filter(a => a.status === 'pending').length
  const confirmationRate = activeAppointments.length > 0 ? Math.round((confirmedCount / activeAppointments.length) * 100) : 0
  const utilization = Math.round((todaysAppointments.length / (STAFF.length * TIME_SLOTS.length)) * 100)

  const showTodaysSchedule = () => {
    setActiveTab('calendar')
    setCalendarView('day')
    setViewDate(today)
  }

  const showStatus = (status: AppointmentStatus) => {
    setActiveTab('appointments')
    setStatusFilter(status)
    setSearch('')
  }

  const stats = [
    {
      label: "Today's Appointments",
      value: String(todaysAppointments.length),
      change: `${tomorrowCount} scheduled tomorrow`,
      color: colors.primary,
      hint: "View today's schedule",
      onClick: showTodaysSchedule,
    },
    {
      label: 'Confirmed',
      value: String(confirmedCount),
      change: `${confirmationRate}% confirmation rate`,
      color: colors.success,
      hint: 'Show confirmed bookings',
      onClick: () => showStatus('confirmed'),
    },
    {
      label: 'Pending',
      value: String(pendingCount),
      change: 'Awaiting response',
      color: colors.warning,
      hint: 'Show pending bookings',
      onClick: () => showStatus('pending'),
    },
    {
      label: 'Staff Utilization',
      value: `${utilization}%`,
      change: "Of today's open slots",
      color: colors.secondary,
      hint: 'Open the staff roster',
      onClick: () => setActiveTab('staff'),
    },
  ]

  const setStatus = (apt: Appointment, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => (a.id === apt.id ? { ...a, status } : a)))
    showToast(status === 'confirmed' ? `Appointment confirmed for ${apt.client}` : `Appointment cancelled for ${apt.client}`)
  }

  const removeAppointment = (apt: Appointment) => {
    setAppointments(prev => prev.filter(a => a.id !== apt.id))
    showToast(`Removed ${apt.client}'s appointment`)
  }

  const sendReminder = (apt: Appointment, channel: 'email' | 'sms') => {
    setSentReminders(prev => ({ ...prev, [apt.id]: { ...prev[apt.id], [channel]: true } }))
    showToast(`${channel === 'email' ? 'Email' : 'SMS'} reminder sent to ${apt.client}`)
  }

  const resetDemoData = () => {
    setAppointments(seedAppointments())
    setSentReminders({})
    setSearch('')
    setStatusFilter('all')
    setViewDate(today)
    showToast('Sample schedule restored')
  }

  const exportSchedule = () => {
    const cell = (value: string) => `"${value.replace(/"/g, '""')}"`
    const header = 'Client,Service,Staff,Date,Time,Status,Reference,Email,Phone,Notes'
    const rows = appointments.map(a =>
      [a.client, a.service, a.staff, a.date, a.time, a.status, a.reference ?? '', a.email ?? '', a.phone ?? '', a.notes ?? '']
        .map(v => cell(String(v)))
        .join(',')
    )
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'perfect-appointments-schedule.csv'
    link.click()
    URL.revokeObjectURL(url)
    showToast('Schedule exported as CSV')
  }

  const openNewAppointment = (prefill?: Partial<Pick<Appointment, 'staff' | 'date' | 'time'>>) => {
    setNewAppt({
      client: '',
      service: SERVICES[0],
      staff: prefill?.staff ?? STAFF[0].name,
      date: prefill?.date ?? today,
      time: prefill?.time ?? TIME_SLOTS[0],
    })
    setShowNewModal(true)
  }

  const saveNewAppointment = (e: FormEvent) => {
    e.preventDefault()
    const client = newAppt.client.trim()
    if (!client || !newAppt.date) return
    const conflict = appointments.find(
      a => a.status !== 'cancelled' && a.date === newAppt.date && a.time === newAppt.time && a.staff === newAppt.staff
    )
    if (conflict) {
      showToast(`${newAppt.staff} already has a booking at ${newAppt.time} that day`)
      return
    }
    setAppointments(prev => [
      ...prev,
      { id: String(Date.now()), client, service: newAppt.service, staff: newAppt.staff, date: newAppt.date, time: newAppt.time, status: 'pending' },
    ])
    setShowNewModal(false)
    showToast(`Appointment added for ${client}`)
  }

  const staffUpcomingCount = (name: string) => activeAppointments.filter(a => a.staff === name && a.date >= today).length

  const query = search.trim().toLowerCase()
  const filteredAppointments = appointments
    .filter(a => {
      const matchesSearch = !query || [a.client, a.service, a.staff].some(v => v.toLowerCase().includes(query))
      const matchesStatus = statusFilter === 'all' || a.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => a.date.localeCompare(b.date) || timeToMinutes(a.time) - timeToMinutes(b.time))

  const shiftMonth = (delta: number) => {
    setMonthCursor(c => {
      const d = new Date(c.year, c.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const monthLabel = new Date(monthCursor.year, monthCursor.month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const firstWeekday = new Date(monthCursor.year, monthCursor.month, 1).getDay()
  const daysInMonth = new Date(monthCursor.year, monthCursor.month + 1, 0).getDate()

  const statusBadgeClass = (status: AppointmentStatus) =>
    status === 'confirmed'
      ? 'bg-green-100 text-green-800'
      : status === 'pending'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-gray-200 text-gray-600'

  const detailAppt = detailId ? (appointments.find(a => a.id === detailId) ?? null) : null

  const scheduleStaffAppointments = scheduleStaff
    ? appointments
        .filter(a => a.staff === scheduleStaff && a.status !== 'cancelled')
        .sort((a, b) => a.date.localeCompare(b.date) || timeToMinutes(a.time) - timeToMinutes(b.time))
    : []

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Booking Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Admin Dashboard</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={resetDemoData}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
                title="Restore the sample schedule"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo Data
              </button>
              <button
                onClick={exportSchedule}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Download className="w-4 h-4" />
                Export Schedule
              </button>
              <button
                onClick={() => openNewAppointment()}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" />
                New Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={stat.onClick}
              title={stat.hint}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
            >
              <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm" style={{ color: colors.textLight }}>{stat.change}</p>
              <p className="text-xs mt-2 font-semibold" style={{ color: colors.primary }}>{stat.hint}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['calendar', 'appointments', 'staff'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                  activeTab === tab ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab ? colors.primary : 'transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {calendarView !== 'month' && (
                  <button
                    onClick={() => setViewDate(d => addDays(d, calendarView === 'week' ? -7 : -1))}
                    aria-label={calendarView === 'week' ? 'Previous week' : 'Previous day'}
                    title={calendarView === 'week' ? 'Previous week' : 'Previous day'}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  {calendarView === 'day' && formatDateLong(viewDate)}
                  {calendarView === 'week' && `Week of ${formatDateShort(viewDate)}`}
                  {calendarView === 'month' && 'Month Overview'}
                </h2>
                {calendarView !== 'month' && (
                  <button
                    onClick={() => setViewDate(d => addDays(d, calendarView === 'week' ? 7 : 1))}
                    aria-label={calendarView === 'week' ? 'Next week' : 'Next day'}
                    title={calendarView === 'week' ? 'Next week' : 'Next day'}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setViewDate(today); setCalendarView('day') }}
                  className="px-4 py-2 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: calendarView === 'day' ? colors.primary : colors.border,
                    color: calendarView === 'day' ? 'white' : colors.text,
                    backgroundColor: calendarView === 'day' ? colors.primary : 'white'
                  }}
                >
                  {calendarView === 'day' && viewDate !== today ? 'Back to Today' : 'Today'}
                </button>
                <button
                  onClick={() => setCalendarView('week')}
                  className="px-4 py-2 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: calendarView === 'week' ? colors.primary : colors.border,
                    color: calendarView === 'week' ? 'white' : colors.text,
                    backgroundColor: calendarView === 'week' ? colors.primary : 'white'
                  }}
                >
                  Week
                </button>
                <button
                  onClick={() => setCalendarView('month')}
                  className="px-4 py-2 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: calendarView === 'month' ? colors.primary : colors.border,
                    color: calendarView === 'month' ? 'white' : colors.text,
                    backgroundColor: calendarView === 'month' ? colors.primary : 'white'
                  }}
                >
                  Month
                </button>
              </div>
            </div>

            {calendarView === 'day' && (
              <div className="space-y-4 overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-8 gap-2 pb-4 border-b" style={{ borderColor: colors.border }}>
                    <div className="font-semibold" style={{ color: colors.text }}>Time</div>
                    <div className="col-span-7 grid grid-cols-3 gap-2">
                      {STAFF.map(member => (
                        <div key={member.id} className="text-center font-semibold" style={{ color: colors.text }}>
                          {member.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {TIME_SLOTS.map(time => (
                    <div key={time} className="grid grid-cols-8 gap-2 py-2 border-b" style={{ borderColor: colors.border }}>
                      <div className="font-medium" style={{ color: colors.textLight }}>{time}</div>
                      <div className="col-span-7 grid grid-cols-3 gap-2">
                        {STAFF.map(member => {
                          const apt = activeAppointments.find(a => a.date === viewDate && a.time === time && a.staff === member.name)
                          return (
                            <div key={member.id}>
                              {apt ? (
                                <button
                                  onClick={() => { setActiveTab('appointments'); setSearch(apt.client); setStatusFilter('all') }}
                                  title="View in appointment list"
                                  className="w-full text-left p-3 rounded-lg border-l-4 hover:shadow-md transition-all"
                                  style={{
                                    backgroundColor: colors.backgroundAlt,
                                    borderColor: apt.status === 'confirmed' ? colors.success : colors.warning
                                  }}
                                >
                                  <p className="font-semibold text-sm" style={{ color: colors.text }}>{apt.client}</p>
                                  <p className="text-xs" style={{ color: colors.textLight }}>{apt.service}</p>
                                </button>
                              ) : (
                                <button
                                  onClick={() => openNewAppointment({ staff: member.name, date: viewDate, time })}
                                  title={`Book ${member.name} at ${time}`}
                                  className="w-full p-3 rounded-lg border-2 border-dashed opacity-60 hover:opacity-100 hover:shadow-md transition-all"
                                  style={{ borderColor: colors.border }}
                                >
                                  <p className="text-xs text-center" style={{ color: colors.textLight }}>Available -- Book</p>
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {calendarView === 'week' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {Array.from({ length: 7 }, (_, i) => addDays(viewDate, i)).map(day => {
                  const dayAppointments = activeAppointments
                    .filter(a => a.date === day)
                    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
                  return (
                    <div
                      key={day}
                      className="border rounded-lg p-3 min-h-[10rem]"
                      style={{ borderColor: colors.border, backgroundColor: day === today ? colors.backgroundAlt : 'white' }}
                    >
                      <button
                        onClick={() => { setViewDate(day); setCalendarView('day') }}
                        className="w-full text-left mb-3 font-semibold text-sm hover:underline"
                        style={{ color: day === today ? colors.primary : colors.text }}
                      >
                        {formatDateShort(day)}
                      </button>
                      <div className="space-y-2">
                        {dayAppointments.length === 0 ? (
                          <p className="text-xs" style={{ color: colors.textLight }}>No bookings</p>
                        ) : (
                          dayAppointments.map(apt => (
                            <button
                              key={apt.id}
                              onClick={() => { setViewDate(day); setCalendarView('day') }}
                              className="w-full text-left p-2 rounded-lg border-l-4 text-xs hover:shadow-md transition-all"
                              style={{
                                backgroundColor: colors.backgroundAlt,
                                borderColor: apt.status === 'confirmed' ? colors.success : colors.warning
                              }}
                            >
                              <span className="font-semibold block" style={{ color: colors.text }}>{apt.time}</span>
                              <span style={{ color: colors.textLight }}>{apt.client}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {calendarView === 'month' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => shiftMonth(-1)}
                    aria-label="Previous month"
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>{monthLabel}</h3>
                  <button
                    onClick={() => shiftMonth(1)}
                    aria-label="Next month"
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2" style={{ color: colors.textLight }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstWeekday }, (_, i) => (
                    <div key={`blank-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const dayNum = i + 1
                    const iso = toISODate(new Date(monthCursor.year, monthCursor.month, dayNum))
                    const count = activeAppointments.filter(a => a.date === iso).length
                    return (
                      <button
                        key={dayNum}
                        onClick={() => { setViewDate(iso); setCalendarView('day') }}
                        title={count > 0 ? `${count} appointment${count === 1 ? '' : 's'} -- view day` : 'View day'}
                        className="min-h-[3.5rem] rounded-lg border p-1 flex flex-col items-center justify-center hover:shadow-md transition-all"
                        style={{
                          borderColor: iso === today ? colors.primary : colors.border,
                          backgroundColor: iso === today ? colors.backgroundAlt : 'white'
                        }}
                      >
                        <span className="text-sm font-medium" style={{ color: colors.text }}>{dayNum}</span>
                        {count > 0 && (
                          <span
                            className="mt-1 text-[10px] px-1.5 py-0.5 rounded-full text-white font-semibold"
                            style={{ backgroundColor: colors.primary }}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>All Appointments</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    aria-label="Search appointments"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(v => !v)}
                    className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 capitalize"
                    style={{
                      borderColor: statusFilter !== 'all' ? colors.primary : colors.border,
                      color: statusFilter !== 'all' ? colors.primary : colors.text
                    }}
                  >
                    <Filter className="w-5 h-5" />
                    {statusFilter === 'all' ? 'Filter' : statusFilter}
                  </button>
                  {showFilterMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)} />
                      <div
                        className="absolute right-0 top-full mt-2 z-20 bg-white border rounded-lg shadow-xl w-44 py-1"
                        style={{ borderColor: colors.border }}
                      >
                        {(['all', 'confirmed', 'pending', 'cancelled'] as const).map(option => (
                          <button
                            key={option}
                            onClick={() => { setStatusFilter(option); setShowFilterMenu(false) }}
                            className="w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 transition-colors flex items-center justify-between"
                            style={{ color: statusFilter === option ? colors.primary : colors.text }}
                          >
                            {option === 'all' ? 'All statuses' : option}
                            {statusFilter === option && <CheckCircle className="w-4 h-4" style={{ color: colors.primary }} />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: colors.border }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Client</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Service</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Staff</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Date</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Time</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center" style={{ color: colors.textLight }}>
                        No appointments match your search or filter.
                      </td>
                    </tr>
                  )}
                  {filteredAppointments.map(apt => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setDetailId(apt.id)}
                          className="font-medium text-left hover:underline"
                          style={{ color: colors.text }}
                          title="View client and booking details"
                        >
                          {apt.client}
                        </button>
                      </td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.service}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.staff}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{formatDateShort(apt.date)}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.time}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => setStatus(apt, 'confirmed')}
                              className="p-2 rounded hover:bg-gray-100 transition-colors"
                              title="Confirm appointment"
                            >
                              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                            </button>
                          )}
                          {apt.status !== 'cancelled' ? (
                            <>
                              <button
                                onClick={() => sendReminder(apt, 'email')}
                                className="p-2 rounded hover:bg-gray-100 transition-colors"
                                title={sentReminders[apt.id]?.email ? 'Email reminder sent' : 'Send email reminder'}
                              >
                                <Mail className="w-4 h-4" style={{ color: sentReminders[apt.id]?.email ? colors.success : colors.primary }} />
                              </button>
                              <button
                                onClick={() => sendReminder(apt, 'sms')}
                                className="p-2 rounded hover:bg-gray-100 transition-colors"
                                title={sentReminders[apt.id]?.sms ? 'SMS reminder sent' : 'Send SMS reminder'}
                              >
                                <MessageSquare className="w-4 h-4" style={{ color: sentReminders[apt.id]?.sms ? colors.success : colors.primary }} />
                              </button>
                              <button
                                onClick={() => setStatus(apt, 'cancelled')}
                                className="p-2 rounded hover:bg-gray-100 transition-colors"
                                title="Cancel appointment"
                              >
                                <XCircle className="w-4 h-4" style={{ color: colors.error }} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => removeAppointment(apt)}
                              className="p-2 rounded hover:bg-gray-100 transition-colors"
                              title="Remove from list"
                            >
                              <Trash2 className="w-4 h-4" style={{ color: colors.textLight }} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAFF.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.secondary }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: colors.text }}>{member.name}</h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>Staff Member</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Upcoming Appointments</span>
                    <span className="font-bold" style={{ color: colors.primary }}>{staffUpcomingCount(member.name)}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Availability</span>
                    <span className="text-sm font-medium" style={{ color: colors.text }}>{member.availability}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setScheduleStaff(member.name)}
                      className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                      style={{ borderColor: colors.border, color: colors.primary }}
                    >
                      View Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowNewModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>New Appointment</h3>
              <button
                onClick={() => setShowNewModal(false)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveNewAppointment} className="p-5 space-y-4">
              <div>
                <label htmlFor="booking-admin-client" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
                  Client Name
                </label>
                <input
                  id="booking-admin-client"
                  type="text"
                  required
                  value={newAppt.client}
                  onChange={(e) => setNewAppt(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="Client full name"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="booking-admin-service" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
                  Service
                </label>
                <select
                  id="booking-admin-service"
                  value={newAppt.service}
                  onChange={(e) => setNewAppt(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white"
                  style={{ borderColor: colors.border }}
                >
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-admin-staff" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
                  Staff Member
                </label>
                <select
                  id="booking-admin-staff"
                  value={newAppt.staff}
                  onChange={(e) => setNewAppt(prev => ({ ...prev, staff: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white"
                  style={{ borderColor: colors.border }}
                >
                  {STAFF.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-admin-date" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
                    Date
                  </label>
                  <input
                    id="booking-admin-date"
                    type="date"
                    required
                    value={newAppt.date}
                    min={today}
                    onChange={(e) => setNewAppt(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="booking-admin-time" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
                    Time
                  </label>
                  <select
                    id="booking-admin-time"
                    value={newAppt.time}
                    onChange={(e) => setNewAppt(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white"
                    style={{ borderColor: colors.border }}
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {detailAppt && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setDetailId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{detailAppt.client}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  {detailAppt.reference ? `Ref ${detailAppt.reference}` : 'Booked at the front desk'}
                </p>
              </div>
              <button
                onClick={() => setDetailId(null)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(detailAppt.status)}`}>
                  {detailAppt.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Service</span>
                <span className="text-sm font-medium" style={{ color: colors.text }}>{detailAppt.service}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Staff</span>
                <span className="text-sm font-medium" style={{ color: colors.text }}>{detailAppt.staff}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: colors.textLight }}>When</span>
                <span className="text-sm font-medium" style={{ color: colors.text }}>
                  {formatDateShort(detailAppt.date)} at {detailAppt.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Booked Via</span>
                <span className="text-sm font-medium capitalize" style={{ color: colors.text }}>
                  {detailAppt.source === 'front-desk' ? 'Front desk' : 'Online booking'}
                </span>
              </div>
              <div className="pt-3 border-t space-y-2" style={{ borderColor: colors.border }}>
                <p className="text-sm font-semibold" style={{ color: colors.textLight }}>Contact</p>
                {detailAppt.email ? (
                  <a href={`mailto:${detailAppt.email}`} className="block text-sm hover:underline" style={{ color: colors.primary }}>
                    {detailAppt.email}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: colors.textLight }}>No email on file</p>
                )}
                {detailAppt.phone ? (
                  <a href={`tel:${detailAppt.phone.replace(/[^\d+]/g, '')}`} className="block text-sm hover:underline" style={{ color: colors.primary }}>
                    {detailAppt.phone}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: colors.textLight }}>No phone on file</p>
                )}
              </div>
              <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Client Notes</p>
                <p className="text-sm" style={{ color: colors.text }}>
                  {detailAppt.notes ? detailAppt.notes : 'No notes left with this booking.'}
                </p>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>Reminders</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => sendReminder(detailAppt, 'email')}
                    className="flex-1 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ borderColor: colors.border, color: sentReminders[detailAppt.id]?.email ? colors.success : colors.primary }}
                  >
                    <Mail className="w-4 h-4" />
                    {sentReminders[detailAppt.id]?.email ? 'Email sent' : 'Send email'}
                  </button>
                  <button
                    onClick={() => sendReminder(detailAppt, 'sms')}
                    className="flex-1 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ borderColor: colors.border, color: sentReminders[detailAppt.id]?.sms ? colors.success : colors.primary }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {sentReminders[detailAppt.id]?.sms ? 'SMS sent' : 'Send SMS'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 border-t flex gap-3" style={{ borderColor: colors.border }}>
              {detailAppt.status !== 'confirmed' && detailAppt.status !== 'cancelled' && (
                <button
                  onClick={() => setStatus(detailAppt, 'confirmed')}
                  className="flex-1 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.success }}
                >
                  Confirm
                </button>
              )}
              {detailAppt.status !== 'cancelled' ? (
                <button
                  onClick={() => setStatus(detailAppt, 'cancelled')}
                  className="flex-1 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.error }}
                >
                  Cancel Appointment
                </button>
              ) : (
                <button
                  onClick={() => setStatus(detailAppt, 'confirmed')}
                  className="flex-1 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Reinstate Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Staff Schedule Modal */}
      {scheduleStaff && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setScheduleStaff(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
                {scheduleStaff}&apos;s Schedule
              </h3>
              <button
                onClick={() => setScheduleStaff(null)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-3">
              {scheduleStaffAppointments.length === 0 ? (
                <p className="text-center py-8" style={{ color: colors.textLight }}>No upcoming appointments scheduled.</p>
              ) : (
                scheduleStaffAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-lg border-l-4 flex items-center justify-between gap-3"
                    style={{
                      backgroundColor: colors.backgroundAlt,
                      borderColor: apt.status === 'confirmed' ? colors.success : colors.warning
                    }}
                  >
                    <div>
                      <p className="font-semibold" style={{ color: colors.text }}>{apt.client}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{apt.service}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{formatDateShort(apt.date)} at {apt.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="p-5 border-t" style={{ borderColor: colors.border }}>
              <button
                onClick={() => {
                  const name = scheduleStaff
                  setScheduleStaff(null)
                  openNewAppointment({ staff: name ?? undefined })
                }}
                className="w-full py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" />
                Add Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[60] px-5 py-3 rounded-lg shadow-xl text-white font-medium"
          style={{ backgroundColor: colors.text }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
