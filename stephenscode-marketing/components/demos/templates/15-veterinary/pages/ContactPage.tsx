import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Calendar, MessageSquare, Navigation, CheckCircle, Plus, Minus } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ContactPage({ onNavigate, colors }: ContactPageProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: 'dog',
    reason: 'wellness',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [mapZoom, setMapZoom] = React.useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const notesParts = [
        formData.petName ? `Pet: ${formData.petName} (${formData.petType})` : `Pet type: ${formData.petType}`,
        formData.message,
      ].filter(Boolean);

      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Paws & Care Animal Hospital',
          demoPackage: 'Standard Website ($950)',
          demoSlug: 'paws-care-animal-hospital',
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.reason,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: notesParts.join(' -- '),
        }),
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'appointment_request_form', demo_slug: 'paws-care-animal-hospital' });
        trackConversion('leadForm');
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          petName: '',
          petType: 'dog',
          reason: 'wellness',
          preferredDate: '',
          preferredTime: '',
          message: '',
        });
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
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
      details: '(555) 123-4567',
      description: 'Mon-Fri: 8am-7pm, Sat: 9am-5pm, Sun: 10am-4pm',
      link: 'tel:555-123-4567',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@pawsandcare.com',
      description: 'We respond within 24 hours',
      link: 'mailto:info@pawsandcare.com',
      action: 'Send Email'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Veterinary Lane, Anytown, ST 12345',
      description: 'See map and directions below',
      link: '#map',
      action: 'Get Directions'
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Emergency Services', hours: '24/7, Always Available' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section style={{ backgroundColor: colors.primary }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            We're here to answer your questions and schedule your pet's appointment
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.secondary }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                    {method.title}
                  </h3>
                  <p className="text-lg font-semibold mb-2 text-gray-800">
                    {method.details}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <a
                    href={method.link}
                    className="inline-block px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {method.action}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-600 text-white rounded-2xl p-8 text-center shadow-xl">
            <Phone className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">
              Pet Emergency? Call Immediately!
            </h3>
            <p className="text-red-100 mb-4">
              For urgent or emergency situations, call us right away at
            </p>
            <a
              href="tel:555-123-4567"
              className="text-4xl font-bold hover:underline block mb-2"
            >
              (555) 123-4567
            </a>
            <p className="text-red-100">
              Available 24/7. We're always here when you need us
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Request Form */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                Request an Appointment
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll contact you to confirm your appointment
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
                  Appointment Request Received!
                </h3>
                <p className="text-gray-600 mb-2 leading-relaxed max-w-md mx-auto">
                  Thank you for your appointment request. Our team will contact you within 24 hours to confirm your booking.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Need us sooner? Call (555) 123-4567 anytime.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Request Another Appointment
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vet-contact-name" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Your Name *
                  </label>
                  <input
                    id="vet-contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="vet-contact-email" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Email Address *
                  </label>
                  <input
                    id="vet-contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vet-contact-phone" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Phone Number *
                  </label>
                  <input
                    id="vet-contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="vet-contact-pet-name" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Pet's Name *
                  </label>
                  <input
                    id="vet-contact-pet-name"
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Pet Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vet-contact-pet-type" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Pet Type *
                  </label>
                  <select
                    id="vet-contact-pet-type"
                    name="petType"
                    value={formData.petType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vet-contact-reason" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Reason for Visit *
                  </label>
                  <select
                    id="vet-contact-reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="wellness">Wellness Exam</option>
                    <option value="sick">Sick Visit</option>
                    <option value="vaccination">Vaccinations</option>
                    <option value="dental">Dental Care</option>
                    <option value="surgery">Surgery Consultation</option>
                    <option value="grooming">Grooming</option>
                    <option value="boarding">Boarding Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Appointment Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vet-contact-preferred-date" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Preferred Date
                  </label>
                  <input
                    id="vet-contact-preferred-date"
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="vet-contact-preferred-time" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Preferred Time
                  </label>
                  <select
                    id="vet-contact-preferred-time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-4pm)</option>
                    <option value="evening">Evening (4pm-7pm)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="vet-contact-message" className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                  Additional Information
                </label>
                <textarea
                  id="vet-contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Please share any concerns, questions, or special requirements for your pet..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-10 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 text-lg"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Send className="w-6 h-6" />
                  Request Appointment
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  * We'll contact you within 24 hours to confirm your appointment
                </p>
              </div>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hours */}
            <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-lg p-8">
              <Clock className="w-12 h-12 mb-6" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
                Office Hours
              </h2>
              <div className="space-y-4">
                {officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 rounded-xl ${
                      schedule.day === 'Emergency Services'
                        ? 'bg-red-100 border-l-4 border-red-600'
                        : 'bg-white'
                    }`}
                  >
                    <span className="font-semibold text-gray-800">{schedule.day}</span>
                    <span className={schedule.day === 'Emergency Services' ? 'font-bold text-red-600' : 'text-gray-700'}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-lg p-8">
              <MapPin className="w-12 h-12 mb-6" style={{ color: colors.primary }} />
              <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
                Our Location
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: colors.secondary }}>
                    Address
                  </h3>
                  <p className="text-gray-700">
                    Paws & Care Animal Hospital<br />
                    123 Veterinary Lane<br />
                    Anytown, ST 12345
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: colors.secondary }}>
                    Parking
                  </h3>
                  <p className="text-gray-700">
                    Free parking available in our front lot and additional parking in the rear. Handicap accessible.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: colors.secondary }}>
                    Public Transit
                  </h3>
                  <p className="text-gray-700">
                    Bus routes 15 and 42 stop one block away on Main Street.
                  </p>
                </div>

                <a
                  href="#map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              Find Us on the Map
            </h2>
            <p className="text-gray-600">
              We're conveniently located in the heart of Anytown
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video relative overflow-hidden bg-[#e8f0e3]">
              {/* Stylized neighborhood map */}
              <svg
                viewBox="0 0 800 450"
                className="absolute inset-0 w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
                role="img"
                aria-label="Map showing Paws & Care Animal Hospital at 123 Veterinary Lane"
              >
                {/* Base */}
                <rect width="800" height="450" fill="#e8f0e3" />
                {/* Park */}
                <rect x="530" y="60" width="200" height="130" rx="12" fill="#bfdcae" />
                <text x="630" y="130" textAnchor="middle" fill="#4a7040" fontSize="16" fontWeight="600">Anytown Park</text>
                {/* Water */}
                <path d="M0 380 Q 200 350 400 385 T 800 375 L 800 450 L 0 450 Z" fill="#b3d4e6" />
                <text x="120" y="425" fill="#4a7d99" fontSize="14" fontWeight="600">Willow Creek</text>
                {/* Roads */}
                <rect x="0" y="210" width="800" height="36" fill="#ffffff" stroke="#cfd8cf" />
                <line x1="0" y1="228" x2="800" y2="228" stroke="#f0c419" strokeWidth="3" strokeDasharray="24 16" />
                <text x="60" y="203" fill="#6b7280" fontSize="15" fontWeight="600">Main Street</text>
                <rect x="360" y="0" width="30" height="450" fill="#ffffff" stroke="#cfd8cf" />
                <text x="352" y="60" fill="#6b7280" fontSize="15" fontWeight="600" transform="rotate(-90 352 60)" textAnchor="end">Veterinary Lane</text>
                <rect x="120" y="0" width="24" height="210" fill="#ffffff" stroke="#cfd8cf" />
                <rect x="620" y="246" width="24" height="204" fill="#ffffff" stroke="#cfd8cf" />
                {/* Blocks */}
                <rect x="40" y="40" width="60" height="46" rx="6" fill="#d9e2d5" />
                <rect x="180" y="50" width="140" height="60" rx="6" fill="#d9e2d5" />
                <rect x="180" y="130" width="90" height="50" rx="6" fill="#d9e2d5" />
                <rect x="60" y="270" width="180" height="70" rx="6" fill="#d9e2d5" />
                <rect x="430" y="270" width="150" height="70" rx="6" fill="#d9e2d5" />
                <rect x="680" y="260" width="90" height="60" rx="6" fill="#d9e2d5" />
                {/* Clinic building */}
                <rect x="410" y="120" width="96" height="72" rx="8" fill="#0f766e" />
                <text x="458" y="152" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">Paws &amp; Care</text>
                <text x="458" y="170" textAnchor="middle" fill="#ccfbf1" fontSize="11">Animal Hospital</text>
                {/* Parking */}
                <rect x="516" y="132" width="52" height="48" rx="6" fill="#c9d2cc" />
                <text x="542" y="160" textAnchor="middle" fill="#5b6b60" fontSize="11" fontWeight="600">P</text>
                {/* Map pin */}
                <g transform="translate(458 108)">
                  <path d="M0 0 C -14 0 -22 -12 -22 -24 C -22 -38 -11 -47 0 -47 C 11 -47 22 -38 22 -24 C 22 -12 14 0 0 0 Z" fill="#dc2626" />
                  <circle cx="0" cy="-26" r="9" fill="#ffffff" />
                </g>
                <text x="458" y="220" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">123 Veterinary Lane</text>
              </svg>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                <button
                  onClick={() => setMapZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))}
                  aria-label="Zoom in"
                  className="p-2 hover:bg-gray-100 transition-colors border-b"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setMapZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                  aria-label="Zoom out"
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Address chip */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-gray-800">123 Veterinary Lane, Anytown, ST 12345</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
            Before You Visit
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions? Check out these helpful resources
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('new-patients')}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: colors.accent + '20' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
                New Patient Info
              </h3>
              <p className="text-sm text-gray-600">
                Forms, what to bring, and what to expect
              </p>
            </button>

            <button
              onClick={() => onNavigate('faq')}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: colors.accent + '20' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
                FAQs
              </h3>
              <p className="text-sm text-gray-600">
                Answers to commonly asked questions
              </p>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: colors.accent + '20' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
                Our Services
              </h3>
              <p className="text-sm text-gray-600">
                Complete list of veterinary services
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
