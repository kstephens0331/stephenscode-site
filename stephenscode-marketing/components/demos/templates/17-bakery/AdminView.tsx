'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Calendar, Cake } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const stats = [
    { label: 'Today\'s Revenue', value: '$2,847', change: '+18%', icon: DollarSign },
    { label: 'Orders Today', value: '127', change: '+12%', icon: ShoppingBag },
    { label: 'Active Customers', value: '892', change: '+24%', icon: Users },
    { label: 'Products Sold', value: '456', change: '+15%', icon: Package },
  ]

  const recentOrders = [
    { id: '#SD1247', customer: 'Mike Johnson', items: 'Birthday Cake, Cupcakes', total: '$87.50', status: 'Ready' },
    { id: '#SD1246', customer: 'Sarah Lee', items: 'Wedding Cake', total: '$450.00', status: 'In Progress' },
    { id: '#SD1245', customer: 'Tom Brown', items: 'Croissants (12)', total: '$24.00', status: 'Completed' },
  ]

  const popularItems = [
    { name: 'Chocolate Cake', sold: 45, revenue: '$2,025' },
    { name: 'Fresh Croissants', sold: 234, revenue: '$934' },
    { name: 'Custom Cupcakes', sold: 67, revenue: '$1,675' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sweet Dreams Admin</h1>
              <p className="text-sm text-gray-600">Bakery Management Dashboard</p>
            </div>
            <Cake className="w-8 h-8 text-[var(--color-primary)]" />
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
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6 space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Popular Items Today</h2>
            </div>
            <div className="p-6 space-y-4">
              {popularItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[var(--color-primary)] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.sold} sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{item.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
