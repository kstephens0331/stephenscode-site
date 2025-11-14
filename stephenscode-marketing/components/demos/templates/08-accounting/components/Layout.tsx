import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Shield, Award } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Resources', id: 'resources' },
    { name: 'Client Portal', id: 'portal' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#14213d] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:555-123-4567" className="flex items-center gap-2 hover:text-[#fca311] transition-colors">
              <Phone size={14} />
              <span>(555) 123-4567</span>
            </a>
            <a href="mailto:info@peakfinancial.com" className="flex items-center gap-2 hover:text-[#fca311] transition-colors">
              <Mail size={14} />
              <span>info@peakfinancial.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#fca311]">
              <Shield size={14} />
              <span className="text-xs">SEC Registered</span>
            </div>
            <div className="flex items-center gap-2 text-[#fca311]">
              <Award size={14} />
              <span className="text-xs">CPA Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#14213d] rounded-lg flex items-center justify-center">
                <span className="text-[#fca311] font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#14213d]">Peak Financial</h1>
                <p className="text-xs text-gray-600">Advisors & CPAs</p>
              </div>
            </button>

            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#14213d] text-white'
                      : 'text-gray-700 hover:bg-[#e5e5e5]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => onNavigate('contact')}
              className="hidden md:block bg-[#fca311] text-[#14213d] px-6 py-2 rounded-lg font-semibold hover:bg-[#e59400] transition-colors"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden pb-4 flex flex-wrap gap-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-[#14213d] text-white'
                    : 'text-gray-700 hover:bg-[#e5e5e5]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#14213d] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center">
                  <span className="text-[#14213d] font-bold text-lg">P</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Peak Financial</h3>
                  <p className="text-xs text-gray-300">Advisors & CPAs</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Trusted financial guidance for over 25 years. Your success is our mission.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Facebook size={16} className="text-[#14213d]" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Twitter size={16} className="text-[#14213d]" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Linkedin size={16} className="text-[#14213d]" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-[#fca311]">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Tax Planning</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Retirement Planning</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Investment Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Estate Planning</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Business Accounting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-[#fca311]">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Tax Season Checklist</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Retirement Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Investment Strategies</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Tax Law Updates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#fca311] transition-colors">Financial Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-[#fca311]">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#fca311] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">
                    450 Financial Plaza, Suite 2100<br />
                    Chicago, IL 60606
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-[#fca311]" />
                  <span className="text-gray-300">(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#fca311]" />
                  <span className="text-gray-300">info@peakfinancial.com</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  <strong>Hours:</strong><br />
                  Mon-Fri: 8:00 AM - 6:00 PM<br />
                  Sat: 9:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; 2024 Peak Financial Advisors. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#fca311] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#fca311] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#fca311] transition-colors">Disclaimer</a>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Securities offered through Peak Financial Advisors, LLC. Member FINRA/SIPC. Investment advisory services offered through Peak Investment Advisors, a registered investment advisor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
