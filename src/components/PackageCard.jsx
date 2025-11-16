import { motion } from 'framer-motion';

export default function PackageCard({ title, price, features, highlight, subtitle }) {
  return (
    <motion.div
      className={`w-full max-w-md rounded-2xl p-8 border-2 transition-all duration-300 shadow-lg 
        ${highlight
          ? 'bg-gradient-to-br from-[#ff914d] to-[#ff6b00] text-black border-[#ff914d]'
          : 'bg-[#1a1a1a] text-white border-gray-700'
        }`}
      whileHover={{
        scale: 1.04,
        boxShadow: highlight
          ? '0 0 40px rgba(255,145,77,0.6)'
          : '0 0 25px rgba(255,255,255,0.1)',
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold leading-snug tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-1 italic">{subtitle}</p>
        )}
      </div>

      <p className={`text-4xl font-extrabold mb-6 ${highlight ? 'text-black' : 'text-[#ff914d]'}`}>
        ${price}
      </p>

      <ul className="space-y-3 text-sm font-medium">
        {features.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#ff914d] text-lg">✔</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}