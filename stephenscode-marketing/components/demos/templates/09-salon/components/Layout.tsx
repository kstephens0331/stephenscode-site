import React, { ReactNode } from 'react';
import { Menu, X, Phone, Instagram, Facebook, MapPin } from 'lucide-react';

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
    { name: 'Stylists', id: 'stylists' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Book Now', id: 'booking' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
                Glamour Studio
              </h1>
              <p className="text-sm text-gray-600 italic">Luxury Beauty Salon</p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`${
                    currentPage === item.id
                      ? 'text-[#d00000] font-semibold'
                      : 'text-gray-700 hover:text-[#dc2f02]'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <Phone className="w-4 h-4 text-[#d00000]" />
              <span className="text-gray-700 font-medium">(555) GLAMOUR</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`${
                    currentPage === item.id
                      ? 'text-[#d00000] font-semibold'
                      : 'text-gray-700'
                  } block w-full text-left py-2 px-4 hover:bg-gray-50`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Glamour Studio</h3>
              <p className="text-white/90 text-sm">
                Premier luxury beauty salon offering cutting-edge hair, nail, and beauty services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white/80">
                    Services & Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('stylists')} className="hover:text-white/80">
                    Our Stylists
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('booking')} className="hover:text-white/80">
                    Book Appointment
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gallery')} className="hover:text-white/80">
                    Gallery
                  </button>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>Monday - Friday: 9am - 8pm</li>
                <li>Saturday: 9am - 6pm</li>
                <li>Sunday: 10am - 5pm</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 456-7890
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  123 Fashion Avenue, Style City
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Instagram className="w-5 h-5 cursor-pointer hover:opacity-80" />
                <Facebook className="w-5 h-5 cursor-pointer hover:opacity-80" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
            <p>&copy; 2024 Glamour Studio Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
