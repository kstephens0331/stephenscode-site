'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { TrendingUp, TrendingDown, Download } from 'lucide-react'

interface ReportingPageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

/** Maps a service row in the distribution chart to the quote calculator */
const SERVICE_QUOTE_KEY: Record<string, string> = {
  'Ground Freight': 'ground',
  'Air Freight': 'air',
  'Ocean Freight': 'ocean'
}

const PERIODS = {
  'This Week': {
    metrics: [
      { label: 'Total Shipments', value: '312', change: '+11%', up: true },
      { label: 'Avg Cost per Shipment', value: '$492', change: '-3%', up: false },
      { label: 'On-Time Delivery', value: '98.4%', change: '+1.2%', up: true }
    ],
    volume: [65, 45, 80, 55, 70, 90, 85],
    volumeLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distribution: [
      { service: 'Ground Freight', percentage: 46 },
      { service: 'Air Freight', percentage: 28 },
      { service: 'Ocean Freight', percentage: 19 },
      { service: 'Warehousing', percentage: 7 }
    ]
  },
  'This Month': {
    metrics: [
      { label: 'Total Shipments', value: '1,245', change: '+15%', up: true },
      { label: 'Avg Cost per Shipment', value: '$485', change: '-8%', up: false },
      { label: 'On-Time Delivery', value: '98.2%', change: '+2.1%', up: true }
    ],
    volume: [58, 72, 66, 88],
    volumeLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    distribution: [
      { service: 'Ground Freight', percentage: 45 },
      { service: 'Air Freight', percentage: 30 },
      { service: 'Ocean Freight', percentage: 20 },
      { service: 'Warehousing', percentage: 5 }
    ]
  },
  'This Quarter': {
    metrics: [
      { label: 'Total Shipments', value: '3,690', change: '+12%', up: true },
      { label: 'Avg Cost per Shipment', value: '$479', change: '-5%', up: false },
      { label: 'On-Time Delivery', value: '97.9%', change: '+0.8%', up: true }
    ],
    volume: [70, 84, 95],
    volumeLabels: ['Month 1', 'Month 2', 'Month 3'],
    distribution: [
      { service: 'Ground Freight', percentage: 44 },
      { service: 'Air Freight', percentage: 29 },
      { service: 'Ocean Freight', percentage: 21 },
      { service: 'Warehousing', percentage: 6 }
    ]
  }
} as const

type Period = keyof typeof PERIODS

export default function ReportingPage({ colors, onNavigate }: ReportingPageProps) {
  const [period, setPeriod] = useState<Period>('This Month')
  const [exported, setExported] = useState(false)
  const [selectedBar, setSelectedBar] = useState<number | null>(null)

  const data = PERIODS[period]

  const changePeriod = (next: Period) => {
    setPeriod(next)
    setSelectedBar(null)
  }

  const totalShipments = Number(data.metrics[0].value.replace(/,/g, ''))
  const volumeTotal = data.volume.reduce((sum, v) => sum + v, 0)

  const exportReport = () => {
    const lines: string[] = [
      `Swift Logistics Services Report,${period}`,
      '',
      'Metric,Value,Change',
      ...data.metrics.map(m => `${m.label},${m.value.replace(/,/g, '')},${m.change}`),
      '',
      'Volume Period,Index',
      ...data.volume.map((v, i) => `${data.volumeLabels[i]},${v}`),
      '',
      'Service,Share %',
      ...data.distribution.map(d => `${d.service},${d.percentage}`)
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `swift-logistics-report-${period.toLowerCase().replace(/\s+/g, '-')}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: colors.text }}>Analytics &amp; Reporting</h1>
          <button
            onClick={exportReport}
            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            style={{ backgroundColor: colors.primary, color: '#ffffff' }}
          >
            <Download className="w-5 h-5" />
            {exported ? 'Report Downloaded' : 'Export Report'}
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {(Object.keys(PERIODS) as Period[]).map(p => (
            <button
              key={p}
              onClick={() => changePeriod(p)}
              className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{
                backgroundColor: period === p ? colors.primary : '#ffffff',
                color: period === p ? '#ffffff' : colors.text,
                borderColor: period === p ? colors.primary : colors.border
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="text-sm mb-2" style={{ color: colors.textLight }}>{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold" style={{ color: colors.text }}>{metric.value}</div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#10b981' }}>
                  {metric.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Shipment Volume ({period})</h2>
            <p className="text-sm mb-6" style={{ color: colors.textLight }}>Select a bar to break down that period.</p>
            <div className="h-64 flex items-end justify-around gap-2">
              {data.volume.map((height, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBar(selectedBar === i ? null : i)}
                  aria-label={`${data.volumeLabels[i]} volume`}
                  aria-pressed={selectedBar === i}
                  className="flex-1 rounded-t-lg transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: colors.primary,
                    height: `${height}%`,
                    opacity: selectedBar === null || selectedBar === i ? 1 : 0.45
                  }}
                />
              ))}
            </div>
            <div className="flex justify-around mt-4 text-sm" style={{ color: colors.textLight }}>
              {data.volumeLabels.map(label => <span key={label}>{label}</span>)}
            </div>
            {selectedBar !== null && (
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="font-bold mb-1" style={{ color: colors.text }}>{data.volumeLabels[selectedBar]}</div>
                <div className="text-sm" style={{ color: colors.textLight }}>
                  {Math.round((data.volume[selectedBar] / volumeTotal) * totalShipments).toLocaleString()} shipments,{' '}
                  {Math.round((data.volume[selectedBar] / volumeTotal) * 100)}% of {period.toLowerCase()} volume
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Service Distribution</h2>
            <p className="text-sm mb-6" style={{ color: colors.textLight }}>Select a service to price your next load on it.</p>
            <div className="space-y-4">
              {data.distribution.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const key = SERVICE_QUOTE_KEY[item.service]
                    if (key) onNavigate('quote', { service: key })
                    else onNavigate('contact', { subject: `${item.service} inquiry` })
                  }}
                  className="w-full text-left rounded-lg p-2 -m-2 transition-colors hover:bg-gray-50"
                >
                  <div className="flex justify-between mb-2">
                    <span style={{ color: colors.text }}>{item.service}</span>
                    <span style={{ color: colors.textLight }}>{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className="h-2 rounded-full transition-all duration-300" style={{ backgroundColor: colors.primary, width: `${item.percentage}%` }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-8 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <div className="font-bold" style={{ color: colors.text }}>Want this report on a schedule?</div>
            <div className="text-sm" style={{ color: colors.textLight }}>
              Coordinators can email a copy every Monday, or you can pull it any time from the portal.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('portal')}
              className="px-6 py-3 rounded-lg font-semibold border"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Back to Portal
            </button>
            <button
              onClick={() => onNavigate('contact', { subject: 'Scheduled reporting request' })}
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Request Scheduled Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
