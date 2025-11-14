'use client'

import type { Demo } from '@/lib/demos-data'
import HappyPawsPetSupplies from './page'

interface HappyPawsPetSuppliesDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function HappyPawsPetSuppliesDemo({ demo, viewMode }: HappyPawsPetSuppliesDemoProps) {
  return <HappyPawsPetSupplies />
}
