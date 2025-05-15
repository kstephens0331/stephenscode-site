// src/components/PackageCard.jsx
import { motion } from 'framer-motion';

export default function PackageCard({ title, price, features, highlight }) {
  return (
    <motion.div
      className={`w-full max-w-md rounded-2xl shadow-2xl p-6 border ${
        highlight ? 'bg-[#ff914d] text-black border-[#ff914d]' : 'bg-[#1a1a1a] text-white border-gray-700'
      }`}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-extrabold mb-4">${price}</p>
      <ul className="space-y-2 text-sm">
        {features.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[#ff914d]">✔</span> {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
