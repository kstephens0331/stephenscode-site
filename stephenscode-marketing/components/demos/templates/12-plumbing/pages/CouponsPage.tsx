import React, { useEffect, useState } from 'react';
import { Scissors, Calendar, CheckCircle, Printer, Download, Tag, X } from 'lucide-react';

interface CouponsPageProps {
  onNavigate: (page: string) => void;
}

interface Coupon {
  title: string;
  subtitle: string;
  description: string;
  code: string;
  validUntil: string;
  terms: string;
  featured?: boolean;
}

const CouponsPage: React.FC<CouponsPageProps> = ({ onNavigate }) => {
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('plumbing-demo-newsletter') !== null) {
      setEmailSubmitted(true);
    }
  }, []);

  const couponText = (coupon: Coupon) =>
    [
      'PREMIER PLUMBING PROS -- COUPON',
      '',
      `${coupon.title} -- ${coupon.subtitle}`,
      coupon.description,
      '',
      `Coupon Code: ${coupon.code}`,
      `Valid until: ${coupon.validUntil}`,
      `Terms: ${coupon.terms}`,
      '',
      'Call (555) 765-8237 to schedule and mention this code.'
    ].join('\n');

  const handleDownload = (coupon: Coupon) => {
    const blob = new Blob([couponText(coupon)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PremierPlumbing-${coupon.code}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = (coupon: Coupon) => {
    const printWindow = window.open('', '_blank', 'width=640,height=480');
    if (printWindow) {
      const doc = printWindow.document;
      doc.title = `Premier Plumbing Pros Coupon -- ${coupon.code}`;
      doc.body.style.cssText = 'font-family: Arial, sans-serif; padding: 24px;';

      const wrapper = doc.createElement('div');
      wrapper.style.cssText = 'border: 3px dashed #0466c8; border-radius: 12px; padding: 24px; max-width: 480px;';

      const lines: Array<{ text: string; css: string }> = [
        { text: 'PREMIER PLUMBING PROS', css: 'margin: 0 0 4px; color: #0466c8; font-weight: bold;' },
        { text: coupon.title, css: 'margin: 0 0 4px; font-size: 32px; font-weight: bold;' },
        { text: coupon.subtitle, css: 'margin: 0 0 12px; font-size: 20px; color: #444; font-weight: bold;' },
        { text: coupon.description, css: 'margin: 0 0 12px;' },
        { text: `Coupon Code: ${coupon.code}`, css: 'margin: 0 0 4px; font-family: monospace; font-size: 20px; font-weight: bold;' },
        { text: `Valid until: ${coupon.validUntil}`, css: 'margin: 0 0 4px;' },
        { text: coupon.terms, css: 'margin: 0 0 12px; font-size: 12px; color: #666;' },
        { text: 'Call (555) 765-8237 to schedule', css: 'margin: 0; font-weight: bold;' }
      ];
      lines.forEach((line) => {
        const p = doc.createElement('p');
        p.style.cssText = line.css;
        p.textContent = line.text;
        wrapper.appendChild(p);
      });
      doc.body.appendChild(wrapper);
      printWindow.focus();
      printWindow.print();
    } else {
      window.print();
    }
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    window.localStorage.setItem('plumbing-demo-newsletter', trimmed);
    setEmailSubmitted(true);
  };

  const coupons: Coupon[] = [
    {
      title: '$50 OFF',
      subtitle: 'Any Service Over $250',
      description: 'Save $50 on any plumbing service totaling $250 or more.',
      code: 'SAVE50',
      validUntil: 'December 31, 2024',
      terms: 'New customers only. Cannot be combined with other offers. One per household.',
      featured: true
    },
    {
      title: '$100 OFF',
      subtitle: 'Water Heater Installation',
      description: 'Get $100 off the installation of any new water heater.',
      code: 'HEATER100',
      validUntil: 'December 31, 2024',
      terms: 'Valid on new installations only. Cannot be combined with other offers.',
      featured: true
    },
    {
      title: '15% OFF',
      subtitle: 'Drain Cleaning Service',
      description: 'Save 15% on professional drain cleaning services.',
      code: 'DRAIN15',
      validUntil: 'November 30, 2024',
      terms: 'Standard drain cleaning only. Cannot be combined with other offers.'
    },
    {
      title: 'FREE',
      subtitle: 'Plumbing Inspection',
      description: 'Complimentary whole-home plumbing inspection with any service.',
      code: 'INSPECT',
      validUntil: 'December 31, 2024',
      terms: 'With paid service call. Includes written report of findings.'
    },
    {
      title: '$75 OFF',
      subtitle: 'Sewer Line Video Inspection',
      description: 'Save $75 on camera inspection of your sewer line.',
      code: 'VIDEO75',
      validUntil: 'December 31, 2024',
      terms: 'Standard inspection only. Cannot be combined with other offers.'
    },
    {
      title: '10% OFF',
      subtitle: 'Senior Citizens',
      description: 'Seniors 65+ receive 10% off all plumbing services.',
      code: 'SENIOR10',
      validUntil: 'No Expiration',
      terms: 'Valid ID required. Cannot be combined with other offers.'
    },
    {
      title: '10% OFF',
      subtitle: 'Military & First Responders',
      description: 'Thank you for your service! 10% off all services.',
      code: 'HERO10',
      validUntil: 'No Expiration',
      terms: 'Valid ID required. Cannot be combined with other offers.'
    },
    {
      title: '$25 OFF',
      subtitle: 'Leak Detection Service',
      description: 'Save $25 on professional leak detection and diagnosis.',
      code: 'LEAK25',
      validUntil: 'November 30, 2024',
      terms: 'Electronic leak detection service. Cannot be combined with other offers.'
    },
    {
      title: 'FREE',
      subtitle: 'Second Opinion',
      description: 'Free second opinion on any plumbing repair estimate.',
      code: 'OPINION',
      validUntil: 'No Expiration',
      terms: 'Bring competitor quote for comparison. Valid for repairs over $500.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Tag className="h-5 w-5" />
              <span className="font-semibold">Special Offers</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Coupons & Special Offers</h1>
            <p className="text-xl text-blue-100 mb-8">
              Save money on quality plumbing services with our current promotions and special offers.
              Print or mention the coupon code when booking your service.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Offers</h2>
            <p className="text-xl text-gray-600">Our best deals this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {coupons.filter(c => c.featured).map((coupon, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-4xl font-bold mb-2">{coupon.title}</h3>
                      <p className="text-2xl text-blue-100">{coupon.subtitle}</p>
                    </div>
                    <Tag className="h-12 w-12 text-white/50" />
                  </div>
                  <p className="text-lg mb-6">{coupon.description}</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-100 mb-1">Coupon Code:</p>
                        <p className="text-2xl font-bold font-mono">{coupon.code}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePrint(coupon)}
                          aria-label={`Print ${coupon.code} coupon`}
                          className="bg-white text-[#0466c8] p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Printer className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDownload(coupon)}
                          aria-label={`Download ${coupon.code} coupon`}
                          className="bg-white text-[#0466c8] p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Valid until: {coupon.validUntil}</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-200 mb-4">{coupon.terms}</p>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Schedule Service with This Coupon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Coupons Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Available Coupons</h2>
            <p className="text-xl text-gray-600">Click to print or save any coupon</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.filter(c => !c.featured).map((coupon, index) => (
              <div
                key={index}
                onClick={() => setActiveCoupon(coupon)}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#0466c8] transition-colors cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-[#0466c8] to-[#0353a4] p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-3xl font-bold mb-1">{coupon.title}</h3>
                      <p className="text-lg text-blue-100">{coupon.subtitle}</p>
                    </div>
                    <Scissors className="h-8 w-8 text-white/50 transform rotate-90" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{coupon.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Coupon Code:</p>
                    <p className="text-xl font-bold text-[#0466c8] font-mono">{coupon.code}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Valid until: {coupon.validUntil}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 italic">{coupon.terms}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrint(coupon);
                      }}
                      className="flex-1 bg-[#0466c8] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0353a4] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(coupon);
                      }}
                      aria-label={`Download ${coupon.code} coupon`}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Use Our Coupons</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0466c8] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Coupon</h3>
                    <p className="text-gray-600">
                      Browse our available coupons and select the one that best fits your plumbing needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0466c8] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Print or Save Code</h3>
                    <p className="text-gray-600">
                      Print the coupon or save the coupon code. You can also take a screenshot for easy access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0466c8] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Service</h3>
                    <p className="text-gray-600">
                      Call us or book online and mention the coupon code when scheduling your appointment.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0466c8] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Save Money!</h3>
                    <p className="text-gray-600">
                      Present your coupon or code to the technician and enjoy your discount on quality service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Coupon Terms & Conditions</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>One coupon per service call unless otherwise specified</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Coupons cannot be combined with other offers or promotions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Must mention coupon when booking to receive discount</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Valid for residential and commercial services unless noted</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Some restrictions may apply. See individual coupon terms</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Coupons valid in our service area only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Tag className="h-16 w-16 text-[#0466c8] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Exclusive Coupons Delivered to Your Inbox
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sign up for our email list and receive exclusive coupons, seasonal promotions, and
              plumbing maintenance tips.
            </p>
            <div className="max-w-md mx-auto">
              {emailSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-900 mb-1">You're on the list!</p>
                  <p className="text-gray-600">
                    Watch your inbox for exclusive coupons and seasonal promotions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSignup}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      aria-label="Email address for coupons"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-[#0466c8] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors whitespace-nowrap"
                    >
                      Sign Up
                    </button>
                  </div>
                  {emailError && (
                    <p className="text-sm text-red-600 mt-3">{emailError}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-4">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Save on Quality Plumbing Service?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your coupon and schedule service today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
            <a
              href="tel:5557658237"
              className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors inline-block"
            >
              Call (555) 765-8237
            </a>
          </div>
        </div>
      </section>

      {/* Coupon Detail Modal */}
      {activeCoupon && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCoupon(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0466c8] to-[#0353a4] p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-1">{activeCoupon.title}</h3>
                  <p className="text-lg text-blue-100">{activeCoupon.subtitle}</p>
                </div>
                <button
                  onClick={() => setActiveCoupon(null)}
                  aria-label="Close coupon"
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{activeCoupon.description}</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
                <p className="text-xs text-gray-600 mb-1">Coupon Code:</p>
                <p className="text-2xl font-bold text-[#0466c8] font-mono">{activeCoupon.code}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Valid until: {activeCoupon.validUntil}</span>
              </div>
              <p className="text-xs text-gray-500 italic mb-6">{activeCoupon.terms}</p>
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => handlePrint(activeCoupon)}
                  className="flex-1 bg-[#0466c8] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#0353a4] transition-colors flex items-center justify-center space-x-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => handleDownload(activeCoupon)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setActiveCoupon(null);
                  onNavigate('contact');
                }}
                className="w-full bg-[#023e7d] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
              >
                Schedule Service with This Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;
