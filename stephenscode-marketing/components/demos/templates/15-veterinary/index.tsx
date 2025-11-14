'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface VeterinaryDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function VeterinaryDemo({ demo, viewMode }: VeterinaryDemoProps) {
  const colors = getDemoColors('paws-care-animal-hospital')

  const businessInfo = {
    name: 'Paws & Care Animal Hospital',
    phone: '(555) 123-4567',
    email: 'info@pawsandcare.com',
    address: '123 Pet Lane, Your City, ST 12345',
    hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM'
  }

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <CustomerView businessInfo={businessInfo} colors={colors} />
      ) : (
        <AdminView demo={demo} colors={colors} />
      )}
    </div>
  )
}
