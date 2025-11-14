'use client'

import { ReactNode } from 'react'
import type { Demo } from '@/lib/demos-data'
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  demo: Demo
  currentPage: string
  onNavigate: (page: string) => void
  cartItemCount: number
  wishlistCount: number
  children: ReactNode
}

export default function Layout({ demo, currentPage, onNavigate, cartItemCount, wishlistCount, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)

  const navigation = [
    { name: 'Home', id: 'home' },
    {
      name: 'Shop',
      id: 'shop',
      submenu: [
        { name: 'All Products', id: 'shop' },
        { name: 'Collections', id: 'collections' },
        { name: 'New Arrivals', id: 'new-arrivals' },
        { name: 'Sale', id: 'sale' },
      ]
    },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      {/* Top Banner */}
      <div className="bg-[var(--color-primary)] text-white text-center py-2 text-sm">
        <p>Free Shipping on Orders Over $100 | Use Code: FREESHIP</p>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="text-3xl font-serif italic bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Bella
              </div>
              <div className="text-sm text-gray-600 tracking-wider">BOUTIQUE</div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.id} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center space-x-1 py-2 transition-colors ${
                          currentPage === item.id || item.submenu.some(sub => sub.id === currentPage)
                            ? 'text-[var(--color-primary)] font-semibold'
                            : 'text-gray-700 hover:text-[var(--color-primary)]'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-2 min-w-[200px]">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                onNavigate(subItem.id)
                                setMobileMenuOpen(false)
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                currentPage === subItem.id
                                  ? 'bg-purple-50 text-[var(--color-primary)] font-semibold'
                                  : 'text-gray-700 hover:bg-purple-50 hover:text-[var(--color-primary)]'
                              }`}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`py-2 transition-colors ${
                        currentPage === item.id
                          ? 'text-[var(--color-primary)] font-semibold'
                          : 'text-gray-700 hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={() => onNavigate('account')}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 'account' ? 'bg-purple-100 text-[var(--color-primary)]' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('wishlist')}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('cart')}
                className={`relative p-2 rounded-lg transition-colors ${
                  currentPage === 'cart' ? 'bg-purple-100 text-[var(--color-primary)]' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (!item.submenu) {
                          onNavigate(item.id)
                          setMobileMenuOpen(false)
                        } else {
                          setShopDropdownOpen(!shopDropdownOpen)
                        }
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                        currentPage === item.id
                          ? 'bg-purple-100 text-[var(--color-primary)] font-semibold'
                          : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.submenu && <ChevronDown className={`w-4 h-4 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />}
                    </button>
                    {item.submenu && shopDropdownOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onNavigate(subItem.id)
                              setMobileMenuOpen(false)
                            }}
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${
                              currentPage === subItem.id
                                ? 'bg-purple-100 text-[var(--color-primary)] font-semibold'
                                : 'text-gray-600 hover:bg-purple-50'
                            }`}
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-serif italic mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bella
              </div>
              <p className="text-gray-400 text-sm">
                Your destination for timeless elegance and contemporary fashion.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('shop')} className="text-gray-400 hover:text-white transition-colors">All Products</button></li>
                <li><button onClick={() => onNavigate('new-arrivals')} className="text-gray-400 hover:text-white transition-colors">New Arrivals</button></li>
                <li><button onClick={() => onNavigate('collections')} className="text-gray-400 hover:text-white transition-colors">Collections</button></li>
                <li><button onClick={() => onNavigate('sale')} className="text-gray-400 hover:text-white transition-colors">Sale</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => onNavigate('account')} className="text-gray-400 hover:text-white transition-colors">My Account</button></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:hello@bellaboutique.com" className="text-gray-400 hover:text-white transition-colors">hello@bellaboutique.com</a></li>
                <li><a href="tel:555-BELLA-01" className="text-gray-400 hover:text-white transition-colors">(555) BELLA-01</a></li>
                <li className="text-gray-400">Mon-Fri: 9am-6pm EST</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Bella Boutique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
