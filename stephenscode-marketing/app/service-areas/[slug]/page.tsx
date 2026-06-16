import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin, Building2, Users, CheckCircle2, Phone, ArrowRight, Navigation,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  serviceAreas,
  getServiceAreaBySlug,
  getAllServiceAreaSlugs,
  type ServiceArea,
} from '@/lib/service-areas-data'

const BASE_URL = 'https://www.stephenscode.dev'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return {
      title: 'Service Area Not Found | StephensCode LLC',
      description: 'The requested service area could not be found.',
    }
  }

  const canonical = `${BASE_URL}/service-areas/${area.slug}`
  const title = `Web Development in ${area.name}, TX | StephensCode LLC`
  const description = `Professional web development and website design for ${area.name}, ${area.county} businesses. Veteran-owned, flat-rate pricing, and local Conroe-based service. Custom small business websites for ${area.name}, Texas.`

  return {
    title,
    description,
    keywords: [
      `${area.name} web developer`,
      `${area.name} web design`,
      `${area.name} TX website design`,
      `small business website ${area.name}`,
      `web development ${area.county}`,
      'veteran owned web developer',
      'affordable web design Houston',
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  }
}

// Pick 4-6 OTHER nearby cities for the internal-link mesh.
// Prefer same region first, then fill from the rest of the list.
function getNearbyAreas(current: ServiceArea): ServiceArea[] {
  const sameRegion = serviceAreas.filter(
    (a) => a.slug !== current.slug && a.region === current.region
  )
  const otherRegions = serviceAreas.filter(
    (a) => a.slug !== current.slug && a.region !== current.region
  )
  return [...sameRegion, ...otherRegions].slice(0, 6)
}

interface CityFaq {
  question: string
  answer: string
}

function buildFaqs(area: ServiceArea): CityFaq[] {
  const topIndustries = area.businessTypes.slice(0, 3).join(', ')
  return [
    {
      question: `Do you build websites for ${area.name}, TX businesses?`,
      answer: `Yes. StephensCode is a Conroe-based, veteran-owned web developer serving ${area.name} and the rest of ${area.county}. We build fast, professional websites for local businesses including ${topIndustries.toLowerCase()}, and more.`,
    },
    {
      question: `How much does a website cost for a ${area.name} business?`,
      answer: `We use flat-rate pricing with no hourly billing or surprise invoices. Plans start at $250 for a simple site and scale up to full custom builds. Every ${area.name} business gets a clear quote up front. See our pricing page for the full breakdown.`,
    },
    {
      question: `Are you local to ${area.name}?`,
      answer: `We are based in Conroe, about ${area.distanceFromConroe === 'Home base' ? 'right here in town' : `${area.distanceFromConroe} from ${area.name}`}. That means same time zone, same area code, and a developer who understands the ${area.county} market your customers live in.`,
    },
    {
      question: `How long does it take to build a ${area.name} website?`,
      answer: `Most websites are completed in 1 to 4 weeks depending on size and complexity. Simple sites launch in about a week, while larger custom builds take longer. We give every ${area.name} project a firm timeline before we start.`,
    },
    {
      question: `Can you help my existing ${area.name} website rank better in local search?`,
      answer: `Yes. Every site we build is structured for local SEO so ${area.name} customers can find you when they search. We also handle rebuilds of existing sites that are slow, outdated, or not showing up in ${area.county} searches.`,
    },
  ]
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  const nearbyAreas = getNearbyAreas(area)
  const faqs = buildFaqs(area)
  const canonical = `${BASE_URL}/service-areas/${area.slug}`

  // ---- JSON-LD ----
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `StephensCode LLC — Web Development in ${area.name}, TX`,
    url: canonical,
    image: `${BASE_URL}/logo.png`,
    telephone: '+1-936-323-4527',
    email: 'kyle@stephenscode.dev',
    priceRange: '$250-$7500',
    description: `Custom website design and web development for ${area.name}, ${area.county} businesses. Veteran-owned, flat-rate pricing, Conroe-based.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Conroe',
      addressRegion: 'TX',
      postalCode: '77301',
      addressCountry: 'US',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'StephensCode LLC',
      telephone: '+1-936-323-4527',
    },
    areaServed: [
      { '@type': 'City', name: area.name, containedIn: { '@type': 'State', name: 'Texas' } },
      { '@type': 'AdministrativeArea', name: area.county },
    ],
    offers: {
      '@type': 'Offer',
      price: '250',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '250',
        priceCurrency: 'USD',
        minPrice: '250',
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${BASE_URL}/service-areas` },
      { '@type': 'ListItem', position: 3, name: area.name, item: canonical },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      {/* JSON-LD: ProfessionalService + FAQPage. BreadcrumbList from <Breadcrumbs/> below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Service Areas', href: '/service-areas' },
          { name: area.name, href: `/service-areas/${area.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{area.county}, Texas</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Web Development in {area.name}, Texas
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              {area.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-md bg-surface-card px-4 py-2 text-sm text-gray-300 ring-1 ring-surface-border">
                <Users className="mr-2 inline h-4 w-4 text-accent-400" aria-hidden="true" />
                Population {area.population}
              </div>
              <div className="rounded-md bg-surface-card px-4 py-2 text-sm text-gray-300 ring-1 ring-surface-border">
                <Navigation className="mr-2 inline h-4 w-4 text-accent-400" aria-hidden="true" />
                {area.distanceFromConroe === 'Home base'
                  ? 'Our home base'
                  : `${area.distanceFromConroe} from Conroe`}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:9363234527"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (936) 323-4527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods we serve */}
      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <section className="bg-surface py-16 border-b border-surface-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Neighborhoods We Serve in {area.name}
              </h2>
              <p className="mt-4 text-gray-400">
                We build websites for businesses across every part of {area.name}, including these areas:
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {area.neighborhoods.map((hood) => (
                  <span
                    key={hood}
                    className="inline-flex items-center gap-2 rounded-md bg-surface-card px-4 py-2 text-sm text-gray-300 ring-1 ring-surface-border"
                  >
                    <MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />
                    {hood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why City businesses need a professional website */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Why {area.name} Businesses Need a Professional Website
            </h2>
            <p className="mt-4 text-gray-400">
              {area.name} has its own character, and your website should reflect the local market your
              customers live in. Here is what makes this area distinct and where a strong online
              presence pays off.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-surface-card p-6 ring-1 ring-surface-border">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <MapPin className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  What Defines {area.name}
                </h3>
                <ul className="mt-4 space-y-3">
                  {area.localFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-400" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-surface-card p-6 ring-1 ring-surface-border">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Building2 className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Businesses We Help in {area.name}
                </h3>
                <ul className="mt-4 space-y-3">
                  {area.businessTypes.map((type) => (
                    <li key={type} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-400" aria-hidden="true" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flat-rate offering */}
      <section className="bg-surface-card py-16 sm:py-24 border-y border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Flat-Rate Websites for {area.name}, Texas
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              No hourly billing. No surprise invoices. Every {area.name} business gets a clear,
              flat-rate quote up front, with all design, development, mobile optimization, and basic
              SEO included. Plans start at $250.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                View Pricing
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface transition-colors"
              >
                Explore Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* City-specific FAQ */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {area.name} Web Development FAQ
            </h2>
            <div className="mt-10 space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg bg-surface-card p-6 ring-1 ring-surface-border"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby areas we serve — internal link mesh */}
      <section className="bg-surface-card py-16 sm:py-24 border-t border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Nearby Areas We Serve
            </h2>
            <p className="mt-4 text-gray-400">
              StephensCode serves businesses across Greater Houston. Explore web development in these
              communities near {area.name}.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyAreas.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/service-areas/${nearby.slug}`}
                className="group rounded-lg bg-surface p-6 ring-1 ring-surface-border hover:ring-primary-500/50 transition-all"
              >
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white group-hover:text-primary-400">
                  <MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  {nearby.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{nearby.county}</p>
                <p className="mt-3 text-sm font-semibold text-primary-400 group-hover:text-primary-300">
                  Web development in {nearby.name} <span aria-hidden="true">&rarr;</span>
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface transition-colors"
            >
              View All Service Areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Grow Your {area.name} Business Online?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
            Free consultation, transparent flat-rate pricing, and veteran-owned quality for your{' '}
            {area.name} business.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:9363234527"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              (936) 323-4527
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
