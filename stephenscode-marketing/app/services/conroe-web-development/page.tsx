import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Conroe Web Developer | Custom Websites for Local Businesses',
  description: 'Local Conroe web developer serving Montgomery County & Houston. Veteran-owned, 14+ years experience, 2,600+ projects. Custom websites, e-commerce, and SEO. Call (936) 323-4527.',
  keywords: [
    'Conroe web developer',
    'web developer Conroe TX',
    'Conroe website design',
    'Montgomery County web development',
    'veteran owned web developer Texas',
    'The Woodlands web developer',
    'Houston web developer',
    'local web developer near me'
  ],
  alternates: {
    canonical: '/services/conroe-web-development',
  },
  openGraph: {
    title: 'Conroe Web Developer | Custom Websites for Local Businesses',
    description: 'Local Conroe web developer. Veteran-owned, 14+ years experience, 2,600+ projects completed.',
    type: 'website',
  },
}

// Schema markup for the page
const pageSchemas = {
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conroe Web Development Services',
    serviceType: 'Web Development',
    provider: {
      '@type': 'LocalBusiness',
      name: 'StephensCode LLC',
      telephone: '+1-936-323-4527',
      email: 'kyle@stephenscode.dev',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Conroe',
        addressRegion: 'TX',
        addressCountry: 'US'
      }
    },
    areaServed: [
      { '@type': 'City', name: 'Conroe' },
      { '@type': 'City', name: 'The Woodlands' },
      { '@type': 'AdministrativeArea', name: 'Montgomery County' },
      { '@type': 'City', name: 'Houston' }
    ],
    description: 'Custom website design and development for Conroe and Montgomery County businesses. Veteran-owned with 14+ years experience.',
    offers: {
      '@type': 'Offer',
      price: '250',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '250',
        priceCurrency: 'USD',
        minPrice: '250'
      }
    }
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does it take to build a website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most websites are completed in 1-4 weeks depending on complexity. Simple Plug and Play sites take about 1 week, standard custom websites 3-4 weeks, and e-commerce sites 4-6 weeks.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer website maintenance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer ongoing website maintenance plans starting at $50/month. This includes security updates, content changes, backups, and performance monitoring.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you help with my existing website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We offer website rebuilds starting at $350 for existing sites that need a refresh. We can work with WordPress, WIX, GoDaddy, and custom-built sites.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you provide hosting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We help set up hosting on reliable platforms like Vercel, Netlify, or your preferred provider. Hosting costs are separate and typically $0-20/month depending on your needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'What if I need changes after launch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All projects include post-launch support (1-4 weeks depending on package). After that, you can either make changes yourself with training we provide, or use our maintenance plans for ongoing support.'
        }
      }
    ]
  }
}

export default function ConroeWebDevelopment() {
  const industries = [
    {
      name: 'Home Service Contractors',
      description: 'HVAC, plumbing, electrical, roofing, and landscaping companies need websites that generate leads and showcase their work.',
      icon: '🔧'
    },
    {
      name: 'Collision Repair Shops',
      description: 'Auto body shops and collision centers that need professional online presence and customer booking capabilities.',
      icon: '🚗'
    },
    {
      name: 'Construction Companies',
      description: 'General contractors, builders, and construction firms showcasing projects and attracting commercial clients.',
      icon: '🏗️'
    },
    {
      name: 'Professional Services',
      description: 'Lawyers, accountants, consultants, and other professionals needing credible, trustworthy websites.',
      icon: '💼'
    },
    {
      name: 'Restaurants & Retail',
      description: 'Local restaurants, shops, and retail businesses that need menus, locations, and online ordering.',
      icon: '🍽️'
    },
    {
      name: 'E-Commerce Businesses',
      description: 'Online stores selling products locally or nationally with payment processing and inventory management.',
      icon: '🛒'
    }
  ]

  const services = [
    {
      name: 'Custom Website Design & Development',
      description: 'Fully custom websites built from scratch with modern technologies. No templates, no WordPress bloat—just clean, fast, professional sites.',
      price: 'From $250'
    },
    {
      name: 'WordPress & CMS Solutions',
      description: 'If you need WordPress for easy content management, we build custom themes and optimize for speed and security.',
      price: 'From $600'
    },
    {
      name: 'E-Commerce Websites',
      description: 'Complete online stores with Stripe payment processing, inventory management, and secure checkout.',
      price: 'From $1,100'
    },
    {
      name: 'Mobile-Responsive Design',
      description: 'Every site we build works perfectly on phones, tablets, and desktops. Mobile-first approach for modern users.',
      price: 'Included'
    },
    {
      name: 'Website Maintenance & Updates',
      description: 'Keep your site secure, updated, and running smoothly with our maintenance plans.',
      price: 'From $50/mo'
    },
    {
      name: 'Hosting & Security Setup',
      description: 'We set up reliable hosting, SSL certificates, and security measures to protect your site and visitors.',
      price: 'Included'
    },
    {
      name: 'SEO-Optimized Development',
      description: 'Every site is built with search engines in mind—proper structure, fast loading, and technical SEO best practices.',
      price: 'Included'
    }
  ]

  const processSteps = [
    {
      number: '1',
      title: 'Discovery Call (Free)',
      description: 'We discuss your business, goals, and requirements. No sales pressure—just honest advice about what you need.'
    },
    {
      number: '2',
      title: 'Proposal & Timeline',
      description: 'You receive a detailed proposal with flat-rate pricing, timeline, and exactly what\'s included. No hidden fees.'
    },
    {
      number: '3',
      title: 'Design Mockups',
      description: 'We create design concepts for your approval before any development begins. You see exactly what you\'re getting.'
    },
    {
      number: '4',
      title: 'Development & Testing',
      description: 'We build your site with multiple rounds of revisions. You can preview and request changes throughout.'
    },
    {
      number: '5',
      title: 'Launch & Training',
      description: 'Your site goes live. We provide training on how to update content and manage your new website.'
    },
    {
      number: '6',
      title: 'Ongoing Support',
      description: 'Post-launch support included with every project. Optional maintenance plans for long-term peace of mind.'
    }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas.service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas.faq) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Services', href: '/services' },
          { name: 'Conroe Web Development', href: '/services/conroe-web-development' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-lg border border-white/20 mb-8">
              <span className="text-2xl">🇺🇸</span>
              <span>Veteran-Owned | Based in Conroe, TX</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Conroe Web Developer
              <span className="block text-accent-400">Custom Websites for Local Businesses</span>
            </h1>

            <p className="text-xl leading-8 text-gray-200 mb-8">
              Need a website that actually generates leads for your Conroe business? You've found your local web developer. Based right here in Montgomery County, I've spent 14+ years building websites that help local businesses grow. With 2,600+ completed projects, I understand what Conroe and Houston-area businesses need to succeed online.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="rounded-2xl bg-accent-500/20 px-6 py-4 border border-accent-500/30">
                <span className="block text-sm text-gray-200">Starting At</span>
                <span className="text-3xl font-bold text-white">$250</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/20">
                <span className="block text-sm text-gray-200">Projects Completed</span>
                <span className="text-3xl font-bold text-white">2,600+</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/20">
                <span className="block text-sm text-gray-200">Experience</span>
                <span className="text-3xl font-bold text-white">14+ Years</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+19363234527"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all"
              >
                <span>📞</span>
                <span>(936) 323-4527</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Why Choose Local Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Why Choose a Local Conroe Web Developer
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                When you work with a local Conroe web developer, you get more than just a website—you get a partner who understands your market. I know the Houston suburbs, the growth happening in Montgomery County, and the unique challenges local businesses face competing online.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Face-to-Face Meetings</h3>
                  <p className="text-gray-600">Available for in-person meetings in Conroe, The Woodlands, and throughout Montgomery County. Sometimes it's easier to discuss your project over coffee.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Local Market Knowledge</h3>
                  <p className="text-gray-600">I understand the Houston suburbs' growth, seasonal trends, and what local customers are searching for online.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Response Times</h3>
                  <p className="text-gray-600">Same timezone, same area code. When you need changes or have questions, you get fast responses—not offshore delays.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Support Veteran-Owned Business</h3>
                  <p className="text-gray-600">As a Marine Corps veteran, I bring military discipline and attention to detail to every project. Your success is my mission.</p>
                </div>
              </div>

              <p>
                I've worked with home service contractors, collision repair shops, construction companies, professional services, restaurants, and e-commerce businesses throughout the Conroe and Houston area. This local experience means I know what works for businesses like yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Web Development Services
            </h2>
            <p className="text-lg text-gray-600">
              Complete web solutions for Conroe and Montgomery County businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-primary-600 font-bold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Industries We Serve in Conroe & Montgomery County
            </h2>
            <p className="text-lg text-gray-600">
              Specialized experience with local businesses across these industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              Simple, transparent, and collaborative from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-200 h-full">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Transparent Pricing
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                One thing that sets me apart from other web developers: <strong>transparent, flat-rate pricing</strong>. No hourly rates that spiral out of control. No surprise bills at the end. You know exactly what you're paying before we start.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Website Package Starting Prices</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold">Plug and Play (WIX/GoDaddy redesign)</span>
                    <span className="text-primary-600 font-bold">$250</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold">Website Rebuild</span>
                    <span className="text-primary-600 font-bold">$350</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold">Standard Custom Website</span>
                    <span className="text-primary-600 font-bold">$850</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="font-semibold">E-Commerce Website</span>
                    <span className="text-primary-600 font-bold">$1,100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Premium Build (Admin Portal)</span>
                    <span className="text-primary-600 font-bold">$2,500+</span>
                  </div>
                </div>
              </div>

              <p>
                Every quote includes all design, development, mobile optimization, basic SEO, and post-launch support. No hidden fees. Flexible payment options available for larger projects.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
              >
                Get Your Custom Quote
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {pageSchemas.faq.mainEntity.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let's discuss your project. Free consultation, no obligation, no sales pressure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+19363234527"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>📞</span>
                <span>(936) 323-4527</span>
              </a>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20 inline-block">
              <p className="font-bold text-lg mb-1">Kyle Stephens</p>
              <p className="text-gray-300 text-sm">Founder & CTO</p>
              <p className="text-gray-300 text-sm">StephensCode LLC (Veteran-Owned)</p>
              <p className="text-gray-300 text-sm mt-2">
                <a href="mailto:kyle@stephenscode.dev" className="hover:text-white">kyle@stephenscode.dev</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Other Services You Might Need
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/services/api-integration"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">API Integration</h3>
              <p className="text-gray-600">Connect your business systems. CRM, payments, inventory—all working together.</p>
            </Link>
            <Link
              href="/services/web-scraping"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Web Scraping</h3>
              <p className="text-gray-600">Automated data extraction for lead generation, pricing analysis, and market research.</p>
            </Link>
            <Link
              href="/services/business-automation"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Business Automation</h3>
              <p className="text-gray-600">Stop wasting time on repetitive tasks. Automate your workflows and focus on growth.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
