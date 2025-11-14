import React from 'react';
import { Phone, Clock, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Residential', id: 'residential' },
    { name: 'Commercial', id: 'commercial' },
    { name: 'Emergency 24/7', id: 'emergency' },
    { name: 'Coupons', id: 'coupons' },
    { name: 'About', id: 'about' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Service Areas', id: 'service-areas' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#023e7d] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">(555) PLUMBER</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Serving Greater Metro Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-[#0466c8] p-3 rounded-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#023e7d]">Premier Plumbing Pros</h1>
                  <p className="text-sm text-gray-600">Licensed • Bonded • Insured</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Call Now For Service</p>
                <p className="text-2xl font-bold text-[#0466c8]">(555) 765-8237</p>
              </div>
              <button className="bg-[#0466c8] hover:bg-[#0353a4] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Request Service
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-200">
            <div className="flex flex-wrap justify-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-[#0466c8] border-b-2 border-[#0466c8]'
                      : 'text-gray-700 hover:text-[#0466c8]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#023e7d] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Premier Plumbing Pros</h3>
              <p className="text-blue-200 mb-4">
                Your trusted partner for all residential and commercial plumbing needs.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 cursor-pointer hover:text-blue-300" />
                <Twitter className="h-6 w-6 cursor-pointer hover:text-blue-300" />
                <Instagram className="h-6 w-6 cursor-pointer hover:text-blue-300" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200">
                <li className="hover:text-white cursor-pointer">Drain Cleaning</li>
                <li className="hover:text-white cursor-pointer">Leak Detection</li>
                <li className="hover:text-white cursor-pointer">Water Heaters</li>
                <li className="hover:text-white cursor-pointer">Pipe Repair</li>
                <li className="hover:text-white cursor-pointer">Emergency Service</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Coupons</li>
                <li className="hover:text-white cursor-pointer">Reviews</li>
                <li className="hover:text-white cursor-pointer">Service Areas</li>
                <li className="hover:text-white cursor-pointer">Financing</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-start space-x-2">
                  <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">(555) 765-8237</p>
                    <p className="text-sm">24/7 Emergency</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <p>123 Main Street<br />Anytown, ST 12345</p>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
                  <p>24 Hours a Day<br />7 Days a Week</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Premier Plumbing Pros. All rights reserved. | Licensed • Bonded • Insured</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
