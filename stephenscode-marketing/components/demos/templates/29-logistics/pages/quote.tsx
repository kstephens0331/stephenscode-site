'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { Calculator, CheckCircle } from 'lucide-react'

interface QuotePageProps {
  colors: ColorPalette
  onNavigate: Navigate
  initialService?: string
}

const SERVICE_LABELS: Record<string, string> = {
  ground: 'Ground Freight',
  air: 'Air Freight',
  ocean: 'Ocean Freight'
}

/** Floor price per service so short lanes still quote a realistic number */
const MINIMUM_CHARGE: Record<string, number> = {
  ground: 185,
  air: 340,
  ocean: 210
}

export default function QuotePage({ colors, onNavigate, initialService }: QuotePageProps) {
  const [quote, setQuote] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    service: initialService && initialService in SERVICE_LABELS ? initialService : 'ground',
    weight: '',
    distance: '',
    expedited: false
  })
  const [showBooking, setShowBooking] = useState(false)
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', pickupDate: '' })
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [calcError, setCalcError] = useState('')
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const calculateQuote = () => {
    const weight = parseFloat(formData.weight) || 0
    const distance = parseFloat(formData.distance) || 0

    if (weight <= 0 || distance <= 0) {
      setCalcError('Enter a weight and a distance greater than zero to price this lane.')
      setQuote(null)
      return
    }

    setCalcError('')
    let base = 0

    if (formData.service === 'ground') base = weight * 0.50 + distance * 0.80
    else if (formData.service === 'air') base = weight * 2.50 + distance * 1.50
    else if (formData.service === 'ocean') base = weight * 0.30 + distance * 0.40

    if (formData.expedited) base *= 1.5

    setQuote(Math.max(MINIMUM_CHARGE[formData.service] ?? 185, Math.round(base)))
    setShowBooking(false)
    setConfirmation(null)
  }

  const resetQuote = () => {
    setQuote(null)
    setConfirmation(null)
    setShowBooking(false)
    setCalcError('')
    setFormData({ service: 'ground', weight: '', distance: '', expedited: false })
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setBookingError('')

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Swift Logistics Services',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'swift-logistics-services',
          clientName: booking.name,
          clientPhone: booking.phone,
          clientEmail: booking.email,
          service: `${SERVICE_LABELS[formData.service]} shipment booking (quoted $${quote})`,
          preferredDate: booking.pickupDate,
          notes: `Weight: ${formData.weight || '0'} lbs, Distance: ${formData.distance || '0'} miles, Expedited: ${formData.expedited ? 'Yes' : 'No'}`
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_quote_booking_form',
          demo_slug: 'swift-logistics-services',
        })
        trackConversion('leadForm')

        setConfirmation(`SLS-B${Date.now().toString().slice(-6)}`)
        setShowBooking(false)
        setBooking({ name: '', email: '', phone: '', pickupDate: '' })
      } else {
        setBookingError('There was an issue submitting your booking. Please try again or call (555) 246-8135.')
      }
    } catch {
      setBookingError('There was an issue submitting your booking. Please try again or call (555) 246-8135.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Get Instant Quote</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="logistics-quote-service" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Service Type</label>
              <select
                id="logistics-quote-service"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="ground">Ground Freight</option>
                <option value="air">Air Freight</option>
                <option value="ocean">Ocean Freight</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="logistics-quote-weight" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Weight (lbs)</label>
                <input
                  id="logistics-quote-weight"
                  type="number"
                  placeholder="1000"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="logistics-quote-distance" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Distance (miles)</label>
                <input
                  id="logistics-quote-distance"
                  type="number"
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="expedited"
                checked={formData.expedited}
                onChange={(e) => setFormData({ ...formData, expedited: e.target.checked })}
                className="w-5 h-5"
              />
              <label htmlFor="expedited" className="text-sm font-medium" style={{ color: colors.text }}>
                Expedited Delivery (+50%)
              </label>
            </div>

            <button
              onClick={calculateQuote}
              className="w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              <Calculator className="w-5 h-5" />
              Calculate Quote
            </button>

            {calcError && (
              <p className="text-sm text-center" style={{ color: '#dc2626' }}>{calcError}</p>
            )}

            {confirmation && (
              <div className="mt-6 p-6 rounded-lg text-center" style={{ backgroundColor: '#10b98110', border: '2px solid #10b981' }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#059669' }} />
                <div className="text-xl font-bold mb-2" style={{ color: colors.text }}>Shipment Booked!</div>
                <div className="mb-2" style={{ color: colors.textLight }}>
                  Your booking reference is <span className="font-bold" style={{ color: colors.text }}>{confirmation}</span>
                </div>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  A dispatch coordinator will confirm pickup details with you shortly.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => onNavigate('track', { tracking: confirmation })}
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    Track This Booking
                  </button>
                  <button
                    onClick={resetQuote}
                    className="px-6 py-3 rounded-lg font-semibold border bg-white"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Start Another Quote
                  </button>
                </div>
              </div>
            )}

            {quote !== null && !confirmation && (
              <div className="mt-6 p-6 rounded-lg text-center" style={{ backgroundColor: `${colors.primary}10`, border: `2px solid ${colors.primary}` }}>
                <div className="text-sm font-medium mb-2" style={{ color: colors.text }}>Estimated Cost</div>
                <div className="text-5xl font-bold mb-4" style={{ color: colors.primary }}>${quote}</div>
                {!showBooking ? (
                  <button
                    onClick={() => setShowBooking(true)}
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    Book Shipment
                  </button>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="text-left space-y-4 mt-2">
                    <h3 className="text-lg font-bold text-center" style={{ color: colors.text }}>Book This Shipment</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        aria-label="Your Name"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border bg-white"
                        style={{ borderColor: colors.border }}
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        aria-label="Your Email"
                        value={booking.email}
                        onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border bg-white"
                        style={{ borderColor: colors.border }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        aria-label="Phone"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border bg-white"
                        style={{ borderColor: colors.border }}
                      />
                      <input
                        type="date"
                        required
                        aria-label="Preferred pickup date"
                        value={booking.pickupDate}
                        onChange={(e) => setBooking({ ...booking, pickupDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border bg-white"
                        style={{ borderColor: colors.border }}
                      />
                    </div>
                    {bookingError && (
                      <p className="text-sm text-center" style={{ color: '#dc2626' }}>{bookingError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-lg font-semibold disabled:opacity-60"
                      style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                    >
                      {submitting ? 'Booking...' : `Confirm Booking ($${quote})`}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowBooking(false); setBookingError('') }}
                      className="w-full py-2 rounded-lg text-sm font-medium"
                      style={{ color: colors.textLight }}
                    >
                      Back to estimate
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
