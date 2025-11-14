'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'quotes' | 'clients' | 'analytics'>('projects')

  const activeProjects = [
    { id: 'PRJ-2024-042', client: 'Anderson Family', type: 'Custom Home', status: 'Foundation', progress: 25, budget: '$850,000', spent: '$212,500', timeline: 'On Track' },
    { id: 'PRJ-2024-038', client: 'Martinez Corp', type: 'Commercial', status: 'Framing', progress: 45, budget: '$1.2M', spent: '$540,000', timeline: 'On Track' },
    { id: 'PRJ-2024-051', client: 'Thompson Residence', type: 'Kitchen Remodel', status: 'Finishes', progress: 85, budget: '$75,000', spent: '$63,750', timeline: 'Ahead' },
    { id: 'PRJ-2024-044', client: 'Davis Addition', type: 'Home Addition', status: 'Electrical', progress: 60, budget: '$185,000', spent: '$111,000', timeline: 'On Track' }
  ]

  const recentQuotes = [
    { id: 'Q-2024-187', client: 'Sarah Williams', project: 'Bathroom Renovation', value: '$42,000', status: 'Pending', submitted: '2 days ago' },
    { id: 'Q-2024-186', client: 'Mike Johnson', project: 'Basement Finish', value: '$65,000', status: 'Accepted', submitted: '5 days ago' },
    { id: 'Q-2024-185', client: 'Emily Chen', project: 'Deck Construction', value: '$28,500', status: 'Under Review', submitted: '1 week ago' },
    { id: 'Q-2024-184', client: 'Robert Taylor', project: 'Full Home Remodel', value: '$425,000', status: 'Pending', submitted: '1 week ago' }
  ]

  const clients = [
    { name: 'Anderson Family', projects: 1, totalValue: '$850,000', status: 'Active', satisfaction: '5.0' },
    { name: 'Martinez Corp', projects: 3, totalValue: '$2.1M', status: 'Active', satisfaction: '4.9' },
    { name: 'Thompson Residence', projects: 2, totalValue: '$125,000', status: 'Active', satisfaction: '5.0' },
    { name: 'Davis Family', projects: 1, totalValue: '$185,000', status: 'Active', satisfaction: '4.8' }
  ]

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#ff6700' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-black mb-2">
            Construction Management Dashboard
          </h1>
          <p style={{ color: '#1a1a1a' }} className="text-lg font-bold">
            Project tracking, client management, and business analytics
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Active Projects</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">12</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 3 new this month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Total Value</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">$4.8M</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 18% vs last month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Pending Quotes</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">27</div>
            <div style={{ color: '#fbbf24' }} className="text-sm font-bold">15 need follow-up</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Client Satisfaction</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">4.9</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">Excellent rating</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'projects' as const, label: 'Active Projects', icon: '🏗️' },
            { id: 'quotes' as const, label: 'Quote Requests', icon: '📋' },
            { id: 'clients' as const, label: 'Client Portal', icon: '👥' },
            { id: 'analytics' as const, label: 'Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#ff6700' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#1a1a1a'
              }}
              className="px-6 py-3 font-bold hover:opacity-80 transition"
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Active Construction Projects</h2>
              <button style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="px-6 py-3 font-bold">
                + New Project
              </button>
            </div>
            <div className="space-y-6">
              {activeProjects.map((project) => (
                <div key={project.id} style={{ backgroundColor: '#f8f8f8', border: '3px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-xl font-black">{project.id}</span>
                        <span style={{
                          backgroundColor: project.timeline === 'Ahead' ? '#22c55e' : '#3b82f6',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {project.timeline}
                        </span>
                      </div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-1">{project.client}</div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>📁 {project.type}</div>
                        <div>🔨 Current Phase: {project.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: '#ff6700' }} className="text-2xl font-black mb-1">{project.budget}</div>
                      <div style={{ color: '#666666' }} className="text-sm">Spent: {project.spent}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#1a1a1a' }} className="font-bold text-sm">Project Progress</span>
                      <span style={{ color: '#ff6700' }} className="font-black">{project.progress}%</span>
                    </div>
                    <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden">
                      <div
                        style={{ backgroundColor: '#ff6700', width: `${project.progress}%` }}
                        className="h-full transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="flex-1 py-2 font-bold text-sm hover:opacity-90">
                      View Details
                    </button>
                    <button style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="flex-1 py-2 font-bold text-sm hover:opacity-90">
                      Update Status
                    </button>
                    <button style={{ backgroundColor: '#6b7280', color: '#ffffff' }} className="flex-1 py-2 font-bold text-sm hover:opacity-90">
                      Client Portal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Recent Quote Requests</h2>
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div key={quote.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-black">{quote.id}</span>
                        <span style={{
                          backgroundColor: quote.status === 'Accepted' ? '#22c55e' :
                                        quote.status === 'Pending' ? '#fbbf24' : '#9ca3af',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {quote.status}
                        </span>
                      </div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold mb-1">{quote.client}</div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>📋 {quote.project}</div>
                        <div>🕐 Submitted {quote.submitted}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: '#ff6700' }} className="text-2xl font-black">{quote.value}</div>
                      <div className="flex gap-2 mt-3">
                        <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm">
                          View
                        </button>
                        {quote.status !== 'Accepted' && (
                          <button style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm">
                            Follow Up
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">Client Management</h2>
            <div className="space-y-4">
              {clients.map((client, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-black">{client.name}</span>
                        <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {client.status}
                        </span>
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>📊 {client.projects} project(s) • Total Value: {client.totalValue}</div>
                        <div>⭐ Satisfaction: {client.satisfaction}/5.0</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm">
                        Portal Access
                      </button>
                      <button style={{ backgroundColor: '#6b7280', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-8">Business Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ color: '#ff6700' }} className="text-xl font-bold mb-4">Revenue by Project Type</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Custom Homes', revenue: '$2.1M', percentage: 44 },
                    { type: 'Remodeling', revenue: '$1.5M', percentage: 31 },
                    { type: 'Commercial', revenue: '$850K', percentage: 18 },
                    { type: 'Additions', revenue: '$350K', percentage: 7 }
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1a1a1a' }} className="font-bold">{item.type}</span>
                        <span style={{ color: '#ff6700' }} className="font-black">{item.revenue}</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-3 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: '#ff6700', width: `${item.percentage}%` }}
                          className="h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#ff6700' }} className="text-xl font-bold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Average Project Value</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">$285,000</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Quote Conversion Rate</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">68%</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">On-Time Completion Rate</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">94%</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Referral Rate</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">72%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
}
