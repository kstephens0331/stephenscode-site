'use client'

import { useState, type FormEvent } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import Modal from './Modal'
import { SUPPLIER_DETAILS, formatCurrency, suggestedOrderQty, type Product } from './data'

interface PurchaseOrderModalProps {
  colors: ColorPalette
  products: Product[]
  initialProductId?: string
  onClose: () => void
  onCreate: (productId: string, quantity: number) => void
}

const inputClass = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2'

export default function PurchaseOrderModal({
  colors,
  products,
  initialProductId,
  onClose,
  onCreate,
}: PurchaseOrderModalProps) {
  const first = products.find(p => p.id === initialProductId) || products[0]
  const [productId, setProductId] = useState(first ? first.id : '')
  const [quantity, setQuantity] = useState(first ? String(suggestedOrderQty(first)) : '10')

  const product = products.find(p => p.id === productId) || null
  const qty = Math.max(0, Math.round(Number(quantity) || 0))
  const supplierDetail = product ? SUPPLIER_DETAILS[product.supplier] : undefined

  const handleProductChange = (id: string) => {
    setProductId(id)
    const next = products.find(p => p.id === id)
    if (next) setQuantity(String(suggestedOrderQty(next)))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!product || qty <= 0) return
    onCreate(product.id, qty)
  }

  if (!product) {
    return (
      <Modal title="Create Purchase Order" colors={colors} onClose={onClose}>
        <p className="mb-6" style={{ color: colors.textLight }}>
          The catalog is empty. Add an item first, then raise a purchase order against it.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: colors.primary }}
        >
          Close
        </button>
      </Modal>
    )
  }

  return (
    <Modal title="Create Purchase Order" colors={colors} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inv-po-product" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
            Item
          </label>
          <select
            id="inv-po-product"
            value={productId}
            onChange={e => handleProductChange(e.target.value)}
            className={inputClass}
            style={{ borderColor: colors.border }}
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="inv-po-qty" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Quantity
            </label>
            <input
              id="inv-po-qty"
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className={inputClass}
              style={{ borderColor: colors.border }}
            />
            <button
              type="button"
              onClick={() => setQuantity(String(suggestedOrderQty(product)))}
              className="mt-2 text-sm font-semibold hover:underline"
              style={{ color: colors.primary }}
            >
              Use suggested ({suggestedOrderQty(product)})
            </button>
          </div>
          <div>
            <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Supplier</span>
            <div className="px-4 py-2.5 rounded-lg border" style={{ borderColor: colors.border, color: colors.text }}>
              {product.supplier}
            </div>
            {supplierDetail && (
              <p className="mt-2 text-sm" style={{ color: colors.textLight }}>
                Lead time {supplierDetail.leadTime}, {supplierDetail.terms}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl p-4 space-y-1" style={{ backgroundColor: colors.backgroundAlt }}>
          <div className="flex justify-between text-sm" style={{ color: colors.textLight }}>
            <span>On hand now</span>
            <span>{product.stock}</span>
          </div>
          <div className="flex justify-between text-sm" style={{ color: colors.textLight }}>
            <span>On hand after receiving</span>
            <span>{product.stock + qty}</span>
          </div>
          <div className="flex justify-between font-bold pt-1" style={{ color: colors.text }}>
            <span>Order cost</span>
            <span style={{ color: colors.primary }}>{formatCurrency(qty * product.price)}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
            style={{ borderColor: colors.border, color: colors.textLight }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={qty <= 0}
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: colors.primary }}
          >
            Raise Order
          </button>
        </div>
      </form>
    </Modal>
  )
}
