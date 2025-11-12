'use client'

import { useState, useEffect } from 'react'
import type { Demo } from '@/lib/demos-data'

interface ECommerceDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

interface Product {
  id: string
  name: string
  price: number
  category: string
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Product 1', price: 29.99, category: 'Category A' },
  { id: '2', name: 'Product 2', price: 39.99, category: 'Category A' },
  { id: '3', name: 'Product 3', price: 49.99, category: 'Category B' },
  { id: '4', name: 'Product 4', price: 19.99, category: 'Category B' },
]

export default function ECommerceDemo({ demo, viewMode }: ECommerceDemoProps) {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(`demo_${demo.id}`)
    if (saved) {
      const data = JSON.parse(saved)
      if (data.data.cart) setCart(data.data.cart)
      if (data.data.orders) setOrders(data.data.orders)
    }
  }, [demo.id])

  useEffect(() => {
    localStorage.setItem(`demo_${demo.id}`, JSON.stringify({ data: { cart, orders } }))
  }, [cart, orders, demo.id])

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-8">E-Commerce Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl mb-2">🛍️</div>
                <div className="text-3xl font-bold">{orders.length}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-4xl mb-2">💵</div>
                <div className="text-3xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-4xl mb-2">📦</div>
                <div className="text-3xl font-bold">{sampleProducts.length}</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No orders yet. Add items to cart in Customer View and checkout!</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">Order #{order.id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
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

  const addToCart = (product: Product) => {
    const existing = cart.find(c => c.product.id === product.id)
    if (existing) {
      setCart(cart.map(c => c.product.id === product.id ? { ...c, quantity: c.quantity + 1 } : c))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const checkout = () => {
    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total: cartTotal,
      customerName: 'Demo Customer',
      timestamp: new Date().toISOString()
    }
    setOrders([...orders, newOrder])
    setCart([])
    alert('Order placed! Check the Admin Dashboard to see it.')
  }

  return (
    <div className="min-h-screen">
      <header className="text-white py-16 text-center" style={{ backgroundColor: demo.colors.primary }}>
        <h1 className="text-5xl font-bold mb-4">{demo.name}</h1>
        <p className="text-xl">Shop Our Collection</p>
      </header>

      <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">Shop</div>
          <div className="font-semibold"style={{ color: demo.colors.accent }}>
            🛒 Cart ({cart.length}) - ${cartTotal.toFixed(2)}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {sampleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 flex items-center justify-center text-6xl" style={{ backgroundColor: demo.colors.secondary + '40' }}>
                🎁
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold" style={{ color: demo.colors.primary }}>${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 rounded-lg text-white font-semibold"
                    style={{ backgroundColor: demo.colors.accent }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-4 border-b">
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-6 mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold" style={{ color: demo.colors.primary }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={checkout}
              className="w-full py-4 rounded-lg text-white font-bold text-lg"
              style={{ backgroundColor: demo.colors.accent }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
