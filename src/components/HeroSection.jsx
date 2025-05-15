import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-[#101010] text-white px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#282828] via-transparent to-transparent opacity-40 z-0" />
      
      <motion.div 
        className="relative z-10 max-w-5xl text-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Custom-Built. Fully Yours. <br />
          <span className="text-[#ff914d]">Shockingly Affordable.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300">
          We build professional websites and back-end systems for real businesses — starting at just <strong>$350</strong>.
        </p>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a href="/services" className="px-6 py-3 bg-[#ff914d] text-black rounded-xl shadow-lg hover:scale-105 transition">
            View Packages
          </a>
          <a href="/demos" className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition">
            See Live Demos
          </a>
        </motion.div>

        <div className="mt-10 text-sm text-gray-400 tracking-widest uppercase">
          Built with React, Tailwind, Node, Firebase, PostgreSQL, Stripe, OpenAI, FastAPI
        </div>
      </motion.div>
    </section>
  );
}