'use client'

import type { Demo } from '@/lib/demos-data'
import FastServeFranchiseNetwork from './page'

interface FranchiseDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function FranchiseDemo({ demo, viewMode }: FranchiseDemoProps) {
  return <FastServeFranchiseNetwork />
}
