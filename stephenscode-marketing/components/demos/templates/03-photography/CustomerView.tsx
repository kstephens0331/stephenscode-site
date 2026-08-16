'use client'

import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const liveUrl = demo.externalUrl || 'https://www.fcphotohouston.com/'

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Real Client Showcase Banner */}
      <div style={{ backgroundColor: colors.primary }} className="py-3 px-4 text-center">
        <p style={{ color: colors.accent }} className="text-sm font-bold">
          🎯 REAL CLIENT SHOWCASE: FC Photo Houston, Professional Photography Website
        </p>
        <p style={{ color: colors.textLight }} className="text-xs mt-1">
          This is an actual live client website built by StephensCode.{' '}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold hover:opacity-80 transition-opacity"
            style={{ color: colors.accent }}
          >
            Open the full site in a new tab
          </a>
        </p>
      </div>

      {/* Iframe displaying actual client website */}
      <iframe
        src={liveUrl}
        className="w-full flex-1 border-0"
        title="FC Photo Houston - Real Client Website"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  )
}
