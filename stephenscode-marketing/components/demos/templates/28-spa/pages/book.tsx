'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'

interface BookPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function BookPage({ colors, onNavigate }: BookPageProps) {
  const therapists = ['Sarah Johnson', 'Michael Chen', 'Emma Williams', 'David Martinez']
  const times = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Book Appointment</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Treatment</label>
              <select className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }}>
                <option>Swedish Massage (60 min) - $120</option>
                <option>Deep Tissue Massage (90 min) - $190</option>
                <option>Hydrating Facial (60 min) - $130</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Therapist</label>
              <div className="grid grid-cols-2 gap-3">
                {therapists.map(t => (
                  <button key={t} className="p-3 rounded-lg border-2" style={{ borderColor: colors.border }}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Select Time</label>
              <div className="grid grid-cols-3 gap-3">
                {times.map(t => (
                  <button key={t} className="p-3 rounded-lg border-2" style={{ borderColor: colors.border }}>{t}</button>
                ))}
              </div>
            </div>
            <button className="w-full py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
