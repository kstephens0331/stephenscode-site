'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Package, AlertTriangle, TrendingUp, ShoppingCart, Barcode, Search } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { icon: Package, label: 'Total Items', value: '1,247', change: '+23', color: colors.primary },
    { icon: AlertTriangle, label: 'Low Stock Items', value: '18', change: '-5', color: colors.warning },
    { icon: TrendingUp, label: 'Stock Value', value: '$425K', change: '+12%', color: colors.success },
    { icon: ShoppingCart, label: 'Pending Orders', value: '34', change: '+8', color: colors.secondary },
  ]

  const products = [
    { id: 'SKU-001', name: 'Premium Widget A', category: 'Electronics', stock: 45, reorderPoint: 20, supplier: 'TechCorp', price: '$125.00', status: 'In Stock' },
    { id: 'SKU-002', name: 'Standard Component B', category: 'Hardware', stock: 12, reorderPoint: 15, supplier: 'PartsPlus', price: '$45.50', status: 'Low Stock' },
    { id: 'SKU-003', name: 'Deluxe Product C', category: 'Accessories', stock: 89, reorderPoint: 30, supplier: 'GlobalSupply', price: '$78.00', status: 'In Stock' },
    { id: 'SKU-004', name: 'Essential Item D', category: 'Supplies', stock: 5, reorderPoint: 25, supplier: 'BulkGoods', price: '$32.00', status: 'Critical' },
  ]

  const recentActivity = [
    { type: 'received', item: 'Premium Widget A', quantity: 50, time: '2 hours ago' },
    { type: 'sold', item: 'Standard Component B', quantity: 15, time: '5 hours ago' },
    { type: 'adjusted', item: 'Deluxe Product C', quantity: -3, time: '1 day ago' },
    { type: 'ordered', item: 'Essential Item D', quantity: 100, time: '2 days ago' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Inventory Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Track and manage your stock levels</p>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Add New Item
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: stat.change.startsWith('+') ? colors.success : colors.error }}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['overview', 'products', 'alerts', 'activity'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                  activeTab === tab ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab ? colors.primary : 'transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Stock Levels by Category</h2>
              <div className="space-y-6">
                {[
                  { category: 'Electronics', items: 245, value: '$125,450', percentage: 85 },
                  { category: 'Hardware', items: 412, value: '$87,230', percentage: 65 },
                  { category: 'Accessories', items: 389, value: '$156,890', percentage: 75 },
                  { category: 'Supplies', items: 201, value: '$55,430', percentage: 45 },
                ].map((cat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold" style={{ color: colors.text }}>{cat.category}</span>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: colors.primary }}>{cat.items} items</p>
                        <p className="text-sm" style={{ color: colors.textLight }}>{cat.value}</p>
                      </div>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: colors.primary
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: Barcode, label: 'Scan Barcode', color: colors.primary },
                  { icon: ShoppingCart, label: 'Create Purchase Order', color: colors.secondary },
                  { icon: AlertTriangle, label: 'View Low Stock Alerts', color: colors.warning },
                  { icon: Package, label: 'Receive Shipment', color: colors.success },
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={index}
                      className="w-full p-4 rounded-lg border-2 hover:shadow-md transition-all text-left flex items-center gap-3"
                      style={{ borderColor: colors.border }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.color }} />
                      <span className="font-semibold" style={{ color: colors.text }}>{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>All Products</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: colors.border }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>SKU</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Product</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Category</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Stock</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Price</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4 font-mono text-sm" style={{ color: colors.textLight }}>{product.id}</td>
                      <td className="py-4 px-4 font-semibold" style={{ color: colors.text }}>{product.name}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{product.category}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold" style={{ color: product.stock <= product.reorderPoint ? colors.error : colors.text }}>
                          {product.stock}
                        </span>
                        <span className="text-sm ml-1" style={{ color: colors.textLight }}>/ {product.reorderPoint}</span>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold" style={{ color: colors.primary }}>{product.price}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                          product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Low Stock Alerts</h2>
            <div className="space-y-4">
              {products.filter(p => p.status !== 'In Stock').map(product => (
                <div key={product.id} className="p-6 rounded-xl border-2" style={{
                  borderColor: product.status === 'Critical' ? colors.error : colors.warning,
                  backgroundColor: product.status === 'Critical' ? colors.error + '10' : colors.warning + '10'
                }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 mt-1" style={{ color: product.status === 'Critical' ? colors.error : colors.warning }} />
                      <div>
                        <h3 className="font-bold text-lg mb-1" style={{ color: colors.text }}>{product.name}</h3>
                        <p className="text-sm mb-2" style={{ color: colors.textLight }}>SKU: {product.id} - {product.category}</p>
                        <p className="font-semibold" style={{ color: colors.text }}>
                          Current stock: {product.stock} / Reorder point: {product.reorderPoint}
                        </p>
                        <p className="text-sm mt-1" style={{ color: colors.textLight }}>Supplier: {product.supplier}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      Create Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'received' ? 'bg-green-100' :
                    activity.type === 'sold' ? 'bg-blue-100' :
                    activity.type === 'adjusted' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    <Package className={`w-5 h-5 ${
                      activity.type === 'received' ? 'text-green-600' :
                      activity.type === 'sold' ? 'text-blue-600' :
                      activity.type === 'adjusted' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: colors.text }}>
                      {activity.type === 'received' ? 'Received' :
                       activity.type === 'sold' ? 'Sold' :
                       activity.type === 'adjusted' ? 'Adjusted' : 'Ordered'} - {activity.item}
                    </p>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      Quantity: {activity.quantity > 0 ? '+' : ''}{activity.quantity}
                    </p>
                  </div>
                  <span className="text-sm" style={{ color: colors.textLight }}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
