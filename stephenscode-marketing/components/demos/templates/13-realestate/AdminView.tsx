import React, { useState } from 'react';
import { Building2, Home, Users, TrendingUp, MessageSquare, Settings, BarChart3, Calendar, Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Active Listings', value: '48', change: '+12%', icon: Home, color: 'bg-blue-500' },
    { label: 'Total Agents', value: '24', change: '+3', icon: Users, color: 'bg-green-500' },
    { label: 'Pending Sales', value: '15', change: '+5', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'New Inquiries', value: '32', change: '+18', icon: MessageSquare, color: 'bg-amber-500' },
  ];

  const recentListings = [
    { id: 1, address: '789 Skyline Tower', price: 1850000, status: 'Active', views: 245, inquiries: 12 },
    { id: 2, address: '456 Ocean View Drive', price: 3200000, status: 'Pending', views: 189, inquiries: 8 },
    { id: 3, address: '123 Maple Street', price: 975000, status: 'Active', views: 312, inquiries: 15 },
    { id: 4, address: '321 Gallery Lane', price: 685000, status: 'Active', views: 198, inquiries: 10 },
  ];

  const recentInquiries = [
    { id: 1, name: 'John Smith', email: 'john@example.com', type: 'Buying', date: '2024-11-13', status: 'New' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', type: 'Selling', date: '2024-11-13', status: 'Contacted' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', type: 'Valuation', date: '2024-11-12', status: 'New' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', type: 'Consultation', date: '2024-11-12', status: 'Scheduled' },
  ];

  const agents = [
    { id: 1, name: 'Sarah Martinez', listings: 12, sales: 8, revenue: '$4.2M', rating: 4.9 },
    { id: 2, name: 'Michael Chen', listings: 15, sales: 10, revenue: '$5.8M', rating: 5.0 },
    { id: 3, name: 'Emily Thompson', listings: 9, sales: 6, revenue: '$3.1M', rating: 4.8 },
    { id: 4, name: 'David Rodriguez', listings: 8, sales: 5, revenue: '$3.9M', rating: 4.9 },
  ];

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
            <button className="text-[#ffc300] hover:text-[#ffcd1a] font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-[#000814]">{listing.address}</div>
                  <div className="text-sm text-gray-600">${(listing.price / 1000).toLocaleString()}K</div>
                </div>
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-600">{listing.views} views</div>
                  <div className="text-sm text-gray-600">{listing.inquiries} inquiries</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {listing.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#000814]">Recent Inquiries</h3>
            <button className="text-[#ffc300] hover:text-[#ffcd1a] font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-[#000814]">{inquiry.name}</div>
                  <div className="text-sm text-gray-600">{inquiry.type} • {inquiry.date}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    inquiry.status === 'New'
                      ? 'bg-blue-100 text-blue-700'
                      : inquiry.status === 'Contacted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
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
        <button className="bg-[#000814] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center">
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
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </button>
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
            {recentListings.map((listing) => (
              <tr key={listing.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4 font-medium text-[#000814]">{listing.address}</td>
                <td className="py-4 px-4">${(listing.price / 1000).toLocaleString()}K</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="py-4 px-4">{listing.views}</td>
                <td className="py-4 px-4">{listing.inquiries}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#000814]">Team Management</h3>
        <button className="bg-[#000814] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center">
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
                <div className="text-[#ffc300] mr-1">★</div>
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
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                View Profile
              </button>
              <button className="flex-1 px-4 py-2 bg-[#000814] text-white rounded-lg hover:bg-[#001d3d] text-sm font-semibold">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
            <button className="flex items-center space-x-2 bg-[#001d3d] px-4 py-2 rounded-lg hover:bg-[#002855] transition-colors">
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
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-[#ffc300] text-[#000814]'
                  : 'border-transparent text-gray-600 hover:text-[#000814]'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'listings'
                  ? 'border-[#ffc300] text-[#000814]'
                  : 'border-transparent text-gray-600 hover:text-[#000814]'
              }`}
            >
              <Home className="w-5 h-5 inline mr-2" />
              Listings
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'agents'
                  ? 'border-[#ffc300] text-[#000814]'
                  : 'border-transparent text-gray-600 hover:text-[#000814]'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Agents
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'inquiries'
                  ? 'border-[#ffc300] text-[#000814]'
                  : 'border-transparent text-gray-600 hover:text-[#000814]'
              }`}
            >
              <MessageSquare className="w-5 h-5 inline mr-2" />
              Inquiries
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'listings' && renderListings()}
        {activeTab === 'agents' && renderAgents()}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-[#000814] mb-6">Inquiries Management</h3>
            <p className="text-gray-600">Inquiry management interface would be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
