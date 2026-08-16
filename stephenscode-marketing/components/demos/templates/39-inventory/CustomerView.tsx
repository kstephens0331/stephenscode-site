'use client'

import { useMemo, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Barcode,
  Search,
  Download,
  RotateCcw,
  Plus,
  ArrowUpDown,
  CheckCircle,
  Send,
} from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { useInventory } from './useInventory'
import Modal from './Modal'
import Toast from './Toast'
import ProductFormModal from './ProductFormModal'
import PurchaseOrderModal from './PurchaseOrderModal'
import ProductDetailModal from './ProductDetailModal'
import {
  ACTIVITY_LABELS,
  CATEGORIES,
  CATEGORY_CAPACITY,
  downloadCsv,
  formatCurrency,
  relativeTime,
  statusOf,
  stockValue,
  suggestedOrderQty,
  type ActivityType,
  type Product,
  type StockStatus,
} from './data'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

type TabKey = 'overview' | 'products' | 'alerts' | 'orders' | 'activity'
type SortKey = 'id' | 'name' | 'category' | 'stock' | 'price'
type ActivityFilter = 'all' | ActivityType

const TABS: TabKey[] = ['overview', 'products', 'alerts', 'orders', 'activity']
const STATUS_FILTERS: (StockStatus | 'All')[] = ['All', 'In Stock', 'Low Stock', 'Critical']
const ACTIVITY_FILTERS: ActivityFilter[] = ['all', 'received', 'sold', 'adjusted', 'ordered', 'added', 'removed']

const activityTone = (type: ActivityType) => {
  switch (type) {
    case 'received':
      return { bg: 'bg-green-100', text: 'text-green-600' }
    case 'sold':
      return { bg: 'bg-blue-100', text: 'text-blue-600' }
    case 'adjusted':
      return { bg: 'bg-yellow-100', text: 'text-yellow-600' }
    case 'ordered':
      return { bg: 'bg-purple-100', text: 'text-purple-600' }
    case 'added':
      return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
    default:
      return { bg: 'bg-red-100', text: 'text-red-600' }
  }
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const inv = useInventory()
  const { products, activity, purchaseOrders } = inv.state

  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<StockStatus | 'All'>('All')
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'id', dir: 'asc' })
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all')

  const [showAddItem, setShowAddItem] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [detailId, setDetailId] = useState<string | null>(null)
  const [poProductId, setPoProductId] = useState<string | null>(null)
  const [showPoModal, setShowPoModal] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [showReceive, setShowReceive] = useState(false)
  const [showValuation, setShowValuation] = useState(false)
  const [scanCode, setScanCode] = useState('')
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [scanMiss, setScanMiss] = useState(false)

  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  const lowStock = products.filter(p => statusOf(p) !== 'In Stock')
  const criticalCount = products.filter(p => statusOf(p) === 'Critical').length
  const pendingOrders = purchaseOrders.filter(po => po.status === 'Pending')
  const unitsInbound = pendingOrders.reduce((sum, po) => sum + po.quantity, 0)
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0)

  const detailProduct = products.find(p => p.id === detailId) || null
  const scannedProduct = products.find(p => p.id === scanResult) || null

  const stats = [
    {
      icon: Package,
      label: 'Units On Hand',
      value: totalUnits.toLocaleString('en-US'),
      note: `${products.length} SKU${products.length === 1 ? '' : 's'} tracked`,
      color: colors.primary,
      onSelect: () => setActiveTab('products'),
    },
    {
      icon: AlertTriangle,
      label: 'Low Stock Items',
      value: String(lowStock.length),
      note: criticalCount > 0 ? `${criticalCount} critical` : 'nothing critical',
      color: colors.warning,
      onSelect: () => setActiveTab('alerts'),
    },
    {
      icon: TrendingUp,
      label: 'Stock Value',
      value: formatCurrency(stockValue(products), 0),
      note: 'at current unit cost',
      color: colors.success,
      onSelect: () => setShowValuation(true),
    },
    {
      icon: ShoppingCart,
      label: 'Pending Orders',
      value: String(pendingOrders.length),
      note: `${unitsInbound} units inbound`,
      color: colors.secondary,
      onSelect: () => setActiveTab('orders'),
    },
  ]

  const categoryRows = CATEGORIES.map(category => {
    const items = products.filter(p => p.category === category)
    const units = items.reduce((sum, p) => sum + p.stock, 0)
    const capacity = CATEGORY_CAPACITY[category] || 100
    return {
      category,
      units,
      value: stockValue(items),
      percentage: Math.min(100, Math.round((units / capacity) * 100)),
      skus: items.length,
    }
  })

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = products.filter(p => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.supplier.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
      const matchesStatus = statusFilter === 'All' || statusOf(p) === statusFilter
      return matchesQuery && matchesCategory && matchesStatus
    })
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...list].sort((a, b) => {
      if (sort.key === 'stock') return (a.stock - b.stock) * dir
      if (sort.key === 'price') return (a.price - b.price) * dir
      return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir
    })
  }, [products, search, categoryFilter, statusFilter, sort])

  const visibleActivity = activityFilter === 'all' ? activity : activity.filter(a => a.type === activityFilter)

  const toggleSort = (key: SortKey) =>
    setSort(prev => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  const openPurchaseOrder = (productId?: string) => {
    // Close any other overlay first so the order form is never stacked behind one.
    setDetailId(null)
    setShowScanner(false)
    setShowReceive(false)
    setShowValuation(false)
    setPoProductId(productId ?? null)
    setShowPoModal(true)
  }

  const openCategory = (category: string) => {
    setCategoryFilter(category)
    setStatusFilter('All')
    setSearch('')
    setActiveTab('products')
  }

  const runScan = (code: string) => {
    const trimmed = code.trim().toLowerCase()
    if (!trimmed) {
      setScanResult(null)
      setScanMiss(true)
      return
    }
    const match = products.find(
      p => p.id.toLowerCase() === trimmed || p.name.toLowerCase().includes(trimmed)
    )
    if (match) {
      setScanResult(match.id)
      setScanMiss(false)
    } else {
      setScanResult(null)
      setScanMiss(true)
    }
  }

  const simulateScan = () => {
    if (products.length === 0) {
      setScanMiss(true)
      return
    }
    const picked = products[Math.floor(Math.random() * products.length)]
    setScanCode(picked.id)
    setScanResult(picked.id)
    setScanMiss(false)
  }

  const exportProducts = () => {
    downloadCsv('inventory-products.csv', [
      ['SKU', 'Item', 'Category', 'On Hand', 'Reorder Point', 'Supplier', 'Unit Price', 'Stock Value', 'Status'],
      ...visibleProducts.map(p => [
        p.id,
        p.name,
        p.category,
        p.stock,
        p.reorderPoint,
        p.supplier,
        p.price.toFixed(2),
        (p.stock * p.price).toFixed(2),
        statusOf(p),
      ]),
    ])
    inv.setToast(`Exported ${visibleProducts.length} rows to CSV`)
  }

  const exportOrders = () => {
    downloadCsv('inventory-purchase-orders.csv', [
      ['Order', 'Item', 'Supplier', 'Quantity', 'Status', 'Raised'],
      ...purchaseOrders.map(po => [
        po.id,
        po.productName,
        po.supplier,
        po.quantity,
        po.status,
        new Date(po.createdAt).toLocaleString('en-US'),
      ]),
    ])
    inv.setToast(`Exported ${purchaseOrders.length} purchase orders`)
  }

  const exportActivity = () => {
    downloadCsv('inventory-activity.csv', [
      ['Type', 'Item', 'Quantity', 'When'],
      ...visibleActivity.map(a => [
        ACTIVITY_LABELS[a.type],
        a.item,
        a.quantity,
        new Date(a.timestamp).toLocaleString('en-US'),
      ]),
    ])
    inv.setToast(`Exported ${visibleActivity.length} movements`)
  }

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Stock Management System',
          demoPackage: 'Feature: Inventory Management ($200)',
          demoSlug: 'inventory-management-showcase',
          clientName: leadForm.name,
          clientPhone: leadForm.phone,
          clientEmail: leadForm.email,
          service: 'Inventory Management Feature',
          preferredDate: '',
          preferredTime: '',
          notes: leadForm.message,
        }),
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'inventory-management-showcase' })
        trackConversion('leadForm')
        setLeadSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const sortLabel = (key: SortKey, label: string, align: 'left' | 'right' = 'left') => (
    <th className={`py-3 px-4 font-semibold ${align === 'right' ? 'text-right' : 'text-left'}`} style={{ color: colors.text }}>
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className={`inline-flex items-center gap-1 hover:opacity-70 transition-opacity ${align === 'right' ? 'flex-row-reverse' : ''}`}
        style={{ color: sort.key === key ? colors.primary : colors.text }}
      >
        {label}
        <ArrowUpDown className="w-3.5 h-3.5" />
      </button>
    </th>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Inventory Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Track and manage your stock levels</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={inv.resetDemo}
                className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.textLight }}
              >
                <RotateCcw className="w-4 h-4" /> Reset Demo Data
              </button>
              <button
                type="button"
                onClick={() => setShowAddItem(true)}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" /> Add New Item
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <button
                key={index}
                type="button"
                onClick={stat.onSelect}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: colors.textLight }}>{stat.note}</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8 overflow-x-auto" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab ? colors.primary : 'transparent'
                }}
              >
                {tab === 'orders' ? 'purchase orders' : tab}
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
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Stock Levels by Category</h2>
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                Select a category to filter the product list.
              </p>
              <div className="space-y-6">
                {categoryRows.map(cat => (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => openCategory(cat.category)}
                    className="w-full text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold group-hover:underline" style={{ color: colors.text }}>{cat.category}</span>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: colors.primary }}>{cat.units} units</p>
                        <p className="text-sm" style={{ color: colors.textLight }}>
                          {formatCurrency(cat.value, 0)}, {cat.skus} SKU{cat.skus === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${cat.percentage}%`, backgroundColor: colors.primary }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: Barcode, label: 'Scan Barcode', color: colors.primary, run: () => { setScanCode(''); setScanResult(null); setScanMiss(false); setShowScanner(true) } },
                  { icon: ShoppingCart, label: 'Create Purchase Order', color: colors.secondary, run: () => openPurchaseOrder() },
                  { icon: AlertTriangle, label: 'View Low Stock Alerts', color: colors.warning, run: () => setActiveTab('alerts') },
                  { icon: Package, label: 'Receive Shipment', color: colors.success, run: () => setShowReceive(true) },
                ].map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={action.run}
                      className="w-full p-4 rounded-lg border-2 hover:shadow-md transition-all text-left flex items-center gap-3"
                      style={{ borderColor: colors.border }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.color }} />
                      <span className="font-semibold" style={{ color: colors.text }}>{action.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
                <h3 className="font-bold mb-3" style={{ color: colors.text }}>Latest Movement</h3>
                {activity.length === 0 ? (
                  <p className="text-sm" style={{ color: colors.textLight }}>Nothing logged yet. Receive a shipment to start the log.</p>
                ) : (
                  <ul className="space-y-2">
                    {activity.slice(0, 3).map(item => (
                      <li key={item.id} className="text-sm flex items-center justify-between gap-2">
                        <span style={{ color: colors.text }}>{ACTIVITY_LABELS[item.type]}: {item.item}</span>
                        <span style={{ color: colors.textLight }}>{relativeTime(item.timestamp)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab('activity')}
                  className="mt-3 text-sm font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  View full activity log
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                All Products
                <span className="ml-2 text-sm font-medium" style={{ color: colors.textLight }}>
                  {visibleProducts.length} of {products.length} shown
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    aria-label="Search products"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <select
                  aria-label="Filter by category"
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <option value="All">All categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                  aria-label="Filter by stock status"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as StockStatus | 'All')}
                  className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  {STATUS_FILTERS.map(s => <option key={s} value={s}>{s === 'All' ? 'All statuses' : s}</option>)}
                </select>
                <button
                  type="button"
                  onClick={exportProducts}
                  className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            {visibleProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-semibold mb-2" style={{ color: colors.text }}>No items match these filters.</p>
                <button
                  type="button"
                  onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All') }}
                  className="px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: colors.border }}>
                      {sortLabel('id', 'SKU')}
                      {sortLabel('name', 'Product')}
                      {sortLabel('category', 'Category')}
                      {sortLabel('stock', 'Stock', 'right')}
                      {sortLabel('price', 'Price', 'right')}
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleProducts.map(product => {
                      const status = statusOf(product)
                      return (
                        <tr
                          key={product.id}
                          onClick={() => setDetailId(product.id)}
                          className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                          style={{ borderColor: colors.border }}
                        >
                          <td className="py-4 px-4 font-mono text-sm" style={{ color: colors.textLight }}>{product.id}</td>
                          <td className="py-4 px-4 font-semibold" style={{ color: colors.text }}>{product.name}</td>
                          <td className="py-4 px-4" style={{ color: colors.textLight }}>{product.category}</td>
                          <td className="py-4 px-4 text-right">
                            <span className="font-bold" style={{ color: product.stock <= product.reorderPoint ? colors.error : colors.text }}>
                              {product.stock}
                            </span>
                            <span className="text-sm ml-1" style={{ color: colors.textLight }}>/ {product.reorderPoint}</span>
                          </td>
                          <td className="py-4 px-4 text-right font-semibold" style={{ color: colors.primary }}>{formatCurrency(product.price)}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              status === 'In Stock' ? 'bg-green-100 text-green-800' :
                              status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); setDetailId(product.id) }}
                              className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-gray-50 transition-colors"
                              style={{ borderColor: colors.border, color: colors.primary }}
                            >
                              Open
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Low Stock Alerts</h2>
              {lowStock.length > 0 && (
                <button
                  type="button"
                  onClick={() => openPurchaseOrder(lowStock[0].id)}
                  className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Create Purchase Order
                </button>
              )}
            </div>

            {lowStock.length === 0 ? (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.success }} />
                <p className="font-semibold" style={{ color: colors.text }}>Every item is above its reorder point.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="mt-4 font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  Back to product list
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStock.map(product => {
                  const status = statusOf(product)
                  return (
                    <div key={product.id} className="p-6 rounded-xl border-2" style={{
                      borderColor: status === 'Critical' ? colors.error : colors.warning,
                      backgroundColor: status === 'Critical' ? colors.error + '10' : colors.warning + '10'
                    }}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="w-6 h-6 mt-1" style={{ color: status === 'Critical' ? colors.error : colors.warning }} />
                          <div>
                            <h3 className="font-bold text-lg mb-1" style={{ color: colors.text }}>{product.name}</h3>
                            <p className="text-sm mb-2" style={{ color: colors.textLight }}>SKU: {product.id}, {product.category}</p>
                            <p className="font-semibold" style={{ color: colors.text }}>
                              Current stock: {product.stock} / Reorder point: {product.reorderPoint}
                            </p>
                            <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                              Supplier: {product.supplier}, suggested order {suggestedOrderQty(product)} units
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setDetailId(product.id)}
                            className="px-4 py-2 rounded-lg font-medium border-2 bg-white hover:bg-gray-50 transition-colors"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            View Item
                          </button>
                          <button
                            type="button"
                            onClick={() => openPurchaseOrder(product.id)}
                            className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Create Order
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Purchase Orders</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={exportOrders}
                  className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  type="button"
                  onClick={() => openPurchaseOrder()}
                  className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Plus className="w-4 h-4" /> New Order
                </button>
              </div>
            </div>

            {purchaseOrders.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-semibold mb-4" style={{ color: colors.text }}>No purchase orders on file.</p>
                <button
                  type="button"
                  onClick={() => openPurchaseOrder()}
                  className="px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Raise the first order
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: colors.border }}>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Order</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Item</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Supplier</th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Qty</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Raised</th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map(order => (
                      <tr key={order.id} className="border-b" style={{ borderColor: colors.border }}>
                        <td className="py-4 px-4 font-mono text-sm" style={{ color: colors.textLight }}>{order.id}</td>
                        <td className="py-4 px-4 font-semibold" style={{ color: colors.text }}>{order.productName}</td>
                        <td className="py-4 px-4" style={{ color: colors.textLight }}>{order.supplier}</td>
                        <td className="py-4 px-4 text-right font-bold" style={{ color: colors.text }}>{order.quantity}</td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.textLight }}>{relativeTime(order.createdAt)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {order.status === 'Pending' ? (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => inv.receivePurchaseOrder(order.id)}
                                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: colors.success }}
                              >
                                Receive
                              </button>
                              <button
                                type="button"
                                onClick={() => inv.cancelPurchaseOrder(order.id)}
                                className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-red-50 transition-colors"
                                style={{ borderColor: colors.error, color: colors.error }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <p className="text-right text-sm font-semibold" style={{ color: colors.success }}>Stock added</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Recent Activity</h2>
              <button
                type="button"
                onClick={exportActivity}
                className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {ACTIVITY_FILTERS.map(filter => {
                const active = activityFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActivityFilter(filter)}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors"
                    style={{
                      borderColor: active ? colors.primary : colors.border,
                      backgroundColor: active ? colors.primary : 'transparent',
                      color: active ? '#ffffff' : colors.textLight,
                    }}
                  >
                    {filter === 'all' ? 'All movement' : ACTIVITY_LABELS[filter]}
                  </button>
                )
              })}
            </div>

            {visibleActivity.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-semibold mb-4" style={{ color: colors.text }}>No movement of that type yet.</p>
                <button
                  type="button"
                  onClick={() => setActivityFilter('all')}
                  className="px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Show all movement
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleActivity.slice(0, 40).map(item => {
                  const tone = activityTone(item.type)
                  return (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tone.bg}`}>
                        <Package className={`w-5 h-5 ${tone.text}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1" style={{ color: colors.text }}>
                          {ACTIVITY_LABELS[item.type]}: {item.item}
                        </p>
                        <p className="text-sm" style={{ color: colors.textLight }}>
                          Quantity: {item.quantity > 0 ? '+' : ''}{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm" style={{ color: colors.textLight }}>{relativeTime(item.timestamp)}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lead capture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 text-white" style={{ backgroundColor: colors.primaryDark }}>
            <h2 className="text-2xl font-bold mb-1">Run {demo.name} on your own stock</h2>
            <p className="text-sm opacity-90">
              {demo.package}. Tell us what you carry and we will map this to your catalog, suppliers, and reorder rules.
            </p>
          </div>

          {leadSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircle className="w-10 h-10" style={{ color: colors.success }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request received</h3>
              <p className="mb-6" style={{ color: colors.textLight }}>
                Thanks for reaching out. We will follow up within one business day with next steps.
              </p>
              <button
                type="button"
                onClick={() => { setLeadSubmitted(false); setLeadForm({ name: '', email: '', phone: '', message: '' }) }}
                className="font-semibold hover:underline"
                style={{ color: colors.primary }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="p-8 grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inv-lead-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Full Name *
                </label>
                <input
                  id="inv-lead-name"
                  name="name"
                  type="text"
                  required
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  placeholder="Jordan Blake"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="inv-lead-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Email Address *
                </label>
                <input
                  id="inv-lead-email"
                  name="email"
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                  placeholder="jordan@yourcompany.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="inv-lead-phone" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Phone Number
                </label>
                <input
                  id="inv-lead-phone"
                  name="phone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div>
                <label htmlFor="inv-lead-skus" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  What are you tracking?
                </label>
                <input
                  id="inv-lead-skus"
                  name="skus"
                  type="text"
                  value={leadForm.message}
                  onChange={e => setLeadForm({ ...leadForm, message: e.target.value })}
                  placeholder="About 400 SKUs across two warehouses"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-lg font-bold text-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-5 h-5" /> Request This System
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddItem && (
        <ProductFormModal
          colors={colors}
          onClose={() => setShowAddItem(false)}
          onSave={draft => { inv.addProduct(draft); setShowAddItem(false) }}
        />
      )}

      {editProduct && (
        <ProductFormModal
          colors={colors}
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={draft => { inv.updateProduct(editProduct.id, draft); setEditProduct(null) }}
        />
      )}

      {showPoModal && (
        <PurchaseOrderModal
          colors={colors}
          products={products}
          initialProductId={poProductId ?? undefined}
          onClose={() => { setShowPoModal(false); setPoProductId(null) }}
          onCreate={(productId, quantity) => {
            inv.createPurchaseOrder(productId, quantity)
            setShowPoModal(false)
            setPoProductId(null)
            setActiveTab('orders')
          }}
        />
      )}

      {detailProduct && (
        <ProductDetailModal
          colors={colors}
          product={detailProduct}
          activity={activity.filter(a => a.item === detailProduct.name)}
          orders={purchaseOrders.filter(o => o.productId === detailProduct.id)}
          onClose={() => setDetailId(null)}
          onAdjust={(delta, type) => inv.adjustStock(detailProduct.id, delta, type)}
          onOrder={() => openPurchaseOrder(detailProduct.id)}
          onEdit={() => { setEditProduct(detailProduct); setDetailId(null) }}
          onDelete={() => { inv.deleteProduct(detailProduct.id); setDetailId(null) }}
        />
      )}

      {showScanner && (
        <Modal title="Barcode Scanner" colors={colors} onClose={() => setShowScanner(false)}>
          <div className="space-y-5">
            <p className="text-sm" style={{ color: colors.textLight }}>
              Type or scan a SKU. In a live build this reads from a handheld scanner or phone camera, and the
              lookup below is exactly what the operator sees.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                aria-label="Scan or type a SKU"
                value={scanCode}
                onChange={e => { setScanCode(e.target.value); setScanMiss(false) }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); runScan(scanCode) } }}
                placeholder="SKU-001"
                className="flex-1 px-4 py-2.5 border rounded-lg font-mono focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border }}
              />
              <button
                type="button"
                onClick={() => runScan(scanCode)}
                className="px-4 py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Look Up
              </button>
            </div>
            <button
              type="button"
              onClick={simulateScan}
              className="w-full px-4 py-2.5 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <Barcode className="w-4 h-4" /> Simulate a scan
            </button>

            {scanMiss && (
              <p className="text-sm font-semibold" style={{ color: colors.error }}>
                No item matches that code. Try one of the SKUs below.
              </p>
            )}

            {scannedProduct ? (
              <div className="rounded-xl border-2 p-4" style={{ borderColor: colors.primary }}>
                <p className="font-mono text-sm" style={{ color: colors.textLight }}>{scannedProduct.id}</p>
                <p className="text-lg font-bold" style={{ color: colors.text }}>{scannedProduct.name}</p>
                <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                  {scannedProduct.stock} on hand, reorder at {scannedProduct.reorderPoint}, {statusOf(scannedProduct)}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => inv.adjustStock(scannedProduct.id, 1, 'received')}
                    className="px-3 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.success }}
                  >
                    Receive 1
                  </button>
                  <button
                    type="button"
                    onClick={() => inv.adjustStock(scannedProduct.id, -1, 'sold')}
                    className="px-3 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Sell 1
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowScanner(false); setDetailId(scannedProduct.id) }}
                    className="px-3 py-2 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Open Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {products.slice(0, 6).map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setScanCode(p.id); runScan(p.id) }}
                    className="px-3 py-1.5 rounded-full text-sm font-mono border-2 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.textLight }}
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {showValuation && (
        <Modal title="Stock Value Breakdown" colors={colors} onClose={() => setShowValuation(false)} maxWidth="max-w-2xl">
          <div className="space-y-5">
            <div className="rounded-xl p-4" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-sm font-semibold" style={{ color: colors.textLight }}>Total value on the shelf</p>
              <p className="text-3xl font-bold" style={{ color: colors.primary }}>{formatCurrency(stockValue(products))}</p>
              <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                {totalUnits} units across {products.length} SKU{products.length === 1 ? '' : 's'}
              </p>
            </div>

            <div>
              <p className="font-bold mb-3" style={{ color: colors.text }}>By category</p>
              <div className="space-y-2">
                {categoryRows.map(cat => {
                  const total = stockValue(products)
                  const share = total > 0 ? Math.round((cat.value / total) * 100) : 0
                  return (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => { setShowValuation(false); openCategory(cat.category) }}
                      className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left"
                      style={{ borderColor: colors.border }}
                    >
                      <span className="font-semibold" style={{ color: colors.text }}>{cat.category}</span>
                      <span className="text-sm" style={{ color: colors.textLight }}>{share}% of value</span>
                      <span className="font-bold" style={{ color: colors.primary }}>{formatCurrency(cat.value, 0)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="font-bold mb-3" style={{ color: colors.text }}>Highest value items</p>
              {products.length === 0 ? (
                <p className="text-sm" style={{ color: colors.textLight }}>The catalog is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {[...products]
                    .sort((a, b) => b.stock * b.price - a.stock * a.price)
                    .slice(0, 5)
                    .map(p => (
                      <li key={p.id} className="flex items-center justify-between text-sm">
                        <span style={{ color: colors.text }}>{p.name}</span>
                        <span style={{ color: colors.textLight }}>{p.stock} x {formatCurrency(p.price)}</span>
                        <span className="font-semibold" style={{ color: colors.primary }}>{formatCurrency(p.stock * p.price)}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  downloadCsv('stock-valuation.csv', [
                    ['SKU', 'Item', 'Category', 'On Hand', 'Unit Price', 'Stock Value'],
                    ...products.map(p => [p.id, p.name, p.category, p.stock, p.price.toFixed(2), (p.stock * p.price).toFixed(2)]),
                  ])
                  inv.setToast('Stock valuation downloaded')
                }}
                className="flex-1 px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" /> Download Valuation
              </button>
              <button
                type="button"
                onClick={() => { setShowValuation(false); setActiveTab('products') }}
                className="flex-1 px-4 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Open Product List
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showReceive && (
        <Modal title="Receive Shipment" colors={colors} onClose={() => setShowReceive(false)}>
          {pendingOrders.length === 0 ? (
            <div className="text-center py-6">
              <p className="font-semibold mb-2" style={{ color: colors.text }}>Nothing is on order right now.</p>
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                Raise a purchase order and it will show here ready to receive.
              </p>
              <button
                type="button"
                onClick={() => { setShowReceive(false); openPurchaseOrder() }}
                className="px-4 py-3 rounded-lg font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Create Purchase Order
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingOrders.map(order => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border"
                  style={{ borderColor: colors.border }}
                >
                  <div>
                    <p className="font-mono text-sm" style={{ color: colors.textLight }}>{order.id}</p>
                    <p className="font-bold" style={{ color: colors.text }}>{order.productName}</p>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {order.quantity} units from {order.supplier}, raised {relativeTime(order.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => inv.receivePurchaseOrder(order.id)}
                    className="px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.success }}
                  >
                    Receive {order.quantity}
                  </button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      <Toast message={inv.toast} colors={colors} onDismiss={() => inv.setToast(null)} />
    </div>
  )
}
