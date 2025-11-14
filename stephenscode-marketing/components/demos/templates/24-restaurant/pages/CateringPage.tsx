'use client'

import type { ColorPalette } from '@/lib/demo-colors'

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

  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Catering Services
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Bring Gourmet Kitchen to You
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Full-service catering for corporate events, weddings, parties, and special occasions
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black text-center mb-12">
            Catering Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                style={{ backgroundColor: '#f8f8f8', border: '3px solid #ee9b00' }}
                className="p-8"
              >
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-3">
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
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black text-center mb-8">
              Request Catering Quote
            </h2>
            <form className="max-w-3xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Contact Name *</label>
                  <input
                    type="text"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Company/Organization</label>
                  <input
                    type="text"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Date *</label>
                  <input
                    type="date"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Time</label>
                  <input
                    type="time"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Guest Count *</label>
                  <input
                    type="number"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Location *</label>
                <input
                  type="text"
                  required
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                  placeholder="Delivery address or venue name"
                />
              </div>
              <div>
                <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Package Interest</label>
                <select
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
                <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Additional Details</label>
                <textarea
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
