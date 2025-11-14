import React from 'react';
import { Scale, Award, Users, TrendingUp, Shield, Clock, Phone, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function HomePage({ onNavigate, accentColor = '#c9a227' }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-24 px-4"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Your Trusted Legal Advocates
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Over 35 years of experience fighting for justice. We provide exceptional legal
                representation with integrity, dedication, and proven results.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  Free Consultation
                </button>
                <button
                  onClick={() => onNavigate('practice-areas')}
                  className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900"
                  style={{ borderColor: accentColor, color: '#ffffff' }}
                >
                  Our Services
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-2">
                <Phone className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-2xl font-bold">(555) 123-4567</span>
                <span className="text-gray-300">| 24/7 Available</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>$500M+</div>
                <div className="text-sm text-gray-300">Recovered for Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>35+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>10,000+</div>
                <div className="text-sm text-gray-300">Cases Won</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Why Choose Justice & Associates?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine decades of legal expertise with a client-first approach to deliver
              exceptional results in every case we handle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Award className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>Award-Winning</h3>
              <p className="text-gray-600">
                Recognized by peers and clients for outstanding legal representation
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Users className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>Expert Team</h3>
              <p className="text-gray-600">
                Highly skilled attorneys with diverse legal backgrounds
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <TrendingUp className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>Proven Results</h3>
              <p className="text-gray-600">
                Track record of successful outcomes and maximum compensation
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Clock className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>24/7 Available</h3>
              <p className="text-gray-600">
                Always accessible when you need legal guidance and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Our Practice Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal services across multiple practice areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Personal Injury', icon: Shield },
              { name: 'Criminal Defense', icon: Scale },
              { name: 'Family Law', icon: Users },
              { name: 'Estate Planning', icon: Award },
              { name: 'Business Law', icon: TrendingUp },
              { name: 'Real Estate Law', icon: CheckCircle2 },
              { name: 'Immigration', icon: Users },
              { name: 'Employment Law', icon: Shield },
            ].map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.name}
                  onClick={() => onNavigate('practice-areas')}
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{ borderTop: `4px solid ${accentColor}` }}
                >
                  <Icon className="w-10 h-10 mb-4" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1a1a2e' }}>
                    {area.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Expert legal representation and guidance
                  </p>
                  <button
                    className="text-sm font-medium hover:underline"
                    style={{ color: accentColor }}
                  >
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('practice-areas')}
              className="px-8 py-3 rounded-lg font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              View All Practice Areas
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                case: 'Personal Injury',
                text: 'Justice & Associates fought tirelessly for my case. Their expertise and dedication resulted in a settlement that exceeded my expectations. I highly recommend their services.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                case: 'Criminal Defense',
                text: 'Facing criminal charges was terrifying, but the team at Justice & Associates provided exceptional representation. They achieved the best possible outcome for my case.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                case: 'Family Law',
                text: 'During a difficult divorce, they provided compassionate guidance while aggressively protecting my interests. Their professionalism made all the difference.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: accentColor }}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold" style={{ color: '#1a1a2e' }}>{testimonial.name}</p>
                  <p className="text-sm" style={{ color: accentColor }}>{testimonial.case}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Get a free consultation with one of our experienced attorneys. We're available 24/7
            to discuss your legal needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              Schedule Free Consultation
            </button>
            <button
              onClick={() => onNavigate('attorneys')}
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900"
              style={{ borderColor: accentColor, color: '#ffffff' }}
            >
              Meet Our Team
            </button>
          </div>
          <p className="mt-6 text-lg">
            <Phone className="inline w-5 h-5 mr-2" style={{ color: accentColor }} />
            <span className="font-bold">(555) 123-4567</span>
          </p>
        </div>
      </section>
    </div>
  );
}
