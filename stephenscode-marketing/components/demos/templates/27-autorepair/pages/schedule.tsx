'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { Calendar, CheckCircle } from 'lucide-react'

interface SchedulePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

const SERVICES = [
  'Collision Repair Inspection',
  'Paint & Refinish Quote',
  'Insurance Assessment',
  'Detailing & Cleanup'
]

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM'
]

export default function SchedulePage({ colors, onNavigate }: SchedulePageProps) {
  const [form, setForm] = useState({
    service: SERVICES[0],
    date: '',
    time: TIME_SLOTS[0],
    name: '',
    phone: '',
    email: '',
    vehicle: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState<{ ref: string } | null>(null)
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
          demoName: 'C.A.R.S Collision and Refinish Shop',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'cars-collision-refinish',
          clientName: form.name,
          clientPhone: form.phone,
          clientEmail: form.email,
          service: form.service,
          preferredDate: form.date,
          preferredTime: form.time,
          notes: form.vehicle ? `Vehicle: ${form.vehicle}` : ''
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'schedule_form',
          demo_slug: 'cars-collision-refinish'
        })
        trackConversion('leadForm')
        setConfirmation({ ref: `APT-${Math.floor(1000 + Math.random() * 9000)}` })
      } else {
        setError('There was an issue scheduling your appointment. Please call us at (555) 123-4567.')
      }
    } catch {
      setError('There was an issue scheduling your appointment. Please call us at (555) 123-4567.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
              Appointment Requested!
            </h1>
            <p className="mb-6" style={{ color: colors.textLight }}>
              Confirmation number <span className="font-bold" style={{ color: colors.accent }}>{confirmation.ref}</span>.
              We&apos;ll call to confirm your time slot shortly.
            </p>
            <div className="rounded-lg p-6 text-left mb-8" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Service</div>
                  <div style={{ color: colors.text }}>{form.service}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Date</div>
                  <div style={{ color: colors.text }}>{form.date}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Time</div>
                  <div style={{ color: colors.text }}>{form.time}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Name</div>
                  <div style={{ color: colors.text }}>{form.name}</div>
                </div>
                {form.vehicle && (
                  <div className="col-span-2">
                    <div className="font-semibold" style={{ color: colors.textLight }}>Vehicle</div>
                    <div style={{ color: colors.text }}>{form.vehicle}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => onNavigate('portal')}
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                Go to Customer Portal
              </button>
              <button
                onClick={() => {
                  setConfirmation(null)
                  setForm({ service: SERVICES[0], date: '', time: TIME_SLOTS[0], name: '', phone: '', email: '', vehicle: '' })
                }}
                className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:opacity-90"
                style={{ borderColor: colors.accent, color: colors.accent }}
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: colors.text }}>Schedule Service</h1>
        <p className="text-center mb-8 flex items-center justify-center gap-2" style={{ color: colors.textLight }}>
          <Calendar className="w-5 h-5" style={{ color: colors.accent }} />
          Pick a time that works and we&apos;ll confirm by phone
        </p>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="autorepair-schedule-service-type" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Service Type</label>
              <select
                id="autorepair-schedule-service-type"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              >
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="autorepair-schedule-date" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Preferred Date</label>
                <input
                  id="autorepair-schedule-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="autorepair-schedule-time" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Preferred Time</label>
                <select
                  id="autorepair-schedule-time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                >
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="autorepair-schedule-name" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Your Name</label>
              <input
                id="autorepair-schedule-name"
                type="text"
                required
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="autorepair-schedule-phone" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Phone</label>
                <input
                  id="autorepair-schedule-phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="autorepair-schedule-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email</label>
                <input
                  id="autorepair-schedule-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="autorepair-schedule-vehicle" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Vehicle (optional)</label>
              <input
                id="autorepair-schedule-vehicle"
                type="text"
                placeholder="2020 Toyota Camry"
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
            </div>
            {error && (
              <p className="text-sm font-medium" style={{ color: colors.error }} role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: colors.accent, color: '#ffffff' }}
            >
              {submitting ? 'Scheduling...' : 'Schedule Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
