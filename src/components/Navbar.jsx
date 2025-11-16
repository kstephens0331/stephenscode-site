import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // ✅ Add this
import logo from '../assets/transparent_logo_dark.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // ✅ Use the cart

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm text-white shadow-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo or Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StephensCode logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-orange-400">StephensCode</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium items-center">
          <Link to="/" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/packages" className="hover:text-orange-400 transition">Packages</Link>
          <Link to="/pricing" className="hover:text-orange-400 transition">Pricing</Link>
          <Link to="/services" className="hover:text-orange-400 transition">Services</Link>
          <Link to="/demos" className="hover:text-orange-400 transition">Live Demos</Link>
          <Link to="/about" className="hover:text-orange-400 transition">About</Link>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
          <a
            href="https://customer.stephenscode.dev"
            className="hover:text-orange-400 transition"
          >
            Customer Login
          </a>
          <Link to="/cart" className="relative hover:text-orange-400 transition">
            <FaShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-xs text-white px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
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
          <Link to="/pricing" onClick={() => setIsOpen(false)} className="block">Pricing</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block">Services</Link>
          <Link to="/demos" onClick={() => setIsOpen(false)} className="block">Live Demos</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block">Contact</Link>
          <a
            href="https://customer.stephenscode.dev"
            onClick={() => setIsOpen(false)}
            className="block"
          >
            Customer Login
          </a>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block">
            Cart ({cartItems.length})
          </Link>
        </div>
      )}
    </motion.nav>
  );
}
