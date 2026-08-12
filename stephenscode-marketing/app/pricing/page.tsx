import Link from 'next/link'
import type { Metadata } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import PhoneLink from '@/components/PhoneLink'
import BracketEyebrow from '@/components/BracketEyebrow'
import { basicAddOns, advancedAddOns } from '@/lib/addons-data'
import { DollarSign, Target, Rocket, Check, Clock, Star, TrendingUp, ArrowRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Houston Web Development | Flat-Rate Small Business Websites from $250',
  description: 'Conroe web developer with flat-rate websites from $250 for Houston and The Woodlands small businesses. Veteran owned. No hidden fees.',
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
    images: ['/opengraph-image'],
    title: 'Houston Web Development | Seven Flat-Rate Website Tiers, $250 to $7,500+',
    description: 'Seven flat-rate website tiers from $250 to $7,500+, all with 90 days post-launch support. Standard small business sites start at $950. No hourly billing.',
    url: 'https://www.stephenscode.dev/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Web Development | Seven Flat-Rate Website Tiers, $250 to $7,500+',
    description: 'Seven flat-rate website tiers from $250 to $7,500+, all with 90 days post-launch support. Standard small business sites start at $950. No hourly billing.',
    images: ['/twitter-image'],
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
        ...(pkg.price > 0
          ? { "price": pkg.priceLabel.replace('$', '').replace('+', '').replace(',', ''), "priceCurrency": "USD" }
          : {}),
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": "https://www.stephenscode.dev/#organization"
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
        ...(pkg.price > 0
          ? { "price": pkg.priceLabel.replace('$', '').replace('+', '').replace(',', ''), "priceCurrency": "USD" }
          : {}),
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": "https://www.stephenscode.dev/#organization"
        }
      }
    }))
  ]
}

const pricingFaqs = [
  {
    question: 'Why do you use flat-rate pricing instead of hourly rates?',
    answer: "Hourly billing rewards slow work. A flat rate means you know the full cost before I write a line of code, and it puts the pressure where it belongs: on me to build efficiently. If the job takes longer than I quoted, that is my problem, not your bill.",
  },
  {
    question: 'Can I combine packages with add-ons?',
    answer: 'Yes. Pricing is modular: start with any core package or premium build, then add any combination of our 40+ add-ons to customize your website to your exact needs and budget.',
  },
  {
    question: 'Are there any hidden fees or recurring costs?',
    answer: 'No hidden fees ever. The price you see is what you pay. Hosting and domain are separate ($120/year) and clearly stated. All maintenance and updates are included in your package.',
  },
  {
    question: 'What is included in the timeline?',
    answer: "Each package lists its timeline from project start to completion. This includes design, development, revisions, testing, and launch. We provide regular updates throughout and ensure you're 100% satisfied before going live.",
  },
  {
    question: 'Do you require payment upfront?',
    answer: 'We typically split payments: 50% to start the project, and 50% upon completion before launch. For larger projects over $3,000, we can discuss milestone-based payments to make it more manageable for your cash flow.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, industry-standard technologies: Next.js and React for frontend, Node.js and Python for backend, PostgreSQL and Firebase for databases, and deploy on reliable platforms like Vercel and Railway. All code is production-ready and follows best practices.',
  },
  {
    question: 'How many revisions are included?',
    answer: "Each package includes a specific number of revision rounds (listed in the package details). Typically 1-3 rounds depending on the package size. We want you 100% satisfied, so we'll work with you to get it right. Major scope changes may require additional fees.",
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes. We offer optional maintenance plans starting at $50-100/month that include updates, security monitoring, backups, and minor content changes. We also provide hourly support for larger updates or changes outside the maintenance scope.',
  },
  {
    question: 'What about hosting and domain costs?',
    answer: "Hosting and domain registration are typically around $120/year total and are billed separately. We handle all setup and configuration. You own your domain and can transfer hosting if needed. We recommend reliable providers we've used for years.",
  },
  {
    question: 'Can I see examples of your work before committing?',
    answer: 'Yes. Visit our Demos page to explore 40+ fully interactive website examples across all our packages and industries. You can click around and test every feature.',
  },
  {
    question: "What if I need custom features not listed?",
    answer: "Yes. We can build custom features tailored to your specific needs. Just let us know what you're looking for during the consultation, and we'll provide a clear quote for the additional functionality.",
  },
  {
    question: 'Do you provide training on how to update my website?',
    answer: "Yes. Every package includes training documentation and a walkthrough session so you can confidently update content, images, and other elements yourself. We'll teach you everything you need to know, and we're always available if you need help.",
  },
  {
    question: 'What happens if I want to add features later?',
    answer: "Your website is built to grow with your business. You can add any of our 40+ add-ons at any time, or request custom features. We'll provide clear pricing and can typically add new features within 1-2 weeks.",
  },
  {
    question: 'Are your websites mobile-friendly and SEO-optimized?',
    answer: 'Yes, in every package. Responsive layout for phones, tablets, and desktops, plus the SEO groundwork: meta tags, structured data, sitemaps, fast load times, and clean URLs. That is baseline work, not an add-on.',
  },
  {
    question: 'Will I own the website and all the code?',
    answer: "Yes. Once the project is completed and paid for, you own 100% of the website, domain, content, and code. We'll provide access to everything, and you're free to maintain it yourself or hire anyone else in the future.",
  },
  {
    question: "What if I'm not happy with the final result?",
    answer: "We include multiple revision rounds to ensure you're satisfied. We won't launch until you approve everything, and if something isn't working for you afterward, we'll make it right or discuss options.",
  },
  {
    question: 'Do you work with clients outside Houston?',
    answer: "Yes. While we're based in Houston and serve the local area, we work with clients nationwide through remote collaboration via video calls, screen sharing, and project management tools.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": pricingFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
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

      {/* Hero -- homepage design language: black canvas, bracket eyebrow, hairline stats */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <BracketEyebrow label="Flat-Rate Pricing" />
            </div>

            <h1 className="mt-8 font-display text-display font-bold text-white animate-fade-in-up animation-delay-200">
              One number. Paid up front.
              <span className="block text-gray-500 mt-2">That is the whole model.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              Seven flat-rate tiers from $250 to $7,500+, every one with 90 days of post-launch support included. No hourly billing, no hidden fees. You know the exact cost before we start.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group btn-primary w-full px-6 py-3 text-base sm:w-auto"
              >
                Get a Flat Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
              <PhoneLink
                location="pricing_page_top"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-gray-400 hover:text-primary-400 transition-colors sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                (936) 323-4527
              </PhoneLink>
            </div>

            {/* Quick facts -- hairline dl, plainly stated */}
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 animate-fade-in-up animation-delay-800">
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Starting price</dt>
                <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">$250</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Add-on options</dt>
                <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">40+</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Hidden fees</dt>
                <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">0%</dd>
              </div>
              <div className="border-l border-primary-500/40 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Flat-rate tiers</dt>
                <dd className="mt-1.5 font-display font-expanded text-3xl font-display font-bold tracking-tight tabular-nums text-white">7</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Proof and positioning -- value framing before the tier grid */}
      <section className="bg-surface-card border-b border-surface-border py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-3xl bg-surface border border-surface-border p-8 md:p-12 shadow-xl shadow-black/40">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-4 py-2 text-sm font-semibold text-accent-400 mb-6">
              <TrendingUp className="h-4 w-4" />
              Real Client Result
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
              Benefit Builder grew from roughly $1,000 MRR to $52,000 MRR after we built their platform.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              We built their public website and their entire internal operating platform, automating the workflows their small team needed to run the business day to day. Admin work dropped by 60%, and the company now runs on a team of three.
            </p>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-500 hover:text-accent-400 transition-colors"
            >
              See the full case study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-primary-500/30 bg-surface p-8 md:p-10">
            <h3 className="text-xl font-bold text-white mb-3">
              These aren't just websites. They're business systems.
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Most freelancers and small studios at the $2,000-$5,000 price point hand you a marketing site and stop there. Our $2,000 Premium Build ships with a custom admin portal, a real-time analytics dashboard, and CRM/accounting integrations built in. Step up to the $5,000 Custom Business Platform and you get a complete CRM, a client login portal, and integrated invoicing and payments, the kind of system most businesses are still stitching together out of three or four separate monthly SaaS subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* Core Packages */}
      <section className="bg-surface py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4">
              <BracketEyebrow label="Core Tiers" />
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              Four tiers, one flat price each.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Plug and Play starts at $250 for businesses staying on an existing platform. For a business that wants a real, fully custom site built to last, the <span className="font-semibold text-white">$950 Standard tier is where we recommend starting</span>: more pages, deeper SEO, and a foundation the E-Commerce tier ($1,100) and the premium builds below can grow from without a rebuild.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {corePackages.map((pkg) => {
              const isPopular = pkg.id === 'standard-website'
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-3xl bg-surface p-8 card-lift ${
                    isPopular
                      ? 'border-2 border-primary-500 [--card-hover-border:#ef4e22] shadow-glow-primary'
                      : 'border border-surface-border shadow-lg'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-7">
                      <div className="rounded-full bg-primary-600 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Most picked
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed">{pkg.shortDescription}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="font-display font-expanded text-5xl font-display font-bold tracking-tight tabular-nums text-white">
                      {pkg.priceLabel}
                    </span>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-400">{pkg.timeline}</p>
                  </div>
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-400 flex-grow">
                    {pkg.features.slice(0, 6).map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className="h-4 w-4 flex-none mt-1 text-primary-500" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${pkg.slug}`}
                    className={`group mt-8 w-full px-3.5 py-2.5 text-sm ${
                      isPopular ? 'btn-accent' : 'btn-primary'
                    }`}
                  >
                    View Full Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                  </Link>
                  {pkg.demoSlug && (
                    <Link
                      href={`/demos/${pkg.demoSlug}`}
                      className="group mt-1 flex min-h-[44px] items-center justify-center gap-1 text-xs font-semibold text-gray-400 hover:text-accent-500 transition-colors"
                    >
                      See a live example
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Builds */}
      <section className="bg-surface py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4">
              <BracketEyebrow label="Premium Solutions" />
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
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
                className="relative flex flex-col rounded-3xl border border-primary-500/40 bg-surface-card p-8 card-lift [--card-hover-border:#ef4e22]"
              >
                <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{pkg.shortDescription}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="font-display font-expanded text-5xl font-display font-bold tracking-tight tabular-nums text-white">
                    {pkg.priceLabel}
                  </span>
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-400">{pkg.timeline}</p>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-400 flex-grow">
                  {pkg.features.slice(0, 7).map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-4 w-4 flex-none mt-1 text-primary-500" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${pkg.slug}`}
                  className="group btn-primary mt-8 w-full px-3.5 py-2.5 text-sm"
                >
                  Explore Premium Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </Link>
                {pkg.demoSlug && (
                  <Link
                    href={`/demos/${pkg.demoSlug}`}
                    className="group mt-1 flex min-h-[44px] items-center justify-center gap-1 text-xs font-semibold text-gray-400 hover:text-accent-500 transition-colors"
                  >
                    See a live example
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Overview */}
      <section className="bg-surface-card py-24 sm:py-32 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="mb-4">
              <BracketEyebrow label="40+ Add-Ons Available" />
            </div>
            <h2 className="font-display text-display-sm font-bold text-white">
              Customize Your Website
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Start with a tier, then add only what your business will actually use. Every add-on has its own flat price.
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
                  className="group rounded-xl border border-surface-border bg-surface p-6 card-lift"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {addon.name}
                    </h4>
                    <p className="text-lg font-bold tabular-nums text-white">{addon.priceLabel}</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{addon.shortDescription}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
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
                  className="group rounded-xl border border-surface-border bg-surface p-6 card-lift"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {addon.name}
                    </h4>
                    <p className="text-xl font-bold tabular-nums text-white">{addon.priceLabel}</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{addon.shortDescription}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1 text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {addon.timeline}
                  </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                      Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
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
              className="group btn-primary px-6 py-3 text-base"
            >
              View All 40+ Add-Ons
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="bg-gradient-to-br from-surface via-surface-card to-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-gradient-to-br from-surface-card to-surface-elevated p-12 border border-primary-500/30 shadow-2xl shadow-primary-500/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/20 border border-primary-500/30 px-4 py-2 text-sm font-semibold text-primary-400 mb-6">
                  <Rocket className="h-4 w-4" />
                  Need Something Different?
                </div>
                <h2 className="font-display text-display-sm font-bold text-white mb-4">
                  Custom Solutions
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  SaaS platforms, web applications, data scrapers, automation tools, and bespoke software tailored to your exact needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-surface-card/70 rounded-xl p-6 border border-surface-border/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary-500/10 ring-1 ring-primary-500/40 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Transparent Pricing</h3>
                      <p className="text-gray-300 text-sm">
                        Based on $50/hour estimates, but quoted as a <strong className="text-white">flat-rate price</strong>. No hourly billing, no cost overruns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-card/70 rounded-xl p-6 border border-surface-border/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="group btn-primary px-8 py-4 text-base"
                >
                  Explore Custom Solutions
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Get a detailed quote within 24 hours â€¢ No obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Flat-Rate Pricing */}
      <section className="bg-gradient-to-br from-black via-surface to-surface-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-display-sm font-bold text-white">
              Why Flat-Rate Pricing?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              You should know what a website costs before you agree to build one.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="rounded-2xl bg-surface-card/60 backdrop-blur-sm p-8 border border-surface-border card-lift">
                <Target className="h-9 w-9 text-accent-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">No Surprises</h3>
                <p className="text-gray-200 leading-relaxed">
                  You know the exact cost upfront. No hourly billing that spirals out of control or unexpected charges at the end.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-card/60 backdrop-blur-sm p-8 border border-surface-border card-lift">
                <DollarSign className="h-9 w-9 text-accent-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">One Number</h3>
                <p className="text-gray-200 leading-relaxed">
                  The quote covers design, build, revisions, testing, and launch. You can plan around it because it does not move.
                </p>
              </div>
              <div className="rounded-2xl bg-surface-card/60 backdrop-blur-sm p-8 border border-surface-border card-lift">
                <Star className="h-9 w-9 text-accent-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Quality Focus</h3>
                <p className="text-gray-200 leading-relaxed">
                  Hourly shops earn more when work drags. I get paid the same either way, so the only thing worth optimizing is doing the job right the first time.
                </p>
              </div>
            </div>
          </div>

          {/* Additional benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center"><Check className="h-4 w-4 text-white" strokeWidth={3} /></div>
              <div>
                <h4 className="font-semibold mb-1">All-Inclusive Packages</h4>
                <p className="text-sm text-gray-300">Design, development, revisions, testing, and launch all included</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center"><Check className="h-4 w-4 text-white" strokeWidth={3} /></div>
              <div>
                <h4 className="font-semibold mb-1">Clear Timelines</h4>
                <p className="text-sm text-gray-300">Every package has a defined timeline so you know when to expect results</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center"><Check className="h-4 w-4 text-white" strokeWidth={3} /></div>
              <div>
                <h4 className="font-semibold mb-1">Scalable Solutions</h4>
                <p className="text-sm text-gray-300">Start small and add features later as your business grows</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-white">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center"><Check className="h-4 w-4 text-white" strokeWidth={3} /></div>
              <div>
                <h4 className="font-semibold mb-1">Dedicated Support</h4>
                <p className="text-sm text-gray-300">Direct access to your developer throughout the entire project</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-display text-display-sm font-bold text-white">
              Pricing Questions?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Get answers to common questions about our pricing and packages.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {pricingFaqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-surface-border bg-surface-card p-8 card-lift">
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {faq.question.startsWith('Can I see examples') ? (
                      <>
                        Yes. Visit our <Link href="/demos" className="text-primary-400 font-semibold hover:text-primary-300">Demos page</Link> to explore 40+ fully interactive website examples across all our packages and industries. You can click around and test every feature.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Have more questions?</p>
              <Link
                href="/faq"
                className="group inline-flex items-center gap-2 text-primary-400 font-bold hover:text-primary-300 transition-colors"
              >
                <span>View our full FAQ</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA -- plain, sober, matches the homepage closer */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-display-sm font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Tell me what you need and I'll come back with the tier that fits and one flat number. If the $250 tier covers it, that's what I'll quote.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group btn-primary w-full px-6 py-3 text-base sm:w-auto"
              >
                Get a Flat Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
              <PhoneLink
                location="pricing_page_bottom"
                className="btn-secondary w-full px-6 py-3 text-base sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                (936) 323-4527
              </PhoneLink>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              Free consultation â€¢ Quick response â€¢ Transparent pricing
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
