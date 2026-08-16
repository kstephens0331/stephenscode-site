import type { ColorPalette } from '@/lib/demo-colors'

/* ---------- Shared types ---------- */

export type Priority = 'High' | 'Medium' | 'Low'

export interface CrmLead {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  value: number
  stage: string
  lastContact: string
  priority: Priority
}

export interface CrmActivity {
  id: string
  type: 'email' | 'call' | 'meeting' | 'note'
  contact: string
  company: string
  action: string
  time: string
}

export interface CrmTask {
  id: string
  task: string
  due: string
  priority: Priority
  completed: boolean
}

export interface CrmState {
  leads: CrmLead[]
  activities: CrmActivity[]
  tasks: CrmTask[]
}

export type CampaignStatus = 'Active' | 'Paused' | 'Draft'

export interface CrmCampaign {
  id: string
  name: string
  status: CampaignStatus
  audience: string
  subject: string
  trigger: string
  sends: number
  opens: number
  clicks: number
}

export interface CrmAutomation {
  id: string
  trigger: string
  action: string
  active: boolean
}

export interface CrmRep {
  id: string
  name: string
  territory: string
  active: boolean
}

export interface CrmAssignment {
  mode: 'Round robin' | 'By territory' | 'Manual claim'
  reps: CrmRep[]
  notifyOnAssign: boolean
  capPerRep: number
}

export interface CrmNotifications {
  dealAlerts: boolean
  dailyDigest: boolean
  taskReminders: boolean
}

export interface CrmAdminState {
  campaigns: CrmCampaign[]
  automations: CrmAutomation[]
  assignment: CrmAssignment
  notifications: CrmNotifications
}

/* ---------- Storage ---------- */

export const CUSTOMER_STORAGE_KEY = 'demo-crm-customer-v1'
export const ADMIN_STORAGE_KEY = 'demo-crm-admin-v1'
export const STAGES_STORAGE_KEY = 'demo-crm-stages-v1'

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as T
    return parsed ?? fallback
  } catch {
    // Corrupt or unavailable storage -- fall back to seed data
    return fallback
  }
}

export function writeStored(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode) -- state still works in-memory
  }
}

export function clearStored(keys: string[]): void {
  if (typeof window === 'undefined') return
  try {
    keys.forEach(key => window.localStorage.removeItem(key))
  } catch {
    // Storage unavailable -- nothing to clear
  }
}

export const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

/* ---------- Pipeline stages ---------- */

export const DEFAULT_STAGES = ['New Leads', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won']

export const STAGE_BASELINE: Record<string, { count: number; value: number }> = {
  'New Leads': { count: 45, value: 225000 },
  Qualified: { count: 28, value: 420000 },
  Proposal: { count: 15, value: 675000 },
  Negotiation: { count: 8, value: 320000 },
  'Closed Won': { count: 12, value: 540000 },
}

export function readStages(): string[] {
  const stored = readStored<string[]>(STAGES_STORAGE_KEY, DEFAULT_STAGES)
  if (!Array.isArray(stored) || stored.length === 0) return DEFAULT_STAGES
  const clean = stored.filter(s => typeof s === 'string' && s.trim().length > 0)
  return clean.length > 0 ? clean : DEFAULT_STAGES
}

export function stageColor(colors: ColorPalette, index: number): string {
  const wheel = [colors.primary, colors.secondary, colors.accent, colors.success, colors.primaryLight, colors.warning]
  return wheel[index % wheel.length]
}

/* ---------- Seed data ---------- */

export const SEED_LEADS: CrmLead[] = [
  { id: 'lead-1', name: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', phone: '(555) 123-4567', value: 50000, stage: 'Qualified', lastContact: '2 days ago', priority: 'High' },
  { id: 'lead-2', name: 'Tech Innovations Inc', contact: 'Sarah Johnson', email: 'sarah@techinno.com', phone: '(555) 234-5678', value: 75000, stage: 'Proposal', lastContact: '1 day ago', priority: 'High' },
  { id: 'lead-3', name: 'Global Solutions Ltd', contact: 'Mike Chen', email: 'mike@global.com', phone: '(555) 345-6789', value: 25000, stage: 'New Leads', lastContact: '5 hours ago', priority: 'Medium' },
]

export const SEED_ACTIVITIES: CrmActivity[] = [
  { id: 'act-1', type: 'email', contact: 'John Smith', company: 'Acme Corporation', action: 'Sent proposal email', time: '2 hours ago' },
  { id: 'act-2', type: 'call', contact: 'Sarah Johnson', company: 'Tech Innovations Inc', action: 'Follow-up call scheduled', time: '5 hours ago' },
  { id: 'act-3', type: 'meeting', contact: 'Mike Chen', company: 'Global Solutions Ltd', action: 'Discovery meeting completed', time: '1 day ago' },
]

export const SEED_TASKS: CrmTask[] = [
  { id: 'task-1', task: 'Follow up with Acme Corporation', due: 'Today', priority: 'High', completed: false },
  { id: 'task-2', task: 'Send proposal to Tech Innovations', due: 'Tomorrow', priority: 'High', completed: false },
  { id: 'task-3', task: 'Schedule demo with Global Solutions', due: 'Nov 18', priority: 'Medium', completed: true },
]

export const SEED_STATE: CrmState = {
  leads: SEED_LEADS,
  activities: SEED_ACTIVITIES,
  tasks: SEED_TASKS,
}

export const SEED_ADMIN_STATE: CrmAdminState = {
  campaigns: [
    { id: 'camp-1', name: 'Welcome Email Sequence', status: 'Active', audience: 'New leads', subject: 'Welcome aboard -- here is what happens next', trigger: 'Lead created', sends: 1234, opens: 742, clicks: 218 },
    { id: 'camp-2', name: 'Follow-up Campaign', status: 'Active', audience: 'Qualified leads', subject: 'Quick follow-up on your quote', trigger: 'Stage changed to Qualified', sends: 892, opens: 465, clicks: 133 },
    { id: 'camp-3', name: 'Re-engagement Series', status: 'Paused', audience: 'Cold leads', subject: 'Still thinking it over?', trigger: 'No activity for 30 days', sends: 456, opens: 191, clicks: 44 },
  ],
  automations: [
    { id: 'auto-1', trigger: 'New lead created', action: 'Assign to sales rep', active: true },
    { id: 'auto-2', trigger: 'Lead stage changed', action: 'Send notification', active: true },
    { id: 'auto-3', trigger: 'No activity for 7 days', action: 'Create follow-up task', active: true },
  ],
  assignment: {
    mode: 'Round robin',
    reps: [
      { id: 'rep-1', name: 'Dana Whitfield', territory: 'North', active: true },
      { id: 'rep-2', name: 'Marcus Lee', territory: 'South', active: true },
      { id: 'rep-3', name: 'Priya Raman', territory: 'West', active: false },
    ],
    notifyOnAssign: true,
    capPerRep: 25,
  },
  notifications: {
    dealAlerts: true,
    dailyDigest: true,
    taskReminders: false,
  },
}

export function readCustomerState(): CrmState {
  const raw = readStored<Partial<CrmState>>(CUSTOMER_STORAGE_KEY, SEED_STATE)
  return {
    leads: Array.isArray(raw?.leads) ? (raw.leads as CrmLead[]) : SEED_LEADS,
    activities: Array.isArray(raw?.activities) ? (raw.activities as CrmActivity[]) : SEED_ACTIVITIES,
    tasks: Array.isArray(raw?.tasks) ? (raw.tasks as CrmTask[]) : SEED_TASKS,
  }
}

export function readAdminState(): CrmAdminState {
  const raw = readStored<Partial<CrmAdminState>>(ADMIN_STORAGE_KEY, SEED_ADMIN_STATE)
  const assignment = raw?.assignment
  return {
    campaigns: Array.isArray(raw?.campaigns) ? (raw.campaigns as CrmCampaign[]) : SEED_ADMIN_STATE.campaigns,
    automations: Array.isArray(raw?.automations) ? (raw.automations as CrmAutomation[]) : SEED_ADMIN_STATE.automations,
    assignment: assignment && Array.isArray(assignment.reps)
      ? { ...SEED_ADMIN_STATE.assignment, ...assignment }
      : SEED_ADMIN_STATE.assignment,
    notifications: { ...SEED_ADMIN_STATE.notifications, ...(raw?.notifications || {}) },
  }
}

export const AUTOMATION_TRIGGERS = [
  'New lead created',
  'Lead stage changed',
  'No activity for 7 days',
  'Deal value above $50,000',
  'Proposal sent',
  'Deal marked Closed Won',
]

export const AUTOMATION_ACTIONS = [
  'Assign to sales rep',
  'Send notification',
  'Create follow-up task',
  'Start email campaign',
  'Notify sales manager',
  'Add to onboarding list',
]

export const CAMPAIGN_AUDIENCES = ['New leads', 'Qualified leads', 'Proposal stage', 'Cold leads', 'Closed Won customers']

/* ---------- Formatting helpers ---------- */

export const formatMoney = (n: number) => '$' + Math.round(n).toLocaleString('en-US')

export const formatMillions = (n: number) => '$' + (n / 1000000).toFixed(2) + 'M'

export const percent = (part: number, whole: number) => (whole <= 0 ? '0%' : Math.round((part / whole) * 100) + '%')

export const priorityBadge = (priority: Priority) =>
  priority === 'High' ? 'bg-red-100 text-red-800' : priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'

export const statusBadge = (status: CampaignStatus) =>
  status === 'Active' ? 'bg-green-100 text-green-800' : status === 'Paused' ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'

export const inputClass = 'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0'

/* ---------- Pipeline math (shared by both views) ---------- */

export interface StageStat {
  name: string
  count: number
  value: number
  leads: CrmLead[]
}

export function buildStageStats(state: CrmState, stages: string[]): StageStat[] {
  const extra = state.leads
    .map(l => l.stage)
    .filter(s => !stages.includes(s))
  const allStages = [...stages, ...Array.from(new Set(extra))]

  return allStages.map((name, index) => {
    // A renamed stage keeps the historical volume of the slot it occupies, so the
    // column does not drop to zero the moment somebody edits a stage label.
    const positional = index < stages.length && index < DEFAULT_STAGES.length && !stages.includes(DEFAULT_STAGES[index])
      ? STAGE_BASELINE[DEFAULT_STAGES[index]]
      : undefined
    const baseline = STAGE_BASELINE[name] || positional || { count: 0, value: 0 }
    const seedIn = SEED_LEADS.filter(l => l.stage === name)
    const inStage = state.leads.filter(l => l.stage === name)
    return {
      name,
      count: Math.max(0, baseline.count - seedIn.length + inStage.length),
      value: Math.max(0, baseline.value - seedIn.reduce((s, l) => s + l.value, 0) + inStage.reduce((s, l) => s + l.value, 0)),
      leads: inStage,
    }
  })
}

export function wonStageOf(stats: StageStat[]): StageStat | undefined {
  return stats.find(s => s.name.toLowerCase().includes('won')) || stats[stats.length - 1]
}

/**
 * Win rate counts deals that made it past the first stage, so raw inbound
 * leads sitting untouched at the top of the funnel do not drag the number down.
 */
export function winRateParts(stats: StageStat[]): { won: number; considered: number } {
  const won = wonStageOf(stats)?.count || 0
  const considered = stats.slice(1).reduce((sum, s) => sum + s.count, 0)
  return { won, considered: considered > 0 ? considered : won }
}

/**
 * Maps deals onto a new stage list. Stages edited in place keep their deals;
 * anything left pointing at a stage that no longer exists lands in the first one.
 */
export function migrateLeadStages(leads: CrmLead[], previous: string[], next: string[]): CrmLead[] {
  const renames = new Map<string, string>()
  const shared = Math.min(previous.length, next.length)
  for (let i = 0; i < shared; i++) {
    if (previous[i] !== next[i] && !next.includes(previous[i])) {
      renames.set(previous[i], next[i])
    }
  }
  return leads.map(lead => {
    if (next.includes(lead.stage)) return lead
    const renamed = renames.get(lead.stage)
    if (renamed) return { ...lead, stage: renamed }
    return { ...lead, stage: next[0] }
  })
}

/* ---------- Reporting ---------- */

export type RangeKey = '7d' | '30d' | 'qtr' | 'ytd'

export const RANGE_OPTIONS: { key: RangeKey; label: string; multiplier: number }[] = [
  { key: '7d', label: 'Last 7 days', multiplier: 0.25 },
  { key: '30d', label: 'Last 30 days', multiplier: 1 },
  { key: 'qtr', label: 'This quarter', multiplier: 2.8 },
  { key: 'ytd', label: 'Year to date', multiplier: 9.4 },
]

export const rangeLabel = (key: RangeKey) => RANGE_OPTIONS.find(r => r.key === key)?.label || 'Last 30 days'
export const rangeMultiplier = (key: RangeKey) => RANGE_OPTIONS.find(r => r.key === key)?.multiplier || 1

export interface GeneratedReport {
  id: string
  title: string
  range: string
  generatedAt: string
  summary: { label: string; value: string }[]
  columns: string[]
  rows: string[][]
  note: string
}

const scale = (base: number, key: RangeKey) => Math.round(base * rangeMultiplier(key))

export function buildPipelineReport(state: CrmState, stages: string[], range: RangeKey): GeneratedReport {
  const stats = buildStageStats(state, stages)
  const totalCount = stats.reduce((s, x) => s + x.count, 0)
  const totalValue = stats.reduce((s, x) => s + x.value, 0)
  const won = wonStageOf(stats)
  const openValue = Math.max(0, totalValue - (won?.value || 0))

  return {
    id: 'pipeline',
    title: 'Pipeline Report',
    range: rangeLabel(range),
    generatedAt: new Date().toLocaleString('en-US'),
    summary: [
      { label: 'Open pipeline', value: formatMoney(openValue) },
      { label: 'Total deals', value: String(totalCount) },
      { label: 'Average deal size', value: formatMoney(totalCount > 0 ? totalValue / totalCount : 0) },
      { label: 'Deals added in range', value: String(scale(34, range)) },
    ],
    columns: ['Stage', 'Deals', 'Value', 'Share of pipeline', 'Avg deal'],
    rows: stats.map(s => [
      s.name,
      String(s.count),
      formatMoney(s.value),
      percent(s.value, totalValue),
      formatMoney(s.count > 0 ? s.value / s.count : 0),
    ]),
    note: 'Stage totals include every lead you have added, moved, or deleted in this demo. Change the date range to re-run the report.',
  }
}

export function buildActivityReport(state: CrmState, stages: string[], range: RangeKey): GeneratedReport {
  const logged = {
    email: state.activities.filter(a => a.type === 'email').length,
    call: state.activities.filter(a => a.type === 'call').length,
    meeting: state.activities.filter(a => a.type === 'meeting').length,
    note: state.activities.filter(a => a.type === 'note').length,
  }
  const emails = scale(486, range) + logged.email
  const calls = scale(212, range) + logged.call
  const meetings = scale(64, range) + logged.meeting
  const notes = scale(97, range) + logged.note
  const total = emails + calls + meetings + notes
  const openTasks = state.tasks.filter(t => !t.completed).length
  const doneTasks = state.tasks.filter(t => t.completed).length

  return {
    id: 'activity',
    title: 'Activity Report',
    range: rangeLabel(range),
    generatedAt: new Date().toLocaleString('en-US'),
    summary: [
      { label: 'Touchpoints logged', value: String(total) },
      { label: 'Emails sent', value: String(emails) },
      { label: 'Calls logged', value: String(calls) },
      { label: 'Tasks open / done', value: `${openTasks} / ${doneTasks}` },
    ],
    columns: ['Activity type', 'Count', 'Share', 'Logged in this demo'],
    rows: [
      ['Email', String(emails), percent(emails, total), String(logged.email)],
      ['Call', String(calls), percent(calls, total), String(logged.call)],
      ['Meeting', String(meetings), percent(meetings, total), String(logged.meeting)],
      ['Note', String(notes), percent(notes, total), String(logged.note)],
    ],
    note: `Anything you log from the sales dashboard is counted here alongside the historical totals for ${rangeLabel(range).toLowerCase()}. Pipeline stages tracked: ${stages.length}.`,
  }
}

export function buildConversionReport(state: CrmState, stages: string[], range: RangeKey): GeneratedReport {
  const stats = buildStageStats(state, stages)
  const first = stats[0]?.count || 0
  const won = wonStageOf(stats)
  const wonCount = won?.count || 0

  const rows: string[][] = []
  for (let i = 0; i < stats.length - 1; i++) {
    const from = stats[i]
    const to = stats[i + 1]
    rows.push([
      `${from.name} to ${to.name}`,
      String(from.count),
      String(to.count),
      percent(to.count, from.count),
      formatMoney(to.value),
    ])
  }

  return {
    id: 'conversion',
    title: 'Conversion Report',
    range: rangeLabel(range),
    generatedAt: new Date().toLocaleString('en-US'),
    summary: [
      { label: 'Lead to won rate', value: percent(wonCount, first) },
      { label: 'Deals won in range', value: String(Math.max(1, scale(wonCount, range))) },
      { label: 'Revenue won in range', value: formatMoney(scale(won?.value || 0, range)) },
      { label: 'Average days to close', value: String(Math.max(9, 41 - Math.round(rangeMultiplier(range) * 2))) },
    ],
    columns: ['Stage transition', 'Entered', 'Advanced', 'Conversion', 'Value advanced'],
    rows,
    note: 'Conversion is calculated from the live stage counts in this demo, so moving a lead between stages changes these numbers immediately.',
  }
}

export function buildReport(id: string, state: CrmState, stages: string[], range: RangeKey): GeneratedReport {
  if (id === 'activity') return buildActivityReport(state, stages, range)
  if (id === 'conversion') return buildConversionReport(state, stages, range)
  return buildPipelineReport(state, stages, range)
}

export function reportToCsv(report: GeneratedReport): string {
  const escape = (cell: string) => `"${String(cell).replace(/"/g, '""')}"`
  const lines: string[] = []
  lines.push(escape(`${report.title} (${report.range})`))
  lines.push(escape(`Generated ${report.generatedAt}`))
  lines.push('')
  lines.push(report.summary.map(s => escape(s.label)).join(','))
  lines.push(report.summary.map(s => escape(s.value)).join(','))
  lines.push('')
  lines.push(report.columns.map(escape).join(','))
  report.rows.forEach(row => lines.push(row.map(escape).join(',')))
  return lines.join('\n')
}

export function downloadCsv(filename: string, csv: string): void {
  if (typeof window === 'undefined') return
  try {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch {
    // Download blocked -- the report stays on screen for the user to read
  }
}
