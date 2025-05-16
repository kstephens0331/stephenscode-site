import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm text-white shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-xl font-bold text-orange-400">
          StephensCode
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/packages" className="hover:text-orange-400 transition">Packages</Link>
          <Link to="/demos" className="hover:text-orange-400 transition">Live Demos</Link>
          <Link to="/about" className="hover:text-orange-400 transition">About</Link>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block">Home</Link>
          <Link to="/packages" onClick={() => setIsOpen(false)} className="block">Packages</Link>
          <Link to="/demos" onClick={() => setIsOpen(false)} className="block">Live Demos</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block">Contact</Link>
        </div>
      )}
    </motion.nav>
  );
}