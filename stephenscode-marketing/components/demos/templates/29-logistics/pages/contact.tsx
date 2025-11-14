'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface ContactPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ContactPage({ colors, onNavigate }: ContactPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Get in Touch</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Headquarters', value: '789 Logistics Blvd, Freight City, FC 67890' },
                { icon: Phone, label: 'Phone', value: '(555) 246-8135' },
                { icon: Mail, label: 'Email', value: 'info@swiftlogistics.com' },
                { icon: Clock, label: 'Hours', value: '24/7 Customer Support' }
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                  <div>
                    <div className="font-semibold" style={{ color: colors.text }}>{label}</div>
                    <div style={{ color: colors.textLight }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Send Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <button type="submit" className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
