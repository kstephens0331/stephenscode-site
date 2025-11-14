import React from 'react';
import { Menu, X, GraduationCap, BookOpen, Users, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

interface LayoutProps {
  currentPage: 'home' | 'subjects' | 'about' | 'contact';
  onNavigate: (page: 'home' | 'subjects' | 'about' | 'contact') => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home' as const, label: 'Home', icon: GraduationCap },
    { id: 'subjects' as const, label: 'Subjects', icon: BookOpen },
    { id: 'about' as const, label: 'About', icon: Users },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group"
            >
              <div className="bg-gradient-to-br from-[#5f0f40] to-[#9a031e] p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-[#5f0f40] to-[#9a031e] bg-clip-text text-transparent">
                  Smart Start Tutoring
                </span>
                <span className="text-xs text-gray-600 font-medium">Excellence in Education</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === link.id
                        ? 'bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white shadow-md'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-[#5f0f40]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
              <a
                href="tel:555-123-4567"
                className="ml-4 px-5 py-2 bg-[#fb8b24] text-white rounded-lg font-semibold hover:bg-[#e57a1a] transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-100 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === link.id
                          ? 'bg-gradient-to-r from-[#5f0f40] to-[#9a031e] text-white'
                          : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
                <a
                  href="tel:555-123-4567"
                  className="flex items-center space-x-3 px-4 py-3 bg-[#fb8b24] text-white rounded-lg font-semibold hover:bg-[#e57a1a] transition-all duration-200"
                >
                  <Phone className="h-5 w-5" />
                  <span>(555) 123-4567</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-theme(spacing.32))]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#5f0f40] via-[#7a1050] to-[#9a031e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-[#fb8b24]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Smart Start</h3>
                  <p className="text-sm text-purple-200">Tutoring</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                Empowering students to reach their full potential through personalized, expert tutoring.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#fb8b24]">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-purple-200 hover:text-white transition-colors text-sm flex items-center space-x-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-[#fb8b24] rounded-full group-hover:w-2 transition-all duration-200"></span>
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#fb8b24]">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-purple-200 text-sm">
                  <MapPin className="h-5 w-5 text-[#fb8b24] flex-shrink-0 mt-0.5" />
                  <span>123 Education Lane<br />Learning City, ST 12345</span>
                </li>
                <li className="flex items-center space-x-3 text-purple-200 text-sm">
                  <Phone className="h-5 w-5 text-[#fb8b24] flex-shrink-0" />
                  <a href="tel:555-123-4567" className="hover:text-white transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center space-x-3 text-purple-200 text-sm">
                  <Mail className="h-5 w-5 text-[#fb8b24] flex-shrink-0" />
                  <a href="mailto:info@smartstarttutoring.com" className="hover:text-white transition-colors">
                    info@smartstarttutoring.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours & Social */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#fb8b24]">Hours</h3>
              <div className="space-y-2 text-purple-200 text-sm mb-6">
                <p>Monday - Friday: 9am - 8pm</p>
                <p>Saturday: 10am - 6pm</p>
                <p>Sunday: 12pm - 5pm</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-purple-200 text-sm">
            <p>&copy; {new Date().getFullYear()} Smart Start Tutoring. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
