'use client';

import { motion } from 'framer-motion';

export default function CustomSolutionsHero() {
  return (
    <section className="relative bg-black border-b border-surface-border pt-32 pb-20 px-4 overflow-hidden">
      {/* Soft vertical sheen, barely there */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-8"
          >
            <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
            <span>Enterprise &amp; Custom Development</span>
            <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.02]">
            <span className="block">Custom Software Solutions</span>
            <span className="block text-primary-500 mt-2">Built for Your Business</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            From SaaS platforms to web applications, data scrapers to bespoke tools—we build custom software that solves your unique challenges. No templates, no limitations, just solutions designed specifically for you.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact-form"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-colors text-lg"
            >
              Get a Free Quote
            </a>
            <a
              href="#solutions"
              className="px-6 py-3 text-white font-semibold rounded-md border border-surface-border hover:border-primary-500/60 hover:bg-surface-card transition-colors text-lg"
            >
              Explore Solutions
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400"
          >
            {['Flat-Rate Pricing', 'No Hidden Fees', 'Nationwide Service'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
