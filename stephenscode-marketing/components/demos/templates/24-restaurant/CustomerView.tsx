'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ReservationsPage from './pages/ReservationsPage'
import PrivateEventsPage from './pages/PrivateEventsPage'
import CateringPage from './pages/CateringPage'
import LoyaltyProgramPage from './pages/LoyaltyProgramPage'
import GiftCardsPage from './pages/GiftCardsPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderItem, setOrderItem] = useState('')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage colors={colors} onNavigate={setCurrentPage} onOrderOpen={() => setShowOrderModal(true)} />
      case 'menu':
        return <MenuPage colors={colors} onOrderOpen={() => setShowOrderModal(true)} setOrderItem={setOrderItem} />
      case 'reservations':
        return <ReservationsPage colors={colors} />
      case 'events':
        return <PrivateEventsPage colors={colors} />
      case 'catering':
        return <CateringPage colors={colors} />
      case 'loyalty':
        return <LoyaltyProgramPage colors={colors} />
      case 'giftcards':
        return <GiftCardsPage colors={colors} />
      case 'contact':
        return <ContactPage colors={colors} />
      default:
        return <HomePage colors={colors} onNavigate={setCurrentPage} onOrderOpen={() => setShowOrderModal(true)} />
    }
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onOrderOpen={() => setShowOrderModal(true)}
    >
      {renderPage()}

      {/* Order Online Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-black">Order Online</h3>
              <button onClick={() => setShowOrderModal(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }} className="p-6 mb-8 text-center">
                <div className="text-4xl mb-3">🛒</div>
                <h4 className="text-2xl font-black mb-2">Online Ordering System</h4>
                <p className="font-bold">
                  Full menu browsing, cart management, payment processing, and real-time order tracking
                </p>
              </div>

              {orderItem && (
                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #22c55e' }} className="p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">✓</span>
                    <span style={{ color: '#1a1a1a' }} className="text-xl font-black">Added to Cart: {orderItem}</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <h4 style={{ color: '#1a1a1a' }} className="text-xl font-black mb-4">🚗 Delivery</h4>
                  <p style={{ color: '#666666' }} className="mb-4">Get your order delivered to your door in 30-45 minutes</p>
                  <button style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="w-full py-3 font-bold hover:opacity-90">
                    Start Delivery Order
                  </button>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <h4 style={{ color: '#1a1a1a' }} className="text-xl font-black mb-4">🏃 Pickup</h4>
                  <p style={{ color: '#666666' }} className="mb-4">Pick up your order at the restaurant - ready in 20-30 minutes</p>
                  <button style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="w-full py-3 font-bold hover:opacity-90">
                    Start Pickup Order
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                <h4 style={{ color: '#1a1a1a' }} className="text-xl font-black mb-4">Features Include:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Browse full menu with photos',
                    'Customize your order',
                    'Save favorite items',
                    'Apply loyalty points',
                    'Schedule future orders',
                    'Track order in real-time',
                    'Contactless payment',
                    'Order history & reordering'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span style={{ color: '#ee9b00' }}>✓</span>
                      <span style={{ color: '#333333' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
