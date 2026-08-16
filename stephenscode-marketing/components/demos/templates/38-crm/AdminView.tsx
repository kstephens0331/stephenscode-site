'use client'

import { useEffect, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  BarChart3, Mail, Zap, FileText, Plus, X, Trash2, Send, CheckCircle,
  Play, Pause, Download, ArrowUp, ArrowDown, RotateCcw, Users, Copy,
} from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'
import {
  ADMIN_STORAGE_KEY, STAGES_STORAGE_KEY, CUSTOMER_STORAGE_KEY,
  AUTOMATION_ACTIONS, AUTOMATION_TRIGGERS, CAMPAIGN_AUDIENCES,
  DEFAULT_STAGES, RANGE_OPTIONS, SEED_ADMIN_STATE,
  buildReport, downloadCsv, inputClass, makeId, migrateLeadStages, percent, readAdminState,
  readCustomerState, readStages, reportToCsv, statusBadge, writeStored, clearStored,
  type CampaignStatus, type CrmAdminState, type CrmAutomation, type CrmCampaign,
  type CrmRep, type GeneratedReport, type RangeKey,
} from './crm-data'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

/* ---------- New Campaign Modal ---------- */

interface NewCampaignModalProps {
  colors: ColorPalette
  onClose: () => void
  onCreate: (campaign: Omit<CrmCampaign, 'id' | 'sends' | 'opens' | 'clicks'>) => void
}

function NewCampaignModal({ colors, onClose, onCreate }: NewCampaignModalProps) {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    audience: CAMPAIGN_AUDIENCES[0],
    trigger: AUTOMATION_TRIGGERS[0],
    status: 'Active' as CampaignStatus,
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onCreate({
      name: form.name.trim(),
      subject: form.subject.trim(),
      audience: form.audience,
      trigger: form.trigger,
      status: form.status,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>New Email Campaign</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="crm-campaign-name" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Campaign Name *</label>
            <input id="crm-campaign-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Spring Renewal Push" />
          </div>
          <div>
            <label htmlFor="crm-campaign-subject" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Email Subject *</label>
            <input id="crm-campaign-subject" type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Your renewal is coming up" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="crm-campaign-audience" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Audience</label>
              <select id="crm-campaign-audience" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={inputClass} style={{ borderColor: colors.border }}>
                {CAMPAIGN_AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="crm-campaign-trigger" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Send Trigger</label>
              <select id="crm-campaign-trigger" value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })} className={inputClass} style={{ borderColor: colors.border }}>
                {AUTOMATION_TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Start as</span>
            <div className="grid grid-cols-2 gap-3">
              {(['Active', 'Draft'] as CampaignStatus[]).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setForm({ ...form, status })}
                  className="p-3 rounded-lg border-2 font-semibold text-sm transition-colors"
                  style={{
                    borderColor: form.status === status ? colors.primary : colors.border,
                    color: form.status === status ? colors.primary : colors.textLight,
                    backgroundColor: form.status === status ? colors.primary + '10' : 'white',
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Campaign Detail Modal ---------- */

interface CampaignDetailModalProps {
  colors: ColorPalette
  campaign: CrmCampaign
  onClose: () => void
  onToggleStatus: () => void
  onDuplicate: () => void
  onDelete: () => void
  onSendTest: () => void
}

function CampaignDetailModal({ colors, campaign, onClose, onToggleStatus, onDuplicate, onDelete, onSendTest }: CampaignDetailModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const metrics = [
    { label: 'Total sends', value: campaign.sends.toLocaleString('en-US') },
    { label: 'Opens', value: `${campaign.opens.toLocaleString('en-US')} (${percent(campaign.opens, campaign.sends)})` },
    { label: 'Clicks', value: `${campaign.clicks.toLocaleString('en-US')} (${percent(campaign.clicks, campaign.sends)})` },
    { label: 'Click to open', value: percent(campaign.clicks, campaign.opens) },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{campaign.name}</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>Sends to: {campaign.audience}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(campaign.status)}`}>{campaign.status}</span>
            <span className="text-sm" style={{ color: colors.textLight }}>Trigger: {campaign.trigger}</span>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
            <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>Subject line</p>
            <p className="font-semibold" style={{ color: colors.text }}>{campaign.subject}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {metrics.map(metric => (
              <div key={metric.label} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>{metric.label}</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button onClick={onToggleStatus} className="py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{ backgroundColor: colors.primary }}>
              {campaign.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {campaign.status === 'Active' ? 'Pause' : 'Activate'}
            </button>
            <button onClick={onSendTest} className="py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
              <Send className="w-4 h-4" />
              Send Test
            </button>
            <button onClick={onDuplicate} className="py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          {confirmDelete ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-red-600">Delete this campaign?</span>
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
              Delete
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

/* ---------- New Automation Modal ---------- */

interface NewAutomationModalProps {
  colors: ColorPalette
  onClose: () => void
  onCreate: (trigger: string, action: string) => void
}

function NewAutomationModal({ colors, onClose, onCreate }: NewAutomationModalProps) {
  const [trigger, setTrigger] = useState(AUTOMATION_TRIGGERS[0])
  const [action, setAction] = useState(AUTOMATION_ACTIONS[0])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onCreate(trigger, action)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>New Automation Rule</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="crm-rule-trigger" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>When this happens</label>
            <select id="crm-rule-trigger" value={trigger} onChange={(e) => setTrigger(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
              {AUTOMATION_TRIGGERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="crm-rule-action" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Do this</label>
            <select id="crm-rule-action" value={action} onChange={(e) => setAction(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
              {AUTOMATION_ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="p-4 rounded-lg text-sm" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
            Preview: when <span className="font-semibold" style={{ color: colors.text }}>{trigger.toLowerCase()}</span>, the CRM will <span className="font-semibold" style={{ color: colors.text }}>{action.toLowerCase()}</span>.
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Save Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Report Modal ---------- */

interface ReportModalProps {
  colors: ColorPalette
  report: GeneratedReport
  range: RangeKey
  onChangeRange: (range: RangeKey) => void
  onClose: () => void
  onDownload: () => void
}

function ReportModal({ colors, report, range, onChangeRange, onClose, onDownload }: ReportModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[88vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{report.title}</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>{report.range} &middot; generated {report.generatedAt}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {RANGE_OPTIONS.map(option => (
              <button
                key={option.key}
                onClick={() => onChangeRange(option.key)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                style={{
                  borderColor: range === option.key ? colors.primary : colors.border,
                  color: range === option.key ? 'white' : colors.textLight,
                  backgroundColor: range === option.key ? colors.primary : 'white',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {report.summary.map(item => (
              <div key={item.label} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: colors.textLight }}>{item.label}</p>
                <p className="text-xl font-bold" style={{ color: colors.primary }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b" style={{ borderColor: colors.border }}>
                  {report.columns.map(column => (
                    <th key={column} className="text-left py-2 pr-4 font-semibold" style={{ color: colors.textLight }}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row, index) => (
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

          <p className="text-xs" style={{ color: colors.textLight }}>{report.note}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          <button onClick={onDownload} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Manage Stages Modal ---------- */

interface StagesModalProps {
  colors: ColorPalette
  stages: string[]
  onClose: () => void
  onSave: (stages: string[]) => void
}

function StagesModal({ colors, stages, onClose, onSave }: StagesModalProps) {
  const [draft, setDraft] = useState<string[]>(stages)
  const [newStage, setNewStage] = useState('')

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= draft.length) return
    const next = [...draft]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    setDraft(next)
  }

  const addStage = () => {
    const name = newStage.trim()
    if (!name || draft.includes(name)) return
    setDraft([...draft, name])
    setNewStage('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>Pipeline Stages</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>Rename, reorder, add, or remove stages</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3">
          {draft.map((stage, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 text-sm font-bold text-center" style={{ color: colors.textLight }}>{index + 1}</span>
              <label htmlFor={`crm-stage-${index}`} className="sr-only">Stage {index + 1} name</label>
              <input
                id={`crm-stage-${index}`}
                type="text"
                value={stage}
                onChange={(e) => setDraft(draft.map((s, i) => i === index ? e.target.value : s))}
                className={inputClass}
                style={{ borderColor: colors.border }}
              />
              <button onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${stage} up`} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                <ArrowUp className="w-4 h-4" />
              </button>
              <button onClick={() => move(index, 1)} disabled={index === draft.length - 1} aria-label={`Move ${stage} down`} className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button onClick={() => setDraft(draft.filter((_, i) => i !== index))} disabled={draft.length <= 1} aria-label={`Remove ${stage}`} className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2">
            <label htmlFor="crm-stage-new" className="sr-only">New stage name</label>
            <input
              id="crm-stage-new"
              type="text"
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addStage() } }}
              className={inputClass}
              style={{ borderColor: colors.border }}
              placeholder="Add a stage, e.g. Contract Sent"
            />
            <button onClick={addStage} className="px-4 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap" style={{ backgroundColor: colors.primary }}>
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <p className="text-xs pt-2" style={{ color: colors.textLight }}>
            Saving updates the sales dashboard pipeline immediately. Deals follow a stage you rename, and shift into the stage that takes its place if you remove one.
          </p>
        </div>

        <div className="flex gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          <button onClick={() => setDraft(DEFAULT_STAGES)} className="px-4 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
            Reset
          </button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
            Cancel
          </button>
          <button onClick={() => onSave(draft)} className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
            Save Stages
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Assignment Rules Modal ---------- */

interface RulesModalProps {
  colors: ColorPalette
  assignment: CrmAdminState['assignment']
  onClose: () => void
  onSave: (assignment: CrmAdminState['assignment']) => void
}

function RulesModal({ colors, assignment, onClose, onSave }: RulesModalProps) {
  const [draft, setDraft] = useState(assignment)
  const [repName, setRepName] = useState('')
  const [repTerritory, setRepTerritory] = useState('North')

  const addRep = () => {
    const name = repName.trim()
    if (!name) return
    const rep: CrmRep = { id: makeId('rep'), name, territory: repTerritory, active: true }
    setDraft({ ...draft, reps: [...draft.reps, rep] })
    setRepName('')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>Lead Assignment Rules</h3>
            <p className="text-sm" style={{ color: colors.textLight }}>Decide who gets each new lead</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <label htmlFor="crm-rules-mode" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Assignment method</label>
            <select
              id="crm-rules-mode"
              value={draft.mode}
              onChange={(e) => setDraft({ ...draft, mode: e.target.value as CrmAdminState['assignment']['mode'] })}
              className={inputClass}
              style={{ borderColor: colors.border }}
            >
              <option value="Round robin">Round robin</option>
              <option value="By territory">By territory</option>
              <option value="Manual claim">Manual claim</option>
            </select>
          </div>

          <div>
            <label htmlFor="crm-rules-cap" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Open leads per rep (cap)</label>
            <input
              id="crm-rules-cap"
              type="number"
              min={1}
              max={200}
              value={draft.capPerRep}
              onChange={(e) => setDraft({ ...draft, capPerRep: Math.max(1, parseInt(e.target.value, 10) || 1) })}
              className={inputClass}
              style={{ borderColor: colors.border }}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.notifyOnAssign}
              onChange={(e) => setDraft({ ...draft, notifyOnAssign: e.target.checked })}
              className="w-5 h-5 rounded cursor-pointer"
            />
            <span className="text-sm font-medium" style={{ color: colors.text }}>Email the rep as soon as a lead is assigned</span>
          </label>

          <div>
            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Sales reps in rotation</h4>
            <div className="space-y-2">
              {draft.reps.map(rep => (
                <div key={rep.id} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: colors.border }}>
                  <input
                    type="checkbox"
                    aria-label={`Include ${rep.name} in rotation`}
                    checked={rep.active}
                    onChange={() => setDraft({ ...draft, reps: draft.reps.map(r => r.id === rep.id ? { ...r, active: !r.active } : r) })}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{rep.name}</p>
                    <p className="text-xs" style={{ color: colors.textLight }}>{rep.territory} territory</p>
                  </div>
                  <button
                    onClick={() => setDraft({ ...draft, reps: draft.reps.filter(r => r.id !== rep.id) })}
                    aria-label={`Remove ${rep.name}`}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {draft.reps.length === 0 && (
                <p className="text-sm" style={{ color: colors.textLight }}>No reps yet. Add one below and new leads will route to them.</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <label htmlFor="crm-rules-rep-name" className="sr-only">Rep name</label>
              <input
                id="crm-rules-rep-name"
                type="text"
                value={repName}
                onChange={(e) => setRepName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRep() } }}
                className={inputClass}
                style={{ borderColor: colors.border }}
                placeholder="Rep name"
              />
              <label htmlFor="crm-rules-rep-territory" className="sr-only">Territory</label>
              <select id="crm-rules-rep-territory" value={repTerritory} onChange={(e) => setRepTerritory(e.target.value)} className={inputClass} style={{ borderColor: colors.border }}>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
              <button onClick={addRep} className="px-4 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap" style={{ backgroundColor: colors.primary }}>
                <Plus className="w-4 h-4" />
                Add Rep
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t" style={{ borderColor: colors.border }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
            Cancel
          </button>
          <button onClick={() => onSave(draft)} className="flex-1 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
            Save Rules
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Admin View ---------- */

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('automation')
  const [admin, setAdmin] = useState<CrmAdminState>(SEED_ADMIN_STATE)
  const [stages, setStages] = useState<string[]>(DEFAULT_STAGES)
  const [hydrated, setHydrated] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [detailCampaignId, setDetailCampaignId] = useState<string | null>(null)
  const [showNewAutomation, setShowNewAutomation] = useState(false)
  const [showStages, setShowStages] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const [range, setRange] = useState<RangeKey>('30d')
  const [report, setReport] = useState<GeneratedReport | null>(null)

  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadError, setLeadError] = useState(false)

  useEffect(() => {
    setAdmin(readAdminState())
    setStages(readStages())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeStored(ADMIN_STORAGE_KEY, admin)
  }, [admin, hydrated])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const detailCampaign = admin.campaigns.find(c => c.id === detailCampaignId) || null

  /* ----- Campaign actions ----- */

  const createCampaign = (data: Omit<CrmCampaign, 'id' | 'sends' | 'opens' | 'clicks'>) => {
    const campaign: CrmCampaign = { ...data, id: makeId('camp'), sends: 0, opens: 0, clicks: 0 }
    setAdmin(prev => ({ ...prev, campaigns: [campaign, ...prev.campaigns] }))
    setShowNewCampaign(false)
    setToast(`${campaign.name} created`)
  }

  const toggleCampaign = (id: string) => {
    const current = admin.campaigns.find(c => c.id === id)
    if (!current) return
    const next: CampaignStatus = current.status === 'Active' ? 'Paused' : 'Active'
    setAdmin(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(c => c.id === id ? { ...c, status: next } : c),
    }))
    setToast(next === 'Active' ? `${current.name} activated` : `${current.name} paused`)
  }

  const duplicateCampaign = (id: string) => {
    const source = admin.campaigns.find(c => c.id === id)
    if (!source) return
    const copy: CrmCampaign = { ...source, id: makeId('camp'), name: `${source.name} (copy)`, status: 'Draft', sends: 0, opens: 0, clicks: 0 }
    setAdmin(prev => ({ ...prev, campaigns: [copy, ...prev.campaigns] }))
    setDetailCampaignId(copy.id)
    setToast('Campaign duplicated as a draft')
  }

  const deleteCampaign = (id: string) => {
    const source = admin.campaigns.find(c => c.id === id)
    setAdmin(prev => ({ ...prev, campaigns: prev.campaigns.filter(c => c.id !== id) }))
    setDetailCampaignId(null)
    setToast(source ? `${source.name} deleted` : 'Campaign deleted')
  }

  const sendTest = (id: string) => {
    const source = admin.campaigns.find(c => c.id === id)
    if (!source) return
    setAdmin(prev => ({
      ...prev,
      campaigns: prev.campaigns.map(c => c.id === id ? { ...c, sends: c.sends + 1, opens: c.opens + 1 } : c),
    }))
    setToast(`Test send queued for ${source.name}`)
  }

  /* ----- Automation actions ----- */

  const toggleAutomation = (id: string) => {
    setAdmin(prev => ({
      ...prev,
      automations: prev.automations.map(a => a.id === id ? { ...a, active: !a.active } : a),
    }))
    const rule = admin.automations.find(a => a.id === id)
    if (rule) setToast(rule.active ? 'Rule turned off' : 'Rule turned on')
  }

  const createAutomation = (trigger: string, action: string) => {
    const rule: CrmAutomation = { id: makeId('auto'), trigger, action, active: true }
    setAdmin(prev => ({ ...prev, automations: [...prev.automations, rule] }))
    setShowNewAutomation(false)
    setToast('Automation rule added')
  }

  const deleteAutomation = (id: string) => {
    setAdmin(prev => ({ ...prev, automations: prev.automations.filter(a => a.id !== id) }))
    setToast('Automation rule removed')
  }

  /* ----- Reports ----- */

  const generateReport = (id: string, nextRange: RangeKey = range) => {
    const customerState = readCustomerState()
    setRange(nextRange)
    setReport(buildReport(id, customerState, stages, nextRange))
  }

  const downloadReport = () => {
    if (!report) return
    downloadCsv(`${report.id}-report.csv`, reportToCsv(report))
    setToast('CSV downloaded')
  }

  /* ----- Settings ----- */

  const saveStages = (next: string[]) => {
    const clean = next.map(s => s.trim()).filter(Boolean)
    const unique = Array.from(new Set(clean))
    if (unique.length === 0) {
      setToast('Keep at least one stage')
      return
    }
    const previous = stages
    setStages(unique)
    writeStored(STAGES_STORAGE_KEY, unique)

    const customerState = readCustomerState()
    const moved = customerState.leads.filter(l => !unique.includes(l.stage))
    if (moved.length > 0) {
      writeStored(CUSTOMER_STORAGE_KEY, {
        ...customerState,
        leads: migrateLeadStages(customerState.leads, previous, unique),
      })
    }

    setShowStages(false)
    setToast(moved.length > 0 ? `Stages saved, ${moved.length} deal(s) remapped` : 'Pipeline stages saved')
  }

  const saveRules = (assignment: CrmAdminState['assignment']) => {
    setAdmin(prev => ({ ...prev, assignment }))
    setShowRules(false)
    setToast('Assignment rules saved')
  }

  const toggleNotification = (key: keyof CrmAdminState['notifications']) => {
    setAdmin(prev => ({ ...prev, notifications: { ...prev.notifications, [key]: !prev.notifications[key] } }))
  }

  const resetDemo = () => {
    clearStored([ADMIN_STORAGE_KEY, STAGES_STORAGE_KEY, CUSTOMER_STORAGE_KEY])
    setAdmin(SEED_ADMIN_STATE)
    setStages(DEFAULT_STAGES)
    setConfirmReset(false)
    setToast('Demo data reset to defaults')
  }

  /* ----- Lead capture ----- */

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

  const activeCampaigns = admin.campaigns.filter(c => c.status === 'Active').length
  const totalSends = admin.campaigns.reduce((sum, c) => sum + c.sends, 0)
  const activeRules = admin.automations.filter(a => a.active).length

  const reportCards = [
    { id: 'pipeline', name: 'Pipeline Report', icon: BarChart3, description: 'Stage by stage deal counts, values, and average deal size' },
    { id: 'activity', name: 'Activity Report', icon: Mail, description: 'Emails, calls, meetings, and notes logged by the team' },
    { id: 'conversion', name: 'Conversion Report', icon: FileText, description: 'Stage to stage conversion rates and revenue won' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>CRM Administration</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Configure automation and reporting</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase" style={{ color: colors.textLight }}>Active campaigns</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>{activeCampaigns}</p>
              </div>
              <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase" style={{ color: colors.textLight }}>Total sends</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>{totalSends.toLocaleString('en-US')}</p>
              </div>
              <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase" style={{ color: colors.textLight }}>Live rules</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>{activeRules}</p>
              </div>
            </div>
          </div>
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
                <button onClick={() => setShowNewCampaign(true)} className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
                  <Plus className="w-5 h-5" />
                  New Campaign
                </button>
              </div>
              {admin.campaigns.length === 0 ? (
                <p style={{ color: colors.textLight }}>No campaigns yet. Click New Campaign to build your first sequence.</p>
              ) : (
                <div className="space-y-4">
                  {admin.campaigns.map(campaign => (
                    <div key={campaign.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                      <div className="flex items-center justify-between mb-2">
                        <button onClick={() => setDetailCampaignId(campaign.id)} className="font-semibold text-left hover:underline" style={{ color: colors.text }}>
                          {campaign.name}
                        </button>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                        Total sends: {campaign.sends.toLocaleString('en-US')} &middot; Open rate: {percent(campaign.opens, campaign.sends)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setDetailCampaignId(campaign.id)} className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                          View Stats
                        </button>
                        <button onClick={() => toggleCampaign(campaign.id)} className="px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-1.5" style={{ backgroundColor: colors.primary }}>
                          {campaign.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {campaign.status === 'Active' ? 'Pause' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Task Automation</h2>
                <button onClick={() => setShowNewAutomation(true)} className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ borderColor: colors.border, color: colors.primary }}>
                  <Plus className="w-5 h-5" />
                  New Rule
                </button>
              </div>
              {admin.automations.length === 0 ? (
                <p style={{ color: colors.textLight }}>No rules yet. Add one and it will run against every new lead.</p>
              ) : (
                <div className="space-y-4">
                  {admin.automations.map(automation => (
                    <div key={automation.id} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="flex items-center justify-between mb-2">
                        <Zap className="w-5 h-5" style={{ color: automation.active ? colors.accent : colors.textLight }} />
                        <div className="flex items-center gap-2">
                          <label htmlFor={`crm-automation-toggle-${automation.id}`} className="relative inline-flex items-center cursor-pointer">
                            <input
                              id={`crm-automation-toggle-${automation.id}`}
                              type="checkbox"
                              aria-label={`Toggle automation: ${automation.trigger}`}
                              checked={automation.active}
                              onChange={() => toggleAutomation(automation.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                              style={{ backgroundColor: automation.active ? colors.primary : colors.border }}
                            />
                          </label>
                          <button
                            onClick={() => deleteAutomation(automation.id)}
                            aria-label={`Remove rule: ${automation.trigger}`}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: colors.text }}>When: {automation.trigger}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>Then: {automation.action}</p>
                      <p className="text-xs mt-2 font-semibold" style={{ color: automation.active ? colors.success : colors.textLight }}>
                        {automation.active ? 'Running' : 'Turned off'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Sales Reports</h2>
              <div className="flex flex-wrap gap-2">
                {RANGE_OPTIONS.map(option => (
                  <button
                    key={option.key}
                    onClick={() => { setRange(option.key); if (report) generateReport(report.id, option.key) }}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                    style={{
                      borderColor: range === option.key ? colors.primary : colors.border,
                      color: range === option.key ? 'white' : colors.textLight,
                      backgroundColor: range === option.key ? colors.primary : 'white',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reportCards.map(card => {
                const Icon = card.icon
                return (
                  <div key={card.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow flex flex-col" style={{ borderColor: colors.border }}>
                    <Icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{card.name}</h3>
                    <p className="text-sm mb-4 flex-1" style={{ color: colors.textLight }}>{card.description}</p>
                    <button
                      onClick={() => generateReport(card.id)}
                      className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                      style={{ borderColor: colors.border, color: colors.primary }}
                    >
                      Generate Report
                    </button>
                  </div>
                )
              })}
            </div>
            <p className="text-sm mt-6" style={{ color: colors.textLight }}>
              Reports run against the same pipeline you see in the sales dashboard, so anything you add or move there shows up here.
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>CRM Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: colors.text }}>Default Pipeline Stages</h3>
                  <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                    Current order: {stages.join(' > ')}
                  </p>
                  <button onClick={() => setShowStages(true)} className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                    Manage Stages
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: colors.text }}>Lead Assignment Rules</h3>
                  <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                    {admin.assignment.mode} across {admin.assignment.reps.filter(r => r.active).length} active rep(s), capped at {admin.assignment.capPerRep} open leads each
                  </p>
                  <button onClick={() => setShowRules(true)} className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                    Configure Rules
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Notifications</h2>
              <p className="text-sm mb-5" style={{ color: colors.textLight }}>Choose what the team hears about. Changes save as you toggle.</p>
              <div className="space-y-3">
                {([
                  { key: 'dealAlerts' as const, label: 'Alert me when a deal moves to Closed Won' },
                  { key: 'dailyDigest' as const, label: 'Send a daily pipeline digest at 8:00 AM' },
                  { key: 'taskReminders' as const, label: 'Remind reps about overdue tasks' },
                ]).map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                    <span className="text-sm font-medium pr-4" style={{ color: colors.text }}>{item.label}</span>
                    <label htmlFor={`crm-notify-${item.key}`} className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        id={`crm-notify-${item.key}`}
                        type="checkbox"
                        aria-label={item.label}
                        checked={admin.notifications[item.key]}
                        onChange={() => toggleNotification(item.key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{ backgroundColor: admin.notifications[item.key] ? colors.primary : colors.border }}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Demo Data</h2>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Every change you make in this demo is stored in your own browser. Reset puts the sample pipeline, campaigns, and stages back the way they started.
              </p>
              {confirmReset ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-red-600">Reset all demo data?</span>
                  <button onClick={resetDemo} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                    Yes, Reset
                  </button>
                  <button onClick={() => setConfirmReset(false)} className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmReset(true)} className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ borderColor: colors.border, color: colors.primary }}>
                  <RotateCcw className="w-4 h-4" />
                  Reset Demo Data
                </button>
              )}
            </div>
          </div>
        )}

        {/* Lead-capture CTA */}
        <div className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 text-white" style={{ backgroundColor: colors.primary }}>
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Want this admin console for your team?
            </h2>
            <p className="opacity-90">{demo.name} is a working demo. StephensCode builds the same automation and reporting into your own site -- tell us where to reach you.</p>
          </div>
          {leadSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request Sent!</h3>
              <p className="mb-6" style={{ color: colors.textLight }}>
                Thanks for reaching out. We will follow up within one business day to talk through your CRM build.
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
                  <label htmlFor="crm-admin-cta-name" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Your Name *</label>
                  <input id="crm-admin-cta-name" type="text" required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="crm-admin-cta-email" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Email *</label>
                  <input id="crm-admin-cta-email" type="email" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="jane@business.com" />
                </div>
                <div>
                  <label htmlFor="crm-admin-cta-phone" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Phone</label>
                  <input id="crm-admin-cta-phone" type="tel" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} className={inputClass} style={{ borderColor: colors.border }} placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="crm-admin-cta-message" className="block text-sm font-semibold mb-1" style={{ color: colors.text }}>Which parts matter most to you?</label>
                <textarea id="crm-admin-cta-message" rows={3} value={leadForm.message} onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })} className={`${inputClass} resize-none`} style={{ borderColor: colors.border }} placeholder="Automated follow-up emails, assignment rules for three reps, weekly pipeline report..." />
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
      {showNewCampaign && (
        <NewCampaignModal colors={colors} onClose={() => setShowNewCampaign(false)} onCreate={createCampaign} />
      )}
      {detailCampaign && (
        <CampaignDetailModal
          colors={colors}
          campaign={detailCampaign}
          onClose={() => setDetailCampaignId(null)}
          onToggleStatus={() => toggleCampaign(detailCampaign.id)}
          onDuplicate={() => duplicateCampaign(detailCampaign.id)}
          onDelete={() => deleteCampaign(detailCampaign.id)}
          onSendTest={() => sendTest(detailCampaign.id)}
        />
      )}
      {showNewAutomation && (
        <NewAutomationModal colors={colors} onClose={() => setShowNewAutomation(false)} onCreate={createAutomation} />
      )}
      {report && (
        <ReportModal
          colors={colors}
          report={report}
          range={range}
          onChangeRange={(next) => generateReport(report.id, next)}
          onClose={() => setReport(null)}
          onDownload={downloadReport}
        />
      )}
      {showStages && (
        <StagesModal colors={colors} stages={stages} onClose={() => setShowStages(false)} onSave={saveStages} />
      )}
      {showRules && (
        <RulesModal colors={colors} assignment={admin.assignment} onClose={() => setShowRules(false)} onSave={saveRules} />
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
