import React from 'react';
import { Wrench, Zap, Droplet, Hammer, Paintbrush, Home, DoorOpen, Tv, Fence, CheckCircle, ArrowRight, Phone } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function ServicesPage({ onNavigate, colors }: ServicesPageProps) {
  const services = [
    {
      icon: Wrench,
      title: 'General Repairs',
      price: 'Starting at $89',
      description: 'Quick fixes for everyday household issues that need professional attention.',
      includes: [
        'Loose doorknobs and handles',
        'Squeaky floors and stairs',
        'Cabinet adjustments',
        'Drawer repairs',
        'Minor hardware replacements',
        'General maintenance',
      ],
    },
    {
      icon: Zap,
      title: 'Electrical Work',
      price: 'Starting at $125',
      description: 'Licensed electricians for safe, code-compliant electrical repairs and installations.',
      includes: [
        'Outlet and switch installation',
        'Light fixture replacement',
        'Ceiling fan installation',
        'GFCI outlet upgrades',
        'Electrical troubleshooting',
        'Safety inspections',
      ],
    },
    {
      icon: Droplet,
      title: 'Plumbing Fixes',
      price: 'Starting at $99',
      description: 'Expert plumbing repairs to stop leaks and restore proper water flow.',
      includes: [
        'Leaky faucet repairs',
        'Running toilet fixes',
        'Drain cleaning',
        'Garbage disposal installation',
        'Shower head replacement',
        'Supply line repairs',
      ],
    },
    {
      icon: Hammer,
      title: 'Carpentry',
      price: 'Starting at $150',
      description: 'Custom woodworking and carpentry services for your home improvement projects.',
      includes: [
        'Custom shelving installation',
        'Trim and molding work',
        'Door installation and repair',
        'Window frame repairs',
        'Built-in storage solutions',
        'Wood rot repairs',
      ],
    },
    {
      icon: Paintbrush,
      title: 'Painting & Drywall',
      price: 'Starting at $125',
      description: 'Professional painting and drywall services for a fresh, clean look.',
      includes: [
        'Interior room painting',
        'Exterior touch-ups',
        'Drywall hole repair',
        'Texture matching',
        'Trim painting',
        'Wallpaper removal',
      ],
    },
    {
      icon: DoorOpen,
      title: 'Door & Window Repair',
      price: 'Starting at $110',
      description: 'Keep your home secure and energy-efficient with proper door and window maintenance.',
      includes: [
        'Door alignment and adjustment',
        'Lock installation',
        'Weatherstripping replacement',
        'Window screen repair',
        'Sliding door track cleaning',
        'Storm door installation',
      ],
    },
    {
      icon: Tv,
      title: 'TV Mounting & Assembly',
      price: 'Starting at $89',
      description: 'Professional installation of TVs, furniture, and home equipment.',
      includes: [
        'TV wall mounting (any size)',
        'Furniture assembly',
        'Wire concealment',
        'Soundbar installation',
        'Shelf mounting',
        'Home gym equipment setup',
      ],
    },
    {
      icon: Home,
      title: 'Drywall Repair',
      price: 'Starting at $99',
      description: 'Expert drywall repair from small holes to large damaged areas.',
      includes: [
        'Nail pops and cracks',
        'Small to large holes',
        'Water damage repair',
        'Texture matching',
        'Patch and paint',
        'Corner bead repair',
      ],
    },
    {
      icon: Fence,
      title: 'Deck & Fence Repair',
      price: 'Starting at $175',
      description: 'Extend the life of your outdoor structures with expert repairs and maintenance.',
      includes: [
        'Deck board replacement',
        'Railing repairs',
        'Fence post replacement',
        'Gate installation and repair',
        'Pressure washing',
        'Staining and sealing',
      ],
    },
    {
      icon: Wrench,
      title: 'Kitchen & Bath Updates',
      price: 'Starting at $135',
      description: 'Upgrade your kitchen and bathrooms without a full renovation.',
      includes: [
        'Cabinet hardware installation',
        'Backsplash installation',
        'Fixture replacements',
        'Vanity installation',
        'Towel bar mounting',
        'Mirror installation',
      ],
    },
  ];

  const pricingFeatures = [
    'No hidden fees - upfront pricing',
    'Free estimates on all projects',
    'Senior and military discounts',
    'Same-day service available',
    'All work guaranteed',
    'Licensed and insured',
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="text-white py-16" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            From quick repairs to complete home improvements, we handle it all with expertise and care. No job too small!
          </p>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-4 text-white" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg">
            ⚡ EMERGENCY SERVICE AVAILABLE 24/7 - Call (555) 123-4567 Now!
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.secondary + '20' }}
                      >
                        <service.icon className="h-7 w-7" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>
                          {service.title}
                        </h3>
                        <p className="font-bold" style={{ color: colors.accent }}>
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">
                      Services Include:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {service.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: colors.secondary }} />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full px-6 py-3 rounded-lg text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Get Free Quote
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Transparent, Upfront Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No surprises, no hidden fees. You'll know the cost before we start work.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0" style={{ color: colors.secondary }} />
                  <span className="text-lg font-semibold text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                  How Our Pricing Works
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>1. Free Estimate:</strong> We assess your project and provide a detailed quote at no charge.
                  </p>
                  <p>
                    <strong>2. Flat-Rate Pricing:</strong> You approve the price before we start. No hourly surprises.
                  </p>
                  <p>
                    <strong>3. Quality Guarantee:</strong> If you're not satisfied, we'll make it right at no extra cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Service Area
            </h2>
            <p className="text-xl text-gray-600">
              Proudly serving the greater metro area within a 20-mile radius
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <p className="text-xl font-semibold" style={{ color: colors.primary }}>
                  Service Area Map
                </p>
                <p className="text-gray-600 mt-2">
                  Serving all neighborhoods within 20 miles
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Not sure if we service your area? Give us a call!
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                style={{ backgroundColor: colors.accent }}
              >
                <Phone className="h-5 w-5" />
                (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Request a free quote today and discover why we're the most trusted handyman service in the area.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
            style={{ backgroundColor: colors.accent, color: 'white' }}
          >
            Request Free Quote
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
