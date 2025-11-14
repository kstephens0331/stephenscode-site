import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Calendar, User, Home } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry: 'general',
        message: '',
      });
    }, 3000);
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
      details: ['Main: (555) 123-4567', 'Toll Free: (800) 555-REAL'],
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@skylinerealty.com', 'support@skylinerealty.com'],
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Skyline Drive', 'Downtown District, NY 10001'],
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon-Fri: 8:00 AM - 7:00 PM', 'Sat-Sun: 9:00 AM - 5:00 PM'],
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  const offices = [
    {
      name: 'Downtown Headquarters',
      address: '123 Skyline Drive, Downtown District, NY 10001',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 8 AM - 7 PM, Sat-Sun: 9 AM - 5 PM',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    },
    {
      name: 'Coastal Heights Office',
      address: '456 Ocean View Blvd, Coastal Heights, NY 10002',
      phone: '(555) 123-4568',
      hours: 'Mon-Fri: 9 AM - 6 PM, Sat-Sun: 10 AM - 4 PM',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    },
    {
      name: 'Suburban Valley Office',
      address: '789 Valley Road, Suburban Valley, NY 10003',
      phone: '(555) 123-4569',
      hours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
    },
  ];

  const faqs = [
    {
      question: 'How do I schedule a property viewing?',
      answer: 'You can schedule viewings by calling us, emailing, or using our online booking system. We offer flexible scheduling including evenings and weekends.',
    },
    {
      question: 'What areas do you serve?',
      answer: 'We serve the entire metropolitan area including Downtown District, Coastal Heights, Suburban Valley, Heritage Hills, Mountain Ridge, and surrounding communities.',
    },
    {
      question: 'Do you work with first-time buyers?',
      answer: 'Absolutely! We specialize in helping first-time buyers navigate the home buying process. We offer comprehensive guidance and resources to make your experience smooth and successful.',
    },
    {
      question: 'How long does it take to sell a home?',
      answer: 'On average, our listings sell in 18 days. However, this can vary based on location, price, and market conditions. We provide a detailed timeline during your consultation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Have questions? We're here to help! Reach out to our team of real estate experts
            and let's discuss how we can help you achieve your property goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${method.color} rounded-full mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#000814] mb-3">{method.title}</h3>
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#000814] mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#000814] mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I'm Interested In *
                  </label>
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling a Home</option>
                    <option value="investment">Investment Property</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="valuation">Home Valuation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent resize-none"
                    placeholder="Tell us about your real estate needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#000814] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#000814] to-[#001d3d] rounded-xl shadow-lg p-8 text-white">
              <Calendar className="w-12 h-12 text-[#ffc300] mb-4" />
              <h3 className="text-2xl font-bold mb-3">Schedule a Consultation</h3>
              <p className="text-gray-300 mb-6">
                Book a free, no-obligation consultation with one of our expert agents.
              </p>
              <button className="w-full bg-[#ffc300] text-[#000814] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
                Book Appointment
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <Home className="w-12 h-12 text-[#000814] mb-4" />
              <h3 className="text-2xl font-bold text-[#000814] mb-3">Free Home Valuation</h3>
              <p className="text-gray-600 mb-6">
                Get an accurate estimate of your home's current market value.
              </p>
              <button className="w-full bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors">
                Get Valuation
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <MessageSquare className="w-12 h-12 text-[#000814] mb-4" />
              <h3 className="text-2xl font-bold text-[#000814] mb-3">Live Chat Support</h3>
              <p className="text-gray-600 mb-6">
                Chat with our team for immediate answers to your questions.
              </p>
              <button className="w-full bg-gray-100 text-[#000814] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-8 text-center">Our Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#000814] mb-4">{office.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-[#000814]">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 border-2 border-[#000814] text-[#000814] px-4 py-2 rounded-lg font-semibold hover:bg-[#000814] hover:text-white transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#000814] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                <h3 className="text-lg font-bold text-[#000814] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-200 h-96">
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold">Interactive Map Would Be Here</p>
            <p className="text-sm">Showing our office locations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
