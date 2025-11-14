'use client';

import { BookOpen, Calendar, Clock, User, TrendingUp, Dumbbell, Apple, Heart } from 'lucide-react';
import Link from 'next/link';

interface BlogPageProps {
  basePath: string;
}

export default function BlogPage({ basePath }: BlogPageProps) {
  const featuredPost = {
    title: 'The Ultimate Guide to Building Muscle After 40',
    excerpt: 'Age is just a number when it comes to building strength. Learn the science-backed strategies that help you gain muscle and strength regardless of your age.',
    category: 'Strength Training',
    author: 'Marcus Steel',
    date: 'Nov 10, 2024',
    readTime: '8 min read',
    image: 'featured',
  };

  const posts = [
    {
      title: '5 HIIT Mistakes That Are Sabotaging Your Results',
      excerpt: 'High-intensity training is effective, but only when done correctly. Avoid these common pitfalls to maximize your fat-burning potential.',
      category: 'Training Tips',
      author: 'Sarah Chen',
      date: 'Nov 8, 2024',
      readTime: '6 min read',
      icon: TrendingUp,
    },
    {
      title: 'Pre-Workout Nutrition: What to Eat and When',
      excerpt: 'Fuel your workouts properly with our comprehensive guide to pre-workout nutrition timing and food choices for optimal performance.',
      category: 'Nutrition',
      author: 'Dr. James Wilson',
      date: 'Nov 5, 2024',
      readTime: '7 min read',
      icon: Apple,
    },
    {
      title: 'Recovery 101: Why Rest Days Are Essential',
      excerpt: 'Discover why taking rest days is crucial for muscle growth, injury prevention, and long-term fitness success.',
      category: 'Recovery',
      author: 'Emily Rodriguez',
      date: 'Nov 3, 2024',
      readTime: '5 min read',
      icon: Heart,
    },
    {
      title: 'CrossFit for Beginners: Everything You Need to Know',
      excerpt: 'New to CrossFit? This comprehensive guide covers the basics, what to expect in your first class, and how to get started safely.',
      category: 'CrossFit',
      author: 'Jake Morrison',
      date: 'Oct 30, 2024',
      readTime: '10 min read',
      icon: Dumbbell,
    },
    {
      title: 'Mastering the Mind-Muscle Connection',
      excerpt: 'Learn how focusing on the muscles you\'re working can dramatically improve your strength gains and muscle development.',
      category: 'Strength Training',
      author: 'Marcus Steel',
      date: 'Oct 28, 2024',
      readTime: '6 min read',
      icon: TrendingUp,
    },
    {
      title: 'Supplement Guide: What Actually Works',
      excerpt: 'Cut through the marketing hype and learn which supplements are actually worth your money based on scientific research.',
      category: 'Nutrition',
      author: 'Dr. James Wilson',
      date: 'Oct 25, 2024',
      readTime: '9 min read',
      icon: Apple,
    },
    {
      title: 'Progressive Overload: The Key to Continuous Gains',
      excerpt: 'Understand the principle of progressive overload and how to apply it to your training for continuous improvement.',
      category: 'Training Tips',
      author: 'Sarah Chen',
      date: 'Oct 22, 2024',
      readTime: '7 min read',
      icon: TrendingUp,
    },
    {
      title: 'Yoga for Athletes: Improve Flexibility and Performance',
      excerpt: 'How incorporating yoga into your training routine can enhance athletic performance, reduce injury risk, and speed recovery.',
      category: 'Yoga',
      author: 'Emily Rodriguez',
      date: 'Oct 20, 2024',
      readTime: '8 min read',
      icon: Heart,
    },
    {
      title: 'The Truth About Cardio and Muscle Loss',
      excerpt: 'Debunking myths about cardio killing your gains and how to balance cardio with strength training for optimal results.',
      category: 'Training Tips',
      author: 'Jake Morrison',
      date: 'Oct 18, 2024',
      readTime: '6 min read',
      icon: Dumbbell,
    },
  ];

  const categories = [
    { name: 'All Posts', count: 45 },
    { name: 'Training Tips', count: 15 },
    { name: 'Nutrition', count: 12 },
    { name: 'Recovery', count: 8 },
    { name: 'Strength Training', count: 10 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">Fitness Knowledge Hub</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Fitness Blog &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Expert Tips
              </span>
            </h1>

            <p className="text-xl text-zinc-400">
              Expert advice, training tips, nutrition guides, and fitness insights
              from our certified trainers and wellness professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#c1121f]/50 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Featured Image */}
              <div className="bg-gradient-to-br from-[#c1121f]/20 to-[#780000]/20 p-12 lg:p-16 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#c1121f] to-[#780000] rounded-full mx-auto mb-6 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-[#fdf0d5]" />
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-[#c1121f] text-zinc-50 rounded-full text-sm font-bold">
                    FEATURED POST
                  </div>
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center px-3 py-1 bg-zinc-800 text-[#c1121f] rounded-full text-xs font-semibold mb-4">
                  {featuredPost.category}
                </div>

                <h2 className="text-3xl lg:text-4xl font-black text-zinc-50 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-400 leading-relaxed mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center space-x-6 text-sm text-zinc-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {featuredPost.readTime}
                  </div>
                </div>

                <button className="px-6 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-zinc-50 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 transition-colors flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs text-zinc-600">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-zinc-50 mb-2">Latest Articles</h2>
                <p className="text-zinc-400">Stay informed with our latest fitness insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <article key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#c1121f]/50 transition-all group">
                      {/* Post Header */}
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 border-b border-zinc-800">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-zinc-950 text-[#c1121f] rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                          <Icon className="h-6 w-6 text-[#c1121f]" />
                        </div>

                        <h3 className="text-xl font-bold text-zinc-50 mb-2 leading-tight group-hover:text-[#c1121f] transition-colors">
                          {post.title}
                        </h3>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">{post.date}</span>
                          <button className="text-sm font-semibold text-[#c1121f] hover:underline">
                            Read More →
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-lg font-semibold hover:bg-zinc-800 transition-colors">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-zinc-950 to-[#780000]/10 border border-zinc-800 rounded-2xl p-12 text-center">
            <BookOpen className="h-12 w-12 text-[#c1121f] mx-auto mb-4" />
            <h2 className="text-3xl font-black text-zinc-50 mb-4">
              Get Fitness Tips Delivered Weekly
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join 10,000+ subscribers receiving expert training tips, nutrition advice,
              and exclusive member content straight to their inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-[#c1121f]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-950 via-[#780000]/20 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-50 mb-6">
            Ready to Put Knowledge Into Action?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join Iron Temple and work with expert trainers who will guide you every step of the way.
          </p>
          <Link
            href={`${basePath}/join`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
