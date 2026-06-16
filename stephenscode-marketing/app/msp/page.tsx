import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Monitor, Lock, Cloud, Wrench, Clock, Award,
  MapPin, DollarSign, ArrowRight, Check, Phone, ShieldCheck,
} from 'lucide-react'
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
    url: 'https://www.stephenscode.dev/msp',
  },
}

const mspSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Managed IT Services",
  "provider": {
    "@type": "LocalBusiness",
    "name": "StephensCode LLC",
    "image": "https://www.stephenscode.dev/logo.png",
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
      Icon: Monitor,
    },
    {
      title: 'Cybersecurity',
      subtitle: 'Protect Your Business',
      description: 'Defend against ransomware, phishing, and data breaches with enterprise-grade security solutions.',
      services: cybersecurityServices,
      Icon: Lock,
    },
    {
      title: 'Cloud Solutions',
      subtitle: 'Modern Infrastructure',
      description: 'Microsoft 365 management, cloud backup, and migration services to modernize your IT.',
      services: cloudServices,
      Icon: Cloud,
    },
    {
      title: 'IT Support & Projects',
      subtitle: 'Flexible Options',
      description: 'On-demand support, network installation, and consulting for businesses of all sizes.',
      services: supportServices,
      Icon: Wrench,
    }
  ]

  const whyChooseMSP = [
    {
      title: '24/7 Monitoring & Support',
      description: 'Your systems are monitored around the clock. When issues arise, we\'re on it, often before you even notice.',
      Icon: Clock,
      stats: 'Always-On Protection'
    },
    {
      title: 'Veteran-Owned Business',
      description: 'Military discipline meets IT expertise. We bring the same dedication and attention to detail to protecting your business.',
      Icon: Award,
      stats: '14+ Years Experience'
    },
    {
      title: 'Local Houston-Area Team',
      description: 'Based in Conroe, we provide on-site support throughout Houston, The Woodlands, Spring, and surrounding areas.',
      Icon: MapPin,
      stats: 'On-Site When Needed'
    },
    {
      title: 'Predictable Monthly Costs',
      description: 'No surprise IT bills. Know exactly what you\'ll pay each month with our transparent per-user pricing.',
      Icon: DollarSign,
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
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Managed IT &amp; Cybersecurity</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.02] animate-fade-in-up animation-delay-200">
              IT Services That
              <span className="block text-primary-500 mt-2">Protect &amp; Power</span>
              <span className="block text-gray-500 mt-2">Your Business</span>
            </h1>

            <p className="mt-10 text-xl leading-8 text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Stop worrying about technology and start growing your business. Our managed IT services provide <strong className="text-white">24/7 monitoring, cybersecurity protection, and expert support</strong>, all for a predictable monthly cost.
            </p>

            {/* Stats Bar */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-600">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-md bg-surface-card ring-1 ring-surface-border p-4">
                  <div className="text-3xl font-bold tracking-tight text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-800">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Get Free IT Assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                <Phone className="h-4 w-4" />
                (936) 323-4527
              </a>
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
                      <p className="mt-2 text-sm text-gray-500 capitalize">{service.category.replace('-', ' ')}</p>
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
                      <p className="text-sm font-semibold text-gray-300 mb-3">Includes:</p>
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
                      href={`/msp/${service.slug}`}
                      className="block w-full rounded-md bg-primary-500 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                    >
                      Learn More
                    </Link>
                  </article>
                ))}
              </div>
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
              <span>Why StephensCode MSP?</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              IT Support You Can Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {whyChooseMSP.map((item, index) => {
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
              Managed IT Services FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is included in managed IT services?",
                answer: "Our managed IT services include 24/7 system monitoring, helpdesk support, cybersecurity protection (antivirus, firewall, threat detection), backup and disaster recovery, Microsoft 365 management, patch management, and strategic IT consulting. The specific features depend on your plan, Essential IT ($99/user), Business Pro ($129/user), or Complete IT ($179/user)."
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
                answer: "Start with a free IT assessment. We'll evaluate your current infrastructure, identify vulnerabilities, and recommend the right service level. There's no obligation, just honest advice about your IT needs. If you decide to move forward, onboarding typically takes 1-2 weeks."
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
            <p className="text-gray-400 mb-4">Ready to improve your IT?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
            >
              <span>Schedule your free IT assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Is Your Business Protected?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">
            Get a free IT assessment to identify vulnerabilities and opportunities. No obligation, no sales pressure, just honest advice about your technology.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
              Schedule Free Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+19363234527"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:bg-surface-card transition-colors"
            >
              <Phone className="h-4 w-4" />
              (936) 323-4527
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
