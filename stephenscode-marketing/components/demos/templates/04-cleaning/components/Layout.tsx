'use client';

import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

type ModalKey = 'facebook' | 'instagram' | 'careers' | 'reviews' | 'privacy' | 'terms' | 'sitemap';

const reviews = [
  {
    name: 'Jennifer Thompson',
    location: 'Sparkle City, SC',
    rating: 5,
    text: 'Sparkle Clean has been cleaning our home bi-weekly for 6 months now. Always on time, thorough, and professional.',
  },
  {
    name: 'David Martinez',
    location: 'Downtown SC',
    rating: 5,
    text: 'We use Sparkle Clean for our office space. The team is efficient, quiet, and respectful of our workspace.',
  },
  {
    name: 'Lisa Anderson',
    location: 'Riverside, SC',
    rating: 5,
    text: 'The deep cleaning service was incredible! They got stains out that I thought were permanent.',
  },
  {
    name: 'Robert Kim',
    location: 'Sparkle City, SC',
    rating: 4,
    text: 'Great move-out cleaning. Got my full security deposit back. Scheduling took one phone call.',
  },
];

const socialPosts = {
  facebook: [
    { text: 'Before and after: full deep clean of a 3BR home in Riverside. Swipe to see the kitchen transformation!', time: '2 days ago', likes: 48, comments: 7 },
    { text: 'Spring special: 15% off weekly recurring service for new customers this month. Call or book online.', time: '5 days ago', likes: 92, comments: 14 },
    { text: 'Shoutout to our crew for finishing 12 homes this week with a perfect 5-star average. Proud of this team!', time: '1 week ago', likes: 63, comments: 9 },
  ],
  instagram: [
    { text: 'Streak-free windows, every time. Our window cleaning package covers tracks, sills, and screens too.', time: '1 day ago', likes: 134, comments: 11 },
    { text: 'Eco-friendly products only. Safe for kids, pets, and the planet. That is the Sparkle Clean promise.', time: '4 days ago', likes: 201, comments: 18 },
    { text: 'Office refresh day! Evening commercial cleaning means your team walks into a spotless workspace.', time: '1 week ago', likes: 87, comments: 5 },
  ],
};

const careers = [
  { title: 'Residential Cleaning Technician', type: 'Full-time', pay: '$16-$20/hr', detail: 'Day shifts, Mon-Fri. Vehicle and supplies provided. Paid training.' },
  { title: 'Commercial Cleaning Crew Lead', type: 'Full-time, evenings', pay: '$19-$23/hr', detail: 'Lead a 3-person crew on office accounts. 2+ years experience preferred.' },
  { title: 'Office Coordinator', type: 'Part-time', pay: '$17/hr', detail: 'Scheduling, customer calls, and quote follow-up. 20-25 hrs/week.' },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  const navigate = (page: string) => {
    setMobileMenuOpen(false);
    setActiveModal(null);
    onNavigate(page);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const modalTitles: Record<ModalKey, string> = {
    facebook: 'Sparkle Clean on Facebook',
    instagram: 'Sparkle Clean on Instagram',
    careers: 'Careers at Sparkle Clean',
    reviews: 'Customer Reviews',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    sitemap: 'Sitemap',
  };

  const renderModalBody = (key: ModalKey) => {
    switch (key) {
      case 'facebook':
      case 'instagram': {
        const posts = socialPosts[key];
        const followers = key === 'facebook' ? '2,340 followers' : '3,180 followers';
        return (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">@sparklecleanservices</p>
                <p className="text-sm text-gray-600">{followers} &bull; 4.9 rating</p>
              </div>
            </div>
            <div className="space-y-4">
              {posts.map((post, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-800 mb-3">{post.text}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.time}</span>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('contact')}
              className="mt-6 w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors"
            >
              Get a Free Quote
            </button>
          </div>
        );
      }
      case 'careers':
        return (
          <div>
            <p className="text-gray-700 mb-6">
              We are always looking for reliable, detail-oriented people to join our crew. All positions
              include paid training and background checks are required.
            </p>
            <div className="space-y-4 mb-6">
              {careers.map((job, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                    <span className="text-[#0077b6] font-semibold whitespace-nowrap">{job.pay}</span>
                  </div>
                  <p className="text-sm font-medium text-[#00b4d8] mb-2">{job.type}</p>
                  <p className="text-sm text-gray-600">{job.detail}</p>
                </div>
              ))}
            </div>
            <a
              href="mailto:careers@sparkleclean.com?subject=Job%20Application"
              className="block text-center w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors"
            >
              Email Your Resume
            </a>
            <p className="text-sm text-gray-500 text-center mt-3">
              Or call (555) 123-4567 and ask for the hiring manager.
            </p>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
              <p className="text-5xl font-bold text-[#0077b6]">4.9</p>
              <div>
                <StarRow rating={5} />
                <p className="text-sm text-gray-600 mt-1">Based on 127 verified reviews</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <StarRow rating={review.rating} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{review.location}</p>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('contact')}
              className="w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors"
            >
              Get Your Free Quote
            </button>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4 text-gray-700">
            <p>
              Sparkle Clean Services collects only the information needed to schedule and deliver your
              cleaning service: your name, contact details, service address, and service preferences.
            </p>
            <p>
              We never sell or share your personal information with third parties for marketing purposes.
              Payment information is processed securely by our payment provider and is never stored on
              our systems.
            </p>
            <p>
              You may request a copy of your data, or ask us to delete it, at any time by emailing
              info@sparkleclean.com or calling (555) 123-4567.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 2024</p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Scheduling and access.</span> Please ensure our
              team can access your property at the scheduled time. If we cannot access the property, a
              rescheduling fee may apply.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Cancellations.</span> We require 24-hour notice
              for cancellations. Cancellations with less than 24-hour notice may incur a $50 fee.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Satisfaction guarantee.</span> If you are not
              satisfied with any area we cleaned, notify us within 24 hours and we will re-clean it for
              free or refund that portion of your service.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Payment.</span> Payment is due after service
              completion. We accept all major credit cards, debit cards, and ACH bank transfers.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 2024</p>
          </div>
        );
      case 'sitemap':
        return (
          <div className="space-y-2">
            {[
              { id: 'home', label: 'Home', detail: 'Company overview, services, and testimonials' },
              { id: 'services', label: 'Services', detail: 'All 8 cleaning services with details and starting prices' },
              { id: 'pricing', label: 'Pricing', detail: 'Pricing calculator, packages, and commercial rates' },
              { id: 'contact', label: 'Contact', detail: 'Free quote form, office info, and business hours' },
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => navigate(page.id)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 transition-colors"
              >
                <p className="font-bold text-[#0077b6]">{page.label}</p>
                <p className="text-sm text-gray-600">{page.detail}</p>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#0077b6] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:555-123-4567" className="flex items-center gap-2 hover:text-[#90e0ef] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (555) 123-4567
            </a>
            <a href="mailto:info@sparkleclean.com" className="flex items-center gap-2 hover:text-[#90e0ef] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@sparkleclean.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon-Sat: 7AM - 7PM
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveModal('facebook')}
                aria-label="Sparkle Clean on Facebook"
                className="hover:text-[#90e0ef] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                onClick={() => setActiveModal('instagram')}
                aria-label="Sparkle Clean on Instagram"
                className="hover:text-[#90e0ef] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Sparkle Clean</h1>
                <p className="text-sm text-[#0077b6]">Professional Cleaning Services</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
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
                onClick={() => navigate('contact')}
                className="bg-[#0077b6] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors shadow-md hover:shadow-lg"
              >
                Get Free Quote
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-gray-200 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#0077b6] bg-opacity-10 text-[#0077b6]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigate('contact')}
                className="block w-full text-center bg-[#0077b6] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005f8f] transition-colors mt-2"
              >
                Get Free Quote
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Sparkle Clean</span>
              </div>
              <p className="text-gray-400 mb-4">
                Professional cleaning services for homes and businesses. Eco-friendly, reliable, and guaranteed.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-xs font-semibold">
                  Eco-Friendly
                </span>
                <span className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-xs font-semibold">
                  Licensed
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    Residential Cleaning
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    Office Cleaning
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    Deep Cleaning
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    Move In/Out
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    Carpet Cleaning
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('pricing')} className="hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('careers')} className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('reviews')} className="hover:text-white transition-colors">
                    Reviews
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Clean Street, Suite 100<br />Sparkle City, SC 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@sparkleclean.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Sparkle Clean Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">
                Terms of Service
              </button>
              <button onClick={() => setActiveModal('sitemap')} className="hover:text-white transition-colors">
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalTitles[activeModal]}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">{modalTitles[activeModal]}</h3>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">{renderModalBody(activeModal)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
