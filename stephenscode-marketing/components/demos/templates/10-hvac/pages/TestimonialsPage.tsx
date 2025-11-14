import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Quote } from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export default function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      location: 'Downtown',
      rating: 5,
      service: 'Emergency AC Repair',
      category: 'emergency',
      text: 'Our AC died during a heatwave and Cool Breeze came out within 2 hours! The technician, Mike, was incredibly professional, diagnosed the issue quickly, and had us cool again in no time. The price was very fair considering it was an emergency call. Highly recommend!',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Robert Thompson',
      location: 'North County',
      rating: 5,
      service: 'HVAC System Installation',
      category: 'installation',
      text: 'Just had a complete HVAC system installed and I couldn\'t be happier. The team was punctual, clean, and explained everything thoroughly. They offered multiple financing options which made it very affordable. The new system is incredibly efficient and quiet. Best investment we\'ve made in our home!',
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'Sarah Chen',
      location: 'East Valley',
      rating: 5,
      service: 'Annual Maintenance',
      category: 'maintenance',
      text: 'Been using Cool Breeze for our annual maintenance for 3 years now. They\'re always on time, do thorough inspections, and catch issues before they become expensive problems. Their maintenance plan is worth every penny. Tom is our regular tech and he\'s fantastic!',
      date: '3 weeks ago',
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'South County',
      rating: 5,
      service: 'Furnace Replacement',
      category: 'installation',
      text: 'Our old furnace finally gave out after 20 years. Cool Breeze provided a detailed quote, explained all our options, and installed a new high-efficiency furnace in one day. The difference in our heating bills has been amazing. Professional service from start to finish!',
      date: '1 week ago',
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      location: 'West Valley',
      rating: 5,
      service: 'Duct Cleaning',
      category: 'air-quality',
      text: 'Had our ducts cleaned and was shocked at how much dust and debris they removed. The air quality in our home has improved dramatically. My son\'s allergies have been much better since the cleaning. The technicians were courteous and left everything spotless.',
      date: '2 months ago',
    },
    {
      id: 6,
      name: 'Michael Brown',
      location: 'Downtown',
      rating: 5,
      service: 'Commercial HVAC Service',
      category: 'commercial',
      text: 'We use Cool Breeze for all our commercial properties. They handle everything from routine maintenance to emergency repairs. Their response time is excellent and they always have the parts needed. Great team to work with for property management.',
      date: '2 weeks ago',
    },
    {
      id: 7,
      name: 'Lisa Anderson',
      location: 'Suburban Area',
      rating: 5,
      service: 'AC Tune-Up',
      category: 'maintenance',
      text: 'Scheduled a pre-summer AC tune-up and they found a refrigerant leak that could have caused a major breakdown. Fixed it on the spot and charged a very reasonable price. Their preventative maintenance has saved me from expensive emergency repairs!',
      date: '1 month ago',
    },
    {
      id: 8,
      name: 'James Taylor',
      location: 'North County',
      rating: 5,
      service: 'Heat Pump Installation',
      category: 'installation',
      text: 'Switched from a traditional HVAC system to a heat pump. Cool Breeze handled the entire installation professionally. They educated us on how to use it efficiently and the energy savings have been substantial. Couldn\'t ask for better service!',
      date: '3 weeks ago',
    },
    {
      id: 9,
      name: 'Karen White',
      location: 'East Valley',
      rating: 5,
      service: 'Emergency Heating Repair',
      category: 'emergency',
      text: 'Heater went out on the coldest night of the year. Called Cool Breeze emergency line at 11 PM and they had someone here by midnight! Fixed the problem and we were warm again before 2 AM. Worth every penny for the peace of mind.',
      date: '4 months ago',
    },
    {
      id: 10,
      name: 'Thomas Garcia',
      location: 'South County',
      rating: 5,
      service: 'Indoor Air Quality',
      category: 'air-quality',
      text: 'Had whole-home air purification system installed. The difference is night and day! No more dust on furniture and everyone in the family is breathing easier. The installation was clean and professional. Great investment!',
      date: '2 months ago',
    },
    {
      id: 11,
      name: 'Patricia Lee',
      location: 'West Valley',
      rating: 5,
      service: 'AC Repair',
      category: 'repair',
      text: 'AC was making strange noises and not cooling well. Tech arrived on time, diagnosed a failing compressor, and gave me options for repair vs replacement. Appreciated the honest advice. They repaired it and it\'s been running great for 6 months now.',
      date: '6 months ago',
    },
    {
      id: 12,
      name: 'Christopher Davis',
      location: 'Downtown',
      rating: 5,
      service: 'Thermostat Installation',
      category: 'repair',
      text: 'Upgraded to a smart thermostat. Cool Breeze installed it perfectly and showed me how to program it for maximum efficiency. My energy bills have already dropped 20%. Small upgrade, big impact!',
      date: '3 weeks ago',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'emergency', label: 'Emergency Service' },
    { id: 'installation', label: 'Installations' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'repair', label: 'Repairs' },
    { id: 'air-quality', label: 'Air Quality' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === filter);

  const stats = [
    { label: 'Average Rating', value: '4.9/5', icon: Star },
    { label: 'Total Reviews', value: '5,000+', icon: ThumbsUp },
    { label: 'Satisfaction Rate', value: '99%', icon: CheckCircle },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Real reviews from real customers - see why thousands trust Cool Breeze HVAC
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-[#f77f00] mx-auto mb-4" />
                <p className="text-5xl font-bold text-[#003049] mb-2">{stat.value}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-gray-50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-[#003049] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#003049] to-[#004d73] p-6 text-white">
                  <Quote className="w-10 h-10 text-[#f77f00] mb-3" />
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#f77f00] text-[#f77f00]" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                  <p className="text-white/70 text-sm">{testimonial.location}</p>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-[#f77f00] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {testimonial.service}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No reviews found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Customers Choose Us</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg">Honest, transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg">Licensed, certified, and insured technicians</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg">24/7 emergency service availability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg">100% satisfaction guarantee on all work</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg">Same-day service available in most areas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
                <ThumbsUp className="w-16 h-16 text-[#f77f00] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Join Our Happy Customers</h3>
                <p className="text-white/90 mb-6">
                  Experience the Cool Breeze difference for yourself
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-[#f77f00] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#e07000] transition-all duration-300"
                >
                  Schedule Your Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Find Us On</h2>
            <p className="text-xl text-gray-600">
              See what customers are saying across multiple platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Google Reviews', 'Yelp', 'Facebook', 'BBB'].map((platform, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <Star className="w-12 h-12 text-[#f77f00] mx-auto mb-3" />
                <p className="font-bold text-[#003049] mb-1">{platform}</p>
                <p className="text-3xl font-bold text-[#003049]">4.9/5</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#003049]">
            Ready to Experience 5-Star Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust Cool Breeze HVAC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
            >
              Schedule Service
            </button>
            <a
              href="tel:555-123-4567"
              className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e07000] transition-all duration-300"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
