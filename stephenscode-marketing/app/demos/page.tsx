import type { Metadata } from 'next'
import Link from 'next/link'
import { allDemos, demoCategories, demosByIndustry } from '@/lib/demos-data'
import DemosClient from './DemosClient'

export const metadata: Metadata = {
  title: 'Live Demos - See Our Work in Action | StephensCode',
  description: 'Explore 40+ fully interactive website demos showcasing our packages and features. Try admin dashboards, customer portals, and advanced functionality.',
  keywords: ['website demos', 'interactive portfolio', 'web development examples', 'Houston web design showcase'],
  openGraph: {
    title: 'Live Demos - See Our Work in Action | StephensCode',
    description: 'Explore 40+ fully interactive website demos. Try admin dashboards, customer portals, and advanced functionality.',
    url: 'https://www.stephenscode.dev/demos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Demos - See Our Work in Action | StephensCode',
    description: 'Explore 40+ fully interactive website demos. Try admin dashboards, customer portals, and advanced functionality.',
  },
}

export default function DemosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <span className="text-2xl">🎨</span>
              <span>40+ Live Interactive Demos</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Experience Our Work
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Explore fully functional website demos across all industries and packages. Click around, test features, and see exactly what you'll get. No mockups—real, working sites.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#demos-grid"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Browse Demos
              </a>
              <Link
                href="/pricing"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center border-l-4 border-accent-500 pl-6">
              <dt className="text-base leading-7 text-gray-600">Total Demos</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-primary-600">{allDemos.length}</dd>
            </div>
            <div className="flex flex-col items-center border-l-4 border-accent-500 pl-6">
              <dt className="text-base leading-7 text-gray-600">Industries</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-primary-600">{Object.keys(demosByIndustry).length}</dd>
            </div>
            <div className="flex flex-col items-center border-l-4 border-accent-500 pl-6">
              <dt className="text-base leading-7 text-gray-600">Unique Layouts</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-primary-600">6</dd>
            </div>
            <div className="flex flex-col items-center border-l-4 border-accent-500 pl-6">
              <dt className="text-base leading-7 text-gray-600">Fully Interactive</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-primary-600">100%</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Client-side filtering and demos grid */}
      <div id="demos-grid">
        <DemosClient demos={allDemos} categories={demoCategories} />
      </div>

      {/* Interactive Features Callout */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fully Interactive Demos
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              These aren't screenshots—they're real, working websites you can interact with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl mb-4">
                ✅
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Click Around</h3>
              <p className="text-sm text-gray-600">Navigate pages, open menus, test buttons—everything works.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl mb-4">
                📝
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill Out Forms</h3>
              <p className="text-sm text-gray-600">Test contact forms, booking systems, and checkout flows.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl mb-4">
                🔐
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Try Admin Panels</h3>
              <p className="text-sm text-gray-600">Log into dashboards, see reports, manage content (demo mode).</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl mb-4">
                📱
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Test on Mobile</h3>
              <p className="text-sm text-gray-600">Resize your browser—all demos are fully responsive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Build Yours?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Seen something you like? Let's build a custom website tailored to your business. Transparent pricing, fast turnaround, veteran-owned quality.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
