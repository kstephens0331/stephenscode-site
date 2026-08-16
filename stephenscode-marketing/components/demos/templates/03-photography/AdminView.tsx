'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const liveUrl = demo.externalUrl || 'https://www.fcphotohouston.com/'

  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="text-center p-8 max-w-lg">
        <div className="text-6xl mb-4">🎯</div>
        <h2 style={{ color: colors.primary }} className="text-3xl font-bold mb-4">
          Real Client Showcase
        </h2>
        <p style={{ color: colors.text }} className="text-lg mb-2">
          FC Photo Houston, Professional Photography Website
        </p>
        <p style={{ color: colors.textLight }} className="text-sm mb-8">
          This demo displays the actual live client website at fcphotohouston.com.
          The client manages their own content on the production site, so there is
          no separate demo admin panel here.
        </p>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: colors.primary }}
        >
          Visit the Live Site
        </a>
      </div>
    </div>
  )
}
