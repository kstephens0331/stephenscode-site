import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Calendar, MessageSquare, Users } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredContact: 'email',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredContact: 'email',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const services = [
    'Tax Planning & Preparation',
    'Retirement Planning',
    'Investment Management',
    'Estate Planning',
    'Business Accounting',
    'Financial Planning',
    'Audit Support',
    'Payroll Services',
    'General Inquiry',
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: '(555) 123-4567',
      description: 'Mon-Fri: 8:00 AM - 6:00 PM',
      action: 'Call us',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@peakfinancial.com',
      description: 'We respond within 24 hours',
      action: 'Email us',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '450 Financial Plaza, Suite 2100',
      description: 'Chicago, IL 60606',
      action: 'Get directions',
    },
  ];

  const faqs = [
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes! We offer a complimentary 30-minute consultation to discuss your financial needs and how we can help.',
    },
    {
      question: 'What should I bring to my first meeting?',
      answer: 'Recent tax returns, investment statements, and any financial documents relevant to your needs. We\'ll provide a detailed checklist when you schedule.',
    },
    {
      question: 'How are your fees structured?',
      answer: 'Our fees vary by service. Tax preparation starts at $500, investment management is 1% of AUM annually, and financial planning packages start at $3,000. We provide transparent pricing upfront.',
    },
    {
      question: 'Do you work with clients remotely?',
      answer: 'Absolutely! We serve clients nationwide through secure video conferencing and our client portal. Local clients can choose in-person or virtual meetings.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to take control of your financial future? Schedule a free consultation with our expert advisors today.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#14213d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#fca311]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#14213d] mb-2">{method.title}</h3>
                  <p className="text-lg font-semibold text-gray-900 mb-1">{method.details}</p>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <button className="text-[#fca311] font-semibold hover:text-[#e59400]">{method.action} →</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-[#14213d] mb-6">Schedule Your Free Consultation</h2>

              {formSubmitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-white" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                  <p className="text-green-800">
                    We've received your request. Our team will contact you within 24 hours to schedule your consultation.
                  </p>
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors"
                      required
                    >
                      <option value="">Select a service...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#fca311] border-gray-300 focus:ring-[#fca311]"
                        />
                        <span className="text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#fca311] border-gray-300 focus:ring-[#fca311]"
                        />
                        <span className="text-gray-700">Phone</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311] transition-colors resize-none"
                      placeholder="Tell us about your financial goals or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#14213d] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1a2a4d] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Submit Request
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#14213d] rounded-lg flex items-center justify-center">
                    <Clock className="text-[#fca311]" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#14213d]">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Monday - Friday</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#fca311]/10 border border-[#fca311] rounded-lg">
                  <p className="text-sm text-[#14213d]">
                    <strong>Extended hours available during tax season</strong> (January - April)
                  </p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    { icon: Calendar, text: 'Quick response within 24 hours' },
                    { icon: Users, text: 'Meet with a certified professional' },
                    { icon: MessageSquare, text: '30-minute free consultation' },
                    { icon: CheckCircle, text: 'Personalized strategy discussion' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-[#14213d]" size={20} />
                        </div>
                        <p className="text-gray-200">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#14213d] mb-4">Our Location</h3>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-4">
                  <MapPin className="text-gray-400" size={48} />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-[#14213d]">Peak Financial Advisors</p>
                  <p className="text-gray-600">450 Financial Plaza, Suite 2100</p>
                  <p className="text-gray-600">Chicago, IL 60606</p>
                  <button className="text-[#fca311] font-semibold hover:text-[#e59400] mt-2">
                    Get Directions →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-[#e5e5e5]">
                <h3 className="text-xl font-bold text-[#14213d] mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button
              onClick={() => onNavigate('portal')}
              className="bg-[#fca311] text-[#14213d] px-8 py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors"
            >
              Visit Our Client Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
