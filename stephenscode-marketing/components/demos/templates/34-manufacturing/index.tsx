'use client'

import type { Demo } from '@/lib/demos-data'
import TechProManufacturing from './page'

interface ManufacturingDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function ManufacturingDemo({ demo, viewMode }: ManufacturingDemoProps) {
  return <TechProManufacturing />
}
