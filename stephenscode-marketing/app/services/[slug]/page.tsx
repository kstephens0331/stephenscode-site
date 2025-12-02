import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allAddOns } from '@/lib/addons-data'
import { serviceSchema } from '@/lib/schemas'
import Breadcrumbs from '@/components/Breadcrumbs'

// Combine all services
const allServices = [...corePackages, ...premiumBuilds, ...allAddOns]

// Generate static params for all service pages
export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

// Generate metadata for each service page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = allServices.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.seoKeywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = allServices.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  // Get related services (same category, excluding current)
  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3)

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service.name, service.price.toString()))
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Services', href: '/services' },
          { name: service.name, href: `/services/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-accent-500/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-accent-500/30 mb-8 animate-fade-in-up animation-delay-200">
              {service.category}
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-400">
              {service.name}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 animate-fade-in-up animation-delay-600">
              {service.shortDescription}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in-up animation-delay-800">
              <div className="group rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 px-8 py-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                <span className="block text-sm text-white/90 font-semibold mb-1">Investment</span>
                <p className="text-4xl font-bold text-white">{service.priceLabel}</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm px-8 py-5 border border-white/20">
                <span className="block text-sm text-gray-200 font-semibold mb-1">Timeline</span>
                <p className="text-3xl font-bold text-white">{service.timeline}</p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/contact"
                className="group w-full sm:w-auto rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Get Started Today
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <Link
                href="/pricing"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                View All Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Long Description Section */}
      <section className="bg-white py-24 sm:py-32 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg prose-gray max-w-none">
              {service.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg text-gray-700 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-900 mb-4">
              ✨ What's Included
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Complete Package Features
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need in the {service.name} package.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {service.features.map((feature, index) => (
                <div
                  key={feature}
                  className="group relative flex gap-4 rounded-2xl bg-white p-6 shadow-md border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base leading-7 text-gray-900 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-900 mb-4">
              🎯 Key Benefits
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Why Choose This Service
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              How {service.name} drives real business results.
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="group relative rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg border-2 border-gray-200 hover:border-accent-300 hover:shadow-2xl transition-all hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                  ✓
                </div>
                <p className="text-lg font-bold text-gray-900 leading-relaxed mt-2">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 mb-4">
              🏢 Perfect For
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Ideal Use Cases
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Who benefits most from {service.name}.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.useCases.map((useCase, index) => (
                <div
                  key={useCase}
                  className="group rounded-xl bg-white p-6 shadow-md border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                      <svg
                        className="h-4 w-4 text-primary-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-base leading-6 text-gray-700 font-medium">{useCase}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-900 mb-4">
              📦 Deliverables
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What You'll Receive
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Complete deliverables included with {service.name}.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {service.deliverables.map((deliverable, index) => (
                <div
                  key={deliverable}
                  className="group flex items-start gap-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white p-8 shadow-md border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <p className="text-lg leading-7 text-gray-900 font-semibold mt-2">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-900 mb-4">
                🔗 Related Services
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                You Might Also Like
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Other services that complement {service.name}.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedServices.map((relatedService, index) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="group rounded-3xl border-2 border-gray-200 bg-white p-8 hover:border-primary-300 hover:shadow-2xl transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {relatedService.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {relatedService.shortDescription}
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary-600">{relatedService.priceLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{relatedService.timeline}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:text-accent-600 transition-colors">
                    View Details
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready for {service.name}?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Get a free consultation and custom quote. No obligation, no sales pressure. Let's discuss how {service.name} can transform your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group w-full sm:w-auto rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-900 shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get Your Free Quote
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <a
                href="tel:+19363234527"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (936) 323-4527
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              🎯 Free consultation • ⚡ Fast response • 💰 Transparent pricing
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
