import React, { useState } from 'react';
import {
  Snowflake,
  Flame,
  Wind,
  Factory,
  Wrench,
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Droplets,
  Gauge,
  Home
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState('residential');

  const residentialServices = [
    {
      icon: Snowflake,
      title: 'Air Conditioning Services',
      description: 'Complete AC solutions for your home',
      services: [
        { name: 'AC Repair & Diagnostics', price: 'From $89' },
        { name: 'New AC Installation', price: 'From $3,500' },
        { name: 'AC Replacement', price: 'From $3,200' },
        { name: 'Seasonal Tune-Up', price: '$129' },
        { name: 'Freon Recharge', price: 'From $275' },
        { name: 'Compressor Replacement', price: 'From $1,200' },
      ],
      warranty: '10-year parts, 1-year labor',
    },
    {
      icon: Flame,
      title: 'Heating Services',
      description: 'Keep your home warm and comfortable',
      services: [
        { name: 'Furnace Repair', price: 'From $99' },
        { name: 'Furnace Installation', price: 'From $2,800' },
        { name: 'Heat Pump Service', price: 'From $119' },
        { name: 'Boiler Repair', price: 'From $149' },
        { name: 'Emergency Heat Service', price: 'From $150' },
        { name: 'Heating System Replacement', price: 'From $3,000' },
      ],
      warranty: '10-year parts, 1-year labor',
    },
    {
      icon: Wind,
      title: 'Indoor Air Quality',
      description: 'Breathe cleaner, healthier air',
      services: [
        { name: 'Duct Cleaning', price: 'From $399' },
        { name: 'Air Purifier Installation', price: 'From $800' },
        { name: 'Humidifier Service', price: 'From $350' },
        { name: 'UV Light Installation', price: 'From $650' },
        { name: 'Air Quality Testing', price: '$149' },
        { name: 'Ventilation Improvement', price: 'From $500' },
      ],
      warranty: 'Varies by product',
    },
    {
      icon: Gauge,
      title: 'System Maintenance',
      description: 'Preventative care for optimal performance',
      services: [
        { name: 'Annual HVAC Inspection', price: '$99' },
        { name: 'Seasonal Tune-Up Package', price: '$159' },
        { name: 'Filter Replacement', price: '$45' },
        { name: 'Thermostat Calibration', price: '$75' },
        { name: 'Condensate Drain Cleaning', price: '$89' },
        { name: 'Safety Inspection', price: '$79' },
      ],
      warranty: 'Service guarantee',
    },
  ];

  const commercialServices = [
    {
      icon: Factory,
      title: 'Commercial HVAC',
      description: 'Complete solutions for businesses',
      services: [
        { name: 'Rooftop Unit Service', price: 'Custom Quote' },
        { name: 'VRF/VRV Systems', price: 'Custom Quote' },
        { name: 'Commercial Refrigeration', price: 'Custom Quote' },
        { name: 'Building Automation', price: 'Custom Quote' },
        { name: 'Preventative Maintenance', price: 'Custom Contract' },
        { name: 'Emergency Service Contract', price: 'Custom Contract' },
      ],
      warranty: 'Custom warranty packages',
    },
    {
      icon: Wrench,
      title: 'Industrial HVAC',
      description: 'Heavy-duty systems for industrial facilities',
      services: [
        { name: 'Process Cooling Systems', price: 'Custom Quote' },
        { name: 'Industrial Ventilation', price: 'Custom Quote' },
        { name: 'Warehouse Climate Control', price: 'Custom Quote' },
        { name: 'Manufacturing HVAC', price: 'Custom Quote' },
        { name: 'Air Handling Units', price: 'Custom Quote' },
        { name: 'Custom Fabrication', price: 'Custom Quote' },
      ],
      warranty: 'Extended warranty available',
    },
  ];

  const services = activeCategory === 'residential' ? residentialServices : commercialServices;

  const financing = [
    { feature: '0% APR for 12 months', icon: DollarSign },
    { feature: 'Flexible payment plans', icon: CheckCircle },
    { feature: 'Quick approval process', icon: Clock },
    { feature: 'Multiple financing options', icon: Shield },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our HVAC Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive heating, cooling, and air quality solutions for residential and commercial properties
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 py-4">
            <button
              onClick={() => setActiveCategory('residential')}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === 'residential'
                  ? 'bg-[#003049] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Residential Services
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === 'commercial'
                  ? 'bg-[#003049] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Factory className="w-5 h-5 mr-2" />
              Commercial Services
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#003049] to-[#004d73] p-6 text-white">
                  <div className="flex items-center mb-3">
                    <service.icon className="w-10 h-10 text-[#f77f00] mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-white/80 text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    {service.services.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#f77f00] mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-[#003049] font-bold text-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-[#f77f00] mr-2" />
                      <span className="font-semibold">Warranty:</span>
                      <span className="ml-1">{service.warranty}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-[#f77f00] text-white py-3 rounded-lg font-semibold hover:bg-[#e07000] transition-all duration-300"
                  >
                    Request Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-12 bg-[#d62828]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Emergency Service?</h2>
          <p className="text-white/90 mb-6 text-lg">
            We&apos;re available 24/7 for all HVAC emergencies
          </p>
          <button
            onClick={() => onNavigate('emergency')}
            className="bg-white text-[#d62828] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Get Emergency Help Now
          </button>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Flexible Financing Options</h2>
            <p className="text-xl text-gray-600">
              Don&apos;t let cost stand in the way of comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {financing.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md border-2 border-gray-100 text-center"
              >
                <item.icon className="w-12 h-12 text-[#f77f00] mx-auto mb-3" />
                <p className="font-semibold text-[#003049]">{item.feature}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Special Financing Available</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get the HVAC system you need today with our flexible payment options. Subject to credit approval.
            </p>
            <button
              onClick={() => onNavigate('financing')}
              className="bg-[#f77f00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e07000] transition-all duration-300"
            >
              Learn More About Financing
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Why Choose Cool Breeze HVAC?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#003049] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed, bonded, and insured technicians with extensive training and certifications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#f77f00] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Upfront Pricing</h3>
              <p className="text-gray-600">
                No hidden fees or surprise charges. You&apos;ll know the exact cost before we start any work.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[#d62828] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#003049]">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                We stand behind our work with a 100% satisfaction guarantee on all services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#003049]">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today for a free estimate on any HVAC service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
            >
              Get Free Estimate
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
