'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { DemoColors } from '@/lib/demo-colors'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, BarChart3, Settings, Bell } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: DemoColors
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Revenue', value: '$124,583', change: '+12.5%', icon: DollarSign },
    { label: 'Orders', value: '1,847', change: '+8.2%', icon: ShoppingBag },
    { label: 'Customers', value: '3,421', change: '+15.3%', icon: Users },
    { label: 'Products', value: '487', change: '+5.1%', icon: Package },
  ]

  const recentOrders = [
    { id: '#12847', customer: 'Sarah Johnson', items: 3, total: '$289.97', status: 'Processing' },
    { id: '#12846', customer: 'Emily Chen', items: 2, total: '$156.00', status: 'Shipped' },
    { id: '#12845', customer: 'Rachel Martinez', items: 1, total: '$89.99', status: 'Delivered' },
    { id: '#12844', customer: 'Amanda Wilson', items: 4, total: '$324.50', status: 'Processing' },
  ]

  const topProducts = [
    { name: 'Silk Evening Dress', sales: 142, revenue: '$21,300' },
    { name: 'Designer Handbag', sales: 98, revenue: '$19,600' },
    { name: 'Cashmere Sweater', sales: 156, revenue: '$18,720' },
    { name: 'Leather Boots', sales: 87, revenue: '$17,400' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bella Boutique Admin</h1>
              <p className="text-sm text-gray-600">Fashion E-Commerce Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[var(--color-primary)] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-purple-100 text-[var(--color-primary)] rounded-lg text-sm font-semibold">7 Days</button>
              <button className="px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-lg text-sm">30 Days</button>
              <button className="px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-lg text-sm">90 Days</button>
            </div>
          </div>
          <div className="flex items-end justify-between h-64 border-b border-l border-gray-200">
            {[65, 78, 52, 85, 72, 90, 68].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end px-2">
                <div
                  className="w-full bg-gradient-to-t from-[var(--color-primary)] to-purple-300 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">Day {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
