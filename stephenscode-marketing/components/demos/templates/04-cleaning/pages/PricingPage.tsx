'use client';

import { useState } from 'react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [selectedSize, setSelectedSize] = useState('2BR');
  const [selectedFrequency, setSelectedFrequency] = useState('bi-weekly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const pricing = {
    'Studio/1BR': { oneTime: 80, weekly: 70, biWeekly: 75, monthly: 80 },
    '2BR': { oneTime: 100, weekly: 85, biWeekly: 90, monthly: 100 },
    '3BR': { oneTime: 130, weekly: 110, biWeekly: 120, monthly: 130 },
    '4BR+': { oneTime: 160, weekly: 135, biWeekly: 145, monthly: 160 },
  };

  const addons = [
    { id: 'fridge', name: 'Inside Refrigerator', price: 25 },
    { id: 'oven', name: 'Inside Oven', price: 25 },
    { id: 'windows', name: 'Inside Windows', price: 35 },
    { id: 'laundry', name: 'Laundry Service', price: 40 },
    { id: 'dishes', name: 'Dishes', price: 20 },
    { id: 'cabinets', name: 'Interior Cabinets', price: 30 },
  ];

  const frequencies = [
    { id: 'weekly', label: 'Weekly', discount: 15, key: 'weekly' },
    { id: 'bi-weekly', label: 'Bi-weekly', discount: 10, key: 'biWeekly' },
    { id: 'monthly', label: 'Monthly', discount: 0, key: 'monthly' },
    { id: 'one-time', label: 'One-time', discount: 0, key: 'oneTime' },
  ];

  const calculatePrice = () => {
    const sizeKey = selectedSize as keyof typeof pricing;
    const freqData = frequencies.find(f => f.id === selectedFrequency);
    const freqKey = freqData?.key as keyof typeof pricing[typeof sizeKey];

    let basePrice = pricing[sizeKey][freqKey];
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return basePrice + addonsTotal;
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const packages = [
    {
      name: 'Basic Clean',
      price: 'From $80',
      frequency: 'One-time or Recurring',
      popular: false,
      features: [
        'Dusting all surfaces',
        'Vacuum and mop floors',
        'Kitchen cleaning',
        'Bathroom sanitizing',
        'Trash removal',
        'Bed making',
      ],
    },
    {
      name: 'Deep Clean',
      price: 'From $150',
      frequency: 'Quarterly Recommended',
      popular: true,
      features: [
        'Everything in Basic Clean',
        'Inside oven & fridge',
        'Cabinet fronts',
        'Baseboards & trim',
        'Window sills & tracks',
        'Light fixtures',
        'Behind furniture',
        'Detailed grout cleaning',
      ],
    },
    {
      name: 'Move In/Out',
      price: 'From $200',
      frequency: 'One-time',
      popular: false,
      features: [
        'Everything in Deep Clean',
        'Inside cabinets & drawers',
        'Inside closets',
        'Wall spot cleaning',
        'All windows (in & out)',
        'Garage sweeping',
        'Lease-ready guarantee',
        'White glove inspection',
      ],
    },
  ];

  const commercialPricing = [
    { size: 'Small Office (< 1,000 sq ft)', weekly: 120, biWeekly: 140, monthly: 160 },
    { size: 'Medium Office (1,000-2,500 sq ft)', weekly: 200, biWeekly: 240, monthly: 280 },
    { size: 'Large Office (2,500-5,000 sq ft)', weekly: 350, biWeekly: 420, monthly: 490 },
    { size: 'Enterprise (5,000+ sq ft)', weekly: 'Custom', biWeekly: 'Custom', monthly: 'Custom' },
  ];

  return (
    <div className="bg-white">
      {/* SEO Meta */}
      <title>Pricing - Sparkle Clean Services | Transparent Cleaning Service Rates</title>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Transparent Pricing</h1>
            <p className="text-xl text-blue-100">
              No hidden fees. No surprises. Just honest pricing for quality cleaning services.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Calculator</h2>
            <p className="text-xl text-gray-600">Get an instant estimate for your cleaning needs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#0077b6]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {/* Property Size */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Property Size</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(pricing).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-[#0077b6] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Cleaning Frequency</label>
                  <div className="space-y-2">
                    {frequencies.map((freq) => (
                      <button
                        key={freq.id}
                        onClick={() => setSelectedFrequency(freq.id)}
                        className={`w-full px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-between ${
                          selectedFrequency === freq.id
                            ? 'bg-[#0077b6] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{freq.label}</span>
                        {freq.discount > 0 && (
                          <span className={`text-sm ${selectedFrequency === freq.id ? 'text-green-200' : 'text-green-600'}`}>
                            Save {freq.discount}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Add-ons (Optional)</label>
                  <div className="space-y-2">
                    {addons.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                          selectedAddons.includes(addon.id)
                            ? 'bg-[#00b4d8] bg-opacity-20 border-2 border-[#00b4d8] text-gray-900'
                            : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            selectedAddons.includes(addon.id) ? 'bg-[#00b4d8]' : 'bg-white border-2 border-gray-300'
                          }`}>
                            {selectedAddons.includes(addon.id) && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-semibold">+${addon.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div>
                <div className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-2xl p-8 text-white h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-6">Your Estimate</h3>

                  <div className="flex-1 space-y-4 mb-6">
                    <div className="flex items-center justify-between pb-3 border-b border-white border-opacity-20">
                      <span className="text-blue-100">Property Size</span>
                      <span className="font-semibold">{selectedSize}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white border-opacity-20">
                      <span className="text-blue-100">Frequency</span>
                      <span className="font-semibold capitalize">{selectedFrequency.replace('-', ' ')}</span>
                    </div>
                    {selectedAddons.length > 0 && (
                      <div className="pb-3 border-b border-white border-opacity-20">
                        <p className="text-blue-100 mb-2">Add-ons</p>
                        {selectedAddons.map(addonId => {
                          const addon = addons.find(a => a.id === addonId);
                          return (
                            <div key={addonId} className="flex items-center justify-between text-sm mb-1">
                              <span>{addon?.name}</span>
                              <span>+${addon?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                    <p className="text-blue-100 text-sm mb-2">Estimated Total</p>
                    <p className="text-5xl font-bold mb-2">${calculatePrice()}</p>
                    <p className="text-blue-100 text-sm">per cleaning</p>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="mt-6 bg-white text-[#0077b6] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl w-full"
                  >
                    Get Free Quote
                  </button>

                  <p className="text-xs text-blue-100 text-center mt-4">
                    Final price may vary based on actual condition and specific requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Residential Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect cleaning package for your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  pkg.popular
                    ? 'bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white shadow-2xl transform scale-105'
                    : 'bg-white border-2 border-gray-200 shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white text-[#0077b6]">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <p className={`mb-4 ${pkg.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {pkg.frequency}
                </p>

                <div className="mb-6">
                  <p className={`text-4xl font-bold ${pkg.popular ? 'text-white' : 'text-[#0077b6]'}`}>
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-green-300' : 'text-green-500'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={pkg.popular ? 'text-white' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    pkg.popular
                      ? 'bg-white text-[#0077b6] hover:bg-gray-100'
                      : 'bg-[#0077b6] text-white hover:bg-[#005f8f]'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Commercial Cleaning Pricing</h2>
            <p className="text-xl text-gray-600">Professional office cleaning for businesses of all sizes</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0077b6] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Office Size</th>
                    <th className="px-6 py-4 text-right font-semibold">Weekly</th>
                    <th className="px-6 py-4 text-right font-semibold">Bi-weekly</th>
                    <th className="px-6 py-4 text-right font-semibold">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commercialPricing.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.size}</td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {typeof item.weekly === 'number' ? `$${item.weekly}` : item.weekly}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {typeof item.biWeekly === 'number' ? `$${item.biWeekly}` : item.biWeekly}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {typeof item.monthly === 'number' ? `$${item.monthly}` : item.monthly}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6">
            All commercial cleaning includes trash removal, restroom sanitizing, and common area maintenance.
          </p>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4">Save with Recurring Service</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">15%</p>
                <p className="text-xl">OFF Weekly Cleaning</p>
              </div>
              <div className="text-center">
                <p className="text-6xl font-bold mb-2">10%</p>
                <p className="text-xl">OFF Bi-weekly Cleaning</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-8 bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Start Saving Today
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing FAQs</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Are there any hidden fees?',
                a: 'No! Our pricing is completely transparent. The only additional costs would be optional add-ons you choose or if your space requires significantly more work than standard.',
              },
              {
                q: 'Do you offer discounts for recurring services?',
                a: 'Yes! Save 15% with weekly service or 10% with bi-weekly service. The more frequently you book, the more you save.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and ACH bank transfers. Payment is processed after service completion.',
              },
              {
                q: 'Is there a cancellation fee?',
                a: 'We require 24-hour notice for cancellations. Cancellations with less than 24-hour notice may incur a $50 fee.',
              },
              {
                q: 'Do you charge extra for eco-friendly products?',
                a: 'Green cleaning products are included at no extra charge for all our services!',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Cleaning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free, personalized quote in minutes
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#0077b6] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Get Free Quote
          </button>
        </div>
      </section>
    </div>
  );
}
