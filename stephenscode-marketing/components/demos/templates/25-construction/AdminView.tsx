'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface AdminProject {
  id: string
  client: string
  type: string
  status: string
  progress: number
  budget: string
  spent: string
  timeline: string
}

interface AdminQuote {
  id: string
  client: string
  project: string
  value: string
  status: string
  submitted: string
  notes: string
}

interface AdminClient {
  name: string
  projects: number
  totalValue: string
  status: string
  satisfaction: string
  email: string
  phone: string
}

interface AdminData {
  projects: AdminProject[]
  quotes: AdminQuote[]
  clients: AdminClient[]
}

const STORAGE_KEY = 'construction-demo-admin-v1'

const PHASES = ['Planning', 'Permits', 'Foundation', 'Framing', 'Electrical', 'Plumbing', 'Drywall', 'Finishes', 'Final Inspection']

const PROJECT_TYPES = ['Custom Home', 'Commercial', 'Kitchen Remodel', 'Bathroom Remodel', 'Home Addition', 'Full Remodel']

const CREW_LEADS: Record<string, string> = {
  'Custom Home': 'Marcus Webb',
  'Commercial': 'Angela Price',
  'Kitchen Remodel': 'Dan Kowalski',
  'Bathroom Remodel': 'Dan Kowalski',
  'Home Addition': 'Marcus Webb',
  'Full Remodel': 'Ray Fuentes'
}

const MILESTONES = [
  { name: 'Contract signed & deposit received', pct: 0 },
  { name: 'Permits approved', pct: 10 },
  { name: 'Foundation complete', pct: 20 },
  { name: 'Framing complete', pct: 40 },
  { name: 'Rough-in complete (electrical / plumbing / HVAC)', pct: 60 },
  { name: 'Drywall & insulation complete', pct: 75 },
  { name: 'Finishes & fixtures complete', pct: 90 },
  { name: 'Final inspection passed', pct: 100 }
]

const defaultData: AdminData = {
  projects: [
    { id: 'PRJ-2024-042', client: 'Anderson Family', type: 'Custom Home', status: 'Foundation', progress: 25, budget: '$850,000', spent: '$212,500', timeline: 'On Track' },
    { id: 'PRJ-2024-038', client: 'Martinez Corp', type: 'Commercial', status: 'Framing', progress: 45, budget: '$1.2M', spent: '$540,000', timeline: 'On Track' },
    { id: 'PRJ-2024-051', client: 'Thompson Residence', type: 'Kitchen Remodel', status: 'Finishes', progress: 85, budget: '$75,000', spent: '$63,750', timeline: 'Ahead' },
    { id: 'PRJ-2024-044', client: 'Davis Addition', type: 'Home Addition', status: 'Electrical', progress: 60, budget: '$185,000', spent: '$111,000', timeline: 'On Track' }
  ],
  quotes: [
    { id: 'Q-2024-187', client: 'Sarah Williams', project: 'Bathroom Renovation', value: '$42,000', status: 'Pending', submitted: '2 days ago', notes: 'Wants a curbless walk-in shower and heated floors. Prefers a spring start.' },
    { id: 'Q-2024-186', client: 'Mike Johnson', project: 'Basement Finish', value: '$65,000', status: 'Accepted', submitted: '5 days ago', notes: 'Includes moisture remediation found during site visit. Contract out for signature.' },
    { id: 'Q-2024-185', client: 'Emily Chen', project: 'Deck Construction', value: '$28,500', status: 'Under Review', submitted: '1 week ago', notes: 'Composite decking, 400 sqft, built-in bench seating. Awaiting HOA approval.' },
    { id: 'Q-2024-184', client: 'Robert Taylor', project: 'Full Home Remodel', value: '$425,000', status: 'Pending', submitted: '1 week ago', notes: 'Whole-house remodel of a 1985 two-story. Site visit completed, scope drafted.' }
  ],
  clients: [
    { name: 'Anderson Family', projects: 1, totalValue: '$850,000', status: 'Active', satisfaction: '5.0', email: 'andersons@example.com', phone: '(555) 201-8834' },
    { name: 'Martinez Corp', projects: 3, totalValue: '$2.1M', status: 'Active', satisfaction: '4.9', email: 'facilities@martinezcorp.example.com', phone: '(555) 887-3300' },
    { name: 'Thompson Residence', projects: 2, totalValue: '$125,000', status: 'Active', satisfaction: '5.0', email: 'r.thompson@example.com', phone: '(555) 412-9057' },
    { name: 'Davis Family', projects: 1, totalValue: '$185,000', status: 'Active', satisfaction: '4.8', email: 'davisfam@example.com', phone: '(555) 764-2218' }
  ]
}

const loadData = (): AdminData => {
  if (typeof window === 'undefined') return defaultData
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as Partial<AdminData>
    return {
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultData.projects,
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : defaultData.quotes,
      clients: Array.isArray(parsed.clients) ? parsed.clients : defaultData.clients
    }
  } catch {
    return defaultData
  }
}

const initialNewProject = { client: '', type: 'Custom Home', budget: '', phase: 'Planning' }

const analyticsData = {
  month: {
    label: 'This Month',
    revenue: [
      { type: 'Custom Homes', revenue: '$420K', percentage: 47 },
      { type: 'Remodeling', revenue: '$285K', percentage: 32 },
      { type: 'Commercial', revenue: '$135K', percentage: 15 },
      { type: 'Additions', revenue: '$55K', percentage: 6 }
    ],
    metrics: [
      { label: 'Average Project Value', value: '$268,000' },
      { label: 'Quote Conversion Rate', value: '71%' },
      { label: 'On-Time Completion Rate', value: '96%' },
      { label: 'Referral Rate', value: '69%' }
    ]
  },
  quarter: {
    label: 'This Quarter',
    revenue: [
      { type: 'Custom Homes', revenue: '$1.1M', percentage: 45 },
      { type: 'Remodeling', revenue: '$780K', percentage: 32 },
      { type: 'Commercial', revenue: '$390K', percentage: 16 },
      { type: 'Additions', revenue: '$170K', percentage: 7 }
    ],
    metrics: [
      { label: 'Average Project Value', value: '$276,000' },
      { label: 'Quote Conversion Rate', value: '69%' },
      { label: 'On-Time Completion Rate', value: '95%' },
      { label: 'Referral Rate', value: '70%' }
    ]
  },
  year: {
    label: 'This Year',
    revenue: [
      { type: 'Custom Homes', revenue: '$2.1M', percentage: 44 },
      { type: 'Remodeling', revenue: '$1.5M', percentage: 31 },
      { type: 'Commercial', revenue: '$850K', percentage: 18 },
      { type: 'Additions', revenue: '$350K', percentage: 7 }
    ],
    metrics: [
      { label: 'Average Project Value', value: '$285,000' },
      { label: 'Quote Conversion Rate', value: '68%' },
      { label: 'On-Time Completion Rate', value: '94%' },
      { label: 'Referral Rate', value: '72%' }
    ]
  }
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'quotes' | 'clients' | 'analytics'>('projects')
  const [data, setData] = useState<AdminData>(loadData)
  const [toast, setToast] = useState('')

  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState(initialNewProject)
  const [detailProjectId, setDetailProjectId] = useState<string | null>(null)
  const [statusProjectId, setStatusProjectId] = useState<string | null>(null)
  const [statusForm, setStatusForm] = useState({ phase: 'Planning', progress: 0 })
  const [portalClientName, setPortalClientName] = useState<string | null>(null)
  const [viewQuoteId, setViewQuoteId] = useState<string | null>(null)
  const [contactClientName, setContactClientName] = useState<string | null>(null)
  const [contactMessage, setContactMessage] = useState('')
  const [contactSent, setContactSent] = useState(false)
  const [analyticsPeriod, setAnalyticsPeriod] = useState<'month' | 'quarter' | 'year'>('year')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // localStorage unavailable (private mode) -- state still works in-memory
    }
  }, [data])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const detailProject = detailProjectId ? data.projects.find((p) => p.id === detailProjectId) ?? null : null
  const statusProject = statusProjectId ? data.projects.find((p) => p.id === statusProjectId) ?? null : null
  const viewQuote = viewQuoteId ? data.quotes.find((q) => q.id === viewQuoteId) ?? null : null
  const contactClient = contactClientName ? data.clients.find((c) => c.name === contactClientName) ?? null : null
  const portalProjects = portalClientName
    ? data.projects.filter((p) => p.client.toLowerCase().includes(portalClientName.split(' ')[0].toLowerCase()))
    : []

  const nextProjectId = () => {
    const max = data.projects.reduce((acc, p) => {
      const num = parseInt(p.id.split('-').pop() ?? '0', 10)
      return Number.isNaN(num) ? acc : Math.max(acc, num)
    }, 0)
    return `PRJ-2024-${String(max + 1).padStart(3, '0')}`
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const budgetNumber = parseInt(newProject.budget.replace(/[^0-9]/g, ''), 10)
    const budgetDisplay = Number.isNaN(budgetNumber) ? newProject.budget : `$${budgetNumber.toLocaleString()}`
    const project: AdminProject = {
      id: nextProjectId(),
      client: newProject.client,
      type: newProject.type,
      status: newProject.phase,
      progress: 5,
      budget: budgetDisplay,
      spent: '$0',
      timeline: 'On Track'
    }
    setData((prev) => ({ ...prev, projects: [project, ...prev.projects] }))
    setShowNewProject(false)
    setNewProject(initialNewProject)
    setToast(`Project ${project.id} created for ${project.client}`)
  }

  const openStatusModal = (project: AdminProject) => {
    setStatusForm({ phase: project.status, progress: project.progress })
    setStatusProjectId(project.id)
  }

  const handleStatusSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!statusProjectId) return
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === statusProjectId ? { ...p, status: statusForm.phase, progress: statusForm.progress } : p
      )
    }))
    setToast(`Status updated: ${statusForm.phase} at ${statusForm.progress}%`)
    setStatusProjectId(null)
  }

  const handleFollowUp = (quote: AdminQuote) => {
    setData((prev) => ({
      ...prev,
      quotes: prev.quotes.map((q) => (q.id === quote.id ? { ...q, status: 'Follow-Up Sent' } : q))
    }))
    setToast(`Follow-up email sent to ${quote.client}`)
  }

  const handleAcceptQuote = (quote: AdminQuote) => {
    setData((prev) => ({
      ...prev,
      quotes: prev.quotes.map((q) => (q.id === quote.id ? { ...q, status: 'Accepted' } : q))
    }))
    setToast(`${quote.id} marked accepted`)
    setViewQuoteId(null)
  }

  const openContactModal = (client: AdminClient) => {
    setContactMessage('')
    setContactSent(false)
    setContactClientName(client.name)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSent(true)
  }

  const quoteStatusColor = (status: string) =>
    status === 'Accepted' ? '#22c55e' :
    status === 'Pending' ? '#fbbf24' :
    status === 'Follow-Up Sent' ? '#3b82f6' : '#9ca3af'

  const analytics = analyticsData[analyticsPeriod]

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#ff6700' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-bold mb-2">
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
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">{data.projects.length}</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 3 new this month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Total Value</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">$4.8M</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 18% vs last month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Pending Quotes</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">
              {data.quotes.filter((q) => q.status !== 'Accepted').length}
            </div>
            <div style={{ color: '#fbbf24' }} className="text-sm font-bold">
              {data.quotes.filter((q) => q.status === 'Pending').length} need follow-up
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Client Satisfaction</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">4.9</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">Excellent rating</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
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
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Active Construction Projects</h2>
              <button
                onClick={() => { setNewProject(initialNewProject); setShowNewProject(true); }}
                style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                className="px-6 py-3 font-bold hover:opacity-90 transition"
              >
                + New Project
              </button>
            </div>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} style={{ backgroundColor: '#f8f8f8', border: '3px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-xl font-bold">{project.id}</span>
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
                      <div style={{ color: '#ff6700' }} className="text-2xl font-bold mb-1">{project.budget}</div>
                      <div style={{ color: '#666666' }} className="text-sm">Spent: {project.spent}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: '#1a1a1a' }} className="font-bold text-sm">Project Progress</span>
                      <span style={{ color: '#ff6700' }} className="font-bold">{project.progress}%</span>
                    </div>
                    <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden">
                      <div
                        style={{ backgroundColor: '#ff6700', width: `${project.progress}%` }}
                        className="h-full transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setDetailProjectId(project.id)}
                      style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                      className="flex-1 py-2 font-bold text-sm hover:opacity-90 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openStatusModal(project)}
                      style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                      className="flex-1 py-2 font-bold text-sm hover:opacity-90 transition"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => setPortalClientName(project.client)}
                      style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                      className="flex-1 py-2 font-bold text-sm hover:opacity-90 transition"
                    >
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">Recent Quote Requests</h2>
            <div className="space-y-4">
              {data.quotes.map((quote) => (
                <div key={quote.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-bold">{quote.id}</span>
                        <span style={{
                          backgroundColor: quoteStatusColor(quote.status),
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
                      <div style={{ color: '#ff6700' }} className="text-2xl font-bold">{quote.value}</div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setViewQuoteId(quote.id)}
                          style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90 transition"
                        >
                          View
                        </button>
                        {quote.status !== 'Accepted' && quote.status !== 'Follow-Up Sent' && (
                          <button
                            onClick={() => handleFollowUp(quote)}
                            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                            className="px-4 py-2 font-bold text-sm hover:opacity-90 transition"
                          >
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">Client Management</h2>
            <div className="space-y-4">
              {data.clients.map((client) => (
                <div key={client.name} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-bold">{client.name}</span>
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
                      <button
                        onClick={() => setPortalClientName(client.name)}
                        style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90 transition"
                      >
                        Portal Access
                      </button>
                      <button
                        onClick={() => openContactModal(client)}
                        style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90 transition"
                      >
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
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Business Analytics</h2>
              <div className="flex gap-2">
                {(['month', 'quarter', 'year'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setAnalyticsPeriod(period)}
                    style={{
                      backgroundColor: analyticsPeriod === period ? '#ff6700' : '#f8f8f8',
                      color: analyticsPeriod === period ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-4 py-2 font-bold text-sm hover:opacity-80 transition"
                  >
                    {analyticsData[period].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ color: '#ff6700' }} className="text-xl font-bold mb-4">Revenue by Project Type</h3>
                <div className="space-y-4">
                  {analytics.revenue.map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1a1a1a' }} className="font-bold">{item.type}</span>
                        <span style={{ color: '#ff6700' }} className="font-bold">{item.revenue}</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-3 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: '#ff6700', width: `${item.percentage}%` }}
                          className="h-full transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#ff6700' }} className="text-xl font-bold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  {analytics.metrics.map((metric) => (
                    <div key={metric.label} style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                      <div style={{ color: '#666666' }} className="text-sm mb-1">{metric.label}</div>
                      <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowNewProject(false)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#ff6700', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">New Project</h3>
              <button onClick={() => setShowNewProject(false)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={handleAddProject} className="p-8 space-y-6">
              <div>
                <label htmlFor="admin-new-client" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Client Name *</label>
                <input
                  id="admin-new-client"
                  type="text"
                  required
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                  placeholder="e.g., Rivera Family"
                />
              </div>
              <div>
                <label htmlFor="admin-new-type" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Project Type *</label>
                <select
                  id="admin-new-type"
                  value={newProject.type}
                  onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="admin-new-budget" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Contract Budget ($) *</label>
                <input
                  id="admin-new-budget"
                  type="number"
                  required
                  min="1"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                  placeholder="e.g., 250000"
                />
              </div>
              <div>
                <label htmlFor="admin-new-phase" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Starting Phase</label>
                <select
                  id="admin-new-phase"
                  value={newProject.phase}
                  onChange={(e) => setNewProject({ ...newProject, phase: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                >
                  {PHASES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {detailProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setDetailProjectId(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <div>
                <h3 className="text-2xl font-bold">{detailProject.id}</h3>
                <div style={{ color: '#ff6700' }} className="font-bold">{detailProject.client} • {detailProject.type}</div>
              </div>
              <button onClick={() => setDetailProjectId(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Budget', value: detailProject.budget },
                  { label: 'Spent to Date', value: detailProject.spent },
                  { label: 'Current Phase', value: detailProject.status },
                  { label: 'Schedule', value: detailProject.timeline }
                ].map((stat) => (
                  <div key={stat.label} style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">{stat.label}</div>
                    <div style={{ color: '#1a1a1a' }} className="font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#1a1a1a' }} className="font-bold">Overall Progress</span>
                  <span style={{ color: '#ff6700' }} className="font-bold text-xl">{detailProject.progress}%</span>
                </div>
                <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden">
                  <div style={{ backgroundColor: '#ff6700', width: `${detailProject.progress}%` }} className="h-full" />
                </div>
              </div>

              <h4 style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-4">Milestones</h4>
              <div className="space-y-3 mb-8">
                {MILESTONES.map((milestone) => {
                  const done = detailProject.progress >= milestone.pct && (milestone.pct > 0 || detailProject.progress > 0)
                  return (
                    <div key={milestone.name} className="flex items-center gap-3">
                      <span
                        style={{
                          backgroundColor: done ? '#22c55e' : '#e5e5e5',
                          color: done ? '#ffffff' : '#999999'
                        }}
                        className="w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0"
                      >
                        {done ? '✓' : ''}
                      </span>
                      <span style={{ color: done ? '#1a1a1a' : '#999999' }} className={done ? 'font-bold' : ''}>
                        {milestone.name}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-6 mb-8">
                <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">Crew Lead</div>
                <div style={{ color: '#1a1a1a' }} className="font-bold text-lg">
                  {CREW_LEADS[detailProject.type] ?? 'Marcus Webb'}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setDetailProjectId(null); openStatusModal(detailProject); }}
                  style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                  className="flex-1 py-3 font-bold hover:opacity-90 transition"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setDetailProjectId(null)}
                  style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                  className="flex-1 py-3 font-bold hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {statusProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setStatusProjectId(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Update Status</h3>
                <div className="font-bold text-sm">{statusProject.id} • {statusProject.client}</div>
              </div>
              <button onClick={() => setStatusProjectId(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={handleStatusSave} className="p-8 space-y-6">
              <div>
                <label htmlFor="admin-status-phase" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Current Phase</label>
                <select
                  id="admin-status-phase"
                  value={statusForm.phase}
                  onChange={(e) => setStatusForm({ ...statusForm, phase: e.target.value })}
                  style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="w-full px-4 py-3"
                >
                  {[statusProject.status, ...PHASES.filter((p) => p !== statusProject.status)].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="admin-status-progress" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">
                  Progress: <span style={{ color: '#ff6700' }}>{statusForm.progress}%</span>
                </label>
                <input
                  id="admin-status-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={statusForm.progress}
                  onChange={(e) => setStatusForm({ ...statusForm, progress: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Save Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Client Portal Preview Modal */}
      {portalClientName && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setPortalClientName(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <div>
                <h3 className="text-2xl font-bold">Client Portal Preview</h3>
                <div className="font-bold text-sm">Viewing as: {portalClientName}</div>
              </div>
              <button onClick={() => setPortalClientName(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              {portalProjects.length > 0 ? (
                <div className="space-y-6">
                  {portalProjects.map((project) => (
                    <div key={project.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div style={{ color: '#1a1a1a' }} className="font-bold text-lg">{project.type}</div>
                          <div style={{ color: '#666666' }} className="text-sm font-bold">{project.id}</div>
                        </div>
                        <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {project.timeline}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#1a1a1a' }} className="font-bold text-sm">Phase: {project.status}</span>
                        <span style={{ color: '#ff6700' }} className="font-bold">{project.progress}%</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-4 rounded-full overflow-hidden mb-4">
                        <div style={{ backgroundColor: '#ff6700', width: `${project.progress}%` }} className="h-full" />
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm font-bold">
                        Contract: {project.budget} • Billed to date: {project.spent}
                      </div>
                    </div>
                  ))}
                  <p style={{ color: '#666666' }} className="text-sm">
                    This is the live progress view this client sees when they sign in to their portal,
                    alongside their weekly photos, documents, and invoices.
                  </p>
                </div>
              ) : (
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 text-center">
                  <p style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-2">No active projects for {portalClientName}</p>
                  <p style={{ color: '#666666' }} className="text-sm">
                    Past project history, documents, and warranty information remain available in their portal archive.
                  </p>
                </div>
              )}
              <button
                onClick={() => setPortalClientName(null)}
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="w-full py-3 font-bold hover:opacity-90 transition mt-6"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote View Modal */}
      {viewQuote && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setViewQuoteId(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{viewQuote.id}</h3>
                <div style={{ color: '#ff6700' }} className="font-bold text-sm">Submitted {viewQuote.submitted}</div>
              </div>
              <button onClick={() => setViewQuoteId(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                  <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">Client</div>
                  <div style={{ color: '#1a1a1a' }} className="font-bold">{viewQuote.client}</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                  <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">Quoted Value</div>
                  <div style={{ color: '#ff6700' }} className="font-bold text-xl">{viewQuote.value}</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                  <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">Project</div>
                  <div style={{ color: '#1a1a1a' }} className="font-bold">{viewQuote.project}</div>
                </div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                  <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-1">Status</div>
                  <span style={{ backgroundColor: quoteStatusColor(viewQuote.status), color: '#ffffff' }} className="inline-block px-3 py-1 text-xs font-bold uppercase">
                    {viewQuote.status}
                  </span>
                </div>
              </div>
              <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6 mb-6">
                <div style={{ color: '#666666' }} className="text-xs font-bold uppercase mb-2">Estimator Notes</div>
                <p style={{ color: '#333333' }} className="leading-relaxed">{viewQuote.notes}</p>
              </div>
              <div className="flex gap-3">
                {viewQuote.status !== 'Accepted' && (
                  <button
                    onClick={() => handleAcceptQuote(viewQuote)}
                    style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                    className="flex-1 py-3 font-bold hover:opacity-90 transition"
                  >
                    Mark Accepted
                  </button>
                )}
                <button
                  onClick={() => setViewQuoteId(null)}
                  style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                  className="flex-1 py-3 font-bold hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Client Modal */}
      {contactClient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setContactClientName(null)}
        >
          <div
            style={{ backgroundColor: '#ffffff' }}
            className="max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ backgroundColor: '#6b7280', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Contact {contactClient.name}</h3>
              <button onClick={() => setContactClientName(null)} aria-label="Close" className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              {contactSent ? (
                <div className="text-center py-8">
                  <div style={{ backgroundColor: '#f8f8f8', color: '#22c55e' }} className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-4xl">
                    ✓
                  </div>
                  <h4 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-3">Message Sent</h4>
                  <p style={{ color: '#666666' }} className="mb-6">
                    Your message was delivered to {contactClient.name}&apos;s portal inbox and emailed to {contactClient.email}.
                  </p>
                  <button
                    onClick={() => setContactClientName(null)}
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-6">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4 space-y-1 text-sm">
                    <div style={{ color: '#1a1a1a' }} className="font-bold">{contactClient.email}</div>
                    <div style={{ color: '#666666' }} className="font-bold">{contactClient.phone}</div>
                  </div>
                  <div>
                    <label htmlFor="admin-contact-message" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Message *</label>
                    <textarea
                      id="admin-contact-message"
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3 h-32"
                      placeholder="Type your message to the client..."
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#ff6700', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{ backgroundColor: '#1a1a1a', color: '#ffffff', borderLeft: '4px solid #ff6700' }}
          className="fixed bottom-6 right-6 z-[70] px-6 py-4 font-bold shadow-2xl"
        >
          {toast}
        </div>
      )}

      <div className="h-20"></div>
    </div>
  )
}
