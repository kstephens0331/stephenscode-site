import React from 'react';
import { Award, GraduationCap, Briefcase, Star } from 'lucide-react';

interface AttorneysPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function AttorneysPage({ onNavigate, accentColor = '#c9a227' }: AttorneysPageProps) {
  const attorneys = [
    {
      name: 'Robert Justice',
      title: 'Senior Partner & Founder',
      specialties: ['Personal Injury', 'Medical Malpractice'],
      education: 'Harvard Law School, J.D.',
      barAdmissions: ['New York', 'New Jersey', 'Federal Courts'],
      experience: '35+ years',
      awards: ['Super Lawyers Top 100', 'Best Lawyers in America', 'Million Dollar Advocates Forum'],
      bio: 'Robert founded Justice & Associates in 1985 with a mission to provide exceptional legal representation to injury victims. His career includes numerous record-breaking settlements and verdicts.',
      cases: '5,000+ cases handled',
      image: 'RJ',
    },
    {
      name: 'Sarah Mitchell',
      title: 'Senior Partner',
      specialties: ['Criminal Defense', 'White Collar Crime'],
      education: 'Yale Law School, J.D.',
      barAdmissions: ['New York', 'Connecticut', 'U.S. Supreme Court'],
      experience: '28 years',
      awards: ['Criminal Justice Award', 'Trial Lawyer of the Year', 'Top 40 Under 40'],
      bio: 'Sarah is a former federal prosecutor who now uses her extensive trial experience to defend clients facing criminal charges. Her courtroom skills are unmatched.',
      cases: '3,500+ cases handled',
      image: 'SM',
    },
    {
      name: 'Michael Chen',
      title: 'Partner',
      specialties: ['Business Law', 'Corporate Litigation'],
      education: 'Stanford Law School, J.D., MBA',
      barAdmissions: ['New York', 'California', 'Delaware'],
      experience: '22 years',
      awards: ['Business Law Attorney of the Year', 'Rising Star Award', 'M&A Deal Maker'],
      bio: 'Michael advises businesses on complex legal matters ranging from formation to major transactions. His business acumen and legal expertise make him a trusted advisor.',
      cases: '1,000+ businesses served',
      image: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      title: 'Partner',
      specialties: ['Family Law', 'Estate Planning'],
      education: 'Columbia Law School, J.D.',
      barAdmissions: ['New York', 'Pennsylvania'],
      experience: '20 years',
      awards: ['Family Law Excellence Award', 'Compassionate Counsel Award', 'Top Women in Law'],
      bio: 'Emily provides compassionate yet strategic representation in family law matters. Her approach balances emotional sensitivity with aggressive advocacy for client interests.',
      cases: '2,500+ families helped',
      image: 'ER',
    },
    {
      name: 'David Thompson',
      title: 'Partner',
      specialties: ['Real Estate Law', 'Commercial Litigation'],
      education: 'NYU School of Law, J.D.',
      barAdmissions: ['New York', 'New Jersey'],
      experience: '18 years',
      awards: ['Real Estate Attorney of the Year', 'Legal Elite', 'Rising Star'],
      bio: 'David handles complex real estate transactions and disputes. His attention to detail and negotiation skills have saved clients millions in potential losses.',
      cases: '5,000+ transactions',
      image: 'DT',
    },
    {
      name: 'Jennifer Park',
      title: 'Senior Associate',
      specialties: ['Immigration Law', 'Employment Law'],
      education: 'Georgetown Law, J.D.',
      barAdmissions: ['New York', 'New Jersey'],
      experience: '15 years',
      awards: ['Immigration Advocate Award', 'Humanitarian Service Award', '40 Under 40'],
      bio: 'Jennifer is passionate about helping individuals and families navigate the immigration system. She also represents employees in workplace disputes.',
      cases: '2,000+ visas approved',
      image: 'JP',
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
          <h1 className="text-5xl font-bold mb-6">Meet Our Attorneys</h1>
          <p className="text-xl text-gray-300">
            Our team of experienced attorneys brings decades of combined legal expertise.
            Each attorney is committed to providing exceptional representation and achieving
            the best possible outcomes for our clients.
          </p>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>150+</div>
              <div className="text-sm text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>50+</div>
              <div className="text-sm text-gray-600">Legal Awards & Honors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>15+</div>
              <div className="text-sm text-gray-600">Bar Admissions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>10,000+</div>
              <div className="text-sm text-gray-600">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Profiles */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {attorneys.map((attorney, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Image Section */}
                  <div
                    className="p-8 flex flex-col items-center justify-center text-center"
                    style={{
                      background: `linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)`,
                      color: '#ffffff',
                    }}
                  >
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold mb-4"
                      style={{ backgroundColor: accentColor, color: '#16213e' }}
                    >
                      {attorney.image}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{attorney.name}</h3>
                    <p className="text-sm mb-4" style={{ color: accentColor }}>
                      {attorney.title}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{attorney.experience}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>{attorney.cases}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="lg:col-span-2 p-8">
                    <div className="mb-6">
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {attorney.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed">{attorney.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <GraduationCap className="w-5 h-5" style={{ color: accentColor }} />
                          <h4 className="font-bold text-sm" style={{ color: '#1a1a2e' }}>
                            Education
                          </h4>
                        </div>
                        <p className="text-sm text-gray-700 ml-7">{attorney.education}</p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Briefcase className="w-5 h-5" style={{ color: accentColor }} />
                          <h4 className="font-bold text-sm" style={{ color: '#1a1a2e' }}>
                            Bar Admissions
                          </h4>
                        </div>
                        <p className="text-sm text-gray-700 ml-7">
                          {attorney.barAdmissions.join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Award className="w-5 h-5" style={{ color: accentColor }} />
                        <h4 className="font-bold text-sm" style={{ color: '#1a1a2e' }}>
                          Awards & Recognition
                        </h4>
                      </div>
                      <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {attorney.awards.map((award, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span className="text-sm text-gray-700">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-6 py-3 rounded-lg font-bold transition-all hover:opacity-90"
                      style={{ backgroundColor: accentColor, color: '#16213e' }}
                    >
                      Schedule Consultation with {attorney.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Recognized Excellence
            </h2>
            <p className="text-xl text-gray-600">
              Our attorneys have been recognized by leading legal organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Super Lawyers',
              'Best Lawyers in America',
              'Million Dollar Advocates',
              'Top Trial Lawyers',
              'AV Rated Martindale',
              'Legal Elite',
              'Rising Stars',
              'Top Women in Law',
            ].map((recognition, index) => (
              <div
                key={index}
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <Award className="w-8 h-8 mx-auto mb-2" style={{ color: accentColor }} />
                <p className="text-sm font-medium" style={{ color: '#1a1a2e' }}>
                  {recognition}
                </p>
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
          <h2 className="text-4xl font-bold mb-6">Work With Our Expert Team</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get personalized attention from experienced attorneys who care about your case
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor, color: '#16213e' }}
          >
            Request Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
