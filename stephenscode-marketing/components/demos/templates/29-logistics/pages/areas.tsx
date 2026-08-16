'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { MapPin, Anchor, Plane, Truck } from 'lucide-react'

interface AreasPageProps {
  colors: ColorPalette
  onNavigate: Navigate
  initialRegion?: string
}

interface Region {
  name: string
  countries: string[]
  coverage: string
  /** Position of the region pin on the coverage map, in percent */
  pin: { top: string; left: string }
  hubs: string[]
  lanes: { lane: string; mode: string; transit: string }[]
  note: string
}

const REGIONS: Region[] = [
  {
    name: 'North America',
    countries: ['USA', 'Canada', 'Mexico'],
    coverage: '100%',
    pin: { top: '32%', left: '20%' },
    hubs: ['Los Angeles, CA', 'Chicago, IL', 'Dallas, TX', 'Newark, NJ'],
    lanes: [
      { lane: 'Los Angeles to New York', mode: 'Ground', transit: '4 to 5 days' },
      { lane: 'Chicago to Miami', mode: 'Air', transit: 'Next day' },
      { lane: 'Seattle to Houston', mode: 'Ground', transit: '3 days' }
    ],
    note: 'Owned fleet coverage in all 48 contiguous states plus bonded cross-border service into Canada and Mexico.'
  },
  {
    name: 'Europe',
    countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'],
    coverage: '95%',
    pin: { top: '26%', left: '49%' },
    hubs: ['Rotterdam, NL', 'Frankfurt, DE', 'Felixstowe, UK'],
    lanes: [
      { lane: 'Newark to Rotterdam', mode: 'Ocean', transit: '12 to 15 days' },
      { lane: 'Chicago to Frankfurt', mode: 'Air', transit: '2 days' },
      { lane: 'Rotterdam to Milan', mode: 'Ground', transit: '3 days' }
    ],
    note: 'Partner carrier network with customs brokerage included on every international booking.'
  },
  {
    name: 'Asia Pacific',
    countries: ['China', 'Japan', 'South Korea', 'Australia'],
    coverage: '85%',
    pin: { top: '38%', left: '76%' },
    hubs: ['Shanghai, CN', 'Busan, KR', 'Sydney, AU'],
    lanes: [
      { lane: 'Los Angeles to Shanghai', mode: 'Ocean', transit: '18 to 24 days' },
      { lane: 'Seattle to Tokyo', mode: 'Air', transit: '2 days' },
      { lane: 'Shanghai to Sydney', mode: 'Ocean', transit: '14 days' }
    ],
    note: 'Weekly consolidated sailings from three West Coast ports, with LCL options for smaller volumes.'
  },
  {
    name: 'South America',
    countries: ['Brazil', 'Argentina', 'Chile'],
    coverage: '75%',
    pin: { top: '66%', left: '32%' },
    hubs: ['Santos, BR', 'Buenos Aires, AR', 'Valparaiso, CL'],
    lanes: [
      { lane: 'Miami to Santos', mode: 'Ocean', transit: '16 to 20 days' },
      { lane: 'Houston to Buenos Aires', mode: 'Air', transit: '3 days' },
      { lane: 'Santos to Valparaiso', mode: 'Ground', transit: '6 days' }
    ],
    note: 'Coverage concentrated on major port cities. Inland delivery is quoted lane by lane.'
  }
]

const MODE_ICON: Record<string, typeof Truck> = {
  Ground: Truck,
  Air: Plane,
  Ocean: Anchor
}

const MODE_QUOTE_KEY: Record<string, string> = {
  Ground: 'ground',
  Air: 'air',
  Ocean: 'ocean'
}

export default function AreasPage({ colors, onNavigate, initialRegion }: AreasPageProps) {
  const [activeName, setActiveName] = useState(
    REGIONS.some(r => r.name === initialRegion) ? (initialRegion as string) : REGIONS[0].name
  )

  const active = REGIONS.find(r => r.name === activeName) ?? REGIONS[0]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: colors.text }}>Service Areas</h1>
        <p className="text-center mb-8" style={{ color: colors.textLight }}>
          Select a region on the map to see hubs, published lanes, and transit times.
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
            {REGIONS.map(region => {
              const isActive = region.name === active.name
              return (
                <button
                  key={region.name}
                  onClick={() => setActiveName(region.name)}
                  aria-pressed={isActive}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform hover:scale-110"
                  style={{ top: region.pin.top, left: region.pin.left }}
                >
                  <MapPin
                    className={isActive ? 'w-10 h-10' : 'w-7 h-7'}
                    style={{ color: isActive ? colors.primary : colors.text, opacity: isActive ? 1 : 0.55 }}
                  />
                  <span
                    className="mt-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm"
                    style={{
                      backgroundColor: isActive ? colors.primary : '#ffffff',
                      color: isActive ? '#ffffff' : colors.text
                    }}
                  >
                    {region.name} {region.coverage}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{active.name}</h2>
              <div className="text-sm" style={{ color: colors.textLight }}>Coverage</div>
              <div className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>{active.coverage}</div>
              <p className="text-sm" style={{ color: colors.textLight }}>{active.note}</p>
              <div className="text-sm mt-4 mb-2" style={{ color: colors.textLight }}>Terminals and ports</div>
              <div className="flex flex-wrap gap-2">
                {active.hubs.map(hub => (
                  <span key={hub} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}>
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>Published Lanes</h3>
              <div className="space-y-3">
                {active.lanes.map(lane => {
                  const Icon = MODE_ICON[lane.mode] ?? Truck
                  return (
                    <div key={lane.lane} className="flex flex-wrap items-center gap-4 p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                      <Icon className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />
                      <div className="flex-1 min-w-[12rem]">
                        <div className="font-semibold" style={{ color: colors.text }}>{lane.lane}</div>
                        <div className="text-sm" style={{ color: colors.textLight }}>{lane.mode} freight | {lane.transit}</div>
                      </div>
                      <button
                        onClick={() => onNavigate('quote', { service: MODE_QUOTE_KEY[lane.mode] ?? 'ground' })}
                        className="px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                      >
                        Quote This Lane
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-6 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => onNavigate('contact', { subject: `${active.name} coverage question` })}
                  className="px-6 py-3 rounded-lg font-semibold border"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Ask About {active.name}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REGIONS.map(region => {
            const isActive = region.name === active.name
            return (
              <button
                key={region.name}
                onClick={() => setActiveName(region.name)}
                className="bg-white rounded-lg shadow-lg p-8 text-left transition-all hover:shadow-xl"
                style={{ outline: isActive ? `2px solid ${colors.primary}` : 'none' }}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>{region.name}</h3>
                  {isActive && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                      Showing above
                    </span>
                  )}
                </div>
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
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
