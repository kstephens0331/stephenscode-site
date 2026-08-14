'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface ContactPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ContactPage({ colors, onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'C.A.R.S Collision and Refinish Shop',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'cars-collision-refinish',
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
          form_name: 'contact_form',
          demo_slug: 'cars-collision-refinish',
        })
        trackConversion('leadForm')
        setSubmitted(true)
      } else {
        alert('There was an issue sending your message. Please call us at (555) 123-4567')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('There was an issue sending your message. Please call us at (555) 123-4567')
    } finally {
      setSubmitting(false)
    }
  }

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
            {submitted ? (
              <div className="text-center py-8">
                <p className="font-semibold" style={{ color: colors.text }}>Thank you! Your message has been sent.</p>
                <p className="text-sm mt-2" style={{ color: colors.textLight }}>We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  aria-label="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <textarea
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                  style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
