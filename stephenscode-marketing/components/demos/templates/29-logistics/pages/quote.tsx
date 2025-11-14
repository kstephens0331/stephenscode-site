'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calculator, Package, MapPin } from 'lucide-react'

interface QuotePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function QuotePage({ colors, onNavigate }: QuotePageProps) {
  const [quote, setQuote] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    service: 'ground',
    weight: '',
    distance: '',
    expedited: false
  })

  const calculateQuote = () => {
    const weight = parseFloat(formData.weight) || 0
    const distance = parseFloat(formData.distance) || 0
    let base = 0

    if (formData.service === 'ground') base = weight * 0.50 + distance * 0.80
    else if (formData.service === 'air') base = weight * 2.50 + distance * 1.50
    else if (formData.service === 'ocean') base = weight * 0.30 + distance * 0.40

    if (formData.expedited) base *= 1.5

    setQuote(Math.round(base))
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Get Instant Quote</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Service Type</label>
              <select
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
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Weight (lbs)</label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Distance (miles)</label>
                <input
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

            {quote !== null && (
              <div className="mt-6 p-6 rounded-lg text-center" style={{ backgroundColor: `${colors.primary}10`, border: `2px solid ${colors.primary}` }}>
                <div className="text-sm font-medium mb-2" style={{ color: colors.text }}>Estimated Cost</div>
                <div className="text-5xl font-bold mb-4" style={{ color: colors.primary }}>${quote}</div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Book Shipment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
