'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, Filter } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState<{ [key: number]: number }>({});

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'lawns', name: 'Lawn Care' },
    { id: 'design', name: 'Landscape Design' },
    { id: 'hardscape', name: 'Hardscaping' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  const projects = [
    {
      id: 1,
      category: 'design',
      title: 'Modern Backyard Transformation',
      location: 'Oakwood Estates',
      description: 'Complete backyard renovation featuring native plants, raised beds, and a custom patio area.',
      beforeAfter: true,
      services: ['Landscape Design', 'Hardscaping', 'Planting'],
      duration: '3 weeks',
      size: '2,500 sq ft'
    },
    {
      id: 2,
      category: 'hardscape',
      title: 'Custom Stone Patio & Fire Pit',
      location: 'Riverside Drive',
      description: 'Elegant natural stone patio with built-in fire pit and seating walls for entertaining.',
      beforeAfter: true,
      services: ['Hardscaping', 'Outdoor Living'],
      duration: '2 weeks',
      size: '800 sq ft'
    },
    {
      id: 3,
      category: 'lawns',
      title: 'Lawn Restoration Project',
      location: 'Maple Street',
      description: 'Transformed a patchy, weed-filled lawn into a lush, green masterpiece.',
      beforeAfter: true,
      services: ['Lawn Care', 'Soil Amendment', 'Seeding'],
      duration: '6 weeks',
      size: '5,000 sq ft'
    },
    {
      id: 4,
      category: 'design',
      title: 'Front Yard Curb Appeal',
      location: 'Willow Creek',
      description: 'Enhanced home value with strategic plantings, mulch beds, and decorative stone.',
      beforeAfter: true,
      services: ['Landscape Design', 'Planting', 'Mulching'],
      duration: '1 week',
      size: '1,200 sq ft'
    },
    {
      id: 5,
      category: 'irrigation',
      title: 'Smart Irrigation Installation',
      location: 'Garden Hills',
      description: 'WiFi-enabled irrigation system with drip lines for efficient water management.',
      beforeAfter: true,
      services: ['Irrigation', 'Smart Technology'],
      duration: '3 days',
      size: '8 zones'
    },
    {
      id: 6,
      category: 'hardscape',
      title: 'Walkway & Retaining Wall',
      location: 'Highland Park',
      description: 'Beautiful curved walkway with terraced retaining walls for sloped property.',
      beforeAfter: true,
      services: ['Hardscaping', 'Drainage Solutions'],
      duration: '2 weeks',
      size: '150 linear ft'
    },
    {
      id: 7,
      category: 'seasonal',
      title: 'Spring Cleanup & Refresh',
      location: 'Cedar Lane',
      description: 'Complete spring cleanup with fresh mulch, pruning, and seasonal flower planting.',
      beforeAfter: true,
      services: ['Seasonal Cleanup', 'Mulching', 'Planting'],
      duration: '2 days',
      size: '3,000 sq ft'
    },
    {
      id: 8,
      category: 'design',
      title: 'Shade Garden Installation',
      location: 'Forest View',
      description: 'Custom shade garden with hostas, ferns, and woodland plants under mature trees.',
      beforeAfter: true,
      services: ['Landscape Design', 'Planting', 'Edging'],
      duration: '1 week',
      size: '600 sq ft'
    },
    {
      id: 9,
      category: 'hardscape',
      title: 'Outdoor Kitchen & Dining',
      location: 'Summit Ridge',
      description: 'Complete outdoor kitchen with built-in grill, counters, and dining patio.',
      beforeAfter: true,
      services: ['Hardscaping', 'Outdoor Living', 'Lighting'],
      duration: '4 weeks',
      size: '400 sq ft'
    },
    {
      id: 10,
      category: 'lawns',
      title: 'Lawn Aeration & Overseeding',
      location: 'Meadowbrook',
      description: 'Professional aeration and overseeding transformed this thin lawn.',
      beforeAfter: true,
      services: ['Lawn Care', 'Aeration', 'Seeding'],
      duration: '1 day + growth',
      size: '4,000 sq ft'
    },
    {
      id: 11,
      category: 'irrigation',
      title: 'Drip Irrigation for Gardens',
      location: 'Blossom Court',
      description: 'Efficient drip irrigation system for flower beds and vegetable gardens.',
      beforeAfter: true,
      services: ['Irrigation', 'Garden Care'],
      duration: '2 days',
      size: '12 beds'
    },
    {
      id: 12,
      category: 'design',
      title: 'Low-Maintenance Landscape',
      location: 'Sunset Hills',
      description: 'Drought-tolerant landscape design with native plants and rock features.',
      beforeAfter: true,
      services: ['Landscape Design', 'Native Plants', 'Mulching'],
      duration: '2 weeks',
      size: '3,500 sq ft'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleSliderChange = (projectId: number, value: number) => {
    setBeforeAfterSlider(prev => ({
      ...prev,
      [projectId]: value
    }));
  };

  const getSliderValue = (projectId: number) => {
    return beforeAfterSlider[projectId] ?? 50;
  };

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#386641] to-[#6a994e] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Project Gallery
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Transformations
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              See the difference professional landscaping makes. Browse our before and after projects showcasing quality craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-6 shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Filter className="h-5 w-5 text-[#386641]" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#386641] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const sliderValue = getSliderValue(project.id);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  {/* Before/After Image with Slider */}
                  <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden group">
                    {/* Before Image (Background) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-6xl font-bold opacity-20">BEFORE</div>
                      </div>
                    </div>

                    {/* After Image (Foreground with clip) */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#6a994e] to-[#a7c957] flex items-center justify-center"
                      style={{
                        clipPath: `inset(0 ${100 - sliderValue}% 0 0)`
                      }}
                    >
                      <div className="text-white text-center">
                        <div className="text-6xl font-bold opacity-20">AFTER</div>
                      </div>
                    </div>

                    {/* Slider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                      style={{ left: `${sliderValue}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
                        <ChevronLeft className="h-4 w-4 text-[#386641] absolute left-1" />
                        <ChevronRight className="h-4 w-4 text-[#386641] absolute right-1" />
                      </div>
                    </div>

                    {/* Slider Input */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => handleSliderChange(project.id, parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                    />

                    {/* Labels */}
                    <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                      BEFORE
                    </div>
                    <div className="absolute top-4 right-4 bg-[#386641]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                      AFTER
                    </div>

                    {/* Zoom Icon */}
                    <button
                      onClick={() => setSelectedProject(project.id)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                    >
                      <ZoomIn className="h-5 w-5 text-[#386641]" />
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#386641] mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{project.location}</p>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-semibold text-[#386641]">{project.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Size</div>
                        <div className="font-semibold text-[#386641]">{project.size}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-[#a7c957]/20 text-[#386641] px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: '2,500+', label: 'Projects Completed', color: 'from-[#386641] to-[#6a994e]' },
              { number: '98%', label: 'Satisfaction Rate', color: 'from-[#6a994e] to-[#a7c957]' },
              { number: '15+', label: 'Years Experience', color: 'from-[#386641] to-[#6a994e]' },
              { number: '500+', label: '5-Star Reviews', color: 'from-[#6a994e] to-[#a7c957]' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-white">{stat.number}</span>
                </div>
                <div className="font-semibold text-[#386641]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#386641] to-[#6a994e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us create a beautiful outdoor space you'll love. Get your free estimate today.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#a7c957] text-[#386641] px-10 py-5 rounded-lg font-bold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
          >
            Get Free Estimate
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden">
            {(() => {
              const project = projects.find(p => p.id === selectedProject);
              if (!project) return null;

              const sliderValue = getSliderValue(selectedProject);

              return (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image Section */}
                  <div className="relative aspect-square bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-8xl font-bold opacity-20">BEFORE</div>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#6a994e] to-[#a7c957] flex items-center justify-center"
                      style={{
                        clipPath: `inset(0 ${100 - sliderValue}% 0 0)`
                      }}
                    >
                      <div className="text-white text-center">
                        <div className="text-8xl font-bold opacity-20">AFTER</div>
                      </div>
                    </div>

                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                      style={{ left: `${sliderValue}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
                        <ChevronLeft className="h-5 w-5 text-[#386641] absolute left-1.5" />
                        <ChevronRight className="h-5 w-5 text-[#386641] absolute right-1.5" />
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => handleSliderChange(selectedProject, parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                    />

                    <div className="absolute top-6 left-6 bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                      BEFORE
                    </div>
                    <div className="absolute top-6 right-6 bg-[#386641]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                      AFTER
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-[#386641] mb-4">{project.title}</h2>
                    <p className="text-lg text-gray-500 mb-6">{project.location}</p>
                    <p className="text-gray-700 text-lg mb-8">{project.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-stone-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Duration</div>
                        <div className="text-xl font-bold text-[#386641]">{project.duration}</div>
                      </div>
                      <div className="bg-stone-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Size</div>
                        <div className="text-xl font-bold text-[#386641]">{project.size}</div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-bold text-[#386641] mb-3">Services Provided:</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="bg-[#a7c957] text-[#386641] px-4 py-2 rounded-lg text-sm font-semibold"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full bg-[#386641] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#6a994e] transition-all shadow-lg"
                    >
                      Get a Similar Quote
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
