'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Truck, Plane, Ship, Package } from 'lucide-react'

interface ServicesPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ServicesPage({ colors, onNavigate }: ServicesPageProps) {
  const services = [
    { icon: Truck, name: 'Ground Freight', description: 'Reliable truck shipping across North America', features: ['LTL & FTL', 'Temperature controlled', 'Expedited options'] },
    { icon: Plane, name: 'Air Freight', description: 'Fast international air cargo services', features: ['Next-day delivery', 'Global coverage', 'Customs clearance'] },
    { icon: Ship, name: 'Ocean Freight', description: 'Cost-effective sea shipping worldwide', features: ['Container shipping', 'Port-to-port', 'Door-to-door'] },
    { icon: Package, name: 'Warehousing', description: 'Secure storage and distribution', features: ['Climate controlled', 'Inventory management', 'Pick & pack'] }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <service.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>{service.name}</h3>
              <p className="mb-4" style={{ color: colors.textLight }}>{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: colors.primary }}>•</span>
                    <span style={{ color: colors.text }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('quote')} className="px-8 py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
            Get Quote
          </button>
        </div>
      </div>
    </div>
  )
}
