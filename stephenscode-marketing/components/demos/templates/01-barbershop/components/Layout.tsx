'use client'

import { useState, ReactNode } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'

interface LayoutProps {
  children: ReactNode
  colors: ColorPalette
  currentPage: 'home' | 'services' | 'about' | 'contact'
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void
  onBookingOpen: () => void
}

export default function Layout({ children, colors, currentPage, onNavigate, onBookingOpen }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null)

  const navLinks = [
    { id: 'home' as const, label: 'Home' },
    { id: 'services' as const, label: 'Services' },
    { id: 'about' as const, label: 'About' },
    { id: 'contact' as const, label: 'Contact' }
  ]

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>📍 Downtown Houston, 5th & Main</span>
            <span className="hidden sm:inline">📞 (832) 555-CUTS</span>
          </div>
          <div className="hidden md:block">
            <span>Open Tue-Sat: 9AM-7PM | Sun: 10AM-4PM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #e5e5e5' }} className="sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">CLASSIC CUTS</div>
              <div style={{ color: '#d4af37' }} className="text-xs font-semibold uppercase tracking-wider">Est. 2010</div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  style={{
                    color: currentPage === link.id ? '#d4af37' : '#1a1a1a',
                    fontWeight: currentPage === link.id ? 'bold' : '600'
                  }}
                  className="hover:opacity-60 transition"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={onBookingOpen}
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                className="px-6 py-3 font-bold hover:opacity-90 transition"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-2xl"
              style={{ color: '#1a1a1a' }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id)
                    setMobileMenuOpen(false)
                  }}
                  style={{
                    color: currentPage === link.id ? '#d4af37' : '#1a1a1a',
                    fontWeight: currentPage === link.id ? 'bold' : '600'
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-50"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onBookingOpen()
                  setMobileMenuOpen(false)
                }}
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                className="w-full mt-2 px-4 py-3 font-bold hover:opacity-90 transition"
              >
                Book Now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">CLASSIC CUTS</div>
              <p style={{ color: '#999999' }} className="text-sm">
                Premium barbering since 2010. Traditional craft meets modern style in downtown Houston.
              </p>
            </div>
            <div>
              <div className="font-bold mb-4">Quick Links</div>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    style={{ color: '#999999' }}
                    className="block text-sm hover:text-white transition"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold mb-4">Hours</div>
              <div style={{ color: '#999999' }} className="text-sm space-y-2">
                <div>Tue-Sat: 9AM-7PM</div>
                <div>Sunday: 10AM-4PM</div>
                <div>Closed Monday</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4">Contact</div>
              <div style={{ color: '#999999' }} className="text-sm space-y-2">
                <div>📞 (832) 555-2887</div>
                <div>📧 info@classiccuts.com</div>
                <div>📍 123 Main St, Houston, TX</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333333' }} className="pt-8 text-center">
            <p style={{ color: '#666666' }} className="text-sm">
              © 2025 Classic Cuts Barbershop. All rights reserved. |
              <button onClick={() => setLegalDoc('privacy')} className="hover:text-white ml-1">Privacy Policy</button> |
              <button onClick={() => setLegalDoc('terms')} className="hover:text-white ml-1">Terms of Service</button>
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      {legalDoc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setLegalDoc(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">
                {legalDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button onClick={() => setLegalDoc(null)} className="text-3xl leading-none hover:opacity-70">&times;</button>
            </div>
            <div className="p-8 space-y-4" style={{ color: '#666666' }}>
              {legalDoc === 'privacy' ? (
                <>
                  <p style={{ color: '#999999' }} className="text-sm">Last updated: January 2025</p>
                  <p>
                    Classic Cuts Barbershop collects only the information needed to serve you: your name, phone number,
                    email address, and appointment preferences. We use this information to confirm bookings, send
                    appointment reminders, and keep track of your service history so every visit is a great one.
                  </p>
                  <p>
                    We never sell, rent, or share your personal information with third parties for marketing purposes.
                    Payment details are processed securely by our payment provider and are never stored on our systems.
                  </p>
                  <p>
                    You may request a copy of the information we hold about you, or ask us to delete it, at any time by
                    emailing info@classiccuts.com or speaking with any member of our team in the shop.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ color: '#999999' }} className="text-sm">Last updated: January 2025</p>
                  <p>
                    Appointments may be booked online, by phone, or in person. We hold reserved times for 10 minutes past
                    the scheduled start. If you are running late, give us a call and we will do our best to accommodate you.
                  </p>
                  <p>
                    Cancellations are free with at least 2 hours of notice. Repeated no-shows may be asked to prepay for
                    future bookings. Gift certificates are non-refundable but fully transferable and never expire.
                  </p>
                  <p>
                    All services are performed by licensed barbers. If you are ever unsatisfied with a service, let us know
                    within 7 days and we will make it right at no charge. That is our promise.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
