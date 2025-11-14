'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Package, TrendingUp, DollarSign, Calendar } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const shipments = [
    { id: 'SLS123456', status: 'In Transit', origin: 'Los Angeles', destination: 'New York', date: '2024-01-20' },
    { id: 'SLS123457', status: 'Delivered', origin: 'Chicago', destination: 'Miami', date: '2024-01-18' },
    { id: 'SLS123458', status: 'Processing', origin: 'Seattle', destination: 'Houston', date: '2024-01-22' }
  ]

  const stats = [
    { label: 'Active Shipments', value: '12', icon: Package },
    { label: 'This Month', value: '45', icon: TrendingUp },
    { label: 'Total Spent', value: '$23,450', icon: DollarSign },
    { label: 'On-Time Rate', value: '98%', icon: Calendar }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: colors.text }}>Customer Portal</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                <stat.icon className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b" style={{ borderColor: colors.border }}>
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Shipments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: colors.border }}>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Tracking #</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Origin</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Destination</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Date</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                    <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.id}</td>
                    <td className="p-4" style={{ color: colors.text }}>{shipment.origin}</td>
                    <td className="p-4" style={{ color: colors.text }}>{shipment.destination}</td>
                    <td className="p-4" style={{ color: colors.textLight }}>{shipment.date}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm" style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary
                      }}>
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
