'use client'

import { ArrowRight } from 'lucide-react'

export default function CollectionsPage({ setCurrentPage }: any) {
  const collections = [
    {
      id: 'spring-2024',
      name: 'Spring 2024',
      description: 'Fresh, vibrant pieces for the new season',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      items: 42,
      featured: true
    },
    {
      id: 'evening-wear',
      name: 'Evening Elegance',
      description: 'Sophisticated styles for special occasions',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
      items: 28,
      featured: true
    },
    {
      id: 'casual-chic',
      name: 'Casual Chic',
      description: 'Effortlessly stylish everyday wear',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      items: 56,
      featured: false
    },
    {
      id: 'office-edit',
      name: 'The Office Edit',
      description: 'Professional pieces that mean business',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800',
      items: 34,
      featured: false
    },
    {
      id: 'weekend-ready',
      name: 'Weekend Ready',
      description: 'Relaxed styles for your days off',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
      items: 45,
      featured: false
    },
    {
      id: 'luxe-essentials',
      name: 'Luxe Essentials',
      description: 'Timeless pieces worth investing in',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c819b?w=800',
      items: 31,
      featured: false
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Collections</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully curated collections designed to inspire your personal style journey
          </p>
        </div>

        {/* Featured Collections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collections.filter(c => c.featured).map((collection) => (
              <button
                key={collection.id}
                onClick={() => setCurrentPage('shop')}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-white/90 text-lg mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{collection.items} items</span>
                    <div className="flex items-center text-white font-semibold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Collections */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setCurrentPage('shop')}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all bg-white"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-white/90 mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{collection.items} items</span>
                    <div className="flex items-center text-white font-semibold">
                      <span>View</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-600 mb-8">Browse our complete product catalog</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Shop All Products
          </button>
        </div>
      </div>
    </div>
  )
}
