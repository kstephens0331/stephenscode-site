'use client'

import type { ColorPalette } from '@/lib/demo-colors'
import { ExternalLink, Wrench, Calendar, FileText, Shield, Star } from 'lucide-react'

interface HomePageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function HomePage({ colors, onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Real Client Showcase Banner */}
      <div className="py-3" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-semibold flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            REAL CLIENT SHOWCASE - View our actual production work
            <Star className="w-5 h-5" />
          </p>
        </div>
      </div>

      {/* Hero Section with Real Website Preview */}
      <section className="py-16" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
                Premium Auto Repair Solutions
              </h1>
              <p className="text-xl mb-8" style={{ color: colors.textLight }}>
                Showcasing our real client work: Cars Collision & Refinish Shop
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" style={{ color: colors.accent }} />
                  <span className="text-white">Certified collision repair specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="w-6 h-6" style={{ color: colors.accent }} />
                  <span className="text-white">State-of-the-art refinishing technology</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6" style={{ color: colors.accent }} />
                  <span className="text-white">Insurance claim assistance</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('estimate')}
                  className="px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                >
                  Get Free Estimate
                </button>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:opacity-90"
                  style={{ borderColor: '#ffffff', color: '#ffffff' }}
                >
                  Schedule Service
                </button>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="p-4 border-b" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold" style={{ color: colors.text }}>
                      Live Client Website
                    </h3>
                    <a
                      href="https://carscollisionandrefinishshop.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm px-3 py-1 rounded-md transition-colors hover:opacity-80"
                      style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                    >
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    This is a real website we built for Cars Collision & Refinish Shop
                  </p>
                </div>
                <div className="relative" style={{ paddingBottom: '75%' }}>
                  <iframe
                    src="https://carscollisionandrefinishshop.com"
                    className="absolute top-0 left-0 w-full h-full"
                    title="Cars Collision & Refinish Shop - Real Client Website"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Premium Features Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <button
              onClick={() => onNavigate('estimate')}
              className="p-6 rounded-lg shadow-lg transition-all hover:shadow-xl text-left"
              style={{ backgroundColor: colors.background }}
            >
              <FileText className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                Cost Estimator
              </h3>
              <p style={{ color: colors.textLight }}>
                Interactive damage assessment tool with real-time pricing
              </p>
            </button>

            <button
              onClick={() => onNavigate('schedule')}
              className="p-6 rounded-lg shadow-lg transition-all hover:shadow-xl text-left"
              style={{ backgroundColor: colors.background }}
            >
              <Calendar className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                Service Scheduling
              </h3>
              <p style={{ color: colors.textLight }}>
                Advanced booking system with automated reminders
              </p>
            </button>

            <button
              onClick={() => onNavigate('portal')}
              className="p-6 rounded-lg shadow-lg transition-all hover:shadow-xl text-left"
              style={{ backgroundColor: colors.background }}
            >
              <Shield className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                Customer Portal
              </h3>
              <p style={{ color: colors.textLight }}>
                Vehicle history tracking and service records management
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Premium Build - $2,000 Value
            </h2>
            <p className="text-xl mb-6 text-gray-300">
              Complete collision repair business solution with advanced features
            </p>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>10 fully functional pages</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>Customer portal dashboard</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>Cost estimation system</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>Service scheduling platform</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>Insurance claim integration</span>
              </li>
              <li className="flex items-start gap-3 text-white">
                <span className="text-green-400 text-xl">✓</span>
                <span>Vehicle history tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
