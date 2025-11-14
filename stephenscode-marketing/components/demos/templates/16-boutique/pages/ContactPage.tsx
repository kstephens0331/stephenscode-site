'use client'

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, need styling advice, or just want to chat about fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">
              123 Fashion Avenue<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">
              <a href="tel:555-BELLA-01" className="hover:text-[var(--color-primary)] transition-colors">
                (555) BELLA-01
              </a><br />
              <a href="tel:555-234-5678" className="hover:text-[var(--color-primary)] transition-colors">
                (555) 234-5678
              </a>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">
              <a href="mailto:hello@bellaboutique.com" className="hover:text-[var(--color-primary)] transition-colors">
                hello@bellaboutique.com
              </a><br />
              <a href="mailto:support@bellaboutique.com" className="hover:text-[var(--color-primary)] transition-colors">
                support@bellaboutique.com
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="Sarah"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="Johnson"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="sarah@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]">
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Order Status</option>
                  <option>Styling Consultation</option>
                  <option>Returns & Exchanges</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Store Hours & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-gray-900">Store Hours</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Monday - Friday</span>
                  <span className="text-gray-600">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Sunday</span>
                  <span className="text-gray-600">11:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-900">Holidays</span>
                  <span className="text-gray-600">Varies</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-semibold">Map View</p>
                  <p className="text-sm">123 Fashion Ave, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Styling Service</h3>
              <p className="text-gray-600 mb-4">
                Book a complimentary styling consultation with one of our expert stylists.
              </p>
              <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What is your return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for unworn items with original tags attached.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you offer gift cards?</h3>
              <p className="text-gray-600">Yes! Gift cards are available in denominations from $25 to $500.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I track my order?</h3>
              <p className="text-gray-600">Yes, you'll receive a tracking number via email once your order ships.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
