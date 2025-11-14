'use client';

import React, { useState } from 'react';
import { Star, Quote, ThumbsUp, Award, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export default function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      location: 'Oakwood Estates',
      service: 'Complete Backyard Redesign',
      rating: 5,
      date: 'March 2024',
      text: 'Green Valley transformed our overgrown backyard into an absolute paradise! The design team listened to our vision and created something even better than we imagined. The crew was professional, on time, and left everything spotless. We now spend every evening enjoying our new outdoor space.',
      image: 'SM',
      projectType: 'Landscape Design'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Riverside Drive',
      service: 'Patio & Fire Pit Installation',
      rating: 5,
      date: 'February 2024',
      text: 'Outstanding work on our patio and fire pit! The attention to detail was incredible. They handled a tricky slope issue with creative solutions, and the final result is stunning. Our friends are constantly asking who did the work. Worth every penny!',
      image: 'MC',
      projectType: 'Hardscaping'
    },
    {
      id: 3,
      name: 'Jennifer Rodriguez',
      location: 'Maple Street',
      service: 'Lawn Restoration',
      rating: 5,
      date: 'April 2024',
      text: 'We had almost given up on our lawn until we called Green Valley. They assessed the soil, implemented a treatment plan, and within two months our lawn was thick and green. Their ongoing maintenance keeps it looking perfect. Highly recommended!',
      image: 'JR',
      projectType: 'Lawn Care'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'Willow Creek',
      service: 'Front Yard Makeover',
      rating: 5,
      date: 'May 2024',
      text: 'The curb appeal transformation is amazing! Our home value increased significantly thanks to the beautiful landscaping. The team was incredibly knowledgeable about plant selection and created a low-maintenance design perfect for our busy lifestyle.',
      image: 'DT',
      projectType: 'Landscape Design'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      location: 'Garden Hills',
      service: 'Smart Irrigation System',
      rating: 5,
      date: 'March 2024',
      text: 'The smart irrigation system has been a game-changer! Our water bill dropped by 30% while our landscape looks better than ever. The WiFi controls make it so easy to manage, and the team explained everything clearly. Excellent investment!',
      image: 'LA',
      projectType: 'Irrigation'
    },
    {
      id: 6,
      name: 'Robert Williams',
      location: 'Highland Park',
      service: 'Retaining Wall & Walkway',
      rating: 5,
      date: 'January 2024',
      text: 'Dealing with our sloped property was challenging until Green Valley came in. Their engineering and design skills created beautiful terraced levels with a stunning retaining wall. The craftsmanship is top-notch, and it solved our drainage issues completely.',
      image: 'RW',
      projectType: 'Hardscaping'
    },
    {
      id: 7,
      name: 'Emily Parker',
      location: 'Cedar Lane',
      service: 'Seasonal Maintenance',
      rating: 5,
      date: 'April 2024',
      text: 'We\'ve used their seasonal maintenance for two years now, and our property has never looked better. They\'re reliable, thorough, and always go above and beyond. The spring cleanup was especially impressive - they made our yard shine!',
      image: 'EP',
      projectType: 'Seasonal Service'
    },
    {
      id: 8,
      name: 'James Martin',
      location: 'Forest View',
      service: 'Shade Garden Installation',
      rating: 5,
      date: 'May 2024',
      text: 'Our shaded area was basically dirt until Green Valley designed a beautiful shade garden. They selected perfect plants that thrive in our conditions, and the layout is gorgeous. Their plant knowledge is exceptional!',
      image: 'JM',
      projectType: 'Landscape Design'
    },
    {
      id: 9,
      name: 'Amanda Taylor',
      location: 'Summit Ridge',
      service: 'Outdoor Kitchen',
      rating: 5,
      date: 'February 2024',
      text: 'The outdoor kitchen exceeded all expectations! We now entertain outdoors year-round. The quality of materials and installation is outstanding. The team coordinated everything perfectly and stayed within budget. Love it!',
      image: 'AT',
      projectType: 'Hardscaping'
    },
    {
      id: 10,
      name: 'Christopher Lee',
      location: 'Meadowbrook',
      service: 'Lawn Care Program',
      rating: 5,
      date: 'June 2024',
      text: 'Best lawn care service we\'ve ever used! They take pride in their work and it shows. Our lawn is the envy of the neighborhood. The crews are friendly, professional, and consistent. We\'re customers for life!',
      image: 'CL',
      projectType: 'Lawn Care'
    }
  ];

  const stats = [
    { icon: <Star />, value: '4.9/5', label: 'Average Rating' },
    { icon: <Users />, value: '500+', label: 'Happy Customers' },
    { icon: <ThumbsUp />, value: '98%', label: 'Satisfaction Rate' },
    { icon: <Award />, value: '15+', label: 'Years Experience' }
  ];

  const videoTestimonials = [
    {
      name: 'The Johnson Family',
      project: 'Complete Landscape Transformation',
      duration: '2:34',
      thumbnail: 'JF'
    },
    {
      name: 'Mark & Susan Davis',
      project: 'Outdoor Living Space',
      duration: '1:52',
      thumbnail: 'MD'
    },
    {
      name: 'Patricia Hughes',
      project: 'Front Yard Redesign',
      duration: '2:15',
      thumbnail: 'PH'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#386641] to-[#6a994e] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Customer Testimonials
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              Don't just take our word for it. Hear from homeowners who've experienced the Green Valley difference.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-[#a7c957] rounded-full flex items-center justify-center mx-auto mb-3">
                    {React.cloneElement(stat.icon, { className: 'h-6 w-6 text-[#386641]' })}
                  </div>
                  <div className="text-3xl font-bold text-[#a7c957] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-5">
                {/* Customer Photo */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#386641] to-[#6a994e] p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-[#a7c957] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-bold text-[#386641]">
                        {testimonials[currentTestimonial].image}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-[#a7c957] mb-4">{testimonials[currentTestimonial].location}</p>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#a7c957] fill-[#a7c957]" />
                      ))}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                      <span className="text-sm text-white">{testimonials[currentTestimonial].projectType}</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:col-span-3 p-8 md:p-12">
                  <Quote className="h-12 w-12 text-[#a7c957] mb-6" />

                  <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <div className="font-semibold text-[#386641]">
                        {testimonials[currentTestimonial].service}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[currentTestimonial].date}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 bg-[#386641] text-white rounded-full flex items-center justify-center hover:bg-[#6a994e] transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 bg-[#386641] text-white rounded-full flex items-center justify-center hover:bg-[#6a994e] transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'w-8 bg-[#386641]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
              More Reviews
            </div>
            <h2 className="text-4xl font-bold text-[#386641] mb-4">
              Hear From More Happy Customers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-stone-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#a7c957]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-white">{testimonial.image}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#386641]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-[#a7c957] fill-[#a7c957]" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 italic line-clamp-4">
                  "{testimonial.text}"
                </p>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6a994e]">
                    {testimonial.projectType}
                  </span>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#a7c957]/20 text-[#386641] px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Video Testimonials
            </div>
            <h2 className="text-4xl font-bold text-[#386641] mb-4">
              See Customer Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch homeowners share their experience working with Green Valley
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-[#386641] to-[#6a994e] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{video.thumbnail}</span>
                    </div>
                    <div className="w-16 h-16 bg-[#a7c957] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-[#386641] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#386641] mb-2">{video.name}</h3>
                  <p className="text-sm text-gray-600">{video.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-10 w-10 text-[#a7c957]" />
                </div>
                <h3 className="text-2xl font-bold text-[#386641] mb-2">Award-Winning</h3>
                <p className="text-gray-600">
                  Recognized as Best Landscaping Company 2022-2024
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-[#a7c957]" />
                </div>
                <h3 className="text-2xl font-bold text-[#386641] mb-2">Growing Strong</h3>
                <p className="text-gray-600">
                  2,500+ successful projects and counting
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#386641] to-[#6a994e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-10 w-10 text-[#a7c957]" />
                </div>
                <h3 className="text-2xl font-bold text-[#386641] mb-2">98% Satisfaction</h3>
                <p className="text-gray-600">
                  Nearly all customers would recommend us
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#386641] to-[#6a994e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Happy Customers
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the same quality service and results. Get your free estimate today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#a7c957] text-[#386641] px-10 py-5 rounded-lg font-bold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
          >
            Get Free Estimate
          </button>
        </div>
      </section>
    </div>
  );
}
