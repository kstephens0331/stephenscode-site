import Link from 'next/link'
import type { Metadata } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { basicAddOns, advancedAddOns } from '@/lib/addons-data'

export const metadata: Metadata = {
  title: 'Houston Web Development | Flat-Rate Small Business Websites from $950',
  description: 'Conroe web developer with flat-rate small business websites from $950. Small business website packages for Houston and The Woodlands. Veteran owned. No hidden fees.',
  keywords: [
    'affordable web design Houston',
    'Conroe web developer',
    'small business website Texas',
    'Houston web development',
    'custom website Houston',
    'veteran owned web developer',
    'The Woodlands web developer',
    'website pricing Houston',
    'web design packages Texas',
    'flat rate website design',
    'cheap website Houston',
    'business website cost',
    'website quote Houston',
    'web developer pricing',
    'e-commerce website cost',
    'Montgomery County web design',
  ],
  openGraph: {
    title: 'Houston Web Development | Flat-Rate Sites from $250, Plus Custom Enterprise Platforms',
    description: 'Six flat-rate website tiers from $250, all with 90 days post-launch support. Standard small business sites at $950. Plus custom enterprise platforms and six-figure software builds, custom quoted. Houston, Conroe, and The Woodlands. Veteran owned. No hourly billing.',
    url: 'https://www.stephenscode.dev/pricing',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/pricing',
  },
}

// Schema markup for pricing/offers
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    ...corePackages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Offer",
        "name": pkg.name,
        "description": pkg.shortDescription,
        "price": pkg.priceLabel.replace('$', '').replace('+', '').replace(',', ''),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "StephensCode LLC"
        }
      }
    })),
    ...premiumBuilds.map((pkg, index) => ({
      "@type": "ListItem",
      "position": corePackages.length + index + 1,
      "item": {
        "@type": "Offer",
        "name": pkg.name,
        "description": pkg.shortDescription,
        "price": pkg.priceLabel.replace('$', '').replace('+', '').replace(',', ''),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "StephensCode LLC"
        }
      }
    }))
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why do you use flat-rate pricing instead of hourly rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flat-rate pricing provides complete transparency and eliminates surprises. You know the exact cost upfront, can budget accurately, and we focus on delivering quality rather than padding hours. Our incentives are aligned - we succeed when you succeed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine packages with add-ons?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Our pricing is modular - start with any core package or premium build, then add any combination of our 40+ add-ons to customize your website to your exact needs and budget."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any hidden fees or recurring costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No hidden fees ever. The price you see is what you pay. Hosting and domain are separate ($120/year) and clearly stated. All maintenance and updates are included in your package."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in the timeline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each package lists its timeline from project start to completion. This includes design, development, revisions, testing, and launch. We provide regular updates throughout and ensure you're 100% satisfied before going live."
      }
    }
  ]
}

export default function PricingPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        {/* Soft vertical sheen — barely there, gives the canvas depth without halo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>100% Transparent Pricing</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl animate-fade-in-up animation-delay-200">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              No hidden fees, no hourly rates, no surprises. Every service has a <span className="font-semibold text-primary-400">flat rate</span> so you know exactly what you're paying before we start.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-400 animate-fade-in-up animation-delay-400">
              Every project is built by <span className="font-semibold text-white">real developers</span> and monitored by our team. Not AI, not an offshore template factory.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Get Free Quote
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-surface py-16 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up border-l border-primary-500/40 pl-4">
              <div className="text-4xl font-bold tracking-tight text-white">$250</div>
              <div className="text-sm text-gray-400 mt-2">Starting Price</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200 border-l border-primary-500/40 pl-4">
              <div className="text-4xl font-bold tracking-tight text-white">40+</div>
              <div className="text-sm text-gray-400 mt-2">Add-On Options</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400 border-l border-primary-500/40 pl-4">
              <div className="text-4xl font-bold tracking-tight text-white">0%</div>
              <div className="text-sm text-gray-400 mt-2">Hidden Fees</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600 border-l border-primary-500/40 pl-4">
              <div className="text-4xl font-bold tracking-tight text-white">8</div>
              <div className="text-sm text-gray-400 mt-2">Package Options</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Packages */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Core Tiers</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Most small businesses land in this band.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Starter through E-Commerce, $250 to $1,100. The Standard tier at $950 is the typical entry for established businesses. Premium tiers below cover Advanced, Business System, and Enterprise Platform builds.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {corePackages.map((pkg, index) => {
              const isPopular = pkg.id === 'standard-business-website'
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-2xl bg-surface-card p-8 card-lift ${
                    isPopular ? 'ring-2 ring-primary-500' : 'ring-1 ring-surface-border'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Most picked
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed">{pkg.shortDescription}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      {pkg.priceLabel}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-400">{pkg.timeline}</p>
                  </div>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300 flex-grow">
                    {pkg.features.slice(0, 6).map((feature) => (
                      <li key={feature} className="flex gap-x-2.5">
                        <svg
                          className="h-5 w-4 flex-none mt-0.5 text-primary-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${pkg.slug}`}
                    className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition-colors ${
                      isPopular
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'border border-surface-border text-white hover:border-primary-500/60 hover:bg-surface-elevated'
                    }`}
                  >
                    View Full Details →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Builds */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Premium Solutions</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Advanced Full-Stack Platforms
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Custom features, admin systems, databases, and scalable infrastructure for serious businesses.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {premiumBuilds.map((pkg) => (
              <div
                key={pkg.id}
                className="relative flex flex-col rounded-2xl bg-surface-elevated p-8 ring-1 ring-surface-border card-lift"
              >
                <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{pkg.shortDescription}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {pkg.priceLabel}
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-400">{pkg.timeline}</p>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300 flex-grow">
                  {pkg.features.slice(0, 7).map((feature) => (
                    <li key={feature} className="flex gap-x-2.5">
                      <svg
                        className="h-5 w-4 flex-none mt-0.5 text-primary-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${pkg.slug}`}
                  className="mt-8 block rounded-md bg-primary-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                >
                  Explore Premium Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Overview */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>40+ Add-Ons Available</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Customize Your Website
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Enhance any package with powerful features. Mix and match to build your perfect website.
            </p>
          </div>

          {/* Basic Add-Ons Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Basic Add-Ons</h3>
              <span className="text-sm text-gray-400">{basicAddOns.length} options</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {basicAddOns.slice(0, 4).map((addon) => (
                <Link
                  key={addon.id}
                  href={`/services/${addon.slug}`}
                  className="group rounded-xl border border-surface-border bg-surface-card p-6 hover:border-primary-500/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {addon.name}
                    </h4>
                    <p className="text-lg font-bold text-white">{addon.priceLabel}</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{addon.shortDescription}</p>
                  <div className="mt-4 text-sm font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                    Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
            {basicAddOns.length > 4 && (
              <div className="mt-8 text-center">
                <p className="text-gray-400">+ {basicAddOns.length - 4} more basic add-ons available</p>
              </div>
            )}
          </div>

          {/* Advanced Add-Ons Preview */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Advanced Add-Ons</h3>
              <span className="text-sm text-gray-400">{advancedAddOns.length} options</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {advancedAddOns.slice(0, 6).map((addon) => (
                <Link
                  key={addon.id}
                  href={`/services/${addon.slug}`}
                  className="group rounded-xl border border-surface-border bg-surface-card p-6 hover:border-primary-500/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {addon.name}
                    </h4>
                    <p className="text-xl font-bold text-white">{addon.priceLabel}</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{addon.shortDescription}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{addon.timeline}</span>
                    <span className="font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                      Details <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {advancedAddOns.length > 6 && (
              <div className="mt-8 text-center">
                <p className="text-gray-400">+ {advancedAddOns.length - 6} more advanced add-ons available</p>
              </div>
            )}
          </div>

          {/* View All Add-Ons CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/pricing/add-ons"
              className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              View All 40+ Add-Ons
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Just starting out — new business help */}
      <section className="bg-surface py-20 border-b border-surface-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl bg-surface-card p-10 ring-1 ring-surface-border">
            <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-5">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Just Starting Out?</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              New business? We want to help.
            </h2>
            <p className="text-lg leading-8 text-gray-300">
              If you are just getting started, reach out. We will help you get a real digital footprint for your business without the big upfront hit. We understand the struggle of a new business, and we can work with you on <span className="font-semibold text-white">monthly payments</span> so cost is not what holds you back.
            </p>
            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors"
              >
                Let&apos;s talk about your start
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="bg-surface-card border-y border-surface-border py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-surface-elevated p-12 ring-1 ring-surface-border">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-6">
                  <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
                  <span>Beyond the Packages</span>
                  <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Enterprise &amp; Custom Platforms
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  The tiers above cover websites. When you need a full operational platform, multi-system integrations, or an ongoing software contract, we build the whole system. We have delivered six-figure platform contracts, each custom scoped and custom quoted.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-surface-card rounded-xl p-6 border border-surface-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Built at Scale</h3>
                      <p className="text-gray-300 text-sm">
                        From advanced integrations to full operational platforms and ongoing contracts. The kind of work that runs into the <strong className="text-white">six figures</strong>, scoped to exactly what you need.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-card rounded-xl p-6 border border-surface-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Fixed Quote</h3>
                      <p className="text-gray-300 text-sm">
                        Your price is locked in upfront. If development takes longer, <strong className="text-white">you don't pay more</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/custom-solutions"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors"
                >
                  Explore Custom Solutions
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Get a detailed quote within 24 hours. No obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Flat-Rate Pricing */}
      <section className="bg-surface py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Why Flat-Rate</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Flat-Rate Pricing?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Transparent pricing that puts you in control of your budget.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-2xl bg-surface-card p-8 ring-1 ring-surface-border card-lift">
                <h3 className="text-xl font-bold text-white mb-3">No Surprises</h3>
                <p className="text-gray-400 leading-relaxed">
                  You know the exact cost upfront. No hourly billing that spirals out of control or unexpected charges at the end.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-card p-8 ring-1 ring-surface-border card-lift">
                <h3 className="text-xl font-bold text-white mb-3">Budget-Friendly</h3>
                <p className="text-gray-400 leading-relaxed">
                  Plan your budget accurately. Mix and match packages and add-ons to get exactly what you need within your budget.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-card p-8 ring-1 ring-surface-border card-lift">
                <h3 className="text-xl font-bold text-white mb-3">Quality Focus</h3>
                <p className="text-gray-400 leading-relaxed">
                  We focus on delivering quality, not padding hours. Flat rates align our incentives - we succeed when you succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Additional benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary-500/40 text-primary-500 flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold mb-1">All-Inclusive Packages</h4>
                <p className="text-sm text-gray-400">Design, development, revisions, testing, and launch all included</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary-500/40 text-primary-500 flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Clear Timelines</h4>
                <p className="text-sm text-gray-400">Every package has a defined timeline so you know when to expect results</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary-500/40 text-primary-500 flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Scalable Solutions</h4>
                <p className="text-sm text-gray-400">Start small and add features later as your business grows</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary-500/40 text-primary-500 flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Dedicated Support</h4>
                <p className="text-sm text-gray-400">Direct access to your developer throughout the entire project</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>FAQ</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pricing Questions?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Get answers to common questions about our pricing and packages.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {/* FAQ Items */}
              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Why do you use flat-rate pricing instead of hourly rates?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Flat-rate pricing provides complete transparency and eliminates surprises. You know the exact cost upfront, can budget accurately, and we focus on delivering quality rather than padding hours. Our incentives are aligned - we succeed when you succeed.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Can I combine packages with add-ons?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Absolutely! Our pricing is modular - start with any core package or premium build, then add any combination of our 40+ add-ons to customize your website to your exact needs and budget.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Are there any hidden fees or recurring costs?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  No hidden fees ever. The price you see is what you pay. Hosting and domain are separate ($120/year) and clearly stated. All maintenance and updates are included in your package.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What is included in the timeline?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Each package lists its timeline from project start to completion. This includes design, development, revisions, testing, and launch. We provide regular updates throughout and ensure you're 100% satisfied before going live.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Do you require payment upfront?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We typically split payments: 50% to start the project, and 50% upon completion before launch. For larger projects over $3,000, we can discuss milestone-based payments to make it more manageable for your cash flow.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What technologies do you use?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We use modern, industry-standard technologies: Next.js and React for frontend, Node.js and Python for backend, PostgreSQL and Firebase for databases, and deploy on reliable platforms like Vercel and Railway. All code is production-ready and follows best practices.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  How many revisions are included?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Each package includes a specific number of revision rounds (listed in the package details). Typically 1-3 rounds depending on the package size. We want you 100% satisfied, so we'll work with you to get it right. Major scope changes may require additional fees.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Do you offer ongoing maintenance and support?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Yes! We offer optional maintenance plans starting at $50-75/month that include updates, security monitoring, backups, and minor content changes. We also provide hourly support for larger updates or changes outside the maintenance scope.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What about hosting and domain costs?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Hosting and domain registration are typically around $120/year total and are billed separately. We handle all setup and configuration. You own your domain and can transfer hosting if needed. We recommend reliable providers we've used for years.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Can I see examples of your work before committing?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Absolutely! Visit our <Link href="/demos" className="text-primary-400 font-semibold hover:text-primary-300">Demos page</Link> to explore 40+ fully interactive website examples across all our packages and industries. You can click around and test every feature.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What if I need custom features not listed?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  No problem! We can build custom features tailored to your specific needs. Just let us know what you're looking for during the consultation, and we'll provide a clear quote for the additional functionality.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Do you provide training on how to update my website?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Yes! Every package includes training documentation and a walkthrough session so you can confidently update content, images, and other elements yourself. We'll teach you everything you need to know, and we're always available if you need help.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What happens if I want to add features later?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Your website is built to grow with your business. You can add any of our 40+ add-ons at any time, or request custom features. We'll provide clear pricing and can typically add new features within 1-2 weeks.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Are your websites mobile-friendly and SEO-optimized?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  100% yes! Every website we build is fully responsive (works perfectly on phones, tablets, and desktops) and includes foundational SEO optimization: meta tags, structured data, sitemaps, fast load times, and clean URLs. This is standard in every package.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Will I own the website and all the code?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Yes! Once the project is completed and paid for, you own 100% of the website, domain, content, and code. We'll provide access to everything, and you're free to maintain it yourself or hire anyone else in the future.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  What if I'm not happy with the final result?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We include multiple revision rounds to ensure you're satisfied. We won't launch until you approve everything. Our 98% client satisfaction rate shows we get it right, but if something isn't working for you, we'll make it right or discuss options.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-8 hover:border-primary-500/60 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">
                  Do you work with clients outside Houston?
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Yes! While we're based in Houston and serve the local area, we work with clients nationwide through remote collaboration via video calls, screen sharing, and project management tools. Location is no barrier to great results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-surface-card py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-3xl bg-surface p-8 md:p-12 shadow-xl border border-surface-border">
            <div className="flex items-center gap-1 text-accent-500 mb-4">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-lg text-white leading-relaxed mb-6 italic">
              "The flat-rate pricing made it so easy to plan our budget. We knew exactly what we were getting and what it would cost - no surprises. We started with the Standard package and added a few key features. The whole process was transparent and straightforward."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-primary-500/40 text-primary-500 flex items-center justify-center font-bold text-lg">
                M
              </div>
              <div>
                <div className="font-semibold text-white">Michael Rodriguez</div>
                <div className="text-sm text-gray-400">Owner, Rodriguez Construction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface border-t border-surface-border">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Get a free consultation and custom quote. We'll help you choose the right package and add-ons for your needs and budget.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Get Your Free Quote
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (936) 323-4527
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Free consultation. Quick response. Transparent pricing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
