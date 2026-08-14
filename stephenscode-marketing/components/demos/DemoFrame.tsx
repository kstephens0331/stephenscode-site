'use client'

import { useEffect, useState, type ComponentType } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Globe, User, Lock, Info, X, Lightbulb, Briefcase } from 'lucide-react'
import type { Demo } from '@/lib/demos-data'
import { trackEvent } from '@/lib/analytics'

interface DemoTemplateProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

function DemoLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 mx-auto mb-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Loading demo...</p>
      </div>
    </div>
  )
}

// Module scope (never inside the component) so each dynamic component's
// identity is stable across renders. ssr: false is safe here: DemoFrame is a
// Client Component, the templates read/write localStorage, and the page's SEO
// lives in generateMetadata + JSON-LD, not the mock template markup.
const loadTemplate = (loader: () => Promise<{ default: ComponentType<DemoTemplateProps> }>) =>
  dynamic(loader, { loading: DemoLoading, ssr: false })

// Slug -> lazily loaded template chunk. Two slugs share photography and two
// share hvac; webpack/turbopack dedupes those into a single chunk.
const DEMO_TEMPLATES: Record<string, ComponentType<DemoTemplateProps>> = {
  'classic-cuts-barbershop': loadTemplate(() => import('./templates/01-barbershop')),
  'fixit-fast-handyman': loadTemplate(() => import('./templates/02-handyman')),
  'fc-photo-houston': loadTemplate(() => import('./templates/03-photography')),
  'lens-light-photography': loadTemplate(() => import('./templates/03-photography')),
  'sparkle-clean-services': loadTemplate(() => import('./templates/04-cleaning')),
  'smart-start-tutoring': loadTemplate(() => import('./templates/05-tutoring')),
  'green-valley-landscaping': loadTemplate(() => import('./templates/06-landscaping')),
  'bright-smile-dental': loadTemplate(() => import('./templates/07-dental')),
  'peak-financial-advisors': loadTemplate(() => import('./templates/08-accounting')),
  'glamour-studio-salon': loadTemplate(() => import('./templates/09-salon')),
  'amw-air-conditioning': loadTemplate(() => import('./templates/10-hvac')),
  'cool-breeze-hvac': loadTemplate(() => import('./templates/10-hvac')),
  'justice-associates-law': loadTemplate(() => import('./templates/11-law-firm')),
  'premier-plumbing-pros': loadTemplate(() => import('./templates/12-plumbing')),
  'skyline-realty-group': loadTemplate(() => import('./templates/13-realestate')),
  'iron-temple-fitness': loadTemplate(() => import('./templates/14-gym')),
  'paws-care-animal-hospital': loadTemplate(() => import('./templates/15-veterinary')),
  'bella-boutique-fashion': loadTemplate(() => import('./templates/16-boutique')),
  'sweet-dreams-bakery': loadTemplate(() => import('./templates/17-bakery')),
  'peak-performance-supplements': loadTemplate(() => import('./templates/18-supplements')),
  'timeless-treasures-jewelry': loadTemplate(() => import('./templates/19-jewelry')),
  'hoppy-trails-craft-beer': loadTemplate(() => import('./templates/20-beer')),
  'urban-jungle-plant-shop': loadTemplate(() => import('./templates/21-plants')),
  'roasted-perfection-coffee': loadTemplate(() => import('./templates/22-coffee')),
  'happy-paws-pet-supplies': loadTemplate(() => import('./templates/23-petfood')),
  'gourmet-kitchen-restaurant': loadTemplate(() => import('./templates/24-restaurant')),
  'terracotta-construction': loadTemplate(() => import('./templates/25-construction')),
  'healthfirst-medical-group': loadTemplate(() => import('./templates/26-medical')),
  'cars-collision-refinish': loadTemplate(() => import('./templates/27-autorepair')),
  'serenity-spa-wellness': loadTemplate(() => import('./templates/28-spa')),
  'swift-logistics-services': loadTemplate(() => import('./templates/29-logistics')),
  'elite-property-management': loadTemplate(() => import('./templates/30-property')),
  'premier-staffing-solutions': loadTemplate(() => import('./templates/31-staffing')),
  'celebration-events-company': loadTemplate(() => import('./templates/32-events')),
  'fastserve-franchise-network': loadTemplate(() => import('./templates/33-franchise')),
  'techpro-manufacturing': loadTemplate(() => import('./templates/34-manufacturing')),
  'booking-system-showcase': loadTemplate(() => import('./templates/35-booking')),
  'analytics-dashboard-showcase': loadTemplate(() => import('./templates/36-analytics')),
  'membership-portal-showcase': loadTemplate(() => import('./templates/37-membership')),
  'crm-system-showcase': loadTemplate(() => import('./templates/38-crm')),
  'inventory-management-showcase': loadTemplate(() => import('./templates/39-inventory')),
  'workflow-automation-showcase': loadTemplate(() => import('./templates/40-workflow')),
}

const GenericDemoTemplate = loadTemplate(() => import('./templates/GenericDemo'))

interface DemoFrameProps {
  demo: Demo
}

// These showcase demos illustrate the interface/data model but don't have every
// action wired to a working handler yet -- the instructions banner should say so
// rather than claim "Everything works!"
const INTERFACE_PREVIEW_ONLY_SLUGS = new Set([
  'analytics-dashboard-showcase',
  'membership-portal-showcase',
  'crm-system-showcase',
  'inventory-management-showcase',
  'workflow-automation-showcase',
])

// These templates are single-view (no separate admin dashboard exists in the
// underlying component) -- the Customer View/Admin Dashboard toggle has nothing
// to switch to, so it's hidden rather than shown as a dead control.
const NO_VIEW_TOGGLE_SLUGS = new Set([
  'hoppy-trails-craft-beer',
  'urban-jungle-plant-shop',
  'roasted-perfection-coffee',
  'happy-paws-pet-supplies',
  'elite-property-management',
  'premier-staffing-solutions',
  'celebration-events-company',
])

export default function DemoFrame({ demo }: DemoFrameProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer')
  const isInterfacePreviewOnly = INTERFACE_PREVIEW_ONLY_SLUGS.has(demo.slug)
  const hasViewToggle = !demo.isRealClient && !NO_VIEW_TOGGLE_SLUGS.has(demo.slug)

  useEffect(() => {
    // Initialize localStorage for this demo
    const demoKey = `demo_${demo.id}`
    if (!localStorage.getItem(demoKey)) {
      localStorage.setItem(demoKey, JSON.stringify({
        initialized: true,
        data: {}
      }))
    }

    // Clear demo data when user leaves the site
    const handleBeforeUnload = () => {
      localStorage.removeItem(demoKey)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [demo.id])

  // Render the appropriate demo template based on demo slug
  const renderDemo = () => {
    // Handle real client sites - show redirect card
    if (demo.isRealClient && demo.externalUrl) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="text-center p-8 max-w-lg">
            <Globe className="h-16 w-16 mb-6 mx-auto text-primary-400" />
            <h2 className="text-2xl font-bold text-white mb-4">{demo.clientName || demo.name}</h2>
            <p className="text-gray-300 mb-2">This is a real client website built by StephensCode.</p>
            <p className="text-gray-400 mb-8 text-sm">Visit the live production site to see our work in action.</p>
            <a
              href={demo.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-700 hover:bg-accent-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Visit Live Site →
            </a>
            <div className="mt-6">
              <Link href="/demos" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                ← Back to All Demos
              </Link>
            </div>
          </div>
        </div>
      )
    }

    const Template = DEMO_TEMPLATES[demo.slug] ?? GenericDemoTemplate
    return <Template demo={demo} viewMode={viewMode} />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Demo Controls Bar */}
      <div className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Demo Info */}
            <div className="flex items-center gap-4">
              <Link
                href="/demos"
                className="text-sm font-semibold hover:text-accent-400 transition-colors flex items-center gap-2"
              >
                ← Back to Demos
              </Link>
              <div className="h-6 w-px bg-gray-700"></div>
              <div>
                <span className="text-sm font-bold block">{demo.name}</span>
                <p className="text-xs text-gray-400">{demo.package}</p>
              </div>
            </div>

            {/* Center: View Mode Toggle (not applicable to real-client redirect cards or single-view templates) */}
            {hasViewToggle && (
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('customer')}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                    viewMode === 'customer'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> Customer View</span>
                </button>
                <button
                  onClick={() => setViewMode('admin')}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                    viewMode === 'admin'
                      ? 'bg-accent-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4" /> Admin Dashboard</span>
                </button>
              </div>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {!demo.isRealClient && (
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-sm font-semibold hover:text-accent-400 transition-colors inline-flex items-center gap-1.5"
                >
                  {showInstructions ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                  {showInstructions ? 'Hide' : 'Show'} Instructions
                </button>
              )}
              <Link
                href="/contact"
                className="bg-accent-700 hover:bg-accent-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                onClick={() => trackEvent('cta_click', { cta: 'Build This', location: `demo_${demo.slug}_controls` })}
              >
                Build This →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Banner (not applicable to real-client redirect cards) */}
      {showInstructions && !demo.isRealClient && (
        <div className="bg-primary-950/50 border-b border-primary-800/30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-8 w-8 flex-shrink-0 text-primary-300" />
              <div className="flex-1">
                <h3 className="font-bold text-primary-300 mb-2">
                  {isInterfacePreviewOnly ? 'This is an Interface Preview' : 'This is a Fully Interactive Demo'}
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {isInterfacePreviewOnly ? (
                    <li>• Explore the layout and navigation. This preview shows the interface design; the underlying actions (saving, exporting, workflow execution) are illustrative and not wired up in this demo.</li>
                  ) : (
                    <li>• Click around, fill out forms, and test all features. Everything works!</li>
                  )}
                  {hasViewToggle && (
                    <li>• Switch between <strong>Customer View</strong> (what your clients see) and <strong>Admin Dashboard</strong> (your control panel)</li>
                  )}
                  <li>• All data is stored locally and will be cleared when you close this tab</li>
                  <li>• Resize your browser to see the responsive mobile design</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Dismiss instructions"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Content */}
      <div className="demo-container">
        {renderDemo()}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="bg-accent-700 hover:bg-accent-800 text-white px-6 py-4 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 transition-all"
          onClick={() => trackEvent('cta_click', { cta: 'Want This for Your Business', location: `demo_${demo.slug}_floating` })}
        >
          <Briefcase className="h-4 w-4" />
          <span>Want This for Your Business?</span>
        </Link>
      </div>
    </div>
  )
}
