'use client'

import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface CleaningDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function CleaningDemo({ demo, viewMode }: CleaningDemoProps) {
  const colors = getDemoColors('sparkle-clean-services')

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
