'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Truck, Package, Users, DollarSign, TrendingUp, MapPin } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Active Shipments', value: '156', icon: Package, change: '+23 today' },
    { label: 'Available Drivers', value: '87', icon: Truck, change: '12 en route' },
    { label: 'Revenue (Today)', value: '$45,230', icon: DollarSign, change: '+18% vs yesterday' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: TrendingUp, change: '543 ratings' }
  ]

  const activeShipments = [
    { id: 'SLS789012', customer: 'ABC Corp', route: 'LA → NY', driver: 'John Smith', status: 'In Transit', eta: '2 hrs' },
    { id: 'SLS789013', customer: 'XYZ Inc', route: 'Chicago → Miami', driver: 'Sarah Jones', status: 'Loading', eta: '4 hrs' },
    { id: 'SLS789014', customer: 'Tech Solutions', route: 'Seattle → Denver', driver: 'Mike Davis', status: 'Delivering', eta: '30 min' }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold" style={{ color: colors.text }}>
              Admin Dashboard - Swift Logistics Services
            </h1>
            <span style={{ color: colors.textLight }}>Admin User</span>
          </div>
        </div>
      </div>

      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {['dashboard', 'shipments', 'fleet', 'customers', 'reports'].map(tab => (
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
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Active Shipments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Tracking #</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Route</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Driver</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeShipments.map((shipment, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.id}</td>
                        <td className="p-4" style={{ color: colors.text }}>{shipment.customer}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{shipment.route}</td>
                        <td className="p-4" style={{ color: colors.text }}>{shipment.driver}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm" style={{
                            backgroundColor: `${colors.primary}20`,
                            color: colors.primary
                          }}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Route Optimization</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Optimize delivery routes for efficiency</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Truck className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Fleet Management</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Monitor vehicle status and maintenance</p>
              </button>
              <button className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Users className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
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
