'use client'

import type { Demo } from '@/lib/demos-data'
import { Leaf, ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  demo: Demo
  currentPage: string
  onNavigate: (page: string) => void
  cartItemCount: number
  children: React.ReactNode
}

export default function Layout({ demo, currentPage, onNavigate, cartItemCount, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Plants' },
    { id: 'care-guides', label: 'Care Guides' },
    { id: 'plant-quiz', label: 'Plant Quiz' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => {
                onNavigate('home')
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">Urban Jungle</span>
                <p className="text-xs text-[var(--color-secondary)]">Plant Shop</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => onNavigate('account')}
                className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => onNavigate('cart')}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('account')
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  currentPage === 'account'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Account
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--color-primary)] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-xl font-bold">Urban Jungle</span>
              </div>
              <p className="text-green-100 text-sm">
                Bringing nature into your home, one plant at a time.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">All Plants</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Easy Care</button></li>
                <li><button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">Low Light</button></li>
                <li><button onClick={() => onNavigate('subscriptions')} className="hover:text-white transition-colors">Subscriptions</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li><button onClick={() => onNavigate('care-guides')} className="hover:text-white transition-colors">Care Guides</button></li>
                <li><button onClick={() => onNavigate('plant-quiz')} className="hover:text-white transition-colors">Plant Quiz</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => onNavigate('delivery')} className="hover:text-white transition-colors">Delivery Info</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>support@urbanjungle.com</li>
                <li>(555) 123-4567</li>
                <li>Mon-Fri: 9am-6pm</li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Form</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-600 mt-8 pt-8 text-center text-sm text-green-100">
            <p>&copy; 2024 Urban Jungle Plant Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
