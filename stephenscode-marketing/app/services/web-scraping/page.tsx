import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Web Scraping Services | Custom Data Extraction Solutions',
  description: 'Professional web scraping services with 500+ projects completed. Lead generation, price monitoring, market research. Python, Scrapy, Playwright. Ethical data extraction.',
  keywords: [
    'web scraping services',
    'data extraction services',
    'web scraping developer',
    'custom web scraper',
    'Python web scraping',
    'lead generation scraping',
    'price monitoring scraper',
    'web scraping freelancer'
  ],
  alternates: {
    canonical: '/services/web-scraping',
  },
  openGraph: {
    title: 'Web Scraping Services | Custom Data Extraction Solutions',
    description: 'Professional web scraping with 500+ projects. Lead generation, pricing data, market research.',
    type: 'website',
  },
}

// Schema markup for the page
const pageSchemas = {
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Scraping Services',
    serviceType: 'Data Extraction',
    provider: {
      '@type': 'Organization',
      name: 'StephensCode LLC',
      telephone: '+1-936-323-4527',
      email: 'kyle@stephenscode.dev'
    },
    description: 'Professional web scraping and data extraction services. 500+ projects completed including lead generation, price monitoring, and market research.',
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is web scraping legal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Web scraping of publicly available data is generally legal in the United States. We only scrape public data, respect robots.txt files, and follow ethical practices. We do not scrape private data, bypass authentication, or violate terms of service.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you handle sites that block scrapers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use sophisticated techniques including rotating proxies, browser automation, and rate limiting to scrape challenging sites ethically. If a site actively blocks scraping, we discuss alternatives or whether the data is worth the additional complexity.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you scrape data behind a login?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but only with proper authorization. If you have login credentials and permission to access the data, we can automate the extraction. We never access accounts without authorization or scrape private user data.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often can data be updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Scrapes can run hourly, daily, weekly, or on any schedule you need. Real-time monitoring is possible for price changes or inventory updates. We set up automated scheduling and alerting based on your requirements.'
        }
      }
    ]
  }
}

export default function WebScraping() {
  const useCases = [
    {
      name: 'Lead Generation',
      description: 'Compile contact lists from business directories, LinkedIn, industry websites, and public databases. Build targeted prospect lists for your sales team.',
      icon: '📋',
      examples: ['Business directory scraping', 'Company contact extraction', 'Event attendee lists']
    },
    {
      name: 'E-Commerce Price Monitoring',
      description: 'Track competitor prices across multiple retailers. Get alerts when prices change. Maintain competitive pricing automatically.',
      icon: '💰',
      examples: ['Amazon price tracking', 'Competitor price alerts', 'MAP compliance monitoring']
    },
    {
      name: 'Real Estate Data',
      description: 'Aggregate property listings from multiple sources. Track prices, days on market, and market trends across regions.',
      icon: '🏠',
      examples: ['MLS aggregation', 'Rental price monitoring', 'Property investment analysis']
    },
    {
      name: 'Job Board Monitoring',
      description: 'Track job postings from multiple sources. Monitor competitors\' hiring activity. Aggregate industry job data.',
      icon: '💼',
      examples: ['Competitor hiring tracking', 'Salary data collection', 'Job market analysis']
    },
    {
      name: 'Review & Sentiment Collection',
      description: 'Gather customer reviews from multiple platforms. Analyze sentiment and track reputation over time.',
      icon: '⭐',
      examples: ['Review aggregation', 'Sentiment analysis', 'Reputation monitoring']
    },
    {
      name: 'News & Content Monitoring',
      description: 'Track mentions of your brand, competitors, or industry topics. Get alerts when relevant content is published.',
      icon: '📰',
      examples: ['Brand mention tracking', 'Industry news aggregation', 'Content research']
    }
  ]

  const deliverables = [
    {
      format: 'CSV/Excel',
      description: 'Clean, structured spreadsheets ready for analysis or import into your systems.',
      icon: '📊'
    },
    {
      format: 'JSON Files',
      description: 'Developer-friendly format for direct integration with your applications.',
      icon: '{ }'
    },
    {
      format: 'Database Integration',
      description: 'Direct insertion into your database (PostgreSQL, MySQL, MongoDB, etc.).',
      icon: '🗄️'
    },
    {
      format: 'Scheduled Scrapes',
      description: 'Automated recurring extractions delivered on your schedule.',
      icon: '🔄'
    },
    {
      format: 'API Endpoints',
      description: 'Your own API to query scraped data on demand.',
      icon: '🔗'
    }
  ]

  const ethicalPractices = [
    {
      practice: 'Respect robots.txt',
      description: 'We follow the rules websites set for crawlers. If a site says "don\'t scrape," we respect that.'
    },
    {
      practice: 'Rate Limiting',
      description: 'We don\'t hammer servers. Requests are spaced out to avoid impacting site performance.'
    },
    {
      practice: 'Public Data Only',
      description: 'We only scrape publicly accessible data. No bypassing paywalls or accessing private information.'
    },
    {
      practice: 'Terms of Service',
      description: 'We consider website terms of service and discuss any potential concerns before starting a project.'
    },
    {
      practice: 'Data Privacy',
      description: 'Personal data is handled carefully. We follow data protection principles and discuss compliance requirements.'
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
          { name: 'Web Scraping', href: '/services/web-scraping' },
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
              <span className="text-2xl">📊</span>
              <span>500+ Web Scraping Projects Completed</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Web Scraping Services
              <span className="block text-accent-400">Custom Data Extraction Solutions</span>
            </h1>

            <p className="text-xl leading-8 text-gray-200 mb-8">
              Need data that's trapped on websites? Lead lists, competitor prices, market research, real estate listings—I can extract and structure it for you. With 500+ web scraping projects completed, I've tackled everything from simple directory scrapes to complex JavaScript-heavy sites.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="rounded-2xl bg-accent-500/20 px-6 py-4 border border-accent-500/30">
                <span className="block text-sm text-gray-200">Projects Completed</span>
                <span className="text-3xl font-bold text-white">500+</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/20">
                <span className="block text-sm text-gray-200">Technologies</span>
                <span className="text-3xl font-bold text-white">Python, Scrapy, Playwright</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Discuss Your Data Needs
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

      {/* What Can Web Scraping Do Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              What Can Web Scraping Do for Your Business
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Data is everywhere on the web, but it's often trapped in formats that aren't useful. Hundreds of pages of search results. Thousands of product listings. Endless directories without export buttons. Web scraping extracts that data and delivers it in formats you can actually use.
              </p>

              <p className="mb-6">
                <strong>The manual approach:</strong> Copy and paste, one entry at a time. Maybe export a few results if you're lucky. Hours of tedious work that's prone to errors.
              </p>

              <p className="mb-6">
                <strong>The scraping approach:</strong> Extract thousands of records automatically. Clean, structured data delivered to your spreadsheet, database, or CRM. What takes days manually takes minutes with automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Web Scraping Use Cases
            </h2>
            <p className="text-lg text-gray-600">
              Common projects I've completed for clients across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.name}
                className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.name}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-1">
                  {useCase.examples.map((example) => (
                    <div key={example} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-green-500">✓</span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Web Scraping Experience & Technologies
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                With <strong>500+ web scraping projects</strong> completed, I've developed scrapers for every imaginable scenario. Simple static sites, complex JavaScript-rendered applications, sites with anti-bot measures—each presents unique challenges I've learned to overcome.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies & Tools</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Languages</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Python (primary)</li>
                      <li>• Node.js</li>
                      <li>• TypeScript</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Frameworks</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Scrapy (large-scale)</li>
                      <li>• BeautifulSoup (parsing)</li>
                      <li>• Playwright (JavaScript sites)</li>
                      <li>• Selenium (browser automation)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Infrastructure</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Rotating proxies</li>
                      <li>• Distributed scraping</li>
                      <li>• Cloud deployment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Capabilities</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• JavaScript rendering</li>
                      <li>• Anti-bot bypass (ethical)</li>
                      <li>• Data cleaning & validation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Approach Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Our Approach to Ethical Web Scraping
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-8">
                Web scraping is powerful, but it comes with responsibility. I follow ethical practices that respect website owners while still getting you the data you need.
              </p>

              <div className="space-y-6">
                {ethicalPractices.map((item) => (
                  <div key={item.practice} className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.practice}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Deliverables & Data Formats
            </h2>
            <p className="text-lg text-gray-600">
              Your data, delivered in the format that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {deliverables.map((item) => (
              <div
                key={item.format}
                className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.format}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Pricing Models
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-8">
                Web scraping projects vary widely in complexity. Here's how I typically structure pricing:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">One-Time Scrape</h3>
                  <p className="text-gray-600 mb-4">Single extraction of data from one or more sources. You receive the data file(s).</p>
                  <p className="text-primary-600 font-bold">From $200</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Recurring Scrapes</h3>
                  <p className="text-gray-600 mb-4">Scheduled extractions (hourly, daily, weekly) with automated delivery.</p>
                  <p className="text-primary-600 font-bold">From $150/month</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Scraper Development + Handoff</h3>
                  <p className="text-gray-600 mb-4">I build the scraper, you run it on your infrastructure. Full documentation included.</p>
                  <p className="text-primary-600 font-bold">From $500</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance Retainer</h3>
                  <p className="text-gray-600 mb-4">Ongoing maintenance when sites change. Priority support and updates.</p>
                  <p className="text-primary-600 font-bold">From $100/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {pageSchemas.faq.mainEntity.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
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
              Let's Extract Your Data
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Tell me what data you need. Free consultation to scope your project and discuss the best approach.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Discuss Your Data Needs
              </Link>
              <a
                href="tel:+19363234527"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>📞</span>
                <span>(936) 323-4527</span>
              </a>
            </div>

            <p className="text-gray-300">
              <a href="mailto:kyle@stephenscode.dev" className="hover:text-white underline">kyle@stephenscode.dev</a>
            </p>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Related Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/services/conroe-web-development"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Web Development</h3>
              <p className="text-gray-600">Need a website to display or manage your scraped data?</p>
            </Link>
            <Link
              href="/services/api-integration"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">API Integration</h3>
              <p className="text-gray-600">When APIs exist, we use them. Scraping is for when they don't.</p>
            </Link>
            <Link
              href="/services/business-automation"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Business Automation</h3>
              <p className="text-gray-600">Automate what happens with your data after extraction.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
