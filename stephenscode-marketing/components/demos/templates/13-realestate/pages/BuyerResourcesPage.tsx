import React, { useState } from 'react';
import { Calculator, FileText, CheckCircle, DollarSign, Home, TrendingUp, MapPin, Clock, Download, PlayCircle, BookOpen, Search } from 'lucide-react';

const BuyerResourcesPage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  };

  const monthlyPayment = calculateMortgage();

  const buyingProcess = [
    {
      step: 1,
      title: 'Get Pre-Approved',
      description: 'Meet with a lender to determine your budget and get pre-approved for a mortgage.',
      icon: FileText,
      time: '1-2 days',
    },
    {
      step: 2,
      title: 'Find Your Agent',
      description: 'Partner with one of our experienced agents to guide you through the process.',
      icon: Search,
      time: '1 day',
    },
    {
      step: 3,
      title: 'Search for Homes',
      description: 'Browse listings and tour properties that match your criteria and budget.',
      icon: Home,
      time: '2-8 weeks',
    },
    {
      step: 4,
      title: 'Make an Offer',
      description: 'Submit a competitive offer on your dream home with your agent\'s guidance.',
      icon: DollarSign,
      time: '1-3 days',
    },
    {
      step: 5,
      title: 'Home Inspection',
      description: 'Hire a professional inspector to evaluate the property\'s condition.',
      icon: CheckCircle,
      time: '1 week',
    },
    {
      step: 6,
      title: 'Close the Deal',
      description: 'Complete final paperwork, secure financing, and get the keys to your new home.',
      icon: TrendingUp,
      time: '30-45 days',
    },
  ];

  const resources = [
    {
      title: 'First-Time Buyer\'s Guide',
      description: 'Complete guide covering everything from budgeting to closing',
      type: 'PDF Guide',
      icon: BookOpen,
      pages: 28,
    },
    {
      title: 'Mortgage Pre-Approval Checklist',
      description: 'Documents and information you\'ll need for pre-approval',
      type: 'Checklist',
      icon: CheckCircle,
      pages: 2,
    },
    {
      title: 'Home Inspection Checklist',
      description: 'Know what to look for during your home inspection',
      type: 'Checklist',
      icon: FileText,
      pages: 5,
    },
    {
      title: 'Neighborhood Comparison Tool',
      description: 'Compare schools, amenities, and statistics across neighborhoods',
      type: 'Interactive Tool',
      icon: MapPin,
      pages: null,
    },
  ];

  const videos = [
    {
      title: 'Understanding Mortgage Options',
      duration: '12:30',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    },
    {
      title: 'What to Expect at Closing',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
    },
    {
      title: 'Home Buying Timeline',
      duration: '10:15',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Buyer Resources</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Everything you need to navigate the home buying process with confidence.
            From mortgage calculators to comprehensive guides, we've got you covered.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mortgage Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-[#ffc300] p-3 rounded-lg mr-4">
              <Calculator className="w-8 h-8 text-[#000814]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#000814]">Mortgage Calculator</h2>
              <p className="text-gray-600">Estimate your monthly payments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
                <input
                  type="range"
                  min="0"
                  max={loanAmount}
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="text-sm text-gray-600 mt-1">
                  {((downPayment / loanAmount) * 100).toFixed(1)}% down
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (years)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                >
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
            </div>

            {/* Calculator Results */}
            <div className="bg-[#000814] rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Monthly Payment</h3>
              <div className="text-5xl font-bold text-[#ffc300] mb-8">
                ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>

              <div className="space-y-4 border-t border-gray-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Amount</span>
                  <span className="font-semibold">
                    ${(loanAmount - downPayment).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Down Payment</span>
                  <span className="font-semibold">${downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest Rate</span>
                  <span className="font-semibold">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Term</span>
                  <span className="font-semibold">{loanTerm} years</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-700">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="font-semibold">
                    ${(monthlyPayment * loanTerm * 12).toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-[#ffc300] text-[#000814] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
                Get Pre-Approved
              </button>
            </div>
          </div>
        </div>

        {/* Buying Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-2">The Home Buying Process</h2>
          <p className="text-gray-600 text-lg mb-8">
            Follow these steps to make your home buying journey smooth and successful
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingProcess.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-[#ffc300] p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-[#000814]" />
                    </div>
                    <div className="text-3xl font-bold text-gray-200">
                      {step.step.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#000814] mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-2">Downloadable Resources</h2>
          <p className="text-gray-600 text-lg mb-8">
            Free guides, checklists, and tools to help you through the buying process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-start"
                >
                  <div className="bg-[#000814] p-3 rounded-lg mr-4 flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#ffc300]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">{resource.type}</div>
                    <h3 className="text-lg font-bold text-[#000814] mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <button className="flex items-center text-[#000814] font-semibold hover:text-[#001d3d] transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Download {resource.pages && `(${resource.pages} pages)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Resources */}
        <div>
          <h2 className="text-3xl font-bold text-[#000814] mb-2">Video Tutorials</h2>
          <p className="text-gray-600 text-lg mb-8">
            Watch our expert agents explain key concepts and processes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-[#ffc300] p-4 rounded-full group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-[#000814]" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#000814] group-hover:text-[#001d3d] transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Home Search?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Connect with one of our expert agents to begin your home buying journey today.
          </p>
          <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerResourcesPage;
