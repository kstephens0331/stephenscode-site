'use client'

import { Star, Heart, ShoppingBag, Sparkles } from 'lucide-react'

export default function NewArrivalsPage({ addToCart, addToWishlist }: any) {
  const newProducts = [
    { id: 'n1', name: 'Silk Midi Dress', price: 289.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', rating: 5.0, sizes: ['XS', 'S', 'M', 'L'], colors: ['Emerald', 'Black', 'Navy'], newTag: 'Just In' },
    { id: 'n2', name: 'Leather Tote Bag', price: 249.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', rating: 4.9, sizes: ['One Size'], colors: ['Cognac', 'Black'], newTag: 'Just In' },
    { id: 'n3', name: 'Wool Blend Coat', price: 399.99, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', rating: 5.0, sizes: ['XS', 'S', 'M', 'L'], colors: ['Camel', 'Black', 'Gray'], newTag: 'Trending' },
    { id: 'n4', name: 'Satin Slip Dress', price: 189.99, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Champagne', 'Black', 'Rose'], newTag: 'Just In' },
    { id: 'n5', name: 'Chunky Gold Hoops', price: 79.99, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', rating: 4.9, sizes: ['One Size'], colors: ['Gold'], newTag: 'Best Seller' },
    { id: 'n6', name: 'Ribbed Knit Set', price: 169.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Cream', 'Mocha', 'Black'], newTag: 'Trending' },
    { id: 'n7', name: 'Suede Ankle Boots', price: 279.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 5.0, sizes: ['6', '7', '8', '9', '10'], colors: ['Tan', 'Black', 'Olive'], newTag: 'Just In' },
    { id: 'n8', name: 'Cropped Blazer', price: 219.99, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', rating: 4.8, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Ivory', 'Burgundy'], newTag: 'Trending' },
  ]

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Just In': return 'bg-purple-500'
      case 'Trending': return 'bg-pink-500'
      case 'Best Seller': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="py-12">
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
          <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold">
            All New
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-semibold hover:border-[var(--color-primary)] transition-colors">
            Just In
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-semibold hover:border-[var(--color-primary)] transition-colors">
            Trending
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-semibold hover:border-[var(--color-primary)] transition-colors">
            Best Sellers
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 ${getTagColor(product.newTag)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {product.newTag}
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
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.colors.map((color) => (
                    <div key={color} className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: color.toLowerCase() }}></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Never Miss a New Arrival</h2>
          <p className="text-xl mb-8 opacity-90">Subscribe to get early access to new collections</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
