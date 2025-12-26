import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { allMSPServices, getMSPServiceBySlug } from '@/lib/msp-services-data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allMSPServices.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getMSPServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | StephensCode',
    }
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.seoKeywords,
  }
}

export default async function MSPServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getMSPServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.longDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "StephensCode LLC",
      "telephone": "+1-936-323-4527",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2378 Strong Horse Dr",
        "addressLocality": "Conroe",
        "addressRegion": "TX",
        "postalCode": "77301",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    ...(service.price > 0 && {
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "USD"
      }
    })
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is included in ${service.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": service.features.slice(0, 5).join('. ') + '.'
        }
      },
      {
        "@type": "Question",
        "name": `How much does ${service.name} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${service.name} is priced at ${service.priceLabel}. Contact us for a detailed quote based on your specific needs.`
        }
      },
      {
        "@type": "Question",
        "name": `Who is ${service.name} best for?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": service.useCases.slice(0, 3).join('. ') + '.'
        }
      }
    ]
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'managed-it': return 'from-blue-600 to-blue-800'
      case 'cybersecurity': return 'from-red-600 to-red-800'
      case 'cloud': return 'from-cyan-600 to-cyan-800'
      case 'support': return 'from-orange-600 to-orange-800'
      default: return 'from-primary-600 to-primary-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'managed-it': return '🖥️'
      case 'cybersecurity': return '🔒'
      case 'cloud': return '☁️'
      case 'support': return '🔧'
      default: return '💼'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${getCategoryColor(service.category)} text-white`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><span>/</span></li>
              <li><Link href="/msp" className="hover:text-white">IT Services</Link></li>
              <li><span>/</span></li>
              <li className="text-white font-medium">{service.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-lg border border-white/20">
                <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                <span className="capitalize">{service.category.replace('-', ' ')}</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-6">
                {service.name}
              </h1>

              <p className="text-xl leading-8 text-white/90 mb-8">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-4">
                  <p className="text-sm text-white/70">Starting at</p>
                  <p className="text-3xl font-black">{service.priceLabel}</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-4">
                  <p className="text-sm text-white/70">Timeline</p>
                  <p className="text-xl font-bold">{service.timeline}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
                >
                  <span>Get Started</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="tel:+19363234527"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  <span>📞 (936) 323-4527</span>
                </a>
              </div>
            </div>

            {/* Quick Features */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
              <ul className="space-y-4">
                {service.features.slice(0, 8).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Service</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{service.longDescription}</p>
              </div>

              {/* All Features */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Feature List</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                      <svg className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-primary-50 border border-primary-100">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Ideal For */}
              <div className="rounded-2xl bg-gray-50 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect For</h3>
                <ul className="space-y-3">
                  {service.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary-600">→</span>
                      <span className="text-gray-600">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="rounded-2xl bg-gray-50 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {service.deliverables.map((deliverable, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="rounded-2xl bg-primary-600 p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-primary-100 mb-6">
                  Contact us for a free consultation and quote tailored to your business needs.
                </p>
                <Link
                  href="/contact"
                  className="block w-full rounded-lg bg-white px-6 py-3 text-center font-bold text-primary-600 hover:bg-gray-100 transition-colors"
                >
                  Contact Us Today
                </Link>
                <p className="text-center mt-4 text-primary-200 text-sm">
                  Or call <a href="tel:+19363234527" className="underline">(936) 323-4527</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is included in {service.name}?</h3>
              <p className="text-gray-600">{service.features.slice(0, 5).join('. ')}.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How much does {service.name} cost?</h3>
              <p className="text-gray-600">{service.name} is priced at {service.priceLabel}. Contact us for a detailed quote based on your specific needs.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Who is {service.name} best for?</h3>
              <p className="text-gray-600">{service.useCases.slice(0, 3).join('. ')}.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How quickly can I get started?</h3>
              <p className="text-gray-600">Our typical timeline for {service.name} is {service.timeline}. Contact us to discuss your specific timeline requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${getCategoryColor(service.category)} text-white`}>
        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl mb-8">
              Let&apos;s Discuss Your IT Needs
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-white/90 mb-12">
              Get a free consultation to see how {service.name} can help your business. No obligation, just honest advice.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-10 py-5 text-xl font-bold text-gray-900 shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                <span>Get Free Quote</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/msp"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>View All IT Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
