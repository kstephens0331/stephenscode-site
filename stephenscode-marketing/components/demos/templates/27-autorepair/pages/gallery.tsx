'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

interface Project {
  id: number
  title: string
  category: string
  vehicle: string
  description: string
  beforeNote: string
  afterNote: string
  turnaround: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Front-End Collision Rebuild',
    category: 'Collision',
    vehicle: '2020 Toyota Camry',
    description: 'Full front-end rebuild after a highway collision: bumper, hood, radiator support, and both headlight assemblies replaced.',
    beforeNote: 'Crushed front bumper, buckled hood, broken headlights',
    afterNote: 'Factory-spec panels, OEM headlights, computerized color match',
    turnaround: '6 days'
  },
  {
    id: 2,
    title: 'Side Panel Repair & Blend',
    category: 'Collision',
    vehicle: '2019 Honda Accord',
    description: 'Driver-side door and quarter panel repair from a parking lot sideswipe, with paint blended across three panels.',
    beforeNote: 'Deep gouges and dents along both driver-side doors',
    afterNote: 'Seamless panel lines, invisible blend into adjacent panels',
    turnaround: '4 days'
  },
  {
    id: 3,
    title: 'Full Respray, Pearl White',
    category: 'Paint',
    vehicle: '2018 BMW 340i',
    description: 'Complete color change from black to tri-coat pearl white, including door jambs and engine bay accents.',
    beforeNote: 'Oxidized factory black with clear coat peel on hood and roof',
    afterNote: 'Show-quality tri-coat pearl finish, wet-sanded and polished',
    turnaround: '9 days'
  },
  {
    id: 4,
    title: 'Hail Damage Restoration',
    category: 'Dent Repair',
    vehicle: '2021 Ford F-150',
    description: 'Over 60 hail dents removed with paintless dent repair across the hood, roof, and bed rails. No repainting needed.',
    beforeNote: 'Hood and roof covered in dime-to-quarter size hail dents',
    afterNote: 'Original factory paint preserved, panels mirror-smooth',
    turnaround: '3 days'
  },
  {
    id: 5,
    title: 'Rear-End Impact Repair',
    category: 'Collision',
    vehicle: '2022 Subaru Outback',
    description: 'Rear bumper, tailgate, and floor pan repair after a rear-end impact, with frame measurements verified on our laser bench.',
    beforeNote: 'Collapsed rear bumper, shifted tailgate, misaligned floor pan',
    afterNote: 'Frame within factory tolerance, panel gaps restored',
    turnaround: '7 days'
  },
  {
    id: 6,
    title: 'Showroom Detail Package',
    category: 'Detailing',
    vehicle: '2017 Chevy Corvette',
    description: 'Two-stage paint correction, ceramic coating, and full interior detail ahead of a collector car show.',
    beforeNote: 'Swirl marks, water spots, and faded trim',
    afterNote: 'Mirror gloss with 5-year ceramic protection',
    turnaround: '2 days'
  }
]

const CATEGORIES = ['All', 'Collision', 'Paint', 'Dent Repair', 'Detailing']

export default function GalleryPage({ colors, onNavigate }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showAfter, setShowAfter] = useState(true)

  const filtered = activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory)
  const selectedIndex = selectedId === null ? -1 : filtered.findIndex(p => p.id === selectedId)
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null

  const openProject = (id: number) => {
    setSelectedId(id)
    setShowAfter(true)
  }

  const step = (dir: number) => {
    if (selectedIndex < 0 || filtered.length === 0) return
    const next = (selectedIndex + dir + filtered.length) % filtered.length
    setSelectedId(filtered[next].id)
    setShowAfter(true)
  }

  const panelStyle = (after: boolean) =>
    after
      ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }
      : { background: 'linear-gradient(135deg, #6b7280, #374151)' }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: colors.text }}>Before & After Gallery</h1>
        <p className="text-center mb-8" style={{ color: colors.textLight }}>
          Tap any project to compare the damage with the finished repair
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-90"
              style={{
                borderColor: colors.accent,
                backgroundColor: activeCategory === cat ? colors.accent : 'transparent',
                color: activeCategory === cat ? '#ffffff' : colors.accent
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(project => (
            <button
              key={project.id}
              onClick={() => openProject(project.id)}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-left hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video flex items-center justify-center relative" style={panelStyle(true)}>
                <div className="text-center text-white px-4">
                  <div className="font-bold">{project.vehicle}</div>
                  <div className="text-sm opacity-90">{project.category}</div>
                </div>
                <span
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: colors.text }}
                >
                  View Before / After
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold" style={{ color: colors.text }}>{project.title}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{project.vehicle} -- {project.turnaround} turnaround</p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-12" style={{ color: colors.textLight }}>
            No projects in this category yet.
          </p>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('estimate')}
            className="px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Get an Estimate for Your Repair
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-lg font-bold" style={{ color: colors.text }}>{selected.title}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{selected.vehicle} -- {selected.category}</p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                style={{ color: colors.textLight }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Before / After Toggle */}
              <div className="flex rounded-lg overflow-hidden border-2" style={{ borderColor: colors.accent }}>
                <button
                  onClick={() => setShowAfter(false)}
                  className="flex-1 py-2.5 font-semibold text-sm transition-colors"
                  style={{
                    backgroundColor: !showAfter ? colors.accent : 'transparent',
                    color: !showAfter ? '#ffffff' : colors.accent
                  }}
                >
                  Before
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className="flex-1 py-2.5 font-semibold text-sm transition-colors"
                  style={{
                    backgroundColor: showAfter ? colors.accent : 'transparent',
                    color: showAfter ? '#ffffff' : colors.accent
                  }}
                >
                  After
                </button>
              </div>

              <div className="aspect-video rounded-lg flex items-center justify-center" style={panelStyle(showAfter)}>
                <div className="text-center text-white px-8">
                  <div className="text-sm uppercase tracking-wide font-semibold mb-2 opacity-80">
                    {showAfter ? 'After Repair' : 'Before Repair'}
                  </div>
                  <p className="font-medium">
                    {showAfter ? selected.afterNote : selected.beforeNote}
                  </p>
                </div>
              </div>

              <p className="text-sm" style={{ color: colors.textLight }}>{selected.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: colors.textLight }}>
                  Turnaround: <span className="font-semibold" style={{ color: colors.text }}>{selected.turnaround}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Next project"
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedId(null)
                  onNavigate('estimate')
                }}
                className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                Get a Similar Repair Quoted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
