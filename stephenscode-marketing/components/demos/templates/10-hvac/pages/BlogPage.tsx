import React, { useState } from 'react';
import { FileText, Calendar, User, Tag, Search, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'maintenance', label: 'Maintenance Tips' },
    { id: 'energy', label: 'Energy Efficiency' },
    { id: 'seasonal', label: 'Seasonal Advice' },
    { id: 'buying', label: 'Buying Guides' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];

  const articles = [
    {
      id: 1,
      title: '10 Signs Your AC Needs Repair Before Summer',
      excerpt: 'Don\'t wait for a breakdown during the hottest days. Learn the warning signs that your AC needs professional attention.',
      category: 'troubleshooting',
      author: 'Mike Johnson',
      date: 'May 15, 2024',
      readTime: '5 min read',
      image: '🔧',
    },
    {
      id: 2,
      title: 'How to Reduce Your Energy Bills This Summer',
      excerpt: 'Simple tips and tricks to keep your home cool without breaking the bank. Save up to 30% on cooling costs.',
      category: 'energy',
      author: 'Sarah Williams',
      date: 'May 10, 2024',
      readTime: '7 min read',
      image: '💡',
    },
    {
      id: 3,
      title: 'Complete HVAC Maintenance Checklist for Homeowners',
      excerpt: 'A comprehensive guide to maintaining your HVAC system year-round. Keep your system running efficiently.',
      category: 'maintenance',
      author: 'Tom Rodriguez',
      date: 'May 5, 2024',
      readTime: '10 min read',
      image: '✅',
    },
    {
      id: 4,
      title: 'When to Replace vs. Repair Your HVAC System',
      excerpt: 'Making the right decision can save you thousands. Here\'s how to evaluate whether repair or replacement is best.',
      category: 'buying',
      author: 'Mike Johnson',
      date: 'April 28, 2024',
      readTime: '8 min read',
      image: '🤔',
    },
    {
      id: 5,
      title: 'Preparing Your Heating System for Winter',
      excerpt: 'Essential steps to ensure your furnace is ready for cold weather. Prevent breakdowns and stay warm all winter.',
      category: 'seasonal',
      author: 'Lisa Chen',
      date: 'April 20, 2024',
      readTime: '6 min read',
      image: '❄️',
    },
    {
      id: 6,
      title: 'Understanding SEER Ratings: What They Mean for You',
      excerpt: 'Demystifying SEER ratings and how they impact your energy costs and comfort. Make informed purchasing decisions.',
      category: 'buying',
      author: 'Sarah Williams',
      date: 'April 15, 2024',
      readTime: '5 min read',
      image: '📊',
    },
    {
      id: 7,
      title: 'DIY vs. Professional HVAC Maintenance: What You Need to Know',
      excerpt: 'Learn which maintenance tasks you can handle yourself and when to call the professionals.',
      category: 'maintenance',
      author: 'Tom Rodriguez',
      date: 'April 10, 2024',
      readTime: '7 min read',
      image: '🛠️',
    },
    {
      id: 8,
      title: 'The Complete Guide to Indoor Air Quality',
      excerpt: 'Everything you need to know about improving the air you breathe at home. Better health starts with clean air.',
      category: 'energy',
      author: 'Lisa Chen',
      date: 'April 5, 2024',
      readTime: '12 min read',
      image: '🌬️',
    },
    {
      id: 9,
      title: 'Smart Thermostats: Are They Worth the Investment?',
      excerpt: 'Exploring the benefits, costs, and savings potential of upgrading to a smart thermostat.',
      category: 'buying',
      author: 'Mike Johnson',
      date: 'March 28, 2024',
      readTime: '6 min read',
      image: '📱',
    },
    {
      id: 10,
      title: 'Common Summer AC Problems and How to Fix Them',
      excerpt: 'Quick troubleshooting guide for the most common AC issues during peak cooling season.',
      category: 'troubleshooting',
      author: 'Tom Rodriguez',
      date: 'March 20, 2024',
      readTime: '8 min read',
      image: '🔍',
    },
    {
      id: 11,
      title: 'How Often Should You Change Your HVAC Filters?',
      excerpt: 'The definitive guide to filter replacement schedules based on your home and system type.',
      category: 'maintenance',
      author: 'Sarah Williams',
      date: 'March 15, 2024',
      readTime: '4 min read',
      image: '🔄',
    },
    {
      id: 12,
      title: 'Heat Pump vs. Traditional HVAC: Which is Right for You?',
      excerpt: 'Comparing the pros, cons, and costs of heat pumps versus traditional heating and cooling systems.',
      category: 'buying',
      author: 'Lisa Chen',
      date: 'March 10, 2024',
      readTime: '10 min read',
      image: '⚖️',
    },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles[0];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#003049] to-[#004d73] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">HVAC Resources & Blog</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Expert advice, tips, and guides to keep your HVAC system running efficiently
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none text-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-12 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-8xl mb-6">{featuredArticle.image}</div>
                  <span className="inline-block bg-[#f77f00] text-white px-4 py-2 rounded-full text-sm font-bold">
                    FEATURED ARTICLE
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {featuredArticle.author}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-[#003049]">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{featuredArticle.readTime}</span>
                  <button className="bg-[#003049] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition-all duration-300 flex items-center">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#003049] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#003049] to-[#004d73] p-8 text-center">
                  <div className="text-6xl mb-4">{article.image}</div>
                  <span className="inline-block bg-[#f77f00] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#003049] group-hover:text-[#f77f00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                    <button className="text-[#003049] font-semibold text-sm group-hover:text-[#f77f00] transition-colors flex items-center">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#003049] to-[#004d73] rounded-2xl p-8 md:p-12 text-white text-center">
            <FileText className="w-16 h-16 text-[#f77f00] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for HVAC tips, seasonal advice, and exclusive offers
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#f77f00]"
                />
                <button className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#e07000] transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-sm mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#003049]">Popular Topics</h2>
            <p className="text-xl text-gray-600">
              Quick links to our most read articles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'AC Maintenance',
              'Energy Savings',
              'Filter Changes',
              'Thermostat Tips',
              'System Replacement',
              'Emergency Repairs',
              'Air Quality',
              'Seasonal Prep',
            ].map((topic, index) => (
              <button
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-[#003049] font-semibold hover:text-[#f77f00]"
              >
                <Tag className="w-5 h-5 inline mr-2" />
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#003049]">
            Need Professional HVAC Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our expert technicians are ready to help with all your heating and cooling needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003049] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#004d73] transition-all duration-300"
            >
              Schedule Service
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#f77f00] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e07000] transition-all duration-300"
            >
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
