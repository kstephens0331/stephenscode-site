'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { TrendingUp, Package, Users, Settings, Download, Plus, RotateCcw, Trash2, Pencil } from 'lucide-react'
import { useInventory } from './useInventory'
import Modal from './Modal'
import Toast from './Toast'
import ProductFormModal from './ProductFormModal'
import PurchaseOrderModal from './PurchaseOrderModal'
import {
  ACTIVITY_LABELS,
  SUPPLIERS,
  SUPPLIER_DETAILS,
  downloadCsv,
  formatCurrency,
  relativeTime,
  statusOf,
  stockValue,
  suggestedOrderQty,
  type Product,
} from './data'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type ReportKey = 'valuation' | 'movement' | 'lowstock'

interface ReportView {
  title: string
  summary: string
  headers: string[]
  rows: (string | number)[][]
  file: string
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const inv = useInventory()
  const { products, activity, purchaseOrders } = inv.state

  const [supplierModal, setSupplierModal] = useState<string | null>(null)
  const [reportKey, setReportKey] = useState<ReportKey | null>(null)
  const [showAddItem, setShowAddItem] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [showPoModal, setShowPoModal] = useState(false)
  const [poProductId, setPoProductId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [reorderDrafts, setReorderDrafts] = useState<Record<string, string>>({})

  const pendingOrders = purchaseOrders.filter(po => po.status === 'Pending')
  const lowStock = products.filter(p => statusOf(p) !== 'In Stock')

  const buildReport = (key: ReportKey): ReportView => {
    if (key === 'valuation') {
      const rows = [...products]
        .sort((a, b) => b.stock * b.price - a.stock * a.price)
        .map(p => [p.id, p.name, p.category, p.stock, p.price.toFixed(2), (p.stock * p.price).toFixed(2)])
      return {
        title: 'Inventory Valuation',
        summary: `${products.length} SKUs, ${formatCurrency(stockValue(products))} on the shelf right now.`,
        headers: ['SKU', 'Item', 'Category', 'On Hand', 'Unit Price', 'Stock Value'],
        rows,
        file: 'inventory-valuation.csv',
      }
    }

    if (key === 'movement') {
      const rows = activity
        .slice(0, 40)
        .map(a => [
          new Date(a.timestamp).toLocaleString('en-US'),
          ACTIVITY_LABELS[a.type],
          a.item,
          a.quantity > 0 ? `+${a.quantity}` : String(a.quantity),
        ])
      const received = activity.filter(a => a.type === 'received').reduce((s, a) => s + a.quantity, 0)
      const sold = activity.filter(a => a.type === 'sold').reduce((s, a) => s + Math.abs(a.quantity), 0)
      return {
        title: 'Stock Movement Report',
        summary: `${received} units received and ${sold} units sold across ${activity.length} logged movements.`,
        headers: ['When', 'Type', 'Item', 'Quantity'],
        rows,
        file: 'stock-movement.csv',
      }
    }

    const rows = lowStock.map(p => [
      p.id,
      p.name,
      p.stock,
      p.reorderPoint,
      p.supplier,
      suggestedOrderQty(p),
      (suggestedOrderQty(p) * p.price).toFixed(2),
    ])
    const restockCost = lowStock.reduce((sum, p) => sum + suggestedOrderQty(p) * p.price, 0)
    return {
      title: 'Low Stock Analysis',
      summary:
        lowStock.length === 0
          ? 'Every SKU is above its reorder point.'
          : `${lowStock.length} SKU${lowStock.length === 1 ? '' : 's'} below reorder point, ${formatCurrency(restockCost)} to restock.`,
      headers: ['SKU', 'Item', 'On Hand', 'Reorder Point', 'Supplier', 'Suggested Order', 'Est. Cost'],
      rows,
      file: 'low-stock-analysis.csv',
    }
  }

  const report = reportKey ? buildReport(reportKey) : null

  const supplierProducts = supplierModal ? products.filter(p => p.supplier === supplierModal) : []
  const supplierOrders = supplierModal ? purchaseOrders.filter(po => po.supplier === supplierModal) : []
  const supplierDetail = supplierModal ? SUPPLIER_DETAILS[supplierModal] : undefined

  // Close any other overlay first so the order form is never stacked behind one.
  const openPurchaseOrder = (productId?: string) => {
    setSupplierModal(null)
    setReportKey(null)
    setPoProductId(productId ?? null)
    setShowPoModal(true)
  }

  const saveReorderPoint = (product: Product) => {
    const raw = reorderDrafts[product.id]
    if (raw === undefined) return
    const value = Math.max(0, Math.round(Number(raw) || 0))
    inv.updateProduct(product.id, { reorderPoint: value })
    setReorderDrafts(prev => {
      const next = { ...prev }
      delete next[product.id]
      return next
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Inventory Administration</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Configure suppliers and reporting</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={inv.resetDemo}
                className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.textLight }}
              >
                <RotateCcw className="w-4 h-4" /> Reset Demo Data
              </button>
              <button
                type="button"
                onClick={() => openPurchaseOrder()}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" /> New Purchase Order
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Summary strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: 'Catalog value',
              value: formatCurrency(stockValue(products), 0),
              note: `${products.length} SKUs`,
              onSelect: () => setReportKey('valuation'),
            },
            {
              label: 'Below reorder point',
              value: String(lowStock.length),
              note: lowStock.length ? 'action needed' : 'all clear',
              onSelect: () => setReportKey('lowstock'),
            },
            {
              label: 'Open purchase orders',
              value: String(pendingOrders.length),
              note: `${pendingOrders.reduce((s, o) => s + o.quantity, 0)} units inbound`,
              onSelect: () => {
                const panel = document.getElementById('inv-admin-orders')
                if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
              },
            },
          ].map(card => (
            <button
              key={card.label}
              type="button"
              onClick={card.onSelect}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
            >
              <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{card.label}</p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>{card.value}</p>
              <p className="text-sm mt-1" style={{ color: colors.textLight }}>{card.note}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Supplier Management</h2>
            <div className="space-y-4">
              {SUPPLIERS.map(supplier => {
                const supplied = products.filter(p => p.supplier === supplier)
                const low = supplied.filter(p => statusOf(p) !== 'In Stock').length
                return (
                  <div key={supplier} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" style={{ color: colors.primary }} />
                        <div>
                          <span className="font-semibold block" style={{ color: colors.text }}>{supplier}</span>
                          <span className="text-sm" style={{ color: low > 0 ? colors.warning : colors.textLight }}>
                            {supplied.length} SKU{supplied.length === 1 ? '' : 's'}
                            {low > 0 ? `, ${low} below reorder point` : ', all above reorder point'}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSupplierModal(supplier)}
                        className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
                        style={{ color: colors.primary }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Stock Reports</h2>
            <div className="space-y-4">
              {([
                { key: 'valuation' as ReportKey, name: 'Inventory Valuation', icon: TrendingUp },
                { key: 'movement' as ReportKey, name: 'Stock Movement Report', icon: Package },
                { key: 'lowstock' as ReportKey, name: 'Low Stock Analysis', icon: Settings },
              ]).map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setReportKey(item.key)}
                    className="w-full p-4 rounded-lg border-2 hover:shadow-md transition-all text-left flex items-center gap-3"
                    style={{ borderColor: colors.border }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className="font-semibold" style={{ color: colors.text }}>{item.name}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-sm mt-4" style={{ color: colors.textLight }}>
              Every report is built from the live demo data and downloads as CSV.
            </p>
          </div>
        </div>

        {/* Purchase orders */}
        <div id="inv-admin-orders" className="bg-white rounded-xl shadow-lg p-6 scroll-mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Purchase Orders</h2>
            <button
              type="button"
              onClick={() => {
                downloadCsv('purchase-orders.csv', [
                  ['Order', 'Item', 'Supplier', 'Quantity', 'Status', 'Raised'],
                  ...purchaseOrders.map(po => [
                    po.id,
                    po.productName,
                    po.supplier,
                    po.quantity,
                    po.status,
                    new Date(po.createdAt).toLocaleString('en-US'),
                  ]),
                ])
                inv.setToast(`Exported ${purchaseOrders.length} purchase orders`)
              }}
              className="px-3 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>

          {purchaseOrders.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-semibold mb-4" style={{ color: colors.text }}>No purchase orders on file.</p>
              <button
                type="button"
                onClick={() => openPurchaseOrder()}
                className="px-4 py-2 rounded-lg font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Raise the first order
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: colors.border }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Order</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Item</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Supplier</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Qty</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Raised</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Status</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map(order => (
                    <tr key={order.id} className="border-b" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4 font-mono text-sm" style={{ color: colors.textLight }}>{order.id}</td>
                      <td className="py-4 px-4 font-semibold" style={{ color: colors.text }}>{order.productName}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{order.supplier}</td>
                      <td className="py-4 px-4 text-right font-bold" style={{ color: colors.text }}>{order.quantity}</td>
                      <td className="py-4 px-4 text-sm" style={{ color: colors.textLight }}>{relativeTime(order.createdAt)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {order.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => inv.receivePurchaseOrder(order.id)}
                              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: colors.success }}
                            >
                              Receive
                            </button>
                            <button
                              type="button"
                              onClick={() => inv.cancelPurchaseOrder(order.id)}
                              className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-red-50 transition-colors"
                              style={{ borderColor: colors.error, color: colors.error }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <p className="text-right text-sm font-semibold" style={{ color: colors.success }}>Stock added</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Catalog settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Catalog and Reorder Rules</h2>
            <button
              type="button"
              onClick={() => setShowAddItem(true)}
              className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-4 h-4" /> Add Catalog Item
            </button>
          </div>
          <p className="text-sm mb-6" style={{ color: colors.textLight }}>
            Change a reorder point and save it to move that item in and out of the low stock alerts.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: colors.border }}>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>SKU</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Item</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Supplier</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>On Hand</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Reorder At</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const draft = reorderDrafts[product.id]
                  const dirty = draft !== undefined && Number(draft) !== product.reorderPoint
                  return (
                    <tr key={product.id} className="border-b" style={{ borderColor: colors.border }}>
                      <td className="py-4 px-4 font-mono text-sm" style={{ color: colors.textLight }}>{product.id}</td>
                      <td className="py-4 px-4 font-semibold" style={{ color: colors.text }}>{product.name}</td>
                      <td className="py-4 px-4" style={{ color: colors.textLight }}>{product.supplier}</td>
                      <td className="py-4 px-4 text-right font-bold" style={{ color: colors.text }}>{product.stock}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            aria-label={`Reorder point for ${product.name}`}
                            value={draft ?? String(product.reorderPoint)}
                            onChange={e => setReorderDrafts(prev => ({ ...prev, [product.id]: e.target.value }))}
                            className="w-20 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ borderColor: colors.border }}
                          />
                          <button
                            type="button"
                            onClick={() => saveReorderPoint(product)}
                            disabled={!dirty}
                            className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: colors.secondary }}
                          >
                            Save
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openPurchaseOrder(product.id)}
                            className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-gray-50 transition-colors"
                            style={{ borderColor: colors.border, color: colors.primary }}
                          >
                            Order
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditProduct(product)}
                            aria-label={`Edit ${product.name}`}
                            className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-gray-50 transition-colors flex items-center gap-1"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </button>
                          {confirmDelete === product.id ? (
                            <>
                              <button
                                type="button"
                                onClick={() => { inv.deleteProduct(product.id); setConfirmDelete(null) }}
                                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                                style={{ backgroundColor: colors.error }}
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2"
                                style={{ borderColor: colors.border, color: colors.textLight }}
                              >
                                Keep
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-red-50 transition-colors flex items-center gap-1"
                              style={{ borderColor: colors.error, color: colors.error }}
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="py-10 text-center">
              <p className="font-semibold mb-4" style={{ color: colors.text }}>The catalog is empty.</p>
              <button
                type="button"
                onClick={() => setShowAddItem(true)}
                className="px-4 py-2 rounded-lg font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Add the first item
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-center" style={{ color: colors.textLight }}>
          This admin view and the operations view share the same demo data, so anything changed here shows up there.
          Built for {demo.name} as part of {demo.package}.
        </p>
      </div>

      {/* Supplier detail */}
      {supplierModal && (
        <Modal title={supplierModal} colors={colors} onClose={() => setSupplierModal(null)} maxWidth="max-w-2xl">
          <div className="space-y-6">
            {supplierDetail && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="font-bold mb-2" style={{ color: colors.text }}>Account contact</p>
                  <p style={{ color: colors.textLight }}>{supplierDetail.contact}</p>
                  <a href={`mailto:${supplierDetail.email}`} className="block font-semibold hover:underline" style={{ color: colors.primary }}>
                    {supplierDetail.email}
                  </a>
                  <a href={`tel:${supplierDetail.phone.replace(/[^\d]/g, '')}`} className="block font-semibold hover:underline" style={{ color: colors.primary }}>
                    {supplierDetail.phone}
                  </a>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="font-bold mb-2" style={{ color: colors.text }}>Terms</p>
                  <p style={{ color: colors.textLight }}>Lead time {supplierDetail.leadTime}</p>
                  <p style={{ color: colors.textLight }}>On time delivery {supplierDetail.onTimeRate}</p>
                  <p style={{ color: colors.textLight }}>Payment {supplierDetail.terms}</p>
                </div>
              </div>
            )}

            <div>
              <p className="font-bold mb-3" style={{ color: colors.text }}>Items supplied</p>
              {supplierProducts.length === 0 ? (
                <p className="text-sm" style={{ color: colors.textLight }}>No catalog items are assigned to this supplier.</p>
              ) : (
                <div className="space-y-2">
                  {supplierProducts.map(p => {
                    const status = statusOf(p)
                    const statusColor = status === 'Critical' ? colors.error : status === 'Low Stock' ? colors.warning : colors.success
                    return (
                      <div
                        key={p.id}
                        className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border"
                        style={{ borderColor: colors.border }}
                      >
                        <div>
                          <p className="font-semibold" style={{ color: colors.text }}>{p.name}</p>
                          <p className="text-sm" style={{ color: colors.textLight }}>
                            {p.id}, {p.stock} on hand, reorder at {p.reorderPoint}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: statusColor + '20', color: statusColor }}>
                            {status}
                          </span>
                          <button
                            type="button"
                            onClick={() => openPurchaseOrder(p.id)}
                            className="px-3 py-1.5 rounded-lg text-sm font-semibold border-2 hover:bg-gray-50 transition-colors"
                            style={{ borderColor: colors.border, color: colors.primary }}
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div>
              <p className="font-bold mb-3" style={{ color: colors.text }}>Purchase orders with this supplier</p>
              {supplierOrders.length === 0 ? (
                <p className="text-sm" style={{ color: colors.textLight }}>Nothing raised with this supplier yet.</p>
              ) : (
                <div className="space-y-2">
                  {supplierOrders.map(order => (
                    <div
                      key={order.id}
                      className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border"
                      style={{ borderColor: colors.border }}
                    >
                      <div>
                        <p className="font-mono text-sm" style={{ color: colors.textLight }}>{order.id}</p>
                        <p className="font-semibold" style={{ color: colors.text }}>
                          {order.productName}, {order.quantity} units
                        </p>
                      </div>
                      {order.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => inv.receivePurchaseOrder(order.id)}
                          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: colors.success }}
                        >
                          Receive
                        </button>
                      ) : (
                        <span className="text-sm font-semibold" style={{ color: colors.success }}>Received</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => inv.reorderLowStockFor(supplierModal)}
              className="w-full px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              Reorder every low stock item from {supplierModal}
            </button>
          </div>
        </Modal>
      )}

      {/* Report viewer */}
      {report && (
        <Modal title={report.title} colors={colors} onClose={() => setReportKey(null)} maxWidth="max-w-3xl">
          <div className="space-y-5">
            <p className="font-semibold" style={{ color: colors.text }}>{report.summary}</p>

            {report.rows.length === 0 ? (
              <p className="text-sm" style={{ color: colors.textLight }}>There is nothing to report on yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: colors.border }}>
                      {report.headers.map(header => (
                        <th key={header} className="text-left py-2 px-3 font-semibold" style={{ color: colors.text }}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b" style={{ borderColor: colors.border }}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-2 px-3" style={{ color: cellIndex === 0 ? colors.textLight : colors.text }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  downloadCsv(report.file, [report.headers, ...report.rows])
                  inv.setToast(`${report.title} downloaded`)
                }}
                className="flex-1 px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" /> Download CSV
              </button>
              <button
                type="button"
                onClick={() => setReportKey(null)}
                className="flex-1 px-4 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.textLight }}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showAddItem && (
        <ProductFormModal
          colors={colors}
          onClose={() => setShowAddItem(false)}
          onSave={draft => { inv.addProduct(draft); setShowAddItem(false) }}
        />
      )}

      {editProduct && (
        <ProductFormModal
          colors={colors}
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={draft => { inv.updateProduct(editProduct.id, draft); setEditProduct(null) }}
        />
      )}

      {showPoModal && (
        <PurchaseOrderModal
          colors={colors}
          products={products}
          initialProductId={poProductId ?? undefined}
          onClose={() => { setShowPoModal(false); setPoProductId(null) }}
          onCreate={(productId, quantity) => {
            inv.createPurchaseOrder(productId, quantity)
            setShowPoModal(false)
            setPoProductId(null)
          }}
        />
      )}

      <Toast message={inv.toast} colors={colors} onDismiss={() => inv.setToast(null)} />
    </div>
  )
}
