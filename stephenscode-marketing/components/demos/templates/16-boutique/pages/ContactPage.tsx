'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, X, CheckCircle } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'

const BOOKING_TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM']

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', time: '' })
  const [bookingSubmitting, setBookingSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Bella Boutique Fashion',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'bella-boutique-fashion',
          clientName: `${formData.firstName} ${formData.lastName}`.trim(),
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.subject,
          preferredDate: '',
          preferredTime: '',
          notes: formData.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'contact_form',
          demo_slug: 'bella-boutique-fashion',
        })
        trackConversion('leadForm')
        setSubmitted(true)
      } else {
        setSubmitError('There was an issue sending your message. Please try again or email us at hello@bellaboutique.com.')
      }
    } catch {
      setSubmitError('There was an issue sending your message. Please try again or email us at hello@bellaboutique.com.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingData.date || !bookingData.time) {
      setBookingError('Please choose a date and a time slot for your consultation.')
      return
    }
    setBookingSubmitting(true)
    setBookingError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Bella Boutique Fashion',
          demoPackage: 'E-Commerce Website ($1,100)',
          demoSlug: 'bella-boutique-fashion',
          clientName: bookingData.name,
          clientPhone: bookingData.phone,
          clientEmail: bookingData.email,
          service: 'Personal Styling Consultation',
          preferredDate: bookingData.date,
          preferredTime: bookingData.time,
          notes: 'Complimentary styling consultation booked from the contact page.'
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'styling_booking',
          demo_slug: 'bella-boutique-fashion',
        })
        trackConversion('leadForm')
        setBookingConfirmed(true)
      } else {
        setBookingError('There was an issue booking your consultation. Please try again or call (555) BELLA-01.')
      }
    } catch {
      setBookingError('There was an issue booking your consultation. Please try again or call (555) BELLA-01.')
    } finally {
      setBookingSubmitting(false)
    }
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setBookingError('')
    if (bookingConfirmed) {
      setBookingData({ name: '', email: '', phone: '', date: '', time: '' })
      setBookingConfirmed(false)
    }
  }

  return (
    <div className="py-12">
      {/* Styling Consultation Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            aria-label="Close booking"
            onClick={closeBooking}
            className="absolute inset-0 bg-black/60 cursor-default"
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeBooking}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Consultation Booked!</h3>
                <p className="text-gray-600 mb-2">
                  You&apos;re all set for <span className="font-semibold text-gray-900">{bookingData.date}</span> at{' '}
                  <span className="font-semibold text-gray-900">{bookingData.time}</span>.
                </p>
                <p className="text-gray-600 mb-8">A stylist will reach out to confirm the details.</p>
                <button
                  onClick={closeBooking}
                  className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Book a Styling Consultation</h3>
                <p className="text-gray-600 mb-6">Complimentary 45-minute session with one of our expert stylists.</p>
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="boutique-booking-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      id="boutique-booking-name"
                      type="text"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      placeholder="Sarah Johnson"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="boutique-booking-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        id="boutique-booking-email"
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                        placeholder="sarah@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="boutique-booking-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        id="boutique-booking-phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="boutique-booking-date" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <input
                      id="boutique-booking-date"
                      type="date"
                      required
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <p className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</p>
                    <div className="grid grid-cols-3 gap-2">
                      {BOOKING_TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingData({ ...bookingData, time: slot })}
                          className={`px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${
                            bookingData.time === slot
                              ? 'border-[var(--color-primary)] bg-purple-50 text-[var(--color-primary)]'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  {bookingError && (
                    <p className="text-sm text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-lg">{bookingError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={bookingSubmitting}
                    className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-60"
                  >
                    {bookingSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

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
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600">
                  Thanks for reaching out. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="boutique-contact-first-name" className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      id="boutique-contact-first-name"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      placeholder="Sarah"
                    />
                  </div>
                  <div>
                    <label htmlFor="boutique-contact-last-name" className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      id="boutique-contact-last-name"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                      placeholder="Johnson"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="boutique-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="boutique-contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="sarah@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="boutique-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                  <input
                    id="boutique-contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="boutique-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    id="boutique-contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Order Status</option>
                    <option>Styling Consultation</option>
                    <option>Returns & Exchanges</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="boutique-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    id="boutique-contact-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 font-semibold bg-red-50 px-4 py-3 rounded-lg">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
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
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
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
