'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Gem, Plus, Minus, Trash2 } from 'lucide-react'
import usePersistentState from './usePersistentState'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type Period = 'today' | 'week' | 'month'

interface AdminOrder {
  id: string
  customer: string
  items: string
  total: string
  status: string
}

interface InventoryItem {
  id: string
  name: string
  price: number
  stock: number
}

const PERIODS: { id: Period; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
]

const STATS: Record<Period, { label: string; value: string; change: string; icon: typeof DollarSign }[]> = {
  today: [
    { label: 'Revenue Today', value: '$42,847', change: '+32%', icon: DollarSign },
    { label: 'Orders', value: '84', change: '+18%', icon: ShoppingBag },
    { label: 'VIP Customers', value: '432', change: '+24%', icon: Users },
    { label: 'Items Sold', value: '156', change: '+21%', icon: Package },
  ],
  week: [
    { label: 'Revenue This Week', value: '$263,590', change: '+19%', icon: DollarSign },
    { label: 'Orders', value: '517', change: '+12%', icon: ShoppingBag },
    { label: 'VIP Customers', value: '438', change: '+9%', icon: Users },
    { label: 'Items Sold', value: '942', change: '+15%', icon: Package },
  ],
  month: [
    { label: 'Revenue This Month', value: '$1,082,400', change: '+11%', icon: DollarSign },
    { label: 'Orders', value: '2,236', change: '+8%', icon: ShoppingBag },
    { label: 'VIP Customers', value: '451', change: '+6%', icon: Users },
    { label: 'Items Sold', value: '4,067', change: '+9%', icon: Package },
  ],
}

const TOP_PRODUCTS: Record<Period, { name: string; sold: number; revenue: string }[]> = {
  today: [
    { name: 'Diamond Solitaire Ring', sold: 24, revenue: '$79,200' },
    { name: 'Gold Bracelet', sold: 31, revenue: '$46,500' },
    { name: 'Pearl Necklace', sold: 18, revenue: '$16,200' },
  ],
  week: [
    { name: 'Diamond Solitaire Ring', sold: 96, revenue: '$316,800' },
    { name: 'Tennis Bracelet', sold: 74, revenue: '$214,600' },
    { name: 'Diamond Stud Earrings', sold: 121, revenue: '$157,300' },
  ],
  month: [
    { name: 'Gold Bracelet', sold: 388, revenue: '$582,000' },
    { name: 'Diamond Stud Earrings', sold: 412, revenue: '$535,600' },
    { name: 'Pearl Necklace', sold: 351, revenue: '$315,900' },
  ],
}

const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

const INITIAL_ORDERS: AdminOrder[] = [
  { id: 'TT-3121', customer: 'Olivia Bennett', items: 'Diamond Solitaire Ring', total: '$3,299.99', status: 'Processing' },
  { id: 'TT-3120', customer: 'Marcus Hale', items: 'Pearl Necklace, Gold Bracelet', total: '$2,399.98', status: 'Shipped' },
  { id: 'TT-3119', customer: 'Priya Natarajan', items: 'Emerald Earrings', total: '$2,199.99', status: 'Delivered' },
  { id: 'TT-3118', customer: 'Daniel Osei', items: 'Tennis Bracelet', total: '$2,899.99', status: 'Processing' },
  { id: 'TT-3117', customer: 'Grace Lin', items: 'Sapphire Pendant', total: '$1,599.99', status: 'Delivered' },
]

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Diamond Solitaire Ring', price: 3299.99, stock: 12 },
  { id: 'inv-2', name: 'Pearl Necklace', price: 899.99, stock: 26 },
  { id: 'inv-3', name: 'Gold Bracelet', price: 1499.99, stock: 18 },
  { id: 'inv-4', name: 'Emerald Earrings', price: 2199.99, stock: 7 },
  { id: 'inv-5', name: 'Tennis Bracelet', price: 2899.99, stock: 4 },
  { id: 'inv-6', name: 'Classic Chronograph Watch', price: 3899.99, stock: 9 },
]

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [period, setPeriod] = useState<Period>('today')
  const [orders, setOrders] = usePersistentState<AdminOrder[]>('demo19-jewelry-admin-orders', INITIAL_ORDERS)
  const [inventory, setInventory] = usePersistentState<InventoryItem[]>('demo19-jewelry-admin-inventory', INITIAL_INVENTORY)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState('')

  const stats = STATS[period]
  const topProducts = TOP_PRODUCTS[period]

  const setOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order))
  }

  const adjustStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item))
  }

  const deleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id))
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    const price = parseFloat(newPrice)
    const stock = parseInt(newStock, 10)
    if (!newName.trim() || isNaN(price) || price <= 0) return
    setInventory(prev => [
      { id: `inv-${Date.now()}`, name: newName.trim(), price, stock: isNaN(stock) ? 0 : Math.max(0, stock) },
      ...prev,
    ])
    setNewName('')
    setNewPrice('')
    setNewStock('')
  }

  const statusBadge = (status: string) => {
    if (status === 'Delivered') return 'bg-green-100 text-green-700'
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700'
    if (status === 'Cancelled') return 'bg-red-100 text-red-700'
    return 'bg-amber-100 text-amber-700'
  }

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
        <div className="flex space-x-2 mb-6">
          {PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${period === p.id ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
              style={period === p.id ? { backgroundColor: colors.primary } : undefined}
            >
              {p.label}
            </button>
          ))}
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Selling Products ({PERIODS.find(p => p.id === period)?.label})</h2>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{order.id} <span className="font-normal text-gray-600">-- {order.customer}</span></p>
                    <p className="text-sm text-gray-600 truncate">{order.items}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(order.status)}`}>{order.status}</span>
                    <p className="font-bold text-gray-900">{order.total}</p>
                    <label htmlFor={`order-status-${order.id}`} className="sr-only">Update status for order {order.id}</label>
                    <select
                      id={`order-status-${order.id}`}
                      value={order.status}
                      onChange={e => setOrderStatus(order.id, e.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-700"
                    >
                      {ORDER_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Inventory</h2>

          <form onSubmit={addItem} className="flex flex-wrap gap-3 mb-6">
            <label htmlFor="jewelry-admin-new-name" className="sr-only">New product name</label>
            <input
              id="jewelry-admin-new-name"
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Product name"
              className="flex-1 min-w-[180px] px-4 py-2 border border-gray-200 rounded-lg"
            />
            <label htmlFor="jewelry-admin-new-price" className="sr-only">New product price</label>
            <input
              id="jewelry-admin-new-price"
              type="number"
              min="0.01"
              step="0.01"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
              placeholder="Price"
              className="w-32 px-4 py-2 border border-gray-200 rounded-lg"
            />
            <label htmlFor="jewelry-admin-new-stock" className="sr-only">New product stock</label>
            <input
              id="jewelry-admin-new-stock"
              type="number"
              min="0"
              step="1"
              value={newStock}
              onChange={e => setNewStock(e.target.value)}
              placeholder="Stock"
              className="w-28 px-4 py-2 border border-gray-200 rounded-lg"
            />
            <button type="submit" className="text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 flex items-center" style={{ backgroundColor: colors.primary }}>
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </button>
          </form>

          {inventory.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No products in inventory. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {inventory.map(item => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {item.stock < 5 && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Low stock</span>
                    )}
                    <button onClick={() => adjustStock(item.id, -1)} aria-label={`Decrease stock for ${item.name}`} className="w-8 h-8 rounded border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-10 text-center">{item.stock}</span>
                    <button onClick={() => adjustStock(item.id, 1)} aria-label={`Increase stock for ${item.name}`} className="w-8 h-8 rounded border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteItem(item.id)} aria-label={`Remove ${item.name} from inventory`} className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
