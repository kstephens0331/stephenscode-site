'use client'

import { useState } from 'react'
import { Lock, CreditCard, Truck, CheckCircle } from 'lucide-react'
import type { CartItem } from '../CustomerView'

interface CheckoutPageProps {
  cart: CartItem[]
  clearCart: () => void
  setCurrentPage: (page: string) => void
}

export default function CheckoutPage({ cart, clearCart, setCurrentPage }: CheckoutPageProps) {
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
    }, 2000)
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
              <p className="text-3xl font-bold text-[var(--color-primary)] mb-6">#BB{Math.floor(Math.random() * 100000)}</p>
              <p className="text-gray-600">Estimated Delivery: 3-5 Business Days</p>
            </div>
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]">
                        <option>Select State</option>
                        <option>California</option>
                        <option>New York</option>
                        <option>Texas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                      <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      <Lock className="w-5 h-5 text-green-600" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-white text-gray-700 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
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
                  <div className="space-y-4 mb-8">
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
