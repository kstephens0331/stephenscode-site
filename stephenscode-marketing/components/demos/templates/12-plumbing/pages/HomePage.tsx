import React from 'react';
import { Phone, CheckCircle, Clock, Shield, Star, Wrench, Droplet, Flame, AlertCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: Droplet,
      title: 'Drain Cleaning',
      description: 'Expert drain cleaning for all types of clogs and blockages.'
    },
    {
      icon: AlertCircle,
      title: 'Leak Detection',
      description: 'Advanced technology to find and fix hidden leaks quickly.'
    },
    {
      icon: Flame,
      title: 'Water Heaters',
      description: 'Installation, repair, and maintenance of all water heater types.'
    },
    {
      icon: Wrench,
      title: 'Pipe Repair',
      description: 'Expert pipe repair and replacement for lasting solutions.'
    },
    {
      icon: Clock,
      title: 'Emergency Service',
      description: '24/7 emergency plumbing service when you need it most.'
    },
    {
      icon: Shield,
      title: 'Sewer Lines',
      description: 'Complete sewer line inspection, repair, and replacement.'
    },
  ];

  const features = [
    'Licensed, Bonded & Insured',
    'Upfront Pricing',
    'Same-Day Service Available',
    '100% Satisfaction Guarantee',
    'No Overtime Charges',
    'Background-Checked Technicians'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0466c8] to-[#023e7d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">24/7 Emergency Service Available</span>
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Professional Plumbing Services You Can Trust
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Fast, reliable, and affordable plumbing solutions for residential and commercial properties.
                Same-day service available with upfront pricing guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-white text-[#0466c8] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Schedule Service
                </button>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Emergency? Call Now!</span>
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-100">4.9/5 from 500+ reviews</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Request Service</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <option>Select Service Type</option>
                    <option>Drain Cleaning</option>
                    <option>Leak Repair</option>
                    <option>Water Heater</option>
                    <option>Emergency Service</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Describe your plumbing issue"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Request Callback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Plumbing Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive plumbing solutions for homes and businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="bg-[#0466c8] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button className="text-[#0466c8] font-semibold hover:text-[#0353a4] flex items-center space-x-2">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Premier Plumbing Pros?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With over 25 years of experience serving the metro area, we've built our reputation
                on quality workmanship, honest pricing, and exceptional customer service.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                    <p className="text-gray-600">
                      Fully licensed, bonded, and insured for your protection and peace of mind.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#0466c8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
                    <p className="text-gray-600">
                      Emergency service available around the clock, every day of the year.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Satisfaction</h3>
                    <p className="text-gray-600">
                      100% satisfaction guarantee on all our work with thousands of 5-star reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Special Offer</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                <p className="text-4xl font-bold mb-2">$50 OFF</p>
                <p className="text-xl">Any Service Over $250</p>
                <p className="text-sm text-blue-200 mt-2">New customers only</p>
              </div>
              <button
                onClick={() => onNavigate('coupons')}
                className="w-full bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                View All Coupons
              </button>
              <p className="text-sm text-blue-200 mt-4 text-center">
                Cannot be combined with other offers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl text-gray-600">4.9/5 Average Rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                text: 'Called them for an emergency leak at 2 AM. They arrived within 30 minutes and had it fixed quickly. Professional and fair pricing!',
                rating: 5
              },
              {
                name: 'Mike Roberts',
                text: 'Excellent service! They replaced my water heater and explained everything clearly. Very knowledgeable and cleaned up perfectly.',
                rating: 5
              },
              {
                name: 'Emily Chen',
                text: 'Best plumbers in town! Fixed our drainage issues that other companies couldn\'t solve. Highly recommend for any plumbing needs.',
                rating: 5
              }
            ].map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('reviews')}
              className="text-[#0466c8] font-semibold hover:text-[#0353a4] text-lg"
            >
              Read More Reviews →
            </button>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-12 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Plumbing Emergency?</h2>
              <p className="text-xl text-red-100">
                We're available 24/7 for emergency service - No overtime charges!
              </p>
            </div>
            <button
              onClick={() => onNavigate('emergency')}
              className="mt-6 md:mt-0 bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Phone className="h-6 w-6" />
              <span>(555) 765-8237</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
