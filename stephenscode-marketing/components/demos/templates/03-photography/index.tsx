'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface PhotographyDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function PhotographyDemo({ demo, viewMode }: PhotographyDemoProps) {
  const colors = getDemoColors('fc-photo-houston')

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
