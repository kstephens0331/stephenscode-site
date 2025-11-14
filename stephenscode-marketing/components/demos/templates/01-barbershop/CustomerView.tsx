'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'about' | 'contact'>('home')
  const [showBooking, setShowBooking] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const services = [
    {
      name: 'Signature Haircut',
      price: '$45',
      time: '45 min',
      description: 'Precision cut tailored to your face shape and lifestyle. Includes consultation, wash, cut, style, and hot towel finish.',
      popular: true
    },
    {
      name: 'Beard Sculpting',
      price: '$35',
      time: '30 min',
      description: 'Expert beard trimming and shaping with straight razor edging. Includes beard oil treatment and styling.'
    },
    {
      name: 'Traditional Hot Shave',
      price: '$55',
      time: '50 min',
      description: 'Luxurious straight razor shave with hot towel preparation, pre-shave oil, premium lather, and post-shave balm.'
    },
    {
      name: 'The Executive',
      price: '$75',
      time: '75 min',
      description: 'Complete grooming experience: haircut, beard trim, hot towel shave, scalp massage, and styling. Our signature service.',
      popular: true
    },
    {
      name: 'Father & Son',
      price: '$70',
      time: '60 min',
      description: 'Matching haircuts for dad and son. Build traditions while looking sharp together.'
    },
    {
      name: 'Kids Cut (12 & Under)',
      price: '$30',
      time: '30 min',
      description: 'Patient, skilled cuts for young gentlemen. First-timer? We make it fun and stress-free.'
    }
  ]

  const barbers = [
    {
      name: 'Marcus "The Blade" Thompson',
      title: 'Master Barber & Owner',
      experience: '18 years',
      specialty: 'Classic cuts, straight razor shaves',
      bio: 'Trained in traditional Italian and British barbering techniques. Known for precision fades and old-school craftsmanship.',
      image: '👨🏾‍🦱'
    },
    {
      name: 'Tony Moretti',
      title: 'Senior Barber',
      experience: '12 years',
      specialty: 'Modern styles, beard design',
      bio: 'Blends contemporary trends with timeless technique. Specializes in textured cuts and creative beard sculpting.',
      image: '👨🏻'
    },
    {
      name: 'James Park',
      title: 'Barber Stylist',
      experience: '8 years',
      specialty: 'Asian hair, fades, lineup specialist',
      bio: 'Expert in working with all hair textures. Precision-focused with an eye for clean lines and sharp details.',
      image: '👨🏻‍🦰'
    }
  ]

  const reviews = [
    {
      name: 'Robert Chen',
      rating: 5,
      text: 'Best haircut I\'ve had in 10 years. Marcus took his time, listened to what I wanted, and delivered perfection. This is what a real barbershop should be.',
      service: 'Signature Haircut'
    },
    {
      name: 'David Martinez',
      rating: 5,
      text: 'The Executive package is worth every penny. 75 minutes of pure relaxation and I walked out looking like a million bucks. Tony is an artist.',
      service: 'The Executive'
    },
    {
      name: 'Michael Stevens',
      rating: 5,
      text: 'Brought my 7-year-old son for his first real haircut. James was patient, made him feel comfortable, and did an amazing job. We\'ll be back!',
      service: 'Kids Cut'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Classic Cuts Barbershop',
          demoPackage: 'Simple 4-Page Website - $1,500',
          demoSlug: 'classic-cuts-barbershop',
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.service,
          preferredDate: formData.date,
          preferredTime: formData.time,
          notes: formData.notes
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setShowBooking(false)
          setSubmitted(false)
          setFormData({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' })
        }, 3000)
      } else {
        alert('There was an issue submitting your request. Please call us at (832) 555-2887')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an issue submitting your request. Please call us at (832) 555-2887')
    }
  }

  const setBookingService = (service: string) => {
    setFormData({ ...formData, service })
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onBookingOpen={() => setShowBooking(true)}
    >
      {/* Page Content */}
      {currentPage === 'home' && (
        <HomePage
          colors={colors}
          onNavigate={setCurrentPage}
          onBookingOpen={() => setShowBooking(true)}
        />
      )}

      {currentPage === 'services' && (
        <ServicesPage
          colors={colors}
          onBookingOpen={() => setShowBooking(true)}
          setBookingService={setBookingService}
        />
      )}

      {currentPage === 'about' && (
        <AboutPage
          colors={colors}
          onBookingOpen={() => setShowBooking(true)}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          colors={colors}
          onBookingOpen={() => setShowBooking(true)}
        />
      )}

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-black">Book Your Appointment</h3>
              <button onClick={() => setShowBooking(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-6">✅</div>
                  <h4 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-4">Booking Confirmed!</h4>
                  <p style={{ color: '#666666' }} className="text-lg">
                    We've received your request and will send a confirmation text within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3 focus:outline-none focus:border-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3 focus:outline-none focus:border-black"
                        placeholder="(832) 555-1234"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-black"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Service *</label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-black"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.name} value={s.name}>{s.name} - {s.price} ({s.time})</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Preferred Time *</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Special Requests</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-black h-24"
                      placeholder="Preferred barber, style preferences, etc."
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90"
                  >
                    Confirm Booking
                  </button>
                  <p style={{ color: '#999999' }} className="text-sm text-center">
                    Walk-ins welcome! Call (832) 555-2887 for immediate availability.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

