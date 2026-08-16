'use client'

import { useRef, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { Shield, Upload, CheckCircle, X, FileImage } from 'lucide-react'

interface InsurancePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function InsurancePage({ colors, onNavigate }: InsurancePageProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    policy: '',
    claim: '',
    description: ''
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState<{ ref: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const names = Array.from(files).map(f => f.name)
    setPhotos(prev => [...prev, ...names])
  }

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx))
  }

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
          service: 'Insurance Claim Assistance',
          preferredDate: '',
          preferredTime: '',
          notes: [
            `Insurance company: ${form.company}`,
            `Policy number: ${form.policy}`,
            form.claim ? `Claim number: ${form.claim}` : '',
            form.description ? `Damage description: ${form.description}` : '',
            photos.length > 0 ? `Photos attached: ${photos.length}` : ''
          ].filter(Boolean).join(' | ')
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'insurance_claim_form',
          demo_slug: 'cars-collision-refinish'
        })
        trackConversion('leadForm')
        setConfirmation({ ref: `CLM-${Math.floor(10000 + Math.random() * 90000)}` })
      } else {
        setError('There was an issue submitting your claim. Please call us at (555) 123-4567.')
      }
    } catch {
      setError('There was an issue submitting your claim. Please call us at (555) 123-4567.')
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
              Claim Submitted!
            </h1>
            <p className="mb-6" style={{ color: colors.textLight }}>
              Your claim reference is <span className="font-bold" style={{ color: colors.accent }}>{confirmation.ref}</span>.
              Our insurance team will contact you within one business day to coordinate with {form.company || 'your insurer'} on your behalf.
            </p>
            <div className="rounded-lg p-6 text-left mb-8" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Name</div>
                  <div style={{ color: colors.text }}>{form.name}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Insurance Company</div>
                  <div style={{ color: colors.text }}>{form.company}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Policy Number</div>
                  <div style={{ color: colors.text }}>{form.policy}</div>
                </div>
                <div>
                  <div className="font-semibold" style={{ color: colors.textLight }}>Photos Attached</div>
                  <div style={{ color: colors.text }}>{photos.length}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => onNavigate('schedule')}
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                Schedule Inspection
              </button>
              <button
                onClick={() => {
                  setConfirmation(null)
                  setForm({ name: '', phone: '', email: '', company: '', policy: '', claim: '', description: '' })
                  setPhotos([])
                }}
                className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:opacity-90"
                style={{ borderColor: colors.accent, color: colors.accent }}
              >
                File Another Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Insurance Claims</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{ color: colors.text }}>
            <Shield className="w-6 h-6" style={{ color: colors.accent }} />
            File Insurance Claim
          </h2>
          <p className="text-sm mb-6" style={{ color: colors.textLight }}>
            We work directly with all major insurance carriers so you don&apos;t have to chase paperwork.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="autorepair-insurance-name" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Your Name</label>
                <input
                  id="autorepair-insurance-name"
                  type="text"
                  required
                  placeholder="John Smith"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="autorepair-insurance-phone" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Phone</label>
                <input
                  id="autorepair-insurance-phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="autorepair-insurance-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email</label>
              <input
                id="autorepair-insurance-email"
                type="email"
                required
                placeholder="you@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <label htmlFor="autorepair-insurance-company" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Insurance Company</label>
              <input
                id="autorepair-insurance-company"
                type="text"
                required
                placeholder="State Farm, GEICO, Progressive..."
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="autorepair-insurance-policy" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Policy Number</label>
                <input
                  id="autorepair-insurance-policy"
                  type="text"
                  required
                  placeholder="POL-0012345"
                  value={form.policy}
                  onChange={e => setForm({ ...form, policy: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="autorepair-insurance-claim" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Claim Number (if applicable)</label>
                <input
                  id="autorepair-insurance-claim"
                  type="text"
                  placeholder="CLM-98765"
                  value={form.claim}
                  onChange={e => setForm({ ...form, claim: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="autorepair-insurance-description" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Damage Description</label>
              <textarea
                id="autorepair-insurance-description"
                rows={3}
                placeholder="Briefly describe what happened and the visible damage"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <span className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Upload Photos</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                aria-label="Upload damage photos"
                onChange={e => {
                  handleFiles(e.target.files)
                  e.target.value = ''
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:bg-gray-50"
                style={{ borderColor: colors.border }}
              >
                <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accent }} />
                <p style={{ color: colors.textLight }}>Click to upload damage photos</p>
              </button>
              {photos.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {photos.map((name, idx) => (
                    <li
                      key={`${name}-${idx}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm"
                      style={{ backgroundColor: colors.backgroundAlt }}
                    >
                      <span className="flex items-center gap-2 truncate" style={{ color: colors.text }}>
                        <FileImage className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
                        <span className="truncate">{name}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        aria-label={`Remove ${name}`}
                        className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
                        style={{ color: colors.textLight }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
              {submitting ? 'Submitting...' : 'Submit Claim'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
