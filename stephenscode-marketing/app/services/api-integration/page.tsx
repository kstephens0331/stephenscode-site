import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'API Integration Services | Connect Your Business Systems',
  description: 'Expert API integration developer with 200+ projects completed. Connect CRM, payments, e-commerce, and accounting systems. REST, SOAP, GraphQL. Call (936) 323-4527.',
  keywords: [
    'API integration developer',
    'API integration services',
    'custom API development',
    'third-party API integration',
    'API integration freelancer',
    'Salesforce API integration',
    'Stripe integration developer',
    'HubSpot API integration'
  ],
  alternates: {
    canonical: '/services/api-integration',
  },
  openGraph: {
    title: 'API Integration Services | Connect Your Business Systems',
    description: 'Expert API integration with 200+ projects completed. REST, SOAP, GraphQL.',
    type: 'website',
  },
}

// Schema markup for the page
const pageSchemas = {
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'API Integration Services',
    serviceType: 'Software Development',
    provider: {
      '@type': 'Organization',
      name: 'StephensCode LLC',
      telephone: '+1-936-323-4527',
      email: 'kyle@stephenscode.dev'
    },
    description: 'Professional API integration services connecting business systems including CRM, payments, e-commerce, and accounting platforms. 200+ projects completed.',
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does API integration take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simple integrations (like connecting Stripe to your website) typically take 1-2 days. Complex multi-system integrations can take 1-4 weeks depending on requirements, documentation quality, and testing needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'What if the API doesn\'t have documentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I\'ve worked with poorly documented and undocumented APIs many times. Through reverse engineering and testing, I can usually figure out how to make the integration work. This may require additional time for research and testing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you maintain integrations after launch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I offer ongoing maintenance plans for API integrations. APIs change over time, and maintenance ensures your integrations continue working. Plans start at $100/month depending on complexity.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can you work with APIs I haven\'t listed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. I\'ve worked with hundreds of different APIs across many industries. If it has an API (or even if you\'re not sure), let\'s discuss your requirements. Most APIs follow similar patterns once you understand them.'
        }
      }
    ]
  }
}

export default function APIIntegration() {
  const commonIntegrations = [
    {
      category: 'CRM Integrations',
      description: 'Connect your customer data across all systems.',
      platforms: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Monday.com']
    },
    {
      category: 'Payment Processing',
      description: 'Secure payment integrations for your business.',
      platforms: ['Stripe', 'Square', 'PayPal', 'Authorize.net', 'Braintree']
    },
    {
      category: 'E-Commerce Platforms',
      description: 'Sync orders, inventory, and customers.',
      platforms: ['Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Square Online']
    },
    {
      category: 'Accounting Software',
      description: 'Automate invoicing and financial data.',
      platforms: ['QuickBooks', 'Xero', 'FreshBooks', 'Wave', 'Sage']
    },
    {
      category: 'Marketing Automation',
      description: 'Connect your marketing stack for better campaigns.',
      platforms: ['Mailchimp', 'ActiveCampaign', 'Klaviyo', 'Constant Contact', 'SendGrid']
    },
    {
      category: 'Custom Internal Systems',
      description: 'Connect your proprietary systems.',
      platforms: ['Legacy databases', 'Custom software', 'Internal tools', 'ERP systems']
    }
  ]

  const processSteps = [
    {
      number: '1',
      title: 'Requirements Analysis',
      description: 'We discuss what systems need to connect, what data should flow between them, and what business outcomes you\'re trying to achieve.'
    },
    {
      number: '2',
      title: 'API Documentation Review',
      description: 'I review the API documentation (or reverse-engineer if needed) to understand capabilities, limitations, and authentication requirements.'
    },
    {
      number: '3',
      title: 'Architecture Planning',
      description: 'Design the data flow, error handling, and sync frequency. You\'ll see exactly how the systems will communicate.'
    },
    {
      number: '4',
      title: 'Development & Testing',
      description: 'Build the integration with comprehensive testing. This includes edge cases, error scenarios, and performance testing.'
    },
    {
      number: '5',
      title: 'Deployment & Monitoring',
      description: 'Deploy to production with monitoring and alerting set up so we catch issues before they become problems.'
    },
    {
      number: '6',
      title: 'Documentation & Handoff',
      description: 'Complete documentation of how the integration works, troubleshooting steps, and training for your team.'
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
          { name: 'API Integration', href: '/services/api-integration' },
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
              <span className="text-2xl">🔗</span>
              <span>200+ API Integration Projects Completed</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              API Integration Services
              <span className="block text-accent-400">Connect Your Business Systems</span>
            </h1>

            <p className="text-xl leading-8 text-gray-200 mb-8">
              Tired of manually copying data between systems? Your CRM doesn't talk to your accounting software? Orders in one system, inventory in another? API integration solves these problems by making your systems work together automatically.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="rounded-2xl bg-accent-500/20 px-6 py-4 border border-accent-500/30">
                <span className="block text-sm text-gray-200">Projects Completed</span>
                <span className="text-3xl font-bold text-white">200+</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/20">
                <span className="block text-sm text-gray-200">API Types</span>
                <span className="text-3xl font-bold text-white">REST, SOAP, GraphQL</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Discuss Your Integration
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

      {/* What is API Integration Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              What is API Integration & Why Your Business Needs It
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                An API (Application Programming Interface) is how software systems talk to each other. Think of it as a translator that lets your CRM understand your email marketing platform, or your e-commerce store sync with your inventory system.
              </p>

              <p className="mb-6">
                <strong>Without API integration:</strong> Your team manually exports data from one system, reformats it, and imports it into another. This wastes hours every week and introduces errors.
              </p>

              <p className="mb-6">
                <strong>With API integration:</strong> Data flows automatically between systems in real-time. New customer in your CRM? They're automatically added to your email list. Sale on your website? Inventory updates instantly and an invoice appears in QuickBooks.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Examples</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">→</span>
                    <span><strong>CRM + Email Marketing:</strong> New lead fills out a form, gets added to Salesforce, and automatically starts receiving your email nurture sequence in Mailchimp.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">→</span>
                    <span><strong>E-Commerce + Inventory:</strong> Customer buys product, inventory decreases across all sales channels, and low-stock alerts trigger automatically.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">→</span>
                    <span><strong>Payments + Accounting:</strong> Stripe payment received, invoice marked paid in QuickBooks, and customer receives confirmation email.</span>
                  </li>
                </ul>
              </div>

              <p>
                The result? Less manual work, fewer errors, happier customers, and more time to focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              My API Integration Experience
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                With <strong>200+ API integration projects</strong> completed, I've worked with nearly every type of API you can imagine. From simple REST APIs to complex SOAP integrations, from well-documented platforms to completely undocumented legacy systems.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">REST</div>
                  <p className="text-gray-600">Modern, most common API type. Clean, predictable, well-documented.</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">SOAP</div>
                  <p className="text-gray-600">Enterprise, legacy systems. More complex but highly reliable.</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">GraphQL</div>
                  <p className="text-gray-600">Modern, flexible queries. Get exactly the data you need.</p>
                </div>
              </div>

              <p>
                I've also built <strong>custom APIs</strong> for businesses that need to expose their own data to partners, customers, or internal systems. Whether you need to consume an API or create one, I can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Integrations Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Common API Integration Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Platforms I've integrated hundreds of times.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonIntegrations.map((category) => (
              <div
                key={category.category}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
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
              API Integration Process
            </h2>
            <p className="text-lg text-gray-600">
              A systematic approach that ensures reliable, maintainable integrations.
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

      {/* Why Freelance Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Why Work with a Freelance API Developer
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Direct Communication</h3>
                  <p className="text-gray-600">No account managers or project coordinators in between. You talk directly to the person doing the work.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Cost-Effective</h3>
                  <p className="text-gray-600">Agency overhead means agency prices. Working with me, you pay for expertise—not fancy offices.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Engagement</h3>
                  <p className="text-gray-600">One-time project? Ongoing support? Retainer? We structure the engagement to match your needs.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Long-term Partnership</h3>
                  <p className="text-gray-600">Many clients have worked with me for years. I know their systems, their business, and can respond quickly.</p>
                </div>
              </div>
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
              Let's Connect Your Systems
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Tell me what systems you need connected. Free consultation to scope your integration project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Discuss Your Integration
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
              <p className="text-gray-600">Custom websites with built-in API integrations from the start.</p>
            </Link>
            <Link
              href="/services/web-scraping"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Web Scraping</h3>
              <p className="text-gray-600">When there's no API, we can still get your data.</p>
            </Link>
            <Link
              href="/services/business-automation"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Business Automation</h3>
              <p className="text-gray-600">API integrations are often the foundation of powerful automations.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
