import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Clock, Rocket, Link2, BarChart3,
  MessageSquare, DollarSign, Zap, Target,
  Shield, Phone, ArrowRight, Check,
  Monitor, ShieldCheck, Lock, KeyRound, Building2,
} from 'lucide-react'
import { organizationSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://stephenscode.dev/',
  },
}

// Advanced Schema Markup for Homepage
const homepageSchemas = {
  organization: organizationSchema,
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.stephenscode.dev/#business",
    "name": "StephensCode LLC",
    "image": "https://www.stephenscode.dev/logo.png",
    "telephone": "+1-936-323-4527",
    "email": "kyle@stephenscode.dev",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2378 Strong Horse Dr",
      "addressLocality": "Conroe",
      "addressRegion": "TX",
      "postalCode": "77301",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3119",
      "longitude": "-95.4560"
    },
    "url": "https://www.stephenscode.dev",
    "priceRange": "$250-$7500",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Houston",
        "containedIn": { "@type": "State", "name": "Texas" }
      },
      {
        "@type": "City",
        "name": "Conroe",
        "containedIn": { "@type": "State", "name": "Texas" }
      },
      {
        "@type": "City",
        "name": "The Woodlands",
        "containedIn": { "@type": "State", "name": "Texas" }
      }
    ]
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a custom website cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "StephensCode offers six flat-rate website tiers, all with 90 days of post-launch support. Starter $250 (3-4 page flyer for brand-new businesses). Basic $500 (campaign or landing site). Standard $950 (full 8-12 page small-business website with CMS, the typical entry tier for established businesses). Advanced $2,000 (custom full-stack with admin portal and KPI dashboard). Business System $5,000 (CRM + portals + booking + payments + automation, replaces agencies and SaaS subscriptions). Enterprise Platform $7,500 and up (multi-tenant, SSO, audit logs, workflow builder). Custom SaaS and platform builds quoted as flat-rate projects above that. No hourly billing, no scope-creep invoices."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most websites are completed in 1-2 weeks. Simple sites can be done in 3-5 days, while complex e-commerce or premium builds may take 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you serve businesses outside Houston?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! While we're based in Conroe, TX and serve the greater Houston area, we work with clients nationwide through remote collaboration."
        }
      }
    ]
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.stephenscode.dev"
      }
    ]
  }
}

export default function Home() {
  const packages = [
    {
      name: 'Starter',
      price: '$250',
      description: 'For a brand-new business that just needs to exist online. A clean 3-4 page flyer so you show up looking professional.',
      features: ['3-4 pages', 'Mobile responsive', 'Contact form + email routing', 'Basic on-page SEO', '90 days post-launch support'],
      delivery: '5-7 business days',
      href: '/services/plug-and-play',
      popular: false,
    },
    {
      name: 'Basic',
      price: '$500',
      description: 'Campaign sites, single-product landings, small operations that don’t need a back end. Built to convert.',
      features: ['5-7 pages', 'Lead form + auto-replies', 'Basic SEO + analytics', '1 round of revisions', '90 days post-launch support'],
      delivery: '7-10 business days',
      href: '/contact',
      popular: false,
    },
    {
      name: 'Standard',
      price: '$950',
      description: 'A full small-business website that works for you. Real SEO foundation, CMS you can edit yourself, real analytics.',
      features: ['8-12 pages, custom design', 'CMS for self-service edits', 'SEO foundation + GA4', 'Contact + lead forms', '2 rounds of revisions', '90 days post-launch support'],
      delivery: '10-14 business days',
      href: '/services/standard-website',
      popular: true,
    },
    {
      name: 'Advanced',
      price: '$2,000',
      description: 'Custom full-stack site with an admin behind it. See your leads, customers, and KPIs — not just publish pages.',
      features: ['Custom full-stack, up to 10 pages', 'Admin portal + KPI dashboard (lite)', 'CMS, conversion-focused UX', 'SEO + GA4 events', '2 rounds of revisions', '90 days post-launch support'],
      delivery: '2-3 weeks',
      href: '/services/premium-build',
      popular: false,
    },
    {
      name: 'Business System',
      price: '$5,000',
      description: 'Replaces your agency, your scheduler, your invoicing tool, and your spreadsheet. A real system, built once, owned by you.',
      features: ['CRM + customer/staff portals', 'Booking, invoicing, Stripe payments', 'Automation + dashboards/exports', 'Third-party integrations (QB, Google, SMS)', 'Role-based access + branded PDF', '90 days post-launch support'],
      delivery: '4-6 weeks',
      href: '/custom-solutions',
      popular: false,
    },
    {
      name: 'Enterprise Platform',
      price: '$7,500+',
      description: 'Multi-location, multi-tenant, SSO, audit trail. For franchises and operations outgrowing off-the-shelf SaaS.',
      features: ['Multi-tenant architecture', 'SSO (optional) + audit logs', 'Workflow builder + automations', 'CI-ready, staging/sandbox', 'Performance budgets + monitoring', '90 days post-launch support + roadmap workshop'],
      delivery: '8-12 weeks',
      href: '/custom-solutions',
      popular: false,
    },
  ]

  const stats = [
    { label: 'Years Experience', value: '14+', Icon: Clock },
    { label: 'Projects Delivered', value: '2,600+', Icon: Rocket },
    { label: 'API Integrations', value: '200+', Icon: Link2 },
    { label: 'Web Scraping Jobs', value: '500+', Icon: BarChart3 },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We discuss your business, goals, and requirements. No sales pressure, just honest advice.',
      Icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Transparent Quote',
      description: 'You get a clear, flat-rate price before we start. No hourly rates, no surprise bills.',
      Icon: DollarSign,
    },
    {
      number: '03',
      title: 'Fast Development',
      description: 'Most sites completed in 1-2 weeks. We keep you updated throughout the process.',
      Icon: Zap,
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Your site goes live with training and documentation. Post-launch support included.',
      Icon: Target,
    },
  ]

  const testimonials = [
    {
      quote: "StephensCode built our complete scheduling and workflow automation platform. The system handles everything from client bookings to automated reminders seamlessly.",
      author: "CalenFlow Team",
      company: "CalenFlow",
      result: "Full automation platform"
    },
    {
      quote: "Kyle developed our secure VPN management platform with advanced authentication and monitoring. The system is rock-solid and handles our enterprise clients flawlessly.",
      author: "SACVPN Team",
      company: "SACVPN",
      result: "Enterprise-grade security"
    },
    {
      quote: "Our online gaming safety platform was built exactly to spec. StephensCode delivered a powerful system that streamlines our entire operation.",
      author: "SentinelForge Team",
      company: "SentinelForge - Online Gaming Safety",
      result: "Platform protecting gamers"
    }
  ]

  const serviceAreas = [
    'Houston', 'Conroe', 'The Woodlands', 'Spring',
    'Tomball', 'Magnolia', 'Kingwood', 'Humble',
    'Montgomery', 'Willis', 'Porter', 'New Caney'
  ]

  return (
    <>
      {/* Advanced Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.breadcrumb) }}
      />

      {/* Hero — clean professional dark with the bracket motif from the logo */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        {/* Soft vertical sheen — barely there, gives the canvas depth without halo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Brand tagline eyebrow — bracket motif lifted from the logo */}
            <div className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Custom-Built &middot; Fully Yours &middot; Veteran Owned</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.02] animate-fade-in-up animation-delay-200">
              Flat-rate websites.
              <span className="block text-primary-500 mt-2">No hourly games.</span>
              <span className="block text-gray-500 mt-2">No surprise bills.</span>
            </h1>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              I&apos;m Kyle. I&apos;ve been building websites and custom software for small businesses out of Conroe, Texas for 14 years. You get a flat quote up front, you get the site you paid for, and you get my cell number if anything breaks. That&apos;s it. No retainer games, no agency layers.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Get a Flat Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                See What It Costs
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-base font-semibold text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                (936) 323-4527
              </a>
            </div>

            {/* Trust row — facts, plainly stated, separated by hairlines */}
            <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 animate-fade-in-up animation-delay-800">
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Built since</dt>
                <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">2011</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Projects shipped</dt>
                <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">2,600+</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Standard site</dt>
                <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">$950</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Based in</dt>
                <dd className="mt-1.5 text-3xl font-semibold text-white tracking-tight">Conroe, TX</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black border-y border-surface-border py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Track Record</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fourteen years. Twenty-six hundred sites.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.Icon
              return (
                <div key={stat.label} className="flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="order-first text-4xl font-bold tracking-tight text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm leading-7 text-gray-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border" id="packages">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Flat-Rate Pricing</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pick a tier. That&apos;s the price.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Every package is one number, paid up front (or split). No hourly billing, no scope-creep invoices, no retainer required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl p-7 card-lift ${
                  pkg.popular
                    ? 'bg-surface-card ring-2 ring-primary-500'
                    : 'bg-surface-card ring-1 ring-surface-border'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-7">
                    <div className="rounded-full bg-primary-500 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Most picked
                    </div>
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-white">{pkg.price}</span>
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
                  <span className="text-xs uppercase tracking-wider text-gray-500">Delivery {pkg.delivery}</span>
                  <Link
                    href={pkg.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Above-the-tier custom band */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-dashed border-surface-border p-8 text-center">
            <h3 className="text-lg font-semibold text-white">Above this — let&apos;s talk</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              SaaS Phase 1 builds, profit-share platforms, custom products. I&apos;ll scope it and quote you a flat number. No hourly billing, ever.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Scope my project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/custom-solutions"
                className="text-sm font-semibold text-gray-300 hover:text-primary-400 transition-colors"
              >
                See custom platforms I&apos;ve built →
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-base font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            >
              View complete pricing &amp; add-ons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="bg-surface-card border-y border-surface-border text-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 mb-3">
              Managed IT &amp; Cybersecurity
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
              { name: 'SACVPN', price: 'Per User', description: 'Enterprise VPN with military-grade encryption.', Icon: KeyRound, href: 'https://sacvpn.com', value: 'Zero-Log Policy', external: true },
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
                  const className = 'group block rounded-lg bg-surface border border-surface-border p-6 hover:border-primary-500/60 transition-colors'
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
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:bg-surface transition-colors"
            >
              View all IT services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>How It Works</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Four steps from call to launch.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Consultation, flat quote, build, hand-off. No status meetings. No retainer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.Icon
              return (
                <div key={step.number} className="relative group">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-500/10 -translate-x-1/2"></div>
                  )}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-primary-500 bg-black text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>
                    <div className="absolute top-0 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-400 text-black text-sm font-bold shadow-lg ring-2 ring-surface">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-card border-b border-surface-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Built For Real Businesses</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A few of the platforms I&apos;ve shipped.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="bg-surface-elevated rounded-2xl ring-1 ring-surface-border shadow-xl shadow-black/40 p-8 hover:ring-primary-500/50 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-300 italic mb-6 text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-surface-border pt-4">
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400 mb-2">{testimonial.company}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>{testimonial.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface transition-colors"
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
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Greater Houston</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              I work with businesses across Texas.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Based in Conroe. On-site when it matters. Remote when it doesn&apos;t.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((city) => (
              <div key={city} className="group relative rounded-md bg-surface-card ring-1 ring-surface-border p-5 text-center card-lift">
                <p className="relative text-base font-semibold text-white group-hover:text-primary-400 transition-colors">{city}</p>
                <p className="relative text-xs text-gray-500 mt-0.5">Web development</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              <strong className="text-white">Not in your area?</strong> We work with clients nationwide through remote collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA — plain, sober, no brand moment */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to talk?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Send me a few details about what you need and I&apos;ll get back to you with a flat quote. No sales calls, no pressure.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get a Flat Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+19363234527"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:bg-surface-card transition-colors"
            >
              <Phone className="h-4 w-4" />
              (936) 323-4527
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
