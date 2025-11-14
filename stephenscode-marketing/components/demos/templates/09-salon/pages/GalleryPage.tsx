import React, { useState } from 'react';
import { Image, Filter, Heart, Instagram, Share2 } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'color', name: 'Hair Color' },
    { id: 'bridal', name: 'Bridal' },
    { id: 'everyday', name: 'Everyday Looks' },
    { id: 'special', name: 'Special Occasions' },
    { id: 'nails', name: 'Nail Art' },
    { id: 'beforeafter', name: 'Before & After' },
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'color',
      type: 'Hair Color Transformation',
      title: 'Dimensional Balayage',
      stylist: 'Jessica Ramirez',
      description: 'Rich caramel balayage with face-framing highlights',
      likes: 342,
      emoji: '🌟',
      service: 'Balayage',
    },
    {
      id: 2,
      category: 'color',
      type: 'Hair Color Transformation',
      title: 'Platinum Blonde',
      stylist: 'Jessica Ramirez',
      description: 'Full platinum transformation with purple toner',
      likes: 489,
      emoji: '💎',
      service: 'Full Highlights + Toner',
    },
    {
      id: 3,
      category: 'color',
      type: 'Hair Color Transformation',
      title: 'Rose Gold Dreams',
      stylist: 'Jessica Ramirez',
      description: 'Soft rose gold color melt with lived-in roots',
      likes: 567,
      emoji: '🌸',
      service: 'Color Melt',
    },
    {
      id: 4,
      category: 'bridal',
      type: 'Bridal Style',
      title: 'Classic Bridal Updo',
      stylist: 'Maria Santos',
      description: 'Elegant low bun with soft curls and pearl accessories',
      likes: 423,
      emoji: '👰',
      service: 'Bridal Hair & Makeup',
    },
    {
      id: 5,
      category: 'bridal',
      type: 'Bridal Style',
      title: 'Romantic Half-Up Style',
      stylist: 'Maria Santos',
      description: 'Loose waves with braided details and fresh flowers',
      likes: 501,
      emoji: '💐',
      service: 'Bridal Hair',
    },
    {
      id: 6,
      category: 'bridal',
      type: 'Bridal Style',
      title: 'Modern Bridal Look',
      stylist: 'Maria Santos',
      description: 'Sleek low ponytail with dramatic makeup',
      likes: 378,
      emoji: '✨',
      service: 'Bridal Hair & Makeup',
    },
    {
      id: 7,
      category: 'everyday',
      type: 'Everyday Look',
      title: 'Lived-In Layers',
      stylist: 'Ashley Kim',
      description: 'Long layers with curtain bangs and natural movement',
      likes: 289,
      emoji: '💁‍♀️',
      service: 'Haircut + Style',
    },
    {
      id: 8,
      category: 'everyday',
      type: 'Everyday Look',
      title: 'Classic Bob',
      stylist: 'Jessica Ramirez',
      description: 'Textured bob with subtle highlights',
      likes: 312,
      emoji: '💇‍♀️',
      service: 'Haircut + Partial Highlights',
    },
    {
      id: 9,
      category: 'everyday',
      type: 'Everyday Look',
      title: 'Bouncy Blowout',
      stylist: 'Ashley Kim',
      description: 'Voluminous blowout with soft curls',
      likes: 267,
      emoji: '🎀',
      service: 'Blowout',
    },
    {
      id: 10,
      category: 'special',
      type: 'Special Occasion',
      title: 'Prom Glam',
      stylist: 'Maria Santos',
      description: 'High ponytail with glam waves and glitter makeup',
      likes: 445,
      emoji: '🌟',
      service: 'Prom Package',
    },
    {
      id: 11,
      category: 'special',
      type: 'Special Occasion',
      title: 'Red Carpet Ready',
      stylist: 'Ashley Kim',
      description: 'Hollywood waves with smokey eye makeup',
      likes: 523,
      emoji: '🌟',
      service: 'Special Event Package',
    },
    {
      id: 12,
      category: 'special',
      type: 'Special Occasion',
      title: 'Vintage Glamour',
      stylist: 'Maria Santos',
      description: 'Retro victory rolls with classic red lip',
      likes: 398,
      emoji: '💋',
      service: 'Vintage Styling',
    },
    {
      id: 13,
      category: 'nails',
      type: 'Nail Art',
      title: 'French Ombre',
      stylist: 'Taylor Johnson',
      description: 'Soft pink and white ombre with gold accents',
      likes: 334,
      emoji: '💅',
      service: 'Gel Manicure + Art',
    },
    {
      id: 14,
      category: 'nails',
      type: 'Nail Art',
      title: 'Floral Fantasy',
      stylist: 'Taylor Johnson',
      description: 'Hand-painted floral designs with 3D details',
      likes: 456,
      emoji: '🌺',
      service: 'Acrylic Full Set + Art',
    },
    {
      id: 15,
      category: 'nails',
      type: 'Nail Art',
      title: 'Chrome Perfection',
      stylist: 'Taylor Johnson',
      description: 'Mirror chrome nails with geometric accents',
      likes: 512,
      emoji: '✨',
      service: 'Gel Extensions + Chrome',
    },
    {
      id: 16,
      category: 'beforeafter',
      type: 'Before & After',
      title: 'Color Correction Magic',
      stylist: 'Jessica Ramirez',
      description: 'From brassy blonde to cool ash blonde',
      likes: 678,
      emoji: '🎨',
      service: 'Color Correction',
    },
    {
      id: 17,
      category: 'beforeafter',
      type: 'Before & After',
      title: 'Extension Transformation',
      stylist: 'Ashley Kim',
      description: 'From shoulder-length to mermaid hair',
      likes: 589,
      emoji: '🧜‍♀️',
      service: 'Hair Extensions',
    },
    {
      id: 18,
      category: 'beforeafter',
      type: 'Before & After',
      title: 'Damaged to Healthy',
      stylist: 'Jessica Ramirez',
      description: 'Keratin treatment transformation',
      likes: 445,
      emoji: '💆‍♀️',
      service: 'Keratin Treatment',
    },
    {
      id: 19,
      category: 'color',
      type: 'Hair Color Transformation',
      title: 'Vibrant Red',
      stylist: 'Jessica Ramirez',
      description: 'Bold cherry red with copper tones',
      likes: 412,
      emoji: '🔥',
      service: 'Fashion Color',
    },
    {
      id: 20,
      category: 'color',
      type: 'Hair Color Transformation',
      title: 'Chocolate Brown',
      stylist: 'Jessica Ramirez',
      description: 'Rich chocolate with caramel lowlights',
      likes: 356,
      emoji: '🍫',
      service: 'Single Process + Lowlights',
    },
    {
      id: 21,
      category: 'nails',
      type: 'Nail Art',
      title: 'Holiday Glam',
      stylist: 'Taylor Johnson',
      description: 'Festive design with gold leaf and crystals',
      likes: 423,
      emoji: '🎄',
      service: 'Gel Manicure + Premium Art',
    },
    {
      id: 22,
      category: 'everyday',
      type: 'Everyday Look',
      title: 'Beach Waves',
      stylist: 'Ashley Kim',
      description: 'Effortless textured waves with sea salt spray',
      likes: 301,
      emoji: '🌊',
      service: 'Beach Wave Style',
    },
    {
      id: 23,
      category: 'bridal',
      type: 'Bridal Style',
      title: 'Boho Bride',
      stylist: 'Maria Santos',
      description: 'Loose braid with baby&apos;s breath and natural makeup',
      likes: 534,
      emoji: '🌿',
      service: 'Bridal Hair & Makeup',
    },
    {
      id: 24,
      category: 'beforeafter',
      type: 'Before & After',
      title: 'Dramatic Cut',
      stylist: 'Ashley Kim',
      description: 'From long to chic lob with balayage',
      likes: 467,
      emoji: '✂️',
      service: 'Major Cut + Color',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our stunning transformations and get inspired for your next look
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Instagram className="w-6 h-6" />
            <p className="text-lg">Follow us @glamourstudio for daily inspiration</p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-md sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-4 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                {/* Image Placeholder */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-square flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <p className="text-sm font-semibold mb-1">{item.service}</p>
                      <p className="text-xs text-white/80">Click for details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">by {item.stylist}</span>
                    <div className="flex items-center text-[#d00000]">
                      <Heart className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredItems.length > 12 && (
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Transformations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
              Featured Before & After
            </h2>
            <p className="text-xl text-gray-600">Our most dramatic transformations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-square flex items-center justify-center relative">
                  <div className="text-6xl">😔</div>
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    BEFORE
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] aspect-square flex items-center justify-center relative">
                  <div className="text-6xl">🌟</div>
                  <div className="absolute top-4 right-4 bg-white text-[#d00000] px-3 py-1 rounded-full text-sm font-semibold">
                    AFTER
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Complete Color Overhaul</h3>
                <p className="text-gray-600 mb-4">
                  From damaged over-processed hair to healthy, vibrant balayage. This transformation took 5 hours and multiple treatments.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by Jessica Ramirez</span>
                  <span className="text-[#d00000] font-bold">$450</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-square flex items-center justify-center relative">
                  <div className="text-6xl">👩</div>
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    BEFORE
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#d00000] to-[#e85d04] aspect-square flex items-center justify-center relative">
                  <div className="text-6xl">👸</div>
                  <div className="absolute top-4 right-4 bg-white text-[#d00000] px-3 py-1 rounded-full text-sm font-semibold">
                    AFTER
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Extension Excellence</h3>
                <p className="text-gray-600 mb-4">
                  From thin, shoulder-length hair to thick, luxurious mermaid hair. Seamless tape-in extensions with custom color matching.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by Ashley Kim</span>
                  <span className="text-[#d00000] font-bold">$650</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Instagram className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">50K+</p>
              <p className="text-white/90">Instagram Followers</p>
            </div>
            <div>
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">15K+</p>
              <p className="text-white/90">Happy Clients</p>
            </div>
            <div>
              <Image className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">5K+</p>
              <p className="text-white/90">Transformations</p>
            </div>
            <div>
              <Share2 className="w-12 h-12 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-white/90">Social Shares</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Transformation?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointment and let us create your dream look
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('booking')}
              className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              Book Your Appointment
            </button>
            <button
              onClick={() => onNavigate('stylists')}
              className="bg-transparent border-2 border-[#d00000] text-[#d00000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#d00000] hover:text-white transition-all duration-300"
            >
              Meet Our Stylists
            </button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const item = galleryItems.find(i => i.id === selectedImage);
              if (!item) return null;
              return (
                <>
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
                    <div className="text-9xl">{item.emoji}</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                          {item.type}
                        </span>
                        <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-lg mb-4">{item.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Stylist</p>
                          <p className="font-bold">{item.stylist}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Service</p>
                          <p className="font-bold">{item.service}</p>
                        </div>
                        <div className="flex items-center text-[#d00000]">
                          <Heart className="w-6 h-6 mr-2 fill-current" />
                          <span className="text-2xl font-bold">{item.likes}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('booking')}
                      className="w-full mt-6 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                    >
                      Book Similar Service
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
