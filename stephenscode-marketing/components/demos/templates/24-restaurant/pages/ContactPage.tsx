'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface ContactPageProps {
  colors: ColorPalette
}

export default function ContactPage({ colors }: ContactPageProps) {
  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Get in Touch
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Contact Us
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            We'd love to hear from you. Visit us or get in touch today.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-8">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone</label>
                  <input
                    type="tel"
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Subject *</label>
                  <select
                    required
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option>General Inquiry</option>
                    <option>Reservation Question</option>
                    <option>Private Event</option>
                    <option>Catering Request</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Message *</label>
                  <textarea
                    required
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-40"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-8">
                Visit Us
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-3">Location</h3>
                  <div style={{ backgroundColor: '#9b2226', height: '250px' }} className="flex items-center justify-center text-8xl mb-4">
                    📍
                  </div>
                  <div style={{ color: '#666666' }} className="space-y-1">
                    <div className="font-bold" style={{ color: '#1a1a1a' }}>Gourmet Kitchen Restaurant</div>
                    <div>456 Culinary Boulevard</div>
                    <div>Chicago, IL 60601</div>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-3">Hours</h3>
                  <div style={{ color: '#666666' }} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Lunch</span>
                      <span>Mon-Fri: 11:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Dinner</span>
                      <span>Mon-Thu: 5:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span></span>
                      <span>Fri-Sat: 5:00 PM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Brunch</span>
                      <span>Sun: 10:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Sunday Dinner</span>
                      <span>Sun: 4:00 PM - 9:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-3">Contact Information</h3>
                  <div style={{ color: '#666666' }} className="space-y-2">
                    <div>
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Phone:</span> (312) 555-FOOD (3663)
                    </div>
                    <div>
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Email:</span> info@gourmetkitchen.com
                    </div>
                    <div>
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Catering:</span> catering@gourmetkitchen.com
                    </div>
                    <div>
                      <span className="font-bold" style={{ color: '#1a1a1a' }}>Events:</span> events@gourmetkitchen.com
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-3">Parking & Accessibility</h3>
                  <div style={{ color: '#666666' }} className="space-y-2 text-sm">
                    <div>✓ Valet parking available Thu-Sat evenings ($12)</div>
                    <div>✓ Public parking garage 1 block north</div>
                    <div>✓ Street parking available</div>
                    <div>✓ Wheelchair accessible entrance and restrooms</div>
                    <div>✓ Easy access from L train (Red Line - Grand stop)</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #ee9b00' }} className="p-6">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-3">
                    Follow Us on Social Media
                  </h3>
                  <div className="flex gap-4 text-3xl">
                    <button className="hover:opacity-70 transition">📘</button>
                    <button className="hover:opacity-70 transition">📷</button>
                    <button className="hover:opacity-70 transition">🐦</button>
                    <button className="hover:opacity-70 transition">⭐</button>
                  </div>
                  <p style={{ color: '#666666' }} className="text-sm mt-4">
                    Share your dining experience with #GourmetKitchenCHI
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
