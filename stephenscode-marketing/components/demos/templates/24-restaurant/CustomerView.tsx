'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ReservationsPage from './pages/ReservationsPage'
import PrivateEventsPage from './pages/PrivateEventsPage'
import CateringPage from './pages/CateringPage'
import LoyaltyProgramPage from './pages/LoyaltyProgramPage'
import GiftCardsPage from './pages/GiftCardsPage'
import ContactPage from './pages/ContactPage'
import { menuCategories, findMenuItem } from './data/menu'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

interface CartItem {
  name: string
  price: number
  qty: number
}

type OrderStep = 'type' | 'menu' | 'checkout' | 'confirmed'
type OrderType = '' | 'delivery' | 'pickup'

interface PlacedOrder {
  number: string
  items: CartItem[]
  total: number
  type: OrderType
  eta: string
}

const CART_STORAGE_KEY = 'restaurant-demo-cart'
const TAX_RATE = 0.1025
const DELIVERY_FEE = 4.99

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartHydrated, setCartHydrated] = useState(false)
  const [orderType, setOrderType] = useState<OrderType>('')
  const [orderStep, setOrderStep] = useState<OrderStep>('type')
  const [checkoutInfo, setCheckoutInfo] = useState({ name: '', phone: '', email: '', address: '' })
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setCart(parsed.filter((i) => i && typeof i.name === 'string' && typeof i.price === 'number' && typeof i.qty === 'number'))
        }
      }
    } catch {
      // Ignore unreadable stored cart and start fresh
    }
    setCartHydrated(true)
  }, [])

  useEffect(() => {
    if (!cartHydrated) return
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Storage unavailable; cart still works in memory
    }
  }, [cart, cartHydrated])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * TAX_RATE
  const deliveryFee = orderType === 'delivery' && cart.length > 0 ? DELIVERY_FEE : 0
  const total = subtotal + tax + deliveryFee

  const addToCart = (itemName: string) => {
    const menuItem = findMenuItem(itemName)
    if (!menuItem) return
    setCart((prev) => {
      const existing = prev.find((i) => i.name === menuItem.name)
      if (existing) {
        return prev.map((i) => (i.name === menuItem.name ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { name: menuItem.name, price: menuItem.price, qty: 1 }]
    })
  }

  const changeQty = (itemName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === itemName ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const removeFromCart = (itemName: string) => {
    setCart((prev) => prev.filter((i) => i.name !== itemName))
  }

  const openOrderModal = () => {
    setOrderStep(orderType ? 'menu' : 'type')
    setShowOrderModal(true)
  }

  const handleOrderDish = (itemName: string) => {
    addToCart(itemName)
    openOrderModal()
  }

  const closeOrderModal = () => {
    setShowOrderModal(false)
    setCheckoutError('')
    if (orderStep === 'confirmed') {
      setOrderStep('type')
      setOrderType('')
      setPlacedOrder(null)
    }
  }

  const chooseOrderType = (type: OrderType) => {
    setOrderType(type)
    setOrderStep('menu')
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    setPlacingOrder(true)
    setCheckoutError('')
    const orderSummary = cart.map((i) => `${i.qty}x ${i.name} ($${(i.price * i.qty).toFixed(2)})`).join(', ')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Gourmet Kitchen Restaurant',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'gourmet-kitchen-restaurant',
          clientName: checkoutInfo.name,
          clientPhone: checkoutInfo.phone,
          clientEmail: checkoutInfo.email,
          service: `Online Order (${orderType === 'delivery' ? 'Delivery' : 'Pickup'})`,
          preferredDate: '',
          preferredTime: '',
          notes: `Demo order: ${orderSummary}. Total: $${total.toFixed(2)}.${orderType === 'delivery' ? ` Address: ${checkoutInfo.address}.` : ''}`
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'online_order_form',
          demo_slug: 'gourmet-kitchen-restaurant',
        })
        trackConversion('leadForm')
        setPlacedOrder({
          number: `GK-${Math.floor(1000 + Math.random() * 9000)}`,
          items: cart,
          total,
          type: orderType,
          eta: orderType === 'delivery' ? '30-45 minutes' : '20-30 minutes'
        })
        setCart([])
        setCheckoutInfo({ name: '', phone: '', email: '', address: '' })
        setOrderStep('confirmed')
      } else {
        setCheckoutError('There was an issue placing your order. Please call us at (312) 555-FOOD.')
      }
    } catch {
      setCheckoutError('There was an issue placing your order. Please call us at (312) 555-FOOD.')
    }
    setPlacingOrder(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage colors={colors} onNavigate={setCurrentPage} onOrderOpen={openOrderModal} onOrderDish={handleOrderDish} />
      case 'menu':
        return <MenuPage colors={colors} onOrderOpen={openOrderModal} onAddToCart={handleOrderDish} />
      case 'reservations':
        return <ReservationsPage colors={colors} />
      case 'events':
        return <PrivateEventsPage colors={colors} />
      case 'catering':
        return <CateringPage colors={colors} />
      case 'loyalty':
        return <LoyaltyProgramPage colors={colors} />
      case 'giftcards':
        return <GiftCardsPage colors={colors} onNavigate={setCurrentPage} />
      case 'contact':
        return <ContactPage colors={colors} />
      default:
        return <HomePage colors={colors} onNavigate={setCurrentPage} onOrderOpen={openOrderModal} onOrderDish={handleOrderDish} />
    }
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onOrderOpen={openOrderModal}
      cartCount={cartCount}
    >
      {renderPage()}

      {/* Order Online Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">
                {orderStep === 'type' && 'Order Online'}
                {orderStep === 'menu' && `Order Online - ${orderType === 'delivery' ? 'Delivery' : 'Pickup'}`}
                {orderStep === 'checkout' && 'Checkout'}
                {orderStep === 'confirmed' && 'Order Confirmed'}
              </h3>
              <button onClick={closeOrderModal} aria-label="Close order window" className="text-3xl hover:opacity-70">&times;</button>
            </div>

            {/* Step 1: Choose Order Type */}
            {orderStep === 'type' && (
              <div className="p-8">
                <h4 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-2 text-center">How would you like your order?</h4>
                <p style={{ color: '#666666' }} className="text-center mb-8">Choose delivery or pickup to start building your order</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                    <h4 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-4">🚗 Delivery</h4>
                    <p style={{ color: '#666666' }} className="mb-2">Get your order delivered to your door in 30-45 minutes</p>
                    <p style={{ color: '#999999' }} className="text-sm mb-4">$4.99 delivery fee</p>
                    <button
                      onClick={() => chooseOrderType('delivery')}
                      style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                      className="w-full py-3 font-bold hover:opacity-90"
                    >
                      Start Delivery Order
                    </button>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                    <h4 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-4">🏃 Pickup</h4>
                    <p style={{ color: '#666666' }} className="mb-2">Pick up your order at the restaurant, ready in 20-30 minutes</p>
                    <p style={{ color: '#999999' }} className="text-sm mb-4">No fees</p>
                    <button
                      onClick={() => chooseOrderType('pickup')}
                      style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                      className="w-full py-3 font-bold hover:opacity-90"
                    >
                      Start Pickup Order
                    </button>
                  </div>
                </div>
                {cart.length > 0 && (
                  <p style={{ color: '#666666' }} className="text-center text-sm mt-6">
                    You have {cartCount} item{cartCount === 1 ? '' : 's'} waiting in your cart
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Browse Menu + Cart */}
            {orderStep === 'menu' && (
              <div className="p-8">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                  <div style={{ color: '#1a1a1a' }} className="font-bold">
                    {orderType === 'delivery' ? '🚗 Delivery order (30-45 min)' : '🏃 Pickup order (20-30 min)'}
                  </div>
                  <button
                    onClick={() => setOrderType(orderType === 'delivery' ? 'pickup' : 'delivery')}
                    style={{ color: '#9b2226', border: '2px solid #9b2226' }}
                    className="px-4 py-2 font-bold text-sm hover:opacity-80"
                  >
                    Switch to {orderType === 'delivery' ? 'Pickup' : 'Delivery'}
                  </button>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Menu list */}
                  <div className="lg:col-span-3 space-y-8">
                    {menuCategories.map((category) => (
                      <div key={category.name}>
                        <h4 style={{ color: '#9b2226' }} className="text-xl font-bold mb-4">{category.name}</h4>
                        <div className="space-y-3">
                          {category.items.map((item) => {
                            const inCart = cart.find((c) => c.name === item.name)
                            return (
                              <div key={item.name} style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                                <div className="flex justify-between items-start gap-3">
                                  <div>
                                    <div style={{ color: '#1a1a1a' }} className="font-bold">{item.name}</div>
                                    <div style={{ color: '#666666' }} className="text-sm">{item.description}</div>
                                  </div>
                                  <div style={{ color: '#9b2226' }} className="font-bold whitespace-nowrap">${item.price}</div>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                  <button
                                    onClick={() => addToCart(item.name)}
                                    style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                                    className="px-4 py-2 font-bold text-sm hover:opacity-90"
                                  >
                                    Add to Cart
                                  </button>
                                  {inCart && (
                                    <span style={{ color: '#22c55e' }} className="text-sm font-bold">
                                      ✓ {inCart.qty} in cart
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart */}
                  <div className="lg:col-span-2">
                    <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #ee9b00' }} className="p-6 lg:sticky lg:top-24">
                      <h4 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-4">Your Cart</h4>
                      {cart.length === 0 ? (
                        <p style={{ color: '#666666' }} className="text-sm mb-4">
                          Your cart is empty. Add dishes from the menu to get started.
                        </p>
                      ) : (
                        <div className="space-y-4 mb-4">
                          {cart.map((item) => (
                            <div key={item.name} style={{ borderBottom: '1px solid #e5e5e5' }} className="pb-3">
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <div style={{ color: '#1a1a1a' }} className="font-bold text-sm">{item.name}</div>
                                <div style={{ color: '#9b2226' }} className="font-bold text-sm whitespace-nowrap">
                                  ${(item.price * item.qty).toFixed(2)}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => changeQty(item.name, -1)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                                  className="w-7 h-7 font-bold hover:opacity-90"
                                >
                                  -
                                </button>
                                <span style={{ color: '#1a1a1a' }} className="font-bold w-6 text-center">{item.qty}</span>
                                <button
                                  onClick={() => changeQty(item.name, 1)}
                                  aria-label={`Increase quantity of ${item.name}`}
                                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                                  className="w-7 h-7 font-bold hover:opacity-90"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.name)}
                                  style={{ color: '#9b2226' }}
                                  className="text-xs font-bold ml-2 hover:opacity-70"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ color: '#333333' }} className="space-y-1 text-sm mb-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-bold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (10.25%)</span>
                          <span className="font-bold">${tax.toFixed(2)}</span>
                        </div>
                        {orderType === 'delivery' && (
                          <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="font-bold">${deliveryFee.toFixed(2)}</span>
                          </div>
                        )}
                        <div style={{ borderTop: '2px solid #1a1a1a' }} className="flex justify-between pt-2 text-base">
                          <span className="font-bold">Total</span>
                          <span style={{ color: '#9b2226' }} className="font-bold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setOrderStep('checkout')}
                        disabled={cart.length === 0}
                        style={{
                          backgroundColor: cart.length === 0 ? '#cccccc' : '#9b2226',
                          color: '#ffffff',
                          cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                        }}
                        className="w-full py-3 font-bold hover:opacity-90 mb-2"
                      >
                        Continue to Checkout
                      </button>
                      {cart.length > 0 && (
                        <button
                          onClick={() => setCart([])}
                          style={{ color: '#666666' }}
                          className="w-full py-2 text-sm font-bold hover:opacity-70"
                        >
                          Clear Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Checkout */}
            {orderStep === 'checkout' && (
              <div className="p-8">
                <button
                  onClick={() => setOrderStep('menu')}
                  style={{ color: '#9b2226' }}
                  className="font-bold text-sm mb-6 hover:opacity-70"
                >
                  &larr; Back to Menu
                </button>

                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6 mb-6">
                  <h4 style={{ color: '#1a1a1a' }} className="text-lg font-bold mb-3">
                    Order Summary ({orderType === 'delivery' ? 'Delivery' : 'Pickup'})
                  </h4>
                  <div className="space-y-1 text-sm mb-3">
                    {cart.map((item) => (
                      <div key={item.name} style={{ color: '#333333' }} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '2px solid #1a1a1a', color: '#1a1a1a' }} className="flex justify-between pt-2 font-bold">
                    <span>Total (incl. tax{orderType === 'delivery' ? ' and delivery' : ''})</span>
                    <span style={{ color: '#9b2226' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="restaurant-order-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Name *</label>
                      <input
                        id="restaurant-order-name"
                        type="text"
                        required
                        value={checkoutInfo.name}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3"
                      />
                    </div>
                    <div>
                      <label htmlFor="restaurant-order-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                      <input
                        id="restaurant-order-phone"
                        type="tel"
                        required
                        value={checkoutInfo.phone}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="restaurant-order-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                    <input
                      id="restaurant-order-email"
                      type="email"
                      required
                      value={checkoutInfo.email}
                      onChange={(e) => setCheckoutInfo({ ...checkoutInfo, email: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  {orderType === 'delivery' && (
                    <div>
                      <label htmlFor="restaurant-order-address" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Delivery Address *</label>
                      <input
                        id="restaurant-order-address"
                        type="text"
                        required
                        value={checkoutInfo.address}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                        style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                        className="w-full px-4 py-3"
                        placeholder="Street address, city, ZIP"
                      />
                    </div>
                  )}

                  <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #ee9b00' }} className="p-4">
                    <div style={{ color: '#1a1a1a' }} className="font-bold mb-1">Payment</div>
                    <p style={{ color: '#666666' }} className="text-sm">
                      This is a demo checkout. Your order is simulated and no real payment is processed.
                      The full build accepts cards, Apple Pay, and Google Pay at this step.
                    </p>
                  </div>

                  {checkoutError && (
                    <div style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444', color: '#991b1b' }} className="p-4 text-sm font-bold">
                      {checkoutError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={placingOrder}
                    style={{ backgroundColor: '#9b2226', color: '#ffffff', opacity: placingOrder ? 0.7 : 1 }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    {placingOrder ? 'Placing Order...' : `Place ${orderType === 'delivery' ? 'Delivery' : 'Pickup'} Order - $${total.toFixed(2)}`}
                  </button>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {orderStep === 'confirmed' && placedOrder && (
              <div className="p-8">
                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #22c55e' }} className="p-8 text-center mb-6">
                  <div className="text-5xl mb-4">✓</div>
                  <h4 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-2">Order Confirmed!</h4>
                  <p style={{ color: '#666666' }} className="mb-4">
                    Order <span style={{ color: '#9b2226' }} className="font-bold">{placedOrder.number}</span> is being prepared.
                  </p>
                  <p style={{ color: '#1a1a1a' }} className="font-bold">
                    {placedOrder.type === 'delivery'
                      ? `Estimated delivery: ${placedOrder.eta}`
                      : `Ready for pickup in ${placedOrder.eta} at 456 Culinary Boulevard`}
                  </p>
                </div>

                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6 mb-6">
                  <h4 style={{ color: '#1a1a1a' }} className="text-lg font-bold mb-3">Receipt</h4>
                  <div className="space-y-1 text-sm mb-3">
                    {placedOrder.items.map((item) => (
                      <div key={item.name} style={{ color: '#333333' }} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '2px solid #1a1a1a', color: '#1a1a1a' }} className="flex justify-between pt-2 font-bold">
                    <span>Total Paid (simulated)</span>
                    <span style={{ color: '#9b2226' }}>${placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <p style={{ color: '#999999' }} className="text-sm text-center mb-6">
                  This is a demo order. No payment was collected and no food is being prepared.
                </p>

                <button
                  onClick={closeOrderModal}
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}
