'use client'

import type { Demo } from '@/lib/demos-data'
import ElitePropertyManagement from './page'

interface PropertyDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function PropertyDemo({ demo, viewMode }: PropertyDemoProps) {
  return <ElitePropertyManagement />
}
