'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { MapPin } from 'lucide-react'

interface AreasPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function AreasPage({ colors, onNavigate }: AreasPageProps) {
  const regions = [
    { name: 'North America', countries: ['USA', 'Canada', 'Mexico'], coverage: '100%' },
    { name: 'Europe', countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'], coverage: '95%' },
    { name: 'Asia Pacific', countries: ['China', 'Japan', 'South Korea', 'Australia'], coverage: '85%' },
    { name: 'South America', countries: ['Brazil', 'Argentina', 'Chile'], coverage: '75%' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Service Areas</h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <MapPin className="w-16 h-16" style={{ color: colors.primary }} />
            <span className="ml-4 text-xl font-semibold" style={{ color: colors.text }}>Global Coverage Map</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {regions.map((region, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>{region.name}</h3>
              <div className="mb-4">
                <div className="text-sm mb-1" style={{ color: colors.textLight }}>Coverage</div>
                <div className="text-3xl font-bold" style={{ color: colors.primary }}>{region.coverage}</div>
              </div>
              <div>
                <div className="text-sm mb-2" style={{ color: colors.textLight }}>Countries Served:</div>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map(country => (
                    <span key={country} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}>
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
