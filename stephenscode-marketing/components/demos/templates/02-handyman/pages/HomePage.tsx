import React from 'react';
import { Wrench, Zap, Droplet, Hammer, Paintbrush, CheckCircle, Clock, Shield, ThumbsUp, Star, ArrowRight, Phone } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function HomePage({ onNavigate, colors }: HomePageProps) {
  const services = [
    {
      icon: Wrench,
      title: 'General Repairs',
      description: 'From loose doorknobs to squeaky floors, we fix it all quickly and professionally.',
    },
    {
      icon: Zap,
      title: 'Electrical Work',
      description: 'Licensed electricians for outlets, switches, fixtures, and more. Safety guaranteed.',
    },
    {
      icon: Droplet,
      title: 'Plumbing Fixes',
      description: 'Leaky faucets, running toilets, clogged drains - we handle all minor plumbing issues.',
    },
    {
      icon: Hammer,
      title: 'Carpentry',
      description: 'Custom shelving, trim work, door installation, and all woodworking projects.',
    },
    {
      icon: Paintbrush,
      title: 'Painting Services',
      description: 'Interior and exterior painting, drywall repair, and professional finishing.',
    },
    {
      icon: CheckCircle,
      title: 'Home Assembly',
      description: 'Furniture assembly, TV mounting, and installation of purchased items.',
    },
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'Most repairs completed on the first visit. Emergency service available 24/7.',
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed, bonded, and insured. Your home and property are protected.',
    },
    {
      icon: ThumbsUp,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee on all work. We stand behind our repairs.',
    },
    {
      icon: Star,
      title: '500+ Five-Star Reviews',
      description: 'Trusted by thousands of homeowners. Check our verified customer reviews.',
    },
  ];

  const recentProjects = [
    {
      title: 'Kitchen Cabinet Repair',
      description: 'Repaired damaged cabinet doors and installed new hardware.',
      result: 'Like-new cabinets at a fraction of replacement cost.',
    },
    {
      title: 'Deck Restoration',
      description: 'Replaced rotted boards, reinforced structure, and applied weatherproof stain.',
      result: 'Extended deck life by 10+ years with improved safety.',
    },
    {
      title: 'Bathroom Fixture Upgrade',
      description: 'Replaced outdated faucets, showerhead, and installed new vanity lighting.',
      result: 'Modern, water-efficient fixtures that reduced utility bills.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: colors.accent }}>
                  ⚡ EMERGENCY SERVICE AVAILABLE
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Home Repair Experts
                <span className="block mt-2" style={{ color: colors.secondary }}>
                  Fast, Reliable, Done Right
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From minor fixes to major projects, our licensed handymen deliver quality workmanship with transparent pricing. Same-day service available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-lg text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Phone className="h-5 w-5" />
                  Call Now: (555) 123-4567
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: colors.secondary, color: 'white' }}
                >
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-700">
                <div>
                  <div className="text-3xl font-bold" style={{ color: colors.accent }}>15+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: colors.accent }}>10K+</div>
                  <div className="text-gray-400">Jobs Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: colors.accent }}>500+</div>
                  <div className="text-gray-400">Five-Star Reviews</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl transform rotate-3" style={{ backgroundColor: colors.primary, opacity: 0.2 }}></div>
                <div className="absolute inset-0 rounded-2xl transform -rotate-3" style={{ backgroundColor: colors.accent, opacity: 0.2 }}></div>
                <div className="relative bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {['Licensed & Insured', 'Background Checked', 'Satisfaction Guaranteed', 'Upfront Pricing'].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 flex-shrink-0" style={{ color: colors.secondary }} />
                        <span className="text-lg font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              What We Can Fix For You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No job too small! Our experienced handymen handle everything from quick fixes to complete home improvements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-gray-100 hover:border-current transform hover:-translate-y-1"
                style={{ '--hover-color': colors.secondary } as React.CSSProperties}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.secondary + '20' }}
                >
                  <service.icon className="h-8 w-8" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={() => onNavigate('services')}
                  className="font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  style={{ color: colors.primary }}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: colors.primary }}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Why Homeowners Choose Fix-It Fast
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another handyman service. We're your trusted home repair partner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: colors.accent + '20' }}>
                  <item.icon className="h-10 w-10" style={{ color: colors.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Recent Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects, real results. See how we've helped homeowners just like you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="h-48 flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: colors.primary }}>
                  Before & After
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: colors.secondary }} />
                      <p className="text-sm font-semibold" style={{ color: colors.primary }}>{project.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Your Project Done?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Call now for same-day service or schedule a free consultation. No job too small!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.accent, color: 'white' }}
            >
              <Phone className="h-5 w-5" />
              Call (555) 123-4567
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-lg font-bold text-lg bg-white hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              style={{ color: colors.primary }}
            >
              Request Free Quote
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Available Mon-Sat 7AM-8PM | Emergency Service 24/7
          </p>
        </div>
      </section>
    </div>
  );
}
