'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { ShoppingBag, Package, Users, DollarSign, TrendingUp, Calendar, Leaf, Bell } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: any
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Sales', value: '$24,580', change: '+18%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Orders', value: '347', change: '+12%', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Active Subscriptions', value: '89', change: '+24%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Customers', value: '1,234', change: '+8%', icon: Users, color: 'text-orange-600' },
  ]

  const recentOrders = [
    { id: '#2847', customer: 'Sarah Johnson', items: 'Monstera Deliciosa, Pothos', total: '$89.98', status: 'Delivered', date: '2024-03-15' },
    { id: '#2846', customer: 'Mike Chen', items: 'Snake Plant, Peace Lily', total: '$64.98', status: 'In Transit', date: '2024-03-14' },
    { id: '#2845', customer: 'Emma Davis', items: 'Fiddle Leaf Fig', total: '$79.99', status: 'Processing', date: '2024-03-14' },
    { id: '#2844', customer: 'John Smith', items: 'Plant Subscription Box', total: '$49.99', status: 'Delivered', date: '2024-03-13' },
    { id: '#2843', customer: 'Lisa Wang', items: 'ZZ Plant, Spider Plant', total: '$54.98', status: 'Delivered', date: '2024-03-13' },
  ]

  const topProducts = [
    { name: 'Monstera Deliciosa', sold: 67, revenue: '$3,483', stock: 23 },
    { name: 'Snake Plant', sold: 54, revenue: '$1,728', stock: 45 },
    { name: 'Pothos', sold: 48, revenue: '$1,248', stock: 67 },
    { name: 'Peace Lily', sold: 42, revenue: '$1,638', stock: 34 },
    { name: 'Fiddle Leaf Fig', sold: 38, revenue: '$3,040', stock: 12 },
  ]

  const subscriptions = [
    { plan: 'Monthly Plant Box', subscribers: 34, mrr: '$1,699', churn: '3%' },
    { plan: 'Care Package', subscribers: 28, mrr: '$839', churn: '2%' },
    { plan: 'Premium Collection', subscribers: 27, mrr: '$2,699', churn: '4%' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Urban Jungle Admin</h1>
                <p className="text-xs text-gray-500">Plant Shop Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {['overview', 'orders', 'products', 'subscriptions', 'customers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products & Subscriptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sold} sold • Stock: {product.stock}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subscription Plans */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Subscription Plans</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {subscriptions.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{sub.plan}</p>
                          <p className="text-xs text-gray-500">{sub.subscribers} subscribers • Churn: {sub.churn}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{sub.mrr} MRR</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">
              This section would contain detailed {activeTab} management features.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
