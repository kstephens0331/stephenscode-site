'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Droplets,
  Hammer,
  TreeDeciduous,
  Scissors,
  Trash2,
  Shovel,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Calendar,
  DollarSign,
  Clock,
  BadgePercent
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      category: 'lawn-care',
      icon: <Leaf className="h-10 w-10" />,
      title: 'Lawn Care & Maintenance',
      description: 'Keep your lawn healthy, green, and beautiful year-round with our comprehensive maintenance services.',
      features: [
        'Professional mowing and edging',
        'Fertilization programs',
        'Weed control',
        'Aeration and overseeding',
        'Disease and pest management',
        'Soil testing and amendments'
      ],
      pricing: [
        { plan: 'Basic', price: '$45', frequency: 'per visit', features: ['Mowing', 'Edging', 'Blowing'] },
        { plan: 'Standard', price: '$75', frequency: 'per visit', features: ['Basic +', 'Trimming', 'Fertilization'] },
        { plan: 'Premium', price: '$120', frequency: 'per visit', features: ['Standard +', 'Weed Control', 'Aeration'] }
      ],
      seasonal: false
    },
    {
      category: 'design',
      icon: <TreeDeciduous className="h-10 w-10" />,
      title: 'Landscape Design & Installation',
      description: 'Transform your outdoor space with custom landscape designs that reflect your style and enhance your property value.',
      features: [
        '3D design visualization',
        'Plant selection and placement',
        'Hardscape integration',
        'Drainage solutions',
        'Professional installation',
        'One-year plant warranty'
      ],
      pricing: [
        { plan: 'Consultation', price: '$150', frequency: 'one-time', features: ['Site Analysis', 'Design Concepts', 'Material Suggestions'] },
        { plan: 'Full Design', price: '$500+', frequency: 'project', features: ['3D Renderings', 'Detailed Plans', 'Material Lists'] },
        { plan: 'Design + Install', price: '$2,500+', frequency: 'project', features: ['Complete Design', 'Full Installation', 'Warranty'] }
      ],
      seasonal: false
    },
    {
      category: 'hardscaping',
      icon: <Hammer className="h-10 w-10" />,
      title: 'Hardscaping Services',
      description: 'Add structure and functionality to your landscape with beautiful patios, walkways, retaining walls, and more.',
      features: [
        'Patios and decks',
        'Walkways and driveways',
        'Retaining walls',
        'Fire pits and outdoor kitchens',
        'Water features',
        'Stone and brick work'
      ],
      pricing: [
        { plan: 'Walkway', price: '$15-25', frequency: 'per sq ft', features: ['Pavers', 'Base Preparation', 'Installation'] },
        { plan: 'Patio', price: '$20-35', frequency: 'per sq ft', features: ['Custom Design', 'Premium Materials', 'Sealing'] },
        { plan: 'Retaining Wall', price: '$30-50', frequency: 'per sq ft', features: ['Engineering', 'Drainage', 'Installation'] }
      ],
      seasonal: false
    },
    {
      category: 'irrigation',
      icon: <Droplets className="h-10 w-10" />,
      title: 'Irrigation Systems',
      description: 'Efficient watering solutions that save water, time, and money while keeping your landscape healthy.',
      features: [
        'Smart irrigation systems',
        'Drip irrigation',
        'Sprinkler installation',
        'System repairs and maintenance',
        'Winterization services',
        'Water-efficient solutions'
      ],
      pricing: [
        { plan: 'Basic System', price: '$1,200', frequency: 'installed', features: ['4 Zones', 'Timer', 'Installation'] },
        { plan: 'Smart System', price: '$2,500', frequency: 'installed', features: ['8 Zones', 'WiFi Controller', 'Rain Sensor'] },
        { plan: 'Premium', price: '$4,000+', frequency: 'installed', features: ['12+ Zones', 'Smart Controller', 'Drip Irrigation'] }
      ],
      seasonal: false
    },
    {
      category: 'tree-care',
      icon: <TreeDeciduous className="h-10 w-10" />,
      title: 'Tree & Shrub Care',
      description: 'Professional care for your trees and shrubs to keep them healthy, beautiful, and properly maintained.',
      features: [
        'Pruning and trimming',
        'Tree removal',
        'Stump grinding',
        'Disease diagnosis and treatment',
        'Fertilization',
        'Emergency storm damage'
      ],
      pricing: [
        { plan: 'Pruning', price: '$150+', frequency: 'per tree', features: ['Health Assessment', 'Professional Pruning', 'Cleanup'] },
        { plan: 'Shrub Care', price: '$75+', frequency: 'per visit', features: ['Trimming', 'Shaping', 'Disease Control'] },
        { plan: 'Tree Removal', price: '$500+', frequency: 'per tree', features: ['Safe Removal', 'Stump Grinding', 'Cleanup'] }
      ],
      seasonal: false
    },
    {
      category: 'seasonal',
      icon: <Scissors className="h-10 w-10" />,
      title: 'Seasonal Cleanup',
      description: 'Prepare your landscape for changing seasons with our comprehensive cleanup and maintenance services.',
      features: [
        'Spring cleanup',
        'Fall leaf removal',
        'Bed preparation',
        'Debris removal',
        'Gutter cleaning',
        'Winter protection'
      ],
      pricing: [
        { plan: 'Spring Cleanup', price: '$150-300', frequency: 'one-time', features: ['Debris Removal', 'Bed Cleanup', 'Pruning'] },
        { plan: 'Fall Cleanup', price: '$200-400', frequency: 'one-time', features: ['Leaf Removal', 'Gutter Cleaning', 'Winterization'] },
        { plan: 'Seasonal Package', price: '$500', frequency: 'per year', features: ['Spring + Fall', 'Priority Scheduling', '10% Discount'] }
      ],
      seasonal: true,
      discount: '15% off when booked before season'
    },
    {
      category: 'mulching',
      icon: <Shovel className="h-10 w-10" />,
      title: 'Mulching & Edging',
      description: 'Fresh mulch and crisp edges give your landscape a polished, professional appearance.',
      features: [
        'Bed edging',
        'Mulch installation',
        'Multiple mulch options',
        'Weed barrier installation',
        'Bed reshaping',
        'Stone and rock options'
      ],
      pricing: [
        { plan: 'Standard Mulch', price: '$75', frequency: 'per yard', features: ['Premium Mulch', 'Installation', 'Edging'] },
        { plan: 'Enhanced', price: '$120', frequency: 'per yard', features: ['Color Mulch', 'Weed Barrier', 'Bed Reshaping'] },
        { plan: 'Premium', price: '$200', frequency: 'per yard', features: ['Designer Mulch', 'Stone Accents', 'Full Redesign'] }
      ],
      seasonal: true,
      discount: 'Spring special: 10% off'
    },
    {
      category: 'lighting',
      icon: <Lightbulb className="h-10 w-10" />,
      title: 'Outdoor Lighting',
      description: 'Enhance safety, security, and beauty with professional landscape lighting solutions.',
      features: [
        'LED landscape lighting',
        'Path and walkway lighting',
        'Accent lighting',
        'Security lighting',
        'Smart lighting controls',
        'Low-voltage systems'
      ],
      pricing: [
        { plan: 'Basic Package', price: '$800', frequency: 'installed', features: ['6 Fixtures', 'Transformer', 'Installation'] },
        { plan: 'Standard', price: '$1,500', frequency: 'installed', features: ['12 Fixtures', 'Timer', 'Design Service'] },
        { plan: 'Premium', price: '$3,000+', frequency: 'installed', features: ['20+ Fixtures', 'Smart Controls', 'Full Design'] }
      ],
      seasonal: false
    }
  ];

  const packages = [
    {
      name: 'Starter Package',
      price: '$199',
      frequency: 'per month',
      description: 'Perfect for maintaining a beautiful lawn',
      features: [
        'Weekly mowing and edging',
        'Bi-weekly trimming',
        'Monthly fertilization',
        'Weed control',
        'Spring and fall cleanup'
      ],
      popular: false
    },
    {
      name: 'Complete Care',
      price: '$349',
      frequency: 'per month',
      description: 'Full-service landscape maintenance',
      features: [
        'All Starter features',
        'Mulching (2x per year)',
        'Shrub pruning',
        'Seasonal flowers',
        'Irrigation system checks',
        'Priority scheduling'
      ],
      popular: true
    },
    {
      name: 'Estate Package',
      price: '$599',
      frequency: 'per month',
      description: 'Premium care for larger properties',
      features: [
        'All Complete Care features',
        'Tree care services',
        'Hardscape maintenance',
        'Outdoor lighting',
        'Monthly consultations',
        'Emergency services'
      ],
      popular: false
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#386641] to-[#6a994e] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Our Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete Landscaping Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              From design to maintenance, we offer comprehensive services to create and maintain your perfect outdoor space.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#a7c957] text-[#386641] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              Get Free Estimate
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="bg-white py-8 shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#386641] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Services
            </button>
            {services.map((service) => (
              <button
                key={service.category}
                onClick={() => setSelectedCategory(service.category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === service.category
                    ? 'bg-[#386641] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {service.title.split(' &')[0].split(' Services')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {filteredServices.map((service, index) => (
              <div
                key={service.category}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden ${
                  index % 2 === 0 ? '' : ''
                }`}
              >
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Service Info */}
                  <div className={`p-8 md:p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {service.seasonal && service.discount && (
                      <div className="inline-flex items-center gap-2 bg-[#a7c957] text-[#386641] px-4 py-2 rounded-full font-bold text-sm mb-4">
                        <BadgePercent className="h-4 w-4" />
                        {service.discount}
                      </div>
                    )}

                    <div className="w-16 h-16 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-2xl flex items-center justify-center text-white mb-6">
                      {service.icon}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-[#386641] mb-4">
                      {service.title}
                    </h2>

                    <p className="text-lg text-gray-600 mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-[#6a994e] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="bg-[#386641] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#6a994e] transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
                    >
                      Request Quote
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Pricing Cards */}
                  <div className={`bg-gradient-to-br from-stone-50 to-stone-100 p-8 md:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl font-bold text-[#386641] mb-6">Pricing Options</h3>
                    <div className="space-y-4">
                      {service.pricing.map((price, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-[#a7c957] transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-[#386641]">{price.plan}</h4>
                              <p className="text-sm text-gray-600">{price.frequency}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#6a994e]">{price.price}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {price.features.map((feature, fidx) => (
                              <div key={fidx} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#6a994e] flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Monthly Packages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#386641] mb-4">
              Maintenance Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Save time and money with our comprehensive maintenance packages designed for worry-free landscape care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl border-2 overflow-hidden ${
                  pkg.popular
                    ? 'border-[#a7c957] transform scale-105'
                    : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-[#a7c957] text-[#386641] text-center py-2 font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#386641] mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#6a994e]">{pkg.price}</span>
                    <span className="text-gray-600">/{pkg.frequency.split(' ')[1]}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#6a994e] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg ${
                      pkg.popular
                        ? 'bg-[#a7c957] text-[#386641] hover:bg-[#6a994e] hover:text-white'
                        : 'bg-[#386641] text-white hover:bg-[#6a994e]'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-br from-[#386641] to-[#6a994e] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Why Choose Green Valley?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <DollarSign className="h-8 w-8" />,
                  title: 'Transparent Pricing',
                  description: 'No hidden fees. Get detailed quotes upfront with clear pricing for every service.'
                },
                {
                  icon: <Calendar className="h-8 w-8" />,
                  title: 'Flexible Scheduling',
                  description: 'We work around your schedule with convenient appointment times and reliable service.'
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: 'On-Time Guarantee',
                  description: '98% punctuality rating. We respect your time and arrive when we say we will.'
                },
                {
                  icon: <BadgePercent className="h-8 w-8" />,
                  title: 'Seasonal Discounts',
                  description: 'Save with our seasonal promotions and package deals throughout the year.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="w-14 h-14 bg-[#a7c957] rounded-lg flex items-center justify-center text-[#386641] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-100">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#6a994e] to-[#a7c957] rounded-3xl shadow-2xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#386641] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and estimate. Let's transform your landscape together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#386641] text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-white hover:text-[#386641] transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
              >
                Get Free Estimate
                <ArrowRight className="h-6 w-6" />
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="bg-white text-[#386641] px-10 py-5 rounded-lg font-bold text-xl hover:bg-[#386641] hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
