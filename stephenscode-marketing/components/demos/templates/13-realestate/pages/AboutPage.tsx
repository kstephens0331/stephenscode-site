import React from 'react';
import { Award, Users, Home, TrendingUp, Target, Heart, Shield, Zap, CheckCircle, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Integrity First',
      description: 'We operate with complete transparency and honesty in every transaction, putting your trust above all else.',
      icon: Shield,
    },
    {
      title: 'Client-Centered',
      description: 'Your goals and satisfaction drive everything we do. We listen, understand, and deliver personalized solutions.',
      icon: Heart,
    },
    {
      title: 'Expert Knowledge',
      description: 'Our team stays at the forefront of market trends and real estate expertise to serve you better.',
      icon: Target,
    },
    {
      title: 'Results Driven',
      description: "We're committed to achieving exceptional outcomes, whether you're buying, selling, or investing.",
      icon: Zap,
    },
  ];

  const achievements = [
    { icon: Award, value: '50+', label: 'Industry Awards' },
    { icon: Home, value: '2,500+', label: 'Homes Sold' },
    { icon: Users, value: '5,000+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '$480M+', label: 'Sales Volume' },
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'Skyline Realty Group was founded with a vision to revolutionize real estate service in the region.',
    },
    {
      year: '2013',
      title: 'Expansion',
      description: 'Opened three new offices and doubled our agent team to better serve growing demand.',
    },
    {
      year: '2016',
      title: 'Innovation Leader',
      description: 'Launched cutting-edge virtual tour technology and comprehensive online buyer resources.',
    },
    {
      year: '2019',
      title: 'Market Leader',
      description: 'Became the #1 real estate agency in the region by sales volume and client satisfaction.',
    },
    {
      year: '2022',
      title: 'Luxury Division',
      description: 'Established dedicated luxury property division serving high-net-worth clientele.',
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Continuing to set industry standards with innovative services and exceptional results.',
    },
  ];

  const team = [
    {
      name: 'Jennifer Thompson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'With over 20 years in real estate, Jennifer founded Skyline with a mission to provide exceptional, client-focused service.',
    },
    {
      name: 'David Chen',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'David brings operational excellence and strategic vision, ensuring seamless experiences for all clients.',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Director of Sales',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Maria leads our sales team with passion and expertise, consistently achieving record-breaking results.',
    },
  ];

  const certifications = [
    'National Association of Realtors (NAR)',
    'Certified Residential Specialist (CRS)',
    'Accredited Buyer\'s Representative (ABR)',
    'Luxury Home Marketing Specialist',
    'Green Building Professional',
    'Senior Real Estate Specialist (SRES)',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Skyline Realty Group</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Leading the way in real estate excellence since 2010. We're more than just agents—
            we're your trusted partners in finding the perfect property.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#000814] mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2010, Skyline Realty Group began with a simple yet powerful mission: to transform
                  the real estate experience by putting clients first and delivering exceptional results.
                </p>
                <p>
                  What started as a small team of passionate agents has grown into the region's premier
                  real estate agency, known for our integrity, expertise, and unwavering commitment to client success.
                </p>
                <p>
                  Today, we're proud to have helped thousands of families find their dream homes and investors
                  build their portfolios. Our success is measured not just in transactions, but in the lasting
                  relationships we build and the trust our clients place in us.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Office"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#ffc300] p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-[#000814]">15+</div>
                <div className="text-[#000814] font-semibold">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#000814] rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#ffc300]" />
                  </div>
                  <div className="text-3xl font-bold text-[#000814] mb-2">{achievement.value}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#000814] mb-2 text-center">Our Core Values</h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#000814]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#000814] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#000814] mb-2 text-center">Our Journey</h2>
          <p className="text-gray-600 text-lg mb-12 text-center">
            Milestones that shaped our success
          </p>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#ffc300] hidden lg:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <div className="text-[#ffc300] font-bold text-sm mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-[#000814] mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="my-4 lg:my-0">
                    <div className="w-12 h-12 bg-[#000814] rounded-full border-4 border-[#ffc300] flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#ffc300] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#000814] mb-2 text-center">Leadership Team</h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Meet the visionaries driving our success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-80">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#ffc300] font-semibold">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Memberships */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#000814] mb-2 text-center">
            Certifications & Memberships
          </h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Our commitment to professional excellence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#ffc300] mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-16 h-16 text-[#ffc300] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Experience the Skyline Difference</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of satisfied clients who have trusted us with their real estate needs.
            Let's write your success story together.
          </p>
          <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
            Work With Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
