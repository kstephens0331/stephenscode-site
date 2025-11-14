'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { MapPin, Package, Truck, CheckCircle } from 'lucide-react'

interface TrackPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function TrackPage({ colors, onNavigate }: TrackPageProps) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [showResults, setShowResults] = useState(false)

  const mockTracking = {
    status: 'In Transit',
    currentLocation: 'Chicago, IL Distribution Center',
    estimatedDelivery: '2024-01-25',
    timeline: [
      { time: '2024-01-20 08:00', location: 'Los Angeles, CA', status: 'Picked Up', completed: true },
      { time: '2024-01-21 14:30', location: 'Las Vegas, NV', status: 'In Transit', completed: true },
      { time: '2024-01-22 10:15', location: 'Denver, CO', status: 'In Transit', completed: true },
      { time: '2024-01-23 16:45', location: 'Chicago, IL', status: 'In Transit', completed: true },
      { time: '2024-01-25 12:00', location: 'New York, NY', status: 'Out for Delivery', completed: false },
      { time: 'Pending', location: 'Destination', status: 'Delivered', completed: false }
    ]
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Track Shipment</h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter tracking number (e.g., SLS123456789)"
              className="flex-1 px-4 py-3 rounded-lg border"
              style={{ borderColor: colors.border }}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Track
            </button>
          </div>
        </div>

        {showResults && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Status</div>
                  <div className="text-2xl font-bold" style={{ color: colors.primary }}>{mockTracking.status}</div>
                </div>
                <Truck className="w-12 h-12" style={{ color: colors.primary }} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Current Location</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{mockTracking.currentLocation}</div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: colors.textLight }}>Estimated Delivery</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{mockTracking.estimatedDelivery}</div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Tracking Timeline</h2>
            <div className="space-y-4">
              {mockTracking.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {event.completed && <CheckCircle className="w-5 h-5 text-white" />}
                    </div>
                    {idx < mockTracking.timeline.length - 1 && (
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
          </div>
        )}
      </div>
    </div>
  )
}
