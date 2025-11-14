'use client'

import { Heart, Award, Users, Sparkles } from 'lucide-react'

export default function AboutPage({ setCurrentPage }: any) {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Bella Boutique</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where timeless elegance meets contemporary fashion. Discover the story behind your favorite boutique.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2015, Bella Boutique began with a simple vision: to create a shopping experience that celebrates individual style while offering the highest quality fashion pieces.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                What started as a small boutique in downtown Manhattan has grown into a beloved destination for fashion enthusiasts who appreciate timeless elegance and contemporary design.
              </p>
              <p className="text-lg text-gray-600">
                Today, we curate collections from both established designers and emerging talents, ensuring every piece meets our standards of quality, style, and craftsmanship.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
                alt="Bella Boutique Story"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600">Our core values guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">We're passionate about fashion and helping you discover your unique style</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">Every piece is carefully selected for exceptional quality and craftsmanship</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Building a community of fashion lovers who inspire and support each other</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Staying ahead of trends while honoring timeless elegance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Bella Boutique</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Isabella Martinez</h3>
              <p className="text-[var(--color-primary)] font-semibold mb-2">Founder & Creative Director</p>
              <p className="text-gray-600">15 years of experience in luxury fashion</p>
            </div>
            <div className="text-center">
              <div className="aspect-square mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Emma Chen</h3>
              <p className="text-[var(--color-primary)] font-semibold mb-2">Head Stylist</p>
              <p className="text-gray-600">Certified fashion stylist with a keen eye for trends</p>
            </div>
            <div className="text-center">
              <div className="aspect-square mb-6 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Sophie Anderson</h3>
              <p className="text-[var(--color-primary)] font-semibold mb-2">Customer Experience Manager</p>
              <p className="text-gray-600">Dedicated to making your shopping experience exceptional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">9</p>
              <p className="text-xl opacity-90">Years in Business</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10k+</p>
              <p className="text-xl opacity-90">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-xl opacity-90">Designer Pieces</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-xl opacity-90">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Discover Your Style?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our curated collections and find pieces that express your unique personality
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  )
}
