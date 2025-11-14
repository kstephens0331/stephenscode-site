'use client'

import type { Demo } from '@/lib/demos-data'
import RoastedPerfectionCoffee from './page'

interface CoffeeDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function CoffeeDemo({ demo, viewMode }: CoffeeDemoProps) {
  return <RoastedPerfectionCoffee />
}
