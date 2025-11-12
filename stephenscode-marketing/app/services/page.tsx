import Link from 'next/link'
import type { Metadata } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allAddOns } from '@/lib/addons-data'

export const metadata: Metadata = {
  title: 'Web Development Services Houston | Custom Websites & E-Commerce | StephensCode',
  description: 'Professional web development services in Houston, TX. Custom websites from $250, e-commerce stores, business automation, and premium builds. Veteran-owned, flat-rate pricing, 14+ years experience.',
  keywords: [
    'web development services Houston',
    'custom website development Conroe',
    'e-commerce development Texas',
    'business automation Houston',
    'web design The Woodlands',
    'professional website Houston',
    'veteran web developer Texas'
  ],
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
    "priceRange": "$250-$7500",
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
            "price": "850",
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
      icon: '🌐',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Premium Builds',
      subtitle: 'Advanced business solutions',
      description: 'Full-stack enterprise platforms with custom features, admin dashboards, and advanced functionality.',
      services: premiumBuilds,
      icon: '🚀',
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Add-On Features',
      subtitle: 'Enhance your website',
      description: 'Extend your website with powerful add-ons. From booking systems to e-commerce to membership portals.',
      services: allAddOns.slice(0, 6),
      icon: '⚡',
      gradient: 'from-orange-600 to-orange-800'
    }
  ]

  const whyChoose = [
    {
      title: 'Transparent Flat-Rate Pricing',
      description: 'Know exactly what you\'ll pay before we start. No hourly rates, no surprise bills, no hidden fees.',
      icon: '💰',
      stats: 'Packages from $250-$7,500'
    },
    {
      title: 'Fast Turnaround Time',
      description: 'Most projects completed in 1-2 weeks. We move quickly without sacrificing quality.',
      icon: '⚡',
      stats: '1-2 week average delivery'
    },
    {
      title: 'Veteran-Owned Quality',
      description: 'Military discipline meets technical expertise. 14+ years of experience building websites for Houston businesses.',
      icon: '🎖️',
      stats: '200+ projects delivered'
    },
    {
      title: 'Houston-Based, Nationwide Service',
      description: 'Based in Conroe, serving Houston, The Woodlands, and clients nationwide. In-person meetings available locally, remote collaboration anywhere.',
      icon: '🌐',
      stats: 'Serving Nationwide'
    }
  ]

  const technologies = [
    { name: 'Next.js', category: 'Frontend', color: 'bg-black' },
    { name: 'React', category: 'Frontend', color: 'bg-blue-500' },
    { name: 'TypeScript', category: 'Language', color: 'bg-blue-600' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'bg-cyan-500' },
    { name: 'Node.js', category: 'Backend', color: 'bg-green-600' },
    { name: 'Python', category: 'Backend', color: 'bg-yellow-500' },
    { name: 'Firebase', category: 'Database', color: 'bg-orange-500' },
    { name: 'PostgreSQL', category: 'Database', color: 'bg-blue-700' },
    { name: 'Stripe', category: 'Payments', color: 'bg-purple-600' },
    { name: 'Vercel', category: 'Hosting', color: 'bg-black' },
    { name: 'Railway', category: 'Hosting', color: 'bg-purple-700' },
    { name: 'Express', category: 'Backend', color: 'bg-gray-700' }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We discuss your business goals, target audience, and project requirements. No obligation, no sales pressure—just honest advice.',
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

      {/* Hero Section with Advanced Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-lg border border-white/20 shadow-2xl">
              <span className="text-2xl">🌐</span>
              <span>47 Service Packages & Add-Ons</span>
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-8">
              Professional Web Development Services
              <span className="block text-accent-400 mt-2">For Houston Businesses</span>
            </h1>

            <p className="mt-8 text-xl leading-8 text-gray-100 max-w-3xl mx-auto">
              From $250 starter websites to $7,500 enterprise platforms. Custom development, e-commerce, business automation, and everything in between. <strong className="text-white">Based in Houston, serving clients nationwide through remote collaboration.</strong> Flat-rate pricing, no hourly billing, no surprises.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent-500 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:bg-accent-600 transition-all hover:scale-105"
              >
                <span>View All Pricing</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>View Live Demos</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => (
        <section key={category.title} className={catIndex % 2 === 0 ? 'bg-white py-24 sm:py-32' : 'bg-gray-50 py-24 sm:py-32'}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${category.gradient} px-6 py-3 text-white shadow-xl mb-6`}>
                <span className="text-3xl">{category.icon}</span>
                <span className="font-bold">{category.subtitle}</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-6">
                {category.title}
              </h2>
              <p className="text-lg leading-8 text-gray-600">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {category.services.map((service, index) => (
                <article
                  key={service.id}
                  className="group relative flex flex-col rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg hover:border-primary-500 hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{service.category}</p>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="mb-6">
                    <p className="text-3xl font-black text-primary-600">
                      {service.priceLabel}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{service.timeline}</p>
                  </div>

                  <div className="mb-6 flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Features:</p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
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
                    className="block w-full rounded-lg bg-primary-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-primary-700 transition-colors"
                  >
                    Learn More & See Details →
                  </Link>
                </article>
              ))}
            </div>

            {category.title === 'Add-On Features' && (
              <div className="mt-12 text-center">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
                >
                  <span>View All 40 Add-Ons</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Why StephensCode?</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Built Different
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {whyChoose.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-4xl shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-bold text-primary-700">
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
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Process</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              From Idea to Launch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transparent, efficient, and collaborative. Here's exactly how we work together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative group">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-full h-1 bg-gradient-to-r from-primary-600 to-primary-200 -translate-x-1/2"></div>
                )}
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-600 text-white text-5xl mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="inline-flex items-center gap-2 text-primary-600 font-semibold">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{step.timeline}</span>
                    </div>
                    <p className="text-gray-500">→ {step.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-gray-900 text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-accent-400">Tech Stack</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Modern, Reliable Technologies
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We use industry-leading technologies that are fast, secure, and built to scale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 text-center hover:bg-white/20 transition-all hover:scale-105 shadow-xl"
              >
                <p className="text-lg font-bold text-white mb-1">{tech.name}</p>
                <p className="text-xs text-gray-300">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl mb-8">
              Let's Build Something Great
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-200 mb-12">
              Choose from 47 service packages or let us create a custom solution for your business. Free consultation, transparent pricing, fast delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-2xl hover:bg-accent-600 transition-all hover:scale-110"
              >
                <span>Get Free Quote</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>View All Pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
