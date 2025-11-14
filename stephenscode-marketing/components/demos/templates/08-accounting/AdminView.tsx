import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      label: 'Total Clients',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'AUM',
      value: '$2.5B',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Active Tax Returns',
      value: '342',
      change: '+24%',
      trend: 'up',
      icon: FileText,
      color: 'bg-[#fca311]'
    },
    {
      label: 'Consultations This Week',
      value: '28',
      change: '+15%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-purple-500'
    },
  ];

  const recentClients = [
    {
      name: 'Sarah Johnson',
      type: 'Business Owner',
      service: 'Tax Planning',
      status: 'Active',
      value: '$450K',
      lastContact: '2 days ago'
    },
    {
      name: 'Michael Torres',
      type: 'Retired Executive',
      service: 'Wealth Management',
      status: 'Active',
      value: '$1.2M',
      lastContact: '5 days ago'
    },
    {
      name: 'Jennifer Liu',
      type: 'Tech Entrepreneur',
      service: 'Investment Advisory',
      status: 'Active',
      value: '$875K',
      lastContact: '1 week ago'
    },
    {
      name: 'David Patel',
      type: 'Small Business',
      service: 'Business Accounting',
      status: 'Pending',
      value: '$180K',
      lastContact: '3 days ago'
    },
  ];

  const upcomingAppointments = [
    {
      client: 'Robert Williams',
      advisor: 'Robert Thompson',
      type: 'Q4 Review',
      time: 'Today, 2:00 PM',
      status: 'confirmed'
    },
    {
      client: 'Emily Chen',
      advisor: 'Linda Martinez',
      type: 'Tax Planning',
      time: 'Today, 4:30 PM',
      status: 'confirmed'
    },
    {
      client: 'James Anderson',
      advisor: 'David Chen',
      type: 'Portfolio Review',
      time: 'Tomorrow, 10:00 AM',
      status: 'pending'
    },
    {
      client: 'Maria Garcia',
      advisor: 'Robert Thompson',
      type: 'Estate Planning',
      time: 'Tomorrow, 2:00 PM',
      status: 'confirmed'
    },
  ];

  const pendingTasks = [
    {
      task: 'Review tax documents for Johnson LLC',
      assignee: 'Linda Martinez',
      priority: 'High',
      due: 'Today'
    },
    {
      task: 'Prepare Q4 investment report for Torres',
      assignee: 'David Chen',
      priority: 'Medium',
      due: 'Tomorrow'
    },
    {
      task: 'Complete estate planning docs for Liu',
      assignee: 'Robert Thompson',
      priority: 'High',
      due: 'This Week'
    },
    {
      task: 'Follow up on consultation request',
      assignee: 'Linda Martinez',
      priority: 'Low',
      due: 'Next Week'
    },
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
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#14213d]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#14213d]">Recent Clients</h3>
            <button className="text-[#fca311] font-semibold hover:text-[#e59400]">View All</button>
          </div>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#14213d] rounded-full flex items-center justify-center">
                    <Users className="text-[#fca311]" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#14213d]">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.type} • {client.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#14213d]">{client.value}</p>
                  <p className="text-xs text-gray-500">{client.lastContact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#14213d]">Upcoming Appointments</h3>
            <button className="bg-[#fca311] text-[#14213d] px-4 py-2 rounded-lg font-semibold hover:bg-[#e59400] transition-colors text-sm flex items-center gap-2">
              <Plus size={16} />
              New
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((apt, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#14213d] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-[#fca311]" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#14213d]">{apt.client}</p>
                    <p className="text-sm text-gray-600">{apt.type}</p>
                    <p className="text-xs text-gray-500 mt-1">with {apt.advisor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{apt.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    apt.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#14213d]">Pending Tasks</h3>
          <div className="flex gap-2">
            <button className="text-gray-600 hover:text-[#14213d] p-2">
              <Filter size={20} />
            </button>
            <button className="text-gray-600 hover:text-[#14213d] p-2">
              <Download size={20} />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {pendingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 flex-grow">
                <input type="checkbox" className="w-5 h-5 text-[#fca311] border-gray-300 rounded focus:ring-[#fca311]" />
                <div className="flex-grow">
                  <p className="font-semibold text-[#14213d]">{task.task}</p>
                  <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  task.priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.priority}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{task.due}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#14213d]">Client Management</h2>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="bg-[#14213d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center gap-2">
              <Plus size={18} />
              Add Client
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Services</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">AUM/Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentClients.map((client, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#14213d] rounded-full flex items-center justify-center">
                        <Users className="text-[#fca311]" size={18} />
                      </div>
                      <span className="font-semibold text-[#14213d]">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{client.type}</td>
                  <td className="py-4 px-4 text-gray-700">{client.service}</td>
                  <td className="py-4 px-4 font-semibold text-[#14213d]">{client.value}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      client.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-[#fca311] hover:text-[#e59400] font-semibold">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#14213d] text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center">
              <span className="text-[#14213d] font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Peak Financial - Admin Portal</h1>
              <p className="text-xs text-gray-300">Financial Advisory Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors">
              <MessageSquare size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#fca311] rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'clients', name: 'Clients', icon: Users },
              { id: 'appointments', name: 'Appointments', icon: Calendar },
              { id: 'documents', name: 'Documents', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#fca311] border-b-2 border-[#fca311]'
                      : 'text-gray-600 hover:text-[#14213d]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="text-gray-300 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold text-[#14213d] mb-2">Appointments Management</h3>
            <p className="text-gray-600">Full calendar and scheduling system would be displayed here</p>
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="text-gray-300 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold text-[#14213d] mb-2">Document Management</h3>
            <p className="text-gray-600">Secure document storage and client file management would be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
}
