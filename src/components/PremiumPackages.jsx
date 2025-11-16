// src/components/PremiumPackages.jsx
import { motion } from 'framer-motion';

const premiumTiers = [
  {
    title: "Launch Pro",
    price: "$3,000",
    description: "For funded startups or companies ready to scale.",
    features: [
      "Custom Branding & Strategy",
      "UI/UX Design in Figma",
      "Admin + Client Portal",
      "SEO Setup & Copywriting",
      "60 Days of Support"
    ]
  },
  {
    title: "Growth Engine",
    price: "$6,500",
    description: "For scaling businesses or full SaaS builds.",
    features: [
      "Everything in Launch Pro",
      "CMS or Editor Tools",
      "Blog / Insights Area",
      "Automations + API Integrations",
      "Business Consulting Sessions"
    ]
  },
  {
    title: "Flagship Experience",
    price: "$10,000",
    description: "For brands ready to dominate their space.",
    features: [
      "Everything in Growth Engine",
      "AI Tools + Analytics",
      "Product Demo Dashboards",
      "PWA / Mobile App Shell",
      "90 Days of Launch Support"
    ],
    highlight: true
  }
];

export default function PremiumPackages() {
  return (
    <motion.section
      className="bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212] text-white py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Premium Tiers</h2>
        <p className="text-gray-400">Elite systems that outperform high-ticket agencies.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 max-w-6xl mx-auto">
        {premiumTiers.map((tier, idx) => (
          <motion.div
            key={idx}
            className={`flex-1 rounded-2xl p-6 border shadow-xl transition-all duration-300 ${
              tier.highlight
                ? 'bg-[#ff914d] text-black border-[#ff914d]'
                : 'bg-[#1a1a1a] border-gray-700 text-white'
            }`}
            whileHover={{
              scale: 1.04,
              boxShadow: tier.highlight
                ? '0 0 40px rgba(255,145,77,0.5)'
                : '0 0 25px rgba(255,255,255,0.12)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-1">{tier.title}</h3>
            <p className="text-3xl font-extrabold mb-2">{tier.price}</p>
            <p className="text-sm text-gray-400 mb-4">{tier.description}</p>
            <ul className="space-y-2 text-sm font-medium">
              {tier.features.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ff914d]">✔</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
