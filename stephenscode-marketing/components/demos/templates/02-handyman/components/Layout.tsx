import React, { useState } from 'react';
import { Phone, Clock, MapPin, Mail, Facebook, Instagram, Twitter, Menu, X } from 'lucide-react';

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

type InfoModalKey = 'privacy' | 'terms' | 'license' | 'social' | null;

export default function Layout({ children, currentPage, onNavigate, colors }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModalKey>(null);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: string) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const socialProfiles = [
    {
      icon: Facebook,
      network: 'Facebook',
      handle: 'Fix-It Fast Handyman Services',
      detail: 'Project photos, seasonal promotions, and community events',
    },
    {
      icon: Instagram,
      network: 'Instagram',
      handle: '@fixitfast.handyman',
      detail: 'Before and after shots from recent jobs',
    },
    {
      icon: Twitter,
      network: 'X (Twitter)',
      handle: '@FixItFastHQ',
      detail: 'Service updates and quick home maintenance tips',
    },
  ];

  const policyContent: Record<'privacy' | 'terms' | 'license', { title: string; paragraphs: string[] }> = {
    privacy: {
      title: 'Privacy Policy',
      paragraphs: [
        'Fix-It Fast Handyman Services collects only the information needed to quote, schedule, and complete your service: your name, contact details, service address, and a description of the work requested.',
        'We never sell or share your personal information with third parties for marketing purposes. Your information is used solely to provide estimates, schedule appointments, and follow up on completed work.',
        'Payment information is processed through secure, PCI-compliant payment providers and is never stored on our systems.',
        'To request a copy of the information we have on file, or to ask that it be deleted, email info@fixitfast.com or call (555) 123-4567.',
      ],
    },
    terms: {
      title: 'Terms of Service',
      paragraphs: [
        'All estimates are free and valid for 30 days from the date issued. Approved flat-rate pricing will not change unless the scope of work changes, and any change is confirmed with you in writing before work continues.',
        'All workmanship is covered by our 1-year workmanship warranty. Materials carry the manufacturer\'s warranty.',
        'Appointments may be rescheduled or cancelled up to 24 hours in advance at no charge. Same-day cancellations may incur a $45 trip fee.',
        'Payment is due upon completion of work unless other arrangements are made in advance. We accept cash, check, and all major credit cards.',
      ],
    },
    license: {
      title: 'License & Insurance',
      paragraphs: [
        'Fix-It Fast Handyman Services operates under General Contractor License #12345, issued by the State Contractors Board and current through December 2026.',
        'We carry $2,000,000 in general liability insurance and full workers compensation coverage for every member of our team.',
        'Electrical and plumbing work is performed by individually licensed tradesmen: Electrical License #E-8842 (David Chen) and Plumbing License #P-5517 (Tom Rodriguez).',
        'Certificates of insurance are available on request before any project begins.',
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:5551234567" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" style={{ color: colors.accent }} />
              <span className="font-semibold">(555) 123-4567</span>
            </a>
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
              onClick={() => handleNav('home')}
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
                  onClick={() => handleNav(item.page)}
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
                className="px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all transform"
                style={{ backgroundColor: colors.accent }}
                onClick={() => handleNav('contact')}
              >
                Get Free Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
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
              <button
                onClick={() => handleNav('contact')}
                className="block w-full text-left px-4 py-3 rounded-lg text-white font-bold"
                style={{ backgroundColor: colors.accent }}
              >
                Get Free Quote
              </button>
            </div>
          )}
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
                <button
                  onClick={() => setInfoModal('social')}
                  aria-label="Fix-It Fast on Facebook"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setInfoModal('social')}
                  aria-label="Fix-It Fast on Instagram"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setInfoModal('social')}
                  aria-label="Fix-It Fast on X (Twitter)"
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => handleNav(item.page)}
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
                {['General Repairs', 'Electrical Work', 'Plumbing Fixes', 'Carpentry', 'Painting Services', 'Drywall Repair'].map((service) => (
                  <li key={service}>
                    <button
                      onClick={() => handleNav('services')}
                      className="hover:text-white transition-colors"
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
                <li>
                  <a href="tel:5551234567" className="flex items-start gap-2 hover:opacity-80 transition-opacity">
                    <Phone className="h-5 w-5 mt-0.5" style={{ color: colors.accent }} />
                    <div>
                      <div className="font-semibold">(555) 123-4567</div>
                      <div className="text-sm text-gray-400">Call anytime</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@fixitfast.com" className="flex items-start gap-2 hover:opacity-80 transition-opacity">
                    <Mail className="h-5 w-5 mt-0.5" style={{ color: colors.accent }} />
                    <div>
                      <div className="font-semibold">info@fixitfast.com</div>
                      <div className="text-sm text-gray-400">Email us</div>
                    </div>
                  </a>
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
              <button onClick={() => setInfoModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setInfoModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => setInfoModal('license')} className="hover:text-white transition-colors">License #12345</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {infoModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setInfoModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                {infoModal === 'social' ? 'Follow Fix-It Fast' : policyContent[infoModal].title}
              </h2>
              <button
                onClick={() => setInfoModal(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {infoModal === 'social' ? (
                <div className="space-y-4">
                  {socialProfiles.map((profile) => (
                    <div key={profile.network} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <profile.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{profile.network}</div>
                        <div className="font-semibold" style={{ color: colors.accent }}>{profile.handle}</div>
                        <div className="text-sm text-gray-600 mt-1">{profile.detail}</div>
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-gray-500">
                    Search for us by name on your favorite platform to see our latest project photos and reviews.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-gray-700">
                  {policyContent[infoModal].paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => setInfoModal(null)}
                className="w-full px-6 py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
