'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface ServicesPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ServicesPage({ colors, onNavigate }: ServicesPageProps) {
  const services = [
    { category: 'Massage Therapy', treatments: [
      { name: 'Swedish Massage', duration: '60/90 min', price: '$120/$170' },
      { name: 'Deep Tissue Massage', duration: '60/90 min', price: '$140/$190' },
      { name: 'Hot Stone Massage', duration: '90 min', price: '$200' }
    ]},
    { category: 'Facial Treatments', treatments: [
      { name: 'Hydrating Facial', duration: '60 min', price: '$130' },
      { name: 'Anti-Aging Facial', duration: '75 min', price: '$160' },
      { name: 'Microdermabrasion', duration: '45 min', price: '$150' }
    ]},
    { category: 'Body Treatments', treatments: [
      { name: 'Body Scrub', duration: '50 min', price: '$110' },
      { name: 'Body Wrap', duration: '60 min', price: '$140' },
      { name: 'Hydrotherapy', duration: '30 min', price: '$80' }
    ]}
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center font-serif" style={{ color: colors.text }}>Our Services</h1>
        <div className="space-y-8">
          {services.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.primary }}>{category.category}</h2>
              <div className="space-y-4">
                {category.treatments.map((treatment, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div>
                      <h3 className="font-bold" style={{ color: colors.text }}>{treatment.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{treatment.duration}</p>
                    </div>
                    <div className="text-xl font-bold" style={{ color: colors.primary }}>{treatment.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => onNavigate('book')} className="px-8 py-4 rounded-lg font-semibold" style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
            Book Treatment
          </button>
        </div>
      </div>
    </div>
  )
}
