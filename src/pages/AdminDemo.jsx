import { motion } from "framer-motion";


<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
></motion.div>

export default function AdminDemo() {
  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-orange-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Portal Demo
      </motion.h1>

      <motion.p
        className="text-center text-lg text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        This is a functional admin portal demo that simulates adding customers, products, and generating quotes. Data entered here is not saved and is cleared when the session ends.
      </motion.p>
    </div>
  );
}