'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Award, Users, MapPin } from 'lucide-react'

interface AboutPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function AboutPage({ colors, onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>About Us</h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <p className="text-lg mb-6" style={{ color: colors.textLight }}>
            With over 25 years of experience in collision repair and automotive refinishing,
            Precision Auto Repair has built a reputation for excellence in quality workmanship and customer service.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accent }} />
              <h3 className="font-bold mb-2" style={{ color: colors.text }}>Certified Experts</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>I-CAR Gold Class certified technicians</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accent }} />
              <h3 className="font-bold mb-2" style={{ color: colors.text }}>5000+ Repairs</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Thousands of satisfied customers</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accent }} />
              <h3 className="font-bold mb-2" style={{ color: colors.text }}>3 Locations</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Serving the greater metro area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
