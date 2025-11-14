import React from 'react';
import { Award, Users, Shield, Clock, CheckCircle, Star, ThumbsUp, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Honest pricing, transparent communication, and ethical business practices in everything we do.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for perfection in every job, using quality materials and expert craftsmanship.'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We treat your home like our own and your problems like ours.'
    },
    {
      icon: ThumbsUp,
      title: 'Reliability',
      description: 'Dependable service when you need it. We show up on time and get the job done right.'
    }
  ];

  const stats = [
    { number: '25+', label: 'Years in Business' },
    { number: '50,000+', label: 'Satisfied Customers' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '24/7', label: 'Emergency Service' }
  ];

  const team = [
    {
      name: 'Mike Johnson',
      role: 'Owner & Master Plumber',
      bio: '25 years of experience, licensed master plumber, dedicated to quality service.'
    },
    {
      name: 'Sarah Martinez',
      role: 'Service Manager',
      bio: '15 years in plumbing industry, ensuring every customer receives exceptional care.'
    },
    {
      name: 'Tom Bradley',
      role: 'Lead Technician',
      bio: 'Commercial and residential expert, specializing in complex repairs and installations.'
    },
    {
      name: 'Lisa Chen',
      role: 'Customer Service Director',
      bio: 'Committed to making every customer interaction positive and stress-free.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About Premier Plumbing Pros</h1>
            <p className="text-xl text-blue-100 mb-8">
              Since 1999, we've been the trusted choice for plumbing services in the greater metro area.
              Our commitment to quality, integrity, and customer satisfaction has made us a leader in
              residential and commercial plumbing.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-[#0466c8] mb-2">{stat.number}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Premier Plumbing Pros was founded in 1999 by Mike Johnson, a master plumber with a
                  vision to provide honest, reliable plumbing services to homeowners and businesses
                  in the metro area.
                </p>
                <p>
                  Starting with just a truck and a commitment to quality, Mike built the company on
                  the principles of integrity, excellence, and customer satisfaction. What began as
                  a one-person operation has grown into a full-service plumbing company with a team
                  of expert technicians.
                </p>
                <p>
                  Over the past 25 years, we've served more than 50,000 satisfied customers, earning
                  a reputation as the most trusted plumbing company in the region. We've stayed true
                  to our founding values while embracing new technology and techniques to serve you better.
                </p>
                <p>
                  Today, Premier Plumbing Pros continues to set the standard for plumbing excellence,
                  providing 24/7 emergency service, upfront pricing, and a 100% satisfaction guarantee
                  on every job we complete.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl text-blue-100 mb-8">
                To provide exceptional plumbing services with integrity, expertise, and a commitment
                to customer satisfaction that exceeds expectations every time.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <p>Deliver honest, transparent service with upfront pricing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <p>Use only quality materials and expert workmanship</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <p>Treat every customer with respect and professionalism</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                  <p>Stand behind our work with comprehensive guarantees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-[#0466c8] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Affiliations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certifications & Professional Affiliations
            </h2>
            <p className="text-xl text-gray-600">
              Committed to excellence through ongoing education and industry leadership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Award className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed Master Plumbers</h3>
              <p className="text-gray-600">
                All technicians are state-licensed with ongoing training and certification.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Shield className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fully Insured & Bonded</h3>
              <p className="text-gray-600">
                Comprehensive insurance coverage for your complete protection and peace of mind.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">BBB A+ Rated</h3>
              <p className="text-gray-600">
                Accredited business with the Better Business Bureau maintaining an A+ rating.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Users className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Member</h3>
              <p className="text-gray-600">
                Active member of Plumbing-Heating-Cooling Contractors Association (PHCC).
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Star className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Multiple "Best Plumber" awards from local publications and customer choice.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Clock className="h-16 w-16 text-[#0466c8] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">25+ Years Experience</h3>
              <p className="text-gray-600">
                Over two decades of serving the community with expert plumbing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#0466c8] to-[#023e7d] flex items-center justify-center">
                  <Users className="h-24 w-24 text-white/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#0466c8] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <Heart className="h-16 w-16 mb-6" />
              <h2 className="text-3xl font-bold mb-6">Community Involvement</h2>
              <p className="text-lg text-blue-100 mb-6">
                We believe in giving back to the community that has supported us for over 25 years.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Annual free plumbing services for local senior center</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Sponsor of youth sports teams and school programs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Partner with Habitat for Humanity on local builds</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Emergency services for families in need</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span>Environmental initiatives for water conservation</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Customers Choose Us</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Honest Pricing</h3>
                    <p className="text-gray-600">
                      Upfront pricing with no hidden fees. You'll know the cost before we start work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-[#0466c8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Service</h3>
                    <p className="text-gray-600">
                      Highly trained, licensed technicians with years of experience and ongoing training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Satisfaction Guarantee</h3>
                    <p className="text-gray-600">
                      We stand behind our work with a 100% satisfaction guarantee and comprehensive warranties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Premier Difference</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust us with their plumbing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
            <button
              onClick={() => onNavigate('reviews')}
              className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
            >
              Read Our Reviews
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
