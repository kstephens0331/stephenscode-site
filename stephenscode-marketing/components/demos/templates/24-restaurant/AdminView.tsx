'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import AdminDashboardPage from './pages/AdminDashboardPage'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  return <AdminDashboardPage colors={colors} />
}
