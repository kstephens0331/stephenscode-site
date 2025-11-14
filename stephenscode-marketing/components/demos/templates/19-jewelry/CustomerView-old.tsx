'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CollectionsPage from './pages/CollectionsPage'
import CustomDesignPage from './pages/CustomDesignPage'
import GiftRegistryPage from './pages/GiftRegistryPage'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: any
}

export interface JewelryProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  metal: string
  stone?: string
  description: string
  inStock: boolean
}

export interface CartItem extends JewelryProduct {
  quantity: number
  size?: string
  engraving?: string
}

export interface WishlistItem extends JewelryProduct {
  dateAdded: string
}

export interface Registry {
  id: string
  eventName: string
  eventDate: string
  couple: string
  items: JewelryProduct[]
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [registry, setRegistry] = useState<Registry | null>(null)

  const addToCart = (product: JewelryProduct, options?: { size?: string; engraving?: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.id === product.id &&
        item.size === options?.size &&
        item.engraving === options?.engraving
      )
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id &&
          item.size === options?.size &&
          item.engraving === options?.engraving
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, {
        ...product,
        quantity: 1,
        size: options?.size,
        engraving: options?.engraving
      }]
    })
  }

  const removeFromCart = (id: string, size?: string, engraving?: string) => {
    setCart(prevCart => prevCart.filter(item =>
      !(item.id === id && item.size === size && item.engraving === engraving)
    ))
  }

  const updateQuantity = (id: string, quantity: number, size?: string, engraving?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size, engraving)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size && item.engraving === engraving
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (product: JewelryProduct) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id)
      if (exists) return prevWishlist
      return [...prevWishlist, { ...product, dateAdded: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id))
  }

  const createRegistry = (registryData: Registry) => {
    setRegistry(registryData)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} addToWishlist={addToWishlist} />
      case 'shop':
        return <ShopPage addToCart={addToCart} addToWishlist={addToWishlist} />
      case 'collections':
        return <CollectionsPage onNavigate={setCurrentPage} addToCart={addToCart} addToWishlist={addToWishlist} />
      case 'custom-design':
        return <CustomDesignPage />
      case 'gift-registry':
        return <GiftRegistryPage registry={registry} createRegistry={createRegistry} />
      case 'wishlist':
        return <WishlistPage
          wishlist={wishlist}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
        />
      case 'cart':
        return <CartPage
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onNavigate={setCurrentPage}
        />
      case 'checkout':
        return <CheckoutPage cart={cart} clearCart={clearCart} onNavigate={setCurrentPage} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} addToWishlist={addToWishlist} />
    }
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      cartItemCount={totalItems}
      wishlistItemCount={wishlist.length}
    >
      {renderPage()}
    </Layout>
  )
}
