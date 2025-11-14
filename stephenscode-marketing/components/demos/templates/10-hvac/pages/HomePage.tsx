import React from 'react';
import {
  Wind,
  Flame,
  Shield,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Snowflake,
  ThermometerSun,
  Wrench,
  Home,
  Building2,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Snowflake,
      title: 'Air Conditioning',
      description: 'Expert AC repair, installation, and maintenance',
      features: ['Repair & Service', 'New Installation', 'Replacement', 'Tune-ups'],
    },
    {
      icon: Flame,
      title: 'Heating Systems',
      description: 'Furnace and heating solutions for comfort',
      features: ['Furnace Repair', 'Heat Pump Service', 'Installation', 'Emergency Heat'],
    },
    {
      icon: Wind,
      title: 'Indoor Air Quality',
      description: 'Breathe easier with clean, healthy air',
      features: ['Air Purification', 'Humidity Control', 'Ventilation', 'Duct Cleaning'],
    },
    {
      icon: Building2,
      title: 'Commercial HVAC',
      description: 'Complete solutions for businesses',
      features: ['Rooftop Units', 'VRF Systems', 'Maintenance', 'Retrofits'],
    },
  ];

  const benefits = [
    { icon: Shield, text: 'Licensed & Insured Technicians' },
    { icon: Clock, text: '24/7 Emergency Service Available' },
    { icon: DollarSign, text: 'Upfront Pricing - No Hidden Fees' },
    { icon: Award, text: 'Satisfaction Guaranteed' },
    { icon: Star, text: '5000+ 5-Star Reviews' },
    { icon: CheckCircle, text: 'Same-Day Service Available' },
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      rating: 5,
      text: 'Our AC died during a heatwave and Cool Breeze came out within 2 hours! The technician was professional, fixed it quickly, and the price was fair. Highly recommend!',
      service: 'Emergency AC Repair',
    },
    {
      name: 'Robert Thompson',
      rating: 5,
      text: 'Just had a new HVAC system installed. The team was punctual, clean, and explained everything thoroughly. The financing options made it affordable. Best decision we made!',
      service: 'HVAC Installation',
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      text: 'Been using Cool Breeze for our annual maintenance for 3 years now. Always on time, thorough inspections, and they catch issues before they become expensive problems.',
      service: 'Maintenance Plan',
    },
  ];

  const maintenancePlans = [
    {
      name: 'Basic Care',
      price: '$149',
      period: 'per year',
      features: [
        '2 seasonal tune-ups',
        'Priority scheduling',
        '10% off repairs',
        'Safety inspection',
      ],
    },
    {
      name: 'Total Comfort',
      price: '$249',
      period: 'per year',
      popular: true,
      features: [
        '2 premium tune-ups',
        '15% off all repairs',
        'No overtime charges',
        'Priority emergency service',
        'Indoor air quality check',
      ],
    },
    {
      name: 'VIP Protection',
      price: '$399',
      period: 'per year',
      features: [
        '4 seasonal visits',
        '20% off all repairs',
        'Free filter changes',
        'Extended warranty coverage',
        'Duct inspection',
        '24/7 VIP support',
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003049] via-[#004d73] to-[#003049] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 animate-pulse">
            <Snowflake className="w-32 h-32" />
          </div>
          <div className="absolute bottom-20 right-20 animate-pulse delay-1000">
            <Flame className="w-40 h-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#d62828] text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                24/7 EMERGENCY SERVICE AVAILABLE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Comfort is Our Mission
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Expert HVAC services for homes and businesses. Licensed, insured, and committed to excellence since 1995.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e07000] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Service
                </button>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="bg-[#d62828] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#b11f1f] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Service
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Why Choose Cool Breeze?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <benefit.icon className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              Complete HVAC Solutions
            </h2>
            <p className="text-xl text-gray-600">
              From repairs to installations, we handle it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-[#f77f00] cursor-pointer group"
                onClick={() => onNavigate('services')}
              >
                <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-6 text-white">
                  <service.icon className="w-12 h-12 mb-3 text-[#f77f00]" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm">{service.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#f77f00] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-[#003049] font-semibold text-sm group-hover:text-[#f77f00] transition">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">
              Preventative Maintenance Plans
            </h2>
            <p className="text-xl text-gray-600">
              Save money and extend the life of your HVAC system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenancePlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#003049] to-[#004d73] text-white shadow-2xl transform scale-105 border-4 border-[#f77f00]'
                    : 'bg-white shadow-lg border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-[#f77f00] text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#003049]'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-[#f77f00]' : 'text-[#003049]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    {' '}{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                      <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.popular ? 'text-[#f77f00]' : 'text-[#003049]'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#f77f00] text-white hover:bg-[#e07000]'
                      : 'bg-[#003049] text-white hover:bg-[#004d73]'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">5000+ satisfied customers and counting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f77f00] text-[#f77f00]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#003049]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('testimonials')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300"
            >
              Read More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#d62828] to-[#b11f1f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ThermometerSun className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Need HVAC Service Today?</h2>
          <p className="text-xl text-white/90 mb-8">
            Don&apos;t wait until it&apos;s too late. Our expert technicians are ready to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:555-123-4567"
              className="bg-white text-[#d62828] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (555) 123-4567
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e07000] transition-all duration-300 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Online
            </button>
          </div>
        </div>
      </section>

      {/* Service Areas Quick Link */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#003049]">Serving Your Area</h2>
          <p className="text-lg text-gray-600 mb-6">
            We provide expert HVAC services throughout the greater metro area
          </p>
          <button
            onClick={() => onNavigate('service-areas')}
            className="bg-[#003049] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300"
          >
            Check Your Zip Code
          </button>
        </div>
      </section>
    </div>
  );
}
