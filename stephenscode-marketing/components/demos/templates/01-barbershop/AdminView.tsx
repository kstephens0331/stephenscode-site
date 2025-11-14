'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'clients' | 'services'>('dashboard')

  const todaysAppointments = [
    { id: 1, time: '9:00 AM', client: 'John Smith', service: 'Classic Haircut', barber: 'Mike Johnson', status: 'completed' },
    { id: 2, time: '9:30 AM', client: 'Robert Davis', service: 'Beard Trim', barber: 'David Chen', status: 'completed' },
    { id: 3, time: '10:00 AM', client: 'Michael Wilson', service: 'Hot Towel Shave', barber: 'Mike Johnson', status: 'in-progress' },
    { id: 4, time: '11:00 AM', client: 'James Brown', service: 'Haircut + Beard', barber: 'Tony Rodriguez', status: 'confirmed' },
    { id: 5, time: '2:00 PM', client: 'William Jones', service: 'Classic Haircut', barber: 'Mike Johnson', status: 'confirmed' },
    { id: 6, time: '3:30 PM', client: 'David Miller', service: 'Beard Trim', barber: 'David Chen', status: 'pending' }
  ]

  const stats = [
    { label: 'Today\'s Revenue', value: '$420', change: '+12%', icon: '💰', color: colors.success },
    { label: 'Appointments', value: '12', change: '+3', icon: '📅', color: colors.primary },
    { label: 'Walk-ins', value: '4', change: '+1', icon: '🚶', color: colors.accent },
    { label: 'Avg Wait Time', value: '8 min', change: '-2 min', icon: '⏱️', color: colors.secondary }
  ]

  const topServices = [
    { name: 'Classic Haircut', count: 45, revenue: '$1,125' },
    { name: 'Haircut + Beard', count: 28, revenue: '$980' },
    { name: 'Hot Towel Shave', count: 15, revenue: '$450' },
    { name: 'Beard Trim', count: 22, revenue: '$330' }
  ]

  const recentClients = [
    { name: 'John Smith', phone: '(555) 123-4567', lastVisit: '2 days ago', visits: 12 },
    { name: 'Robert Davis', phone: '(555) 234-5678', lastVisit: '1 week ago', visits: 8 },
    { name: 'Michael Wilson', phone: '(555) 345-6789', lastVisit: '3 weeks ago', visits: 5 },
    { name: 'James Brown', phone: '(555) 456-7890', lastVisit: '1 month ago', visits: 15 }
  ]

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
              <button style={{ backgroundColor: colors.accent, color: colors.primary }} className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
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
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'appointments', label: 'Appointments', icon: '📅' },
              { id: 'clients', label: 'Clients', icon: '👥' },
              { id: 'services', label: 'Services', icon: '✂️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
                  <div style={{ color: colors.text }} className="text-3xl font-black mb-1">{stat.value}</div>
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
                  {todaysAppointments.slice(0, 5).map((apt) => (
                    <div
                      key={apt.id}
                      style={{ backgroundColor: colors.backgroundAlt, borderColor: colors.border }}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div style={{ color: colors.text }} className="font-bold">{apt.client}</div>
                          <div style={{ color: colors.textLight }} className="text-sm">{apt.service}</div>
                        </div>
                        <span
                          style={{
                            backgroundColor: apt.status === 'completed' ? colors.success :
                                           apt.status === 'in-progress' ? colors.warning :
                                           colors.primary,
                            color: colors.backgroundAlt
                          }}
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                        >
                          {apt.status}
                        </span>
                      </div>
                      <div style={{ color: colors.textLight }} className="text-xs flex justify-between">
                        <span>⏰ {apt.time}</span>
                        <span>👨‍🦰 {apt.barber}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Services */}
              <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl p-6">
                <h3 style={{ color: colors.text }} className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> Top Services (This Week)
                </h3>
                <div className="space-y-4">
                  {topServices.map((service, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div style={{ color: colors.text }} className="font-semibold">{service.name}</div>
                          <div style={{ color: colors.textLight }} className="text-xs">{service.count} bookings</div>
                        </div>
                        <div style={{ color: colors.accent }} className="font-bold text-lg">{service.revenue}</div>
                      </div>
                      <div style={{ backgroundColor: colors.backgroundAlt }} className="h-2 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: colors.primary, width: `${(service.count / 45) * 100}%` }}
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
              <button style={{ backgroundColor: colors.accent, color: colors.primary }} className="px-6 py-3 rounded-lg font-bold hover:opacity-90">
                + New Appointment
              </button>
            </div>
            <div style={{ backgroundColor: colors.background, borderColor: colors.border }} className="border-2 rounded-xl overflow-hidden">
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
                  {todaysAppointments.map((apt, index) => (
                    <tr
                      key={apt.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? colors.background : colors.backgroundAlt,
                        borderBottom: `1px solid ${colors.border}`
                      }}
                      className="hover:opacity-80"
                    >
                      <td style={{ color: colors.text }} className="px-6 py-4 font-semibold">{apt.time}</td>
                      <td style={{ color: colors.text }} className="px-6 py-4">{apt.client}</td>
                      <td style={{ color: colors.textLight }} className="px-6 py-4">{apt.service}</td>
                      <td style={{ color: colors.textLight }} className="px-6 py-4">{apt.barber}</td>
                      <td className="px-6 py-4">
                        <span
                          style={{
                            backgroundColor: apt.status === 'completed' ? colors.success :
                                           apt.status === 'in-progress' ? colors.warning :
                                           colors.primary,
                            color: colors.backgroundAlt
                          }}
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
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: colors.text }} className="text-2xl font-bold">Client Database</h2>
              <button style={{ backgroundColor: colors.accent, color: colors.primary }} className="px-6 py-3 rounded-lg font-bold hover:opacity-90">
                + Add Client
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {recentClients.map((client, index) => (
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
                    <button style={{ backgroundColor: colors.backgroundAlt, color: colors.text }} className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-80">
                      View History
                    </button>
                    <button style={{ backgroundColor: colors.accent, color: colors.primary }} className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
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
              <button style={{ backgroundColor: colors.accent, color: colors.primary }} className="px-6 py-3 rounded-lg font-bold hover:opacity-90">
                + Add Service
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topServices.map((service, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: colors.background, borderColor: colors.border }}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <h3 style={{ color: colors.text }} className="text-xl font-bold mb-3">{service.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textLight }} className="text-sm">Bookings this week:</span>
                      <span style={{ color: colors.text }} className="font-bold">{service.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textLight }} className="text-sm">Revenue:</span>
                      <span style={{ color: colors.accent }} className="font-bold">{service.revenue}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button style={{ backgroundColor: colors.backgroundAlt, color: colors.text }} className="flex-1 py-2 rounded-lg font-semibold text-sm hover:opacity-80">
                      Edit
                    </button>
                    <button style={{ backgroundColor: colors.error, color: colors.backgroundAlt }} className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
