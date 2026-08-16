'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { useEffect, useState } from 'react'

interface AdminDashboardPageProps {
  colors: ColorPalette
}

type OrderStatus = 'Preparing' | 'Ready' | 'Delivered' | 'Completed' | 'Cancelled'
type OrderType = 'Delivery' | 'Pickup' | 'Dine-in'

interface AdminOrder {
  id: string
  customer: string
  items: string
  total: string
  status: OrderStatus
  time: string
  type: OrderType
  phone: string
  address: string
}

interface AdminReservation {
  id: number
  time: string
  name: string
  guests: number
  phone: string
  status: 'Confirmed' | 'Pending'
  notes: string
}

const ORDERS_STORAGE_KEY = 'restaurant-admin-orders'
const RESERVATIONS_STORAGE_KEY = 'restaurant-admin-reservations'

const defaultOrders: AdminOrder[] = [
  { id: '#2847', customer: 'Sarah Johnson', items: 'Truffle Carbonara, Tiramisu Classico', total: '$44.00', status: 'Preparing', time: '5 min ago', type: 'Delivery', phone: '(312) 555-0147', address: '812 W Madison St, Apt 4B, Chicago, IL' },
  { id: '#2846', customer: 'Mike Chen', items: 'Osso Buco Milanese, House Wine', total: '$72.00', status: 'Ready', time: '12 min ago', type: 'Pickup', phone: '(312) 555-0263', address: '' },
  { id: '#2845', customer: 'Emma Davis', items: 'Lobster Ravioli, Panna Cotta', total: '$48.00', status: 'Delivered', time: '28 min ago', type: 'Delivery', phone: '(312) 555-0388', address: '2200 N Clark St, Chicago, IL' },
  { id: '#2844', customer: 'David Park', items: 'Bistecca Fiorentina, Burrata Caprese', total: '$81.00', status: 'Completed', time: '45 min ago', type: 'Dine-in', phone: '(312) 555-0512', address: '' }
]

const defaultReservations: AdminReservation[] = [
  { id: 1, time: '5:00 PM', name: 'Anderson Party', guests: 4, phone: '(312) 555-0123', status: 'Confirmed', notes: 'Window table' },
  { id: 2, time: '6:30 PM', name: 'Martinez Wedding', guests: 8, phone: '(312) 555-0456', status: 'Confirmed', notes: 'Anniversary, champagne' },
  { id: 3, time: '7:00 PM', name: 'Thompson Family', guests: 6, phone: '(312) 555-0789', status: 'Pending', notes: 'High chair needed' },
  { id: 4, time: '8:00 PM', name: 'Lee Business Dinner', guests: 12, phone: '(312) 555-0321', status: 'Confirmed', notes: 'Private room' }
]

const timeSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

const emptyReservationForm = { time: '5:00 PM', name: '', guests: '2', phone: '', status: 'Pending' as 'Confirmed' | 'Pending', notes: '' }

function statusColor(status: OrderStatus): string {
  switch (status) {
    case 'Preparing': return '#fbbf24'
    case 'Ready': return '#22c55e'
    case 'Delivered': return '#3b82f6'
    case 'Cancelled': return '#ef4444'
    default: return '#9ca3af'
  }
}

function nextStatus(order: AdminOrder): OrderStatus | null {
  if (order.status === 'Preparing') return 'Ready'
  if (order.status === 'Ready') return order.type === 'Delivery' ? 'Delivered' : 'Completed'
  if (order.status === 'Delivered') return 'Completed'
  return null
}

export default function AdminDashboardPage({ colors }: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'loyalty' | 'analytics'>('orders')
  const [orders, setOrders] = useState<AdminOrder[]>(defaultOrders)
  const [reservations, setReservations] = useState<AdminReservation[]>(defaultReservations)
  const [hydrated, setHydrated] = useState(false)
  const [orderFilter, setOrderFilter] = useState<'All' | OrderType>('All')
  const [detailOrder, setDetailOrder] = useState<AdminOrder | null>(null)
  const [reservationModalOpen, setReservationModalOpen] = useState(false)
  const [editingReservationId, setEditingReservationId] = useState<number | null>(null)
  const [reservationForm, setReservationForm] = useState(emptyReservationForm)

  useEffect(() => {
    try {
      const storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY)
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders)
        if (Array.isArray(parsed) && parsed.length > 0) setOrders(parsed)
      }
      const storedReservations = window.localStorage.getItem(RESERVATIONS_STORAGE_KEY)
      if (storedReservations) {
        const parsed = JSON.parse(storedReservations)
        if (Array.isArray(parsed) && parsed.length > 0) setReservations(parsed)
      }
    } catch {
      // Ignore unreadable stored data and use defaults
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    } catch {
      // Storage unavailable; state still works in memory
    }
  }, [orders, hydrated])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations))
    } catch {
      // Storage unavailable; state still works in memory
    }
  }, [reservations, hydrated])

  const filteredOrders = orderFilter === 'All' ? orders : orders.filter((o) => o.type === orderFilter)

  const advanceOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o
        const next = nextStatus(o)
        return next ? { ...o, status: next } : o
      })
    )
    setDetailOrder((prev) => {
      if (!prev || prev.id !== id) return prev
      const next = nextStatus(prev)
      return next ? { ...prev, status: next } : prev
    })
  }

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Cancelled' } : o)))
    setDetailOrder((prev) => (prev && prev.id === id ? { ...prev, status: 'Cancelled' } : prev))
  }

  const confirmReservation = (id: number) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Confirmed' } : r)))
  }

  const openNewReservation = () => {
    setEditingReservationId(null)
    setReservationForm(emptyReservationForm)
    setReservationModalOpen(true)
  }

  const openEditReservation = (res: AdminReservation) => {
    setEditingReservationId(res.id)
    setReservationForm({
      time: res.time,
      name: res.name,
      guests: String(res.guests),
      phone: res.phone,
      status: res.status,
      notes: res.notes
    })
    setReservationModalOpen(true)
  }

  const saveReservation = (e: React.FormEvent) => {
    e.preventDefault()
    const guests = Math.max(1, parseInt(reservationForm.guests, 10) || 1)
    if (editingReservationId === null) {
      setReservations((prev) => [
        ...prev,
        {
          id: prev.reduce((max, r) => Math.max(max, r.id), 0) + 1,
          time: reservationForm.time,
          name: reservationForm.name,
          guests,
          phone: reservationForm.phone,
          status: reservationForm.status,
          notes: reservationForm.notes
        }
      ])
    } else {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === editingReservationId
            ? { ...r, time: reservationForm.time, name: reservationForm.name, guests, phone: reservationForm.phone, status: reservationForm.status, notes: reservationForm.notes }
            : r
        )
      )
    }
    setReservationModalOpen(false)
  }

  const removeReservation = () => {
    if (editingReservationId === null) return
    setReservations((prev) => prev.filter((r) => r.id !== editingReservationId))
    setReservationModalOpen(false)
  }

  const loyaltyMembers = [
    { name: 'Jennifer Wilson', tier: 'Gold', points: 1847, spend: '$2,450', lastVisit: '2 days ago' },
    { name: 'Robert Taylor', tier: 'Silver', points: 892, spend: '$745', lastVisit: '1 week ago' },
    { name: 'Michelle Lee', tier: 'Gold', points: 2103, spend: '$3,120', lastVisit: 'Today' },
    { name: 'James Brown', tier: 'Bronze', points: 234, spend: '$234', lastVisit: '3 weeks ago' }
  ]

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#9b2226' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-bold mb-2">
            Restaurant Dashboard
          </h1>
          <p style={{ color: '#ee9b00' }} className="text-lg">
            Real-time order management and analytics
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Today's Orders</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">127</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 12% from yesterday</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Revenue Today</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">$5,847</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 8% from yesterday</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Active Reservations</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">{reservations.length}</div>
            <div style={{ color: '#666666' }} className="text-sm font-bold">For tonight</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Loyalty Members</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">1,243</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 23 new this week</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'orders' as const, label: 'Live Orders', icon: '📦' },
            { id: 'reservations' as const, label: 'Reservations', icon: '🍽️' },
            { id: 'loyalty' as const, label: 'Loyalty Program', icon: '⭐' },
            { id: 'analytics' as const, label: 'Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#9b2226' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#1a1a1a'
              }}
              className="px-6 py-3 font-bold hover:opacity-80 transition"
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Live Orders</h2>
              <div className="flex flex-wrap gap-3">
                {(['All', 'Delivery', 'Pickup', 'Dine-in'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    style={{
                      backgroundColor: orderFilter === filter ? '#9b2226' : '#f5f5f5',
                      color: orderFilter === filter ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-4 py-2 font-bold text-sm hover:opacity-80 transition"
                  >
                    {filter === 'All' ? 'All Orders' : filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredOrders.length === 0 && (
                <div style={{ backgroundColor: '#f8f8f8', color: '#666666' }} className="p-8 text-center font-bold">
                  No {orderFilter === 'All' ? '' : orderFilter.toLowerCase() + ' '}orders right now
                </div>
              )}
              {filteredOrders.map((order) => (
                <div key={order.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-xl font-bold">{order.id}</span>
                        <span style={{
                          backgroundColor: statusColor(order.status),
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {order.status}
                        </span>
                        <span style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {order.type}
                        </span>
                      </div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold text-lg">{order.customer}</div>
                      <div style={{ color: '#666666' }} className="text-sm">{order.items}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: '#9b2226' }} className="text-2xl font-bold mb-1">{order.total}</div>
                      <div style={{ color: '#999999' }} className="text-sm">{order.time}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {nextStatus(order) && (
                      <button
                        onClick={() => advanceOrder(order.id)}
                        style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                        className="flex-1 py-2 px-4 font-bold text-sm hover:opacity-90"
                      >
                        Mark {nextStatus(order)}
                      </button>
                    )}
                    <button
                      onClick={() => setDetailOrder(order)}
                      style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                      className="flex-1 py-2 px-4 font-bold text-sm hover:opacity-90"
                    >
                      View Details
                    </button>
                    {order.status !== 'Completed' && order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                        className="px-6 py-2 font-bold text-sm hover:opacity-90"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Today's Reservations</h2>
              <button
                onClick={openNewReservation}
                style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                className="px-6 py-3 font-bold hover:opacity-90"
              >
                + New Reservation
              </button>
            </div>
            <div className="space-y-4">
              {reservations.length === 0 && (
                <div style={{ backgroundColor: '#f8f8f8', color: '#666666' }} className="p-8 text-center font-bold">
                  No reservations on the books tonight
                </div>
              )}
              {reservations.map((res) => (
                <div key={res.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#9b2226' }} className="text-2xl font-bold">{res.time}</span>
                        <span style={{
                          backgroundColor: res.status === 'Confirmed' ? '#22c55e' : '#fbbf24',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {res.status}
                        </span>
                      </div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-1">{res.name}</div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>👥 {res.guests} guests</div>
                        <div>📞 {res.phone}</div>
                        {res.notes && <div>📝 {res.notes}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {res.status === 'Pending' && (
                        <button
                          onClick={() => confirmReservation(res.id)}
                          style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => openEditReservation(res)}
                        style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loyalty Tab */}
        {activeTab === 'loyalty' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">Top Loyalty Members</h2>
            <div className="space-y-4">
              {loyaltyMembers.map((member, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-bold">{member.name}</span>
                        <span style={{
                          backgroundColor: member.tier === 'Gold' ? '#fbbf24' :
                                        member.tier === 'Silver' ? '#9ca3af' : '#cd7f32',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {member.tier}
                        </span>
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm">
                        Last visit: {member.lastVisit}
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: '#9b2226' }} className="text-xl font-bold">{member.points} pts</div>
                      <div style={{ color: '#666666' }} className="text-sm">Lifetime: {member.spend}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-8">Performance Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-4">Top Selling Items</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Truffle Carbonara', orders: 47, revenue: '$1,504' },
                    { name: 'Osso Buco Milanese', orders: 31, revenue: '$1,488' },
                    { name: 'Lobster Ravioli', orders: 28, revenue: '$1,008' },
                    { name: 'Tiramisu Classico', orders: 52, revenue: '$624' }
                  ].map((item) => (
                    <div key={item.name} style={{ backgroundColor: '#f8f8f8' }} className="p-4 flex justify-between items-center">
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">{item.name}</div>
                        <div style={{ color: '#666666' }} className="text-sm">{item.orders} orders</div>
                      </div>
                      <div style={{ color: '#9b2226' }} className="text-xl font-bold">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-4">This Week Summary</h3>
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Total Orders</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">687</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Total Revenue</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">$31,245</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Average Order Value</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">$45.47</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Customer Satisfaction</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">4.8/5.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {detailOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">Order {detailOrder.id}</h3>
              <button onClick={() => setDetailOrder(null)} aria-label="Close order details" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span style={{ backgroundColor: statusColor(detailOrder.status), color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                  {detailOrder.status}
                </span>
                <span style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                  {detailOrder.type}
                </span>
                <span style={{ color: '#999999' }} className="text-sm">{detailOrder.time}</span>
              </div>
              <div>
                <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-1">Customer</div>
                <div style={{ color: '#1a1a1a' }} className="font-bold">{detailOrder.customer}</div>
                <div style={{ color: '#666666' }} className="text-sm">{detailOrder.phone}</div>
              </div>
              {detailOrder.type === 'Delivery' && detailOrder.address && (
                <div>
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-1">Delivery Address</div>
                  <div style={{ color: '#1a1a1a' }}>{detailOrder.address}</div>
                </div>
              )}
              <div>
                <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-1">Items</div>
                <div className="space-y-1">
                  {detailOrder.items.split(', ').map((item) => (
                    <div key={item} style={{ backgroundColor: '#f8f8f8', color: '#1a1a1a' }} className="p-3 font-bold text-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '2px solid #1a1a1a' }} className="flex justify-between pt-3">
                <span style={{ color: '#1a1a1a' }} className="font-bold">Order Total</span>
                <span style={{ color: '#9b2226' }} className="text-xl font-bold">{detailOrder.total}</span>
              </div>
              <div className="flex gap-3 pt-2">
                {nextStatus(detailOrder) && (
                  <button
                    onClick={() => advanceOrder(detailOrder.id)}
                    style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                    className="flex-1 py-3 font-bold text-sm hover:opacity-90"
                  >
                    Mark {nextStatus(detailOrder)}
                  </button>
                )}
                <button
                  onClick={() => setDetailOrder(null)}
                  style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                  className="flex-1 py-3 font-bold text-sm hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Add/Edit Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-bold">
                {editingReservationId === null ? 'New Reservation' : 'Edit Reservation'}
              </h3>
              <button onClick={() => setReservationModalOpen(false)} aria-label="Close reservation form" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={saveReservation} className="p-8 space-y-4">
              <div>
                <label htmlFor="admin-res-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Guest Name *</label>
                <input
                  id="admin-res-name"
                  type="text"
                  required
                  value={reservationForm.name}
                  onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-res-time" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Time *</label>
                  <select
                    id="admin-res-time"
                    required
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-res-guests" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Guests *</label>
                  <input
                    id="admin-res-guests"
                    type="number"
                    min="1"
                    required
                    value={reservationForm.guests}
                    onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="admin-res-phone" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                <input
                  id="admin-res-phone"
                  type="tel"
                  required
                  value={reservationForm.phone}
                  onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="admin-res-status" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Status</label>
                <select
                  id="admin-res-status"
                  value={reservationForm.status}
                  onChange={(e) => setReservationForm({ ...reservationForm, status: e.target.value as 'Confirmed' | 'Pending' })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                </select>
              </div>
              <div>
                <label htmlFor="admin-res-notes" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Notes</label>
                <textarea
                  id="admin-res-notes"
                  value={reservationForm.notes}
                  onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3 h-20"
                  placeholder="Seating preferences, special occasion, allergies..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="flex-1 py-3 font-bold hover:opacity-90"
                >
                  {editingReservationId === null ? 'Add Reservation' : 'Save Changes'}
                </button>
                {editingReservationId !== null && (
                  <button
                    type="button"
                    onClick={removeReservation}
                    style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                    className="px-6 py-3 font-bold hover:opacity-90"
                  >
                    Remove
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-20"></div>
    </div>
  )
}
