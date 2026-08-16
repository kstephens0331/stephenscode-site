'use client'

import { useEffect, useState } from 'react'
import { X, Star, Heart, ShoppingBag, Check, Minus, Plus } from 'lucide-react'
import type { BoutiqueProduct } from '../data/products'
import { getSwatchColor } from '../data/products'

interface ProductQuickViewProps {
  product: BoutiqueProduct | null
  onClose: () => void
  addToCart: (item: { id: string; name: string; price: number; image: string; size: string; color: string }) => void
  addToWishlist: (item: { id: string; name: string; price: number; image: string; sizes: string[]; colors: string[] }) => void
  onViewCart: () => void
}

export default function ProductQuickView({ product, onClose, addToCart, addToWishlist, onViewCart }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0])
      setSelectedColor(product.colors[0])
      setQuantity(1)
      setAddedToCart(false)
      setAddedToWishlist(false)
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize, color: selectedColor })
    }
    setAddedToCart(true)
  }

  const handleAddToWishlist = () => {
    addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, sizes: product.sizes, colors: product.colors })
    setAddedToWishlist(true)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 cursor-default"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-72 md:h-full object-cover md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none" />
            {product.newTag && (
              <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.newTag}
              </div>
            )}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <div className="flex items-center space-x-2 mb-4">
              <p className={`text-3xl font-bold ${product.originalPrice ? 'text-red-600' : 'text-gray-900'}`}>${product.price}</p>
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through">${product.originalPrice}</p>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-4">
              <p className="font-semibold text-gray-900 mb-2 text-sm">Size: <span className="font-normal text-gray-600">{selectedSize}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-[var(--color-primary)] bg-purple-50 text-[var(--color-primary)]'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-gray-900 mb-2 text-sm">Color: <span className="font-normal text-gray-600">{selectedColor}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor === color ? 'border-[var(--color-primary)] scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: getSwatchColor(color) }}
                  >
                    {selectedColor === color && (
                      <Check className={`w-4 h-4 ${['white', 'cream', 'ivory', 'champagne', 'blush', 'beige', 'nude'].includes(color.toLowerCase()) ? 'text-gray-700' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <p className="font-semibold text-gray-900 text-sm">Qty:</p>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-gray-900 w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {addedToCart ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg font-semibold">
                  <Check className="w-5 h-5" />
                  <span>Added to your cart</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onViewCart}
                    className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            )}

            <button
              onClick={handleAddToWishlist}
              disabled={addedToWishlist}
              className={`w-full mt-3 py-3 rounded-lg font-semibold border-2 transition-all flex items-center justify-center space-x-2 ${
                addedToWishlist
                  ? 'border-pink-200 bg-pink-50 text-pink-600'
                  : 'border-gray-200 text-gray-700 hover:border-[var(--color-primary)]'
              }`}
            >
              <Heart className={`w-5 h-5 ${addedToWishlist ? 'fill-pink-600' : ''}`} />
              <span>{addedToWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
