'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CareGuidesPage from './pages/CareGuidesPage'
import PlantQuizPage from './pages/PlantQuizPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import DeliveryPage from './pages/DeliveryPage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

interface CustomerViewProps {
  demo: Demo
  colors: any
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  difficulty: string
  light: string
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (plant: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === plant.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...plant, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} />
      case 'shop':
        return <ShopPage addToCart={addToCart} />
      case 'care-guides':
        return <CareGuidesPage />
      case 'plant-quiz':
        return <PlantQuizPage onNavigate={setCurrentPage} addToCart={addToCart} />
      case 'subscriptions':
        return <SubscriptionsPage addToCart={addToCart} />
      case 'delivery':
        return <DeliveryPage />
      case 'cart':
        return <CartPage
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      case 'account':
        return <AccountPage />
      case 'blog':
        return <BlogPage onNavigate={setCurrentPage} />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage onNavigate={setCurrentPage} addToCart={addToCart} />
    }
  }

  return (
    <Layout
      demo={demo}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      cartItemCount={totalItems}
    >
      {renderPage()}
    </Layout>
  )
}
