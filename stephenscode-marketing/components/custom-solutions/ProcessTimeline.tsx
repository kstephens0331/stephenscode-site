'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We discuss your needs, challenges, and goals to understand exactly what you\'re looking for.',
    duration: '30-60 min'
  },
  {
    number: '02',
    title: 'Project Scoping',
    description: 'We define the project scope, technical requirements, timeline, and deliverables.',
    duration: '1-2 days'
  },
  {
    number: '03',
    title: 'Detailed Quote',
    description: 'You receive a comprehensive flat-rate quote with no surprises. What you see is what you pay.',
    duration: '24-48 hours'
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build your solution with regular check-ins and progress updates throughout the process.',
    duration: 'Varies'
  },
  {
    number: '05',
    title: 'Testing & Launch',
    description: 'Thorough testing, refinements, and deployment to ensure everything works perfectly.',
    duration: '1-2 weeks'
  },
  {
    number: '06',
    title: 'Support & Maintenance',
    description: 'Ongoing support and maintenance packages available to keep your solution running smoothly.',
    duration: 'Ongoing'
  }
];

export default function ProcessTimeline() {
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
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From concept to completion, we make custom development simple and transparent.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-surface-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number badge */}
                <div className="absolute left-8 md:left-1/2 -ml-6 w-12 h-12 rounded-full border-2 border-primary-500 bg-black flex items-center justify-center font-mono font-bold text-primary-500 shadow-lg z-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-surface-card rounded-2xl p-6 border border-surface-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <span className="text-sm text-primary-400 font-semibold">{step.duration}</span>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
