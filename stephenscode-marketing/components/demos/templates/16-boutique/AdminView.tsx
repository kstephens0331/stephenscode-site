'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Settings, Bell, X, Check } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface AdminNotification {
  id: number
  text: string
  time: string
  read: boolean
}

interface AdminSettings {
  storeName: string
  supportEmail: string
  lowStockAlerts: boolean
  orderEmails: boolean
}

type ChartPeriod = '7d' | '30d' | '90d'

const ADMIN_SETTINGS_KEY = 'boutique-demo-admin-settings'

const defaultSettings: AdminSettings = {
  storeName: 'Bella Boutique',
  supportEmail: 'hello@bellaboutique.com',
  lowStockAlerts: true,
  orderEmails: true,
}

const initialNotifications: AdminNotification[] = [
  { id: 1, text: 'New order #12848 from Olivia Bennett -- $412.50', time: '12 min ago', read: false },
  { id: 2, text: 'Low stock: Silk Evening Dress (Black, S) has 2 left', time: '1 hr ago', read: false },
  { id: 3, text: 'Return requested for order #12839', time: '3 hrs ago', read: false },
  { id: 4, text: 'Weekly sales report is ready to view', time: 'Yesterday', read: true },
]

const salesData: Record<ChartPeriod, { points: { label: string; value: number }[] }> = {
  '7d': {
    points: [
      { label: 'Mon', value: 2840 },
      { label: 'Tue', value: 3420 },
      { label: 'Wed', value: 2260 },
      { label: 'Thu', value: 3710 },
      { label: 'Fri', value: 3150 },
      { label: 'Sat', value: 3940 },
      { label: 'Sun', value: 2980 },
    ],
  },
  '30d': {
    points: [
      { label: 'Week 1', value: 19870 },
      { label: 'Week 2', value: 22340 },
      { label: 'Week 3', value: 18560 },
      { label: 'Week 4', value: 24120 },
    ],
  },
  '90d': {
    points: [
      { label: 'W1', value: 17240 },
      { label: 'W2', value: 19860 },
      { label: 'W3', value: 18110 },
      { label: 'W4', value: 21430 },
      { label: 'W5', value: 20180 },
      { label: 'W6', value: 22750 },
      { label: 'W7', value: 19540 },
      { label: 'W8', value: 23980 },
      { label: 'W9', value: 21260 },
      { label: 'W10', value: 24610 },
      { label: 'W11', value: 22890 },
      { label: 'W12', value: 25340 },
    ],
  },
}

const periodButtons: { id: ChartPeriod; label: string }[] = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
]

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('7d')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings)
  const [settingsSaved, setSettingsSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SETTINGS_KEY)
      if (stored) setSettings({ ...defaultSettings, ...JSON.parse(stored) })
    } catch {
      // Ignore malformed stored state -- defaults still render
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleSaveSettings = () => {
    try {
      localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // Storage unavailable -- settings still apply in memory
    }
    setSettingsSaved(true)
    setTimeout(() => {
      setSettingsSaved(false)
      setSettingsOpen(false)
    }, 1200)
  }

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

  const chartPoints = salesData[chartPeriod].points
  const chartMax = Math.max(...chartPoints.map(p => p.value))
  const chartTotal = chartPoints.reduce((sum, p) => sum + p.value, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{settings.storeName} Admin</h1>
              <p className="text-sm text-gray-600">Fashion E-Commerce Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
                  className={`p-2 rounded-lg relative transition-colors ${notificationsOpen ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-gray-900">Notifications</p>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => markNotificationRead(notification.id)}
                          className={`w-full text-left px-4 py-3 transition-colors ${
                            notification.read ? 'bg-white hover:bg-gray-50' : 'bg-purple-50/60 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {!notification.read && (
                              <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0"></span>
                            )}
                            <div className={notification.read ? 'pl-4' : ''}>
                              <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="w-full px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSettingsOpen(true)}
                aria-label="Store settings"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close settings"
            onClick={() => setSettingsOpen(false)}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <button
              onClick={() => setSettingsOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Settings</h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="boutique-admin-store-name" className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
                <input
                  id="boutique-admin-store-name"
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label htmlFor="boutique-admin-support-email" className="block text-sm font-semibold text-gray-700 mb-2">Support Email</label>
                <input
                  id="boutique-admin-support-email"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <label htmlFor="boutique-admin-low-stock" className="flex items-center space-x-3 cursor-pointer">
                <input
                  id="boutique-admin-low-stock"
                  type="checkbox"
                  checked={settings.lowStockAlerts}
                  onChange={(e) => setSettings({ ...settings, lowStockAlerts: e.target.checked })}
                  className="w-5 h-5 text-[var(--color-primary)]"
                />
                <span className="text-gray-700">Alert me when a product runs low on stock</span>
              </label>
              <label htmlFor="boutique-admin-order-emails" className="flex items-center space-x-3 cursor-pointer">
                <input
                  id="boutique-admin-order-emails"
                  type="checkbox"
                  checked={settings.orderEmails}
                  onChange={(e) => setSettings({ ...settings, orderEmails: e.target.checked })}
                  className="w-5 h-5 text-[var(--color-primary)]"
                />
                <span className="text-gray-700">Email me a summary of each new order</span>
              </label>
              {settingsSaved && (
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg font-semibold">
                  <Check className="w-5 h-5" />
                  <span>Settings saved</span>
                </div>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Save Settings
                </button>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {/* Sales Chart */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-600">
                ${chartTotal.toLocaleString()} in sales over the last {periodButtons.find(p => p.id === chartPeriod)?.label.toLowerCase()}
              </p>
            </div>
            <div className="flex space-x-2">
              {periodButtons.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setChartPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    chartPeriod === period.id
                      ? 'bg-purple-100 text-[var(--color-primary)] font-semibold'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between h-64 border-b border-l border-gray-200">
            {chartPoints.map((point) => (
              <div key={point.label} className="flex-1 flex flex-col items-center justify-end px-1 sm:px-2 h-full group">
                <p className="text-xs font-semibold text-gray-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${point.value.toLocaleString()}
                </p>
                <div
                  title={`${point.label}: $${point.value.toLocaleString()}`}
                  className="w-full bg-gradient-to-t from-[var(--color-primary)] to-purple-300 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${Math.round((point.value / chartMax) * 85)}%` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">{point.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
