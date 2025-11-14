'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Award, Users, Heart } from 'lucide-react'

interface AboutPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function AboutPage({ colors, onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>About Serenity Spa</h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <p className="text-lg mb-6" style={{ color: colors.textLight }}>
            For over 15 years, Serenity Spa & Wellness has been a haven of tranquility and rejuvenation.
            Our holistic approach combines ancient healing traditions with modern wellness techniques.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Award Winning</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Best Spa 2023</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Expert Team</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>20+ certified therapists</p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>10K+ Clients</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Happy and relaxed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
