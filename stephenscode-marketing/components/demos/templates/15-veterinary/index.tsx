'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import { getDemoColors, generateColorVars } from '@/lib/demo-colors'
import CustomerView from './CustomerView'
import AdminView from './AdminView'

interface VeterinaryDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

interface BusinessInfo {
  name: string
  phone: string
  email: string
  address: string
  hours: string
}

interface ColorOverrides {
  primary: string
  secondary: string
  accent: string
}

const BUSINESS_STORAGE_KEY = 'vet-demo-business-info'
const COLORS_STORAGE_KEY = 'vet-demo-colors'

const defaultBusinessInfo: BusinessInfo = {
  name: 'Paws & Care Animal Hospital',
  phone: '(555) 123-4567',
  email: 'info@pawsandcare.com',
  address: '123 Pet Lane, Your City, ST 12345',
  hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM'
}

export default function VeterinaryDemo({ demo, viewMode }: VeterinaryDemoProps) {
  const baseColors = getDemoColors('paws-care-animal-hospital')

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo)
  const [colorOverrides, setColorOverrides] = useState<ColorOverrides | null>(null)

  // Restore any admin edits saved in this browser
  useEffect(() => {
    try {
      const savedInfo = window.localStorage.getItem(BUSINESS_STORAGE_KEY)
      if (savedInfo) {
        setBusinessInfo({ ...defaultBusinessInfo, ...(JSON.parse(savedInfo) as Partial<BusinessInfo>) })
      }
      const savedColors = window.localStorage.getItem(COLORS_STORAGE_KEY)
      if (savedColors) {
        setColorOverrides(JSON.parse(savedColors) as ColorOverrides)
      }
    } catch {
      // Corrupted saved data -- fall back to defaults
    }
  }, [])

  const colors = colorOverrides ? { ...baseColors, ...colorOverrides } : baseColors

  const handleUpdateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info)
    try {
      window.localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(info))
    } catch {
      // Storage unavailable -- edits still apply for this session
    }
  }

  const handleUpdateColors = (next: ColorOverrides) => {
    const overrides: ColorOverrides = {
      primary: next.primary,
      secondary: next.secondary,
      accent: next.accent
    }
    setColorOverrides(overrides)
    try {
      window.localStorage.setItem(COLORS_STORAGE_KEY, JSON.stringify(overrides))
    } catch {
      // Storage unavailable -- edits still apply for this session
    }
  }

  // Simple colors for AdminView
  const adminColors = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent
  }

  return (
    <div style={generateColorVars(colors)} className="min-h-screen">
      {viewMode === 'customer' ? (
        <CustomerView businessInfo={businessInfo} colors={colors} />
      ) : (
        <AdminView
          businessInfo={businessInfo}
          onUpdateBusinessInfo={handleUpdateBusinessInfo}
          colors={adminColors}
          onUpdateColors={handleUpdateColors}
        />
      )}
    </div>
  )
}
