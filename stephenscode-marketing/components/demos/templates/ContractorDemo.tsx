'use client'

import type { Demo } from '@/lib/demos-data'

interface ContractorDemoProps {
  demo: Demo
  viewMode: 'customer' | 'admin'
}

export default function ContractorDemo({ demo, viewMode }: ContractorDemoProps) {
  if (viewMode === 'admin') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Contractor Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-4xl mb-2">📋</div>
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-gray-400">Active Projects</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-3xl font-bold">$0</div>
              <div className="text-sm text-gray-400">Revenue</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-4xl mb-2">📞</div>
              <div className="text-4xl mb-2">📞</div>
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-gray-400">Leads</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-3xl font-bold">5.0</div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
          </div>
          <div className="mt-8 bg-gray-800 rounded-lg p-8">
            <p className="text-center text-gray-400">Full contractor management system with project tracking, client portal, quote builder, and scheduling.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-orange-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{demo.name}</h1>
        <p className="text-xl mb-8">Professional Construction Services</p>
        <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold">Get a Quote</button>
      </header>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold mb-2">Construction</h3>
            <p className="text-gray-600">Quality builds from foundation to finish</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="text-5xl mb-4">🔨</div>
            <h3 className="text-xl font-bold mb-2">Renovation</h3>
            <p className="text-gray-600">Transform your space with expert remodeling</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-bold mb-2">Maintenance</h3>
            <p className="text-gray-600">Ongoing support for your property</p>
          </div>
        </div>
      </div>
    </div>
  )
}
