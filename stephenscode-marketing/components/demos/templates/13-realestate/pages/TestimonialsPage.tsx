import React, { useState } from 'react';
import { Star, Quote, ThumbsUp, Video, CheckCircle, Award, TrendingUp, Home } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael Johnson',
      type: 'buyer',
      rating: 5,
      agent: 'Sarah Martinez',
      date: 'October 2024',
      location: 'Coastal Heights',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
      text: 'Working with Skyline Realty was an absolute dream! Sarah Martinez went above and beyond to help us find our perfect waterfront home. Her knowledge of the market and negotiation skills saved us over $50,000. We couldn\'t be happier!',
      propertyType: 'Luxury Villa',
      video: true,
    },
    {
      id: 2,
      name: 'David Thompson',
      type: 'seller',
      rating: 5,
      agent: 'Michael Chen',
      date: 'September 2024',
      location: 'Downtown District',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      text: 'Michael helped us sell our downtown condo in just 8 days, and we received 5 offers! His marketing strategy and professional photography made all the difference. Highly recommend Skyline to anyone selling their property.',
      propertyType: 'Condo',
      video: false,
    },
    {
      id: 3,
      name: 'Jennifer & Mark Davis',
      type: 'buyer',
      rating: 5,
      agent: 'Emily Thompson',
      date: 'August 2024',
      location: 'Suburban Valley',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      text: 'As first-time homebuyers, we were nervous about the process. Emily made everything so easy to understand and was patient with all our questions. She found us the perfect family home in a great school district!',
      propertyType: 'Family Home',
      video: false,
    },
    {
      id: 4,
      name: 'Robert Martinez',
      type: 'investor',
      rating: 5,
      agent: 'David Rodriguez',
      date: 'July 2024',
      location: 'Heritage Hills',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      text: 'David\'s expertise in investment properties is unmatched. He helped me build a portfolio of 3 rental properties with excellent ROI. His market insights and professional network are invaluable.',
      propertyType: 'Investment Property',
      video: true,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      type: 'seller',
      rating: 5,
      agent: 'Jessica Park',
      date: 'June 2024',
      location: 'Arts District',
      image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400',
      text: 'Jessica\'s staging recommendations transformed my loft, and we sold for 8% over asking price! Her attention to detail and marketing expertise are exceptional. I\'ve already recommended her to three friends.',
      propertyType: 'Loft',
      video: false,
    },
    {
      id: 6,
      name: 'James & Patricia Wilson',
      type: 'buyer',
      rating: 5,
      agent: 'Robert Williams',
      date: 'May 2024',
      location: 'Mountain Ridge',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      text: 'After looking for 6 months with another agent, Robert found us our dream home in just 3 weeks! His knowledge of the Mountain Ridge area and dedication to his clients is outstanding.',
      propertyType: 'Mountain Home',
      video: true,
    },
  ];

  const stats = [
    {
      value: '4.9/5.0',
      label: 'Average Rating',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      icon: ThumbsUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      value: '1,250+',
      label: 'Five-Star Reviews',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      value: '85%',
      label: 'Repeat & Referral',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'buyer', label: 'Buyers' },
    { id: 'seller', label: 'Sellers' },
    { id: 'investor', label: 'Investors' },
  ];

  const filteredTestimonials =
    selectedFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.type === selectedFilter);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-[#ffc300] text-[#ffc300]' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Don't just take our word for it. Hear from the thousands of satisfied clients
            who have trusted Skyline Realty Group with their real estate needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-[#000814] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-[#000814] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#000814]">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
                    </div>
                  </div>
                  {testimonial.video && (
                    <div className="bg-[#ffc300] p-2 rounded-lg">
                      <Video className="w-5 h-5 text-[#000814]" />
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-4">{renderStars(testimonial.rating)}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Quote className="w-10 h-10 text-[#ffc300] mb-3" />
                <p className="text-gray-700 leading-relaxed mb-4">{testimonial.text}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {testimonial.propertyType}
                  </span>
                  <span className="px-3 py-1 bg-[#000814] text-white rounded-full text-sm">
                    Agent: {testimonial.agent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-8 text-center">
            Recognized for Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-4">
                <Award className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-2">Best Real Estate Agency</h3>
              <p className="text-gray-600">Regional Excellence Awards 2024</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-4">
                <Star className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-2">Top Customer Service</h3>
              <p className="text-gray-600">Industry Choice Awards 2024</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-4">
                <Home className="w-8 h-8 text-[#000814]" />
              </div>
              <h3 className="text-xl font-bold text-[#000814] mb-2">#1 in Sales Volume</h3>
              <p className="text-gray-600">Market Leader 2024</p>
            </div>
          </div>
        </div>

        {/* Video Testimonials Highlight */}
        <div className="bg-gradient-to-r from-[#000814] to-[#001d3d] rounded-xl shadow-lg p-8 text-white">
          <div className="text-center max-w-3xl mx-auto">
            <Video className="w-16 h-16 text-[#ffc300] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Watch Our Video Testimonials</h2>
            <p className="text-gray-300 text-lg mb-8">
              See and hear from real clients sharing their experiences working with Skyline Realty Group.
            </p>
            <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors inline-flex items-center">
              <Video className="w-5 h-5 mr-2" />
              View Video Gallery
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="w-16 h-16 text-[#ffc300] mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of satisfied clients who have achieved their real estate goals with Skyline Realty Group.
          </p>
          <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
