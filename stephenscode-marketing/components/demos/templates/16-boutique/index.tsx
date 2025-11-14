'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface BellaBoutiqueDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function BellaBoutiqueDemo({ demo, viewMode }: BellaBoutiqueDemoProps) {
  const colors = getDemoColors('bella-boutique-fashion')

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
