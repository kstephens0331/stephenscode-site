'use client'

import { useEffect, useState } from 'react'
import {
  ACTIVITY_LABELS,
  defaultState,
  loadState,
  nextPoId,
  nextSku,
  saveState,
  statusOf,
  suggestedOrderQty,
  type ActivityEntry,
  type ActivityType,
  type InventoryState,
  type Product,
  type PurchaseOrder,
} from './data'

export type ProductDraft = Omit<Product, 'id'>

function entry(type: ActivityType, item: string, quantity: number): ActivityEntry {
  return {
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    item,
    quantity,
    timestamp: Date.now(),
  }
}

/**
 * Single source of truth for the inventory demo. Both the operations view and
 * the admin view mount this hook, so a purchase order raised in one view is
 * there when the visitor flips to the other (shared localStorage key).
 */
export function useInventory() {
  const [state, setState] = useState<InventoryState>(() => defaultState())
  const [hydrated, setHydrated] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const stored = loadState()
    if (stored) setState(stored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveState(state)
  }, [state, hydrated])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const addProduct = (draft: ProductDraft): Product => {
    const product: Product = { ...draft, id: nextSku(state.products) }
    const logged = entry('added', product.name, product.stock)
    setState(prev => ({
      ...prev,
      products: [...prev.products, product],
      activity: [logged, ...prev.activity],
    }))
    setToast(`${product.name} added as ${product.id}`)
    return product
  }

  const updateProduct = (id: string, patch: Partial<ProductDraft>) => {
    const existing = state.products.find(p => p.id === id)
    if (!existing) return
    const stockDelta = typeof patch.stock === 'number' ? patch.stock - existing.stock : 0
    const logged = stockDelta !== 0 ? entry('adjusted', existing.name, stockDelta) : null
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, ...patch } : p)),
      activity: logged ? [logged, ...prev.activity] : prev.activity,
    }))
    setToast(`${patch.name || existing.name} updated`)
  }

  const deleteProduct = (id: string) => {
    const existing = state.products.find(p => p.id === id)
    if (!existing) return
    const logged = entry('removed', existing.name, -existing.stock)
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id),
      purchaseOrders: prev.purchaseOrders.filter(po => po.productId !== id || po.status === 'Received'),
      activity: [logged, ...prev.activity],
    }))
    setToast(`${existing.name} removed from catalog`)
  }

  const adjustStock = (id: string, delta: number, type: ActivityType) => {
    const existing = state.products.find(p => p.id === id)
    if (!existing || delta === 0) return
    const applied = Math.max(-existing.stock, delta)
    const logged = entry(type, existing.name, applied)
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, stock: Math.max(0, p.stock + applied) } : p)),
      activity: [logged, ...prev.activity],
    }))
    const verb = ACTIVITY_LABELS[type]
    setToast(`${verb}: ${existing.name} ${applied > 0 ? '+' : ''}${applied}`)
  }

  const createPurchaseOrder = (productId: string, quantity: number): PurchaseOrder | null => {
    const product = state.products.find(p => p.id === productId)
    if (!product || quantity <= 0) return null
    const order: PurchaseOrder = {
      id: nextPoId(state.purchaseOrders),
      productId: product.id,
      productName: product.name,
      supplier: product.supplier,
      quantity,
      status: 'Pending',
      createdAt: Date.now(),
    }
    const logged = entry('ordered', product.name, quantity)
    setState(prev => ({
      ...prev,
      purchaseOrders: [order, ...prev.purchaseOrders],
      activity: [logged, ...prev.activity],
    }))
    setToast(`${order.id} raised with ${order.supplier}`)
    return order
  }

  /** Bulk purchasing action used by the supplier panel in the admin view. */
  const reorderLowStockFor = (supplier: string): number => {
    const lowItems = state.products.filter(p => p.supplier === supplier && statusOf(p) !== 'In Stock')
    if (lowItems.length === 0) {
      setToast(`No items below reorder point for ${supplier}`)
      return 0
    }
    const created: PurchaseOrder[] = []
    const logs: ActivityEntry[] = []
    for (const product of lowItems) {
      const quantity = suggestedOrderQty(product)
      created.push({
        id: nextPoId([...state.purchaseOrders, ...created]),
        productId: product.id,
        productName: product.name,
        supplier: product.supplier,
        quantity,
        status: 'Pending',
        createdAt: Date.now(),
      })
      logs.push(entry('ordered', product.name, quantity))
    }
    setState(prev => ({
      ...prev,
      purchaseOrders: [...created, ...prev.purchaseOrders],
      activity: [...logs, ...prev.activity],
    }))
    setToast(`${created.length} purchase order${created.length === 1 ? '' : 's'} raised with ${supplier}`)
    return created.length
  }

  const receivePurchaseOrder = (poId: string) => {
    const order = state.purchaseOrders.find(po => po.id === poId)
    if (!order || order.status === 'Received') return
    const logged = entry('received', order.productName, order.quantity)
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === order.productId ? { ...p, stock: p.stock + order.quantity } : p)),
      purchaseOrders: prev.purchaseOrders.map(po => (po.id === poId ? { ...po, status: 'Received' as const } : po)),
      activity: [logged, ...prev.activity],
    }))
    setToast(`${order.id} received, ${order.productName} +${order.quantity}`)
  }

  const cancelPurchaseOrder = (poId: string) => {
    const order = state.purchaseOrders.find(po => po.id === poId)
    if (!order || order.status === 'Received') return
    const logged = entry('removed', `${order.id} ${order.productName}`, 0)
    setState(prev => ({
      ...prev,
      purchaseOrders: prev.purchaseOrders.filter(po => po.id !== poId),
      activity: [logged, ...prev.activity],
    }))
    setToast(`${order.id} cancelled`)
  }

  const resetDemo = () => {
    setState(defaultState())
    setToast('Demo data reset to the starting catalog')
  }

  return {
    state,
    hydrated,
    toast,
    setToast,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    createPurchaseOrder,
    reorderLowStockFor,
    receivePurchaseOrder,
    cancelPurchaseOrder,
    resetDemo,
  }
}

export type InventoryApi = ReturnType<typeof useInventory>
