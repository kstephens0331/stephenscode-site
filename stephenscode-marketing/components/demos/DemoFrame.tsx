'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Demo } from '@/lib/demos-data'

// Import demo templates
import RestaurantDemo from './templates/RestaurantDemo'
import ContractorDemo from './templates/ContractorDemo'
import ECommerceDemo from './templates/ECommerceDemo'
import GenericDemo from './templates/GenericDemo'

interface DemoFrameProps {
  demo: Demo
}

export default function DemoFrame({ demo }: DemoFrameProps) {
  const [showInstructions, setShowInstructions] = useState(true)
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer')

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

  // Render the appropriate demo template based on demo type
  const renderDemo = () => {
    if (demo.slug === 'gourmet-kitchen-restaurant') {
      return <RestaurantDemo demo={demo} viewMode={viewMode} />
    } else if (demo.slug === 'buildright-construction') {
      return <ContractorDemo demo={demo} viewMode={viewMode} />
    } else if (demo.package.includes('E-Commerce')) {
      return <ECommerceDemo demo={demo} viewMode={viewMode} />
    } else {
      return <GenericDemo demo={demo} viewMode={viewMode} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
                <h1 className="text-sm font-bold">{demo.name}</h1>
                <p className="text-xs text-gray-400">{demo.package}</p>
              </div>
            </div>

            {/* Center: View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('customer')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  viewMode === 'customer'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👤 Customer View
              </button>
              <button
                onClick={() => setViewMode('admin')}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  viewMode === 'admin'
                    ? 'bg-accent-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔐 Admin Dashboard
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-sm font-semibold hover:text-accent-400 transition-colors"
              >
                {showInstructions ? '✕ Hide' : 'ℹ️ Show'} Instructions
              </button>
              <Link
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Build This →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Banner */}
      {showInstructions && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 mb-2">This is a Fully Interactive Demo</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click around, fill out forms, and test all features—everything works!</li>
                  <li>• Switch between <strong>Customer View</strong> (what your clients see) and <strong>Admin Dashboard</strong> (your control panel)</li>
                  <li>• All data is stored locally and will be cleared when you close this tab</li>
                  <li>• Resize your browser to see the responsive mobile design</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-blue-600 hover:text-blue-800 text-xl"
              >
                ✕
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
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-4 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
        >
          <span>💼</span>
          <span>Want This for Your Business?</span>
        </Link>
      </div>
    </div>
  )
}
