import React from 'react';
import { Scale, Users, FileText, Award, DollarSign, TrendingUp, Calendar, BookOpen } from 'lucide-react';

interface AdminViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function AdminView({
  primaryColor = '#1a1a2e',
  secondaryColor = '#16213e',
  accentColor = '#c9a227',
}: AdminViewProps) {
  const stats = [
    { label: 'Active Cases', value: '247', icon: FileText, change: '+12%' },
    { label: 'New Consultations', value: '43', icon: Users, change: '+8%' },
    { label: 'Cases Won This Month', value: '18', icon: Award, change: '+15%' },
    { label: 'Revenue This Month', value: '$485K', icon: DollarSign, change: '+22%' },
  ];

  const recentCases = [
    { id: 'PI-2024-1847', client: 'Johnson, M.', type: 'Personal Injury', attorney: 'Robert Justice', status: 'Active', value: '$850K' },
    { id: 'CR-2024-0923', client: 'Chen, L.', type: 'Criminal Defense', attorney: 'Sarah Mitchell', status: 'Trial', value: 'N/A' },
    { id: 'FL-2024-1556', client: 'Rodriguez, E.', type: 'Family Law', attorney: 'Emily Rodriguez', status: 'Mediation', value: 'N/A' },
    { id: 'BL-2024-1203', client: 'TechStart Inc.', type: 'Business Law', attorney: 'Michael Chen', status: 'Active', value: '$125K' },
    { id: 'PI-2024-1799', client: 'Williams, T.', type: 'Personal Injury', attorney: 'Robert Justice', status: 'Settlement', value: '$425K' },
  ];

  const upcomingEvents = [
    { date: 'Nov 15', time: '10:00 AM', event: 'Trial: State v. Chen', attorney: 'Sarah Mitchell' },
    { date: 'Nov 15', time: '2:00 PM', event: 'Mediation: Rodriguez Divorce', attorney: 'Emily Rodriguez' },
    { date: 'Nov 16', time: '9:30 AM', event: 'Client Meeting: TechStart Inc.', attorney: 'Michael Chen' },
    { date: 'Nov 16', time: '3:00 PM', event: 'Deposition: Johnson v. ABC Corp', attorney: 'Robert Justice' },
    { date: 'Nov 17', time: '11:00 AM', event: 'Immigration Hearing: Park Family', attorney: 'Jennifer Park' },
  ];

  const practiceAreaMetrics = [
    { area: 'Personal Injury', active: 78, winRate: '96%', revenue: '$2.4M' },
    { area: 'Criminal Defense', active: 45, winRate: '92%', revenue: '$850K' },
    { area: 'Family Law', active: 52, winRate: '88%', revenue: '$680K' },
    { area: 'Business Law', active: 31, winRate: '94%', revenue: '$1.2M' },
    { area: 'Real Estate', active: 23, winRate: '98%', revenue: '$560K' },
    { area: 'Immigration', active: 18, winRate: '89%', revenue: '$320K' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ backgroundColor: secondaryColor, color: '#ffffff' }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <Scale className="w-7 h-7" style={{ color: secondaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Justice & Associates</h1>
                <p className="text-sm" style={{ color: accentColor }}>Admin Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Welcome back,</p>
              <p className="font-bold">Managing Partner</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6" style={{ color: accentColor }} />
                  <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                    Recent Cases
                  </h2>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: `${accentColor}20`, color: primaryColor }}
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: `${accentColor}40` }}>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Case ID
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Client
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Type
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Attorney
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Status
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCases.map((case_, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 text-sm font-mono" style={{ color: accentColor }}>
                          {case_.id}
                        </td>
                        <td className="py-3 px-2 text-sm">{case_.client}</td>
                        <td className="py-3 px-2 text-sm">{case_.type}</td>
                        <td className="py-3 px-2 text-sm">{case_.attorney}</td>
                        <td className="py-3 px-2">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: case_.status === 'Active' ? '#3b82f620' :
                                              case_.status === 'Trial' ? '#ef444420' :
                                              case_.status === 'Settlement' ? '#22c55e20' : '#f59e0b20',
                              color: case_.status === 'Active' ? '#3b82f6' :
                                     case_.status === 'Trial' ? '#ef4444' :
                                     case_.status === 'Settlement' ? '#22c55e' : '#f59e0b',
                            }}
                          >
                            {case_.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm font-bold">{case_.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practice Area Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                  Practice Area Performance
                </h2>
              </div>

              <div className="space-y-4">
                {practiceAreaMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: primaryColor }}>{metric.area}</h3>
                      <p className="text-sm text-gray-600">{metric.active} active cases</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-1">
                        <span className="text-gray-600">Win Rate:</span>
                        <span className="font-bold ml-2" style={{ color: accentColor }}>{metric.winRate}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Revenue YTD:</span>
                        <span className="font-bold ml-2" style={{ color: primaryColor }}>{metric.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Upcoming Events
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="text-center flex-shrink-0">
                        <div className="text-xs font-bold" style={{ color: accentColor }}>
                          {event.date.split(' ')[0]}
                        </div>
                        <div className="text-xl font-bold" style={{ color: primaryColor }}>
                          {event.date.split(' ')[1]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: primaryColor }}>
                          {event.event}
                        </p>
                        <p className="text-xs text-gray-600">{event.attorney}</p>
                        <p className="text-xs" style={{ color: accentColor }}>{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  className="w-full py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: secondaryColor }}
                >
                  New Case Intake
                </button>
                <button
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  Schedule Consultation
                </button>
                <button
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  Generate Report
                </button>
                <button
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  View Calendar
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-medium" style={{ color: primaryColor }}>Settlement reached</p>
                  <p className="text-xs text-gray-600">Johnson v. ABC Corp - 2 hours ago</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-medium" style={{ color: primaryColor }}>New consultation booked</p>
                  <p className="text-xs text-gray-600">Personal Injury - 4 hours ago</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-medium" style={{ color: primaryColor }}>Document filed</p>
                  <p className="text-xs text-gray-600">Motion to Dismiss - 5 hours ago</p>
                </div>
                <div>
                  <p className="font-medium" style={{ color: primaryColor }}>Court date set</p>
                  <p className="text-xs text-gray-600">Chen trial - 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
