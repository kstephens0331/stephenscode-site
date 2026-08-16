'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import Modal from './Modal'
import {
  ACTIVITY_LABELS,
  SUPPLIER_DETAILS,
  formatCurrency,
  relativeTime,
  statusOf,
  type ActivityEntry,
  type ActivityType,
  type Product,
  type PurchaseOrder,
} from './data'
import { ArrowDownCircle, ArrowUpCircle, Pencil, ShoppingCart, SlidersHorizontal, Trash2 } from 'lucide-react'

interface ProductDetailModalProps {
  colors: ColorPalette
  product: Product
  activity: ActivityEntry[]
  orders: PurchaseOrder[]
  onClose: () => void
  onAdjust: (delta: number, type: ActivityType) => void
  onOrder: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ProductDetailModal({
  colors,
  product,
  activity,
  orders,
  onClose,
  onAdjust,
  onOrder,
  onEdit,
  onDelete,
}: ProductDetailModalProps) {
  const [qty, setQty] = useState('5')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const amount = Math.max(1, Math.round(Number(qty) || 0))
  const status = statusOf(product)
  const statusColor = status === 'Critical' ? colors.error : status === 'Low Stock' ? colors.warning : colors.success
  const supplier = SUPPLIER_DETAILS[product.supplier]
  const fillPercent = Math.min(100, Math.round((product.stock / Math.max(1, product.reorderPoint * 2)) * 100))
  const openOrders = orders.filter(o => o.status === 'Pending')

  const move = (delta: number, type: ActivityType) => {
    onAdjust(delta, type)
    setQty('5')
  }

  return (
    <Modal title={`${product.id} - ${product.name}`} colors={colors} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-sm font-semibold"
            style={{ backgroundColor: statusColor + '20', color: statusColor }}
          >
            {status}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
            {product.category}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
            {formatCurrency(product.price)} per unit
          </span>
        </div>

        <div>
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-sm font-semibold" style={{ color: colors.textLight }}>On hand</p>
              <p className="text-4xl font-bold" style={{ color: colors.text }}>{product.stock}</p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: colors.textLight }}>Reorder at {product.reorderPoint}</p>
              <p className="font-semibold" style={{ color: colors.primary }}>
                {formatCurrency(product.stock * product.price)} on shelf
              </p>
            </div>
          </div>
          <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
            <div className="h-3 rounded-full transition-all" style={{ width: `${fillPercent}%`, backgroundColor: statusColor }} />
          </div>
        </div>

        <div className="rounded-xl border p-4" style={{ borderColor: colors.border }}>
          <p className="font-bold mb-3" style={{ color: colors.text }}>Move stock</p>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="inv-detail-qty" className="text-sm font-semibold" style={{ color: colors.textLight }}>
              Quantity
            </label>
            <input
              id="inv-detail-qty"
              type="number"
              min={1}
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: colors.border }}
            />
            <button
              type="button"
              onClick={() => move(amount, 'received')}
              className="px-3 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: colors.success }}
            >
              <ArrowUpCircle className="w-4 h-4" /> Receive
            </button>
            <button
              type="button"
              onClick={() => move(-amount, 'sold')}
              className="px-3 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <ArrowDownCircle className="w-4 h-4" /> Record Sale
            </button>
            <button
              type="button"
              onClick={() => move(-amount, 'adjusted')}
              className="px-3 py-2 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <SlidersHorizontal className="w-4 h-4" /> Write Off
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl p-4" style={{ backgroundColor: colors.backgroundAlt }}>
            <p className="font-bold mb-2" style={{ color: colors.text }}>Supplier</p>
            <p className="font-semibold" style={{ color: colors.primary }}>{product.supplier}</p>
            {supplier && (
              <div className="mt-2 space-y-1 text-sm" style={{ color: colors.textLight }}>
                <p>{supplier.contact}</p>
                <p>{supplier.phone}</p>
                <p>Lead time {supplier.leadTime}, on time {supplier.onTimeRate}</p>
                <p>Terms {supplier.terms}</p>
              </div>
            )}
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: colors.backgroundAlt }}>
            <p className="font-bold mb-2" style={{ color: colors.text }}>Open purchase orders</p>
            {openOrders.length === 0 ? (
              <p className="text-sm" style={{ color: colors.textLight }}>No open orders for this item.</p>
            ) : (
              <ul className="space-y-2 text-sm" style={{ color: colors.textLight }}>
                {openOrders.map(order => (
                  <li key={order.id} className="flex justify-between">
                    <span className="font-mono">{order.id}</span>
                    <span>{order.quantity} units, {relativeTime(order.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <p className="font-bold mb-3" style={{ color: colors.text }}>Movement history</p>
          {activity.length === 0 ? (
            <p className="text-sm" style={{ color: colors.textLight }}>No movement logged for this item yet.</p>
          ) : (
            <ul className="space-y-2">
              {activity.slice(0, 6).map(item => (
                <li
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: colors.backgroundAlt }}
                >
                  <span className="font-semibold" style={{ color: colors.text }}>{ACTIVITY_LABELS[item.type]}</span>
                  <span style={{ color: item.quantity < 0 ? colors.error : colors.success }}>
                    {item.quantity > 0 ? '+' : ''}{item.quantity}
                  </span>
                  <span style={{ color: colors.textLight }}>{relativeTime(item.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2 border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={onOrder}
            className="px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2 mt-4"
            style={{ backgroundColor: colors.primary }}
          >
            <ShoppingCart className="w-4 h-4" /> Create Purchase Order
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors flex items-center gap-2 mt-4"
            style={{ borderColor: colors.border, color: colors.text }}
          >
            <Pencil className="w-4 h-4" /> Edit Item
          </button>
          {confirmDelete ? (
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.error }}
              >
                Confirm Remove
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.textLight }}
              >
                Keep Item
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-3 rounded-lg font-semibold border-2 hover:bg-red-50 transition-colors flex items-center gap-2 mt-4"
              style={{ borderColor: colors.error, color: colors.error }}
            >
              <Trash2 className="w-4 h-4" /> Remove Item
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
