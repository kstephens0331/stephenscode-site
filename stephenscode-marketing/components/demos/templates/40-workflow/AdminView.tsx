'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Activity, Zap, Plus, X, CheckCircle, XCircle, MinusCircle, RefreshCw, Download, Search, ChevronLeft, ChevronRight, Loader2, Eye, EyeOff, Play, Pause, RotateCcw } from 'lucide-react'
import {
  AVAILABLE_INTEGRATIONS,
  DEFAULT_INTEGRATIONS,
  DEFAULT_WORKFLOWS,
  SYNC_FREQUENCIES,
  actionIcon,
  buildSteps,
  formatClock,
  formatRelative,
  loadIntegrations,
  loadRuns,
  loadWorkflows,
  saveIntegrations,
  saveRuns,
  saveWorkflows,
  successRate,
  type Integration,
  type RunLog,
  type Workflow,
} from './store'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

const LOG_PAGE_SIZE = 6

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [hydrated, setHydrated] = useState(false)
  const [integrations, setIntegrations] = useState<Integration[]>(DEFAULT_INTEGRATIONS)
  const [runs, setRuns] = useState<RunLog[]>([])
  const [workflows, setWorkflows] = useState<Workflow[]>(DEFAULT_WORKFLOWS)
  const [toast, setToast] = useState<string | null>(null)

  const [configuring, setConfiguring] = useState<Integration | null>(null)
  const [revealKey, setRevealKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [showAddIntegration, setShowAddIntegration] = useState(false)

  const [logStatus, setLogStatus] = useState<'all' | 'Completed' | 'Failed'>('all')
  const [logSearch, setLogSearch] = useState('')
  const [logPage, setLogPage] = useState(1)
  const [selectedRun, setSelectedRun] = useState<RunLog | null>(null)

  const toastTimer = useRef<number | null>(null)
  const testTimer = useRef<number | null>(null)

  useEffect(() => {
    const storedWorkflows = loadWorkflows()
    setWorkflows(storedWorkflows)
    setRuns(loadRuns(storedWorkflows))
    setIntegrations(loadIntegrations())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveIntegrations(integrations)
  }, [integrations, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveRuns(runs)
  }, [runs, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveWorkflows(workflows)
  }, [workflows, hydrated])

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    if (testTimer.current) window.clearTimeout(testTimer.current)
  }, [])

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3000)
  }

  const now = Date.now()
  const demoAccount = 'ops@northstar-demo.test'
  const connectedCount = integrations.filter((i) => i.connected).length
  const failedCount = runs.filter((r) => r.status === 'Failed').length

  const filteredRuns = useMemo(() => runs.filter((run) => {
    if (logStatus !== 'all' && run.status !== logStatus) return false
    if (logSearch.trim() && !run.workflowName.toLowerCase().includes(logSearch.trim().toLowerCase())) return false
    return true
  }), [runs, logStatus, logSearch])

  const totalPages = Math.max(1, Math.ceil(filteredRuns.length / LOG_PAGE_SIZE))
  const currentPage = Math.min(logPage, totalPages)
  const pagedRuns = filteredRuns.slice((currentPage - 1) * LOG_PAGE_SIZE, currentPage * LOG_PAGE_SIZE)

  const refreshData = () => {
    const storedWorkflows = loadWorkflows()
    setWorkflows(storedWorkflows)
    setRuns(loadRuns(storedWorkflows))
    setIntegrations(loadIntegrations())
    showToast('Console refreshed with the latest demo data')
  }

  const toggleIntegration = (integration: Integration) => {
    const nextConnected = !integration.connected
    const nextAccount = nextConnected && integration.account === 'Not linked yet' ? demoAccount : integration.account
    const nextSync = nextConnected ? 0 : integration.lastSyncMinutes
    setIntegrations((prev) => prev.map((i) => (i.id === integration.id
      ? { ...i, connected: nextConnected, lastSyncMinutes: nextSync, account: nextAccount }
      : i)))
    setConfiguring((prev) => (prev && prev.id === integration.id
      ? { ...prev, connected: nextConnected, lastSyncMinutes: nextSync, account: nextAccount }
      : prev))
    showToast(nextConnected ? `${integration.name} connected` : `${integration.name} disconnected`)
  }

  const saveIntegrationDraft = () => {
    if (!configuring) return
    setIntegrations((prev) => prev.map((i) => (i.id === configuring.id ? configuring : i)))
    setConfiguring(null)
    setRevealKey(false)
    setTestResult(null)
    showToast(`${configuring.name} settings saved`)
  }

  const testConnection = () => {
    if (!configuring || testing) return
    const connected = configuring.connected
    setTesting(true)
    setTestResult(null)
    if (testTimer.current) window.clearTimeout(testTimer.current)
    testTimer.current = window.setTimeout(() => {
      setTesting(false)
      setTestResult(connected
        ? { ok: true, message: 'Handshake succeeded. Sample payload accepted in 412ms.' }
        : { ok: false, message: 'This integration is switched off. Turn it on above, then test again.' })
    }, 900)
  }

  const addIntegration = (integration: Integration) => {
    setIntegrations((prev) => [...prev, {
      ...integration,
      connected: true,
      account: demoAccount,
      lastSyncMinutes: 0,
    }])
    setShowAddIntegration(false)
    showToast(`${integration.name} added and connected`)
  }

  const retryRun = (run: RunLog) => {
    const retried: RunLog = {
      id: `retry-${Date.now()}`,
      workflowId: run.workflowId,
      workflowName: run.workflowName,
      status: 'Completed',
      startedAt: Date.now(),
      durationSec: Number((run.durationSec + 1.4).toFixed(1)),
      steps: buildSteps(run.steps.map((s) => s.label)),
      trigger: run.trigger,
      source: 'Retry',
    }
    setRuns((prev) => [retried, ...prev])
    setWorkflows((prev) => prev.map((w) => (w.id === run.workflowId ? { ...w, runs: w.runs + 1 } : w)))
    setSelectedRun(retried)
    setLogPage(1)
    showToast(`${run.workflowName} re-ran successfully`)
  }

  const toggleWorkflow = (workflow: Workflow) => {
    const nextStatus: Workflow['status'] = workflow.status === 'Active' ? 'Paused' : 'Active'
    setWorkflows((prev) => prev.map((w) => (w.id === workflow.id ? { ...w, status: nextStatus } : w)))
    showToast(nextStatus === 'Active' ? `${workflow.name} resumed` : `${workflow.name} paused`)
  }

  const exportLogs = () => {
    if (filteredRuns.length === 0) {
      showToast('There are no logs matching the current filters')
      return
    }
    const header = 'Run ID,Workflow,Status,Source,Started,Duration (s),Steps\n'
    const body = filteredRuns.map((run) => [
      run.id,
      `"${run.workflowName.replace(/"/g, '""')}"`,
      run.status,
      run.source,
      `"${formatClock(run.startedAt)}"`,
      run.durationSec,
      run.steps.length,
    ].join(',')).join('\n')

    try {
      const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'workflow-execution-logs.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showToast(`Exported ${filteredRuns.length} log rows to CSV`)
    } catch {
      showToast('This browser blocked the download, so the export was skipped')
    }
  }

  const statusPill = (status: RunLog['status']) =>
    status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

  const unusedIntegrations = AVAILABLE_INTEGRATIONS.filter((available) => !integrations.some((i) => i.id === available.id))

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Automation Administration</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Integrations, execution logs, and workflow controls for {demo.name}</p>
            </div>
            <button
              onClick={refreshData}
              className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Runs Logged', value: runs.length.toLocaleString(), color: colors.primary, filter: 'all' as const },
            { label: 'Success Rate', value: successRate(runs), color: colors.success, filter: 'Completed' as const },
            { label: 'Failed Runs', value: String(failedCount), color: colors.error, filter: 'Failed' as const },
            { label: 'Connected Integrations', value: `${connectedCount}/${integrations.length}`, color: colors.secondary, filter: null },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => {
                if (stat.filter) {
                  setLogStatus(stat.filter)
                  setLogPage(1)
                  showToast(stat.filter === 'all' ? 'Showing every logged run' : `Filtered logs to ${stat.filter.toLowerCase()} runs`)
                } else {
                  setShowAddIntegration(true)
                }
              }}
              className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Integration Hub */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Integration Hub</h2>
              <button
                onClick={() => setShowAddIntegration(true)}
                className="px-3 py-2 rounded-lg border font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Plus className="w-4 h-4" />
                Add Integration
              </button>
            </div>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" style={{ color: integration.connected ? colors.primary : colors.textLight }} />
                      <div>
                        <span className="font-semibold block" style={{ color: colors.text }}>{integration.name}</span>
                        <span className="text-xs" style={{ color: colors.textLight }}>{integration.category} • {integration.description}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      integration.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {integration.connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: colors.textLight }}>
                    <span>{integration.account}</span>
                    <span>{integration.connected ? `Synced ${integration.lastSyncMinutes === 0 ? 'just now' : `${integration.lastSyncMinutes} min ago`}` : 'Sync paused'}</span>
                    <span>{integration.eventsToday} events today</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => { setConfiguring({ ...integration }); setRevealKey(false); setTestResult(null) }}
                      className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      Configure
                    </button>
                    <button
                      onClick={() => toggleIntegration(integration)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: integration.connected ? colors.textLight : colors.primary }}
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Logs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Execution Logs</h2>
              <button
                onClick={exportLogs}
                className="px-3 py-2 rounded-lg border font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
              <input
                type="text"
                value={logSearch}
                onChange={(e) => { setLogSearch(e.target.value); setLogPage(1) }}
                placeholder="Search logs by workflow name"
                aria-label="Search execution logs"
                className="w-full pl-9 pr-3 py-2 rounded-lg border-2 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {(['all', 'Completed', 'Failed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => { setLogStatus(status); setLogPage(1) }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                  style={{
                    borderColor: logStatus === status ? colors.primary : colors.border,
                    backgroundColor: logStatus === status ? colors.primary : 'transparent',
                    color: logStatus === status ? '#ffffff' : colors.text,
                  }}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
              <span className="text-xs ml-auto" style={{ color: colors.textLight }}>
                {filteredRuns.length} matching
              </span>
            </div>

            {pagedRuns.length === 0 ? (
              <div className="p-8 text-center rounded-lg border-2 border-dashed" style={{ borderColor: colors.border }}>
                <Activity className="w-7 h-7 mx-auto mb-3" style={{ color: colors.textLight }} />
                <p className="font-semibold mb-1" style={{ color: colors.text }}>No logs match these filters</p>
                <button
                  onClick={() => { setLogStatus('all'); setLogSearch(''); setLogPage(1) }}
                  className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedRuns.map((log) => (
                    <button
                      key={log.id}
                      onClick={() => setSelectedRun(log)}
                      className="w-full p-4 rounded-lg text-left hover:shadow-md transition-shadow"
                      style={{ backgroundColor: colors.backgroundAlt }}
                    >
                      <div className="flex items-center justify-between mb-1 gap-3">
                        <span className="font-semibold truncate" style={{ color: colors.text }}>{log.workflowName}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold shrink-0 ${statusPill(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: colors.textLight }}>
                        {formatRelative(log.startedAt, now)} • {log.source} • {log.durationSec}s
                      </p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={() => setLogPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 flex items-center gap-1"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <span className="text-xs font-semibold" style={{ color: colors.textLight }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setLogPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 flex items-center gap-1"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Workflow control */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Workflow Control</h2>
          {workflows.length === 0 ? (
            <p className="text-sm" style={{ color: colors.textLight }}>
              Every workflow has been deleted in the customer view. Create one there and it will show up here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflows.map((workflow) => {
                const lastRun = runs.find((r) => r.workflowId === workflow.id)
                return (
                  <div key={workflow.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="font-semibold block" style={{ color: colors.text }}>{workflow.name}</span>
                        <span className="text-xs" style={{ color: colors.textLight }}>{workflow.actions.length} actions • {workflow.runs} runs</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                        workflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: colors.textLight }}>
                      {lastRun ? `Last run ${formatRelative(lastRun.startedAt, now)} (${lastRun.status})` : 'No runs logged yet'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleWorkflow(workflow)}
                        className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        {workflow.status === 'Active' ? (
                          <><Pause className="w-4 h-4" style={{ color: colors.warning }} /> Pause</>
                        ) : (
                          <><Play className="w-4 h-4" style={{ color: colors.success }} /> Resume</>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (!lastRun) {
                            showToast(`${workflow.name} has no logged runs yet`)
                            return
                          }
                          setSelectedRun(lastRun)
                        }}
                        className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        View Last Run
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Integration configure modal */}
      {configuring && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => { setConfiguring(null); setRevealKey(false); setTestResult(null) }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{configuring.name}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>{configuring.description}</p>
              </div>
              <button
                onClick={() => { setConfiguring(null); setRevealKey(false); setTestResult(null) }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close integration settings"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <button
              onClick={() => toggleIntegration(configuring)}
              className="w-full p-3 rounded-lg border flex items-center justify-between hover:bg-gray-50 transition-colors mb-4"
              style={{ borderColor: colors.border }}
            >
              <span className="text-sm font-medium" style={{ color: colors.text }}>Integration enabled</span>
              <span
                className={`w-11 h-6 rounded-full relative transition-colors ${configuring.connected ? '' : 'bg-gray-300'}`}
                style={configuring.connected ? { backgroundColor: colors.success } : undefined}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${configuring.connected ? 'right-0.5' : 'left-0.5'}`} />
              </span>
            </button>

            <label className="block text-sm font-semibold mb-4" style={{ color: colors.text }}>
              Connected account
              <input
                type="text"
                value={configuring.account}
                onChange={(e) => setConfiguring({ ...configuring, account: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-lg border-2 font-normal focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              />
            </label>

            <label className="block text-sm font-semibold mb-4" style={{ color: colors.text }}>
              Sync frequency
              <select
                value={configuring.syncFrequency}
                onChange={(e) => setConfiguring({ ...configuring, syncFrequency: e.target.value })}
                className="mt-2 w-full px-4 py-3 rounded-lg border-2 font-normal focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {SYNC_FREQUENCIES.map((frequency) => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
            </label>

            <div className="mb-4">
              <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>API key</span>
              <div className="flex items-center gap-2 p-3 rounded-lg border-2" style={{ borderColor: colors.border }}>
                <code className="text-sm flex-1 truncate" style={{ color: colors.text }}>
                  {revealKey ? configuring.apiKey : `${configuring.apiKey.slice(0, 8)}••••••••`}
                </code>
                <button
                  onClick={() => setRevealKey(!revealKey)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label={revealKey ? 'Hide API key' : 'Reveal API key'}
                >
                  {revealKey ? <EyeOff className="w-4 h-4" style={{ color: colors.textLight }} /> : <Eye className="w-4 h-4" style={{ color: colors.textLight }} />}
                </button>
              </div>
              <p className="text-xs mt-2" style={{ color: colors.textLight }}>Sample key for this demo workspace.</p>
            </div>

            <button
              onClick={testConnection}
              disabled={testing}
              className="w-full py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
              {testing ? 'Testing connection...' : 'Test Connection'}
            </button>

            {testResult && (
              <div
                className="mt-3 p-3 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: (testResult.ok ? colors.success : colors.warning) + '15',
                  color: testResult.ok ? colors.success : colors.warning,
                }}
              >
                {testResult.message}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setConfiguring(null); setRevealKey(false); setTestResult(null) }}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveIntegrationDraft}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add integration modal */}
      {showAddIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAddIntegration(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>Add an Integration</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Connect another service so workflows can use its actions.</p>
              </div>
              <button
                onClick={() => setShowAddIntegration(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close integration picker"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            {unusedIntegrations.length === 0 ? (
              <p className="text-sm p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
                Every service in the demo catalog is already in your hub. Use Configure on any card to adjust it.
              </p>
            ) : (
              <div className="space-y-3">
                {unusedIntegrations.map((integration) => (
                  <button
                    key={integration.id}
                    onClick={() => addIntegration(integration)}
                    className="w-full p-4 rounded-lg border text-left hover:shadow-sm transition-shadow flex items-start gap-3"
                    style={{ borderColor: colors.border }}
                  >
                    <Zap className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                    <span>
                      <span className="block font-semibold text-sm" style={{ color: colors.text }}>{integration.name}</span>
                      <span className="block text-xs" style={{ color: colors.textLight }}>{integration.category} • {integration.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAddIntegration(false)}
              className="w-full mt-6 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Log detail modal */}
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
                aria-label="Close log detail"
              >
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusPill(selectedRun.status)}`}>{selectedRun.status}</span>
              <span className="text-xs" style={{ color: colors.textLight }}>Run ID: {selectedRun.id}</span>
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
                onClick={() => retryRun(selectedRun)}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <RotateCcw className="w-4 h-4" />
                {selectedRun.status === 'Failed' ? 'Retry Run' : 'Run Again'}
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
