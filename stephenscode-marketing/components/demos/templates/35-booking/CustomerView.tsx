'use client'

import { useEffect, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Clock, Users, Mail, MessageSquare, CheckCircle, CalendarPlus, XCircle, User } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'
import {
  SERVICES,
  STAFF,
  TIME_SLOTS,
  type Appointment,
  appendAppointment,
  bookedSlots,
  downloadICS,
  formatDateLong,
  loadAppointments,
  makeReference,
  saveAppointments,
  timeToMinutes,
  toISODate,
} from './bookingStore'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

const MY_BOOKINGS_KEY = 'demo-booking-showcase-my-bookings'

function loadMyBookingIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(MY_BOOKINGS_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function saveMyBookingIds(ids: string[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(MY_BOOKINGS_KEY, JSON.stringify(ids))
  } catch {
    // Storage unavailable -- the demo still works in memory
  }
}

/** Turns "9:00 AM - 5:00 PM" into the working window in minutes. */
function availabilityWindow(availability: string): { start: number; end: number } {
  const [from, to] = availability.split(' - ')
  return { start: timeToMinutes(from), end: timeToMinutes(to) }
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [contact, setContact] = useState({ name: '', email: '', phone: '', notes: '', website: '' })
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<Appointment | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [myBookingIds, setMyBookingIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const today = toISODate(new Date())

  useEffect(() => {
    setAppointments(loadAppointments())
    setMyBookingIds(loadMyBookingIds())
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const service = SERVICES.find(s => s.id === selectedService) ?? null
  const staffMember = STAFF.find(s => s.id === selectedStaff) ?? null

  const taken = staffMember && selectedDate ? bookedSlots(appointments, staffMember.name, selectedDate) : new Set<string>()
  const window_ = staffMember ? availabilityWindow(staffMember.availability) : null

  const slotState = (time: string): { available: boolean; reason: string } => {
    if (taken.has(time)) return { available: false, reason: 'Already booked' }
    if (window_) {
      const minutes = timeToMinutes(time)
      if (minutes < window_.start || minutes >= window_.end) {
        return { available: false, reason: `Outside ${staffMember?.name.split(' ')[0]}'s hours` }
      }
    }
    return { available: true, reason: 'Available' }
  }

  const openSlots = TIME_SLOTS.filter(t => slotState(t).available)

  const myBookings = appointments
    .filter(a => myBookingIds.includes(a.id))
    .sort((a, b) => a.date.localeCompare(b.date) || timeToMinutes(a.time) - timeToMinutes(b.time))

  const contactReady = contact.name.trim().length > 0 && contact.email.trim().length > 0
  const readyToBook = Boolean(service && staffMember && selectedDate && selectedTime && contactReady)

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting || !readyToBook || !service || !staffMember || !selectedDate || !selectedTime) return
    setSubmitting(true)

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: demo.name,
          demoPackage: demo.package,
          demoSlug: demo.slug,
          clientName: contact.name,
          clientPhone: contact.phone,
          clientEmail: contact.email,
          service: `${service.name} with ${staffMember.name}`,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          notes: contact.notes,
          website: contact.website
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_booking_form', demo_slug: demo.slug })
        trackConversion('leadForm')
      }
    } catch {
      // Network/API failure -- the simulated confirmation below still shows
    }

    const booking: Appointment = {
      id: `c-${Date.now()}`,
      client: contact.name.trim(),
      service: service.name,
      staff: staffMember.name,
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      reference: makeReference(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      notes: contact.notes.trim(),
      source: 'online',
    }

    const next = appendAppointment(booking)
    setAppointments(next)
    const ids = [...loadMyBookingIds(), booking.id]
    saveMyBookingIds(ids)
    setMyBookingIds(ids)

    setSubmitting(false)
    setConfirmed(booking)
  }

  const startNewBooking = () => {
    setSelectedService(null)
    setSelectedStaff(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setContact({ name: '', email: '', phone: '', notes: '', website: '' })
    setConfirmed(null)
  }

  const cancelBooking = (booking: Appointment) => {
    const next = loadAppointments().map(a => (a.id === booking.id ? { ...a, status: 'cancelled' as const } : a))
    saveAppointments(next)
    setAppointments(next)
    setToast(`Booking ${booking.reference ?? ''} cancelled`.trim())
    if (confirmed?.id === booking.id) {
      setConfirmed({ ...confirmed, status: 'cancelled' })
    }
  }

  const addToCalendar = (booking: Appointment) => {
    const match = SERVICES.find(s => s.name === booking.service)
    downloadICS(booking, match?.minutes ?? 60)
    setToast('Calendar file downloaded')
  }

  if (confirmed) {
    const confirmedService = SERVICES.find(s => s.name === confirmed.service)
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: colors.primary + '20' }}>
              {confirmed.status === 'cancelled' ? (
                <XCircle className="w-12 h-12" style={{ color: colors.error }} />
              ) : (
                <CheckCircle className="w-12 h-12" style={{ color: colors.primary }} />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
              {confirmed.status === 'cancelled' ? 'Booking Cancelled' : 'Booking Confirmed!'}
            </h2>
            <p className="text-lg mb-2" style={{ color: colors.textLight }}>
              {confirmed.status === 'cancelled'
                ? 'This appointment has been released. The slot is open again.'
                : 'Your appointment has been successfully scheduled.'}
            </p>
            <p className="text-sm font-semibold mb-8" style={{ color: colors.primary }}>
              Confirmation code {confirmed.reference}
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Date & Time</p>
                    <p style={{ color: colors.textLight }}>{formatDateLong(confirmed.date)} at {confirmed.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Staff Member</p>
                    <p style={{ color: colors.textLight }}>{confirmed.staff}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Service</p>
                    <p style={{ color: colors.textLight }}>
                      {confirmed.service}
                      {confirmedService ? ` -- ${confirmedService.duration}, $${confirmedService.price}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Booked For</p>
                    <p style={{ color: colors.textLight }}>{confirmed.client}</p>
                    <p className="text-sm" style={{ color: colors.textLight }}>{confirmed.email}{confirmed.phone ? ` -- ${confirmed.phone}` : ''}</p>
                  </div>
                </div>
                {confirmed.notes && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                    <div>
                      <p className="font-semibold" style={{ color: colors.text }}>Notes For Your Stylist</p>
                      <p style={{ color: colors.textLight }}>{confirmed.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {confirmed.status !== 'cancelled' && (
              <div className="flex gap-4 mb-6">
                <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                  <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                  <p className="text-sm" style={{ color: colors.textLight }}>Email reminder sent</p>
                </div>
                <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                  <MessageSquare className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                  <p className="text-sm" style={{ color: colors.textLight }}>SMS reminder sent</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {confirmed.status !== 'cancelled' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => addToCalendar(confirmed)}
                    className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    <CalendarPlus className="w-5 h-5" />
                    Add to Calendar
                  </button>
                  <button
                    onClick={() => cancelBooking(confirmed)}
                    className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
                    style={{ borderColor: colors.border, color: colors.error }}
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel Appointment
                  </button>
                </div>
              )}
              <button
                onClick={startNewBooking}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Book Another Appointment
              </button>
            </div>

            <p className="mt-6 text-xs" style={{ color: colors.textLight }}>
              Demo booking -- no payment is processed and no real appointment is created.
            </p>
          </div>
        </div>

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Perfect Appointments</h1>
          <p className="mt-2" style={{ color: colors.textLight }}>Book your appointment with ease</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Steps */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Service */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                  1
                </div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Service</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedService(item.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedService === item.id ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{
                      borderColor: selectedService === item.id ? colors.primary : colors.border,
                      backgroundColor: selectedService === item.id ? colors.backgroundAlt : 'white'
                    }}
                  >
                    <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{item.name}</h3>
                    <p className="text-sm mb-2" style={{ color: colors.textLight }}>{item.duration}</p>
                    <p className="font-bold" style={{ color: colors.primary }}>${item.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Staff */}
            {selectedService && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                    2
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Staff Member</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {STAFF.map(member => (
                    <button
                      key={member.id}
                      onClick={() => { setSelectedStaff(member.id); setSelectedTime(null) }}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        selectedStaff === member.id ? 'shadow-lg' : 'hover:shadow-md'
                      }`}
                      style={{
                        borderColor: selectedStaff === member.id ? colors.primary : colors.border,
                        backgroundColor: selectedStaff === member.id ? colors.backgroundAlt : 'white'
                      }}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.secondary }}>
                        {member.avatar}
                      </div>
                      <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{member.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{member.specialty}</p>
                      <p className="text-xs mt-2" style={{ color: colors.textLight }}>{member.availability}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {selectedStaff && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                    3
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Date & Time</h2>
                </div>

                <div className="mb-6">
                  <label htmlFor="booking-appointment-date" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Date</label>
                  <input
                    id="booking-appointment-date"
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(null) }}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                    min={today}
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[0, 1, 2, 3].map(offset => {
                      const d = new Date()
                      d.setDate(d.getDate() + offset)
                      const iso = toISODate(d)
                      const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : formatDateLong(iso).split(',')[0]
                      return (
                        <button
                          key={iso}
                          onClick={() => { setSelectedDate(iso); setSelectedTime(null) }}
                          className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all hover:shadow-sm"
                          style={{
                            borderColor: selectedDate === iso ? colors.primary : colors.border,
                            color: selectedDate === iso ? 'white' : colors.textLight,
                            backgroundColor: selectedDate === iso ? colors.primary : 'white'
                          }}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <label className="block text-sm font-semibold" style={{ color: colors.text }}>Available Times</label>
                      <span className="text-sm" style={{ color: colors.textLight }}>
                        {openSlots.length} of {TIME_SLOTS.length} slots open
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map(time => {
                        const state = slotState(time)
                        const isSelected = selectedTime === time
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            disabled={!state.available}
                            title={state.reason}
                            className={`py-3 rounded-lg border-2 font-medium transition-all ${
                              isSelected ? 'shadow-lg' : state.available ? 'hover:shadow-md' : 'cursor-not-allowed line-through'
                            }`}
                            style={{
                              borderColor: isSelected ? colors.primary : colors.border,
                              backgroundColor: isSelected ? colors.primary : state.available ? 'white' : colors.backgroundAlt,
                              color: isSelected ? 'white' : state.available ? colors.text : colors.textLight,
                              opacity: state.available ? 1 : 0.55
                            }}
                          >
                            {time}
                          </button>
                        )
                      })}
                    </div>
                    {openSlots.length === 0 && (
                      <p className="mt-3 text-sm" style={{ color: colors.error }}>
                        {staffMember?.name} is fully booked that day. Pick another date or another team member.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Your Details */}
            {selectedTime && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                    4
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Your Details</h2>
                </div>

                <form id="booking-customer-form" onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-customer-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                        Full Name *
                      </label>
                      <input
                        id="booking-customer-name"
                        type="text"
                        required
                        value={contact.name}
                        onChange={(e) => setContact(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Jordan Riley"
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                        style={{ borderColor: colors.border }}
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-customer-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                        Email Address *
                      </label>
                      <input
                        id="booking-customer-email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="jordan@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                        style={{ borderColor: colors.border }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-customer-phone" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                      Phone Number (for SMS reminders)
                    </label>
                    <input
                      id="booking-customer-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-customer-notes" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                      Anything we should know?
                    </label>
                    <textarea
                      id="booking-customer-notes"
                      rows={3}
                      value={contact.notes}
                      onChange={(e) => setContact(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Allergies, preferred products, parking questions..."
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  {/* Honeypot -- hidden from real users, catches auto-filling bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={contact.website}
                    onChange={(e) => setContact(prev => ({ ...prev, website: e.target.value }))}
                    className="hidden"
                  />

                  <button
                    type="submit"
                    disabled={!readyToBook || submitting}
                    className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Booking Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Service</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {service ? service.name : 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Staff Member</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {staffMember ? staffMember.name : 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Date</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedDate || 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Time</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedTime || 'Not selected'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Total</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {service ? `$${service.price}` : '$0'}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                form="booking-customer-form"
                disabled={!readyToBook || submitting}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
              {!readyToBook && (
                <p className="mt-2 text-xs text-center" style={{ color: colors.textLight }}>
                  {!service
                    ? 'Pick a service to get started'
                    : !staffMember
                      ? 'Choose who you would like to see'
                      : !selectedDate
                        ? 'Choose a date'
                        : !selectedTime
                          ? 'Choose a time slot'
                          : 'Add your name and email in step 4'}
                </p>
              )}

              <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
                <p className="text-sm font-semibold mb-3" style={{ color: colors.text }}>Included Features:</p>
                <ul className="space-y-2 text-sm" style={{ color: colors.textLight }}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Email reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    SMS notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Calendar sync
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Easy rescheduling
                  </li>
                </ul>
              </div>
            </div>

            {/* My Bookings */}
            {myBookings.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>Your Bookings</h3>
                <div className="space-y-3">
                  {myBookings.map(booking => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-lg border-l-4"
                      style={{
                        backgroundColor: colors.backgroundAlt,
                        borderColor: booking.status === 'cancelled' ? colors.error : colors.success
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold" style={{ color: colors.text }}>{booking.service}</p>
                          <p className="text-sm" style={{ color: colors.textLight }}>
                            {formatDateLong(booking.date)} at {booking.time}
                          </p>
                          <p className="text-sm" style={{ color: colors.textLight }}>with {booking.staff}</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full capitalize" style={{
                          backgroundColor: booking.status === 'cancelled' ? colors.error + '20' : colors.success + '20',
                          color: booking.status === 'cancelled' ? colors.error : colors.success
                        }}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: colors.textLight }}>Ref {booking.reference}</p>
                      {booking.status !== 'cancelled' && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => addToCalendar(booking)}
                            className="flex-1 py-2 text-sm rounded-lg border font-medium transition-colors hover:bg-white"
                            style={{ borderColor: colors.border, color: colors.primary }}
                          >
                            Add to Calendar
                          </button>
                          <button
                            onClick={() => cancelBooking(booking)}
                            className="flex-1 py-2 text-sm rounded-lg border font-medium transition-colors hover:bg-white"
                            style={{ borderColor: colors.border, color: colors.error }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
