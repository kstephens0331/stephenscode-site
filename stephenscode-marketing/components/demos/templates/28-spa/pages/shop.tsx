'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { ShoppingCart } from 'lucide-react'

interface ShopPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function ShopPage({ colors, onNavigate }: ShopPageProps) {
  const products = [
    { name: 'Hydrating Serum', price: 89, category: 'Skincare' },
    { name: 'Aromatherapy Oil Set', price: 65, category: 'Wellness' },
    { name: 'Luxury Face Cream', price: 120, category: 'Skincare' },
    { name: 'Essential Oil Diffuser', price: 45, category: 'Wellness' },
    { name: 'Body Butter Collection', price: 55, category: 'Body Care' },
    { name: 'Jade Roller Set', price: 38, category: 'Tools' }
  ]

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Shop Products</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <span style={{ color: colors.textLight }}>{product.name}</span>
              </div>
              <div className="p-6">
                <div className="text-xs mb-2" style={{ color: colors.textLight }}>{product.category}</div>
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold" style={{ color: colors.primary }}>${product.price}</div>
                  <button className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
