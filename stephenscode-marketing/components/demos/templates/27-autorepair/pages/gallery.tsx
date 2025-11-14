'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface GalleryPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function GalleryPage({ colors, onNavigate }: GalleryPageProps) {
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>Before & After Gallery</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span style={{ color: colors.textLight }}>Before/After {i}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold" style={{ color: colors.text }}>Repair Project {i}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Professional collision repair</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
