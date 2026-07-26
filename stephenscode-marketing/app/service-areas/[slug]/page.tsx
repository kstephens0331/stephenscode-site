import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serviceAreas, getServiceAreaBySlug, getAllServiceAreaSlugs } from '@/lib/service-areas-data'
import { getServiceAreaContent } from '@/lib/service-area-content'
import Breadcrumbs from '@/components/Breadcrumbs'

interface ServiceAreaPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return { title: 'Service Area Not Found' }
  }

  return {
    title: `${area.name} Web Developer | Websites from $250`,
    description: `Web developer serving ${area.name}, TX. Flat-rate custom websites from $250, no hidden fees. Veteran-owned. Call (936) 323-4527.`,
    alternates: {
      canonical: `/service-areas/${slug}`,
    },
    keywords: [
      `web developer ${area.name}`,
      `website design ${area.name} TX`,
      `${area.name} web development`,
      `custom website ${area.name}`,
      `small business website ${area.name}`,
    ],
    openGraph: {
      images: ['/opengraph-image'],
      title: `${area.name} Web Developer | Custom Websites from $250`,
      description: `Professional websites for ${area.name} businesses. Flat-rate pricing, fast turnaround, veteran-owned.`,
      url: `https://www.stephenscode.dev/service-areas/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${area.name} Web Developer | Custom Websites from $250`,
      description: `Professional websites for ${area.name} businesses. Flat-rate pricing, fast turnaround, veteran-owned.`,
      images: ['/twitter-image'],
    },
  }
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  const markdownContent = await getServiceAreaContent(slug)

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Web Development Services in ${area.name}, TX`,
    description: `Professional web development, SEO, and e-commerce services for businesses in ${area.name}, Texas. Custom websites starting at $250.`,
    url: `https://www.stephenscode.dev/service-areas/${slug}`,
    provider: {
      '@id': 'https://www.stephenscode.dev/#organization',
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: area.county,
      },
    },
  }

  const otherAreas = serviceAreas.filter((a) => a.slug !== slug && a.region === area.region).slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Service Areas', href: '/service-areas' },
          { name: area.name, href: `/service-areas/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
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
            Professional Web Development in {area.name}, Texas
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl">
            Custom websites, local SEO, and e-commerce solutions for {area.name} businesses.
            Veteran-owned with 14+ years of experience and transparent flat-rate pricing starting at $250.
            {area.distanceFromConroe !== 'Home base' && ` ${area.distanceFromConroe} from our Conroe office.`}
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
      </section>

      {/* Unique markdown content if available, otherwise a data-driven template */}
      {markdownContent ? (
        <section className="bg-surface py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-400 prose-li:text-gray-400 prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: markdownContent.content }}
            />
          </div>
        </section>
      ) : (
        <section className="bg-surface py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg prose-invert max-w-none prose-p:text-gray-400 prose-p:leading-8 prose-headings:text-white">
              <h2>Why {area.name} Businesses Need a Professional Website</h2>
              <p>
                Your website is often the first impression potential customers have of your {area.name} business.
                Whether you&apos;re a contractor, a professional service provider, or a retailer looking to grow
                your customer base, a professionally built website is essential to compete online.
              </p>
              <p>
                {area.description}
              </p>
              <p>
                Based in nearby Conroe{area.distanceFromConroe !== 'Home base' ? ` (${area.distanceFromConroe} away)` : ''},
                we understand the {area.county} market and what it takes for local businesses to stand out here.
              </p>
              <h3>Industries We Serve in {area.name}</h3>
              <p>
                We&apos;ve built websites for {area.businessTypes.slice(0, 5).join(', ')}, and other local businesses
                throughout {area.name}.
              </p>
              {area.localFeatures.length > 0 && (
                <>
                  <h3>What Makes {area.name} Unique</h3>
                  <ul>
                    {area.localFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              {area.neighborhoods && area.neighborhoods.length > 0 && (
                <p>
                  We serve businesses throughout {area.name}, including {area.neighborhoods.slice(0, 5).join(', ')}.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pricing recap */}
      <section className="bg-surface-card py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
            Flat-Rate Pricing for {area.name} Businesses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Plug and Play', price: '$250' },
              { name: 'Website Rebuild', price: '$350' },
              { name: 'Standard Website', price: '$950' },
              { name: 'E-Commerce Website', price: '$1,100' },
            ].map((tier) => (
              <div key={tier.name} className="bg-surface rounded-2xl p-6 text-center shadow-lg shadow-black/20">
                <p className="text-sm text-gray-400 mb-2">{tier.name}</p>
                <p className="text-2xl font-bold text-accent-400">{tier.price}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-semibold text-primary-600 hover:text-primary-400">
              See full pricing and premium builds →
            </Link>
          </p>
        </div>
      </section>

      {/* Nearby areas */}
      {otherAreas.length > 0 && (
        <section className="bg-surface py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Nearby Service Areas</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {otherAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/service-areas/${a.slug}`}
                  className="block bg-surface-card rounded-xl p-4 text-center text-gray-300 hover:text-primary-400 shadow-md shadow-black/20 transition-colors"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Grow Your {area.name} Business Online?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Free consultation, transparent pricing, veteran-owned quality.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Started
              </Link>
              <Link href="/pricing" className="text-base font-semibold leading-7 text-white hover:text-gray-200">
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
