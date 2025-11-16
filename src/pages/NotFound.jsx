import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
      <Helmet>
        <title>Page Not Found | StephensCode</title>
        <meta name="description" content="Oops — this page doesn’t exist. Return to StephensCode homepage." />
      </Helmet>

      {/* Optional visual illustration (swap with a Lottie or SVG if desired) */}
      <motion.img
        src="/assets/404-graphic.svg" // Replace with your own graphic or animation
        alt="Page not found"
        className="w-64 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-6xl font-extrabold text-orange-400 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl font-bold text-white mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        This page doesn’t exist or has moved.
      </motion.h2>

      <motion.p
        className="text-gray-400 mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Let’s get you back on track. Use the navigation menu or return to the homepage below.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
