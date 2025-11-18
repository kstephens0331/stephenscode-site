'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { Briefcase } from 'lucide-react'

interface CareersPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function CareersPage({ colors, onNavigate }: CareersPageProps) {
  const jobs = [
    { title: 'CDL Driver', location: 'Multiple Locations', type: 'Full-time' },
    { title: 'Logistics Coordinator', location: 'Chicago, IL', type: 'Full-time' },
    { title: 'Warehouse Manager', location: 'Los Angeles, CA', type: 'Full-time' },
    { title: 'Customer Service Rep', location: 'Remote', type: 'Full-time' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Careers</h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Join Our Team</h2>
          <p className="mb-6" style={{ color: colors.textLight }}>
            We&apos;re always looking for talented individuals to join our growing team.
            Competitive pay, great benefits, and opportunities for advancement.
          </p>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="p-6 rounded-lg border-2" style={{ borderColor: colors.border }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{job.title}</h3>
                    <div className="flex gap-4 text-sm" style={{ color: colors.textLight }}>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
