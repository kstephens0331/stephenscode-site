import React, { useState } from 'react';
import { Home, Building2, Users, TrendingUp, Info, MessageSquare, Phone, Menu, X, Search, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const LEGAL_DOCS = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'Skyline Realty Group collects only the information you choose to share with us, such as your name, email address, phone number, and details about the property you are buying or selling. We use it to respond to your inquiries, schedule showings, and keep you informed about listings that match your search.',
      'We never sell your personal information. Your details are shared only with the Skyline agent working on your behalf and with service providers (such as lenders or inspectors) that you ask us to coordinate with.',
      'You may request a copy of the information we hold about you, or ask us to delete it, at any time by emailing info@skylinerealty.com or calling (555) 123-4567.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    paragraphs: [
      'By using the Skyline Realty Group website you agree to use it for personal, non-commercial purposes related to buying, selling, or renting real estate. Listing information is provided for your convenience and is deemed reliable but not guaranteed; details such as pricing, availability, and property features should be confirmed with an agent.',
      'Content on this site, including photography, market data, and written guides, belongs to Skyline Realty Group and may not be reproduced without permission.',
      'Nothing on this site constitutes legal, financial, or tax advice. For guidance specific to your situation, please consult the appropriate licensed professional. Questions about these terms can be sent to info@skylinerealty.com.',
    ],
  },
} as const;

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<keyof typeof LEGAL_DOCS | null>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'listings', label: 'Featured Listings', icon: Building2 },
    { id: 'agents', label: 'Our Agents', icon: Users },
    { id: 'buyer-resources', label: 'Buyer Resources', icon: Search },
    { id: 'seller-resources', label: 'Seller Resources', icon: TrendingUp },
    { id: 'market-trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'about', label: 'About', icon: Info },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-[#000814] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <a href="tel:555-123-4567" className="flex items-center hover:text-[#ffc300] transition-colors">
                  <Phone className="w-4 h-4 mr-1" />
                  (555) 123-4567
                </a>
                <a href="mailto:info@skylinerealty.com" className="flex items-center hover:text-[#ffc300] transition-colors">
                  <Mail className="w-4 h-4 mr-1" />
                  info@skylinerealty.com
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#ffc300] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#ffc300] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#ffc300] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#ffc300] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 group"
              >
                <div className="bg-[#000814] p-2 rounded-lg group-hover:bg-[#001d3d] transition-colors">
                  <Building2 className="w-8 h-8 text-[#ffc300]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#000814]">Skyline Realty Group</h1>
                  <p className="text-xs text-gray-600">Your Dream Home Awaits</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-[#000814] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-left transition-all ${
                        currentPage === item.id
                          ? 'bg-[#000814] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#000814] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-8 h-8 text-[#ffc300]" />
                <h3 className="text-xl font-bold">Skyline Realty Group</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Leading the way in luxury real estate since 2010. Your trusted partner in finding the perfect home.
              </p>
              <div className="flex space-x-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#ffc300]">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('listings')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Featured Listings
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('agents')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Our Agents
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('market-trends')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Market Trends
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#ffc300]">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('buyer-resources')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Buyer Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('seller-resources')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Seller Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('testimonials')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#ffc300]">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    123 Skyline Drive<br />
                    Downtown District, NY 10001
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0" />
                  <a href="tel:555-123-4567" className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0" />
                  <a href="mailto:info@skylinerealty.com" className="text-gray-400 hover:text-[#ffc300] transition-colors">
                    info@skylinerealty.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Skyline Realty Group. All rights reserved. |{' '}
              <button
                onClick={() => setLegalDoc('privacy')}
                className="hover:text-[#ffc300] underline-offset-2 hover:underline transition-colors"
              >
                Privacy Policy
              </button>{' '}
              |{' '}
              <button
                onClick={() => setLegalDoc('terms')}
                className="hover:text-[#ffc300] underline-offset-2 hover:underline transition-colors"
              >
                Terms of Service
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      {legalDoc && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-[#000814]">{LEGAL_DOCS[legalDoc].title}</h3>
              <button
                onClick={() => setLegalDoc(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {LEGAL_DOCS[legalDoc].paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <button
                onClick={() => setLegalDoc(null)}
                className="w-full bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
