'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface ContactPageProps {
  colors: ColorPalette
  onBookingOpen: () => void
}

export default function ContactPage({ colors, onBookingOpen }: ContactPageProps) {
  return (
    <div>
      {/* SEO Meta Tags */}
      {/*
      <title>Contact Us - Classic Cuts Barbershop | Hours, Location & Booking</title>
      <meta name="description" content="Visit Classic Cuts at 123 Main Street, Downtown Houston. Open Tue-Sat 9AM-7PM, Sun 10AM-4PM. Walk-ins welcome or book online. Call (832) 555-2887." />
      */}

      {/* Hero */}
      <section style={{ backgroundColor: '#1a1a1a' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div style={{ color: '#d4af37' }} className="text-sm font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Visit Us Today
          </h1>
          <p style={{ color: '#c4a962' }} className="text-xl max-w-3xl mx-auto">
            Walk-ins welcome or book ahead to guarantee your preferred time and barber
          </p>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-8">Location & Hours</h2>

              <div className="space-y-8">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">📍</div>
                    <div style={{ color: '#d4af37' }} className="font-bold text-lg">Our Location</div>
                  </div>
                  <div style={{ color: '#1a1a1a' }} className="text-xl font-semibold mb-2">123 Main Street, Suite 100</div>
                  <div style={{ color: '#666666' }} className="mb-3">Downtown Houston, TX 77002</div>
                  <div style={{ color: '#666666' }} className="text-sm">
                    <p>Located in the heart of downtown Houston, across from Discovery Green park.</p>
                    <p className="mt-2">Metered street parking available. Nearby parking garages on Travis St and Main St.</p>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">📞</div>
                    <div style={{ color: '#d4af37' }} className="font-bold text-lg">Call Us</div>
                  </div>
                  <a href="tel:8325552887" style={{ color: '#1a1a1a' }} className="text-2xl font-bold hover:opacity-60">
                    (832) 555-CUTS (2887)
                  </a>
                  <p style={{ color: '#666666' }} className="mt-2 text-sm">
                    Call for same-day availability or questions about our services
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">🕐</div>
                    <div style={{ color: '#d4af37' }} className="font-bold text-lg">Business Hours</div>
                  </div>
                  <div style={{ color: '#1a1a1a' }} className="space-y-2">
                    <div className="flex justify-between max-w-xs">
                      <span className="font-semibold">Tuesday - Friday:</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span className="font-semibold">Saturday:</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span className="font-semibold">Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between max-w-xs" style={{ color: '#999999' }}>
                      <span className="font-semibold">Monday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <p style={{ color: '#666666' }} className="mt-4 text-sm">
                    Last appointment accepted 30 minutes before closing
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">📧</div>
                    <div style={{ color: '#d4af37' }} className="font-bold text-lg">Email Us</div>
                  </div>
                  <a href="mailto:info@classiccuts.com" style={{ color: '#1a1a1a' }} className="text-xl font-semibold hover:opacity-60">
                    info@classiccuts.com
                  </a>
                  <p style={{ color: '#666666' }} className="mt-2 text-sm">
                    For general inquiries, gift certificates, or group bookings
                  </p>
                </div>
              </div>
            </div>

            {/* Booking CTA */}
            <div>
              <div style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5' }} className="p-8 lg:p-12 sticky top-24">
                <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-4">
                  Book Your Appointment
                </h3>
                <p style={{ color: '#666666' }} className="text-lg mb-8 leading-relaxed">
                  Reserve your spot online and choose your preferred barber and time. We'll confirm your appointment
                  within 2 hours. Or simply walk in—we always do our best to accommodate!
                </p>

                <button
                  onClick={onBookingOpen}
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                  className="w-full py-5 text-xl font-bold hover:opacity-90 transition mb-6"
                >
                  Book Online Now
                </button>

                <div style={{ backgroundColor: '#1a1a1a' }} className="p-6 text-center">
                  <p style={{ color: '#ffffff' }} className="font-bold mb-2">Walk-Ins Welcome!</p>
                  <p style={{ color: '#999999' }} className="text-sm">
                    Can't book ahead? No problem. Stop by during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-4">
              Find Us in Downtown Houston
            </h2>
            <p style={{ color: '#666666' }} className="text-lg">
              Easy to find, easy to park, impossible to forget
            </p>
          </div>

          {/* Map Placeholder */}
          <div style={{ backgroundColor: '#e5e5e5', border: '2px solid #d4af37' }} className="aspect-video flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🗺️</div>
              <p style={{ color: '#666666' }} className="text-lg font-semibold">
                Interactive Google Map Would Display Here
              </p>
              <p style={{ color: '#999999' }} className="text-sm mt-2">
                123 Main Street, Suite 100, Houston, TX 77002
              </p>
            </div>
          </div>

          {/* Directions */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div style={{ backgroundColor: '#ffffff' }} className="p-6">
              <div className="text-3xl mb-3">🚗</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">By Car</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                From I-45, take exit 47C toward Downtown. Turn right on Main Street. We're on the left after 3 blocks.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff' }} className="p-6">
              <div className="text-3xl mb-3">🚇</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">By Metro</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                Take the Red Line to Main Street Square station. We're a 2-minute walk east on Main Street.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff' }} className="p-6">
              <div className="text-3xl mb-3">🅿️</div>
              <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Parking</h3>
              <p style={{ color: '#666666' }} className="text-sm">
                Metered street parking available. Downtown parking garages on Travis St ($10 flat rate).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
              <h3 style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">
                Do I need an appointment?
              </h3>
              <p style={{ color: '#666666' }}>
                Walk-ins are welcome, but we recommend booking online to guarantee your preferred time and barber,
                especially on weekends.
              </p>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
              <h3 style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">
                What forms of payment do you accept?
              </h3>
              <p style={{ color: '#666666' }}>
                We accept cash, all major credit cards (Visa, Mastercard, Amex, Discover), Apple Pay, and Google Pay.
                Tips can be added to card payments or given in cash.
              </p>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
              <h3 style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">
                How long does a typical haircut take?
              </h3>
              <p style={{ color: '#666666' }}>
                Most haircuts take 30-45 minutes. Our Executive service takes 75 minutes. We don't rush—we take
                the time needed to do it right.
              </p>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
              <h3 style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">
                Can I request a specific barber?
              </h3>
              <p style={{ color: '#666666' }}>
                Absolutely! When booking online, you can select your preferred barber. Walk-ins will be served
                by the next available barber unless you're willing to wait for someone specific.
              </p>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
              <h3 style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">
                Do you offer gift certificates?
              </h3>
              <p style={{ color: '#666666' }}>
                Yes! Gift certificates are available in any amount. Perfect for birthdays, Father's Day, or any occasion.
                Purchase in-store or call us to arrange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 style={{ color: '#ffffff' }} className="text-5xl font-black mb-6">
            Ready to Look Your Best?
          </h2>
          <p style={{ color: '#c4a962' }} className="text-xl mb-10">
            Book your appointment today or stop by for a walk-in. We're here to serve you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookingOpen}
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
            >
              Book Appointment
            </button>
            <a
              href="tel:8325552887"
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #d4af37' }}
              className="px-10 py-4 font-bold text-lg hover:opacity-80 transition inline-block"
            >
              Call (832) 555-2887
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
