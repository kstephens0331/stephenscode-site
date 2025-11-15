'use client';

import { motion } from 'framer-motion';

const successStories = [
  {
    title: 'CalenFlow - Appointment Scheduling SaaS',
    category: 'SaaS Platform',
    description: 'Built a complete appointment scheduling platform with multi-tenant architecture, real-time availability, SMS notifications, and payment processing.',
    features: ['Multi-tenant architecture', 'Stripe integration', 'SMS notifications', 'Calendar sync'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'SACVPN - Enterprise VPN Dashboard',
    category: 'Web Application',
    description: 'Custom admin dashboard for managing VPN users, monitoring connections, and automating billing for enterprise clients.',
    features: ['User management', 'Real-time monitoring', 'Automated billing', 'API integration'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Property Data Scraper',
    category: 'Automation Tool',
    description: 'Automated data collection system for real estate listings, processing thousands of properties daily with intelligent deduplication and enrichment.',
    features: ['Multi-source scraping', 'Data enrichment', 'Automated scheduling', 'Export to CSV/API'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'FC Photo - Portfolio & Booking System',
    category: 'Business Tool',
    description: 'Custom photography portfolio with integrated booking system, client galleries, and automated workflow management.',
    features: ['Gallery management', 'Online booking', 'Client portals', 'Payment processing'],
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export default function SuccessStories() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
              className="group relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                {/* Category badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${story.gradient} bg-opacity-20 border border-white/10 mb-4`}>
                  <span className="text-xs font-semibold text-white">{story.category}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{story.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{story.description}</p>

                {/* Features list */}
                <div className="grid grid-cols-2 gap-3">
                  {story.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${story.gradient}`} />
                      <span className="text-sm text-slate-400">{feature}</span>
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
          <p className="text-lg text-slate-300 mb-6">
            Ready to build your custom solution?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
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
