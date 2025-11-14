'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface LayoutProps {
  children: React.ReactNode
  colors: ColorPalette
  currentPage: string
  onNavigate: (page: string) => void
  onQuoteOpen: () => void
}

export default function Layout({ children, colors, currentPage, onNavigate, onQuoteOpen }: LayoutProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'quote', label: 'Get Quote' },
    { id: 'client-portal', label: 'Client Portal' },
    { id: 'tracking', label: 'Project Tracking' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div>
      <header style={{ backgroundColor: '#ff6700' }} className="sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="text-4xl">🏗️</div>
              <div>
                <div style={{ color: '#ffffff' }} className="text-2xl font-black">BuildRight Construction</div>
                <div style={{ color: '#1a1a1a' }} className="text-xs font-bold uppercase tracking-wide">Building Excellence Since 1998</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'quote' ? onQuoteOpen() : onNavigate(item.id)}
                  style={{
                    color: currentPage === item.id ? '#1a1a1a' : '#ffffff',
                    borderBottom: currentPage === item.id ? '3px solid #1a1a1a' : 'none'
                  }}
                  className="font-bold hover:opacity-80 pb-1 transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              onClick={onQuoteOpen}
              style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
              className="px-6 py-3 font-bold hover:opacity-90 transition"
            >
              Free Quote
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🏗️</div>
                <div style={{ color: '#ff6700' }} className="text-xl font-black">BuildRight</div>
              </div>
              <p style={{ color: '#999999' }} className="text-sm">
                Licensed, bonded, and insured construction services. Your vision, our expertise.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ff6700' }} className="font-bold mb-4">Services</h4>
              <div style={{ color: '#cccccc' }} className="space-y-2 text-sm">
                {['Custom Homes', 'Remodeling', 'Commercial', 'Additions'].map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ff6700' }} className="font-bold mb-4">Contact</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>(555) BUILD-IT</div>
                <div>info@buildright.com</div>
                <div>Mon-Fri: 7AM-6PM</div>
                <div>Sat: 8AM-4PM</div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#ff6700' }} className="font-bold mb-4">Licensed & Insured</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>License #: CTR-12345</div>
                <div>BBB A+ Rated</div>
                <div>Fully Bonded</div>
                <div>$2M Liability Insurance</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333333' }} className="pt-8 text-center">
            <p style={{ color: '#666666' }} className="text-sm">
              &copy; 2024 BuildRight Construction. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
