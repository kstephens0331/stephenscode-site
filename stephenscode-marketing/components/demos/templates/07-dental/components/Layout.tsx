import React, { useState } from 'react';
import { Phone, Mail, Clock, Menu, X, AlertCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

type LegalDoc = 'privacy' | 'terms' | 'hipaa';

const LEGAL_CONTENT: Record<LegalDoc, { title: string; paragraphs: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'Bright Smile Dental respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it, and the choices you have.',
      'Information we collect: When you request an appointment, contact our office, or become a patient, we collect information such as your name, phone number, email address, insurance details, and relevant health history. Our website may also collect standard usage data such as pages visited and device type.',
      'How we use your information: We use your information to schedule and confirm appointments, coordinate your care, verify insurance benefits, process payments, and send appointment reminders. We never sell your personal information to third parties.',
      'Sharing: We share information only with parties involved in your care and billing, such as your insurance provider, referring specialists, and payment processors, and only as permitted by law and our HIPAA Notice of Privacy Practices.',
      'Your choices: You may request access to, correction of, or deletion of your personal information at any time by contacting our office at (555) 123-4567 or smile@brightsmile.com.'
    ]
  },
  terms: {
    title: 'Terms of Service',
    paragraphs: [
      'By using the Bright Smile Dental website, you agree to these terms. Please read them carefully.',
      'Website use: The content on this site is provided for general information about our practice and services. It is not dental or medical advice. Always consult a licensed dentist about your specific situation.',
      'Appointments: Online appointment requests are requests only and are not confirmed until our scheduling team contacts you. We ask for at least 24 hours notice to cancel or reschedule an appointment.',
      'Payment: Payment is expected at the time of service unless other arrangements have been made in advance. Estimates of insurance coverage are good-faith estimates and not guarantees of payment.',
      'Intellectual property: All content on this website, including text, graphics, and logos, is the property of Bright Smile Dental and may not be reproduced without written permission.',
      'Questions about these terms can be directed to smile@brightsmile.com or (555) 123-4567.'
    ]
  },
  hipaa: {
    title: 'HIPAA Notice of Privacy Practices',
    paragraphs: [
      'This notice describes how medical and dental information about you may be used and disclosed and how you can get access to this information. Please review it carefully.',
      'How we may use your health information: We use and disclose your protected health information (PHI) for treatment (coordinating your dental care), payment (billing you and your insurance), and health care operations (improving quality of care).',
      'Appointment reminders: We may contact you by phone, text, or email to remind you of upcoming appointments or to share information about treatment options.',
      'Your rights: You have the right to inspect and receive a copy of your dental records, request corrections, request restrictions on certain uses, request confidential communications, and receive an accounting of certain disclosures.',
      'Our responsibilities: We are required by law to maintain the privacy of your PHI, provide this notice, and notify you if a breach of your unsecured PHI occurs.',
      'To exercise any of these rights or file a concern, contact our Privacy Officer at (555) 123-4567 or smile@brightsmile.com. You may also file a complaint with the U.S. Department of Health and Human Services. You will not be penalized for filing a complaint.'
    ]
  }
};

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Our Team' },
    { id: 'patient-info', label: 'Patient Info' },
    { id: 'booking', label: 'Book Appointment' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span className="font-semibold">Dental Emergency?</span>
          <span>Call us 24/7 at</span>
          <a href="tel:555-911-CARE" className="underline font-bold hover:text-red-100">
            (555) 911-CARE
          </a>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-[#023e8a] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:555-123-4567" className="flex items-center gap-2 hover:text-[#48cae4] transition-colors">
              <Phone className="w-4 h-4" />
              <span>(555) 123-4567</span>
            </a>
            <a href="mailto:smile@brightsmile.com" className="flex items-center gap-2 hover:text-[#48cae4] transition-colors">
              <Mail className="w-4 h-4" />
              <span>smile@brightsmile.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Mon-Fri: 8am-6pm | Sat: 9am-3pm</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#023e8a] to-[#0077b6] rounded-full flex items-center justify-center">
                <div className="text-white text-2xl font-bold">BS</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#023e8a]">Bright Smile Dental</h1>
                <p className="text-sm text-gray-600">Creating Healthy, Beautiful Smiles</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-[#0077b6]'
                      : 'text-gray-700 hover:text-[#0077b6]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => onNavigate('booking')}
                className="bg-[#48cae4] text-[#023e8a] px-6 py-2 rounded-lg font-semibold hover:bg-[#0077b6] hover:text-white transition-all shadow-md"
              >
                Book Now
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#023e8a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-4 pb-2 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#0077b6] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
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
      <footer className="bg-[#023e8a] text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bright Smile Dental</h3>
              <p className="text-gray-300 text-sm mb-4">
                Providing exceptional dental care with a focus on patient comfort and advanced technology.
              </p>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-[#023e8a] font-bold text-xs">ADA</span>
                </div>
                <span className="text-xs text-gray-300">Member</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-[#48cae4] transition-colors">
                    Our Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('team')} className="hover:text-[#48cae4] transition-colors">
                    Meet Our Team
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('patient-info')} className="hover:text-[#48cae4] transition-colors">
                    Patient Information
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('booking')} className="hover:text-[#48cae4] transition-colors">
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Office Hours</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Monday - Friday: 8:00am - 6:00pm</li>
                <li>Saturday: 9:00am - 3:00pm</li>
                <li>Sunday: Closed</li>
                <li className="text-red-300 font-semibold mt-3">Emergency: 24/7</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>123 Dental Way</li>
                <li>Smile City, SC 12345</li>
                <li className="mt-3">
                  <a href="tel:555-123-4567" className="hover:text-[#48cae4] transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li>
                  <a href="mailto:smile@brightsmile.com" className="hover:text-[#48cae4] transition-colors">
                    smile@brightsmile.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#0077b6] mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Bright Smile Dental. All rights reserved.</p>
            <p className="mt-2">
              <button onClick={() => setLegalDoc('privacy')} className="hover:text-[#48cae4] transition-colors">Privacy Policy</button>
              {' | '}
              <button onClick={() => setLegalDoc('terms')} className="hover:text-[#48cae4] transition-colors">Terms of Service</button>
              {' | '}
              <button onClick={() => setLegalDoc('hipaa')} className="hover:text-[#48cae4] transition-colors">HIPAA Notice</button>
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      {legalDoc && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#023e8a]">{LEGAL_CONTENT[legalDoc].title}</h3>
              <button
                onClick={() => setLegalDoc(null)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs text-gray-500">Effective date: January 1, 2024 | Bright Smile Dental, 123 Dental Way, Smile City, SC 12345</p>
              {LEGAL_CONTENT[legalDoc].paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="p-5 border-t border-gray-200">
              <button
                onClick={() => setLegalDoc(null)}
                className="w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#023e8a] transition-all"
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
