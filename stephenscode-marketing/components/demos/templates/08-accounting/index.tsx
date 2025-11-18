'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface AccountingDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function AccountingDemo({ demo, viewMode }: AccountingDemoProps) {
  const colors = getDemoColors('peak-financial-advisors')

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <CustomerView />
      ) : (
        <AdminView />
      )}
    </div>
  )
}
