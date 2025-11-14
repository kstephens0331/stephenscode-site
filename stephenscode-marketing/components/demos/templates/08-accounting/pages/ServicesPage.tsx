import React from 'react';
import { Calculator, TrendingUp, Shield, FileText, Briefcase, PieChart, ClipboardCheck, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Calculator,
      title: 'Tax Planning & Preparation',
      description: 'Strategic tax solutions designed to minimize your tax liability while ensuring full compliance with current tax laws.',
      features: [
        'Individual & business tax preparation',
        'Year-round tax planning strategies',
        'IRS audit representation',
        'State & local tax planning',
        'Tax-efficient investment strategies',
        'Entity selection & structuring',
      ],
      price: 'Starting at $500',
    },
    {
      icon: Shield,
      title: 'Retirement Planning',
      description: 'Comprehensive retirement strategies to help you achieve financial independence and maintain your lifestyle in retirement.',
      features: [
        'Retirement income analysis',
        '401(k) & IRA optimization',
        'Social Security maximization',
        'Pension & annuity planning',
        'Healthcare cost planning',
        'Legacy & estate considerations',
      ],
      price: 'Custom pricing',
    },
    {
      icon: TrendingUp,
      title: 'Investment Management',
      description: 'Personalized portfolio management strategies designed to grow and protect your wealth based on your goals and risk tolerance.',
      features: [
        'Customized portfolio design',
        'Active portfolio monitoring',
        'Risk management strategies',
        'Asset allocation optimization',
        'Tax-loss harvesting',
        'Quarterly performance reviews',
      ],
      price: '1% AUM annually',
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Protect your legacy and ensure your assets are distributed according to your wishes with strategic estate planning.',
      features: [
        'Will & trust preparation',
        'Estate tax minimization',
        'Beneficiary designation review',
        'Power of attorney documents',
        'Healthcare directive planning',
        'Charitable giving strategies',
      ],
      price: 'Starting at $2,500',
    },
    {
      icon: Briefcase,
      title: 'Business Accounting',
      description: 'Comprehensive accounting services to help your business maintain accurate records and achieve financial success.',
      features: [
        'Monthly bookkeeping services',
        'Financial statement preparation',
        'Cash flow management',
        'Business entity formation',
        'Controller services',
        'Financial analysis & reporting',
      ],
      price: 'Starting at $750/month',
    },
    {
      icon: PieChart,
      title: 'Financial Planning',
      description: 'Holistic financial planning that addresses all aspects of your financial life for long-term success.',
      features: [
        'Comprehensive financial analysis',
        'Goal-based planning strategies',
        'Net worth optimization',
        'Debt management strategies',
        'Education funding planning',
        'Risk management review',
      ],
      price: 'Starting at $3,000',
    },
    {
      icon: ClipboardCheck,
      title: 'Audit Support',
      description: 'Expert representation and support during IRS audits or tax disputes to protect your interests.',
      features: [
        'IRS audit representation',
        'Tax notice response',
        'Documentation organization',
        'Penalty abatement requests',
        'Appeals & litigation support',
        'Offer in compromise assistance',
      ],
      price: 'Custom pricing',
    },
    {
      icon: DollarSign,
      title: 'Payroll Services',
      description: 'Efficient payroll processing and compliance management to keep your business running smoothly.',
      features: [
        'Payroll processing & reporting',
        'Tax withholding & filing',
        'Direct deposit management',
        'W-2 & 1099 preparation',
        'Payroll tax compliance',
        'Employee benefits administration',
      ],
      price: 'Starting at $200/month',
    },
  ];

  const caseStudies = [
    {
      title: 'Tech Startup Tax Optimization',
      client: 'SaaS Company',
      result: '$180K saved in first year',
      description: 'Implemented R&D tax credits and strategic entity structuring to dramatically reduce tax liability.',
    },
    {
      title: 'Early Retirement Success',
      client: 'Corporate Executive',
      result: 'Retired 5 years early',
      description: 'Developed comprehensive retirement strategy enabling early retirement with full financial security.',
    },
    {
      title: 'Investment Portfolio Growth',
      client: 'High Net Worth Individual',
      result: '38% portfolio growth',
      description: 'Strategic asset allocation and tax-efficient investing resulted in significant portfolio appreciation.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive financial services tailored to your unique needs and goals. From tax planning to wealth management, we're your trusted financial partner.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#14213d] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#fca311]" size={32} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#14213d] mb-2">{service.title}</h3>
                      <p className="text-[#fca311] font-semibold">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-[#fca311] flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center justify-center gap-2"
                  >
                    Schedule Consultation <ArrowRight size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real results for real clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-3">{study.title}</h3>
                <p className="text-gray-300 mb-4">{study.client}</p>
                <div className="bg-[#fca311] text-[#14213d] font-bold text-xl py-3 px-4 rounded-lg mb-4 text-center">
                  {study.result}
                </div>
                <p className="text-gray-300">{study.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#14213d] mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple steps to financial success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'Meet with our team to discuss your financial goals and challenges.' },
              { step: '02', title: 'Analysis & Planning', desc: 'We analyze your situation and develop a customized strategy.' },
              { step: '03', title: 'Implementation', desc: 'We put your plan into action with ongoing support and guidance.' },
              { step: '04', title: 'Review & Adjust', desc: 'Regular reviews ensure your plan stays on track as life changes.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#fca311] text-[#14213d] rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#14213d] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule your free consultation today and discover how we can help you achieve your financial goals.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#fca311] text-[#14213d] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#e59400] transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Schedule Free Consultation <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
