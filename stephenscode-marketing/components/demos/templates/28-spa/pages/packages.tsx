'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'

interface PackagesPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function PackagesPage({ colors, onNavigate }: PackagesPageProps) {
  const [customPackage, setCustomPackage] = useState<string[]>([])

  const packages = [
    { name: 'Relaxation Retreat', price: 299, services: ['90-min Swedish Massage', 'Hydrating Facial', 'Body Scrub'] },
    { name: 'Ultimate Wellness', price: 499, services: ['Hot Stone Massage', 'Anti-Aging Facial', 'Body Wrap', 'Hydrotherapy'] },
    { name: 'Couples Escape', price: 699, services: ['Dual 90-min Massage', 'Champagne & Chocolates', 'Private Suite'] }
  ]

  const availableServices = ['Swedish Massage', 'Deep Tissue', 'Facial', 'Body Scrub', 'Hydrotherapy']

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center font-serif" style={{ color: colors.text }}>Wellness Packages</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: colors.text }}>{pkg.name}</h3>
              <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>${pkg.price}</div>
              <ul className="space-y-2 mb-6">
                {pkg.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: colors.primary }}>•</span>
                    <span style={{ color: colors.text }}>{service}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                Select Package
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Build Custom Package</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {availableServices.map((service, idx) => (
              <button
                key={idx}
                onClick={() => setCustomPackage(prev =>
                  prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
                )}
                className="p-4 rounded-lg border-2 transition-all"
                style={{
                  borderColor: customPackage.includes(service) ? colors.primary : colors.border,
                  backgroundColor: customPackage.includes(service) ? `${colors.primary}10` : 'transparent'
                }}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="mb-4" style={{ color: colors.textLight }}>Selected: {customPackage.length} services</p>
            <button className="px-8 py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.accent, color: colors.text }}>
              Create Package
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
