import Link from 'next/link'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Business Automation Houston | Workflow Automation Services',
  description: 'Houston web development for business automation. Conroe web developer offering Zapier, n8n, custom solutions. Veteran owned. Call (936) 323-4527.',
  keywords: [
    'business automation Houston',
    'Conroe web developer',
    'Houston web development',
    'workflow automation Texas',
    'veteran owned web developer',
    'Zapier integration',
    'small business automation'
  ],
  alternates: {
    canonical: '/services/business-automation',
  },
  openGraph: {
    title: 'Business Automation Services | Streamline Your Operations',
    description: 'Stop wasting time on repetitive tasks. Custom automation with Zapier, n8n, Make, and custom solutions.',
    type: 'website',
  },
}

// Schema markup for the page
const pageSchemas = {
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Automation Services',
    serviceType: 'Business Process Automation',
    provider: {
      '@type': 'Organization',
      name: 'StephensCode LLC',
      telephone: '+1-936-323-4527',
      email: 'kyle@stephenscode.dev'
    },
    description: 'Business process automation services using Zapier, n8n, Make, Power Automate, and custom solutions. Streamline operations and eliminate repetitive tasks.',
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much can I save with automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most businesses save 5-20 hours per week with proper automation. At even $20/hour, that\'s $400-1,600/month in time savings. Many automations pay for themselves within the first month.'
        }
      },
      {
        '@type': 'Question',
        name: 'What tasks should I automate first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with repetitive tasks you do daily: data entry, follow-up emails, report generation, lead routing, and invoice creation. These high-frequency tasks provide the fastest ROI.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need technical skills to use these automations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. I build automations that run completely hands-off. You\'ll receive documentation and training, but once set up, they work automatically without any technical knowledge required.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can automations break?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Occasionally, yes—usually when connected services change their APIs. I build robust automations with error handling and monitoring. Maintenance plans ensure quick fixes when issues arise.'
        }
      }
    ]
  }
}

export default function BusinessAutomation() {
  const platforms = [
    {
      name: 'Zapier',
      description: 'The most accessible automation platform with 5,000+ app integrations. Great for standard business workflows.',
      bestFor: 'Quick integrations, non-technical users, wide app coverage',
      icon: '⚡'
    },
    {
      name: 'n8n',
      description: 'Self-hosted, open-source automation. More control, no per-task pricing, better for complex workflows.',
      bestFor: 'Complex logic, self-hosted needs, cost-conscious at scale',
      icon: '🔧'
    },
    {
      name: 'Make (Integromat)',
      description: 'Visual workflow builder with powerful data manipulation. Great for complex transformations.',
      bestFor: 'Data-heavy workflows, visual builders, complex scenarios',
      icon: '🎯'
    },
    {
      name: 'Power Automate',
      description: 'Microsoft\'s automation platform. Perfect for businesses deep in the Microsoft ecosystem.',
      bestFor: 'Microsoft 365 users, SharePoint, Teams integrations',
      icon: '🏢'
    },
    {
      name: 'Custom Python Scripts',
      description: 'When off-the-shelf tools don\'t fit. Full flexibility for unique requirements.',
      bestFor: 'Unique requirements, maximum flexibility, complex logic',
      icon: '🐍'
    }
  ]

  const automationSolutions = [
    {
      name: 'Lead Capture → CRM → Email Sequence',
      description: 'New lead fills out form, automatically added to CRM, tagged by source, and starts receiving your nurture sequence.',
      timeSaved: '2-5 hours/week'
    },
    {
      name: 'Invoice Generation & Follow-up',
      description: 'Project complete? Invoice generated, sent to client, and follow-up reminders scheduled automatically.',
      timeSaved: '3-8 hours/week'
    },
    {
      name: 'Social Media Posting',
      description: 'Schedule and automate posts across platforms. Cross-post, recycle content, and monitor engagement.',
      timeSaved: '2-4 hours/week'
    },
    {
      name: 'Customer Onboarding',
      description: 'New customer? Welcome email, account setup, training docs, and check-in calls all scheduled automatically.',
      timeSaved: '1-3 hours/client'
    },
    {
      name: 'Report Generation & Distribution',
      description: 'Weekly/monthly reports compiled from multiple sources and delivered to stakeholders automatically.',
      timeSaved: '3-10 hours/week'
    },
    {
      name: 'Data Entry Elimination',
      description: 'Stop copying data between systems. Automatic syncing ensures data is always consistent everywhere.',
      timeSaved: '5-15 hours/week'
    }
  ]

  const processSteps = [
    {
      number: '1',
      title: 'Workflow Audit',
      description: 'We analyze your current processes to identify repetitive tasks, bottlenecks, and automation opportunities.'
    },
    {
      number: '2',
      title: 'Opportunity Identification',
      description: 'Prioritize automations by ROI—which will save the most time and have the biggest impact.'
    },
    {
      number: '3',
      title: 'Tool Selection',
      description: 'Choose the right platform for each automation based on your needs, budget, and existing tools.'
    },
    {
      number: '4',
      title: 'Build & Test',
      description: 'Develop the automations with thorough testing, error handling, and edge case coverage.'
    },
    {
      number: '5',
      title: 'Deploy & Train',
      description: 'Go live with monitoring in place. Training for your team on what\'s automated and how to monitor.'
    },
    {
      number: '6',
      title: 'Monitor & Optimize',
      description: 'Ongoing monitoring ensures automations run smoothly. Optimize based on real-world performance.'
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
          { name: 'Business Automation', href: '/services/business-automation' },
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
              <span className="text-2xl">⚡</span>
              <span>Save 10-20 Hours Per Week</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Business Automation Services
              <span className="block text-accent-400">Streamline Your Operations</span>
            </h1>

            <p className="text-xl leading-8 text-gray-200 mb-8">
              Stop wasting time on repetitive tasks. Every hour spent copying data, sending follow-up emails, or generating reports manually is an hour you're not spending on growth. I build automations that handle the busywork so you can focus on what matters.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="rounded-2xl bg-accent-500/20 px-6 py-4 border border-accent-500/30">
                <span className="block text-sm text-gray-200">Average Time Saved</span>
                <span className="text-3xl font-bold text-white">10-20 hrs/week</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/20">
                <span className="block text-sm text-gray-200">Platforms</span>
                <span className="text-3xl font-bold text-white">Zapier, n8n, Make, Custom</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-8 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Automate Your Business
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

      {/* Time Wasters Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Stop Wasting Time on Repetitive Tasks
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Think about your week. How many hours do you spend on tasks that follow the same pattern every time? Copying data from one system to another. Sending the same follow-up emails. Creating the same reports. These tasks are necessary, but they don't require human creativity—they require a computer.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                <h3 className="text-lg font-bold text-red-900 mb-2">The Cost of Manual Work</h3>
                <p className="text-red-800 mb-4">
                  If you spend just 2 hours per day on repetitive tasks at $50/hour effective rate:
                </p>
                <ul className="space-y-1 text-red-800">
                  <li>• <strong>Per week:</strong> 10 hours = $500 lost value</li>
                  <li>• <strong>Per month:</strong> 40 hours = $2,000 lost value</li>
                  <li>• <strong>Per year:</strong> 480 hours = $24,000 lost value</li>
                </ul>
              </div>

              <p className="mb-6">
                Automation isn't just about saving time—it's about eliminating errors, ensuring consistency, and freeing you to focus on strategic work that actually grows your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Automation Platforms We Work With
            </h2>
            <p className="text-lg text-gray-600">
              The right tool for your specific needs and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-white rounded-2xl p-8 shadow-md border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <div className="text-4xl mb-4">{platform.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                <p className="text-gray-600 mb-4">{platform.description}</p>
                <p className="text-sm text-primary-600 font-medium">
                  <strong>Best for:</strong> {platform.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Automation Solutions for Small Business
            </h2>
            <p className="text-lg text-gray-600">
              Common workflows I automate for clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationSolutions.map((solution) => (
              <div
                key={solution.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.name}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <span>⏱️</span>
                  <span>Saves {solution.timeSaved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Automation Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
              Custom Automation Development
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                Sometimes off-the-shelf tools don't fit. Maybe you have a unique workflow, need to connect to a system without an existing integration, or require complex logic that visual builders can't handle.
              </p>

              <p className="mb-6">
                That's when custom development makes sense. Using Python, Node.js, or other technologies, I can build automation solutions that:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Handle Complex Logic</h3>
                  <p className="text-gray-600">Conditional workflows, multi-step decisions, and complex data transformations.</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Connect Any System</h3>
                  <p className="text-gray-600">Even systems without official integrations—if there's an API, we can connect it.</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Scale Without Limits</h3>
                  <p className="text-gray-600">No per-task pricing. Process thousands of items without cost concerns.</p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Run On Your Infrastructure</h3>
                  <p className="text-gray-600">Self-hosted solutions for data privacy and complete control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Implementation Process
            </h2>
            <p className="text-lg text-gray-600">
              A systematic approach to automating your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-md border-2 border-gray-200 h-full">
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
              Ready to Automate?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let's identify your biggest automation opportunities. Free workflow audit to find where you're losing time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Get Free Workflow Audit
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
              <p className="text-gray-600">Custom websites with built-in automation from the start.</p>
            </Link>
            <Link
              href="/services/api-integration"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">API Integration</h3>
              <p className="text-gray-600">Connect your systems for seamless data flow.</p>
            </Link>
            <Link
              href="/services/web-scraping"
              className="group bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600">Web Scraping</h3>
              <p className="text-gray-600">Automate data collection from websites.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
