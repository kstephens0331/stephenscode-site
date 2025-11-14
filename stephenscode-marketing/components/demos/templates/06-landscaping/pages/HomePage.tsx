'use client';

import React from 'react';
import {
  Leaf,
  Droplets,
  Sun,
  TreeDeciduous,
  Award,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  BadgeCheck,
  TrendingUp,
  Shield
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Lawn Care',
      description: 'Professional mowing, fertilization, and maintenance',
      price: 'From $45/visit',
      badge: 'Most Popular'
    },
    {
      icon: <TreeDeciduous className="h-8 w-8" />,
      title: 'Landscape Design',
      description: 'Custom designs that transform your outdoor space',
      price: 'From $500',
      badge: null
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: 'Irrigation Systems',
      description: 'Smart watering solutions for healthy landscapes',
      price: 'From $1,200',
      badge: null
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: 'Seasonal Services',
      description: 'Spring cleanup, fall prep, and winter protection',
      price: 'From $150',
      badge: 'Seasonal'
    }
  ];

  const features = [
    { icon: <Award />, title: '15+ Years Experience', description: 'Trusted by thousands of homeowners' },
    { icon: <Users />, title: 'Certified Professionals', description: 'Licensed and insured team' },
    { icon: <Clock />, title: 'On-Time Service', description: '98% punctuality rating' },
    { icon: <Shield />, title: 'Satisfaction Guarantee', description: '100% money-back promise' }
  ];

  const processSteps = [
    { step: '1', title: 'Free Consultation', description: 'We assess your property and discuss your vision' },
    { step: '2', title: 'Custom Proposal', description: 'Receive a detailed plan and transparent pricing' },
    { step: '3', title: 'Professional Execution', description: 'Our team brings your landscape to life' },
    { step: '4', title: 'Ongoing Support', description: 'Maintenance plans to keep it looking great' }
  ];

  const stats = [
    { number: '2,500+', label: 'Projects Completed' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '15+', label: 'Years Experience' },
    { number: '30mi', label: 'Service Radius' }
  ];

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#386641] via-[#6a994e] to-[#a7c957] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 Q15 10 10 20 Q5 10 10 0" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#leaf-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BadgeCheck className="h-5 w-5 text-[#a7c957]" />
                <span className="text-sm font-medium">Licensed & Insured Since 2009</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block text-[#a7c957]">Outdoor Space</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                Professional landscaping services that bring your vision to life. From design to maintenance, we create beautiful, sustainable outdoor environments.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#a7c957] text-[#386641] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  Get Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  View Our Work
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#a7c957]">{stat.number}</div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Area */}
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/20">
                <div className="w-full h-full bg-gradient-to-br from-[#6a994e] to-[#386641] rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <TreeDeciduous className="h-32 w-32 mx-auto text-[#a7c957]" />
                    <div className="text-2xl font-bold">Premium Landscaping</div>
                    <div className="text-gray-200">Professional • Reliable • Beautiful</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-[#386641] p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-[#a7c957] fill-[#a7c957]" />
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm text-gray-600">500+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#a7c957]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-[#386641]' })}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#386641]">{feature.title}</div>
                  <div className="text-xs text-gray-600">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#386641] mb-4">
              Complete Landscaping Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From routine maintenance to complete landscape transformations, we offer comprehensive services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#a7c957] relative overflow-hidden group"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4 bg-[#a7c957] text-[#386641] px-3 py-1 rounded-full text-xs font-bold">
                    {service.badge}
                  </div>
                )}

                <div className="w-16 h-16 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-[#386641] mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-[#6a994e]">{service.price}</span>
                  <ArrowRight className="h-5 w-5 text-[#386641] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#386641] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#6a994e] transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#386641] mb-4">
              Simple, Transparent Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to completion, we make landscaping easy and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-stone-50 rounded-2xl p-6 border-2 border-[#a7c957]/30 hover:border-[#a7c957] transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#386641] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-[#6a994e]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Services Highlight */}
      <section className="py-20 bg-gradient-to-r from-[#386641] to-[#6a994e] text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm mb-4">
                Seasonal Services
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Year-Round Care for Your Landscape
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Our seasonal services ensure your property looks its best in every season. From spring cleanup to winter protection, we've got you covered.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold text-lg mb-1">Spring</div>
                  <div className="text-sm text-gray-200">Cleanup & Mulching</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold text-lg mb-1">Summer</div>
                  <div className="text-sm text-gray-200">Maintenance & Care</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold text-lg mb-1">Fall</div>
                  <div className="text-sm text-gray-200">Leaf Removal & Prep</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-bold text-lg mb-1">Winter</div>
                  <div className="text-sm text-gray-200">Protection & Planning</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('services')}
                className="bg-[#a7c957] text-[#386641] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
              >
                View Seasonal Packages
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 flex items-center justify-center">
                  <Sun className="h-20 w-20 text-[#a7c957]" />
                </div>
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 flex items-center justify-center">
                  <Leaf className="h-20 w-20 text-[#a7c957]" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 flex items-center justify-center">
                  <TreeDeciduous className="h-20 w-20 text-[#a7c957]" />
                </div>
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 flex items-center justify-center">
                  <Droplets className="h-20 w-20 text-[#a7c957]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12">
                <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
                  Why Choose Us
                </div>
                <h2 className="text-4xl font-bold text-[#386641] mb-6">
                  The Green Valley Difference
                </h2>

                <div className="space-y-4">
                  {[
                    'Certified and insured professionals',
                    'Eco-friendly practices and products',
                    'Custom designs tailored to your vision',
                    'State-of-the-art equipment',
                    'Competitive pricing with no hidden fees',
                    'Flexible scheduling and maintenance plans',
                    'Local family-owned business',
                    '100% satisfaction guarantee'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#6a994e] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('testimonials')}
                  className="mt-8 bg-[#386641] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#6a994e] transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
                >
                  Read Customer Reviews
                  <Star className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#386641] to-[#6a994e] p-12 flex items-center justify-center">
                <div className="text-center text-white space-y-6">
                  <Award className="h-24 w-24 mx-auto text-[#a7c957]" />
                  <h3 className="text-3xl font-bold">Award-Winning Service</h3>
                  <p className="text-xl text-gray-100">
                    Recognized as the Best Landscaping Company in the region for 3 consecutive years
                  </p>
                  <div className="flex justify-center gap-4 pt-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-2xl font-bold text-[#a7c957]">2023</div>
                      <div className="text-sm">Best Service</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-2xl font-bold text-[#a7c957]">2024</div>
                      <div className="text-sm">Best Design</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="text-2xl font-bold text-[#a7c957]">2025</div>
                      <div className="text-sm">Best Value</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6a994e] to-[#a7c957]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#386641] mb-6">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation estimate today. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#386641] text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-white hover:text-[#386641] transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
            >
              Get Free Estimate
              <ArrowRight className="h-6 w-6" />
            </button>
            <a
              href="tel:555-0123"
              className="bg-white text-[#386641] px-10 py-5 rounded-lg font-bold text-xl hover:bg-[#386641] hover:text-white transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
            >
              Call (555) 012-3456
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
