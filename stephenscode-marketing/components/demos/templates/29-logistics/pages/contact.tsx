'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

interface ContactPageProps {
  colors: ColorPalette
  onNavigate: Navigate
  initialSubject?: string
}

const SUBJECTS = [
  'New shipment quote',
  'Existing shipment status',
  'Warehousing and distribution',
  'Billing or claims',
  'Partnership or carrier setup'
]

export default function ContactPage({ colors, onNavigate, initialSubject }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject || SUBJECTS[0],
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Swift Logistics Services',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'swift-logistics-services',
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.subject,
          preferredDate: '',
          preferredTime: '',
          notes: formData.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_contact_form',
          demo_slug: 'swift-logistics-services',
        })
        trackConversion('leadForm')

        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
      } else {
        setError('There was an issue sending your message. Please try again or call us at (555) 246-8135.')
      }
    } catch {
      setError('There was an issue sending your message. Please try again or call us at (555) 246-8135.')
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
                <MapPin className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Headquarters</div>
                  <div style={{ color: colors.textLight }}>789 Logistics Blvd, Freight City, FC 67890</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Phone</div>
                  <a href="tel:5552468135" className="underline" style={{ color: colors.primary }}>(555) 246-8135</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Email</div>
                  <a href="mailto:info@swiftlogistics.com" className="underline" style={{ color: colors.primary }}>info@swiftlogistics.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                <div>
                  <div className="font-semibold" style={{ color: colors.text }}>Hours</div>
                  <div style={{ color: colors.textLight }}>24/7 Customer Support</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
              <div className="text-sm mb-3" style={{ color: colors.textLight }}>Need something right now?</div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('track')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  Track a Shipment
                </button>
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                >
                  Price a Lane
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Send Message</h2>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: '#059669' }} />
                <p className="text-lg font-semibold" style={{ color: colors.text }}>Thank you! Your message has been sent.</p>
                <p className="text-sm mt-2" style={{ color: colors.textLight }}>
                  A coordinator replies within one business hour, 24 hours a day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  aria-label="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  aria-label="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  aria-label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
                <select
                  aria-label="What is this about"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-white"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  {(SUBJECTS.includes(formData.subject) ? SUBJECTS : [formData.subject, ...SUBJECTS]).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
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
                {error && <p className="text-sm" style={{ color: '#dc2626' }}>{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg font-semibold disabled:opacity-60"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
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
