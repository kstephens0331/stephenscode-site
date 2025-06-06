
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";


export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { addToCart } = useCart();

  const categories = {
    'Core Packages': [
      {
        title: 'Standard Website',
        price: '$350 flat-rate',
        features: ['Home, About, Services, Contact pages', 'Admin back office & customer login', 'Responsive design'],
      },
      {
        title: 'E-Commerce Website',
        price: '$450 flat-rate',
        features: ['Includes all Standard features', 'Online store & payment gateway', 'Basic inventory or vendor sync'],
      },
    ],
    'Premium Builds': [
      {
        title: '$5,000 Premium Build',
        desc: 'Advanced full-stack site with admin portal, dashboard, and tailored UX.',
      },
      {
        title: '$8,500 Agency Replacement',
        desc: 'Complete business system — CRM, client portals, APIs, and long-term scalability.',
      },
      {
        title: '$10,000 Enterprise Platform',
        desc: 'Large-scale tools: integrated admin, staff roles, automation, reports, and mobile support.',
      },
    ],
    'Add-Ons & Modules': [
      { title: 'Email Setup', desc: 'Professional business email setup: $15' },
      { title: 'Maintenance Plan', desc: '$40–$60/mo — updates, backups, and support' },
      { title: 'Form Generator', desc: 'Custom quote or intake forms — $75' },
      { title: 'Accounting Module', desc: 'Track expenses, invoices, generate reports — $120' },
      { title: 'Customer Dashboard', desc: 'Track jobs, quotes, tickets — $125' },
      { title: 'PDF Generator', desc: 'Branded PDFs (quotes, waivers, etc.) — $95' },
      { title: 'SEO Boost', desc: 'Structured metadata, sitemap, performance boost — $95' },
    ],
    'Advanced Tools': [
      { title: 'Dynamic Quote Builder', desc: 'Real-time pricing with branded output — $150' },
      { title: 'Staff Role Controls', desc: 'Define user roles & restricted access — $130' },
      { title: 'Job Ticketing System', desc: 'Service or task assignment system — $140' },
      { title: 'File Upload & Signing', desc: 'Clients upload docs or sign forms — $100' },
      { title: 'Multi-Location Support', desc: 'Manage branches or units separately — $175' },
      { title: 'Customer Rewards Tracker', desc: 'Loyalty points or discounts — $90' },
      { title: 'System Connector', desc: 'Automate workflows across tools — $120' },
      { title: 'Analytics Dashboard', desc: 'Visualized KPIs and usage metrics — $150' },
      { title: 'Onboarding Wizard', desc: 'Multi-step client intake — $110' },
    ],
  };

  const visibleCategories = activeCategory === 'All' ? Object.keys(categories) : [activeCategory];

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      <Helmet>
        <title>Pricing | StephensCode</title>
        <meta name="description" content="Explore packages and pricing for websites, systems, add-ons, and advanced business tools — all built custom and flat-rate." />
      </Helmet>

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-orange-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pricing & Packages
      </motion.h1>

      {/* Toggle Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', ...Object.keys(categories)].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pricing Groups */}
      {visibleCategories.map((group, i) => (
        <div key={i} className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">{group}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[group].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-md hover:shadow-orange-500/20 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-orange-400 mb-2">{item.title}</h3>
                {item.price && <p className="text-gray-300 mb-2">{item.price}</p>}
                {item.desc && <p className="text-gray-400 text-sm">{item.desc}</p>}
                {item.features && (
                  <ul className="text-gray-400 text-sm list-disc list-inside mt-2 space-y-1">
                    {item.features.map((feat, i) => <li key={i}>{feat}</li>)}
                  </ul>
                )}
                <button
  onClick={() =>
    addToCart({
      id: `${group}-${idx}`,
      title: item.title,
      price: parseFloat((item.price || item.desc || "").replace(/[^0-9.]/g, "")) || 0,
      description: item.desc || item.features?.join(", ") || "",
    })
  }
  className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded text-sm font-medium transition"
>
  Add to Cart
</button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Custom CTA */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-orange-400 mb-3">Need something specific?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          If you don’t see exactly what you’re looking for, we can build it or consult with you to make it happen.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded transition"
        >
          Request a Custom Quote
        </Link>
      </motion.div>
    </div>
  );
}
