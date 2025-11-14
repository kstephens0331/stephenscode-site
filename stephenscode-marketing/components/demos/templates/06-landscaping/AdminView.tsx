'use client';

import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Phone,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  Award,
  BarChart3
} from 'lucide-react';

interface AdminViewProps {
  onSwitchToCustomer: () => void;
}

export default function AdminView({ onSwitchToCustomer }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data for admin dashboard
  const stats = [
    { label: 'Total Leads', value: '47', change: '+12%', icon: <Users />, color: 'from-[#386641] to-[#6a994e]' },
    { label: 'Active Projects', value: '23', change: '+5', icon: <FileText />, color: 'from-[#6a994e] to-[#a7c957]' },
    { label: 'This Month Revenue', value: '$48,250', change: '+18%', icon: <DollarSign />, color: 'from-[#386641] to-[#6a994e]' },
    { label: 'Customer Rating', value: '4.9', change: '+0.2', icon: <Award />, color: 'from-[#6a994e] to-[#a7c957]' }
  ];

  const recentLeads = [
    { id: 1, name: 'Sarah Mitchell', service: 'Landscape Design', date: '2 hours ago', status: 'new', value: '$3,500' },
    { id: 2, name: 'Michael Chen', service: 'Hardscaping', date: '5 hours ago', status: 'contacted', value: '$8,200' },
    { id: 3, name: 'Jennifer Rodriguez', service: 'Lawn Care', date: '1 day ago', status: 'quoted', value: '$850' },
    { id: 4, name: 'David Thompson', service: 'Irrigation System', date: '1 day ago', status: 'new', value: '$2,400' },
    { id: 5, name: 'Lisa Anderson', service: 'Seasonal Cleanup', date: '2 days ago', status: 'contacted', value: '$450' }
  ];

  const upcomingAppointments = [
    { id: 1, client: 'Robert Williams', service: 'Site Consultation', date: 'Today, 2:00 PM', location: 'Highland Park' },
    { id: 2, client: 'Emily Parker', service: 'Project Review', date: 'Tomorrow, 10:00 AM', location: 'Cedar Lane' },
    { id: 3, client: 'James Martin', service: 'Final Walkthrough', date: 'Mar 15, 3:00 PM', location: 'Forest View' }
  ];

  const testimonials = [
    { id: 1, name: 'Amanda Taylor', rating: 5, status: 'published', date: 'Mar 10, 2024' },
    { id: 2, name: 'Christopher Lee', rating: 5, status: 'pending', date: 'Mar 12, 2024' },
    { id: 3, name: 'Patricia Hughes', rating: 5, status: 'published', date: 'Mar 11, 2024' }
  ];

  const galleryProjects = [
    { id: 1, title: 'Modern Backyard Transformation', category: 'Landscape Design', status: 'published', images: 2 },
    { id: 2, title: 'Custom Stone Patio', category: 'Hardscaping', status: 'published', images: 2 },
    { id: 3, title: 'Lawn Restoration', category: 'Lawn Care', status: 'draft', images: 2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'quoted':
        return 'bg-purple-100 text-purple-700';
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-[#a7c957] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                      {React.cloneElement(stat.icon, { className: 'h-6 w-6' })}
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#386641] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#386641] flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Recent Leads
                  </h2>
                  <button className="text-[#6a994e] hover:text-[#386641] font-semibold text-sm">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-all">
                      <div className="flex-1">
                        <div className="font-semibold text-[#386641]">{lead.name}</div>
                        <div className="text-sm text-gray-600">{lead.service}</div>
                        <div className="text-xs text-gray-500 mt-1">{lead.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#6a994e] mb-2">{lead.value}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#386641] flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Appointments
                  </h2>
                  <button className="text-[#6a994e] hover:text-[#386641] font-semibold text-sm">
                    Schedule
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-gradient-to-r from-[#a7c957]/10 to-transparent rounded-lg border-l-4 border-[#a7c957]">
                      <div className="font-semibold text-[#386641]">{apt.client}</div>
                      <div className="text-sm text-gray-600 mt-1">{apt.service}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          {apt.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#386641] mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#386641] to-[#6a994e] text-white rounded-lg hover:from-[#6a994e] hover:to-[#a7c957] transition-all">
                  <Plus className="h-5 w-5" />
                  <span className="font-semibold">New Project</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all">
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Email Client</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all">
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold">Create Quote</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all">
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-semibold">View Reports</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#386641]">Lead Management</h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all">
                  Filter
                </button>
                <button className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all">
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Service</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Value</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-stone-50">
                      <td className="py-4 px-4 font-semibold text-[#386641]">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-600">{lead.service}</td>
                      <td className="py-4 px-4 font-bold text-[#6a994e]">{lead.value}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">{lead.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-all">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-all">
                            <Edit className="h-4 w-4 text-green-600" />
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

      case 'testimonials':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#386641]">Testimonials</h2>
              <button className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Testimonial
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#a7c957] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-[#386641]">{testimonial.name}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-4 w-4 text-[#a7c957] fill-[#a7c957]" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">{testimonial.date}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold">
                      View
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-semibold">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#386641]">Gallery Projects</h2>
              <button className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryProjects.map((project) => (
                <div key={project.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#a7c957] transition-all">
                  <div className="aspect-video bg-gradient-to-br from-[#6a994e] to-[#a7c957] flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-white opacity-50" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#386641]">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">{project.category}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <ImageIcon className="h-4 w-4" />
                      {project.images} images
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold">
                        View
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-semibold">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#386641] mb-6">Site Settings</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#386641] mb-2">Business Name</label>
                  <input
                    type="text"
                    defaultValue="Green Valley Landscaping"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#386641] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="(555) 012-3456"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#386641] mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="info@greenvalley.com"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#386641] mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Garden Lane, Green Valley, ST 12345"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#386641] mb-2">Business Description</label>
                <textarea
                  rows={4}
                  defaultValue="Professional landscaping services for over 15 years. We create beautiful, sustainable outdoor environments."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none resize-none"
                />
              </div>
              <button className="bg-[#386641] text-white px-8 py-3 rounded-lg hover:bg-[#6a994e] transition-all font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-[#386641] to-[#6a994e] text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-200">Green Valley Landscaping</p>
              </div>
            </div>
            <button
              onClick={onSwitchToCustomer}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
            >
              <Eye className="h-4 w-4" />
              <span className="font-semibold">View Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp /> },
              { id: 'leads', label: 'Leads', icon: <Mail /> },
              { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare /> },
              { id: 'gallery', label: 'Gallery', icon: <ImageIcon /> },
              { id: 'settings', label: 'Settings', icon: <Settings /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#386641] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {React.cloneElement(tab.icon, { className: 'h-4 w-4' })}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
