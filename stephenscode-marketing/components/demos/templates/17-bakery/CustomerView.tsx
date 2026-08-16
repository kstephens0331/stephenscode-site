'use client'

import { useEffect, useRef, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { ShoppingCart, User, Menu, X, Cake, Heart, Phone, Mail, MapPin, Clock, Package, Truck, CheckCircle } from 'lucide-react'
import { loadJSON, saveJSON, CART_KEY, FAVORITES_KEY, ORDERS_KEY, PROFILE_KEY, type PlacedOrder } from './shared'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  customizations?: string[]
  image: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'Cakes' | 'Pastries' | 'Breads' | 'Cookies' | 'Bundles'
  image: string
}

const PRODUCTS: Product[] = [
  { id: 'choc-fudge-cake', name: 'Chocolate Fudge Cake', description: 'Rich three-layer chocolate cake with fudge frosting', price: 45.99, category: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
  { id: 'vanilla-bean-cake', name: 'Vanilla Bean Cake', description: 'Classic vanilla sponge with real vanilla bean buttercream', price: 42.99, category: 'Cakes', image: '' },
  { id: 'red-velvet-cake', name: 'Red Velvet Cake', description: 'Southern-style red velvet with cream cheese frosting', price: 48.99, category: 'Cakes', image: '' },
  { id: 'butter-croissant', name: 'Butter Croissant', description: 'Flaky, golden croissant made with European butter', price: 3.99, category: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { id: 'danish-pastry', name: 'Danish Pastry', description: 'Buttery danish filled with sweet cream cheese', price: 4.99, category: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', description: 'Soft roll swirled with cinnamon and vanilla glaze', price: 4.49, category: 'Pastries', image: '' },
  { id: 'sourdough-loaf', name: 'Sourdough Loaf', description: 'Naturally leavened sourdough with a crisp, crackly crust', price: 7.99, category: 'Breads', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 'artisan-baguette', name: 'Artisan Baguette', description: 'Traditional French baguette baked fresh every morning', price: 4.99, category: 'Breads', image: '' },
  { id: 'multigrain-loaf', name: 'Multigrain Loaf', description: 'Hearty loaf packed with seeds and whole grains', price: 6.99, category: 'Breads', image: '' },
  { id: 'choc-chip-cookies', name: 'Chocolate Chip Cookies (6)', description: 'Half a dozen soft-baked chocolate chip cookies', price: 9.99, category: 'Cookies', image: '' },
  { id: 'sugar-cookies', name: 'Frosted Sugar Cookies (6)', description: 'Hand-frosted sugar cookies in seasonal designs', price: 8.99, category: 'Cookies', image: '' },
  { id: 'macarons', name: 'French Macarons (6)', description: 'Assorted delicate macarons in six flavors', price: 14.99, category: 'Cookies', image: '' },
  { id: 'croissant-box', name: 'Croissants (6)', description: 'Half a dozen fresh butter croissants', price: 18.99, category: 'Bundles', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { id: 'cupcake-box', name: 'Cupcake Box (12)', description: 'A dozen assorted cupcakes, baker\'s choice', price: 36.99, category: 'Bundles', image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400' },
  { id: 'brownie-box', name: 'Brownies (6)', description: 'Fudgy double-chocolate brownies', price: 16.99, category: 'Bundles', image: 'https://images.unsplash.com/photo-1607920591413-4ec007814c59?w=400' },
]

const FEATURED_IDS = ['choc-fudge-cake', 'butter-croissant', 'cupcake-box', 'sourdough-loaf']
const ORDER_PAGE_IDS = ['choc-fudge-cake', 'croissant-box', 'cupcake-box', 'sourdough-loaf', 'danish-pastry', 'brownie-box']
const MENU_CATEGORIES = ['Cakes', 'Pastries', 'Breads', 'Cookies'] as const

const CAKE_SIZES = ['6" Round (Serves 8-10)', '8" Round (Serves 12-16)', '10" Round (Serves 20-24)']
const CAKE_PRICES: Record<string, number> = {
  '6" Round (Serves 8-10)': 45.99,
  '8" Round (Serves 12-16)': 65.99,
  '10" Round (Serves 20-24)': 85.99,
}
const CAKE_FLAVORS = ['Chocolate', 'Vanilla', 'Red Velvet', 'Lemon']
const CAKE_FROSTINGS = ['Buttercream', 'Cream Cheese', 'Fondant']

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Persisted state (loaded after mount to avoid SSR/localStorage mismatch)
  const [storageReady, setStorageReady] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [orders, setOrders] = useState<PlacedOrder[]>([])
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    setCart(loadJSON<CartItem[]>(CART_KEY, []))
    setFavorites(loadJSON<string[]>(FAVORITES_KEY, []))
    setOrders(loadJSON<PlacedOrder[]>(ORDERS_KEY, []))
    setProfile(loadJSON(PROFILE_KEY, { name: '', email: '', phone: '' }))
    setStorageReady(true)
  }, [])

  useEffect(() => { if (storageReady) saveJSON(CART_KEY, cart) }, [cart, storageReady])
  useEffect(() => { if (storageReady) saveJSON(FAVORITES_KEY, favorites) }, [favorites, storageReady])
  useEffect(() => { if (storageReady) saveJSON(ORDERS_KEY, orders) }, [orders, storageReady])

  // Toast feedback
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)
  const showToast = (message: string) => {
    setToast(message)
    if (typeof window !== 'undefined') {
      window.clearTimeout(toastTimer.current)
      toastTimer.current = window.setTimeout(() => setToast(''), 2200)
    }
  }
  useEffect(() => () => { if (typeof window !== 'undefined') window.clearTimeout(toastTimer.current) }, [])

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')

  // Custom cake designer
  const [cakeConfig, setCakeConfig] = useState({ size: CAKE_SIZES[0], flavor: CAKE_FLAVORS[0], frosting: CAKE_FROSTINGS[0], message: '' })
  const cakePrice = CAKE_PRICES[cakeConfig.size] ?? 45.99

  // Catering quote
  const [quoteType, setQuoteType] = useState<string | null>(null)
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', eventDate: '', guests: '', notes: '' })
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [quoteError, setQuoteError] = useState('')

  // Checkout
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1)
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery')
  const [checkoutInfo, setCheckoutInfo] = useState({ name: '', email: '', phone: '', address: '', date: '' })
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [placingOrder, setPlacingOrder] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null)

  // Account
  const [accountTab, setAccountTab] = useState<'profile' | 'orders' | 'favorites'>('profile')
  const [profileSaved, setProfileSaved] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Sweet Dreams Bakery',
          demoSlug: 'sweet-dreams-bakery',
          clientName: contactForm.name,
          clientEmail: contactForm.email,
          notes: contactForm.message,
        }),
      })
      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_contact_form',
          demo_slug: 'sweet-dreams-bakery',
        })
        trackConversion('leadForm')

        setContactSubmitted(true)
        setTimeout(() => {
          setContactSubmitted(false)
          setContactForm({ name: '', email: '', message: '' })
        }, 3000)
      } else {
        setContactError('Something went wrong sending your message. Please try again.')
      }
    } catch {
      setContactError('Something went wrong sending your message. Please try again.')
    }
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    showToast(`${item.name} added to cart`)
  }

  const addProductToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
  }

  const addCustomCake = () => {
    const extras = [`${cakeConfig.frosting} frosting`]
    if (cakeConfig.message.trim()) extras.push(`Message: "${cakeConfig.message.trim()}"`)
    addToCart({
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${cakeConfig.flavor} Cake`,
      price: cakePrice,
      size: cakeConfig.size,
      customizations: extras,
      image: '',
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }

  const clearCart = () => setCart([])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const standardDeliveryFee = cartTotal >= 50 ? 0 : 5
  const checkoutFee = orderType === 'pickup' ? 0 : standardDeliveryFee

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }
  const isFavorite = (id: string) => favorites.includes(id)

  const openQuote = (type: string) => {
    setQuoteType(type)
    setQuoteSubmitted(false)
    setQuoteError('')
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Sweet Dreams Bakery',
          demoSlug: 'sweet-dreams-bakery',
          clientName: quoteForm.name,
          clientEmail: quoteForm.email,
          clientPhone: quoteForm.phone,
          service: `Catering Quote -- ${quoteType ?? 'Event'}`,
          preferredDate: quoteForm.eventDate,
          notes: `Guests: ${quoteForm.guests || 'TBD'}. ${quoteForm.notes}`.trim(),
        }),
      })
      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_catering_quote',
          demo_slug: 'sweet-dreams-bakery',
        })
        trackConversion('leadForm')
        setQuoteSubmitted(true)
        setQuoteForm({ name: '', email: '', phone: '', eventDate: '', guests: '', notes: '' })
      } else {
        setQuoteError('Something went wrong sending your request. Please try again.')
      }
    } catch {
      setQuoteError('Something went wrong sending your request. Please try again.')
    }
  }

  const handleCheckoutDetails = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep(2)
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setPlacingOrder(true)
    setCheckoutError('')
    const order: PlacedOrder = {
      id: `SD-${String(Date.now()).slice(-6)}`,
      customer: checkoutInfo.name,
      email: checkoutInfo.email,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: orderType,
      items: cart.map(i => ({
        name: i.size ? `${i.name} (${i.size})` : i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      total: cartTotal + checkoutFee,
      status: 'In Progress',
    }
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Sweet Dreams Bakery',
          demoSlug: 'sweet-dreams-bakery',
          clientName: checkoutInfo.name,
          clientEmail: checkoutInfo.email,
          clientPhone: checkoutInfo.phone,
          service: `Online Order (${orderType === 'delivery' ? 'Delivery' : 'Pickup'})`,
          preferredDate: checkoutInfo.date,
          notes: `${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')} | Total $${order.total.toFixed(2)}`,
        }),
      })
      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_checkout',
          demo_slug: 'sweet-dreams-bakery',
        })
        trackConversion('leadForm')
        setOrders(prev => [order, ...prev])
        setLastOrder(order)
        clearCart()
        setCheckoutStep(1)
        setPayment({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
        setCurrentPage('confirmation')
      } else {
        setCheckoutError('Something went wrong placing your order. Please try again.')
      }
    } catch {
      setCheckoutError('Something went wrong placing your order. Please try again.')
    }
    setPlacingOrder(false)
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveJSON(PROFILE_KEY, profile)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'Custom Cakes', id: 'custom-cakes' },
    { name: 'Order Online', id: 'order' },
    { name: 'Catering', id: 'catering' },
    { name: 'Delivery', id: 'delivery' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  const favoriteButton = (id: string, extraClass = '') => (
    <button
      onClick={() => toggleFavorite(id)}
      aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-2 rounded-full transition-colors ${isFavorite(id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} ${extraClass}`}
    >
      <Heart className={`w-5 h-5 ${isFavorite(id) ? 'fill-red-500' : ''}`} />
    </button>
  )

  // Page renderers (plain functions so form inputs keep focus across re-renders)
  const renderHome = () => (
    <div>
      <section className="relative bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
                Freshly Baked Daily
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sweet Dreams
                <span className="block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Come True
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Artisan breads, decadent cakes, and pastries made with love since 2010.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg">
                  Order Now
                </button>
                <button onClick={() => setCurrentPage('menu')} className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all">
                  View Menu
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" alt="Bakery" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => FEATURED_IDS.includes(p.id)).map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  {favoriteButton(item.id, 'absolute top-3 right-3 bg-white/90 shadow-md')}
                  <button onClick={() => addProductToCart(item)} className="absolute bottom-4 left-4 right-4 bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xl font-bold text-[var(--color-primary)]">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  const renderMenu = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Menu</h1>
        {MENU_CATEGORIES.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.filter(p => p.category === category).map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="pr-3">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-bold text-[var(--color-primary)]">${item.price.toFixed(2)}</span>
                      {favoriteButton(item.id)}
                    </div>
                  </div>
                  <button onClick={() => addProductToCart(item)} className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCustomCakes = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Cake Designer</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Your Cake</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="bakery-cake-size" className="block font-semibold text-gray-700 mb-2">Size</label>
                <select
                  id="bakery-cake-size"
                  value={cakeConfig.size}
                  onChange={(e) => setCakeConfig({ ...cakeConfig, size: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                >
                  {CAKE_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="bakery-cake-flavor" className="block font-semibold text-gray-700 mb-2">Flavor</label>
                <select
                  id="bakery-cake-flavor"
                  value={cakeConfig.flavor}
                  onChange={(e) => setCakeConfig({ ...cakeConfig, flavor: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                >
                  {CAKE_FLAVORS.map(flavor => <option key={flavor} value={flavor}>{flavor}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="bakery-cake-frosting" className="block font-semibold text-gray-700 mb-2">Frosting</label>
                <select
                  id="bakery-cake-frosting"
                  value={cakeConfig.frosting}
                  onChange={(e) => setCakeConfig({ ...cakeConfig, frosting: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                >
                  {CAKE_FROSTINGS.map(frosting => <option key={frosting} value={frosting}>{frosting}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="bakery-cake-message" className="block font-semibold text-gray-700 mb-2">Message</label>
                <input
                  id="bakery-cake-message"
                  type="text"
                  placeholder="Happy Birthday!"
                  value={cakeConfig.message}
                  onChange={(e) => setCakeConfig({ ...cakeConfig, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                />
              </div>
              <button onClick={addCustomCake} className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Add to Cart (${cakePrice.toFixed(2)})
              </button>
              <button onClick={() => setCurrentPage('cart')} className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all">
                View Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
            <div className="bg-white rounded-lg p-8 aspect-square flex flex-col items-center justify-center text-center">
              <Cake className="w-32 h-32 text-[var(--color-primary)] mb-6" />
              <p className="text-lg font-bold text-gray-900">{cakeConfig.flavor} cake, {cakeConfig.frosting.toLowerCase()} frosting</p>
              <p className="text-gray-600">{cakeConfig.size}</p>
              {cakeConfig.message.trim() && (
                <p className="mt-3 italic text-[var(--color-primary)] font-semibold">&quot;{cakeConfig.message.trim()}&quot;</p>
              )}
              <p className="mt-4 text-2xl font-bold text-gray-900">${cakePrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOrder = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Order Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter(p => ORDER_PAGE_IDS.includes(p.id)).map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                {favoriteButton(item.id, 'absolute top-3 right-3 bg-white/90 shadow-md')}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[var(--color-primary)]">${item.price.toFixed(2)}</span>
                  <button onClick={() => addProductToCart(item)} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCatering = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catering Services</h1>
        <p className="text-xl text-gray-600 mb-12">Perfect for any event, from corporate meetings to weddings</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Corporate Events', 'Weddings', 'Private Parties'].map(type => (
            <div key={type} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <Cake className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-gray-600 mb-6">Custom packages available</p>
              <button onClick={() => openQuote(type)} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Request Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDelivery = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Delivery & Pickup</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <Truck className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery</h2>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• Same-day delivery available</li>
              <li>• Free delivery on orders over $50</li>
              <li>• Delivery radius: 15 miles</li>
              <li>• Schedule delivery up to 2 weeks in advance</li>
            </ul>
            <button onClick={() => { setOrderType('delivery'); setCurrentPage('order') }} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
              Start a Delivery Order
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <Package className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup</h2>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• Order online, pickup in-store</li>
              <li>• Ready in as little as 2 hours</li>
              <li>• Curbside pickup available</li>
              <li>• No minimum order required</li>
            </ul>
            <button onClick={() => { setOrderType('pickup'); setCurrentPage('order') }} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
              Start a Pickup Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.size ?? ''}`} className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.size && <p className="text-sm text-gray-600">{item.size}</p>}
                    {item.customizations?.map((c, i) => (
                      <p key={i} className="text-sm text-gray-600">{c}</p>
                    ))}
                    <p className="text-[var(--color-primary)] font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold">{standardDeliveryFee === 0 ? 'FREE' : `$${standardDeliveryFee.toFixed(2)}`}</span>
                </div>
                {standardDeliveryFee > 0 && (
                  <p className="text-xs text-gray-500">Free delivery on orders over $50. Pickup is always free.</p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${(cartTotal + standardDeliveryFee).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => { setCheckoutStep(1); setCheckoutError(''); setCurrentPage('checkout') }}
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCheckout = () => {
    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="flex items-center gap-3 mb-8">
            {[{ n: 1 as const, label: 'Details' }, { n: 2 as const, label: 'Payment' }].map(step => (
              <div key={step.n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${checkoutStep >= step.n ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step.n}
                </div>
                <span className={checkoutStep >= step.n ? 'font-semibold text-gray-900' : 'text-gray-500'}>{step.label}</span>
                {step.n === 1 && <div className="w-10 h-0.5 bg-gray-300 mx-1" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {checkoutStep === 1 ? (
                <form onSubmit={handleCheckoutDetails} className="bg-white rounded-xl shadow-md p-8 space-y-6">
                  <div>
                    <span className="block font-semibold text-gray-700 mb-2">Order Type</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`px-4 py-3 rounded-lg font-semibold border-2 transition-all ${orderType === 'delivery' ? 'border-[var(--color-primary)] bg-orange-50 text-[var(--color-primary)]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`px-4 py-3 rounded-lg font-semibold border-2 transition-all ${orderType === 'pickup' ? 'border-[var(--color-primary)] bg-orange-50 text-[var(--color-primary)]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        Pickup
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bakery-checkout-name" className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        id="bakery-checkout-name"
                        type="text"
                        required
                        value={checkoutInfo.name}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="bakery-checkout-email" className="block font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        id="bakery-checkout-email"
                        type="email"
                        required
                        value={checkoutInfo.email}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="jane@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="bakery-checkout-phone" className="block font-semibold text-gray-700 mb-2">Phone *</label>
                      <input
                        id="bakery-checkout-phone"
                        type="tel"
                        required
                        value={checkoutInfo.phone}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="bakery-checkout-date" className="block font-semibold text-gray-700 mb-2">
                        {orderType === 'delivery' ? 'Delivery Date *' : 'Pickup Date *'}
                      </label>
                      <input
                        id="bakery-checkout-date"
                        type="date"
                        required
                        value={checkoutInfo.date}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, date: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                  {orderType === 'delivery' && (
                    <div>
                      <label htmlFor="bakery-checkout-address" className="block font-semibold text-gray-700 mb-2">Delivery Address *</label>
                      <input
                        id="bakery-checkout-address"
                        type="text"
                        required
                        value={checkoutInfo.address}
                        onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="456 Main Street, Sweet City, SC 12345"
                      />
                    </div>
                  )}
                  <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                    Continue to Payment
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePlaceOrder} className="bg-white rounded-xl shadow-md p-8 space-y-6">
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-sm text-gray-700">
                    Demo checkout: this places a simulated order. No payment is processed and card details never leave this page.
                  </div>
                  <div>
                    <label htmlFor="bakery-card-name" className="block font-semibold text-gray-700 mb-2">Name on Card *</label>
                    <input
                      id="bakery-card-name"
                      type="text"
                      required
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="bakery-card-number" className="block font-semibold text-gray-700 mb-2">Card Number *</label>
                    <input
                      id="bakery-card-number"
                      type="text"
                      required
                      inputMode="numeric"
                      maxLength={19}
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bakery-card-expiry" className="block font-semibold text-gray-700 mb-2">Expiry *</label>
                      <input
                        id="bakery-card-expiry"
                        type="text"
                        required
                        maxLength={5}
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="12/28"
                      />
                    </div>
                    <div>
                      <label htmlFor="bakery-card-cvv" className="block font-semibold text-gray-700 mb-2">CVV *</label>
                      <input
                        id="bakery-card-cvv"
                        type="text"
                        required
                        inputMode="numeric"
                        maxLength={4}
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  {checkoutError && <p className="text-red-600 font-semibold">{checkoutError}</p>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="w-full bg-white text-gray-900 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                    >
                      Back to Details
                    </button>
                    <button
                      type="submit"
                      disabled={placingOrder}
                      className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-60"
                    >
                      {placingOrder ? 'Placing Order...' : `Place Order ($${(cartTotal + checkoutFee).toFixed(2)})`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size ?? ''}`} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{orderType === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                  <span className="font-semibold">{checkoutFee === 0 ? 'FREE' : `$${checkoutFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${(cartTotal + checkoutFee).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderConfirmation = () => {
    if (!lastOrder) {
      return (
        <div className="py-20 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No recent order found</h2>
          <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    return (
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Order <span className="font-bold text-gray-900">{lastOrder.id}</span> is in the oven queue.
              A confirmation was sent to <span className="font-semibold">{lastOrder.email}</span>.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{lastOrder.type === 'delivery' ? 'Delivery order' : 'Pickup order'}</span>
                <span>{lastOrder.date}</span>
              </div>
              <div className="space-y-2 mb-4">
                {lastOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[var(--color-primary)]">${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-6">Simulated demo order -- no payment was charged.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Continue Shopping
              </button>
              <button
                onClick={() => { setAccountTab('orders'); setCurrentPage('account') }}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAccount = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <button
            onClick={() => setAccountTab('profile')}
            className={`bg-white rounded-xl shadow-md p-6 text-left transition-all hover:shadow-xl ${accountTab === 'profile' ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
          >
            <User className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600">Manage your account details</p>
          </button>
          <button
            onClick={() => setAccountTab('orders')}
            className={`bg-white rounded-xl shadow-md p-6 text-left transition-all hover:shadow-xl ${accountTab === 'orders' ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
          >
            <Package className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Orders</h3>
            <p className="text-gray-600">View order history{orders.length > 0 ? ` (${orders.length})` : ''}</p>
          </button>
          <button
            onClick={() => setAccountTab('favorites')}
            className={`bg-white rounded-xl shadow-md p-6 text-left transition-all hover:shadow-xl ${accountTab === 'favorites' ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
          >
            <Heart className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Favorites</h3>
            <p className="text-gray-600">Your saved items{favorites.length > 0 ? ` (${favorites.length})` : ''}</p>
          </button>
        </div>

        {accountTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label htmlFor="bakery-profile-name" className="block font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  id="bakery-profile-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="bakery-profile-email" className="block font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="bakery-profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="jane@email.com"
                />
              </div>
              <div>
                <label htmlFor="bakery-profile-phone" className="block font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="bakery-profile-phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="(555) 123-4567"
                />
              </div>
              <button type="submit" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Save Profile
              </button>
              {profileSaved && <p className="text-green-600 font-semibold">Profile saved.</p>}
            </form>
          </div>
        )}

        {accountTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">No orders yet</p>
                <p className="text-gray-600 mb-6">Place an order and it will show up here.</p>
                <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date} • {order.type === 'delivery' ? 'Delivery' : 'Pickup'}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                  <p className="font-bold text-[var(--color-primary)]">${order.total.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        )}

        {accountTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</p>
                <p className="text-gray-600 mb-6">Tap the heart on any item to save it here.</p>
                <button onClick={() => setCurrentPage('menu')} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Browse the Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.filter(p => favorites.includes(p.id)).map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="pr-3">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-bold text-[var(--color-primary)]">${item.price.toFixed(2)}</span>
                        {favoriteButton(item.id)}
                      </div>
                    </div>
                    <button onClick={() => addProductToCart(item)} className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Sweet Dreams Bakery</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800" alt="Bakery" className="rounded-2xl shadow-xl" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2010, Sweet Dreams Bakery has been serving the community with fresh, handcrafted baked goods made from the finest ingredients.
            </p>
            <p className="text-lg text-gray-600">
              Every morning, our skilled bakers arrive before dawn to ensure everything is baked fresh daily, from our artisan breads to our decadent desserts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) SWEET-01</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@sweetdreamsbakery.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Mon-Sat: 7am-7pm<br />Sunday: 8am-5pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            {contactSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900">Message sent!</p>
                <p className="text-gray-600 mt-2">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <input
                  type="text"
                  aria-label="Your name"
                  placeholder="Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                />
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                />
                <textarea
                  rows={4}
                  aria-label="Message"
                  placeholder="Message"
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                ></textarea>
                {contactError && <p className="text-red-600 font-semibold text-sm">{contactError}</p>}
                <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome()
      case 'menu': return renderMenu()
      case 'custom-cakes': return renderCustomCakes()
      case 'order': return renderOrder()
      case 'catering': return renderCatering()
      case 'delivery': return renderDelivery()
      case 'cart': return renderCart()
      case 'checkout': return renderCheckout()
      case 'confirmation': return renderConfirmation()
      case 'account': return renderAccount()
      case 'about': return renderAbout()
      case 'contact': return renderContact()
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
              <Cake className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">Sweet Dreams</div>
                <div className="text-xs text-orange-200">Bakery & Café</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map(item => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('account')} aria-label="My account" className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentPage('cart')} aria-label="Shopping cart" className="relative p-2 hover:bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-[var(--color-primary)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              {navigation.map(item => (
                <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false) }} className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Cake className="w-8 h-8 mb-4" />
              <p className="text-gray-400">Fresh baked goods made with love since 2010</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Baker Street</p>
                <p>(555) SWEET-01</p>
                <p>hello@sweetdreamsbakery.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Sweet Dreams Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {quoteType && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Catering Quote: {quoteType}</h2>
              <button onClick={() => setQuoteType(null)} aria-label="Close quote form" className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {quoteSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">Quote request sent!</p>
                <p className="text-gray-600 mb-6">Our catering team will reach out within one business day.</p>
                <button onClick={() => setQuoteType(null)} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="bakery-quote-name" className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="bakery-quote-name"
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bakery-quote-email" className="block font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      id="bakery-quote-email"
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      placeholder="jane@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="bakery-quote-phone" className="block font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      id="bakery-quote-phone"
                      type="tel"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bakery-quote-date" className="block font-semibold text-gray-700 mb-2">Event Date *</label>
                    <input
                      id="bakery-quote-date"
                      type="date"
                      required
                      value={quoteForm.eventDate}
                      onChange={(e) => setQuoteForm({ ...quoteForm, eventDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="bakery-quote-guests" className="block font-semibold text-gray-700 mb-2">Guest Count</label>
                    <input
                      id="bakery-quote-guests"
                      type="number"
                      min={1}
                      value={quoteForm.guests}
                      onChange={(e) => setQuoteForm({ ...quoteForm, guests: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                      placeholder="50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bakery-quote-notes" className="block font-semibold text-gray-700 mb-2">Tell us about your event</label>
                  <textarea
                    id="bakery-quote-notes"
                    rows={3}
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                    placeholder="Dessert table for 50, mix of cupcakes and macarons..."
                  ></textarea>
                </div>
                {quoteError && <p className="text-red-600 font-semibold text-sm">{quoteError}</p>}
                <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Request Quote
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-[70] text-sm font-semibold">
          {toast}
        </div>
      )}
    </div>
  )
}
