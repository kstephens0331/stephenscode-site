import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?event,table,decor,wedding')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-wide mb-4"
        >
          Celebrate Beautifully
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl"
        >
          From concept to cleanup — elegant events crafted with care and creativity.
        </motion.p>
        <motion.a
          href="#quote"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded shadow-lg transition"
        >
          Start Planning
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
