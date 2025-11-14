'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { BarChart3, Mail, Settings, Zap, FileText, Plus } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('automation')

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>CRM Administration</h1>
          <p className="mt-2" style={{ color: colors.textLight }}>Configure automation and reporting</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['automation', 'reports', 'settings'].map(tab => (
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
        {activeTab === 'automation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Email Automation</h2>
                <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                  <Plus className="w-5 h-5 inline mr-2" />
                  New Campaign
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Welcome Email Sequence', status: 'Active', sends: 1234 },
                  { name: 'Follow-up Campaign', status: 'Active', sends: 892 },
                  { name: 'Re-engagement Series', status: 'Paused', sends: 456 },
                ].map((campaign, index) => (
                  <div key={index} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold" style={{ color: colors.text }}>{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.textLight }}>Total sends: {campaign.sends}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Task Automation</h2>
              <div className="space-y-4">
                {[
                  { trigger: 'New lead created', action: 'Assign to sales rep', active: true },
                  { trigger: 'Lead stage changed', action: 'Send notification', active: true },
                  { trigger: 'No activity for 7 days', action: 'Create follow-up task', active: true },
                ].map((automation, index) => (
                  <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-5 h-5" style={{ color: colors.accent }} />
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={automation.active} readOnly className="sr-only peer" />
                        <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                          style={{ backgroundColor: automation.active ? colors.primary : colors.border }}
                        />
                      </label>
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.text }}>When: {automation.trigger}</p>
                    <p className="text-sm" style={{ color: colors.textLight }}>Then: {automation.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Sales Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Pipeline Report', icon: BarChart3, description: 'View sales pipeline metrics' },
                { name: 'Activity Report', icon: Mail, description: 'Track team activities' },
                { name: 'Conversion Report', icon: FileText, description: 'Analyze conversion rates' },
              ].map((report, index) => {
                const Icon = report.icon
                return (
                  <div key={index} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <Icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{report.name}</h3>
                    <p className="text-sm mb-4" style={{ color: colors.textLight }}>{report.description}</p>
                    <button className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                      Generate Report
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>CRM Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Default Pipeline Stages</label>
                <p className="text-sm mb-3" style={{ color: colors.textLight }}>Configure the stages for your sales pipeline</p>
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                  Manage Stages
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Lead Assignment Rules</label>
                <p className="text-sm mb-3" style={{ color: colors.textLight }}>Set up automatic lead distribution</p>
                <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                  Configure Rules
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
