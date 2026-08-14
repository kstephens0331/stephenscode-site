'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface CateringPageProps {
  colors: ColorPalette
}

export default function CateringPage({ colors }: CateringPageProps) {
  const packages = [
    {
      name: 'Corporate Lunch Package',
      price: '$18-25 per person',
      minOrder: '10 people minimum',
      includes: [
        'Choice of 3 pasta dishes or entrees',
        'Fresh garden salad',
        'Breadsticks and olive oil',
        'Italian cookies',
        'Disposable plates, utensils, napkins',
        'Setup and delivery included'
      ]
    },
    {
      name: 'Cocktail Reception',
      price: '$35-45 per person',
      minOrder: '25 people minimum',
      includes: [
        'Selection of 8 passed appetizers',
        'Antipasto station',
        'Bruschetta bar',
        'Artisan cheese display',
        'Dessert bites',
        'Professional servers (2 hours)'
      ]
    },
    {
      name: 'Full-Service Dinner',
      price: '$55-75 per person',
      minOrder: '30 people minimum',
      includes: [
        'Appetizer course',
        'Choice of soup or salad',
        '3 entree selections',
        'Family-style sides',
        'Dessert course',
        'Full service staff',
        'China, glassware, linens'
      ]
    }
  ]

  const [formData, setFormData] = useState({
    contactName: '',
    company: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    location: '',
    packageInterest: 'Corporate Lunch Package',
    details: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Gourmet Kitchen Restaurant',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'gourmet-kitchen-restaurant',
          clientName: formData.contactName,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.packageInterest,
          preferredDate: formData.eventDate,
          preferredTime: formData.eventTime,
          notes: `Company: ${formData.company || 'N/A'}. Guest count: ${formData.guestCount || 'N/A'}. Location: ${formData.location || 'N/A'}. ${formData.details}`.trim()
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'catering_quote_form',
          demo_slug: 'gourmet-kitchen-restaurant',
        })
        trackConversion('leadForm')
        setSubmitted(true)
      } else {
        alert('There was an issue submitting your catering request. Please email catering@gourmetkitchen.com.')
      }
    } catch (error) {
      console.error('Catering form error:', error)
      alert('There was an issue submitting your catering request. Please email catering@gourmetkitchen.com.')
    }
  }

  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Catering Services
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">
            Bring Gourmet Kitchen to You
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Full-service catering for corporate events, weddings, parties, and special occasions
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-bold text-center mb-12">
            Catering Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                style={{ backgroundColor: '#f8f8f8', border: '3px solid #ee9b00' }}
                className="p-8"
              >
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">
                  {pkg.name}
                </h3>
                <div style={{ color: '#9b2226' }} className="text-2xl font-bold mb-2">
                  {pkg.price}
                </div>
                <div style={{ color: '#666666' }} className="text-sm mb-6 font-bold">
                  {pkg.minOrder}
                </div>
                <div className="space-y-2">
                  {pkg.includes.map((item) => (
                    <div key={item} style={{ color: '#333333' }} className="text-sm flex items-start gap-2">
                      <span style={{ color: '#ee9b00' }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#f8f8f8' }} className="p-12 mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold text-center mb-8">
              Request Catering Quote
            </h2>
            {submitted ? (
              <div style={{ backgroundColor: '#ffffff', border: '3px solid #22c55e' }} className="max-w-3xl mx-auto p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-2">Quote Requested!</h3>
                <p style={{ color: '#666666' }}>
                  Thanks for reaching out. Our catering team will follow up shortly.
                </p>
              </div>
            ) : (
            <form className="max-w-3xl mx-auto space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="restaurant-catering-contact-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Contact Name *</label>
                  <input
                    id="restaurant-catering-contact-name"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="restaurant-catering-company" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Company/Organization</label>
                  <input
                    id="restaurant-catering-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="restaurant-catering-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                  <input
                    id="restaurant-catering-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="restaurant-catering-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                  <input
                    id="restaurant-catering-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="restaurant-catering-event-date" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Date *</label>
                  <input
                    id="restaurant-catering-event-date"
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="restaurant-catering-event-time" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Time</label>
                  <input
                    id="restaurant-catering-event-time"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="restaurant-catering-guest-count" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Guest Count *</label>
                  <input
                    id="restaurant-catering-guest-count"
                    type="number"
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="restaurant-catering-location" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Location *</label>
                <input
                  id="restaurant-catering-location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                  placeholder="Delivery address or venue name"
                />
              </div>
              <div>
                <label htmlFor="restaurant-catering-package" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Package Interest</label>
                <select
                  id="restaurant-catering-package"
                  value={formData.packageInterest}
                  onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                >
                  <option>Corporate Lunch Package</option>
                  <option>Cocktail Reception</option>
                  <option>Full-Service Dinner</option>
                  <option>Custom Menu</option>
                </select>
              </div>
              <div>
                <label htmlFor="restaurant-catering-details" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Additional Details</label>
                <textarea
                  id="restaurant-catering-details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3 h-32"
                  placeholder="Dietary restrictions, budget, setup requirements, event details..."
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Request Quote
              </button>
            </form>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-3">🚚</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-2">Delivery Available</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                We deliver throughout Chicagoland. Setup and breakdown services available.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">👨‍🍳</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-2">Professional Staff</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                Experienced servers, bartenders, and event coordinators for full-service events.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-3">📋</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-2">Custom Menus</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                Work with our chef to create a personalized menu for your event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
