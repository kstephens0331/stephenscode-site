import React, { useState } from 'react';
import { DollarSign, Calculator, CheckCircle, CreditCard, FileText, Clock, Shield } from 'lucide-react';

interface FinancingPageProps {
  onNavigate: (page: string) => void;
}

export default function FinancingPage({ onNavigate }: FinancingPageProps) {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(36);

  const calculateMonthlyPayment = () => {
    // Simple calculation for demo - 0% APR for promotional period
    return (loanAmount / loanTerm).toFixed(2);
  };

  const financingOptions = [
    {
      name: '0% APR for 12 Months',
      description: 'No interest if paid in full within 12 months',
      terms: '• No interest for 12 months\n• Minimum purchase $1,000\n• Subject to credit approval\n• Regular APR applies after',
      icon: Clock,
      color: 'from-[#003049] to-[#004d73]',
    },
    {
      name: '0% APR for 24 Months',
      description: 'Extended no-interest period for larger purchases',
      terms: '• No interest for 24 months\n• Minimum purchase $3,000\n• Subject to credit approval\n• Perfect for system replacements',
      icon: DollarSign,
      color: 'from-[#f77f00] to-[#e07000]',
      popular: true,
    },
    {
      name: 'Low Monthly Payments',
      description: 'Flexible payment plans to fit your budget',
      terms: '• Terms up to 60 months\n• Low monthly payments\n• Competitive rates\n• Quick approval process',
      icon: CreditCard,
      color: 'from-[#003049] to-[#004d73]',
    },
  ];

  const benefits = [
    'Quick and easy application process',
    'Instant credit decisions',
    'Multiple financing partners',
    'No prepayment penalties',
    'Flexible payment options',
    'Special seasonal promotions',
  ];

  const steps = [
    {
      number: 1,
      title: 'Get Your Estimate',
      description: 'Schedule a free in-home estimate for your HVAC project',
    },
    {
      number: 2,
      title: 'Choose Your Plan',
      description: 'Select the financing option that works best for your budget',
    },
    {
      number: 3,
      title: 'Quick Approval',
      description: 'Get approved in minutes with our simple application process',
    },
    {
      number: 4,
      title: 'Enjoy Comfort',
      description: 'We complete the work and you enjoy your new system',
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Flexible Financing Options</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Don&apos;t let cost stand in the way of comfort. Affordable payment plans available.
          </p>
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-8">
              <Calculator className="w-16 h-16 text-[#f77f00] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Payment Calculator</h2>
              <p className="text-white/90">
                See how affordable new HVAC can be with our 0% APR financing
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Project Cost: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/70 mt-2">
                  <span>$1,000</span>
                  <span>$15,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Payment Term: {loanTerm} months
                </label>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/70 mt-2">
                  <span>12 months</span>
                  <span>60 months</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f77f00] rounded-xl p-8 text-center">
              <p className="text-sm font-semibold mb-2">Estimated Monthly Payment</p>
              <p className="text-5xl font-bold mb-2">${calculateMonthlyPayment()}</p>
              <p className="text-sm text-white/90">
                Based on 0% APR promotional financing
              </p>
            </div>

            <p className="text-center text-xs text-white/70 mt-6">
              *This is an estimate only. Actual terms may vary. Subject to credit approval.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Available Financing Plans</h2>
            <p className="text-xl text-gray-600">
              Choose the option that fits your budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-xl ${
                  option.popular ? 'transform scale-105 border-4 border-[#f77f00]' : ''
                }`}
              >
                {option.popular && (
                  <div className="bg-[#f77f00] text-white text-center py-2 font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <div className={`bg-gradient-to-br ${option.color} p-8 text-white`}>
                  <option.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{option.name}</h3>
                  <p className="text-white/90">{option.description}</p>
                </div>

                <div className="bg-white p-6">
                  <div className="whitespace-pre-line text-gray-700 mb-6 space-y-2">
                    {option.terms.split('\n').map((term, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#f77f00] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{term.replace('• ', '')}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-[#003049] text-white py-3 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Why Finance With Cool Breeze?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md border-2 border-gray-100 flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-[#f77f00] mr-3 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get the HVAC system you need in 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#003049] to-[#004d73] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#003049]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Shield className="w-16 h-16 text-[#f77f00] mb-4" />
                <h2 className="text-3xl font-bold mb-4">Trusted Financing Partners</h2>
                <p className="text-white/90 mb-6">
                  We work with leading financial institutions to provide you with the best rates and terms available. Your financial information is secure and protected.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#f77f00] mr-3" />
                    Secure online application
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#f77f00] mr-3" />
                    Multiple lender options
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#f77f00] mr-3" />
                    Competitive interest rates
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <FileText className="w-12 h-12 text-[#f77f00] mb-4" />
                <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-white/90 mb-6">
                  Start your application online or speak with one of our financing specialists to find the perfect plan for you.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-[#f77f00] text-white py-3 rounded-lg font-semibold hover:bg-[#e07000] transition-all duration-300"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>
              *Subject to credit approval. Minimum purchase required. See financing partner for complete details.
            </p>
            <p>
              APR rates and terms may vary. Promotional rates available for qualified buyers only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
