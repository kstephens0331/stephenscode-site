
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import {
  FaLaptopCode,
  FaStore,
  FaWpforms,
  FaTools,
  FaUserShield,
  FaChartBar,
  FaCogs,
  FaSyncAlt,
  FaRobot,
  FaSearch,
  FaFilePdf,
  FaServer,
  FaQuoteRight,
  FaUsersCog,
  FaTasks,
  FaUpload,
  FaProjectDiagram,
  FaAward,
  FaNetworkWired,
  FaSlidersH,
  FaBullhorn
} from 'react-icons/fa';

export default function Services() {
  const categories = {
    'Website Development': [
      { icon: <FaLaptopCode />, name: 'Custom Website Development' },
      { icon: <FaStore />, name: 'E-commerce Setup' },
      { icon: <FaWpforms />, name: 'Quote + Intake Form Builders' },
    ],
    'Admin & Backend Systems': [
      { icon: <FaTools />, name: 'Admin Dashboards & Portals' },
      { icon: <FaUserShield />, name: 'Client Login Systems' },
      { icon: <FaChartBar />, name: 'Accounting & Reporting Modules' },
      { icon: <FaFilePdf />, name: 'PDF Quote + Waiver Generators' },
      { icon: <FaServer />, name: 'Maintenance & Hosting Plans' },
      { icon: <FaUsersCog />, name: 'Staff Role Management System' },
      { icon: <FaTasks />, name: 'Job Ticketing & Task Tracker' },
    ],
    'Integrations & Automation': [
      { icon: <FaSyncAlt />, name: 'Custom System Connectors' },
      { icon: <FaCogs />, name: 'Inventory Sync (Distributors)' },
      { icon: <FaRobot />, name: 'Automation & Email Workflows' },
      { icon: <FaSearch />, name: 'SEO Optimization' },
      { icon: <FaUpload />, name: 'File Upload & Digital Signing' },
      { icon: <FaProjectDiagram />, name: 'Customer Portal with Status Tracking' },
    ],
    'Advanced Features': [
      { icon: <FaAward />, name: 'Loyalty & Rewards Tracker' },
      { icon: <FaNetworkWired />, name: 'Multi-Location/Franchise Dashboard' },
      { icon: <FaSlidersH />, name: 'Onboarding / Intake Wizard' },
      { icon: <FaBullhorn />, name: 'Custom Analytics Dashboard' },
    ],
  };

  const [activeCategory, setActiveCategory] = useState('Website Development');

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      <Helmet>
        <title>Services | StephensCode</title>
        <meta
          name="description"
          content="Explore everything we offer — websites, admin portals, customer dashboards, APIs, automation tools, and more."
        />
     </Helmet>

      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-4">
          Services We Offer
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          StephensCode is a fully custom website and system builder. Whether you’re a local business or enterprise, we can build exactly what you need — without the agency price tag.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(categories).map((cat) => (
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

      {/* Service Cards */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        key={activeCategory}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories[activeCategory].map((service, idx) => (
          <Link to="/pricing" key={idx}>
            <motion.div
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-md hover:shadow-orange-500/20 hover:scale-[1.02] transition flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <div className="text-orange-400 text-2xl">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-200">
                {service.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-orange-400 mb-3">Have something specific in mind?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Don’t see your exact need? We can build custom tools for your workflow — or work with you to design the perfect system.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded transition"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}
