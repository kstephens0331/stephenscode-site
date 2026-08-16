'use client';

import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | null>(null);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services', hasDropdown: true },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  const serviceCategories = [
    'Lawn Care',
    'Landscape Design',
    'Hardscaping',
    'Irrigation',
    'Tree & Shrub Care',
    'Seasonal Cleanup',
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Info Bar */}
      <div className="bg-[#386641] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:555-0123" className="flex items-center gap-2 hover:text-[#a7c957] transition-colors">
                <Phone className="h-4 w-4" />
                <span>(555) 012-3456</span>
              </a>
              <a href="mailto:info@greenvalley.com" className="hidden md:flex items-center gap-2 hover:text-[#a7c957] transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@greenvalley.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Serving Greater Metro Area, 30 Mile Radius</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#386641] leading-none">Green Valley</div>
                <div className="text-sm text-[#6a994e] font-medium">Landscaping & Design</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center gap-1 text-base font-medium transition-colors ${
                          currentPage === item.id
                            ? 'text-[#386641]'
                            : 'text-gray-700 hover:text-[#386641]'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                          {serviceCategories.map((service) => (
                            <button
                              key={service}
                              onClick={() => {
                                onNavigate('services');
                                setServicesDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#a7c957]/10 hover:text-[#386641] transition-colors"
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`text-base font-medium transition-colors ${
                        currentPage === item.id
                          ? 'text-[#386641]'
                          : 'text-gray-700 hover:text-[#386641]'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#a7c957] text-[#386641] px-6 py-3 rounded-lg font-semibold hover:bg-[#6a994e] hover:text-white transition-all transform shadow-md"
              >
                Free Estimate
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#386641]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#386641] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="block w-full bg-[#a7c957] text-[#386641] px-4 py-3 rounded-lg font-semibold hover:bg-[#6a994e] hover:text-white transition-colors mt-4"
              >
                Free Estimate
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="min-h-[60vh]">{children}</main>

      {/* Footer */}
      <footer className="bg-[#386641] text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#a7c957]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">Green Valley</div>
                  <div className="text-sm text-[#a7c957]">Landscaping</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Transforming outdoor spaces with professional landscaping services for over 15 years.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Green Valley Landscaping on Facebook"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#a7c957] transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Green Valley Landscaping on Instagram"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#a7c957] transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Green Valley Landscaping on LinkedIn"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#a7c957] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors"
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
              <ul className="space-y-2">
                {serviceCategories.map((service) => (
                  <li key={service}>
                    <button
                      onClick={() => onNavigate('services')}
                      className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#a7c957] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">
                    123 Garden Lane<br />
                    Green Valley, ST 12345
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#a7c957] flex-shrink-0" />
                  <a href="tel:555-0123" className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors">
                    (555) 012-3456
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#a7c957] flex-shrink-0" />
                  <a href="mailto:info@greenvalley.com" className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors">
                    info@greenvalley.com
                  </a>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-gray-400">
                  <strong className="text-[#a7c957]">Service Hours:</strong><br />
                  Mon-Fri: 7:00 AM - 6:00 PM<br />
                  Sat: 8:00 AM - 4:00 PM<br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Green Valley Landscaping. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => setLegalPage('privacy')}
                className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalPage('terms')}
                className="text-sm text-gray-300 hover:text-[#a7c957] transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalPage !== null && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={() => setLegalPage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-[#386641]">
                {legalPage === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                onClick={() => setLegalPage(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="px-8 py-6 space-y-4 text-gray-700 text-sm leading-relaxed">
              {legalPage === 'privacy' ? (
                <>
                  <p className="text-xs text-gray-500">Last updated: January 2025</p>
                  <h3 className="font-bold text-[#386641] text-base">Information We Collect</h3>
                  <p>
                    When you request an estimate or contact us, we collect the information you provide, such as your name, email address, phone number, property address, and details about your project. We use this information solely to respond to your request and deliver our services.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">How We Use Your Information</h3>
                  <p>
                    Your information is used to prepare estimates, schedule consultations and service visits, process payments, and keep you informed about your project. We do not sell or rent your personal information to third parties.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">Site Photos</h3>
                  <p>
                    With your permission, we may photograph completed projects for our portfolio and gallery. You may opt out at any time by contacting us, and we will remove any images of your property on request.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">Contact Us</h3>
                  <p>
                    Questions about this policy? Reach us at info@greenvalley.com or (555) 012-3456.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-500">Last updated: January 2025</p>
                  <h3 className="font-bold text-[#386641] text-base">Estimates and Proposals</h3>
                  <p>
                    All estimates are free and valid for 30 days from the date issued. Final pricing may be adjusted if project scope changes after the estimate is accepted, and any changes will be confirmed with you in writing before work proceeds.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">Scheduling and Weather</h3>
                  <p>
                    Landscaping work is weather dependent. If conditions prevent safe or quality work, we will reschedule to the next available date and notify you as early as possible.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">Warranty</h3>
                  <p>
                    Plant installations include a one-year warranty when paired with an approved watering plan. Hardscape workmanship is warranted for three years. Warranty claims are handled promptly at no cost to you.
                  </p>
                  <h3 className="font-bold text-[#386641] text-base">Payments and Cancellations</h3>
                  <p>
                    Recurring maintenance may be canceled with 14 days notice. Project deposits are refundable up to 7 days before the scheduled start date.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
