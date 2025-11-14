'use client'

import { Star, Heart, ShoppingBag, Tag, Clock } from 'lucide-react'

export default function SalePage({ addToCart, addToWishlist }: any) {
  const saleProducts = [
    { id: 's1', name: 'Evening Gown', price: 199.99, originalPrice: 349.99, discount: 43, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', rating: 4.8, sizes: ['XS', 'S', 'M'], colors: ['Black', 'Navy'] },
    { id: 's2', name: 'Wool Sweater', price: 79.99, originalPrice: 139.99, discount: 43, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.6, sizes: ['S', 'M', 'L'], colors: ['Gray', 'Beige'] },
    { id: 's3', name: 'Leather Jacket', price: 249.99, originalPrice: 449.99, discount: 44, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', rating: 4.9, sizes: ['S', 'M'], colors: ['Black'] },
    { id: 's4', name: 'Silk Blouse', price: 69.99, originalPrice: 119.99, discount: 42, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L'], colors: ['White', 'Blush'] },
    { id: 's5', name: 'Designer Heels', price: 129.99, originalPrice: 249.99, discount: 48, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.5, sizes: ['7', '8', '9'], colors: ['Black', 'Nude'] },
    { id: 's6', name: 'Pencil Skirt', price: 59.99, originalPrice: 99.99, discount: 40, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', rating: 4.4, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Navy'] },
  ]

  return (
    <div className="py-12">
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
                <div className="text-3xl font-bold text-gray-900">02</div>
                <div className="text-xs text-gray-600">DAYS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">14</div>
                <div className="text-xs text-gray-600">HOURS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">32</div>
                <div className="text-xs text-gray-600">MINS</div>
              </div>
              <div className="text-3xl font-bold text-gray-400">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">18</div>
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
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
                <button
                  onClick={() => addToWishlist(product)}
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
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
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
          <p className="text-xl mb-8 opacity-90">Sign up for exclusive early access to future sales</p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Join VIP List
          </button>
        </div>
      </div>
    </div>
  )
}
