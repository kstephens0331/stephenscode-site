import { motion } from 'framer-motion';

const premiumTiers = [
  {
    title: "Launch Pro",
    price: "$5,000",
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
    price: "$8,500",
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
    ]
  }
];

export default function PremiumPackages() {
  return (
    <section className="bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#121212] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Premium Tiers</h2>
        <p className="text-gray-400">Elite systems that outperform high-ticket agencies.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 max-w-6xl mx-auto">
        {premiumTiers.map((tier, idx) => (
          <motion.div
            key={idx}
            className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-2xl shadow-lg p-6 text-left hover:border-[#ff914d] transition"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-2xl font-bold text-[#ff914d] mb-2">{tier.title}</h3>
            <p className="text-xl font-semibold mb-3">{tier.price}</p>
            <p className="text-gray-400 mb-4 text-sm">{tier.description}</p>
            <ul className="space-y-2 text-sm">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#ff914d]">✔</span> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}