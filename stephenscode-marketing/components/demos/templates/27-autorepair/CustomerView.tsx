'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage colors={colors} onNavigate={setCurrentPage} />
      case 'services':
        return <ServicesPage colors={colors} onNavigate={setCurrentPage} />
      case 'estimate':
        return <EstimatePage colors={colors} onNavigate={setCurrentPage} />
      case 'schedule':
        return <SchedulePage colors={colors} onNavigate={setCurrentPage} />
      case 'gallery':
        return <GalleryPage colors={colors} onNavigate={setCurrentPage} />
      case 'portal':
        return <PortalPage colors={colors} onNavigate={setCurrentPage} />
      case 'insurance':
        return <InsurancePage colors={colors} onNavigate={setCurrentPage} />
      case 'maintenance':
        return <MaintenancePage colors={colors} onNavigate={setCurrentPage} />
      case 'about':
        return <AboutPage colors={colors} onNavigate={setCurrentPage} />
      case 'contact':
        return <ContactPage colors={colors} onNavigate={setCurrentPage} />
      default:
        return <HomePage colors={colors} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')} className="text-xl font-bold" style={{ color: '#ffffff' }}>
                Precision Auto Repair
              </button>
            </div>
            <div className="hidden md:flex space-x-4">
              <button onClick={() => setCurrentPage('home')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                Home
              </button>
              <button onClick={() => setCurrentPage('services')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                Services
              </button>
              <button onClick={() => setCurrentPage('estimate')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                Get Estimate
              </button>
              <button onClick={() => setCurrentPage('schedule')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                Schedule
              </button>
              <button onClick={() => setCurrentPage('gallery')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                Gallery
              </button>
              <button onClick={() => setCurrentPage('portal')} className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: colors.accent }}>
                Customer Portal
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {renderPage()}
    </div>
  )
}
