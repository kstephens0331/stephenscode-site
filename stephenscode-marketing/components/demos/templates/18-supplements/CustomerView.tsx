'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { ShoppingCart, User, Menu, X, Search, Dumbbell, Heart, Phone, Mail, MapPin, Star, Package, Truck, Calendar, TrendingUp, Award, Users as UsersIcon, CheckCircle } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  subscription?: boolean
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
    { name: 'Shop', id: 'shop' },
    { name: 'Categories', id: 'categories' },
    { name: 'Subscriptions', id: 'subscriptions' },
    { name: 'Bundles', id: 'bundles' },
    { name: 'Nutrition Guides', id: 'guides' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ]

  // Page Components
  const HomePage = () => (
    <div>
      <section className="relative bg-gradient-to-r from-cyan-900 via-teal-800 to-cyan-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Science-Backed Performance
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Fuel Your
                <span className="block text-cyan-300">Peak Performance</span>
              </h1>
              <p className="text-xl text-cyan-100 mb-8">
                Premium supplements designed for serious athletes and fitness enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('shop')} className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-all shadow-lg">
                  Shop Now
                </button>
                <button onClick={() => setCurrentPage('subscriptions')} className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all">
                  Subscribe & Save
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800" alt="Supplements" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: '1', name: 'Whey Protein Isolate', price: 49.99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400', rating: 4.9 },
              { id: '2', name: 'Pre-Workout Ignite', price: 39.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400', rating: 4.8 },
              { id: '3', name: 'BCAA Recovery', price: 34.99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400', rating: 4.7 },
              { id: '4', name: 'Creatine Monohydrate', price: 29.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400', rating: 5.0 },
            ].map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {product.rating}
                  </div>
                  <button onClick={() => addToCart(product)} className="absolute bottom-4 left-4 right-4 bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-[var(--color-primary)]">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lab Tested</h3>
              <p className="text-gray-600">Third-party verified for purity and potency</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $75</p>
            </div>
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">60-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const ShopPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }, (_, i) => ({
            id: String(i + 1),
            name: ['Protein Powder', 'Pre-Workout', 'BCAA', 'Creatine', 'Multivitamin', 'Fish Oil'][i % 6],
            price: 29.99 + i * 5,
            image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400',
            rating: 4.5 + (i % 5) * 0.1,
          })).map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[var(--color-primary)]">${product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product)} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
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

  const CategoriesPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Protein', count: 24, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600' },
            { name: 'Pre-Workout', count: 18, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600' },
            { name: 'Recovery', count: 15, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600' },
            { name: 'Vitamins', count: 32, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600' },
            { name: 'Weight Management', count: 21, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600' },
            { name: 'Performance', count: 19, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600' },
          ].map(cat => (
            <button key={cat.name} onClick={() => setCurrentPage('shop')} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-white/90">{cat.count} products</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const SubscriptionsPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Subscribe & Save</h1>
          <p className="text-xl text-gray-600">Get your favorite supplements delivered automatically and save up to 20%</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Monthly', 'Bi-Weekly', 'Weekly'].map((freq, i) => (
            <div key={freq} className="bg-white rounded-xl shadow-md p-8 hover:shadow-2xl transition-all">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{freq}</h3>
                <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">{10 + i * 5}% OFF</p>
                <p className="text-gray-600">Save on every order</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free shipping
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Cancel anytime
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Skip or modify deliveries
                </li>
              </ul>
              <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const BundlesPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Performance Bundles</h1>
        <p className="text-xl text-gray-600 mb-12">Complete nutrition packages designed for your goals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Muscle Builder Stack', products: ['Whey Protein', 'Creatine', 'BCAA'], price: 99.99, save: 25 },
            { name: 'Weight Loss Bundle', products: ['Protein', 'Fat Burner', 'CLA'], price: 89.99, save: 30 },
            { name: 'Performance Pack', products: ['Pre-Workout', 'Protein', 'Recovery'], price: 119.99, save: 20 },
            { name: 'Essential Wellness', products: ['Multivitamin', 'Fish Oil', 'Vitamin D'], price: 59.99, save: 15 },
          ].map(bundle => (
            <div key={bundle.name} className="bg-white rounded-xl shadow-md p-8 hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{bundle.name}</h3>
                  <p className="text-green-600 font-semibold">Save ${bundle.save}</p>
                </div>
                <Package className="w-12 h-12 text-[var(--color-primary)]" />
              </div>
              <ul className="space-y-2 mb-6">
                {bundle.products.map(prod => (
                  <li key={prod} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {prod}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t pt-6">
                <span className="text-3xl font-bold text-[var(--color-primary)]">${bundle.price}</span>
                <button onClick={() => addToCart({ id: bundle.name, name: bundle.name, price: bundle.price, image: '' })} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                  Add Bundle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const GuidesPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nutrition & Training Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            'Beginner\'s Guide to Supplements',
            'Muscle Building Nutrition',
            'Pre & Post Workout Nutrition',
            'Understanding Protein Timing',
            'Fat Loss Strategies',
            'Recovery & Sleep Optimization',
          ].map(guide => (
            <div key={guide} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{guide}</h3>
              <p className="text-gray-600 mb-6">Expert advice and science-backed recommendations</p>
              <button className="text-[var(--color-primary)] font-semibold hover:underline">Read More →</button>
            </div>
          ))}
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
          <button onClick={() => setCurrentPage('shop')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90">
            Start Shopping
          </button>
        </div>
      )
    }

    const shipping = cartTotal > 75 ? 0 : 8.99
    const total = cartTotal + shipping

    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-[var(--color-primary)] font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded border hover:bg-gray-100">-</button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded border hover:bg-gray-100">+</button>
                  </div>
                  <div className="text-right font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {cartTotal < 75 && (
                  <p className="text-sm text-cyan-600">Add ${(75 - cartTotal).toFixed(2)} for free shipping!</p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)]">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 mb-3">
                Checkout
              </button>
              <button onClick={() => setCurrentPage('shop')} className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200">
                Continue Shopping
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: User, title: 'Profile', desc: 'Manage account details' },
            { icon: Package, title: 'Orders', desc: 'View order history' },
            { icon: Calendar, title: 'Subscriptions', desc: 'Manage subscriptions' },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all">
                <Icon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const ReviewsPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Customer Reviews</h1>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Amazing Results!</h3>
              <p className="text-gray-600 mb-4">
                "I've been using Peak Performance supplements for 6 months and the results are incredible. Quality products, great taste, and excellent customer service."
              </p>
              <p className="text-sm text-gray-500">- Customer {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const ContactPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <MapPin className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">123 Fitness Blvd, Performance City, PC 12345</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Phone className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">(555) PEAK-FIT</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Mail className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@peakperformance.com</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" />
              <textarea rows={5} placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"></textarea>
              <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90">
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
      case 'shop': return <ShopPage />
      case 'categories': return <CategoriesPage />
      case 'subscriptions': return <SubscriptionsPage />
      case 'bundles': return <BundlesPage />
      case 'guides': return <GuidesPage />
      case 'cart': return <CartPageContent />
      case 'account': return <AccountPage />
      case 'reviews': return <ReviewsPage />
      case 'contact': return <ContactPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
              <Dumbbell className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">Peak Performance</div>
                <div className="text-xs text-cyan-200">Premium Supplements</div>
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
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
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
              <Dumbbell className="w-8 h-8 mb-4" />
              <p className="text-gray-400">Science-backed supplements for peak performance</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <div className="space-y-2 text-gray-400">
                {navigation.slice(0, 4).map(item => (
                  <button key={item.id} onClick={() => setCurrentPage(item.id)} className="block hover:text-white">{item.name}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>123 Fitness Blvd</p>
                <p>(555) PEAK-FIT</p>
                <p>support@peakperformance.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Peak Performance Supplements. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
