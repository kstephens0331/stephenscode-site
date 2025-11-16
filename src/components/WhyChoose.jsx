import { motion } from "framer-motion";
import { FaMoneyBillWave, FaRocket, FaTools } from "react-icons/fa";

const features = [
  {
    icon: FaMoneyBillWave,
    title: "Flat-Rate Pricing",
    description:
      "No surprise fees. Every package is priced clearly so you know exactly what you're getting.",
  },
  {
    icon: FaRocket,
    title: "Agency-Level Quality",
    description:
      "Design, animation, and backend logic built to outperform $10k+ competitors — at a fraction of the cost.",
  },
  {
    icon: FaTools,
    title: "Business-First Systems",
    description:
      "We don’t just build pretty websites — we build tools to make your business faster, smarter, and easier to manage.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose StephensCode?
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#1a1a1a] rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="text-orange-400 text-4xl mb-4">
              <feature.icon />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}