'use client'

import { useEffect, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Users, TrendingUp, DollarSign, Mail, Phone, Calendar, CheckCircle, Clock, Target, X, Send, Trash2, Plus, FileText, Search } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'
import {
  CUSTOMER_STORAGE_KEY, DEFAULT_STAGES, SEED_STATE,
  buildStageStats, formatMillions, formatMoney, inputClass, makeId, percent,
  priorityBadge, readCustomerState, readStages, stageColor, winRateParts, wonStageOf, writeStored,
  type CrmActivity, type CrmLead, type CrmState, type Priority, type StageStat,
} from './crm-data'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

type StatMetric = 'leads' | 'conversion' | 'pipeline' | 'win'
type ActivityFilter = 'all' | CrmActivity['type']
type TaskFilter = 'all' | 'open' | 'done'
type LeadSort = 'value-desc' | 'value-asc' | 'priority' | 'name'

const PRIORITY_ORDER: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 }

/* ---------- Add Lead Modal ---------- */

interface AddLeadModalProps {
  colors: ColorPalette
  stages: string[]
  onClose: () => void
  onAdd: (lead: Omit<CrmLead, 'id' | 'lastContact'>) => void
}

function AddLeadModal({ colors, stages, onClose, onAdd }: AddLeadModalProps) {
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', value: '', stage: stages[0] || DEFAULT_STAGES[0], priority: 'Medium' as Priority })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd({
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      value: Math.max(0, parseInt(form.value, 10) || 0),
      stage: form.stage,
      priority: form.priority,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>Add New Lead</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="crm-lead-company" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Company Name *</label>
            <input id="crm-lead-company" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Northwind Traders" />
          </div>
          <div>
            <label htmlFor="crm-lead-contact" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Contact Name *</label>
            <input id="crm-lead-contact" type="text" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Jane Doe" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="crm-lead-email" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Email *</label>
              <input id="crm-lead-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="jane@company.com" />
            </div>
            <div>
              <label htmlFor="crm-lead-phone" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Phone</label>
              <input id="crm-lead-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="(555) 000-0000" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="crm-lead-value" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Deal Value ($) *</label>
              <input id="crm-lead-value" type="number" min="0" required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="25000" />
            </div>
            <div>
              <label htmlFor="crm-lead-stage" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Stage</label>
              <select id="crm-lead-stage" value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className={inputClass} style={{ borderColor: colors.border }}>
                {stages.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="crm-lead-priority" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Priority</label>
              <select id="crm-lead-priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })} className={inputClass} style={{ borderColor: colors.border }}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Lead Detail Modal ---------- */

interface LeadDetailModalProps {
  colors: ColorPalette
  stages: string[]
  lead: CrmLead
  activities: CrmActivity[]
  onClose: () => void
  onChangeStage: (stage: string) => void
  onChangePriority: (priority: Priority) => void
  onContact: () => void
  onDelete: () => void
}

function LeadDetailModal({ colors, stages, lead, activities, onClose, onChangeStage, onChangePriority, onContact, onDelete }: LeadDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const stageOptions = stages.includes(lead.stage) ? stages : [...stages, lead.stage]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{lead.name}</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>Lead details</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>Contact</p>
              <p className="font-semibold" style={{ color: colors.text }}>{lead.contact}</p>
              <a href={`mailto:${lead.email}`} className="text-sm mt-1 flex items-center gap-1 hover:underline" style={{ color: colors.textLight }}><Mail className="w-4 h-4" />{lead.email}</a>
              {lead.phone && <a href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`} className="text-sm mt-1 flex items-center gap-1 hover:underline" style={{ color: colors.textLight }}><Phone className="w-4 h-4" />{lead.phone}</a>}
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>Deal</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>{formatMoney(lead.value)}</p>
              <p className="text-sm mt-1" style={{ color: colors.textLight }}>Last contact: {lead.lastContact}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="crm-detail-stage" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Pipeline Stage</label>
              <select id="crm-detail-stage" value={lead.stage} onChange={(e) => onChangeStage(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
                {stageOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="crm-detail-priority" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Priority</label>
              <select id="crm-detail-priority" value={lead.priority} onChange={(e) => onChangePriority(e.target.value as Priority)} className={inputClass} style={{ borderColor: colors.border }}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Activity Timeline</h4>
            {activities.length === 0 ? (
              <p className="text-sm" style={{ color: colors.textLight }}>No activity logged yet for this lead. Use Log Interaction below to add the first one.</p>
            ) : (
              <div className="space-y-3">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
                      {activity.type === 'email' ? <Mail className="w-4 h-4 text-blue-600" /> :
                       activity.type === 'call' ? <Phone className="w-4 h-4 text-green-600" /> :
                       activity.type === 'meeting' ? <Calendar className="w-4 h-4 text-purple-600" /> :
                       <FileText className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: colors.text }}>{activity.action}</p>
                      <p className="text-xs" style={{ color: colors.textLight }}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={onContact} className="w-full py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" style={{ borderColor: colors.border, color: colors.primary }}>
            <Send className="w-4 h-4" />
            Log Interaction
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          {confirmDelete ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-red-600">Delete this lead?</span>
              <button onClick={onDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                Yes, Delete
              </button>
              <button onClick={() => setConfirmDelete(false)} className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                Keep
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Lead
            </button>
          )}
          <button onClick={onClose} className="px-5 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Contact Lead Modal ---------- */

interface ContactLeadModalProps {
  colors: ColorPalette
  lead: CrmLead
  onClose: () => void
  onLog: (method: CrmActivity['type'], note: string) => void
}

function ContactLeadModal({ colors, lead, onClose, onLog }: ContactLeadModalProps) {
  const [method, setMethod] = useState<CrmActivity['type']>('email')
  const [note, setNote] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onLog(method, note.trim())
  }

  const methods: { key: CrmActivity['type']; label: string; icon: typeof Mail }[] = [
    { key: 'email', label: 'Send Email', icon: Mail },
    { key: 'call', label: 'Log Call', icon: Phone },
    { key: 'meeting', label: 'Log Meeting', icon: Calendar },
    { key: 'note', label: 'Add Note', icon: FileText },
  ]

  const noteLabel = method === 'email' ? 'Message' : method === 'call' ? 'Call Notes' : method === 'meeting' ? 'Meeting Notes' : 'Note'
  const submitLabel = method === 'email' ? 'Send Email' : method === 'call' ? 'Save Call Log' : method === 'meeting' ? 'Save Meeting' : 'Save Note'

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>Contact {lead.contact}</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>{lead.name}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {methods.map(option => {
              const Icon = option.icon
              const selected = method === option.key
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setMethod(option.key)}
                  className="p-3 rounded-lg border-2 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  style={{
                    borderColor: selected ? colors.primary : colors.border,
                    color: selected ? colors.primary : colors.textLight,
                    backgroundColor: selected ? colors.primary + '10' : 'white',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </button>
              )
            })}
          </div>
          <div>
            <label htmlFor="crm-contact-note" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>
              {noteLabel} *
            </label>
            <textarea
              id="crm-contact-note"
              required
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`${inputClass} resize-none`}
              style={{ borderColor: colors.border }}
              placeholder={method === 'email' ? `Write your email to ${lead.contact}...` : 'Summarize what happened...'}
            />
          </div>
          <p className="text-xs" style={{ color: colors.textLight }}>
            This interaction will be saved to the activity timeline and the lead&apos;s last-contact date will update.
          </p>
          <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{ backgroundColor: colors.primary }}>
            <Send className="w-4 h-4" />
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------- Stat Detail Modal ---------- */

interface StatDetailModalProps {
  colors: ColorPalette
  metric: StatMetric
  stageStats: StageStat[]
  state: CrmState
  onClose: () => void
  onGoToTab: (tab: string) => void
}

function StatDetailModal({ colors, metric, stageStats, state, onClose, onGoToTab }: StatDetailModalProps) {
  const totalCount = stageStats.reduce((sum, s) => sum + s.count, 0)
  const totalValue = stageStats.reduce((sum, s) => sum + s.value, 0)
  const won = wonStageOf(stageStats)

  let title = ''
  let subtitle = ''
  let columns: string[] = []
  let rows: string[][] = []
  let summary: { label: string; value: string }[] = []
  let actionLabel = 'View pipeline'
  let actionTab = 'pipeline'

  if (metric === 'leads') {
    title = 'Total Leads'
    subtitle = 'Every deal currently sitting in your pipeline'
    summary = [
      { label: 'All leads', value: String(totalCount) },
      { label: 'Stages tracked', value: String(stageStats.length) },
      { label: 'Your added leads', value: String(state.leads.length) },
      { label: 'High priority', value: String(state.leads.filter(l => l.priority === 'High').length) },
    ]
    columns = ['Stage', 'Leads', 'Share', 'Value']
    rows = stageStats.map(s => [s.name, String(s.count), percent(s.count, totalCount), formatMoney(s.value)])
  } else if (metric === 'conversion') {
    title = 'Conversion Rate'
    subtitle = 'How deals move from one stage to the next'
    const first = stageStats[0]?.count || 0
    summary = [
      { label: 'Lead to won', value: percent(won?.count || 0, first) },
      { label: 'Entered pipeline', value: String(first) },
      { label: 'Closed won', value: String(won?.count || 0) },
      { label: 'Still open', value: String(Math.max(0, totalCount - (won?.count || 0))) },
    ]
    columns = ['Stage transition', 'Entered', 'Advanced', 'Conversion']
    rows = stageStats.slice(0, -1).map((s, i) => {
      const next = stageStats[i + 1]
      return [`${s.name} to ${next.name}`, String(s.count), String(next.count), percent(next.count, s.count)]
    })
    actionLabel = 'View all leads'
    actionTab = 'leads'
  } else if (metric === 'pipeline') {
    title = 'Pipeline Value'
    subtitle = 'Dollar value by stage, plus a weighted forecast'
    const weights = stageStats.map((_, i) => Math.min(1, 0.2 + (i * 0.8) / Math.max(1, stageStats.length - 1)))
    const forecast = stageStats.reduce((sum, s, i) => sum + s.value * weights[i], 0)
    summary = [
      { label: 'Total pipeline', value: formatMoney(totalValue) },
      { label: 'Weighted forecast', value: formatMoney(forecast) },
      { label: 'Average deal', value: formatMoney(totalCount > 0 ? totalValue / totalCount : 0) },
      { label: 'Largest stage', value: stageStats.slice().sort((a, b) => b.value - a.value)[0]?.name || '--' },
    ]
    columns = ['Stage', 'Value', 'Share', 'Weight', 'Weighted']
    rows = stageStats.map((s, i) => [
      s.name,
      formatMoney(s.value),
      percent(s.value, totalValue),
      Math.round(weights[i] * 100) + '%',
      formatMoney(s.value * weights[i]),
    ])
  } else {
    title = 'Win Rate'
    subtitle = 'Closed business against everything still in play'
    const priorities: Priority[] = ['High', 'Medium', 'Low']
    const parts = winRateParts(stageStats)
    summary = [
      { label: 'Win rate', value: percent(parts.won, parts.considered) },
      { label: 'Deals won', value: String(parts.won) },
      { label: 'Revenue won', value: formatMoney(won?.value || 0) },
      { label: 'Deals in play', value: String(Math.max(0, parts.considered - parts.won)) },
    ]
    columns = ['Priority', 'Your leads', 'Value', 'Share of your leads']
    rows = priorities.map(p => {
      const group = state.leads.filter(l => l.priority === p)
      return [p, String(group.length), formatMoney(group.reduce((s, l) => s + l.value, 0)), percent(group.length, state.leads.length)]
    })
    actionLabel = 'View all leads'
    actionTab = 'leads'
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{title}</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>{subtitle}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summary.map(item => (
              <div key={item.label} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>{item.label}</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b" style={{ borderColor: colors.border }}>
                  {columns.map(column => (
                    <th key={column} className="text-left py-2 pr-4 font-semibold" style={{ color: colors.textLight }}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-b last:border-0" style={{ borderColor: colors.border }}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-3 pr-4" style={{ color: cellIndex === 0 ? colors.text : colors.textLight }}>
                        {cellIndex === 0 ? <span className="font-semibold">{cell}</span> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs" style={{ color: colors.textLight }}>
            These numbers recalculate every time you add, move, or delete a deal in this demo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          <button onClick={() => { onGoToTab(actionTab); onClose() }} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
            {actionLabel}
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Customer View ---------- */

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [crm, setCrm] = useState<CrmState>(SEED_STATE)
  const [stages, setStages] = useState<string[]>(DEFAULT_STAGES)
  const [hydrated, setHydrated] = useState(false)
  const [showAddLead, setShowAddLead] = useState(false)
  const [detailLeadId, setDetailLeadId] = useState<string | null>(null)
  const [contactLeadId, setContactLeadId] = useState<string | null>(null)
  const [statMetric, setStatMetric] = useState<StatMetric | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  // Leads tab filters
  const [leadSearch, setLeadSearch] = useState('')
  const [leadStageFilter, setLeadStageFilter] = useState('all')
  const [leadPriorityFilter, setLeadPriorityFilter] = useState('all')
  const [leadSort, setLeadSort] = useState<LeadSort>('value-desc')

  // Activity + task filters
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all')
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all')

  // Add-task form
  const [newTask, setNewTask] = useState('')
  const [newTaskDue, setNewTaskDue] = useState('Today')
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('Medium')

  // Lead-capture CTA form
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadError, setLeadError] = useState(false)

  useEffect(() => {
    setCrm(readCustomerState())
    setStages(readStages())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeStored(CUSTOMER_STORAGE_KEY, crm)
  }, [crm, hydrated])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const stageStats = buildStageStats(crm, stages)
  const totalLeads = stageStats.reduce((sum, s) => sum + s.count, 0)
  const pipelineValue = stageStats.reduce((sum, s) => sum + s.value, 0)
  const wonStage = wonStageOf(stageStats)
  const winParts = winRateParts(stageStats)

  const detailLead = crm.leads.find(l => l.id === detailLeadId) || null
  const contactLead = crm.leads.find(l => l.id === contactLeadId) || null

  const addActivity = (lead: { contact: string; name: string }, type: CrmActivity['type'], action: string): CrmActivity => ({
    id: makeId('act'),
    type,
    contact: lead.contact,
    company: lead.name,
    action,
    time: 'Just now',
  })

  const addLead = (data: Omit<CrmLead, 'id' | 'lastContact'>) => {
    const lead: CrmLead = { ...data, id: makeId('lead'), lastContact: 'Just now' }
    setCrm(prev => ({
      ...prev,
      leads: [lead, ...prev.leads],
      activities: [addActivity(lead, 'note', `New lead created in ${lead.stage}`), ...prev.activities],
    }))
    setShowAddLead(false)
    setToast(`${lead.name} added to pipeline`)
  }

  const changeLeadStage = (id: string, stage: string) => {
    setCrm(prev => {
      const lead = prev.leads.find(l => l.id === id)
      if (!lead || lead.stage === stage) return prev
      return {
        ...prev,
        leads: prev.leads.map(l => l.id === id ? { ...l, stage, lastContact: 'Just now' } : l),
        activities: [addActivity(lead, 'note', `Moved to ${stage}`), ...prev.activities],
      }
    })
    setToast(`Lead moved to ${stage}`)
  }

  const changeLeadPriority = (id: string, priority: Priority) => {
    setCrm(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, priority } : l),
    }))
    setToast(`Priority set to ${priority}`)
  }

  const deleteLead = (id: string) => {
    const lead = crm.leads.find(l => l.id === id)
    setCrm(prev => ({
      ...prev,
      leads: prev.leads.filter(l => l.id !== id),
      activities: lead ? [addActivity(lead, 'note', 'Lead removed from pipeline'), ...prev.activities] : prev.activities,
    }))
    setDetailLeadId(null)
    if (lead) setToast(`${lead.name} removed`)
  }

  const logContact = (id: string, method: CrmActivity['type'], note: string) => {
    const lead = crm.leads.find(l => l.id === id)
    if (!lead) return
    const summary = note.length > 60 ? note.slice(0, 57) + '...' : note
    const prefix = method === 'email' ? 'Sent email' : method === 'call' ? 'Logged call' : method === 'meeting' ? 'Logged meeting' : 'Note'
    setCrm(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, lastContact: 'Just now' } : l),
      activities: [addActivity(lead, method, `${prefix}: ${summary}`), ...prev.activities],
    }))
    setContactLeadId(null)
    setToast(`${prefix} saved for ${lead.contact}`)
  }

  const toggleTask = (id: string) => {
    setCrm(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t),
    }))
  }

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault()
    const text = newTask.trim()
    if (!text) return
    setCrm(prev => ({
      ...prev,
      tasks: [{ id: makeId('task'), task: text, due: newTaskDue, priority: newTaskPriority, completed: false }, ...prev.tasks],
    }))
    setNewTask('')
    setToast('Task added')
  }

  const removeTask = (id: string) => {
    setCrm(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }))
    setToast('Task removed')
  }

  const handleLeadCapture = async (e: FormEvent) => {
    e.preventDefault()
    setLeadError(false)
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Customer Relationship Manager',
          demoPackage: 'Feature: Advanced CRM ($210)',
          demoSlug: 'crm-system-showcase',
          clientName: leadForm.name,
          clientPhone: leadForm.phone,
          clientEmail: leadForm.email,
          service: 'Advanced CRM Feature',
          preferredDate: '',
          preferredTime: '',
          notes: leadForm.message,
        }),
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'crm-system-showcase' })
        trackConversion('leadForm')
        setLeadSubmitted(true)
      } else {
        setLeadError(true)
      }
    } catch {
      setLeadError(true)
    }
  }

  /* ----- Derived lists ----- */

  const filtersActive = leadSearch.trim() !== '' || leadStageFilter !== 'all' || leadPriorityFilter !== 'all'

  const query = leadSearch.trim().toLowerCase()
  const filteredLeads = crm.leads
    .filter(l => leadStageFilter === 'all' || l.stage === leadStageFilter)
    .filter(l => leadPriorityFilter === 'all' || l.priority === leadPriorityFilter)
    .filter(l => !query || l.name.toLowerCase().includes(query) || l.contact.toLowerCase().includes(query) || l.email.toLowerCase().includes(query))
    .slice()
    .sort((a, b) => {
      if (leadSort === 'value-asc') return a.value - b.value
      if (leadSort === 'name') return a.name.localeCompare(b.name)
      if (leadSort === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.value - a.value
      return b.value - a.value
    })

  const activityFilters: { key: ActivityFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'email', label: 'Email' },
    { key: 'call', label: 'Calls' },
    { key: 'meeting', label: 'Meetings' },
    { key: 'note', label: 'Notes' },
  ]

  const filteredActivities = activityFilter === 'all' ? crm.activities : crm.activities.filter(a => a.type === activityFilter)

  const taskFilters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: crm.tasks.length },
    { key: 'open', label: 'Open', count: crm.tasks.filter(t => !t.completed).length },
    { key: 'done', label: 'Completed', count: crm.tasks.filter(t => t.completed).length },
  ]

  const filteredTasks = taskFilter === 'all' ? crm.tasks : crm.tasks.filter(t => taskFilter === 'open' ? !t.completed : t.completed)

  const statCards = [
    { key: 'leads' as StatMetric, icon: Users, label: 'Total Leads', value: String(totalLeads), change: '+12', color: colors.primary },
    { key: 'conversion' as StatMetric, icon: TrendingUp, label: 'Conversion Rate', value: percent(wonStage?.count || 0, stageStats[0]?.count || 0), change: '+3.2%', color: colors.success },
    { key: 'pipeline' as StatMetric, icon: DollarSign, label: 'Pipeline Value', value: formatMillions(pipelineValue), change: '+15%', color: colors.accent },
    { key: 'win' as StatMetric, icon: Target, label: 'Win Rate', value: percent(winParts.won, winParts.considered), change: '+5%', color: colors.secondary },
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
            <button onClick={() => setShowAddLead(true)} className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Add New Lead
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map(stat => {
            const Icon = stat.icon
            return (
              <button
                key={stat.key}
                onClick={() => setStatMetric(stat.key)}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-xs mt-2 font-semibold" style={{ color: colors.primary }}>View breakdown</p>
              </button>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Sales Pipeline</h2>
              <p className="text-sm" style={{ color: colors.textLight }}>Click a stage to filter your leads, or click a deal card to open it</p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-[900px]">
                {stageStats.map((stage, index) => (
                  <div key={stage.name} className="space-y-3 flex-1 min-w-[170px]">
                    <button
                      onClick={() => { setLeadStageFilter(stage.name); setActiveTab('leads') }}
                      className="w-full text-left p-4 rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: stageColor(colors, index) + '20' }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: colors.text }}>{stage.name}</h3>
                      <p className="text-2xl font-bold mb-1" style={{ color: stageColor(colors, index) }}>{stage.count}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{formatMoney(stage.value)}</p>
                    </button>
                    {stage.leads.map(lead => (
                      <button
                        key={lead.id}
                        onClick={() => setDetailLeadId(lead.id)}
                        className="w-full text-left p-4 rounded-lg border-2 hover:shadow-md transition-shadow cursor-pointer"
                        style={{ borderColor: colors.border, backgroundColor: 'white' }}
                      >
                        <h4 className="font-semibold mb-1" style={{ color: colors.text }}>{lead.name}</h4>
                        <p className="text-sm mb-2" style={{ color: colors.textLight }}>{lead.contact}</p>
                        <p className="font-bold" style={{ color: colors.primary }}>{formatMoney(lead.value)}</p>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>All Leads</h2>
              <button onClick={() => setShowAddLead(true)} className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
                <Plus className="w-4 h-4" />
                Add Lead
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="relative">
                <label htmlFor="crm-lead-search" className="sr-only">Search leads</label>
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
                <input
                  id="crm-lead-search"
                  type="search"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className={`${inputClass} pl-9`}
                  style={{ borderColor: colors.border }}
                  placeholder="Search company, contact, email"
                />
              </div>
              <div>
                <label htmlFor="crm-filter-stage" className="sr-only">Filter by stage</label>
                <select id="crm-filter-stage" value={leadStageFilter} onChange={(e) => setLeadStageFilter(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
                  <option value="all">All stages</option>
                  {stageStats.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="crm-filter-priority" className="sr-only">Filter by priority</label>
                <select id="crm-filter-priority" value={leadPriorityFilter} onChange={(e) => setLeadPriorityFilter(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
                  <option value="all">All priorities</option>
                  <option value="High">High priority</option>
                  <option value="Medium">Medium priority</option>
                  <option value="Low">Low priority</option>
                </select>
              </div>
              <div>
                <label htmlFor="crm-sort" className="sr-only">Sort leads</label>
                <select id="crm-sort" value={leadSort} onChange={(e) => setLeadSort(e.target.value as LeadSort)} className={inputClass} style={{ borderColor: colors.border }}>
                  <option value="value-desc">Highest value first</option>
                  <option value="value-asc">Lowest value first</option>
                  <option value="priority">Priority first</option>
                  <option value="name">Company A to Z</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm" style={{ color: colors.textLight }}>
                Showing {filteredLeads.length} of {crm.leads.length} lead{crm.leads.length === 1 ? '' : 's'}
              </p>
              {filtersActive && (
                <button
                  onClick={() => { setLeadSearch(''); setLeadStageFilter('all'); setLeadPriorityFilter('all') }}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  Clear filters
                </button>
              )}
            </div>

            {crm.leads.length === 0 ? (
              <p style={{ color: colors.textLight }}>No leads yet. Click Add Lead to create your first one.</p>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 rounded-xl text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="font-semibold mb-2" style={{ color: colors.text }}>No leads match those filters</p>
                <button
                  onClick={() => { setLeadSearch(''); setLeadStageFilter('all'); setLeadPriorityFilter('all') }}
                  className="font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map(lead => (
                  <div key={lead.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold" style={{ color: colors.text }}>{lead.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityBadge(lead.priority)}`}>
                            {lead.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm mb-1" style={{ color: colors.textLight }}>Contact: {lead.contact}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:underline">
                            <Mail className="w-4 h-4" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1 hover:underline">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="md:text-right">
                        <p className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>{formatMoney(lead.value)}</p>
                        <p className="text-sm mb-2" style={{ color: colors.textLight }}>Stage: {lead.stage}</p>
                        <p className="text-xs" style={{ color: colors.textLight }}>Last contact: {lead.lastContact}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setDetailLeadId(lead.id)} className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                        View Details
                      </button>
                      <button onClick={() => setContactLeadId(lead.id)} className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                        Contact
                      </button>
                      <div>
                        <label htmlFor={`crm-quick-stage-${lead.id}`} className="sr-only">Move {lead.name} to another stage</label>
                        <select
                          id={`crm-quick-stage-${lead.id}`}
                          title={`Move ${lead.name} to another stage`}
                          value={lead.stage}
                          onChange={(e) => changeLeadStage(lead.id, e.target.value)}
                          className="px-4 py-2 rounded-lg border font-medium bg-white"
                          style={{ borderColor: colors.border, color: colors.text }}
                        >
                          {(stages.includes(lead.stage) ? stages : [...stages, lead.stage]).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Recent Activities</h2>
              <div className="flex flex-wrap gap-2">
                {activityFilters.map(filter => {
                  const count = filter.key === 'all' ? crm.activities.length : crm.activities.filter(a => a.type === filter.key).length
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setActivityFilter(filter.key)}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                      style={{
                        borderColor: activityFilter === filter.key ? colors.primary : colors.border,
                        color: activityFilter === filter.key ? 'white' : colors.textLight,
                        backgroundColor: activityFilter === filter.key ? colors.primary : 'white',
                      }}
                    >
                      {filter.label} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
            {filteredActivities.length === 0 ? (
              <div className="p-8 rounded-xl text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="font-semibold mb-2" style={{ color: colors.text }}>Nothing logged in this category yet</p>
                <p className="text-sm" style={{ color: colors.textLight }}>Open a lead and use Contact to log an email, call, meeting, or note.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'email' ? 'bg-blue-100' :
                      activity.type === 'call' ? 'bg-green-100' :
                      activity.type === 'meeting' ? 'bg-purple-100' :
                      'bg-amber-100'
                    }`}>
                      {activity.type === 'email' ? <Mail className="w-5 h-5 text-blue-600" /> :
                       activity.type === 'call' ? <Phone className="w-5 h-5 text-green-600" /> :
                       activity.type === 'meeting' ? <Calendar className="w-5 h-5 text-purple-600" /> :
                       <FileText className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1" style={{ color: colors.text }}>{activity.action}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>
                        {activity.contact}, {activity.company}
                      </p>
                    </div>
                    <span className="text-sm whitespace-nowrap" style={{ color: colors.textLight }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Tasks</h2>
              <div className="flex flex-wrap gap-2">
                {taskFilters.map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setTaskFilter(filter.key)}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                    style={{
                      borderColor: taskFilter === filter.key ? colors.primary : colors.border,
                      color: taskFilter === filter.key ? 'white' : colors.textLight,
                      backgroundColor: taskFilter === filter.key ? colors.primary : 'white',
                    }}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="flex-1">
                <label htmlFor="crm-new-task" className="sr-only">New task description</label>
                <input
                  id="crm-new-task"
                  type="text"
                  required
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className={inputClass}
                  style={{ borderColor: colors.border }}
                  placeholder="Add a task, e.g. Call Acme about renewal"
                />
              </div>
              <div>
                <label htmlFor="crm-new-task-due" className="sr-only">Due date</label>
                <select id="crm-new-task-due" value={newTaskDue} onChange={(e) => setNewTaskDue(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Week</option>
                  <option>Next Week</option>
                </select>
              </div>
              <div>
                <label htmlFor="crm-new-task-priority" className="sr-only">Priority</label>
                <select id="crm-new-task-priority" value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as Priority)} className={inputClass} style={{ borderColor: colors.border }}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{ backgroundColor: colors.primary }}>
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </form>
            {crm.tasks.length === 0 ? (
              <p style={{ color: colors.textLight }}>No tasks yet. Add one above to get started.</p>
            ) : filteredTasks.length === 0 ? (
              <div className="p-8 rounded-xl text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="font-semibold mb-2" style={{ color: colors.text }}>
                  {taskFilter === 'open' ? 'Every task is done. Nice work.' : 'Nothing completed yet.'}
                </p>
                <button onClick={() => setTaskFilter('all')} className="font-semibold hover:underline" style={{ color: colors.primary }}>
                  Show all tasks
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg border-2" style={{ borderColor: colors.border }}>
                    <input
                      type="checkbox"
                      aria-label={`Mark ${task.task} as complete`}
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded cursor-pointer"
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
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityBadge(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      aria-label={`Remove task: ${task.task}`}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lead-capture CTA */}
        <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 text-white" style={{ backgroundColor: colors.primary }}>
            <h2 className="text-2xl font-bold mb-1">Want a CRM like this for your business?</h2>
            <p className="opacity-90">{demo.name} is a working demo. StephensCode can build a custom CRM into your website -- tell us where to reach you.</p>
          </div>
          {leadSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request Sent!</h3>
              <p className="mb-6" style={{ color: colors.textLight }}>
                Thanks for reaching out. We&apos;ll follow up within one business day to talk through your CRM build.
              </p>
              <button
                onClick={() => { setLeadSubmitted(false); setLeadForm({ name: '', email: '', phone: '', message: '' }) }}
                className="font-semibold hover:underline"
                style={{ color: colors.primary }}
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleLeadCapture} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="crm-cta-name" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Your Name *</label>
                  <input id="crm-cta-name" type="text" required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="crm-cta-email" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Email *</label>
                  <input id="crm-cta-email" type="email" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="jane@business.com" />
                </div>
                <div>
                  <label htmlFor="crm-cta-phone" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Phone</label>
                  <input id="crm-cta-phone" type="tel" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="crm-cta-message" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>What would your CRM need to do?</label>
                <textarea id="crm-cta-message" rows={3} value={leadForm.message} onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })} className={`${inputClass} resize-none`} style={{ borderColor: colors.border }} placeholder="Track leads for my sales team, automate follow-up emails..." />
              </div>
              {leadError && (
                <p className="mb-4 text-sm font-semibold text-red-600">
                  That request did not go through. Check your connection and send it again, or email info@stephenscode.dev.
                </p>
              )}
              <button type="submit" className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{ backgroundColor: colors.primary }}>
                <Send className="w-4 h-4" />
                Request a Quote
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddLead && (
        <AddLeadModal colors={colors} stages={stages} onClose={() => setShowAddLead(false)} onAdd={addLead} />
      )}
      {detailLead && (
        <LeadDetailModal
          colors={colors}
          stages={stages}
          lead={detailLead}
          activities={crm.activities.filter(a => a.company === detailLead.name)}
          onClose={() => setDetailLeadId(null)}
          onChangeStage={(stage) => changeLeadStage(detailLead.id, stage)}
          onChangePriority={(priority) => changeLeadPriority(detailLead.id, priority)}
          onContact={() => { setContactLeadId(detailLead.id); setDetailLeadId(null) }}
          onDelete={() => deleteLead(detailLead.id)}
        />
      )}
      {contactLead && (
        <ContactLeadModal
          colors={colors}
          lead={contactLead}
          onClose={() => setContactLeadId(null)}
          onLog={(method, note) => logContact(contactLead.id, method, note)}
        />
      )}
      {statMetric && (
        <StatDetailModal
          colors={colors}
          metric={statMetric}
          stageStats={stageStats}
          state={crm}
          onClose={() => setStatMetric(null)}
          onGoToTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] px-5 py-3 rounded-lg shadow-lg text-white flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{toast}</span>
        </div>
      )}
    </div>
  )
}
