import React, { ReactNode } from 'react';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Mail, Shield, Award, ThumbsUp } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Service Areas', id: 'service-areas' },
    { name: 'Financing', id: 'financing' },
    { name: 'About', id: 'about' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-[#d62828] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-bold">24/7 EMERGENCY HVAC SERVICE AVAILABLE</span>
            <span className="hidden sm:inline">|</span>
            <a href="tel:555-COOL-NOW" className="font-semibold hover:underline">
              Call Now: (555) COOL-NOW
            </a>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-[#003049] text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@coolbreezehvac.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Mon-Fri: 7AM-7PM | Sat: 8AM-5PM</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-[#f77f00]">
                <Shield className="w-4 h-4 mr-1" />
                Licensed & Insured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center"
            >
              <div className="text-4xl mr-3">❄️</div>
              <div>
                <h1 className="text-3xl font-bold text-[#003049]">
                  Cool Breeze HVAC
                </h1>
                <p className="text-sm text-[#f77f00] font-semibold">Your Comfort, Our Priority</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`${
                    currentPage === item.id
                      ? 'text-[#d62828] font-bold'
                      : 'text-gray-700 hover:text-[#003049]'
                  } transition-colors duration-300 text-sm`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => onNavigate('emergency')}
                className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#b11f1f] transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse"
              >
                EMERGENCY SERVICE
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`${
                    currentPage === item.id
                      ? 'text-[#d62828] font-bold'
                      : 'text-gray-700'
                  } block w-full text-left py-3 px-4 hover:bg-gray-50`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('emergency');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 bg-[#d62828] text-white font-bold mt-2 rounded-lg"
              >
                EMERGENCY SERVICE
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Trust Badges */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-[#003049] mb-2" />
              <p className="font-bold text-[#003049]">Licensed & Insured</p>
              <p className="text-sm text-gray-600">Fully Certified</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-[#f77f00] mb-2" />
              <p className="font-bold text-[#003049]">Award Winning</p>
              <p className="text-sm text-gray-600">Best HVAC 2024</p>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-12 h-12 text-[#003049] mb-2" />
              <p className="font-bold text-[#003049]">5000+ Happy Customers</p>
              <p className="text-sm text-gray-600">4.9/5 Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-[#d62828] mb-2" />
              <p className="font-bold text-[#003049]">24/7 Service</p>
              <p className="text-sm text-gray-600">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003049] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-2">❄️</div>
                <h3 className="text-xl font-bold">Cool Breeze HVAC</h3>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Professional HVAC services for residential and commercial properties. Licensed, insured, and committed to your comfort.
              </p>
              <div className="flex items-center space-x-2 text-[#f77f00]">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">License #HVAC-12345</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#f77f00] transition">
                    AC Repair & Installation
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#f77f00] transition">
                    Heating Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#f77f00] transition">
                    Maintenance Plans
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#f77f00] transition">
                    Commercial HVAC
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('emergency')} className="hover:text-[#f77f00] transition">
                    Emergency Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Downtown & Metro Area</li>
                <li>North County</li>
                <li>South County</li>
                <li>East Valley</li>
                <li>West Valley</li>
                <li>
                  <button onClick={() => onNavigate('service-areas')} className="text-[#f77f00] hover:underline font-semibold">
                    View All Areas →
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">(555) 123-4567</p>
                    <p className="text-xs">24/7 Emergency: (555) COOL-NOW</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>info@coolbreezehvac.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>123 HVAC Boulevard, Suite 100<br />Comfort City, ST 12345</span>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-[#f77f00] transition" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-[#f77f00] transition" />
                <Mail className="w-5 h-5 cursor-pointer hover:text-[#f77f00] transition" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
              <div className="text-sm text-white/60">
                <p>&copy; 2024 Cool Breeze HVAC. All rights reserved.</p>
              </div>
              <div className="text-sm text-white/60 md:text-right space-x-4">
                <button className="hover:text-white transition">Privacy Policy</button>
                <span>|</span>
                <button className="hover:text-white transition">Terms of Service</button>
                <span>|</span>
                <button className="hover:text-white transition">Sitemap</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
