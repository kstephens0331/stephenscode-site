'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          demoSlug: 'lens-light-photography',
          leadData: formData,
          source: 'contact_form',
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Wedding Photography',
    'Engagement Session',
    'Family Portrait',
    'Headshot Session',
    'Corporate Events',
    'Product Photography',
    'Other',
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      link: 'tel:555-123-4567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@lensandlight.com',
      link: 'mailto:hello@lensandlight.com',
    },
    {
      icon: MapPin,
      label: 'Studio',
      value: '123 Photography Lane, Studio City, CA 90210',
      link: 'https://maps.google.com',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 9am-6pm, Sun: By Appointment',
      link: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#2d3142] to-[#4f5d75]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#bfc0c0] tracking-[0.3em] uppercase text-sm mb-4">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-[#bfc0c0] max-w-2xl mx-auto leading-relaxed">
              Let&apos;s discuss your vision and create beautiful memories together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl text-[#2d3142] mb-6">
                Book Your Session
              </h2>
              <p className="text-[#4f5d75] mb-8 leading-relaxed">
                Fill out the form below and we&apos;ll get back to you within 24 hours
                to discuss your photography needs and check availability.
              </p>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle size={20} />
                  <p>Thank you! We&apos;ll be in touch soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2d3142] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2d3142] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2d3142] mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-[#2d3142] mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-[#2d3142] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2d3142] mb-2">
                    Tell Us About Your Vision *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-[#2d3142] focus:outline-none focus:ring-1 focus:ring-[#2d3142] transition-colors resize-none"
                    placeholder="Tell us about your photography needs, location preferences, and any special requests..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#2d3142] text-white font-medium hover:bg-[#4f5d75] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl text-[#2d3142] mb-6">
                Get In Touch
              </h2>
              <p className="text-[#4f5d75] mb-10 leading-relaxed">
                We&apos;re here to answer any questions and help you plan the perfect
                photography session. Reach out through any of the channels below.
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2d3142] rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#4f5d75] mb-1">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[#2d3142] hover:text-[#4f5d75] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#2d3142]">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-[#2d3142] to-[#4f5d75] aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-[#bfc0c0]">Studio City, CA 90210</p>
                </div>
              </div>

              {/* Business Hours Details */}
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-serif text-xl text-[#2d3142] mb-4">
                  Studio Hours
                </h3>
                <div className="space-y-2 text-[#4f5d75]">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">By Appointment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl text-[#2d3142] mb-4">
                Before You Book
              </h2>
              <p className="text-lg text-[#4f5d75]">
                Quick answers to common questions
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How far in advance should I book?',
                answer: 'We recommend booking 4-6 weeks in advance for portrait sessions and 6-12 months for weddings. However, we often have availability for last-minute bookings.',
              },
              {
                question: 'Do you travel for sessions?',
                answer: 'Yes! We travel throughout Southern California. Travel fees may apply for locations beyond 30 miles from our studio in Studio City.',
              },
              {
                question: 'What should we wear for our session?',
                answer: 'We provide a detailed style guide upon booking. Generally, we recommend coordinating (not matching) outfits in neutral tones. We\'re happy to help with wardrobe consultation.',
              },
              {
                question: 'Can we bring props or pets?',
                answer: 'Absolutely! Props and pets can add personality to your photos. Just let us know in advance so we can plan accordingly.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 border border-gray-200"
              >
                <h3 className="font-serif text-lg text-[#2d3142] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#4f5d75] leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#2d3142] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Prefer to Call?
            </h2>
            <p className="text-xl text-[#bfc0c0] mb-8 leading-relaxed">
              We&apos;re always happy to chat about your photography needs
            </p>
            <a
              href="tel:555-123-4567"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#2d3142] font-medium hover:bg-[#bfc0c0] transition-all duration-300"
            >
              <Phone size={20} />
              (555) 123-4567
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
