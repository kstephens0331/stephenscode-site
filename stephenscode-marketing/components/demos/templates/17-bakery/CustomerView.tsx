'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { DemoColors } from '@/lib/demo-colors'
import { ShoppingCart, User, Menu, X, Search, Cake, Heart, Phone, Mail, MapPin, Clock, ChevronRight, Star, ShoppingBag, Package, Truck, CreditCard, Calendar } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: DemoColors
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  customizations?: string[]
  image: string
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0))
  }

  const clearCart = () => setCart([])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'Custom Cakes', id: 'custom-cakes' },
    { name: 'Order Online', id: 'order' },
    { name: 'Catering', id: 'catering' },
    { name: 'Delivery', id: 'delivery' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  // Page Components
  const HomePage = () => (
    <div>
      <section className="relative bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
                Freshly Baked Daily
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sweet Dreams
                <span className="block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                  Come True
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Artisan breads, decadent cakes, and pastries made with love since 2010.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg">
                  Order Now
                </button>
                <button onClick={() => setCurrentPage('menu')} className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all">
                  View Menu
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" alt="Bakery" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { id: '1', name: 'Chocolate Cake', price: 45.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
              { id: '2', name: 'Fresh Croissants', price: 3.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
              { id: '3', name: 'Cupcake Box', price: 24.99, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400' },
              { id: '4', name: 'Artisan Bread', price: 5.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
            ].map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button onClick={() => addToCart(item)} className="absolute bottom-4 left-4 right-4 bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xl font-bold text-[var(--color-primary)]">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  const MenuPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Menu</h1>
        {['Cakes', 'Pastries', 'Breads', 'Cookies'].map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{category} Item {i}</h3>
                      <p className="text-sm text-gray-600">Delicious {category.toLowerCase()} made fresh daily</p>
                    </div>
                    <span className="text-xl font-bold text-[var(--color-primary)]">${(5 + i * 2).toFixed(2)}</span>
                  </div>
                  <button onClick={() => addToCart({ id: `${category}-${i}`, name: `${category} Item ${i}`, price: 5 + i * 2, image: '' })} className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const CustomCakesPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Cake Designer</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Your Cake</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Size</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                  <option>6" Round (Serves 8-10)</option>
                  <option>8" Round (Serves 12-16)</option>
                  <option>10" Round (Serves 20-24)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Flavor</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                  <option>Chocolate</option>
                  <option>Vanilla</option>
                  <option>Red Velvet</option>
                  <option>Lemon</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Frosting</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
                  <option>Buttercream</option>
                  <option>Cream Cheese</option>
                  <option>Fondant</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Message</label>
                <input type="text" placeholder="Happy Birthday!" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Add to Cart - $65.99
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
            <div className="bg-white rounded-lg p-8 aspect-square flex items-center justify-center">
              <Cake className="w-32 h-32 text-[var(--color-primary)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const OrderPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Order Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Chocolate Cake', price: 45.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
            { name: 'Croissants (6)', price: 18.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
            { name: 'Cupcake Box (12)', price: 36.99, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400' },
            { name: 'Sourdough Loaf', price: 7.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
            { name: 'Danish Pastries', price: 4.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
            { name: 'Brownies (6)', price: 16.99, image: 'https://images.unsplash.com/photo-1607920591413-4ec007814c59?w=400' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[var(--color-primary)]">${item.price}</span>
                  <button onClick={() => addToCart({ id: String(i), ...item })} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const CateringPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catering Services</h1>
        <p className="text-xl text-gray-600 mb-12">Perfect for any event, from corporate meetings to weddings</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Corporate Events', 'Weddings', 'Private Parties'].map(type => (
            <div key={type} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <Cake className="w-16 h-16 text-[var(--color-primary)] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-gray-600 mb-6">Custom packages available</p>
              <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Request Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const DeliveryPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Delivery & Pickup</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <Truck className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Same-day delivery available</li>
              <li>• Free delivery on orders over $50</li>
              <li>• Delivery radius: 15 miles</li>
              <li>• Schedule delivery up to 2 weeks in advance</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <Package className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pickup</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Order online, pickup in-store</li>
              <li>• Ready in as little as 2 hours</li>
              <li>• Curbside pickup available</li>
              <li>• No minimum order required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const CartPageContent = () => {
    if (cart.length === 0) {
      return (
        <div className="py-20 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => setCurrentPage('order')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-[var(--color-primary)] font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${(cartTotal + 5).toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AccountPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <User className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600">Manage your account details</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Package className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Orders</h3>
            <p className="text-gray-600">View order history</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Heart className="w-12 h-12 text-[var(--color-primary)] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Favorites</h3>
            <p className="text-gray-600">Your saved items</p>
          </div>
        </div>
      </div>
    </div>
  )

  const AboutPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Sweet Dreams Bakery</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800" alt="Bakery" className="rounded-2xl shadow-xl" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2010, Sweet Dreams Bakery has been serving the community with fresh, handcrafted baked goods made from the finest ingredients.
            </p>
            <p className="text-lg text-gray-600">
              Every morning, our skilled bakers arrive before dawn to ensure everything is baked fresh daily, from our artisan breads to our decadent desserts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const ContactPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) SWEET-01</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@sweetdreamsbakery.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-[var(--color-primary)] mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Mon-Sat: 7am-7pm<br />Sunday: 8am-5pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <textarea rows={4} placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"></textarea>
              <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'menu': return <MenuPage />
      case 'custom-cakes': return <CustomCakesPage />
      case 'order': return <OrderPage />
      case 'catering': return <CateringPage />
      case 'delivery': return <DeliveryPage />
      case 'cart': return <CartPageContent />
      case 'account': return <AccountPage />
      case 'about': return <AboutPage />
      case 'contact': return <ContactPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
              <Cake className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">Sweet Dreams</div>
                <div className="text-xs text-orange-200">Bakery & Café</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map(item => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('account')} className="p-2 hover:bg-white/10 rounded-lg">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentPage('cart')} className="relative p-2 hover:bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-[var(--color-primary)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              {navigation.map(item => (
                <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false) }} className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Cake className="w-8 h-8 mb-4" />
              <p className="text-gray-400">Fresh baked goods made with love since 2010</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Baker Street</p>
                <p>(555) SWEET-01</p>
                <p>hello@sweetdreamsbakery.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Sweet Dreams Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
