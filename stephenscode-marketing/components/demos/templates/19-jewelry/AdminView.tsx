'use client'

import type { Demo } from '@/lib/demos-data'
import type { DemoColors } from '@/lib/demo-colors'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Gem, Gift } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: DemoColors
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const stats = [
    { label: 'Revenue Today', value: '$42,847', change: '+32%', icon: DollarSign },
    { label: 'Orders', value: '84', change: '+18%', icon: ShoppingBag },
    { label: 'VIP Customers', value: '432', change: '+24%', icon: Users },
    { label: 'Items Sold', value: '156', change: '+21%', icon: Package },
  ]

  const topProducts = [
    { name: 'Diamond Solitaire Ring', sold: 24, revenue: '$79,200' },
    { name: 'Pearl Necklace', sold: 18, revenue: '$16,200' },
    { name: 'Gold Bracelet', sold: 31, revenue: '$46,500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Timeless Treasures Admin</h1>
              <p className="text-sm text-gray-600">Jewelry Store Dashboard</p>
            </div>
            <Gem className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.primary}20` }}>
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ backgroundColor: colors.primary }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold} units sold</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
