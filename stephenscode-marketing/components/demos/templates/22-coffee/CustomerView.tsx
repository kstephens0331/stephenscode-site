'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { DemoColors } from '@/lib/demo-colors'
import { ShoppingCart, User, Menu, X, Search, Coffee, Package, BookOpen, Users, Phone, FileText } from 'lucide-react'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import WholesalePage from './pages/WholesalePage'
import BrewingGuidesPage from './pages/BrewingGuidesPage'
import OurStoryPage from './pages/OurStoryPage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: DemoColors
}

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  grindType: string
  image: string
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.grindType === item.grindType)
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.grindType === item.grindType
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateCartItem = (id: string, grindType: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => !(i.id === id && i.grindType === grindType)))
    } else {
      setCartItems(prev => prev.map(i =>
        i.id === id && i.grindType === grindType ? { ...i, quantity } : i
      ))
    }
  }

  const removeFromCart = (id: string, grindType: string) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.grindType === grindType)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const navigation = [
    { name: 'Home', id: 'home', icon: Coffee },
    { name: 'Shop Coffee', id: 'shop', icon: ShoppingCart },
    { name: 'Subscriptions', id: 'subscriptions', icon: Package },
    { name: 'Wholesale', id: 'wholesale', icon: Users },
    { name: 'Brewing Guides', id: 'guides', icon: BookOpen },
    { name: 'Our Story', id: 'story', icon: FileText },
    { name: 'Blog', id: 'blog', icon: FileText },
    { name: 'Contact', id: 'contact', icon: Phone },
  ]

  const renderPage = () => {
    const pageProps = { demo, colors, setCurrentPage, addToCart }

    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />
      case 'shop':
        return <ShopPage {...pageProps} />
      case 'subscriptions':
        return <SubscriptionsPage {...pageProps} />
      case 'wholesale':
        return <WholesalePage {...pageProps} />
      case 'guides':
        return <BrewingGuidesPage {...pageProps} />
      case 'story':
        return <OurStoryPage {...pageProps} />
      case 'cart':
        return <CartPage demo={demo} colors={colors} setCurrentPage={setCurrentPage} cartItems={cartItems} updateCartItem={updateCartItem} removeFromCart={removeFromCart} clearCart={clearCart} />
      case 'account':
        return <AccountPage {...pageProps} />
      case 'blog':
        return <BlogPage {...pageProps} />
      case 'contact':
        return <ContactPage {...pageProps} />
      default:
        return <HomePage {...pageProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-white p-2 rounded-lg">
                <Coffee className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <div className="text-2xl font-bold">Roasted Perfection</div>
                <div className="text-xs text-amber-200">Artisan Coffee Roasters</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-amber-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentPage('account')}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 'account' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentPage('cart')}
                className={`relative p-2 rounded-lg transition-colors ${
                  currentPage === 'cart' ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        currentPage === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-amber-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-primary)] text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Coffee className="w-6 h-6" />
                <span className="font-bold text-lg">Roasted Perfection</span>
              </div>
              <p className="text-amber-200 text-sm">
                Sourcing and roasting the world's finest coffee beans since 2015.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('shop')} className="text-amber-200 hover:text-white transition-colors">All Coffee</button></li>
                <li><button onClick={() => setCurrentPage('subscriptions')} className="text-amber-200 hover:text-white transition-colors">Subscriptions</button></li>
                <li><button onClick={() => setCurrentPage('wholesale')} className="text-amber-200 hover:text-white transition-colors">Wholesale</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('guides')} className="text-amber-200 hover:text-white transition-colors">Brewing Guides</button></li>
                <li><button onClick={() => setCurrentPage('blog')} className="text-amber-200 hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => setCurrentPage('story')} className="text-amber-200 hover:text-white transition-colors">Our Story</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage('contact')} className="text-amber-200 hover:text-white transition-colors">Contact Us</button></li>
                <li><a href="mailto:hello@roastedperfection.com" className="text-amber-200 hover:text-white transition-colors">hello@roastedperfection.com</a></li>
                <li><a href="tel:555-COFFEE-1" className="text-amber-200 hover:text-white transition-colors">(555) COFFEE-1</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-amber-200">
            <p>&copy; 2024 Roasted Perfection Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
