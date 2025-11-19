import type { Metadata } from 'next'
import Link from 'next/link'
import { serviceAreas } from '@/lib/service-areas-data'

export const metadata: Metadata = {
  title: 'Service Areas | Web Development Houston, Conroe, The Woodlands',
  description: 'Web development services for Houston, Conroe, The Woodlands, Spring, Katy, Sugar Land, Pearland, Cypress, and surrounding Texas areas. Local, veteran-owned web developer.',
  keywords: [
    'web developer Houston',
    'web design Conroe',
    'website development The Woodlands',
    'web developer near me',
    'Texas web development',
    'Houston area web design',
  ],
}

export default function ServiceAreasPage() {
  // Group areas by general region
  const montgomeryCounty = serviceAreas.filter(a => a.county.includes('Montgomery'))
  const harrisCounty = serviceAreas.filter(a => a.county.includes('Harris') && !a.county.includes('Fort Bend'))
  const otherAreas = serviceAreas.filter(a => !a.county.includes('Montgomery') && !a.county.includes('Harris'))

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Service Areas
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Professional web development serving Greater Houston and surrounding communities.
              Based in Conroe, we build websites for businesses throughout Southeast Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Map/Overview Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Serving {serviceAreas.length}+ Communities
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From our home base in Conroe, we serve businesses throughout the Houston metropolitan area.
              We're happy to meet in person locally or work remotely with clients anywhere.
            </p>
          </div>

          {/* Montgomery County */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
              Montgomery County
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {montgomeryCounty.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group bg-gray-50 rounded-lg p-6 hover:bg-primary-50 transition-colors"
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
                  <p className="mt-3 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Harris County */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
              Harris County & North Houston
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {harrisCounty.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group bg-gray-50 rounded-lg p-6 hover:bg-primary-50 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                    {area.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Population: {area.population}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {area.distanceFromConroe} from Conroe
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Areas */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
              Other Service Areas
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group bg-gray-50 rounded-lg p-6 hover:bg-primary-50 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                    {area.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {area.county}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {area.distanceFromConroe} from Conroe
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          </div>
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
              We serve all of Greater Houston and can work with clients anywhere in Texas and beyond.
              Contact us to discuss your project—we'd love to help.
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
