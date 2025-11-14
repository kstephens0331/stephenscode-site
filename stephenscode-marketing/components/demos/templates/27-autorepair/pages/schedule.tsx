'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Clock } from 'lucide-react'

interface SchedulePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function SchedulePage({ colors, onNavigate }: SchedulePageProps) {
  const [appointment, setAppointment] = useState({ date: '', time: '', service: '' })

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Schedule Service</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Service Type</label>
              <select className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }}>
                <option>Collision Repair Inspection</option>
                <option>Paint & Refinish Quote</option>
                <option>Insurance Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Preferred Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Preferred Time</label>
              <select className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }}>
                <option>8:00 AM - 10:00 AM</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>12:00 PM - 2:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
              </select>
            </div>
            <button className="w-full py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.accent, color: '#ffffff' }}>
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
