'use client'

import { useEffect, useRef, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { ShoppingCart, User, Menu, X, Search, Gem, Heart, Phone, Mail, MapPin, Star, Gift, Ruler, Package, Lock, CheckCircle, Sparkles, Send, Trash2 } from 'lucide-react'
import usePersistentState from './usePersistentState'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
  metals?: string[]
  sizes?: string[]
}

interface CartItem {
  lineId: string
  productId: string
  name: string
  price: number
  quantity: number
  metal?: string
  size?: string
  engraving?: string
  image: string
}

interface OrderRecord {
  id: string
  date: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
}

interface Registry {
  id: string
  code: string
  couple: string
  eventType: string
  date: string
  items: string[]
}

interface Profile {
  name: string
  email: string
  phone: string
}

const DEMO_NAME = 'Timeless Treasures Jewelry'
const DEMO_SLUG = 'timeless-treasures-jewelry'
const DEMO_PACKAGE = 'E-Commerce Website ($1,100)'

const IMG = {
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
  necklace: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  bracelet: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
  watch: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
}

const RING_SIZES = ['5', '6', '7', '8', '9']
const BRACELET_SIZES = ['6.5 in', '7 in', '7.5 in']

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Diamond Solitaire Ring', price: 3299.99, image: IMG.ring, rating: 5.0, category: 'Rings', description: 'A 1.2 carat GIA certified round brilliant diamond set in a classic four-prong solitaire mounting.', metals: ['14K Gold', '18K Gold', 'Platinum'], sizes: RING_SIZES },
  { id: 'p2', name: 'Pearl Necklace', price: 899.99, image: IMG.necklace, rating: 4.9, category: 'Necklaces', description: 'An 18 inch strand of hand-knotted Akoya cultured pearls finished with a 14K gold clasp.', metals: ['14K Gold', '14K White Gold'] },
  { id: 'p3', name: 'Gold Bracelet', price: 1499.99, image: IMG.bracelet, rating: 4.8, category: 'Bracelets', description: 'A solid 14K gold link bracelet with a secure lobster clasp, polished to a mirror finish.', metals: ['14K Gold', '18K Gold'], sizes: BRACELET_SIZES },
  { id: 'p4', name: 'Emerald Earrings', price: 2199.99, image: IMG.earrings, rating: 5.0, category: 'Earrings', description: 'Colombian emerald drop earrings framed by a halo of pave-set diamonds.', metals: ['18K Gold', 'Platinum'] },
  { id: 'p5', name: 'Vintage Halo Ring', price: 2749.99, image: IMG.ring, rating: 4.9, category: 'Rings', description: 'An art deco inspired halo ring with milgrain detailing and a cushion-cut center diamond.', metals: ['14K Gold', '18K Gold', 'Platinum'], sizes: RING_SIZES },
  { id: 'p6', name: 'Sapphire Pendant', price: 1599.99, image: IMG.necklace, rating: 4.7, category: 'Necklaces', description: 'A Ceylon sapphire pendant on an adjustable 16 to 18 inch cable chain.', metals: ['14K White Gold', 'Platinum'] },
  { id: 'p7', name: 'Diamond Stud Earrings', price: 1299.99, image: IMG.earrings, rating: 4.8, category: 'Earrings', description: 'Classic round brilliant diamond studs, 0.75 carat total weight, with screw-back posts.', metals: ['14K Gold', '14K White Gold', 'Platinum'] },
  { id: 'p8', name: 'Tennis Bracelet', price: 2899.99, image: IMG.bracelet, rating: 5.0, category: 'Bracelets', description: 'A 3 carat total weight diamond tennis bracelet with a double-locking safety clasp.', metals: ['14K White Gold', '18K Gold'], sizes: BRACELET_SIZES },
  { id: 'p9', name: 'Classic Chronograph Watch', price: 3899.99, image: IMG.watch, rating: 4.9, category: 'Watches', description: 'A Swiss automatic chronograph with a sapphire crystal and genuine leather strap.' },
  { id: 'p10', name: 'Rose Gold Wedding Band', price: 1099.99, image: IMG.ring, rating: 4.8, category: 'Rings', description: 'A 3mm comfort-fit wedding band in warm rose gold with a satin finish.', metals: ['14K Rose Gold', '18K Gold', 'Platinum'], sizes: RING_SIZES },
  { id: 'p11', name: 'Opal Statement Necklace', price: 1899.99, image: IMG.necklace, rating: 4.6, category: 'Necklaces', description: 'An Australian opal statement piece surrounded by seed pearls on a delicate chain.', metals: ['14K Gold'] },
  { id: 'p12', name: 'Two-Tone Dress Watch', price: 2499.99, image: IMG.watch, rating: 4.7, category: 'Watches', description: 'A slim two-tone dress watch with a mother-of-pearl dial and date complication.' },
]

const FEATURED = PRODUCTS.slice(0, 4)
const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches']

const MOCK_REGISTRIES: Registry[] = [
  { id: 'r1', code: 'TT-2481', couple: 'Emma & James Whitfield', eventType: 'Wedding', date: 'October 17, 2026', items: ['Pearl Necklace', 'Gold Bracelet', 'Diamond Stud Earrings'] },
  { id: 'r2', code: 'TT-1937', couple: 'Sofia & Miguel Alvarez', eventType: 'Anniversary', date: 'December 5, 2026', items: ['Sapphire Pendant', 'Tennis Bracelet'] },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, j) => (
        <Star key={j} className={`w-4 h-4 ${j < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

// ---------- Pages (top-level components so controlled inputs keep focus) ----------

function HomePage({ colors, onNavigate, onViewProduct }: { colors: ColorPalette; onNavigate: (page: string) => void; onViewProduct: (product: Product) => void }) {
  return (
    <div>
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #c9a227 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Est. 1985</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Timeless Treasures
                <span className="block text-yellow-400">Forever Yours</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Exquisite handcrafted jewelry for life's most precious moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => onNavigate('shop')} className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all shadow-lg">
                  Shop Collection
                </button>
                <button onClick={() => onNavigate('custom')} className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                  Custom Design
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" alt="Jewelry" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all">
                <div className="relative overflow-hidden bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button onClick={() => onViewProduct(product)} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Gem className="w-8 h-8 mr-2" />
                    <span className="font-semibold">View Details</span>
                  </button>
                  <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {product.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <Gem className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Diamonds</h3>
              <p className="text-gray-600">GIA certified stones with authenticity guarantee</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <Gift className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">Complimentary cleaning and maintenance</p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-md">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-gray-600">Full refund on unworn items</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ShopPage({ colors, category, onCategoryChange, onAddToCart, onViewProduct, wishlistIds, onToggleWishlist }: {
  colors: ColorPalette
  category: string
  onCategoryChange: (category: string) => void
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
  wishlistIds: string[]
  onToggleWishlist: (product: Product) => void
}) {
  const [sort, setSort] = useState('featured')

  const filtered = PRODUCTS.filter(p => category === 'All' || p.category === category)
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop All Jewelry</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-sm border-2 transition-colors ${category === cat ? 'text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-400'}`}
                style={category === cat ? { backgroundColor: colors.primary } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="jewelry-shop-sort" className="sr-only">Sort products</label>
            <select
              id="jewelry-shop-sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white text-gray-700 font-semibold text-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}{category !== 'All' ? ` in ${category}` : ''}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sorted.map(product => {
            const wishlisted = wishlistIds.includes(product.id)
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all">
                <div className="relative bg-gray-50">
                  <button onClick={() => onViewProduct(product)} className="block w-full" aria-label={`View ${product.name}`}>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <StarRow rating={product.rating} />
                  </div>
                  <button onClick={() => onViewProduct(product)} className="text-left">
                    <h3 className="font-bold text-gray-900 mb-2 hover:underline">{product.name}</h3>
                  </button>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>${product.price.toLocaleString()}</span>
                    <button onClick={() => onAddToCart(product)} className="text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CollectionsPage({ onSelectCollection }: { onSelectCollection: (category: string) => void }) {
  const collections = [
    { name: 'Engagement Rings', category: 'Rings', count: PRODUCTS.filter(p => p.category === 'Rings').length, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
    { name: 'Wedding Bands', category: 'Rings', count: PRODUCTS.filter(p => p.category === 'Rings').length, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { name: 'Necklaces', category: 'Necklaces', count: PRODUCTS.filter(p => p.category === 'Necklaces').length, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600' },
    { name: 'Earrings', category: 'Earrings', count: PRODUCTS.filter(p => p.category === 'Earrings').length, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
    { name: 'Bracelets', category: 'Bracelets', count: PRODUCTS.filter(p => p.category === 'Bracelets').length, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600' },
    { name: 'Fine Watches', category: 'Watches', count: PRODUCTS.filter(p => p.category === 'Watches').length, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600' },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(collection => (
            <button key={collection.name} onClick={() => onSelectCollection(collection.category)} className="group relative overflow-hidden rounded-xl shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                <p className="text-white/90">{collection.count} {collection.count === 1 ? 'piece' : 'pieces'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CustomDesignPage({ colors }: { colors: ColorPalette }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', jewelryType: 'Ring', stone: 'Diamond', notes: '' })
  const [metal, setMetal] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: DEMO_NAME,
          demoPackage: DEMO_PACKAGE,
          demoSlug: DEMO_SLUG,
          clientName: form.name,
          clientPhone: form.phone,
          clientEmail: form.email,
          service: `Custom Design Consultation: ${form.jewelryType}, ${metal || 'metal undecided'}, ${form.stone}`,
          preferredDate: '',
          preferredTime: '',
          notes: form.notes,
        }),
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_custom_design_form', demo_slug: DEMO_SLUG })
        trackConversion('leadForm')
        setSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Jewelry Design</h1>
        <p className="text-xl text-gray-600 mb-12">Create a one-of-a-kind piece with our expert designers</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Consultation Requested!</h2>
                <p className="text-gray-600 mb-2">
                  Thank you, {form.name}. Our design team will reach out within 24 hours to schedule your consultation.
                </p>
                <p className="text-gray-600 mb-6">
                  Request: {form.jewelryType} in {metal || 'your choice of metal'} with {form.stone}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', jewelryType: 'Ring', stone: 'Diamond', notes: '' }); setMetal('') }}
                  className="font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Your Piece</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="jewelry-design-name" className="block font-semibold text-gray-700 mb-2">Your Name *</label>
                      <input id="jewelry-design-name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="jewelry-design-email" className="block font-semibold text-gray-700 mb-2">Email *</label>
                      <input id="jewelry-design-email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="jane@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="jewelry-design-phone" className="block font-semibold text-gray-700 mb-2">Phone</label>
                    <input id="jewelry-design-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label htmlFor="jewelry-design-type" className="block font-semibold text-gray-700 mb-2">Jewelry Type</label>
                    <select id="jewelry-design-type" name="jewelryType" value={form.jewelryType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                      <option>Ring</option>
                      <option>Necklace</option>
                      <option>Earrings</option>
                      <option>Bracelet</option>
                    </select>
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-700 mb-2">Metal</span>
                    <div className="grid grid-cols-3 gap-3">
                      {['14K Gold', '18K Gold', 'Platinum'].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMetal(m)}
                          className={`px-4 py-3 border-2 rounded-lg transition-colors ${metal === m ? 'border-yellow-400 bg-yellow-50 font-semibold text-gray-900' : 'border-gray-200 hover:border-yellow-400'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="jewelry-design-stone" className="block font-semibold text-gray-700 mb-2">Stone</label>
                    <select id="jewelry-design-stone" name="stone" value={form.stone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                      <option>Diamond</option>
                      <option>Sapphire</option>
                      <option>Emerald</option>
                      <option>Ruby</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="jewelry-design-notes" className="block font-semibold text-gray-700 mb-2">Additional Notes</label>
                    <textarea id="jewelry-design-notes" name="notes" rows={4} value={form.notes} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="Describe your vision..."></textarea>
                  </div>
                  <button type="submit" className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                    Request Consultation
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-yellow-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Consultation</h4>
                  <p className="text-gray-600">Meet with our design team to discuss your vision</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Design</h4>
                  <p className="text-gray-600">Review 3D renderings and make adjustments</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Crafting</h4>
                  <p className="text-gray-600">Our master jewelers bring your design to life</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Delivery</h4>
                  <p className="text-gray-600">Receive your custom piece in 6-8 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GiftRegistryPage({ colors, registries, onCreateRegistry, onNavigate }: {
  colors: ColorPalette
  registries: Registry[]
  onCreateRegistry: (registry: Registry) => void
  onNavigate: (page: string) => void
}) {
  const [mode, setMode] = useState<'menu' | 'create' | 'find'>('menu')
  const [couple, setCouple] = useState('')
  const [eventType, setEventType] = useState('Wedding')
  const [eventDate, setEventDate] = useState('')
  const [createdCode, setCreatedCode] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [openRegistryId, setOpenRegistryId] = useState<string | null>(null)

  const allRegistries = [...MOCK_REGISTRIES, ...registries]
  const results = searched
    ? allRegistries.filter(r =>
        r.couple.toLowerCase().includes(query.trim().toLowerCase()) ||
        r.code.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const code = `TT-${Math.floor(1000 + Math.random() * 9000)}`
    onCreateRegistry({ id: code, code, couple, eventType, date: eventDate, items: [] })
    setCreatedCode(code)
  }

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    setOpenRegistryId(null)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Gift Registry</h1>
        <p className="text-xl text-gray-600 mb-12">Create your perfect wedding or special event registry</p>

        {mode === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <button onClick={() => setMode('create')} className="bg-white rounded-xl shadow-md p-12 text-center transition-all border-2 border-transparent hover:border-yellow-400">
              <Gift className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Registry</h3>
              <p className="text-gray-600">Start building your dream gift list</p>
            </button>
            <button onClick={() => setMode('find')} className="bg-white rounded-xl shadow-md p-12 text-center transition-all border-2 border-transparent hover:border-yellow-400">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Registry</h3>
              <p className="text-gray-600">Search for a couple's registry</p>
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            {createdCode ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Registry Created!</h2>
                <p className="text-gray-600 mb-4">Share this registry code with your guests:</p>
                <p className="text-3xl font-bold tracking-widest mb-6" style={{ color: colors.primary }}>{createdCode}</p>
                <p className="text-gray-600 mb-8">{couple} -- {eventType}{eventDate ? `, ${eventDate}` : ''}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => onNavigate('shop')} className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                    Browse Jewelry to Add
                  </button>
                  <button
                    onClick={() => { setCreatedCode(null); setCouple(''); setEventType('Wedding'); setEventDate(''); setMode('menu') }}
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-yellow-400"
                  >
                    Back to Registry Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Your Registry</h2>
                  <button type="button" onClick={() => setMode('menu')} className="text-gray-500 hover:text-gray-700 font-semibold">Back</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="jewelry-registry-couple" className="block font-semibold text-gray-700 mb-2">Couple / Host Names *</label>
                    <input id="jewelry-registry-couple" type="text" required value={couple} onChange={e => setCouple(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="Emma & James Whitfield" />
                  </div>
                  <div>
                    <label htmlFor="jewelry-registry-type" className="block font-semibold text-gray-700 mb-2">Event Type</label>
                    <select id="jewelry-registry-type" value={eventType} onChange={e => setEventType(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                      <option>Wedding</option>
                      <option>Anniversary</option>
                      <option>Engagement Party</option>
                      <option>Other Celebration</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="jewelry-registry-date" className="block font-semibold text-gray-700 mb-2">Event Date</label>
                    <input id="jewelry-registry-date" type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
                  </div>
                  <button type="submit" className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                    Create Registry
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {mode === 'find' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Find a Registry</h2>
                <button type="button" onClick={() => { setMode('menu'); setSearched(false); setQuery('') }} className="text-gray-500 hover:text-gray-700 font-semibold">Back</button>
              </div>
              <form onSubmit={handleFind} className="flex gap-3">
                <label htmlFor="jewelry-registry-search" className="sr-only">Search by couple name or registry code</label>
                <input
                  id="jewelry-registry-search"
                  type="text"
                  required
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="Couple name or registry code (try Emma or TT-2481)"
                />
                <button type="submit" className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 flex items-center" style={{ backgroundColor: colors.primary }}>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </form>
            </div>

            {searched && results.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
                No registries match "{query}". Try a couple's first name or a registry code like TT-2481.
              </div>
            )}

            {results.map(registry => (
              <div key={registry.id} className="bg-white rounded-xl shadow-md p-6 mb-4">
                <button onClick={() => setOpenRegistryId(openRegistryId === registry.id ? null : registry.id)} className="w-full flex items-center justify-between text-left">
                  <div>
                    <h3 className="font-bold text-gray-900">{registry.couple}</h3>
                    <p className="text-gray-600 text-sm">{registry.eventType}{registry.date ? ` | ${registry.date}` : ''} | Code {registry.code}</p>
                  </div>
                  <span className="font-semibold" style={{ color: colors.primary }}>{openRegistryId === registry.id ? 'Hide' : 'View'}</span>
                </button>
                {openRegistryId === registry.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {registry.items.length === 0 ? (
                      <p className="text-gray-600">This registry has no items yet. Check back soon!</p>
                    ) : (
                      <ul className="space-y-2">
                        {registry.items.map(item => (
                          <li key={item} className="flex items-center text-gray-700">
                            <Gift className="w-4 h-4 mr-2" style={{ color: colors.primary }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <button onClick={() => onNavigate('shop')} className="mt-4 font-semibold hover:underline" style={{ color: colors.primary }}>
                      Shop for this registry
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function WishlistPage({ colors, wishlistIds, onToggleWishlist, onAddToCart, onViewProduct, onNavigate }: {
  colors: ColorPalette
  wishlistIds: string[]
  onToggleWishlist: (product: Product) => void
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
  onNavigate: (page: string) => void
}) {
  const items = PRODUCTS.filter(p => wishlistIds.includes(p.id))

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Tap the heart on any piece in the shop to save it here.</p>
            <button onClick={() => onNavigate('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => onViewProduct(item)} className="block w-full bg-gray-50" aria-label={`View ${item.name}`}>
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                </button>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xl font-bold mb-4" style={{ color: colors.primary }}>${item.price.toLocaleString()}</p>
                  <div className="flex gap-3">
                    <button onClick={() => onAddToCart(item)} className="flex-1 text-white py-2 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                      Add to Cart
                    </button>
                    <button onClick={() => onToggleWishlist(item)} aria-label={`Remove ${item.name} from wishlist`} className="p-2 rounded-lg border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CartPage({ colors, cart, cartTotal, onUpdateQuantity, onRemoveLine, onNavigate }: {
  colors: ColorPalette
  cart: CartItem[]
  cartTotal: number
  onUpdateQuantity: (lineId: string, quantity: number) => void
  onRemoveLine: (lineId: string) => void
  onNavigate: (page: string) => void
}) {
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <button onClick={() => onNavigate('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
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
              <div key={item.lineId} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-50 hidden sm:block" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  {(item.metal || item.size || item.engraving) && (
                    <p className="text-sm text-gray-500">
                      {[item.metal, item.size ? `Size ${item.size}` : '', item.engraving ? `Engraved: "${item.engraving}"` : ''].filter(Boolean).join(' | ')}
                    </p>
                  )}
                  <p className="font-bold" style={{ color: colors.primary }}>${item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => onUpdateQuantity(item.lineId, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.lineId, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                </div>
                <button onClick={() => onRemoveLine(item.lineId)} aria-label={`Remove ${item.name} from cart`} className="p-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span style={{ color: colors.primary }}>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => onNavigate('checkout')} className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckoutPage({ colors, cart, cartTotal, onPlaceOrder, onNavigate }: {
  colors: ColorPalette
  cart: CartItem[]
  cartTotal: number
  onPlaceOrder: () => void
  onNavigate: (page: string) => void
}) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address: '', card: '', expiry: '', cvv: '' })
  const [processing, setProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    // Simulated payment processing -- this demo never charges a card.
    setTimeout(() => onPlaceOrder(), 900)
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <button onClick={() => onNavigate('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Secure Payment Processing</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="firstName" required value={form.firstName} onChange={handleChange} aria-label="First name" placeholder="First Name" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
                <input type="text" name="lastName" required value={form.lastName} onChange={handleChange} aria-label="Last name" placeholder="Last Name" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
              </div>
              <input type="email" name="email" required value={form.email} onChange={handleChange} aria-label="Email address" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="text" name="address" required value={form.address} onChange={handleChange} aria-label="Shipping address" placeholder="Shipping Address" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="text" name="card" required inputMode="numeric" value={form.card} onChange={handleChange} aria-label="Card number" placeholder="Card Number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <div className="grid grid-cols-2 gap-6">
                <input type="text" name="expiry" required value={form.expiry} onChange={handleChange} aria-label="Card expiry date" placeholder="MM/YY" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
                <input type="text" name="cvv" required inputMode="numeric" value={form.cvv} onChange={handleChange} aria-label="Card security code" placeholder="CVV" className="px-4 py-3 border-2 border-gray-200 rounded-lg" />
              </div>
              <button type="submit" disabled={processing} className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60" style={{ backgroundColor: colors.primary }}>
                {processing ? 'Processing...' : `Complete Purchase ($${cartTotal.toLocaleString()})`}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Demo checkout: this order is simulated. No payment is processed and card details never leave this page.
              </p>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Order</h2>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.lineId} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span style={{ color: colors.primary }}>${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderConfirmationPage({ colors, order, onNavigate }: {
  colors: ColorPalette
  order: OrderRecord | null
  onNavigate: (page: string) => void
}) {
  if (!order) {
    return (
      <div className="py-20 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No recent order found</h2>
        <button onClick={() => onNavigate('shop')} className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for shopping with Timeless Treasures.</p>
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-bold text-gray-900">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span style={{ color: colors.primary }}>${order.total.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-8">
            This is a simulated demo order. No payment was processed and nothing will ship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('shop')} className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
              Continue Shopping
            </button>
            <button onClick={() => onNavigate('account')} className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-yellow-400">
              View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountPage({ colors, profile, onSaveProfile, orders, wishlistCount, onNavigate }: {
  colors: ColorPalette
  profile: Profile
  onSaveProfile: (profile: Profile) => void
  orders: OrderRecord[]
  wishlistCount: number
  onNavigate: (page: string) => void
}) {
  const [section, setSection] = useState<'profile' | 'orders'>('profile')
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setName(profile.name)
    setEmail(profile.email)
    setPhone(profile.phone)
  }, [profile])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveProfile({ name, email, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const statusColor = (status: string) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700'
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700'
    return 'bg-amber-100 text-amber-700'
  }

  const cards = [
    { icon: User, title: 'Profile', desc: 'Manage account details', action: () => setSection('profile'), active: section === 'profile' },
    { icon: Package, title: 'Orders', desc: `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed`, action: () => setSection('orders'), active: section === 'orders' },
    { icon: Heart, title: 'Wishlist', desc: `${wishlistCount} saved ${wishlistCount === 1 ? 'item' : 'items'}`, action: () => onNavigate('wishlist'), active: false },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {cards.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.title}
                onClick={item.action}
                className={`bg-white rounded-xl shadow-md p-8 text-center transition-all border-2 ${item.active ? 'border-yellow-400' : 'border-transparent hover:border-yellow-200'}`}
              >
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </button>
            )
          })}
        </div>

        {section === 'profile' && (
          <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="jewelry-account-name" className="block font-semibold text-gray-700 mb-2">Full Name</label>
                <input id="jewelry-account-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="jewelry-account-email" className="block font-semibold text-gray-700 mb-2">Email</label>
                <input id="jewelry-account-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="you@email.com" />
              </div>
              <div>
                <label htmlFor="jewelry-account-phone" className="block font-semibold text-gray-700 mb-2">Phone</label>
                <input id="jewelry-account-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" placeholder="(555) 123-4567" />
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                  Save Profile
                </button>
                {saved && (
                  <span className="text-green-600 font-semibold flex items-center">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    Saved
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {section === 'orders' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                <button onClick={() => onNavigate('shop')} className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90" style={{ backgroundColor: colors.primary }}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(order.status)}`}>{order.status}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                    </p>
                    <p className="font-bold" style={{ color: colors.primary }}>${order.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Timeless Treasures</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800" alt="Jewelry" className="rounded-2xl shadow-xl" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legacy</h2>
            <p className="text-lg text-gray-600 mb-4">
              Since 1985, Timeless Treasures has been crafting exquisite jewelry pieces that celebrate life's most precious moments.
            </p>
            <p className="text-lg text-gray-600">
              Each piece is meticulously handcrafted by our master jewelers using only the finest materials and gemstones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage({ colors }: { colors: ColorPalette }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: DEMO_NAME,
          demoPackage: DEMO_PACKAGE,
          demoSlug: DEMO_SLUG,
          clientName: form.name,
          clientPhone: '',
          clientEmail: form.email,
          service: 'Contact Message',
          preferredDate: '',
          preferredTime: '',
          notes: form.message,
        }),
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: DEMO_SLUG })
        trackConversion('leadForm')
        setSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Address', content: '123 Diamond Street, Luxury City, LC 12345' },
              { icon: Phone, title: 'Phone', content: '(555) GEM-SHOP' },
              { icon: Mail, title: 'Email', content: 'hello@timelesstreasures.com' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-xl shadow-md p-6">
                  <Icon className="w-8 h-8 mb-4" style={{ color: colors.primary }} />
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              )
            })}
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  className="font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="name" required value={form.name} onChange={handleChange} aria-label="Your name" placeholder="Name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
                  <input type="email" name="email" required value={form.email} onChange={handleChange} aria-label="Email address" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
                  <textarea rows={5} name="message" required value={form.message} onChange={handleChange} aria-label="Message" placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"></textarea>
                  <button type="submit" className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductModal({ colors, product, wishlisted, onClose, onAddToCart, onToggleWishlist }: {
  colors: ColorPalette
  product: Product
  wishlisted: boolean
  onClose: () => void
  onAddToCart: (product: Product, options: { metal?: string; size?: string; engraving?: string }) => void
  onToggleWishlist: (product: Product) => void
}) {
  const [metal, setMetal] = useState(product.metals?.[0] ?? '')
  const [size, setSize] = useState(product.sizes?.[0] ?? '')
  const [engraving, setEngraving] = useState('')
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(product, {
      metal: metal || undefined,
      size: size || undefined,
      engraving: engraving.trim() || undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50">
            <img src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover" />
          </div>
          <div className="p-8 relative">
            <button onClick={onClose} aria-label="Close product details" className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">{product.category}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <div className="flex items-center space-x-2 mb-4">
              <StarRow rating={product.rating} />
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
            </div>
            <p className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>${product.price.toLocaleString()}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {product.metals && product.metals.length > 0 && (
              <div className="mb-5">
                <span className="block font-semibold text-gray-700 mb-2">Metal</span>
                <div className="flex flex-wrap gap-2">
                  {product.metals.map(m => (
                    <button
                      key={m}
                      onClick={() => setMetal(m)}
                      className={`px-4 py-2 border-2 rounded-lg text-sm transition-colors ${metal === m ? 'border-yellow-400 bg-yellow-50 font-semibold text-gray-900' : 'border-gray-200 hover:border-yellow-400'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <span className="font-semibold text-gray-700 mb-2 flex items-center">
                  <Ruler className="w-4 h-4 mr-1" />
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 border-2 rounded-lg text-sm transition-colors ${size === s ? 'border-yellow-400 bg-yellow-50 font-semibold text-gray-900' : 'border-gray-200 hover:border-yellow-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="jewelry-modal-engraving" className="block font-semibold text-gray-700 mb-2">Engraving (complimentary)</label>
              <input
                id="jewelry-modal-engraving"
                type="text"
                maxLength={30}
                value={engraving}
                onChange={e => setEngraving(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                placeholder="Optional message, up to 30 characters"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={handleAdd} className="flex-1 text-white py-3 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                {added ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                className={`p-3 rounded-lg border-2 transition-colors ${wishlisted ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Root customer view ----------

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cart, setCart] = usePersistentState<CartItem[]>('demo19-jewelry-cart', [])
  const [wishlistIds, setWishlistIds] = usePersistentState<string[]>('demo19-jewelry-wishlist', [])
  const [orders, setOrders] = usePersistentState<OrderRecord[]>('demo19-jewelry-orders', [])
  const [registries, setRegistries] = usePersistentState<Registry[]>('demo19-jewelry-registries', [])
  const [profile, setProfile] = usePersistentState<Profile>('demo19-jewelry-profile', { name: '', email: '', phone: '' })
  const [shopCategory, setShopCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  const navigate = (page: string) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
  }

  const addToCart = (product: Product, options?: { metal?: string; size?: string; engraving?: string }) => {
    const metal = options?.metal
    const size = options?.size
    const engraving = options?.engraving
    const lineId = [product.id, metal ?? '', size ?? '', engraving ?? ''].join('|')
    setCart(prev => {
      const existing = prev.find(line => line.lineId === lineId)
      if (existing) {
        return prev.map(line => line.lineId === lineId ? { ...line, quantity: line.quantity + 1 } : line)
      }
      return [...prev, { lineId, productId: product.id, name: product.name, price: product.price, quantity: 1, metal, size, engraving, image: product.image }]
    })
    showToast(`${product.name} added to cart`)
  }

  const updateQuantity = (lineId: string, quantity: number) => {
    setCart(prev => prev.map(line => line.lineId === lineId ? { ...line, quantity } : line).filter(line => line.quantity > 0))
  }

  const removeLine = (lineId: string) => {
    setCart(prev => prev.filter(line => line.lineId !== lineId))
  }

  const toggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        showToast(`${product.name} removed from wishlist`)
        return prev.filter(id => id !== product.id)
      }
      showToast(`${product.name} saved to wishlist`)
      return [...prev, product.id]
    })
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const placeOrder = () => {
    const order: OrderRecord = {
      id: `TT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: cartTotal,
      status: 'Processing',
    }
    setOrders(prev => [order, ...prev])
    setLastOrder(order)
    setCart([])
    setCurrentPage('confirmation')
  }

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Collections', id: 'collections' },
    { name: 'Custom Design', id: 'custom' },
    { name: 'Gift Registry', id: 'registry' },
    { name: 'Wishlist', id: 'wishlist' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage colors={colors} onNavigate={navigate} onViewProduct={setSelectedProduct} />
      case 'shop':
        return <ShopPage colors={colors} category={shopCategory} onCategoryChange={setShopCategory} onAddToCart={addToCart} onViewProduct={setSelectedProduct} wishlistIds={wishlistIds} onToggleWishlist={toggleWishlist} />
      case 'collections':
        return <CollectionsPage onSelectCollection={category => { setShopCategory(category); navigate('shop') }} />
      case 'custom':
        return <CustomDesignPage colors={colors} />
      case 'registry':
        return <GiftRegistryPage colors={colors} registries={registries} onCreateRegistry={registry => setRegistries(prev => [...prev, registry])} onNavigate={navigate} />
      case 'wishlist':
        return <WishlistPage colors={colors} wishlistIds={wishlistIds} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} onViewProduct={setSelectedProduct} onNavigate={navigate} />
      case 'cart':
        return <CartPage colors={colors} cart={cart} cartTotal={cartTotal} onUpdateQuantity={updateQuantity} onRemoveLine={removeLine} onNavigate={navigate} />
      case 'checkout':
        return <CheckoutPage colors={colors} cart={cart} cartTotal={cartTotal} onPlaceOrder={placeOrder} onNavigate={navigate} />
      case 'confirmation':
        return <OrderConfirmationPage colors={colors} order={lastOrder} onNavigate={navigate} />
      case 'account':
        return <AccountPage colors={colors} profile={profile} onSaveProfile={updated => setProfile(updated)} orders={orders} wishlistCount={wishlistIds.length} onNavigate={navigate} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage colors={colors} />
      default:
        return <HomePage colors={colors} onNavigate={navigate} onViewProduct={setSelectedProduct} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => navigate('home')} className="flex items-center space-x-3">
              <Gem className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="text-2xl font-bold">Timeless Treasures</div>
                <div className="text-xs text-yellow-400">Fine Jewelry Since 1985</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map(item => (
                <button key={item.id} onClick={() => navigate(item.id)} className={`px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('account')} aria-label="My account" className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => navigate('wishlist')} aria-label="Wishlist" className="p-2 hover:bg-white/10 rounded-lg relative">
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlistIds.length}</span>}
              </button>
              <button onClick={() => navigate('cart')} aria-label="Shopping cart" className="relative p-2 hover:bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              {navigation.map(item => (
                <button key={item.id} onClick={() => navigate(item.id)} className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="bg-slate-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Gem className="w-8 h-8 text-yellow-400 mb-4" />
              <p className="text-gray-400">Exquisite handcrafted jewelry since 1985</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400">Shop</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => navigate(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Diamond Street</p>
                <p>(555) GEM-SHOP</p>
                <p>hello@timelesstreasures.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Timeless Treasures Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          colors={colors}
          product={selectedProduct}
          wishlisted={wishlistIds.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-yellow-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
