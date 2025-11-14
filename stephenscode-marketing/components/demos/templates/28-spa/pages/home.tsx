'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Sparkles, Gift, Calendar, Star, Users, Award } from 'lucide-react'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function HomePage({ colors, onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white font-serif">
            Your Sanctuary of Wellness
          </h1>
          <p className="text-xl mb-8 text-white opacity-90 max-w-2xl mx-auto">
            Experience luxury spa treatments, holistic wellness programs, and personalized care
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('book')}
              className="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.accent, color: colors.text }}
            >
              Book Appointment
            </button>
            <button
              onClick={() => onNavigate('packages')}
              className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white transition-all hover:bg-white hover:text-gray-900"
            >
              View Packages
            </button>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif" style={{ color: colors.text }}>
            Premium Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <button onClick={() => onNavigate('book')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <Calendar className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: colors.text }}>Online Booking</h3>
              <p style={{ color: colors.textLight }}>Book treatments with your preferred therapist anytime</p>
            </button>
            <button onClick={() => onNavigate('memberships')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <Award className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: colors.text }}>Memberships</h3>
              <p style={{ color: colors.textLight }}>Exclusive member benefits and unlimited access</p>
            </button>
            <button onClick={() => onNavigate('gifts')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <Gift className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: colors.text }}>Gift Certificates</h3>
              <p style={{ color: colors.textLight }}>Perfect gift for someone special</p>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4 font-serif">Premium Build - $2,000 Value</h2>
            <p className="text-xl mb-8 opacity-90">Complete spa and wellness business solution</p>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
              {['10 fully functional pages', 'Member portal dashboard', 'Advanced booking system', 'Package builder tool', 'Gift certificate system', 'Product e-commerce'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
