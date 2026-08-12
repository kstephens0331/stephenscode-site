import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Phone, ArrowRight, Check,
  Monitor, ShieldCheck, Lock, KeyRound, Building2,
} from 'lucide-react'
import PhoneLink from '@/components/PhoneLink'
import TrackedCtaLink from '@/components/TrackedCtaLink'
import BrowserFrame from '@/components/BrowserFrame'
import ClientNameBand from '@/components/ClientNameBand'
import HeroShell from '@/components/home/HeroShell'
import { corePackages, premiumBuilds } from '@/lib/services-data'
export const metadata: Metadata = {
  title: 'Conroe Web Developer | Custom Websites & Business Systems',
  description: 'Veteran owned web developer in Conroe, TX serving Houston. Flat-rate custom websites and business systems from $250. Call (936) 323-4527.',
  alternates: {
    canonical: 'https://www.stephenscode.dev/',
  },
}

export default function Home() {
  const allHomeServices = [...corePackages, ...premiumBuilds]
  const getService = (slug: string) => {
    const service = allHomeServices.find((s) => s.slug === slug)
    if (!service) {
      throw new Error(`Homepage package references unknown service slug: ${slug}`)
    }
    return service
  }

  // Price, delivery timeline, and detail-page href are sourced from lib/services-data.ts
  // (the single source of truth) so they can never drift from the real service pages.
  // Standard leads the array so it takes the featured two-column slot in the grid.
  const packages = [
    {
      name: 'Standard',
      slug: 'standard-website',
      description: 'A full small-business website that works for you. Real SEO foundation, CMS you can edit yourself, real analytics.',
      features: ['8-12 pages, custom design', 'CMS for self-service edits', 'SEO foundation + GA4', 'Contact + lead forms', '2 rounds of revisions', '90 days post-launch support'],
      popular: true,
    },
    {
      name: 'Starter',
      slug: 'plug-and-play',
      description: 'For a brand-new business that just needs to exist online. A clean 3-4 page flyer so you show up looking professional.',
      features: ['3-4 pages', 'Mobile responsive', 'Contact form + email routing', 'Basic on-page SEO', '90 days post-launch support'],
      popular: false,
    },
    {
      name: 'Premium Build',
      slug: 'premium-build',
      description: 'Custom full-stack site with an admin behind it. See your leads, customers, and KPIs, not just publish pages.',
      features: ['Custom full-stack, up to 15 pages', 'Admin portal + KPI dashboard (lite)', 'CMS, conversion-focused UX', 'SEO + GA4 events', '2 rounds of revisions', '90 days post-launch support'],
      popular: false,
    },
    {
      name: 'Business System',
      slug: 'custom-business-platform',
      description: 'Replaces your agency, your scheduler, your invoicing tool, and your spreadsheet. A real system, built once, owned by you.',
      features: ['CRM + customer/staff portals', 'Booking, invoicing, Stripe payments', 'Automation + dashboards/exports', 'Third-party integrations (QB, Google, SMS)', 'Role-based access + branded PDF', '90 days post-launch support'],
      popular: false,
    },
    {
      name: 'Enterprise Platform',
      slug: 'enterprise-platform',
      description: 'Multi-location, multi-tenant, SSO, audit trail. For franchises and operations outgrowing off-the-shelf SaaS.',
      features: ['Multi-tenant architecture', 'SSO (optional) + audit logs', 'Workflow builder + automations', 'CI-ready, staging/sandbox', 'Performance budgets + monitoring', '90 days post-launch support + roadmap workshop'],
      popular: false,
    },
  ].map((pkg) => {
    const service = getService(pkg.slug)
    return {
      ...pkg,
      price: service.priceLabel,
      delivery: service.timeline,
      href: `/services/${service.slug}`,
    }
  })

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'You tell me about your business and what you actually need. If a $250 site covers it, I will not quote you a $950 one.',
    },
    {
      number: '02',
      title: 'Transparent Quote',
      description: 'You get a clear, flat-rate price before we start. No hourly rates, no surprise bills.',
    },
    {
      number: '03',
      title: 'Fast Development',
      description: 'Most sites take 1-2 weeks. I send progress updates as I go; you never have to chase me for status.',
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Your site goes live with training and documentation. Post-launch support included.',
    },
  ]

  // Real clients with real screenshots on disk; outcome lines match the
  // documented results published on /work. Never invent an outcome here.
  const featuredClients = [
    {
      name: 'AMW Air Conditioning',
      src: '/images/portfolio/amw-air-conditioning.png',
      url: 'amwairconditioning.com',
      outcome: '76 Google reviews within their first two years in business',
    },
    {
      name: 'Lefty Cartel',
      src: '/images/portfolio/lefty-cartel.png',
      url: 'leftycartel.net',
      outcome: 'Started generating revenue within 30 days of launch',
    },
    {
      name: 'Terracotta Construction',
      src: '/images/portfolio/terracotta-construction.png',
      url: 'terracottaconstruction.com',
      outcome: 'Ground-up rebuild replacing a site with a documented 18% Ahrefs health score',
    },
  ]

  const serviceAreas = [
    { name: 'Houston', slug: 'houston' },
    { name: 'Conroe', slug: 'conroe' },
    { name: 'The Woodlands', slug: 'the-woodlands' },
    { name: 'Spring', slug: 'spring' },
    { name: 'Tomball', slug: 'tomball' },
    { name: 'Magnolia', slug: 'magnolia' },
    { name: 'Kingwood', slug: 'kingwood' },
    { name: 'Humble', slug: 'humble' },
    { name: 'Montgomery', slug: 'montgomery' },
    { name: 'Willis', slug: 'willis' },
    { name: 'Porter', slug: 'porter' },
    { name: 'New Caney', slug: 'new-caney' },
    { name: 'Katy', slug: 'katy' },
  ]

  return (
    <>
      {/* Hero -- HeroShell owns the section chrome (Build Grid canvas + scroll-
          scrubbed 3D exit); everything inside stays server-rendered for SEO/LCP. */}
      <HeroShell>
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {/* Brand tagline eyebrow -- bracket motif lifted from the logo,
                  full JetBrains Mono lockup (400/500 loaded, so font-medium) */}
              <div className="mb-10 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500 animate-fade-in-up">
                <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
                <span>Custom-Built &middot; Fully Yours &middot; Veteran Owned</span>
                <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
              </div>

              <h1 className="font-display text-display font-bold text-white animate-fade-in-up animation-delay-200">
                Flat-rate web design for Houston-area businesses.
                <span className="block text-primary-500 mt-2">No hourly games.</span>
                <span className="block text-gray-500 mt-2">No surprise bills.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-7 text-gray-300 sm:mt-10 sm:text-lg sm:leading-8 animate-fade-in-up animation-delay-400">
                StephensCode is a veteran-owned web development company in Conroe, Texas. I&apos;m Kyle. I&apos;ve built custom websites and business systems for Houston-area small businesses for 14 years. You get a flat quote up front, the site you paid for, and my cell number if anything breaks.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-600">
                <TrackedCtaLink
                  href="/contact"
                  cta="Get a Flat Quote"
                  location="homepage_hero"
                  className="group btn-primary w-full px-6 py-3 text-base sm:w-auto"
                >
                  Get a Flat Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </TrackedCtaLink>
                <Link
                  href="/pricing"
                  className="btn-secondary w-full px-6 py-3 text-base sm:w-auto"
                >
                  See What It Costs
                </Link>
                <PhoneLink
                  location="homepage_top"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-gray-400 hover:text-primary-400 transition-colors duration-200 sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  (936) 323-4527
                </PhoneLink>
              </div>
            </div>

            {/* Real client work, framed like product, in viewport one */}
            <div className="relative hidden lg:block">
              <BrowserFrame
                src="/images/portfolio/lefty-cartel.png"
                alt="Lefty Cartel e-commerce website built by StephensCode"
                url="leftycartel.net"
                sizes="(min-width: 1024px) 34vw, 0px"
                className="absolute -top-10 -right-4 w-[85%] opacity-50"
              />
              <BrowserFrame
                src="/images/portfolio/amw-air-conditioning.png"
                alt="AMW Air Conditioning website built by StephensCode"
                url="amwairconditioning.com"
                priority
                sizes="(min-width: 1024px) 40vw, 0px"
                className="relative mt-14 w-[92%]"
              />
            </div>
          </div>

          {/* Trust row -- facts, plainly stated, separated by hairlines */}
          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 animate-fade-in-up animation-delay-800">
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Built since</dt>
              <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">2011</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Projects shipped</dt>
              <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">200+</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Standard site</dt>
              <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">$950</dd>
            </div>
            <div className="border-l border-primary-500/40 pl-4">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Based in</dt>
              <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight text-white">Conroe, TX</dd>
            </div>
          </dl>
        </div>
      </HeroShell>

      {/* Real client roster -- replaces the old stats section, which restated
          the hero trust row 400px below it */}
      <ClientNameBand />

      {/* Packages Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border" id="packages">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 reveal-rise">
            <div className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500">
              <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
              <span>Flat-Rate Pricing</span>
              <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              Pick a tier. That&apos;s the price.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Every package is one number, paid up front (or split). No hourly billing, no scope-creep invoices, no ongoing fees required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) =>
              pkg.popular ? (
                <article
                  key={pkg.name}
                  className="relative flex flex-col rounded-2xl p-7 card-lift reveal-card bg-surface-card border-2 border-primary-500 [--card-hover-border:#ef4e22] shadow-glow-primary md:col-span-2 lg:col-span-2"
                >
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {pkg.description}
                      </p>
                      <ul role="list" className="mt-5 space-y-2 text-sm leading-6 text-gray-300">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex gap-x-2.5">
                            <Check className="h-4 w-4 flex-none mt-1 text-primary-500" strokeWidth={2.5} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between lg:border-l lg:border-surface-border lg:pl-8">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-400">
                          Most picked
                        </p>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="font-display font-expanded text-5xl font-display font-bold tracking-tight tabular-nums text-white">{pkg.price}</span>
                          {!pkg.price.includes('+') && (
                            <span className="text-xs text-gray-500">flat</span>
                          )}
                        </div>
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-gray-500">Delivery {pkg.delivery}</p>
                      </div>
                      <Link
                        href={pkg.href}
                        aria-label={`Learn more about ${pkg.name}`}
                        className="group btn-primary mt-8 w-full px-5 py-2.5 text-sm"
                      >
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={pkg.name}
                  className="relative flex flex-col rounded-2xl p-7 card-lift reveal-card bg-surface-card border border-surface-border"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold tracking-tight tabular-nums text-white">{pkg.price}</span>
                      {!pkg.price.includes('+') && (
                        <span className="text-xs text-gray-500">flat</span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {pkg.description}
                  </p>

                  <ul role="list" className="mt-5 space-y-2 text-sm leading-6 text-gray-300 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex gap-x-2.5">
                        <Check className="h-4 w-4 flex-none mt-1 text-primary-500" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-surface-border pt-4">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-gray-500">Delivery {pkg.delivery}</span>
                    <Link
                      href={pkg.href}
                      aria-label={`Learn more about ${pkg.name}`}
                      className="group inline-flex items-center gap-1 py-3 -my-3 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Above-the-tier custom band */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-dashed border-surface-border p-8 text-center reveal-rise">
            <h3 className="text-lg font-semibold text-white">Above this, let&apos;s talk</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              SaaS Phase 1 builds, profit-share platforms, custom products. I&apos;ll scope it and quote you a flat number. No hourly billing, ever.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <TrackedCtaLink
                href="/contact"
                cta="Get a Flat Quote"
                location="homepage_custom_band"
                className="group btn-primary px-5 py-2.5 text-sm"
              >
                Get a Flat Quote
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </TrackedCtaLink>
              <Link
                href="/custom-solutions"
                className="group inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-gray-300 hover:text-primary-400 transition-colors"
              >
                See custom platforms I&apos;ve built
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 py-2.5 -my-2.5 text-base font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            >
              View complete pricing &amp; add-ons
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="bg-surface-card border-y border-surface-border text-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-14 reveal-rise">
            <div className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-500 mb-3">
              Managed IT &amp; Cybersecurity
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              IT support that protects your business
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Helpdesk, monitoring, backup, EDR, training. Per-user pricing, month-to-month, no surprise charges.
            </p>
          </div>

          {(() => {
            const itServices: ReadonlyArray<{
              name: string; price: string; description: string;
              Icon: typeof Monitor; href: string; value: string; external?: boolean;
            }> = [
              { name: 'Essential IT', price: '$99/user/mo', description: 'Helpdesk, monitoring, email security and password manager.', Icon: Monitor, href: '/msp/essential-it', value: '$125+ value' },
              { name: 'Business Pro', price: '$129/user/mo', description: 'Full IT plus backup, dark web monitoring and MFA.', Icon: ShieldCheck, href: '/msp/business-pro', value: '$175+ value' },
              { name: 'Complete IT', price: '$179/user/mo', description: 'IT and security with EDR, SIEM and training.', Icon: Lock, href: '/msp/complete-it', value: '$230+ value' },
              { name: 'SACVPN', price: 'Per User', description: 'Our own zero-log VPN, built and operated in-house.', Icon: KeyRound, href: 'https://sacvpn.com', value: 'Zero-Log Policy', external: true },
              { name: 'Enterprise', price: 'Custom', description: '24/7 support, dedicated team, full compliance.', Icon: Building2, href: '/msp/enterprise-it-solutions', value: '50+ users' },
            ]
            return (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {itServices.map((s) => {
                  const Icon = s.Icon
                  const inner = (
                    <>
                      <Icon className="h-6 w-6 text-primary-500 mb-4" strokeWidth={1.75} />
                      <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                      <p className="mt-1 text-sm text-primary-400 font-semibold">{s.price}</p>
                      <p className="text-xs text-gray-500 mb-3">{s.value}</p>
                      <p className="text-sm leading-6 text-gray-400">{s.description}</p>
                      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gray-300 group-hover:text-primary-400 transition-colors">
                        {s.external ? 'Visit site' : 'Learn more'}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </>
                  )
                  const className = 'group block rounded-lg bg-surface border border-surface-border p-6 card-lift reveal-card'
                  return s.external ? (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
                  ) : (
                    <Link key={s.name} href={s.href} className={className}>{inner}</Link>
                  )
                })}
              </div>
            )
          })()}

          <div className="mt-12 text-center">
            <Link
              href="/msp"
              className="btn-secondary px-6 py-3 text-base"
            >
              View all IT services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section -- asymmetric split: sticky header column + hairline
          timeline rail. First non-centered section on the page on purpose. */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 reveal-rise">
                <div className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500">
                  <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
                  <span>How It Works</span>
                  <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
                </div>
                <h2 className="mt-4 font-display text-display-sm font-bold text-white">
                  Four steps from call to launch.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-400">
                  Consultation, flat quote, build, hand-off. No status meetings. No ongoing fees.
                </p>
                <TrackedCtaLink
                  href="/contact"
                  cta="Get a Flat Quote"
                  location="homepage_process"
                  className="group btn-primary mt-8 px-6 py-3 text-base"
                >
                  Get a Flat Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </TrackedCtaLink>
              </div>
            </div>

            <ol className="lg:col-span-8 relative border-l border-surface-border pl-8 sm:pl-10 space-y-12">
              {processSteps.map((step) => (
                <li key={step.number} className="relative reveal-rise">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[43px] sm:-left-[51px] flex h-5 w-5 items-center justify-center rounded-full border border-primary-500 bg-black"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  </span>
                  <p className="font-mono text-xs tracking-[0.18em] text-primary-500">{step.number}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xl leading-7 text-gray-400">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Featured client work -- image-led, real screenshots, documented outcomes */}
      <section className="bg-surface-card border-b border-surface-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 reveal-rise">
            <div className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500">
              <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
              <span>Built For Real Businesses</span>
              <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              Real client work, real numbers.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredClients.map((client) => (
              <article
                key={client.name}
                className="rounded-2xl bg-surface-elevated border border-surface-border card-lift reveal-card p-4"
              >
                <BrowserFrame
                  src={client.src}
                  alt={`${client.name} website built by StephensCode`}
                  url={client.url}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{client.outcome}</p>
                  <Link
                    href="/work"
                    className="group mt-4 inline-flex items-center gap-1 py-3 -my-3 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Read the case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Client proof callout -- real, quantified client outcomes, not just internal tooling */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary-500/30 bg-surface-elevated p-8 text-center reveal-rise">
            <h3 className="text-lg font-semibold text-white">Real client results, not just internal products</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              <strong className="text-white">AMW Air Conditioning</strong> picked up 76 Google reviews within their first two years and hired 2 new employees to keep up with demand. <strong className="text-white">Benefit Builder</strong> grew from roughly $1,000 MRR to $52,000 MRR after we built out their full operating platform.
            </p>
            <div className="mt-5">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 py-3 -my-3 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
              >
                Read the full case studies
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="btn-secondary px-6 py-3 text-base"
            >
              View all case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 reveal-rise">
            <div className="mb-4 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-500">
              <span aria-hidden="true" className="text-primary-500/80">&lt;</span>
              <span>Greater Houston</span>
              <span aria-hidden="true" className="text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              I work with businesses across Texas.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Based in Conroe. On-site when it matters. Remote when it doesn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 reveal-rise">
            {serviceAreas.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="group relative block rounded-md bg-surface-card border border-surface-border p-5 text-center card-lift"
              >
                <p className="relative text-base font-semibold text-white group-hover:text-primary-400 transition-colors">{city.name}</p>
                <p className="relative text-xs text-gray-500 mt-0.5">Web development</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              <strong className="text-white">Not in your area?</strong> We work with clients nationwide through remote collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA -- plain, sober, no brand moment */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center reveal-rise">
          <h2 className="font-display text-display-sm font-bold text-white">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Send me a few details about what you need and I&apos;ll get back to you with a flat quote. No sales calls, no pressure.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group btn-primary w-full px-6 py-3 text-base sm:w-auto"
            >
              Get a Flat Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
            <PhoneLink
              location="homepage_bottom"
              className="btn-secondary w-full px-6 py-3 text-base sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              (936) 323-4527
            </PhoneLink>
          </div>
        </div>
      </section>
    </>
  )
}
