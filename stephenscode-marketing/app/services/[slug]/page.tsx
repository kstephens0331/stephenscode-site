import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { corePackages, premiumBuilds, type Service } from '@/lib/services-data'
import Breadcrumbs from '@/components/Breadcrumbs'

const allServices: Service[] = [...corePackages, ...premiumBuilds]

function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug)
}

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    keywords: service.seoKeywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://www.stephenscode.dev/services/${slug}`,
      type: 'website',
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@id': 'https://www.stephenscode.dev/#organization',
    },
    areaServed: {
      '@type': 'State',
      name: 'Texas',
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD',
      url: `https://www.stephenscode.dev/services/${slug}`,
    },
  }

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Services', href: '/services' },
          { name: service.name, href: `/services/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mb-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              All Services
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{service.name}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-3xl">{service.shortDescription}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="text-3xl font-bold text-accent-400">{service.priceLabel}</span>
            <span className="text-sm text-gray-300">Timeline: {service.timeline}</span>
          </div>
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

      {/* Overview */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg prose-invert max-w-none prose-p:text-gray-400 prose-p:leading-8">
            <p>{service.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="bg-surface-card py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">What&apos;s Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-400">
                    <svg className="h-5 w-5 flex-shrink-0 text-accent-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Why It Works</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-gray-400">
                    <svg className="h-5 w-5 flex-shrink-0 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Deliverables */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Who This Is For</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                {service.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">What You Get</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-surface-card py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Other Packages</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block bg-surface rounded-2xl p-6 shadow-lg shadow-black/20 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{s.priceLabel}</p>
                  <p className="text-sm text-gray-400 line-clamp-2">{s.shortDescription}</p>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
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
