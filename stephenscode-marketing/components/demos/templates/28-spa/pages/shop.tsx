'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle } from 'lucide-react'

interface ShopPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

interface Product {
  name: string
  price: number
  category: string
  description: string
}

interface CartItem {
  name: string
  price: number
  qty: number
}

type CheckoutStep = 'cart' | 'shipping' | 'review' | 'done'

const CART_KEY = 'spa-demo-cart'

export default function ShopPage({ colors, onNavigate }: ShopPageProps) {
  const products: Product[] = [
    { name: 'Hydrating Serum', price: 89, category: 'Skincare', description: 'A lightweight hyaluronic serum that locks in moisture for a dewy, plump complexion. The same formula our estheticians use in treatments.' },
    { name: 'Aromatherapy Oil Set', price: 65, category: 'Wellness', description: 'Six essential oil blends: lavender, eucalyptus, citrus, cedarwood, peppermint, and chamomile. Bring the spa home.' },
    { name: 'Luxury Face Cream', price: 120, category: 'Skincare', description: 'Rich anti-aging cream with peptides and botanical extracts. Our best seller after facial treatments.' },
    { name: 'Essential Oil Diffuser', price: 45, category: 'Wellness', description: 'Ultrasonic diffuser with soft amber lighting and an auto-off timer. Pairs perfectly with our oil set.' },
    { name: 'Body Butter Collection', price: 55, category: 'Body Care', description: 'Three whipped body butters: shea vanilla, coconut lime, and almond honey. Deep hydration for all skin types.' },
    { name: 'Jade Roller Set', price: 38, category: 'Tools', description: 'Jade facial roller and gua sha stone to reduce puffiness and boost circulation. Includes a how-to guide.' }
  ]

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartLoaded, setCartLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [detailQty, setDetailQty] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [step, setStep] = useState<CheckoutStep>('cart')
  const [toast, setToast] = useState('')
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', zip: '' })
  const [shippingError, setShippingError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_KEY)
      if (stored) setCart(JSON.parse(stored))
    } catch {
      // localStorage unavailable -- cart works in memory only
    }
    setCartLoaded(true)
  }, [])

  useEffect(() => {
    if (!cartLoaded) return
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
      // localStorage unavailable -- cart works in memory only
    }
  }, [cart, cartLoaded])

  const visibleProducts = category === 'All' ? products : products.filter(p => p.category === category)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = Math.round(subtotal * 0.0825 * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name)
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, qty: item.qty + qty } : item)
      }
      return [...prev, { name: product.name, price: product.price, qty }]
    })
    showToast(`${product.name} added to cart`)
  }

  const updateQty = (name: string, delta: number) => {
    setCart(prev => prev
      .map(item => item.name === name ? { ...item, qty: item.qty + delta } : item)
      .filter(item => item.qty > 0)
    )
  }

  const removeItem = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name))
  }

  const openCart = () => {
    setStep('cart')
    setCartOpen(true)
  }

  const continueToReview = () => {
    if (!shipping.name.trim() || !shipping.email.trim() || !shipping.address.trim() || !shipping.city.trim() || !shipping.zip.trim()) {
      setShippingError('Please fill in all shipping fields.')
      return
    }
    setShippingError('')
    setStep('review')
  }

  const placeOrder = () => {
    const number = `SPA-ORD-${Math.floor(10000 + Math.random() * 90000)}`
    try {
      const stored = window.localStorage.getItem('spa-demo-orders')
      const orders = stored ? JSON.parse(stored) : []
      orders.push({
        number,
        total,
        date: new Date().toISOString().split('T')[0],
        items: cart.map(item => `${item.name} x${item.qty}`)
      })
      window.localStorage.setItem('spa-demo-orders', JSON.stringify(orders))
    } catch {
      // localStorage unavailable -- confirmation still shows
    }
    setOrderNumber(number)
    setCart([])
    setStep('done')
  }

  const closeCheckout = () => {
    setCartOpen(false)
    setStep('cart')
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-serif" style={{ color: colors.text }}>Shop Products</h1>
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={{
                borderColor: category === cat ? colors.primary : colors.border,
                backgroundColor: category === cat ? `${colors.primary}15` : 'transparent',
                color: category === cat ? colors.primary : colors.textLight
              }}
            >
              {cat}
              {cat !== 'All' && ` (${products.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleProducts.map((product, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => { setSelectedProduct(product); setDetailQty(1) }}
                className="w-full aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center transition-opacity hover:opacity-80"
              >
                <span style={{ color: colors.textLight }}>{product.name}</span>
              </button>
              <div className="p-6">
                <div className="text-xs mb-2" style={{ color: colors.textLight }}>{product.category}</div>
                <button
                  onClick={() => { setSelectedProduct(product); setDetailQty(1) }}
                  className="font-bold mb-2 text-left hover:underline"
                  style={{ color: colors.text }}
                >
                  {product.name}
                </button>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold" style={{ color: colors.primary }}>${product.price}</div>
                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    className="p-2 rounded-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-semibold"
          style={{ backgroundColor: colors.primary }}
        >
          {toast}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold font-serif" style={{ color: colors.text }}>{selectedProduct.name}</h3>
              <button onClick={() => setSelectedProduct(null)} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.textLight }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                <span style={{ color: colors.textLight }}>{selectedProduct.name}</span>
              </div>
              <div className="text-xs mb-2" style={{ color: colors.textLight }}>{selectedProduct.category}</div>
              <p className="mb-4" style={{ color: colors.text }}>{selectedProduct.description}</p>
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold" style={{ color: colors.primary }}>${selectedProduct.price}</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDetailQty(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-2 rounded-lg border-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-6 text-center" style={{ color: colors.text }}>{detailQty}</span>
                  <button
                    onClick={() => setDetailQty(q => q + 1)}
                    aria-label="Increase quantity"
                    className="p-2 rounded-lg border-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => { addToCart(selectedProduct, detailQty); setSelectedProduct(null) }}
                className="w-full py-3 rounded-lg font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Add {detailQty > 1 ? `${detailQty} ` : ''}to Cart: ${selectedProduct.price * detailQty}
              </button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeCheckout}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold font-serif" style={{ color: colors.text }}>
                {step === 'cart' && 'Your Cart'}
                {step === 'shipping' && 'Shipping Details'}
                {step === 'review' && 'Review Order'}
                {step === 'done' && 'Order Confirmed'}
              </h3>
              <button onClick={closeCheckout} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.textLight }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {step === 'cart' && (
                cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textLight }} />
                    <p className="mb-4" style={{ color: colors.textLight }}>Your cart is empty.</p>
                    <button
                      onClick={closeCheckout}
                      className="px-6 py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.name} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate" style={{ color: colors.text }}>{item.name}</div>
                          <div className="text-sm" style={{ color: colors.textLight }}>${item.price} each</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.name, -1)} aria-label={`Decrease ${item.name} quantity`} className="p-1.5 rounded border" style={{ borderColor: colors.border, color: colors.text }}>
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-5 text-center" style={{ color: colors.text }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.name, 1)} aria-label={`Increase ${item.name} quantity`} className="p-1.5 rounded border" style={{ borderColor: colors.border, color: colors.text }}>
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-bold w-16 text-right" style={{ color: colors.primary }}>${item.price * item.qty}</div>
                        <button onClick={() => removeItem(item.name)} aria-label={`Remove ${item.name} from cart`} className="p-1.5 rounded hover:bg-gray-200" style={{ color: colors.error }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <div className="border-t pt-4 space-y-1" style={{ borderColor: colors.border }}>
                      <div className="flex justify-between font-bold text-lg">
                        <span style={{ color: colors.text }}>Subtotal</span>
                        <span style={{ color: colors.primary }}>${subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-sm" style={{ color: colors.textLight }}>Tax and shipping calculated at checkout</p>
                    </div>
                    <button
                      onClick={() => setStep('shipping')}
                      className="w-full py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Checkout
                    </button>
                  </div>
                )
              )}

              {step === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="spa-ship-name" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Full Name</label>
                    <input id="spa-ship-name" type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
                  </div>
                  <div>
                    <label htmlFor="spa-ship-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Email</label>
                    <input id="spa-ship-email" type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
                  </div>
                  <div>
                    <label htmlFor="spa-ship-address" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Street Address</label>
                    <input id="spa-ship-address" type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="spa-ship-city" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>City</label>
                      <input id="spa-ship-city" type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
                    </div>
                    <div>
                      <label htmlFor="spa-ship-zip" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>ZIP Code</label>
                      <input id="spa-ship-zip" type="text" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className="w-full px-4 py-3 rounded-lg border" style={{ borderColor: colors.border }} />
                    </div>
                  </div>
                  {shippingError && <p className="text-sm font-medium" style={{ color: colors.error }}>{shippingError}</p>}
                  <div className="flex gap-3">
                    <button onClick={() => setStep('cart')} className="flex-1 py-3 rounded-lg font-semibold border-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                      Back to Cart
                    </button>
                    <button onClick={continueToReview} className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: colors.primary }}>
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-4">
                  <div className="rounded-lg p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                    <h4 className="font-bold mb-2" style={{ color: colors.text }}>Items</h4>
                    {cart.map(item => (
                      <div key={item.name} className="flex justify-between text-sm py-1">
                        <span style={{ color: colors.text }}>{item.name} x{item.qty}</span>
                        <span className="font-semibold" style={{ color: colors.text }}>${item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                    <h4 className="font-bold mb-2" style={{ color: colors.text }}>Ship To</h4>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {shipping.name}<br />
                      {shipping.address}<br />
                      {shipping.city}, {shipping.zip}
                    </p>
                  </div>
                  <div className="space-y-1 border-t pt-4" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.textLight }}>Subtotal</span>
                      <span style={{ color: colors.text }}>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.textLight }}>Shipping</span>
                      <span style={{ color: colors.text }}>Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.textLight }}>Tax (8.25%)</span>
                      <span style={{ color: colors.text }}>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-1">
                      <span style={{ color: colors.text }}>Total</span>
                      <span style={{ color: colors.primary }}>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('shipping')} className="flex-1 py-3 rounded-lg font-semibold border-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                      Back
                    </button>
                    <button onClick={placeOrder} className="flex-1 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: colors.primary }}>
                      Place Order
                    </button>
                  </div>
                  <p className="text-xs text-center" style={{ color: colors.textLight }}>
                    Demo checkout: no payment is collected.
                  </p>
                </div>
              )}

              {step === 'done' && (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
                  <h4 className="text-2xl font-bold mb-2 font-serif" style={{ color: colors.text }}>Thank You!</h4>
                  <p className="mb-1" style={{ color: colors.text }}>Order {orderNumber} has been placed.</p>
                  <p className="mb-2" style={{ color: colors.textLight }}>A confirmation email is on its way to {shipping.email}.</p>
                  <p className="text-xs mb-6" style={{ color: colors.textLight }}>Demo order: no payment was charged.</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={closeCheckout}
                      className="px-8 py-3 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => { closeCheckout(); onNavigate('portal') }}
                      className="px-8 py-3 rounded-lg font-semibold border-2"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      View Order in Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
