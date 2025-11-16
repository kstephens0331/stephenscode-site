// src/components/IndustryBlock.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  {
    name: "Construction & Trades",
    image: "/demo-images/construction-demo.png", // ✅ public path
    link: "/demos/construction",                 // ✅ working route
    features: [
      "Estimate & Quote Builder",
      "Job Scheduling System",
      "Multi-unit Property Manager",
      "Before/After Project Photos",
      "Material Tracker",
    ],
  },
  {
    name: "Event Planners & Rentals",
    image: "/demo-images/event-demo.png",
    link: "/demos/event",
    features: [
      "Event Dashboard & Calendar",
      "Rental Inventory Management",
      "Client Communication Threads",
      "Theme Selector or Moodboard",
      "Contract + Payment Tracker",
    ],
  },
  {
    name: "Medical & Coaching",
    image: "/demo-images/healthcare-demo.png",
    link: "/demos/healthcare",
    features: [
      "HIPAA-Safe Intake Forms",
      "Appointment Calendar",
      "Client Progress Tracker",
      "Secure Document Uploads",
      "Private Session Notes",
    ],
  },
  {
    name: "Customer Portal",
    image: "/demo-images/customer-portal.png", // using customer portal preview
    link: "/demos/customer-portal",
    features: [
      "View Quotes, Invoices & Pay Online",
      "Track Job/Project Status & Tickets",
      "Secure Messaging with Your Team",
      "Upload/Download Project Documents",
      "Schedule or Reschedule Appointments",
    ],
  },
  {
    name: "Admin Portal",
    image: "/demo-images/admin-portal.png", // placeholder preview
    link: "/demos/admin-portal",
    features: [
      "KPI Dashboard: Revenue, P&L, MRR",
      "Sales & Orders Overview + Forecasts",
      "Expense Tracking & Budget vs Actual",
      "Team/Ticket Performance & SLAs",
      "Reports Export (PDF/CSV)",
    ],
  },
];

export default function IndustryBlock() {
  const [active, setActive] = useState(null);

  return (
    <motion.section
      className="bg-[#0c0c0c] text-white py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Industry-Specific Capabilities</h2>
        <p className="text-gray-400">Tailored features for your exact business type.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.name}
            className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-[#232323] transition"
              onClick={() => setActive(active === index ? null : index)}
            >
              {industry.name}
              <span className="text-[#ff914d]">{active === index ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {active === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Optional preview image from /public/demo-images */}
                  {industry.image && (
                    <div className="px-6">
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-700 mb-4 bg-black/40">
                        <img
                          src={industry.image}
                          alt={`${industry.name} preview`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    </div>
                  )}

                  <ul className="px-6 pb-4 space-y-2 text-sm text-gray-300">
                    {industry.features.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#ff914d]">✔</span> {item}
                      </li>
                    ))}
                  </ul>

                  {/* Demo link actions */}
                  <div className="px-6 pb-6">
                    {industry.link ? (
                      <Link
                        to={industry.link}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-sm font-semibold"
                      >
                        View Demo
                        <span aria-hidden>→</span>
                      </Link>
                    ) : (
                      <Link
                        to="/demos"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-md text-sm font-semibold"
                      >
                        See All Demos
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
