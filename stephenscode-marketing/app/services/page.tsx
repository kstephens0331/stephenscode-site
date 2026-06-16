import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Globe, Rocket, Zap, DollarSign, Clock, Award,
  ArrowRight, Check, MessageSquare, PenTool, Code2, CheckCircle2,
} from 'lucide-react'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allAddOns } from '@/lib/addons-data'

export const metadata: Metadata = {
  title: 'Houston Web Development | Flat-Rate Web Design from $950',
  description: 'Conroe web developer offering custom websites for small business. Flat-rate small business websites from $950. Veteran owned, 14+ years exp. Free quote: (936) 323-4527.',
  alternates: {
    canonical: '/services',
  },
  keywords: [
    'Houston web development',
    'Conroe web developer',
    'affordable web design Houston',
    'custom website Houston',
    'small business website Texas',
    'The Woodlands web developer',
    'veteran owned web developer',
    'web developer near me',
    'website design Conroe TX',
    'professional website Houston',
    'business website developer',
    'responsive web design Texas',
    'e-commerce website Houston',
    'SEO web development',
    'flat rate web design',
    'Montgomery County web developer',
  ],
  openGraph: {
    title: 'Houston Web Design | Flat-Rate Custom Websites from $950',
    description: 'Get a professional website built in 1-2 weeks. Flat-rate pricing, no hidden fees. Veteran-owned.',
    url: 'https://www.stephenscode.dev/services',
  },
}

// Service schema for SEO
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "StephensCode LLC",
    "image": "https://www.stephenscode.dev/logo.png",
    "telephone": "+1-936-323-4527",
    "priceRange": "$250+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Conroe",
      "addressRegion": "TX",
      "addressCountry": "US"
    }
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Custom Websites",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Plug and Play Website",
              "description": "4-page starter website for new businesses"
            },
            "price": "250",
            "priceCurrency": "USD"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Standard Website",
              "description": "Professional 8-12 page business website"
            },
            "price": "950",
            "priceCurrency": "USD"
          }
        ]
      }
    ]
  }
}

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: 'Core Packages',
      subtitle: 'Perfect for most businesses',
      description: 'Get online fast with our professionally designed core packages. From simple 4-page sites to comprehensive business websites.',
      services: corePackages.slice(0, 4),
      Icon: Globe,
    },
    {
      title: 'Premium Builds',
      subtitle: 'Advanced business solutions',
      description: 'Full-stack enterprise platforms with custom features, admin dashboards, and advanced functionality.',
      services: premiumBuilds,
      Icon: Rocket,
    },
    {
      title: 'Add-On Features',
      subtitle: 'Enhance your website',
      description: 'Extend your website with powerful add-ons. From booking systems to e-commerce to membership portals.',
      services: allAddOns.slice(0, 6),
      Icon: Zap,
    }
  ]

  const whyChoose = [
    {
      title: 'Transparent Flat-Rate Pricing',
      description: 'Know exactly what you\'ll pay before we start. No hourly rates, no surprise bills, no hidden fees.',
      Icon: DollarSign,
      stats: 'Sites from $950+'
    },
    {
      title: 'Fast Turnaround Time',
      description: 'Most projects completed in 1-2 weeks. We move quickly without sacrificing quality.',
      Icon: Zap,
      stats: '1-2 week average delivery'
    },
    {
      title: 'Veteran-Owned Quality',
      description: 'Military discipline meets technical expertise. 14+ years of experience building websites for Houston businesses.',
      Icon: Award,
      stats: '200+ projects delivered'
    },
    {
      title: 'Houston-Based, Nationwide Service',
      description: 'Based in Conroe, serving Houston, The Woodlands, and clients nationwide. In-person meetings available locally, remote collaboration anywhere.',
      Icon: Globe,
      stats: 'Serving Nationwide'
    }
  ]

  const technologies = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Firebase', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'Vercel', category: 'Hosting' },
    { name: 'Railway', category: 'Hosting' },
    { name: 'Express', category: 'Backend' }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We discuss your business goals, target audience, and project requirements. No obligation, no sales pressure, just honest advice.',
      timeline: '30-60 minutes',
      deliverable: 'Project scope & quote',
      Icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'We create wireframes and mockups for your approval. Unlimited revisions until you\'re 100% satisfied with the design.',
      timeline: '2-3 days',
      deliverable: 'Approved design mockups',
      Icon: PenTool,
    },
    {
      number: '03',
      title: 'Development',
      description: 'We build your website using modern technologies and best practices. Regular updates keep you in the loop.',
      timeline: '1-2 weeks',
      deliverable: 'Fully functional website',
      Icon: Code2,
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Thorough testing across devices and browsers. We handle deployment, training, and provide documentation.',
      timeline: '1-2 days',
      deliverable: 'Live website + training',
      Icon: CheckCircle2,
    }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>47 Service Packages &amp; Add-Ons</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.02] animate-fade-in-up animation-delay-200">
              Houston Web Development &amp; Affordable Web Design
              <span className="block text-primary-500 mt-2">Custom Websites for Small Business</span>
            </h1>

            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Conroe web developer offering flat-rate small business websites from $950. Affordable web design for Houston, The Woodlands, and Montgomery County. <strong className="text-white">Veteran owned web developer</strong> with transparent pricing. No hourly rates, no surprises.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-600">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                View All Pricing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                View Live Demos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => {
        const CatIcon = category.Icon
        return (
          <section key={category.title} className={`${catIndex % 2 === 0 ? 'bg-surface' : 'bg-surface-card'} py-24 sm:py-28 border-b border-surface-border`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
                  <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
                  <span>{category.subtitle}</span>
                  <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
                </div>
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500">
                  <CatIcon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                  {category.title}
                </h2>
                <p className="text-lg leading-8 text-gray-400">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {category.services.map((service) => (
                  <article
                    key={service.id}
                    className="group relative flex flex-col rounded-2xl bg-surface-card ring-1 ring-surface-border p-7 card-lift hover:ring-primary-500/50 transition-all"
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">{service.category}</p>
                    </div>

                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    <div className="mb-6">
                      <p className="text-3xl font-bold tracking-tight text-white">
                        {service.priceLabel}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{service.timeline}</p>
                    </div>

                    <div className="mb-6 flex-1">
                      <p className="text-sm font-semibold text-gray-300 mb-3">Key Features:</p>
                      <ul className="space-y-2">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                            <Check className="h-4 w-4 flex-none mt-0.5 text-primary-500" strokeWidth={2.5} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="block w-full rounded-md bg-primary-500 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                    >
                      Learn More &amp; See Details
                    </Link>
                  </article>
                ))}
              </div>

              {category.title === 'Add-On Features' && (
                <div className="mt-12 text-center">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
                  >
                    View All 40 Add-Ons
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        )
      })}

      {/* Why Choose Us */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Why Choose a Veteran Owned Web Developer?</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Affordable Web Design You Can Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {whyChoose.map((item, index) => {
              const Icon = item.Icon
              return (
                <div key={index} className="group rounded-2xl bg-surface-card ring-1 ring-surface-border p-8 hover:ring-primary-500/50 transition-all">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <div className="inline-flex items-center gap-2 rounded-md bg-surface-elevated border border-surface-border px-4 py-2 text-sm font-semibold text-accent-400">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface-card py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Our Process</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From Idea to Launch
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Transparent, efficient, and collaborative. Here's exactly how we work together.
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
                    <div className="absolute top-0 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-400 text-black text-sm font-bold ring-2 ring-surface-card">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="inline-flex items-center gap-2 text-primary-400 font-semibold">
                        <Clock className="h-4 w-4" strokeWidth={2} />
                        <span>{step.timeline}</span>
                      </div>
                      <p className="text-gray-500">{step.deliverable}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Tech Stack</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Modern, Reliable Technologies
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              We use industry-leading technologies that are fast, secure, and built to scale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="group rounded-md bg-surface-card ring-1 ring-surface-border p-6 text-center hover:ring-primary-500/50 transition-all"
              >
                <p className="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{tech.name}</p>
                <p className="text-xs text-gray-500">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-card py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Frequently Asked Questions</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Web Development FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How much does a custom website cost?",
                answer: "Six flat-rate tiers with 90 days post-launch support on every one. Starter $250 (3-4 page flyer for brand-new businesses), Basic $500 (campaign or landing site), Standard $950 (full 8-12 page small-business site with CMS, the typical entry tier), Advanced $2,000 (custom full-stack with admin portal + KPI dashboard), Business System $5,000 (CRM + portals + booking + payments + automation), Enterprise Platform $7,500+ (multi-tenant + SSO + audit). Custom SaaS and platform builds quoted above the catalog. No hourly billing."
              },
              {
                question: "How long does it take to build a website?",
                answer: "Most projects are completed in 1-2 weeks. Plug and Play sites can be ready in 3-5 days. Standard websites take 1-2 weeks. Complex e-commerce or custom platforms may take 2-4 weeks. We'll give you an accurate timeline during your free consultation."
              },
              {
                question: "Do you offer website hosting?",
                answer: "Yes! We offer managed hosting starting at $29/month which includes SSL certificates, daily backups, security monitoring, and unlimited support. Hosting is optional, we can also deploy to your existing hosting or platforms like Vercel, Netlify, or your own servers."
              },
              {
                question: "Can you redesign my existing website?",
                answer: "Absolutely. Our Website Rebuild package ($600) is specifically designed for businesses with outdated websites. We'll modernize your design, improve performance, enhance SEO, and ensure mobile responsiveness while preserving your brand identity."
              },
              {
                question: "What's included in the price?",
                answer: "All packages include custom design, responsive development, basic SEO setup, contact forms, Google Analytics integration, and 90 days of post-launch support. E-commerce packages include payment processing setup. We don't nickel-and-dime, what we quote is what you pay."
              },
              {
                question: "Do I own my website after it's built?",
                answer: "Yes, 100%. You own all code, content, and design assets. Unlike template website builders that hold your site hostage, we build on open platforms and provide full source code. You can host it anywhere and modify it however you want."
              },
              {
                question: "Do you work with clients outside Houston?",
                answer: "Yes! While we're based in Conroe and serve the Houston area with in-person meetings, we work with clients nationwide through video calls, screen sharing, and collaborative tools. About 40% of our clients are outside Texas."
              },
              {
                question: "What technologies do you use?",
                answer: "We use modern, industry-standard technologies: React/Next.js for frontend, Node.js or Python for backend, PostgreSQL or Firebase for databases, and Tailwind CSS for styling. We choose the best tools for each project rather than forcing one-size-fits-all solutions."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-surface-border bg-surface hover:border-primary-500/60 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold text-white">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-primary-500 group-open:rotate-180 transition-transform">
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              <span>Contact us for a free consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let's Build Something Great
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">
            Choose from 47 service packages or let us create a custom solution for your business. Free consultation, transparent pricing, fast delivery.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
            >
              View All Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
