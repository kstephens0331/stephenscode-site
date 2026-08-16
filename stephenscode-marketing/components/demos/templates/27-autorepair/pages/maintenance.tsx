'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { Check, CheckCircle, X } from 'lucide-react'

interface MaintenancePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

const PLAN_STORAGE_KEY = 'autorepair-maintenance-plan'

export default function MaintenancePage({ colors, onNavigate }: MaintenancePageProps) {
  const plans = [
    { name: 'Basic', price: 199, features: ['Annual inspection', 'Paint touch-ups', 'Detailing discount'] },
    { name: 'Premium', price: 399, features: ['Quarterly inspections', 'Unlimited touch-ups', 'Priority scheduling', 'Free detailing'] },
    { name: 'Elite', price: 699, features: ['Monthly inspections', 'Unlimited services', 'VIP support', 'Concierge service'] }
  ]

  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PLAN_STORAGE_KEY)
      if (saved) setCurrentPlan(saved)
    } catch {
      // Storage unavailable -- plan selection still works in memory
    }
  }, [])

  const openEnroll = (plan: { name: string; price: number }) => {
    setSelectedPlan(plan)
    setEnrolled(false)
    setError('')
  }

  const closeModal = () => {
    setSelectedPlan(null)
    setEnrolled(false)
    setError('')
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan) return
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
          service: `Maintenance Plan: ${selectedPlan.name} ($${selectedPlan.price}/yr)`,
          preferredDate: '',
          preferredTime: '',
          notes: `Maintenance plan enrollment request for the ${selectedPlan.name} plan`
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'maintenance_plan_form',
          demo_slug: 'cars-collision-refinish'
        })
        trackConversion('leadForm')
        setCurrentPlan(selectedPlan.name)
        try {
          window.localStorage.setItem(PLAN_STORAGE_KEY, selectedPlan.name)
        } catch {
          // Storage unavailable -- plan still active for this session
        }
        setEnrolled(true)
      } else {
        setError('There was an issue with enrollment. Please call us at (555) 123-4567.')
      }
    } catch {
      setError('There was an issue with enrollment. Please call us at (555) 123-4567.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: colors.text }}>Maintenance Plans</h1>
        <p className="text-center mb-8" style={{ color: colors.textLight }}>
          Keep your vehicle looking showroom-fresh all year. No payment due today -- we&apos;ll confirm by phone.
        </p>
        {currentPlan && (
          <div
            className="max-w-xl mx-auto mb-8 rounded-lg px-6 py-4 flex items-center justify-center gap-2 text-center"
            style={{ backgroundColor: `${colors.success}15`, border: `1px solid ${colors.success}` }}
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
            <span style={{ color: colors.text }}>
              You&apos;re enrolled in the <span className="font-bold">{currentPlan}</span> plan.
            </span>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const isCurrent = currentPlan === plan.name
            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-8"
                style={isCurrent ? { border: `2px solid ${colors.success}` } : undefined}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{plan.name}</h3>
                  {isCurrent && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${colors.success}20`, color: colors.success }}
                    >
                      Current Plan
                    </span>
                  )}
                </div>
                <div className="text-4xl font-bold mb-6" style={{ color: colors.accent }}>${plan.price}/yr</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 mt-0.5" style={{ color: colors.accent }} />
                      <span style={{ color: colors.text }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openEnroll(plan)}
                  disabled={isCurrent}
                  className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:cursor-not-allowed"
                  style={
                    isCurrent
                      ? { backgroundColor: `${colors.success}20`, color: colors.success }
                      : { backgroundColor: colors.accent, color: '#ffffff' }
                  }
                >
                  {isCurrent ? 'Enrolled' : currentPlan ? 'Switch to This Plan' : 'Subscribe'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Enrollment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                {enrolled ? 'Enrollment Confirmed' : `Enroll: ${selectedPlan.name} Plan`}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                style={{ color: colors.textLight }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              {enrolled ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: colors.success }} />
                  <p className="font-semibold mb-2" style={{ color: colors.text }}>
                    Welcome to the {selectedPlan.name} plan!
                  </p>
                  <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                    We&apos;ll call you within one business day to set up billing and schedule your first inspection.
                    Nothing has been charged today.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => {
                        closeModal()
                        onNavigate('schedule')
                      }}
                      className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                    >
                      Schedule First Inspection
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg font-semibold border-2 transition-all hover:opacity-90"
                      style={{ borderColor: colors.accent, color: colors.accent }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnroll} className="space-y-4">
                  <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className="flex items-center justify-between">
                      <span style={{ color: colors.text }}>{selectedPlan.name} Plan</span>
                      <span className="font-bold" style={{ color: colors.accent }}>${selectedPlan.price}/yr</span>
                    </div>
                    <p className="mt-1" style={{ color: colors.textLight }}>
                      No payment due today. We confirm details by phone before billing.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="autorepair-plan-name" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Your Name</label>
                    <input
                      id="autorepair-plan-name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  <div>
                    <label htmlFor="autorepair-plan-phone" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Phone</label>
                    <input
                      id="autorepair-plan-phone"
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                  <div>
                    <label htmlFor="autorepair-plan-email" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Email</label>
                    <input
                      id="autorepair-plan-email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border"
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
                    className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                  >
                    {submitting ? 'Enrolling...' : 'Confirm Enrollment'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
