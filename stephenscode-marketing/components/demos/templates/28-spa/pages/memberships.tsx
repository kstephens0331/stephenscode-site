'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Check, CheckCircle, X } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface MembershipsPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function MembershipsPage({ colors, onNavigate }: MembershipsPageProps) {
  const plans = [
    { name: 'Wellness', price: 149, features: ['2 treatments/month', '10% product discount', 'Priority booking', 'Wellness newsletter'] },
    { name: 'Premium', price: 299, features: ['4 treatments/month', '20% product discount', 'Complimentary upgrades', 'Guest passes', 'VIP events'] },
    { name: 'Elite', price: 599, features: ['Unlimited treatments', '30% product discount', 'Concierge service', 'Private suite access', 'Exclusive events', 'Gift certificates'] }
  ]

  const [joining, setJoining] = useState<null | { name: string; price: number }>(null)
  const [currentPlan, setCurrentPlan] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('spa-demo-membership')
      if (stored) {
        const membership = JSON.parse(stored)
        if (membership?.plan) setCurrentPlan(membership.plan)
      }
    } catch {
      // localStorage unavailable -- page still renders
    }
  }, [])

  const closeModal = () => {
    setJoining(null)
    setJoined(false)
    setError('')
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joining) return
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email to join.')
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
          clientPhone: '',
          clientEmail: email,
          service: `${joining.name} Membership ($${joining.price}/mo)`,
          preferredDate: '',
          preferredTime: '',
          notes: 'Membership enrollment request from spa demo'
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'spa_membership_form', demo_slug: 'serenity-spa-wellness' })
        trackConversion('leadForm')
        try {
          window.localStorage.setItem('spa-demo-membership', JSON.stringify({ plan: joining.name, since: new Date().toISOString().split('T')[0] }))
        } catch {
          // localStorage unavailable -- confirmation still shows
        }
        setCurrentPlan(joining.name)
        setJoined(true)
      } else {
        setError('We could not process your request. Please try again or call (555) 987-6543.')
      }
    } catch {
      setError('We could not process your request. Please try again or call (555) 987-6543.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center font-serif" style={{ color: colors.text }}>Membership Plans</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8 relative">
              {currentPlan === plan.name && (
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${colors.success}20`, color: colors.success }}
                >
                  Current Plan
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4 font-serif" style={{ color: colors.text }}>{plan.name}</h3>
              <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>${plan.price}<span className="text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                    <span style={{ color: colors.text }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { setJoining({ name: plan.name, price: plan.price }); setJoined(false); setError('') }}
                className="w-full py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {currentPlan === plan.name ? 'Manage Plan' : 'Join Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {joining && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold font-serif" style={{ color: colors.text }}>
                {joined ? 'Welcome to Serenity' : `Join ${joining.name} Plan`}
              </h3>
              <button onClick={closeModal} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.textLight }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {joined ? (
              <div className="p-6 text-center">
                <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: colors.success }} />
                <p className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                  You are enrolled in the {joining.name} plan.
                </p>
                <p className="mb-2" style={{ color: colors.textLight }}>
                  Our membership team will reach out to finish setting up your account and billing.
                </p>
                <p className="text-xs mb-6" style={{ color: colors.textLight }}>
                  Demo enrollment: no payment was charged.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => onNavigate('portal')}
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    Go to Member Portal
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 rounded-lg font-semibold border-2"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="p-6 space-y-4">
                <p style={{ color: colors.textLight }}>
                  {joining.name} membership: ${joining.price}/mo. Enter your details and our team will confirm your enrollment.
                </p>
                <div>
                  <label htmlFor="spa-member-name" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Your Name</label>
                  <input
                    id="spa-member-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="spa-member-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email</label>
                  <input
                    id="spa-member-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                {error && <p className="text-sm font-medium" style={{ color: colors.error }}>{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-lg font-semibold disabled:opacity-60"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  {sending ? 'Submitting...' : `Join ${joining.name}: $${joining.price}/mo`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
