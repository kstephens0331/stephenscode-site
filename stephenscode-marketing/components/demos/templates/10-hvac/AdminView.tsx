import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Wrench,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function AdminView() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats = [
    { label: 'Service Calls Today', value: '12', icon: Wrench, color: 'text-[#003049]' },
    { label: 'Pending Estimates', value: '8', icon: FileText, color: 'text-[#d62828]' },
    { label: 'Revenue This Week', value: '$24,500', icon: DollarSign, color: 'text-[#f77f00]' },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: TrendingUp, color: 'text-green-600' },
  ];

  const recentServiceCalls = [
    { id: 1, customer: 'John Smith', service: 'AC Repair', time: '9:00 AM', status: 'In Progress', tech: 'Mike Johnson' },
    { id: 2, customer: 'Sarah Davis', service: 'Heating Install', time: '11:00 AM', status: 'Scheduled', tech: 'Tom Brown' },
    { id: 3, customer: 'Robert Wilson', service: 'Maintenance', time: '1:00 PM', status: 'Completed', tech: 'Mike Johnson' },
    { id: 4, customer: 'Emily Chen', service: 'Emergency AC', time: '2:30 PM', status: 'Emergency', tech: 'Available' },
  ];

  const upcomingAppointments = [
    { time: '3:00 PM', customer: 'David Lee', service: 'AC Tune-up', address: '123 Oak St' },
    { time: '4:30 PM', customer: 'Lisa Martinez', service: 'Duct Cleaning', address: '456 Maple Ave' },
    { time: '6:00 PM', customer: 'James Taylor', service: 'Thermostat Install', address: '789 Pine Rd' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#003049]">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#003049]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#003049]">{stat.value}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Service Calls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#003049]">Today&apos;s Service Calls</h2>
          <button className="bg-[#003049] text-white px-4 py-2 rounded-lg hover:bg-[#004d73] transition">
            New Service Call
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentServiceCalls.map((call) => (
                <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{call.time}</td>
                  <td className="py-3 px-4 font-medium">{call.customer}</td>
                  <td className="py-3 px-4">{call.service}</td>
                  <td className="py-3 px-4">{call.tech}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      call.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      call.status === 'Emergency' ? 'bg-red-100 text-red-800' :
                      call.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003049] mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {upcomingAppointments.map((apt, index) => (
              <div key={index} className="border-l-4 border-[#f77f00] pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-[#003049]">{apt.time} - {apt.customer}</p>
                    <p className="text-sm text-gray-600">{apt.service}</p>
                    <p className="text-xs text-gray-500">{apt.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#003049] to-[#004d73] text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left">
              Schedule New Service Call
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left">
              Create Estimate
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left">
              Dispatch Technician
            </button>
            <button className="w-full bg-[#d62828] hover:bg-[#b11f1f] text-white px-4 py-3 rounded-lg transition text-left font-semibold">
              Emergency Service Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-[#003049] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cool Breeze HVAC - Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Admin User</span>
              <div className="w-10 h-10 bg-[#f77f00] rounded-full flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-lg p-4 h-fit sticky top-8">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'invoices', label: 'Invoices', icon: DollarSign },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeSection === item.id
                      ? 'bg-[#003049] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection !== 'dashboard' && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section
                </p>
                <p className="text-sm text-gray-500 mt-2">This is a demo view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
