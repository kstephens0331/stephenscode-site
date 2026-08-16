'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { Truck, Plane, Ship, Package, X, CheckCircle } from 'lucide-react'

interface ServicesPageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

interface ServiceDetail {
  icon: typeof Truck
  name: string
  description: string
  features: string[]
  /** Quote calculator key, or null when the service is quoted by a specialist */
  quoteKey: string | null
  transit: string
  minimum: string
  equipment: string
  rateBasis: string
  included: string[]
}

const SERVICES: ServiceDetail[] = [
  {
    icon: Truck,
    name: 'Ground Freight',
    description: 'Reliable truck shipping across North America',
    features: ['LTL & FTL', 'Temperature controlled', 'Expedited options'],
    quoteKey: 'ground',
    transit: '1 to 5 business days',
    minimum: '150 lbs',
    equipment: '53ft dry van, refrigerated, flatbed',
    rateBasis: '$0.50 per lb plus $0.80 per mile',
    included: ['Liftgate at pickup and delivery', 'Appointment scheduling', 'GPS trace every 15 minutes', 'Proof of delivery photos']
  },
  {
    icon: Plane,
    name: 'Air Freight',
    description: 'Fast international air cargo services',
    features: ['Next-day delivery', 'Global coverage', 'Customs clearance'],
    quoteKey: 'air',
    transit: '1 to 3 days door to door',
    minimum: '50 lbs',
    equipment: 'Palletized ULD and loose load',
    rateBasis: '$2.50 per lb plus $1.50 per mile',
    included: ['Customs brokerage', 'Airport-to-door drayage', 'Dangerous goods handling', 'Hourly milestone updates']
  },
  {
    icon: Ship,
    name: 'Ocean Freight',
    description: 'Cost-effective sea shipping worldwide',
    features: ['Container shipping', 'Port-to-port', 'Door-to-door'],
    quoteKey: 'ocean',
    transit: '12 to 34 days port to port',
    minimum: '1 pallet (LCL)',
    equipment: '20ft, 40ft, 40ft high cube, reefer',
    rateBasis: '$0.30 per lb plus $0.40 per mile',
    included: ['Container booking and rolling protection', 'Port drayage', 'Bonded warehouse transfer', 'Vessel milestone alerts']
  },
  {
    icon: Package,
    name: 'Warehousing',
    description: 'Secure storage and distribution',
    features: ['Climate controlled', 'Inventory management', 'Pick & pack'],
    quoteKey: null,
    transit: 'Same-day outbound cutoff at 4pm',
    minimum: '1 pallet position',
    equipment: '14 terminals, 2.1M sq ft total',
    rateBasis: 'Scoped by a specialist based on volume and dwell time',
    included: ['Climate-controlled zones', 'Cycle counting and reporting', 'Pick, pack, and kitting', 'Portal inventory visibility']
  }
]

export default function ServicesPage({ colors, onNavigate }: ServicesPageProps) {
  const [openService, setOpenService] = useState<ServiceDetail | null>(null)

  const startQuote = (service: ServiceDetail) => {
    setOpenService(null)
    if (service.quoteKey) {
      onNavigate('quote', { service: service.quoteKey })
    } else {
      onNavigate('contact', { subject: `${service.name} inquiry` })
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: colors.text }}>Our Services</h1>
        <p className="text-center mb-12" style={{ color: colors.textLight }}>
          Select any service for transit times, equipment, and what is included in the rate.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map(service => (
            <div key={service.name} className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
              <service.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>{service.name}</h3>
              <p className="mb-4" style={{ color: colors.textLight }}>{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <span style={{ color: colors.primary }}>•</span>
                    <span style={{ color: colors.text }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-auto">
                <button
                  onClick={() => setOpenService(service)}
                  className="px-5 py-2 rounded-lg font-semibold border"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  View Details
                </button>
                <button
                  onClick={() => startQuote(service)}
                  className="px-5 py-2 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  {service.quoteKey ? 'Quote This Service' : 'Request a Scope'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 flex flex-wrap gap-4 justify-center">
          <button onClick={() => onNavigate('quote')} className="px-8 py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
            Get Quote
          </button>
          <button
            onClick={() => onNavigate('areas')}
            className="px-8 py-4 rounded-lg font-semibold border-2 bg-white"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            Check Coverage
          </button>
        </div>
      </div>

      {openService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setOpenService(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <openService.icon className="w-9 h-9" style={{ color: colors.primary }} />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{openService.name}</h3>
                  <div className="text-sm" style={{ color: colors.textLight }}>{openService.description}</div>
                </div>
              </div>
              <button onClick={() => setOpenService(null)} aria-label="Close service detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div style={{ color: colors.textLight }}>Typical Transit</div>
                <div className="font-semibold" style={{ color: colors.text }}>{openService.transit}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Minimum</div>
                <div className="font-semibold" style={{ color: colors.text }}>{openService.minimum}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Equipment</div>
                <div className="font-semibold" style={{ color: colors.text }}>{openService.equipment}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Rate Basis</div>
                <div className="font-semibold" style={{ color: colors.text }}>{openService.rateBasis}</div>
              </div>
            </div>

            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Included in Every Load</h4>
            <div className="space-y-2 mb-6">
              {openService.included.map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                  <span style={{ color: colors.text }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => startQuote(openService)}
                className="flex-1 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {openService.quoteKey ? `Quote ${openService.name}` : 'Request a Scope'}
              </button>
              <button
                onClick={() => { setOpenService(null); onNavigate('contact', { subject: `${openService.name} question` }) }}
                className="flex-1 py-3 rounded-lg font-semibold border"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Ask a Specialist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
