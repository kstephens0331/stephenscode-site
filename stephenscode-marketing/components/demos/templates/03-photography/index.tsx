'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'
import AdminDashboard from './AdminDashboard'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import PackagesPage from './pages/PackagesPage'
import ContactPage from './pages/ContactPage'

interface PhotographyDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

// This template backs two demo slugs:
//   - 'fc-photo-houston': real client showcase (live site embed + info panel)
//   - 'lens-light-photography': fully interactive fictional studio demo
export default function PhotographyDemo({ demo, viewMode }: PhotographyDemoProps) {
  const isRealClientShowcase = demo.slug === 'fc-photo-houston' || Boolean(demo.isRealClient)
  const colors = getDemoColors(isRealClientShowcase ? 'fc-photo-houston' : 'lens-light-photography')

  const [currentPage, setCurrentPage] = useState('home')
  const [prefillService, setPrefillService] = useState('')

  const handleNavigate = (page: string) => {
    if (page !== 'contact') {
      setPrefillService('')
    }
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // "Book This Package" on the packages page carries the chosen package into
  // the contact form's service dropdown so the booking flow stays connected.
  const handleBookPackage = (packageName: string) => {
    setPrefillService(packageName)
    setCurrentPage('contact')
    window.scrollTo(0, 0)
  }

  if (isRealClientShowcase) {
    return (
      <div style={generateColorVars(colors)} className="min-h-screen">
        {viewMode === 'customer' ? (
          <CustomerView demo={demo} colors={colors} />
        ) : (
          <AdminView demo={demo} colors={colors} />
        )}
      </div>
    )
  }

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'portfolio' && <PortfolioPage onNavigate={handleNavigate} />}
          {currentPage === 'packages' && (
            <PackagesPage onNavigate={handleNavigate} onBookPackage={handleBookPackage} />
          )}
          {currentPage === 'contact' && (
            <ContactPage onNavigate={handleNavigate} initialService={prefillService} />
          )}
        </Layout>
      ) : (
        <AdminDashboard />
      )}
    </div>
  )
}
