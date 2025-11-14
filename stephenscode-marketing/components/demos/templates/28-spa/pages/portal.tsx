'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Star, Gift, Award } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const appointments = [
    { date: '2024-01-20', time: '2:00 PM', service: 'Swedish Massage', therapist: 'Sarah Johnson' },
    { date: '2024-01-27', time: '10:30 AM', service: 'Hydrating Facial', therapist: 'Emma Williams' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 font-serif" style={{ color: colors.text }}>Member Portal</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Upcoming Appointments</h2>
              <div className="space-y-4">
                {appointments.map((apt, idx) => (
                  <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold" style={{ color: colors.text }}>{apt.service}</h3>
                        <p className="text-sm" style={{ color: colors.textLight }}>with {apt.therapist}</p>
                      </div>
                      <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <p className="text-sm mt-2" style={{ color: colors.textLight }}>{apt.date} at {apt.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 font-serif" style={{ color: colors.text }}>Membership Status</h2>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <Award className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="font-bold" style={{ color: colors.text }}>Premium Member</div>
                <div className="text-sm" style={{ color: colors.textLight }}>2 treatments remaining</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 font-serif" style={{ color: colors.text }}>Rewards Points</h2>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: colors.primary }}>850</div>
                <p className="text-sm" style={{ color: colors.textLight }}>150 points to next reward</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
