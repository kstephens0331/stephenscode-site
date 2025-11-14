'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { useState } from 'react'

interface AdminDashboardPageProps {
  colors: ColorPalette
}

export default function AdminDashboardPage({ colors }: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'loyalty' | 'analytics'>('orders')

  const recentOrders = [
    { id: '#2847', customer: 'Sarah Johnson', items: 'Truffle Carbonara, Tiramisu', total: '$44.00', status: 'Preparing', time: '5 min ago', type: 'Delivery' },
    { id: '#2846', customer: 'Mike Chen', items: 'Osso Buco, Wine', total: '$72.00', status: 'Ready', time: '12 min ago', type: 'Pickup' },
    { id: '#2845', customer: 'Emma Davis', items: 'Lobster Ravioli, Panna Cotta', total: '$48.00', status: 'Delivered', time: '28 min ago', type: 'Delivery' },
    { id: '#2844', customer: 'David Park', items: 'Bistecca Fiorentina, Burrata', total: '$81.00', status: 'Completed', time: '45 min ago', type: 'Dine-in' }
  ]

  const todayReservations = [
    { time: '5:00 PM', name: 'Anderson Party', guests: 4, phone: '(312) 555-0123', status: 'Confirmed', notes: 'Window table' },
    { time: '6:30 PM', name: 'Martinez Wedding', guests: 8, phone: '(312) 555-0456', status: 'Confirmed', notes: 'Anniversary, champagne' },
    { time: '7:00 PM', name: 'Thompson Family', guests: 6, phone: '(312) 555-0789', status: 'Pending', notes: 'High chair needed' },
    { time: '8:00 PM', name: 'Lee Business Dinner', guests: 12, phone: '(312) 555-0321', status: 'Confirmed', notes: 'Private room' }
  ]

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
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-black mb-2">
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
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">127</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 12% from yesterday</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Revenue Today</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">$5,847</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 8% from yesterday</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Active Reservations</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">18</div>
            <div style={{ color: '#666666' }} className="text-sm font-bold">For tonight</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Loyalty Members</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">1,243</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 23 new this week</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 mb-6">
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
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Live Orders</h2>
              <div className="flex gap-3">
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="px-4 py-2 font-bold text-sm">
                  All Orders
                </button>
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="px-4 py-2 font-bold text-sm">
                  Delivery
                </button>
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="px-4 py-2 font-bold text-sm">
                  Pickup
                </button>
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="px-4 py-2 font-bold text-sm">
                  Dine-in
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-xl font-black">{order.id}</span>
                        <span style={{
                          backgroundColor: order.status === 'Preparing' ? '#fbbf24' :
                                        order.status === 'Ready' ? '#22c55e' :
                                        order.status === 'Delivered' ? '#3b82f6' : '#9ca3af',
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
                      <div style={{ color: '#9b2226' }} className="text-2xl font-black mb-1">{order.total}</div>
                      <div style={{ color: '#999999' }} className="text-sm">{order.time}</div>
                    </div>
                  </div>
                  {order.status !== 'Completed' && (
                    <div className="flex gap-3 mt-4">
                      <button style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="flex-1 py-2 font-bold text-sm hover:opacity-90">
                        Update Status
                      </button>
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="flex-1 py-2 font-bold text-sm hover:opacity-90">
                        View Details
                      </button>
                      <button style={{ backgroundColor: '#ef4444', color: '#ffffff' }} className="px-6 py-2 font-bold text-sm hover:opacity-90">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Today's Reservations</h2>
              <button style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="px-6 py-3 font-bold hover:opacity-90">
                + New Reservation
              </button>
            </div>
            <div className="space-y-4">
              {todayReservations.map((res, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#9b2226' }} className="text-2xl font-black">{res.time}</span>
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
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                        Confirm
                      </button>
                      <button style={{ backgroundColor: '#6b7280', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Top Loyalty Members</h2>
            <div className="space-y-4">
              {loyaltyMembers.map((member, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-black">{member.name}</span>
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
                      <div style={{ color: '#9b2226' }} className="text-xl font-black">{member.points} pts</div>
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-8">Performance Analytics</h2>
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
                      <div style={{ color: '#9b2226' }} className="text-xl font-black">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ color: '#9b2226' }} className="text-xl font-bold mb-4">This Week Summary</h3>
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Total Orders</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">687</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Total Revenue</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">$31,245</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Average Order Value</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">$45.47</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Customer Satisfaction</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">4.8/5.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
}
