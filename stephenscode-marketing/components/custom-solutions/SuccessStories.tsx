'use client';

import { motion } from 'framer-motion';

const successStories = [
  {
    title: 'CalenFlow: Appointment Scheduling SaaS',
    category: 'SaaS Platform',
    description: 'Built a complete appointment scheduling platform with multi-tenant architecture, real-time availability, SMS notifications, and payment processing.',
    features: ['Multi-tenant architecture', 'Stripe integration', 'SMS notifications', 'Calendar sync'],
    gradient: 'from-primary-600 to-primary-700'
  },
  {
    title: 'SACVPN: Enterprise VPN Dashboard',
    category: 'Web Application',
    description: 'Custom admin dashboard for managing VPN users, monitoring connections, and automating billing for enterprise clients.',
    features: ['User management', 'Real-time monitoring', 'Automated billing', 'API integration'],
    gradient: 'from-accent-700 to-accent-800'
  },
  {
    title: 'Property Data Scraper',
    category: 'Automation Tool',
    description: 'Automated data collection system for real estate listings, processing thousands of properties daily with intelligent deduplication and enrichment.',
    features: ['Multi-source scraping', 'Data enrichment', 'Automated scheduling', 'Export to CSV/API'],
    gradient: 'from-primary-600 to-accent-700'
  },
  {
    title: 'FC Photo: Portfolio & Booking System',
    category: 'Business Tool',
    description: 'Custom photography portfolio with integrated booking system, client galleries, and automated workflow management.',
    features: ['Gallery management', 'Online booking', 'Client portals', 'Payment processing'],
    gradient: 'from-accent-700 to-primary-700'
  }
];

export default function SuccessStories() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-surface-card/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real solutions we've built for real businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-surface-card rounded-2xl p-8 border border-surface-border card-lift overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                {/* Category badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${story.gradient} border border-white/10 mb-4`}>
                  <span className="text-xs font-semibold text-white">{story.category}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{story.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{story.description}</p>

                {/* Features list */}
                <div className="grid grid-cols-2 gap-3">
                  {story.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${story.gradient}`} />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to build your custom solution?
          </p>
          <a
            href="#contact"
            className="group btn-primary px-8 py-4 text-base"
          >
            Get Your Free Quote
            <svg className="w-5 h-5 transition-transform duration-200 ease-brand group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
