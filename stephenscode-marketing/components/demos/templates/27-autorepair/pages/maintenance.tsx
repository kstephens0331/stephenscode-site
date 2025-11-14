'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Shield, Check } from 'lucide-react'

interface MaintenancePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function MaintenancePage({ colors, onNavigate }: MaintenancePageProps) {
  const plans = [
    { name: 'Basic', price: 199, features: ['Annual inspection', 'Paint touch-ups', 'Detailing discount'] },
    { name: 'Premium', price: 399, features: ['Quarterly inspections', 'Unlimited touch-ups', 'Priority scheduling', 'Free detailing'] },
    { name: 'Elite', price: 699, features: ['Monthly inspections', 'Unlimited services', 'VIP support', 'Concierge service'] }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Maintenance Plans</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>{plan.name}</h3>
              <div className="text-4xl font-bold mb-6" style={{ color: colors.accent }}>${plan.price}/yr</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: colors.accent }} />
                    <span style={{ color: colors.text }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.accent, color: '#ffffff' }}>
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
