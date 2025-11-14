'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Wrench, Paintbrush, Shield, Sparkles } from 'lucide-react'

interface ServicesPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ServicesPage({ colors, onNavigate }: ServicesPageProps) {
  const services = [
    { icon: Wrench, name: 'Collision Repair', description: 'Expert frame and body repair for all damage types', price: 'From $800' },
    { icon: Paintbrush, name: 'Paint & Refinish', description: 'Professional color matching and refinishing services', price: 'From $600' },
    { icon: Shield, name: 'Insurance Claims', description: 'Full assistance with insurance claim processing', price: 'No Extra Cost' },
    { icon: Sparkles, name: 'Detailing & Cleanup', description: 'Complete interior and exterior detailing', price: 'From $150' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <service.icon className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>{service.name}</h3>
              <p className="mb-4" style={{ color: colors.textLight }}>{service.description}</p>
              <div className="text-lg font-semibold" style={{ color: colors.accent }}>{service.price}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('estimate')}
            className="px-8 py-4 rounded-lg font-semibold"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Get Free Estimate
          </button>
        </div>
      </div>
    </div>
  )
}
