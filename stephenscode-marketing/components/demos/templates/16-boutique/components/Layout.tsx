'use client'

import { ReactNode } from 'react'
import type { Demo } from '@/lib/demos-data'
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown, Check, Truck, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { allProducts } from '../data/products'

interface LayoutProps {
  demo: Demo
  currentPage: string
  onNavigate: (page: string) => void
  cartItemCount: number
  wishlistCount: number
  addToCart: (item: { id: string; name: string; price: number; image: string; size: string; color: string }) => void
  children: ReactNode
}

export default function Layout({ demo, currentPage, onNavigate, cartItemCount, wishlistCount, addToCart, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [addedFromSearch, setAddedFromSearch] = useState<string | null>(null)
  const [policyModal, setPolicyModal] = useState<'shipping' | 'returns' | null>(null)

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

  const searchResults = searchQuery.trim().length > 0
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ).slice(0, 6)
    : []

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
    setAddedFromSearch(null)
  }

  const handleSearchAddToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId)
    if (!product) return
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: product.sizes[0], color: product.colors[0] })
    setAddedFromSearch(productId)
  }

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
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={() => onNavigate('account')}
                aria-label="My account"
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 'account' ? 'bg-purple-100 text-[var(--color-primary)]' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('wishlist')}
                aria-label="Wishlist"
                className={`relative p-2 rounded-lg transition-colors ${
                  currentPage === 'wishlist' ? 'bg-purple-100 text-[var(--color-primary)]' : 'hover:bg-gray-100 text-gray-700'
                }`}
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
                aria-label="Shopping cart"
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
                aria-label="Toggle menu"
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

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4">
          <button
            aria-label="Close search"
            onClick={closeSearch}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                autoFocus
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dresses, tops, shoes, accessories..."
                className="flex-1 text-lg focus:outline-none text-gray-900"
              />
              <button onClick={closeSearch} aria-label="Close search" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery.trim().length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="font-semibold mb-1">Start typing to search our collection</p>
                  <p className="text-sm">Try &quot;dress&quot;, &quot;boots&quot;, or &quot;accessories&quot;</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="font-semibold mb-1">No matches for &quot;{searchQuery}&quot;</p>
                  <button
                    onClick={() => { closeSearch(); onNavigate('shop') }}
                    className="mt-3 text-[var(--color-primary)] font-semibold hover:underline"
                  >
                    Browse all products
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-purple-50 transition-colors">
                      <button
                        onClick={() => { closeSearch(); onNavigate('shop') }}
                        className="flex items-center gap-4 flex-1 text-left"
                      >
                        <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                      </button>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 mb-1">${product.price}</p>
                        {addedFromSearch === product.id ? (
                          <span className="inline-flex items-center text-green-600 text-sm font-semibold">
                            <Check className="w-4 h-4 mr-1" /> Added
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSearchAddToCart(product.id)}
                            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Policy Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            aria-label="Close policy"
            onClick={() => setPolicyModal(null)}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPolicyModal(null)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            {policyModal === 'shipping' ? (
              <div>
                <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Information</h2>
                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Standard (3-5 business days)</span>
                    <span>$5.95</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Express (1-2 business days)</span>
                    <span>$14.95</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-900">Orders over $100</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <p>Orders placed before 2:00 PM EST ship the same business day. You will receive a tracking number by email as soon as your order leaves our studio.</p>
                  <p>We ship to all 50 US states plus over 50 countries worldwide. International duties and taxes are calculated at checkout.</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <RotateCcw className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns &amp; Exchanges</h2>
                <div className="space-y-4 text-gray-600">
                  <p><span className="font-semibold text-gray-900">30-day returns.</span> Unworn items with original tags attached can be returned for a full refund within 30 days of delivery.</p>
                  <p><span className="font-semibold text-gray-900">Free return shipping.</span> Every order includes a prepaid return label -- just repack, stick, and drop off.</p>
                  <p><span className="font-semibold text-gray-900">Fast refunds.</span> Refunds are issued to your original payment method within 3-5 business days of us receiving your return.</p>
                  <p><span className="font-semibold text-gray-900">Exchanges.</span> Need a different size or color? Start an exchange from your account and we will ship the new item as soon as your return scans.</p>
                  <p className="text-sm">Final sale items and gift cards are not eligible for return.</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setPolicyModal(null)}
              className="mt-6 w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}

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
                <li><button onClick={() => setPolicyModal('shipping')} className="text-gray-400 hover:text-white transition-colors">Shipping Info</button></li>
                <li><button onClick={() => setPolicyModal('returns')} className="text-gray-400 hover:text-white transition-colors">Returns</button></li>
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
