'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { X, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface CareersPageProps {
  colors: ColorPalette
  onNavigate: Navigate
}

interface Job {
  title: string
  location: string
  type: string
  pay: string
  schedule: string
  summary: string
  requirements: string[]
}

const JOBS: Job[] = [
  {
    title: 'CDL Driver',
    location: 'Multiple Locations',
    type: 'Full-time',
    pay: '$0.62 to $0.71 per mile',
    schedule: 'Regional runs, home most weekends',
    summary: 'Run dedicated regional lanes in late-model equipment with a consistent dispatcher and no-touch freight.',
    requirements: ['Class A CDL with 2 years verifiable experience', 'Clean MVR and DOT physical', 'Comfortable with electronic logs', 'Tanker or hazmat endorsement is a plus']
  },
  {
    title: 'Logistics Coordinator',
    location: 'Chicago, IL',
    type: 'Full-time',
    pay: '$54,000 to $66,000 per year',
    schedule: 'Monday to Friday, rotating on-call weekend',
    summary: 'Own a book of customer accounts end to end: tender loads, manage exceptions, and keep customers ahead of every milestone.',
    requirements: ['2 years in freight brokerage, dispatch, or 3PL operations', 'Strong written communication', 'Comfortable in a TMS and in spreadsheets', 'Calm under time pressure']
  },
  {
    title: 'Warehouse Manager',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    pay: '$78,000 to $92,000 per year',
    schedule: 'First shift with occasional Saturday coverage',
    summary: 'Lead a 40-person crew across receiving, pick and pack, and outbound at our 210,000 square foot LA distribution center.',
    requirements: ['5 years warehouse leadership experience', 'WMS and cycle counting fluency', 'OSHA and forklift certification', 'Bilingual English and Spanish is a plus']
  },
  {
    title: 'Customer Service Rep',
    location: 'Remote',
    type: 'Full-time',
    pay: '$22 to $27 per hour',
    schedule: 'Four ten-hour days, rotating shifts across 24/7 coverage',
    summary: 'Be the voice customers reach at 2am: track loads, resolve exceptions, and escalate cleanly to dispatch.',
    requirements: ['1 year in a customer support role', 'Reliable home internet and quiet workspace', 'Typing speed of 45 words per minute', 'Logistics experience preferred, not required']
  }
]

export default function CareersPage({ colors, onNavigate }: CareersPageProps) {
  const jobs = JOBS

  const [expanded, setExpanded] = useState<string | null>(null)
  const [applyingTo, setApplyingTo] = useState<Job | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submittedFor, setSubmittedFor] = useState<string | null>(null)

  const openApplication = (job: Job) => {
    setApplyingTo(job)
    setError('')
    setSubmittedFor(null)
  }

  const closeApplication = () => {
    setApplyingTo(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyingTo) return
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
          clientName: form.name,
          clientPhone: form.phone,
          clientEmail: form.email,
          service: `Job application: ${applyingTo.title} (${applyingTo.location})`,
          notes: form.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_careers_application_form',
          demo_slug: 'swift-logistics-services',
        })
        trackConversion('leadForm')

        setSubmittedFor(applyingTo.title)
        setApplyingTo(null)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setError('There was an issue submitting your application. Please try again.')
      }
    } catch {
      setError('There was an issue submitting your application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Careers</h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Join Our Team</h2>
          <p className="mb-6" style={{ color: colors.textLight }}>
            We&apos;re always looking for talented individuals to join our growing team.
            Competitive pay, great benefits, and opportunities for advancement.
          </p>

          {submittedFor && (
            <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: '#10b98115' }}>
              <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#059669' }} />
              <div>
                <div className="font-semibold" style={{ color: colors.text }}>Application received for {submittedFor}</div>
                <div className="text-sm" style={{ color: colors.textLight }}>Our hiring team will reach out within 3 business days.</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {jobs.map(job => {
              const isOpen = expanded === job.title
              return (
                <div key={job.title} className="p-6 rounded-lg border-2" style={{ borderColor: isOpen ? colors.primary : colors.border }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.textLight }}>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.pay}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setExpanded(isOpen ? null : job.title)}
                        aria-expanded={isOpen}
                        className="px-4 py-2 rounded-lg font-semibold border flex items-center gap-1"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        {isOpen ? 'Hide' : 'Details'}
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openApplication(job)}
                        className="px-6 py-2 rounded-lg font-semibold"
                        style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-5 pt-5 border-t" style={{ borderColor: colors.border }}>
                      <p className="mb-4" style={{ color: colors.textLight }}>{job.summary}</p>
                      <div className="text-sm mb-1" style={{ color: colors.textLight }}>Schedule</div>
                      <div className="font-semibold mb-4" style={{ color: colors.text }}>{job.schedule}</div>
                      <div className="text-sm mb-2" style={{ color: colors.textLight }}>What we look for</div>
                      <ul className="space-y-2">
                        {job.requirements.map(req => (
                          <li key={req} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                            <span style={{ color: colors.text }}>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: colors.border }}>
            <p className="mb-4" style={{ color: colors.textLight }}>
              Not seeing your role? Send us your background and we will keep it on file for the next opening.
            </p>
            <button
              onClick={() => onNavigate('contact', { subject: 'General career inquiry' })}
              className="px-6 py-3 rounded-lg font-semibold border"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Send a General Application
            </button>
          </div>
        </div>
      </div>

      {applyingTo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeApplication}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>Apply: {applyingTo.title}</h3>
                <div className="text-sm mt-1" style={{ color: colors.textLight }}>{applyingTo.location} | {applyingTo.type} | {applyingTo.pay}</div>
              </div>
              <button onClick={closeApplication} aria-label="Close application form" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                aria-label="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                aria-label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
              <textarea
                placeholder="Tell us about your experience"
                aria-label="Tell us about your experience"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
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
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
