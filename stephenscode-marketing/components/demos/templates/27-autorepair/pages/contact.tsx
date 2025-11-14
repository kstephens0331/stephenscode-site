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
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" style={{ color: colors.accent }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Main Location</div>
                  <div style={{ color: colors.textLight }}>123 Auto Repair Lane, City, ST 12345</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1" style={{ color: colors.accent }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Phone</div>
                  <div style={{ color: colors.textLight }}>(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1" style={{ color: colors.accent }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Email</div>
                  <div style={{ color: colors.textLight }}>info@precisionautorepair.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1" style={{ color: colors.accent }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Hours</div>
                  <div style={{ color: colors.textLight }}>Mon-Fri: 8AM-6PM, Sat: 9AM-3PM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Send Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
              <button type="submit" className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.accent, color: '#ffffff' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
