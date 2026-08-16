'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import type { Navigate } from '../types'
import { Truck, CheckCircle, Clock, X } from 'lucide-react'

interface TrackPageProps {
  colors: ColorPalette
  onNavigate: Navigate
  initialTracking?: string
}

interface TimelineEvent {
  time: string
  location: string
  status: string
  completed: boolean
}

interface TrackingResult {
  status: string
  currentLocation: string
  estimatedDelivery: string
  service: string
  weight: string
  timeline: TimelineEvent[]
}

const SAMPLE_TRACKING = 'SLS123456789'
const LS_RECENT = 'sls-recent-tracking'

/** Known shipments that match the customer portal records */
const KNOWN_SHIPMENTS: Record<string, TrackingResult> = {
  SLS123456789: {
    status: 'In Transit',
    currentLocation: 'Chicago, IL Distribution Center',
    estimatedDelivery: 'Thu, Jan 25',
    service: 'Ground Freight',
    weight: '4,200 lbs',
    timeline: [
      { time: 'Jan 20, 08:00', location: 'Los Angeles, CA', status: 'Picked Up', completed: true },
      { time: 'Jan 21, 14:30', location: 'Las Vegas, NV', status: 'Departed Terminal', completed: true },
      { time: 'Jan 22, 10:15', location: 'Denver, CO', status: 'In Transit', completed: true },
      { time: 'Jan 23, 16:45', location: 'Chicago, IL', status: 'Arrived at Hub', completed: true },
      { time: 'Jan 25, 12:00', location: 'New York, NY', status: 'Out for Delivery', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  },
  SLS123456: {
    status: 'In Transit',
    currentLocation: 'Chicago, IL Distribution Center',
    estimatedDelivery: 'Thu, Jan 25',
    service: 'Ground Freight',
    weight: '4,200 lbs',
    timeline: [
      { time: 'Jan 20, 08:00', location: 'Los Angeles, CA', status: 'Picked Up', completed: true },
      { time: 'Jan 21, 14:30', location: 'Las Vegas, NV', status: 'Departed Terminal', completed: true },
      { time: 'Jan 23, 16:45', location: 'Chicago, IL', status: 'Arrived at Hub', completed: true },
      { time: 'Jan 25, 12:00', location: 'New York, NY', status: 'Out for Delivery', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  },
  SLS123457: {
    status: 'Delivered',
    currentLocation: 'Miami, FL',
    estimatedDelivery: 'Delivered Jan 18',
    service: 'Air Freight',
    weight: '1,150 lbs',
    timeline: [
      { time: 'Jan 17, 06:30', location: 'Chicago, IL', status: 'Picked Up', completed: true },
      { time: 'Jan 17, 13:10', location: 'Chicago ORD', status: 'Departed Airport', completed: true },
      { time: 'Jan 18, 07:45', location: 'Miami MIA', status: 'Customs Cleared', completed: true },
      { time: 'Jan 18, 11:20', location: 'Miami, FL', status: 'Out for Delivery', completed: true },
      { time: 'Jan 18, 14:02', location: 'Miami, FL', status: 'Delivered, signed by R. Alvarez', completed: true }
    ]
  },
  SLS123458: {
    status: 'Processing',
    currentLocation: 'Seattle, WA Origin Terminal',
    estimatedDelivery: 'Mon, Jan 29',
    service: 'Ground Freight',
    weight: '2,780 lbs',
    timeline: [
      { time: 'Jan 22, 09:15', location: 'Seattle, WA', status: 'Booking Confirmed', completed: true },
      { time: 'Jan 22, 15:40', location: 'Seattle, WA', status: 'Pickup Scheduled', completed: true },
      { time: 'Jan 23, 08:00', location: 'Seattle, WA', status: 'Pickup', completed: false },
      { time: 'Pending', location: 'Salt Lake City, UT', status: 'In Transit', completed: false },
      { time: 'Pending', location: 'Houston, TX', status: 'Delivered', completed: false }
    ]
  },
  SLS123459: {
    status: 'Delivered',
    currentLocation: 'Phoenix, AZ',
    estimatedDelivery: 'Delivered Jan 15',
    service: 'Expedited',
    weight: '860 lbs',
    timeline: [
      { time: 'Jan 14, 18:20', location: 'Denver, CO', status: 'Picked Up', completed: true },
      { time: 'Jan 15, 02:05', location: 'Albuquerque, NM', status: 'Team Driver Handoff', completed: true },
      { time: 'Jan 15, 09:35', location: 'Phoenix, AZ', status: 'Out for Delivery', completed: true },
      { time: 'Jan 15, 11:48', location: 'Phoenix, AZ', status: 'Delivered, signed by T. Nguyen', completed: true }
    ]
  },
  SLS123460: {
    status: 'In Transit',
    currentLocation: 'Richmond, VA',
    estimatedDelivery: 'Wed, Jan 24',
    service: 'Ground Freight',
    weight: '3,340 lbs',
    timeline: [
      { time: 'Jan 21, 07:10', location: 'Atlanta, GA', status: 'Picked Up', completed: true },
      { time: 'Jan 22, 12:55', location: 'Charlotte, NC', status: 'Departed Terminal', completed: true },
      { time: 'Jan 23, 06:30', location: 'Richmond, VA', status: 'In Transit', completed: true },
      { time: 'Jan 24, 10:00', location: 'Boston, MA', status: 'Out for Delivery', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  }
}

/** Booking references created by the quote calculator start at the front of the lifecycle */
function bookingResult(reference: string): TrackingResult {
  return {
    status: 'Pickup Scheduled',
    currentLocation: 'Awaiting driver assignment',
    estimatedDelivery: 'Confirmed at pickup',
    service: 'Per your booking request',
    weight: 'As declared at booking',
    timeline: [
      { time: 'Just now', location: 'Swift Logistics Dispatch', status: `Booking ${reference} received`, completed: true },
      { time: 'Within 1 hour', location: 'Dispatch', status: 'Coordinator confirms pickup window', completed: false },
      { time: 'Pickup day', location: 'Origin', status: 'Driver arrives and loads', completed: false },
      { time: 'Pending', location: 'In network', status: 'In Transit', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  }
}

/** Any other well-formed number resolves to a live lane so the demo never dead-ends */
function genericResult(num: string): TrackingResult {
  const seed = num.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const lanes = [
    { hub: 'Kansas City, MO Distribution Center', dest: 'Dallas, TX', eta: 'Fri, Jan 26' },
    { hub: 'Columbus, OH Distribution Center', dest: 'Newark, NJ', eta: 'Thu, Jan 25' },
    { hub: 'Memphis, TN Distribution Center', dest: 'Orlando, FL', eta: 'Sat, Jan 27' }
  ]
  const lane = lanes[seed % lanes.length]
  return {
    status: 'In Transit',
    currentLocation: lane.hub,
    estimatedDelivery: lane.eta,
    service: 'Ground Freight',
    weight: `${1200 + (seed % 40) * 75} lbs`,
    timeline: [
      { time: 'Jan 21, 09:40', location: 'Origin Terminal', status: 'Picked Up', completed: true },
      { time: 'Jan 22, 17:25', location: 'Regional Hub', status: 'Departed Terminal', completed: true },
      { time: 'Jan 23, 11:05', location: lane.hub, status: 'In Transit', completed: true },
      { time: lane.eta, location: lane.dest, status: 'Out for Delivery', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  }
}

function lookup(num: string): TrackingResult {
  if (KNOWN_SHIPMENTS[num]) return KNOWN_SHIPMENTS[num]
  if (num.startsWith('SLS-B')) return bookingResult(num)
  return genericResult(num)
}

function loadRecent(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LS_RECENT)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as string[]).slice(0, 5) : []
  } catch {
    return []
  }
}

function saveRecent(values: string[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LS_RECENT, JSON.stringify(values))
  } catch {
    // Storage unavailable (private mode/quota) -- history still lives in React for this session
  }
}

export default function TrackPage({ colors, onNavigate, initialTracking }: TrackPageProps) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackedNumber, setTrackedNumber] = useState<string | null>(null)
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [inputError, setInputError] = useState('')
  const [recent, setRecent] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [alertsOn, setAlertsOn] = useState(false)

  useEffect(() => {
    setRecent(loadRecent())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveRecent(recent)
  }, [recent, hydrated])

  const track = (num: string) => {
    const value = num.trim().toUpperCase()
    if (!value) {
      setInputError('Enter a tracking number, or try the sample below.')
      setTrackedNumber(null)
      setResult(null)
      return
    }
    setInputError('')
    setTrackingNumber(value)
    setTrackedNumber(value)
    setResult(lookup(value))
    setAlertsOn(false)
    setRecent(prev => [value, ...prev.filter(v => v !== value)].slice(0, 5))
  }

  useEffect(() => {
    if (initialTracking) track(initialTracking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTracking])

  const clearRecent = () => setRecent([])

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Track Shipment</h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., SLS123456789)"
              aria-label="Tracking number"
              className="flex-1 px-4 py-3 rounded-lg border"
              style={{ borderColor: inputError ? '#dc2626' : colors.border }}
              value={trackingNumber}
              onChange={(e) => { setTrackingNumber(e.target.value); setInputError('') }}
              onKeyDown={(e) => { if (e.key === 'Enter') track(trackingNumber) }}
            />
            <button
              onClick={() => track(trackingNumber)}
              className="px-8 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Track
            </button>
          </div>
          {inputError && (
            <p className="text-sm mt-3" style={{ color: '#dc2626' }}>{inputError}</p>
          )}
          <button
            onClick={() => track(SAMPLE_TRACKING)}
            className="text-sm mt-3 underline"
            style={{ color: colors.primary }}
          >
            Try sample shipment: {SAMPLE_TRACKING}
          </button>

          {recent.length > 0 && (
            <div className="mt-5 pt-5 border-t" style={{ borderColor: colors.border }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: colors.text }}>Recent lookups</span>
                <button onClick={clearRecent} className="text-xs underline" style={{ color: colors.textLight }}>
                  Clear history
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map(num => (
                  <button
                    key={num}
                    onClick={() => track(num)}
                    className="px-3 py-1 rounded-full text-sm border transition-colors hover:bg-gray-50"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {trackedNumber && result && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Tracking # {trackedNumber}</div>
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>{result.status}</div>
                </div>
                <Truck className="w-12 h-12" style={{ color: colors.primary }} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Current Location</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{result.currentLocation}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Estimated Delivery</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{result.estimatedDelivery}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Service</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{result.service}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Billed Weight</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{result.weight}</div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Tracking Timeline</h2>
            <div className="space-y-4">
              {result.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {event.completed ? <CheckCircle className="w-5 h-5 text-white" /> : <Clock className="w-4 h-4 text-white" />}
                    </div>
                    {idx < result.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-semibold" style={{ color: colors.text }}>{event.status}</div>
                    <div className="text-sm" style={{ color: colors.textLight }}>{event.location}</div>
                    <div className="text-xs" style={{ color: colors.textLight }}>{event.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 p-4 rounded-lg flex flex-wrap items-center justify-between gap-3" style={{ backgroundColor: colors.backgroundAlt }}>
              <div>
                <div className="font-semibold" style={{ color: colors.text }}>Delivery alerts</div>
                <div className="text-sm" style={{ color: colors.textLight }}>
                  {alertsOn
                    ? `Text and email alerts are on for ${trackedNumber}.`
                    : 'Get a text and email at every milestone for this shipment.'}
                </div>
              </div>
              <button
                onClick={() => setAlertsOn(on => !on)}
                aria-pressed={alertsOn}
                className="px-5 py-2 rounded-lg font-semibold border"
                style={{
                  backgroundColor: alertsOn ? colors.primary : '#ffffff',
                  color: alertsOn ? '#ffffff' : colors.primary,
                  borderColor: colors.primary
                }}
              >
                {alertsOn ? 'Alerts On' : 'Turn On Alerts'}
              </button>
            </div>

            <div className="mt-4 pt-6 border-t flex flex-wrap gap-4 items-center justify-between" style={{ borderColor: colors.border }}>
              <p className="text-sm" style={{ color: colors.textLight }}>
                Questions about this shipment? Our support team is available 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('portal')}
                  className="px-6 py-2 rounded-lg font-semibold border"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  All My Shipments
                </button>
                <button
                  onClick={() => onNavigate('contact', { subject: `Shipment ${trackedNumber}` })}
                  className="px-6 py-2 rounded-lg font-semibold border"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Contact Support
                </button>
              </div>
            </div>

            <button
              onClick={() => { setTrackedNumber(null); setResult(null); setTrackingNumber('') }}
              className="mt-4 text-sm flex items-center gap-1"
              style={{ color: colors.textLight }}
            >
              <X className="w-4 h-4" /> Close this result
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
