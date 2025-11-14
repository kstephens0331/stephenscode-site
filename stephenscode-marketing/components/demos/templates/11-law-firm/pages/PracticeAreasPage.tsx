import React from 'react';
import { Shield, Scale, Users, FileText, Briefcase, Home, Globe, UserCheck } from 'lucide-react';

interface PracticeAreasPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function PracticeAreasPage({ onNavigate, accentColor = '#c9a227' }: PracticeAreasPageProps) {
  const practiceAreas = [
    {
      icon: Shield,
      title: 'Personal Injury',
      description: 'Aggressive representation for victims of accidents, medical malpractice, and negligence.',
      services: [
        'Car Accidents',
        'Slip and Fall',
        'Medical Malpractice',
        'Wrongful Death',
        'Product Liability',
        'Workers Compensation',
      ],
      stats: '$150M+ Recovered',
    },
    {
      icon: Scale,
      title: 'Criminal Defense',
      description: 'Experienced defense attorneys protecting your rights and freedom.',
      services: [
        'DUI/DWI Defense',
        'Drug Crimes',
        'White Collar Crimes',
        'Violent Crimes',
        'Theft & Burglary',
        'Expungement',
      ],
      stats: '95% Success Rate',
    },
    {
      icon: Users,
      title: 'Family Law',
      description: 'Compassionate guidance through life\'s most challenging family matters.',
      services: [
        'Divorce & Separation',
        'Child Custody',
        'Child Support',
        'Spousal Support',
        'Adoption',
        'Prenuptial Agreements',
      ],
      stats: '2,000+ Families Helped',
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Comprehensive planning to protect your assets and legacy.',
      services: [
        'Wills & Trusts',
        'Probate Administration',
        'Power of Attorney',
        'Healthcare Directives',
        'Asset Protection',
        'Estate Tax Planning',
      ],
      stats: '$2B+ in Assets Protected',
    },
    {
      icon: Briefcase,
      title: 'Business Law',
      description: 'Strategic legal counsel for businesses of all sizes.',
      services: [
        'Business Formation',
        'Contract Drafting',
        'Mergers & Acquisitions',
        'Commercial Litigation',
        'Intellectual Property',
        'Compliance & Regulations',
      ],
      stats: '500+ Businesses Served',
    },
    {
      icon: Home,
      title: 'Real Estate Law',
      description: 'Expert guidance for all your real estate transactions and disputes.',
      services: [
        'Residential Transactions',
        'Commercial Real Estate',
        'Title Issues',
        'Landlord-Tenant Disputes',
        'Zoning & Land Use',
        'Real Estate Litigation',
      ],
      stats: '10,000+ Transactions',
    },
    {
      icon: Globe,
      title: 'Immigration',
      description: 'Helping individuals and families navigate the immigration process.',
      services: [
        'Family-Based Immigration',
        'Employment Visas',
        'Green Cards',
        'Naturalization',
        'Deportation Defense',
        'Asylum Applications',
      ],
      stats: '3,000+ Visas Approved',
    },
    {
      icon: UserCheck,
      title: 'Employment Law',
      description: 'Protecting employee rights and resolving workplace disputes.',
      services: [
        'Wrongful Termination',
        'Discrimination Claims',
        'Harassment Cases',
        'Wage & Hour Disputes',
        'Employment Contracts',
        'Severance Negotiations',
      ],
      stats: '$50M+ Recovered',
    },
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
          <h1 className="text-5xl font-bold mb-6">Our Practice Areas</h1>
          <p className="text-xl text-gray-300">
            Comprehensive legal services across multiple practice areas. Our experienced attorneys
            are ready to handle your legal matters with expertise and dedication.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <div
                    className="p-6"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)`,
                      borderBottom: `3px solid ${accentColor}`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-14 h-14 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: accentColor }}
                        >
                          <Icon className="w-7 h-7" style={{ color: '#16213e' }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>
                            {area.title}
                          </h3>
                          <p className="text-sm font-semibold" style={{ color: accentColor }}>
                            {area.stats}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{area.description}</p>
                  </div>

                  <div className="p-6">
                    <h4 className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: '#1a1a2e' }}>
                      Services Include:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {area.services.map((service, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span style={{ color: accentColor }}>•</span>
                          <span className="text-sm text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full py-3 rounded-lg font-bold transition-all hover:opacity-90"
                      style={{ backgroundColor: accentColor, color: '#16213e' }}
                    >
                      Request Consultation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* No Fee Guarantee */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-lg p-8 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
              color: '#ffffff',
            }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">No Fee Guarantee</h2>
              <p className="text-xl mb-6 text-gray-300">
                For personal injury cases, you don't pay unless we win. We work on a contingency
                fee basis, meaning our success depends on yours.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    No Upfront Costs
                  </div>
                  <p className="text-sm text-gray-300">Free case evaluation and consultation</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    No Win, No Fee
                  </div>
                  <p className="text-sm text-gray-300">Only pay if we recover compensation</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    Maximum Recovery
                  </div>
                  <p className="text-sm text-gray-300">We fight for every dollar you deserve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
            Don't See Your Legal Issue Listed?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We handle a wide range of legal matters. Contact us to discuss your specific situation
            and learn how we can help.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor, color: '#16213e' }}
          >
            Discuss Your Case
          </button>
        </div>
      </section>
    </div>
  );
}
