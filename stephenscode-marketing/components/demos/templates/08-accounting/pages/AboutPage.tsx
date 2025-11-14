import React from 'react';
import { Award, Users, TrendingUp, Shield, Target, Heart, Lightbulb, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const team = [
    {
      name: 'Robert Thompson',
      title: 'CPA, CFP - Managing Partner',
      experience: '25 years',
      specialties: ['Tax Planning', 'Business Advisory', 'Estate Planning'],
      bio: 'Robert founded Peak Financial in 1999 with a vision to provide comprehensive financial services with a personal touch. He specializes in complex tax strategies and business advisory services.',
      credentials: ['CPA', 'CFP', 'CFA'],
    },
    {
      name: 'Linda Martinez',
      title: 'CPA - Senior Tax Partner',
      experience: '18 years',
      specialties: ['Individual Taxation', 'IRS Representation', 'Tax Compliance'],
      bio: 'Linda brings nearly two decades of tax expertise, specializing in individual and small business taxation. She has successfully represented hundreds of clients in IRS matters.',
      credentials: ['CPA', 'Enrolled Agent'],
    },
    {
      name: 'David Chen',
      title: 'CFP - Wealth Management Director',
      experience: '15 years',
      specialties: ['Investment Management', 'Retirement Planning', 'Portfolio Strategy'],
      bio: 'David leads our wealth management division, helping clients build and preserve wealth through strategic investment planning and comprehensive retirement strategies.',
      credentials: ['CFP', 'CFA', 'Series 65'],
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with the highest ethical standards, always putting our clients\' interests first.',
    },
    {
      icon: Lightbulb,
      title: 'Expertise',
      description: 'Our team maintains cutting-edge knowledge through continuous education and professional development.',
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Every strategy is personalized to your unique situation, goals, and values.',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure success by the financial goals our clients achieve, not by metrics we achieve.',
    },
  ];

  const awards = [
    { year: '2024', award: 'Top Financial Advisor - Chicago Business Journal' },
    { year: '2023', award: 'Best CPA Firm - Illinois CPA Society' },
    { year: '2023', award: 'Five Star Wealth Manager - Chicago Magazine' },
    { year: '2022', award: 'Excellence in Tax Planning - AICPA' },
    { year: '2022', award: 'Client Choice Award - Wealth Management Today' },
  ];

  const milestones = [
    { year: '1999', event: 'Peak Financial Advisors founded in Chicago' },
    { year: '2005', event: 'Expanded to wealth management services' },
    { year: '2010', event: 'Reached $500M in assets under management' },
    { year: '2015', event: 'Opened second office, 500+ clients served' },
    { year: '2020', event: '$1B+ in assets under management' },
    { year: '2024', event: '25th Anniversary - 1,200+ clients, $2.5B+ AUM' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Peak Financial</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            For over 25 years, we've been helping individuals and businesses achieve financial success through expert guidance, personalized strategies, and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-8">
              <div className="w-16 h-16 bg-[#fca311] rounded-lg flex items-center justify-center mb-6">
                <Target className="text-[#14213d]" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To empower our clients with the knowledge, strategies, and support they need to achieve lasting financial success and peace of mind. We are committed to delivering exceptional service, innovative solutions, and measurable results.
              </p>
            </div>
            <div className="bg-[#fca311] text-[#14213d] rounded-xl p-8">
              <div className="w-16 h-16 bg-[#14213d] rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-[#fca311]" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-[#14213d] text-lg leading-relaxed">
                To be the most trusted financial advisory firm in the Midwest, recognized for our integrity, expertise, and the success of our clients. We strive to set the standard for excellence in financial services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-[#14213d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[#fca311]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#14213d] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </div>

          <div className="space-y-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 bg-[#14213d] rounded-lg flex items-center justify-center">
                      <Users className="text-[#fca311]" size={80} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#14213d] mb-1">{member.name}</h3>
                        <p className="text-lg text-[#fca311] font-semibold mb-2">{member.title}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {member.credentials.map((cred, idx) => (
                            <span key={idx} className="bg-[#14213d] text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {cred}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-[#fca311] text-[#14213d] px-4 py-2 rounded-lg font-bold">
                        {member.experience} Experience
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{member.bio}</p>
                    <div>
                      <p className="font-semibold text-[#14213d] mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-3">
                        {member.specialties.map((specialty, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="text-[#fca311]" size={18} />
                            <span className="text-gray-700">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Honored to be recognized for our commitment to excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-[#fca311] shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#fca311] text-[#14213d] rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {award.year}
                  </div>
                  <div>
                    <Award className="text-[#14213d] mb-2" size={24} />
                    <p className="text-gray-700 font-semibold">{award.award}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">25 years of growth and success</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-24 flex-shrink-0">
                  <div className="bg-[#fca311] text-[#14213d] font-bold text-lg px-4 py-2 rounded-lg text-center">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow bg-gray-50 rounded-xl p-6 border-l-4 border-[#14213d]">
                  <p className="text-gray-700 text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Family of Successful Clients</h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience the Peak Financial difference. Schedule your free consultation today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#fca311] text-[#14213d] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#e59400] transition-all hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
