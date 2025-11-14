'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Users, TrendingUp, DollarSign, Mail, Phone, Calendar, CheckCircle, Clock, Target } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('pipeline')

  const pipelineStages = [
    { name: 'New Leads', count: 45, value: '$225,000', color: colors.primary },
    { name: 'Qualified', count: 28, value: '$420,000', color: colors.secondary },
    { name: 'Proposal', count: 15, value: '$675,000', color: colors.accent },
    { name: 'Negotiation', count: 8, value: '$320,000', color: colors.success },
    { name: 'Closed Won', count: 12, value: '$540,000', color: colors.success },
  ]

  const leads = [
    { id: '1', name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '(555) 123-4567', value: '$50,000', stage: 'Qualified', lastContact: '2 days ago', priority: 'High' },
    { id: '2', name: 'Tech Innovations Inc', contact: 'Sarah Johnson', email: 'sarah@techinno.com', phone: '(555) 234-5678', value: '$75,000', stage: 'Proposal', lastContact: '1 day ago', priority: 'High' },
    { id: '3', name: 'Global Solutions Ltd', contact: 'Mike Chen', email: 'mike@global.com', phone: '(555) 345-6789', value: '$25,000', stage: 'New Leads', lastContact: '5 hours ago', priority: 'Medium' },
  ]

  const activities = [
    { type: 'email', contact: 'John Smith', company: 'Acme Corporation', action: 'Sent proposal email', time: '2 hours ago' },
    { type: 'call', contact: 'Sarah Johnson', company: 'Tech Innovations Inc', action: 'Follow-up call scheduled', time: '5 hours ago' },
    { type: 'meeting', contact: 'Mike Chen', company: 'Global Solutions Ltd', action: 'Discovery meeting completed', time: '1 day ago' },
  ]

  const tasks = [
    { id: '1', task: 'Follow up with Acme Corporation', due: 'Today', priority: 'High', completed: false },
    { id: '2', task: 'Send proposal to Tech Innovations', due: 'Tomorrow', priority: 'High', completed: false },
    { id: '3', task: 'Schedule demo with Global Solutions', due: 'Nov 18', priority: 'Medium', completed: true },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>CRM Dashboard</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Manage your customer relationships</p>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Add New Lead
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Total Leads', value: '108', change: '+12', color: colors.primary },
            { icon: TrendingUp, label: 'Conversion Rate', value: '23.5%', change: '+3.2%', color: colors.success },
            { icon: DollarSign, label: 'Pipeline Value', value: '$2.18M', change: '+15%', color: colors.accent },
            { icon: Target, label: 'Win Rate', value: '42%', change: '+5%', color: colors.secondary },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['pipeline', 'leads', 'activities', 'tasks'].map(tab => (
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
        {activeTab === 'pipeline' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Sales Pipeline</h2>
            <div className="grid grid-cols-5 gap-4">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: stage.color + '20' }}>
                    <h3 className="font-bold mb-2" style={{ color: colors.text }}>{stage.name}</h3>
                    <p className="text-2xl font-bold mb-1" style={{ color: stage.color }}>{stage.count}</p>
                    <p className="text-sm" style={{ color: colors.textLight }}>{stage.value}</p>
                  </div>
                  {index < 2 && leads.filter(l => l.stage === stage.name).map(lead => (
                    <div key={lead.id} className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow cursor-pointer" style={{ borderColor: colors.border, backgroundColor: 'white' }}>
                      <h4 className="font-semibold mb-1" style={{ color: colors.text }}>{lead.name}</h4>
                      <p className="text-sm mb-2" style={{ color: colors.textLight }}>{lead.contact}</p>
                      <p className="font-bold" style={{ color: colors.primary }}>{lead.value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>All Leads</h2>
            <div className="space-y-4">
              {leads.map(lead => (
                <div key={lead.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold" style={{ color: colors.text }}>{lead.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          lead.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lead.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm mb-1" style={{ color: colors.textLight }}>Contact: {lead.contact}</p>
                      <div className="flex items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>{lead.value}</p>
                      <p className="text-sm mb-2" style={{ color: colors.textLight }}>Stage: {lead.stage}</p>
                      <p className="text-xs" style={{ color: colors.textLight }}>Last contact: {lead.lastContact}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                      View Details
                    </button>
                    <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Recent Activities</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'email' ? 'bg-blue-100' :
                    activity.type === 'call' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'email' ? <Mail className="w-5 h-5 text-blue-600" /> :
                     activity.type === 'call' ? <Phone className="w-5 h-5 text-green-600" /> :
                     <Calendar className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: colors.text }}>{activity.action}</p>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {activity.contact} - {activity.company}
                    </p>
                  </div>
                  <span className="text-sm" style={{ color: colors.textLight }}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Tasks</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg border-2" style={{ borderColor: colors.border }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="w-5 h-5 rounded"
                  />
                  <div className="flex-1">
                    <p className={`font-semibold ${task.completed ? 'line-through opacity-60' : ''}`} style={{ color: colors.text }}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm flex items-center gap-1" style={{ color: colors.textLight }}>
                        <Clock className="w-4 h-4" />
                        Due: {task.due}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
