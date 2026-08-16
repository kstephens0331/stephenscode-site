'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  BarChart3, Download, Settings, Plus, Eye,
  X, Trash2, RotateCcw, ChevronRight, LayoutGrid, CalendarClock, FileText
} from 'lucide-react'
import { csvBlob, downloadBlob, jsonBlob, pdfBlob, slugify, xlsBlob } from './exportUtils'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface Report {
  id: string
  name: string
  type: string
  lastRun: string
  status: 'Ready' | 'Processing'
  metrics: string[]
  schedule: string
}

interface Widget {
  id: string
  name: string
  type: string
  enabled: boolean
  size: string
  refresh: string
}

interface ScheduledExport {
  id: string
  report: string
  frequency: string
  format: string
  nextRun: string
}

interface ActivityEntry {
  id: string
  action: string
  time: string
  user: string
}

const STORAGE_KEY = 'scdemo-analytics-admin'

const REPORT_TYPES = ['Sales', 'Customers', 'Products', 'Marketing', 'Finance']
const WIDGET_TYPES = ['Chart', 'Table', 'Pie Chart', 'Funnel', 'Metric', 'Heatmap']
const WIDGET_SIZES = ['Small', 'Medium', 'Large']
const REFRESH_RATES = ['Real time', 'Every 15 minutes', 'Hourly', 'Daily']
const SCHEDULE_OPTIONS = ['Manual', 'Daily', 'Weekly', 'Monthly', 'Quarterly']
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly']
const EXPORT_FORMATS = ['PDF', 'Excel', 'CSV', 'JSON']

const METRIC_OPTIONS: Record<string, string[]> = {
  Sales: ['Revenue', 'Orders', 'Average Order Value', 'Refunds', 'Discounts'],
  Customers: ['New Customers', 'Returning Customers', 'Churn Rate', 'Lifetime Value', 'Sessions'],
  Products: ['Units Sold', 'Revenue by SKU', 'Stock Turnover', 'Return Rate', 'Margin'],
  Marketing: ['Sessions', 'Conversion Rate', 'Cost per Acquisition', 'Return on Ad Spend', 'Attributed Revenue'],
  Finance: ['Gross Revenue', 'Net Revenue', 'Gross Margin', 'Operating Cost', 'Cash Collected'],
}

const TYPE_DATASETS: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  Sales: {
    headers: ['Period', 'Revenue', 'Orders', 'Average Order Value', 'Refunds'],
    rows: [
      ['Week 1', 46200, 1218, 37.93, 620],
      ['Week 2', 48900, 1285, 38.05, 540],
      ['Week 3', 51300, 1342, 38.23, 710],
      ['Week 4', 50080, 1257, 39.84, 480],
    ],
  },
  Customers: {
    headers: ['Segment', 'New Customers', 'Returning', 'Churn Rate', 'Lifetime Value'],
    rows: [
      ['First-time buyers', 1840, 0, '0.0%', 118],
      ['Repeat buyers', 0, 2470, '3.2%', 412],
      ['Subscribers', 610, 1980, '2.1%', 688],
      ['Wholesale', 74, 212, '1.4%', 2340],
    ],
  },
  Products: {
    headers: ['Product', 'Units Sold', 'Revenue', 'Return Rate', 'Margin'],
    rows: [
      ['Premium Package', 234, 23400, '1.8%', '62%'],
      ['Standard Plan', 189, 18900, '2.1%', '58%'],
      ['Basic Service', 156, 7800, '2.6%', '51%'],
      ['Add-on Feature', 98, 4900, '1.2%', '71%'],
    ],
  },
  Marketing: {
    headers: ['Channel', 'Sessions', 'Conversion Rate', 'Cost per Acquisition', 'Attributed Revenue'],
    rows: [
      ['Organic Search', 51071, '5.6%', 0, 92400],
      ['Direct', 22589, '6.2%', 0, 41800],
      ['Paid Search', 14732, '3.3%', 28.4, 33150],
      ['Referral', 9822, '4.4%', 11.2, 18620],
    ],
  },
  Finance: {
    headers: ['Month', 'Gross Revenue', 'Net Revenue', 'Gross Margin', 'Operating Cost'],
    rows: [
      ['April', 184300, 171400, '59%', 74800],
      ['May', 192600, 179250, '60%', 76200],
      ['June', 194320, 181900, '61%', 75450],
    ],
  },
}

const REPORT_TEMPLATES = [
  { name: 'Weekly Sales Snapshot', type: 'Sales', metrics: ['Revenue', 'Orders', 'Average Order Value'], schedule: 'Weekly', blurb: 'Revenue, order count, and average order value rolled up week over week.' },
  { name: 'Customer Retention Cohorts', type: 'Customers', metrics: ['Returning Customers', 'Churn Rate', 'Lifetime Value'], schedule: 'Monthly', blurb: 'Repeat purchase behavior and churn by signup cohort.' },
  { name: 'Channel ROI Breakdown', type: 'Marketing', metrics: ['Cost per Acquisition', 'Return on Ad Spend', 'Attributed Revenue'], schedule: 'Weekly', blurb: 'Spend against attributed revenue for every acquisition channel.' },
  { name: 'Margin by Product Line', type: 'Products', metrics: ['Units Sold', 'Margin', 'Return Rate'], schedule: 'Monthly', blurb: 'Unit economics and return rate for each product line.' },
]

const SEED_REPORTS: Report[] = [
  { id: 'r1', name: 'Monthly Sales Report', type: 'Sales', lastRun: '2 hours ago', status: 'Ready', metrics: ['Revenue', 'Orders', 'Average Order Value'], schedule: 'Monthly' },
  { id: 'r2', name: 'Customer Behavior Analysis', type: 'Customers', lastRun: '1 day ago', status: 'Ready', metrics: ['New Customers', 'Returning Customers', 'Sessions'], schedule: 'Weekly' },
  { id: 'r3', name: 'Product Performance', type: 'Products', lastRun: '3 hours ago', status: 'Ready', metrics: ['Units Sold', 'Revenue by SKU', 'Margin'], schedule: 'Weekly' },
  { id: 'r4', name: 'Marketing ROI', type: 'Marketing', lastRun: '5 hours ago', status: 'Ready', metrics: ['Cost per Acquisition', 'Return on Ad Spend'], schedule: 'Monthly' },
]

const SEED_WIDGETS: Widget[] = [
  { id: 'w1', name: 'Revenue Chart', type: 'Chart', enabled: true, size: 'Large', refresh: 'Hourly' },
  { id: 'w2', name: 'Top Products', type: 'Table', enabled: true, size: 'Medium', refresh: 'Daily' },
  { id: 'w3', name: 'Traffic Sources', type: 'Pie Chart', enabled: true, size: 'Medium', refresh: 'Hourly' },
  { id: 'w4', name: 'Conversion Funnel', type: 'Funnel', enabled: false, size: 'Large', refresh: 'Daily' },
  { id: 'w5', name: 'Customer Lifetime Value', type: 'Metric', enabled: true, size: 'Small', refresh: 'Daily' },
  { id: 'w6', name: 'Churn Rate', type: 'Metric', enabled: false, size: 'Small', refresh: 'Daily' },
]

const SEED_SCHEDULES: ScheduledExport[] = [
  { id: 's1', report: 'Monthly Sales Report', frequency: 'Monthly', format: 'PDF', nextRun: '' },
  { id: 's2', report: 'Weekly Performance', frequency: 'Weekly', format: 'Excel', nextRun: '' },
  { id: 's3', report: 'Daily Metrics', frequency: 'Daily', format: 'CSV', nextRun: '' },
]

const SEED_ACTIVITY: ActivityEntry[] = [
  { id: 'a1', action: 'Monthly Sales Report generated', time: '2 hours ago', user: 'System' },
  { id: 'a2', action: 'New dashboard created: Q4 Performance', time: '5 hours ago', user: 'Admin User' },
  { id: 'a3', action: 'Customer Behavior Analysis exported to PDF', time: '1 day ago', user: 'Marketing Team' },
  { id: 'a4', action: 'Data source updated: Google Analytics', time: '1 day ago', user: 'System' },
  { id: 'a5', action: 'Custom metric added: Customer LTV', time: '2 days ago', user: 'Admin User' },
]

function makeId(prefix: string): string {
  return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function computeNextRun(frequency: string): string {
  const days = frequency === 'Daily' ? 1 : frequency === 'Weekly' ? 7 : frequency === 'Quarterly' ? 90 : 30
  const next = new Date()
  next.setDate(next.getDate() + days)
  return formatDate(next)
}

interface ModalProps {
  title: string
  subtitle?: string
  colors: ColorPalette
  wide?: boolean
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

function Modal({ title, subtitle, colors, wide, onClose, children, footer }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[88vh] flex flex-col`}>
        <div className="flex items-start justify-between p-6 border-b" style={{ borderColor: colors.border }}>
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{title}</h3>
            {subtitle && <p className="text-sm mt-1" style={{ color: colors.textLight }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" style={{ color: colors.textLight }} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && (
          <div className="p-6 pt-0 flex gap-3 flex-wrap">{footer}</div>
        )}
      </div>
    </div>
  )
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const [reports, setReports] = useState<Report[]>(SEED_REPORTS)
  const [widgets, setWidgets] = useState<Widget[]>(SEED_WIDGETS)
  const [schedules, setSchedules] = useState<ScheduledExport[]>(SEED_SCHEDULES)
  const [activity, setActivity] = useState<ActivityEntry[]>(SEED_ACTIVITY)
  const [exportCount, setExportCount] = useState(127)
  const [loaded, setLoaded] = useState(false)

  const [toast, setToast] = useState<string | null>(null)

  const [reportModal, setReportModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [reportForm, setReportForm] = useState({ name: '', type: 'Sales', metrics: [] as string[], schedule: 'Manual' })
  const [templateModalOpen, setTemplateModalOpen] = useState(false)

  const [widgetModal, setWidgetModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [widgetForm, setWidgetForm] = useState({ name: '', type: 'Chart', size: 'Medium', refresh: 'Hourly', enabled: true })

  const [scheduleModal, setScheduleModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })
  const [scheduleForm, setScheduleForm] = useState({ report: '', frequency: 'Weekly', format: 'PDF' })

  const [exportReportId, setExportReportId] = useState(SEED_REPORTS[0].id)
  const [exportFormat, setExportFormat] = useState('CSV')
  const [exportStart, setExportStart] = useState('')
  const [exportEnd, setExportEnd] = useState('')

  const runTimers = useRef<number[]>([])

  // Load persisted admin state after mount (localStorage only exists in the browser)
  useEffect(() => {
    let restored = false
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<{
          reports: Report[]
          widgets: Widget[]
          schedules: ScheduledExport[]
          activity: ActivityEntry[]
          exportCount: number
        }>
        if (Array.isArray(parsed.reports) && parsed.reports.length) {
          // Anything left mid-run in a previous session should come back as Ready
          setReports(parsed.reports.map(r => ({ ...r, status: 'Ready' })))
        }
        if (Array.isArray(parsed.widgets) && parsed.widgets.length) setWidgets(parsed.widgets)
        if (Array.isArray(parsed.schedules)) setSchedules(parsed.schedules)
        if (Array.isArray(parsed.activity)) setActivity(parsed.activity)
        if (typeof parsed.exportCount === 'number') setExportCount(parsed.exportCount)
        restored = true
      }
    } catch {
      // Corrupt or unavailable storage -- fall back to the seeded demo data
    }

    if (!restored) {
      setSchedules(SEED_SCHEDULES.map(s => ({ ...s, nextRun: computeNextRun(s.frequency) })))
    }

    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    setExportStart(isoDate(start))
    setExportEnd(isoDate(end))
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ reports, widgets, schedules, activity, exportCount })
      )
    } catch {
      // Storage blocked or full -- in-memory state still drives the UI
    }
  }, [reports, widgets, schedules, activity, exportCount, loaded])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const timers = runTimers.current
    return () => {
      timers.forEach(id => window.clearTimeout(id))
    }
  }, [])

  const logActivity = (action: string, user = 'Admin User') => {
    setActivity(prev => [{ id: makeId('a'), action, time: 'Just now', user }, ...prev].slice(0, 14))
  }

  const metricsTracked = useMemo(
    () => new Set(reports.flatMap(r => r.metrics)).size,
    [reports]
  )
  const enabledWidgets = widgets.filter(w => w.enabled).length

  // ---- Reports --------------------------------------------------------------

  const openNewReport = () => {
    setReportForm({ name: '', type: 'Sales', metrics: ['Revenue'], schedule: 'Manual' })
    setReportModal({ open: true, id: null })
  }

  const openEditReport = (report: Report) => {
    setReportForm({ name: report.name, type: report.type, metrics: [...report.metrics], schedule: report.schedule })
    setReportModal({ open: true, id: report.id })
  }

  const toggleReportMetric = (metric: string) => {
    setReportForm(form => ({
      ...form,
      metrics: form.metrics.includes(metric)
        ? form.metrics.filter(m => m !== metric)
        : [...form.metrics, metric],
    }))
  }

  const changeReportType = (type: string) => {
    const allowed = METRIC_OPTIONS[type] ?? []
    setReportForm(form => ({
      ...form,
      type,
      metrics: form.metrics.filter(m => allowed.includes(m)),
    }))
  }

  const saveReport = () => {
    const name = reportForm.name.trim()
    if (!name) {
      setToast('Give the report a name before saving')
      return
    }
    if (reportForm.metrics.length === 0) {
      setToast('Pick at least one metric for this report')
      return
    }
    if (reportModal.id) {
      setReports(prev => prev.map(r => (r.id === reportModal.id
        ? { ...r, name, type: reportForm.type, metrics: reportForm.metrics, schedule: reportForm.schedule }
        : r)))
      logActivity(`Report updated: ${name}`)
      setToast(`${name} saved`)
    } else {
      const report: Report = {
        id: makeId('r'),
        name,
        type: reportForm.type,
        lastRun: 'Never',
        status: 'Ready',
        metrics: reportForm.metrics,
        schedule: reportForm.schedule,
      }
      setReports(prev => [report, ...prev])
      logActivity(`Report created: ${name}`)
      setToast(`${name} created`)
      setActiveTab('reports')
    }
    setReportModal({ open: false, id: null })
  }

  const deleteReport = () => {
    if (!reportModal.id) return
    const target = reports.find(r => r.id === reportModal.id)
    setReports(prev => prev.filter(r => r.id !== reportModal.id))
    if (target) {
      logActivity(`Report deleted: ${target.name}`)
      setToast(`${target.name} deleted`)
    }
    setReportModal({ open: false, id: null })
  }

  const runReport = (report: Report) => {
    if (report.status === 'Processing') return
    setReports(prev => prev.map(r => (r.id === report.id ? { ...r, status: 'Processing' } : r)))
    setToast(`${report.name} is running...`)
    const timer = window.setTimeout(() => {
      setReports(prev => prev.map(r => (r.id === report.id ? { ...r, status: 'Ready', lastRun: 'Just now' } : r)))
      logActivity(`${report.name} generated`, 'System')
      setToast(`${report.name} finished. Open the Export tab to download it.`)
    }, 1400)
    runTimers.current.push(timer)
  }

  const useTemplate = (template: typeof REPORT_TEMPLATES[number]) => {
    const report: Report = {
      id: makeId('r'),
      name: template.name,
      type: template.type,
      lastRun: 'Never',
      status: 'Ready',
      metrics: [...template.metrics],
      schedule: template.schedule,
    }
    setReports(prev => [report, ...prev])
    logActivity(`Report created from template: ${template.name}`)
    setToast(`${template.name} added to your reports`)
    setTemplateModalOpen(false)
    setActiveTab('reports')
  }

  // ---- Widgets --------------------------------------------------------------

  const openNewWidget = () => {
    setWidgetForm({ name: '', type: 'Chart', size: 'Medium', refresh: 'Hourly', enabled: true })
    setWidgetModal({ open: true, id: null })
  }

  const openEditWidget = (widget: Widget) => {
    setWidgetForm({ name: widget.name, type: widget.type, size: widget.size, refresh: widget.refresh, enabled: widget.enabled })
    setWidgetModal({ open: true, id: widget.id })
  }

  const saveWidget = () => {
    const name = widgetForm.name.trim()
    if (!name) {
      setToast('Give the widget a name before saving')
      return
    }
    if (widgetModal.id) {
      setWidgets(prev => prev.map(w => (w.id === widgetModal.id ? { ...w, ...widgetForm, name } : w)))
      logActivity(`Widget updated: ${name}`)
      setToast(`${name} saved`)
    } else {
      setWidgets(prev => [...prev, { id: makeId('w'), ...widgetForm, name }])
      logActivity(`Widget added: ${name}`)
      setToast(`${name} added to the dashboard`)
      setActiveTab('widgets')
    }
    setWidgetModal({ open: false, id: null })
  }

  const removeWidget = () => {
    if (!widgetModal.id) return
    const target = widgets.find(w => w.id === widgetModal.id)
    setWidgets(prev => prev.filter(w => w.id !== widgetModal.id))
    if (target) {
      logActivity(`Widget removed: ${target.name}`)
      setToast(`${target.name} removed`)
    }
    setWidgetModal({ open: false, id: null })
  }

  const toggleWidget = (widget: Widget) => {
    setWidgets(prev => prev.map(w => (w.id === widget.id ? { ...w, enabled: !w.enabled } : w)))
    logActivity(`${widget.name} ${widget.enabled ? 'hidden from' : 'shown on'} the dashboard`)
    setToast(`${widget.name} ${widget.enabled ? 'disabled' : 'enabled'}`)
  }

  // ---- Scheduled exports ----------------------------------------------------

  const openNewSchedule = () => {
    setScheduleForm({ report: reports[0]?.name ?? '', frequency: 'Weekly', format: 'PDF' })
    setScheduleModal({ open: true, id: null })
  }

  const openEditSchedule = (schedule: ScheduledExport) => {
    setScheduleForm({ report: schedule.report, frequency: schedule.frequency, format: schedule.format })
    setScheduleModal({ open: true, id: schedule.id })
  }

  const saveSchedule = () => {
    const report = scheduleForm.report.trim()
    if (!report) {
      setToast('Choose a report to schedule')
      return
    }
    const nextRun = computeNextRun(scheduleForm.frequency)
    if (scheduleModal.id) {
      setSchedules(prev => prev.map(s => (s.id === scheduleModal.id ? { ...s, ...scheduleForm, report, nextRun } : s)))
      logActivity(`Schedule updated: ${report} (${scheduleForm.frequency}, ${scheduleForm.format})`)
      setToast(`Schedule for ${report} updated`)
    } else {
      setSchedules(prev => [...prev, { id: makeId('s'), ...scheduleForm, report, nextRun }])
      logActivity(`Schedule created: ${report} (${scheduleForm.frequency}, ${scheduleForm.format})`)
      setToast(`${report} scheduled ${scheduleForm.frequency.toLowerCase()}`)
    }
    setScheduleModal({ open: false, id: null })
  }

  const deleteSchedule = () => {
    if (!scheduleModal.id) return
    const target = schedules.find(s => s.id === scheduleModal.id)
    setSchedules(prev => prev.filter(s => s.id !== scheduleModal.id))
    if (target) {
      logActivity(`Schedule removed: ${target.report}`)
      setToast(`Schedule for ${target.report} removed`)
    }
    setScheduleModal({ open: false, id: null })
  }

  // ---- Export ---------------------------------------------------------------

  const selectedExportReport = reports.find(r => r.id === exportReportId) ?? reports[0]

  const runExport = () => {
    if (!selectedExportReport) {
      setToast('Create a report first, then export it')
      return
    }
    const report = selectedExportReport
    const dataset = TYPE_DATASETS[report.type] ?? TYPE_DATASETS.Sales
    const rangeLabel = exportStart && exportEnd ? `${exportStart} to ${exportEnd}` : 'Full history'
    const title = `${report.name} -- ${rangeLabel}`
    const base = `${slugify(report.name)}-${slugify(rangeLabel)}`

    if (exportFormat === 'CSV') {
      downloadBlob(`${base}.csv`, csvBlob([
        [report.name],
        ['Range', rangeLabel],
        ['Metrics', report.metrics.join(' | ')],
        [],
        dataset.headers,
        ...dataset.rows,
      ]))
    } else if (exportFormat === 'Excel') {
      downloadBlob(`${base}.xls`, xlsBlob(title, [dataset.headers, ...dataset.rows]))
    } else if (exportFormat === 'JSON') {
      downloadBlob(`${base}.json`, jsonBlob({
        report: report.name,
        type: report.type,
        metrics: report.metrics,
        range: rangeLabel,
        generatedBy: demo.name,
        rows: dataset.rows.map(row =>
          Object.fromEntries(dataset.headers.map((header, index) => [header, row[index]]))
        ),
      }))
    } else {
      const lines = [
        `Range: ${rangeLabel}`,
        `Metrics: ${report.metrics.join(', ')}`,
        '',
        dataset.headers.join('  |  '),
        ...dataset.rows.map(row => row.join('  |  ')),
      ]
      downloadBlob(`${base}.pdf`, pdfBlob(title, lines))
    }

    setExportCount(count => count + 1)
    logActivity(`${report.name} exported to ${exportFormat}`)
    setToast(`${report.name} downloaded as ${exportFormat}`)
  }

  const resetDemoData = () => {
    runTimers.current.forEach(id => window.clearTimeout(id))
    // Keep the same array reference so the unmount cleanup still sees later timers
    runTimers.current.length = 0
    setReports(SEED_REPORTS)
    setWidgets(SEED_WIDGETS)
    setSchedules(SEED_SCHEDULES.map(s => ({ ...s, nextRun: computeNextRun(s.frequency) })))
    setActivity(SEED_ACTIVITY)
    setExportCount(127)
    setExportReportId(SEED_REPORTS[0].id)
    setToast('Demo data reset to its starting state')
  }

  const overviewStats = [
    { label: 'Active Reports', value: String(reports.length), icon: BarChart3, color: colors.primary, tab: 'reports' },
    { label: 'Metrics Tracked', value: String(metricsTracked), icon: Eye, color: colors.secondary, tab: 'reports' },
    { label: 'Enabled Widgets', value: `${enabledWidgets}/${widgets.length}`, icon: Settings, color: colors.accent, tab: 'widgets' },
    { label: 'Exports This Month', value: String(exportCount), icon: Download, color: colors.success, tab: 'export' },
  ]

  const editingReport = reportModal.id ? reports.find(r => r.id === reportModal.id) ?? null : null
  const editingWidget = widgetModal.id ? widgets.find(w => w.id === widgetModal.id) ?? null : null
  const editingSchedule = scheduleModal.id ? schedules.find(s => s.id === scheduleModal.id) ?? null : null

  const inputClass = 'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2'
  const inputStyle = { borderColor: colors.border, color: colors.text }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Analytics Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Configure reports and dashboards</p>
            </div>
            <button
              onClick={openNewReport}
              className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
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
              {overviewStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTab(stat.tab)}
                    className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8" style={{ color: stat.color }} />
                      <ChevronRight className="w-5 h-5" style={{ color: colors.textLight }} />
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{stat.label}</p>
                    <p className="text-3xl font-bold" style={{ color: colors.text }}>{stat.value}</p>
                  </button>
                )
              })}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={openNewReport}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <FileText className="w-6 h-6 mt-1" style={{ color: colors.primary }} />
                <div>
                  <p className="font-bold" style={{ color: colors.text }}>Build a Report</p>
                  <p className="text-sm mt-1" style={{ color: colors.textLight }}>Choose metrics, dimensions, and a run schedule.</p>
                </div>
              </button>
              <button
                onClick={openNewWidget}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <LayoutGrid className="w-6 h-6 mt-1" style={{ color: colors.secondary }} />
                <div>
                  <p className="font-bold" style={{ color: colors.text }}>Add a Widget</p>
                  <p className="text-sm mt-1" style={{ color: colors.textLight }}>Drop a new visualization onto the client dashboard.</p>
                </div>
              </button>
              <button
                onClick={openNewSchedule}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <CalendarClock className="w-6 h-6 mt-1" style={{ color: colors.accent }} />
                <div>
                  <p className="font-bold" style={{ color: colors.text }}>Schedule an Export</p>
                  <p className="text-sm mt-1" style={{ color: colors.textLight }}>Send a recurring report to the team automatically.</p>
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Activity</h2>
                <button
                  onClick={resetDemoData}
                  className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                  style={{ borderColor: colors.border, color: colors.textLight }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Demo Data
                </button>
              </div>
              <div className="space-y-4">
                {activity.map(entry => (
                  <div key={entry.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0" style={{ borderColor: colors.border }}>
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.primary }} />
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: colors.text }}>{entry.action}</p>
                      <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                        {entry.time} by {entry.user}
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
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Custom Reports</h2>
              <button
                onClick={() => setTemplateModalOpen(true)}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                Create From Template
              </button>
            </div>

            {reports.length === 0 ? (
              <div className="text-center py-12 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="font-semibold mb-2" style={{ color: colors.text }}>No reports yet</p>
                <p className="text-sm mb-4" style={{ color: colors.textLight }}>Build one from scratch or start from a template.</p>
                <button
                  onClick={openNewReport}
                  className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Build a Report
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map(report => (
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
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: colors.textLight }}>Schedule:</span>
                        <span className="font-medium" style={{ color: colors.text }}>{report.schedule}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {report.metrics.map(metric => (
                          <span
                            key={metric}
                            className="px-2 py-1 rounded-md text-xs font-medium"
                            style={{ backgroundColor: colors.backgroundAlt, color: colors.primary }}
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditReport(report)}
                        className="flex-1 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border, color: colors.text }}
                      >
                        Configure
                      </button>
                      <button
                        onClick={() => runReport(report)}
                        disabled={report.status === 'Processing'}
                        className="flex-1 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {report.status === 'Processing' ? 'Running...' : 'Run Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <h3 className="font-bold mb-3" style={{ color: colors.text }}>Create Custom Report</h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Build custom reports with your choice of metrics, dimensions, and filters.
              </p>
              <button
                onClick={openNewReport}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Start Building
              </button>
            </div>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Dashboard Widgets</h2>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                  {enabledWidgets} of {widgets.length} widgets are live on the client dashboard
                </p>
              </div>
              <button
                onClick={openNewWidget}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                Add Widget
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {widgets.map(widget => (
                <div key={widget.id} className="border rounded-xl p-6" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: colors.text }}>{widget.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{widget.type} &middot; {widget.size}</p>
                    </div>
                    <label htmlFor={`analytics-widget-toggle-${widget.id}`} className="relative inline-flex items-center cursor-pointer">
                      <input
                        id={`analytics-widget-toggle-${widget.id}`}
                        type="checkbox"
                        aria-label={`Toggle ${widget.name}`}
                        checked={widget.enabled}
                        onChange={() => toggleWidget(widget)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          backgroundColor: widget.enabled ? colors.primary : colors.border
                        }}
                      />
                    </label>
                  </div>

                  <p className="text-xs mb-4" style={{ color: colors.textLight }}>
                    Refresh: {widget.refresh} &middot; {widget.enabled ? 'Visible' : 'Hidden'}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openEditWidget(widget)}
                      className="flex-1 py-2 rounded-lg border font-medium text-sm hover:bg-gray-50 transition-colors"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <h3 className="font-bold mb-2" style={{ color: colors.text }}>Custom Widget Builder</h3>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Create custom visualizations and metrics tailored to your business needs.
              </p>
              <button
                onClick={openNewWidget}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Open Builder
              </button>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Export Options</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="analytics-export-report" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Select Report</label>
                  <select
                    id="analytics-export-report"
                    value={selectedExportReport?.id ?? ''}
                    onChange={(e) => setExportReportId(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {reports.map(report => (
                      <option key={report.id} value={report.id}>{report.name}</option>
                    ))}
                  </select>
                  {selectedExportReport && (
                    <p className="text-xs mt-2" style={{ color: colors.textLight }}>
                      {selectedExportReport.type} report &middot; {selectedExportReport.metrics.join(', ')}
                    </p>
                  )}
                </div>

                <div>
                  <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Export Format</span>
                  <div className="grid grid-cols-2 gap-3">
                    {EXPORT_FORMATS.map(format => {
                      const selected = exportFormat === format
                      return (
                        <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          aria-pressed={selected}
                          className="py-3 rounded-lg border-2 font-medium hover:shadow-md transition-all"
                          style={selected
                            ? { borderColor: colors.primary, color: '#ffffff', backgroundColor: colors.primary }
                            : { borderColor: colors.border, color: colors.text }}
                        >
                          {format}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Date Range</span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      aria-label="Start date"
                      value={exportStart}
                      onChange={(e) => setExportStart(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    />
                    <input
                      type="date"
                      aria-label="End date"
                      value={exportEnd}
                      onChange={(e) => setExportEnd(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  onClick={runExport}
                  className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
                <p className="text-xs text-center" style={{ color: colors.textLight }}>
                  The file downloads straight to this device in the format you picked.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Scheduled Exports</h2>

              {schedules.length === 0 ? (
                <div className="text-center py-10 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="font-semibold mb-1" style={{ color: colors.text }}>No scheduled exports</p>
                  <p className="text-sm" style={{ color: colors.textLight }}>Add one below to send reports on a recurring cadence.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {schedules.map(schedule => (
                    <div key={schedule.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold mb-1" style={{ color: colors.text }}>{schedule.report}</h3>
                          <p className="text-sm" style={{ color: colors.textLight }}>
                            {schedule.frequency}, {schedule.format}
                          </p>
                        </div>
                        <button
                          onClick={() => openEditSchedule(schedule)}
                          className="text-sm font-medium hover:underline"
                          style={{ color: colors.primary }}
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-sm" style={{ color: colors.textLight }}>
                        Next run: {schedule.nextRun || 'Being scheduled'}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={openNewSchedule}
                className="w-full mt-6 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                Schedule New Export
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report builder / editor */}
      {reportModal.open && (
        <Modal
          colors={colors}
          title={editingReport ? 'Configure Report' : 'Build a Report'}
          subtitle={editingReport ? editingReport.name : 'Pick a data source, metrics, and how often it runs'}
          onClose={() => setReportModal({ open: false, id: null })}
          footer={
            <>
              {editingReport && (
                <button
                  onClick={deleteReport}
                  className="px-4 py-3 rounded-lg border font-medium text-red-600 border-red-200 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
              <button
                onClick={() => setReportModal({ open: false, id: null })}
                className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveReport}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {editingReport ? 'Save Changes' : 'Create Report'}
              </button>
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="analytics-report-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Report name</label>
              <input
                id="analytics-report-name"
                type="text"
                value={reportForm.name}
                onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                placeholder="Q3 Revenue Review"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="analytics-report-type" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Data source</label>
              <select
                id="analytics-report-type"
                value={reportForm.type}
                onChange={(e) => changeReportType(e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                {REPORT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <span className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Metrics</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(METRIC_OPTIONS[reportForm.type] ?? []).map(metric => {
                  const checked = reportForm.metrics.includes(metric)
                  return (
                    <label
                      key={metric}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition-colors"
                      style={{ borderColor: checked ? colors.primary : colors.border, color: colors.text }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleReportMetric(metric)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{metric}</span>
                    </label>
                  )
                })}
              </div>
            </div>
            <div>
              <label htmlFor="analytics-report-schedule" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Run schedule</label>
              <select
                id="analytics-report-schedule"
                value={reportForm.schedule}
                onChange={(e) => setReportForm({ ...reportForm, schedule: e.target.value })}
                className={inputClass}
                style={inputStyle}
              >
                {SCHEDULE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Report templates */}
      {templateModalOpen && (
        <Modal
          colors={colors}
          wide
          title="Start From a Template"
          subtitle="Each template creates a working report you can edit afterward"
          onClose={() => setTemplateModalOpen(false)}
          footer={
            <button
              onClick={() => setTemplateModalOpen(false)}
              className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Close
            </button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPORT_TEMPLATES.map(template => (
              <div key={template.name} className="border rounded-xl p-5" style={{ borderColor: colors.border }}>
                <h4 className="font-bold mb-1" style={{ color: colors.text }}>{template.name}</h4>
                <p className="text-xs mb-3" style={{ color: colors.textLight }}>{template.type} &middot; {template.schedule}</p>
                <p className="text-sm mb-4" style={{ color: colors.textLight }}>{template.blurb}</p>
                <button
                  onClick={() => useTemplate(template)}
                  className="w-full py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Widget builder / editor */}
      {widgetModal.open && (
        <Modal
          colors={colors}
          title={editingWidget ? 'Configure Widget' : 'Add a Widget'}
          subtitle={editingWidget ? editingWidget.name : 'Widgets appear on the client-facing dashboard'}
          onClose={() => setWidgetModal({ open: false, id: null })}
          footer={
            <>
              {editingWidget && (
                <button
                  onClick={removeWidget}
                  className="px-4 py-3 rounded-lg border font-medium text-red-600 border-red-200 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
              <button
                onClick={() => setWidgetModal({ open: false, id: null })}
                className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveWidget}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {editingWidget ? 'Save Changes' : 'Add Widget'}
              </button>
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="analytics-widget-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Widget name</label>
              <input
                id="analytics-widget-name"
                type="text"
                value={widgetForm.name}
                onChange={(e) => setWidgetForm({ ...widgetForm, name: e.target.value })}
                placeholder="Repeat Purchase Rate"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="analytics-widget-type" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Visualization</label>
              <select
                id="analytics-widget-type"
                value={widgetForm.type}
                onChange={(e) => setWidgetForm({ ...widgetForm, type: e.target.value })}
                className={inputClass}
                style={inputStyle}
              >
                {WIDGET_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="analytics-widget-size" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Size</label>
                <select
                  id="analytics-widget-size"
                  value={widgetForm.size}
                  onChange={(e) => setWidgetForm({ ...widgetForm, size: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                >
                  {WIDGET_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="analytics-widget-refresh" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Refresh</label>
                <select
                  id="analytics-widget-refresh"
                  value={widgetForm.refresh}
                  onChange={(e) => setWidgetForm({ ...widgetForm, refresh: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                >
                  {REFRESH_RATES.map(rate => <option key={rate} value={rate}>{rate}</option>)}
                </select>
              </div>
            </div>
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer" style={{ borderColor: colors.border, color: colors.text }}>
              <input
                type="checkbox"
                checked={widgetForm.enabled}
                onChange={(e) => setWidgetForm({ ...widgetForm, enabled: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Show this widget on the dashboard</span>
            </label>
          </div>
        </Modal>
      )}

      {/* Scheduled export editor */}
      {scheduleModal.open && (
        <Modal
          colors={colors}
          title={editingSchedule ? 'Edit Scheduled Export' : 'Schedule an Export'}
          subtitle="Reports go out automatically on the cadence you choose"
          onClose={() => setScheduleModal({ open: false, id: null })}
          footer={
            <>
              {editingSchedule && (
                <button
                  onClick={deleteSchedule}
                  className="px-4 py-3 rounded-lg border font-medium text-red-600 border-red-200 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
              <button
                onClick={() => setScheduleModal({ open: false, id: null })}
                className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveSchedule}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {editingSchedule ? 'Save Changes' : 'Create Schedule'}
              </button>
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="analytics-schedule-report" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Report</label>
              <select
                id="analytics-schedule-report"
                value={scheduleForm.report}
                onChange={(e) => setScheduleForm({ ...scheduleForm, report: e.target.value })}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select a report...</option>
                {reports.map(report => <option key={report.id} value={report.name}>{report.name}</option>)}
                {editingSchedule && !reports.some(r => r.name === editingSchedule.report) && (
                  <option value={editingSchedule.report}>{editingSchedule.report}</option>
                )}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="analytics-schedule-frequency" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Frequency</label>
                <select
                  id="analytics-schedule-frequency"
                  value={scheduleForm.frequency}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                >
                  {FREQUENCIES.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="analytics-schedule-format" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Format</label>
                <select
                  id="analytics-schedule-format"
                  value={scheduleForm.format}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, format: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                >
                  {EXPORT_FORMATS.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
            <p className="text-xs" style={{ color: colors.textLight }}>
              Next run will be set to {computeNextRun(scheduleForm.frequency)} once you save.
            </p>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] px-5 py-3 rounded-xl shadow-2xl text-white font-medium max-w-sm" style={{ backgroundColor: colors.success }}>
          {toast}
        </div>
      )}
    </div>
  )
}
