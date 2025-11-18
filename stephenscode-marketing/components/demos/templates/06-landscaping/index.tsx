'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface LandscapingDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function LandscapingDemo({ demo, viewMode }: LandscapingDemoProps) {
  const colors = getDemoColors('green-valley-landscaping')

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
