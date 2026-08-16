'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Menu, X } from 'lucide-react'
import HomePage from './pages/home'
import ServicesPage from './pages/services'
import EstimatePage from './pages/estimate'
import SchedulePage from './pages/schedule'
import GalleryPage from './pages/gallery'
import PortalPage from './pages/portal'
import InsurancePage from './pages/insurance'
import MaintenancePage from './pages/maintenance'
import AboutPage from './pages/about'
import ContactPage from './pages/contact'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'estimate', label: 'Get Estimate' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'maintenance', label: 'Plans' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  const goTo = (page: string) => {
    setCurrentPage(page)
    setMobileOpen(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage colors={colors} onNavigate={goTo} />
      case 'services':
        return <ServicesPage colors={colors} onNavigate={goTo} />
      case 'estimate':
        return <EstimatePage colors={colors} onNavigate={goTo} />
      case 'schedule':
        return <SchedulePage colors={colors} onNavigate={goTo} />
      case 'gallery':
        return <GalleryPage colors={colors} onNavigate={goTo} />
      case 'portal':
        return <PortalPage colors={colors} onNavigate={goTo} />
      case 'insurance':
        return <InsurancePage colors={colors} onNavigate={goTo} />
      case 'maintenance':
        return <MaintenancePage colors={colors} onNavigate={goTo} />
      case 'about':
        return <AboutPage colors={colors} onNavigate={goTo} />
      case 'contact':
        return <ContactPage colors={colors} onNavigate={goTo} />
      default:
        return <HomePage colors={colors} onNavigate={goTo} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button onClick={() => goTo('home')} className="text-xl font-bold" style={{ color: '#ffffff' }}>
                Precision Auto Repair
              </button>
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="px-2.5 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{
                    color: '#ffffff',
                    backgroundColor: currentPage === item.id ? 'rgba(255,255,255,0.15)' : 'transparent'
                  }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => goTo('portal')}
                className="px-2.5 py-2 rounded-md text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: colors.accent }}
              >
                Customer Portal
              </button>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md hover:opacity-80 transition-opacity"
              style={{ color: '#ffffff' }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t px-4 pb-4 pt-2" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:opacity-80 transition-opacity"
                style={{
                  color: '#ffffff',
                  backgroundColor: currentPage === item.id ? 'rgba(255,255,255,0.15)' : 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => goTo('portal')}
              className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: colors.accent }}
            >
              Customer Portal
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {renderPage()}
    </div>
  )
}
