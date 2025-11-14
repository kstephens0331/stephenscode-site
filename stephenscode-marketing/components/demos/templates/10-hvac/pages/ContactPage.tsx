import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Calendar,
  User,
  Home,
  FileText,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you! We will contact you shortly.');
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
      content: '(555) 123-4567',
      subContent: 'Emergency: (555) COOL-NOW',
      action: 'tel:555-123-4567',
      color: 'from-[#003049] to-[#004d73]',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@coolbreezehvac.com',
      subContent: 'We respond within 24 hours',
      action: 'mailto:info@coolbreezehvac.com',
      color: 'from-[#f77f00] to-[#e07000]',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      content: 'Chat with us now',
      subContent: 'Available Mon-Fri 8AM-6PM',
      action: '#',
      color: 'from-[#d62828] to-[#b11f1f]',
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Emergency Service Only' },
    { day: 'Emergency Service', hours: '24/7/365' },
  ];

  const services = [
    'AC Repair',
    'AC Installation',
    'Heating Repair',
    'Heating Installation',
    'Maintenance Plan',
    'Emergency Service',
    'Indoor Air Quality',
    'Duct Cleaning',
    'Thermostat Installation',
    'Commercial HVAC',
    'Other',
  ];

  const reasons = [
    'Same-day service available',
    'Upfront, honest pricing',
    'Licensed & insured technicians',
    'No overtime charges',
    '100% satisfaction guarantee',
    'Flexible financing options',
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get in touch with Cool Breeze HVAC - We&apos;re here to help!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className={`bg-gradient-to-br ${method.color} rounded-2xl p-8 text-white text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <method.icon className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                <p className="text-xl mb-2">{method.content}</p>
                <p className="text-white/80 text-sm">{method.subContent}</p>
              </a>
            ))}
          </div>

          {/* Main Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-[#003049]">
                  Schedule a Service Call
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 1 hour during business hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Home className="inline w-4 h-4 mr-1" />
                      Service Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      placeholder="123 Main St, City, ST 12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="inline w-4 h-4 mr-1" />
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Preferred Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      >
                        <option value="">Select a time...</option>
                        <option value="morning">Morning (8AM-12PM)</option>
                        <option value="afternoon">Afternoon (12PM-4PM)</option>
                        <option value="evening">Evening (4PM-7PM)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1" />
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none resize-none"
                      placeholder="Please describe your HVAC issue or service needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300"
                  >
                    Request Service Call
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 text-white shadow-xl">
                <Clock className="w-12 h-12 text-[#f77f00] mb-4" />
                <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                <ul className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <li key={index} className="flex justify-between items-start border-b border-white/20 pb-3 last:border-0">
                      <span className="font-semibold">{schedule.day}</span>
                      <span className="text-white/80 text-sm text-right">{schedule.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <MapPin className="w-12 h-12 text-[#f77f00] mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-[#003049]">Our Location</h3>
                <p className="text-gray-700 mb-4">
                  123 HVAC Boulevard, Suite 100<br />
                  Comfort City, ST 12345
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003049] font-semibold hover:text-[#f77f00] transition"
                >
                  Get Directions →
                </a>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-[#003049]">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {reasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#f77f00] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              Stop by our showroom to see HVAC systems and meet our team
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-[#003049]/10 to-[#f77f00]/10 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="w-20 h-20 text-[#003049] mx-auto mb-4" />
                <p className="text-2xl font-bold text-[#003049] mb-2">Interactive Map</p>
                <p className="text-gray-600">Map integration would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-r from-[#d62828] to-[#b11f1f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="w-20 h-20 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">Have an HVAC Emergency?</h2>
          <p className="text-2xl text-white/90 mb-8">
            Don&apos;t wait - call our 24/7 emergency hotline now!
          </p>
          <a
            href="tel:555-COOL-NOW"
            className="inline-block bg-white text-[#d62828] px-12 py-6 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl"
          >
            CALL (555) COOL-NOW
          </a>
          <p className="text-white/80 mt-6">
            Available 24 hours a day, 7 days a week, 365 days a year
          </p>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Quick Questions?</h2>
            <p className="text-xl text-gray-600">
              Visit our resources page for answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Service Areas', page: 'service-areas' },
              { label: 'Financing Options', page: 'financing' },
              { label: 'Our Services', page: 'services' },
              { label: 'Blog & Resources', page: 'blog' },
            ].map((link, index) => (
              <button
                key={index}
                onClick={() => onNavigate(link.page)}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#f77f00] text-[#003049] font-semibold text-lg"
              >
                {link.label} →
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
