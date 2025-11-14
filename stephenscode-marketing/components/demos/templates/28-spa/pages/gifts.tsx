'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Gift } from 'lucide-react'

interface GiftsPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function GiftsPage({ colors, onNavigate }: GiftsPageProps) {
  const amounts = [50, 100, 150, 250, 500, 1000]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Gift Certificates</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Gift className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
          <h2 className="text-2xl font-bold mb-6 text-center font-serif" style={{ color: colors.text }}>Purchase Digital Gift Certificate</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>Select Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {amounts.map(amt => (
                  <button key={amt} className="p-4 rounded-lg border-2" style={{ borderColor: colors.border }}>
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Recipient Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Personal Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <button className="w-full py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
              Purchase Gift Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
