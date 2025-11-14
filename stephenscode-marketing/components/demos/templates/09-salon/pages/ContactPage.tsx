import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageSquare, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will respond within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We&apos;re here to help. Reach out and let&apos;s make you beautiful!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Mon-Sat: 9am - 8pm</p>
              <a href="tel:5554567890" className="text-[#d00000] font-semibold hover:underline">
                (555) 456-7890
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">Response within 24hrs</p>
              <a href="mailto:hello@glamourstudio.com" className="text-[#d00000] font-semibold hover:underline">
                hello@glamourstudio.com
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-2">123 Fashion Avenue</p>
              <p className="text-[#d00000] font-semibold">Style City, SC 12345</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Follow Us</h3>
              <p className="text-gray-600 text-sm mb-2">50K+ Followers</p>
              <a href="#" className="text-[#d00000] font-semibold hover:underline">
                @glamourstudio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                    placeholder="Jane Smith"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="services">Services Question</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="bridal">Bridal Packages</option>
                    <option value="membership">VIP Membership</option>
                    <option value="products">Product Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Hours */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Visit Our Salon</h2>
              <p className="text-gray-600 mb-8">
                Come experience luxury beauty in our modern, comfortable salon
              </p>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 flex items-center justify-center mb-8 relative overflow-hidden">
                <MapPin className="w-24 h-24 text-[#d00000]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-[#d00000] mr-3" />
                  <h3 className="text-2xl font-bold">Opening Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Monday</span>
                    <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Tuesday</span>
                    <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Wednesday</span>
                    <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Thursday</span>
                    <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Friday</span>
                    <span className="text-gray-600">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-semibold">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold">Sunday</span>
                    <span className="text-gray-600">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">What is your cancellation policy?</h3>
              <p className="text-gray-600">
                We require 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a 50% service fee.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">Do you accept walk-ins?</h3>
              <p className="text-gray-600">
                While we love walk-ins, we recommend booking an appointment to ensure your preferred stylist and time are available. Walk-ins are accommodated based on availability.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, cash, and digital payments including Apple Pay and Google Pay.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">Do you offer bridal trials?</h3>
              <p className="text-gray-600">
                Yes! We highly recommend booking a bridal trial 2-3 months before your wedding. This ensures we perfect your look and you feel confident on your special day.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">What products do you use?</h3>
              <p className="text-gray-600">
                We exclusively use professional-grade products from top brands including Redken, Olaplex, OPI, and MAC. All products are also available for retail purchase with VIP discounts.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-2">Is parking available?</h3>
              <p className="text-gray-600">
                Yes, we offer complimentary parking for all clients in our private lot behind the salon. Street parking is also available on Fashion Avenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Connect With Us</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Follow us on social media for daily inspiration, special offers, and beauty tips
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-all duration-300 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-all duration-300 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <Facebook className="w-8 h-8" />
            </a>
          </div>
          <div className="mt-8">
            <p className="text-lg mb-2">Instagram: @glamourstudio</p>
            <p className="text-white/80">Tag us in your posts for a chance to be featured!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointment today and experience the Glamour Studio difference
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Book Your Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
}
