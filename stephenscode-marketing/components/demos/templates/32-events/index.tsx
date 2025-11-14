'use client'

import type { Demo } from '@/lib/demos-data'
import CelebrationEventsCompany from './page'

interface EventsDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function EventsDemo({ demo, viewMode }: EventsDemoProps) {
  return <CelebrationEventsCompany />
}
