import React, { useState } from 'react';
import { Home, DollarSign, Camera, TrendingUp, FileText, Users, CheckCircle, ArrowRight, Calculator, Clock, Star, Zap } from 'lucide-react';

const SellerResourcesPage: React.FC = () => {
  const [homeValue, setHomeValue] = useState(750000);
  const [commission, setCommission] = useState(6);
  const [closingCosts, setClosingCosts] = useState(2);

  const calculateProceeds = () => {
    const commissionAmount = (homeValue * commission) / 100;
    const closingAmount = (homeValue * closingCosts) / 100;
    return homeValue - commissionAmount - closingAmount;
  };

  const netProceeds = calculateProceeds();

  const sellingSteps = [
    {
      step: 1,
      title: 'Property Valuation',
      description: 'Get a professional comparative market analysis to determine your home\'s value.',
      icon: Calculator,
      duration: '1-2 days',
    },
    {
      step: 2,
      title: 'Prepare Your Home',
      description: 'Make necessary repairs, stage, and enhance curb appeal for maximum value.',
      icon: Home,
      duration: '2-4 weeks',
    },
    {
      step: 3,
      title: 'Professional Photography',
      description: 'Showcase your home with high-quality photos and virtual tours.',
      icon: Camera,
      duration: '1 day',
    },
    {
      step: 4,
      title: 'List & Market',
      description: 'Launch your listing with comprehensive marketing across all channels.',
      icon: TrendingUp,
      duration: '1 day',
    },
    {
      step: 5,
      title: 'Show & Negotiate',
      description: 'Host showings and negotiate offers to get the best price.',
      icon: Users,
      duration: '2-6 weeks',
    },
    {
      step: 6,
      title: 'Close the Sale',
      description: 'Complete inspections, appraisals, and finalize the transaction.',
      icon: CheckCircle,
      duration: '30-45 days',
    },
  ];

  const services = [
    {
      title: 'Free Home Valuation',
      description: 'Get an accurate estimate of your home\'s current market value with our comprehensive CMA.',
      icon: Calculator,
      features: [
        'Comparative Market Analysis',
        'Recent Sales Data',
        'Market Trend Analysis',
        'Property-Specific Factors',
      ],
    },
    {
      title: 'Professional Staging',
      description: 'Our expert stagers will optimize your home\'s appeal to potential buyers.',
      icon: Home,
      features: [
        'Furniture Placement',
        'Decor Selection',
        'Room-by-Room Planning',
        'Virtual Staging Options',
      ],
    },
    {
      title: 'Premium Photography',
      description: 'Showcase your property with professional photos, videos, and 3D virtual tours.',
      icon: Camera,
      features: [
        'Professional Photos',
        '4K Video Walkthrough',
        '3D Virtual Tour',
        'Drone Aerial Shots',
      ],
    },
    {
      title: 'Marketing Strategy',
      description: 'Comprehensive marketing plan to reach qualified buyers across all channels.',
      icon: TrendingUp,
      features: [
        'MLS Listing',
        'Social Media Promotion',
        'Email Marketing',
        'Print Materials',
      ],
    },
  ];

  const tips = [
    {
      title: 'Boost Curb Appeal',
      description: 'First impressions matter. Enhance landscaping, paint the front door, and ensure the exterior is pristine.',
      icon: Home,
    },
    {
      title: 'Declutter & Depersonalize',
      description: 'Remove personal items and excess clutter to help buyers envision themselves in the space.',
      icon: CheckCircle,
    },
    {
      title: 'Make Key Repairs',
      description: 'Fix obvious issues like leaky faucets, cracked tiles, and damaged fixtures before listing.',
      icon: FileText,
    },
    {
      title: 'Price It Right',
      description: 'Work with your agent to set a competitive price based on market data and comparable sales.',
      icon: DollarSign,
    },
    {
      title: 'Stage for Success',
      description: 'Arrange furniture to maximize space and create an inviting atmosphere for buyers.',
      icon: Star,
    },
    {
      title: 'Be Flexible with Showings',
      description: 'Make your home available for showings, especially during peak times and weekends.',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Seller Resources</h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Maximize your home's value with our comprehensive selling resources and expert guidance.
            From pricing strategies to closing tips, we'll help you sell for top dollar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Home Sale Calculator */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-[#ffc300] p-3 rounded-lg mr-4">
              <Calculator className="w-8 h-8 text-[#000814]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#000814]">Home Sale Calculator</h2>
              <p className="text-gray-600">Estimate your net proceeds from the sale</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Sale Price
                </label>
                <input
                  type="number"
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={commission}
                  onChange={(e) => setCommission(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
                <div className="text-sm text-gray-600 mt-1">
                  ${((homeValue * commission) / 100).toLocaleString()} commission
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Costs (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={closingCosts}
                  onChange={(e) => setClosingCosts(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
                />
                <div className="text-sm text-gray-600 mt-1">
                  ${((homeValue * closingCosts) / 100).toLocaleString()} closing costs
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  This calculator provides an estimate only. Actual proceeds may vary based on specific circumstances,
                  repairs, and negotiations.
                </p>
              </div>
            </div>

            {/* Calculator Results */}
            <div className="bg-[#000814] rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Estimated Net Proceeds</h3>
              <div className="text-5xl font-bold text-[#ffc300] mb-8">
                ${netProceeds.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>

              <div className="space-y-4 border-t border-gray-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sale Price</span>
                  <span className="font-semibold">${homeValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Commission ({commission}%)</span>
                  <span>-${((homeValue * commission) / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Closing Costs ({closingCosts}%)</span>
                  <span>-${((homeValue * closingCosts) / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-700 text-[#ffc300] text-xl font-bold">
                  <span>Net Proceeds</span>
                  <span>${netProceeds.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-[#ffc300] text-[#000814] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors">
                Get Free Home Valuation
              </button>
            </div>
          </div>
        </div>

        {/* Selling Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-2">The Home Selling Process</h2>
          <p className="text-gray-600 text-lg mb-8">
            Follow these steps to ensure a successful and profitable home sale
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellingSteps.map((step) => {
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
                    {step.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#000814] mb-2">Our Seller Services</h2>
          <p className="text-gray-600 text-lg mb-8">
            Comprehensive services designed to maximize your home's value and streamline the selling process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-[#000814] p-3 rounded-lg mr-4">
                      <Icon className="w-6 h-6 text-[#ffc300]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#000814] mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#ffc300] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selling Tips */}
        <div>
          <h2 className="text-3xl font-bold text-[#000814] mb-2">Expert Selling Tips</h2>
          <p className="text-gray-600 text-lg mb-8">
            Follow these proven strategies to attract more buyers and sell faster
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="bg-[#ffc300] p-3 rounded-lg inline-block mb-4">
                    <Icon className="w-6 h-6 text-[#000814]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#000814] mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#000814] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ffc300] rounded-full mb-6">
            <Zap className="w-8 h-8 text-[#000814]" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Home?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Get a free home valuation and connect with one of our expert agents to start the selling process today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#ffc300] text-[#000814] px-8 py-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors inline-flex items-center justify-center">
              Get Free Home Valuation
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-[#001d3d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#002855] transition-colors">
              Talk to an Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerResourcesPage;
