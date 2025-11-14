import React from 'react';
import { Calendar, User, ArrowRight, TrendingUp, Scale, Shield } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
  accentColor?: string;
}

export default function BlogPage({ onNavigate, accentColor = '#c9a227' }: BlogPageProps) {
  const featuredPost = {
    title: 'Major Changes to Personal Injury Laws in 2024',
    excerpt: 'New legislation affects statute of limitations and damage caps. Here\'s what you need to know to protect your rights when filing a personal injury claim.',
    category: 'Personal Injury',
    date: 'November 10, 2024',
    author: 'Robert Justice',
    readTime: '8 min read',
    image: 'FP',
  };

  const blogPosts = [
    {
      title: 'Understanding Your Rights During a Police Stop',
      excerpt: 'What you should and shouldn\'t say when pulled over or questioned by law enforcement.',
      category: 'Criminal Defense',
      date: 'November 8, 2024',
      author: 'Sarah Mitchell',
      readTime: '6 min read',
    },
    {
      title: 'Child Custody: Factors Courts Consider',
      excerpt: 'Learn about the key factors judges evaluate when making custody determinations.',
      category: 'Family Law',
      date: 'November 5, 2024',
      author: 'Emily Rodriguez',
      readTime: '7 min read',
    },
    {
      title: 'Why Every Business Needs a Solid Operating Agreement',
      excerpt: 'Protecting your business with proper legal documentation from day one.',
      category: 'Business Law',
      date: 'November 3, 2024',
      author: 'Michael Chen',
      readTime: '5 min read',
    },
    {
      title: 'Estate Planning Mistakes to Avoid',
      excerpt: 'Common pitfalls that can derail your estate plan and how to avoid them.',
      category: 'Estate Planning',
      date: 'October 30, 2024',
      author: 'Emily Rodriguez',
      readTime: '9 min read',
    },
    {
      title: 'New Immigration Policy Updates: What You Need to Know',
      excerpt: 'Recent changes to visa processing and requirements for family-based immigration.',
      category: 'Immigration',
      date: 'October 28, 2024',
      author: 'Jennifer Park',
      readTime: '10 min read',
    },
    {
      title: 'Workplace Discrimination: Recognizing the Signs',
      excerpt: 'Understanding what constitutes illegal discrimination and when to take action.',
      category: 'Employment Law',
      date: 'October 25, 2024',
      author: 'Jennifer Park',
      readTime: '6 min read',
    },
    {
      title: 'Real Estate Contract Red Flags',
      excerpt: 'Important clauses and terms to watch for when reviewing real estate contracts.',
      category: 'Real Estate',
      date: 'October 22, 2024',
      author: 'David Thompson',
      readTime: '7 min read',
    },
    {
      title: 'Social Media and Your Legal Case',
      excerpt: 'How your online activity can impact your personal injury or criminal case.',
      category: 'General',
      date: 'October 20, 2024',
      author: 'Sarah Mitchell',
      readTime: '5 min read',
    },
    {
      title: 'Maximizing Your Personal Injury Settlement',
      excerpt: 'Strategies for documenting damages and negotiating the best possible outcome.',
      category: 'Personal Injury',
      date: 'October 18, 2024',
      author: 'Robert Justice',
      readTime: '8 min read',
    },
  ];

  const categories = [
    'All Posts',
    'Personal Injury',
    'Criminal Defense',
    'Family Law',
    'Business Law',
    'Estate Planning',
    'Immigration',
    'Employment Law',
    'Real Estate',
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All Posts');

  const filteredPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

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
          <h1 className="text-5xl font-bold mb-6">Legal News & Insights</h1>
          <p className="text-xl text-gray-300">
            Stay informed with the latest legal updates, analysis, and practical advice from our
            experienced attorneys. Knowledge is power when it comes to protecting your rights.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-6 h-6" style={{ color: accentColor }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>Featured Article</h2>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div
                className="h-64 lg:h-auto flex items-center justify-center text-white text-6xl font-bold"
                style={{ background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)' }}
              >
                {featuredPost.image}
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
                  {featuredPost.title}
                </h3>
                <p className="text-gray-700 mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <button
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#16213e' }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
                style={{
                  backgroundColor: selectedCategory === category ? accentColor : '#ffffff',
                  color: selectedCategory === category ? '#16213e' : '#1a1a2e',
                  border: `2px solid ${selectedCategory === category ? accentColor : '#e5e7eb'}`,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
                    color: '#ffffff',
                  }}
                >
                  <Scale className="w-16 h-16" style={{ color: accentColor }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{ backgroundColor: `${accentColor}20`, color: '#1a1a2e' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2" style={{ color: '#1a1a2e' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button
                    className="flex items-center space-x-2 font-semibold text-sm hover:underline"
                    style={{ color: accentColor }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
            Stay Informed
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for legal updates, tips, and insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-opacity-50"
              style={{ borderColor: '#e5e7eb' }}
            />
            <button
              className="px-8 py-3 rounded-lg font-bold whitespace-nowrap transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#16213e' }}
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 px-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
              Legal Disclaimer
            </h3>
            <p className="text-sm text-gray-600">
              The content on this blog is for informational purposes only and does not constitute
              legal advice. Laws vary by jurisdiction and change over time. For advice about your
              specific legal situation, please consult with an attorney. Reading this blog does not
              create an attorney-client relationship.
            </p>
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
          <h2 className="text-4xl font-bold mb-6">Need Legal Advice?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Don't rely on general information alone. Get personalized legal guidance from our
            experienced attorneys.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor, color: '#16213e' }}
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
