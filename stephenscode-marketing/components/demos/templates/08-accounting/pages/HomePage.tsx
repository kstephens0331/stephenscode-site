import React from 'react';
import { TrendingUp, Shield, Users, Award, Calculator, FileText, ChevronRight, CheckCircle, Star, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Calculator,
      title: 'Tax Planning & Preparation',
      description: 'Strategic tax solutions to minimize liability and maximize savings for individuals and businesses.',
    },
    {
      icon: TrendingUp,
      title: 'Investment Management',
      description: 'Personalized portfolio strategies designed to grow and protect your wealth over time.',
    },
    {
      icon: Shield,
      title: 'Retirement Planning',
      description: 'Comprehensive retirement strategies to ensure financial security in your golden years.',
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Protect your legacy with strategic estate planning and wealth transfer solutions.',
    },
  ];

  const stats = [
    { value: '25+', label: 'Years Experience' },
    { value: '1,200+', label: 'Clients Served' },
    { value: '$2.5B+', label: 'Assets Managed' },
    { value: '98%', label: 'Client Retention' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'Peak Financial saved our company $125,000 in taxes last year through strategic planning. Their expertise is unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Torres',
      role: 'Retired Executive',
      content: 'Thanks to their retirement planning, I retired 3 years early with complete financial confidence. Best decision ever.',
      rating: 5,
    },
    {
      name: 'Jennifer Liu',
      role: 'Tech Entrepreneur',
      content: 'Their investment strategies helped me grow my portfolio by 42% while maintaining conservative risk levels.',
      rating: 5,
    },
  ];

  const certifications = [
    { name: 'CPA', desc: 'Certified Public Accountant' },
    { name: 'CFP', desc: 'Certified Financial Planner' },
    { name: 'CFA', desc: 'Chartered Financial Analyst' },
    { name: 'SEC', desc: 'SEC Registered Advisor' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] via-[#1a2a4d] to-[#14213d] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#fca311]/20 text-[#fca311] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award size={16} />
                <span>Award-Winning Financial Advisory Services</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Your Financial Success,<br />
                <span className="text-[#fca311]">Our Mission</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Expert financial planning, tax preparation, and investment management from certified professionals with over 25 years of proven success.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#fca311] text-[#14213d] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e59400] transition-all hover:scale-105"
                >
                  Schedule Free Consultation
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#14213d] transition-all"
                >
                  Explore Services
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 bg-[#fca311] rounded-full flex items-center justify-center mb-2">
                      <span className="text-[#14213d] font-bold text-sm">{cert.name}</span>
                    </div>
                    <p className="text-xs text-gray-400">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-[#14213d] text-2xl font-bold mb-6">Quick Financial Health Check</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#fca311]" size={24} />
                    <span className="text-gray-700">Tax optimization strategies in place?</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#fca311]" size={24} />
                    <span className="text-gray-700">Retirement savings on track?</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#fca311]" size={24} />
                    <span className="text-gray-700">Investment portfolio diversified?</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#fca311]" size={24} />
                    <span className="text-gray-700">Estate plan documented?</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full mt-6 bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors"
                >
                  Get Your Free Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#fca311] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#14213d] mb-2">{stat.value}</div>
                <div className="text-[#14213d] font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Comprehensive Financial Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tax planning to investment management, we provide integrated solutions for all your financial needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-[#14213d] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-[#fca311]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#14213d] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Learn More <ChevronRight size={20} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#14213d] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#1a2a4d] transition-colors inline-flex items-center gap-2"
            >
              View All Services <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600">See how we've helped clients achieve their financial goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border-2 border-[#e5e5e5]">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-[#fca311] fill-[#fca311]" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="border-t-2 border-[#14213d] pt-4">
                  <p className="font-bold text-[#14213d]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#14213d] to-[#1a2a4d] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a free consultation with our certified financial advisors today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#fca311] text-[#14213d] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#e59400] transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started Now <ChevronRight size={24} />
          </button>
          <p className="text-sm text-gray-400 mt-6">No obligation • Free 30-minute consultation • Same-day scheduling available</p>
        </div>
      </section>
    </div>
  );
}
