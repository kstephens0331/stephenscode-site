'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { CheckCircle } from 'lucide-react'

interface PackagesPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function PackagesPage({ colors, onNavigate }: PackagesPageProps) {
  const [customPackage, setCustomPackage] = useState<string[]>([])
  const [customSummary, setCustomSummary] = useState<null | { services: string[]; total: number }>(null)
  const [customError, setCustomError] = useState('')

  const packages = [
    { name: 'Relaxation Retreat', price: 299, services: ['90-min Swedish Massage', 'Hydrating Facial', 'Body Scrub'] },
    { name: 'Ultimate Wellness', price: 499, services: ['Hot Stone Massage', 'Anti-Aging Facial', 'Body Wrap', 'Hydrotherapy'] },
    { name: 'Couples Escape', price: 699, services: ['Dual 90-min Massage', 'Champagne & Chocolates', 'Private Suite'] }
  ]

  const availableServices: { name: string; price: number }[] = [
    { name: 'Swedish Massage', price: 120 },
    { name: 'Deep Tissue', price: 140 },
    { name: 'Facial', price: 130 },
    { name: 'Body Scrub', price: 110 },
    { name: 'Hydrotherapy', price: 80 }
  ]

  const selectedTotal = availableServices
    .filter(s => customPackage.includes(s.name))
    .reduce((sum, s) => sum + s.price, 0)

  const selectPackage = (pkgName: string) => {
    try {
      window.localStorage.setItem('spa-demo-book-prefill', `${pkgName} Package`)
    } catch {
      // localStorage unavailable -- booking page still works without prefill
    }
    onNavigate('book')
  }

  const createPackage = () => {
    if (customPackage.length === 0) {
      setCustomError('Select at least one service to build your package.')
      return
    }
    setCustomError('')
    setCustomSummary({ services: [...customPackage], total: selectedTotal })
  }

  const bookCustomPackage = () => {
    if (!customSummary) return
    try {
      window.localStorage.setItem(
        'spa-demo-book-prefill',
        `Custom Package (${customSummary.services.join(' + ')}): $${customSummary.total}`
      )
    } catch {
      // localStorage unavailable -- booking page still works without prefill
    }
    onNavigate('book')
  }

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
              <button
                onClick={() => selectPackage(pkg.name)}
                className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
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
                onClick={() => {
                  setCustomSummary(null)
                  setCustomError('')
                  setCustomPackage(prev =>
                    prev.includes(service.name) ? prev.filter(s => s !== service.name) : [...prev, service.name]
                  )
                }}
                className="p-4 rounded-lg border-2 transition-all flex items-center justify-between"
                style={{
                  borderColor: customPackage.includes(service.name) ? colors.primary : colors.border,
                  backgroundColor: customPackage.includes(service.name) ? `${colors.primary}10` : 'transparent',
                  color: colors.text
                }}
              >
                <span>{service.name}</span>
                <span className="font-semibold" style={{ color: colors.primary }}>${service.price}</span>
              </button>
            ))}
          </div>
          {customSummary ? (
            <div className="rounded-lg p-6 text-center" style={{ backgroundColor: colors.backgroundAlt }}>
              <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: colors.success }} />
              <h3 className="text-xl font-bold mb-2 font-serif" style={{ color: colors.text }}>Your Custom Package</h3>
              <p className="mb-2" style={{ color: colors.text }}>{customSummary.services.join(' + ')}</p>
              <p className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>${customSummary.total}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={bookCustomPackage}
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Book This Package
                </button>
                <button
                  onClick={() => { setCustomSummary(null); setCustomPackage([]) }}
                  className="px-8 py-3 rounded-lg font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-2" style={{ color: colors.textLight }}>
                Selected: {customPackage.length} {customPackage.length === 1 ? 'service' : 'services'}
                {customPackage.length > 0 && <span className="font-semibold" style={{ color: colors.text }}> (${selectedTotal})</span>}
              </p>
              {customError && <p className="mb-2 text-sm font-medium" style={{ color: colors.error }}>{customError}</p>}
              <button
                onClick={createPackage}
                className="px-8 py-4 rounded-lg font-semibold"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                Create Package
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
