import React from 'react';
import { Menu, X, Phone, Clock, MapPin, Heart, Facebook, Instagram, Twitter } from 'lucide-react';

type SocialKey = 'facebook' | 'instagram' | 'twitter';

const socialProfiles: Record<SocialKey, {
  label: string;
  handle: string;
  followers: string;
  posts: { text: string; time: string; likes: number; comments: number }[];
}> = {
  facebook: {
    label: 'Paws & Care on Facebook',
    handle: '@pawsandcareanimalhospital',
    followers: '4,280 followers',
    posts: [
      { text: 'Max the Golden Retriever went home today after emergency bloat surgery. Seeing him wag his way out the door is why we do this. Get well soon, buddy!', time: '2 days ago', likes: 214, comments: 38 },
      { text: 'February is Pet Dental Health Month! Book a dental cleaning this month and receive a free take-home dental care kit for your pet.', time: '5 days ago', likes: 96, comments: 12 },
      { text: 'Welcome to the team, Dr. Foster! She specializes in puppy and kitten care and is now accepting new patients.', time: '1 week ago', likes: 183, comments: 27 },
    ],
  },
  instagram: {
    label: 'Paws & Care on Instagram',
    handle: '@pawsandcare',
    followers: '6,150 followers',
    posts: [
      { text: 'Kitten season is here! Meet the foster litter Dr. Foster is bottle-feeding between appointments. All five will be ready for adoption soon.', time: '1 day ago', likes: 542, comments: 64 },
      { text: 'Before and after: Luna the Beagle after her dental cleaning. Healthy teeth, happy dog, fresh breath. Her family says the snuggles improved too.', time: '4 days ago', likes: 318, comments: 22 },
      { text: 'Our boarding suites got an upgrade! Climate control, orthopedic bedding, and a webcam so you can check in on your pet anytime.', time: '1 week ago', likes: 276, comments: 19 },
    ],
  },
  twitter: {
    label: 'Paws & Care on X',
    handle: '@pawsandcarevet',
    followers: '2,940 followers',
    posts: [
      { text: 'Reminder: chocolate, grapes, xylitol, and lilies are toxic to pets. Save our 24/7 emergency line: (555) 123-4567.', time: '3 days ago', likes: 87, comments: 9 },
      { text: 'Heat advisory this weekend. Walk dogs early morning or after sunset, and never leave pets in parked cars, even for a minute.', time: '6 days ago', likes: 142, comments: 15 },
      { text: 'We are now offering drop-off appointments for busy pet parents. Drop off in the morning, pick up after work. Call to schedule.', time: '1 week ago', likes: 63, comments: 7 },
    ],
  },
};

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  businessInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function Layout({ children, currentPage, onNavigate, businessInfo, colors }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [socialModal, setSocialModal] = React.useState<SocialKey | null>(null);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Our Veterinarians', page: 'veterinarians' },
    { label: 'Pet Care Tips', page: 'pet-care' },
    { label: 'New Patients', page: 'new-patients' },
    { label: 'Emergency Care', page: 'emergency' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Testimonials', page: 'testimonials' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-medium">
        <span className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4" />
          Emergency Services Available 24/7. Call {businessInfo.phone}
        </span>
      </div>

      {/* Top Bar */}
      <div style={{ backgroundColor: colors.primary }} className="text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {businessInfo.phone}
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {businessInfo.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSocialModal('facebook')}
              aria-label="View our Facebook page"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSocialModal('instagram')}
              aria-label="View our Instagram profile"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSocialModal('twitter')}
              aria-label="View our X profile"
              className="hover:opacity-80 transition-opacity"
            >
              <Twitter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div style={{ backgroundColor: colors.primary }} className="w-12 h-12 rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {businessInfo.name}
                </h1>
                <p className="text-sm text-gray-600">Compassionate Pet Care</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.page
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-teal-50'
                  }`}
                  style={currentPage === item.page ? { backgroundColor: colors.primary } : {}}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Book Appointment Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="hidden lg:block px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: colors.accent, color: '#1f2937' }}
            >
              Book Appointment
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: colors.primary }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: colors.primary }} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    currentPage === item.page
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-teal-50'
                  }`}
                  style={currentPage === item.page ? { backgroundColor: colors.primary } : {}}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 px-6 py-3 rounded-full text-gray-800 font-medium hover:opacity-90 transition-all"
                style={{ backgroundColor: colors.accent }}
              >
                Book Appointment
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: colors.primary }} className="text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-8 h-8" fill="currentColor" />
                <h3 className="text-xl font-bold">{businessInfo.name}</h3>
              </div>
              <p className="text-teal-100 text-sm leading-relaxed">
                Providing compassionate, state-of-the-art veterinary care for your beloved pets since 1995.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('services')} className="text-teal-100 hover:text-white transition-colors">
                    Our Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('veterinarians')} className="text-teal-100 hover:text-white transition-colors">
                    Meet Our Vets
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('new-patients')} className="text-teal-100 hover:text-white transition-colors">
                    New Patients
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('emergency')} className="text-teal-100 hover:text-white transition-colors">
                    Emergency Care
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-teal-100">{businessInfo.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-teal-100">{businessInfo.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="text-teal-100">{businessInfo.hours}</span>
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div>
              <h4 className="font-semibold mb-4">Office Hours</h4>
              <ul className="space-y-2 text-sm text-teal-100">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8am - 7pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9am - 5pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10am - 4pm</span>
                </li>
                <li className="pt-2 border-t border-teal-400">
                  <span className="font-semibold">Emergency: 24/7</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-teal-400 mt-8 pt-8 text-center text-sm text-teal-100">
            <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
            <p className="mt-2">Website by StephensCode</p>
          </div>
        </div>
      </footer>

      {/* Social Media Modal */}
      {socialModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSocialModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={socialProfiles[socialModal].label}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                {socialProfiles[socialModal].label}
              </h3>
              <button
                onClick={() => setSocialModal(null)}
                aria-label="Close social media preview"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{socialProfiles[socialModal].handle}</p>
                  <p className="text-sm text-gray-600">{socialProfiles[socialModal].followers}</p>
                </div>
              </div>

              <div className="space-y-4">
                {socialProfiles[socialModal].posts.map((post, i) => (
                  <div key={i} className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                    <p className="text-gray-800 mb-3 leading-relaxed">{post.text}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.time}</span>
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSocialModal(null);
                  onNavigate('contact');
                }}
                className="mt-6 w-full px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
