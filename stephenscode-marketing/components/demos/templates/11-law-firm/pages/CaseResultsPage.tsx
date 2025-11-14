import React from 'react';
import { TrendingUp, Award, DollarSign, CheckCircle2 } from 'lucide-react';

interface CaseResultsPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function CaseResultsPage({ onNavigate, accentColor = '#c9a227' }: CaseResultsPageProps) {
  const caseResults = [
    {
      category: 'Personal Injury',
      amount: '$8.5 Million',
      type: 'Settlement',
      description: 'Medical malpractice resulting in permanent disability',
      year: '2024',
    },
    {
      category: 'Personal Injury',
      amount: '$6.2 Million',
      type: 'Verdict',
      description: 'Truck accident causing traumatic brain injury',
      year: '2023',
    },
    {
      category: 'Personal Injury',
      amount: '$4.8 Million',
      type: 'Settlement',
      description: 'Construction site accident with multiple injuries',
      year: '2024',
    },
    {
      category: 'Personal Injury',
      amount: '$3.5 Million',
      type: 'Settlement',
      description: 'Product liability case involving defective equipment',
      year: '2023',
    },
    {
      category: 'Criminal Defense',
      amount: 'Not Guilty',
      type: 'Verdict',
      description: 'Federal white collar crime charges dismissed',
      year: '2024',
    },
    {
      category: 'Criminal Defense',
      amount: 'Charges Dropped',
      type: 'Dismissed',
      description: 'DUI case dismissed due to procedural violations',
      year: '2024',
    },
    {
      category: 'Business Law',
      amount: '$12.3 Million',
      type: 'Settlement',
      description: 'Complex commercial litigation and breach of contract',
      year: '2023',
    },
    {
      category: 'Business Law',
      amount: '$7.8 Million',
      type: 'Verdict',
      description: 'Partnership dispute and business dissolution',
      year: '2024',
    },
    {
      category: 'Employment Law',
      amount: '$2.4 Million',
      type: 'Settlement',
      description: 'Wrongful termination and discrimination case',
      year: '2024',
    },
    {
      category: 'Employment Law',
      amount: '$1.8 Million',
      type: 'Settlement',
      description: 'Sexual harassment and hostile work environment',
      year: '2023',
    },
    {
      category: 'Real Estate',
      amount: '$5.6 Million',
      type: 'Settlement',
      description: 'Commercial real estate fraud and misrepresentation',
      year: '2023',
    },
    {
      category: 'Family Law',
      amount: 'Favorable Outcome',
      type: 'Settlement',
      description: 'High-asset divorce with custody agreement',
      year: '2024',
    },
  ];

  const stats = [
    { label: 'Total Recovered', value: '$500M+', icon: DollarSign },
    { label: 'Cases Won', value: '10,000+', icon: CheckCircle2 },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
    { label: 'Awards', value: '50+', icon: Award },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Proven Results</h1>
          <p className="text-xl text-gray-300">
            Our track record speaks for itself. We have successfully recovered hundreds of millions
            of dollars for our clients and achieved favorable outcomes in thousands of cases.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notable Case Results */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Notable Case Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recent victories and settlements achieved for our clients across various practice areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseResults.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div
                  className="p-4 text-center"
                  style={{
                    background: `linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)`,
                    color: '#ffffff',
                  }}
                >
                  <div className="text-xs uppercase tracking-wide mb-2" style={{ color: accentColor }}>
                    {result.category}
                  </div>
                  <div className="text-3xl font-bold mb-1">{result.amount}</div>
                  <div className="text-sm text-gray-300">{result.type}</div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 min-h-[60px]">{result.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold" style={{ color: accentColor }}>
                      {result.year}
                    </span>
                    <CheckCircle2 className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              Results By Practice Area
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { area: 'Personal Injury', amount: '$150M+', cases: '3,500+' },
              { area: 'Business Law', amount: '$200M+', cases: '1,000+' },
              { area: 'Employment Law', amount: '$50M+', cases: '800+' },
              { area: 'Real Estate', amount: '$75M+', cases: '2,000+' },
              { area: 'Criminal Defense', amount: '95% Success', cases: '2,500+' },
              { area: 'Family Law', amount: 'Favorable', cases: '2,000+' },
              { area: 'Immigration', amount: '90% Approval', cases: '3,000+' },
              { area: 'Estate Planning', amount: '$2B+ Protected', cases: '1,500+' },
            ].map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: '#f8f9fa', borderTop: `4px solid ${accentColor}` }}
              >
                <h3 className="font-bold text-lg mb-3" style={{ color: '#1a1a2e' }}>
                  {category.area}
                </h3>
                <div className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
                  {category.amount}
                </div>
                <div className="text-sm text-gray-600">{category.cases} Cases</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h3 className="font-bold text-lg mb-4" style={{ color: '#1a1a2e' }}>
              Important Disclaimer
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Prior Results Do Not Guarantee a Similar Outcome.</strong> Every case is unique and
                must be evaluated on its own merits. The outcome of any case depends on numerous factors
                specific to that case.
              </p>
              <p>
                Case results presented are representative of the types of cases our firm handles and
                the results we have achieved. Client confidentiality has been maintained; specific
                identifying information has been omitted.
              </p>
              <p>
                Settlement amounts and verdicts listed represent gross recovery before deduction of
                attorney fees, costs, and medical liens. Net recovery to clients varies based on the
                specific circumstances of each case.
              </p>
              <p>
                <strong>Contingency Fee Cases:</strong> For personal injury cases, we work on a contingency
                fee basis. You pay no attorney fees unless we recover compensation for you. Costs and
                expenses may still apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
          color: '#ffffff',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let Us Fight For You</h2>
          <p className="text-xl mb-8 text-gray-300">
            Our proven track record demonstrates our commitment to achieving the best possible
            outcomes for our clients. Contact us today to discuss your case.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => onNavigate('practice-areas')}
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all hover:bg-white hover:text-gray-900"
              style={{ borderColor: accentColor, color: '#ffffff' }}
            >
              View Practice Areas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
