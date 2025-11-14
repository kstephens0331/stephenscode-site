'use client'

import type { Demo } from '@/lib/demos-data'
import PremierStaffingSolutions from './page'

interface StaffingDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function StaffingDemo({ demo, viewMode }: StaffingDemoProps) {
  return <PremierStaffingSolutions />
}
