import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Portfolio & Client Projects | Web Development Houston | StephensCode',
  description: 'View our portfolio of completed web development projects for Houston-area businesses. HVAC websites, auto body shops, photography studios, and custom web applications built by StephensCode.',
  keywords: [
    'Houston web development portfolio',
    'Texas business websites',
    'custom website examples',
    'HVAC website design',
    'auto body shop website',
    'photography website Houston',
    'web development case studies',
    'StephensCode clients',
    'Conroe web design',
    'The Woodlands website development'
  ],
  openGraph: {
    title: 'Our Portfolio & Client Projects | StephensCode',
    description: 'View websites we\'ve built for Houston-area businesses. Real projects, real results.',
  },
}

interface Partner {
  name: string
  description: string
  url: string
  category: 'directory' | 'partner' | 'certification'
}

interface Client {
  name: string
  shortName: string
  description: string
  longDescription: string
  url: string
  industry: string
  location: string
  services: string[]
}

const partners: Partner[] = [
  {
    name: 'DesignRush',
    description: 'Featured in Top Texas Web Development Companies',
    url: 'https://www.designrush.com/agency/web-development-companies/texas',
    category: 'directory',
  },
]

const clients: Client[] = [
  {
    name: 'AMW Air Conditioning & Heating',
    shortName: 'AMW Cooling',
    description: 'Full-service HVAC company serving the Greater Houston area with residential and commercial heating and cooling solutions.',
    longDescription: 'We built a comprehensive website for AMW Air Conditioning & Heating, a trusted HVAC contractor serving Houston, Conroe, and The Woodlands. The site features online scheduling, service area pages, emergency contact functionality, and SEO optimization to help them rank for local HVAC searches.',
    url: 'https://www.amwairconditioning.com/',
    industry: 'HVAC & Home Services',
    location: 'Houston, TX',
    services: ['Custom Website', 'SEO Optimization', 'Mobile Responsive', 'Online Scheduling'],
  },
  {
    name: 'C.A.R.S Collision and Refinish Shop',
    shortName: 'C.A.R.S',
    description: 'Professional auto body repair and refinishing services with expert collision repair, paint matching, and restoration.',
    longDescription: 'C.A.R.S Collision and Refinish Shop needed a website that showcased their quality work and made it easy for customers to request estimates. We delivered a professional site with before/after galleries, service descriptions, and integration with insurance providers.',
    url: 'https://www.carscollisionandrefinishshop.com/',
    industry: 'Automotive Services',
    location: 'Texas',
    services: ['Custom Website', 'Photo Gallery', 'Contact Forms', 'Mobile Responsive'],
  },
  {
    name: 'Benefit Builder LLC',
    shortName: 'Benefit Builder',
    description: 'Employee benefits consulting firm helping businesses design and implement comprehensive benefits packages.',
    longDescription: 'Benefit Builder LLC provides employee benefits consulting services to businesses across Texas. We created a professional website that establishes credibility, explains their services clearly, and generates leads through strategic call-to-action placement.',
    url: 'https://www.benefitbuilderllc.com/',
    industry: 'Business Consulting',
    location: 'Texas',
    services: ['Custom Website', 'Lead Generation', 'Professional Design', 'SEO'],
  },
  {
    name: 'FC Photo Houston',
    shortName: 'FC Photo',
    description: 'Professional photography studio in Houston specializing in portraits, events, and commercial photography.',
    longDescription: 'FC Photo Houston is a professional photography studio serving the Greater Houston area. We built a visually stunning portfolio website that showcases their photography work, with optimized image loading, booking integration, and a focus on converting visitors into clients.',
    url: 'https://www.fcphotohouston.com/',
    industry: 'Photography & Creative',
    location: 'Houston, TX',
    services: ['Portfolio Website', 'Image Optimization', 'Booking System', 'Mobile Responsive'],
  },
  {
    name: 'Forge-X',
    shortName: 'Forge-X',
    description: 'Construction management platform helping contractors streamline project tracking, documentation, and team collaboration.',
    longDescription: 'Forge-X is a custom SaaS application we developed for construction project management. The platform includes daily logs, photo documentation, AI-powered reporting, PDF generation, and real-time collaboration features built with Next.js and Supabase.',
    url: 'https://forge-x.app/',
    industry: 'Construction Technology',
    location: 'Nationwide',
    services: ['Custom SaaS Application', 'AI Integration', 'Mobile PWA', 'Real-time Collaboration'],
  },
]

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "StephensCode Client Portfolio",
  "description": "Websites and applications built by StephensCode for Houston-area businesses",
  "numberOfItems": clients.length,
  "itemListElement": clients.map((client, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "WebSite",
      "name": client.name,
      "url": client.url,
      "description": client.description,
      "creator": {
        "@type": "Organization",
        "name": "StephensCode LLC",
        "url": "https://www.stephenscode.dev"
      }
    }
  }))
}

export default function PartnersPage() {
  const directories = partners.filter(p => p.category === 'directory')
  const certifications = partners.filter(p => p.category === 'certification')
  const partnersList = partners.filter(p => p.category === 'partner')

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Portfolio & Client Projects
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Explore websites and applications we&apos;ve built for Houston-area businesses. Real projects delivering real results for HVAC contractors, auto body shops, photographers, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Directories */}
      {directories.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured On</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {directories.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-primary-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    View Listing
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Certifications</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-gray-50 p-6 hover:border-accent-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
                    Learn More
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partnersList.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Partners</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnersList.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-primary-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    Visit Partner
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Websites - Portfolio Section */}
      {clients.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Web Development Portfolio</h2>
            <p className="text-gray-600 mb-8 text-lg">Custom websites and applications built for Texas businesses</p>
            <div className="grid gap-8 lg:grid-cols-2">
              {clients.map((client) => (
                <article
                  key={client.name}
                  className="group rounded-2xl border-2 border-gray-200 bg-gray-50 p-8 hover:border-accent-500 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                      {client.industry}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                      {client.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors mb-3">
                    {client.name}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {client.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {client.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center rounded-md bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700 ring-1 ring-inset ring-accent-600/20"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent-600 font-semibold group-hover:text-accent-700 transition-colors"
                  >
                    Visit {client.shortName} Website
                    <span aria-hidden="true" className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the businesses who trust StephensCode for their web development needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
