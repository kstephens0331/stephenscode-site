'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Users, Wrench, DollarSign, TrendingUp, FileText } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Wrench, change: '+3 this week' },
    { label: 'Pending Estimates', value: '8', icon: FileText, change: '2 urgent' },
    { label: 'Revenue (Month)', value: '$45,200', icon: DollarSign, change: '+12% vs last month' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: TrendingUp, change: '156 reviews' }
  ]

  const recentJobs = [
    { id: 'J-1023', customer: 'John Smith', vehicle: '2020 Toyota Camry', service: 'Front Bumper Repair', status: 'In Progress', amount: '$1,200' },
    { id: 'J-1024', customer: 'Sarah Johnson', vehicle: '2019 Honda Accord', service: 'Paint & Refinish', status: 'Estimating', amount: '$2,400' },
    { id: 'J-1025', customer: 'Mike Davis', vehicle: '2021 Ford F-150', service: 'Collision Repair', status: 'Scheduled', amount: '$3,800' }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Admin Header */}
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold" style={{ color: colors.text }}>
              Admin Dashboard - Precision Auto Repair
            </h1>
            <div className="flex items-center gap-4">
              <span style={{ color: colors.textLight }}>Admin User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {['dashboard', 'jobs', 'schedule', 'customers', 'inventory'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-3 border-b-2 transition-colors capitalize"
                style={{
                  borderColor: activeTab === tab ? colors.accent : 'transparent',
                  color: activeTab === tab ? colors.accent : colors.textLight
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                      <div className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</div>
                    </div>
                    <stat.icon className="w-8 h-8" style={{ color: colors.accent }} />
                  </div>
                  <div className="text-sm" style={{ color: colors.textLight }}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b" style={{ borderColor: colors.border }}>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Jobs</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Job ID</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Vehicle</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{job.id}</td>
                        <td className="p-4" style={{ color: colors.text }}>{job.customer}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{job.vehicle}</td>
                        <td className="p-4" style={{ color: colors.text }}>{job.service}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm" style={{
                            backgroundColor: `${colors.accent}20`,
                            color: colors.accent
                          }}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 font-semibold" style={{ color: colors.accent }}>{job.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Calendar className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>View Schedule</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage appointments and technician assignments</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <FileText className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Create Estimate</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Generate new repair estimates</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Users className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Customer Portal</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage customer accounts and history</p>
              </button>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
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
