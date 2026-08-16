export interface PlacedOrderItem {
  name: string
  quantity: number
  price: number
}

export interface PlacedOrder {
  id: string
  customer: string
  email: string
  date: string
  type: 'delivery' | 'pickup'
  items: PlacedOrderItem[]
  total: number
  status: string
}

export const CART_KEY = 'sweet-dreams-bakery-cart'
export const FAVORITES_KEY = 'sweet-dreams-bakery-favorites'
export const ORDERS_KEY = 'sweet-dreams-bakery-orders'
export const PROFILE_KEY = 'sweet-dreams-bakery-profile'
export const SEED_STATUS_KEY = 'sweet-dreams-bakery-seed-status'

export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private browsing) -- demo still works in memory
  }
}
