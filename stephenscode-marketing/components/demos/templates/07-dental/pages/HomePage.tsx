import React from 'react';
import { Star, Shield, Clock, Award, ArrowRight, Sparkles, Users, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive dental care for the whole family',
      icon: '🦷'
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with advanced cosmetic treatments',
      icon: '✨'
    },
    {
      title: 'Dental Implants',
      description: 'Permanent solution for missing teeth',
      icon: '🔧'
    },
    {
      title: 'Emergency Care',
      description: 'Same-day appointments for dental emergencies',
      icon: '🚨'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-[#48cae4]" />,
      title: 'Insurance Accepted',
      description: 'We work with most major insurance providers'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#48cae4]" />,
      title: 'Flexible Hours',
      description: 'Evening and weekend appointments available'
    },
    {
      icon: <Award className="w-8 h-8 text-[#48cae4]" />,
      title: 'Award-Winning Care',
      description: 'Recognized for excellence in patient satisfaction'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#48cae4]" />,
      title: 'Latest Technology',
      description: 'Digital X-rays, laser dentistry & more'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      rating: 5,
      text: 'Best dental experience ever! The staff is incredibly friendly and Dr. Johnson made me feel completely at ease. My smile has never looked better!'
    },
    {
      name: 'Robert Thompson',
      rating: 5,
      text: 'I was terrified of the dentist, but Dr. Chen and the team completely changed my perspective. Painless procedures and amazing results!'
    },
    {
      name: 'Lisa Wong',
      rating: 5,
      text: 'My kids actually look forward to their dental visits! Dr. Rodriguez is wonderful with children and makes it a fun experience.'
    }
  ];

  const insuranceLogos = [
    'Delta Dental',
    'Cigna',
    'Aetna',
    'MetLife',
    'United Healthcare',
    'Blue Cross'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] via-[#0077b6] to-[#0096c7] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#48cae4] text-[#023e8a] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                New Patients Welcome - Special Offer Inside!
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Your Partner in <span className="text-[#48cae4]">Healthy, Beautiful Smiles</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Experience compassionate, comprehensive dental care with the latest technology and techniques.
                We're committed to making every visit comfortable and every smile brighter.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-[#48cae4] text-[#023e8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all shadow-lg flex items-center gap-2"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Our Services
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#48cae4]" />
                  <span className="font-semibold">5,000+ Happy Patients</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-[#48cae4] to-[#0077b6] rounded-xl flex items-center justify-center text-6xl">
                  😁
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#48cae4]">15+</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#48cae4]">3</div>
                    <div className="text-sm">Expert Dentists</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#48cae4]">24/7</div>
                    <div className="text-sm">Emergency Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Patient Special */}
      <section className="bg-gradient-to-r from-[#48cae4] to-[#0077b6] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <Sparkles className="w-8 h-8" />
              <div>
                <div className="font-bold text-xl">New Patient Special</div>
                <div className="text-sm">Comprehensive exam, cleaning & X-rays for just $99</div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-white text-[#023e8a] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-md"
            >
              Claim Offer Now
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Why Choose Bright Smile Dental?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with compassionate care to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#023e8a]/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#023e8a] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive dental care for every smile</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => onNavigate('services')}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#023e8a] mb-2 group-hover:text-[#0077b6] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-[#0077b6] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#023e8a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0077b6] transition-all shadow-md"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Technology */}
      <section className="py-16 bg-[#023e8a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">State-of-the-Art Technology</h2>
              <p className="text-xl mb-6 text-gray-200">
                We invest in the latest dental technology to provide you with the most comfortable,
                efficient, and effective care possible.
              </p>
              <ul className="space-y-4">
                {[
                  'Digital X-Rays (90% less radiation)',
                  'Intraoral Cameras for precise diagnosis',
                  'Laser Dentistry for painless procedures',
                  'CAD/CAM Same-Day Crowns',
                  'Digital Impressions (no messy molds)',
                  '3D Imaging for implant planning'
                ].map((tech, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-[#48cae4] flex-shrink-0" />
                    <span className="text-lg">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-[#48cae4] to-[#0077b6] rounded-xl flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-white" />
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => onNavigate('services')}
                  className="bg-[#48cae4] text-[#023e8a] px-6 py-3 rounded-lg font-bold hover:bg-white transition-all"
                >
                  Take a Virtual Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#023e8a] mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Join thousands of happy, smiling patients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-bold text-[#023e8a]">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#023e8a] mb-4">We Accept Most Insurance Plans</h2>
            <p className="text-gray-600">Flexible payment options and financing available</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {insuranceLogos.map((logo, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#023e8a]">{logo}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('patient-info')}
              className="text-[#0077b6] font-semibold hover:text-[#023e8a] transition-colors"
            >
              View All Accepted Insurance Plans →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Brighten Your Smile?</h2>
          <p className="text-xl mb-8">
            Schedule your appointment today and experience the difference exceptional dental care can make.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('booking')}
              className="bg-white text-[#023e8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Book Your Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#023e8a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#023e8a]/80 transition-all shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
