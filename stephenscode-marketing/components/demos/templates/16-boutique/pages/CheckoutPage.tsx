'use client'

import { useState } from 'react'
import { Lock, CreditCard, Truck, CheckCircle } from 'lucide-react'
import type { CartItem } from '../CustomerView'
import { computeTotals } from './CartPage'

interface CheckoutPageProps {
  cart: CartItem[]
  clearCart: () => void
  setCurrentPage: (page: string) => void
  appliedPromo: string | null
}

export interface StoredOrder {
  id: string
  date: string
  status: string
  total: number
  items: number
  itemsList: { id: string; name: string; price: number; image: string; size: string; color: string; quantity: number }[]
}

const ORDERS_KEY = 'boutique-demo-orders'

export default function CheckoutPage({ cart, clearCart, setCurrentPage, appliedPromo }: CheckoutPageProps) {
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber] = useState(() => `#BB${Math.floor(10000 + Math.random() * 90000)}`)
  const [orderTotal, setOrderTotal] = useState(0)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '', phone: ''
  })
  const [shippingError, setShippingError] = useState('')

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  })
  const [paymentError, setPaymentError] = useState('')

  const { subtotal, discount, shipping, tax, total } = computeTotals(cart, appliedPromo)

  const handleContinueToPayment = () => {
    const { firstName, lastName, email, address, city, state, zip } = shippingInfo
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !address.trim() || !city.trim() || !state || !zip.trim()) {
      setShippingError('Please fill in all shipping fields before continuing.')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setShippingError('Please enter a valid email address.')
      return
    }
    setShippingError('')
    setStep(2)
  }

  const handleReviewOrder = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentInfo
    if (!cardNumber.trim() || !cardName.trim() || !expiry.trim() || !cvv.trim()) {
      setPaymentError('Please fill in all payment fields before continuing.')
      return
    }
    setPaymentError('')
    setStep(3)
  }

  const handlePlaceOrder = () => {
    setOrderTotal(total)
    try {
      const stored = localStorage.getItem(ORDERS_KEY)
      const orders: StoredOrder[] = stored ? JSON.parse(stored) : []
      orders.unshift({
        id: orderNumber,
        date: new Date().toISOString().slice(0, 10),
        status: 'Processing',
        total,
        items: cart.reduce((sum, item) => sum + item.quantity, 0),
        itemsList: cart.map(item => ({ ...item })),
      })
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    } catch {
      // Storage unavailable -- confirmation still shows
    }
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. We've sent a confirmation email with your order details.
            </p>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <p className="text-gray-600 mb-2">Order Number</p>
              <p className="text-3xl font-bold text-[var(--color-primary)] mb-4">{orderNumber}</p>
              <p className="text-gray-600 mb-2">Order Total: <span className="font-bold text-gray-900">${orderTotal.toFixed(2)}</span></p>
              <p className="text-gray-600">Estimated Delivery: 3-5 Business Days</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">This is a simulated demo order. No payment was charged.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('account')}
                className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                View Order Status
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nothing to Check Out Yet</h1>
          <p className="text-gray-600 mb-8">Add a few pieces to your cart first, then come back to complete your order.</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`w-24 h-1 ${step >= 3 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <Truck className="w-6 h-6 text-[var(--color-primary)]" />
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="boutique-checkout-first-name" className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input id="boutique-checkout-first-name" type="text" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-last-name" className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input id="boutique-checkout-last-name" type="text" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="boutique-checkout-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input id="boutique-checkout-email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="boutique-checkout-address" className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input id="boutique-checkout-address" type="text" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-city" className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input id="boutique-checkout-city" type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-state" className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <select id="boutique-checkout-state" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]">
                        <option value="">Select State</option>
                        <option>California</option>
                        <option>Florida</option>
                        <option>Illinois</option>
                        <option>New York</option>
                        <option>Texas</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-zip" className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                      <input id="boutique-checkout-zip" type="text" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input id="boutique-checkout-phone" type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                  </div>
                  {shippingError && (
                    <p className="mt-6 text-sm text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-lg">{shippingError}</p>
                  )}
                  <button
                    onClick={handleContinueToPayment}
                    className="w-full mt-8 bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
                    <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="boutique-checkout-card-number" className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input id="boutique-checkout-card-number" type="text" placeholder="1234 5678 9012 3456" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label htmlFor="boutique-checkout-cardholder-name" className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                      <input id="boutique-checkout-cardholder-name" type="text" value={paymentInfo.cardName} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="boutique-checkout-expiry" className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input id="boutique-checkout-expiry" type="text" placeholder="MM/YY" value={paymentInfo.expiry} onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                      </div>
                      <div>
                        <label htmlFor="boutique-checkout-cvv" className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input id="boutique-checkout-cvv" type="text" placeholder="123" value={paymentInfo.cvv} onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      <Lock className="w-5 h-5 text-green-600" />
                      <span>Demo checkout: enter any sample card details. No real payment is processed.</span>
                    </div>
                  </div>
                  {paymentError && (
                    <p className="mt-6 text-sm text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-lg">{paymentError}</p>
                  )}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white text-gray-700 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleReviewOrder}
                      className="flex-1 bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Size: {item.size}, Color: {item.color}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-600">
                    <p className="font-semibold text-gray-900 mb-1">Shipping To</p>
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-white text-gray-700 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo})</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-[var(--color-primary)]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
