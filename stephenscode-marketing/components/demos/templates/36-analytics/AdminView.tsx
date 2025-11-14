'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { BarChart3, TrendingUp, Users, DollarSign, Download, Settings, Plus, Eye } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const customReports = [
    { id: '1', name: 'Monthly Sales Report', type: 'Sales', lastRun: '2 hours ago', status: 'Ready' },
    { id: '2', name: 'Customer Behavior Analysis', type: 'Customers', lastRun: '1 day ago', status: 'Ready' },
    { id: '3', name: 'Product Performance', type: 'Products', lastRun: '3 hours ago', status: 'Processing' },
    { id: '4', name: 'Marketing ROI', type: 'Marketing', lastRun: '5 hours ago', status: 'Ready' },
  ]

  const dashboardWidgets = [
    { name: 'Revenue Chart', type: 'Chart', enabled: true },
    { name: 'Top Products', type: 'Table', enabled: true },
    { name: 'Traffic Sources', type: 'Pie Chart', enabled: true },
    { name: 'Conversion Funnel', type: 'Funnel', enabled: false },
    { name: 'Customer Lifetime Value', type: 'Metric', enabled: true },
    { name: 'Churn Rate', type: 'Metric', enabled: false },
  ]

  const exportFormats = ['PDF', 'Excel', 'CSV', 'JSON']

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Analytics Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Configure reports and dashboards</p>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              <Plus className="w-5 h-5" />
              New Report
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['overview', 'reports', 'widgets', 'export'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                  activeTab === tab ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab ? colors.primary : 'transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Reports', value: '12', icon: BarChart3, color: colors.primary },
                { label: 'Data Points Tracked', value: '48', icon: Eye, color: colors.secondary },
                { label: 'Custom Dashboards', value: '5', icon: Settings, color: colors.accent },
                { label: 'Exports This Month', value: '127', icon: Download, color: colors.success },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                    <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'Monthly Sales Report generated', time: '2 hours ago', user: 'System' },
                  { action: 'New dashboard created: Q4 Performance', time: '5 hours ago', user: 'Admin User' },
                  { action: 'Customer Behavior Analysis exported to PDF', time: '1 day ago', user: 'Marketing Team' },
                  { action: 'Data source updated: Google Analytics', time: '1 day ago', user: 'System' },
                  { action: 'Custom metric added: Customer LTV', time: '2 days ago', user: 'Admin User' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.primary }} />
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: colors.text }}>{activity.action}</p>
                      <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                        {activity.time} by {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Custom Reports</h2>
              <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                Create Template
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customReports.map(report => (
                <div key={report.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: colors.text }}>{report.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{report.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: colors.textLight }}>Last Run:</span>
                      <span className="font-medium" style={{ color: colors.text }}>{report.lastRun}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                      Configure
                    </button>
                    <button className="flex-1 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      Run Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>Create Custom Report</h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Build custom reports with your choice of metrics, dimensions, and filters.
              </p>
              <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                Start Building
              </button>
            </div>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Dashboard Widgets</h2>
              <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                Add Widget
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardWidgets.map((widget, index) => (
                <div key={index} className="border rounded-xl p-6" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: colors.text }}>{widget.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{widget.type}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={widget.enabled} readOnly className="sr-only peer" />
                      <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          backgroundColor: widget.enabled ? colors.primary : colors.border
                        }}
                      />
                    </label>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 rounded-lg border font-medium text-sm hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <h3 className="font-bold mb-2" style={{ color: colors.text }}>Custom Widget Builder</h3>
              <p className="text-sm" style={{ color: colors.textLight }}>
                Create custom visualizations and metrics tailored to your business needs.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Export Options</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Select Report</label>
                  <select className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2" style={{ borderColor: colors.border }}>
                    {customReports.map(report => (
                      <option key={report.id}>{report.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Export Format</label>
                  <div className="grid grid-cols-2 gap-3">
                    {exportFormats.map(format => (
                      <button
                        key={format}
                        className="py-3 rounded-lg border-2 font-medium hover:shadow-md transition-all"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Date Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.border }}
                    />
                    <input
                      type="date"
                      className="px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>

                <button className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Scheduled Exports</h2>

              <div className="space-y-4">
                {[
                  { report: 'Monthly Sales Report', frequency: 'Monthly', format: 'PDF', nextRun: 'Dec 1, 2024' },
                  { report: 'Weekly Performance', frequency: 'Weekly', format: 'Excel', nextRun: 'Nov 18, 2024' },
                  { report: 'Daily Metrics', frequency: 'Daily', format: 'CSV', nextRun: 'Nov 14, 2024' },
                ].map((schedule, index) => (
                  <div key={index} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold mb-1" style={{ color: colors.text }}>{schedule.report}</h3>
                        <p className="text-sm" style={{ color: colors.textLight }}>
                          {schedule.frequency} - {schedule.format}
                        </p>
                      </div>
                      <button className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
                        Edit
                      </button>
                    </div>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      Next run: {schedule.nextRun}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                Schedule New Export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
