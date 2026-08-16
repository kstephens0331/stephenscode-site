export type ActivityType = 'received' | 'sold' | 'adjusted' | 'ordered' | 'added' | 'removed'

export interface Product {
  id: string
  name: string
  category: string
  stock: number
  reorderPoint: number
  supplier: string
  price: number
}

export interface ActivityEntry {
  id: string
  type: ActivityType
  item: string
  quantity: number
  timestamp: number
}

export interface PurchaseOrder {
  id: string
  productId: string
  productName: string
  supplier: string
  quantity: number
  status: 'Pending' | 'Received'
  createdAt: number
}

export interface InventoryState {
  products: Product[]
  activity: ActivityEntry[]
  purchaseOrders: PurchaseOrder[]
}

export const CATEGORIES = ['Electronics', 'Hardware', 'Accessories', 'Supplies']
export const SUPPLIERS = ['TechCorp', 'PartsPlus', 'GlobalSupply', 'BulkGoods']

// Target shelf capacity per category, used for the overview utilization bars.
export const CATEGORY_CAPACITY: Record<string, number> = {
  Electronics: 60,
  Hardware: 40,
  Accessories: 120,
  Supplies: 40,
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  received: 'Received',
  sold: 'Sold',
  adjusted: 'Adjusted',
  ordered: 'Ordered',
  added: 'New Item',
  removed: 'Removed',
}

export interface SupplierDetail {
  contact: string
  email: string
  phone: string
  leadTime: string
  onTimeRate: string
  terms: string
}

export const SUPPLIER_DETAILS: Record<string, SupplierDetail> = {
  TechCorp: {
    contact: 'Dana Reeves',
    email: 'orders@techcorp.example',
    phone: '(555) 201-4477',
    leadTime: '5-7 days',
    onTimeRate: '96%',
    terms: 'Net 30',
  },
  PartsPlus: {
    contact: 'Miguel Ortiz',
    email: 'sales@partsplus.example',
    phone: '(555) 301-8820',
    leadTime: '3-5 days',
    onTimeRate: '92%',
    terms: 'Net 15',
  },
  GlobalSupply: {
    contact: 'Priya Nair',
    email: 'support@globalsupply.example',
    phone: '(555) 442-1109',
    leadTime: '10-14 days',
    onTimeRate: '89%',
    terms: 'Net 45',
  },
  BulkGoods: {
    contact: 'Sam Whitaker',
    email: 'hello@bulkgoods.example',
    phone: '(555) 610-3355',
    leadTime: '7-10 days',
    onTimeRate: '94%',
    terms: 'Net 30',
  },
}

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

export function defaultState(): InventoryState {
  const now = Date.now()
  return {
    products: [
      { id: 'SKU-001', name: 'Premium Widget A', category: 'Electronics', stock: 45, reorderPoint: 20, supplier: 'TechCorp', price: 125 },
      { id: 'SKU-002', name: 'Standard Component B', category: 'Hardware', stock: 12, reorderPoint: 15, supplier: 'PartsPlus', price: 45.5 },
      { id: 'SKU-003', name: 'Deluxe Product C', category: 'Accessories', stock: 89, reorderPoint: 30, supplier: 'GlobalSupply', price: 78 },
      { id: 'SKU-004', name: 'Essential Item D', category: 'Supplies', stock: 5, reorderPoint: 25, supplier: 'BulkGoods', price: 32 },
    ],
    activity: [
      { id: 'act-seed-1', type: 'received', item: 'Premium Widget A', quantity: 50, timestamp: now - 2 * HOUR },
      { id: 'act-seed-2', type: 'sold', item: 'Standard Component B', quantity: -15, timestamp: now - 5 * HOUR },
      { id: 'act-seed-3', type: 'adjusted', item: 'Deluxe Product C', quantity: -3, timestamp: now - DAY },
      { id: 'act-seed-4', type: 'ordered', item: 'Essential Item D', quantity: 100, timestamp: now - 2 * DAY },
    ],
    purchaseOrders: [
      { id: 'PO-1001', productId: 'SKU-004', productName: 'Essential Item D', supplier: 'BulkGoods', quantity: 100, status: 'Pending', createdAt: now - 2 * DAY },
    ],
  }
}

export const STORAGE_KEY = 'demo-39-inventory-v1'

export function loadState(): InventoryState | null {
  try {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as InventoryState
    if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.activity) || !Array.isArray(parsed.purchaseOrders)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: InventoryState): void {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable (private mode, quota) -- demo keeps working in memory.
  }
}

export type StockStatus = 'In Stock' | 'Low Stock' | 'Critical'

export function statusOf(product: Product): StockStatus {
  if (product.stock <= Math.ceil(product.reorderPoint / 2)) return 'Critical'
  if (product.stock <= product.reorderPoint) return 'Low Stock'
  return 'In Stock'
}

// Suggested reorder quantity: enough to reach roughly double the reorder point,
// rounded up to the nearest 5 so the numbers read like a real purchasing rule.
export function suggestedOrderQty(product: Product): number {
  const target = product.reorderPoint * 2
  const gap = Math.max(target - product.stock, product.reorderPoint)
  return Math.max(5, Math.ceil(gap / 5) * 5)
}

export function stockValue(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.stock * p.price, 0)
}

export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return days === 1 ? '1 day ago' : `${days} days ago`
}

export function formatCurrency(amount: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount)
}

export function nextSku(products: Product[]): string {
  let max = 0
  for (const p of products) {
    const match = /^SKU-(\d+)$/.exec(p.id)
    if (match) max = Math.max(max, parseInt(match[1], 10))
  }
  return `SKU-${String(max + 1).padStart(3, '0')}`
}

export function nextPoId(orders: PurchaseOrder[]): string {
  let max = 1000
  for (const o of orders) {
    const match = /^PO-(\d+)$/.exec(o.id)
    if (match) max = Math.max(max, parseInt(match[1], 10))
  }
  return `PO-${max + 1}`
}

export function downloadCsv(filename: string, rows: (string | number)[][]): void {
  if (typeof window === 'undefined') return
  const csv = rows
    .map(row =>
      row
        .map(cell => {
          const s = String(cell)
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
        })
        .join(',')
    )
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
