import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serviceAreas, getServiceAreaBySlug, getAllServiceAreaSlugs } from '@/lib/service-areas-data'

interface ServiceAreaPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return {
      title: 'Service Area Not Found',
    }
  }

  return {
    title: `Web Developer ${area.name} TX | Custom Websites & SEO`,
    description: `Professional web development serving ${area.name}, Texas. Custom websites, SEO, and business solutions for local businesses. Veteran-owned, transparent pricing from $250.`,
    keywords: [
      `web developer ${area.name}`,
      `website design ${area.name} TX`,
      `${area.name} web development`,
      `custom website ${area.name}`,
      `SEO services ${area.name}`,
      `small business website ${area.name}`,
    ],
  }
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  // Local business schema for this service area
  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Web Development Services in ${area.name}, TX`,
    description: `Professional web development and SEO services for businesses in ${area.name}, Texas.`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'StephensCode',
      telephone: '+1-936-323-4527',
      areaServed: {
        '@type': 'City',
        name: area.name,
        containedInPlace: {
          '@type': 'State',
          name: 'Texas',
        },
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                All Service Areas
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Web Development in {area.name}, TX
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Professional website design and development for {area.name} businesses.
              Custom solutions that help you stand out and attract more local customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:9363234527"
                className="rounded-md bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Call (936) 323-4527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Area Overview */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                About {area.name}
              </h2>
              <p className="text-lg text-gray-600 leading-8 mb-6">
                {area.description}
              </p>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-semibold text-gray-900">Population</dt>
                  <dd className="text-gray-600">{area.population}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-semibold text-gray-900">County</dt>
                  <dd className="text-gray-600">{area.county}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                  <dt className="font-semibold text-gray-900">Distance from Conroe</dt>
                  <dd className="text-gray-600">{area.distanceFromConroe}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Local Features
              </h3>
              <ul className="space-y-3">
                {area.localFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services for This Area */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Web Services for {area.name} Businesses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We build websites that help {area.name} businesses attract more local customers and grow their revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Websites</h3>
              <p className="text-gray-600 mb-4">
                Fast, mobile-optimized websites designed specifically for your {area.name} business. Stand out from competitors using templates.
              </p>
              <p className="text-sm font-semibold text-primary-600">Starting at $250</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Local SEO</h3>
              <p className="text-gray-600 mb-4">
                Rank higher for "{area.name}" searches. We optimize your site, Google Business Profile, and local citations to dominate local search.
              </p>
              <p className="text-sm font-semibold text-primary-600">Included with all packages</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">E-Commerce</h3>
              <p className="text-gray-600 mb-4">
                Sell online to {area.name} customers and beyond. Full shopping cart, payment processing, and inventory management.
              </p>
              <p className="text-sm font-semibold text-primary-600">Starting at $1,100</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-base font-semibold text-primary-600 hover:text-primary-700"
            >
              View all services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
            Industries We Serve in {area.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {area.businessTypes.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700"
              >
                {type}
              </span>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-600">
            Don't see your industry? We work with all types of local businesses. <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link> to discuss your project.
          </p>
        </div>
      </section>

      {/* Neighborhoods */}
      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
              Serving All {area.name} Neighborhoods
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {area.neighborhoods.map((neighborhood, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-12 text-center">
            Why {area.name} Businesses Choose StephensCode
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local to You</h3>
              <p className="text-sm text-gray-600">
                Based in Conroe, just {area.distanceFromConroe} away. We know the {area.name} market.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flat-Rate Pricing</h3>
              <p className="text-sm text-gray-600">
                No hourly billing surprises. Know exactly what you'll pay before we start.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">
                Most sites completed in 1-2 weeks. Get online and start attracting customers quickly.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Veteran-Owned</h3>
              <p className="text-sm text-gray-600">
                14+ years of experience with Marine Corps integrity and work ethic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Grow Your {area.name} Business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Let's discuss your project. Free consultation, honest advice, and transparent pricing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:9363234527"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Service Areas */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Other Areas We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas
              .filter(a => a.slug !== slug)
              .slice(0, 8)
              .map((otherArea) => (
                <Link
                  key={otherArea.slug}
                  href={`/service-areas/${otherArea.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  {otherArea.name}
                </Link>
              ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/service-areas"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all service areas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
