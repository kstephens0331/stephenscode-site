'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Demo } from '@/lib/demos-data'

interface DemosClientProps {
  demos: Demo[]
  categories: Array<{ name: string; slug: string; count: number }>
}

// Package type descriptions for section headers
const packageDescriptions: { [key: string]: { title: string; subtitle: string } } = {
  'plug-play': {
    title: 'Plug & Play Websites',
    subtitle: 'Simple 4-page sites perfect for getting online quickly - $250'
  },
  'rebuild': {
    title: 'Website Rebuilds',
    subtitle: 'Modernize your existing site with fresh design and features - $350'
  },
  'standard': {
    title: 'Standard Websites',
    subtitle: 'Full-featured business sites with 8-12 pages and custom functionality - $750-$1,200'
  },
  'ecommerce': {
    title: 'E-Commerce Websites',
    subtitle: 'Complete online stores with product management and checkout - $1,500-$3,000'
  },
  'premium': {
    title: 'Premium Builds',
    subtitle: 'Advanced custom websites with complex features and integrations - $3,000-$8,000'
  },
  'business-platform': {
    title: 'Custom Business Platforms',
    subtitle: 'Full-scale platforms with dashboards, automation, and workflows - $8,000-$15,000'
  },
  'enterprise': {
    title: 'Enterprise Solutions',
    subtitle: 'Large-scale applications with multi-user systems and advanced features - $15,000+'
  },
  'showcase': {
    title: 'Feature Showcases',
    subtitle: 'Individual feature demonstrations and specialty capabilities'
  }
}

export default function DemosClient({ demos, categories }: DemosClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // Filter and group demos
  const { filteredDemos, groupedDemos } = useMemo(() => {
    let filtered = demos

    if (selectedFilter !== 'all') {
      // Filter based on selected category
      const category = categories.find(c => c.slug === selectedFilter)
      if (category) {
        filtered = demos.filter(demo => {
          if (selectedFilter === 'plug-play') return demo.package.includes('Plug and Play')
          if (selectedFilter === 'rebuild') return demo.package.includes('Rebuild')
          if (selectedFilter === 'standard') return demo.package.includes('Standard')
          if (selectedFilter === 'ecommerce') return demo.package.includes('E-Commerce')
          if (selectedFilter === 'premium') return demo.package.includes('Premium Build')
          if (selectedFilter === 'business-platform') return demo.package.includes('Custom Business Platform')
          if (selectedFilter === 'enterprise') return demo.package.includes('Enterprise')
          if (selectedFilter === 'showcase') return demo.industry === 'Showcase'
          return true
        })
      }
    }

    // Group demos by package type for section headers
    const grouped: { [key: string]: Demo[] } = {}
    filtered.forEach(demo => {
      let group = 'other'
      if (demo.package.includes('Plug and Play')) group = 'plug-play'
      else if (demo.package.includes('Rebuild')) group = 'rebuild'
      else if (demo.package.includes('Standard')) group = 'standard'
      else if (demo.package.includes('E-Commerce')) group = 'ecommerce'
      else if (demo.package.includes('Premium Build')) group = 'premium'
      else if (demo.package.includes('Custom Business Platform')) group = 'business-platform'
      else if (demo.package.includes('Enterprise')) group = 'enterprise'
      else if (demo.industry === 'Showcase') group = 'showcase'

      if (!grouped[group]) grouped[group] = []
      grouped[group].push(demo)
    })

    return { filteredDemos: filtered, groupedDemos: grouped }
  }, [demos, selectedFilter, categories])

  // Render a demo card
  const renderDemoCard = (demo: Demo, index: number) => (
    <article
      key={demo.id}
      className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Demo Preview */}
      <div
        className="h-48 relative"
        style={{
          background: `linear-gradient(135deg, ${demo.colors.primary} 0%, ${demo.colors.secondary} 50%, ${demo.colors.accent} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">
              {demo.industry === 'Showcase' && '⚡'}
              {demo.industry === 'Home Services' && '🏠'}
              {demo.industry === 'Healthcare' && '🏥'}
              {demo.industry === 'Food & Beverage' && '🍴'}
              {demo.industry === 'Retail' && '🛍️'}
              {demo.industry === 'Professional Services' && '💼'}
              {demo.industry === 'Beauty & Personal Care' && '💅'}
              {demo.industry === 'Health & Fitness' && '💪'}
              {demo.industry === 'Legal' && '⚖️'}
              {demo.industry === 'Real Estate' && '🏘️'}
              {demo.industry === 'Automotive' && '🚗'}
              {demo.industry === 'Construction' && '🏗️'}
              {demo.industry === 'Transportation' && '🚚'}
              {demo.industry === 'Events' && '🎉'}
              {demo.industry === 'Manufacturing' && '🏭'}
              {demo.industry === 'Multi-Location' && '🌐'}
              {demo.industry === 'Creative Services' && '📸'}
              {demo.industry === 'Education' && '📚'}
            </div>
            <p className="text-sm font-semibold opacity-90">{demo.layout.toUpperCase()} LAYOUT</p>
          </div>
        </div>
        {/* Interactive Badge */}
        <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          INTERACTIVE
        </div>
      </div>

      {/* Demo Info */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {demo.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{demo.industry}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {demo.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-primary-600 mb-2">FEATURES INCLUDED:</p>
          <div className="flex flex-wrap gap-1">
            {demo.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {demo.features.length > 4 && (
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded font-semibold">
                +{demo.features.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500">{demo.package}</span>
          </div>
          <Link
            href={`/demos/${demo.slug}`}
            className="block w-full text-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
          >
            Launch Demo →
          </Link>
        </div>
      </div>
    </article>
  )

  return (
    <>
      {/* Categories Filter */}
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Package Type</h2>
            <p className="text-gray-600">Filter demos by service package or explore all</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.slug}
                onClick={() => setSelectedFilter(category.slug)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm ring-1 ring-inset transition-all ${
                  selectedFilter === category.slug
                    ? 'bg-primary-600 text-white ring-primary-600'
                    : 'bg-white text-gray-700 ring-gray-300 hover:bg-primary-50 hover:text-primary-700 hover:ring-primary-300'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category.name} <span className={selectedFilter === category.slug ? 'text-primary-200' : 'text-gray-500'}>({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Demos Grid with Section Headers */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {selectedFilter === 'all' ? (
            // Show grouped demos with section headers
            <>
              {Object.entries(groupedDemos).map(([groupKey, groupDemos]) => {
                const description = packageDescriptions[groupKey]
                if (!description || groupDemos.length === 0) return null

                return (
                  <div key={groupKey} className="mb-16 last:mb-0">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {description.title}
                      </h2>
                      <p className="text-lg text-gray-600">
                        {description.subtitle}
                      </p>
                    </div>

                    {/* Demos Grid */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                      {groupDemos.map((demo, index) => renderDemoCard(demo, index))}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            // Show filtered demos without section headers
            <>
              {filteredDemos.length > 0 ? (
                <>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {packageDescriptions[selectedFilter]?.title || 'Filtered Demos'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {packageDescriptions[selectedFilter]?.subtitle || `Showing ${filteredDemos.length} demos`}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                    {filteredDemos.map((demo, index) => renderDemoCard(demo, index))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No demos found</h3>
                  <p className="text-gray-600 mb-6">Try selecting a different category</p>
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className="rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 transition-colors"
                  >
                    View All Demos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
