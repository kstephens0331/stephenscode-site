import React, { useState } from 'react';
import {
  Settings,
  FileText,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Wrench,
  MapPin
} from 'lucide-react';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Pending Quotes', value: '12', icon: FileText, color: 'bg-blue-500' },
    { label: 'Scheduled Jobs', value: '28', icon: Calendar, color: 'bg-green-500' },
    { label: 'Active Technicians', value: '8', icon: Users, color: 'bg-purple-500' },
    { label: 'Monthly Revenue', value: '$48.5K', icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const recentJobs = [
    {
      id: 'JOB-1234',
      customer: 'Sarah Johnson',
      service: 'Emergency Leak Repair',
      status: 'In Progress',
      technician: 'Mike T.',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 'JOB-1235',
      customer: 'Robert Chen',
      service: 'Water Heater Installation',
      status: 'Scheduled',
      technician: 'Tom B.',
      time: 'Tomorrow 9:00 AM',
      priority: 'normal'
    },
    {
      id: 'JOB-1236',
      customer: 'Lisa Martinez',
      service: 'Drain Cleaning',
      status: 'Completed',
      technician: 'Mike T.',
      time: '1 hour ago',
      priority: 'normal'
    },
    {
      id: 'JOB-1237',
      customer: 'David Wilson',
      service: 'Sewer Line Inspection',
      status: 'Pending',
      technician: 'Unassigned',
      time: 'Today 2:00 PM',
      priority: 'normal'
    }
  ];

  const technicians = [
    { name: 'Mike Thompson', status: 'On Job', location: 'Downtown', jobs: 3 },
    { name: 'Tom Bradley', status: 'Available', location: 'Office', jobs: 2 },
    { name: 'Sarah Lee', status: 'On Job', location: 'North Side', jobs: 4 },
    { name: 'John Davis', status: 'Break', location: 'West End', jobs: 2 }
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
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Jobs & Technicians */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Jobs</h2>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#0466c8] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{job.id}</span>
                      {job.priority === 'high' && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{job.customer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    job.status === 'Scheduled' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{job.service}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{job.technician}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.time}</span>
                    </span>
                  </div>
                  <button className="text-[#0466c8] font-semibold hover:text-[#0353a4]">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technician Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Technician Status</h2>
          <div className="space-y-4">
            {technicians.map((tech, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{tech.name}</p>
                  <span className={`w-3 h-3 rounded-full ${
                    tech.status === 'Available' ? 'bg-green-500' :
                    tech.status === 'On Job' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{tech.status}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{tech.location}</span>
                  </span>
                  <span>{tech.jobs} jobs today</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'jobs':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Management</h2>
            <p className="text-gray-600">Job scheduling and tracking interface</p>
          </div>
        );
      case 'customers':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Database</h2>
            <p className="text-gray-600">Customer information and history</p>
          </div>
        );
      case 'invoicing':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoicing & Payments</h2>
            <p className="text-gray-600">Invoice creation and payment tracking</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600">Business insights and performance metrics</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#023e7d] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#0466c8] p-2 rounded-lg">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Premier Plumbing Pros</h1>
                <p className="text-sm text-blue-200">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency Queue (3)</span>
              </button>
              <button className="bg-[#0466c8] hover:bg-[#0353a4] px-4 py-2 rounded-lg font-semibold transition-colors">
                New Job
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'jobs', label: 'Jobs', icon: Wrench },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'invoicing', label: 'Invoicing', icon: DollarSign },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#0466c8] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
