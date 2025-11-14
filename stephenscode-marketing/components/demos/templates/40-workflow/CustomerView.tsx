'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Zap, Play, Pause, Mail, Calendar, FileText, Plus, Settings } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('workflows')

  const workflows = [
    { id: '1', name: 'New Customer Onboarding', trigger: 'Customer Created', actions: 5, status: 'Active', runs: 234 },
    { id: '2', name: 'Invoice Payment Reminder', trigger: 'Invoice Overdue', actions: 3, status: 'Active', runs: 156 },
    { id: '3', name: 'Project Completion Notification', trigger: 'Project Status Changed', actions: 4, status: 'Paused', runs: 89 },
    { id: '4', name: 'Lead Nurture Campaign', trigger: 'Lead Created', actions: 7, status: 'Active', runs: 445 },
  ]

  const templates = [
    { name: 'Email Marketing Campaign', description: 'Automated email sequence for marketing', icon: Mail },
    { name: 'Task Assignment', description: 'Auto-assign tasks based on criteria', icon: FileText },
    { name: 'Meeting Scheduler', description: 'Schedule meetings automatically', icon: Calendar },
    { name: 'Custom Trigger', description: 'Build from scratch', icon: Zap },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Workflow Automation</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Build and manage automated workflows</p>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
              <Plus className="w-5 h-5" />
              Create Workflow
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Workflows', value: '12', color: colors.primary },
            { label: 'Total Runs', value: '2,456', color: colors.secondary },
            { label: 'Success Rate', value: '98.5%', color: colors.success },
            { label: 'Time Saved', value: '156h', color: colors.accent },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['workflows', 'templates', 'builder'].map(tab => (
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
        {activeTab === 'workflows' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Your Workflows</h2>
            <div className="space-y-4">
              {workflows.map(workflow => (
                <div key={workflow.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold" style={{ color: colors.text }}>{workflow.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          workflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                        Trigger: {workflow.trigger} • {workflow.actions} actions
                      </p>
                      <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {workflow.runs} successful runs
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={workflow.status === 'Active' ? 'Pause' : 'Resume'}>
                        {workflow.status === 'Active' ? (
                          <Pause className="w-5 h-5" style={{ color: colors.warning }} />
                        ) : (
                          <Play className="w-5 h-5" style={{ color: colors.success }} />
                        )}
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Settings">
                        <Settings className="w-5 h-5" style={{ color: colors.text }} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                      View Details
                    </button>
                    <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      Edit Workflow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Workflow Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template, index) => {
                const Icon = template.icon
                return (
                  <div key={index} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{template.name}</h3>
                    <p className="text-sm mb-4" style={{ color: colors.textLight }}>{template.description}</p>
                    <button className="w-full py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      Use Template
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Visual Workflow Builder</h2>

            <div className="space-y-6">
              {/* Trigger */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6" style={{ color: colors.accent }} />
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>Trigger</h3>
                </div>
                <select className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2" style={{ borderColor: colors.border }}>
                  <option>Select a trigger...</option>
                  <option>When a new contact is created</option>
                  <option>When a deal is won</option>
                  <option>When an email is received</option>
                  <option>On a schedule (daily, weekly, etc.)</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <div className="w-0.5 h-12" style={{ backgroundColor: colors.border }} />
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6" style={{ color: colors.secondary }} />
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>Actions</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Mail, label: 'Send Email', color: colors.primary },
                    { icon: FileText, label: 'Create Task', color: colors.secondary },
                    { icon: Calendar, label: 'Schedule Meeting', color: colors.accent },
                  ].map((action, index) => {
                    const Icon = action.icon
                    return (
                      <div key={index} className="p-4 bg-white rounded-lg border-2 flex items-center gap-3" style={{ borderColor: colors.border }}>
                        <Icon className="w-5 h-5" style={{ color: action.color }} />
                        <span className="font-semibold" style={{ color: colors.text }}>{action.label}</span>
                      </div>
                    )
                  })}
                </div>
                <button className="w-full mt-4 py-3 rounded-lg border-2 border-dashed font-medium hover:bg-white transition-colors flex items-center justify-center gap-2" style={{ borderColor: colors.border, color: colors.primary }}>
                  <Plus className="w-5 h-5" />
                  Add Action
                </button>
              </div>

              <div className="flex gap-3 pt-6">
                <button className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                  Cancel
                </button>
                <button className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                  Save Workflow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
