'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { basicAddOns, advancedAddOns, allAddOns } from '@/lib/addons-data'

type FilterCategory = 'all' | 'basic' | 'advanced'

export default function AddOnsClient() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAddOns = useMemo(() => {
    let addons = activeFilter === 'all'
      ? allAddOns
      : activeFilter === 'basic'
        ? basicAddOns
        : advancedAddOns

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      addons = addons.filter(addon =>
        addon.name.toLowerCase().includes(query) ||
        addon.shortDescription.toLowerCase().includes(query)
      )
    }

    return addons
  }, [activeFilter, searchQuery])

  const filterButtons: { key: FilterCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Add-Ons', count: allAddOns.length },
    { key: 'basic', label: 'Basic', count: basicAddOns.length },
    { key: 'advanced', label: 'Advanced', count: advancedAddOns.length },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Website Add-Ons
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Enhance your website with powerful features. All add-ons are flat-rate pricing with no hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {filterButtons.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter.key
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search add-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredAddOns.length}</span> add-on{filteredAddOns.length !== 1 ? 's' : ''}
          {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
        </p>
      </div>

      {/* Add-Ons Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {filteredAddOns.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAddOns.map((addon) => (
              <Link
                key={addon.id}
                href={`/services/${addon.slug}`}
                className={`group rounded-xl border-2 bg-white p-6 hover:shadow-xl transition-all hover:scale-[1.02] ${
                  addon.category === 'addon-advanced'
                    ? 'border-gray-200 hover:border-primary-500'
                    : 'border-gray-200 hover:border-accent-500'
                }`}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    addon.category === 'addon-advanced'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-accent-100 text-accent-700'
                  }`}>
                    {addon.category === 'addon-advanced' ? 'Advanced' : 'Basic'}
                  </span>
                  <span className="text-sm text-gray-500">{addon.timeline}</span>
                </div>

                {/* Name and Price */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {addon.name}
                  </h3>
                  <p className={`text-lg font-bold whitespace-nowrap ${
                    addon.category === 'addon-advanced' ? 'text-primary-600' : 'text-accent-600'
                  }`}>
                    {addon.priceLabel}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {addon.shortDescription}
                </p>

                {/* CTA */}
                <div className={`text-sm font-semibold transition-colors ${
                  addon.category === 'addon-advanced'
                    ? 'text-primary-600 group-hover:text-primary-700'
                    : 'text-accent-600 group-hover:text-accent-700'
                }`}>
                  View Details
                  <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No add-ons found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('all')
              }}
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Not sure which add-ons are right for your project? Contact us for a free consultation and we&apos;ll recommend the perfect combination for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
          >
            Get a Free Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
