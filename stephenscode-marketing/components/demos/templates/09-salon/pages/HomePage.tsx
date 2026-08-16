import React, { useState } from 'react';
import { Sparkles, Star, Award, Heart, Calendar, Gift, X, CheckCircle } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [membershipTier, setMembershipTier] = useState<string | null>(null);
  const [membershipForm, setMembershipForm] = useState({ name: '', email: '', phone: '' });
  const [membershipSubmitted, setMembershipSubmitted] = useState(false);
  const [membershipError, setMembershipError] = useState(false);

  const openMembership = (tier: string) => {
    setMembershipTier(tier);
    setMembershipSubmitted(false);
    setMembershipError(false);
  };

  const closeMembership = () => {
    setMembershipTier(null);
    setMembershipForm({ name: '', email: '', phone: '' });
  };

  const handleMembershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipError(false);
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Glamour Studio Salon',
          demoPackage: 'Website Rebuild ($350)',
          demoSlug: 'glamour-studio-salon',
          clientName: membershipForm.name,
          clientPhone: membershipForm.phone,
          clientEmail: membershipForm.email,
          service: `VIP Membership - ${membershipTier}`,
          preferredDate: '',
          preferredTime: '',
          notes: `Interested in joining the ${membershipTier} VIP membership tier.`,
        }),
      });

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'salon_membership_form',
          demo_slug: 'glamour-studio-salon',
        });
        trackConversion('leadForm');
        setMembershipSubmitted(true);
      } else {
        setMembershipError(true);
      }
    } catch {
      setMembershipError(true);
    }
  };
  const features = [
    {
      icon: Star,
      title: 'Master Stylists',
      description: 'Award-winning team with 10+ years experience',
    },
    {
      icon: Sparkles,
      title: 'Premium Products',
      description: 'Luxury brands and treatments',
    },
    {
      icon: Award,
      title: 'Best of 2024',
      description: 'Voted #1 salon in the city',
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Customized beauty solutions',
    },
  ];

  const services = [
    {
      title: 'Hair Services',
      image: '💇‍♀️',
      description: 'Cuts, Color, Highlights, Balayage',
      price: 'From $65',
    },
    {
      title: 'Styling',
      image: '✨',
      description: 'Blowouts, Updos, Extensions',
      price: 'From $45',
    },
    {
      title: 'Nail Services',
      image: '💅',
      description: 'Manicure, Pedicure, Gel, Acrylics',
      price: 'From $35',
    },
    {
      title: 'Special Occasion',
      image: '👰',
      description: 'Bridal, Prom, Events',
      price: 'From $150',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      rating: 5,
      text: 'Jessica gave me the most incredible balayage! I get compliments everywhere I go.',
      service: 'Hair Color',
    },
    {
      name: 'Emily Chen',
      rating: 5,
      text: 'The bridal package was worth every penny. Maria made me feel like a princess!',
      service: 'Bridal Services',
    },
    {
      name: 'Lisa Rodriguez',
      rating: 5,
      text: "Best nail art in town! Taylor's designs are always on point and last for weeks.",
      service: 'Nail Services',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Unleash Your Inner Glamour
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Where luxury meets beauty. Expert stylists, premium treatments, unforgettable transformations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('booking')}
                className="bg-white text-[#d00000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Book Your Appointment
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 animate-bounce">
            <Sparkles className="w-12 h-12 text-white/30" />
          </div>
          <div className="absolute bottom-10 right-10 animate-pulse">
            <Heart className="w-16 h-16 text-white/20" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <feature.icon className="w-12 h-12 text-[#d00000] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
              Our Signature Services
            </h2>
            <p className="text-xl text-gray-600">
              Premium beauty treatments tailored to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => onNavigate('services')}
              >
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">{service.image}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-[#d00000] font-bold text-xl">{service.price}</p>
                </div>
                <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] h-2 group-hover:h-3 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              View All Services & Pricing
            </button>
          </div>
        </div>
      </section>

      {/* VIP Membership */}
      <section className="py-20 bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gift className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">VIP Membership Program</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our exclusive membership for premium perks and savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-4">Gold</h3>
              <p className="text-4xl font-bold mb-6">$49<span className="text-xl">/mo</span></p>
              <ul className="space-y-3 text-white/90">
                <li>✓ 10% off all services</li>
                <li>✓ Priority booking</li>
                <li>✓ Free styling consultation</li>
                <li>✓ Birthday gift</li>
              </ul>
              <button
                onClick={() => openMembership('Gold')}
                className="w-full mt-6 bg-white text-[#d00000] py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Join Gold
              </button>
            </div>

            <div className="bg-white text-[#d00000] rounded-2xl p-8 border-4 border-white shadow-2xl transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Platinum</h3>
              <p className="text-4xl font-bold mb-6">$89<span className="text-xl">/mo</span></p>
              <ul className="space-y-3">
                <li>✓ 20% off all services</li>
                <li>✓ 1 complimentary blowout/month</li>
                <li>✓ VIP event invitations</li>
                <li>✓ Product discounts</li>
                <li>✓ Free nail refresh</li>
              </ul>
              <button
                onClick={() => openMembership('Platinum')}
                className="w-full mt-6 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Join Platinum
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-4">Diamond</h3>
              <p className="text-4xl font-bold mb-6">$149<span className="text-xl">/mo</span></p>
              <ul className="space-y-3 text-white/90">
                <li>✓ 30% off all services</li>
                <li>✓ 2 complimentary services/month</li>
                <li>✓ Personal stylist</li>
                <li>✓ Exclusive products</li>
                <li>✓ Guest privileges</li>
              </ul>
              <button
                onClick={() => openMembership('Diamond')}
                className="w-full mt-6 bg-white text-[#d00000] py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Join Diamond
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear from our satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d00000] text-[#d00000]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 text-[#d00000] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready for Your Transformation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointment today and experience the Glamour Studio difference
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Book Your Appointment Now
          </button>
        </div>
      </section>

      {/* VIP Membership Modal */}
      {membershipTier && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeMembership}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Join {membershipTier} Membership</h3>
              <button onClick={closeMembership} aria-label="Close membership form">
                <X className="w-6 h-6" />
              </button>
            </div>

            {membershipSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Welcome to the VIP List!</h4>
                <p className="text-gray-600 mb-6">
                  Thank you, {membershipForm.name}. We&apos;ve received your {membershipTier} membership
                  request. Our team will reach out within 24 hours to activate your perks.
                </p>
                <button
                  onClick={closeMembership}
                  className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleMembershipSubmit} className="p-6 space-y-4">
                <p className="text-gray-600 text-sm">
                  Tell us how to reach you and we&apos;ll set up your {membershipTier} membership.
                </p>
                <div>
                  <label htmlFor="salon-membership-name" className="block text-sm font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    id="salon-membership-name"
                    type="text"
                    required
                    value={membershipForm.name}
                    onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="salon-membership-email" className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    id="salon-membership-email"
                    type="email"
                    required
                    value={membershipForm.email}
                    onChange={(e) => setMembershipForm({ ...membershipForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="salon-membership-phone" className="block text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    id="salon-membership-phone"
                    type="tel"
                    required
                    value={membershipForm.phone}
                    onChange={(e) => setMembershipForm({ ...membershipForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                    placeholder="(555) 123-4567"
                  />
                </div>
                {membershipError && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                    There was an issue submitting your request. Please try again or call us at
                    (555) 456-7890.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Request {membershipTier} Membership
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
