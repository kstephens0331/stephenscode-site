'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Clock, Users, Mail, MessageSquare, CheckCircle, XCircle, Filter, Search } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('calendar')

  const appointments = [
    { id: '1', client: 'John Smith', service: 'Haircut & Style', staff: 'Sarah Johnson', date: '2024-01-15', time: '10:00 AM', status: 'confirmed' },
    { id: '2', client: 'Emma Davis', service: 'Hair Coloring', staff: 'Mike Chen', date: '2024-01-15', time: '11:00 AM', status: 'confirmed' },
    { id: '3', client: 'Michael Brown', service: 'Massage Therapy', staff: 'Lisa Anderson', date: '2024-01-15', time: '1:00 PM', status: 'pending' },
    { id: '4', client: 'Sarah Wilson', service: 'Deep Conditioning', staff: 'Sarah Johnson', date: '2024-01-15', time: '2:00 PM', status: 'confirmed' },
    { id: '5', client: 'David Lee', service: 'Haircut & Style', staff: 'Mike Chen', date: '2024-01-16', time: '9:00 AM', status: 'confirmed' },
  ]

  const staff = [
    { id: '1', name: 'Sarah Johnson', appointments: 12, availability: '9:00 AM - 5:00 PM' },
    { id: '2', name: 'Mike Chen', appointments: 10, availability: '10:00 AM - 6:00 PM' },
    { id: '3', name: 'Lisa Anderson', appointments: 8, availability: '11:00 AM - 7:00 PM' },
  ]

  const stats = [
    { label: 'Today\'s Appointments', value: '12', change: '+3 from yesterday', color: colors.primary },
    { label: 'Confirmed', value: '10', change: '83% confirmation rate', color: colors.success },
    { label: 'Pending', value: '2', change: 'Awaiting response', color: colors.warning },
    { label: 'Staff Utilization', value: '85%', change: '+5% this week', color: colors.secondary },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Booking Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Admin Dashboard</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                Export Schedule
              </button>
              <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
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
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm" style={{ color: colors.textLight }}>{stat.change}</p>
            </div>
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Calendar View</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                  Today
                </button>
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                  Week
                </button>
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                  Month
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-2 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="font-semibold" style={{ color: colors.text }}>Time</div>
                <div className="col-span-7 grid grid-cols-3 gap-2">
                  {staff.map(member => (
                    <div key={member.id} className="text-center font-semibold" style={{ color: colors.text }}>
                      {member.name}
                    </div>
                  ))}
                </div>
              </div>

              {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map(time => (
                <div key={time} className="grid grid-cols-8 gap-2 py-2 border-b" style={{ borderColor: colors.border }}>
                  <div className="font-medium" style={{ color: colors.textLight }}>{time}</div>
                  <div className="col-span-7 grid grid-cols-3 gap-2">
                    {staff.map((member, idx) => {
                      const apt = appointments.find(a => a.time === time && a.staff === member.name)
                      return (
                        <div key={member.id}>
                          {apt ? (
                            <div className="p-3 rounded-lg border-l-4" style={{
                              backgroundColor: colors.backgroundAlt,
                              borderColor: apt.status === 'confirmed' ? colors.success : colors.warning
                            }}>
                              <p className="font-semibold text-sm" style={{ color: colors.text }}>{apt.client}</p>
                              <p className="text-xs" style={{ color: colors.textLight }}>{apt.service}</p>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg border-2 border-dashed opacity-50" style={{ borderColor: colors.border }}>
                              <p className="text-xs text-center" style={{ color: colors.textLight }}>Available</p>
                            </div>
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

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>All Appointments</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
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
                  {appointments.map(apt => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4" style={{ color: colors.text }}>{apt.client}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.service}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.staff}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.date}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{apt.time}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Send reminder">
                            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                          </button>
                          <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Send SMS">
                            <MessageSquare className="w-4 h-4" style={{ color: colors.primary }} />
                          </button>
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
            {staff.map(member => (
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
                    <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Today&apos;s Appointments</span>
                    <span className="font-bold" style={{ color: colors.primary }}>{member.appointments}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="text-sm font-semibold" style={{ color: colors.textLight }}>Availability</span>
                    <span className="text-sm font-medium" style={{ color: colors.text }}>{member.availability}</span>
                  </div>

                  <div className="pt-2">
                    <button className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                      View Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
