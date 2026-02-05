import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Portfolio | Custom Websites Houston | Veteran Owned Developer',
  description: 'Conroe web developer client portfolio. Small business website Texas projects. Custom website Houston, affordable web design. Veteran owned web developer.',
  keywords: [
    'Conroe web developer',
    'Houston web development',
    'custom website Houston',
    'small business website Texas',
    'veteran owned web developer',
    'affordable web design Houston',
    'The Woodlands web developer'
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
  pageCount?: number // Total pages built
  samplePages?: string[] // Example page paths to show scope of work
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
    name: 'Stephen Long for Congress TX-8',
    shortName: 'Stephen Long',
    description: 'Congressional campaign website for Texas District 8 Republican primary with interactive maps and donation integration.',
    longDescription: 'Stephen Long is running for U.S. Congress in Texas District 8 on a platform of fiscal responsibility. We built his complete campaign website featuring interactive district maps, detailed policy positions, volunteer signup forms, donation integration, and event calendars. The SEO-optimized site helps voters in Montgomery County and The Woodlands learn about his platform.',
    url: 'https://stephenlongforcongress.com',
    industry: 'Political Campaign',
    location: 'Montgomery County, TX',
    services: ['Campaign Website', 'Interactive Maps', 'Donation Integration', 'SEO Optimization'],
    pageCount: 12,
    samplePages: ['/about', '/issues', '/volunteer', '/donate', '/events', '/contact'],
  },
  {
    name: 'Lefty Cartel',
    shortName: 'Lefty Cartel',
    description: 'Members-only baseball apparel e-commerce with subscription billing and exclusive monthly perks.',
    longDescription: 'Lefty Cartel is a unique members-only baseball apparel brand built by a father-son duo and Air Force veteran. We developed their complete e-commerce platform featuring $50/month Stripe subscription billing, exclusive member benefits including a FREE item every month, full admin dashboard with analytics, and integrated USPS/UPS shipping.',
    url: 'https://leftycartel.net',
    industry: 'E-Commerce / Membership',
    location: 'Nationwide',
    services: ['Membership Platform', 'Stripe Subscriptions', 'Admin Dashboard', 'Shipping Integration'],
    pageCount: 35,
    samplePages: ['/shop', '/membership', '/about', '/account', '/cart', '/checkout'],
  },
  {
    name: 'JustWell Clinical Research',
    shortName: 'JustWell',
    description: 'Professional website for Houston-based clinical research company conducting medical studies.',
    longDescription: 'JustWell Clinical Research conducts medical research studies in the Houston area with their tagline "Research You Can Trust." We built their professional website featuring information about their therapeutic areas, company background, and contact capabilities. The clean, trustworthy design with their signature teal and gold branding helps patients and sponsors learn about their clinical trial services.',
    url: 'https://www.justwellclinical.org',
    industry: 'Healthcare',
    location: 'Houston, TX',
    services: ['Custom Website', 'Mobile Responsive', 'Contact Forms', 'SEO Optimization'],
    pageCount: 8,
    samplePages: ['/about', '/therapeutic-areas', '/for-patients', '/for-sponsors', '/contact'],
  },
  {
    name: 'Terracotta Construction',
    shortName: 'Terracotta',
    description: 'Houston-area general contractor specializing in residential and commercial construction projects.',
    longDescription: 'Terracotta Construction is a trusted Houston-area general contractor delivering quality residential and commercial construction services. We built their professional website featuring project galleries showcasing their craftsmanship, detailed service pages for each construction specialty, and integrated lead capture forms that connect potential clients directly with their team.',
    url: 'https://terracottaconstruction.com',
    industry: 'Construction',
    location: 'Houston, TX',
    services: ['Custom Website', 'SEO Optimization', 'Contact Forms', 'Project Gallery'],
    pageCount: 15,
    samplePages: ['/services', '/residential', '/commercial', '/gallery', '/about', '/contact'],
  },
  {
    name: 'ColorFuse Prints',
    shortName: 'ColorFuse',
    description: 'Custom printing and promotional products e-commerce with 400+ product pages and online customization tools.',
    longDescription: 'ColorFuse Prints offers custom printing services for businesses and individuals, from business cards to promotional materials. We built their complete e-commerce platform with 400+ product pages, product customization tools that let customers design their own products, a robust shopping cart system, secure payment processing, and order management backend.',
    url: 'https://www.colorfuseprints.com',
    industry: 'E-Commerce / Print',
    location: 'Nationwide',
    services: ['E-Commerce', 'Product Customization', 'Order System', 'Payment Integration'],
    pageCount: 400,
    samplePages: ['/products', '/business-cards', '/banners', '/apparel', '/promotional', '/signs', '/stickers', '/flyers', '/brochures', '/postcards', '/cart', '/checkout', '/account', '/order-history'],
  },
  {
    name: 'SACVPN',
    shortName: 'SACVPN',
    description: 'Zero-log enterprise VPN service providing secure, private internet access for businesses.',
    longDescription: 'SACVPN is a zero-log enterprise VPN solution built for businesses and privacy-conscious users who demand true security. We developed the complete platform including user account management, Stripe subscription billing with multiple pricing tiers, secure authentication systems, and server connection infrastructure. The platform serves enterprise clients with centralized team management and dedicated IP options.',
    url: 'https://www.sacvpn.com',
    industry: 'Cybersecurity',
    location: 'Nationwide',
    services: ['Enterprise Platform', 'Payment Processing', 'User Management', 'Subscription System'],
    pageCount: 25,
    samplePages: ['/pricing', '/features', '/enterprise', '/download', '/servers', '/account', '/dashboard'],
  },
  {
    name: 'AMW Air Conditioning & Heating',
    shortName: 'AMW Cooling',
    description: 'Full-service HVAC company serving the Greater Houston area with residential and commercial heating and cooling solutions.',
    longDescription: 'We built a comprehensive website for AMW Air Conditioning & Heating, a trusted HVAC contractor serving Houston, Conroe, and The Woodlands. The site features online scheduling, service area pages, emergency contact functionality, and SEO optimization to help them rank for local HVAC searches.',
    url: 'https://www.amwairconditioning.com/',
    industry: 'HVAC & Home Services',
    location: 'Houston, TX',
    services: ['Custom Website', 'SEO Optimization', 'Mobile Responsive', 'Online Scheduling'],
    pageCount: 18,
    samplePages: ['/services', '/ac-repair', '/heating', '/installation', '/maintenance', '/service-areas', '/contact'],
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
    pageCount: 10,
    samplePages: ['/services', '/collision-repair', '/paint', '/gallery', '/estimate', '/contact'],
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
    pageCount: 8,
    samplePages: ['/services', '/about', '/resources', '/contact'],
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
    pageCount: 20,
    samplePages: ['/portfolio', '/portraits', '/events', '/commercial', '/pricing', '/booking', '/contact'],
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
    pageCount: 50,
    samplePages: ['/dashboard', '/projects', '/daily-logs', '/photos', '/reports', '/team', '/settings'],
  },
]

// Calculate total pages built across all clients
const totalPagesBuilt = clients.reduce((sum, client) => sum + (client.pageCount || 0), 0)

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "StephensCode Client Portfolio",
  "description": `${totalPagesBuilt}+ web pages built by StephensCode for Houston-area businesses`,
  "numberOfItems": clients.length,
  "itemListElement": clients.map((client, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "WebSite",
      "name": client.name,
      "url": client.url,
      "description": client.pageCount
        ? `${client.description} (${client.pageCount} pages built)`
        : client.description,
      "creator": {
        "@type": "Organization",
        "name": "StephensCode LLC",
        "url": "https://stephenscode.dev"
      },
      // Include sample pages as significant links for SEO
      ...(client.samplePages && client.samplePages.length > 0 && {
        "hasPart": client.samplePages.map(page => ({
          "@type": "WebPage",
          "url": `${client.url}${page}`,
          "isPartOf": { "@id": client.url }
        }))
      })
    }
  }))
}

// Additional CreativeWork schema showing the scope of development work
const workExamplesSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://stephenscode.dev/#organization",
  "name": "StephensCode LLC",
  "workExample": clients.map(client => ({
    "@type": "WebSite",
    "name": client.name,
    "url": client.url,
    "description": client.longDescription,
    "genre": client.industry,
    "locationCreated": {
      "@type": "Place",
      "name": client.location
    },
    "creator": {
      "@type": "Organization",
      "name": "StephensCode LLC"
    },
    // Show page count as part of the work scope
    ...(client.pageCount && {
      "hasPart": {
        "@type": "ItemList",
        "numberOfItems": client.pageCount,
        "description": `${client.pageCount} pages developed`,
        ...(client.samplePages && {
          "itemListElement": client.samplePages.slice(0, 10).map((page, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "WebPage",
              "url": `${client.url}${page}`
            }
          }))
        })
      }
    })
  }))
}

export default function PartnersPage() {
  const directories = partners.filter(p => p.category === 'directory')
  const certifications = partners.filter(p => p.category === 'certification')
  const partnersList = partners.filter(p => p.category === 'partner')

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Schema.org JSON-LD - Portfolio list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      {/* Schema.org JSON-LD - Work examples with page details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workExamplesSchema) }}
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
