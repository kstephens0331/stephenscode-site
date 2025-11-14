import React from 'react';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function Layout({ children, currentPage, onNavigate, accentColor = '#c9a227' }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'attorneys', label: 'Our Attorneys' },
    { id: 'case-results', label: 'Case Results' },
    { id: 'client-resources', label: 'Client Resources' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Legal News' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: accentColor }} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: accentColor }} />
                <span>info@justiceassociates.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" style={{ color: accentColor }} />
              <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" style={{ color: accentColor }} />
              <Linkedin className="w-4 h-4 cursor-pointer hover:opacity-80" style={{ color: accentColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{ backgroundColor: '#16213e', color: '#ffffff' }} className="shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <Scale className="w-7 h-7" style={{ color: '#16213e' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Justice & Associates</h1>
                <p className="text-xs" style={{ color: accentColor }}>Excellence in Legal Representation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: currentPage === link.id ? accentColor : 'transparent',
                    color: currentPage === link.id ? '#16213e' : '#ffffff',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t" style={{ borderColor: '#c9a227' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: currentPage === link.id ? accentColor : 'transparent',
                    color: currentPage === link.id ? '#16213e' : '#ffffff',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }} className="mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="font-bold text-lg">Justice & Associates</h3>
              </div>
              <p className="text-sm text-gray-300">
                Providing exceptional legal representation with integrity and dedication since 1985.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4" style={{ color: accentColor }}>Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('about')} className="hover:underline">About Us</button></li>
                <li><button onClick={() => onNavigate('practice-areas')} className="hover:underline">Practice Areas</button></li>
                <li><button onClick={() => onNavigate('attorneys')} className="hover:underline">Our Attorneys</button></li>
                <li><button onClick={() => onNavigate('case-results')} className="hover:underline">Case Results</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4" style={{ color: accentColor }}>Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onNavigate('client-resources')} className="hover:underline">Client Resources</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:underline">Legal News</button></li>
                <li><button onClick={() => onNavigate('faq')} className="hover:underline">FAQ</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:underline">Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4" style={{ color: accentColor }}>Contact Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span>123 Justice Plaza, Suite 500<br />New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                  <span>info@justiceassociates.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm" style={{ borderColor: '#c9a227' }}>
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} Justice & Associates Law. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Attorney Advertising. Prior results do not guarantee a similar outcome.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
