import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?construction,site')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Build With Confidence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl"
        >
          From fences and landscapes to custom metal structures — we've got you covered.
        </motion.p>
        <motion.a
          href="#quote"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition"
        >
          Request a Free Quote
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
