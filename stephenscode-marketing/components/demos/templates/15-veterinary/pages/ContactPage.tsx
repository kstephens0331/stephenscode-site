import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Calendar, MessageSquare, Navigation } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your appointment request! We will contact you shortly to confirm your booking.');
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
    { day: 'Emergency Services', hours: '24/7 - Always Available' },
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
              Available 24/7 - We're always here when you need us
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Your Name *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Email Address *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Phone Number *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Pet's Name *
                  </label>
                  <input
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Pet Type *
                  </label>
                  <select
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Reason for Visit *
                  </label>
                  <select
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
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                    Preferred Time
                  </label>
                  <select
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
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.primary }}>
                  Additional Information
                </label>
                <textarea
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
            <div className="aspect-video bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <MapPin className="w-20 h-20 mx-auto mb-4" />
                <p className="text-2xl font-bold mb-2">Interactive Map</p>
                <p className="text-teal-100 max-w-md mx-auto">
                  In a live website, this would display an interactive Google Maps widget showing our exact location with directions.
                </p>
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
