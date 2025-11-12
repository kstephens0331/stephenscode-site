'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'

interface GenericDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function GenericDemo({ demo, viewMode }: GenericDemoProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})

  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen" style={{ background: `linear-gradient(to bottom, ${demo.colors.primary}, ${demo.colors.secondary})` }}>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard - {demo.name}</h1>
              <p className="text-gray-600">{demo.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-blue-600 text-3xl mb-2">📊</div>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Total Visitors</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-green-600 text-3xl mb-2">📝</div>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Form Submissions</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-purple-600 text-3xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Admin Dashboard</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This is a simplified preview. The full version includes analytics, content management,
                user management, reporting tools, and all the features listed for this package.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Customer View
  const layoutClass =
    demo.layout === 'modern' ? 'font-sans' :
    demo.layout === 'classic' ? 'font-serif' :
    demo.layout === 'minimal' ? 'font-light' :
    demo.layout === 'bold' ? 'font-black' :
    demo.layout === 'elegant' ? 'font-serif' :
    'font-mono'

  return (
    <div className={`min-h-screen ${layoutClass}`}>
      {/* Hero Section */}
      <header
        className="relative h-screen flex items-center justify-center text-white"
        style={{ background: `linear-gradient(135deg, ${demo.colors.primary} 0%, ${demo.colors.secondary} 50%, ${demo.colors.accent} 100%)` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{demo.name}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{demo.description}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors" style={{ color: demo.colors.primary }}>
              Get Started
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {demo.features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  activeTab === index
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={activeTab === index ? { backgroundColor: demo.colors.primary } : {}}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-6" style={{ color: demo.colors.primary }}>
              {demo.features[activeTab]}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              This section demonstrates the "{demo.features[activeTab]}" feature. In a live site, this would contain
              specific content, functionality, and interactivity related to this feature.
            </p>

            {/* Interactive Form Demo */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Try it Out</h3>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault()
                alert('Form submitted! (Demo only - no data is actually sent)')
              }}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-white text-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: demo.colors.accent }}
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demo.features.slice(0, 6).map((feature, index) => (
                <div key={index} className="border-2 rounded-lg p-6" style={{ borderColor: demo.colors.accent + '40' }}>
                  <div className="text-3xl mb-3">✓</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{feature}</h4>
                  <p className="text-gray-600 text-sm">
                    Fully functional {feature.toLowerCase()} integrated into your website.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 text-white text-center" style={{ background: `linear-gradient(to right, ${demo.colors.primary}, ${demo.colors.secondary})` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Build a website like this for your business with {demo.package}
          </p>
          <button className="bg-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105" style={{ color: demo.colors.primary }}>
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  )
}
