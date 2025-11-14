import React from 'react';
import { Phone, Clock, MapPin, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function Layout({ children, currentPage, onNavigate, colors }: LayoutProps) {
  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: colors.accent }} />
              <span className="font-semibold">(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: colors.accent }} />
              <span>Mon-Sat: 7AM-8PM | Sun: Emergency Only</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white px-3 py-1 rounded" style={{ backgroundColor: colors.accent }}>
              24/7 EMERGENCY SERVICE
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: colors.primary }}
              >
                FF
              </div>
              <div className="text-left">
                <div className="font-bold text-2xl" style={{ color: colors.primary }}>
                  Fix-It Fast
                </div>
                <div className="text-sm text-gray-600">Handyman Services</div>
              </div>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`font-semibold transition-colors pb-1 ${
                    currentPage === item.page
                      ? 'border-b-2'
                      : 'hover:opacity-70'
                  }`}
                  style={{
                    color: currentPage === item.page ? colors.primary : '#374151',
                    borderColor: currentPage === item.page ? colors.primary : 'transparent',
                  }}
                >
                  {item.name}
                </button>
              ))}
              <button
                className="px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                style={{ backgroundColor: colors.accent }}
                onClick={() => onNavigate('contact')}
              >
                Get Free Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`block w-full text-left px-4 py-2 rounded ${
                  currentPage === item.page ? 'font-bold' : ''
                }`}
                style={{
                  backgroundColor: currentPage === item.page ? colors.secondary + '20' : 'transparent',
                  color: currentPage === item.page ? colors.primary : '#374151',
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: colors.primary }}
                >
                  FF
                </div>
                <div className="font-bold text-lg">Fix-It Fast</div>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted handyman service for all home repairs and improvements. Licensed, insured, and always on time.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => onNavigate(item.page)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>General Repairs</li>
                <li>Electrical Work</li>
                <li>Plumbing Fixes</li>
                <li>Carpentry</li>
                <li>Painting Services</li>
                <li>Drywall Repair</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 mt-0.5" style={{ color: colors.accent }} />
                  <div>
                    <div className="font-semibold">(555) 123-4567</div>
                    <div className="text-sm text-gray-400">Call anytime</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 mt-0.5" style={{ color: colors.accent }} />
                  <div>
                    <div className="font-semibold">info@fixitfast.com</div>
                    <div className="text-sm text-gray-400">Email us</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5" style={{ color: colors.accent }} />
                  <div>
                    <div className="font-semibold">Serving Greater Metro Area</div>
                    <div className="text-sm text-gray-400">20-mile radius</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Fix-It Fast Handyman Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">License #12345</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
