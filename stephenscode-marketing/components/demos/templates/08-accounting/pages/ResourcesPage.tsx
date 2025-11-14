import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Calculator, Shield, BookOpen, Search, ChevronRight, DollarSign } from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

export default function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'tax', name: 'Tax Planning' },
    { id: 'retirement', name: 'Retirement' },
    { id: 'investment', name: 'Investment' },
    { id: 'estate', name: 'Estate Planning' },
  ];

  const guides = [
    {
      title: '2024 Tax Season Checklist',
      category: 'tax',
      description: 'Complete checklist to ensure you have all necessary documents for tax preparation.',
      icon: FileText,
      downloadSize: '2.4 MB PDF',
      featured: true,
    },
    {
      title: 'Retirement Planning Guide',
      category: 'retirement',
      description: 'Comprehensive guide to planning for a secure and comfortable retirement.',
      icon: Shield,
      downloadSize: '3.1 MB PDF',
      featured: true,
    },
    {
      title: 'Investment Strategy Workbook',
      category: 'investment',
      description: 'Interactive workbook to help you define and execute your investment strategy.',
      icon: TrendingUp,
      downloadSize: '1.8 MB PDF',
      featured: false,
    },
    {
      title: 'Estate Planning Essentials',
      category: 'estate',
      description: 'Everything you need to know about protecting your legacy and assets.',
      icon: BookOpen,
      downloadSize: '2.7 MB PDF',
      featured: false,
    },
    {
      title: 'Tax Deduction Maximizer',
      category: 'tax',
      description: 'Discover often-overlooked deductions to maximize your tax savings.',
      icon: Calculator,
      downloadSize: '1.5 MB PDF',
      featured: false,
    },
    {
      title: 'Social Security Optimization',
      category: 'retirement',
      description: 'Strategic guide to maximizing your Social Security benefits.',
      icon: DollarSign,
      downloadSize: '2.2 MB PDF',
      featured: false,
    },
  ];

  const articles = [
    {
      title: '2024 Tax Law Changes: What You Need to Know',
      date: 'November 5, 2024',
      category: 'tax',
      excerpt: 'Stay informed about the latest tax law changes and how they impact your financial planning for 2024 and beyond.',
      readTime: '8 min read',
    },
    {
      title: 'The Power of Compound Interest in Retirement Savings',
      date: 'October 28, 2024',
      category: 'retirement',
      excerpt: 'Learn how starting early and staying consistent can dramatically impact your retirement nest egg through compound growth.',
      readTime: '6 min read',
    },
    {
      title: 'Diversification Strategies for Uncertain Markets',
      date: 'October 15, 2024',
      category: 'investment',
      excerpt: 'Discover how proper diversification can protect your portfolio during market volatility while positioning you for growth.',
      readTime: '10 min read',
    },
    {
      title: 'Year-End Tax Planning Opportunities',
      date: 'October 1, 2024',
      category: 'tax',
      excerpt: 'Strategic moves you can make before December 31st to reduce your tax liability and improve your financial position.',
      readTime: '7 min read',
    },
    {
      title: 'Roth vs. Traditional IRA: Which is Right for You?',
      date: 'September 20, 2024',
      category: 'retirement',
      excerpt: 'Understanding the key differences between Roth and Traditional IRAs to make the best choice for your situation.',
      readTime: '9 min read',
    },
    {
      title: 'Estate Planning Mistakes to Avoid',
      date: 'September 8, 2024',
      category: 'estate',
      excerpt: 'Common estate planning errors that can cost your heirs thousands and how to avoid them with proper planning.',
      readTime: '11 min read',
    },
  ];

  const calculators = [
    {
      title: 'Retirement Savings Calculator',
      description: 'Estimate how much you need to save for retirement based on your goals.',
      icon: Calculator,
    },
    {
      title: 'Tax Withholding Estimator',
      description: 'Ensure you\'re withholding the right amount from your paycheck.',
      icon: DollarSign,
    },
    {
      title: 'Investment Return Calculator',
      description: 'Project potential returns based on different investment scenarios.',
      icon: TrendingUp,
    },
    {
      title: 'Social Security Benefits Estimator',
      description: 'Calculate your estimated Social Security retirement benefits.',
      icon: Shield,
    },
  ];

  const filteredGuides = selectedCategory === 'all'
    ? guides
    : guides.filter(guide => guide.category === selectedCategory);

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Financial Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Free guides, calculators, and expert insights to help you make informed financial decisions
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full px-6 py-4 rounded-lg text-gray-900 pl-12 focus:outline-none focus:ring-2 focus:ring-[#fca311]"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 px-4 border-b-2 border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#14213d] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#14213d]">Downloadable Guides</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                    guide.featured ? 'border-2 border-[#fca311]' : ''
                  }`}
                >
                  {guide.featured && (
                    <div className="bg-[#fca311] text-[#14213d] text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                      FEATURED
                    </div>
                  )}
                  <div className="w-16 h-16 bg-[#14213d] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#fca311]" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#14213d] mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{guide.downloadSize}</span>
                    <button className="bg-[#14213d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center gap-2">
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Calculators */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#14213d] mb-4">Financial Calculators</h2>
            <p className="text-lg text-gray-600">Interactive tools to help plan your financial future</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-14 h-14 bg-[#fca311] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#14213d]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{calc.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{calc.description}</p>
                  <button className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Try It Now <ChevronRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#14213d]">Latest Articles</h2>
            <button className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#fca311] text-[#14213d] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {article.category}
                  </div>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[#14213d] mb-3 hover:text-[#fca311] transition-colors cursor-pointer">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <button className="text-[#fca311] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#14213d] to-[#1a2a4d] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for monthly financial tips, tax updates, and exclusive insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fca311]"
            />
            <button className="bg-[#fca311] text-[#14213d] px-8 py-4 rounded-lg font-semibold hover:bg-[#e59400] transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#14213d] mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our financial advisors are ready to help you create a customized strategy for your unique situation.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#14213d] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#1a2a4d] transition-colors"
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
