'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { BarChart3, TrendingUp, Download } from 'lucide-react'

interface ReportingPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ReportingPage({ colors, onNavigate }: ReportingPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: colors.text }}>Analytics & Reporting</h1>
          <button className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
            <Download className="w-5 h-5" />
            Export Reports
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Shipments', value: '1,245', change: '+15%' },
            { label: 'Avg Cost per Shipment', value: '$485', change: '-8%' },
            { label: 'On-Time Delivery', value: '98.2%', change: '+2.1%' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="text-sm mb-2" style={{ color: colors.textLight }}>{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold" style={{ color: colors.text }}>{metric.value}</div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#10b981' }}>
                  <TrendingUp className="w-4 h-4" />
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Shipment Volume</h2>
            <div className="h-64 flex items-end justify-around gap-2">
              {[65, 45, 80, 55, 70, 90, 85].map((height, i) => (
                <div key={i} className="flex-1 rounded-t-lg" style={{ backgroundColor: colors.primary, height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-around mt-4 text-sm" style={{ color: colors.textLight }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Service Distribution</h2>
            <div className="space-y-4">
              {[
                { service: 'Ground Freight', percentage: 45 },
                { service: 'Air Freight', percentage: 30 },
                { service: 'Ocean Freight', percentage: 20 },
                { service: 'Warehousing', percentage: 5 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: colors.text }}>{item.service}</span>
                    <span style={{ color: colors.textLight }}>{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className="h-2 rounded-full" style={{ backgroundColor: colors.primary, width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
