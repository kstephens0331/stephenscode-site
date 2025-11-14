'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Shield, FileText, Upload } from 'lucide-react'

interface InsurancePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function InsurancePage({ colors, onNavigate }: InsurancePageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Insurance Claims</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
            <Shield className="w-6 h-6" style={{ color: colors.accent }} />
            File Insurance Claim
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Insurance Company</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Policy Number</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Claim Number (if applicable)</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Upload Photos</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: colors.border }}>
                <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: colors.accent }} />
                <p style={{ color: colors.textLight }}>Click to upload damage photos</p>
              </div>
            </div>
            <button className="w-full py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.accent, color: '#ffffff' }}>
              Submit Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
