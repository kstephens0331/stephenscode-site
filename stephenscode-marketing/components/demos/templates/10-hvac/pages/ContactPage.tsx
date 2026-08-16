import React, { useEffect, useRef, useState } from 'react';
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
  Send,
  X,
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

interface ChatMessage {
  from: 'agent' | 'visitor';
  text: string;
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

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      from: 'agent',
      text: 'Hi! Thanks for reaching out to Cool Breeze HVAC. How can we help you today?',
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatOpen]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const chatReplyFor = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('emergency') || lower.includes('urgent')) {
      return 'For emergencies, please call our 24/7 hotline at (555) COOL-NOW right away. A technician can usually be at your door within the hour.';
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('estimate')) {
      return 'We offer free estimates with upfront pricing. Diagnostics start at $89 and we will always quote the full cost before any work begins. Want me to help you schedule a visit?';
    }
    if (lower.includes('schedule') || lower.includes('appointment') || lower.includes('book')) {
      return 'Great! The fastest way is the Schedule a Service Call form on this page. Fill it out and our dispatch team will confirm a time window within the hour during business hours.';
    }
    if (lower.includes('financ')) {
      return 'We offer 0% APR financing for 12 or 24 months on qualifying purchases, plus low monthly payment plans up to 60 months. Check the Financing page for the payment calculator.';
    }
    return 'Thanks for the details! A comfort specialist will follow up shortly. For the fastest response, submit the service request form on this page or call (555) 123-4567.';
  };

  const handleChatSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { from: 'visitor', text }]);
    setChatInput('');
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      setChatMessages((prev) => [...prev, { from: 'agent', text: chatReplyFor(text) }]);
    }, 900);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Cool Breeze HVAC',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'cool-breeze-hvac',
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.service,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: [
            formData.address ? `Service Address: ${formData.address}` : '',
            formData.message,
          ]
            .filter(Boolean)
            .join(' | '),
        }),
      });

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'contact_page_service_request_form',
          demo_slug: 'cool-breeze-hvac',
        });
        trackConversion('leadForm');
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
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
            Get in touch with Cool Breeze HVAC. We&apos;re here to help!
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
                className={`bg-gradient-to-br ${method.color} rounded-2xl p-8 text-white text-center  transition-all duration-300 transform `}
              >
                <method.icon className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                <p className="text-xl mb-2">{method.content}</p>
                <p className="text-white/80 text-sm">{method.subContent}</p>
              </a>
            ))}
            <button
              onClick={() => setChatOpen(true)}
              className="bg-gradient-to-br from-[#d62828] to-[#b11f1f] rounded-2xl p-8 text-white text-center transition-all duration-300 transform"
            >
              <MessageSquare className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Live Chat</h3>
              <p className="text-xl mb-2">Chat with us now</p>
              <p className="text-white/80 text-sm">Available Mon-Fri 8AM-6PM</p>
            </button>
          </div>

          {/* Main Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-[#003049]">Request Received!</h2>
                    <p className="text-gray-600 text-lg mb-2">
                      Thanks{formData.name ? `, ${formData.name}` : ''}! Your service request has been submitted.
                    </p>
                    <p className="text-gray-600 mb-8">
                      Our dispatch team will contact you within 1 hour during business hours to confirm your appointment window.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          address: '',
                          service: '',
                          preferredDate: '',
                          preferredTime: '',
                          message: '',
                        });
                      }}
                      className="bg-[#003049] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                <>
                <h2 className="text-3xl font-bold mb-6 text-[#003049]">
                  Schedule a Service Call
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 1 hour during business hours.
                </p>

                {submitError && (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-800 rounded-lg p-4 text-sm font-medium">
                    There was an issue submitting your request. Please try again, or call us at (555) 123-4567.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="hvac-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="hvac-contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="hvac-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="hvac-contact-phone"
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
                    <label htmlFor="hvac-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="hvac-contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="hvac-contact-address" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Home className="inline w-4 h-4 mr-1" />
                      Service Address *
                    </label>
                    <input
                      type="text"
                      id="hvac-contact-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      placeholder="123 Main St, City, ST 12345"
                    />
                  </div>

                  <div>
                    <label htmlFor="hvac-contact-service" className="block text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="inline w-4 h-4 mr-1" />
                      Service Needed *
                    </label>
                    <select
                      id="hvac-contact-service"
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
                      <label htmlFor="hvac-contact-preferred-date" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="hvac-contact-preferred-date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="hvac-contact-preferred-time" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Preferred Time
                      </label>
                      <select
                        id="hvac-contact-preferred-time"
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
                    <label htmlFor="hvac-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1" />
                      Additional Details
                    </label>
                    <textarea
                      id="hvac-contact-message"
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
                </>
                )}
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
            <div className="aspect-video relative">
              <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Street map showing the Cool Breeze HVAC office at 123 HVAC Boulevard">
                <rect width="800" height="450" fill="#eef3f6" />
                {/* Parks */}
                <rect x="40" y="40" width="150" height="110" rx="8" fill="#d3e8d3" />
                <rect x="600" y="300" width="160" height="110" rx="8" fill="#d3e8d3" />
                {/* River */}
                <path d="M 0 380 Q 200 340 400 390 T 800 360" stroke="#b8d8ea" strokeWidth="26" fill="none" />
                {/* Streets */}
                <line x1="0" y1="120" x2="800" y2="120" stroke="#ffffff" strokeWidth="14" />
                <line x1="0" y1="230" x2="800" y2="230" stroke="#ffffff" strokeWidth="20" />
                <line x1="0" y1="330" x2="800" y2="330" stroke="#ffffff" strokeWidth="12" />
                <line x1="150" y1="0" x2="150" y2="450" stroke="#ffffff" strokeWidth="12" />
                <line x1="330" y1="0" x2="330" y2="450" stroke="#ffffff" strokeWidth="18" />
                <line x1="520" y1="0" x2="520" y2="450" stroke="#ffffff" strokeWidth="12" />
                <line x1="670" y1="0" x2="670" y2="450" stroke="#ffffff" strokeWidth="10" />
                {/* Street labels */}
                <text x="400" y="222" textAnchor="middle" fill="#8aa0ad" fontSize="15" fontFamily="sans-serif" fontWeight="600">HVAC BOULEVARD</text>
                <text x="341" y="60" fill="#8aa0ad" fontSize="13" fontFamily="sans-serif" fontWeight="600" transform="rotate(90 341 60)">MAIN ST</text>
                <text x="0" y="112" fill="#8aa0ad" fontSize="12" fontFamily="sans-serif" fontWeight="600" dx="12">OAK AVE</text>
                <text x="0" y="322" fill="#8aa0ad" fontSize="12" fontFamily="sans-serif" fontWeight="600" dx="12">PINE RD</text>
                {/* Buildings */}
                <rect x="360" y="140" width="60" height="50" rx="4" fill="#c6d4dd" />
                <rect x="440" y="150" width="50" height="40" rx="4" fill="#c6d4dd" />
                <rect x="180" y="250" width="70" height="45" rx="4" fill="#c6d4dd" />
                <rect x="550" y="140" width="80" height="55" rx="4" fill="#c6d4dd" />
                {/* Office building highlight */}
                <rect x="365" y="250" width="90" height="60" rx="6" fill="#f77f00" opacity="0.9" />
                {/* Pin */}
                <g transform="translate(410 240)">
                  <path d="M 0 0 C -22 -30 -22 -58 0 -58 C 22 -58 22 -30 0 0 Z" fill="#d62828" />
                  <circle cx="0" cy="-40" r="10" fill="#ffffff" />
                </g>
                {/* Pin label */}
                <rect x="300" y="164" width="220" height="34" rx="17" fill="#003049" />
                <text x="410" y="186" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="700">Cool Breeze HVAC</text>
              </svg>
              <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg shadow-lg px-4 py-3">
                <p className="font-bold text-[#003049] text-sm">123 HVAC Boulevard, Suite 100</p>
                <p className="text-gray-600 text-xs">Comfort City, ST 12345</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-[#003049] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004d73] transition shadow-lg"
              >
                Get Directions →
              </a>
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
            Don&apos;t wait. Call our 24/7 emergency hotline now!
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

      {/* Live Chat Panel */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden max-h-[80vh]">
            <div className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#f77f00] rounded-full flex items-center justify-center font-bold mr-3">
                  CB
                </div>
                <div>
                  <p className="font-bold">Cool Breeze Support</p>
                  <p className="text-xs text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 inline-block" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[260px]">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === 'visitor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                      msg.from === 'visitor'
                        ? 'bg-[#003049] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  aria-label="Chat message"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleChatSend();
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none text-sm"
                />
                <button
                  onClick={handleChatSend}
                  aria-label="Send message"
                  className="bg-[#f77f00] text-white px-4 py-3 rounded-lg hover:bg-[#e07000] transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Demo chat -- responses are simulated for this preview
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
