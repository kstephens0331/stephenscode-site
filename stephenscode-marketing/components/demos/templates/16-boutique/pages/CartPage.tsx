'use client'

import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import type { CartItem } from '../CustomerView'

interface CartPageProps {
  cart: CartItem[]
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  removeFromCart: (id: string, size: string, color: string) => void
  clearCart: () => void
  setCurrentPage: (page: string) => void
}

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart, setCurrentPage }: CartPageProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <div className="text-sm text-gray-600 mb-3">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.price} each</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors h-fit"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-gray-900">Have a Promo Code?</h3>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                />
                <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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
                {subtotal < 100 && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-[var(--color-primary)]">
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[var(--color-primary)]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentPage('shop')}
                className="w-full bg-white text-gray-700 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">We Accept</p>
                <div className="flex justify-center space-x-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold">VISA</div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold">MC</div>
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold">AMEX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
