// src/components/AddOnsGrid.jsx
import { motion } from 'framer-motion';

const addOns = [
  { title: "Business Email Setup", description: "Professional email (Google Workspace or domain-based).", price: "$25 one-time" },
  { title: "Monthly Maintenance", description: "Hosting, updates, backups, and bug fixes.", price: "$50-75/mo" },
  { title: "Maintenance + Email", description: "Includes hosting + email upkeep.", price: "$85/mo" },
  { title: "Maintenance + Email + Ad", description: "Includes everything + your site featured on ours.", price: "$100/mo" },
  { title: "Consulting & Strategy", description: "Business dev, systems planning, marketing.", price: "$75/hr" },
  { title: "Blog / Insights Section", description: "Add a styled blog or article hub.", price: "$110" },
  { title: "Appointment Booking", description: "Allow customers to schedule with you.", price: "$150" },
  { title: "Live Chat Integration", description: "Add Crisp, Tawk.to, or custom widget.", price: "$100" },
  { title: "Multilingual Support", description: "Switch between languages on your site.", price: "$140" },
  { title: "Custom Forms & Automation", description: "Intake, contact, or triggered actions.", price: "$100" }
];

export default function AddOnsGrid() {
  return (
    <motion.section
      className="bg-[#101010] text-white py-20 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Add-On Services</h2>
        <p className="text-gray-400">Enhance your site with tools tailored to your business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {addOns.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-[#1b1b1b] rounded-xl p-6 border border-gray-700 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,145,77,0.4)]"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-[#ff914d] mb-2">{item.title}</h4>
            <p className="text-gray-300 mb-3 text-sm">{item.description}</p>
            <span className="text-xs text-gray-500">{item.price}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
