'use client'

import { useEffect, useState } from 'react'
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
  const [activeView, setActiveView] = useState<'customer' | 'admin'>(viewMode)

  // Follow the outer demo shell toggle whenever it changes
  useEffect(() => {
    setActiveView(viewMode)
  }, [viewMode])

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {activeView === 'customer' ? (
        <CustomerView />
      ) : (
        <AdminView onSwitchToCustomer={() => setActiveView('customer')} />
      )}
    </div>
  )
}
