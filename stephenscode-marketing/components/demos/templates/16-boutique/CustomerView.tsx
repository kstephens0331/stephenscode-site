'use client'

import { useEffect, useRef, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CollectionsPage from './pages/CollectionsPage'
import NewArrivalsPage from './pages/NewArrivalsPage'
import SalePage from './pages/SalePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  sizes: string[]
  colors: string[]
}

const CART_KEY = 'boutique-demo-cart'
const WISHLIST_KEY = 'boutique-demo-wishlist'
const PROMO_KEY = 'boutique-demo-promo'

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY)
      if (storedCart) setCart(JSON.parse(storedCart))
      const storedWishlist = localStorage.getItem(WISHLIST_KEY)
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist))
      const storedPromo = localStorage.getItem(PROMO_KEY)
      if (storedPromo) setAppliedPromo(storedPromo)
    } catch {
      // Ignore malformed stored state -- start fresh
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
      // Storage unavailable -- cart still works in memory
    }
  }, [cart])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
    } catch {
      // Storage unavailable -- wishlist still works in memory
    }
  }, [wishlist])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_KEY, appliedPromo)
      } else {
        localStorage.removeItem(PROMO_KEY)
      }
    } catch {
      // Storage unavailable -- promo still works in memory
    }
  }, [appliedPromo])

  const navigate = (page: string) => {
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id && i.size === item.size && i.color === item.color)
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size && item.color === color)))
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    setAppliedPromo(null)
  }

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const renderPage = () => {
    const pageProps = { demo, colors, setCurrentPage: navigate, addToCart, addToWishlist, removeFromWishlist, wishlist }

    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />
      case 'shop':
        return <ShopPage {...pageProps} />
      case 'collections':
        return <CollectionsPage {...pageProps} />
      case 'new-arrivals':
        return <NewArrivalsPage {...pageProps} />
      case 'sale':
        return <SalePage {...pageProps} />
      case 'cart':
        return <CartPage {...pageProps} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} appliedPromo={appliedPromo} setAppliedPromo={setAppliedPromo} />
      case 'checkout':
        return <CheckoutPage {...pageProps} cart={cart} clearCart={clearCart} appliedPromo={appliedPromo} />
      case 'account':
        return <AccountPage wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} setCurrentPage={navigate} />
      case 'wishlist':
        return <AccountPage wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} setCurrentPage={navigate} initialTab="wishlist" />
      case 'about':
        return <AboutPage setCurrentPage={navigate} />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage {...pageProps} />
    }
  }

  return (
    <Layout
      demo={demo}
      currentPage={currentPage}
      onNavigate={navigate}
      cartItemCount={totalItems}
      wishlistCount={wishlist.length}
      addToCart={addToCart}
    >
      {renderPage()}
    </Layout>
  )
}
