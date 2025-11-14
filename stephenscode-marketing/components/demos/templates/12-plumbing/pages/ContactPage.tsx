import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      primary: '(555) 765-8237',
      secondary: '24/7 Emergency Line',
      description: 'Speak directly with our team - no automated systems'
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@premierplumbing.com',
      secondary: 'Response within 24 hours',
      description: 'Send us a message and we\'ll get back to you promptly'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      primary: '123 Main Street',
      secondary: 'Anytown, ST 12345',
      description: 'Stop by during business hours - appointments welcome'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      primary: 'Mon-Fri: 7 AM - 6 PM',
      secondary: 'Sat: 8 AM - 4 PM',
      description: 'Emergency service available 24/7/365'
    }
  ];

  const faqs = [
    {
      question: 'Do you offer emergency service?',
      answer: 'Yes! We provide 24/7 emergency plumbing service with no overtime charges. Call (555) 765-8237 anytime.'
    },
    {
      question: 'How quickly can you respond?',
      answer: 'Our average response time is under 60 minutes for emergencies. Regular appointments can often be scheduled same-day.'
    },
    {
      question: 'Do you provide upfront pricing?',
      answer: 'Absolutely. We provide clear, upfront pricing before starting any work. No hidden fees or surprise charges.'
    },
    {
      question: 'Are you licensed and insured?',
      answer: 'Yes, we are fully licensed, bonded, and insured. All our technicians are background-checked and professionally trained.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, all major credit cards, checks, and offer financing options for larger projects.'
    },
    {
      question: 'Do you offer warranties on your work?',
      answer: 'Yes, we provide comprehensive warranties on both parts and labor. Specific warranty terms vary by service type.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 mb-8">
              Need plumbing service? We're here to help! Contact us anytime - we're available 24/7
              for emergencies and happy to answer your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5557658237"
                className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>(555) 765-8237</span>
              </a>
              <button
                onClick={() => onNavigate('emergency')}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Emergency Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-[#0466c8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-lg font-semibold text-[#0466c8] mb-1">{method.primary}</p>
                  <p className="text-sm text-gray-600 mb-3">{method.secondary}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. For emergencies,
                please call us directly at (555) 765-8237.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent">
                    <option>Select a service</option>
                    <option>Drain Cleaning</option>
                    <option>Leak Repair</option>
                    <option>Water Heater</option>
                    <option>Pipe Repair</option>
                    <option>Fixture Installation</option>
                    <option>Sewer Line</option>
                    <option>Emergency Service</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Time
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent">
                    <option>Any time</option>
                    <option>Morning (8 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 5 PM)</option>
                    <option>Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                    placeholder="Please describe your plumbing issue or service needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0466c8] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0353a4] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours during business days
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div>
              <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white mb-8">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>24/7 emergency service with rapid response</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>Upfront pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>Licensed, bonded, and insured technicians</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>100% satisfaction guarantee on all work</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>Same-day service available</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span>Financing options available</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="h-8 w-8 text-[#0466c8]" />
                  <h3 className="text-2xl font-bold text-gray-900">Emergency?</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  If you have a plumbing emergency, don't wait for a callback. Call us now for
                  immediate assistance!
                </p>
                <a
                  href="tel:5557658237"
                  className="block w-full bg-red-600 text-white px-6 py-4 rounded-lg font-bold text-center hover:bg-red-700 transition-colors"
                >
                  Call Emergency Line: (555) 765-8237
                </a>
              </div>

              <div className="bg-gray-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold text-gray-900">Monday - Friday</span>
                    <span className="text-gray-600">7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold text-gray-900">Saturday</span>
                    <span className="text-gray-600">8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="font-semibold text-gray-900">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-semibold text-[#0466c8]">Emergency Service</span>
                    <span className="font-semibold text-[#0466c8]">24/7/365</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Have more questions?{' '}
              <a href="tel:5557658237" className="text-[#0466c8] font-semibold hover:text-[#0353a4]">
                Give us a call
              </a>
              {' '}and we'll be happy to help!
            </p>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Visit our office or give us a call</p>
          </div>
          <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl h-96 flex items-center justify-center text-white">
            <div className="text-center">
              <MapPin className="h-24 w-24 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">Premier Plumbing Pros</h3>
              <p className="text-xl mb-1">123 Main Street</p>
              <p className="text-xl mb-6">Anytown, ST 12345</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for fast, reliable plumbing service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5557658237"
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call (555) 765-8237
            </a>
            <button
              onClick={() => onNavigate('coupons')}
              className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
            >
              View Current Specials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
