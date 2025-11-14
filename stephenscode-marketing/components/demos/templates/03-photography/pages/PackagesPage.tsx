'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Camera, Clock, Image, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface PackagesPageProps {
  onNavigate: (page: string) => void;
}

export default function PackagesPage({ onNavigate }: PackagesPageProps) {
  const packages = [
    {
      name: 'Headshot Session',
      price: 150,
      duration: '30 minutes',
      photos: '5 edited photos',
      icon: Camera,
      popular: false,
      description: 'Perfect for professional profiles and business needs',
      features: [
        'Studio or outdoor location',
        'Professional lighting setup',
        '5 high-resolution edited images',
        'Digital download included',
        'Wardrobe guidance',
        '48-hour turnaround',
      ],
    },
    {
      name: 'Family Portrait',
      price: 350,
      duration: '1 hour',
      photos: '20 edited photos',
      icon: Camera,
      popular: true,
      description: 'Capture beautiful moments with your loved ones',
      features: [
        'Location of your choice',
        'Up to 6 family members',
        '20 professionally edited images',
        'Digital gallery with download',
        'Print release included',
        'Outfit consultation',
        '1 week turnaround',
      ],
    },
    {
      name: 'Engagement Session',
      price: 400,
      duration: '1.5 hours',
      photos: '30 edited photos',
      icon: Camera,
      popular: false,
      description: 'Celebrate your love story beautifully',
      features: [
        '2 location changes',
        'Multiple outfit options',
        '30 professionally edited images',
        'Online gallery for sharing',
        'Engagement announcement design',
        'Print release included',
        '1 week turnaround',
      ],
    },
    {
      name: 'Product Photography',
      price: 500,
      duration: '2 hours',
      photos: '40 edited photos',
      icon: Camera,
      popular: false,
      description: 'Showcase your products professionally',
      features: [
        'Studio white background',
        'Lifestyle shots included',
        'Up to 15 products',
        '40 high-resolution images',
        'Web-optimized versions',
        'Commercial usage rights',
        '3-5 day turnaround',
      ],
    },
    {
      name: 'Corporate Events',
      price: 800,
      duration: '4 hours',
      photos: '100+ edited photos',
      icon: Camera,
      popular: false,
      description: 'Professional coverage for your business events',
      features: [
        'Full event coverage',
        'Candid and posed shots',
        '100+ professionally edited images',
        'Online gallery for attendees',
        'Rush delivery available',
        'Commercial usage rights',
        '1 week turnaround',
      ],
    },
    {
      name: 'Wedding Photography',
      price: 2500,
      duration: 'Full day',
      photos: '300+ edited photos',
      icon: Star,
      popular: true,
      description: 'Preserve your special day with timeless imagery',
      features: [
        '8 hours of coverage',
        'Second photographer included',
        '300+ professionally edited images',
        'Online gallery with sharing',
        'Engagement session included',
        'Print release and USB',
        'Custom wedding album available',
        '4-6 week turnaround',
      ],
    },
  ];

  const addons = [
    {
      name: 'Additional Hour',
      price: 200,
      description: 'Extend your session time',
    },
    {
      name: 'Rush Delivery',
      price: 150,
      description: '24-48 hour turnaround',
    },
    {
      name: 'Extra Edited Photos',
      price: 50,
      description: 'Per 10 additional images',
    },
    {
      name: 'Print Package',
      price: 300,
      description: '10 8x10 professional prints',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Photography Packages & Pricing - Lens & Light Photography</title>
        <meta
          name="description"
          content="Affordable professional photography packages for weddings ($2,500), families ($350), headshots ($150), and more. Transparent pricing with no hidden fees. Book your session today."
        />
        <meta name="keywords" content="photography prices, wedding photographer cost, family portrait prices, headshot pricing, photography packages, professional photography rates" />
        <meta property="og:title" content="Photography Packages & Pricing - Lens & Light Photography" />
        <meta property="og:description" content="Affordable professional photography packages starting at $150. Transparent pricing with no hidden fees." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#2d3142] to-[#4f5d75]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#bfc0c0] tracking-[0.3em] uppercase text-sm mb-4">
              Investment
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Packages & Pricing
            </h1>
            <p className="text-xl text-[#bfc0c0] max-w-2xl mx-auto leading-relaxed">
              Transparent pricing with no hidden fees. Choose the package that fits your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white border-2 ${
                  pkg.popular ? 'border-[#2d3142] shadow-xl' : 'border-gray-200'
                } hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#2d3142] text-white px-4 py-1 text-xs font-medium tracking-wider">
                    POPULAR
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                      pkg.popular ? 'bg-[#2d3142]' : 'bg-gray-100'
                    }`}>
                      <pkg.icon className={pkg.popular ? 'text-white' : 'text-[#4f5d75]'} size={24} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#2d3142] mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-[#4f5d75] text-sm mb-4">
                      {pkg.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-serif text-4xl text-[#2d3142]">
                        ${pkg.price}
                      </span>
                      {pkg.price < 1000 && (
                        <span className="text-[#4f5d75] text-sm">starting at</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#4f5d75]">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image size={16} />
                        <span>{pkg.photos}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-[#2d3142] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-[#4f5d75] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-3 font-medium transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-[#2d3142] text-white hover:bg-[#4f5d75]'
                        : 'border-2 border-[#2d3142] text-[#2d3142] hover:bg-[#2d3142] hover:text-white'
                    }`}
                  >
                    Book This Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl text-[#2d3142] mb-4">
                Enhance Your Package
              </h2>
              <p className="text-lg text-[#4f5d75] max-w-2xl mx-auto">
                Customize your experience with these optional add-ons
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 border border-gray-200 hover:border-[#2d3142] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-serif text-xl text-[#2d3142] mb-2">
                  {addon.name}
                </h3>
                <p className="text-[#4f5d75] text-sm mb-4">
                  {addon.description}
                </p>
                <p className="font-serif text-2xl text-[#2d3142]">
                  +${addon.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl text-[#2d3142] mb-4">
                Package Comparison
              </h2>
              <p className="text-lg text-[#4f5d75] max-w-2xl mx-auto">
                Find the perfect fit for your photography needs
              </p>
            </motion.div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#2d3142]">
                  <th className="py-4 px-6 text-left font-serif text-lg text-[#2d3142]">
                    Package
                  </th>
                  <th className="py-4 px-6 text-center font-serif text-lg text-[#2d3142]">
                    Duration
                  </th>
                  <th className="py-4 px-6 text-center font-serif text-lg text-[#2d3142]">
                    Photos
                  </th>
                  <th className="py-4 px-6 text-center font-serif text-lg text-[#2d3142]">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      pkg.popular ? 'bg-[#2d3142] bg-opacity-5' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#2d3142]">
                        {pkg.name}
                      </div>
                      {pkg.popular && (
                        <span className="text-xs text-[#4f5d75] uppercase tracking-wider">
                          Popular Choice
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-[#4f5d75]">
                      {pkg.duration}
                    </td>
                    <td className="py-4 px-6 text-center text-[#4f5d75]">
                      {pkg.photos}
                    </td>
                    <td className="py-4 px-6 text-center font-serif text-xl text-[#2d3142]">
                      ${pkg.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Frequently Asked Questions
              </h2>
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What is your booking process?',
                answer: 'Contact us to check availability, choose your package, sign the contract, and pay a 50% deposit to secure your date. The remaining balance is due on the day of the shoot.',
              },
              {
                question: 'How long until I receive my photos?',
                answer: 'Turnaround times vary by package, typically ranging from 48 hours to 4-6 weeks. Rush delivery is available for an additional fee.',
              },
              {
                question: 'Can I purchase additional edited photos?',
                answer: 'Yes! Additional edited photos are available at $50 per 10 images. Simply let us know which shots you\'d like during the selection process.',
              },
              {
                question: 'Do you offer payment plans?',
                answer: 'Yes, we offer flexible payment plans for wedding packages. Contact us to discuss options that work for your budget.',
              },
              {
                question: 'What happens if I need to reschedule?',
                answer: 'We understand life happens! Rescheduling is free if done at least 14 days before your session. Late cancellations may forfeit the deposit.',
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
                <h3 className="font-serif text-xl text-[#2d3142] mb-3">
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
              Ready to Book Your Session?
            </h2>
            <p className="text-xl text-[#bfc0c0] mb-10 leading-relaxed">
              Let&apos;s discuss your vision and create a customized photography
              package that perfectly fits your needs and budget.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-white text-[#2d3142] font-medium hover:bg-[#bfc0c0] transition-all duration-300"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
