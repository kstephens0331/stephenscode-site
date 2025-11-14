'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Calendar,
  DollarSign,
  Home,
  Leaf,
  TreeDeciduous,
  Hammer,
  Droplets,
  Lightbulb
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
    propertySize: '',
    serviceInterest: [] as string[],
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
    preferredContact: 'email'
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    { id: 'lawn-care', name: 'Lawn Care & Maintenance', icon: <Leaf className="h-5 w-5" /> },
    { id: 'design', name: 'Landscape Design', icon: <TreeDeciduous className="h-5 w-5" /> },
    { id: 'hardscaping', name: 'Hardscaping', icon: <Hammer className="h-5 w-5" /> },
    { id: 'irrigation', name: 'Irrigation Systems', icon: <Droplets className="h-5 w-5" /> },
    { id: 'tree-care', name: 'Tree & Shrub Care', icon: <TreeDeciduous className="h-5 w-5" /> },
    { id: 'seasonal', name: 'Seasonal Services', icon: <Leaf className="h-5 w-5" /> },
    { id: 'lighting', name: 'Outdoor Lighting', icon: <Lightbulb className="h-5 w-5" /> },
    { id: 'maintenance', name: 'Monthly Maintenance', icon: <Calendar className="h-5 w-5" /> }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceInterest: prev.serviceInterest.includes(serviceId)
        ? prev.serviceInterest.filter(s => s !== serviceId)
        : [...prev.serviceInterest, serviceId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a server
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#386641] mb-4">
              Thank You!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We've received your request and will contact you within 24 hours to discuss your project.
            </p>
            <div className="bg-stone-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-[#386641] mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#6a994e] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">A team member will contact you to schedule a free consultation</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#6a994e] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">We'll visit your property to assess your needs</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#6a994e] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You'll receive a detailed proposal with transparent pricing</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onNavigate('home')}
                className="bg-[#386641] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#6a994e] transition-all"
              >
                Back to Home
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-white text-[#386641] px-8 py-4 rounded-lg font-bold border-2 border-[#386641] hover:bg-stone-50 transition-all"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#386641] to-[#6a994e] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Create Your Dream Landscape
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              Get a free consultation and estimate. We're here to answer your questions and bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href="tel:555-0123"
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#a7c957]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-xl flex items-center justify-center text-white mb-4">
                <Phone className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#386641] mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-2">Mon-Fri: 7AM-6PM</p>
              <p className="text-xl font-bold text-[#6a994e]">(555) 012-3456</p>
            </a>

            <a
              href="mailto:info@greenvalley.com"
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#a7c957]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-xl flex items-center justify-center text-white mb-4">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#386641] mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-2">24/7 Response Time</p>
              <p className="text-lg font-bold text-[#6a994e]">info@greenvalley.com</p>
            </a>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-xl flex items-center justify-center text-white mb-4">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#386641] mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-2">By Appointment</p>
              <p className="text-gray-700">123 Garden Lane<br />Green Valley, ST 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-[#386641] mb-6">
                    Request Your Free Estimate
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Property Size
                        </label>
                        <select
                          value={formData.propertySize}
                          onChange={(e) => setFormData({...formData, propertySize: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                        >
                          <option value="">Select size</option>
                          <option value="small">Small (under 5,000 sq ft)</option>
                          <option value="medium">Medium (5,000-10,000 sq ft)</option>
                          <option value="large">Large (10,000-20,000 sq ft)</option>
                          <option value="estate">Estate (20,000+ sq ft)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#386641] mb-2">
                        Property Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                        placeholder="123 Main Street, City, State"
                      />
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label className="block text-sm font-semibold text-[#386641] mb-3">
                        Services You're Interested In *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                              formData.serviceInterest.includes(service.id)
                                ? 'border-[#a7c957] bg-[#a7c957]/10'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              formData.serviceInterest.includes(service.id)
                                ? 'bg-[#a7c957] text-[#386641]'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {service.icon}
                            </div>
                            <span className={`font-medium ${
                              formData.serviceInterest.includes(service.id)
                                ? 'text-[#386641]'
                                : 'text-gray-700'
                            }`}>
                              {service.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                        >
                          <option value="">Select type</option>
                          <option value="new">New Installation</option>
                          <option value="renovation">Renovation</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="repair">Repair</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                        >
                          <option value="">When to start?</option>
                          <option value="asap">ASAP</option>
                          <option value="1month">Within 1 Month</option>
                          <option value="3months">1-3 Months</option>
                          <option value="planning">Just Planning</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#386641] mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors"
                        >
                          <option value="">Select budget</option>
                          <option value="under1k">Under $1,000</option>
                          <option value="1-3k">$1,000 - $3,000</option>
                          <option value="3-5k">$3,000 - $5,000</option>
                          <option value="5-10k">$5,000 - $10,000</option>
                          <option value="10k+">$10,000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-[#386641] mb-2">
                        Project Details
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project, any specific requirements, or questions you have..."
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-semibold text-[#386641] mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, preferredContact: 'email'})}
                          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.preferredContact === 'email'
                              ? 'border-[#a7c957] bg-[#a7c957]/10 text-[#386641] font-semibold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, preferredContact: 'phone'})}
                          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.preferredContact === 'phone'
                              ? 'border-[#a7c957] bg-[#a7c957]/10 text-[#386641] font-semibold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Phone
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#386641] to-[#6a994e] text-white px-8 py-5 rounded-lg font-bold text-lg hover:from-[#6a994e] hover:to-[#a7c957] transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3"
                    >
                      <Send className="h-6 w-6" />
                      Request Free Estimate
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll respond within 24 hours. No spam, we promise!
                    </p>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Business Hours */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-[#386641]" />
                    <h3 className="font-bold text-[#386641]">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-semibold text-[#386641]">7:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-semibold text-[#386641]">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-semibold text-gray-400">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Service Area Map */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-[#386641]" />
                    <h3 className="font-bold text-[#386641]">Service Area</h3>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-[#386641]/20 to-[#a7c957]/20 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-32 h-32 border-4 border-[#386641] rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-24 h-24 border-4 border-[#6a994e] rounded-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#a7c957] rounded-full flex items-center justify-center">
                            <Home className="h-8 w-8 text-[#386641]" />
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#386641]">30 Mile</div>
                      <div className="text-sm text-gray-600">Service Radius</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Proudly serving the Greater Metro Area and surrounding communities
                  </p>
                </div>

                {/* Quick Benefits */}
                <div className="bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="font-bold text-xl mb-4">Why Choose Us?</h3>
                  <div className="space-y-3">
                    {[
                      'Free on-site consultations',
                      'Transparent, detailed quotes',
                      '100% satisfaction guarantee',
                      'Licensed & insured professionals',
                      'Flexible scheduling options',
                      'Eco-friendly practices'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#a7c957] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
                Common Questions
              </div>
              <h2 className="text-4xl font-bold text-[#386641] mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'How quickly can you provide an estimate?',
                  a: 'We typically respond within 24 hours and can schedule an on-site consultation within 2-3 business days.'
                },
                {
                  q: 'Do you offer free consultations?',
                  a: 'Yes! All consultations and estimates are completely free with no obligation.'
                },
                {
                  q: 'Are you licensed and insured?',
                  a: 'Absolutely. We are fully licensed, bonded, and insured for your peace of mind.'
                },
                {
                  q: 'What areas do you serve?',
                  a: 'We serve the Greater Metro Area within a 30-mile radius of Green Valley.'
                },
                {
                  q: 'Do you offer maintenance packages?',
                  a: 'Yes, we offer flexible monthly and seasonal maintenance packages to fit any budget.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-stone-50 rounded-xl p-6 border-2 border-transparent hover:border-[#a7c957] transition-all">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-[#6a994e] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-[#386641] mb-2">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
