'use client'

import { useEffect, useState } from 'react'
import { Star, Heart, ShoppingBag, Tag, Clock, Check } from 'lucide-react'
import { saleProducts, getSwatchColor, type BoutiqueProduct } from '../data/products'
import ProductQuickView from '../components/ProductQuickView'

const INITIAL_SECONDS = ((2 * 24 + 14) * 60 + 32) * 60 + 18 // 2 days 14 hrs 32 min 18 sec

export default function SalePage({ setCurrentPage, addToCart, addToWishlist }: any) {
  const [quickViewProduct, setQuickViewProduct] = useState<BoutiqueProduct | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS)
  const [vipFormOpen, setVipFormOpen] = useState(false)
  const [vipEmail, setVipEmail] = useState('')
  const [vipJoined, setVipJoined] = useState(false)
  const [vipError, setVipError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const days = Math.floor(secondsLeft / 86400)
  const hours = Math.floor((secondsLeft % 86400) / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  const handleJoinVip = () => {
    const email = vipEmail.trim()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setVipError('Please enter a valid email address.')
      return
    }
    setVipError('')
    setVipJoined(true)
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
        {/* Sale Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-100 px-6 py-3 rounded-full mb-6">
            <Tag className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Up to 50% Off</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">End of Season Sale</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Don't miss out on our biggest sale of the year. Limited time only!
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-4 bg-gradient-to-r from-red-50 to-pink-50 py-6 px-8 rounded-xl max-w-lg mx-auto">
            <Clock className="w-6 h-6 text-red-600" />
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{pad(days)}</div>
                <div className="text-xs text-gray-600">DAYS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{pad(hours)}</div>
                <div className="text-xs text-gray-600">HOURS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{pad(minutes)}</div>
                <div className="text-xs text-gray-600">MINS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{pad(seconds)}</div>
                <div className="text-xs text-gray-600">SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sale Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">40-50%</p>
            <p className="text-gray-700 font-semibold">Average Discount</p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">200+</p>
            <p className="text-gray-700 font-semibold">Items on Sale</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">Free</p>
            <p className="text-gray-700 font-semibold">Shipping & Returns</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
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
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </button>
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold pointer-events-none">
                  -{product.discount}%
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
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-[var(--color-primary)] transition-colors">{product.name}</h3>
                </button>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-red-600">${product.price}</p>
                  <p className="text-lg text-gray-400 line-through">${product.originalPrice}</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">Only {product.sizes.length} sizes left!</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sale Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Sale Ends Soon!</h2>
          {vipJoined ? (
            <div className="max-w-md mx-auto bg-white/20 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center space-x-3">
              <Check className="w-6 h-6" />
              <p className="text-lg font-semibold">Welcome to the VIP list! Early sale access is headed your way.</p>
            </div>
          ) : vipFormOpen ? (
            <div className="max-w-md mx-auto">
              <p className="text-xl mb-6 opacity-90">Enter your email for exclusive early access</p>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  aria-label="Email address for VIP list"
                  placeholder="Enter your email"
                  value={vipEmail}
                  onChange={(e) => setVipEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleJoinVip() }}
                  autoFocus
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleJoinVip}
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Join
                </button>
              </div>
              {vipError && (
                <p className="mt-4 text-sm font-semibold bg-white/20 inline-block px-4 py-2 rounded-lg">{vipError}</p>
              )}
            </div>
          ) : (
            <>
              <p className="text-xl mb-8 opacity-90">Sign up for exclusive early access to future sales</p>
              <button
                onClick={() => setVipFormOpen(true)}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Join VIP List
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
