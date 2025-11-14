'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Car, FileText, Calculator, Send } from 'lucide-react'

interface EstimatePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function EstimatePage({ colors, onNavigate }: EstimatePageProps) {
  const [estimate, setEstimate] = useState({
    damageType: '',
    severity: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    additionalDamage: [] as string[]
  })

  const [calculatedEstimate, setCalculatedEstimate] = useState<number | null>(null)

  const damageTypes = [
    { id: 'front', name: 'Front Bumper/Hood', basePrice: 800 },
    { id: 'rear', name: 'Rear Bumper/Trunk', basePrice: 750 },
    { id: 'side', name: 'Side Panel/Door', basePrice: 1200 },
    { id: 'roof', name: 'Roof Damage', basePrice: 1500 },
    { id: 'frame', name: 'Frame Damage', basePrice: 3000 }
  ]

  const calculateEstimate = () => {
    const baseType = damageTypes.find(d => d.id === estimate.damageType)
    if (!baseType) return

    let total = baseType.basePrice

    if (estimate.severity === 'moderate') total *= 1.5
    if (estimate.severity === 'severe') total *= 2.5

    estimate.additionalDamage.forEach(() => {
      total += 400
    })

    setCalculatedEstimate(total)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Get Your Repair Estimate
          </h1>
          <p className="text-lg" style={{ color: colors.textLight }}>
            Interactive cost estimator - Get an instant ballpark quote
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Vehicle Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Car className="w-6 h-6" style={{ color: colors.accent }} />
              Vehicle Information
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Year
                </label>
                <input
                  type="text"
                  placeholder="2020"
                  value={estimate.vehicleYear}
                  onChange={(e) => setEstimate({ ...estimate, vehicleYear: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Make
                </label>
                <input
                  type="text"
                  placeholder="Toyota"
                  value={estimate.vehicleMake}
                  onChange={(e) => setEstimate({ ...estimate, vehicleMake: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Model
                </label>
                <input
                  type="text"
                  placeholder="Camry"
                  value={estimate.vehicleModel}
                  onChange={(e) => setEstimate({ ...estimate, vehicleModel: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>
          </div>

          {/* Damage Assessment */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <FileText className="w-6 h-6" style={{ color: colors.accent }} />
              Damage Assessment
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>
                Primary Damage Location
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {damageTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setEstimate({ ...estimate, damageType: type.id })}
                    className="p-4 rounded-lg border-2 text-left transition-all"
                    style={{
                      borderColor: estimate.damageType === type.id ? colors.accent : colors.border,
                      backgroundColor: estimate.damageType === type.id ? `${colors.accent}10` : 'transparent'
                    }}
                  >
                    <div className="font-semibold" style={{ color: colors.text }}>{type.name}</div>
                    <div className="text-sm" style={{ color: colors.textLight }}>
                      Starting at ${type.basePrice}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>
                Damage Severity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['minor', 'moderate', 'severe'].map(severity => (
                  <button
                    key={severity}
                    onClick={() => setEstimate({ ...estimate, severity })}
                    className="p-4 rounded-lg border-2 text-center transition-all capitalize"
                    style={{
                      borderColor: estimate.severity === severity ? colors.accent : colors.border,
                      backgroundColor: estimate.severity === severity ? `${colors.accent}10` : 'transparent',
                      color: colors.text
                    }}
                  >
                    {severity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateEstimate}
            disabled={!estimate.damageType || !estimate.severity}
            className="w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            <Calculator className="w-5 h-5" />
            Calculate Estimate
          </button>

          {/* Estimate Result */}
          {calculatedEstimate !== null && (
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${colors.accent}10`, border: `2px solid ${colors.accent}` }}>
              <div className="text-center">
                <div className="text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Estimated Repair Cost
                </div>
                <div className="text-5xl font-bold mb-4" style={{ color: colors.accent }}>
                  ${calculatedEstimate.toLocaleString()}
                </div>
                <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                  This is a preliminary estimate. Final cost may vary based on inspection.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => onNavigate('schedule')}
                    className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                  >
                    Schedule Inspection
                  </button>
                  <button
                    onClick={() => onNavigate('insurance')}
                    className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:opacity-90"
                    style={{ borderColor: colors.accent, color: colors.accent }}
                  >
                    File Insurance Claim
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
