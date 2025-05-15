import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  {
    name: "Construction & Trades",
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
    features: [
      "HIPAA-Safe Intake Forms",
      "Appointment Calendar",
      "Client Progress Tracker",
      "Secure Document Uploads",
      "Private Session Notes",
    ],
  },
  {
    name: "Real Estate & Rentals",
    features: [
      "Interactive Listings with Maps",
      "Lead Routing Tools",
      "Virtual Tours Integration",
      "Tenant Application Forms",
      "Saved Properties Dashboard",
    ],
  },
  {
    name: "Online Courses / LMS",
    features: [
      "Course Library + Progress Bars",
      "Video Embeds with Checks",
      "Downloadable Resources",
      "Quiz Builder with Scoring",
      "Certificate Generator",
    ],
  },
];

export default function IndustryBlock() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#0c0c0c] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Industry-Specific Capabilities</h2>
        <p className="text-gray-400">Tailored features for your exact business type.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {industries.map((industry, index) => (
          <div key={index} className="bg-[#1a1a1a] border border-gray-700 rounded-xl">
            <button
              className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold hover:bg-[#232323] transition"
              onClick={() => setActive(active === index ? null : index)}
            >
              {industry.name}
              <span className="text-[#ff914d]">{active === index ? "−" : "+"}</span>
            </button>

            <AnimatePresence>
              {active === index && (
                <motion.ul
                  className="px-6 pb-4 space-y-2 text-sm text-gray-300"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {industry.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#ff914d]">✔</span> {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}