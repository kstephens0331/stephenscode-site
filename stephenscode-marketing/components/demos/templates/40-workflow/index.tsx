'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface WorkflowShowcaseDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function WorkflowShowcaseDemo({ demo, viewMode }: WorkflowShowcaseDemoProps) {
  const colors = getDemoColors('workflow-automation-showcase')

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
