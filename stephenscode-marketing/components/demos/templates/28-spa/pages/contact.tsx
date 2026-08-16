'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface ContactPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ContactPage({ colors, onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setError('')

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Serenity Spa & Wellness',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'serenity-spa-wellness',
          clientName: formData.name,
          clientPhone: '',
          clientEmail: formData.email,
          service: '',
          preferredDate: '',
          preferredTime: '',
          notes: formData.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'contact_page_form',
          demo_slug: 'serenity-spa-wellness',
        })
        trackConversion('leadForm')

        setSubmitted(true)
      } else {
        setError('There was an issue sending your message. Please try again or call us at (555) 987-6543.')
      }
    } catch {
      setError('There was an issue sending your message. Please try again or call us at (555) 987-6543.')
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Visit Us</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Location', value: '456 Wellness Way, Spa City, SC 54321' },
                { icon: Phone, label: 'Phone', value: '(555) 987-6543' },
                { icon: Mail, label: 'Email', value: 'hello@serenityspa.com' },
                { icon: Clock, label: 'Hours', value: 'Mon-Sun: 9AM-8PM' }
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
            <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Send Message</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-lg font-semibold" style={{ color: colors.text }}>Thank you! Your message has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  aria-label="Your Name"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  aria-label="Your Email"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                {error && <p className="text-sm font-medium" style={{ color: colors.error }}>{error}</p>}
                <button type="submit" className="w-full py-3 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
