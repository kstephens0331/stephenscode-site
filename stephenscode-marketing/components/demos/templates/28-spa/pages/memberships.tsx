'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Check } from 'lucide-react'

interface MembershipsPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function MembershipsPage({ colors, onNavigate }: MembershipsPageProps) {
  const plans = [
    { name: 'Wellness', price: 149, features: ['2 treatments/month', '10% product discount', 'Priority booking', 'Wellness newsletter'] },
    { name: 'Premium', price: 299, features: ['4 treatments/month', '20% product discount', 'Complimentary upgrades', 'Guest passes', 'VIP events'] },
    { name: 'Elite', price: 599, features: ['Unlimited treatments', '30% product discount', 'Concierge service', 'Private suite access', 'Exclusive events', 'Gift certificates'] }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center font-serif" style={{ color: colors.text }}>Membership Plans</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: colors.text }}>{plan.name}</h3>
              <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>${plan.price}<span className="text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                    <span style={{ color: colors.text }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
