import Link from 'next/link'
import type { Metadata } from 'next'
import { managedITServices, cybersecurityServices, cloudServices, supportServices } from '@/lib/msp-services-data'

export const metadata: Metadata = {
  title: 'Houston Managed IT Services | $99/User/Mo | 24/7 Support',
  description: 'Tired of IT problems? Get 24/7 monitoring, cybersecurity, and helpdesk support from $99/user/mo. No contracts. Veteran-owned MSP serving Houston, Conroe, The Woodlands. Free IT assessment.',
  alternates: {
    canonical: '/msp',
  },
  keywords: [
    'managed IT services Houston',
    'MSP Houston',
    'IT support Conroe',
    'cybersecurity services Houston',
    'IT support The Woodlands',
    'managed service provider Texas',
    'business IT support Houston',
    'IT company near me',
    'IT services Montgomery County',
    'network security Houston',
    'cloud services Houston',
    'Microsoft 365 support Texas',
    'helpdesk support Conroe',
    '24/7 IT monitoring',
    'small business IT Houston',
    'veteran owned MSP',
    'IT security services Texas',
    'backup disaster recovery Houston',
  ],
  openGraph: {
    title: 'Houston Managed IT Services | From $99/User/Month',
    description: '24/7 monitoring, cybersecurity, and helpdesk support. No long-term contracts. Veteran-owned MSP.',
    url: 'https://stephenscode.dev/msp',
  },
}

const mspSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Managed IT Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "StephensCode LLC",
    "image": "https://stephenscode.dev/logo.png",
    "telephone": "+1-936-323-4527",
    "priceRange": "$99+/user/mo",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2378 Strong Horse Dr",
      "addressLocality": "Conroe",
      "addressRegion": "TX",
      "postalCode": "77301",
      "addressCountry": "US"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "Houston" },
    { "@type": "City", "name": "Conroe" },
    { "@type": "City", "name": "The Woodlands" },
    { "@type": "City", "name": "Spring" }
  ]
}

export default function MSPServicesPage() {
  const serviceCategories = [
    {
      title: 'Managed IT Services',
      subtitle: 'Your Outsourced IT Department',
      description: 'Complete IT management so you can focus on your business. From helpdesk support to strategic IT planning.',
      services: managedITServices,
      icon: '🖥️',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Cybersecurity',
      subtitle: 'Protect Your Business',
      description: 'Defend against ransomware, phishing, and data breaches with enterprise-grade security solutions.',
      services: cybersecurityServices,
      icon: '🔒',
      gradient: 'from-red-600 to-red-800'
    },
    {
      title: 'Cloud Solutions',
      subtitle: 'Modern Infrastructure',
      description: 'Microsoft 365 management, cloud backup, and migration services to modernize your IT.',
      services: cloudServices,
      icon: '☁️',
      gradient: 'from-cyan-600 to-cyan-800'
    },
    {
      title: 'IT Support & Projects',
      subtitle: 'Flexible Options',
      description: 'On-demand support, network installation, and consulting for businesses of all sizes.',
      services: supportServices,
      icon: '🔧',
      gradient: 'from-orange-600 to-orange-800'
    }
  ]

  const whyChooseMSP = [
    {
      title: '24/7 Monitoring & Support',
      description: 'Your systems are monitored around the clock. When issues arise, we\'re on it—often before you even notice.',
      icon: '🕐',
      stats: 'Always-On Protection'
    },
    {
      title: 'Veteran-Owned Business',
      description: 'Military discipline meets IT expertise. We bring the same dedication and attention to detail to protecting your business.',
      icon: '🎖️',
      stats: '14+ Years Experience'
    },
    {
      title: 'Local Houston-Area Team',
      description: 'Based in Conroe, we provide on-site support throughout Houston, The Woodlands, Spring, and surrounding areas.',
      icon: '📍',
      stats: 'On-Site When Needed'
    },
    {
      title: 'Predictable Monthly Costs',
      description: 'No surprise IT bills. Know exactly what you\'ll pay each month with our transparent per-user pricing.',
      icon: '💰',
      stats: 'From $99/user/mo'
    }
  ]

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '< 2hr', label: 'Response Time' },
    { value: '24/7', label: 'Monitoring' },
    { value: '100%', label: 'Customer Satisfaction' }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mspSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-red-500/20 px-6 py-3 text-sm font-semibold backdrop-blur-lg border border-red-500/30 shadow-2xl">
              <span className="text-2xl">🔒</span>
              <span>Managed IT & Cybersecurity</span>
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-8">
              IT Services That
              <span className="block text-red-400 mt-2">Protect & Power</span>
              Your Business
            </h1>

            <p className="mt-8 text-xl leading-8 text-gray-200 max-w-3xl mx-auto">
              Stop worrying about technology and start growing your business. Our managed IT services provide <strong className="text-white">24/7 monitoring, cybersecurity protection, and expert support</strong>—all for a predictable monthly cost.
            </p>

            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 p-4">
                  <div className="text-3xl font-black text-red-400">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-red-500 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:bg-red-600 transition-all hover:scale-105"
              >
                <span>Get Free IT Assessment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>📞 (936) 323-4527</span>
              </a>
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
              {category.services.map((service) => (
                <article
                  key={service.id}
                  className="group relative flex flex-col rounded-2xl bg-white border-2 border-gray-200 p-8 shadow-lg hover:border-primary-500 hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 capitalize">{service.category.replace('-', ' ')}</p>
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
                    <p className="text-sm font-semibold text-gray-700 mb-3">Includes:</p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/msp/${service.slug}`}
                    className="block w-full rounded-lg bg-primary-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-primary-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-red-400">Why StephensCode MSP?</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
              IT Support You Can Trust
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {whyChooseMSP.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 hover:bg-white/20 transition-all hover:scale-105">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 text-4xl shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-red-300">
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

      {/* FAQ Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-red-600">Frequently Asked Questions</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Managed IT Services FAQ
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is included in managed IT services?",
                answer: "Our managed IT services include 24/7 system monitoring, helpdesk support, cybersecurity protection (antivirus, firewall, threat detection), backup and disaster recovery, Microsoft 365 management, patch management, and strategic IT consulting. The specific features depend on your plan—Essential IT ($99/user), Business Pro ($129/user), or Complete IT ($179/user)."
              },
              {
                question: "How much do managed IT services cost?",
                answer: "We offer transparent per-user pricing: Essential IT at $99/user/month, Business Pro at $129/user/month, and Complete IT at $179/user/month. Enterprise pricing is custom for organizations with 50+ users. This predictable pricing replaces unpredictable hourly IT bills with a fixed monthly cost."
              },
              {
                question: "What areas do you provide IT support?",
                answer: "We provide on-site IT support throughout the Houston metropolitan area including Conroe, The Woodlands, Spring, Tomball, Katy, Sugar Land, Pearland, Cypress, and Humble. Remote support is available nationwide for clients who don't need physical on-site visits."
              },
              {
                question: "How fast is your response time?",
                answer: "We guarantee response times based on issue severity: Critical issues (system down) get immediate response with a 2-hour resolution target. High priority issues get 4-hour response. Standard requests are addressed within 8 business hours. Our 24/7 monitoring often catches and resolves issues before you notice them."
              },
              {
                question: "Do you provide cybersecurity services?",
                answer: "Yes, cybersecurity is core to our managed IT services. All plans include email security, antivirus, and firewall management. Higher tiers add endpoint detection and response (EDR), dark web monitoring, security awareness training, and SIEM (Security Information and Event Management). We also offer standalone Advanced Threat Protection services."
              },
              {
                question: "Can you support our Microsoft 365 environment?",
                answer: "Absolutely. We're Microsoft 365 specialists. We handle user provisioning, license management, email configuration, SharePoint administration, Teams setup, security policies, and ongoing optimization. We can also migrate you to Microsoft 365 if you're on legacy systems."
              },
              {
                question: "What's the difference between MSP and break-fix IT?",
                answer: "Break-fix IT means you call someone when something breaks, pay hourly, and hope they're available. Managed IT (MSP) means proactive monitoring, maintenance, and support for a flat monthly fee. We catch problems before they cause downtime, and you get predictable IT costs instead of surprise repair bills."
              },
              {
                question: "How do we get started with managed IT services?",
                answer: "Start with a free IT assessment. We'll evaluate your current infrastructure, identify vulnerabilities, and recommend the right service level. There's no obligation—just honest advice about your IT needs. If you decide to move forward, onboarding typically takes 1-2 weeks."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border-2 border-gray-200 bg-gray-50 hover:border-red-300 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-bold text-gray-900">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-red-600 group-open:rotate-180 transition-transform">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Ready to improve your IT?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700"
            >
              <span>Schedule your free IT assessment</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl mb-8">
              Is Your Business Protected?
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-red-100 mb-12">
              Get a free IT assessment to identify vulnerabilities and opportunities. No obligation, no sales pressure—just honest advice about your technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-10 py-5 text-xl font-bold text-red-600 shadow-2xl hover:bg-gray-100 transition-all hover:scale-110"
              >
                <span>Schedule Free Assessment</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>📞 Call (936) 323-4527</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
