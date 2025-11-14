'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 style={{ color: colors.primary }} className="text-3xl font-black mb-4">
          Real Client Showcase
        </h2>
        <p style={{ color: colors.text }} className="text-lg mb-2">
          FC Photo Houston - Professional Photography Website
        </p>
        <p style={{ color: colors.textLight }} className="text-sm">
          This demo displays the actual live client website at fcphotohouston.com
        </p>
        <p style={{ color: colors.textLight }} className="text-sm mt-4">
          Package: Premium Build ($2,000)
        </p>
      </div>
    </div>
  )
}
