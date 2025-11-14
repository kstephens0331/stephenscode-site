import React from 'react';
import { Settings, Users, Calendar, DollarSign, BarChart3, Wrench } from 'lucide-react';

const colors = {
  primary: '#2c5f2d',
  secondary: '#97bc62',
  accent: '#ff6b35',
};

export default function AdminView() {
  const stats = [
    {
      icon: Calendar,
      label: 'Jobs This Month',
      value: '143',
      change: '+12%',
      changeType: 'positive',
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: '$42,850',
      change: '+8%',
      changeType: 'positive',
    },
    {
      icon: Users,
      label: 'New Customers',
      value: '67',
      change: '+15%',
      changeType: 'positive',
    },
    {
      icon: BarChart3,
      label: 'Avg Rating',
      value: '4.9',
      change: '+0.2',
      changeType: 'positive',
    },
  ];

  const recentLeads = [
    {
      name: 'Sarah Johnson',
      service: 'Electrical Work',
      urgency: 'Emergency',
      time: '10 min ago',
    },
    {
      name: 'Mike Davis',
      service: 'Deck Repair',
      urgency: 'Urgent',
      time: '1 hour ago',
    },
    {
      name: 'Emily Chen',
      service: 'TV Mounting',
      urgency: 'Standard',
      time: '2 hours ago',
    },
  ];

  const upcomingJobs = [
    {
      time: '9:00 AM',
      customer: 'Robert Williams',
      service: 'Plumbing Repair',
      location: 'Downtown',
    },
    {
      time: '11:30 AM',
      customer: 'Lisa Martinez',
      service: 'Door Installation',
      location: 'Westside',
    },
    {
      time: '2:00 PM',
      customer: 'James Anderson',
      service: 'Painting',
      location: 'North Hills',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary }}
              >
                FF
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Fix-It Fast Admin
                </h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8" style={{ color: colors.primary }} />
                <span
                  className={`text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                Recent Leads
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-600">{lead.service}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          lead.urgency === 'Emergency'
                            ? 'bg-red-100 text-red-700'
                            : lead.urgency === 'Urgent'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {lead.urgency}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{lead.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                View All Leads
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                Today's Schedule
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {job.time.split(' ')[0]}
                    </div>
                    <div className="flex-grow">
                      <div className="font-semibold text-gray-900">{job.customer}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        {job.service}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{job.location}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-4 px-4 py-2 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                View Full Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Job', icon: Calendar },
              { label: 'Manage Team', icon: Users },
              { label: 'View Reports', icon: BarChart3 },
              { label: 'Settings', icon: Settings },
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 rounded-lg border-2 border-gray-200 hover:border-current hover:bg-gray-50 transition-all flex flex-col items-center gap-2"
                style={{ '--hover-color': colors.primary } as React.CSSProperties}
              >
                <action.icon className="h-6 w-6" style={{ color: colors.primary }} />
                <span className="font-semibold text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Notice */}
        <div
          className="mt-8 rounded-xl p-6 text-white text-center"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-xl font-bold mb-2">Admin Dashboard Demo</h3>
          <p className="opacity-90">
            This is a preview of the admin interface. Full functionality includes job management,
            customer tracking, scheduling, invoicing, and detailed analytics.
          </p>
        </div>
      </main>
    </div>
  );
}
