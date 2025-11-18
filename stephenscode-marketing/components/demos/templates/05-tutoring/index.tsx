'use client'

import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface TutoringDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function TutoringDemo({ demo, viewMode }: TutoringDemoProps) {
  const colors = getDemoColors('smart-start-tutoring')

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
