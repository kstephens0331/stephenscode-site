import React, { useState } from 'react';
import { Home, Building2, Users, TrendingUp, Info, MessageSquare, Phone, Menu, X, Search, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <a href="#" className="hover:text-[#ffc300] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#ffc300] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#ffc300] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#ffc300] transition-colors">
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
                <a href="#" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="bg-[#001d3d] p-2 rounded-lg hover:bg-[#ffc300] hover:text-[#000814] transition-colors">
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
            <p>&copy; 2024 Skyline Realty Group. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
