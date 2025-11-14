'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface ReservationsPageProps {
  colors: ColorPalette
}

export default function ReservationsPage({ colors }: ReservationsPageProps) {
  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Reserve Your Table
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Book Your Dining Experience
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Secure your table for an unforgettable evening. Reservations recommended for dinner service.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-6">
                Make a Reservation
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Time *</label>
                    <select
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    >
                      <option>5:00 PM</option>
                      <option>5:30 PM</option>
                      <option>6:00 PM</option>
                      <option>6:30 PM</option>
                      <option>7:00 PM</option>
                      <option>7:30 PM</option>
                      <option>8:00 PM</option>
                      <option>8:30 PM</option>
                      <option>9:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Party Size *</label>
                    <select
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 focus:outline-none focus:border-red-900"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5 Guests</option>
                      <option>6 Guests</option>
                      <option>7+ Guests</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Special Requests</label>
                  <textarea
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 focus:outline-none focus:border-red-900 h-24"
                    placeholder="Birthday, anniversary, dietary restrictions, seating preferences..."
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-6">
                Reservation Policies
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Dining Hours</h3>
                  <div style={{ color: '#666666' }} className="space-y-1">
                    <div>Monday - Thursday: 5:00 PM - 10:00 PM</div>
                    <div>Friday - Saturday: 5:00 PM - 11:00 PM</div>
                    <div>Sunday: 4:00 PM - 9:00 PM</div>
                  </div>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Cancellation Policy</h3>
                  <p style={{ color: '#666666' }}>
                    Please provide 24 hours notice for cancellations. Parties of 6 or more require
                    a credit card to hold the reservation.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Large Parties</h3>
                  <p style={{ color: '#666666' }}>
                    For parties of 8 or more, please call us directly at (312) 555-FOOD to arrange
                    a private dining experience or prix fixe menu.
                  </p>
                </div>
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-2">Dress Code</h3>
                  <p style={{ color: '#666666' }}>
                    Business casual or smart casual attire preferred. We want you to feel comfortable
                    while maintaining our upscale atmosphere.
                  </p>
                </div>
                <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #ee9b00' }} className="p-6">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">
                    Walk-ins Welcome
                  </h3>
                  <p style={{ color: '#666666' }}>
                    We always try to accommodate walk-in guests! Bar seating is first-come,
                    first-served with full menu service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
