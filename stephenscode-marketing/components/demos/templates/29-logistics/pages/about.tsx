'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Award, Truck, Users } from 'lucide-react'

interface AboutPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function AboutPage({ colors, onNavigate }: AboutPageProps) {
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
            {[
              { icon: Truck, label: 'Modern Fleet', value: '500+ Vehicles' },
              { icon: Users, label: 'Expert Team', value: '1,200+ Staff' },
              { icon: Award, label: 'Industry Leader', value: 'ISO 9001 Certified' }
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="text-center p-6">
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>{label}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
