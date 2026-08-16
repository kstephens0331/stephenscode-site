import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Shield, Award, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

type LegalDocKey = 'privacy' | 'terms' | 'disclaimer';

const LEGAL_DOCS: Record<LegalDocKey, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: January 2024',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'Peak Financial Advisors collects personal information you provide when you request a consultation, subscribe to our newsletter, or become a client, including your name, contact details, and financial information necessary to deliver our services.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'Your information is used solely to provide financial advisory, tax, and accounting services, to communicate with you about your accounts, and to comply with legal and regulatory obligations. We never sell your personal information to third parties.',
      },
      {
        heading: 'Data Security',
        body: 'We protect client data with 256-bit encryption, multi-factor authentication, and strict internal access controls. Client documents are stored in our secure portal and retained only as long as required by law and professional standards.',
      },
      {
        heading: 'Your Rights',
        body: 'You may request a copy of the personal information we hold about you, ask for corrections, or request deletion where permitted by law. Contact our privacy officer at info@peakfinancial.com with any questions.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: January 2024',
    sections: [
      {
        heading: 'Use of This Website',
        body: 'This website is provided for general informational purposes. By using it you agree not to misuse the site, attempt unauthorized access, or rely on its content as a substitute for personalized professional advice.',
      },
      {
        heading: 'No Advisory Relationship',
        body: 'Viewing this website does not create an advisory, accounting, or fiduciary relationship. An engagement begins only when both parties sign a written service agreement describing the scope of services and fees.',
      },
      {
        heading: 'Fees and Engagements',
        body: 'Fees for services are disclosed in writing before any engagement begins. Investment advisory fees are billed as a percentage of assets under management; tax and accounting services are billed at fixed or hourly rates as agreed.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'To the fullest extent permitted by law, Peak Financial Advisors is not liable for decisions made in reliance on general website content. All services are governed by the terms of your signed engagement letter.',
      },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    updated: 'Last updated: January 2024',
    sections: [
      {
        heading: 'Investment Disclosure',
        body: 'Investing involves risk, including the potential loss of principal. Past performance does not guarantee future results. Any projected returns shown on this website are hypothetical illustrations, not promises of performance.',
      },
      {
        heading: 'Tax Information',
        body: 'Tax laws change frequently and their application depends on your individual circumstances. Content on this site reflects general rules in effect at the time of publication and should not be acted on without consulting a qualified professional.',
      },
      {
        heading: 'Registration Status',
        body: 'Securities offered through Peak Financial Advisors, LLC, member FINRA/SIPC. Investment advisory services offered through Peak Investment Advisors, a registered investment advisor. Registration does not imply a certain level of skill or training.',
      },
    ],
  },
};

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [legalDoc, setLegalDoc] = useState<LegalDocKey | null>(null);

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
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Peak Financial on Facebook" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Facebook size={16} className="text-[#14213d]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Peak Financial on Twitter" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Twitter size={16} className="text-[#14213d]" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Peak Financial on LinkedIn" className="w-8 h-8 bg-[#fca311] rounded-full flex items-center justify-center hover:bg-[#e59400] transition-colors">
                  <Linkedin size={16} className="text-[#14213d]" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-[#fca311]">Services</h4>
              <ul className="space-y-2 text-sm">
                {['Tax Planning', 'Retirement Planning', 'Investment Management', 'Estate Planning', 'Business Accounting'].map((label) => (
                  <li key={label}>
                    <button onClick={() => onNavigate('services')} className="text-gray-300 hover:text-[#fca311] transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-[#fca311]">Resources</h4>
              <ul className="space-y-2 text-sm">
                {['Tax Season Checklist', 'Retirement Guide', 'Investment Strategies', 'Tax Law Updates', 'Financial Blog'].map((label) => (
                  <li key={label}>
                    <button onClick={() => onNavigate('resources')} className="text-gray-300 hover:text-[#fca311] transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
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
                <button onClick={() => setLegalDoc('privacy')} className="hover:text-[#fca311] transition-colors">Privacy Policy</button>
                <button onClick={() => setLegalDoc('terms')} className="hover:text-[#fca311] transition-colors">Terms of Service</button>
                <button onClick={() => setLegalDoc('disclaimer')} className="hover:text-[#fca311] transition-colors">Disclaimer</button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Securities offered through Peak Financial Advisors, LLC. Member FINRA/SIPC. Investment advisory services offered through Peak Investment Advisors, a registered investment advisor.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      {legalDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close legal document"
            onClick={() => setLegalDoc(null)}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#14213d] text-white px-8 py-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold">{LEGAL_DOCS[legalDoc].title}</h2>
                <p className="text-xs text-gray-300">{LEGAL_DOCS[legalDoc].updated}</p>
              </div>
              <button
                onClick={() => setLegalDoc(null)}
                aria-label="Close"
                className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors"
              >
                <X size={22} />
              </button>
            </div>
            <div className="px-8 py-6 space-y-6">
              {LEGAL_DOCS[legalDoc].sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-[#14213d] mb-2">{section.heading}</h3>
                  <p className="text-gray-700 leading-relaxed">{section.body}</p>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setLegalDoc(null)}
                  className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
