'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import HomePage from './pages/home'
import ServicesPage from './pages/services'
import PackagesPage from './pages/packages'
import BookPage from './pages/book'
import MembershipsPage from './pages/memberships'
import GiftsPage from './pages/gifts'
import PortalPage from './pages/portal'
import ShopPage from './pages/shop'
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
      case 'home': return <HomePage colors={colors} onNavigate={setCurrentPage} />
      case 'services': return <ServicesPage colors={colors} onNavigate={setCurrentPage} />
      case 'packages': return <PackagesPage colors={colors} onNavigate={setCurrentPage} />
      case 'book': return <BookPage colors={colors} onNavigate={setCurrentPage} />
      case 'memberships': return <MembershipsPage colors={colors} onNavigate={setCurrentPage} />
      case 'gifts': return <GiftsPage colors={colors} onNavigate={setCurrentPage} />
      case 'portal': return <PortalPage colors={colors} onNavigate={setCurrentPage} />
      case 'shop': return <ShopPage colors={colors} onNavigate={setCurrentPage} />
      case 'about': return <AboutPage colors={colors} onNavigate={setCurrentPage} />
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
              Serenity Spa & Wellness
            </button>
            <div className="hidden md:flex space-x-4">
              {['home', 'services', 'packages', 'book', 'memberships', 'gifts', 'shop', 'portal'].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:opacity-80 transition-opacity capitalize"
                >
                  {page === 'portal' ? 'Member Portal' : page}
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
