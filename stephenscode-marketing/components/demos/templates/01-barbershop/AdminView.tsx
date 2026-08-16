'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type ApptStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'

interface Appointment {
  id: number
  time: string
  client: string
  service: string
  barber: string
  status: ApptStatus
}

interface Client {
  name: string
  phone: string
  lastVisit: string
  visits: number
}

interface Service {
  name: string
  price: number
  count: number
}

const APPTS_KEY = 'demo-barbershop-admin-appointments'
const CLIENTS_KEY = 'demo-barbershop-admin-clients'
const SERVICES_KEY = 'demo-barbershop-admin-services'

const seedAppointments: Appointment[] = [
  { id: 1, time: '9:00 AM', client: 'John Smith', service: 'Classic Haircut', barber: 'Mike Johnson', status: 'completed' },
  { id: 2, time: '9:30 AM', client: 'Robert Davis', service: 'Beard Trim', barber: 'David Chen', status: 'completed' },
  { id: 3, time: '10:00 AM', client: 'Michael Wilson', service: 'Hot Towel Shave', barber: 'Mike Johnson', status: 'in-progress' },
  { id: 4, time: '11:00 AM', client: 'James Brown', service: 'Haircut + Beard', barber: 'Tony Rodriguez', status: 'confirmed' },
  { id: 5, time: '2:00 PM', client: 'William Jones', service: 'Classic Haircut', barber: 'Mike Johnson', status: 'confirmed' },
  { id: 6, time: '3:30 PM', client: 'David Miller', service: 'Beard Trim', barber: 'David Chen', status: 'pending' }
]

const seedClients: Client[] = [
  { name: 'John Smith', phone: '(555) 123-4567', lastVisit: '2 days ago', visits: 12 },
  { name: 'Robert Davis', phone: '(555) 234-5678', lastVisit: '1 week ago', visits: 8 },
  { name: 'Michael Wilson', phone: '(555) 345-6789', lastVisit: '3 weeks ago', visits: 5 },
  { name: 'James Brown', phone: '(555) 456-7890', lastVisit: '1 month ago', visits: 15 }
]

const seedServices: Service[] = [
  { name: 'Classic Haircut', price: 25, count: 45 },
  { name: 'Haircut + Beard', price: 35, count: 28 },
  { name: 'Hot Towel Shave', price: 30, count: 15 },
  { name: 'Beard Trim', price: 15, count: 22 }
]

const barberNames = ['Mike Johnson', 'David Chen', 'Tony Rodriguez']

const historyDates = ['2 days ago', '2 weeks ago', '1 month ago', '2 months ago', '3 months ago']

function formatTime(value: string): string {
  const [hStr, mStr] = value.split(':')
  const h = parseInt(hStr, 10)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${mStr} ${suffix}`
}

function timeSortValue(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return 0
  let h = parseInt(match[1], 10) % 12
  if (match[3].toUpperCase() === 'PM') h += 12
  return h * 60 + parseInt(match[2], 10)
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'clients' | 'services'>('dashboard')
  const [loaded, setLoaded] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments)
  const [clients, setClients] = useState<Client[]>(seedClients)
  const [services, setServices] = useState<Service[]>(seedServices)
  const [loggedOut, setLoggedOut] = useState(false)

  const [selectedApptId, setSelectedApptId] = useState<number | null>(null)
  const [showApptForm, setShowApptForm] = useState(false)
  const [apptForm, setApptForm] = useState({ client: '', service: '', barber: barberNames[0], time: '' })
  const [showClientForm, setShowClientForm] = useState(false)
  const [clientForm, setClientForm] = useState({ name: '', phone: '' })
  const [historyClient, setHistoryClient] = useState<Client | null>(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [serviceForm, setServiceForm] = useState({ name: '', price: '' })
  const [editingService, setEditingService] = useState<string | null>(null)
  const [deletingService, setDeletingService] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedAppts = localStorage.getItem(APPTS_KEY)
      if (savedAppts) setAppointments(JSON.parse(savedAppts))
      const savedClients = localStorage.getItem(CLIENTS_KEY)
      if (savedClients) setClients(JSON.parse(savedClients))
      const savedServices = localStorage.getItem(SERVICES_KEY)
      if (savedServices) setServices(JSON.parse(savedServices))
    } catch {
      // Corrupt/unavailable storage: fall back to seed data
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(APPTS_KEY, JSON.stringify(appointments))
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients))
      localStorage.setItem(SERVICES_KEY, JSON.stringify(services))
    } catch {
      // Storage full/unavailable: demo keeps working in memory
    }
  }, [appointments, clients, services, loaded])

  const sortedAppointments = [...appointments].sort((a, b) => timeSortValue(a.time) - timeSortValue(b.time))
  const selectedAppt = appointments.find((a) => a.id === selectedApptId) ?? null

  const priceFor = (serviceName: string) => services.find((s) => s.name === serviceName)?.price ?? 30
  const revenueToday = appointments
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + priceFor(a.service), 0)
  const activeCount = appointments.filter((a) => a.status !== 'cancelled').length
  const maxServiceCount = Math.max(...services.map((s) => s.count), 1)

  const stats = [
    { label: 'Today\'s Revenue', value: `$${revenueToday.toLocaleString()}`, change: '+12%', icon: '💰', color: colors.success },
    { label: 'Appointments', value: `${activeCount}`, change: '+3', icon: '📅', color: colors.primary },
    { label: 'Walk-ins', value: '4', change: '+1', icon: '🚶', color: colors.accent },
    { label: 'Avg Wait Time', value: '8 min', change: '-2 min', icon: '⏱️', color: colors.secondary }
  ]

  const statusColor = (status: ApptStatus) =>
    status === 'completed' ? colors.success :
    status === 'in-progress' ? colors.warning :
    status === 'cancelled' ? colors.error :
    colors.primary

  const updateApptStatus = (id: number, status: ApptStatus) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const deleteAppt = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
    setSelectedApptId(null)
  }

  const openNewAppt = (prefillClient?: string) => {
    setApptForm({ client: prefillClient ?? '', service: services[0]?.name ?? '', barber: barberNames[0], time: '' })
    setShowApptForm(true)
  }

  const submitAppt = (e: React.FormEvent) => {
    e.preventDefault()
    setAppointments((prev) => [
      ...prev,
      {
        id: Date.now(),
        time: formatTime(apptForm.time),
        client: apptForm.client.trim(),
        service: apptForm.service,
        barber: apptForm.barber,
        status: 'pending'
      }
    ])
    setShowApptForm(false)
    setActiveTab('appointments')
  }

  const submitClient = (e: React.FormEvent) => {
    e.preventDefault()
    setClients((prev) => [
      { name: clientForm.name.trim(), phone: clientForm.phone.trim(), lastVisit: 'New client', visits: 0 },
      ...prev
    ])
    setClientForm({ name: '', phone: '' })
    setShowClientForm(false)
  }

  const openServiceForm = (service?: Service) => {
    if (service) {
      setEditingService(service.name)
      setServiceForm({ name: service.name, price: String(service.price) })
    } else {
      setEditingService(null)
      setServiceForm({ name: '', price: '' })
    }
    setShowServiceForm(true)
  }

  const submitService = (e: React.FormEvent) => {
    e.preventDefault()
    const name = serviceForm.name.trim()
    const price = Math.max(0, Math.round(parseFloat(serviceForm.price) || 0))
    if (editingService) {
      setServices((prev) => prev.map((s) => (s.name === editingService ? { ...s, name, price } : s)))
    } else {
      setServices((prev) => [...prev, { name, price, count: 0 }])
    }
    setShowServiceForm(false)
    setEditingService(null)
  }

  const confirmDeleteService = () => {
    if (deletingService) {
      setServices((prev) => prev.filter((s) => s.name !== deletingService))
    }
    setDeletingService(null)
  }

  const historyFor = (client: Client) => {
    const visitCount = Math.min(client.visits, 5)
    return Array.from({ length: visitCount }, (_, i) => ({
      date: historyDates[i] ?? `${i + 1} months ago`,
      service: seedServices[i % seedServices.length].name,
      barber: barberNames[i % barberNames.length]
    }))
  }

  const inputStyle = { backgroundColor: colors.backgroundAlt, border: `1px solid ${colors.border}`, color: colors.text }

  if (loggedOut) {
    return (
      <div style={{ backgroundColor: colors.backgroundAlt }} className="min-h-screen flex items-center justify-center px-4">
        <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl p-10 max-w-md w-full text-center">
          <div style={{ color: colors.text }} className="text-2xl font-bold mb-2">CLASSIC CUTS</div>
          <div style={{ color: colors.textLight }} className="text-sm mb-6">Admin Dashboard</div>
          <h1 style={{ color: colors.text }} className="text-xl font-bold mb-3">You have been signed out</h1>
          <p style={{ color: colors.textLight }} className="mb-8">
            Sign back in to manage appointments, clients, and services.
          </p>
          <button
            onClick={() => { setLoggedOut(false); setActiveTab('dashboard') }}
            style={{ backgroundColor: colors.accent, color: colors.primary }}
            className="w-full py-3 rounded-lg font-bold hover:opacity-90"
          >
            Sign Back In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: colors.backgroundAlt }} className="min-h-screen">
      {/* Admin Header */}
      <header style={{ backgroundColor: colors.primary, borderBottom: `2px solid ${colors.border}` }} className="sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✂️</span>
              <div>
                <div style={{ color: colors.accent }} className="text-lg font-bold">Classic Cuts</div>
                <div style={{ color: colors.backgroundAlt }} className="text-xs opacity-75">Admin Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div style={{ color: colors.backgroundAlt }} className="text-sm text-right hidden md:block">
                <div className="font-semibold">Admin User</div>
                <div className="text-xs opacity-75">Manager</div>
              </div>
              <button
                onClick={() => setLoggedOut(true)}
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div style={{ backgroundColor: colors.background, borderBottom: `2px solid ${colors.border}` }} className="shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'dashboard' as const, label: 'Dashboard', icon: '📊' },
              { id: 'appointments' as const, label: 'Appointments', icon: '📅' },
              { id: 'clients' as const, label: 'Clients', icon: '👥' },
              { id: 'services' as const, label: 'Services', icon: '✂️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                  color: activeTab === tab.id ? colors.backgroundAlt : colors.text,
                  borderBottom: activeTab === tab.id ? `3px solid ${colors.accent}` : 'none'
                }}
                className="px-6 py-4 font-semibold hover:opacity-80 transition flex items-center gap-2"
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <span style={{ color: stat.color }} className="text-xs font-bold">{stat.change}</span>
                  </div>
                  <div style={{ color: colors.text }} className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div style={{ color: colors.textLight }} className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Today's Schedule */}
              <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl p-6">
                <h3 style={{ color: colors.text }} className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📅</span> Today's Schedule
                </h3>
                <div className="space-y-3">
                  {sortedAppointments.slice(0, 5).map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => setSelectedApptId(apt.id)}
                      style={{ backgroundColor: colors.backgroundAlt, borderColor: colors.border }}
                      className="w-full text-left border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div style={{ color: colors.text }} className="font-bold">{apt.client}</div>
                          <div style={{ color: colors.textLight }} className="text-sm">{apt.service}</div>
                        </div>
                        <span
                          style={{ backgroundColor: statusColor(apt.status), color: colors.backgroundAlt }}
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                        >
                          {apt.status}
                        </span>
                      </div>
                      <div style={{ color: colors.textLight }} className="text-xs flex justify-between">
                        <span>⏰ {apt.time}</span>
                        <span>👨‍🦰 {apt.barber}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Services */}
              <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl p-6">
                <h3 style={{ color: colors.text }} className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> Top Services (This Week)
                </h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div style={{ color: colors.text }} className="font-semibold">{service.name}</div>
                          <div style={{ color: colors.textLight }} className="text-xs">{service.count} bookings</div>
                        </div>
                        <div style={{ color: colors.accent }} className="font-bold text-lg">
                          ${(service.price * service.count).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ backgroundColor: colors.backgroundAlt }} className="h-2 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: colors.primary, width: `${(service.count / maxServiceCount) * 100}%` }}
                          className="h-full transition-all"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: colors.text }} className="text-2xl font-bold">All Appointments</h2>
              <button
                onClick={() => openNewAppt()}
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="px-6 py-3 rounded-lg font-bold hover:opacity-90"
              >
                + New Appointment
              </button>
            </div>
            <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }}>
                    <tr>
                      <th className="text-left px-6 py-4 font-bold">Time</th>
                      <th className="text-left px-6 py-4 font-bold">Client</th>
                      <th className="text-left px-6 py-4 font-bold">Service</th>
                      <th className="text-left px-6 py-4 font-bold">Barber</th>
                      <th className="text-left px-6 py-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments.map((apt, index) => (
                      <tr
                        key={apt.id}
                        onClick={() => setSelectedApptId(apt.id)}
                        style={{
                          backgroundColor: index % 2 === 0 ? colors.background : colors.backgroundAlt,
                          borderBottom: `1px solid ${colors.border}`
                        }}
                        className="hover:opacity-80 cursor-pointer"
                      >
                        <td style={{ color: colors.text }} className="px-6 py-4 font-semibold">{apt.time}</td>
                        <td style={{ color: colors.text }} className="px-6 py-4">{apt.client}</td>
                        <td style={{ color: colors.textLight }} className="px-6 py-4">{apt.service}</td>
                        <td style={{ color: colors.textLight }} className="px-6 py-4">{apt.barber}</td>
                        <td className="px-6 py-4">
                          <span
                            style={{ backgroundColor: statusColor(apt.status), color: colors.backgroundAlt }}
                            className="text-xs px-3 py-1 rounded-full font-semibold"
                          >
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {sortedAppointments.length === 0 && (
                <div style={{ color: colors.textLight }} className="p-8 text-center">
                  No appointments on the books. Use + New Appointment to add one.
                </div>
              )}
            </div>
            <p style={{ color: colors.textLight }} className="text-sm mt-3">
              Click any appointment to update its status.
            </p>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: colors.text }} className="text-2xl font-bold">Client Database</h2>
              <button
                onClick={() => { setClientForm({ name: '', phone: '' }); setShowClientForm(true) }}
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="px-6 py-3 rounded-lg font-bold hover:opacity-90"
              >
                + Add Client
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {clients.map((client, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 style={{ color: colors.text }} className="text-xl font-bold mb-1">{client.name}</h3>
                      <p style={{ color: colors.textLight }} className="text-sm">{client.phone}</p>
                    </div>
                    <span style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="text-xs px-3 py-1 rounded-full font-semibold">
                      {client.visits} visits
                    </span>
                  </div>
                  <div style={{ color: colors.textLight }} className="text-sm">
                    Last visit: {client.lastVisit}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setHistoryClient(client)}
                      style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}
                      className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-80"
                    >
                      View History
                    </button>
                    <button
                      onClick={() => openNewAppt(client.name)}
                      style={{ backgroundColor: colors.accent, color: colors.primary }}
                      className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-90"
                    >
                      Book Apt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: colors.text }} className="text-2xl font-bold">Service Management</h2>
              <button
                onClick={() => openServiceForm()}
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="px-6 py-3 rounded-lg font-bold hover:opacity-90"
              >
                + Add Service
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <h3 style={{ color: colors.text }} className="text-xl font-bold mb-3">{service.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textLight }} className="text-sm">Price:</span>
                      <span style={{ color: colors.text }} className="font-bold">${service.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textLight }} className="text-sm">Bookings this week:</span>
                      <span style={{ color: colors.text }} className="font-bold">{service.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textLight }} className="text-sm">Revenue:</span>
                      <span style={{ color: colors.accent }} className="font-bold">
                        ${(service.price * service.count).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openServiceForm(service)}
                      style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}
                      className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingService(service.name)}
                      style={{ backgroundColor: colors.error, color: colors.backgroundAlt }}
                      className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {services.length === 0 && (
              <div style={{ color: colors.textLight }} className="p-8 text-center">
                No services yet. Use + Add Service to build your menu.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="p-5 flex justify-between items-center rounded-t-xl">
              <h3 className="text-xl font-bold">Appointment Details</h3>
              <button onClick={() => setSelectedApptId(null)} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Client</span>
                  <span style={{ color: colors.text }} className="font-bold">{selectedAppt.client}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Service</span>
                  <span style={{ color: colors.text }} className="font-bold">{selectedAppt.service}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Barber</span>
                  <span style={{ color: colors.text }} className="font-bold">{selectedAppt.barber}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textLight }}>Time</span>
                  <span style={{ color: colors.text }} className="font-bold">{selectedAppt.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: colors.textLight }}>Status</span>
                  <span
                    style={{ backgroundColor: statusColor(selectedAppt.status), color: colors.backgroundAlt }}
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                  >
                    {selectedAppt.status}
                  </span>
                </div>
              </div>

              <div style={{ color: colors.text }} className="font-bold text-sm mb-3">Update Status</div>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {([
                  { status: 'confirmed' as const, label: 'Confirm' },
                  { status: 'in-progress' as const, label: 'Start Service' },
                  { status: 'completed' as const, label: 'Mark Completed' },
                  { status: 'cancelled' as const, label: 'Cancel' }
                ]).map((action) => (
                  <button
                    key={action.status}
                    onClick={() => updateApptStatus(selectedAppt.id, action.status)}
                    disabled={selectedAppt.status === action.status}
                    style={{
                      backgroundColor: selectedAppt.status === action.status ? colors.backgroundAlt : statusColor(action.status),
                      color: selectedAppt.status === action.status ? colors.textLight : colors.backgroundAlt,
                      opacity: selectedAppt.status === action.status ? 0.6 : 1
                    }}
                    className="py-2 rounded-lg font-semibold text-sm hover:opacity-90"
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => deleteAppt(selectedAppt.id)}
                style={{ border: `2px solid ${colors.error}`, color: colors.error }}
                className="w-full py-2 rounded-lg font-semibold text-sm hover:opacity-80"
              >
                Remove From Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showApptForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="p-5 flex justify-between items-center rounded-t-xl">
              <h3 className="text-xl font-bold">New Appointment</h3>
              <button onClick={() => setShowApptForm(false)} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={submitAppt} className="p-6 space-y-4">
              <div>
                <label htmlFor="admin-appt-client" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Client Name *</label>
                <input
                  id="admin-appt-client"
                  type="text"
                  required
                  value={apptForm.client}
                  onChange={(e) => setApptForm({ ...apptForm, client: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label htmlFor="admin-appt-service" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Service *</label>
                <select
                  id="admin-appt-service"
                  required
                  value={apptForm.service}
                  onChange={(e) => setApptForm({ ...apptForm, service: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>{s.name} (${s.price})</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="admin-appt-barber" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Barber *</label>
                <select
                  id="admin-appt-barber"
                  required
                  value={apptForm.barber}
                  onChange={(e) => setApptForm({ ...apptForm, barber: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                >
                  {barberNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="admin-appt-time" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Time *</label>
                <input
                  id="admin-appt-time"
                  type="time"
                  required
                  value={apptForm.time}
                  onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="w-full py-3 rounded-lg font-bold hover:opacity-90"
              >
                Add Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-md w-full">
            <div style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="p-5 flex justify-between items-center rounded-t-xl">
              <h3 className="text-xl font-bold">Add Client</h3>
              <button onClick={() => setShowClientForm(false)} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={submitClient} className="p-6 space-y-4">
              <div>
                <label htmlFor="admin-client-name" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Full Name *</label>
                <input
                  id="admin-client-name"
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label htmlFor="admin-client-phone" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Phone *</label>
                <input
                  id="admin-client-phone"
                  type="tel"
                  required
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="(555) 555-5555"
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="w-full py-3 rounded-lg font-bold hover:opacity-90"
              >
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Client History Modal */}
      {historyClient && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="p-5 flex justify-between items-center rounded-t-xl">
              <div>
                <h3 className="text-xl font-bold">{historyClient.name}</h3>
                <div className="text-xs opacity-75">{historyClient.visits} total visits</div>
              </div>
              <button onClick={() => setHistoryClient(null)} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <div className="p-6">
              {historyClient.visits === 0 ? (
                <p style={{ color: colors.textLight }} className="text-center py-6">
                  No visits yet. Book their first appointment to start their history.
                </p>
              ) : (
                <div className="space-y-3">
                  {historyFor(historyClient).map((visit, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: colors.backgroundAlt, borderColor: colors.border }}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <div style={{ color: colors.text }} className="font-bold">{visit.service}</div>
                        <div style={{ color: colors.textLight }} className="text-sm">with {visit.barber}</div>
                      </div>
                      <div style={{ color: colors.textLight }} className="text-sm">{visit.date}</div>
                    </div>
                  ))}
                  {historyClient.visits > 5 && (
                    <p style={{ color: colors.textLight }} className="text-sm text-center pt-2">
                      Showing 5 most recent of {historyClient.visits} visits
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={() => { const name = historyClient.name; setHistoryClient(null); openNewAppt(name) }}
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="w-full mt-6 py-3 rounded-lg font-bold hover:opacity-90"
              >
                Book New Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-md w-full">
            <div style={{ backgroundColor: colors.primary, color: colors.backgroundAlt }} className="p-5 flex justify-between items-center rounded-t-xl">
              <h3 className="text-xl font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => { setShowServiceForm(false); setEditingService(null) }} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={submitService} className="p-6 space-y-4">
              <div>
                <label htmlFor="admin-service-name" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Service Name *</label>
                <input
                  id="admin-service-name"
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="Service name"
                />
              </div>
              <div>
                <label htmlFor="admin-service-price" style={{ color: colors.text }} className="block font-bold mb-2 text-sm">Price (USD) *</label>
                <input
                  id="admin-service-price"
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  style={inputStyle}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  placeholder="35"
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: colors.accent, color: colors.primary }}
                className="w-full py-3 rounded-lg font-bold hover:opacity-90"
              >
                {editingService ? 'Save Changes' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Service Confirmation */}
      {deletingService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: colors.background }} className="rounded-xl max-w-md w-full p-6">
            <h3 style={{ color: colors.text }} className="text-xl font-bold mb-3">Delete Service?</h3>
            <p style={{ color: colors.textLight }} className="mb-6">
              This will remove &quot;{deletingService}&quot; from your service menu. This action can be undone by adding the service again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingService(null)}
                style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}
                className="flex-1 py-3 rounded-lg font-semibold hover:opacity-80"
              >
                Keep Service
              </button>
              <button
                onClick={confirmDeleteService}
                style={{ backgroundColor: colors.error, color: colors.backgroundAlt }}
                className="flex-1 py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
