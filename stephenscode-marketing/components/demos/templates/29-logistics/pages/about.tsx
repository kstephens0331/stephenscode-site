'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { Award, Truck, Users, X } from 'lucide-react'

interface AboutPageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

interface Highlight {
  key: string
  icon: typeof Truck
  label: string
  value: string
  detail: string
  rows: { label: string; value: string }[]
}

const HIGHLIGHTS: Highlight[] = [
  {
    key: 'fleet',
    icon: Truck,
    label: 'Modern Fleet',
    value: '500+ Vehicles',
    detail: 'Company-owned power units and trailers, averaging 3.4 years in service and inspected every 90 days.',
    rows: [
      { label: 'Average equipment age', value: '3.4 years' },
      { label: 'Preventive maintenance interval', value: '90 days' },
      { label: 'Terminals with service bays', value: '14' },
      { label: 'Telematics coverage', value: '100% of units' }
    ]
  },
  {
    key: 'team',
    icon: Users,
    label: 'Expert Team',
    value: '1,200+ Staff',
    detail: 'Drivers, dispatchers, warehouse crews, and customs specialists, with a dedicated coordinator on every account.',
    rows: [
      { label: 'Professional drivers', value: '740' },
      { label: 'Dispatch and support', value: '265' },
      { label: 'Warehouse and dock', value: '155' },
      { label: 'Customs and compliance', value: '40' }
    ]
  },
  {
    key: 'certified',
    icon: Award,
    label: 'Industry Leader',
    value: 'ISO 9001 Certified',
    detail: 'Audited quality management, plus C-TPAT and SmartWay participation for cross-border and sustainability standards.',
    rows: [
      { label: 'ISO 9001 quality management', value: 'Certified' },
      { label: 'C-TPAT trade partnership', value: 'Tier 2' },
      { label: 'SmartWay carrier', value: 'Enrolled' },
      { label: 'FMCSA safety rating', value: 'Satisfactory' }
    ]
  }
]

const MILESTONES = [
  {
    year: '1995',
    title: 'Three trucks and one terminal',
    body: 'Swift Logistics opened as a regional carrier running dedicated lanes between Freight City and the coast, with three owner-operated trucks.'
  },
  {
    year: '2004',
    title: 'Warehousing and distribution',
    body: 'The first 180,000 square foot distribution center opened, adding pick and pack, kitting, and climate-controlled storage to the service list.'
  },
  {
    year: '2013',
    title: 'International freight forwarding',
    body: 'Air and ocean forwarding launched with in-house customs brokerage, opening direct service to Europe and Asia Pacific.'
  },
  {
    year: '2019',
    title: 'Real-time visibility platform',
    body: 'Telematics were rolled out fleet wide, giving customers milestone tracking, delivery alerts, and self-serve reporting in the portal.'
  },
  {
    year: 'Today',
    title: '500 vehicles, 45 countries',
    body: 'Swift Logistics runs a 500 vehicle fleet with 14 terminals, holding a 99.2 percent on-time record across all service levels.'
  }
]

export default function AboutPage({ colors, onNavigate }: AboutPageProps) {
  const [activeYear, setActiveYear] = useState(MILESTONES[MILESTONES.length - 1].year)
  const [openHighlight, setOpenHighlight] = useState<Highlight | null>(null)

  const milestone = MILESTONES.find(m => m.year === activeYear) ?? MILESTONES[0]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>About Swift Logistics</h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <p className="text-lg mb-6" style={{ color: colors.textLight }}>
            Since 1995, Swift Logistics Services has been a trusted partner in freight and logistics management.
            With over 25 years of experience, we&apos;ve built a reputation for reliability, innovation, and customer service.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map(item => (
              <button
                key={item.key}
                onClick={() => setOpenHighlight(item)}
                className="text-center p-6 rounded-lg border transition-all hover:shadow-lg"
                style={{ borderColor: colors.border }}
              >
                <item.icon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>{item.label}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{item.value}</p>
                <span className="text-xs mt-3 inline-block" style={{ color: colors.primary }}>View details</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Our Story</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {MILESTONES.map(m => (
              <button
                key={m.year}
                onClick={() => setActiveYear(m.year)}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  backgroundColor: activeYear === m.year ? colors.primary : '#ffffff',
                  color: activeYear === m.year ? '#ffffff' : colors.text,
                  borderColor: activeYear === m.year ? colors.primary : colors.border
                }}
              >
                {m.year}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
            <div className="text-sm font-semibold mb-1" style={{ color: colors.primary }}>{milestone.year}</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{milestone.title}</h3>
            <p style={{ color: colors.textLight }}>{milestone.body}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>Ready to move freight with us?</h2>
          <p className="mb-6" style={{ color: colors.textLight }}>
            Price a lane in seconds, check coverage in your region, or talk to a coordinator any hour of the day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('quote')}
              className="px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Get a Quote
            </button>
            <button
              onClick={() => onNavigate('areas')}
              className="px-6 py-3 rounded-lg font-semibold border"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Check Coverage
            </button>
            <button
              onClick={() => onNavigate('careers')}
              className="px-6 py-3 rounded-lg font-semibold border"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Join the Team
            </button>
          </div>
        </div>
      </div>

      {openHighlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setOpenHighlight(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <openHighlight.icon className="w-8 h-8" style={{ color: colors.primary }} />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{openHighlight.label}</h3>
                  <div className="text-sm" style={{ color: colors.textLight }}>{openHighlight.value}</div>
                </div>
              </div>
              <button onClick={() => setOpenHighlight(null)} aria-label="Close detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <p className="mb-5" style={{ color: colors.textLight }}>{openHighlight.detail}</p>
            <div className="space-y-2 mb-6">
              {openHighlight.rows.map(row => (
                <div key={row.label} className="flex justify-between text-sm py-2 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textLight }}>{row.label}</span>
                  <span className="font-semibold" style={{ color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setOpenHighlight(null); onNavigate('contact', { subject: `Question about ${openHighlight.label}` }) }}
              className="w-full py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Ask Us About This
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
