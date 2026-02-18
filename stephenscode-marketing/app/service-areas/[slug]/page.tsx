import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serviceAreas, getServiceAreaBySlug, getAllServiceAreaSlugs } from '@/lib/service-areas-data'
import { getServiceAreaContent } from '@/lib/service-area-content'
import Breadcrumbs from '@/components/Breadcrumbs'

interface ServiceAreaPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    return {
      title: 'Service Area Not Found',
    }
  }

  return {
    title: `${area.name} Web Design & SEO | Websites from $250 | Free Quote`,
    description: `Need a website in ${area.name}? Get a custom site in 1-2 weeks. Flat-rate pricing from $250, no hidden fees. Veteran-owned, 14+ years exp. Call (936) 323-4527 for a free quote.`,
    alternates: {
      canonical: `/service-areas/${slug}`,
    },
    keywords: [
      `web developer ${area.name}`,
      `website design ${area.name} TX`,
      `${area.name} web development`,
      `custom website ${area.name}`,
      `SEO company ${area.name}`,
      `SEO services ${area.name}`,
      `small business website ${area.name}`,
      `${area.name} website designer`,
      `affordable web design ${area.name}`,
      `e-commerce ${area.name} TX`,
      `local SEO ${area.name}`,
      `web design company ${area.name}`,
    ],
    openGraph: {
      title: `${area.name} Web Design & SEO | Custom Websites from $250`,
      description: `Get a professional website for your ${area.name} business. Flat-rate pricing, fast turnaround, veteran-owned. Call for a free consultation.`,
      url: `https://stephenscode.dev/service-areas/${slug}`,
    },
  }
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params
  const area = getServiceAreaBySlug(slug)

  if (!area) {
    notFound()
  }

  // Load unique markdown content if available
  const markdownContent = await getServiceAreaContent(slug)

  // Enhanced schema with Service and FAQ
  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Web Development Services in ${area.name}, TX`,
    description: `Professional web development, SEO, and e-commerce services for businesses in ${area.name}, Texas. Custom websites starting at $250.`,
    url: `https://stephenscode.dev/service-areas/${slug}`,
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://stephenscode.dev/#organization',
      name: 'StephensCode',
      telephone: '+1-936-323-4527',
      email: 'kyle@stephenscode.dev',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2378 Strong Horse Dr',
        addressLocality: 'Conroe',
        addressRegion: 'TX',
        postalCode: '77301',
        addressCountry: 'US',
      },
      areaServed: {
        '@type': 'City',
        name: area.name,
        containedInPlace: {
          '@type': 'State',
          name: 'Texas',
        },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Website Development',
            },
            price: '250',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'E-Commerce Development',
            },
            price: '1100',
            priceCurrency: 'USD',
          },
        ],
      },
    },
  }

  // FAQ Schema for rich results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does a website cost for a ${area.name} business?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plug and Play sites (4 pages) are $250, Standard sites (8-12 pages) are $850, Website Rebuilds are $600, and E-Commerce stores are $1,100. Premium custom platforms start at $2,500. These are flat rates—not estimates that balloon later.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most business websites are completed in 1-2 weeks. Plug and Play sites can be done in 3-5 days. E-commerce takes 2-3 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: `Will my website rank in ${area.name} searches?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We build every site with local SEO best practices. Most clients see ranking improvements within 60-90 days. Results depend on your industry competition and ongoing SEO efforts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer ongoing maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer maintenance plans starting at $50/month including security updates, backups, content updates, and support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I update the website myself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We can integrate a content management system so you can update text, images, blog posts, and products without touching code. We provide training on how to use it.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Service Areas', href: '/service-areas' },
          { name: area.name, href: `/service-areas/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                All Service Areas
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Professional Web Development in {area.name}, Texas
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Custom websites, local SEO, and e-commerce solutions for {area.name} businesses.
              Veteran-owned with 14+ years of experience and transparent flat-rate pricing starting at $250.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:9363234527"
                className="rounded-md bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Call (936) 323-4527
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Markdown Content (if available) or Templated Introduction */}
      {markdownContent ? (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: markdownContent.content }}
            />
          </div>
        </section>
      ) : (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why {area.name} Businesses Need a Professional Web Developer
              </h2>

              <p className="text-gray-600 leading-8 mb-6">
                In today's digital-first economy, your website is often the first impression potential customers have of your {area.name} business. Whether you're a restaurant in {area.neighborhoods?.[0] || 'downtown'}, a contractor serving {area.name} homeowners, or a professional service provider looking to grow your client base, having a professionally designed website isn't optional—it's essential for survival and growth.
              </p>

              <p className="text-gray-600 leading-8 mb-6">
                The {area.name} market is competitive. With a population of {area.population} and growing, local businesses face increasing competition from both established companies and new entrants. Your website needs to do more than just exist—it needs to actively generate leads, build trust, and convert visitors into customers. That's where professional web development makes the difference.
              </p>

              <p className="text-gray-600 leading-8 mb-6">
                At StephensCode, we specialize in building custom websites for {area.name} small businesses. Based in nearby Conroe (just {area.distanceFromConroe} away), we understand the local market and what it takes to succeed here. We've helped dozens of businesses in {area.county} increase their online visibility, generate more leads, and grow their revenue through strategic web development.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                The Problem with Template Websites
              </h3>

              <p className="text-gray-600 leading-8 mb-6">
                Many {area.name} business owners start with template platforms like Wix, Squarespace, or GoDaddy website builders. While these seem convenient and affordable at first, they create serious problems for local businesses trying to compete:
              </p>

              <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                <li><strong>Slow loading speeds</strong> – Template sites average 4-6 seconds to load. Google recommends under 2.5 seconds. Slow sites lose customers and rank poorly in search results.</li>
                <li><strong>Generic appearance</strong> – Your {area.name} competitors are using the same templates. Customers can't tell you apart, so they choose based on price alone.</li>
                <li><strong>SEO limitations</strong> – Template platforms restrict access to technical SEO elements. You can't fully optimize for "{area.name}" searches.</li>
                <li><strong>No ownership</strong> – Stop paying the monthly fee and your site disappears. You don't own the code, design, or sometimes even your content.</li>
                <li><strong>Hidden costs</strong> – That $29/month quickly becomes $100+ when you add necessary features. After 2-3 years, you've paid more than a custom site costs.</li>
              </ul>

              <p className="text-gray-600 leading-8 mb-6">
                A custom website solves all these problems. It loads fast (under 2 seconds), looks unique to your brand, ranks better in local search, and you own it forever. For {area.name} businesses serious about growth, it's the only real choice.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                Understanding the {area.name} Market
              </h3>

              <p className="text-gray-600 leading-8 mb-6">
                {area.description}
              </p>

              <p className="text-gray-600 leading-8 mb-6">
                The local economy in {area.name} is driven by diverse industries including {area.businessTypes.slice(0, 4).join(', ')}, and more. Each of these sectors has unique website needs, and we have experience serving them all.
              </p>

              <p className="text-gray-600 leading-8 mb-6">
                Key characteristics of the {area.name} market that affect web development strategy:
              </p>

              <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                {area.localFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <p className="text-gray-600 leading-8 mb-6">
                Understanding these local factors helps us build websites that resonate with {area.name} customers and rank for the searches they're actually making.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services Detail Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Web Development Services for {area.name} Businesses
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Custom Website Development
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Our custom websites are built specifically for your {area.name} business—not modified from a template. Every element is designed to achieve your business goals, whether that's generating phone calls, booking appointments, or selling products online.
            </p>

            <p className="text-gray-600 leading-8 mb-4">
              <strong>What's included:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Custom design tailored to your brand and industry</li>
              <li>Mobile-first development (over 70% of {area.name} searches are mobile)</li>
              <li>Fast loading speeds (under 2 seconds)</li>
              <li>Contact forms, click-to-call, and lead capture</li>
              <li>Google Analytics and Search Console setup</li>
              <li>Basic SEO optimization for {area.name} keywords</li>
              <li>SSL security certificate</li>
              <li>90 days of post-launch support</li>
            </ul>

            <p className="text-gray-600 leading-8 mb-6">
              <strong>Pricing:</strong> Plug and Play (4 pages) starts at $250. Standard sites (8-12 pages) are $850. Website rebuilds are $600.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Local SEO for {area.name}
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Getting found in "{area.name}" searches requires specialized local SEO. When someone searches "plumber {area.name}" or "restaurant near me" from {area.neighborhoods?.[0] || area.name}, you need to appear in the results—and our SEO-optimized sites make that happen.
            </p>

            <p className="text-gray-600 leading-8 mb-4">
              <strong>Local SEO elements we implement:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Location-specific keyword optimization throughout your site</li>
              <li>LocalBusiness schema markup for rich search results</li>
              <li>NAP consistency (Name, Address, Phone) across all pages</li>
              <li>Google Business Profile optimization guidance</li>
              <li>Local citation building recommendations</li>
              <li>Neighborhood and area-specific landing pages</li>
              <li>Mobile optimization for "near me" searches</li>
              <li>Fast Core Web Vitals scores (Google ranking factor)</li>
            </ul>

            <p className="text-gray-600 leading-8 mb-6">
              Most clients see significant ranking improvements within 60-90 days. One {area.county} contractor went from page 4 to page 1 for their main service keywords after we rebuilt their site with proper local SEO.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              E-Commerce for {area.name} Retailers
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Whether you're a {area.name} boutique looking to sell online, a restaurant adding online ordering, or a service business selling gift cards and merchandise, we build complete e-commerce solutions that work.
            </p>

            <p className="text-gray-600 leading-8 mb-4">
              <strong>E-commerce features include:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Product catalog with categories and filters</li>
              <li>Shopping cart and secure checkout</li>
              <li>Payment processing (Stripe, PayPal, Square)</li>
              <li>Inventory management</li>
              <li>Order notifications and tracking</li>
              <li>Shipping rate integration (USPS, UPS, FedEx)</li>
              <li>Tax calculation</li>
              <li>Customer accounts (optional)</li>
              <li>Product management dashboard</li>
            </ul>

            <p className="text-gray-600 leading-8 mb-6">
              <strong>Pricing:</strong> E-commerce sites start at $1,100. This includes everything you need to start selling online.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Website Maintenance & Support
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Your website needs ongoing care to stay secure, fast, and effective. We offer maintenance plans for {area.name} businesses who want peace of mind without the hassle.
            </p>

            <p className="text-gray-600 leading-8 mb-4">
              <strong>Maintenance plans include:</strong>
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Security monitoring and updates</li>
              <li>Regular backups</li>
              <li>Uptime monitoring</li>
              <li>Content updates (text, images, pricing)</li>
              <li>Performance optimization</li>
              <li>Priority support</li>
            </ul>

            <p className="text-gray-600 leading-8 mb-6">
              <strong>Pricing:</strong> Plans start at $50/month for basic maintenance, $100/month for standard (includes content updates), and $150/month for premium (includes priority support and unlimited small updates).
            </p>
          </div>
        </div>
      </section>

      {/* Industries We Serve - Detailed */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Industries We Serve in {area.name}
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-8 mb-6">
              We've built websites for {area.name} businesses across virtually every industry. Here are some of the sectors we serve most frequently:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {area.businessTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{type}</h4>
                  <p className="text-sm text-gray-600">
                    Custom solutions for {area.name} {type.toLowerCase()} businesses with industry-specific features and local SEO.
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Home Services & Contractors
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              {area.name} homeowners need reliable contractors, and they're searching online to find them. We build websites for HVAC companies, plumbers, electricians, roofers, landscapers, and general contractors that generate phone calls and quote requests.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Key features for contractor sites: emergency contact buttons, service area maps, before/after galleries, license and insurance badges, customer reviews, and online quote request forms.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Healthcare & Medical Practices
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              {area.name} has a growing healthcare sector serving the local population. We build websites for dentists, doctors, chiropractors, veterinarians, therapists, and other medical professionals that build trust and streamline patient acquisition.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Key features for medical sites: online appointment booking, patient portal integration, provider profiles with credentials, HIPAA-compliant contact forms, insurance information, and new patient resources.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Restaurants & Food Service
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              {area.name}'s dining scene ranges from casual eateries to upscale restaurants. We build websites that showcase your menu, handle online orders, take reservations, and promote specials—all optimized to appear when locals search for places to eat.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Key features for restaurant sites: online menus with dietary filters, reservation systems, online ordering integration, event and catering inquiry forms, location and hours, and photo galleries.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              Professional Services
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              Law firms, accountants, financial advisors, consultants, and other professional service providers in {area.name} need websites that establish credibility and generate qualified leads. We build sophisticated sites that position you as the expert choice.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Key features for professional service sites: attorney/advisor profiles with credentials, practice area pages, case studies or client results, consultation request forms, blog for thought leadership, and testimonials.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      {area.neighborhoods && area.neighborhoods.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Serving All {area.name} Neighborhoods
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-8 mb-6">
                We provide web development services throughout {area.name} and all surrounding neighborhoods. Whether your business is located in {area.neighborhoods[0]}, {area.neighborhoods[1] || area.neighborhoods[0]}, or anywhere else in the area, we're here to help you succeed online.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {area.neighborhoods.map((neighborhood, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-8 mb-6">
                Each neighborhood in {area.name} has its own character and customer base. We take these local nuances into account when building your website, ensuring it resonates with your specific target audience and ranks for hyperlocal searches.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Our Process */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Our Web Development Process
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-8 mb-6">
              We've refined our process over 14+ years to deliver excellent results efficiently. Here's what to expect when you work with us on your {area.name} business website:
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              1. Discovery & Consultation (Free)
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We start with a free consultation to understand your business, goals, and target customers. For {area.name} businesses, we'll discuss local competition, target neighborhoods, and search terms your customers use. This conversation shapes everything that follows.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. Proposal & Agreement
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Based on our discussion, we'll provide a detailed proposal with exactly what's included, the total price, and the timeline. No surprises, no hidden fees. Once you approve, we collect 50% deposit and get started.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              3. Design & Content
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We create design mockups for your review and collect your content (text, photos, etc.). We'll provide a content questionnaire to make this easy. You'll see the design before we build, ensuring it matches your vision.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              4. Development
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We build your site with clean code, fast loading, and all the features we agreed on. We develop on a staging server so you can review progress without affecting any existing site.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              5. Review & Revisions
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              You review the completed site and we make revisions based on your feedback. All packages include 2 rounds of revisions—usually plenty to get everything perfect.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              6. Launch & Training
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Once approved, we launch your new site, connect analytics, and provide training on how to make basic updates. We collect the remaining 50% payment at this stage.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              7. Ongoing Support
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              You get 90 days of free support for questions and minor adjustments. After that, we're available for additional work or ongoing maintenance as needed.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              <strong>Timeline:</strong> Most {area.name} business websites are completed in 1-2 weeks from start to finish, assuming prompt feedback and content delivery from you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Detailed */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Why {area.name} Businesses Choose StephensCode
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Local Knowledge & Presence
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Based in Conroe, we're just {area.distanceFromConroe} from {area.name}. We understand {area.county} and the Greater Houston market. We know what local customers search for, what competitors are doing, and what it takes to succeed here. And if you prefer meeting in person, we can do that.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Transparent Flat-Rate Pricing
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              No hourly billing that spirals out of control. No hidden fees. No "it'll cost extra" surprises. You know exactly what you'll pay before we start. This is how pricing should work, and it's how we've always operated.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Direct Developer Communication
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              You work directly with the developer building your site—not a salesperson, not an account manager, not a project coordinator. This means faster communication, fewer misunderstandings, and better results.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Modern Technology & Best Practices
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We use Next.js and modern frameworks that deliver exceptional performance. Our sites load fast, score high on Google PageSpeed, and are built with current SEO best practices. No outdated WordPress themes or clunky page builders.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Veteran-Owned Integrity
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              As a Marine Corps veteran with 14+ years of experience, I bring military discipline and integrity to every project. I do what I say I'll do, when I say I'll do it. Your success is my reputation.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Results That Matter
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We don't just build pretty websites—we build websites that generate business. Better search rankings, more phone calls, more quote requests, more sales. That's what we're optimizing for.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Frequently Asked Questions from {area.name} Business Owners
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              How much does a website cost for a {area.name} business?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Our pricing is straightforward: Plug and Play sites (4 pages) are $250, Standard sites (8-12 pages) are $850, Website Rebuilds are $600, and E-Commerce stores are $1,100. Premium custom platforms start at $2,500. These are flat rates—not estimates that balloon later.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              How long does it take to build a website?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Most {area.name} business websites are completed in 1-2 weeks. Plug and Play sites can be done in 3-5 days. E-commerce takes 2-3 weeks. These timelines assume prompt feedback and content from you—delays on your end extend the timeline.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Will my website rank in {area.name} searches?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              We build every site with local SEO best practices. This gives you a strong foundation for ranking in "{area.name}" and "near me" searches. Most clients see ranking improvements within 60-90 days. Results depend on your industry's competition and your ongoing SEO efforts.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Do you offer ongoing maintenance?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Yes, we offer maintenance plans starting at $50/month. These include security updates, backups, content updates, and support. Many {area.name} business owners prefer this for peace of mind and to keep their sites fresh.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Can I update the website myself?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Yes! We can integrate a content management system so you can update text, images, blog posts, and products without touching code. We provide training on how to use it. Many {area.name} business owners prefer to handle simple updates themselves.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Do you work with businesses outside {area.name}?
            </h3>
            <p className="text-gray-600 leading-8 mb-6">
              Absolutely. While we're highlighting our services in {area.name} on this page, we serve all of Greater Houston and work with clients nationwide. Everything can be done remotely via video calls and email.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Grow Your {area.name} Business Online?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Let's discuss your project. Free consultation, no pressure, just honest advice about what you need to succeed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:9363234527"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Service Areas */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Other Areas We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas
              .filter(a => a.slug !== slug)
              .map((otherArea) => (
                <Link
                  key={otherArea.slug}
                  href={`/service-areas/${otherArea.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  {otherArea.name}
                </Link>
              ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/service-areas"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View all service areas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
