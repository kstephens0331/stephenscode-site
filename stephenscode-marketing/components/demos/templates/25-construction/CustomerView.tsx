'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import Layout from './components/Layout'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false)
  const [showClientPortal, setShowClientPortal] = useState(false)
  const [quoteData, setQuoteData] = useState({
    projectType: '',
    sqft: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    details: ''
  })

  const renderPage = () => {
    const commonProps = { colors, onNavigate: setCurrentPage, onQuoteOpen: () => setShowQuoteBuilder(true) }

    if (currentPage === 'home') {
      return (
        <div>
          <section style={{ backgroundColor: '#1a1a1a', minHeight: '600px' }} className="py-32">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl">
                <div style={{ color: '#ffa300' }} className="text-sm font-bold uppercase tracking-widest mb-4">
                  Licensed & Insured • 25+ Years Experience
                </div>
                <h1 style={{ color: '#ffffff' }} className="text-6xl md:text-7xl font-black leading-tight mb-6">
                  Building Dreams<br />Into Reality
                </h1>
                <p style={{ color: '#cccccc' }} className="text-xl leading-relaxed mb-10">
                  From custom homes to commercial projects, BuildRight Construction delivers exceptional craftsmanship,
                  on-time completion, and transparent pricing. Experience the difference of working with true professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowQuoteBuilder(true)}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Get Free Quote
                  </button>
                  <button
                    onClick={() => setCurrentPage('portfolio')}
                    style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ff6700' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-80 transition"
                  >
                    View Our Work
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 style={{ color: '#1a1a1a' }} className="text-5xl font-black mb-4">Our Services</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { icon: '🏠', title: 'Custom Homes', desc: 'Build your dream home from the ground up' },
                  { icon: '🔨', title: 'Remodeling', desc: 'Transform your existing space' },
                  { icon: '🏢', title: 'Commercial', desc: 'Office and retail construction' },
                  { icon: '➕', title: 'Additions', desc: 'Expand your living space' }
                ].map((service) => (
                  <div key={service.title} style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center hover:shadow-xl transition">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-3">{service.title}</h3>
                    <p style={{ color: '#666666' }}>{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#ff6700' }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 style={{ color: '#ffffff' }} className="text-5xl font-black mb-6">
                Ready to Start Your Project?
              </h2>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-10">
                Get a detailed quote in minutes with our interactive quote builder
              </p>
              <button
                onClick={() => setShowQuoteBuilder(true)}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Build Your Quote Now
              </button>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'services') {
      const services = [
        {
          name: 'Custom Home Construction',
          price: 'Starting at $350/sqft',
          features: ['Architectural design collaboration', 'Premium materials selection', 'Energy-efficient construction', 'Smart home integration', '2-year workmanship warranty']
        },
        {
          name: 'Kitchen Remodeling',
          price: '$45,000 - $125,000',
          features: ['3D design visualization', 'Custom cabinetry', 'High-end appliances', 'Countertop installation', 'Licensed plumbing & electrical']
        },
        {
          name: 'Bathroom Renovation',
          price: '$18,000 - $65,000',
          features: ['Luxury fixtures & finishes', 'Tile & stonework', 'Custom vanities', 'Walk-in showers', 'Heated flooring options']
        },
        {
          name: 'Home Additions',
          price: '$200 - $450/sqft',
          features: ['Foundation to finish', 'Permits & inspections', 'Match existing architecture', 'HVAC integration', 'Seamless integration']
        }
      ]

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Our Services</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Comprehensive construction solutions for residential and commercial projects
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="space-y-8">
                {services.map((service) => (
                  <div key={service.name} style={{ backgroundColor: '#f8f8f8', border: '3px solid #ff6700' }} className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 style={{ color: '#1a1a1a' }} className="text-3xl font-black">{service.name}</h3>
                      <div style={{ color: '#ff6700' }} className="text-2xl font-black">{service.price}</div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span style={{ color: '#ff6700' }}>✓</span>
                          <span style={{ color: '#333333' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowQuoteBuilder(true)}
                      style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                      className="px-8 py-3 font-bold hover:opacity-90 transition"
                    >
                      Get Quote for This Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'portfolio') {
      const projects = [
        { title: 'Modern Farmhouse - Austin, TX', type: 'Custom Home', sqft: '3,200 sqft', value: '$1.2M', image: '🏡' },
        { title: 'Downtown Office Renovation', type: 'Commercial', sqft: '12,000 sqft', value: '$850K', image: '🏢' },
        { title: 'Luxury Kitchen Remodel', type: 'Remodeling', sqft: '450 sqft', value: '$95K', image: '🔪' },
        { title: 'Master Suite Addition', type: 'Addition', sqft: '800 sqft', value: '$275K', image: '🛏️' },
        { title: 'Craftsman Restoration', type: 'Remodeling', sqft: '2,800 sqft', value: '$425K', image: '🏠' },
        { title: 'Retail Buildout', type: 'Commercial', sqft: '5,500 sqft', value: '$380K', image: '🏬' }
      ]

      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Our Portfolio</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Explore our completed projects and see the BuildRight difference
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.title} style={{ backgroundColor: '#f8f8f8' }} className="overflow-hidden hover:shadow-xl transition">
                    <div style={{ backgroundColor: '#ff6700', height: '250px' }} className="flex items-center justify-center text-9xl">
                      {project.image}
                    </div>
                    <div className="p-6">
                      <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="inline-block px-3 py-1 text-xs font-bold uppercase mb-3">
                        {project.type}
                      </div>
                      <h3 style={{ color: '#1a1a1a' }} className="text-xl font-black mb-3">{project.title}</h3>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>📏 {project.sqft}</div>
                        <div>💰 Project Value: {project.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'client-portal') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Client Portal</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Access your project documents, photos, and timeline 24/7
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-4xl mx-auto px-4">
              <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
                <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black text-center mb-8">
                  Client Portal Login
                </h2>
                <form className="space-y-6 max-w-md mx-auto">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email Address</label>
                    <input
                      type="email"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Password</label>
                    <input
                      type="password"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => { e.preventDefault(); setShowClientPortal(true); }}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Access My Projects
                  </button>
                </form>

                <div style={{ backgroundColor: '#ffffff', border: '3px solid #ff6700' }} className="p-8 mt-12">
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-4">Portal Features:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'View project photos & updates',
                      'Access blueprints & documents',
                      'Track project timeline',
                      'Review invoices & payments',
                      'Message your project manager',
                      'Approve change orders',
                      'Schedule site visits',
                      'Download completion certificates'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span style={{ color: '#ff6700' }}>✓</span>
                        <span style={{ color: '#333333' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'tracking') {
      return (
        <div>
          <section style={{ backgroundColor: '#ff6700' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Project Tracking</h1>
              <p style={{ color: '#1a1a1a' }} className="text-xl font-bold">
                Real-time updates on your construction project timeline
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 mb-8">
                <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Sample Project Timeline</h2>
                <div className="space-y-6">
                  {[
                    { phase: 'Planning & Permits', status: 'Completed', progress: 100, date: 'Week 1-2' },
                    { phase: 'Foundation & Framing', status: 'Completed', progress: 100, date: 'Week 3-5' },
                    { phase: 'Electrical & Plumbing', status: 'In Progress', progress: 75, date: 'Week 6-7' },
                    { phase: 'Drywall & Insulation', status: 'Scheduled', progress: 0, date: 'Week 8-9' },
                    { phase: 'Finishes & Fixtures', status: 'Upcoming', progress: 0, date: 'Week 10-12' },
                    { phase: 'Final Inspection', status: 'Upcoming', progress: 0, date: 'Week 13' }
                  ].map((phase) => (
                    <div key={phase.phase}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span style={{ color: '#1a1a1a' }} className="font-black text-lg">{phase.phase}</span>
                          <span style={{
                            backgroundColor: phase.status === 'Completed' ? '#22c55e' :
                                          phase.status === 'In Progress' ? '#fbbf24' : '#9ca3af',
                            color: '#ffffff'
                          }} className="ml-3 px-3 py-1 text-xs font-bold uppercase">
                            {phase.status}
                          </span>
                        </div>
                        <span style={{ color: '#666666' }} className="text-sm font-bold">{phase.date}</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: '#ff6700', width: `${phase.progress}%` }}
                          className="h-full transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    // Default fallback for other pages
    return (
      <div>
        <section style={{ backgroundColor: '#ff6700' }} className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
          </div>
        </section>
        <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-4">
            <p style={{ color: '#666666' }} className="text-center">Page content for {currentPage}</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onQuoteOpen={() => setShowQuoteBuilder(true)}
    >
      {renderPage()}

      {/* Interactive Quote Builder Modal */}
      {showQuoteBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-black">Interactive Quote Builder</h3>
              <button onClick={() => setShowQuoteBuilder(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 mb-8 text-center">
                <h4 className="text-2xl font-black mb-2">Get an Instant Estimate</h4>
                <p>Answer a few questions to receive a detailed project quote</p>
              </div>

              <form className="space-y-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Project Type *</label>
                  <select
                    value={quoteData.projectType}
                    onChange={(e) => setQuoteData({ ...quoteData, projectType: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Select project type</option>
                    <option value="custom-home">Custom Home</option>
                    <option value="remodel">Remodeling</option>
                    <option value="addition">Home Addition</option>
                    <option value="commercial">Commercial Build</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Approximate Square Footage</label>
                    <input
                      type="number"
                      value={quoteData.sqft}
                      onChange={(e) => setQuoteData({ ...quoteData, sqft: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Timeline</label>
                    <select
                      value={quoteData.timeline}
                      onChange={(e) => setQuoteData({ ...quoteData, timeline: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (1-3 months)</option>
                      <option value="flexible">Flexible (3-6 months)</option>
                      <option value="planning">Just Planning (6+ months)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Budget Range</label>
                  <select
                    value={quoteData.budget}
                    onChange={(e) => setQuoteData({ ...quoteData, budget: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Select budget range</option>
                    <option value="50k">$25,000 - $50,000</option>
                    <option value="100k">$50,000 - $100,000</option>
                    <option value="250k">$100,000 - $250,000</option>
                    <option value="500k">$250,000 - $500,000</option>
                    <option value="500k+">$500,000+</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Project Details</label>
                  <textarea
                    value={quoteData.details}
                    onChange={(e) => setQuoteData({ ...quoteData, details: e.target.value })}
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-32"
                    placeholder="Tell us about your project vision, specific requirements, or questions..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Name *</label>
                    <input
                      type="text"
                      value={quoteData.name}
                      onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      value={quoteData.email}
                      onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Get My Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Client Portal Demo Modal */}
      {showClientPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-black">My Projects Dashboard</h3>
              <button onClick={() => setShowClientPortal(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Project Status</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-1">In Progress</div>
                  <div style={{ color: '#22c55e' }} className="text-sm font-bold">65% Complete</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Estimated Completion</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-1">Mar 15</div>
                  <div style={{ color: '#ff6700' }} className="text-sm font-bold">On Schedule</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-6">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Recent Updates</div>
                  <div style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-1">12</div>
                  <div style={{ color: '#666666' }} className="text-sm font-bold">This Week</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 mb-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Recent Project Photos</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {['🏗️', '🔨', '🪜', '🎨', '💡', '🚪', '🪟', '🛠️'].map((icon, idx) => (
                    <div key={idx} style={{ backgroundColor: '#ff6700', height: '150px' }} className="flex items-center justify-center text-6xl">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Project Documents</h3>
                <div className="space-y-3">
                  {[
                    'Blueprints - Final Version.pdf',
                    'Building Permits - Approved.pdf',
                    'Material Selections.pdf',
                    'Change Order #2 - Approved.pdf',
                    'Invoice #3 - Paid.pdf'
                  ].map((doc) => (
                    <div key={doc} style={{ backgroundColor: '#ffffff' }} className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <span style={{ color: '#1a1a1a' }} className="font-bold">{doc}</span>
                      </div>
                      <button style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
