'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'

interface LayoutProps {
  children: React.ReactNode
  colors: ColorPalette
  currentPage: string
  onNavigate: (page: string) => void
  onOrderOpen: () => void
  cartCount: number
}

export default function Layout({ children, colors, currentPage, onNavigate, onOrderOpen, cartCount }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order Online' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'events', label: 'Private Events' },
    { id: 'catering', label: 'Catering' },
    { id: 'loyalty', label: 'Loyalty Program' },
    { id: 'giftcards', label: 'Gift Cards' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    if (id === 'order') {
      onOrderOpen()
    } else {
      onNavigate(id)
    }
  }

  const footerLinks = [
    { id: 'menu', label: 'Menu' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'order', label: 'Order Online' },
    { id: 'catering', label: 'Catering' }
  ]

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: '#9b2226' }} className="sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="text-4xl">🍽️</div>
              <div>
                <div style={{ color: '#ffffff' }} className="text-2xl font-bold">Gourmet Kitchen</div>
                <div style={{ color: '#ee9b00' }} className="text-xs font-bold uppercase tracking-wide">Fine Dining Experience</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    color: currentPage === item.id ? '#ee9b00' : '#ffffff',
                    borderBottom: currentPage === item.id ? '2px solid #ee9b00' : 'none'
                  }}
                  className="font-bold hover:opacity-80 pb-1 transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={onOrderOpen}
                style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
                className="px-6 py-3 font-bold hover:opacity-90 transition flex items-center gap-2"
              >
                Order Now
                {cartCount > 0 && (
                  <span
                    style={{ backgroundColor: '#1a1a1a', color: '#ee9b00' }}
                    className="rounded-full text-xs font-bold px-2 py-1 leading-none"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2"
              >
                <span className="block w-6 space-y-1.5">
                  <span style={{ backgroundColor: '#ffffff' }} className="block h-0.5 w-6"></span>
                  <span style={{ backgroundColor: '#ffffff' }} className="block h-0.5 w-6"></span>
                  <span style={{ backgroundColor: '#ffffff' }} className="block h-0.5 w-6"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav style={{ backgroundColor: '#9b2226', borderTop: '1px solid #ae2012' }} className="lg:hidden">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    color: currentPage === item.id ? '#ee9b00' : '#ffffff',
                    backgroundColor: currentPage === item.id ? 'rgba(0, 0, 0, 0.2)' : 'transparent'
                  }}
                  className="text-left font-bold px-4 py-3 hover:opacity-80 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🍽️</div>
                <div style={{ color: '#ee9b00' }} className="text-xl font-bold">Gourmet Kitchen</div>
              </div>
              <p style={{ color: '#999999' }} className="text-sm leading-relaxed">
                Authentic Italian cuisine crafted with passion and premium ingredients. Experience fine dining at its finest.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ee9b00' }} className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {footerLinks.map((link) => (
                  <div key={link.id}>
                    <button
                      onClick={() => handleNavClick(link.id)}
                      style={{ color: '#cccccc' }}
                      className="hover:text-white text-sm"
                    >
                      {link.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ee9b00' }} className="font-bold mb-4">Hours</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>Mon-Thu: 11:00 AM - 10:00 PM</div>
                <div>Fri-Sat: 11:00 AM - 11:00 PM</div>
                <div>Sunday: 10:00 AM - 9:00 PM</div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ee9b00' }} className="font-bold mb-4">Contact</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>456 Culinary Boulevard</div>
                <div>Chicago, IL 60601</div>
                <div className="pt-2">(312) 555-FOOD</div>
                <div>info@gourmetkitchen.com</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333333' }} className="pt-8 text-center">
            <p style={{ color: '#666666' }} className="text-sm">
              &copy; 2024 Gourmet Kitchen Restaurant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
