'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface HandymanDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function HandymanDemo({ demo, viewMode }: HandymanDemoProps) {
  const colors = getDemoColors('fixit-fast-handyman')

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <CustomerView demo={demo} colors={colors} />
      ) : (
        <AdminView demo={demo} colors={colors} />
      )}
    </div>
  )
}
