'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Users, TrendingUp, DollarSign, Gift, Award } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Today\'s Appointments', value: '18', icon: Calendar, change: '3 pending' },
    { label: 'Active Members', value: '245', icon: Users, change: '+12 this month' },
    { label: 'Revenue (Month)', value: '$68,500', icon: DollarSign, change: '+18% vs last month' },
    { label: 'Average Rating', value: '4.9/5', icon: TrendingUp, change: '234 reviews' }
  ]

  const appointments = [
    { time: '10:00 AM', client: 'Emma Davis', service: 'Swedish Massage', therapist: 'Sarah J.', status: 'Confirmed' },
    { time: '11:30 AM', client: 'John Smith', service: 'Facial Treatment', therapist: 'Emma W.', status: 'Checked In' },
    { time: '2:00 PM', client: 'Lisa Chen', service: 'Body Wrap', therapist: 'Michael C.', status: 'Pending' }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold font-serif" style={{ color: colors.text }}>
              Admin Dashboard - Serenity Spa & Wellness
            </h1>
            <span style={{ color: colors.textLight }}>Admin User</span>
          </div>
        </div>
      </div>

      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {['dashboard', 'appointments', 'members', 'products', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-3 border-b-2 transition-colors capitalize"
                style={{
                  borderColor: activeTab === tab ? colors.primary : 'transparent',
                  color: activeTab === tab ? colors.primary : colors.textLight
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                      <div className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</div>
                    </div>
                    <stat.icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <div className="text-sm" style={{ color: colors.textLight }}>{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b" style={{ borderColor: colors.border }}>
                <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Today's Appointments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Time</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Client</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Therapist</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{apt.time}</td>
                        <td className="p-4" style={{ color: colors.text }}>{apt.client}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{apt.service}</td>
                        <td className="p-4" style={{ color: colors.text }}>{apt.therapist}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm" style={{
                            backgroundColor: `${colors.primary}20`,
                            color: colors.primary
                          }}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Calendar className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Manage Schedule</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>View and manage therapist schedules</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Gift className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Gift Certificates</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage digital gift certificates</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Award className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Memberships</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage member accounts and billing</p>
              </button>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-xl font-bold mb-2 font-serif" style={{ color: colors.text }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p style={{ color: colors.textLight }}>
              Full {activeTab} management interface available in production version
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
