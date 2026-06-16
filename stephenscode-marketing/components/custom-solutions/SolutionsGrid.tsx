'use client';

import { motion } from 'framer-motion';
import { Rocket, MonitorSmartphone, Bot, Wrench, Smartphone, Plug, Check } from 'lucide-react';

const solutions = [
  {
    Icon: Rocket,
    title: 'SaaS Platforms',
    description: 'Multi-tenant software-as-a-service platforms with user management, billing integration, and scalable architecture.',
    features: ['Subscription billing', 'Multi-user management', 'API integrations', 'Cloud deployment']
  },
  {
    Icon: MonitorSmartphone,
    title: 'Web Applications',
    description: 'Custom web apps tailored to your workflow, from internal dashboards to customer-facing platforms.',
    features: ['Custom dashboards', 'Real-time updates', 'Database design', 'Responsive design']
  },
  {
    Icon: Bot,
    title: 'Data Scrapers & Automation',
    description: 'Automated data collection, processing, and integration tools that save you hours of manual work.',
    features: ['Web scraping', 'Data processing', 'Scheduled automation', 'API development']
  },
  {
    Icon: Wrench,
    title: 'Business Tools',
    description: 'Bespoke software solutions designed for your specific business processes and requirements.',
    features: ['Workflow automation', 'Custom integrations', 'Reporting tools', 'Process optimization']
  },
  {
    Icon: Smartphone,
    title: 'Progressive Web Apps',
    description: 'Mobile-first applications that work offline and can be installed on any device.',
    features: ['Offline functionality', 'Push notifications', 'App-like experience', 'Cross-platform']
  },
  {
    Icon: Plug,
    title: 'API Development',
    description: 'Custom APIs and integrations to connect your systems and automate data flow.',
    features: ['RESTful APIs', 'Third-party integrations', 'Webhooks', 'Documentation']
  }
];

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="bg-surface border-b border-surface-border py-24 sm:py-28 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
            <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
            <span>What We Build</span>
            <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Custom Solutions We Specialize In
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every project is unique. Here are some of the custom solutions we specialize in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl bg-surface-card ring-1 ring-surface-border p-8 hover:ring-primary-500/50 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-gray-400 mb-6">{solution.description}</p>

                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <Check className="h-4 w-4 flex-none text-primary-500" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
