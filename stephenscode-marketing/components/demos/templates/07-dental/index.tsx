'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface DentalDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function DentalDemo({ demo, viewMode }: DentalDemoProps) {
  const colors = getDemoColors('bright-smile-dental')

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
