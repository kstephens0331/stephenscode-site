'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { Truck, MapPin, BarChart3, Shield, Clock, Globe, X } from 'lucide-react'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

interface HeroStat {
  key: string
  icon: typeof Truck
  label: string
  value: string
  title: string
  detail: string
  breakdown: { label: string; value: string }[]
  ctaLabel: string
  ctaPage: string
}

const HERO_STATS: HeroStat[] = [
  {
    key: 'fleet',
    icon: Truck,
    label: 'Fleet',
    value: '500+',
    title: 'Our Fleet',
    detail: 'Company-owned equipment across 14 domestic terminals, with every unit on a 90-day preventive maintenance cycle.',
    breakdown: [
      { label: '53ft dry vans', value: '246' },
      { label: 'Refrigerated trailers', value: '112' },
      { label: 'Flatbed and step deck', value: '84' },
      { label: 'Box trucks and sprinters', value: '61' }
    ],
    ctaLabel: 'See Our Services',
    ctaPage: 'services'
  },
  {
    key: 'countries',
    icon: Globe,
    label: 'Countries',
    value: '45+',
    title: 'Global Reach',
    detail: 'Direct service across four regions through owned terminals and vetted partner carriers.',
    breakdown: [
      { label: 'North America', value: '100% coverage' },
      { label: 'Europe', value: '95% coverage' },
      { label: 'Asia Pacific', value: '85% coverage' },
      { label: 'South America', value: '75% coverage' }
    ],
    ctaLabel: 'View Service Areas',
    ctaPage: 'areas'
  },
  {
    key: 'ontime',
    icon: Clock,
    label: 'On-Time',
    value: '99.2%',
    title: 'On-Time Performance',
    detail: 'Measured against committed delivery windows across the trailing twelve months, audited monthly.',
    breakdown: [
      { label: 'Expedited', value: '99.7%' },
      { label: 'Air freight', value: '99.4%' },
      { label: 'Ground freight', value: '99.1%' },
      { label: 'Ocean freight', value: '97.8%' }
    ],
    ctaLabel: 'Open Analytics',
    ctaPage: 'reporting'
  },
  {
    key: 'insured',
    icon: Shield,
    label: 'Insured',
    value: '$5M',
    title: 'Cargo Protection',
    detail: 'Every load moves under all-risk cargo coverage. Declared-value upgrades are available at booking.',
    breakdown: [
      { label: 'Cargo liability', value: '$5,000,000' },
      { label: 'Auto liability', value: '$2,000,000' },
      { label: 'Claims resolved in 14 days', value: '96%' },
      { label: 'Deductible per claim', value: '$0' }
    ],
    ctaLabel: 'Talk to Our Team',
    ctaPage: 'contact'
  }
]

export default function HomePage({ colors, onNavigate }: HomePageProps) {
  const [openStat, setOpenStat] = useState<HeroStat | null>(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Fast, Reliable Logistics Solutions
              </h1>
              <p className="text-xl mb-8 text-white opacity-90">
                Real-time tracking, competitive rates, and exceptional service for all your shipping needs
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.accent, color: colors.text }}
                >
                  Get Instant Quote
                </button>
                <button
                  onClick={() => onNavigate('track')}
                  className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white transition-all hover:bg-white hover:text-gray-900"
                >
                  Track Shipment
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {HERO_STATS.map(stat => (
                <button
                  key={stat.key}
                  onClick={() => setOpenStat(stat)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white text-left transition-all hover:bg-white/20"
                >
                  <stat.icon className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Premium Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <button onClick={() => onNavigate('track')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <MapPin className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Real-Time Tracking</h3>
              <p style={{ color: colors.textLight }}>Track shipments with live GPS updates and delivery notifications</p>
            </button>
            <button onClick={() => onNavigate('portal')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <BarChart3 className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Analytics Portal</h3>
              <p style={{ color: colors.textLight }}>Comprehensive reporting and shipment history management</p>
            </button>
            <button onClick={() => onNavigate('quote')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <Truck className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Instant Quotes</h3>
              <p style={{ color: colors.textLight }}>Get competitive pricing with our advanced calculator</p>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Premium Build: $2,000 Value</h2>
            <p className="text-xl mb-8 opacity-90">Complete logistics management platform</p>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
              {[
                { feature: '10 fully functional pages', page: 'services' },
                { feature: 'Real-time tracking system', page: 'track' },
                { feature: 'Customer portal dashboard', page: 'portal' },
                { feature: 'Quote calculator tool', page: 'quote' },
                { feature: 'Analytics & reporting', page: 'reporting' },
                { feature: 'Service area mapping', page: 'areas' }
              ].map(({ feature, page }) => (
                <li key={feature}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="flex items-start gap-3 text-left w-full rounded-lg px-2 py-1 transition-colors hover:bg-white/10"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="underline decoration-white/30 underline-offset-4">{feature}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => onNavigate('quote')}
                className="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                Get Instant Quote
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white transition-all hover:bg-white hover:text-gray-900"
              >
                Talk to Dispatch
              </button>
            </div>
          </div>
        </div>
      </section>

      {openStat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setOpenStat(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <openStat.icon className="w-8 h-8" style={{ color: colors.primary }} />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{openStat.title}</h3>
                  <div className="text-sm" style={{ color: colors.textLight }}>{openStat.label}: {openStat.value}</div>
                </div>
              </div>
              <button onClick={() => setOpenStat(null)} aria-label="Close detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <p className="mb-5" style={{ color: colors.textLight }}>{openStat.detail}</p>
            <div className="space-y-2 mb-6">
              {openStat.breakdown.map(row => (
                <div key={row.label} className="flex justify-between text-sm py-2 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textLight }}>{row.label}</span>
                  <span className="font-semibold" style={{ color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { const page = openStat.ctaPage; setOpenStat(null); onNavigate(page) }}
              className="w-full py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              {openStat.ctaLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
