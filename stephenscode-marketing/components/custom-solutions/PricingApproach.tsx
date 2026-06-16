'use client';

import { motion } from 'framer-motion';

export default function PricingApproach() {
  return (
    <section className="bg-surface border-b border-surface-border py-24 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
            <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
            <span>Transparent, Fair Pricing</span>
            <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            No Surprises, No Overages
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            No surprises, no hourly billing overages. Just honest, upfront pricing.
          </p>
        </motion.div>

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-card rounded-2xl p-8 md:p-12 ring-2 ring-primary-500 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-surface-elevated border border-surface-border mb-6">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-primary-400">Base Rate</span>
              </div>

              <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                $50<span className="text-2xl text-gray-500">/hour</span>
              </h3>

              <p className="text-lg text-gray-400 leading-relaxed">
                Our custom development is based on an hourly rate of <strong className="text-white">$50/hour</strong>. However, you won't be billed hourly—we provide a comprehensive flat-rate quote for your entire project upfront.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Fixed Price Quote</h4>
                  <p className="text-gray-400">You know exactly what you'll pay before we start. No hourly billing, no cost overruns.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">No Hour Tracking</h4>
                  <p className="text-gray-400">We don't log hours or bill you more if development takes longer than estimated. Your price is your price.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">All-Inclusive</h4>
                  <p className="text-gray-400">Your quote includes development, testing, deployment, and initial support. No hidden fees.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional info cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface-card rounded-2xl p-6 ring-1 ring-surface-border"
          >
            <div className="w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Detailed Proposals</h3>
            <p className="text-gray-400 text-sm">Every quote includes a full breakdown of features, timeline, and deliverables.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-card rounded-2xl p-6 ring-1 ring-surface-border"
          >
            <div className="w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Flexible Timelines</h3>
            <p className="text-gray-400 text-sm">We work with your schedule and can expedite projects when needed.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-surface-card rounded-2xl p-6 ring-1 ring-surface-border"
          >
            <div className="w-12 h-12 rounded-md border border-primary-500/40 text-primary-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dedicated Support</h3>
            <p className="text-gray-400 text-sm">Ongoing maintenance and support packages available after launch.</p>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-surface-card border border-surface-border rounded-xl"
        >
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong className="text-gray-200">Note:</strong> While our base rate is $50/hour, all custom development projects are quoted as flat-rate packages. The hourly rate is used solely for estimation purposes. Once you approve the quote, that's your final price. We will not bill you additional hours if the project takes longer than expected. You get the full solution for the quoted price, period.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
