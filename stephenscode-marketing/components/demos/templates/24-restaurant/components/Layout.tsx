'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface LayoutProps {
  children: React.ReactNode
  colors: ColorPalette
  currentPage: string
  onNavigate: (page: string) => void
  onOrderOpen: () => void
}

export default function Layout({ children, colors, currentPage, onNavigate, onOrderOpen }: LayoutProps) {
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

  return (
    <div>
      {/* Header */}
      <header style={{ backgroundColor: '#9b2226' }} className="sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="text-4xl">🍽️</div>
              <div>
                <div style={{ color: '#ffffff' }} className="text-2xl font-black">Gourmet Kitchen</div>
                <div style={{ color: '#ee9b00' }} className="text-xs font-bold uppercase tracking-wide">Fine Dining Experience</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'order' ? onOrderOpen() : onNavigate(item.id)}
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
            <button
              onClick={onOrderOpen}
              style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
              className="px-6 py-3 font-bold hover:opacity-90 transition"
            >
              Order Now
            </button>
          </div>
        </div>
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
                <div style={{ color: '#ee9b00' }} className="text-xl font-black">Gourmet Kitchen</div>
              </div>
              <p style={{ color: '#999999' }} className="text-sm leading-relaxed">
                Authentic Italian cuisine crafted with passion and premium ingredients. Experience fine dining at its finest.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ee9b00' }} className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Menu', 'Reservations', 'Order Online', 'Catering'].map((link) => (
                  <div key={link}>
                    <button style={{ color: '#cccccc' }} className="hover:text-white text-sm">
                      {link}
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
