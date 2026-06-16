'use client';

import { motion } from 'framer-motion';

const successStories = [
  {
    title: 'CalenFlow - Appointment Scheduling SaaS',
    category: 'SaaS Platform',
    description: 'Built a complete appointment scheduling platform with multi-tenant architecture, real-time availability, SMS notifications, and payment processing.',
    features: ['Multi-tenant architecture', 'Stripe integration', 'SMS notifications', 'Calendar sync'],
  },
  {
    title: 'SACVPN - Enterprise VPN Dashboard',
    category: 'Web Application',
    description: 'Custom admin dashboard for managing VPN users, monitoring connections, and automating billing for enterprise clients.',
    features: ['User management', 'Real-time monitoring', 'Automated billing', 'API integration'],
  },
  {
    title: 'Property Data Scraper',
    category: 'Automation Tool',
    description: 'Automated data collection system for real estate listings, processing thousands of properties daily with intelligent deduplication and enrichment.',
    features: ['Multi-source scraping', 'Data enrichment', 'Automated scheduling', 'Export to CSV/API'],
  },
  {
    title: 'FC Photo - Portfolio & Booking System',
    category: 'Business Tool',
    description: 'Custom photography portfolio with integrated booking system, client galleries, and automated workflow management.',
    features: ['Gallery management', 'Online booking', 'Client portals', 'Payment processing'],
  }
];

export default function SuccessStories() {
  return (
    <section className="bg-surface-card border-b border-surface-border py-24 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
            <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
            <span>Success Stories</span>
            <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Real Solutions for Real Businesses
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real solutions we've built for real businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl bg-surface ring-1 ring-surface-border p-8 hover:ring-primary-500/50 transition-all duration-300"
            >
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-elevated border border-surface-border mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">{story.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{story.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{story.description}</p>

              {/* Features list */}
              <div className="grid grid-cols-2 gap-3">
                {story.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </div>
                ))}
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
          <p className="text-lg text-gray-400 mb-6">
            Ready to build your custom solution?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors"
          >
            Get Your Free Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
