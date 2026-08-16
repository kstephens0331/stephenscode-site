'use client'

import { useState, type FormEvent } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import Modal from './Modal'
import { CATEGORIES, SUPPLIERS, type Product } from './data'
import type { ProductDraft } from './useInventory'

interface ProductFormModalProps {
  colors: ColorPalette
  product?: Product | null
  onClose: () => void
  onSave: (draft: ProductDraft) => void
}

const inputClass = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2'

export default function ProductFormModal({ colors, product, onClose, onSave }: ProductFormModalProps) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    category: product?.category ?? CATEGORIES[0],
    stock: product ? String(product.stock) : '',
    reorderPoint: product ? String(product.reorderPoint) : '10',
    supplier: product?.supplier ?? SUPPLIERS[0],
    price: product ? String(product.price) : '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = form.name.trim()
    if (!name) {
      setError('Give the item a name so it can be tracked.')
      return
    }
    const stock = Math.max(0, Math.round(Number(form.stock) || 0))
    const reorderPoint = Math.max(0, Math.round(Number(form.reorderPoint) || 0))
    const price = Math.max(0, Number(form.price) || 0)
    onSave({ name, category: form.category, stock, reorderPoint, supplier: form.supplier, price })
  }

  return (
    <Modal title={product ? `Edit ${product.id}` : 'Add New Item'} colors={colors} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inv-item-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
            Item name
          </label>
          <input
            id="inv-item-name"
            type="text"
            value={form.name}
            onChange={e => { setForm({ ...form, name: e.target.value }); setError('') }}
            placeholder="Premium Widget B"
            className={inputClass}
            style={{ borderColor: colors.border }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="inv-item-category" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Category
            </label>
            <select
              id="inv-item-category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              style={{ borderColor: colors.border }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="inv-item-supplier" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Supplier
            </label>
            <select
              id="inv-item-supplier"
              value={form.supplier}
              onChange={e => setForm({ ...form, supplier: e.target.value })}
              className={inputClass}
              style={{ borderColor: colors.border }}
            >
              {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="inv-item-stock" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              On hand
            </label>
            <input
              id="inv-item-stock"
              type="number"
              min={0}
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              placeholder="0"
              className={inputClass}
              style={{ borderColor: colors.border }}
            />
          </div>
          <div>
            <label htmlFor="inv-item-reorder" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Reorder at
            </label>
            <input
              id="inv-item-reorder"
              type="number"
              min={0}
              value={form.reorderPoint}
              onChange={e => setForm({ ...form, reorderPoint: e.target.value })}
              className={inputClass}
              style={{ borderColor: colors.border }}
            />
          </div>
          <div>
            <label htmlFor="inv-item-price" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Unit price
            </label>
            <input
              id="inv-item-price"
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              className={inputClass}
              style={{ borderColor: colors.border }}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm font-semibold" style={{ color: colors.error }}>{error}</p>
        )}

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
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary }}
          >
            {product ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
