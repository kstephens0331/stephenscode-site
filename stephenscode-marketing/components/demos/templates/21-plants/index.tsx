'use client'

import type { Demo } from '@/lib/demos-data'
import UrbanJunglePlantShop from './page'

interface PlantShopDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function PlantShopDemo({ demo, viewMode }: PlantShopDemoProps) {
  return <UrbanJunglePlantShop />
}
