'use client'

import { useState } from 'react'
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut } from 'lucide-react'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders')

  const orders = [
    { id: '#BB12847', date: '2024-11-10', status: 'Delivered', total: 289.97, items: 3 },
    { id: '#BB12756', date: '2024-11-03', status: 'In Transit', total: 156.00, items: 2 },
    { id: '#BB12654', date: '2024-10-28', status: 'Delivered', total: 423.50, items: 5 },
  ]

  const savedAddresses = [
    { id: 1, label: 'Home', name: 'Sarah Johnson', address: '123 Fashion Ave, New York, NY 10001', isDefault: true },
    { id: 2, label: 'Work', name: 'Sarah Johnson', address: '456 Style Street, New York, NY 10002', isDefault: false },
  ]

  const savedCards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false },
  ]

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">VIP Member</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-[var(--color-primary)] font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-6">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[var(--color-primary)] transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xl font-bold text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-gray-600">{order.items} items</p>
                            <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                            <button className="flex-1 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                              View Details
                            </button>
                            {order.status === 'Delivered' && (
                              <button className="px-6 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Your wishlist is empty</p>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border-2 border-gray-200 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-gray-900 mb-1">{address.label}</p>
                              {address.isDefault && (
                                <span className="inline-block bg-purple-100 text-[var(--color-primary)] text-xs px-2 py-1 rounded-full font-semibold">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-900 mb-1">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <div className="mt-4 flex gap-3">
                            <button className="text-[var(--color-primary)] font-semibold hover:underline">Edit</button>
                            <button className="text-red-600 font-semibold hover:underline">Remove</button>
                            {!address.isDefault && (
                              <button className="text-gray-600 font-semibold hover:underline">Set as Default</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="bg-white rounded-xl shadow-md">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                    <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                      Add Card
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {savedCards.map((card) => (
                        <div key={card.id} className="border-2 border-gray-200 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-gray-900 mb-1">{card.type} •••• {card.last4}</p>
                              <p className="text-sm text-gray-600">Expires {card.expiry}</p>
                              {card.isDefault && (
                                <span className="inline-block bg-purple-100 text-[var(--color-primary)] text-xs px-2 py-1 rounded-full font-semibold mt-2">
                                  Default
                                </span>
                              )}
                            </div>
                            <CreditCard className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="mt-4 flex gap-3">
                            <button className="text-[var(--color-primary)] font-semibold hover:underline">Edit</button>
                            <button className="text-red-600 font-semibold hover:underline">Remove</button>
                            {!card.isDefault && (
                              <button className="text-gray-600 font-semibold hover:underline">Set as Default</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input type="email" defaultValue="sarah.johnson@email.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input type="tel" defaultValue="(555) 123-4567" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Newsletter</label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-[var(--color-primary)]" />
                        <span className="text-gray-700">Receive email updates about new arrivals and exclusive offers</span>
                      </label>
                    </div>
                    <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
