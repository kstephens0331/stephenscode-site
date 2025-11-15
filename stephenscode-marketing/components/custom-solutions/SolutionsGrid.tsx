'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    icon: '🚀',
    title: 'SaaS Platforms',
    description: 'Multi-tenant software-as-a-service platforms with user management, billing integration, and scalable architecture.',
    features: ['Subscription billing', 'Multi-user management', 'API integrations', 'Cloud deployment']
  },
  {
    icon: '💻',
    title: 'Web Applications',
    description: 'Custom web apps tailored to your workflow, from internal dashboards to customer-facing platforms.',
    features: ['Custom dashboards', 'Real-time updates', 'Database design', 'Responsive design']
  },
  {
    icon: '🤖',
    title: 'Data Scrapers & Automation',
    description: 'Automated data collection, processing, and integration tools that save you hours of manual work.',
    features: ['Web scraping', 'Data processing', 'Scheduled automation', 'API development']
  },
  {
    icon: '🛠️',
    title: 'Business Tools',
    description: 'Bespoke software solutions designed for your specific business processes and requirements.',
    features: ['Workflow automation', 'Custom integrations', 'Reporting tools', 'Process optimization']
  },
  {
    icon: '📱',
    title: 'Progressive Web Apps',
    description: 'Mobile-first applications that work offline and can be installed on any device.',
    features: ['Offline functionality', 'Push notifications', 'App-like experience', 'Cross-platform']
  },
  {
    icon: '🔌',
    title: 'API Development',
    description: 'Custom APIs and integrations to connect your systems and automate data flow.',
    features: ['RESTful APIs', 'Third-party integrations', 'Webhooks', 'Documentation']
  }
];

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            What We Build
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every project is unique. Here are some of the custom solutions we specialize in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                <div className="text-5xl mb-4">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-slate-300 mb-6">{solution.description}</p>

                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
