// Shared demo state for the Workflow Automation showcase.
// Both the customer builder and the admin console read and write the same
// localStorage-backed records so actions taken in one view show up in the other.

import { Bell, Calendar, Clock, CreditCard, Database, FileText, Mail, MessageSquare, Receipt, Users, Zap } from 'lucide-react'

export type WorkflowStatus = 'Active' | 'Paused'
export type RunStatus = 'Completed' | 'Failed'
export type StepStatus = 'ok' | 'failed' | 'skipped'

export interface Workflow {
  id: string
  name: string
  trigger: string
  actions: string[]
  status: WorkflowStatus
  runs: number
  notifyFailure: boolean
  notifySuccess: boolean
}

export interface RunStep {
  label: string
  status: StepStatus
}

export interface RunLog {
  id: string
  workflowId: string
  workflowName: string
  status: RunStatus
  startedAt: number
  durationSec: number
  steps: RunStep[]
  trigger: string
  failureReason?: string
  source: 'Scheduled' | 'Manual test run' | 'Retry'
}

export interface Integration {
  id: string
  name: string
  category: string
  description: string
  connected: boolean
  account: string
  syncFrequency: string
  eventsToday: number
  apiKey: string
  lastSyncMinutes: number
}

export const WORKFLOW_KEY = 'demo40-workflows'
export const RUNS_KEY = 'demo40-runs'
export const INTEGRATIONS_KEY = 'demo40-integrations'

export const TRIGGER_OPTIONS = [
  'When a new contact is created',
  'When a deal is won',
  'When an email is received',
  'When an invoice becomes overdue',
  'When a project status changes',
  'On a schedule (daily, weekly, etc.)',
]

export const ACTION_LIBRARY = [
  { label: 'Send Email', description: 'Deliver a templated email to the contact' },
  { label: 'Send Follow-Up Email', description: 'Send a second-touch email after a delay' },
  { label: 'Create Task', description: 'Add a task to your team task board' },
  { label: 'Schedule Meeting', description: 'Book a slot on a connected calendar' },
  { label: 'Send SMS', description: 'Text the contact via your SMS provider' },
  { label: 'Update CRM Record', description: 'Write field changes back to your CRM' },
  { label: 'Generate Invoice', description: 'Create and send an invoice draft' },
  { label: 'Assign Team Member', description: 'Route the work to the right person' },
  { label: 'Send Notification', description: 'Ping your team in chat or by push' },
  { label: 'Wait 2 Days', description: 'Pause the workflow before the next step' },
]

export const ACTION_ICONS: Record<string, typeof Mail> = {
  'Send Email': Mail,
  'Send Follow-Up Email': Mail,
  'Create Task': FileText,
  'Schedule Meeting': Calendar,
  'Check Calendar Availability': Calendar,
  'Send Confirmation Email': Mail,
  'Send SMS': MessageSquare,
  'Update CRM Record': Database,
  'Generate Invoice': Receipt,
  'Assign Team Member': Users,
  'Send Notification': Bell,
  'Wait 2 Days': Clock,
  'Collect Payment': CreditCard,
}

export function actionIcon(label: string) {
  return ACTION_ICONS[label] ?? Zap
}

export const DEFAULT_WORKFLOWS: Workflow[] = [
  { id: 'wf-1', name: 'New Customer Onboarding', trigger: 'When a new contact is created', actions: ['Send Email', 'Create Task', 'Update CRM Record', 'Schedule Meeting', 'Send Notification'], status: 'Active', runs: 234, notifyFailure: true, notifySuccess: false },
  { id: 'wf-2', name: 'Invoice Payment Reminder', trigger: 'When an invoice becomes overdue', actions: ['Send Email', 'Wait 2 Days', 'Send Follow-Up Email'], status: 'Active', runs: 156, notifyFailure: true, notifySuccess: false },
  { id: 'wf-3', name: 'Project Completion Notification', trigger: 'When a project status changes', actions: ['Send Email', 'Generate Invoice', 'Create Task', 'Send Notification'], status: 'Paused', runs: 89, notifyFailure: false, notifySuccess: true },
  { id: 'wf-4', name: 'Lead Nurture Campaign', trigger: 'When a new contact is created', actions: ['Send Email', 'Wait 2 Days', 'Send Follow-Up Email', 'Update CRM Record', 'Send SMS', 'Create Task', 'Send Notification'], status: 'Active', runs: 445, notifyFailure: true, notifySuccess: true },
]

export const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: 'int-email', name: 'Email Provider', category: 'Messaging', description: 'Sends templated emails and follow-ups', connected: true, account: 'ops@northstar-demo.test', syncFrequency: 'Real time', eventsToday: 142, apiKey: 'sk_demo_live_4f21', lastSyncMinutes: 3 },
  { id: 'int-calendar', name: 'Calendar Service', category: 'Scheduling', description: 'Reads availability and books meetings', connected: true, account: 'team@northstar-demo.test', syncFrequency: 'Every 5 minutes', eventsToday: 38, apiKey: 'sk_demo_live_9c07', lastSyncMinutes: 6 },
  { id: 'int-crm', name: 'CRM System', category: 'Records', description: 'Reads and writes contact and deal records', connected: true, account: 'Northstar Demo Workspace', syncFrequency: 'Every 15 minutes', eventsToday: 96, apiKey: 'sk_demo_live_1b83', lastSyncMinutes: 11 },
  { id: 'int-payments', name: 'Payment Gateway', category: 'Billing', description: 'Creates invoice drafts and tracks payment status', connected: true, account: 'acct_demo_northstar', syncFrequency: 'Real time', eventsToday: 21, apiKey: 'sk_demo_live_7d55', lastSyncMinutes: 2 },
]

export const AVAILABLE_INTEGRATIONS: Integration[] = [
  { id: 'int-sms', name: 'SMS Gateway', category: 'Messaging', description: 'Sends text messages to contacts', connected: false, account: 'Not linked yet', syncFrequency: 'Real time', eventsToday: 0, apiKey: 'sk_demo_test_0000', lastSyncMinutes: 0 },
  { id: 'int-chat', name: 'Team Chat', category: 'Notifications', description: 'Posts run alerts into a team channel', connected: false, account: 'Not linked yet', syncFrequency: 'Real time', eventsToday: 0, apiKey: 'sk_demo_test_0000', lastSyncMinutes: 0 },
  { id: 'int-storage', name: 'File Storage', category: 'Documents', description: 'Archives generated invoices and PDFs', connected: false, account: 'Not linked yet', syncFrequency: 'Hourly', eventsToday: 0, apiKey: 'sk_demo_test_0000', lastSyncMinutes: 0 },
  { id: 'int-forms', name: 'Web Form Capture', category: 'Records', description: 'Turns website form submissions into triggers', connected: false, account: 'Not linked yet', syncFrequency: 'Real time', eventsToday: 0, apiKey: 'sk_demo_test_0000', lastSyncMinutes: 0 },
]

export const SYNC_FREQUENCIES = ['Real time', 'Every 5 minutes', 'Every 15 minutes', 'Hourly', 'Daily']

const MINUTE = 60_000

// Fixed history so every visitor sees the same believable log, anchored to the
// moment the demo is opened rather than a hardcoded date that would go stale.
const SEED_PLAN: { workflowId: string; minutesAgo: number; status: RunStatus; durationSec: number; failedStepIndex?: number; failureReason?: string }[] = [
  { workflowId: 'wf-1', minutesAgo: 12, status: 'Completed', durationSec: 4.2 },
  { workflowId: 'wf-2', minutesAgo: 27, status: 'Completed', durationSec: 2.8 },
  { workflowId: 'wf-4', minutesAgo: 41, status: 'Completed', durationSec: 6.4 },
  { workflowId: 'wf-1', minutesAgo: 88, status: 'Completed', durationSec: 3.9 },
  { workflowId: 'wf-4', minutesAgo: 134, status: 'Failed', durationSec: 1.7, failedStepIndex: 4, failureReason: 'The SMS Gateway integration was switched off at run time, so the text message step stopped. Add it in the Integration Hub, then retry this run.' },
  { workflowId: 'wf-2', minutesAgo: 190, status: 'Completed', durationSec: 3.1 },
  { workflowId: 'wf-1', minutesAgo: 260, status: 'Completed', durationSec: 4.6 },
  { workflowId: 'wf-4', minutesAgo: 355, status: 'Completed', durationSec: 5.9 },
  { workflowId: 'wf-2', minutesAgo: 640, status: 'Completed', durationSec: 2.6 },
  { workflowId: 'wf-1', minutesAgo: 810, status: 'Completed', durationSec: 4.1 },
  { workflowId: 'wf-4', minutesAgo: 1180, status: 'Completed', durationSec: 6.1 },
  { workflowId: 'wf-2', minutesAgo: 1520, status: 'Completed', durationSec: 3.4 },
  { workflowId: 'wf-1', minutesAgo: 1910, status: 'Completed', durationSec: 4.4 },
  { workflowId: 'wf-4', minutesAgo: 2300, status: 'Completed', durationSec: 5.2 },
]

export function buildSteps(actions: string[], failedStepIndex?: number): RunStep[] {
  return actions.map((label, index) => {
    if (failedStepIndex === undefined) return { label, status: 'ok' as StepStatus }
    if (index < failedStepIndex) return { label, status: 'ok' as StepStatus }
    if (index === failedStepIndex) return { label, status: 'failed' as StepStatus }
    return { label, status: 'skipped' as StepStatus }
  })
}

export function seedRuns(workflows: Workflow[], now: number): RunLog[] {
  const byId = new Map(workflows.map((w) => [w.id, w]))
  return SEED_PLAN.flatMap((plan, index) => {
    const workflow = byId.get(plan.workflowId)
    if (!workflow) return []
    const failedIndex = plan.status === 'Failed'
      ? Math.min(plan.failedStepIndex ?? 0, workflow.actions.length - 1)
      : undefined
    return [{
      id: `seed-${index}`,
      workflowId: workflow.id,
      workflowName: workflow.name,
      status: plan.status,
      startedAt: now - plan.minutesAgo * MINUTE,
      durationSec: plan.durationSec,
      steps: buildSteps(workflow.actions, failedIndex),
      trigger: workflow.trigger,
      failureReason: plan.status === 'Failed' ? plan.failureReason : undefined,
      source: 'Scheduled' as const,
    }]
  })
}

function isWorkflow(value: unknown): value is Workflow {
  const w = value as Workflow
  return !!w && typeof w.id === 'string' && typeof w.name === 'string' && Array.isArray(w.actions) && typeof w.trigger === 'string'
}

function isRunLog(value: unknown): value is RunLog {
  const r = value as RunLog
  return !!r && typeof r.id === 'string' && typeof r.workflowId === 'string' && Array.isArray(r.steps) && typeof r.startedAt === 'number'
}

function isIntegration(value: unknown): value is Integration {
  const i = value as Integration
  return !!i && typeof i.id === 'string' && typeof i.name === 'string' && typeof i.connected === 'boolean'
}

function readList<T>(key: string, guard: (value: unknown) => value is T): T[] | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || !parsed.every(guard)) return null
    return parsed
  } catch {
    return null
  }
}

function writeList<T>(key: string, list: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // Storage unavailable -- state still updates for the current session
  }
}

export function loadWorkflows(): Workflow[] {
  const stored = readList(WORKFLOW_KEY, isWorkflow)
  return stored && stored.length > 0 ? stored : DEFAULT_WORKFLOWS
}

export function saveWorkflows(list: Workflow[]) {
  writeList(WORKFLOW_KEY, list)
}

export function loadRuns(workflows: Workflow[]): RunLog[] {
  const stored = readList(RUNS_KEY, isRunLog)
  if (stored) return stored
  return seedRuns(workflows, Date.now())
}

export function saveRuns(list: RunLog[]) {
  writeList(RUNS_KEY, list)
}

export function loadIntegrations(): Integration[] {
  const stored = readList(INTEGRATIONS_KEY, isIntegration)
  return stored && stored.length > 0 ? stored : DEFAULT_INTEGRATIONS
}

export function saveIntegrations(list: Integration[]) {
  writeList(INTEGRATIONS_KEY, list)
}

export function formatRelative(timestamp: number, now: number): string {
  const diff = Math.max(0, now - timestamp)
  const minutes = Math.round(diff / MINUTE)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  const days = Math.round(hours / 24)
  return days === 1 ? 'Yesterday' : `${days} days ago`
}

export function formatClock(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export function successRate(runs: RunLog[]): string {
  if (runs.length === 0) return '100%'
  const completed = runs.filter((r) => r.status === 'Completed').length
  return `${((completed / runs.length) * 100).toFixed(1)}%`
}
