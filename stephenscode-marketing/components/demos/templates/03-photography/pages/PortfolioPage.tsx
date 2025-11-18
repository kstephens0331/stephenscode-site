'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ZoomIn } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'families', name: 'Families' },
    { id: 'portraits', name: 'Portraits' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'events', name: 'Events' },
    { id: 'lifestyle', name: 'Lifestyle' },
  ];

  const portfolioItems = [
    {
      id: 1,
      category: 'weddings',
      title: 'Sarah & Michael',
      description: 'Garden wedding at sunset',
      location: 'Malibu, CA',
    },
    {
      id: 2,
      category: 'families',
      title: 'The Johnson Family',
      description: 'Beach family session',
      location: 'Santa Monica, CA',
    },
    {
      id: 3,
      category: 'portraits',
      title: 'Emma Grace',
      description: 'Senior portrait session',
      location: 'Studio City, CA',
    },
    {
      id: 4,
      category: 'corporate',
      title: 'TechStart Inc.',
      description: 'Executive team headshots',
      location: 'Los Angeles, CA',
    },
    {
      id: 5,
      category: 'weddings',
      title: 'David & Rachel',
      description: 'Elegant ballroom ceremony',
      location: 'Beverly Hills, CA',
    },
    {
      id: 6,
      category: 'events',
      title: 'Annual Gala 2024',
      description: 'Charity fundraiser event',
      location: 'Downtown LA',
    },
    {
      id: 7,
      category: 'families',
      title: 'The Martinez Family',
      description: 'Holiday portrait session',
      location: 'Pasadena, CA',
    },
    {
      id: 8,
      category: 'lifestyle',
      title: 'Morning Coffee',
      description: 'Lifestyle brand photography',
      location: 'West Hollywood, CA',
    },
    {
      id: 9,
      category: 'portraits',
      title: 'Alexander Chen',
      description: 'Professional headshot',
      location: 'Studio City, CA',
    },
    {
      id: 10,
      category: 'weddings',
      title: 'Jennifer & Mark',
      description: 'Vineyard wedding',
      location: 'Temecula, CA',
    },
    {
      id: 11,
      category: 'corporate',
      title: 'Modern Workspace',
      description: 'Office environment photography',
      location: 'Culver City, CA',
    },
    {
      id: 12,
      category: 'lifestyle',
      title: 'Urban Living',
      description: 'Downtown lifestyle shoot',
      location: 'Los Angeles, CA',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-[#2d3142] to-[#4f5d75]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#bfc0c0] tracking-[0.3em] uppercase text-sm mb-4">
              Our Work
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-[#bfc0c0] max-w-2xl mx-auto leading-relaxed">
              Explore our collection of cherished moments, captured with care and creativity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#2d3142] text-white'
                    : 'bg-gray-100 text-[#4f5d75] hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-[#2d3142] to-[#4f5d75] overflow-hidden mb-4">
                    {/* Placeholder Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="text-white opacity-20" size={64} />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#2d3142] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white" size={32} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-[#2d3142] mb-1 group-hover:text-[#4f5d75] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4f5d75] mb-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-[#bfc0c0] uppercase tracking-wider">
                      {item.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera className="text-[#bfc0c0] mx-auto mb-4" size={64} />
              <h3 className="font-serif text-2xl text-[#2d3142] mb-2">
                No projects found
              </h3>
              <p className="text-[#4f5d75]">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#bfc0c0] transition-colors text-4xl font-light"
              >
                ×
              </button>
              <div className="aspect-[4/3] bg-gradient-to-br from-[#2d3142] to-[#4f5d75] flex items-center justify-center">
                <Camera className="text-white opacity-20" size={96} />
              </div>
              {portfolioItems.find(item => item.id === selectedImage) && (
                <div className="mt-6 text-white text-center">
                  <h3 className="font-serif text-2xl mb-2">
                    {portfolioItems.find(item => item.id === selectedImage)?.title}
                  </h3>
                  <p className="text-[#bfc0c0]">
                    {portfolioItems.find(item => item.id === selectedImage)?.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d3142] mb-6">
              Love What You See?
            </h2>
            <p className="text-xl text-[#4f5d75] mb-10 leading-relaxed">
              Let&apos;s create something beautiful together. Book your session today
              and experience the Lens & Light difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('packages')}
                className="px-8 py-4 bg-[#2d3142] text-white font-medium hover:bg-[#4f5d75] transition-all duration-300"
              >
                View Packages
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 border-2 border-[#2d3142] text-[#2d3142] font-medium hover:bg-[#2d3142] hover:text-white transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
