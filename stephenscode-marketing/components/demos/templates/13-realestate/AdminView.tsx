import React, { useEffect, useState } from 'react';
import { Building2, Home, Users, TrendingUp, MessageSquare, Settings, BarChart3, Plus, Edit, Trash2, Eye, Search, Filter, X, Star } from 'lucide-react';

interface AdminListing {
  id: number;
  address: string;
  price: number;
  status: 'Active' | 'Pending' | 'Sold';
  views: number;
  inquiries: number;
}

interface AdminInquiry {
  id: number;
  name: string;
  email: string;
  type: string;
  date: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Closed';
}

interface AdminAgent {
  id: number;
  name: string;
  listings: number;
  sales: number;
  revenue: string;
  rating: number;
}

interface AdminSettings {
  emailNotifications: boolean;
  smsAlerts: boolean;
  autoPublish: boolean;
  weeklyReport: boolean;
}

const DEFAULT_LISTINGS: AdminListing[] = [
  { id: 1, address: '789 Skyline Tower', price: 1850000, status: 'Active', views: 245, inquiries: 12 },
  { id: 2, address: '456 Ocean View Drive', price: 3200000, status: 'Pending', views: 189, inquiries: 8 },
  { id: 3, address: '123 Maple Street', price: 975000, status: 'Active', views: 312, inquiries: 15 },
  { id: 4, address: '321 Gallery Lane', price: 685000, status: 'Active', views: 198, inquiries: 10 },
];

const DEFAULT_INQUIRIES: AdminInquiry[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', type: 'Buying', date: '2024-11-13', status: 'New' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', type: 'Selling', date: '2024-11-13', status: 'Contacted' },
  { id: 3, name: 'Mike Davis', email: 'mike@example.com', type: 'Valuation', date: '2024-11-12', status: 'New' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', type: 'Consultation', date: '2024-11-12', status: 'Scheduled' },
];

const DEFAULT_AGENTS: AdminAgent[] = [
  { id: 1, name: 'Sarah Martinez', listings: 12, sales: 8, revenue: '$4.2M', rating: 4.9 },
  { id: 2, name: 'Michael Chen', listings: 15, sales: 10, revenue: '$5.8M', rating: 5.0 },
  { id: 3, name: 'Emily Thompson', listings: 9, sales: 6, revenue: '$3.1M', rating: 4.8 },
  { id: 4, name: 'David Rodriguez', listings: 8, sales: 5, revenue: '$3.9M', rating: 4.9 },
];

const DEFAULT_SETTINGS: AdminSettings = {
  emailNotifications: true,
  smsAlerts: false,
  autoPublish: true,
  weeklyReport: true,
};

const STORAGE_KEYS = {
  listings: 'skyline-admin-listings',
  inquiries: 'skyline-admin-inquiries',
  agents: 'skyline-admin-agents',
  settings: 'skyline-admin-settings',
};

const nextId = (items: { id: number }[]) => items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

/* ---------- Reusable modal shell ---------- */

const AdminModal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
    <div
      className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-bold text-[#000814]">{title}</h3>
        <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

/* ---------- Listing form modal ---------- */

const ListingFormModal: React.FC<{
  initial: AdminListing | null;
  onSave: (data: { address: string; price: number; status: AdminListing['status'] }) => void;
  onClose: () => void;
}> = ({ initial, onSave, onClose }) => {
  const [address, setAddress] = useState(initial?.address ?? '');
  const [price, setPrice] = useState(initial?.price ?? 500000);
  const [status, setStatus] = useState<AdminListing['status']>(initial?.status ?? 'Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ address: address.trim(), price, status });
  };

  return (
    <AdminModal title={initial ? 'Edit Listing' : 'Add Listing'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-listing-address" className="block text-sm font-medium text-gray-700 mb-2">
            Property Address *
          </label>
          <input
            id="admin-listing-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="123 Example Street"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="admin-listing-price" className="block text-sm font-medium text-gray-700 mb-2">
            List Price ($) *
          </label>
          <input
            id="admin-listing-price"
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="admin-listing-status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="admin-listing-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as AdminListing['status'])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
          >
            {initial ? 'Save Changes' : 'Add Listing'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminModal>
  );
};

/* ---------- Agent form modal ---------- */

const AgentFormModal: React.FC<{
  initial: AdminAgent | null;
  onSave: (data: Omit<AdminAgent, 'id'>) => void;
  onDelete?: () => void;
  onClose: () => void;
}> = ({ initial, onSave, onDelete, onClose }) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [listings, setListings] = useState(initial?.listings ?? 0);
  const [sales, setSales] = useState(initial?.sales ?? 0);
  const [revenue, setRevenue] = useState(initial?.revenue ?? '$0M');
  const [rating, setRating] = useState(initial?.rating ?? 4.5);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: name.trim(), listings, sales, revenue: revenue.trim(), rating });
  };

  return (
    <AdminModal title={initial ? `Manage ${initial.name}` : 'Add Agent'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-agent-name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            id="admin-agent-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Agent name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-agent-listings" className="block text-sm font-medium text-gray-700 mb-2">
              Active Listings
            </label>
            <input
              id="admin-agent-listings"
              type="number"
              min={0}
              value={listings}
              onChange={(e) => setListings(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="admin-agent-sales" className="block text-sm font-medium text-gray-700 mb-2">
              Sales This Year
            </label>
            <input
              id="admin-agent-sales"
              type="number"
              min={0}
              value={sales}
              onChange={(e) => setSales(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="admin-agent-revenue" className="block text-sm font-medium text-gray-700 mb-2">
              Revenue
            </label>
            <input
              id="admin-agent-revenue"
              type="text"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="$1.5M"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="admin-agent-rating" className="block text-sm font-medium text-gray-700 mb-2">
              Rating (0-5)
            </label>
            <input
              id="admin-agent-rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
          >
            {initial ? 'Save Changes' : 'Add Agent'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
        {initial && onDelete && (
          <button
            type="button"
            onClick={() => {
              if (confirmingDelete) {
                onDelete();
              } else {
                setConfirmingDelete(true);
              }
            }}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
              confirmingDelete
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border border-red-300 text-red-600 hover:bg-red-50'
            }`}
          >
            {confirmingDelete ? 'Confirm Remove Agent' : 'Remove Agent'}
          </button>
        )}
      </form>
    </AdminModal>
  );
};

/* ---------- Settings toggle ---------- */

const SettingToggle: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b last:border-b-0">
    <div className="pr-4">
      <div className="font-semibold text-[#000814]">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
        checked ? 'bg-[#ffc300]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  </div>
);

/* ---------- Main admin view ---------- */

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [storageLoaded, setStorageLoaded] = useState(false);

  const [listings, setListings] = useState<AdminListing[]>(DEFAULT_LISTINGS);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(DEFAULT_INQUIRIES);
  const [agents, setAgents] = useState<AdminAgent[]>(DEFAULT_AGENTS);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);

  const [listingSearch, setListingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | AdminListing['status']>('All');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [inquirySearch, setInquirySearch] = useState('');

  const [showSettings, setShowSettings] = useState(false);
  const [showAddListing, setShowAddListing] = useState(false);
  const [editingListing, setEditingListing] = useState<AdminListing | null>(null);
  const [viewingListing, setViewingListing] = useState<AdminListing | null>(null);
  const [deletingListing, setDeletingListing] = useState<AdminListing | null>(null);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [managingAgent, setManagingAgent] = useState<AdminAgent | null>(null);
  const [viewingAgent, setViewingAgent] = useState<AdminAgent | null>(null);

  useEffect(() => {
    try {
      const rawListings = localStorage.getItem(STORAGE_KEYS.listings);
      if (rawListings) setListings(JSON.parse(rawListings));
      const rawInquiries = localStorage.getItem(STORAGE_KEYS.inquiries);
      if (rawInquiries) setInquiries(JSON.parse(rawInquiries));
      const rawAgents = localStorage.getItem(STORAGE_KEYS.agents);
      if (rawAgents) setAgents(JSON.parse(rawAgents));
      const rawSettings = localStorage.getItem(STORAGE_KEYS.settings);
      if (rawSettings) setSettings(JSON.parse(rawSettings));
    } catch {
      /* corrupted storage falls back to defaults */
    }
    setStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.listings, JSON.stringify(listings));
      localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries));
      localStorage.setItem(STORAGE_KEYS.agents, JSON.stringify(agents));
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable */
    }
  }, [listings, inquiries, agents, settings, storageLoaded]);

  const stats = [
    {
      label: 'Active Listings',
      value: listings.filter((l) => l.status === 'Active').length,
      change: '+12%',
      icon: Home,
      color: 'bg-blue-500',
    },
    { label: 'Total Agents', value: agents.length, change: '+3', icon: Users, color: 'bg-green-500' },
    {
      label: 'Pending Sales',
      value: listings.filter((l) => l.status === 'Pending').length,
      change: '+5',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      label: 'New Inquiries',
      value: inquiries.filter((i) => i.status === 'New').length,
      change: '+18%',
      icon: MessageSquare,
      color: 'bg-amber-500',
    },
  ];

  const filteredListings = listings.filter((listing) => {
    const q = listingSearch.trim().toLowerCase();
    const matchesSearch = !q || listing.address.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInquiries = inquiries.filter((inquiry) => {
    const q = inquirySearch.trim().toLowerCase();
    return (
      !q ||
      inquiry.name.toLowerCase().includes(q) ||
      inquiry.email.toLowerCase().includes(q) ||
      inquiry.type.toLowerCase().includes(q)
    );
  });

  const statusBadgeClasses = (status: AdminListing['status']) =>
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : status === 'Pending'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-gray-200 text-gray-700';

  const inquiryBadgeClasses = (status: AdminInquiry['status']) =>
    status === 'New'
      ? 'bg-blue-100 text-blue-700'
      : status === 'Contacted'
      ? 'bg-green-100 text-green-700'
      : status === 'Scheduled'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-gray-200 text-gray-700';

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-[#000814] mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#000814]">Recent Listings</h3>
            <button
              onClick={() => setActiveTab('listings')}
              className="text-[#ffc300] hover:text-[#ffcd1a] font-semibold"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {listings.slice(0, 4).map((listing) => (
              <button
                key={listing.id}
                onClick={() => setViewingListing(listing)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="font-semibold text-[#000814]">{listing.address}</div>
                  <div className="text-sm text-gray-600">${(listing.price / 1000).toLocaleString()}K</div>
                </div>
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-600">{listing.views} views</div>
                  <div className="text-sm text-gray-600">{listing.inquiries} inquiries</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses(listing.status)}`}>
                  {listing.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#000814]">Recent Inquiries</h3>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="text-[#ffc300] hover:text-[#ffcd1a] font-semibold"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {inquiries.slice(0, 4).map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setActiveTab('inquiries')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="font-semibold text-[#000814]">{inquiry.name}</div>
                  <div className="text-sm text-gray-600">{inquiry.type} • {inquiry.date}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${inquiryBadgeClasses(inquiry.status)}`}>
                  {inquiry.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#000814]">Manage Listings</h3>
        <button
          onClick={() => setShowAddListing(true)}
          className="bg-[#000814] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Listing
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            aria-label="Search listings"
            value={listingSearch}
            onChange={(e) => setListingSearch(e.target.value)}
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowStatusFilter((s) => !s)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Filter className="w-5 h-5 mr-2" />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
          </button>
          {showStatusFilter && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 w-40 overflow-hidden">
              {(['All', 'Active', 'Pending', 'Sold'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setShowStatusFilter(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                    statusFilter === status ? 'font-bold text-[#000814] bg-gray-50' : 'text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Property</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Views</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Inquiries</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <tr key={listing.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-[#000814]">{listing.address}</td>
                <td className="py-4 px-4">${(listing.price / 1000).toLocaleString()}K</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses(listing.status)}`}>
                    {listing.status}
                  </span>
                </td>
                <td className="py-4 px-4">{listing.views}</td>
                <td className="py-4 px-4">{listing.inquiries}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setViewingListing(listing)}
                      aria-label={`View ${listing.address}`}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setEditingListing(listing)}
                      aria-label={`Edit ${listing.address}`}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setDeletingListing(listing)}
                      aria-label={`Delete ${listing.address}`}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredListings.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No listings match your search. Try different keywords or add a new listing.
          </div>
        )}
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#000814]">Team Management</h3>
        <button
          onClick={() => setShowAddAgent(true)}
          className="bg-[#000814] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-[#000814]">{agent.name}</h4>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-[#ffc300] fill-[#ffc300] mr-1" />
                <span className="font-semibold">{agent.rating}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-[#000814]">{agent.listings}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#000814]">{agent.sales}</div>
                <div className="text-sm text-gray-600">This Year</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#000814]">{agent.revenue}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewingAgent(agent)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold"
              >
                View Profile
              </button>
              <button
                onClick={() => setManagingAgent(agent)}
                className="flex-1 px-4 py-2 bg-[#000814] text-white rounded-lg hover:bg-[#001d3d] text-sm font-semibold"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
      {agents.length === 0 && (
        <div className="text-center py-10 text-gray-500">No agents yet. Add your first team member.</div>
      )}
    </div>
  );

  const renderInquiries = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#000814]">Inquiries Management</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
          {inquiries.filter((i) => i.status === 'New').length} new
        </span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          aria-label="Search inquiries"
          value={inquirySearch}
          onChange={(e) => setInquirySearch(e.target.value)}
          placeholder="Search by name, email, or inquiry type..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-[#000814]">{inquiry.name}</td>
                <td className="py-4 px-4 text-gray-600">{inquiry.email}</td>
                <td className="py-4 px-4">{inquiry.type}</td>
                <td className="py-4 px-4 text-gray-600">{inquiry.date}</td>
                <td className="py-4 px-4">
                  <select
                    aria-label={`Status for ${inquiry.name}`}
                    value={inquiry.status}
                    onChange={(e) =>
                      setInquiries((prev) =>
                        prev.map((i) =>
                          i.id === inquiry.id ? { ...i, status: e.target.value as AdminInquiry['status'] } : i
                        )
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${inquiryBadgeClasses(inquiry.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setInquiries((prev) => prev.filter((i) => i.id !== inquiry.id))}
                      aria-label={`Delete inquiry from ${inquiry.name}`}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredInquiries.length === 0 && (
          <div className="text-center py-10 text-gray-500">No inquiries match your search.</div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'listings', label: 'Listings', icon: Home },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[#000814] text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-[#ffc300]" />
              <div>
                <h1 className="text-xl font-bold">Skyline Realty Admin</h1>
                <p className="text-xs text-gray-400">Content Management System</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center space-x-2 bg-[#001d3d] px-4 py-2 rounded-lg hover:bg-[#002855] transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#ffc300] text-[#000814]'
                      : 'border-transparent text-gray-600 hover:text-[#000814]'
                  }`}
                >
                  <Icon className="w-5 h-5 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'listings' && renderListings()}
        {activeTab === 'agents' && renderAgents()}
        {activeTab === 'inquiries' && renderInquiries()}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <AdminModal title="Site Settings" onClose={() => setShowSettings(false)}>
          <SettingToggle
            label="Email Notifications"
            description="Send an email when a new inquiry arrives"
            checked={settings.emailNotifications}
            onChange={() => setSettings((s) => ({ ...s, emailNotifications: !s.emailNotifications }))}
          />
          <SettingToggle
            label="SMS Alerts"
            description="Text the on-call agent for urgent inquiries"
            checked={settings.smsAlerts}
            onChange={() => setSettings((s) => ({ ...s, smsAlerts: !s.smsAlerts }))}
          />
          <SettingToggle
            label="Auto-Publish Listings"
            description="Publish new listings to the site immediately"
            checked={settings.autoPublish}
            onChange={() => setSettings((s) => ({ ...s, autoPublish: !s.autoPublish }))}
          />
          <SettingToggle
            label="Weekly Report"
            description="Email a performance summary every Monday"
            checked={settings.weeklyReport}
            onChange={() => setSettings((s) => ({ ...s, weeklyReport: !s.weeklyReport }))}
          />
          <button
            onClick={() => setShowSettings(false)}
            className="w-full mt-6 bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
          >
            Done
          </button>
        </AdminModal>
      )}

      {/* Add Listing Modal */}
      {showAddListing && (
        <ListingFormModal
          initial={null}
          onClose={() => setShowAddListing(false)}
          onSave={(data) => {
            setListings((prev) => [
              { id: nextId(prev), address: data.address, price: data.price, status: data.status, views: 0, inquiries: 0 },
              ...prev,
            ]);
            setShowAddListing(false);
          }}
        />
      )}

      {/* Edit Listing Modal */}
      {editingListing && (
        <ListingFormModal
          initial={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={(data) => {
            setListings((prev) =>
              prev.map((l) => (l.id === editingListing.id ? { ...l, ...data } : l))
            );
            setEditingListing(null);
          }}
        />
      )}

      {/* View Listing Modal */}
      {viewingListing && (
        <AdminModal title={viewingListing.address} onClose={() => setViewingListing(null)}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">List Price</div>
              <div className="text-xl font-bold text-[#000814]">${viewingListing.price.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClasses(viewingListing.status)}`}>
                {viewingListing.status}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Page Views</div>
              <div className="text-xl font-bold text-[#000814]">{viewingListing.views}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Inquiries</div>
              <div className="text-xl font-bold text-[#000814]">{viewingListing.inquiries}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingListing(viewingListing);
                setViewingListing(null);
              }}
              className="flex-1 bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Edit Listing
            </button>
            <button
              onClick={() => setViewingListing(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </AdminModal>
      )}

      {/* Delete Listing Confirmation */}
      {deletingListing && (
        <AdminModal title="Delete Listing" onClose={() => setDeletingListing(null)}>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold text-[#000814]">{deletingListing.address}</span>?
            This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setListings((prev) => prev.filter((l) => l.id !== deletingListing.id));
                setDeletingListing(null);
              }}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setDeletingListing(null)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </AdminModal>
      )}

      {/* Add Agent Modal */}
      {showAddAgent && (
        <AgentFormModal
          initial={null}
          onClose={() => setShowAddAgent(false)}
          onSave={(data) => {
            setAgents((prev) => [...prev, { id: nextId(prev), ...data }]);
            setShowAddAgent(false);
          }}
        />
      )}

      {/* Manage Agent Modal */}
      {managingAgent && (
        <AgentFormModal
          initial={managingAgent}
          onClose={() => setManagingAgent(null)}
          onSave={(data) => {
            setAgents((prev) => prev.map((a) => (a.id === managingAgent.id ? { ...a, ...data } : a)));
            setManagingAgent(null);
          }}
          onDelete={() => {
            setAgents((prev) => prev.filter((a) => a.id !== managingAgent.id));
            setManagingAgent(null);
          }}
        />
      )}

      {/* View Agent Profile Modal */}
      {viewingAgent && (
        <AdminModal title={viewingAgent.name} onClose={() => setViewingAgent(null)}>
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-[#000814] rounded-full flex items-center justify-center text-[#ffc300] text-2xl font-bold mr-4">
              {viewingAgent.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="text-xl font-bold text-[#000814]">{viewingAgent.name}</div>
              <div className="flex items-center text-gray-600">
                <Star className="w-4 h-4 text-[#ffc300] fill-[#ffc300] mr-1" />
                {viewingAgent.rating} rating
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#000814]">{viewingAgent.listings}</div>
              <div className="text-sm text-gray-600">Active Listings</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#000814]">{viewingAgent.sales}</div>
              <div className="text-sm text-gray-600">Sales This Year</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#000814]">{viewingAgent.revenue}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setManagingAgent(viewingAgent);
                setViewingAgent(null);
              }}
              className="flex-1 bg-[#000814] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Manage Agent
            </button>
            <button
              onClick={() => setViewingAgent(null)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminView;
