'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Truck, MapPin, BarChart3, Shield, Clock, Globe } from 'lucide-react'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function HomePage({ colors, onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Fast, Reliable Logistics Solutions
              </h1>
              <p className="text-xl mb-8 text-white opacity-90">
                Real-time tracking, competitive rates, and exceptional service for all your shipping needs
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.accent, color: colors.text }}
                >
                  Get Instant Quote
                </button>
                <button
                  onClick={() => onNavigate('track')}
                  className="px-8 py-4 rounded-lg font-semibold border-2 border-white text-white transition-all hover:bg-white hover:text-gray-900"
                >
                  Track Shipment
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, label: 'Fleet', value: '500+' },
                { icon: Globe, label: 'Countries', value: '45+' },
                { icon: Clock, label: 'On-Time', value: '99.2%' },
                { icon: Shield, label: 'Insured', value: '$5M' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                  <stat.icon className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Premium Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <button onClick={() => onNavigate('track')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <MapPin className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Real-Time Tracking</h3>
              <p style={{ color: colors.textLight }}>Track shipments with live GPS updates and delivery notifications</p>
            </button>
            <button onClick={() => onNavigate('portal')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <BarChart3 className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Analytics Portal</h3>
              <p style={{ color: colors.textLight }}>Comprehensive reporting and shipment history management</p>
            </button>
            <button onClick={() => onNavigate('quote')} className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-left">
              <Truck className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Instant Quotes</h3>
              <p style={{ color: colors.textLight }}>Get competitive pricing with our advanced calculator</p>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Premium Build - $2,000 Value</h2>
            <p className="text-xl mb-8 opacity-90">Complete logistics management platform</p>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
              {['10 fully functional pages', 'Real-time tracking system', 'Customer portal dashboard', 'Quote calculator tool', 'Analytics & reporting', 'Service area mapping'].map((feature, i) => (
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
