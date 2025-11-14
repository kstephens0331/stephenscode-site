'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
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

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage colors={colors} onNavigate={setCurrentPage} />
      case 'services': return <ServicesPage colors={colors} onNavigate={setCurrentPage} />
      case 'quote': return <QuotePage colors={colors} onNavigate={setCurrentPage} />
      case 'track': return <TrackPage colors={colors} onNavigate={setCurrentPage} />
      case 'portal': return <PortalPage colors={colors} onNavigate={setCurrentPage} />
      case 'reporting': return <ReportingPage colors={colors} onNavigate={setCurrentPage} />
      case 'areas': return <AreasPage colors={colors} onNavigate={setCurrentPage} />
      case 'about': return <AboutPage colors={colors} onNavigate={setCurrentPage} />
      case 'careers': return <CareersPage colors={colors} onNavigate={setCurrentPage} />
      case 'contact': return <ContactPage colors={colors} onNavigate={setCurrentPage} />
      default: return <HomePage colors={colors} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <nav style={{ backgroundColor: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button onClick={() => setCurrentPage('home')} className="text-xl font-bold text-white">
              Swift Logistics Services
            </button>
            <div className="hidden md:flex space-x-4">
              {['services', 'quote', 'track', 'portal', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:opacity-80 transition-opacity capitalize"
                >
                  {page === 'quote' ? 'Get Quote' : page === 'track' ? 'Track' : page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {renderPage()}
    </div>
  )
}
