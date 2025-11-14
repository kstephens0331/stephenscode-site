import React, { useState } from 'react';
import { Search, Home, DollarSign, MapPin, Bed, Bath, Square, ArrowRight, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState('all');

  const featuredProperties = [
    {
      id: 1,
      title: 'Modern Downtown Penthouse',
      price: 1850000,
      location: 'Downtown District',
      beds: 3,
      baths: 3,
      sqft: 2400,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      type: 'sale',
      featured: true,
    },
    {
      id: 2,
      title: 'Luxury Waterfront Villa',
      price: 3200000,
      location: 'Coastal Heights',
      beds: 5,
      baths: 4,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
      type: 'sale',
      featured: true,
    },
    {
      id: 3,
      title: 'Contemporary Family Home',
      price: 975000,
      location: 'Suburban Valley',
      beds: 4,
      baths: 3,
      sqft: 3100,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      type: 'sale',
      featured: true,
    },
  ];

  const stats = [
    { label: 'Properties Sold', value: '2,500+', icon: Home },
    { label: 'Happy Clients', value: '5,000+', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Market Growth', value: '25%', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#000814] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600"
            alt="Luxury Home"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream Home with Skyline Realty
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience luxury living with our exclusive collection of premium properties.
              Your perfect home is just a search away.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-xl shadow-2xl p-6">
              {/* Search Type Tabs */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setSearchType('buy')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    searchType === 'buy'
                      ? 'bg-[#000814] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSearchType('rent')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    searchType === 'rent'
                      ? 'bg-[#000814] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rent
                </button>
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, neighborhood, or ZIP"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent text-gray-900"
                  >
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent text-gray-900">
                    <option>Any Price</option>
                    <option>$0 - $500,000</option>
                    <option>$500,000 - $1M</option>
                    <option>$1M - $2M</option>
                    <option>$2M+</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#000814]" />
                  </div>
                  <div className="text-3xl font-bold text-[#000814] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#000814] mb-4">Featured Listings</h2>
              <p className="text-gray-600 text-lg">
                Discover our handpicked selection of premium properties
              </p>
            </div>
            <button
              onClick={() => onNavigate('listings')}
              className="hidden md:flex items-center text-[#000814] font-semibold hover:text-[#001d3d] transition-colors"
            >
              View All Listings
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#ffc300] text-[#000814] px-4 py-2 rounded-full font-bold">
                    ${(property.price / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#000814] mb-2 group-hover:text-[#001d3d] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-gray-700">
                      <Bed className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{property.beds}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Bath className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{property.baths}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Square className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{property.sqft.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <button
              onClick={() => onNavigate('listings')}
              className="inline-flex items-center bg-[#000814] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              View All Listings
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#000814] mb-4">Why Choose Skyline Realty</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to providing exceptional service and finding you the perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-6">
                <Award className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-4">Expert Agents</h3>
              <p className="text-gray-600">
                Our experienced team of licensed agents provides personalized guidance throughout your real estate journey.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-6">
                <TrendingUp className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-4">Market Insights</h3>
              <p className="text-gray-600">
                Stay informed with our comprehensive market analysis and trend reports to make confident decisions.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-6">
                <Users className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-4">Client First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're dedicated to exceeding expectations at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#000814] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our expert agents guide you through every step of your real estate journey.
            Schedule a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors inline-flex items-center justify-center"
            >
              Schedule Consultation
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('agents')}
              className="bg-[#001d3d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#002855] transition-colors"
            >
              Meet Our Agents
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
