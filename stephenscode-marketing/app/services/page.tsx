import Link from 'next/link'
import type { Metadata } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allAddOns } from '@/lib/addons-data'
import { Globe, Zap, DollarSign, Award, ArrowRight } from 'lucide-react'
import BracketEyebrow from '@/components/BracketEyebrow'

export const metadata: Metadata = {
  title: 'Houston Web Development | Flat-Rate Web Design from $250',
  description: 'Conroe web developer offering flat-rate custom websites from $250. Veteran owned, 14+ years experience. Call (936) 323-4527.',
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
    images: ['/opengraph-image'],
    title: 'Houston Web Design | Flat-Rate Custom Websites from $250',
    description: 'Get a professional website built in 1-2 weeks. Flat-rate pricing, no hidden fees. Veteran-owned.',
    url: 'https://www.stephenscode.dev/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Web Design | Flat-Rate Custom Websites from $250',
    description: 'Get a professional website built in 1-2 weeks. Flat-rate pricing, no hidden fees. Veteran-owned.',
    images: ['/twitter-image'],
  },
}

// Service schema for SEO
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@id": "https://www.stephenscode.dev/#organization"
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

const servicesFaqs = [
  {
    question: 'How much does a custom website cost?',
    answer: 'Seven flat-rate tiers with 90 days post-launch support on every one. Plug and Play $250 (3-4 page flyer for brand-new businesses), Website Rebuild $350 (refresh or rebuild on your existing platform), Standard Website $950 (custom 8-12 page small-business site, the typical entry tier), E-Commerce Website $1,100 (Standard features plus online store and payments), Premium Build $2,000 (custom full-stack site with admin portal and KPI dashboard), Custom Business Platform $5,000 (CRM, client portals, and automation), Enterprise Platform $7,500+ (large-scale platform with admin system and staff roles). Larger custom SaaS and enterprise builds are quoted above the catalog. No hourly billing.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: "Plug and Play takes 1 week, Website Rebuild 2 weeks, Standard Website 3-4 weeks, E-Commerce Website 4-6 weeks, Premium Build 6-8 weeks, Custom Business Platform 10-12 weeks, and Enterprise Platform 12-16 weeks. We'll give you an exact timeline during your free consultation.",
  },
  {
    question: 'Do you offer website hosting?',
    answer: 'Yes! We offer managed hosting starting at $29/month which includes SSL certificates, daily backups, security monitoring, and unlimited support. Hosting is optional. We can also deploy to your existing hosting or platforms like Vercel, Netlify, or your own servers.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer: "Absolutely. Our Website Rebuild package ($350) is specifically designed for businesses with outdated websites. We'll modernize your design, improve performance, enhance SEO, and ensure mobile responsiveness while preserving your brand identity.",
  },
  {
    question: "What's included in the price?",
    answer: "All packages include custom design, responsive development, basic SEO setup, contact forms, Google Analytics integration, and 90 days of post-launch support. E-commerce packages include payment processing setup. We don't nickel-and-dime. What we quote is what you pay.",
  },
  {
    question: "Do I own my website after it's built?",
    answer: 'Yes, 100%. You own all code, content, and design assets. Unlike template website builders that hold your site hostage, we build on open platforms and provide full source code. You can host it anywhere and modify it however you want.',
  },
  {
    question: 'Do you work with clients outside Houston?',
    answer: "Yes! While we're based in Conroe and serve the Houston area with in-person meetings, we work with clients nationwide through video calls, screen sharing, and collaborative tools. About 40% of our clients are outside Texas.",
  },
  {
    question: 'What technologies do you use?',
    answer: 'We use modern, industry-standard technologies: React/Next.js for frontend, Node.js or Python for backend, PostgreSQL or Firebase for databases, and Tailwind CSS for styling. We choose the best tools for each project rather than forcing one-size-fits-all solutions.',
  },
]

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": servicesFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
}

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: 'Core Packages',
      subtitle: 'Perfect for most businesses',
      description: 'Get online fast with our professionally designed core packages. From simple 4-page sites to comprehensive business websites.',
      services: corePackages.slice(0, 4),
    },
    {
      title: 'Premium Builds',
      subtitle: 'Advanced business solutions',
      description: 'Full-stack enterprise platforms with custom features, admin dashboards, and advanced functionality.',
      services: premiumBuilds,
    },
    {
      title: 'Add-On Features',
      subtitle: 'Enhance your website',
      description: 'Extend your website with powerful add-ons. From booking systems to e-commerce to membership portals.',
      services: allAddOns.slice(0, 6),
    }
  ]

  const whyChoose = [
    {
      title: 'Transparent Flat-Rate Pricing',
      description: 'Know exactly what you\'ll pay before we start. No hourly rates, no surprise bills, no hidden fees.',
      Icon: DollarSign,
      stats: 'Sites from $250+'
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
      deliverable: 'Project scope & quote'
    },
    {
      number: '02',
      title: 'Design & Planning',
      description: 'We create wireframes and mockups for your approval. Unlimited revisions until you\'re 100% satisfied with the design.',
      timeline: '2-3 days',
      deliverable: 'Approved design mockups'
    },
    {
      number: '03',
      title: 'Development',
      description: 'We build your website using modern technologies and best practices. Regular updates keep you in the loop.',
      timeline: '1-2 weeks',
      deliverable: 'Fully functional website'
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Thorough testing across devices and browsers. We handle deployment, training, and provide documentation.',
      timeline: '1-2 days',
      deliverable: 'Live website + training'
    }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <BracketEyebrow label="49 Service Packages & Add-Ons" />

            <h1 className="mt-8 text-4xl font-display font-bold tracking-tight text-white sm:text-6xl leading-[1.05]">
              Houston Web Development & Affordable Web Design
              <span className="block text-gray-500 mt-2">Custom Websites for Small Business</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Conroe web developer offering flat-rate small business websites from $250. Affordable web design for Houston, The Woodlands, and Montgomery County. <strong className="text-white">Veteran owned web developer</strong> with transparent pricing. No hourly rates, no surprises.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="group btn-primary px-6 py-3 text-base">
                Get a Flat Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
              <Link href="/pricing" className="btn-secondary px-6 py-3 text-base">
                View All Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => (
        <section key={category.title} className={catIndex % 2 === 0 ? 'bg-surface py-24 sm:py-32' : 'bg-surface-card py-24 sm:py-32'}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <BracketEyebrow label={category.subtitle} />
              <h2 className="mt-4 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl mb-6">
                {category.title}
              </h2>
              <p className="text-lg leading-8 text-gray-400">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {category.services.map((service, index) => (
                <article
                  key={service.id}
                  className="group relative flex flex-col rounded-2xl bg-surface border-2 border-surface-border p-8 shadow-lg card-lift"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{service.category}</p>
                  </div>

                  <p className="text-gray-400 mb-6 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary-600">
                      {service.priceLabel}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{service.timeline}</p>
                  </div>

                  <div className="mb-6 flex-1">
                    <p className="text-sm font-semibold text-gray-300 mb-3">Key Features:</p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <svg className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="btn-primary w-full px-6 py-3 text-sm"
                  >
                    Learn More & See Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                  </Link>
                </article>
              ))}
            </div>

            {category.title === 'Core Packages' && (
              <div className="mt-12 text-center">
                <Link
                  href="/services/custom-websites"
                  className="group btn-primary px-8 py-4 text-lg"
                >
                  See Full Custom Website Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}

            {category.title === 'Add-On Features' && (
              <div className="mt-12 text-center">
                <Link
                  href="/pricing"
                  className="group btn-primary px-8 py-4 text-lg"
                >
                  View All 41 Add-Ons
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose a Veteran Owned Web Developer?</h2>
            <p className="mt-2 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Affordable Web Design You Can Trust
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {whyChoose.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl bg-surface p-8 shadow-xl transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 shadow-lg group-hover:scale-110 transition-transform">
                    <item.Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/15 px-4 py-2 text-sm font-bold text-primary-400">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>{item.stats}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <BracketEyebrow label="Our Process" />
                <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
                  From Idea to Launch
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-400">
                  Transparent, efficient, and collaborative. Here's exactly how we work together.
                </p>
                <Link href="/contact" className="group btn-primary mt-8 px-6 py-3 text-base">
                  Get a Flat Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <ol className="lg:col-span-8 relative border-l border-surface-border pl-8 sm:pl-10 space-y-12">
              {processSteps.map((step) => (
                <li key={step.number} className="relative">
                  <span aria-hidden className="absolute top-1.5 -left-[43px] sm:-left-[51px] flex h-5 w-5 items-center justify-center rounded-full border border-primary-500 bg-surface">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  </span>
                  <p className="font-mono text-xs tracking-[0.18em] text-primary-500">{step.number}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xl leading-7 text-gray-400">{step.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span className="text-primary-400 font-semibold">{step.timeline}</span>
                    <span className="text-gray-500">{step.deliverable}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-surface-card border-y border-surface-border text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-accent-400">Tech Stack</h2>
            <p className="mt-2 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Modern, Reliable Technologies
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We use industry-leading technologies that are fast, secure, and built to scale.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4 divide-y-0">
            {technologies.map((tech) => (
              <li
                key={tech.name}
                className="flex items-baseline justify-between border-b border-surface-border py-3"
              >
                <span className="font-semibold text-white">{tech.name}</span>
                <span className="text-xs uppercase tracking-wider text-gray-500">{tech.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Frequently Asked Questions</h2>
            <p className="mt-2 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Web Development FAQ
            </p>
          </div>

          <div className="space-y-6">
            {servicesFaqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border-2 border-surface-border bg-surface-card card-lift"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-bold text-white">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-primary-600 group-open:rotate-180 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-400"
            >
              <span>Contact us for a free consultation</span>
              <span>â†’</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface border-t border-surface-border text-white">
        <div className="px-6 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-display font-bold tracking-tight sm:text-6xl mb-8">
              Let's Build Something Great
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-200 mb-12">
              Choose from 49 service packages or let us create a custom solution for your business. Free consultation, transparent pricing, fast delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group btn-primary px-8 py-4 text-lg"
              >
                Get Free Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="btn-secondary px-8 py-4 text-lg"
              >
                View All Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
