import type { Metadata } from 'next'
import Link from 'next/link'
import { serviceAreas, getServiceAreasByRegion } from '@/lib/service-areas-data'

export const metadata: Metadata = {
  title: 'Service Areas | Web Design Houston, Conroe, The Woodlands TX',
  description: 'Web design and IT services across 35+ Houston-area communities. Conroe, The Woodlands, Midtown, Heights, Montrose, Katy, Sugar Land, and more. Veteran-owned.',
  keywords: [
    'Conroe web developer',
    'Houston web development',
    'The Woodlands web developer',
    'Midtown Houston web design',
    'Heights Houston web developer',
    'Montrose web design',
    'Katy web developer',
    'Sugar Land web design',
    'Pinehurst TX web developer',
    'web developer near me',
    'affordable web design Houston',
    'small business website Texas',
    'veteran owned web developer',
  ],
  openGraph: {
    title: 'Service Areas | 35+ Houston Communities Served',
    description: 'Web development and IT services across Greater Houston. From Montgomery County to Galveston Bay.',
    url: 'https://stephenscode.dev/service-areas',
  },
}

export default function ServiceAreasPage() {
  const montgomeryCounty = getServiceAreasByRegion('montgomery')
  const harrisNorth = getServiceAreasByRegion('harris-north')
  const houstonNeighborhoods = getServiceAreasByRegion('houston-neighborhoods')
  const fortBend = getServiceAreasByRegion('fort-bend')
  const galvestonBay = getServiceAreasByRegion('galveston-bay')
  const outlying = getServiceAreasByRegion('outlying')

  const renderAreaCard = (area: typeof serviceAreas[0]) => (
    <Link
      key={area.slug}
      href={`/service-areas/${area.slug}`}
      className="group bg-gray-50 rounded-lg p-6 hover:bg-primary-50 hover:shadow-md transition-all"
    >
      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
        {area.name}
        {area.slug === 'conroe' && (
          <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-0.5 rounded">
            HQ
          </span>
        )}
      </h4>
      <p className="mt-2 text-sm text-gray-600">
        Population: {area.population}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {area.distanceFromConroe} from Conroe
      </p>
      <p className="mt-2 text-xs text-gray-500 line-clamp-2">
        {area.businessTypes.slice(0, 4).join(' · ')}
      </p>
      <p className="mt-3 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
        View details →
      </p>
    </Link>
  )

  const renderSection = (title: string, areas: typeof serviceAreas, description?: string) => {
    if (areas.length === 0) return null
    return (
      <div className="mb-16 last:mb-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2 pb-2 border-b">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mb-6">{description}</p>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map(renderAreaCard)}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Web Development Across Greater Houston
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Conroe-based web developer serving {serviceAreas.length}+ communities from Montgomery County to Galveston Bay.
              Local knowledge, veteran-owned quality, and flat-rate pricing for every neighborhood.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
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

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <dd className="text-3xl font-bold text-primary-600">{serviceAreas.length}+</dd>
              <dt className="text-sm text-gray-600">Communities Served</dt>
            </div>
            <div className="text-center">
              <dd className="text-3xl font-bold text-primary-600">6</dd>
              <dt className="text-sm text-gray-600">Counties Covered</dt>
            </div>
            <div className="text-center">
              <dd className="text-3xl font-bold text-primary-600">14+</dd>
              <dt className="text-sm text-gray-600">Years Experience</dt>
            </div>
            <div className="text-center">
              <dd className="text-3xl font-bold text-primary-600">$250</dd>
              <dt className="text-sm text-gray-600">Starting Price</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* All Service Areas */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              All Service Areas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From our home base in Conroe, we serve businesses throughout the Houston metropolitan area.
              Click any area to see how we can help your local business.
            </p>
          </div>

          {renderSection(
            'Montgomery County — Our Home Turf',
            montgomeryCounty,
            'Based in Conroe, we know Montgomery County inside and out. From Lake Conroe to The Woodlands, we serve businesses across the entire county.'
          )}

          {renderSection(
            'North Houston Suburbs',
            harrisNorth,
            'The fast-growing suburbs north of Houston — from Spring and Tomball to Kingwood and Atascocita.'
          )}

          {renderSection(
            'Houston Neighborhoods',
            houstonNeighborhoods,
            'Distinct Houston neighborhoods, each with their own character and business community.'
          )}

          {renderSection(
            'Fort Bend County',
            fortBend,
            'One of the fastest-growing and most diverse counties in Texas — from Katy to Sugar Land to Richmond.'
          )}

          {renderSection(
            'Galveston Bay & South Houston',
            galvestonBay,
            'The Clear Lake, NASA, and bay area communities south of Houston.'
          )}

          {renderSection(
            'Outlying Areas',
            outlying,
            'Extended service area beyond the immediate Houston metro.'
          )}
        </div>
      </section>

      {/* Not Listed Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Don't See Your City?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We serve all of Greater Houston and work with clients anywhere in Texas and beyond.
              Everything can be done remotely — contact us to discuss your project.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700"
              >
                Contact Us
              </Link>
              <a
                href="tel:9363234527"
                className="text-base font-semibold text-gray-900 hover:text-primary-600"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Free consultation, transparent pricing, and veteran-owned quality for your local business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                View Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
