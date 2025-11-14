import React from 'react';
import { Mail, Phone, Award, TrendingUp, Home, Star, MapPin, Linkedin, MessageSquare } from 'lucide-react';

const AgentsPage: React.FC = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Martinez',
      title: 'Senior Real Estate Agent',
      specialty: 'Luxury Homes & Waterfront Properties',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      email: 'sarah.martinez@skylinerealty.com',
      phone: '(555) 123-4501',
      experience: '12 years',
      propertiesSold: 185,
      volume: '$95M',
      rating: 4.9,
      bio: 'Specializing in luxury waterfront properties, Sarah brings over a decade of expertise in high-end real estate transactions.',
      languages: ['English', 'Spanish'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Principal Agent',
      specialty: 'Commercial & Investment Properties',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      email: 'michael.chen@skylinerealty.com',
      phone: '(555) 123-4502',
      experience: '15 years',
      propertiesSold: 220,
      volume: '$125M',
      rating: 5.0,
      bio: 'With extensive experience in commercial real estate, Michael excels at identifying profitable investment opportunities.',
      languages: ['English', 'Mandarin'],
    },
    {
      id: 3,
      name: 'Emily Thompson',
      title: 'Residential Specialist',
      specialty: 'First-Time Buyers & Family Homes',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      email: 'emily.thompson@skylinerealty.com',
      phone: '(555) 123-4503',
      experience: '8 years',
      propertiesSold: 142,
      volume: '$58M',
      rating: 4.8,
      bio: 'Emily is passionate about helping first-time buyers navigate the home buying process with confidence and ease.',
      languages: ['English', 'French'],
    },
    {
      id: 4,
      name: 'David Rodriguez',
      title: 'Luxury Property Consultant',
      specialty: 'High-End Estates & Penthouses',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      email: 'david.rodriguez@skylinerealty.com',
      phone: '(555) 123-4504',
      experience: '10 years',
      propertiesSold: 95,
      volume: '$78M',
      rating: 4.9,
      bio: 'David specializes in ultra-luxury properties and provides white-glove service to discerning clientele.',
      languages: ['English', 'Spanish', 'Italian'],
    },
    {
      id: 5,
      name: 'Jessica Park',
      title: 'Senior Agent',
      specialty: 'Downtown & Urban Living',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400',
      email: 'jessica.park@skylinerealty.com',
      phone: '(555) 123-4505',
      experience: '9 years',
      propertiesSold: 168,
      volume: '$72M',
      rating: 4.8,
      bio: 'Jessica is an expert in urban real estate, specializing in downtown condos and loft conversions.',
      languages: ['English', 'Korean'],
    },
    {
      id: 6,
      name: 'Robert Williams',
      title: 'Real Estate Agent',
      specialty: 'Suburban & Family Communities',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      email: 'robert.williams@skylinerealty.com',
      phone: '(555) 123-4506',
      experience: '7 years',
      propertiesSold: 128,
      volume: '$52M',
      rating: 4.7,
      bio: 'Robert helps families find their perfect home in top-rated school districts and safe neighborhoods.',
      languages: ['English'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Agents</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Our team of experienced real estate professionals is dedicated to helping you achieve your property goals.
            With extensive market knowledge and a client-first approach, we're here to guide you every step of the way.
          </p>
        </div>
      </div>

      {/* Team Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#000814] mb-2">938</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#000814] mb-2">$480M+</div>
              <div className="text-gray-600">Total Sales Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#000814] mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#000814] mb-2">61</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group"
            >
              {/* Agent Photo */}
              <div className="relative overflow-hidden h-80">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-[#ffc300] font-semibold">{agent.title}</p>
                </div>
                <div className="absolute top-4 right-4 bg-[#ffc300] text-[#000814] px-3 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="font-bold">{agent.rating}</span>
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6">
                {/* Specialty */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-1">Specialty</div>
                  <div className="text-[#000814] font-semibold">{agent.specialty}</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Home className="w-4 h-4 text-[#ffc300]" />
                    </div>
                    <div className="text-xl font-bold text-[#000814]">{agent.propertiesSold}</div>
                    <div className="text-xs text-gray-600">Sold</div>
                  </div>
                  <div className="text-center border-x">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-[#ffc300]" />
                    </div>
                    <div className="text-xl font-bold text-[#000814]">{agent.volume}</div>
                    <div className="text-xs text-gray-600">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-4 h-4 text-[#ffc300]" />
                    </div>
                    <div className="text-xl font-bold text-[#000814]">{agent.experience}</div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{agent.bio}</p>

                {/* Languages */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-600 mb-2">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${agent.email}`}
                    className="w-full flex items-center justify-center bg-[#000814] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Agent
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex-1 flex items-center justify-center bg-gray-100 text-[#000814] px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                    <button className="flex items-center justify-center bg-[#ffc300] text-[#000814] px-4 py-3 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Us?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Our agents are standing by to help you find your perfect property or sell your home for the best price.
          </p>
          <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors inline-flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
