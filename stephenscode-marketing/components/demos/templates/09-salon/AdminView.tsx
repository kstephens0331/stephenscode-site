import React, { useState } from 'react';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  Package,
  Settings,
  ChevronDown,
  Search,
  Filter,
  Download,
  Bell,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function AdminView() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const stats = [
    {
      label: 'Today\'s Revenue',
      value: '$3,450',
      change: '+12%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Appointments Today',
      value: '24',
      change: '+5',
      icon: Calendar,
      color: 'from-[#d00000] to-[#e85d04]',
    },
    {
      label: 'Active Clients',
      value: '1,247',
      change: '+18',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      label: 'Avg Rating',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const todayAppointments = [
    {
      id: 1,
      time: '9:00 AM',
      client: 'Sarah Mitchell',
      service: 'Balayage',
      stylist: 'Jessica Ramirez',
      duration: '3 hrs',
      price: 185,
      status: 'confirmed',
    },
    {
      id: 2,
      time: '10:30 AM',
      client: 'Emily Chen',
      service: 'Gel Manicure',
      stylist: 'Taylor Johnson',
      duration: '60 min',
      price: 55,
      status: 'in-progress',
    },
    {
      id: 3,
      time: '12:00 PM',
      client: 'Lisa Rodriguez',
      service: 'Haircut & Style',
      stylist: 'Ashley Kim',
      duration: '45 min',
      price: 65,
      status: 'confirmed',
    },
    {
      id: 4,
      time: '1:30 PM',
      client: 'Jennifer Wilson',
      service: 'Bridal Package',
      stylist: 'Maria Santos',
      duration: '3 hrs',
      price: 250,
      status: 'confirmed',
    },
    {
      id: 5,
      time: '2:00 PM',
      client: 'Amanda Taylor',
      service: 'Full Highlights',
      stylist: 'Jessica Ramirez',
      duration: '3 hrs',
      price: 165,
      status: 'pending',
    },
    {
      id: 6,
      time: '3:00 PM',
      client: 'Rachel Green',
      service: 'Spa Pedicure',
      stylist: 'Taylor Johnson',
      duration: '90 min',
      price: 75,
      status: 'confirmed',
    },
  ];

  const recentClients = [
    {
      name: 'Sarah Mitchell',
      lastVisit: '2024-02-10',
      totalSpent: '$1,245',
      visits: 12,
      status: 'VIP',
    },
    {
      name: 'Emily Chen',
      lastVisit: '2024-02-08',
      totalSpent: '$890',
      visits: 8,
      status: 'Regular',
    },
    {
      name: 'Lisa Rodriguez',
      lastVisit: '2024-02-05',
      totalSpent: '$2,340',
      visits: 18,
      status: 'VIP',
    },
    {
      name: 'Jennifer Wilson',
      lastVisit: '2024-02-03',
      totalSpent: '$650',
      visits: 5,
      status: 'Regular',
    },
  ];

  const stylistPerformance = [
    {
      name: 'Jessica Ramirez',
      appointments: 156,
      revenue: '$24,680',
      rating: 5.0,
      utilization: 94,
    },
    {
      name: 'Ashley Kim',
      appointments: 142,
      revenue: '$21,450',
      rating: 5.0,
      utilization: 89,
    },
    {
      name: 'Maria Santos',
      appointments: 134,
      revenue: '$28,900',
      rating: 5.0,
      utilization: 92,
    },
    {
      name: 'Taylor Johnson',
      appointments: 167,
      revenue: '$18,340',
      rating: 5.0,
      utilization: 96,
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-white mr-3" />
            <h2 className="text-xl font-bold text-white">Today&apos;s Appointments</h2>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              <Filter className="w-4 h-4 inline mr-1" />
              Filter
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              <Download className="w-4 h-4 inline mr-1" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stylist</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((apt) => (
                <tr key={apt.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{apt.time}</td>
                  <td className="px-6 py-4 text-sm">{apt.client}</td>
                  <td className="px-6 py-4 text-sm">{apt.service}</td>
                  <td className="px-6 py-4 text-sm">{apt.stylist}</td>
                  <td className="px-6 py-4 text-sm">{apt.duration}</td>
                  <td className="px-6 py-4 text-sm font-semibold">${apt.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : apt.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-[#d00000] hover:text-[#dc2f02] font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-white mr-3" />
              <h2 className="text-xl font-bold text-white">Recent Clients</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentClients.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div>
                    <h4 className="font-bold">{client.name}</h4>
                    <p className="text-sm text-gray-500">Last visit: {client.lastVisit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#d00000]">{client.totalSpent}</p>
                    <p className="text-sm text-gray-500">{client.visits} visits</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status === 'VIP'
                        ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stylist Performance */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-white mr-3" />
              <h2 className="text-xl font-bold text-white">Stylist Performance (This Month)</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stylistPerformance.map((stylist, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{stylist.name}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-semibold">{stylist.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Appointments</p>
                      <p className="font-semibold">{stylist.appointments}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-[#d00000]">{stylist.revenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Utilization</p>
                      <p className="font-semibold">{stylist.utilization}%</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#d00000] to-[#e85d04] h-2 rounded-full"
                      style={{ width: `${stylist.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
                Glamour Studio Admin
              </h1>
              <p className="text-sm text-gray-600">Manage your salon operations</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-gray-500">Manager</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#d00000] to-[#e85d04] rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'services', label: 'Services', icon: Package },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`${
                  selectedTab === tab.id
                    ? 'border-[#d00000] text-[#d00000]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } flex items-center gap-2 py-4 px-1 border-b-2 font-medium transition-colors`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'dashboard' && renderDashboard()}
        {selectedTab !== 'dashboard' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} View</h3>
            <p className="text-gray-600">
              This section would contain detailed {selectedTab} management features
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
