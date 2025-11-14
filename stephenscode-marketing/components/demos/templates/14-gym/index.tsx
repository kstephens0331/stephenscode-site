'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface GymDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function GymDemo({ demo, viewMode }: GymDemoProps) {
  const colors = getDemoColors('iron-temple-fitness')
  const basePath = `/demos/${demo.slug}`

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <CustomerView basePath={basePath} />
      ) : (
        <AdminView basePath={basePath} demo={demo} />
      )}
    </div>
  )
}
