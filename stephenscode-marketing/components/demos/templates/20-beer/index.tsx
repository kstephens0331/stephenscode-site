'use client'

import type { Demo } from '@/lib/demos-data'
import HoppyTrailsCraftBeer from './page'

interface BeerDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function BeerDemo({ demo, viewMode }: BeerDemoProps) {
  return <HoppyTrailsCraftBeer />
}
