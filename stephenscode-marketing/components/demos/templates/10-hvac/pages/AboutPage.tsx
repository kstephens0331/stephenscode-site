import React from 'react';
import { Award, Users, Wrench, Shield, Heart, TrendingUp, CheckCircle, Target } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const stats = [
    { number: '29+', label: 'Years in Business', icon: Award },
    { number: '5,000+', label: 'Happy Customers', icon: Users },
    { number: '25+', label: 'Expert Technicians', icon: Wrench },
    { number: '4.9/5', label: 'Average Rating', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We believe in honest, transparent service. No upselling, no hidden fees - just straightforward solutions.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your comfort and satisfaction are our top priorities. We treat every home like our own.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards in workmanship, professionalism, and customer service.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay current with the latest HVAC technology to provide you with the most efficient solutions.',
    },
  ];

  const team = [
    {
      name: 'Mike Johnson',
      role: 'Master HVAC Technician',
      experience: '15 years',
      certifications: 'NATE Certified, EPA Universal',
    },
    {
      name: 'Sarah Williams',
      role: 'Lead Installation Specialist',
      experience: '12 years',
      certifications: 'NATE Certified, Heat Pump Expert',
    },
    {
      name: 'Tom Rodriguez',
      role: 'Commercial HVAC Manager',
      experience: '18 years',
      certifications: 'Master Electrician, HVAC Excellence',
    },
    {
      name: 'Lisa Chen',
      role: 'Service Manager',
      experience: '10 years',
      certifications: 'NATE Certified, Customer Service Excellence',
    },
  ];

  const certifications = [
    'NATE Certified Technicians',
    'EPA Certified',
    'Licensed & Bonded',
    'Insured & Guaranteed',
    'BBB A+ Rating',
    'Energy Star Partner',
  ];

  const milestones = [
    {
      year: '1995',
      title: 'Company Founded',
      description: 'Started as a small family business with one truck and a commitment to quality.',
    },
    {
      year: '2005',
      title: 'Major Expansion',
      description: 'Grew to 10 technicians and expanded service area to cover entire metro region.',
    },
    {
      year: '2015',
      title: 'Commercial Division',
      description: 'Launched commercial HVAC services, serving businesses and industrial clients.',
    },
    {
      year: '2020',
      title: '5,000th Customer',
      description: 'Celebrated milestone with enhanced service offerings and 24/7 emergency service.',
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Cool Breeze HVAC</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Family-owned and operated since 1995, providing honest, reliable HVAC services
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-[#f77f00] mx-auto mb-4" />
                <p className="text-5xl font-bold text-[#003049] mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#003049]">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Cool Breeze HVAC was founded in 1995 by James Mitchell, a master HVAC technician who believed that homeowners and businesses deserved honest, reliable heating and cooling services at fair prices.
                </p>
                <p>
                  What started as a one-man operation has grown into one of the region&apos;s most trusted HVAC companies, with over 25 expert technicians serving thousands of satisfied customers.
                </p>
                <p>
                  We&apos;ve stayed true to our founding principles: integrity in every interaction, excellence in every installation, and a commitment to keeping our customers comfortable year-round.
                </p>
                <p>
                  Today, we&apos;re proud to be a family-owned business serving families and businesses throughout the metro area, backed by the latest technology and decades of experience.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Company Timeline</h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="border-l-4 border-[#f77f00] pl-6">
                    <p className="text-[#f77f00] font-bold text-xl mb-1">{milestone.year}</p>
                    <h4 className="font-bold text-lg mb-2">{milestone.title}</h4>
                    <p className="text-white/80 text-sm">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#f77f00] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-[#003049] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#003049]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              Certified professionals dedicated to your comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-8 text-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                    <span className="text-4xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#f77f00] font-semibold">{member.role}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs font-semibold mb-1">EXPERIENCE</p>
                      <p className="text-[#003049] font-bold">{member.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-semibold mb-1">CERTIFICATIONS</p>
                      <p className="text-gray-700">{member.certifications}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              Certifications & Credentials
            </h2>
            <p className="text-xl text-gray-600">
              Fully licensed, certified, and committed to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#003049] to-[#004d73] p-6 rounded-xl shadow-lg text-center text-white"
              >
                <CheckCircle className="w-8 h-8 text-[#f77f00] mx-auto mb-3" />
                <p className="font-semibold text-sm">{cert}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="w-12 h-12 text-[#003049] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#003049]">Licensed & Bonded</h3>
                <p className="text-gray-600">State License #HVAC-12345</p>
              </div>
              <div>
                <Award className="w-12 h-12 text-[#f77f00] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#003049]">Award Winning</h3>
                <p className="text-gray-600">Best HVAC Company 2024</p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 text-[#003049] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#003049]">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">100% Money-Back Promise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Community Involvement</h2>
            <p className="text-xl text-gray-600">
              Proud to give back to the community that supports us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Heart className="w-12 h-12 text-[#d62828] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Local Charities</h3>
              <p className="text-gray-600">
                We donate a portion of profits to local homeless shelters and food banks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Users className="w-12 h-12 text-[#f77f00] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Veterans Program</h3>
              <p className="text-gray-600">
                Special discounts for veterans and active military families.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Award className="w-12 h-12 text-[#003049] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Trade Education</h3>
              <p className="text-gray-600">
                Partnering with local schools to train the next generation of HVAC professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#003049]">
            Experience the Cool Breeze Difference
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust us for their HVAC needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
            >
              Schedule Service
            </button>
            <button
              onClick={() => onNavigate('testimonials')}
              className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e07000] transition-all duration-300"
            >
              Read Customer Reviews
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
