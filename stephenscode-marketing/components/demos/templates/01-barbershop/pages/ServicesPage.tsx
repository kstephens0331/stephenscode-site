'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface ServicesPageProps {
  colors: ColorPalette
  onBookingOpen: () => void
  setBookingService: (service: string) => void
}

export default function ServicesPage({ colors, onBookingOpen, setBookingService }: ServicesPageProps) {
  const services = [
    {
      name: 'Signature Haircut',
      price: '$45',
      time: '45 min',
      description: 'Precision cut tailored to your face shape and lifestyle. Includes consultation, wash, cut, style, and hot towel finish.',
      details: [
        'Personal style consultation',
        'Shampoo and conditioning treatment',
        'Precision cutting with professional techniques',
        'Styling with premium products',
        'Hot towel finish',
        'Complimentary beverage'
      ],
      popular: true
    },
    {
      name: 'Beard Sculpting',
      price: '$35',
      time: '30 min',
      description: 'Expert beard trimming and shaping with straight razor edging. Includes beard oil treatment and styling.',
      details: [
        'Beard shape consultation',
        'Precision trimming to desired length',
        'Straight razor edging and detailing',
        'Hot towel treatment',
        'Premium beard oil application',
        'Styling tips and maintenance advice'
      ]
    },
    {
      name: 'Traditional Hot Shave',
      price: '$55',
      time: '50 min',
      description: 'Luxurious straight razor shave with hot towel preparation, pre-shave oil, premium lather, and post-shave balm.',
      details: [
        'Pre-shave consultation',
        'Hot towel facial prep',
        'Pre-shave oil application',
        'Premium lather with badger brush',
        'Expert straight razor shave',
        'Cold towel finish',
        'Post-shave balm and moisturizer'
      ]
    },
    {
      name: 'The Executive',
      price: '$75',
      time: '75 min',
      description: 'Complete grooming experience: haircut, beard trim, hot towel shave, scalp massage, and styling. Our signature service.',
      details: [
        'Everything from Signature Haircut',
        'Full beard trim and shaping',
        'Hot towel shave or neck shave',
        'Relaxing scalp massage',
        'Face mask treatment',
        'Premium styling products',
        'Grooming consultation and tips'
      ],
      popular: true
    },
    {
      name: 'Father & Son',
      price: '$70',
      time: '60 min',
      description: 'Matching haircuts for dad and son. Build traditions while looking sharp together.',
      details: [
        'Back-to-back appointments',
        'Individual consultations for each',
        'Coordinated or matching styles',
        'Full haircut service for both',
        'Hot towel treatments',
        'Complimentary photo opportunity',
        'Special bonding experience'
      ]
    },
    {
      name: 'Kids Cut (12 & Under)',
      price: '$30',
      time: '30 min',
      description: 'Patient, skilled cuts for young gentlemen. First-timer? We make it fun and stress-free.',
      details: [
        'Kid-friendly, patient approach',
        'Fun and comfortable environment',
        'Age-appropriate consultation',
        'Quick, efficient cutting',
        'Hot towel finish (optional)',
        'Certificate for first haircut',
        'Lollipop and sticker'
      ]
    }
  ]

  const handleBookService = (serviceName: string) => {
    setBookingService(serviceName)
    onBookingOpen()
  }

  return (
    <div>
      {/* SEO Meta Tags */}
      {/*
      <title>Services & Pricing - Classic Cuts Barbershop | Houston</title>
      <meta name="description" content="View our complete menu of grooming services including haircuts, beard trims, hot shaves, and more. Transparent pricing from $30-$75. Book online today!" />
      */}

      {/* Hero */}
      <section style={{ backgroundColor: '#1a1a1a' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-4">
            Our Services
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Premium Grooming Services
          </h1>
          <p style={{ color: '#c4a962' }} className="text-xl max-w-3xl mx-auto">
            Every service includes complimentary beverage, hot towel treatment, and expert consultation.
            No hidden fees—what you see is what you pay.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                style={{
                  backgroundColor: '#ffffff',
                  border: service.popular ? '3px solid #d4af37' : '1px solid #e5e5e5',
                  position: 'relative'
                }}
                className="p-8 hover:shadow-xl transition"
              >
                {service.popular && (
                  <div style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }} className="absolute -top-3 left-8 px-4 py-1 text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black">{service.name}</h3>
                  <div style={{ color: '#d4af37' }} className="text-3xl font-black">{service.price}</div>
                </div>

                <div style={{ color: '#999999' }} className="text-sm mb-4">⏱ {service.time}</div>

                <p style={{ color: '#666666' }} className="leading-relaxed mb-6">{service.description}</p>

                <div className="mb-6">
                  <div style={{ color: '#1a1a1a' }} className="font-bold text-sm mb-3">What's Included:</div>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} style={{ color: '#666666' }} className="text-sm flex items-start gap-2">
                        <span style={{ color: '#d4af37' }}>✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleBookService(service.name)}
                  style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                  className="w-full py-3 font-bold hover:opacity-80 transition"
                >
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-4">
              Service Add-Ons
            </h2>
            <p style={{ color: '#666666' }} className="text-lg">
              Enhance any service with these premium add-ons
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-6 text-center">
              <div className="text-4xl mb-3">💆</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Scalp Massage</h3>
              <p style={{ color: '#666666' }} className="text-sm mb-3">Relaxing 10-minute treatment</p>
              <div style={{ color: '#d4af37' }} className="text-xl font-bold">+$15</div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-6 text-center">
              <div className="text-4xl mb-3">🧴</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Premium Products</h3>
              <p style={{ color: '#666666' }} className="text-sm mb-3">Upgrade to luxury styling products</p>
              <div style={{ color: '#d4af37' }} className="text-xl font-bold">+$10</div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5' }} className="p-6 text-center">
              <div className="text-4xl mb-3">🪒</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Neck Shave</h3>
              <p style={{ color: '#666666' }} className="text-sm mb-3">Clean straight razor neck shave</p>
              <div style={{ color: '#d4af37' }} className="text-xl font-bold">+$10</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership/Loyalty */}
      <section className="py-24" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-4">
              Loyalty Program
            </div>
            <h2 style={{ color: '#ffffff' }} className="text-4xl font-black mb-6">
              The Classic Cuts Club
            </h2>
            <p style={{ color: '#c4a962' }} className="text-lg mb-8">
              Become a regular and unlock exclusive benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div style={{ backgroundColor: '#2d2d2d', border: '2px solid #d4af37' }} className="p-6 text-center">
              <div style={{ color: '#d4af37' }} className="text-3xl font-black mb-2">10%</div>
              <div style={{ color: '#ffffff' }} className="font-bold mb-2">OFF</div>
              <p style={{ color: '#999999' }} className="text-sm">After 5 visits</p>
            </div>

            <div style={{ backgroundColor: '#2d2d2d', border: '2px solid #d4af37' }} className="p-6 text-center">
              <div style={{ color: '#d4af37' }} className="text-3xl font-black mb-2">FREE</div>
              <div style={{ color: '#ffffff' }} className="font-bold mb-2">HAIRCUT</div>
              <p style={{ color: '#999999' }} className="text-sm">After 10 visits</p>
            </div>

            <div style={{ backgroundColor: '#2d2d2d', border: '2px solid #d4af37' }} className="p-6 text-center">
              <div style={{ color: '#d4af37' }} className="text-3xl font-black mb-2">VIP</div>
              <div style={{ color: '#ffffff' }} className="font-bold mb-2">ACCESS</div>
              <p style={{ color: '#999999' }} className="text-sm">Priority booking</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={onBookingOpen}
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              Join Today - Book Your First Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
