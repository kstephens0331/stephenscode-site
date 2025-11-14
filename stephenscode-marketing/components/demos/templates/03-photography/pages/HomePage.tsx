'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Award, Users, ArrowRight, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Camera,
      title: 'Professional Equipment',
      description: 'State-of-the-art cameras and lighting to capture every detail perfectly.',
    },
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'Every photo is crafted with care, creativity, and attention to detail.',
    },
    {
      icon: Award,
      title: 'Award-Winning Work',
      description: 'Recognized for outstanding photography across multiple categories.',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your vision and satisfaction are our top priorities from start to finish.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael Thompson',
      role: 'Wedding Clients',
      content: 'The photos from our wedding day are absolutely stunning. Every emotion, every detail captured perfectly. We couldn\'t be happier!',
      rating: 5,
    },
    {
      name: 'Jessica Martinez',
      role: 'Family Portrait Session',
      content: 'Working with Lens & Light was a dream. They made our family feel comfortable and the results are gallery-worthy.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Corporate Headshots',
      content: 'Professional, efficient, and the headshots look incredible. Highly recommend for any business photography needs.',
      rating: 5,
    },
  ];

  const portfolioPreview = [
    {
      category: 'Weddings',
      image: 'wedding',
      description: 'Timeless moments from your special day',
    },
    {
      category: 'Families',
      image: 'family',
      description: 'Cherished memories with loved ones',
    },
    {
      category: 'Portraits',
      image: 'portrait',
      description: 'Artistic individual expressions',
    },
    {
      category: 'Corporate',
      image: 'corporate',
      description: 'Professional business imagery',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Lens & Light Photography - Professional Photography Services</title>
        <meta
          name="description"
          content="Professional photography services in Studio City. Specializing in weddings, family portraits, corporate events, and lifestyle photography. Award-winning photographer with 10+ years experience."
        />
        <meta name="keywords" content="photography, wedding photographer, family portraits, corporate photography, Studio City photographer, professional photographer" />
        <meta property="og:title" content="Lens & Light Photography - Professional Photography Services" />
        <meta property="og:description" content="Capturing life's precious moments with artistry and passion. Professional photography for weddings, families, and businesses." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] bg-gradient-to-br from-[#2d3142] via-[#4f5d75] to-[#2d3142] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#bfc0c0] tracking-[0.3em] uppercase text-sm mb-6">
              Professional Photography
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
              Capturing Life&apos;s<br />Precious Moments
            </h1>
            <p className="text-xl text-[#bfc0c0] mb-10 max-w-2xl mx-auto leading-relaxed">
              Award-winning photography that tells your unique story with
              artistry, passion, and attention to every beautiful detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-8 py-4 bg-white text-[#2d3142] font-medium hover:bg-[#bfc0c0] transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              >
                View Portfolio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-[#2d3142] transition-all duration-300"
              >
                Book Your Session
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#4f5d75] tracking-[0.2em] uppercase text-sm mb-4">
                Why Choose Us
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d3142] mb-6">
                Excellence in Every Frame
              </h2>
              <p className="text-lg text-[#4f5d75] max-w-2xl mx-auto">
                With over 10 years of experience and hundreds of satisfied clients,
                we bring expertise and artistry to every session.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-[#2d3142] rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="font-serif text-xl text-[#2d3142] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#4f5d75] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#4f5d75] tracking-[0.2em] uppercase text-sm mb-4">
                Our Work
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d3142] mb-6">
                Recent Projects
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioPreview.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('portfolio')}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-[#2d3142] to-[#4f5d75] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="text-white opacity-20" size={64} />
                  </div>
                  <div className="absolute inset-0 bg-[#2d3142] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center px-6">
                      <h3 className="font-serif text-2xl text-white mb-2">
                        {item.category}
                      </h3>
                      <p className="text-[#bfc0c0] text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-8 py-4 bg-[#2d3142] text-white font-medium hover:bg-[#4f5d75] transition-all duration-300 inline-flex items-center gap-2 group"
            >
              View Full Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#4f5d75] tracking-[0.2em] uppercase text-sm mb-4">
                Testimonials
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2d3142] mb-6">
                What Our Clients Say
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-[#2d3142] text-[#2d3142]" />
                  ))}
                </div>
                <p className="text-[#4f5d75] leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-serif text-[#2d3142] text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#4f5d75]">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#2d3142] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Ready to Create Beautiful Memories?
            </h2>
            <p className="text-xl text-[#bfc0c0] mb-10 leading-relaxed">
              Let&apos;s discuss your vision and create stunning photographs
              that you&apos;ll treasure forever.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-white text-[#2d3142] font-medium hover:bg-[#bfc0c0] transition-all duration-300 inline-flex items-center gap-2 group"
            >
              Book Your Session
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
