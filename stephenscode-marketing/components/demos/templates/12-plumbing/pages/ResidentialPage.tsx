import React from 'react';
import { Home, Droplet, Wrench, Thermometer, Workflow, Bath, CheckCircle } from 'lucide-react';

interface ResidentialPageProps {
  onNavigate: (page: string) => void;
}

const ResidentialPage: React.FC<ResidentialPageProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: Droplet,
      title: 'Drain Cleaning & Clearing',
      description: 'Professional drain cleaning for kitchen, bathroom, and main line blockages.',
      features: [
        'Video camera inspection',
        'Hydro-jetting available',
        'Root removal',
        'Preventive maintenance plans'
      ]
    },
    {
      icon: Wrench,
      title: 'Leak Detection & Repair',
      description: 'Advanced technology to locate and repair leaks quickly and efficiently.',
      features: [
        'Electronic leak detection',
        'Slab leak repair',
        'Pipe replacement',
        'Water damage prevention'
      ]
    },
    {
      icon: Thermometer,
      title: 'Water Heater Services',
      description: 'Complete water heater installation, repair, and maintenance services.',
      features: [
        'Tank & tankless options',
        'Energy-efficient models',
        'Same-day installation',
        'Annual maintenance'
      ]
    },
    {
      icon: Workflow,
      title: 'Pipe Repair & Repiping',
      description: 'Expert pipe repair and complete repiping for aging plumbing systems.',
      features: [
        'Copper & PEX piping',
        'Minimal disruption',
        'Whole-house repiping',
        'Leak-free guarantee'
      ]
    },
    {
      icon: Bath,
      title: 'Fixture Installation',
      description: 'Professional installation of faucets, toilets, sinks, and other fixtures.',
      features: [
        'All brands welcome',
        'Expert recommendations',
        'Water-saving options',
        'Warranty on labor'
      ]
    },
    {
      icon: Home,
      title: 'Sewer Line Services',
      description: 'Complete sewer line inspection, repair, and replacement solutions.',
      features: [
        'Camera inspection',
        'Trenchless repair options',
        'Root barrier installation',
        'City permit assistance'
      ]
    }
  ];

  const benefits = [
    'Upfront, honest pricing',
    'Same-day service available',
    'Licensed & insured technicians',
    '100% satisfaction guarantee',
    'Clean & professional service',
    'Warranty on all work'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0466c8] to-[#0353a4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Residential Plumbing Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive plumbing solutions for your home. From routine repairs to complete system
              replacements, we handle it all with expertise and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Schedule Service
              </button>
              <button
                onClick={() => onNavigate('coupons')}
                className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
              >
                View Coupons
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Home Plumbing Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Professional services to keep your home's plumbing running smoothly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-[#0466c8] p-4 rounded-lg flex-shrink-0">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 text-[#0466c8] font-semibold hover:text-[#0353a4] flex items-center space-x-2">
                    <span>Request This Service</span>
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

      {/* Common Issues Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Common Residential Plumbing Issues We Solve
              </h2>
              <div className="space-y-4">
                {[
                  'Slow or clogged drains',
                  'Dripping faucets and leaky pipes',
                  'Running or constantly filling toilets',
                  'Low water pressure',
                  'Water heater problems',
                  'Burst or frozen pipes',
                  'Sewer line backups',
                  'Garbage disposal issues',
                  'Sump pump failures',
                  'Gas line installations'
                ].map((issue, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-[#0466c8] rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Our Service Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Contact Us</h4>
                    <p className="text-blue-100">
                      Call or request service online. We'll schedule a convenient time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Diagnosis</h4>
                    <p className="text-blue-100">
                      Our technician inspects and diagnoses the issue thoroughly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Upfront Pricing</h4>
                    <p className="text-blue-100">
                      We provide clear pricing before starting any work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Expert Repair</h4>
                    <p className="text-blue-100">
                      Professional service with quality parts and workmanship.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Follow-Up</h4>
                    <p className="text-blue-100">
                      We ensure your complete satisfaction with our work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preventive Maintenance Plans
            </h2>
            <p className="text-xl text-gray-600">
              Save money and prevent emergencies with regular maintenance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <p className="text-4xl font-bold text-[#0466c8] mb-6">$99<span className="text-lg text-gray-600">/year</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Annual plumbing inspection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Water heater flush</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">10% off repairs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority scheduling</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                Select Plan
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-[#0466c8] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0466c8] text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium</h3>
              <p className="text-4xl font-bold text-[#0466c8] mb-6">$199<span className="text-lg text-gray-600">/year</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">2 annual inspections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Water heater maintenance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Drain cleaning service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">15% off all repairs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority emergency service</span>
                </li>
              </ul>
              <button className="w-full bg-[#0466c8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors">
                Select Plan
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete</h3>
              <p className="text-4xl font-bold text-[#0466c8] mb-6">$299<span className="text-lg text-gray-600">/year</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">4 seasonal inspections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete system maintenance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">2 drain cleaning services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">20% off all repairs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 priority service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Transferable warranty</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Solve Your Plumbing Issues?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for fast, reliable residential plumbing service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </button>
            <button className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors">
              Call (555) 765-8237
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResidentialPage;
