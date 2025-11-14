import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#0077b6]" />,
      title: 'Phone',
      details: ['Main: (555) 123-4567', 'Emergency: (555) 911-CARE'],
      action: { label: 'Call Now', href: 'tel:555-123-4567' }
    },
    {
      icon: <Mail className="w-6 h-6 text-[#0077b6]" />,
      title: 'Email',
      details: ['smile@brightsmile.com', 'appointments@brightsmile.com'],
      action: { label: 'Send Email', href: 'mailto:smile@brightsmile.com' }
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#0077b6]" />,
      title: 'Address',
      details: ['123 Dental Way', 'Smile City, SC 12345'],
      action: { label: 'Get Directions', href: '#' }
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0077b6]" />,
      title: 'Office Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 3:00 PM', 'Sun: Closed'],
      action: null
    }
  ];

  const subjects = [
    'General Inquiry',
    'Schedule Appointment',
    'Insurance Question',
    'Billing Question',
    'New Patient Information',
    'Emergency Care',
    'Treatment Question',
    'Other'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            We're here to answer your questions and help you schedule your appointment
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#023e8a] mb-3">{item.title}</h3>
                <div className="space-y-1 mb-4">
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">{detail}</p>
                  ))}
                </div>
                {item.action && (
                  <a
                    href={item.action.href}
                    className="inline-block text-[#0077b6] font-semibold hover:text-[#023e8a] transition-colors"
                  >
                    {item.action.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Send Us a Message
                  </h2>
                  <p>We'll respond within 24 hours</p>
                </div>

                {submitted ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#023e8a] mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#0077b6] font-semibold hover:text-[#023e8a] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                          placeholder="john.smith@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                        >
                          <option value="">Select a subject...</option>
                          {subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#0077b6] to-[#48cae4] text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-[#023e8a] hover:to-[#0077b6] transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="aspect-video bg-gradient-to-br from-[#023e8a] to-[#0077b6] flex items-center justify-center text-white">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p className="text-sm text-gray-200">123 Dental Way, Smile City, SC 12345</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#023e8a] mb-4">Location & Parking</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" />
                      <span>Conveniently located in downtown Smile City</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" />
                      <span>Free parking available in our lot</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" />
                      <span>Wheelchair accessible entrance and facilities</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0077b6] flex-shrink-0 mt-0.5" />
                      <span>Near public transportation routes</span>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#023e8a] transition-all">
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-[#023e8a] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('booking')}
                    className="w-full bg-[#48cae4] text-[#023e8a] px-6 py-3 rounded-lg font-semibold hover:bg-[#0077b6] hover:text-white transition-all text-left flex items-center justify-between"
                  >
                    <span>Book an Appointment</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => onNavigate('patient-info')}
                    className="w-full bg-gray-100 text-[#023e8a] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all text-left flex items-center justify-between"
                  >
                    <span>New Patient Forms</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => onNavigate('services')}
                    className="w-full bg-gray-100 text-[#023e8a] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all text-left flex items-center justify-between"
                  >
                    <span>View Our Services</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-6">
            <Phone className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Having a Dental Emergency?</h2>
          <p className="text-xl mb-8 text-red-100">
            Don't wait - our emergency hotline is available 24 hours a day, 7 days a week.
            We provide same-day emergency appointments for urgent dental issues.
          </p>
          <a
            href="tel:555-911-CARE"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Call Emergency Line: (555) 911-CARE
          </a>
          <div className="mt-8 text-sm text-red-100">
            <p>Common emergencies: Severe toothache • Knocked-out tooth • Broken tooth • Lost filling/crown</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#023e8a] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#023e8a] mb-2">What are your office hours?</h3>
              <p className="text-gray-700">
                We're open Monday-Friday 8:00 AM - 6:00 PM and Saturday 9:00 AM - 3:00 PM.
                We're closed on Sundays, but emergency care is available 24/7.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#023e8a] mb-2">How quickly do you respond to messages?</h3>
              <p className="text-gray-700">
                We respond to all messages within 24 hours during business days. For urgent matters,
                please call us directly at (555) 123-4567.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#023e8a] mb-2">Do you accept walk-ins?</h3>
              <p className="text-gray-700">
                While we prefer scheduled appointments to minimize wait times, we do our best to accommodate
                walk-ins and same-day appointments when possible. Please call ahead to check availability.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#023e8a] mb-2">Is your office wheelchair accessible?</h3>
              <p className="text-gray-700">
                Yes, our office is fully wheelchair accessible with an accessible entrance, parking, and restrooms.
                Please let us know if you need any special accommodations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="text-6xl mb-4">⭐⭐⭐⭐⭐</div>
            <h2 className="text-3xl font-bold text-[#023e8a] mb-4">Rated 4.9/5 by Our Patients</h2>
            <p className="text-xl text-gray-600 mb-6">
              Join over 5,000 happy patients who trust us with their dental care
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#023e8a]/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-[#0077b6] mb-1">5,000+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="bg-[#023e8a]/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-[#0077b6] mb-1">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="bg-[#023e8a]/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-[#0077b6] mb-1">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
