'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import type { LucideIcon } from 'lucide-react'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Cake } from 'lucide-react'
import { loadJSON, saveJSON, ORDERS_KEY, SEED_STATUS_KEY, type PlacedOrder } from './shared'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type Period = 'today' | 'week' | 'month'

interface Stat {
  label: string
  value: string
  change: string
  icon: LucideIcon
}

const PERIODS: { id: Period; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
]

const STATS_BY_PERIOD: Record<Period, Stat[]> = {
  today: [
    { label: 'Revenue', value: '$2,847', change: '+18%', icon: DollarSign },
    { label: 'Orders', value: '127', change: '+12%', icon: ShoppingBag },
    { label: 'Active Customers', value: '892', change: '+24%', icon: Users },
    { label: 'Products Sold', value: '456', change: '+15%', icon: Package },
  ],
  week: [
    { label: 'Revenue', value: '$18,940', change: '+11%', icon: DollarSign },
    { label: 'Orders', value: '812', change: '+9%', icon: ShoppingBag },
    { label: 'Active Customers', value: '1,204', change: '+16%', icon: Users },
    { label: 'Products Sold', value: '2,981', change: '+8%', icon: Package },
  ],
  month: [
    { label: 'Revenue', value: '$76,320', change: '+14%', icon: DollarSign },
    { label: 'Orders', value: '3,405', change: '+12%', icon: ShoppingBag },
    { label: 'Active Customers', value: '2,318', change: '+21%', icon: Users },
    { label: 'Products Sold', value: '12,447', change: '+10%', icon: Package },
  ],
}

const POPULAR_BY_PERIOD: Record<Period, { name: string; sold: number; revenue: string }[]> = {
  today: [
    { name: 'Chocolate Fudge Cake', sold: 45, revenue: '$2,025' },
    { name: 'Butter Croissants', sold: 234, revenue: '$934' },
    { name: 'Custom Cupcakes', sold: 67, revenue: '$1,675' },
  ],
  week: [
    { name: 'Butter Croissants', sold: 1642, revenue: '$6,552' },
    { name: 'Chocolate Fudge Cake', sold: 289, revenue: '$13,005' },
    { name: 'Sourdough Loaves', sold: 512, revenue: '$4,091' },
  ],
  month: [
    { name: 'Butter Croissants', sold: 6890, revenue: '$27,491' },
    { name: 'Chocolate Fudge Cake', sold: 1204, revenue: '$54,180' },
    { name: 'Custom Cupcakes', sold: 1876, revenue: '$46,900' },
  ],
}

interface SeedOrder {
  id: string
  customer: string
  items: string
  total: string
  status: string
}

const SEED_ORDERS: SeedOrder[] = [
  { id: '#SD1247', customer: 'Mike Johnson', items: 'Birthday Cake, Cupcakes', total: '$87.50', status: 'Ready' },
  { id: '#SD1246', customer: 'Sarah Lee', items: 'Wedding Cake', total: '$450.00', status: 'In Progress' },
  { id: '#SD1245', customer: 'Tom Brown', items: 'Croissants (12)', total: '$24.00', status: 'Completed' },
]

const STATUS_FLOW: Record<string, string> = {
  'In Progress': 'Ready',
  'Ready': 'Completed',
}

interface OrderRow {
  id: string
  customer: string
  items: string
  total: string
  status: string
  source: 'customer' | 'seed'
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [period, setPeriod] = useState<Period>('today')
  const [customerOrders, setCustomerOrders] = useState<PlacedOrder[]>([])
  const [seedStatuses, setSeedStatuses] = useState<Record<string, string>>({})
  const [storageReady, setStorageReady] = useState(false)

  useEffect(() => {
    setCustomerOrders(loadJSON<PlacedOrder[]>(ORDERS_KEY, []))
    setSeedStatuses(loadJSON<Record<string, string>>(SEED_STATUS_KEY, {}))
    setStorageReady(true)
  }, [])

  useEffect(() => { if (storageReady) saveJSON(ORDERS_KEY, customerOrders) }, [customerOrders, storageReady])
  useEffect(() => { if (storageReady) saveJSON(SEED_STATUS_KEY, seedStatuses) }, [seedStatuses, storageReady])

  const advanceStatus = (row: OrderRow) => {
    const next = STATUS_FLOW[row.status]
    if (!next) return
    if (row.source === 'customer') {
      setCustomerOrders(prev => prev.map(o => o.id === row.id ? { ...o, status: next } : o))
    } else {
      setSeedStatuses(prev => ({ ...prev, [row.id]: next }))
    }
  }

  const orderRows: OrderRow[] = [
    ...customerOrders.map(o => ({
      id: o.id,
      customer: o.customer || 'Online Customer',
      items: o.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
      total: `$${o.total.toFixed(2)}`,
      status: o.status,
      source: 'customer' as const,
    })),
    ...SEED_ORDERS.map(o => ({
      ...o,
      status: seedStatuses[o.id] ?? o.status,
      source: 'seed' as const,
    })),
  ]

  const stats = STATS_BY_PERIOD[period]
  const popularItems = POPULAR_BY_PERIOD[period]

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
        <div className="inline-flex bg-white rounded-lg shadow-sm p-1 mb-6">
          {PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${period === p.id ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
              <p className="text-sm text-gray-500 mt-1">Online orders placed on the site appear here automatically.</p>
            </div>
            <div className="p-6 space-y-4">
              {orderRows.map(order => {
                const next = STATUS_FLOW[order.status]
                return (
                  <div key={order.id} className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500 truncate">{order.items}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Ready' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
                      </span>
                      {next && (
                        <button
                          onClick={() => advanceStatus(order)}
                          className="block ml-auto mt-2 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                        >
                          Mark {next}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Popular Items ({PERIODS.find(p => p.id === period)?.label})</h2>
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
                      <p className="text-sm text-gray-600">{item.sold.toLocaleString()} sold</p>
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
