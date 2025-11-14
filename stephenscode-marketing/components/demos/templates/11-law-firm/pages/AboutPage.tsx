import React from 'react';
import { Award, Users, Target, Heart, TrendingUp, Shield, Clock, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function AboutPage({ onNavigate, accentColor = '#c9a227' }: AboutPageProps) {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in every case and interaction.',
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We understand the stress of legal issues and provide empathetic guidance.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for outstanding results through preparation and expertise.',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your needs and goals are at the center of everything we do.',
    },
  ];

  const timeline = [
    {
      year: '1985',
      title: 'Firm Founded',
      description: 'Robert Justice established the firm with a vision of accessible, exceptional legal representation.',
    },
    {
      year: '1992',
      title: 'Expansion',
      description: 'Opened second office and expanded practice areas to serve more clients.',
    },
    {
      year: '2000',
      title: 'Major Milestone',
      description: 'Achieved $100M in total recoveries for personal injury clients.',
    },
    {
      year: '2008',
      title: 'Recognition',
      description: 'Firm recognized among Top Law Firms by U.S. News & World Report.',
    },
    {
      year: '2015',
      title: 'Digital Innovation',
      description: 'Launched client portal and virtual consultation services.',
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Over $500M recovered, 10,000+ cases won, and continuing to grow.',
    },
  ];

  const awards = [
    'Super Lawyers Top 100',
    'Best Lawyers in America',
    'Million Dollar Advocates Forum',
    'Top Tier Law Firm - U.S. News',
    'AV Preeminent Rated',
    'Best Law Firms - National Ranking',
    'Client Champion Award',
    'Legal Elite Recognition',
    'Trial Lawyer of the Year',
    'Community Leadership Award',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About Justice & Associates</h1>
          <p className="text-xl text-gray-300">
            For over 35 years, we've been fighting for justice and achieving exceptional results
            for our clients. Our commitment to excellence and client service sets us apart.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <Target className="w-6 h-6" style={{ color: '#16213e' }} />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To provide exceptional legal representation with integrity, dedication, and expertise.
                We are committed to protecting our clients' rights and achieving the best possible
                outcomes in every case we handle.
              </p>
              <p className="text-gray-600">
                We believe that everyone deserves access to quality legal representation, regardless
                of their circumstances. Our contingency fee structure for personal injury cases ensures
                that financial barriers don't prevent you from seeking justice.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accentColor }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: '#16213e' }} />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To be the most trusted and respected law firm in our community, known for our
                unwavering commitment to client success and our role in advancing justice.
              </p>
              <p className="text-gray-600">
                We envision a future where our clients feel empowered and confident throughout the
                legal process, knowing they have a dedicated team of professionals fighting for their
                rights and interests every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide our work and define who we are as a firm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <h3 className="font-bold text-xl mb-3" style={{ color: '#1a1a2e' }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Over three decades of growth, excellence, and client success
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
              style={{ backgroundColor: `${accentColor}40` }}
            />

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:grid-flow-dense'}`}>
                    <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                      <div
                        className="inline-block px-4 py-2 rounded-full font-bold text-lg mb-3"
                        style={{ backgroundColor: accentColor, color: '#16213e' }}
                      >
                        {event.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a2e' }}>
                        {event.title}
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              By The Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '$500M+', label: 'Total Recovered' },
              { value: '10,000+', label: 'Cases Won' },
              { value: '35+', label: 'Years Experience' },
              { value: '98%', label: 'Success Rate' },
              { value: '25+', label: 'Attorneys & Staff' },
              { value: '8', label: 'Practice Areas' },
              { value: '50+', label: 'Awards & Honors' },
              { value: '24/7', label: 'Availability' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600">
              Recognized by peers, clients, and legal organizations for excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <Award className="w-8 h-8 mx-auto mb-3" style={{ color: accentColor }} />
                <p className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                  {award}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Community Involvement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Globe className="w-12 h-12 mb-4" style={{ color: accentColor }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                Pro Bono Work
              </h3>
              <p className="text-gray-700 mb-4">
                We dedicate hundreds of hours annually to pro bono legal services, helping those
                who cannot afford representation. Justice should be accessible to all.
              </p>
              <ul className="space-y-2">
                {['Free legal clinics', 'Domestic violence advocacy', 'Immigration assistance', 'Veterans services'].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <Heart className="w-12 h-12 mb-4" style={{ color: accentColor }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                Charitable Giving
              </h3>
              <p className="text-gray-700 mb-4">
                Our firm actively supports local charities and organizations that make a positive
                impact in our community. We believe in giving back.
              </p>
              <ul className="space-y-2">
                {['Educational scholarships', 'Youth programs', 'Healthcare initiatives', 'Disaster relief'].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span style={{ color: accentColor }}>•</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          <h2 className="text-4xl font-bold mb-6">Become Part of Our Success Story</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let our experienced team fight for your rights and help you achieve the justice you deserve
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
        </div>
      </section>
    </div>
  );
}
