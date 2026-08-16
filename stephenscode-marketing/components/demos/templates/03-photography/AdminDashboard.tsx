'use client'

import React, { useEffect, useState } from 'react'
import {
  Camera,
  Inbox,
  Calendar,
  Image as ImageIcon,
  LayoutDashboard,
  Star,
  Trash2,
  CheckCircle,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react'
import {
  INQUIRIES_KEY,
  SESSIONS_KEY,
  PORTFOLIO_KEY,
  SESSION_TYPES,
  PORTFOLIO_CATEGORIES,
  seedInquiries,
  seedSessions,
  seedPortfolio,
  loadList,
  saveList,
  type Inquiry,
  type InquiryStatus,
  type Session,
  type PortfolioItem,
} from './data'

type TabId = 'overview' | 'inquiries' | 'sessions' | 'portfolio'

const STATUS_STYLES: Record<InquiryStatus, string> = {
  new: 'bg-amber-100 text-amber-800',
  contacted: 'bg-blue-100 text-blue-800',
  booked: 'bg-green-100 text-green-800',
}

function formatDate(value: string): string {
  if (!value) return 'Flexible'
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => loadList(INQUIRIES_KEY, seedInquiries))
  const [sessions, setSessions] = useState<Session[]>(() => loadList(SESSIONS_KEY, seedSessions))
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => loadList(PORTFOLIO_KEY, seedPortfolio))

  const [inquiryFilter, setInquiryFilter] = useState<'all' | InquiryStatus>('all')
  const [sessionFilter, setSessionFilter] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [portfolioFilter, setPortfolioFilter] = useState('all')

  const [showSessionForm, setShowSessionForm] = useState(false)
  const [sessionForm, setSessionForm] = useState({ client: '', type: SESSION_TYPES[0], date: '', time: '', location: '' })

  const [showPortfolioForm, setShowPortfolioForm] = useState(false)
  const [portfolioForm, setPortfolioForm] = useState({ title: '', category: PORTFOLIO_CATEGORIES[0], location: '' })

  // Re-read inquiries on mount so submissions made in Customer View (same tab)
  // show up when the user toggles over to the admin dashboard.
  useEffect(() => {
    setInquiries(loadList(INQUIRIES_KEY, seedInquiries))
  }, [])

  useEffect(() => saveList(INQUIRIES_KEY, inquiries), [inquiries])
  useEffect(() => saveList(SESSIONS_KEY, sessions), [sessions])
  useEffect(() => saveList(PORTFOLIO_KEY, portfolio), [portfolio])

  const newInquiryCount = inquiries.filter((i) => i.status === 'new').length
  const bookedCount = inquiries.filter((i) => i.status === 'booked').length
  const upcomingCount = sessions.filter((s) => s.status === 'upcoming').length

  const filteredInquiries = inquiryFilter === 'all' ? inquiries : inquiries.filter((i) => i.status === inquiryFilter)
  const filteredSessions = sessionFilter === 'all' ? sessions : sessions.filter((s) => s.status === sessionFilter)
  const filteredPortfolio = portfolioFilter === 'all' ? portfolio : portfolio.filter((p) => p.category === portfolioFilter)

  const setInquiryStatus = (id: number, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }

  const deleteInquiry = (id: number) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id))
  }

  const completeSession = (id: number) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'completed' as const } : s)))
  }

  const deleteSession = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const addSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sessionForm.client || !sessionForm.date) return
    setSessions((prev) => [
      {
        id: Date.now(),
        client: sessionForm.client,
        type: sessionForm.type,
        date: sessionForm.date,
        time: sessionForm.time || '12:00',
        location: sessionForm.location || 'Studio City Studio',
        status: 'upcoming',
      },
      ...prev,
    ])
    setSessionForm({ client: '', type: SESSION_TYPES[0], date: '', time: '', location: '' })
    setShowSessionForm(false)
  }

  const toggleFeatured = (id: number) => {
    setPortfolio((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const deletePortfolioItem = (id: number) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id))
  }

  const addPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!portfolioForm.title) return
    setPortfolio((prev) => [
      {
        id: Date.now(),
        title: portfolioForm.title,
        category: portfolioForm.category,
        location: portfolioForm.location || 'Los Angeles, CA',
        featured: false,
      },
      ...prev,
    ])
    setPortfolioForm({ title: '', category: PORTFOLIO_CATEGORIES[0], location: '' })
    setShowPortfolioForm(false)
  }

  const tabs: { id: TabId; name: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'inquiries', name: 'Inquiries', icon: Inbox },
    { id: 'sessions', name: 'Sessions', icon: Calendar },
    { id: 'portfolio', name: 'Portfolio', icon: ImageIcon },
  ]

  const chipClass = (active: boolean) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-[#2d3142] text-white' : 'bg-white text-[#4f5d75] border border-gray-200 hover:bg-gray-100'
    }`

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-[#2d3142] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
              <Camera className="text-[#2d3142]" size={20} />
            </div>
            <div>
              <h1 className="font-serif text-2xl leading-tight">Lens &amp; Light Photography</h1>
              <p className="text-xs text-[#bfc0c0] tracking-widest uppercase">Studio Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#bfc0c0]">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Demo data, stored in your browser
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-[#2d3142]'
                    : 'text-[#bfc0c0] hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                {tab.name}
                {tab.id === 'inquiries' && newInquiryCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                    {newInquiryCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ===== Overview ===== */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => { setActiveTab('inquiries'); setInquiryFilter('new') }}
                className="bg-white p-6 text-left border border-gray-200 hover:border-[#2d3142] hover:shadow-lg transition-all"
              >
                <Inbox className="text-[#4f5d75] mb-3" size={24} />
                <p className="font-serif text-4xl text-[#2d3142]">{newInquiryCount}</p>
                <p className="text-sm text-[#4f5d75] mt-1">New Inquiries</p>
              </button>
              <button
                onClick={() => { setActiveTab('sessions'); setSessionFilter('upcoming') }}
                className="bg-white p-6 text-left border border-gray-200 hover:border-[#2d3142] hover:shadow-lg transition-all"
              >
                <Calendar className="text-[#4f5d75] mb-3" size={24} />
                <p className="font-serif text-4xl text-[#2d3142]">{upcomingCount}</p>
                <p className="text-sm text-[#4f5d75] mt-1">Upcoming Sessions</p>
              </button>
              <button
                onClick={() => { setActiveTab('inquiries'); setInquiryFilter('booked') }}
                className="bg-white p-6 text-left border border-gray-200 hover:border-[#2d3142] hover:shadow-lg transition-all"
              >
                <CheckCircle className="text-[#4f5d75] mb-3" size={24} />
                <p className="font-serif text-4xl text-[#2d3142]">{bookedCount}</p>
                <p className="text-sm text-[#4f5d75] mt-1">Booked Clients</p>
              </button>
              <button
                onClick={() => { setActiveTab('portfolio'); setPortfolioFilter('all') }}
                className="bg-white p-6 text-left border border-gray-200 hover:border-[#2d3142] hover:shadow-lg transition-all"
              >
                <ImageIcon className="text-[#4f5d75] mb-3" size={24} />
                <p className="font-serif text-4xl text-[#2d3142]">{portfolio.length}</p>
                <p className="text-sm text-[#4f5d75] mt-1">Portfolio Items</p>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries */}
              <div className="bg-white border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-serif text-xl text-[#2d3142]">Recent Inquiries</h2>
                  <button
                    onClick={() => { setActiveTab('inquiries'); setInquiryFilter('all') }}
                    className="text-sm font-medium text-[#4f5d75] hover:text-[#2d3142] transition-colors"
                  >
                    View all
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="px-6 py-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#2d3142]">{inq.name}</p>
                        <p className="text-sm text-[#4f5d75]">{inq.service}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[inq.status]}`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="px-6 py-8 text-sm text-[#4f5d75]">No inquiries yet. Submit the contact form in Customer View and it will appear here.</p>
                  )}
                </div>
              </div>

              {/* Next Sessions */}
              <div className="bg-white border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-serif text-xl text-[#2d3142]">Next Sessions</h2>
                  <button
                    onClick={() => { setActiveTab('sessions'); setShowSessionForm(true) }}
                    className="text-sm font-medium text-[#4f5d75] hover:text-[#2d3142] transition-colors inline-flex items-center gap-1"
                  >
                    <Plus size={14} /> Add session
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {sessions.filter((s) => s.status === 'upcoming').slice(0, 3).map((s) => (
                    <div key={s.id} className="px-6 py-4">
                      <p className="font-medium text-[#2d3142]">{s.client}</p>
                      <p className="text-sm text-[#4f5d75]">
                        {s.type} · {formatDate(s.date)} at {s.time} · {s.location}
                      </p>
                    </div>
                  ))}
                  {upcomingCount === 0 && (
                    <p className="px-6 py-8 text-sm text-[#4f5d75]">No upcoming sessions on the calendar.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Inquiries ===== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl text-[#2d3142]">Booking Inquiries</h2>
              <div className="flex flex-wrap gap-2">
                {(['all', 'new', 'contacted', 'booked'] as const).map((f) => (
                  <button key={f} onClick={() => setInquiryFilter(f)} className={chipClass(inquiryFilter === f)}>
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {filteredInquiries.length === 0 && (
              <div className="bg-white border border-gray-200 p-12 text-center">
                <Inbox className="mx-auto text-[#bfc0c0] mb-4" size={40} />
                <p className="text-[#4f5d75]">No inquiries in this view. Try a different filter, or submit the contact form in Customer View.</p>
              </div>
            )}

            <div className="space-y-4">
              {filteredInquiries.map((inq) => (
                <div key={inq.id} className="bg-white border border-gray-200 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl text-[#2d3142]">{inq.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[inq.status]}`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#4f5d75]">{inq.service}</p>
                    </div>
                    <p className="text-xs text-[#4f5d75] flex items-center gap-1">
                      <Clock size={14} /> Received {new Date(inq.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>

                  <p className="text-[#4f5d75] mb-4 leading-relaxed">{inq.message}</p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#4f5d75] mb-5">
                    <span className="inline-flex items-center gap-1.5"><Mail size={14} /> {inq.email}</span>
                    <span className="inline-flex items-center gap-1.5"><Phone size={14} /> {inq.phone}</span>
                    <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> Preferred: {formatDate(inq.preferredDate)}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {inq.status === 'new' && (
                      <button
                        onClick={() => setInquiryStatus(inq.id, 'contacted')}
                        className="px-4 py-2 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors"
                      >
                        Mark Contacted
                      </button>
                    )}
                    {inq.status !== 'booked' && (
                      <button
                        onClick={() => setInquiryStatus(inq.id, 'booked')}
                        className="px-4 py-2 border-2 border-[#2d3142] text-[#2d3142] text-sm font-medium hover:bg-[#2d3142] hover:text-white transition-colors"
                      >
                        Mark Booked
                      </button>
                    )}
                    {inq.status === 'booked' && (
                      <button
                        onClick={() => setInquiryStatus(inq.id, 'contacted')}
                        className="px-4 py-2 border border-gray-300 text-[#4f5d75] text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Move Back to Contacted
                      </button>
                    )}
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Sessions ===== */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl text-[#2d3142]">Session Schedule</h2>
              <div className="flex flex-wrap gap-2">
                {(['all', 'upcoming', 'completed'] as const).map((f) => (
                  <button key={f} onClick={() => setSessionFilter(f)} className={chipClass(sessionFilter === f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
                <button
                  onClick={() => setShowSessionForm((v) => !v)}
                  className="px-4 py-2 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus size={14} /> {showSessionForm ? 'Close Form' : 'Add Session'}
                </button>
              </div>
            </div>

            {showSessionForm && (
              <form onSubmit={addSession} className="bg-white border border-gray-200 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-1">
                  <label htmlFor="admin-session-client" className="block text-xs font-medium text-[#4f5d75] mb-1">Client Name *</label>
                  <input
                    id="admin-session-client"
                    type="text"
                    required
                    value={sessionForm.client}
                    onChange={(e) => setSessionForm({ ...sessionForm, client: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label htmlFor="admin-session-type" className="block text-xs font-medium text-[#4f5d75] mb-1">Session Type</label>
                  <select
                    id="admin-session-type"
                    value={sessionForm.type}
                    onChange={(e) => setSessionForm({ ...sessionForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm bg-white"
                  >
                    {SESSION_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-session-date" className="block text-xs font-medium text-[#4f5d75] mb-1">Date *</label>
                  <input
                    id="admin-session-date"
                    type="date"
                    required
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="admin-session-time" className="block text-xs font-medium text-[#4f5d75] mb-1">Time</label>
                  <input
                    id="admin-session-time"
                    type="time"
                    value={sessionForm.time}
                    onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="admin-session-location" className="block text-xs font-medium text-[#4f5d75] mb-1">Location</label>
                  <input
                    id="admin-session-location"
                    type="text"
                    value={sessionForm.location}
                    onChange={(e) => setSessionForm({ ...sessionForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                    placeholder="Location"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-5">
                  <button type="submit" className="px-6 py-2.5 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors">
                    Save Session
                  </button>
                </div>
              </form>
            )}

            {filteredSessions.length === 0 && (
              <div className="bg-white border border-gray-200 p-12 text-center">
                <Calendar className="mx-auto text-[#bfc0c0] mb-4" size={40} />
                <p className="text-[#4f5d75]">No sessions in this view. Add one with the button above.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSessions.map((s) => (
                <div key={s.id} className="bg-white border border-gray-200 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl text-[#2d3142]">{s.client}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        s.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm text-[#4f5d75] mb-5">
                    <p className="flex items-center gap-1.5"><Camera size={14} /> {s.type}</p>
                    <p className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(s.date)} at {s.time}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={14} /> {s.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {s.status === 'upcoming' && (
                      <button
                        onClick={() => completeSession(s.id)}
                        className="px-4 py-2 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors inline-flex items-center gap-1.5"
                      >
                        <CheckCircle size={14} /> Mark Completed
                      </button>
                    )}
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Portfolio ===== */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl text-[#2d3142]">Portfolio Manager</h2>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPortfolioFilter('all')} className={chipClass(portfolioFilter === 'all')}>
                  All
                </button>
                {PORTFOLIO_CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setPortfolioFilter(c)} className={`${chipClass(portfolioFilter === c)} capitalize`}>
                    {c}
                  </button>
                ))}
                <button
                  onClick={() => setShowPortfolioForm((v) => !v)}
                  className="px-4 py-2 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors inline-flex items-center gap-1.5"
                >
                  <Plus size={14} /> {showPortfolioForm ? 'Close Form' : 'Add Item'}
                </button>
              </div>
            </div>

            {showPortfolioForm && (
              <form onSubmit={addPortfolioItem} className="bg-white border border-gray-200 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="admin-portfolio-title" className="block text-xs font-medium text-[#4f5d75] mb-1">Title *</label>
                  <input
                    id="admin-portfolio-title"
                    type="text"
                    required
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                    placeholder="Shoot title"
                  />
                </div>
                <div>
                  <label htmlFor="admin-portfolio-category" className="block text-xs font-medium text-[#4f5d75] mb-1">Category</label>
                  <select
                    id="admin-portfolio-category"
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm bg-white capitalize"
                  >
                    {PORTFOLIO_CATEGORIES.map((c) => (
                      <option key={c} value={c} className="capitalize">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-portfolio-location" className="block text-xs font-medium text-[#4f5d75] mb-1">Location</label>
                  <input
                    id="admin-portfolio-location"
                    type="text"
                    value={portfolioForm.location}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#2d3142] focus:outline-none text-sm"
                    placeholder="City, State"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button type="submit" className="px-6 py-2.5 bg-[#2d3142] text-white text-sm font-medium hover:bg-[#4f5d75] transition-colors">
                    Add to Portfolio
                  </button>
                </div>
              </form>
            )}

            {filteredPortfolio.length === 0 && (
              <div className="bg-white border border-gray-200 p-12 text-center">
                <ImageIcon className="mx-auto text-[#bfc0c0] mb-4" size={40} />
                <p className="text-[#4f5d75]">No portfolio items in this category yet. Add one with the button above.</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPortfolio.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#2d3142] to-[#4f5d75] flex items-center justify-center relative">
                    <Camera className="text-white opacity-20" size={48} />
                    {p.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white text-[#2d3142] text-xs font-semibold inline-flex items-center gap-1">
                        <Star size={12} className="fill-[#2d3142]" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#2d3142] mb-0.5">{p.title}</h3>
                    <p className="text-xs text-[#4f5d75] uppercase tracking-wider mb-4">
                      {p.category} · {p.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className={`px-3 py-1.5 text-xs font-medium transition-colors inline-flex items-center gap-1 ${
                          p.featured
                            ? 'bg-[#2d3142] text-white hover:bg-[#4f5d75]'
                            : 'border border-[#2d3142] text-[#2d3142] hover:bg-[#2d3142] hover:text-white'
                        }`}
                      >
                        <Star size={12} className={p.featured ? 'fill-white' : ''} />
                        {p.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() => deletePortfolioItem(p.id)}
                        className="px-3 py-1.5 border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors inline-flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
