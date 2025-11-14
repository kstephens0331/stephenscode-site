import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ContactPage({ onNavigate, colors }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    urgency: 'standard',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'General Repairs',
    'Electrical Work',
    'Plumbing Fixes',
    'Carpentry',
    'Painting & Drywall',
    'Door & Window Repair',
    'TV Mounting & Assembly',
    'Deck & Fence Repair',
    'Kitchen & Bath Updates',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          demo_slug: 'fixit-fast-handyman',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Service: ${formData.service}\nUrgency: ${formData.urgency}\n\n${formData.message}`,
          metadata: {
            service: formData.service,
            urgency: formData.urgency,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        urgency: 'standard',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit your request. Please call us directly at (555) 123-4567.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      primary: '(555) 123-4567',
      secondary: 'Mon-Sat: 7AM-8PM | Emergency: 24/7',
      action: 'tel:5551234567',
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@fixitfast.com',
      secondary: 'Response within 2 hours',
      action: 'mailto:info@fixitfast.com',
    },
    {
      icon: MapPin,
      title: 'Service Area',
      primary: 'Greater Metro Area',
      secondary: '20-mile radius coverage',
      action: null,
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="text-white py-16" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Ready to fix your home's issues? Get in touch for a free quote or same-day service
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 text-white" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg">
            🚨 EMERGENCY? Call Now: (555) 123-4567 - Available 24/7
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: colors.secondary + '30' }}
                >
                  <method.icon className="h-8 w-8" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                  {method.title}
                </h3>
                {method.action ? (
                  <a
                    href={method.action}
                    className="text-xl font-semibold block mb-1 hover:opacity-70 transition-opacity"
                    style={{ color: colors.accent }}
                  >
                    {method.primary}
                  </a>
                ) : (
                  <p className="text-xl font-semibold mb-1" style={{ color: colors.accent }}>
                    {method.primary}
                  </p>
                )}
                <p className="text-gray-600">{method.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                  Request a Free Quote
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 2 hours during business hours.
                </p>

                {submitStatus === 'success' ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold text-green-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-green-800 mb-4">
                      We've received your request and will contact you shortly to discuss your project and provide a free quote.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-green-700 font-semibold hover:text-green-900"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-current focus:outline-none transition-colors"
                        style={{ '--focus-color': colors.primary } as React.CSSProperties}
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-current focus:outline-none transition-colors"
                          style={{ '--focus-color': colors.primary } as React.CSSProperties}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-current focus:outline-none transition-colors"
                          style={{ '--focus-color': colors.primary } as React.CSSProperties}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-current focus:outline-none transition-colors"
                        style={{ '--focus-color': colors.primary } as React.CSSProperties}
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Urgency *
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'emergency', label: 'Emergency', desc: 'ASAP' },
                          { value: 'urgent', label: 'Urgent', desc: '1-2 days' },
                          { value: 'standard', label: 'Standard', desc: 'This week' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all ${
                              formData.urgency === option.value
                                ? 'border-current shadow-md'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={
                              formData.urgency === option.value
                                ? { borderColor: colors.primary, backgroundColor: colors.secondary + '10' }
                                : {}
                            }
                          >
                            <input
                              type="radio"
                              name="urgency"
                              value={option.value}
                              checked={formData.urgency === option.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className="font-semibold" style={{ color: colors.primary }}>
                              {option.label}
                            </div>
                            <div className="text-sm text-gray-600">{option.desc}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-current focus:outline-none transition-colors resize-none"
                        style={{ '--focus-color': colors.primary } as React.CSSProperties}
                        placeholder="Please describe what needs to be fixed or installed..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="w-full px-6 py-4 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {submitStatus === 'submitting' ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Get Your Free Quote
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to be contacted by Fix-It Fast regarding your project.
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
              </div>

              {/* Info Sidebar */}
              <div className="p-8 lg:p-12 text-white" style={{ backgroundColor: colors.primary }}>
                <h3 className="text-2xl font-bold mb-6">What Happens Next?</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: colors.accent }}>
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">We Review Your Request</h4>
                      <p className="text-sm opacity-90">
                        Our team reviews your project details to understand your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: colors.accent }}>
                      2
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">We Contact You</h4>
                      <p className="text-sm opacity-90">
                        We'll call or email within 2 hours to discuss your project and schedule.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: colors.accent }}>
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Free On-Site Estimate</h4>
                      <p className="text-sm opacity-90">
                        We visit your home to assess the work and provide a detailed quote.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: colors.accent }}>
                      4
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">We Get to Work</h4>
                      <p className="text-sm opacity-90">
                        Once approved, we schedule your service and complete the job right.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white border-opacity-20">
                  <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {[
                      'Licensed & Insured Professionals',
                      'Same-Day Service Available',
                      'Upfront Pricing - No Hidden Fees',
                      'Satisfaction Guaranteed',
                      '500+ Five-Star Reviews',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: colors.secondary }} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-white border-opacity-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <h3 className="font-bold">Business Hours</h3>
                  </div>
                  <div className="text-sm space-y-1 opacity-90">
                    <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                    <p>Sunday: Emergency Service Only</p>
                    <p className="font-bold mt-2" style={{ color: colors.accent }}>
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              We Service Your Area
            </h2>
            <p className="text-xl text-gray-600">
              Proudly serving homeowners throughout the greater metro area
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4" style={{ color: colors.primary }} />
                <p className="text-xl font-semibold" style={{ color: colors.primary }}>
                  20-Mile Service Radius
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                <strong>Service Areas Include:</strong>
              </p>
              <p className="text-gray-600">
                Downtown, Westside, Eastside, North Hills, South Valley, Suburban Areas, and surrounding communities
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Not sure if we service your location? Give us a call and we'll let you know!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
