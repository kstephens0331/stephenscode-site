
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Why Flat-Rate Web Development Changes the Game',
    excerpt: 'Traditional agencies charge unpredictable hourly rates. Here’s why flat-rate builds are better for small business owners.',
    date: '2024-05-01',
    author: 'Kyle Stephens',
    tags: ['Business', 'Pricing'],
  },
  {
    id: 2,
    title: 'From Quote to Launch: How We Build Smarter Systems',
    excerpt: 'Walk through our streamlined process for building fully custom admin systems that work as hard as you do.',
    date: '2024-05-05',
    author: 'Kyle Stephens',
    tags: ['Workflow', 'Custom Systems'],
  },
  {
    id: 3,
    title: 'Top 5 Add-Ons That Save You Time and Make You Money',
    excerpt: 'These optional tools pay for themselves — here’s what to consider when adding features like dashboards, forms, or automation.',
    date: '2024-05-10',
    author: 'Kyle Stephens',
    tags: ['Add-Ons', 'Tools'],
  },
];

const allTags = ['All', ...new Set(posts.flatMap(p => p.tags))];

export default function Blog() {
  const [filter, setFilter] = useState('All');

  const filteredPosts = filter === 'All'
    ? posts
    : posts.filter(post => post.tags.includes(filter));

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6">
      <Helmet>
        <title>Blog | StephensCode</title>
        <meta
          name="description"
          content="Insights, strategies, and tools from StephensCode — flat-rate custom development, smarter systems, and web strategy that works."
        />
      </Helmet>

      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-4">
          Insights & Ideas
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Real strategies, behind-the-scenes builds, and no-BS advice for running better systems and smarter businesses.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              filter === tag
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 shadow-md hover:shadow-orange-500/20 transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-orange-400 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-1">{post.author} • {new Date(post.date).toLocaleDateString()}</p>
            <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
            <Link
              to="#"
              className="text-orange-400 hover:text-white text-sm font-semibold"
            >
              Read More →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
