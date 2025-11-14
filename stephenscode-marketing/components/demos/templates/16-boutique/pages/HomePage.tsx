'use client'

import { ArrowRight, Star, TrendingUp, Heart, ShoppingBag } from 'lucide-react'

export default function HomePage({ demo, colors, setCurrentPage, addToCart, addToWishlist }: any) {
  const featuredProducts = [
    { id: '1', name: 'Silk Evening Dress', price: 299.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', rating: 4.9, sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Navy', 'Burgundy'] },
    { id: '2', name: 'Designer Handbag', price: 199.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', rating: 4.8, sizes: ['One Size'], colors: ['Tan', 'Black', 'White'] },
    { id: '3', name: 'Cashmere Sweater', price: 159.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Cream', 'Gray', 'Camel'] },
    { id: '4', name: 'Leather Boots', price: 249.99, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', rating: 4.9, sizes: ['6', '7', '8', '9', '10'], colors: ['Black', 'Brown', 'Tan'] },
  ]

  const collections = [
    { name: 'Spring Collection', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600', items: '42 items' },
    { name: 'Evening Wear', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600', items: '28 items' },
    { name: 'Casual Chic', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600', items: '56 items' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4">
                New Season, New Style
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Curated collections of elegant, timeless pieces that express your unique personality.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('new-arrivals')}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all border-2 border-gray-200"
                >
                  New Arrivals
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                  alt="Fashion Hero"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2,500+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured This Week</h2>
            <p className="text-xl text-gray-600">Our most-loved pieces, handpicked for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => addToCart({ ...product, size: product.sizes[0], color: product.colors[0] })}
                      className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-opacity-90"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Quick Add</span>
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
                    {product.colors.slice(0, 3).map((color) => (
                      <div key={color} className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: color.toLowerCase() }}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all border-2 border-gray-200"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Collection</h2>
            <p className="text-xl text-gray-600">Curated looks for every occasion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <button
                key={collection.name}
                onClick={() => setCurrentPage('collections')}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-white/90 mb-4">{collection.items}</p>
                  <div className="flex items-center text-white font-semibold">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully curated pieces</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
