'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface PeakPerformanceDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function PeakPerformanceDemo({ demo, viewMode }: PeakPerformanceDemoProps) {
  const colors = getDemoColors('peak-performance-supplements')

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
