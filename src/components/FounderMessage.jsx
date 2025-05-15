import { motion } from 'framer-motion';

export default function FounderMessage() {
  return (
    <section className="bg-[#111] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          From the Developer
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-400 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          I started StephensCode to break the barrier between powerful digital systems and the businesses that need them. Too many developers overcharge and underdeliver. Too many platforms limit your freedom. I want to change that.
        </motion.p>

        <motion.p 
          className="text-base text-gray-500 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Whether you're just starting or scaling fast, I build your website like it's my own. Real support. Real systems. No BS.
        </motion.p>

        <motion.div 
          className="text-sm text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          — Kyle Stephens, Founder of StephensCode LLC
        </motion.div>
      </div>
    </section>
  );
}