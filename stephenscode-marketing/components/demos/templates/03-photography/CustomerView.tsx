'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Real Client Showcase Banner */}
      <div style={{ backgroundColor: colors.primary }} className="py-3 px-4 text-center">
        <p style={{ color: colors.accent }} className="text-sm font-bold">
          🎯 REAL CLIENT SHOWCASE: FC Photo Houston - Professional Photography Website
        </p>
        <p style={{ color: colors.textLight }} className="text-xs mt-1">
          This is an actual live client website built by StephensCode. Package: Premium Build ($2,000)
        </p>
      </div>

      {/* Iframe displaying actual client website */}
      <iframe
        src="https://fcphotohouston.com"
        className="w-full flex-1 border-0"
        title="FC Photo Houston - Real Client Website"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  )
}
