'use client'

import { useState, useEffect } from 'react'
import type { Demo } from '@/lib/demos-data'

interface RestaurantDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

interface Order {
  id: string
  items: { menuItem: MenuItem; quantity: number }[]
  total: number
  customerName: string
  customerEmail: string
  customerPhone: string
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  orderType: 'delivery' | 'pickup' | 'dinein'
  timestamp: string
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with lemon butter sauce', price: 24.99, category: 'Entrees' },
  { id: '2', name: 'Filet Mignon', description: '8oz premium beef with garlic mashed potatoes', price: 34.99, category: 'Entrees' },
  { id: '3', name: 'Chicken Alfredo', description: 'Creamy fettuccine with grilled chicken', price: 18.99, category: 'Entrees' },
  { id: '4', name: 'Caesar Salad', description: 'Romaine lettuce, parmesan, croutons', price: 9.99, category: 'Appetizers' },
  { id: '5', name: 'Garlic Bread', description: 'Toasted with butter and herbs', price: 6.99, category: 'Appetizers' },
  { id: '6', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with vanilla ice cream', price: 8.99, category: 'Desserts' },
  { id: '7', name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99, category: 'Desserts' },
]

export default function RestaurantDemo({ demo, viewMode }: RestaurantDemoProps) {
  const [cart, setCart] = useState<{ menuItem: MenuItem; quantity: number }[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'cart' | 'checkout' | 'reservations'>('home')
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'delivery' as 'delivery' | 'pickup' | 'dinein'
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`demo_${demo.id}`)
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.data.cart) setCart(parsed.data.cart)
      if (parsed.data.orders) setOrders(parsed.data.orders)
    }
  }, [demo.id])

  // Save to localStorage
  useEffect(() => {
    const demoKey = `demo_${demo.id}`
    const currentData = JSON.parse(localStorage.getItem(demoKey) || '{}')
    localStorage.setItem(demoKey, JSON.stringify({
      ...currentData,
      data: { cart, orders }
    }))
  }, [cart, orders, demo.id])

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.menuItem.id === item.id)
    if (existing) {
      setCart(cart.map(c =>
        c.menuItem.id === item.id
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ))
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(c => c.menuItem.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map(c =>
        c.menuItem.id === itemId ? { ...c, quantity } : c
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0)

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total: cartTotal,
      customerName: checkoutForm.name,
      customerEmail: checkoutForm.email,
      customerPhone: checkoutForm.phone,
      status: 'pending',
      orderType: checkoutForm.orderType,
      timestamp: new Date().toISOString()
    }
    setOrders([...orders, newOrder])
    setCart([])
    setOrderPlaced(true)
    setCurrentPage('home')
    setTimeout(() => setOrderPlaced(false), 5000)
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o))
  }

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, ${demo.colors.primary}, ${demo.colors.secondary})` }}>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage orders, reservations, and menu items</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-blue-600 text-3xl mb-2">📊</div>
                <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-green-600 text-3xl mb-2">💰</div>
                <div className="text-3xl font-bold text-gray-900">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="text-orange-600 text-3xl mb-2">⏳</div>
                <div className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending' || o.status === 'preparing').length}</div>
                <div className="text-sm text-gray-600">Active Orders</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-purple-600 text-3xl mb-2">🍽️</div>
                <div className="text-3xl font-bold text-gray-900">{menuItems.length}</div>
                <div className="text-sm text-gray-600">Menu Items</div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="text-5xl mb-4">🍽️</div>
                  <p className="text-gray-600">No orders yet. Try placing an order in Customer View!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order #</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">#{order.id.slice(-6)}</td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            <div>{order.customerName}</div>
                            <div className="text-xs text-gray-500">{order.customerPhone}</div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {order.items.map((item, idx) => (
                              <div key={idx}>{item.quantity}x {item.menuItem.name}</div>
                            ))}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.orderType === 'delivery' ? 'bg-blue-100 text-blue-700' :
                              order.orderType === 'pickup' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {order.orderType}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'preparing' ? 'bg-orange-100 text-orange-700' :
                              order.status === 'ready' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Menu Management */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${item.price}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Customer View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <header className="relative h-96" style={{ background: `linear-gradient(135deg, ${demo.colors.primary}, ${demo.colors.secondary})` }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{demo.name}</h1>
          <p className="text-xl md:text-2xl mb-8">Fine Dining in the Heart of Houston</p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('menu')}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Order Online
            </button>
            <button
              onClick={() => setCurrentPage('reservations')}
              className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Make Reservation
            </button>
          </div>
        </div>
        {cart.length > 0 && (
          <button
            onClick={() => setCurrentPage('cart')}
            className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors"
          >
            🛒 Cart ({cart.length})
          </button>
        )}
      </header>

      {/* Success Message */}
      {orderPlaced && (
        <div className="bg-green-500 text-white px-4 py-4 text-center font-bold">
          ✅ Order placed successfully! Check the Admin Dashboard to see it.
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 py-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-semibold ${currentPage === 'home' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className={`font-semibold ${currentPage === 'menu' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Menu & Order
            </button>
            <button
              onClick={() => setCurrentPage('reservations')}
              className={`font-semibold ${currentPage === 'reservations' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Reservations
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {currentPage === 'home' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Gourmet Kitchen</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience fine dining with fresh ingredients and exceptional service.  Order online for delivery or pickup.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fine Dining</h3>
                <p className="text-gray-600">Premium ingredients, expertly prepared by our award-winning chefs.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery & Pickup</h3>
                <p className="text-gray-600">Order online for convenient delivery or quick pickup.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Private Events</h3>
                <p className="text-gray-600">Book our private dining room for your special occasions.</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'menu' && (
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Menu</h2>
            {['Appetizers', 'Entrees', 'Desserts'].map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.filter(item => item.category === category).map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="text-2xl font-bold" style={{ color: demo.colors.primary }}>${item.price}</p>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="ml-4 px-4 py-2 rounded-lg font-semibold text-white transition-colors"
                        style={{ backgroundColor: demo.colors.accent }}
                      >
                        Add +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentPage === 'cart' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h2>
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-6 py-3 rounded-lg font-semibold text-white"
                  style={{ backgroundColor: demo.colors.primary }}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  {cart.map(item => (
                    <div key={item.menuItem.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.menuItem.name}</h4>
                        <p className="text-gray-600">${item.menuItem.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-gray-900 w-20 text-right">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold" style={{ color: demo.colors.primary }}>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('checkout')}
                  className="w-full py-4 rounded-lg font-bold text-white text-lg"
                  style={{ backgroundColor: demo.colors.accent }}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        )}

        {currentPage === 'checkout' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={placeOrder} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Type</label>
                  <select
                    value={checkoutForm.orderType}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, orderType: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  >
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                    <option value="dinein">Dine In</option>
                  </select>
                </div>
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold" style={{ color: demo.colors.primary }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-bold text-white text-lg"
                    style={{ backgroundColor: demo.colors.accent }}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentPage === 'reservations' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Make a Reservation</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input type="date" required className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                    <input type="time" required className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Party Size</label>
                    <select required className="w-full border border-gray-300 rounded-lg px-4 py-3">
                      <option>1 person</option>
                      <option>2 people</option>
                      <option>3 people</option>
                      <option>4 people</option>
                      <option>5+ people</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-white text-lg"
                  style={{ backgroundColor: demo.colors.accent }}
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Reservation submitted! (This is a demo - no actual reservation was made)')
                  }}
                >
                  Reserve Table
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
