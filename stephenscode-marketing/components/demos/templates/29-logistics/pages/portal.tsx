'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { Package, TrendingUp, DollarSign, Calendar, X, CheckCircle, Plus, Download } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

interface PortalShipment {
  id: string
  status: 'Processing' | 'In Transit' | 'Delivered'
  origin: string
  destination: string
  date: string
  service: string
  cost: string
}

interface PortalStat {
  key: string
  label: string
  value: string
  icon: typeof Package
  summary: string
  rows: { label: string; value: string }[]
  action: { label: string; page: string } | null
}

const STATUS_STEPS = ['Processing', 'In Transit', 'Delivered'] as const

const SHIPMENTS: PortalShipment[] = [
  { id: 'SLS123456', status: 'In Transit', origin: 'Los Angeles', destination: 'New York', date: '2024-01-20', service: 'Ground Freight', cost: '$1,240' },
  { id: 'SLS123457', status: 'Delivered', origin: 'Chicago', destination: 'Miami', date: '2024-01-18', service: 'Air Freight', cost: '$2,890' },
  { id: 'SLS123458', status: 'Processing', origin: 'Seattle', destination: 'Houston', date: '2024-01-22', service: 'Ground Freight', cost: '$975' },
  { id: 'SLS123459', status: 'Delivered', origin: 'Denver', destination: 'Phoenix', date: '2024-01-15', service: 'Expedited', cost: '$1,610' },
  { id: 'SLS123460', status: 'In Transit', origin: 'Atlanta', destination: 'Boston', date: '2024-01-21', service: 'Ground Freight', cost: '$1,085' }
]

const STATS: PortalStat[] = [
  {
    key: 'active',
    label: 'Active Shipments',
    value: '12',
    icon: Package,
    summary: 'Loads currently moving or awaiting pickup across your account.',
    rows: [
      { label: 'In transit', value: '7' },
      { label: 'Out for delivery today', value: '2' },
      { label: 'Awaiting pickup', value: '3' },
      { label: 'Exceptions or holds', value: '0' }
    ],
    action: { label: 'Track a Shipment', page: 'track' }
  },
  {
    key: 'month',
    label: 'This Month',
    value: '45',
    icon: TrendingUp,
    summary: 'Shipments tendered in the current billing month.',
    rows: [
      { label: 'Ground freight', value: '26' },
      { label: 'Air freight', value: '11' },
      { label: 'Expedited', value: '6' },
      { label: 'Ocean freight', value: '2' }
    ],
    action: { label: 'Open Analytics', page: 'reporting' }
  },
  {
    key: 'spend',
    label: 'Total Spent',
    value: '$23,450',
    icon: DollarSign,
    summary: 'Month-to-date freight spend, net of contract discounts.',
    rows: [
      { label: 'Linehaul', value: '$18,910' },
      { label: 'Fuel surcharge', value: '$3,120' },
      { label: 'Accessorials', value: '$1,420' },
      { label: 'Contract discount applied', value: '-$1,000' }
    ],
    action: { label: 'Open Analytics', page: 'reporting' }
  },
  {
    key: 'ontime',
    label: 'On-Time Rate',
    value: '98%',
    icon: Calendar,
    summary: 'Deliveries that hit the committed window over the last 90 days.',
    rows: [
      { label: 'On time', value: '44 of 45' },
      { label: 'Late (weather hold)', value: '1' },
      { label: 'Average days in transit', value: '3.2' },
      { label: 'Claims filed', value: '0' }
    ],
    action: { label: 'Open Analytics', page: 'reporting' }
  }
]

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const [statusFilter, setStatusFilter] = useState<'All' | PortalShipment['status']>('All')
  const [selected, setSelected] = useState<PortalShipment | null>(null)
  const [openStat, setOpenStat] = useState<PortalStat | null>(null)
  const [statementDownloaded, setStatementDownloaded] = useState(false)

  const filtered = SHIPMENTS.filter(s => statusFilter === 'All' || s.status === statusFilter)

  const downloadStatement = () => {
    const lines = [
      'Swift Logistics Services,Shipment Statement',
      `Filter,${statusFilter}`,
      '',
      'Tracking #,Origin,Destination,Ship Date,Service,Status,Cost',
      ...filtered.map(s => `${s.id},${s.origin},${s.destination},${s.date},${s.service},${s.status},${s.cost.replace(/[$,]/g, '')}`)
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'swift-logistics-statement.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setStatementDownloaded(true)
    setTimeout(() => setStatementDownloaded(false), 3000)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <h1 className="text-4xl font-bold" style={{ color: colors.text }}>Customer Portal</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={downloadStatement}
              className="px-5 py-2 rounded-lg font-semibold border flex items-center gap-2"
              style={{ borderColor: colors.border, color: colors.text, backgroundColor: '#ffffff' }}
            >
              <Download className="w-4 h-4" /> {statementDownloaded ? 'Statement Downloaded' : 'Download Statement'}
            </button>
            <button
              onClick={() => onNavigate('reporting')}
              className="px-5 py-2 rounded-lg font-semibold border"
              style={{ borderColor: colors.primary, color: colors.primary, backgroundColor: '#ffffff' }}
            >
              View Analytics
            </button>
            <button
              onClick={() => onNavigate('quote')}
              className="px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              <Plus className="w-4 h-4" /> New Shipment
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {STATS.map(stat => (
            <button
              key={stat.key}
              onClick={() => setOpenStat(stat)}
              className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                <stat.icon className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</div>
              <div className="text-xs mt-2" style={{ color: colors.primary }}>View breakdown</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between" style={{ borderColor: colors.border }}>
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Shipments</h2>
            <select
              aria-label="Filter shipments by status"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as 'All' | PortalShipment['status'])}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
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
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(shipment => (
                  <tr
                    key={shipment.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    style={{ borderColor: colors.border }}
                    onClick={() => setSelected(shipment)}
                  >
                    <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.id}</td>
                    <td className="p-4" style={{ color: colors.text }}>{shipment.origin}</td>
                    <td className="p-4" style={{ color: colors.text }}>{shipment.destination}</td>
                    <td className="p-4" style={{ color: colors.textLight }}>{shipment.date}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm" style={{
                        backgroundColor: shipment.status === 'Delivered' ? '#10b98120' : `${colors.primary}20`,
                        color: shipment.status === 'Delivered' ? '#059669' : colors.primary
                      }}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => { e.stopPropagation(); setSelected(shipment) }}
                          className="px-3 py-1 rounded text-sm border"
                          style={{ borderColor: colors.border, color: colors.text }}
                        >
                          Details
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); onNavigate('track', { tracking: shipment.id }) }}
                          className="px-3 py-1 rounded text-sm font-medium"
                          style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                        >
                          Track
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center" style={{ color: colors.textLight }}>
                      No shipments with this status.{' '}
                      <button onClick={() => setStatusFilter('All')} className="underline" style={{ color: colors.primary }}>
                        Show all shipments
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{selected.id}</h3>
                <div className="text-sm mt-1" style={{ color: colors.textLight }}>{selected.service}</div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close shipment detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div style={{ color: colors.textLight }}>Origin</div>
                <div className="font-semibold" style={{ color: colors.text }}>{selected.origin}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Destination</div>
                <div className="font-semibold" style={{ color: colors.text }}>{selected.destination}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Ship Date</div>
                <div className="font-semibold" style={{ color: colors.text }}>{selected.date}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Cost</div>
                <div className="font-semibold" style={{ color: colors.text }}>{selected.cost}</div>
              </div>
            </div>
            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Progress</h4>
            <div className="space-y-3 mb-6">
              {STATUS_STEPS.map((step, idx) => {
                const currentIdx = STATUS_STEPS.indexOf(selected.status)
                const done = idx <= currentIdx
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${done ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {done && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span style={{ color: done ? colors.text : colors.textLight }}>{step}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { const id = selected.id; setSelected(null); onNavigate('track', { tracking: id }) }}
                className="flex-1 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Track This Shipment
              </button>
              <button
                onClick={() => { const id = selected.id; setSelected(null); onNavigate('contact', { subject: `Shipment ${id}` }) }}
                className="flex-1 py-3 rounded-lg font-semibold border"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Ask About It
              </button>
            </div>
          </div>
        </div>
      )}

      {openStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setOpenStat(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <openStat.icon className="w-8 h-8" style={{ color: colors.primary }} />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{openStat.label}</h3>
                  <div className="text-sm" style={{ color: colors.textLight }}>{openStat.value}</div>
                </div>
              </div>
              <button onClick={() => setOpenStat(null)} aria-label="Close metric detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <p className="mb-5" style={{ color: colors.textLight }}>{openStat.summary}</p>
            <div className="space-y-2 mb-6">
              {openStat.rows.map(row => (
                <div key={row.label} className="flex justify-between text-sm py-2 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textLight }}>{row.label}</span>
                  <span className="font-semibold" style={{ color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>
            {openStat.action && (
              <button
                onClick={() => { const page = openStat.action!.page; setOpenStat(null); onNavigate(page) }}
                className="w-full py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {openStat.action.label}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
