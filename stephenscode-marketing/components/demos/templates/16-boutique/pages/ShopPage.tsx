'use client'

import { useState } from 'react'
import { Filter, Star, Heart, ShoppingBag, X } from 'lucide-react'
import { shopProducts, getSwatchColor, type BoutiqueProduct } from '../data/products'
import ProductQuickView from '../components/ProductQuickView'

export default function ShopPage({ setCurrentPage, addToCart, addToWishlist }: any) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BoutiqueProduct | null>(null)

  const products = shopProducts

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' },
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size']
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Beige', 'Burgundy', 'Red']

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) return false
    if (selectedColor !== 'all' && !product.colors.includes(selectedColor)) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return parseInt(b.id, 10) - parseInt(a.id, 10)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">{sortedProducts.length} items found</p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-[var(--color-primary)] transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filters</span>
          </button>

          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filters</h3>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id ? 'bg-purple-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Size</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedSize('all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSize === 'all' ? 'bg-purple-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Sizes
                  </button>
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedSize === size ? 'bg-purple-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Color</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedColor('all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedColor === 'all' ? 'bg-purple-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Colors
                  </button>
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                        selectedColor === color ? 'bg-purple-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" style={{ backgroundColor: getSwatchColor(color) }}></div>
                      <span>{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    aria-label="Maximum price"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-xl font-semibold text-gray-900 mb-2">No items match those filters</p>
            <p className="text-gray-600 mb-6">Try widening your price range or clearing a filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedSize('all')
                setSelectedColor('all')
                setPriceRange([0, 500])
              }}
              className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
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
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.colors.slice(0, 3).map((color) => (
                      <div key={color} className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: getSwatchColor(color) }}></div>
                    ))}
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
