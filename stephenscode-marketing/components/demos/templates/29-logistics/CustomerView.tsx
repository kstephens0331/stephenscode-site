'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import type { NavOptions } from './types'
import { Menu, X } from 'lucide-react'
import HomePage from './pages/home'
import ServicesPage from './pages/services'
import QuotePage from './pages/quote'
import TrackPage from './pages/track'
import PortalPage from './pages/portal'
import ReportingPage from './pages/reporting'
import AreasPage from './pages/areas'
import AboutPage from './pages/about'
import CareersPage from './pages/careers'
import ContactPage from './pages/contact'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

const NAV_LINKS: { page: string; label: string }[] = [
  { page: 'services', label: 'Services' },
  { page: 'quote', label: 'Get Quote' },
  { page: 'track', label: 'Track' },
  { page: 'portal', label: 'Portal' },
  { page: 'contact', label: 'Contact' }
]

const FOOTER_COMPANY_LINKS: { page: string; label: string }[] = [
  { page: 'about', label: 'About Us' },
  { page: 'careers', label: 'Careers' },
  { page: 'areas', label: 'Service Areas' },
  { page: 'contact', label: 'Contact' }
]

const FOOTER_TOOL_LINKS: { page: string; label: string }[] = [
  { page: 'quote', label: 'Instant Quote' },
  { page: 'track', label: 'Track Shipment' },
  { page: 'portal', label: 'Customer Portal' },
  { page: 'reporting', label: 'Analytics & Reporting' }
]

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [handoff, setHandoff] = useState<NavOptions>({})

  const navigate = (page: string, options?: NavOptions) => {
    setCurrentPage(page)
    setHandoff(options ?? {})
    setMobileMenuOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage colors={colors} onNavigate={navigate} />
      case 'services': return <ServicesPage colors={colors} onNavigate={navigate} />
      case 'quote': return <QuotePage colors={colors} onNavigate={navigate} initialService={handoff.service} />
      case 'track': return <TrackPage colors={colors} onNavigate={navigate} initialTracking={handoff.tracking} />
      case 'portal': return <PortalPage colors={colors} onNavigate={navigate} />
      case 'reporting': return <ReportingPage colors={colors} onNavigate={navigate} />
      case 'areas': return <AreasPage colors={colors} onNavigate={navigate} initialRegion={handoff.region} />
      case 'about': return <AboutPage colors={colors} onNavigate={navigate} />
      case 'careers': return <CareersPage colors={colors} onNavigate={navigate} />
      case 'contact': return <ContactPage colors={colors} onNavigate={navigate} initialSubject={handoff.subject} />
      default: return <HomePage colors={colors} onNavigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <nav style={{ backgroundColor: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button onClick={() => navigate('home')} className="text-xl font-bold text-white">
              Swift Logistics Services
            </button>
            <div className="hidden md:flex space-x-4">
              {NAV_LINKS.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => navigate(page)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:opacity-80 transition-opacity"
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-md text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-1">
            {NAV_LINKS.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className="block w-full text-left px-3 py-2 rounded-md text-white font-medium hover:bg-white/10"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {renderPage()}

      <footer style={{ backgroundColor: colors.primary }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-lg font-bold mb-3">Swift Logistics Services</div>
              <p className="text-sm opacity-80">
                Fast, reliable freight and logistics solutions with real-time tracking and 24/7 support.
              </p>
              <p className="text-sm opacity-80 mt-3">
                789 Logistics Blvd, Freight City, FC 67890
              </p>
              <a href="tel:5552468135" className="block text-sm opacity-80 hover:opacity-100 transition-opacity mt-1">
                (555) 246-8135
              </a>
              <a href="mailto:info@swiftlogistics.com" className="block text-sm opacity-80 hover:opacity-100 transition-opacity mt-1">
                info@swiftlogistics.com
              </a>
            </div>
            <div>
              <div className="font-semibold mb-3">Company</div>
              <div className="space-y-2">
                {FOOTER_COMPANY_LINKS.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => navigate(page)}
                    className="block text-sm opacity-80 hover:opacity-100 transition-opacity text-left"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-3">Shipping Tools</div>
              <div className="space-y-2">
                {FOOTER_TOOL_LINKS.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => navigate(page)}
                    className="block text-sm opacity-80 hover:opacity-100 transition-opacity text-left"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-sm opacity-70">
            Swift Logistics Services. All freight fully insured.
          </div>
        </div>
      </footer>
    </div>
  )
}
