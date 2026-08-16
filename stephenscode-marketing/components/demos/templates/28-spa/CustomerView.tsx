'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Menu, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  const navPages = ['home', 'services', 'packages', 'book', 'memberships', 'gifts', 'shop', 'portal', 'about', 'contact']
  const navLabel = (page: string) => (page === 'portal' ? 'Member Portal' : page)

  const goTo = (page: string) => {
    setCurrentPage(page)
    setMobileOpen(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage colors={colors} onNavigate={goTo} />
      case 'services': return <ServicesPage colors={colors} onNavigate={goTo} />
      case 'packages': return <PackagesPage colors={colors} onNavigate={goTo} />
      case 'book': return <BookPage colors={colors} onNavigate={goTo} />
      case 'memberships': return <MembershipsPage colors={colors} onNavigate={goTo} />
      case 'gifts': return <GiftsPage colors={colors} onNavigate={goTo} />
      case 'portal': return <PortalPage colors={colors} onNavigate={goTo} />
      case 'shop': return <ShopPage colors={colors} onNavigate={goTo} />
      case 'about': return <AboutPage colors={colors} onNavigate={goTo} />
      case 'contact': return <ContactPage colors={colors} onNavigate={goTo} />
      default: return <HomePage colors={colors} onNavigate={goTo} />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <nav style={{ backgroundColor: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button onClick={() => goTo('home')} className="text-xl font-bold text-white">
              Serenity Spa &amp; Wellness
            </button>
            <div className="hidden lg:flex space-x-1">
              {navPages.map(page => (
                <button
                  key={page}
                  onClick={() => goTo(page)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:opacity-80 transition-opacity capitalize"
                  style={{ backgroundColor: currentPage === page ? 'rgba(255,255,255,0.15)' : 'transparent' }}
                >
                  {navLabel(page)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileOpen && (
            <div className="lg:hidden pb-4 flex flex-col gap-1">
              {navPages.map(page => (
                <button
                  key={page}
                  onClick={() => goTo(page)}
                  className="px-3 py-2 rounded-md text-left text-sm font-medium text-white capitalize"
                  style={{ backgroundColor: currentPage === page ? 'rgba(255,255,255,0.15)' : 'transparent' }}
                >
                  {navLabel(page)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      {renderPage()}
    </div>
  )
}
