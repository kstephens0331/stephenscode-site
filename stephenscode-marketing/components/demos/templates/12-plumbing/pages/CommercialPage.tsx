import React, { useState } from 'react';
import { Building2, Factory, Store, School, Hotel, CheckCircle, Wrench, Clock, X } from 'lucide-react';

interface CommercialPageProps {
  onNavigate: (page: string) => void;
}

interface CaseStudy {
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  gradient: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Downtown Office Complex',
    summary: 'Complete replumbing of 5-story office building with minimal tenant disruption.',
    challenge:
      'A 40-year-old office building suffered recurring leaks from corroded galvanized supply lines, threatening tenant offices and server rooms on every floor.',
    solution:
      'We phased the repipe floor by floor, working nights and weekends. Temporary bypass lines kept water service running during business hours, and each zone was pressure-tested before reopening.',
    results: [
      'All 5 floors repiped in 6 weeks with zero business-hour shutdowns',
      'Water pressure improved by 30 percent building-wide',
      'No leak incidents reported since project completion',
      'Building insurance premium reduced after inspection'
    ],
    gradient: 'from-[#0466c8] to-[#0353a4]'
  },
  {
    title: 'Restaurant Chain Maintenance',
    summary: 'Ongoing preventive maintenance program for 12 local restaurant locations.',
    challenge:
      'A regional restaurant group was losing revenue to surprise drain backups and grease trap violations across 12 locations, with no consistent maintenance schedule.',
    solution:
      'We built a quarterly maintenance program: scheduled hydro-jetting, grease trap service with compliance documentation, and priority emergency coverage for every location.',
    results: [
      'Emergency drain calls reduced from 14 per year to 2',
      '100 percent pass rate on health department plumbing inspections',
      'Single monthly invoice covering all 12 locations',
      'Guaranteed 2-hour emergency response for member locations'
    ],
    gradient: 'from-[#0353a4] to-[#023e7d]'
  },
  {
    title: 'Medical Facility Upgrade',
    summary: 'Emergency water heater replacement with same-day service and compliance certification.',
    challenge:
      'An outpatient clinic lost its commercial water heater on a Friday morning. Without hot water, health regulations required the facility to cancel procedures.',
    solution:
      'Our team sourced a compliant commercial unit from our supplier network, removed the failed heater, and completed installation and certification the same day.',
    results: [
      'Hot water restored within 9 hours of the first call',
      'Zero patient appointments cancelled',
      'Installation certified to medical facility code requirements',
      'Facility enrolled in our preventive maintenance program'
    ],
    gradient: 'from-[#023e7d] to-[#0466c8]'
  }
];

const CommercialPage: React.FC<CommercialPageProps> = ({ onNavigate }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const industries = [
    {
      icon: Building2,
      title: 'Office Buildings',
      description: 'Comprehensive plumbing services for office complexes and corporate facilities.'
    },
    {
      icon: Store,
      title: 'Retail Stores',
      description: 'Fast, efficient service to minimize disruption to your business operations.'
    },
    {
      icon: Hotel,
      title: 'Hotels & Restaurants',
      description: 'Specialized plumbing solutions for hospitality and food service industries.'
    },
    {
      icon: School,
      title: 'Schools & Healthcare',
      description: 'Reliable service for educational and medical facilities with strict compliance.'
    },
    {
      icon: Factory,
      title: 'Industrial Facilities',
      description: 'Heavy-duty plumbing systems for manufacturing and warehouse operations.'
    },
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Ongoing maintenance and emergency service for multi-unit properties.'
    }
  ];

  const services = [
    'Preventive maintenance programs',
    'Emergency repair service',
    'Backflow prevention & testing',
    'Grease trap installation & service',
    'Commercial water heaters',
    'Sewer line video inspection',
    'Hydro-jetting services',
    'Bathroom & kitchen remodels',
    'ADA compliance upgrades',
    'Pipe insulation & winterization',
    'Gas line installation & repair',
    'Water filtration systems'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0353a4] to-[#023e7d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Commercial Plumbing Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional plumbing solutions for businesses of all sizes. Minimize downtime and maintain
              your operations with our expert commercial plumbing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Request Quote
              </button>
              <a
                href="tel:5557658237"
                className="bg-[#0466c8] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors inline-block text-center"
              >
                Call (555) 765-8237
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Commercial */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Professional service tailored to commercial needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-[#0466c8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Minimal Disruption</h3>
              <p className="text-gray-600">
                We work around your schedule, including after-hours and weekend service to keep your
                business running smoothly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-[#0466c8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Technicians</h3>
              <p className="text-gray-600">
                Our commercial plumbing specialists have extensive experience with complex commercial
                systems and code requirements.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-[#0466c8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Preventive Maintenance</h3>
              <p className="text-gray-600">
                Regular maintenance programs designed to prevent costly emergencies and extend the life
                of your plumbing systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">
              Specialized plumbing expertise across multiple commercial sectors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="bg-[#0466c8] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                  <p className="text-gray-600">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Commercial Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From routine maintenance to complex installations, we provide complete plumbing solutions
                for commercial properties of all types and sizes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0466c8] to-[#023e7d] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Maintenance Programs</h3>
              <p className="text-blue-100 mb-6">
                Protect your investment and prevent costly emergencies with our customized commercial
                maintenance programs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h4 className="font-bold text-lg mb-2">Scheduled Inspections</h4>
                  <p className="text-blue-100 text-sm">
                    Regular system checks to identify and address issues before they become problems.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h4 className="font-bold text-lg mb-2">Priority Service</h4>
                  <p className="text-blue-100 text-sm">
                    Jump the queue with priority scheduling for maintenance plan members.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h4 className="font-bold text-lg mb-2">Cost Savings</h4>
                  <p className="text-blue-100 text-sm">
                    Discounted rates on repairs and parts for program participants.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-white text-[#0466c8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Learn More About Maintenance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">24/7 Commercial Emergency Service</h2>
                <p className="text-xl text-red-100 mb-6">
                  Plumbing emergencies don't wait for business hours. Neither do we. Our commercial
                  emergency team is available around the clock to minimize damage and downtime.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Rapid response within 60 minutes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Fully stocked emergency vehicles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>No overtime or weekend charges</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>Direct billing options available</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
                <p className="text-lg mb-4">Emergency Hotline</p>
                <p className="text-5xl font-bold mb-6">(555) 765-8237</p>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="w-full bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Get Emergency Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery/Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Commercial Projects</h2>
            <p className="text-xl text-gray-600">
              See how we've helped businesses solve their plumbing challenges
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.title} className="bg-gray-50 rounded-xl overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${study.gradient}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.summary}</p>
                  <button
                    onClick={() => setActiveCaseStudy(study)}
                    className="text-[#0466c8] font-semibold hover:text-[#0353a4]"
                  >
                    Read Case Study →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#0466c8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner With Premier Plumbing Pros</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us handle your commercial plumbing needs so you can focus on your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#0466c8] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Request Commercial Quote
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#023e7d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#012a5c] transition-colors"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-br ${activeCaseStudy.gradient} p-6 text-white rounded-t-2xl`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-200 mb-2">
                    Commercial Case Study
                  </p>
                  <h3 className="text-2xl font-bold">{activeCaseStudy.title}</h3>
                </div>
                <button
                  onClick={() => setActiveCaseStudy(null)}
                  aria-label="Close case study"
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">The Challenge</h4>
                <p className="text-gray-600">{activeCaseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Our Solution</h4>
                <p className="text-gray-600">{activeCaseStudy.solution}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">The Results</h4>
                <ul className="space-y-2">
                  {activeCaseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  setActiveCaseStudy(null);
                  onNavigate('contact');
                }}
                className="w-full bg-[#0466c8] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Discuss a Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommercialPage;
