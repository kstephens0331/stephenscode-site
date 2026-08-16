'use client'

import { useState } from 'react'
import { Star, Heart, ShoppingBag, Sparkles, Check } from 'lucide-react'
import { newArrivalProducts, getSwatchColor, type BoutiqueProduct } from '../data/products'
import ProductQuickView from '../components/ProductQuickView'

export default function NewArrivalsPage({ setCurrentPage, addToCart, addToWishlist }: any) {
  const [activeFilter, setActiveFilter] = useState('All New')
  const [quickViewProduct, setQuickViewProduct] = useState<BoutiqueProduct | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')

  const filters = ['All New', 'Just In', 'Trending', 'Best Sellers']

  const filteredProducts = newArrivalProducts.filter(product => {
    if (activeFilter === 'All New') return true
    if (activeFilter === 'Best Sellers') return product.newTag === 'Best Seller'
    return product.newTag === activeFilter
  })

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Just In': return 'bg-purple-500'
      case 'Trending': return 'bg-pink-500'
      case 'Best Seller': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const handleSubscribe = () => {
    const email = newsletterEmail.trim()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterError('Please enter a valid email address.')
      return
    }
    setNewsletterError('')
    setNewsletterSubscribed(true)
  }

  return (
    <div className="py-12">
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        onViewCart={() => { setQuickViewProduct(null); setCurrentPage('cart') }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-semibold text-[var(--color-primary)]">Fresh Arrivals Weekly</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">New Arrivals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be the first to discover our latest collection of carefully selected pieces
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeFilter === filter
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[var(--color-primary)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300">
              <div className="relative overflow-hidden">
                <button
                  onClick={() => setQuickViewProduct(product)}
                  aria-label={`View ${product.name}`}
                  className="block w-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </button>
                <div className={`absolute top-4 left-4 ${getTagColor(product.newTag || '')} text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none`}>
                  {product.newTag}
                </div>
                <button
                  onClick={() => addToWishlist(product)}
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addToCart({ ...product, size: product.sizes[0], color: product.colors[0] })}
                    className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
                <button onClick={() => setQuickViewProduct(product)} className="block text-left">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{product.name}</h3>
                </button>
                <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.colors.map((color) => (
                    <div key={color} className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: getSwatchColor(color) }}></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Never Miss a New Arrival</h2>
          {newsletterSubscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center space-x-3">
                <Check className="w-6 h-6" />
                <p className="text-lg font-semibold">You&apos;re on the list! Watch your inbox for early access.</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xl mb-8 opacity-90">Subscribe to get early access to new collections</p>
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  aria-label="Email address for newsletter"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubscribe() }}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="mt-4 text-sm font-semibold bg-white/20 inline-block px-4 py-2 rounded-lg">{newsletterError}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
