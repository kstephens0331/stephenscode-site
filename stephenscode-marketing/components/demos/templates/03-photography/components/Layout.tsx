'use client';

import React, { useState } from 'react';
import { Phone, Mail, Instagram, Facebook, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
}

export default function Layout({ children, currentPage, onNavigate, isAdmin = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Packages', id: 'packages' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#2d3142] text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:555-123-4567" className="flex items-center gap-2 hover:text-[#bfc0c0] transition-colors">
              <Phone size={14} />
              <span className="hidden sm:inline">(555) 123-4567</span>
            </a>
            <a href="mailto:hello@lensandlight.com" className="flex items-center gap-2 hover:text-[#bfc0c0] transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">hello@lensandlight.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#bfc0c0] transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="hover:text-[#bfc0c0] transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-[#2d3142] rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl">L</span>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#2d3142] tracking-tight">
                  Lens & Light
                </div>
                <div className="text-xs text-[#4f5d75] tracking-widest uppercase">
                  Photography
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-2 ${
                    currentPage === item.id
                      ? 'text-[#2d3142]'
                      : 'text-[#4f5d75] hover:text-[#2d3142]'
                  }`}
                >
                  {item.name}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2d3142]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('contact')}
                className="px-6 py-2.5 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-all duration-300"
              >
                Book Session
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2d3142]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`block w-full text-left py-2 text-base font-medium ${
                      currentPage === item.id
                        ? 'text-[#2d3142]'
                        : 'text-[#4f5d75]'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate('contact')}
                  className="w-full px-6 py-3 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors"
                >
                  Book Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#2d3142] text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#2d3142] font-serif text-xl">L</span>
                </div>
                <div>
                  <div className="font-serif text-xl tracking-tight">
                    Lens & Light
                  </div>
                  <div className="text-xs text-[#bfc0c0] tracking-widest uppercase">
                    Photography
                  </div>
                </div>
              </div>
              <p className="text-[#bfc0c0] leading-relaxed mb-6">
                Capturing life&apos;s precious moments with artistry and passion.
                Professional photography services for weddings, families, portraits,
                and corporate events.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#4f5d75] rounded-full flex items-center justify-center hover:bg-white hover:text-[#2d3142] transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-[#4f5d75] rounded-full flex items-center justify-center hover:bg-white hover:text-[#2d3142] transition-all duration-300">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigate(item.id)}
                      className="text-[#bfc0c0] hover:text-white transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-[#bfc0c0]">
                <li>
                  <a href="tel:555-123-4567" className="hover:text-white transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@lensandlight.com" className="hover:text-white transition-colors">
                    hello@lensandlight.com
                  </a>
                </li>
                <li>123 Photography Lane<br />Studio City, CA 90210</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#4f5d75] mt-12 pt-8 text-center text-[#bfc0c0] text-sm">
            <p>&copy; {new Date().getFullYear()} Lens & Light Photography. All rights reserved.</p>
            {isAdmin && (
              <p className="mt-2 text-xs text-[#4f5d75]">
                Demo Mode - This is a sample website showcasing StephensCode capabilities
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
