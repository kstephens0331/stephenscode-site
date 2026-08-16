'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Award, Users, Heart, X, ArrowRight } from 'lucide-react'

interface AboutPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

interface Therapist {
  name: string
  title: string
  specialty: string
  years: number
  bio: string
  certifications: string[]
}

const THERAPISTS: Therapist[] = [
  {
    name: 'Sarah Johnson',
    title: 'Lead Massage Therapist',
    specialty: 'Swedish & Deep Tissue',
    years: 12,
    bio: 'Sarah blends classic Swedish technique with targeted deep tissue work to release chronic tension. Clients book her for recovery after long weeks at a desk or on their feet.',
    certifications: ['Licensed Massage Therapist', 'Myofascial Release Level II', 'Prenatal Massage Certified']
  },
  {
    name: 'Michael Chen',
    title: 'Senior Bodywork Specialist',
    specialty: 'Hot Stone & Body Wraps',
    years: 9,
    bio: 'Michael trained in traditional stone therapy and builds slow, heat-led sessions that quiet the nervous system. His hot stone treatment is our most requested 90-minute service.',
    certifications: ['Licensed Massage Therapist', 'LaStone Therapy Certified', 'Aromatherapy Practitioner']
  },
  {
    name: 'Emma Williams',
    title: 'Lead Esthetician',
    specialty: 'Facials & Skin Care',
    years: 14,
    bio: 'Emma designs facial protocols around your skin rather than a script, from hydrating resets to advanced anti-aging work. She also leads our skincare product training.',
    certifications: ['Licensed Esthetician', 'Advanced Microdermabrasion', 'Chemical Peel Specialist']
  },
  {
    name: 'David Martinez',
    title: 'Wellness & Hydrotherapy Lead',
    specialty: 'Body Scrubs & Hydrotherapy',
    years: 7,
    bio: 'David runs our hydrotherapy suite and full-body exfoliation treatments, pairing mineral soaks with scrubs for clients who want to leave feeling completely renewed.',
    certifications: ['Licensed Massage Therapist', 'Hydrotherapy Certified', 'Reflexology Practitioner']
  }
]

export default function AboutPage({ colors, onNavigate }: AboutPageProps) {
  const [selected, setSelected] = useState<Therapist | null>(null)

  const bookWith = (therapistName: string) => {
    try {
      window.localStorage.setItem('spa-demo-book-therapist', therapistName)
    } catch {
      // localStorage unavailable -- booking page still works without prefill
    }
    setSelected(null)
    onNavigate('book')
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>About Serenity Spa</h1>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <p className="text-lg mb-6" style={{ color: colors.textLight }}>
            For over 15 years, Serenity Spa &amp; Wellness has been a haven of tranquility and rejuvenation.
            Our holistic approach combines ancient healing traditions with modern wellness techniques.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Award Winning</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Best Spa 2023</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Expert Team</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>20+ certified therapists</p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>10K+ Clients</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>Happy and relaxed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2 font-serif" style={{ color: colors.text }}>Meet Your Therapists</h2>
          <p className="mb-6" style={{ color: colors.textLight }}>
            Select a therapist to read their background, then book directly with them.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {THERAPISTS.map((therapist) => (
              <button
                key={therapist.name}
                onClick={() => setSelected(therapist)}
                className="p-5 rounded-lg border-2 text-left transition-all hover:shadow-lg"
                style={{ borderColor: colors.border, backgroundColor: colors.backgroundAlt }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold font-serif" style={{ color: colors.text }}>{therapist.name}</h3>
                    <p className="text-sm" style={{ color: colors.primary }}>{therapist.title}</p>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>{therapist.specialty}</p>
                    <p className="text-xs mt-2" style={{ color: colors.textLight }}>{therapist.years} years experience</p>
                  </div>
                  <ArrowRight className="w-5 h-5 mt-1 shrink-0" style={{ color: colors.primary }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3 font-serif" style={{ color: colors.text }}>Ready to Unwind?</h2>
          <p className="mb-6" style={{ color: colors.textLight }}>
            Browse our treatments, reserve a time, or send us a question. We are open Mon-Sun, 9AM-8PM.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('book')}
              className="px-8 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Book a Treatment
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-3 rounded-lg font-semibold border-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              View Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 rounded-lg font-semibold border-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold font-serif" style={{ color: colors.text }}>{selected.name}</h3>
                <p className="text-sm" style={{ color: colors.primary }}>{selected.title}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.textLight }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-lg p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="text-xs" style={{ color: colors.textLight }}>Specialty</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{selected.specialty}</div>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="text-xs" style={{ color: colors.textLight }}>Experience</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{selected.years} years</div>
                </div>
              </div>
              <p className="mb-5" style={{ color: colors.text }}>{selected.bio}</p>
              <h4 className="font-bold mb-2" style={{ color: colors.text }}>Certifications</h4>
              <ul className="space-y-1 mb-6">
                {selected.certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-sm">
                    <span style={{ color: colors.primary }}>•</span>
                    <span style={{ color: colors.textLight }}>{cert}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => bookWith(selected.name)}
                className="w-full py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Book with {selected.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
