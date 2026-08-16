'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  Package, ShoppingBag, Users, DollarSign, TrendingUp, Dumbbell, Calendar,
  Plus, Pencil, Trash2, X, Search
} from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface AdminProduct {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

interface AdminOrder {
  id: string
  customer: string
  date: string
  itemCount: number
  total: number
  status: string
  fromStorefront?: boolean
}

interface AdminSubscriber {
  id: string
  name: string
  product: string
  frequency: string
  since: string
  status: 'active' | 'paused'
  fromStorefront?: boolean
}

interface StoredCustomerOrder {
  id: string
  date: string
  status: string
  total: number
  items: { name: string; quantity: number }[]
}

interface StoredCustomerSub {
  id: string
  name: string
  frequency: string
  status: 'active' | 'paused'
  started: string
}

const CATEGORIES = ['Protein', 'Pre-Workout', 'Recovery', 'Vitamins', 'Weight Management', 'Performance']
const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

type RangeKey = 'today' | '7d' | '30d' | '90d'

const RANGE_LABELS: { key: RangeKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: '7d', label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '90d', label: '90 Days' },
]

const RANGE_STATS: Record<RangeKey, { revenue: string; orders: string; subscribers: string; sold: string; changes: string[] }> = {
  today: { revenue: '$8,432', orders: '247', subscribers: '1,234', sold: '892', changes: ['+24%', '+18%', '+32%', '+21%'] },
  '7d': { revenue: '$51,208', orders: '1,514', subscribers: '1,234', sold: '5,340', changes: ['+11%', '+9%', '+14%', '+8%'] },
  '30d': { revenue: '$212,940', orders: '6,382', subscribers: '1,234', sold: '22,187', changes: ['+7%', '+6%', '+19%', '+5%'] },
  '90d': { revenue: '$598,415', orders: '18,236', subscribers: '1,234', sold: '63,402', changes: ['+15%', '+12%', '+41%', '+13%'] },
}

const RANGE_TOP_PRODUCTS: Record<RangeKey, { name: string; sold: number; revenue: string }[]> = {
  today: [
    { name: 'Whey Protein Isolate', sold: 156, revenue: '$7,800' },
    { name: 'Pre-Workout Ignite', sold: 132, revenue: '$5,280' },
    { name: 'BCAA Recovery', sold: 98, revenue: '$3,430' },
  ],
  '7d': [
    { name: 'Whey Protein Isolate', sold: 941, revenue: '$47,041' },
    { name: 'Creatine Monohydrate', sold: 812, revenue: '$24,352' },
    { name: 'Pre-Workout Ignite', sold: 705, revenue: '$28,193' },
  ],
  '30d': [
    { name: 'Creatine Monohydrate', sold: 3860, revenue: '$115,761' },
    { name: 'Whey Protein Isolate', sold: 3412, revenue: '$170,566' },
    { name: 'Electrolyte Hydration', sold: 2954, revenue: '$64,958' },
  ],
  '90d': [
    { name: 'Whey Protein Isolate', sold: 10240, revenue: '$511,898' },
    { name: 'Creatine Monohydrate', sold: 9873, revenue: '$296,092' },
    { name: 'Daily Multivitamin', sold: 7541, revenue: '$188,449' },
  ],
}

const SEED_PRODUCTS: AdminProduct[] = [
  { id: 'ap1', name: 'Whey Protein Isolate', category: 'Protein', price: 49.99, stock: 214 },
  { id: 'ap2', name: 'Pre-Workout Ignite', category: 'Pre-Workout', price: 39.99, stock: 168 },
  { id: 'ap3', name: 'BCAA Recovery', category: 'Recovery', price: 34.99, stock: 97 },
  { id: 'ap4', name: 'Creatine Monohydrate', category: 'Performance', price: 29.99, stock: 342 },
  { id: 'ap5', name: 'Casein Night Protein', category: 'Protein', price: 44.99, stock: 58 },
  { id: 'ap6', name: 'Daily Multivitamin', category: 'Vitamins', price: 24.99, stock: 411 },
  { id: 'ap7', name: 'Thermo Burn', category: 'Weight Management', price: 34.99, stock: 76 },
  { id: 'ap8', name: 'Electrolyte Hydration', category: 'Recovery', price: 21.99, stock: 203 },
]

const SEED_ORDERS: AdminOrder[] = [
  { id: 'PP-1042', customer: 'Jordan M.', date: 'Aug 14', itemCount: 3, total: 124.97, status: 'Shipped' },
  { id: 'PP-1041', customer: 'Alicia R.', date: 'Aug 14', itemCount: 1, total: 49.99, status: 'Processing' },
  { id: 'PP-1040', customer: 'Sam K.', date: 'Aug 13', itemCount: 2, total: 69.98, status: 'Delivered' },
  { id: 'PP-1039', customer: 'Devin C.', date: 'Aug 12', itemCount: 4, total: 151.96, status: 'Delivered' },
  { id: 'PP-1038', customer: 'Priya S.', date: 'Aug 11', itemCount: 2, total: 57.98, status: 'Delivered' },
  { id: 'PP-1037', customer: 'Miguel A.', date: 'Aug 10', itemCount: 1, total: 99.99, status: 'Cancelled' },
]

const SEED_SUBSCRIBERS: AdminSubscriber[] = [
  { id: 'as1', name: 'Jordan M.', product: 'Whey Protein Isolate', frequency: 'Monthly', since: 'Mar 2026', status: 'active' },
  { id: 'as2', name: 'Alicia R.', product: 'Pre-Workout Ignite', frequency: 'Bi-Weekly', since: 'Jan 2026', status: 'active' },
  { id: 'as3', name: 'Sam K.', product: 'Creatine Monohydrate', frequency: 'Monthly', since: 'May 2026', status: 'active' },
  { id: 'as4', name: 'Priya S.', product: 'Electrolyte Hydration', frequency: 'Weekly', since: 'Feb 2026', status: 'paused' },
  { id: 'as5', name: 'Devin C.', product: 'Daily Multivitamin', frequency: 'Monthly', since: 'Jun 2026', status: 'active' },
  { id: 'as6', name: 'Miguel A.', product: 'Plant Protein Blend', frequency: 'Bi-Weekly', since: 'Jul 2026', status: 'active' },
]

const LS = {
  products: 'peak-supplements-admin-products',
  orderStatuses: 'peak-supplements-admin-order-status',
  subscribers: 'peak-supplements-admin-subscribers',
  customerOrders: 'peak-supplements-orders',
  customerSubs: 'peak-supplements-subscriptions',
}

const emptyProductForm = { name: '', category: CATEGORIES[0], price: '', stock: '' }

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [tab, setTab] = useState<'overview' | 'orders' | 'products' | 'subscribers'>('overview')
  const [range, setRange] = useState<RangeKey>('today')
  const [hydrated, setHydrated] = useState(false)

  const [products, setProducts] = useState<AdminProduct[]>(SEED_PRODUCTS)
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>({})
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>(SEED_SUBSCRIBERS)
  const [customerOrders, setCustomerOrders] = useState<AdminOrder[]>([])
  const [customerSubs, setCustomerSubs] = useState<StoredCustomerSub[]>([])

  const [productModalOpen, setProductModalOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [productFormError, setProductFormError] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const [orderSearch, setOrderSearch] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')
  const [subSearch, setSubSearch] = useState('')
  const [subFreqFilter, setSubFreqFilter] = useState('All')

  useEffect(() => {
    try {
      const p = localStorage.getItem(LS.products)
      if (p) setProducts(JSON.parse(p))
      const s = localStorage.getItem(LS.orderStatuses)
      if (s) setOrderStatuses(JSON.parse(s))
      const sub = localStorage.getItem(LS.subscribers)
      if (sub) setSubscribers(JSON.parse(sub))
      const co = localStorage.getItem(LS.customerOrders)
      if (co) {
        const parsed: StoredCustomerOrder[] = JSON.parse(co)
        setCustomerOrders(parsed.map(o => ({
          id: o.id,
          customer: 'Storefront visitor',
          date: o.date,
          itemCount: o.items.reduce((sum, i) => sum + i.quantity, 0),
          total: o.total,
          status: o.status,
          fromStorefront: true,
        })))
      }
      const cs = localStorage.getItem(LS.customerSubs)
      if (cs) setCustomerSubs(JSON.parse(cs))
    } catch {
      // Corrupt or unavailable storage: fall back to seed data
    }
    setHydrated(true)
  }, [])

  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.products, JSON.stringify(products)) } catch {} }, [products, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.orderStatuses, JSON.stringify(orderStatuses)) } catch {} }, [orderStatuses, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.subscribers, JSON.stringify(subscribers)) } catch {} }, [subscribers, hydrated])

  const stats = RANGE_STATS[range]
  const statCards = [
    { label: range === 'today' ? 'Revenue Today' : `Revenue (${RANGE_LABELS.find(r => r.key === range)?.label})`, value: stats.revenue, change: stats.changes[0], icon: DollarSign },
    { label: 'Orders', value: stats.orders, change: stats.changes[1], icon: ShoppingBag },
    { label: 'Active Subscribers', value: stats.subscribers, change: stats.changes[2], icon: Calendar },
    { label: 'Products Sold', value: stats.sold, change: stats.changes[3], icon: Package },
  ]

  const allOrders: AdminOrder[] = [...customerOrders, ...SEED_ORDERS].map(o => ({
    ...o,
    status: orderStatuses[o.id] || o.status,
  }))

  const filteredOrders = allOrders.filter(o =>
    (orderStatusFilter === 'All' || o.status === orderStatusFilter) &&
    (orderSearch.trim() === '' ||
      o.id.toLowerCase().includes(orderSearch.trim().toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.trim().toLowerCase()))
  )

  const setOrderStatus = (id: string, status: string) => {
    setOrderStatuses(prev => ({ ...prev, [id]: status }))
  }

  const openAddProduct = () => {
    setEditingProductId(null)
    setProductForm(emptyProductForm)
    setProductFormError('')
    setProductModalOpen(true)
  }

  const openEditProduct = (product: AdminProduct) => {
    setEditingProductId(product.id)
    setProductForm({ name: product.name, category: product.category, price: String(product.price), stock: String(product.stock) })
    setProductFormError('')
    setProductModalOpen(true)
  }

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const price = parseFloat(productForm.price)
    const stock = parseInt(productForm.stock, 10)
    if (!productForm.name.trim() || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
      setProductFormError('Enter a product name, a price above $0, and a stock count of 0 or more.')
      return
    }
    if (editingProductId) {
      setProducts(prev => prev.map(p => p.id === editingProductId ? { ...p, name: productForm.name.trim(), category: productForm.category, price, stock } : p))
    } else {
      setProducts(prev => [{ id: `ap-${Date.now()}`, name: productForm.name.trim(), category: productForm.category, price, stock }, ...prev])
    }
    setProductModalOpen(false)
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteConfirmId(null)
  }

  const toggleSeedSubscriber = (id: string) => {
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s))
  }

  const toggleCustomerSub = (id: string) => {
    setCustomerSubs(prev => {
      const next: StoredCustomerSub[] = prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' as const : 'active' as const } : s)
      try {
        const raw = localStorage.getItem(LS.customerSubs)
        if (raw) {
          const full = JSON.parse(raw) as (StoredCustomerSub & Record<string, unknown>)[]
          const updated = full.map(s => {
            const match = next.find(n => n.id === s.id)
            return match ? { ...s, status: match.status } : s
          })
          localStorage.setItem(LS.customerSubs, JSON.stringify(updated))
        }
      } catch {}
      return next
    })
  }

  const allSubscribers: AdminSubscriber[] = [
    ...customerSubs.map(s => ({
      id: s.id,
      name: 'Storefront visitor',
      product: s.name,
      frequency: s.frequency,
      since: s.started,
      status: s.status,
      fromStorefront: true,
    })),
    ...subscribers,
  ]

  const filteredSubscribers = allSubscribers.filter(s =>
    (subFreqFilter === 'All' || s.frequency === subFreqFilter) &&
    (subSearch.trim() === '' ||
      s.name.toLowerCase().includes(subSearch.trim().toLowerCase()) ||
      s.product.toLowerCase().includes(subSearch.trim().toLowerCase()))
  )

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'orders' as const, label: 'Orders' },
    { key: 'products' as const, label: 'Products' },
    { key: 'subscribers' as const, label: 'Subscribers' },
  ]

  const statusBadgeClass = (status: string) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700'
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700'
    if (status === 'Cancelled') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Peak Performance Admin</h1>
              <p className="text-sm text-gray-600">Supplement Store Dashboard</p>
            </div>
            <Dumbbell className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
        </div>
        <div className="px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${tab === t.key ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="p-6">
        {tab === 'overview' && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {RANGE_LABELS.map(r => (
                <button
                  key={r.key}
                  onClick={() => setRange(r.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${range === r.key ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-cyan-400'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-cyan-100 p-3 rounded-lg">
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
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Top Selling Products ({RANGE_LABELS.find(r => r.key === range)?.label})</h2>
                <div className="space-y-4">
                  {RANGE_TOP_PRODUCTS[range].map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-[var(--color-primary)] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sold.toLocaleString()} units sold</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">{product.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                  <button onClick={() => setTab('orders')} className="text-sm font-semibold text-[var(--color-secondary)] hover:underline">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {allOrders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer} • {order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClass(order.status)}`}>{order.status}</span>
                        <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex-1">Orders ({filteredOrders.length})</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  placeholder="Search order or customer..."
                  aria-label="Search orders"
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <select
                value={orderStatusFilter}
                onChange={e => setOrderStatusFilter(e.target.value)}
                aria-label="Filter orders by status"
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm font-semibold"
              >
                <option value="All">All Statuses</option>
                {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No orders match your filters.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="py-3 pr-4 font-semibold">Order</th>
                      <th className="py-3 pr-4 font-semibold">Customer</th>
                      <th className="py-3 pr-4 font-semibold">Date</th>
                      <th className="py-3 pr-4 font-semibold">Items</th>
                      <th className="py-3 pr-4 font-semibold">Total</th>
                      <th className="py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-b last:border-b-0">
                        <td className="py-4 pr-4 font-semibold text-gray-900">
                          #{order.id}
                          {order.fromStorefront && <span className="ml-2 text-xs bg-cyan-100 text-cyan-800 font-semibold px-2 py-0.5 rounded-full">Placed in demo</span>}
                        </td>
                        <td className="py-4 pr-4 text-gray-700">{order.customer}</td>
                        <td className="py-4 pr-4 text-gray-700">{order.date}</td>
                        <td className="py-4 pr-4 text-gray-700">{order.itemCount}</td>
                        <td className="py-4 pr-4 font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                        <td className="py-4">
                          <select
                            value={order.status}
                            onChange={e => setOrderStatus(order.id, e.target.value)}
                            aria-label={`Status for order ${order.id}`}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 ${statusBadgeClass(order.status)}`}
                          >
                            {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'products' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Inventory ({products.length} products)</h2>
              <button onClick={openAddProduct} className="flex items-center bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90">
                <Plus className="w-4 h-4 mr-1" /> Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-3 pr-4 font-semibold">Product</th>
                    <th className="py-3 pr-4 font-semibold">Category</th>
                    <th className="py-3 pr-4 font-semibold">Price</th>
                    <th className="py-3 pr-4 font-semibold">Stock</th>
                    <th className="py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="py-4 pr-4 font-semibold text-gray-900">{product.name}</td>
                      <td className="py-4 pr-4 text-gray-700">{product.category}</td>
                      <td className="py-4 pr-4 text-gray-700">${product.price.toFixed(2)}</td>
                      <td className="py-4 pr-4">
                        <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : product.stock < 80 ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                        {product.stock === 0 && <span className="ml-2 text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">Out of stock</span>}
                        {product.stock > 0 && product.stock < 80 && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">Low</span>}
                      </td>
                      <td className="py-4">
                        {deleteConfirmId === product.id ? (
                          <div className="flex items-center gap-2">
                            <button onClick={() => deleteProduct(product.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700">Confirm Delete</button>
                            <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 text-gray-700">Keep</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditProduct(product)} aria-label={`Edit ${product.name}`} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteConfirmId(product.id)} aria-label={`Delete ${product.name}`} className="p-2 rounded-lg text-red-500 hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'subscribers' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex-1 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                Subscribers ({filteredSubscribers.length})
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={subSearch}
                  onChange={e => setSubSearch(e.target.value)}
                  placeholder="Search name or product..."
                  aria-label="Search subscribers"
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'Monthly', 'Bi-Weekly', 'Weekly'].map(f => (
                  <button
                    key={f}
                    onClick={() => setSubFreqFilter(f)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${subFreqFilter === f ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-cyan-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {filteredSubscribers.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No subscribers match your filters.</p>
            ) : (
              <div className="space-y-3">
                {filteredSubscribers.map(sub => (
                  <div key={sub.id} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {sub.name}
                        {sub.fromStorefront && <span className="ml-2 text-xs bg-cyan-100 text-cyan-800 font-semibold px-2 py-0.5 rounded-full">Created in demo</span>}
                      </p>
                      <p className="text-sm text-gray-600">{sub.product} • {sub.frequency} • since {sub.since}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {sub.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                      <button
                        onClick={() => sub.fromStorefront ? toggleCustomerSub(sub.id) : toggleSeedSubscriber(sub.id)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-700 hover:border-cyan-400 bg-white"
                      >
                        {sub.status === 'active' ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product add/edit modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setProductModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-gray-900">{editingProductId ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setProductModalOpen(false)} aria-label="Close product form" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveProduct} className="p-6 space-y-4">
              <div>
                <label htmlFor="pp-admin-product-name" className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input id="pp-admin-product-name" type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} placeholder="e.g. Glutamine Powder" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="pp-admin-product-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select id="pp-admin-product-category" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:border-cyan-500 focus:outline-none">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pp-admin-product-price" className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                  <input id="pp-admin-product-price" type="number" step="0.01" min="0" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} placeholder="29.99" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="pp-admin-product-stock" className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                  <input id="pp-admin-product-stock" type="number" min="0" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} placeholder="100" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none" />
                </div>
              </div>
              {productFormError && <p className="text-red-600 text-sm font-semibold">{productFormError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  {editingProductId ? 'Save Changes' : 'Add Product'}
                </button>
                <button type="button" onClick={() => setProductModalOpen(false)} className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
