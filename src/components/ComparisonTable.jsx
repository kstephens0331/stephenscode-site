// src/components/ComparisonTable.jsx
import { motion } from 'framer-motion';

const features = [
  "Flat Pricing",
  "Custom Code (No Templates)",
  "Full Source Code Access",
  "Admin Dashboard & Client Portal",
  "Backend / API Integration",
  "Real Developer Support",
  "AI, Automation, and Advanced Features",
  "No Platform Lock-In",
];

const columns = [
  { name: "StephensCode", values: [true, true, true, true, true, true, true, true] },
  { name: "Wix / GoDaddy / Squarespace", values: [false, false, false, false, false, false, false, true] },
  { name: "Freelancers / Template Shops", values: [false, true, false, false, false, false, false, true] },
  { name: "Big Agencies ($10K+)", values: [false, true, true, true, true, true, true, true] }
];

export default function ComparisonTable() {
  return (
    <section className="bg-[#0b0b0b] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why StephensCode Wins</h2>
        <p className="text-gray-400">We offer more flexibility, ownership, and firepower — for a fraction of the cost.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700 text-sm">
          <thead>
            <tr>
              <th className="bg-[#1a1a1a] text-left p-4 border border-gray-700">Feature</th>
              {columns.map((col, i) => (
                <th key={i} className="bg-[#1a1a1a] text-center p-4 border border-gray-700 font-semibold text-[#ff914d]">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIdx) => (
              <motion.tr
                key={rowIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIdx * 0.05 }}
                className="hover:bg-[#181818] transition"
              >
                <td className="p-4 border border-gray-700 text-gray-300">{feature}</td>
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="p-4 text-center border border-gray-700"
                  >
                    {col.values[rowIdx] ? (
                      <span className="text-green-400 font-bold">✔</span>
                    ) : (
                      <span className="text-red-500">—</span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
