'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface ReservationsPageProps {
  colors: ColorPalette
}

export default function ReservationsPage({ colors }: ReservationsPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '5:00 PM',
    partySize: '2 Guests',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Gourmet Kitchen Restaurant',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'gourmet-kitchen-restaurant',
          clientName: `${formData.firstName} ${formData.lastName}`.trim(),
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.partySize,
          preferredDate: formData.date,
          preferredTime: formData.time,
          notes: formData.notes
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'reservation_form',
          demo_slug: 'gourmet-kitchen-restaurant',
        })
        trackConversion('leadForm')
        setSubmitted(true)
      } else {
        setSubmitError('There was an issue confirming your reservation. Please call us at (312) 555-FOOD.')
      }
    } catch {
      setSubmitError('There was an issue confirming your reservation. Please call us at (312) 555-FOOD.')
    }
  }

  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Reserve Your Table
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">
            Book Your Dining Experience
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Secure your table for an unforgettable evening. Reservations recommended for dinner service.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-6">
                Make a Reservation
              </h2>
              {submitted ? (
                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #22c55e' }} className="p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-2">Reservation Requested!</h3>
                  <p style={{ color: '#666666' }}>
                    We've received your request and will confirm shortly.
                  </p>
                </div>
              ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="restaurant-reservation-first-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">First Name *</label>
                    <input
                      id="restaurant-reservation-first-name"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant-reservation-last-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Last Name *</label>
                    <input
                      id="restaurant-reservation-last-name"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="restaurant-reservation-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                    <input
                      id="restaurant-reservation-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant-reservation-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                    <input
                      id="restaurant-reservation-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="restaurant-reservation-date" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Date *</label>
                    <input
                      id="restaurant-reservation-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurant-reservation-time" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Time *</label>
                    <select
                      id="restaurant-reservation-time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    >
                      <option>5:00 PM</option>
                      <option>5:30 PM</option>
                      <option>6:00 PM</option>
                      <option>6:30 PM</option>
                      <option>7:00 PM</option>
                      <option>7:30 PM</option>
                      <option>8:00 PM</option>
                      <option>8:30 PM</option>
                      <option>9:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="restaurant-reservation-party-size" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Party Size *</label>
                    <select
                      id="restaurant-reservation-party-size"
                      required
                      value={formData.partySize}
                      onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                      <option>7+ Guests</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="restaurant-reservation-notes" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Special Requests</label>
                  <textarea
                    id="restaurant-reservation-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900 h-24"
                    placeholder="Birthday, anniversary, dietary restrictions, seating preferences..."
                  />
                </div>
                {submitError && (
                  <div style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444', color: '#991b1b' }} className="p-4 text-sm font-bold">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Confirm Reservation
                </button>
              </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-6">
                Reservation Policies
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Dining Hours</h3>
                  <div style={{ color: '#666666' }} className="space-y-1">
                    <div>Monday - Thursday: 5:00 PM - 10:00 PM</div>
                    <div>Friday - Saturday: 5:00 PM - 11:00 PM</div>
                    <div>Sunday: 4:00 PM - 9:00 PM</div>
                  </div>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Cancellation Policy</h3>
                  <p style={{ color: '#666666' }}>
                    Please provide 24 hours notice for cancellations. Parties of 6 or more require
                    a credit card to hold the reservation.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Large Parties</h3>
                  <p style={{ color: '#666666' }}>
                    For parties of 8 or more, please call us directly at (312) 555-FOOD to arrange
                    a private dining experience or prix fixe menu.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Dress Code</h3>
                  <p style={{ color: '#666666' }}>
                    Business casual or smart casual attire preferred. We want you to feel comfortable
                    while maintaining our upscale atmosphere.
                  </p>
                </div>
                <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #ee9b00' }} className="p-6">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">
                    Walk-ins Welcome
                  </h3>
                  <p style={{ color: '#666666' }}>
                    We always try to accommodate walk-in guests! Bar seating is first-come,
                    first-served with full menu service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
