'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Eye, Download, Filter,
  Check, X, Send, CheckCircle, Pencil, RotateCcw, ChevronRight
} from 'lucide-react'
import { csvBlob, downloadBlob, slugify } from './exportUtils'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

type RangeKey = '7d' | '30d' | '90d' | '1y'
type ChartMetric = 'revenue' | 'orders'
type SortKey = 'sales' | 'revenue' | 'growth'

interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversionRate: string
  avgSession: string
  bounceRate: string
  trend: string
}

interface RangeData {
  metrics: { label: string; value: string; change: string }[]
  series: { label: string; revenue: number; orders: number }[]
  seriesUnit: string
  growthRate: string
  traffic: TrafficSource[]
  productFactor: number
}

const RANGE_LABELS: Record<RangeKey, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  '1y': 'Last year',
}

const RANGE_DATA: Record<RangeKey, RangeData> = {
  '7d': {
    metrics: [
      { label: 'Total Visitors', value: '24,532', change: '+12.5%' },
      { label: 'Revenue', value: '$48,329', change: '+8.2%' },
      { label: 'Conversions', value: '1,284', change: '+15.7%' },
      { label: 'Page Views', value: '127,459', change: '-2.4%' },
    ],
    series: [
      { label: 'Mon', revenue: 6200, orders: 164 },
      { label: 'Tue', revenue: 5800, orders: 152 },
      { label: 'Wed', revenue: 7100, orders: 189 },
      { label: 'Thu', revenue: 6900, orders: 178 },
      { label: 'Fri', revenue: 7800, orders: 205 },
      { label: 'Sat', revenue: 8400, orders: 221 },
      { label: 'Sun', revenue: 6129, orders: 175 },
    ],
    seriesUnit: 'Daily',
    growthRate: '+12.8%',
    traffic: [
      { source: 'Organic Search', visitors: 12456, percentage: 51, conversionRate: '5.8%', avgSession: '3m 42s', bounceRate: '38%', trend: '+14%' },
      { source: 'Direct', visitors: 5892, percentage: 24, conversionRate: '6.4%', avgSession: '4m 10s', bounceRate: '31%', trend: '+9%' },
      { source: 'Social Media', visitors: 3679, percentage: 15, conversionRate: '3.1%', avgSession: '2m 05s', bounceRate: '52%', trend: '+22%' },
      { source: 'Referral', visitors: 2505, percentage: 10, conversionRate: '4.6%', avgSession: '3m 18s', bounceRate: '41%', trend: '+5%' },
    ],
    productFactor: 1,
  },
  '30d': {
    metrics: [
      { label: 'Total Visitors', value: '98,214', change: '+9.8%' },
      { label: 'Revenue', value: '$196,480', change: '+11.4%' },
      { label: 'Conversions', value: '5,102', change: '+13.2%' },
      { label: 'Page Views', value: '512,830', change: '+3.1%' },
    ],
    series: [
      { label: 'Wk 1', revenue: 46200, orders: 1218 },
      { label: 'Wk 2', revenue: 48900, orders: 1285 },
      { label: 'Wk 3', revenue: 51300, orders: 1342 },
      { label: 'Wk 4', revenue: 50080, orders: 1257 },
    ],
    seriesUnit: 'Weekly',
    growthRate: '+11.4%',
    traffic: [
      { source: 'Organic Search', visitors: 51071, percentage: 52, conversionRate: '5.6%', avgSession: '3m 38s', bounceRate: '39%', trend: '+12%' },
      { source: 'Direct', visitors: 22589, percentage: 23, conversionRate: '6.2%', avgSession: '4m 02s', bounceRate: '32%', trend: '+7%' },
      { source: 'Social Media', visitors: 14732, percentage: 15, conversionRate: '3.3%', avgSession: '2m 12s', bounceRate: '50%', trend: '+18%' },
      { source: 'Referral', visitors: 9822, percentage: 10, conversionRate: '4.4%', avgSession: '3m 09s', bounceRate: '43%', trend: '+4%' },
    ],
    productFactor: 4.1,
  },
  '90d': {
    metrics: [
      { label: 'Total Visitors', value: '287,650', change: '+14.2%' },
      { label: 'Revenue', value: '$571,220', change: '+9.6%' },
      { label: 'Conversions', value: '14,830', change: '+10.9%' },
      { label: 'Page Views', value: '1,489,300', change: '+5.4%' },
    ],
    series: [
      { label: 'Apr', revenue: 184300, orders: 4820 },
      { label: 'May', revenue: 192600, orders: 4975 },
      { label: 'Jun', revenue: 194320, orders: 5035 },
    ],
    seriesUnit: 'Monthly',
    growthRate: '+9.6%',
    traffic: [
      { source: 'Organic Search', visitors: 149578, percentage: 52, conversionRate: '5.4%', avgSession: '3m 30s', bounceRate: '40%', trend: '+15%' },
      { source: 'Direct', visitors: 66160, percentage: 23, conversionRate: '6.0%', avgSession: '3m 55s', bounceRate: '33%', trend: '+8%' },
      { source: 'Social Media', visitors: 43148, percentage: 15, conversionRate: '3.4%', avgSession: '2m 18s', bounceRate: '49%', trend: '+20%' },
      { source: 'Referral', visitors: 28764, percentage: 10, conversionRate: '4.2%', avgSession: '3m 01s', bounceRate: '44%', trend: '+6%' },
    ],
    productFactor: 12.3,
  },
  '1y': {
    metrics: [
      { label: 'Total Visitors', value: '1,204,880', change: '+18.6%' },
      { label: 'Revenue', value: '$2,341,900', change: '+15.2%' },
      { label: 'Conversions', value: '61,240', change: '+17.4%' },
      { label: 'Page Views', value: '6,120,450', change: '+8.9%' },
    ],
    series: [
      { label: 'Jan', revenue: 168000, orders: 4350 },
      { label: 'Feb', revenue: 172400, orders: 4460 },
      { label: 'Mar', revenue: 181200, orders: 4690 },
      { label: 'Apr', revenue: 189500, orders: 4905 },
      { label: 'May', revenue: 193800, orders: 5010 },
      { label: 'Jun', revenue: 198200, orders: 5130 },
      { label: 'Jul', revenue: 201400, orders: 5205 },
      { label: 'Aug', revenue: 199700, orders: 5165 },
      { label: 'Sep', revenue: 204900, orders: 5290 },
      { label: 'Oct', revenue: 209300, orders: 5410 },
      { label: 'Nov', revenue: 211600, orders: 5468 },
      { label: 'Dec', revenue: 211900, orders: 5480 },
    ],
    seriesUnit: 'Monthly',
    growthRate: '+15.2%',
    traffic: [
      { source: 'Organic Search', visitors: 638586, percentage: 53, conversionRate: '5.2%', avgSession: '3m 26s', bounceRate: '40%', trend: '+19%' },
      { source: 'Direct', visitors: 265074, percentage: 22, conversionRate: '5.9%', avgSession: '3m 48s', bounceRate: '34%', trend: '+10%' },
      { source: 'Social Media', visitors: 180732, percentage: 15, conversionRate: '3.5%', avgSession: '2m 21s', bounceRate: '48%', trend: '+26%' },
      { source: 'Referral', visitors: 120488, percentage: 10, conversionRate: '4.1%', avgSession: '2m 58s', bounceRate: '45%', trend: '+7%' },
    ],
    productFactor: 49,
  },
}

const BASE_PRODUCTS = [
  { name: 'Premium Package', sales: 234, unitPrice: 100, growth: '+18%' },
  { name: 'Standard Plan', sales: 189, unitPrice: 100, growth: '+12%' },
  { name: 'Basic Service', sales: 156, unitPrice: 50, growth: '+8%' },
  { name: 'Add-on Feature', sales: 98, unitPrice: 50, growth: '+25%' },
]

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'sales', label: 'Sales (high to low)' },
  { key: 'revenue', label: 'Revenue (high to low)' },
  { key: 'growth', label: 'Growth (high to low)' },
]

const GOALS_KEY = 'scdemo-analytics-goals'

type GoalUnit = 'currency' | 'count' | 'percent'

interface Goal {
  id: string
  label: string
  target: number
  actual: number
  unit: GoalUnit
}

const DEFAULT_GOALS: Goal[] = [
  { id: 'revenue', label: 'Monthly Revenue Goal', target: 54000, actual: 48329, unit: 'currency' },
  { id: 'customers', label: 'Customer Acquisition', target: 1200, actual: 1152, unit: 'count' },
  { id: 'conversion', label: 'Conversion Rate', target: 5, actual: 5.2, unit: 'percent' },
]

const LEAD_GOALS = [
  'Real-time revenue tracking',
  'Marketing channel attribution',
  'Product performance reporting',
  'Executive KPI dashboard',
  'Automated scheduled reports',
  'Something else',
]

type Detail =
  | { kind: 'metric'; index: number }
  | { kind: 'period'; index: number }
  | { kind: 'product'; index: number }
  | { kind: 'source'; index: number }
  | { kind: 'traffic' }

interface BreakdownRow {
  label: string
  value: number
  note: string
}

function formatGoalValue(value: number, unit: GoalUnit): string {
  if (unit === 'currency') return '$' + value.toLocaleString()
  if (unit === 'percent') return value.toFixed(1) + '%'
  return value.toLocaleString()
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [dateRange, setDateRange] = useState<RangeKey>('7d')
  const [chartMetric, setChartMetric] = useState<ChartMetric>('revenue')
  const [sortBy, setSortBy] = useState<SortKey>('sales')
  const [filterOpen, setFilterOpen] = useState(false)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS)
  const [goalsLoaded, setGoalsLoaded] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [goalDraft, setGoalDraft] = useState({ target: '', actual: '' })

  const [lead, setLead] = useState({ name: '', email: '', phone: '', company: '', goal: '', notes: '', website: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Load saved goal targets after mount (localStorage only exists in the browser)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(GOALS_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Goal[]
        if (Array.isArray(parsed) && parsed.length === DEFAULT_GOALS.length) {
          setGoals(parsed)
        }
      }
    } catch {
      // Corrupt or unavailable storage -- fall back to the seeded goals
    }
    setGoalsLoaded(true)
  }, [])

  useEffect(() => {
    if (!goalsLoaded) return
    try {
      window.localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
    } catch {
      // Storage full or blocked -- the in-memory goals still drive the UI
    }
  }, [goals, goalsLoaded])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const rangeData = RANGE_DATA[dateRange]

  const metricCards = rangeData.metrics.map((metric, index) => ({
    ...metric,
    trend: metric.change.startsWith('-') ? 'down' : 'up',
    icon: [Users, DollarSign, ShoppingCart, Eye][index],
    color: [colors.primary, colors.success, colors.secondary, colors.accent][index],
  }))

  const maxSeriesValue = Math.max(...rangeData.series.map(d => d[chartMetric]))
  const seriesAverage = Math.round(
    rangeData.series.reduce((sum, d) => sum + d[chartMetric], 0) / rangeData.series.length
  )
  const totalSeriesRevenue = rangeData.series.reduce((sum, d) => sum + d.revenue, 0)
  const totalSeriesOrders = rangeData.series.reduce((sum, d) => sum + d.orders, 0)
  const overallAov = totalSeriesRevenue / totalSeriesOrders

  const products = useMemo(() => {
    const scaled = BASE_PRODUCTS.map(product => {
      const sales = Math.round(product.sales * rangeData.productFactor)
      return {
        name: product.name,
        sales,
        unitPrice: product.unitPrice,
        revenueValue: sales * product.unitPrice,
        revenue: '$' + (sales * product.unitPrice).toLocaleString(),
        growth: product.growth,
      }
    })
    const sorters: Record<SortKey, (a: typeof scaled[number], b: typeof scaled[number]) => number> = {
      sales: (a, b) => b.sales - a.sales,
      revenue: (a, b) => b.revenueValue - a.revenueValue,
      growth: (a, b) => parseFloat(b.growth) - parseFloat(a.growth),
    }
    return [...scaled].sort(sorters[sortBy])
  }, [rangeData.productFactor, sortBy])

  const maxProductSales = Math.max(...products.map(p => p.sales))
  const totalProductRevenue = products.reduce((sum, p) => sum + p.revenueValue, 0)

  const parseMetricValue = (value: string) => Number(value.replace(/[^0-9.]/g, ''))

  const buildMetricBreakdown = (index: number): BreakdownRow[] => {
    if (index === 0) {
      return rangeData.traffic.map(t => ({
        label: t.source,
        value: t.visitors,
        note: `${t.conversionRate} conversion rate, ${t.avgSession} average session`,
      }))
    }
    if (index === 2) {
      return rangeData.traffic.map(t => ({
        label: t.source,
        value: Math.round(t.visitors * (parseFloat(t.conversionRate) / 100)),
        note: `${t.conversionRate} of ${t.visitors.toLocaleString()} visitors`,
      }))
    }
    if (index === 1) {
      return rangeData.series.map(d => ({
        label: d.label,
        value: d.revenue,
        note: `${d.orders.toLocaleString()} orders at $${Math.round(d.revenue / d.orders).toLocaleString()} average`,
      }))
    }
    const total = parseMetricValue(rangeData.metrics[3].value)
    return rangeData.series.map(d => ({
      label: d.label,
      value: Math.round(total * (d.revenue / totalSeriesRevenue)),
      note: `${((d.revenue / totalSeriesRevenue) * 100).toFixed(1)}% of period revenue`,
    }))
  }

  const formatMetricNumber = (index: number, value: number) =>
    index === 1 ? '$' + Math.round(value).toLocaleString() : Math.round(value).toLocaleString()

  const handleExport = () => {
    const rows: (string | number)[][] = [
      ['Business Intelligence Report', RANGE_LABELS[dateRange]],
      [],
      ['Metric', 'Value', 'Change'],
      ...rangeData.metrics.map(m => [m.label, m.value, m.change]),
      [],
      ['Period', 'Revenue', 'Orders'],
      ...rangeData.series.map(d => [d.label, d.revenue, d.orders]),
      [],
      ['Traffic Source', 'Visitors', 'Share', 'Conversion Rate'],
      ...rangeData.traffic.map(t => [t.source, t.visitors, t.percentage + '%', t.conversionRate]),
      [],
      ['Goal', 'Actual', 'Target', 'Progress'],
      ...goals.map(g => [
        g.label,
        formatGoalValue(g.actual, g.unit),
        formatGoalValue(g.target, g.unit),
        Math.round((g.actual / g.target) * 100) + '%',
      ]),
    ]
    downloadBlob(`business-intelligence-${dateRange}.csv`, csvBlob(rows))
    setToast(`Report exported for ${RANGE_LABELS[dateRange].toLowerCase()}`)
  }

  const formatBarValue = (value: number) =>
    chartMetric === 'revenue' ? '$' + (value / 1000).toFixed(1) + 'k' : value.toLocaleString()

  const openGoalEditor = (goal: Goal) => {
    setEditingGoal(goal)
    setGoalDraft({ target: String(goal.target), actual: String(goal.actual) })
  }

  const saveGoal = () => {
    if (!editingGoal) return
    const nextTarget = Number(goalDraft.target)
    const nextActual = Number(goalDraft.actual)
    if (!Number.isFinite(nextTarget) || nextTarget <= 0 || !Number.isFinite(nextActual) || nextActual < 0) {
      setToast('Enter a target above zero and a non-negative actual')
      return
    }
    setGoals(prev => prev.map(g => (g.id === editingGoal.id ? { ...g, target: nextTarget, actual: nextActual } : g)))
    setToast(`${editingGoal.label} updated and saved`)
    setEditingGoal(null)
  }

  const resetGoals = () => {
    setGoals(DEFAULT_GOALS)
    setEditingGoal(null)
    setToast('Goals reset to the starting targets')
  }

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (leadSubmitting) return
    setLeadSubmitting(true)
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
          service: lead.goal || 'Analytics dashboard',
          preferredDate: '',
          preferredTime: '',
          notes: [lead.company ? `Company: ${lead.company}` : '', lead.notes].filter(Boolean).join(' -- '),
          website: lead.website,
        }),
      })
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_analytics_form', demo_slug: demo.slug })
        trackConversion('leadForm')
      }
    } catch {
      // Network/API failure -- the confirmation below still shows so the demo has no dead end
    }
    setLeadSubmitting(false)
    setLeadSubmitted(true)
  }

  const resetLeadForm = () => {
    setLead({ name: '', email: '', phone: '', company: '', goal: '', notes: '', website: '' })
    setLeadSubmitted(false)
  }

  const closeDetail = () => setDetail(null)

  // ---- Detail modal content -------------------------------------------------

  const renderDetailBody = () => {
    if (!detail) return null

    if (detail.kind === 'metric') {
      const metric = rangeData.metrics[detail.index]
      const rows = buildMetricBreakdown(detail.index)
      const total = rows.reduce((sum, r) => sum + r.value, 0)
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>Reported total</p>
              <p className="text-2xl font-bold mt-1" style={{ color: colors.primary }}>{metric.value}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>Change vs prior period</p>
              <p className={`text-2xl font-bold mt-1 ${metric.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>{metric.change}</p>
            </div>
          </div>
          <div className="space-y-3">
            {rows.map(row => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color: colors.text }}>{row.label}</span>
                  <span className="text-sm font-bold" style={{ color: colors.primary }}>
                    {formatMetricNumber(detail.index, row.value)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="h-2 rounded-full" style={{ width: `${(row.value / total) * 100}%`, backgroundColor: colors.primary }} />
                </div>
                <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                  {((row.value / total) * 100).toFixed(1)}% share &middot; {row.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (detail.kind === 'period') {
      const point = rangeData.series[detail.index]
      const aov = point.revenue / point.orders
      const vsAverageRevenue = ((point.revenue / (totalSeriesRevenue / rangeData.series.length)) - 1) * 100
      const stats = [
        { label: 'Revenue', value: '$' + point.revenue.toLocaleString() },
        { label: 'Orders', value: point.orders.toLocaleString() },
        { label: 'Average order value', value: '$' + aov.toFixed(2) },
        { label: 'Share of period revenue', value: ((point.revenue / totalSeriesRevenue) * 100).toFixed(1) + '%' },
        { label: 'Share of period orders', value: ((point.orders / totalSeriesOrders) * 100).toFixed(1) + '%' },
        {
          label: `Versus ${rangeData.seriesUnit.toLowerCase()} average`,
          value: (vsAverageRevenue >= 0 ? '+' : '') + vsAverageRevenue.toFixed(1) + '%',
        },
      ]
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="p-4 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
            </div>
          ))}
        </div>
      )
    }

    if (detail.kind === 'product') {
      const product = products[detail.index]
      const stats = [
        { label: 'Units sold', value: product.sales.toLocaleString() },
        { label: 'Revenue', value: product.revenue },
        { label: 'Unit price', value: '$' + product.unitPrice.toLocaleString() },
        { label: 'Growth', value: product.growth },
        { label: 'Share of product revenue', value: ((product.revenueValue / totalProductRevenue) * 100).toFixed(1) + '%' },
        { label: 'Rank in range', value: `#${detail.index + 1} of ${products.length}` },
      ]
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="p-4 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>{stat.label}</p>
                <p className="text-lg font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Units by {rangeData.seriesUnit.toLowerCase()} period</h4>
            <div className="space-y-2">
              {rangeData.series.map(point => {
                const share = point.revenue / totalSeriesRevenue
                const units = Math.round(product.sales * share)
                const maxPeriodRevenue = Math.max(...rangeData.series.map(p => p.revenue))
                return (
                  <div key={point.label} className="flex items-center gap-3">
                    <span className="w-14 text-sm font-medium shrink-0" style={{ color: colors.textLight }}>{point.label}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="h-2 rounded-full" style={{ width: `${(point.revenue / maxPeriodRevenue) * 100}%`, backgroundColor: colors.success }} />
                    </div>
                    <span className="w-20 text-right text-sm font-semibold" style={{ color: colors.text }}>{units.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    if (detail.kind === 'source') {
      const source = rangeData.traffic[detail.index]
      const conversions = Math.round(source.visitors * (parseFloat(source.conversionRate) / 100))
      const stats = [
        { label: 'Visitors', value: source.visitors.toLocaleString() },
        { label: 'Share of traffic', value: source.percentage + '%' },
        { label: 'Conversion rate', value: source.conversionRate },
        { label: 'Estimated conversions', value: conversions.toLocaleString() },
        { label: 'Estimated revenue', value: '$' + Math.round(conversions * overallAov).toLocaleString() },
        { label: 'Average session', value: source.avgSession },
        { label: 'Bounce rate', value: source.bounceRate },
        { label: 'Trend vs prior period', value: source.trend },
      ]
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="p-4 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>{stat.label}</p>
              <p className="text-xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2" style={{ borderColor: colors.border }}>
              <th className="text-left py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Source</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Visitors</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Share</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Conv. Rate</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Avg. Session</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Bounce</th>
              <th className="text-right py-3 px-3 font-semibold text-sm" style={{ color: colors.text }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {rangeData.traffic.map((source, index) => (
              <tr key={index} className="border-b" style={{ borderColor: colors.border }}>
                <td className="py-3 px-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setDetail({ kind: 'source', index })}
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary }}
                  >
                    {source.source}
                  </button>
                </td>
                <td className="py-3 px-3 text-right text-sm" style={{ color: colors.text }}>{source.visitors.toLocaleString()}</td>
                <td className="py-3 px-3 text-right text-sm font-semibold" style={{ color: colors.primary }}>{source.percentage}%</td>
                <td className="py-3 px-3 text-right text-sm" style={{ color: colors.text }}>{source.conversionRate}</td>
                <td className="py-3 px-3 text-right text-sm" style={{ color: colors.text }}>{source.avgSession}</td>
                <td className="py-3 px-3 text-right text-sm" style={{ color: colors.text }}>{source.bounceRate}</td>
                <td className="py-3 px-3 text-right text-sm font-semibold text-green-600">{source.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const detailTitle = (() => {
    if (!detail) return ''
    if (detail.kind === 'metric') return rangeData.metrics[detail.index].label + ' breakdown'
    if (detail.kind === 'period') return rangeData.series[detail.index].label + ' performance'
    if (detail.kind === 'product') return products[detail.index].name
    if (detail.kind === 'source') return rangeData.traffic[detail.index].source
    return 'Traffic Detail Report'
  })()

  const downloadDetailCsv = () => {
    if (!detail) return
    if (detail.kind === 'metric') {
      const rows: (string | number)[][] = [
        [rangeData.metrics[detail.index].label, RANGE_LABELS[dateRange]],
        [],
        ['Segment', 'Value', 'Detail'],
        ...buildMetricBreakdown(detail.index).map(r => [r.label, r.value, r.note]),
      ]
      downloadBlob(`${slugify(rangeData.metrics[detail.index].label)}-${dateRange}.csv`, csvBlob(rows))
      setToast('Metric breakdown exported as CSV')
      return
    }
    if (detail.kind === 'period') {
      const point = rangeData.series[detail.index]
      const rows: (string | number)[][] = [
        ['Period', 'Revenue', 'Orders', 'Average Order Value'],
        [point.label, point.revenue, point.orders, (point.revenue / point.orders).toFixed(2)],
      ]
      downloadBlob(`period-${slugify(point.label)}-${dateRange}.csv`, csvBlob(rows))
      setToast('Period detail exported as CSV')
      return
    }
    if (detail.kind === 'product') {
      const product = products[detail.index]
      const rows: (string | number)[][] = [
        ['Product', 'Units', 'Revenue', 'Unit Price', 'Growth'],
        [product.name, product.sales, product.revenueValue, product.unitPrice, product.growth],
        [],
        ['Period', 'Estimated Units'],
        ...rangeData.series.map(p => [p.label, Math.round(product.sales * (p.revenue / totalSeriesRevenue))]),
      ]
      downloadBlob(`${slugify(product.name)}-${dateRange}.csv`, csvBlob(rows))
      setToast('Product detail exported as CSV')
      return
    }
    if (detail.kind === 'source') {
      const source = rangeData.traffic[detail.index]
      const rows: (string | number)[][] = [
        ['Source', 'Visitors', 'Share', 'Conversion Rate', 'Avg Session', 'Bounce Rate', 'Trend'],
        [source.source, source.visitors, source.percentage + '%', source.conversionRate, source.avgSession, source.bounceRate, source.trend],
      ]
      downloadBlob(`${slugify(source.source)}-${dateRange}.csv`, csvBlob(rows))
      setToast('Source detail exported as CSV')
      return
    }
    const rows: (string | number)[][] = [
      ['Source', 'Visitors', 'Share', 'Conversion Rate', 'Avg Session', 'Bounce Rate', 'Trend'],
      ...rangeData.traffic.map(t => [t.source, t.visitors, t.percentage + '%', t.conversionRate, t.avgSession, t.bounceRate, t.trend]),
    ]
    downloadBlob(`traffic-detail-${dateRange}.csv`, csvBlob(rows))
    setToast('Traffic detail exported as CSV')
  }

  const goalIcons = [TrendingUp, Users, BarChart3]
  const goalColors = [colors.success, colors.secondary, colors.accent]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Business Intelligence</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Real-time analytics and insights</p>
            </div>
            <div className="flex gap-3">
              <select
                aria-label="Select date range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as RangeKey)}
                className="px-4 py-2 rounded-lg border font-medium focus:outline-none focus:ring-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon
            return (
              <button
                key={index}
                type="button"
                onClick={() => setDetail({ kind: 'metric', index })}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow focus:outline-none focus:ring-2"
                style={{ outlineColor: colors.primary }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.color + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>{metric.label}</p>
                <p className="text-3xl font-bold" style={{ color: colors.text }}>{metric.value}</p>
                <p className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color: colors.primary }}>
                  View breakdown <ChevronRight className="w-3 h-3" />
                </p>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue / Orders Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                {chartMetric === 'revenue' ? 'Revenue Trend' : 'Orders Trend'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartMetric('revenue')}
                  className="px-3 py-1 rounded text-sm font-medium transition-colors"
                  style={chartMetric === 'revenue'
                    ? { backgroundColor: colors.backgroundAlt, color: colors.primary }
                    : { color: colors.textLight }}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setChartMetric('orders')}
                  className="px-3 py-1 rounded text-sm font-medium transition-colors"
                  style={chartMetric === 'orders'
                    ? { backgroundColor: colors.backgroundAlt, color: colors.primary }
                    : { color: colors.textLight }}
                >
                  Orders
                </button>
              </div>
            </div>

            <div className="h-80 flex items-end gap-2 px-2 sm:px-4">
              {rangeData.series.map((item, index) => {
                const height = (item[chartMetric] / maxSeriesValue) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                    <button
                      type="button"
                      aria-label={`View ${item.label} detail`}
                      onClick={() => setDetail({ kind: 'period', index })}
                      className="w-full rounded-t-lg transition-all hover:opacity-80 relative group cursor-pointer"
                      style={{
                        height: `${height}%`,
                        backgroundColor: chartMetric === 'revenue' ? colors.primary : colors.secondary,
                        minHeight: '20px'
                      }}
                    >
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {formatBarValue(item[chartMetric])}
                      </span>
                    </button>
                    <span className="text-xs sm:text-sm font-medium truncate" style={{ color: colors.textLight }}>{item.label}</span>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-center mt-3" style={{ color: colors.textLight }}>
              Select any bar to open the detail for that period
            </p>

            <div className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>
                  Average {rangeData.seriesUnit} {chartMetric === 'revenue' ? 'Revenue' : 'Orders'}
                </p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {chartMetric === 'revenue' ? '$' + seriesAverage.toLocaleString() : seriesAverage.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">{rangeData.growthRate}</p>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Traffic Sources</h2>

            <div className="space-y-4">
              {rangeData.traffic.map((source, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setDetail({ kind: 'source', index })}
                  className="w-full text-left rounded-lg p-2 -m-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ color: colors.text }}>{source.source}</span>
                    <span className="text-sm font-bold" style={{ color: colors.primary }}>{source.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: colors.primary
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>{source.visitors.toLocaleString()} visitors</p>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
              <button
                onClick={() => setDetail({ kind: 'traffic' })}
                className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: colors.text }}>Top Performing Products</h2>
            <div className="relative">
              <button
                onClick={() => setFilterOpen(open => !open)}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Filter className="w-5 h-5" />
                Filter
              </button>
              {filterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border z-20 py-2" style={{ borderColor: colors.border }}>
                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textLight }}>Sort products by</p>
                    {SORT_OPTIONS.map(option => (
                      <button
                        key={option.key}
                        onClick={() => { setSortBy(option.key); setFilterOpen(false) }}
                        className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-between"
                        style={{ color: sortBy === option.key ? colors.primary : colors.text }}
                      >
                        {option.label}
                        {sortBy === option.key && <Check className="w-4 h-4" style={{ color: colors.primary }} />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: colors.border }}>
                  <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Product</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Sales</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Growth</th>
                  <th className="text-right py-3 px-4 font-semibold" style={{ color: colors.text }}>Performance</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.name}
                    onClick={() => setDetail({ kind: 'product', index })}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ borderColor: colors.border }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                          {index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setDetail({ kind: 'product', index }) }}
                          className="font-semibold hover:underline text-left"
                          style={{ color: colors.text }}
                        >
                          {product.name}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right" style={{ color: colors.text }}>{product.sales.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-semibold" style={{ color: colors.primary }}>{product.revenue}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-green-600 font-semibold">{product.growth}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(product.sales / maxProductSales) * 100}%`,
                            backgroundColor: colors.success
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goal Tracking */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>Goal Tracking</h2>
          <button
            onClick={resetGoals}
            className="px-3 py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            style={{ borderColor: colors.border, color: colors.textLight }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Goals
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goalIcons[index] ?? TrendingUp
            const pct = Math.round((goal.actual / goal.target) * 100)
            return (
              <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold" style={{ color: colors.text }}>{goal.label}</h3>
                  <Icon className="w-5 h-5" style={{ color: goalColors[index] ?? colors.success }} />
                </div>
                <p className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                  {formatGoalValue(goal.target, goal.unit)}
                </p>
                <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: pct >= 100 ? colors.success : (goalColors[index] ?? colors.success),
                    }}
                  />
                </div>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  {formatGoalValue(goal.actual, goal.unit)} / {formatGoalValue(goal.target, goal.unit)} ({pct}%)
                </p>
                <button
                  onClick={() => openGoalEditor(goal)}
                  className="mt-4 w-full py-2 rounded-lg border text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ borderColor: colors.border, color: colors.primary }}
                >
                  <Pencil className="w-4 h-4" />
                  Adjust Goal
                </button>
              </div>
            )
          })}
        </div>

        {/* Lead capture */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 text-white" style={{ backgroundColor: colors.primary }}>
            <h2 className="text-2xl font-bold mb-1">Want this dashboard for your business?</h2>
            <p className="text-sm opacity-90">
              Tell us what you need to measure and we will map it to a dashboard like this one.
            </p>
          </div>

          {leadSubmitted ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircle className="w-10 h-10" style={{ color: colors.success }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Request received</h3>
              <p className="mb-6" style={{ color: colors.textLight }}>
                Thanks for reaching out. We will follow up within one business day with a dashboard outline and pricing.
              </p>
              <button
                onClick={resetLeadForm}
                className="font-semibold hover:underline"
                style={{ color: colors.primary }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="analytics-lead-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Full Name *
                </label>
                <input
                  id="analytics-lead-name"
                  type="text"
                  required
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="Jordan Reyes"
                />
              </div>
              <div>
                <label htmlFor="analytics-lead-company" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Company
                </label>
                <input
                  id="analytics-lead-company"
                  type="text"
                  value={lead.company}
                  onChange={(e) => setLead({ ...lead, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="Reyes Supply Co."
                />
              </div>
              <div>
                <label htmlFor="analytics-lead-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Email Address *
                </label>
                <input
                  id="analytics-lead-email"
                  type="email"
                  required
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="jordan@company.com"
                />
              </div>
              <div>
                <label htmlFor="analytics-lead-phone" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Phone Number
                </label>
                <input
                  id="analytics-lead-phone"
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="analytics-lead-goal" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  What do you most need to track? *
                </label>
                <select
                  id="analytics-lead-goal"
                  required
                  value={lead.goal}
                  onChange={(e) => setLead({ ...lead, goal: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <option value="">Select a focus area...</option>
                  {LEAD_GOALS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="analytics-lead-notes" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Anything else we should know?
                </label>
                <textarea
                  id="analytics-lead-notes"
                  rows={4}
                  value={lead.notes}
                  onChange={(e) => setLead({ ...lead, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 resize-none"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="Which systems hold your data today, and who needs to see the reports?"
                />
              </div>

              {/* Honeypot -- hidden from real visitors */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={lead.website}
                onChange={(e) => setLead({ ...lead, website: e.target.value })}
                className="hidden"
              />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-5 h-5" />
                  {leadSubmitting ? 'Sending...' : 'Request My Dashboard'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeDetail} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{detailTitle}</h3>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>{RANGE_LABELS[dateRange]}</p>
              </div>
              <button onClick={closeDetail} aria-label="Close detail" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="p-6">
              {renderDetailBody()}
              <div className="mt-6 flex justify-end gap-3 flex-wrap">
                <button
                  onClick={downloadDetailCsv}
                  className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.primary }}
                >
                  Download CSV
                </button>
                <button
                  onClick={closeDetail}
                  className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goal Editor */}
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditingGoal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>{editingGoal.label}</h3>
              <button onClick={() => setEditingGoal(null)} aria-label="Close goal editor" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="analytics-goal-target" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Target ({editingGoal.unit === 'currency' ? 'dollars' : editingGoal.unit === 'percent' ? 'percent' : 'count'})
                </label>
                <input
                  id="analytics-goal-target"
                  type="number"
                  min="0"
                  step={editingGoal.unit === 'percent' ? '0.1' : '1'}
                  value={goalDraft.target}
                  onChange={(e) => setGoalDraft({ ...goalDraft, target: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                />
              </div>
              <div>
                <label htmlFor="analytics-goal-actual" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  Current actual
                </label>
                <input
                  id="analytics-goal-actual"
                  type="number"
                  min="0"
                  step={editingGoal.unit === 'percent' ? '0.1' : '1'}
                  value={goalDraft.actual}
                  onChange={(e) => setGoalDraft({ ...goalDraft, actual: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                />
              </div>
              <p className="text-xs" style={{ color: colors.textLight }}>
                Changes are saved in this browser, so the goal stays put when you come back.
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => setEditingGoal(null)}
                className="flex-1 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={saveGoal}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Save Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] px-5 py-3 rounded-xl shadow-2xl text-white font-medium" style={{ backgroundColor: colors.success }}>
          {toast}
        </div>
      )}
    </div>
  )
}
