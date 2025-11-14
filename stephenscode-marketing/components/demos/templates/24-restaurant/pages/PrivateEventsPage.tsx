'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface PrivateEventsPageProps {
  colors: ColorPalette
}

export default function PrivateEventsPage({ colors }: PrivateEventsPageProps) {
  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Private Events & Celebrations
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Host Your Special Event
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Create unforgettable memories in our elegant private dining spaces
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-3">Social Events</h3>
              <p style={{ color: '#666666' }}>
                Birthdays, anniversaries, graduations, and family celebrations. Make your milestone
                memorable with exceptional food and service.
              </p>
            </div>
            <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center">
              <div className="text-6xl mb-4">💼</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-3">Corporate Events</h3>
              <p style={{ color: '#666666' }}>
                Business dinners, client entertainment, team building, and holiday parties. Professional
                service for your corporate needs.
              </p>
            </div>
            <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center">
              <div className="text-6xl mb-4">💒</div>
              <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-3">Wedding Events</h3>
              <p style={{ color: '#666666' }}>
                Rehearsal dinners, bridal showers, and intimate wedding receptions. Create a romantic
                atmosphere for your special day.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 style={{ color: '#9b2226' }} className="text-4xl font-black text-center mb-12">
              Our Private Spaces
            </h2>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div style={{ backgroundColor: '#ae2012', height: '300px' }} className="flex items-center justify-center text-9xl">
                  🏛️
                </div>
                <div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-4">The Tuscan Room</h3>
                  <div style={{ color: '#9b2226' }} className="text-lg font-bold mb-4">
                    Capacity: 20-40 guests
                  </div>
                  <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                    Our most popular private dining room features rustic Italian decor, exposed brick walls,
                    and a stunning mural of the Tuscan countryside. Perfect for intimate dinners and celebrations.
                  </p>
                  <div style={{ color: '#666666' }} className="space-y-2 text-sm">
                    <div>✓ Private bar service available</div>
                    <div>✓ Audiovisual equipment included</div>
                    <div>✓ Customizable menu options</div>
                    <div>✓ Dedicated event coordinator</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-4">The Wine Cellar</h3>
                  <div style={{ color: '#9b2226' }} className="text-lg font-bold mb-4">
                    Capacity: 10-16 guests
                  </div>
                  <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                    An intimate space surrounded by our extensive wine collection. Temperature-controlled and
                    elegantly lit, ideal for wine tastings, business dinners, and special occasions.
                  </p>
                  <div style={{ color: '#666666' }} className="space-y-2 text-sm">
                    <div>✓ Private sommelier service</div>
                    <div>✓ Chef's tasting menu available</div>
                    <div>✓ Wine pairing experiences</div>
                    <div>✓ Intimate and exclusive atmosphere</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#ee9b00', height: '300px' }} className="flex items-center justify-center text-9xl order-1 md:order-2">
                  🍷
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div style={{ backgroundColor: '#9b2226', height: '300px' }} className="flex items-center justify-center text-9xl">
                  👥
                </div>
                <div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-4">Full Restaurant Buyout</h3>
                  <div style={{ color: '#9b2226' }} className="text-lg font-bold mb-4">
                    Capacity: 80-120 guests
                  </div>
                  <p style={{ color: '#666666' }} className="leading-relaxed mb-4">
                    Reserve the entire restaurant for truly special occasions. Complete privacy with full access
                    to our main dining room, bar, and private spaces for an unforgettable celebration.
                  </p>
                  <div style={{ color: '#666666' }} className="space-y-2 text-sm">
                    <div>✓ Exclusive use of entire venue</div>
                    <div>✓ Custom menu creation with chef</div>
                    <div>✓ Full bar and beverage service</div>
                    <div>✓ Event planning and coordination</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black text-center mb-8">
              Request Event Information
            </h2>
            <form className="max-w-3xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Date</label>
                  <input
                    type="date"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Guest Count</label>
                  <input
                    type="number"
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    placeholder="Estimated"
                  />
                </div>
              </div>
              <div>
                <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Event Type</label>
                <select
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                >
                  <option>Birthday Party</option>
                  <option>Anniversary</option>
                  <option>Corporate Event</option>
                  <option>Wedding Event</option>
                  <option>Holiday Party</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Additional Details</label>
                <textarea
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3 focus:outline-none focus:border-red-900 h-32"
                  placeholder="Tell us about your event vision, budget, menu preferences, or any special requirements..."
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Submit Event Inquiry
              </button>
              <p style={{ color: '#999999' }} className="text-sm text-center">
                Our events team will respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
