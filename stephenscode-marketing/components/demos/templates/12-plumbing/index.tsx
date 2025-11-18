'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface PlumbingDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function PlumbingDemo({ demo, viewMode }: PlumbingDemoProps) {
  const colors = getDemoColors('premier-plumbing-pros')

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
