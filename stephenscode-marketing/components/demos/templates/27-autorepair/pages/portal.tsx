'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Car, FileText, Calendar, Bell } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const vehicles = [
    { year: 2020, make: 'Toyota', model: 'Camry', vin: '1234567890ABCDEFG', lastService: '2024-01-15' },
    { year: 2018, make: 'Honda', model: 'Accord', vin: 'ZYXWVUTS0987654321', lastService: '2023-11-20' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ color: colors.text }}>Customer Portal</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Vehicle History */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Your Vehicles</h2>
            {vehicles.map((vehicle, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>VIN: {vehicle.vin}</p>
                  </div>
                  <Car className="w-8 h-8" style={{ color: colors.accent }} />
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                  <Calendar className="w-4 h-4" />
                  <span>Last Service: {vehicle.lastService}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => onNavigate('schedule')}
                className="w-full p-4 rounded-lg text-left shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#ffffff' }}
              >
                <Calendar className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
                <div className="font-semibold" style={{ color: colors.text }}>Schedule Service</div>
              </button>
              <button
                onClick={() => onNavigate('estimate')}
                className="w-full p-4 rounded-lg text-left shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#ffffff' }}
              >
                <FileText className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
                <div className="font-semibold" style={{ color: colors.text }}>Get Estimate</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
