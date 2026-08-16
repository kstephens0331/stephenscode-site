'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import { Zap, Play, Pause, Mail, Calendar, FileText, Plus, Settings, X, CheckCircle, XCircle, MinusCircle, Clock, Copy, Trash2, ArrowUp, ArrowDown, Send, ChevronLeft, ChevronRight, Loader2, History } from 'lucide-react'
import {
  ACTION_LIBRARY,
  DEFAULT_WORKFLOWS,
  TRIGGER_OPTIONS,
  actionIcon,
  buildSteps,
  formatClock,
  formatRelative,
  loadRuns,
  loadWorkflows,
  saveRuns,
  saveWorkflows,
  successRate,
  type RunLog,
  type Workflow,
} from './store'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

const TABS = [
  { id: 'workflows', label: 'Workflows' },
  { id: 'templates', label: 'Templates' },
  { id: 'builder', label: 'Builder' },
  { id: 'history', label: 'Run History' },
  { id: 'request', label: 'Request Setup' },
]

const TEMPLATES = [
  { name: 'Email Marketing Campaign', description: 'Automated email sequence for marketing', icon: Mail, trigger: 'When a new contact is created', actions: ['Send Email', 'Wait 2 Days', 'Send Follow-Up Email', 'Update CRM Record'] },
  { name: 'Task Assignment', description: 'Auto-assign tasks based on criteria', icon: FileText, trigger: 'When a deal is won', actions: ['Create Task', 'Assign Team Member', 'Send Notification'] },
  { name: 'Meeting Scheduler', description: 'Schedule meetings automatically', icon: Calendar, trigger: 'When an email is received', actions: ['Check Calendar Availability', 'Schedule Meeting', 'Send Confirmation Email'] },
  { name: 'Custom Trigger', description: 'Build from scratch', icon: Zap, trigger: '', actions: [] },
]

const AUTOMATION_GOALS = [
  'Client onboarding sequence',
  'Invoice and payment reminders',
  'Lead follow-up and nurture',
  'Job or project status updates',
  'Internal team notifications',
  'Something else',
]

const HISTORY_PAGE_SIZE = 5

interface RunState {
  runId: string
  workflow: Workflow
  stepIndex: number
  startedAt: number
  done: boolean
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('workflows')
  const [hydrated, setHydrated] = useState(false)
  const [workflows, setWorkflows] = useState<Workflow[]>(DEFAULT_WORKFLOWS)
  const [runs, setRuns] = useState<RunLog[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const [detailWorkflow, setDetailWorkflow] = useState<Workflow | null>(null)
  const [settingsDraft, setSettingsDraft] = useState<Workflow | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<(typeof TEMPLATES)[number] | null>(null)
  const [selectedRun, setSelectedRun] = useState<RunLog | null>(null)
  const [runState, setRunState] = useState<RunState | null>(null)
  const [confirmClearHistory, setConfirmClearHistory] = useState(false)

  const [builderName, setBuilderName] = useState('')
  const [builderTrigger, setBuilderTrigger] = useState('')
  const [builderActions, setBuilderActions] = useState<string[]>(['Send Email', 'Create Task', 'Schedule Meeting'])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [builderError, setBuilderError] = useState('')
  const [showActionPicker, setShowActionPicker] = useState(false)

  const [historyStatus, setHistoryStatus] = useState<'all' | 'Completed' | 'Failed'>('all')
  const [historyWorkflow, setHistoryWorkflow] = useState('all')
  const [historyPage, setHistoryPage] = useState(1)

  const [lead, setLead] = useState({ name: '', email: '', phone: '', company: '', goal: '', notes: '', website: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [leadSending, setLeadSending] = useState(false)

  const toastTimer = useRef<number | null>(null)
  const commitRef = useRef<string | null>(null)

  // Hydrate from localStorage after mount so server and client markup match.
  useEffect(() => {
    const storedWorkflows = loadWorkflows()
    setWorkflows(storedWorkflows)
    setRuns(loadRuns(storedWorkflows))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveWorkflows(workflows)
  }, [workflows, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveRuns(runs)
  }, [runs, hydrated])

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
  }, [])

  // Step the simulated run forward one action at a time.
  useEffect(() => {
    if (!runState || runState.done) return
    const timer = window.setTimeout(() => {
      setRunState((prev) => {
        if (!prev || prev.done) return prev
        const next = prev.stepIndex + 1
        return { ...prev, stepIndex: next, done: next >= prev.workflow.actions.length }
      })
    }, 700)
    return () => window.clearTimeout(timer)
  }, [runState])

  // Commit the finished run exactly once.
  useEffect(() => {
    if (!runState || !runState.done) return
    if (commitRef.current === runState.runId) return
    commitRef.current = runState.runId
    const finished = runState
    const log: RunLog = {
      id: finished.runId,
      workflowId: finished.workflow.id,
      workflowName: finished.workflow.name,
      status: 'Completed',
      startedAt: finished.startedAt,
      durationSec: Number(Math.max(0.6, (Date.now() - finished.startedAt) / 1000).toFixed(1)),
      steps: buildSteps(finished.workflow.actions),
      trigger: finished.workflow.trigger,
      source: 'Manual test run',
    }
    setRuns((prev) => [log, ...prev])
    setWorkflows((prev) => prev.map((w) => (w.id === finished.workflow.id ? { ...w, runs: w.runs + 1 } : w)))
  }, [runState])

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3000)
  }

  const resetBuilder = () => {
    setBuilderName('')
    setBuilderTrigger('')
    setBuilderActions(['Send Email', 'Create Task', 'Schedule Meeting'])
    setEditingId(null)
    setBuilderError('')
    setShowActionPicker(false)
  }

  const openBlankBuilder = () => {
    resetBuilder()
    setActiveTab('builder')
  }

  const openTemplate = (template: (typeof TEMPLATES)[number]) => {
    setBuilderName(template.name === 'Custom Trigger' ? '' : template.name)
    setBuilderTrigger(template.trigger)
    setBuilderActions([...template.actions])
    setEditingId(null)
    setBuilderError('')
    setShowActionPicker(false)
    setPreviewTemplate(null)
    setActiveTab('builder')
    showToast(template.name === 'Custom Trigger' ? 'Blank workflow started' : `Template loaded: ${template.name}`)
  }

  const openEdit = (workflow: Workflow) => {
    setBuilderName(workflow.name)
    setBuilderTrigger(workflow.trigger)
    setBuilderActions([...workflow.actions])
    setEditingId(workflow.id)
    setBuilderError('')
    setShowActionPicker(false)
    setDetailWorkflow(null)
    setActiveTab('builder')
  }

  const toggleStatus = (workflow: Workflow) => {
    const nextStatus: Workflow['status'] = workflow.status === 'Active' ? 'Paused' : 'Active'
    setWorkflows((prev) => prev.map((w) => (w.id === workflow.id ? { ...w, status: nextStatus } : w)))
    setDetailWorkflow((prev) => (prev && prev.id === workflow.id ? { ...prev, status: nextStatus } : prev))
    showToast(nextStatus === 'Active' ? `${workflow.name} resumed` : `${workflow.name} paused`)
  }

  const startRun = (workflow: Workflow) => {
    if (workflow.actions.length === 0) {
      showToast('Add an action to this workflow before running it')
      return
    }
    setDetailWorkflow(null)
    setRunState({
      runId: `run-${Date.now()}`,
      workflow,
      stepIndex: 0,
      startedAt: Date.now(),
      done: false,
    })
  }

  const duplicateWorkflow = (workflow: Workflow) => {
    const copy: Workflow = {
      ...workflow,
      id: `wf-${Date.now()}`,
      name: `${workflow.name} (copy)`,
      status: 'Paused',
      runs: 0,
    }
    setWorkflows((prev) => [copy, ...prev])
    setSettingsDraft(null)
    setConfirmDelete(false)
    setActiveTab('workflows')
    showToast('Workflow duplicated and saved as paused')
  }

  const deleteWorkflow = (workflow: Workflow) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== workflow.id))
    setSettingsDraft(null)
    setConfirmDelete(false)
    setDetailWorkflow(null)
    showToast(`${workflow.name} deleted`)
  }

  const saveSettings = () => {
    if (!settingsDraft) return
    if (!settingsDraft.name.trim()) return
    const cleaned = { ...settingsDraft, name: settingsDraft.name.trim() }
    setWorkflows((prev) => prev.map((w) => (w.id === cleaned.id ? cleaned : w)))
    setSettingsDraft(null)
    setConfirmDelete(false)
    showToast('Workflow settings saved')
  }

  const moveAction = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= builderActions.length) return
    const next = [...builderActions]
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    setBuilderActions(next)
    setBuilderError('')
  }

  const saveWorkflow = () => {
    if (!builderName.trim()) {
      setBuilderError('Give your workflow a name before saving.')
      return
    }
    if (!builderTrigger) {
      setBuilderError('Select a trigger to start the workflow.')
      return
    }
    if (builderActions.length === 0) {
      setBuilderError('Add at least one action to the workflow.')
      return
    }
    if (editingId) {
      setWorkflows((prev) => prev.map((w) => (w.id === editingId ? { ...w, name: builderName.trim(), trigger: builderTrigger, actions: builderActions } : w)))
      showToast('Workflow updated')
    } else {
      const created: Workflow = {
        id: `wf-${Date.now()}`,
        name: builderName.trim(),
        trigger: builderTrigger,
        actions: builderActions,
        status: 'Active',
        runs: 0,
        notifyFailure: true,
        notifySuccess: false,
      }
      setWorkflows((prev) => [created, ...prev])
      showToast('Workflow created and activated')
    }
    resetBuilder()
    setActiveTab('workflows')
  }

  const submitLead = async (event: FormEvent) => {
    event.preventDefault()
    if (leadSending) return
    setLeadError('')
    setLeadSending(true)
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: demo.name,
          demoPackage: demo.package,
          demoSlug: demo.slug,
          clientName: lead.name,
          clientPhone: lead.phone,
          clientEmail: lead.email,
          service: lead.goal || 'Workflow automation setup',
          preferredDate: '',
          preferredTime: '',
          notes: `Company: ${lead.company || 'Not provided'}\n${lead.notes}`,
          website: lead.website,
        }),
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_workflow_setup_request', demo_slug: demo.slug })
        trackConversion('leadForm')
        setLeadSubmitted(true)
        showToast('Request sent. We will be in touch shortly.')
      } else {
        setLeadError('That request did not go through. Please check your details and try again.')
      }
    } catch {
      setLeadError('We could not reach the server just now. Please try again in a moment.')
    } finally {
      setLeadSending(false)
    }
  }

  const now = Date.now()
  const activeCount = workflows.filter((w) => w.status === 'Active').length
  const totalRuns = workflows.reduce((sum, w) => sum + w.runs, 0)
  const timeSavedHours = Math.round((totalRuns * 6) / 60)

  const filteredRuns = useMemo(() => runs.filter((run) => {
    if (historyStatus !== 'all' && run.status !== historyStatus) return false
    if (historyWorkflow !== 'all' && run.workflowId !== historyWorkflow) return false
    return true
  }), [runs, historyStatus, historyWorkflow])

  const totalPages = Math.max(1, Math.ceil(filteredRuns.length / HISTORY_PAGE_SIZE))
  const currentPage = Math.min(historyPage, totalPages)
  const pagedRuns = filteredRuns.slice((currentPage - 1) * HISTORY_PAGE_SIZE, currentPage * HISTORY_PAGE_SIZE)

  const runsFor = (workflowId: string) => runs.filter((run) => run.workflowId === workflowId).slice(0, 4)

  const statusPill = (status: RunLog['status']) =>
    status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Workflow Automation</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Build and manage automated workflows</p>
            </div>
            <button
              onClick={openBlankBuilder}
              className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
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
            { label: 'Active Workflows', value: String(activeCount), color: colors.primary, tab: 'workflows' },
            { label: 'Total Runs', value: totalRuns.toLocaleString(), color: colors.secondary, tab: 'history' },
            { label: 'Success Rate', value: successRate(runs), color: colors.success, tab: 'history' },
            { label: 'Time Saved', value: `${timeSavedHours}h`, color: colors.accent, tab: 'history' },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => {
                setActiveTab(stat.tab)
                if (stat.tab === 'history') {
                  setHistoryStatus('all')
                  setHistoryWorkflow('all')
                  setHistoryPage(1)
                }
              }}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8 overflow-x-auto" style={{ borderColor: colors.border }}>
          <div className="flex gap-6 min-w-max">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab.id ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab.id ? colors.primary : 'transparent'
                }}
              >
                {tab.label}
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
            {workflows.length === 0 ? (
              <div className="p-10 text-center rounded-xl border-2 border-dashed" style={{ borderColor: colors.border }}>
                <p className="font-semibold mb-2" style={{ color: colors.text }}>No workflows yet</p>
                <p className="text-sm mb-4" style={{ color: colors.textLight }}>Start from a template or build one from scratch.</p>
                <button
                  onClick={openBlankBuilder}
                  className="px-5 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Create Your First Workflow
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {workflows.map(workflow => (
                  <div key={workflow.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <div className="flex items-start justify-between mb-4 gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold" style={{ color: colors.text }}>{workflow.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            workflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                          Trigger: {workflow.trigger} • {workflow.actions.length} actions
                        </p>
                        <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                          {workflow.runs} successful runs
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => toggleStatus(workflow)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title={workflow.status === 'Active' ? 'Pause' : 'Resume'}
                          aria-label={workflow.status === 'Active' ? `Pause ${workflow.name}` : `Resume ${workflow.name}`}
                        >
                          {workflow.status === 'Active' ? (
                            <Pause className="w-5 h-5" style={{ color: colors.warning }} />
                          ) : (
                            <Play className="w-5 h-5" style={{ color: colors.success }} />
                          )}
                        </button>
                        <button
                          onClick={() => { setSettingsDraft({ ...workflow }); setConfirmDelete(false) }}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Settings"
                          aria-label={`Settings for ${workflow.name}`}
                        >
                          <Settings className="w-5 h-5" style={{ color: colors.text }} />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setDetailWorkflow(workflow)}
                        className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => startRun(workflow)}
                        className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        <Play className="w-4 h-4" style={{ color: colors.success }} />
                        Run Now
                      </button>
                      <button
                        onClick={() => openEdit(workflow)}
                        className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Edit Workflow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Workflow Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEMPLATES.map((template, index) => {
                const Icon = template.icon
                return (
                  <div key={index} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{template.name}</h3>
                    <p className="text-sm mb-4" style={{ color: colors.textLight }}>{template.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="flex-1 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        Preview Steps
                      </button>
                      <button
                        onClick={() => openTemplate(template)}
                        className="flex-1 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              {editingId ? 'Edit Workflow' : 'Visual Workflow Builder'}
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>Workflow Name</h3>
                </div>
                <input
                  type="text"
                  value={builderName}
                  onChange={(e) => { setBuilderName(e.target.value); setBuilderError('') }}
                  placeholder="e.g. New Lead Follow-Up"
                  aria-label="Workflow name"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                />
              </div>

              {/* Trigger */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6" style={{ color: colors.accent }} />
                  <h3 className="font-bold text-lg" style={{ color: colors.text }}>Trigger</h3>
                </div>
                <select
                  aria-label="Select a trigger"
                  value={builderTrigger}
                  onChange={(e) => { setBuilderTrigger(e.target.value); setBuilderError('') }}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <option value="">Select a trigger...</option>
                  {TRIGGER_OPTIONS.map((trigger) => (
                    <option key={trigger} value={trigger}>{trigger}</option>
                  ))}
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
                  {builderActions.length === 0 && (
                    <p className="text-sm py-2" style={{ color: colors.textLight }}>
                      No actions yet. Use Add Action below to build out this workflow.
                    </p>
                  )}
                  {builderActions.map((action, index) => {
                    const Icon = actionIcon(action)
                    return (
                      <div key={`${action}-${index}`} className="p-4 bg-white rounded-lg border-2 flex items-center gap-3" style={{ borderColor: colors.border }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: colors.secondary }}>
                          {index + 1}
                        </span>
                        <Icon className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                        <span className="font-semibold flex-1" style={{ color: colors.text }}>{action}</span>
                        <button
                          onClick={() => moveAction(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move up"
                          aria-label={`Move ${action} earlier`}
                        >
                          <ArrowUp className="w-4 h-4" style={{ color: colors.textLight }} />
                        </button>
                        <button
                          onClick={() => moveAction(index, 1)}
                          disabled={index === builderActions.length - 1}
                          className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move down"
                          aria-label={`Move ${action} later`}
                        >
                          <ArrowDown className="w-4 h-4" style={{ color: colors.textLight }} />
                        </button>
                        <button
                          onClick={() => { setBuilderActions(builderActions.filter((_, i) => i !== index)); setBuilderError('') }}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Remove action"
                          aria-label={`Remove ${action}`}
                        >
                          <X className="w-4 h-4" style={{ color: colors.textLight }} />
                        </button>
                      </div>
                    )
                  })}
                </div>

                {showActionPicker ? (
                  <div className="mt-4 p-4 bg-white rounded-lg border-2" style={{ borderColor: colors.primary }}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold" style={{ color: colors.text }}>Choose an action</h4>
                      <button
                        onClick={() => setShowActionPicker(false)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Close action picker"
                      >
                        <X className="w-4 h-4" style={{ color: colors.textLight }} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ACTION_LIBRARY.map((item) => {
                        const Icon = actionIcon(item.label)
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              setBuilderActions([...builderActions, item.label])
                              setShowActionPicker(false)
                              setBuilderError('')
                            }}
                            className="p-3 rounded-lg border text-left hover:shadow-sm transition-shadow flex items-start gap-3"
                            style={{ borderColor: colors.border }}
                          >
                            <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                            <span>
                              <span className="block font-semibold text-sm" style={{ color: colors.text }}>{item.label}</span>
                              <span className="block text-xs" style={{ color: colors.textLight }}>{item.description}</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowActionPicker(true)}
                    className="w-full mt-4 py-3 rounded-lg border-2 border-dashed font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
                    style={{ borderColor: colors.border, color: colors.primary }}
                  >
                    <Plus className="w-5 h-5" />
                    Add Action
                  </button>
                )}
              </div>

              {builderError && (
                <div className="p-4 rounded-lg text-sm font-semibold" style={{ backgroundColor: colors.error + '15', color: colors.error }}>
                  {builderError}
                </div>
              )}

              <div className="flex gap-3 pt-6 flex-wrap">
                <button
                  onClick={() => { resetBuilder(); setActiveTab('workflows') }}
                  className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveWorkflow}
                  className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  {editingId ? 'Save Changes' : 'Save Workflow'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Run History</h2>
              <button
                onClick={() => setConfirmClearHistory(true)}
                disabled={runs.length === 0}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {(['all', 'Completed', 'Failed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => { setHistoryStatus(status); setHistoryPage(1) }}
                  className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                  style={{
                    borderColor: historyStatus === status ? colors.primary : colors.border,
                    backgroundColor: historyStatus === status ? colors.primary : 'transparent',
                    color: historyStatus === status ? '#ffffff' : colors.text,
                  }}
                >
                  {status === 'all' ? 'All Runs' : status}
                </button>
              ))}
              <select
                aria-label="Filter by workflow"
                value={historyWorkflow}
                onChange={(e) => { setHistoryWorkflow(e.target.value); setHistoryPage(1) }}
                className="px-4 py-2 rounded-lg border-2 text-sm font-medium focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <option value="all">All workflows</option>
                {workflows.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              <span className="text-sm" style={{ color: colors.textLight }}>
                {filteredRuns.length} {filteredRuns.length === 1 ? 'run' : 'runs'}
              </span>
            </div>

            {pagedRuns.length === 0 ? (
              <div className="p-10 text-center rounded-xl border-2 border-dashed" style={{ borderColor: colors.border }}>
                <History className="w-8 h-8 mx-auto mb-3" style={{ color: colors.textLight }} />
                <p className="font-semibold mb-2" style={{ color: colors.text }}>No runs match these filters</p>
                <p className="text-sm mb-4" style={{ color: colors.textLight }}>Use Run Now on any workflow to create a new entry.</p>
                <button
                  onClick={() => setActiveTab('workflows')}
                  className="px-5 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Go to Workflows
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedRuns.map((run) => (
                    <button
                      key={run.id}
                      onClick={() => setSelectedRun(run)}
                      className="w-full p-4 rounded-lg border text-left hover:shadow-md transition-shadow flex items-center justify-between gap-4"
                      style={{ borderColor: colors.border }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {run.status === 'Completed' ? (
                          <CheckCircle className="w-5 h-5 shrink-0" style={{ color: colors.success }} />
                        ) : (
                          <XCircle className="w-5 h-5 shrink-0" style={{ color: colors.error }} />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold truncate" style={{ color: colors.text }}>{run.workflowName}</p>
                          <p className="text-xs" style={{ color: colors.textLight }}>
                            {run.source} • {run.steps.length} steps • {run.durationSec}s
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${statusPill(run.status)}`}>{run.status}</span>
                        <p className="text-xs mt-1" style={{ color: colors.textLight }}>{formatRelative(run.startedAt, now)}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setHistoryPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 flex items-center gap-1"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-sm font-semibold" style={{ color: colors.textLight }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setHistoryPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 flex items-center gap-1"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'request' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request This Setup</h2>
            <p className="mb-6" style={{ color: colors.textLight }}>
              Tell us which parts of your day you want automated and we will map it to a workflow like the ones in this demo.
            </p>

            {leadSubmitted ? (
              <div className="p-8 rounded-xl text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.success + '20' }}>
                  <CheckCircle className="w-9 h-9" style={{ color: colors.success }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request received</h3>
                <p className="mb-6" style={{ color: colors.textLight }}>
                  Thanks {lead.name.trim() || 'for reaching out'}. We will follow up within one business day with a workflow plan.
                </p>
                <button
                  onClick={() => {
                    setLeadSubmitted(false)
                    setLead({ name: '', email: '', phone: '', company: '', goal: '', notes: '', website: '' })
                  }}
                  className="px-5 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={submitLead} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="wf-lead-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Your Name *
                  </label>
                  <input
                    id="wf-lead-name"
                    type="text"
                    required
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    placeholder="Jordan Miller"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <div>
                  <label htmlFor="wf-lead-company" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Company
                  </label>
                  <input
                    id="wf-lead-company"
                    type="text"
                    value={lead.company}
                    onChange={(e) => setLead({ ...lead, company: e.target.value })}
                    placeholder="Northstar Services"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <div>
                  <label htmlFor="wf-lead-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Email *
                  </label>
                  <input
                    id="wf-lead-email"
                    type="email"
                    required
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    placeholder="you@yourcompany.com"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <div>
                  <label htmlFor="wf-lead-phone" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Phone
                  </label>
                  <input
                    id="wf-lead-phone"
                    type="tel"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="wf-lead-goal" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    What should we automate first? *
                  </label>
                  <select
                    id="wf-lead-goal"
                    required
                    value={lead.goal}
                    onChange={(e) => setLead({ ...lead, goal: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <option value="">Select an automation goal...</option>
                    {AUTOMATION_GOALS.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="wf-lead-notes" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    Anything else we should know?
                  </label>
                  <textarea
                    id="wf-lead-notes"
                    rows={5}
                    value={lead.notes}
                    onChange={(e) => setLead({ ...lead, notes: e.target.value })}
                    placeholder="Tools you already use, how many steps are manual today, deadlines..."
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>

                {/* Honeypot -- hidden from real visitors, catches bots that fill every field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="wf-lead-website">Website</label>
                  <input
                    id="wf-lead-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={lead.website}
                    onChange={(e) => setLead({ ...lead, website: e.target.value })}
                  />
                </div>

                {leadError && (
                  <div className="md:col-span-2 p-4 rounded-lg text-sm font-semibold" style={{ backgroundColor: colors.error + '15', color: colors.error }}>
                    {leadError}
                  </div>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={leadSending}
                    className="w-full py-4 rounded-lg font-bold text-white text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {leadSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {leadSending ? 'Sending...' : 'Send My Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Workflow detail modal */}
      {detailWorkflow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDetailWorkflow(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{detailWorkflow.name}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Trigger: {detailWorkflow.trigger}</p>
              </div>
              <button
                onClick={() => setDetailWorkflow(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                detailWorkflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {detailWorkflow.status}
              </span>
              <span className="text-sm font-semibold" style={{ color: colors.primary }}>{detailWorkflow.runs} successful runs</span>
              <button
                onClick={() => toggleStatus(detailWorkflow)}
                className="ml-auto px-3 py-1.5 rounded-lg border text-sm font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {detailWorkflow.status === 'Active' ? 'Pause Workflow' : 'Resume Workflow'}
              </button>
            </div>

            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Action Sequence</h4>
            <div className="space-y-2 mb-6">
              {detailWorkflow.actions.map((action, index) => {
                const Icon = actionIcon(action)
                return (
                  <div key={`${action}-${index}`} className="p-3 rounded-lg border flex items-center gap-3" style={{ borderColor: colors.border }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: colors.secondary }}>
                      {index + 1}
                    </span>
                    <Icon className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                    <span className="font-medium text-sm" style={{ color: colors.text }}>{action}</span>
                  </div>
                )
              })}
            </div>

            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Recent Runs</h4>
            <div className="space-y-2 mb-6">
              {runsFor(detailWorkflow.id).length === 0 ? (
                <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
                  No runs recorded yet. Use Run Now to execute this workflow and build history.
                </p>
              ) : (
                runsFor(detailWorkflow.id).map((run) => (
                  <button
                    key={run.id}
                    onClick={() => { setSelectedRun(run); setDetailWorkflow(null) }}
                    className="w-full p-3 rounded-lg flex items-center justify-between text-left hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.backgroundAlt }}
                  >
                    <div className="flex items-center gap-3">
                      {run.status === 'Completed' ? (
                        <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      ) : (
                        <XCircle className="w-4 h-4" style={{ color: colors.error }} />
                      )}
                      <span className="font-semibold text-sm" style={{ color: colors.text }}>{run.status}</span>
                      <span className="text-xs" style={{ color: colors.textLight }}>{run.source}</span>
                    </div>
                    <div className="text-xs text-right" style={{ color: colors.textLight }}>
                      <span className="block">{formatRelative(run.startedAt, now)}</span>
                      <span className="block">{run.durationSec}s</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setDetailWorkflow(null)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Close
              </button>
              <button
                onClick={() => startRun(detailWorkflow)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Play className="w-4 h-4" style={{ color: colors.success }} />
                Run Now
              </button>
              <button
                onClick={() => openEdit(detailWorkflow)}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Edit Workflow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow settings modal */}
      {settingsDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => { setSettingsDraft(null); setConfirmDelete(false) }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>Workflow Settings</h3>
              <button
                onClick={() => { setSettingsDraft(null); setConfirmDelete(false) }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
              Workflow name
              <input
                type="text"
                value={settingsDraft.name}
                onChange={(e) => setSettingsDraft({ ...settingsDraft, name: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-lg border-2 font-normal focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              />
            </label>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => setSettingsDraft({ ...settingsDraft, notifyFailure: !settingsDraft.notifyFailure })}
                className="w-full p-3 rounded-lg border flex items-center justify-between hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border }}
              >
                <span className="text-sm font-medium" style={{ color: colors.text }}>Notify me when a run fails</span>
                <span
                  className={`w-11 h-6 rounded-full relative transition-colors ${settingsDraft.notifyFailure ? '' : 'bg-gray-300'}`}
                  style={settingsDraft.notifyFailure ? { backgroundColor: colors.success } : undefined}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settingsDraft.notifyFailure ? 'right-0.5' : 'left-0.5'}`} />
                </span>
              </button>
              <button
                onClick={() => setSettingsDraft({ ...settingsDraft, notifySuccess: !settingsDraft.notifySuccess })}
                className="w-full p-3 rounded-lg border flex items-center justify-between hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border }}
              >
                <span className="text-sm font-medium" style={{ color: colors.text }}>Notify me on every successful run</span>
                <span
                  className={`w-11 h-6 rounded-full relative transition-colors ${settingsDraft.notifySuccess ? '' : 'bg-gray-300'}`}
                  style={settingsDraft.notifySuccess ? { backgroundColor: colors.success } : undefined}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settingsDraft.notifySuccess ? 'right-0.5' : 'left-0.5'}`} />
                </span>
              </button>
              <button
                onClick={() => setSettingsDraft({ ...settingsDraft, status: settingsDraft.status === 'Active' ? 'Paused' : 'Active' })}
                className="w-full p-3 rounded-lg border flex items-center justify-between hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border }}
              >
                <span className="text-sm font-medium" style={{ color: colors.text }}>Workflow is active</span>
                <span
                  className={`w-11 h-6 rounded-full relative transition-colors ${settingsDraft.status === 'Active' ? '' : 'bg-gray-300'}`}
                  style={settingsDraft.status === 'Active' ? { backgroundColor: colors.success } : undefined}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settingsDraft.status === 'Active' ? 'right-0.5' : 'left-0.5'}`} />
                </span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: colors.border }}>
              <button
                onClick={() => duplicateWorkflow(settingsDraft)}
                className="w-full p-3 rounded-lg border font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Copy className="w-4 h-4" />
                Duplicate Workflow
              </button>

              {confirmDelete ? (
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.error + '10' }}>
                  <p className="text-sm font-semibold mb-3" style={{ color: colors.error }}>
                    Delete {settingsDraft.name}? Its run history stays in the log.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 py-2 rounded-lg border font-semibold text-sm hover:bg-white transition-colors"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      Keep It
                    </button>
                    <button
                      onClick={() => deleteWorkflow(settingsDraft)}
                      className="flex-1 py-2 rounded-lg font-semibold text-sm text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: colors.error }}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full p-3 rounded-lg border font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                  style={{ borderColor: colors.error, color: colors.error }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Workflow
                </button>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setSettingsDraft(null); setConfirmDelete(false) }}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: colors.primary }}
                disabled={!settingsDraft.name.trim()}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setPreviewTemplate(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{previewTemplate.name}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>{previewTemplate.description}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close template preview"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <div className="p-4 rounded-lg mb-4 flex items-center gap-3" style={{ backgroundColor: colors.backgroundAlt }}>
              <Zap className="w-5 h-5 shrink-0" style={{ color: colors.accent }} />
              <span className="text-sm font-semibold" style={{ color: colors.text }}>
                {previewTemplate.trigger || 'Pick your own trigger in the builder'}
              </span>
            </div>

            {previewTemplate.actions.length === 0 ? (
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                This one starts empty so you can choose every step yourself in the builder.
              </p>
            ) : (
              <div className="space-y-2 mb-6">
                {previewTemplate.actions.map((action, index) => {
                  const Icon = actionIcon(action)
                  return (
                    <div key={`${action}-${index}`} className="p-3 rounded-lg border flex items-center gap-3" style={{ borderColor: colors.border }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: colors.secondary }}>
                        {index + 1}
                      </span>
                      <Icon className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                      <span className="font-medium text-sm" style={{ color: colors.text }}>{action}</span>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Close
              </button>
              <button
                onClick={() => openTemplate(previewTemplate)}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Use Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live run modal */}
      {runState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                {runState.done ? 'Run complete' : 'Running workflow'}
              </h3>
              {runState.done && (
                <button
                  onClick={() => setRunState(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close run"
                >
                  <X className="w-5 h-5" style={{ color: colors.textLight }} />
                </button>
              )}
            </div>
            <p className="text-sm mb-5" style={{ color: colors.textLight }}>
              {runState.workflow.name} • {runState.workflow.trigger}
            </p>

            <div className="space-y-2 mb-5">
              {runState.workflow.actions.map((action, index) => {
                const Icon = actionIcon(action)
                const complete = index < runState.stepIndex
                const running = index === runState.stepIndex && !runState.done
                return (
                  <div
                    key={`${action}-${index}`}
                    className="p-3 rounded-lg border flex items-center gap-3 transition-colors"
                    style={{
                      borderColor: complete ? colors.success : running ? colors.primary : colors.border,
                      backgroundColor: complete ? colors.success + '10' : 'transparent',
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                    <span className="font-medium text-sm flex-1" style={{ color: colors.text }}>{action}</span>
                    {complete ? (
                      <CheckCircle className="w-5 h-5 shrink-0" style={{ color: colors.success }} />
                    ) : running ? (
                      <Loader2 className="w-5 h-5 shrink-0 animate-spin" style={{ color: colors.primary }} />
                    ) : (
                      <Clock className="w-5 h-5 shrink-0" style={{ color: colors.border }} />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="p-3 rounded-lg text-xs mb-5" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
              Demo run. Steps execute against sample data, so no live emails, texts, or invoices leave the demo.
            </div>

            {runState.done ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setRunState(null)}
                  className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setRunState(null)
                    setActiveTab('history')
                    setHistoryStatus('all')
                    setHistoryWorkflow(runState.workflow.id)
                    setHistoryPage(1)
                  }}
                  className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  View Run History
                </button>
              </div>
            ) : (
              <p className="text-sm font-semibold text-center" style={{ color: colors.primary }}>
                Step {Math.min(runState.stepIndex + 1, runState.workflow.actions.length)} of {runState.workflow.actions.length}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Run log detail modal */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedRun(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{selectedRun.workflowName}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                  {formatClock(selectedRun.startedAt)} • {selectedRun.source} • {selectedRun.durationSec}s
                </p>
              </div>
              <button
                onClick={() => setSelectedRun(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close run log"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusPill(selectedRun.status)}`}>{selectedRun.status}</span>
              <span className="text-xs" style={{ color: colors.textLight }}>Trigger: {selectedRun.trigger}</span>
            </div>

            {selectedRun.failureReason && (
              <div className="p-4 rounded-lg mb-5 text-sm font-semibold" style={{ backgroundColor: colors.error + '15', color: colors.error }}>
                {selectedRun.failureReason}
              </div>
            )}

            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Step Trace</h4>
            <div className="space-y-2 mb-6">
              {selectedRun.steps.map((step, index) => {
                const Icon = actionIcon(step.label)
                return (
                  <div key={`${step.label}-${index}`} className="p-3 rounded-lg border flex items-center gap-3" style={{ borderColor: colors.border }}>
                    <Icon className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                    <span className="font-medium text-sm flex-1" style={{ color: colors.text }}>{step.label}</span>
                    {step.status === 'ok' && <CheckCircle className="w-5 h-5 shrink-0" style={{ color: colors.success }} />}
                    {step.status === 'failed' && <XCircle className="w-5 h-5 shrink-0" style={{ color: colors.error }} />}
                    {step.status === 'skipped' && <MinusCircle className="w-5 h-5 shrink-0" style={{ color: colors.textLight }} />}
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedRun(null)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  const workflow = workflows.find((w) => w.id === selectedRun.workflowId)
                  if (!workflow) {
                    showToast('That workflow was deleted, so it cannot be run again')
                    return
                  }
                  setSelectedRun(null)
                  startRun(workflow)
                }}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Run Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear history confirm */}
      {confirmClearHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setConfirmClearHistory(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>Clear run history?</h3>
            <p className="text-sm mb-6" style={{ color: colors.textLight }}>
              This removes every logged run from this demo. Your workflows stay exactly as they are.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmClearHistory(false)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRuns([])
                  setHistoryPage(1)
                  setConfirmClearHistory(false)
                  showToast('Run history cleared')
                }}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.error }}
              >
                Clear It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] px-5 py-3 rounded-lg shadow-xl text-white font-semibold flex items-center gap-2" style={{ backgroundColor: colors.text }}>
          <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
          {toast}
        </div>
      )}
    </div>
  )
}
