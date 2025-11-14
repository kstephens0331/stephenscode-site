import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function ContactPage({ onNavigate, accentColor = '#c9a227' }: ContactPageProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    practiceArea: '',
    message: '',
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Ready to discuss your legal matter? Schedule a free consultation with one of our
            experienced attorneys. We're available 24/7 for urgent matters.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: accentColor }}
              >
                <Phone className="w-8 h-8" style={{ color: '#16213e' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                Call Us
              </h3>
              <p className="text-gray-600 text-sm mb-3">24/7 Available</p>
              <a
                href="tel:5551234567"
                className="font-bold text-lg hover:underline"
                style={{ color: accentColor }}
              >
                (555) 123-4567
              </a>
            </div>

            <div className="text-center p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: accentColor }}
              >
                <Mail className="w-8 h-8" style={{ color: '#16213e' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                Email Us
              </h3>
              <p className="text-gray-600 text-sm mb-3">Response within 24 hours</p>
              <a
                href="mailto:info@justiceassociates.com"
                className="font-bold text-sm hover:underline"
                style={{ color: accentColor }}
              >
                info@justiceassociates.com
              </a>
            </div>

            <div className="text-center p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: accentColor }}
              >
                <MapPin className="w-8 h-8" style={{ color: '#16213e' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                Visit Us
              </h3>
              <p className="text-gray-600 text-sm mb-3">Main Office</p>
              <p className="text-sm" style={{ color: '#1a1a2e' }}>
                123 Justice Plaza, Suite 500<br />
                New York, NY 10001
              </p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: accentColor }}
              >
                <Clock className="w-8 h-8" style={{ color: '#16213e' }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                Office Hours
              </h3>
              <p className="text-gray-600 text-sm mb-3">Walk-ins Welcome</p>
              <p className="text-sm" style={{ color: '#1a1a2e' }}>
                Mon-Fri: 8:00 AM - 6:00 PM<br />
                Sat: 9:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>
                  Request Free Consultation
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Fill out the form below and one of our attorneys will contact you within 24 hours.
                All information is confidential.
              </p>

              {submitted ? (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: accentColor }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a2e' }}>
                    Thank You!
                  </h3>
                  <p className="text-gray-700">
                    We've received your message and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#1a1a2e' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-70"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1a1a2e' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-70"
                        style={{ borderColor: '#e5e7eb' }}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#1a1a2e' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-70"
                        style={{ borderColor: '#e5e7eb' }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#1a1a2e' }}>
                      Practice Area *
                    </label>
                    <select
                      name="practiceArea"
                      value={formData.practiceArea}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-70"
                      style={{ borderColor: '#e5e7eb' }}
                    >
                      <option value="">Select a practice area</option>
                      <option value="Personal Injury">Personal Injury</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Estate Planning">Estate Planning</option>
                      <option value="Business Law">Business Law</option>
                      <option value="Real Estate Law">Real Estate Law</option>
                      <option value="Immigration">Immigration</option>
                      <option value="Employment Law">Employment Law</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#1a1a2e' }}>
                      Brief Description of Your Legal Matter *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-70 resize-none"
                      style={{ borderColor: '#e5e7eb' }}
                      placeholder="Please provide details about your situation..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all hover:opacity-90"
                    style={{ backgroundColor: accentColor, color: '#16213e' }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Request</span>
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy. All communications
                    are confidential and protected by attorney-client privilege.
                  </p>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                  Why Contact Us?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Free Consultations',
                      description: 'No cost to discuss your case and explore your options',
                    },
                    {
                      title: 'Fast Response',
                      description: 'We respond to all inquiries within 24 hours',
                    },
                    {
                      title: 'Confidential',
                      description: 'All communications are protected and confidential',
                    },
                    {
                      title: 'No Obligation',
                      description: 'Consultation doesn\'t obligate you to hire us',
                    },
                    {
                      title: '24/7 Emergency',
                      description: 'Available around the clock for urgent matters',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                      <div>
                        <h4 className="font-bold" style={{ color: '#1a1a2e' }}>{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                  Office Locations
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: accentColor }}>
                      Main Office - Manhattan
                    </h4>
                    <p className="text-sm text-gray-700">
                      123 Justice Plaza, Suite 500<br />
                      New York, NY 10001<br />
                      Phone: (555) 123-4567
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: accentColor }}>
                      Brooklyn Office
                    </h4>
                    <p className="text-sm text-gray-700">
                      456 Court Street, 3rd Floor<br />
                      Brooklyn, NY 11231<br />
                      Phone: (555) 123-4568
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: accentColor }}>
                      Queens Office
                    </h4>
                    <p className="text-sm text-gray-700">
                      789 Queens Boulevard<br />
                      Queens, NY 11374<br />
                      Phone: (555) 123-4569
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternative Contact Methods */}
              <div
                className="rounded-lg p-8 text-white"
                style={{ background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)' }}
              >
                <h3 className="text-2xl font-bold mb-4">Prefer to Talk?</h3>
                <p className="mb-6 text-gray-300">
                  Sometimes it's easier to explain your situation over the phone. Call us anytime
                  for immediate assistance.
                </p>
                <a
                  href="tel:5551234567"
                  className="block text-center py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  <Phone className="inline w-5 h-5 mr-2" />
                  Call Now: (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Find Us
            </h2>
            <p className="text-xl text-gray-600">
              Conveniently located in the heart of Manhattan with easy access via public transportation
            </p>
          </div>
          <div
            className="w-full h-96 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: '#16213e' }}
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: accentColor }} />
              <p className="text-xl">Interactive Map</p>
              <p className="text-sm text-gray-300 mt-2">123 Justice Plaza, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
