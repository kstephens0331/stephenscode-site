'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { CheckCircle } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface BookPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

const BASE_TREATMENTS = [
  'Swedish Massage (60 min): $120',
  'Swedish Massage (90 min): $170',
  'Deep Tissue Massage (60 min): $140',
  'Deep Tissue Massage (90 min): $190',
  'Hot Stone Massage (90 min): $200',
  'Hydrating Facial (60 min): $130',
  'Anti-Aging Facial (75 min): $160',
  'Microdermabrasion (45 min): $150',
  'Body Scrub (50 min): $110',
  'Body Wrap (60 min): $140',
  'Hydrotherapy (30 min): $80',
  'Relaxation Retreat Package: $299',
  'Ultimate Wellness Package: $499',
  'Couples Escape Package: $699'
]

interface StoredBooking {
  id: string
  service: string
  therapist: string
  date: string
  time: string
}

const THERAPISTS = ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'David Martinez']
const TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']

export default function BookPage({ colors, onNavigate }: BookPageProps) {
  const therapists = THERAPISTS
  const times = TIMES

  const [treatments, setTreatments] = useState<string[]>(BASE_TREATMENTS)
  const [treatment, setTreatment] = useState('')
  const [therapist, setTherapist] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [confirmed, setConfirmed] = useState<null | { treatment: string; therapist: string; date: string; time: string; ref: string }>(null)
  const [reschedulingId, setReschedulingId] = useState('')

  useEffect(() => {
    try {
      const prefill = window.localStorage.getItem('spa-demo-book-prefill')
      if (prefill) {
        window.localStorage.removeItem('spa-demo-book-prefill')
        const match = BASE_TREATMENTS.find(t => t.toLowerCase().startsWith(prefill.toLowerCase()))
        if (match) {
          setTreatment(match)
        } else {
          setTreatments([prefill, ...BASE_TREATMENTS])
          setTreatment(prefill)
        }
      }

      const therapistPrefill = window.localStorage.getItem('spa-demo-book-therapist')
      if (therapistPrefill) {
        window.localStorage.removeItem('spa-demo-book-therapist')
        if (THERAPISTS.includes(therapistPrefill)) setTherapist(therapistPrefill)
      }

      // Reschedule handoff from the member portal. The original appointment stays
      // on file until this new booking is confirmed, so nothing is lost if the
      // visitor changes their mind and leaves.
      const rescheduleId = window.localStorage.getItem('spa-demo-reschedule-id')
      if (rescheduleId) {
        window.localStorage.removeItem('spa-demo-reschedule-id')
        setReschedulingId(rescheduleId)
      }
    } catch {
      // localStorage unavailable -- form still works without prefill
    }
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!treatment || !therapist || !date || !time || !name.trim() || !email.trim()) {
      setError('Please choose a treatment, therapist, date and time, and enter your name and email.')
      return
    }
    setError('')
    setSending(true)
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Serenity Spa & Wellness',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'serenity-spa-wellness',
          clientName: name,
          clientPhone: phone,
          clientEmail: email,
          service: treatment,
          preferredDate: date,
          preferredTime: time,
          notes: reschedulingId
            ? `Requested therapist: ${therapist}. Reschedule of appointment ${reschedulingId}.`
            : `Requested therapist: ${therapist}`
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'spa_booking_form', demo_slug: 'serenity-spa-wellness' })
        trackConversion('leadForm')
        const ref = `SPA-${Math.floor(1000 + Math.random() * 9000)}`
        try {
          const stored = window.localStorage.getItem('spa-demo-bookings')
          let bookings: StoredBooking[] = stored ? JSON.parse(stored) : []
          if (reschedulingId) {
            bookings = bookings.filter(b => b.id !== reschedulingId)
          }
          bookings.push({ id: ref, service: treatment, therapist, date, time })
          window.localStorage.setItem('spa-demo-bookings', JSON.stringify(bookings))
        } catch {
          // localStorage unavailable -- confirmation still shows
        }
        setReschedulingId('')
        setConfirmed({ treatment, therapist, date, time, ref })
      } else {
        setError('We could not send your booking request. Please try again or call (555) 987-6543.')
      }
    } catch {
      setError('We could not send your booking request. Please try again or call (555) 987-6543.')
    } finally {
      setSending(false)
    }
  }

  const resetForm = () => {
    setConfirmed(null)
    setTreatment('')
    setTherapist('')
    setDate('')
    setTime('')
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Book Appointment</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          {confirmed ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
              <h2 className="text-2xl font-bold mb-2 font-serif" style={{ color: colors.text }}>Booking Requested</h2>
              <p className="mb-6" style={{ color: colors.textLight }}>
                Confirmation #{confirmed.ref}. We will reach out shortly to confirm your appointment.
              </p>
              <div className="rounded-lg p-6 text-left max-w-md mx-auto mb-8" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textLight }}>Treatment</span>
                    <span className="font-semibold text-right" style={{ color: colors.text }}>{confirmed.treatment}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textLight }}>Therapist</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{confirmed.therapist}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textLight }}>Date</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{confirmed.date}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textLight }}>Time</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{confirmed.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => onNavigate('portal')}
                  className="px-6 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  View in Member Portal
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Book Another Treatment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {reschedulingId && (
                <div className="px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: `${colors.primary}12`, color: colors.primary }}>
                  Rescheduling appointment {reschedulingId}. Your original time stays reserved until you confirm the new one.
                </div>
              )}
              <div>
                <label htmlFor="spa-book-treatment" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Treatment</label>
                <select
                  id="spa-book-treatment"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <option value="">Choose a treatment...</option>
                  {treatments.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Therapist</label>
                <div className="grid grid-cols-2 gap-3">
                  {therapists.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTherapist(t)}
                      className="p-3 rounded-lg border-2 transition-all"
                      style={{
                        borderColor: therapist === t ? colors.primary : colors.border,
                        backgroundColor: therapist === t ? `${colors.primary}15` : 'transparent',
                        color: therapist === t ? colors.primary : colors.text,
                        fontWeight: therapist === t ? 600 : 400
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="spa-book-date" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Date</label>
                <input
                  id="spa-book-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border, color: colors.text }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Time</label>
                <div className="grid grid-cols-3 gap-3">
                  {times.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className="p-3 rounded-lg border-2 transition-all"
                      style={{
                        borderColor: time === t ? colors.primary : colors.border,
                        backgroundColor: time === t ? `${colors.primary}15` : 'transparent',
                        color: time === t ? colors.primary : colors.text,
                        fontWeight: time === t ? 600 : 400
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="spa-book-name" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Your Name</label>
                  <input
                    id="spa-book-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="spa-book-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email</label>
                  <input
                    id="spa-book-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="spa-book-phone" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Phone (optional)</label>
                  <input
                    id="spa-book-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm font-medium" style={{ color: colors.error }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-lg font-semibold disabled:opacity-60"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {sending ? 'Sending Request...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
