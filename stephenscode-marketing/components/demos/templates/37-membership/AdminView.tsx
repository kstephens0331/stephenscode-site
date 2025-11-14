'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Users, Crown, TrendingUp, DollarSign, Calendar, Mail, Filter, Search } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Members', value: '1,284', change: '+12.3%', color: colors.primary },
    { label: 'Monthly Revenue', value: '$89,432', change: '+8.7%', color: colors.success },
    { label: 'Active Subscriptions', value: '1,156', change: '+5.2%', color: colors.secondary },
    { label: 'Churn Rate', value: '3.2%', change: '-1.1%', color: colors.warning },
  ]

  const members = [
    { id: '1', name: 'John Doe', email: 'john@example.com', tier: 'Premium', joined: 'Jan 15, 2024', status: 'Active', renewal: 'Jan 15, 2025' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', tier: 'VIP', joined: 'Feb 20, 2024', status: 'Active', renewal: 'Feb 20, 2025' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', tier: 'Basic', joined: 'Mar 10, 2024', status: 'Expiring Soon', renewal: 'Nov 20, 2024' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', tier: 'Premium', joined: 'Apr 5, 2024', status: 'Active', renewal: 'Apr 5, 2025' },
  ]

  const tierDistribution = [
    { tier: 'Basic', count: 456, percentage: 36, revenue: '$13,224' },
    { tier: 'Premium', count: 628, percentage: 49, revenue: '$49,612' },
    { tier: 'VIP', count: 200, percentage: 15, revenue: '$39,800' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Membership Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Admin Dashboard</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                Export Data
              </button>
              <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                Add Member
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
              <p className="text-sm" style={{ color: stat.change.startsWith('+') || stat.change.startsWith('-') && parseFloat(stat.change) < 0 ? colors.success : colors.error }}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['overview', 'members', 'tiers', 'renewals'].map(tab => (
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
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tier Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Membership Tier Distribution</h2>
              <div className="space-y-6">
                {tierDistribution.map((tier, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className="font-semibold" style={{ color: colors.text }}>{tier.tier}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: colors.text }}>{tier.count} members</p>
                        <p className="text-sm" style={{ color: colors.textLight }}>{tier.revenue}</p>
                      </div>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${tier.percentage}%`,
                          backgroundColor: colors.primary
                        }}
                      />
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>{tier.percentage}% of total members</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New VIP member joined', time: '2 hours ago', type: 'signup' },
                  { action: '15 Premium memberships renewed', time: '5 hours ago', type: 'renewal' },
                  { action: 'Member upgraded to VIP tier', time: '1 day ago', type: 'upgrade' },
                  { action: 'Membership cancellation', time: '1 day ago', type: 'cancellation' },
                  { action: '8 Basic members joined', time: '2 days ago', type: 'signup' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'signup' ? 'bg-green-500' :
                      activity.type === 'renewal' ? 'bg-blue-500' :
                      activity.type === 'upgrade' ? 'bg-purple-500' :
                      'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: colors.text }}>{activity.action}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>All Members</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search members..."
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
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Member</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Email</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Tier</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Joined</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Renewal</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-semibold" style={{ color: colors.text }}>{member.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{member.email}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{
                          backgroundColor: member.tier === 'VIP' ? colors.accent + '20' : colors.primary + '20',
                          color: member.tier === 'VIP' ? colors.accent : colors.primary
                        }}>
                          {member.tier}
                        </span>
                      </td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{member.joined}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{member.renewal}</td>
                      <td className="py-4 px-4">
                        <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Send email">
                          <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierDistribution.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{tier.tier}</h3>
                  <Crown className="w-8 h-8" style={{ color: colors.primary }} />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Total Members</p>
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>{tier.count}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Monthly Revenue</p>
                    <p className="text-2xl font-bold" style={{ color: colors.success }}>{tier.revenue}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Percentage</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div className="h-2 rounded-full" style={{ width: `${tier.percentage}%`, backgroundColor: colors.primary }} />
                      </div>
                      <span className="font-bold" style={{ color: colors.text }}>{tier.percentage}%</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Renewing This Month', value: '89', color: colors.success },
                { label: 'Expiring Soon', value: '23', color: colors.warning },
                { label: 'Past Due', value: '7', color: colors.error },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Renewals</h2>
              <div className="space-y-4">
                {members.filter(m => m.status !== 'Active').map(member => (
                  <div key={member.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold" style={{ color: colors.text }}>{member.name}</p>
                          <p className="text-sm" style={{ color: colors.textLight }}>{member.tier} - Renews {member.renewal}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                          Send Reminder
                        </button>
                        <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                          Process Renewal
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
