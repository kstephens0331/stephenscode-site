'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface MedicalDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function MedicalDemo({ demo, viewMode }: MedicalDemoProps) {
  const colors = getDemoColors('healthfirst-medical-group')

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
