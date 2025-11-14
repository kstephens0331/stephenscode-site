'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { TrendingUp, Package, Users, Settings } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Inventory Administration</h1>
          <p className="mt-2" style={{ color: colors.textLight }}>Configure suppliers and reporting</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Supplier Management</h2>
            <div className="space-y-4">
              {['TechCorp', 'PartsPlus', 'GlobalSupply', 'BulkGoods'].map((supplier, index) => (
                <div key={index} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" style={{ color: colors.primary }} />
                      <span className="font-semibold" style={{ color: colors.text }}>{supplier}</span>
                    </div>
                    <button className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors" style={{ color: colors.primary }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Stock Reports</h2>
            <div className="space-y-4">
              {[
                { name: 'Inventory Valuation', icon: TrendingUp },
                { name: 'Stock Movement Report', icon: Package },
                { name: 'Low Stock Analysis', icon: Settings },
              ].map((report, index) => {
                const Icon = report.icon
                return (
                  <button
                    key={index}
                    className="w-full p-4 rounded-lg border-2 hover:shadow-md transition-all text-left flex items-center gap-3"
                    style={{ borderColor: colors.border }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className="font-semibold" style={{ color: colors.text }}>{report.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
