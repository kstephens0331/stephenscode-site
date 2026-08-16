'use client';

import { useEffect, useState } from 'react';

type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'completed';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  propertySize: string;
  frequency: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
}

const STORAGE_KEY = 'sparkle-clean-admin-leads';

const SERVICES = [
  'Residential Cleaning',
  'Office Cleaning',
  'Deep Cleaning',
  'Move In/Out',
  'Carpet Cleaning',
  'Window Cleaning',
];

const STATUS_META: Record<LeadStatus, { label: string; badge: string }> = {
  new: { label: 'New', badge: 'bg-[#0077b6] bg-opacity-10 text-[#0077b6]' },
  contacted: { label: 'Contacted', badge: 'bg-amber-100 text-amber-700' },
  scheduled: { label: 'Scheduled', badge: 'bg-[#00b4d8] bg-opacity-10 text-[#00b4d8]' },
  completed: { label: 'Completed', badge: 'bg-green-100 text-green-700' },
};

const buildSeedLeads = (): Lead[] => [
  {
    id: 'seed-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    service: 'Residential Cleaning',
    propertySize: '3BR',
    frequency: 'Bi-weekly',
    message: 'Interested in starting bi-weekly service',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
  {
    id: 'seed-2',
    name: 'Michael Chen',
    email: 'mchen@business.com',
    phone: '(555) 234-5678',
    service: 'Office Cleaning',
    propertySize: '2500 sq ft',
    frequency: 'Weekly',
    message: 'Need evening cleaning for office space',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'contacted',
  },
  {
    id: 'seed-3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    service: 'Deep Cleaning',
    propertySize: '4BR+',
    frequency: 'One-time',
    message: 'Need deep cleaning before holiday guests arrive',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
  },
  {
    id: 'seed-4',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    phone: '(555) 456-7890',
    service: 'Move In/Out',
    propertySize: '2BR',
    frequency: 'One-time',
    message: 'Moving out end of month, need lease-ready cleaning',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Residential Cleaning',
  propertySize: '2BR',
  frequency: 'One-time',
  message: '',
};

export default function AdminView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    let loaded: Lead[] | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loaded = parsed;
        }
      }
    } catch {
      // Corrupt or unavailable storage -- fall back to seed data below.
    }
    setLeads(loaded ?? buildSeedLeads());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Storage full or unavailable -- the dashboard still works in memory.
    }
  }, [leads, hydrated]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = filter === 'all' || lead.service === filter;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesService && matchesStatus;
  });

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const stats = {
    total: leads.length,
    newLeads: leads.filter(l => l.status === 'new').length,
    residential: leads.filter(l => l.service.includes('Residential')).length,
    commercial: leads.filter(l => l.service.includes('Office')).length,
  };

  const selectedLead = selectedId ? leads.find(l => l.id === selectedId) ?? null : null;

  const openLead = (id: string) => {
    setSelectedId(id);
    setConfirmingDelete(false);
  };

  const closeLead = () => {
    setSelectedId(null);
    setConfirmingDelete(false);
  };

  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    closeLead();
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      ...form,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setLeads(prev => [newLead, ...prev]);
    setForm(emptyForm);
    setShowAddModal(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const statusTabs: Array<{ id: 'all' | LeadStatus; label: string; count: number }> = [
    { id: 'all', label: 'All', count: leads.length },
    { id: 'new', label: 'New', count: leads.filter(l => l.status === 'new').length },
    { id: 'contacted', label: 'Contacted', count: leads.filter(l => l.status === 'contacted').length },
    { id: 'scheduled', label: 'Scheduled', count: leads.filter(l => l.status === 'scheduled').length },
    { id: 'completed', label: 'Completed', count: leads.filter(l => l.status === 'completed').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sparkle Clean Services</h1>
              <p className="text-gray-600 mt-1">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0077b6] text-white rounded-lg font-medium hover:bg-[#005f8f] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Lead</span>
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-[#0077b6] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New</p>
                <p className="text-3xl font-bold text-gray-900">{stats.newLeads}</p>
              </div>
              <div className="w-12 h-12 bg-[#00b4d8] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Residential</p>
                <p className="text-3xl font-bold text-gray-900">{stats.residential}</p>
              </div>
              <div className="w-12 h-12 bg-[#90e0ef] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Commercial</p>
                <p className="text-3xl font-bold text-gray-900">{stats.commercial}</p>
              </div>
              <div className="w-12 h-12 bg-[#0077b6] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                statusFilter === tab.id
                  ? 'bg-[#0077b6] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  aria-label="Search leads"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                />
              </div>
              <select
                aria-label="Filter leads by service"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
              >
                <option value="all">All Services</option>
                <option value="Residential Cleaning">Residential</option>
                <option value="Office Cleaning">Commercial</option>
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Move In/Out">Move In/Out</option>
                <option value="Carpet Cleaning">Carpet Cleaning</option>
                <option value="Window Cleaning">Window Cleaning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      {hydrated ? 'No leads match your current filters.' : 'Loading leads...'}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => openLead(lead.id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-full flex items-center justify-center text-white font-semibold">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{lead.name}</p>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                            <p className="text-sm text-gray-600">{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0077b6] bg-opacity-10 text-[#0077b6]">
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 font-medium">{lead.propertySize}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00b4d8] bg-opacity-10 text-[#00b4d8]">
                          {lead.frequency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_META[lead.status].badge}`}>
                          {STATUS_META[lead.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{getTimeAgo(lead.createdAt)}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Click any lead to view details, update its status, or remove it. Changes are saved in your browser.
        </p>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={closeLead}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Lead details for ${selectedLead.name}`}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedLead.name}</h3>
                  <p className="text-sm text-gray-500">Received {getTimeAgo(selectedLead.createdAt)}</p>
                </div>
              </div>
              <button
                onClick={closeLead}
                aria-label="Close"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#0077b6] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedLead.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#0077b6] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#0077b6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 truncate">{selectedLead.email}</p>
                  </div>
                </a>
              </div>

              {/* Request Details */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service</span>
                  <span className="font-medium text-gray-900">{selectedLead.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Property Size</span>
                  <span className="font-medium text-gray-900">{selectedLead.propertySize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Frequency</span>
                  <span className="font-medium text-gray-900">{selectedLead.frequency}</span>
                </div>
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Message</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Status</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(STATUS_META) as LeadStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedLead.id, status)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedLead.status === status
                          ? 'bg-[#0077b6] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {STATUS_META[status].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete */}
              <div className="pt-2 border-t border-gray-200">
                {confirmingDelete ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => deleteLead(selectedLead.id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setConfirmingDelete(false)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingDelete(true)}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                  >
                    Delete Lead
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add new lead"
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-900">Add New Lead</h3>
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddLead} className="p-6 space-y-4">
              <div>
                <label htmlFor="cleaning-admin-lead-name" className="block text-sm font-semibold text-gray-900 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="cleaning-admin-lead-name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cleaning-admin-lead-phone" className="block text-sm font-semibold text-gray-900 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="cleaning-admin-lead-phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                    placeholder="(555) 555-1234"
                  />
                </div>
                <div>
                  <label htmlFor="cleaning-admin-lead-email" className="block text-sm font-semibold text-gray-900 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="cleaning-admin-lead-email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                    placeholder="jane@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cleaning-admin-lead-service" className="block text-sm font-semibold text-gray-900 mb-1">
                    Service *
                  </label>
                  <select
                    id="cleaning-admin-lead-service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                  >
                    {SERVICES.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cleaning-admin-lead-size" className="block text-sm font-semibold text-gray-900 mb-1">
                    Property Size *
                  </label>
                  <select
                    id="cleaning-admin-lead-size"
                    name="propertySize"
                    required
                    value={form.propertySize}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                  >
                    <option>Studio/1BR</option>
                    <option>2BR</option>
                    <option>3BR</option>
                    <option>4BR+</option>
                    <option>Under 1,000 sq ft</option>
                    <option>1,000-2,500 sq ft</option>
                    <option>2,500+ sq ft</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="cleaning-admin-lead-frequency" className="block text-sm font-semibold text-gray-900 mb-1">
                  Frequency *
                </label>
                <select
                  id="cleaning-admin-lead-frequency"
                  name="frequency"
                  required
                  value={form.frequency}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                >
                  <option>One-time</option>
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label htmlFor="cleaning-admin-lead-message" className="block text-sm font-semibold text-gray-900 mb-1">
                  Notes
                </label>
                <textarea
                  id="cleaning-admin-lead-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent resize-none"
                  placeholder="Any details about the request..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#0077b6] text-white rounded-lg font-semibold hover:bg-[#005f8f] transition-colors"
                >
                  Save Lead
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
