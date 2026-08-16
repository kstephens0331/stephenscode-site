'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  DollarSign,
  Download,
  FileText,
  Filter,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Send,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type Tier = 'Basic' | 'Premium' | 'VIP'
type MemberStatus = 'Active' | 'Expiring Soon' | 'Past Due' | 'Cancelled'
type PeriodKey = '30d' | '90d' | 'ytd'
type StatKey = 'members' | 'revenue' | 'active' | 'churn'
type SortKey = 'name' | 'tier' | 'joined' | 'renewal' | 'status'
type RenewalBucket = 'all' | 'month' | 'soon' | 'past'

interface Member {
  id: string
  name: string
  email: string
  tier: Tier
  joined: string
  renewal: string
  cancelled: boolean
  lifetimeValue: number
  eventsAttended: number
  contentCompleted: number
  notes: string
}

interface ActivityItem {
  id: string
  action: string
  time: string
  type: 'signup' | 'renewal' | 'upgrade' | 'cancellation' | 'email' | 'export' | 'edit'
  at?: number
}

const LS = {
  members: 'demo37-admin-members',
  activity: 'demo37-admin-activity',
  reminders: 'demo37-admin-reminders',
}

const TODAY = '2026-08-15'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TIERS: Tier[] = ['Basic', 'Premium', 'VIP']

const TIER_PRICE: Record<Tier, number> = { Basic: 29, Premium: 79, VIP: 199 }

const TIER_BENEFITS: Record<Tier, string[]> = {
  Basic: ['Community access', 'Monthly newsletter', 'Starter resource library', 'Member directory listing'],
  Premium: ['Everything in Basic', 'Full content library', 'Priority support', 'Monthly webinars', 'Networking events'],
  VIP: ['Everything in Premium', '1-on-1 coaching sessions', 'VIP-only roundtables', 'Early feature access', 'Custom dashboard'],
}

const TIER_HEALTH: Record<Tier, { retention: string; tenure: string; upgradeRate: string }> = {
  Basic: { retention: '81%', tenure: '9 months', upgradeRate: '14% move to Premium' },
  Premium: { retention: '92%', tenure: '19 months', upgradeRate: '7% move to VIP' },
  VIP: { retention: '96%', tenure: '27 months', upgradeRate: 'Top tier' },
}

const EMAIL_TEMPLATES = [
  {
    id: 'renewal',
    label: 'Renewal reminder',
    subject: 'Your membership renews soon',
    body: 'Hi {{name}},\n\nYour {{tier}} membership renews on {{renewal}}. Nothing is needed on your end -- the card on file will be charged automatically.\n\nWant to change plans first? Reply to this message and we will take care of it.\n\nThe Membership Team',
  },
  {
    id: 'welcome',
    label: 'Welcome message',
    subject: 'Welcome to the community',
    body: 'Hi {{name}},\n\nWelcome aboard. Your {{tier}} membership is active and the full library is unlocked in your portal.\n\nStart with the member orientation guide, then say hello in the community directory.\n\nThe Membership Team',
  },
  {
    id: 'upgrade',
    label: 'Upgrade offer',
    subject: 'Unlock the next tier',
    body: 'Hi {{name}},\n\nYou have been getting good use out of your {{tier}} plan. Members at your activity level usually get more value on the next tier up: coaching sessions, VIP roundtables, and early access to new releases.\n\nUpgrade any time from your member portal -- the change is prorated.\n\nThe Membership Team',
  },
  {
    id: 'winback',
    label: 'Win-back note',
    subject: 'We saved your seat',
    body: 'Hi {{name}},\n\nYour membership lapsed on {{renewal}}, and your progress and connections are still saved.\n\nReactivate whenever you are ready and everything picks up right where you left off.\n\nThe Membership Team',
  },
  {
    id: 'custom',
    label: 'Blank message',
    subject: '',
    body: '',
  },
]

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: '30d', label: 'Last 30 Days' },
  { key: '90d', label: 'Last 90 Days' },
  { key: 'ytd', label: 'Year to Date' },
]

interface PeriodSnapshot {
  totalMembers: number
  activeSubs: number
  churn: string
  changes: { members: string; revenue: string; active: string; churn: string }
  tiers: Record<Tier, number>
  newSignups: number
  upgrades: number
  cancellations: number
  reactivations: number
  activity: ActivityItem[]
  churnReasons: { label: string; value: number }[]
  growth: { label: string; value: number }[]
}

const PERIOD_DATA: Record<PeriodKey, PeriodSnapshot> = {
  '30d': {
    totalMembers: 1284,
    activeSubs: 1156,
    churn: '3.2%',
    changes: { members: '+12.3%', revenue: '+8.7%', active: '+5.2%', churn: '-1.1%' },
    tiers: { Basic: 456, Premium: 628, VIP: 200 },
    newSignups: 142,
    upgrades: 38,
    cancellations: 41,
    reactivations: 9,
    activity: [
      { id: 'a1', action: 'New VIP member joined', time: '2 hours ago', type: 'signup' },
      { id: 'a2', action: '15 Premium memberships renewed', time: '5 hours ago', type: 'renewal' },
      { id: 'a3', action: 'Member upgraded to VIP tier', time: '1 day ago', type: 'upgrade' },
      { id: 'a4', action: 'Membership cancellation', time: '1 day ago', type: 'cancellation' },
      { id: 'a5', action: '8 Basic members joined', time: '2 days ago', type: 'signup' },
    ],
    churnReasons: [
      { label: 'Price sensitivity', value: 16 },
      { label: 'Not using the content', value: 12 },
      { label: 'Failed payment', value: 8 },
      { label: 'Switched providers', value: 5 },
    ],
    growth: [
      { label: 'Week 1', value: 28 },
      { label: 'Week 2', value: 34 },
      { label: 'Week 3', value: 41 },
      { label: 'Week 4', value: 39 },
    ],
  },
  '90d': {
    totalMembers: 1198,
    activeSubs: 1071,
    churn: '3.8%',
    changes: { members: '+9.1%', revenue: '+6.4%', active: '+4.0%', churn: '-0.6%' },
    tiers: { Basic: 438, Premium: 578, VIP: 182 },
    newSignups: 361,
    upgrades: 94,
    cancellations: 117,
    reactivations: 24,
    activity: [
      { id: 'b1', action: 'Spring cohort added 96 Premium members', time: '3 weeks ago', type: 'signup' },
      { id: 'b2', action: '212 memberships renewed on schedule', time: '5 weeks ago', type: 'renewal' },
      { id: 'b3', action: '31 members upgraded after the coaching launch', time: '7 weeks ago', type: 'upgrade' },
      { id: 'b4', action: '44 cancellations flagged for win-back outreach', time: '9 weeks ago', type: 'cancellation' },
      { id: 'b5', action: 'Referral push added 58 Basic members', time: '11 weeks ago', type: 'signup' },
    ],
    churnReasons: [
      { label: 'Price sensitivity', value: 44 },
      { label: 'Not using the content', value: 33 },
      { label: 'Failed payment', value: 25 },
      { label: 'Switched providers', value: 15 },
    ],
    growth: [
      { label: 'Month 1', value: 108 },
      { label: 'Month 2', value: 121 },
      { label: 'Month 3', value: 132 },
    ],
  },
  ytd: {
    totalMembers: 1042,
    activeSubs: 926,
    churn: '4.5%',
    changes: { members: '+26.5%', revenue: '+21.8%', active: '+18.4%', churn: '-2.3%' },
    tiers: { Basic: 402, Premium: 490, VIP: 150 },
    newSignups: 688,
    upgrades: 176,
    cancellations: 243,
    reactivations: 51,
    activity: [
      { id: 'c1', action: 'Membership base crossed 1,000 for the first time', time: 'Jun 2026', type: 'signup' },
      { id: 'c2', action: 'VIP tier launched with 42 founding members', time: 'Apr 2026', type: 'upgrade' },
      { id: 'c3', action: 'Annual billing option added, 188 members switched', time: 'Mar 2026', type: 'renewal' },
      { id: 'c4', action: 'Winter churn spike resolved after dunning fix', time: 'Feb 2026', type: 'cancellation' },
      { id: 'c5', action: 'New year promotion added 214 Basic members', time: 'Jan 2026', type: 'signup' },
    ],
    churnReasons: [
      { label: 'Price sensitivity', value: 91 },
      { label: 'Not using the content', value: 68 },
      { label: 'Failed payment', value: 54 },
      { label: 'Switched providers', value: 30 },
    ],
    growth: [
      { label: 'Q1', value: 214 },
      { label: 'Q2', value: 246 },
      { label: 'Q3', value: 228 },
    ],
  },
}

const SEED_MEMBERS: Member[] = [
  { id: 'm1', name: 'John Doe', email: 'john@example.com', tier: 'Premium', joined: '2024-01-15', renewal: '2026-09-15', cancelled: false, lifetimeValue: 2054, eventsAttended: 8, contentCompleted: 24, notes: 'Very active in the community forum. Good candidate for a VIP upgrade offer.' },
  { id: 'm2', name: 'Jane Smith', email: 'jane@example.com', tier: 'VIP', joined: '2024-02-20', renewal: '2027-02-20', cancelled: false, lifetimeValue: 5771, eventsAttended: 21, contentCompleted: 47, notes: 'Attends every roundtable. Has referred four members this year.' },
  { id: 'm3', name: 'Bob Johnson', email: 'bob@example.com', tier: 'Basic', joined: '2024-03-10', renewal: '2026-08-20', cancelled: false, lifetimeValue: 812, eventsAttended: 2, contentCompleted: 6, notes: 'Low engagement. Send the content highlights sequence before renewal.' },
  { id: 'm4', name: 'Alice Brown', email: 'alice@example.com', tier: 'Premium', joined: '2024-04-05', renewal: '2027-04-05', cancelled: false, lifetimeValue: 1975, eventsAttended: 11, contentCompleted: 19, notes: 'Requested an invoice-based billing option for next renewal.' },
  { id: 'm5', name: 'Marcus Lee', email: 'marcus@example.com', tier: 'VIP', joined: '2025-05-12', renewal: '2026-08-28', cancelled: false, lifetimeValue: 3184, eventsAttended: 14, contentCompleted: 33, notes: 'Coaching sessions booked through October.' },
  { id: 'm6', name: 'Priya Patel', email: 'priya@example.com', tier: 'Premium', joined: '2025-06-01', renewal: '2026-08-08', cancelled: false, lifetimeValue: 1106, eventsAttended: 6, contentCompleted: 15, notes: 'Card on file expired. Payment retry failed twice.' },
  { id: 'm7', name: 'Tom Nguyen', email: 'tom@example.com', tier: 'Basic', joined: '2025-07-19', renewal: '2026-10-19', cancelled: false, lifetimeValue: 377, eventsAttended: 3, contentCompleted: 9, notes: 'Joined from the webinar funnel.' },
  { id: 'm8', name: 'Rachel Green', email: 'rachel@example.com', tier: 'Premium', joined: '2023-11-02', renewal: '2026-11-02', cancelled: false, lifetimeValue: 2607, eventsAttended: 17, contentCompleted: 38, notes: 'Longest tenured Premium member. Great testimonial candidate.' },
  { id: 'm9', name: 'Carlos Rivera', email: 'carlos@example.com', tier: 'VIP', joined: '2024-09-30', renewal: '2026-09-30', cancelled: false, lifetimeValue: 4577, eventsAttended: 19, contentCompleted: 41, notes: 'Hosts the quarterly member panel.' },
  { id: 'm10', name: 'Dana White', email: 'dana@example.com', tier: 'Basic', joined: '2026-01-08', renewal: '2027-01-08', cancelled: false, lifetimeValue: 203, eventsAttended: 1, contentCompleted: 4, notes: 'New member. Onboarding sequence completed.' },
  { id: 'm11', name: 'Ethan Cole', email: 'ethan@example.com', tier: 'Premium', joined: '2025-02-14', renewal: '2026-08-30', cancelled: false, lifetimeValue: 1422, eventsAttended: 9, contentCompleted: 22, notes: 'Asked about pausing for two months over the summer.' },
  { id: 'm12', name: 'Sofia Martins', email: 'sofia@example.com', tier: 'Basic', joined: '2024-12-05', renewal: '2026-07-30', cancelled: false, lifetimeValue: 522, eventsAttended: 4, contentCompleted: 11, notes: 'Renewal declined by bank. Win-back note not sent yet.' },
]

const PAGE_SIZE = 6

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

function toDayNumber(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, (m || 1) - 1, d || 1) / 86400000
}

function daysUntil(iso: string): number {
  return toDayNumber(iso) - toDayNumber(TODAY)
}

function addYears(iso: string, years: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y + years}-${pad(m)}-${pad(d)}`
}

function nextRenewalFrom(iso: string): string {
  let next = addYears(iso, 1)
  let guard = 0
  while (daysUntil(next) < 0 && guard < 10) {
    next = addYears(next, 1)
    guard += 1
  }
  return next
}

function statusOf(member: Member): MemberStatus {
  if (member.cancelled) return 'Cancelled'
  const days = daysUntil(member.renewal)
  if (days < 0) return 'Past Due'
  if (days <= 30) return 'Expiring Soon'
  return 'Active'
}

function statusClasses(status: MemberStatus): string {
  if (status === 'Active') return 'bg-green-100 text-green-800'
  if (status === 'Expiring Soon') return 'bg-yellow-100 text-yellow-800'
  if (status === 'Past Due') return 'bg-red-100 text-red-800'
  return 'bg-gray-200 text-gray-700'
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function relTime(at: number): string {
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000))
  if (seconds < 60) return 'Just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

function currency(value: number): string {
  return `$${value.toLocaleString('en-US')}`
}

function csvCell(value: string | number): string {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export default function AdminView({ colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [period, setPeriod] = useState<PeriodKey>('30d')

  const [members, setMembers] = useState<Member[]>(SEED_MEMBERS)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [reminders, setReminders] = useState<Record<string, number>>({})
  const loadedRef = useRef(false)

  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<Tier[]>([])
  const [statusFilter, setStatusFilter] = useState<MemberStatus | 'All'>('All')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(1)

  const [statModal, setStatModal] = useState<StatKey | null>(null)
  const [activityModal, setActivityModal] = useState<ActivityItem | null>(null)
  const [tierModal, setTierModal] = useState<Tier | null>(null)
  const [memberModal, setMemberModal] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [notesDraft, setNotesDraft] = useState('')

  const [addOpen, setAddOpen] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', email: '', tier: 'Premium' as Tier, joined: TODAY, notes: '' })

  const [exportOpen, setExportOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')
  const [exportScope, setExportScope] = useState<'all' | 'filtered'>('all')
  const [exportDone, setExportDone] = useState(0)

  const [emailTarget, setEmailTarget] = useState<{ kind: 'member'; id: string } | { kind: 'tier'; tier: Tier } | null>(null)
  const [emailTemplate, setEmailTemplate] = useState('renewal')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const [renewTarget, setRenewTarget] = useState<string | null>(null)
  const [renewDone, setRenewDone] = useState(false)
  const [renewalBucket, setRenewalBucket] = useState<RenewalBucket>('all')

  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const rawMembers = localStorage.getItem(LS.members)
      if (rawMembers) {
        const parsed = JSON.parse(rawMembers)
        if (Array.isArray(parsed) && parsed.length > 0) setMembers(parsed)
      }
      const rawActivity = localStorage.getItem(LS.activity)
      if (rawActivity) {
        const parsed = JSON.parse(rawActivity)
        if (Array.isArray(parsed)) setActivity(parsed)
      }
      const rawReminders = localStorage.getItem(LS.reminders)
      if (rawReminders) {
        const parsed = JSON.parse(rawReminders)
        if (parsed && typeof parsed === 'object') setReminders(parsed)
      }
    } catch {
      // Ignore storage failures -- demo falls back to seed data
    }
    loadedRef.current = true
  }, [])

  useEffect(() => {
    if (!loadedRef.current) return
    try {
      localStorage.setItem(LS.members, JSON.stringify(members))
    } catch {
      // Storage unavailable -- state still lives for this session
    }
  }, [members])

  useEffect(() => {
    if (!loadedRef.current) return
    try {
      localStorage.setItem(LS.activity, JSON.stringify(activity.slice(0, 25)))
    } catch {
      // Storage unavailable -- state still lives for this session
    }
  }, [activity])

  useEffect(() => {
    if (!loadedRef.current) return
    try {
      localStorage.setItem(LS.reminders, JSON.stringify(reminders))
    } catch {
      // Storage unavailable -- state still lives for this session
    }
  }, [reminders])

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, tierFilter, statusFilter, sortKey, sortAsc])

  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }

  const logActivity = (action: string, type: ActivityItem['type']) => {
    setActivity(prev => [{ id: `u${Date.now()}${Math.random().toString(36).slice(2, 6)}`, action, time: '', type, at: Date.now() }, ...prev].slice(0, 25))
  }

  const snapshot = PERIOD_DATA[period]

  const rosterTierCounts = useMemo(() => {
    const counts: Record<Tier, number> = { Basic: 0, Premium: 0, VIP: 0 }
    members.forEach(m => {
      if (!m.cancelled) counts[m.tier] += 1
    })
    return counts
  }, [members])

  const seedTierCounts = useMemo(() => {
    const counts: Record<Tier, number> = { Basic: 0, Premium: 0, VIP: 0 }
    SEED_MEMBERS.forEach(m => {
      counts[m.tier] += 1
    })
    return counts
  }, [])

  const tierRows = useMemo(() => {
    const rows = TIERS.map(tier => {
      const count = Math.max(0, snapshot.tiers[tier] + (rosterTierCounts[tier] - seedTierCounts[tier]))
      return { tier, count, revenue: count * TIER_PRICE[tier] }
    })
    const total = rows.reduce((sum, row) => sum + row.count, 0) || 1
    return rows.map(row => ({ ...row, percentage: Math.round((row.count / total) * 100) }))
  }, [snapshot, rosterTierCounts, seedTierCounts])

  const totalMembers = tierRows.reduce((sum, row) => sum + row.count, 0)
  const monthlyRevenue = tierRows.reduce((sum, row) => sum + row.revenue, 0)
  const activeSubs = Math.max(
    0,
    snapshot.activeSubs + (members.filter(m => !m.cancelled).length - SEED_MEMBERS.length)
  )
  const arpu = totalMembers > 0 ? Math.round(monthlyRevenue / totalMembers) : 0

  const stats: { key: StatKey; label: string; value: string; change: string; color: string; icon: typeof Users }[] = [
    { key: 'members', label: 'Total Members', value: totalMembers.toLocaleString('en-US'), change: snapshot.changes.members, color: colors.primary, icon: Users },
    { key: 'revenue', label: 'Monthly Revenue', value: currency(monthlyRevenue), change: snapshot.changes.revenue, color: colors.success, icon: DollarSign },
    { key: 'active', label: 'Active Subscriptions', value: activeSubs.toLocaleString('en-US'), change: snapshot.changes.active, color: colors.secondary, icon: TrendingUp },
    { key: 'churn', label: 'Churn Rate', value: snapshot.churn, change: snapshot.changes.churn, color: colors.warning, icon: AlertTriangle },
  ]

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = members.filter(member => {
      const status = statusOf(member)
      if (query && !`${member.name} ${member.email} ${member.tier}`.toLowerCase().includes(query)) return false
      if (tierFilter.length > 0 && !tierFilter.includes(member.tier)) return false
      if (statusFilter !== 'All' && status !== statusFilter) return false
      return true
    })

    const direction = sortAsc ? 1 : -1
    const tierRank: Record<Tier, number> = { Basic: 1, Premium: 2, VIP: 3 }
    const statusRank: Record<MemberStatus, number> = { 'Past Due': 0, 'Expiring Soon': 1, Active: 2, Cancelled: 3 }

    return [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name) * direction
      if (sortKey === 'tier') return (tierRank[a.tier] - tierRank[b.tier]) * direction
      if (sortKey === 'joined') return (toDayNumber(a.joined) - toDayNumber(b.joined)) * direction
      if (sortKey === 'renewal') return (toDayNumber(a.renewal) - toDayNumber(b.renewal)) * direction
      return (statusRank[statusOf(a)] - statusRank[statusOf(b)]) * direction
    })
  }, [members, search, tierFilter, statusFilter, sortKey, sortAsc])

  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pagedMembers = filteredMembers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const activeFilterCount = tierFilter.length + (statusFilter === 'All' ? 0 : 1)

  const renewalCounts = useMemo(() => {
    const month = members.filter(m => {
      if (m.cancelled) return false
      const days = daysUntil(m.renewal)
      return days >= 0 && m.renewal.slice(0, 7) === TODAY.slice(0, 7)
    }).length
    const soon = members.filter(m => {
      if (m.cancelled) return false
      const days = daysUntil(m.renewal)
      return days >= 0 && days <= 30
    }).length
    const past = members.filter(m => !m.cancelled && daysUntil(m.renewal) < 0).length
    return { month, soon, past }
  }, [members])

  const renewalList = useMemo(() => {
    const list = members.filter(member => {
      if (member.cancelled) return renewalBucket === 'all'
      const days = daysUntil(member.renewal)
      if (renewalBucket === 'month') return days >= 0 && member.renewal.slice(0, 7) === TODAY.slice(0, 7)
      if (renewalBucket === 'soon') return days >= 0 && days <= 30
      if (renewalBucket === 'past') return days < 0
      return days <= 30
    })
    return [...list].sort((a, b) => toDayNumber(a.renewal) - toDayNumber(b.renewal))
  }, [members, renewalBucket])

  const selectedMember = memberModal ? members.find(m => m.id === memberModal) || null : null
  const emailMember = emailTarget && emailTarget.kind === 'member' ? members.find(m => m.id === emailTarget.id) || null : null
  const renewMember = renewTarget ? members.find(m => m.id === renewTarget) || null : null

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(prev => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const openMember = (id: string) => {
    const member = members.find(m => m.id === id)
    setNotesDraft(member ? member.notes : '')
    setConfirmDelete(false)
    setMemberModal(id)
  }

  const updateMember = (id: string, patch: Partial<Member>) => {
    setMembers(prev => prev.map(member => (member.id === id ? { ...member, ...patch } : member)))
  }

  const changeTier = (member: Member, tier: Tier) => {
    if (tier === member.tier) return
    const rank: Record<Tier, number> = { Basic: 1, Premium: 2, VIP: 3 }
    updateMember(member.id, { tier })
    const direction = rank[tier] > rank[member.tier] ? 'upgraded' : 'moved down'
    logActivity(`${member.name} ${direction} to ${tier}`, rank[tier] > rank[member.tier] ? 'upgrade' : 'edit')
    showToast(`${member.name} is now on the ${tier} plan`)
  }

  const saveNotes = (member: Member) => {
    updateMember(member.id, { notes: notesDraft })
    logActivity(`Notes updated for ${member.name}`, 'edit')
    showToast('Member notes saved')
  }

  const toggleCancelled = (member: Member) => {
    const next = !member.cancelled
    updateMember(member.id, {
      cancelled: next,
      renewal: !next && daysUntil(member.renewal) < 0 ? nextRenewalFrom(member.renewal) : member.renewal,
    })
    logActivity(
      next ? `${member.name} membership cancelled` : `${member.name} membership reactivated`,
      next ? 'cancellation' : 'renewal'
    )
    showToast(next ? `${member.name} moved to cancelled` : `${member.name} reactivated`)
  }

  const deleteMember = (member: Member) => {
    setMembers(prev => prev.filter(m => m.id !== member.id))
    setReminders(prev => {
      const next = { ...prev }
      delete next[member.id]
      return next
    })
    logActivity(`${member.name} removed from the roster`, 'cancellation')
    setMemberModal(null)
    setConfirmDelete(false)
    showToast(`${member.name} removed`)
  }

  const submitAddMember = (event: FormEvent) => {
    event.preventDefault()
    const name = addForm.name.trim()
    const email = addForm.email.trim()
    if (!name || !email) return
    const member: Member = {
      id: `m${Date.now()}`,
      name,
      email,
      tier: addForm.tier,
      joined: addForm.joined,
      renewal: nextRenewalFrom(addForm.joined),
      cancelled: false,
      lifetimeValue: TIER_PRICE[addForm.tier],
      eventsAttended: 0,
      contentCompleted: 0,
      notes: addForm.notes.trim() || 'Added from the admin dashboard. Onboarding sequence queued.',
    }
    setMembers(prev => [member, ...prev])
    logActivity(`${name} joined on the ${addForm.tier} tier`, 'signup')
    setAddForm({ name: '', email: '', tier: 'Premium', joined: TODAY, notes: '' })
    setAddOpen(false)
    setActiveTab('members')
    setSearch('')
    setTierFilter([])
    setStatusFilter('All')
    setSortKey('joined')
    setSortAsc(false)
    showToast(`${name} added to the roster`)
  }

  const exportRows = exportScope === 'filtered' ? filteredMembers : members

  const buildExport = (): string => {
    if (exportFormat === 'json') {
      return JSON.stringify(
        exportRows.map(member => ({
          name: member.name,
          email: member.email,
          tier: member.tier,
          joined: member.joined,
          renewal: member.renewal,
          status: statusOf(member),
          lifetimeValue: member.lifetimeValue,
        })),
        null,
        2
      )
    }
    const header = ['Name', 'Email', 'Tier', 'Joined', 'Renewal', 'Status', 'Lifetime Value']
    const lines = exportRows.map(member =>
      [member.name, member.email, member.tier, fmtDate(member.joined), fmtDate(member.renewal), statusOf(member), member.lifetimeValue]
        .map(csvCell)
        .join(',')
    )
    return [header.join(','), ...lines].join('\n')
  }

  const runExport = () => {
    const content = buildExport()
    const filename = `members-${exportScope}-${TODAY}.${exportFormat}`
    try {
      const blob = new Blob([content], {
        type: exportFormat === 'json' ? 'application/json;charset=utf-8' : 'text/csv;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      // Download blocked -- the preview below still shows the generated file
    }
    setExportDone(exportRows.length)
    logActivity(`Exported ${exportRows.length} member records as ${exportFormat.toUpperCase()}`, 'export')
    showToast(`${exportRows.length} records exported`)
  }

  const openEmailForMember = (id: string) => {
    const member = members.find(m => m.id === id)
    if (!member) return
    const template = EMAIL_TEMPLATES.find(t => t.id === (statusOf(member) === 'Past Due' ? 'winback' : 'renewal')) || EMAIL_TEMPLATES[0]
    setEmailTemplate(template.id)
    setEmailSubject(template.subject)
    setEmailBody(fillTemplate(template.body, member))
    setEmailSent(false)
    setEmailTarget({ kind: 'member', id })
  }

  const openEmailForTier = (tier: Tier) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === 'upgrade') || EMAIL_TEMPLATES[0]
    setEmailTemplate(template.id)
    setEmailSubject(template.subject)
    setEmailBody(template.body.replace(/\{\{name\}\}/g, 'there').replace(/\{\{tier\}\}/g, tier).replace(/\{\{renewal\}\}/g, 'your renewal date'))
    setEmailSent(false)
    setEmailTarget({ kind: 'tier', tier })
  }

  function fillTemplate(body: string, member: Member): string {
    return body
      .replace(/\{\{name\}\}/g, member.name.split(' ')[0])
      .replace(/\{\{tier\}\}/g, member.tier)
      .replace(/\{\{renewal\}\}/g, fmtDate(member.renewal))
  }

  const applyTemplate = (id: string) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === id)
    if (!template) return
    setEmailTemplate(id)
    setEmailSubject(template.subject)
    if (emailTarget && emailTarget.kind === 'member') {
      const member = members.find(m => m.id === emailTarget.id)
      setEmailBody(member ? fillTemplate(template.body, member) : template.body)
    } else if (emailTarget && emailTarget.kind === 'tier') {
      setEmailBody(
        template.body.replace(/\{\{name\}\}/g, 'there').replace(/\{\{tier\}\}/g, emailTarget.tier).replace(/\{\{renewal\}\}/g, 'your renewal date')
      )
    } else {
      setEmailBody(template.body)
    }
  }

  const sendEmail = (event: FormEvent) => {
    event.preventDefault()
    if (!emailTarget) return
    if (emailTarget.kind === 'member') {
      const member = members.find(m => m.id === emailTarget.id)
      if (member) {
        setReminders(prev => ({ ...prev, [member.id]: Date.now() }))
        logActivity(`Email sent to ${member.name}: ${emailSubject || 'no subject'}`, 'email')
        showToast(`Message queued for ${member.name}`)
      }
    } else {
      const count = tierRows.find(row => row.tier === emailTarget.tier)?.count || 0
      logActivity(`Broadcast sent to ${count.toLocaleString('en-US')} ${emailTarget.tier} members`, 'email')
      showToast(`Broadcast queued for ${count.toLocaleString('en-US')} members`)
    }
    setEmailSent(true)
  }

  const sendReminder = (member: Member) => {
    setReminders(prev => ({ ...prev, [member.id]: Date.now() }))
    logActivity(`Renewal reminder sent to ${member.name}`, 'email')
    showToast(`Reminder sent to ${member.name}`)
  }

  const confirmRenewal = () => {
    if (!renewMember) return
    updateMember(renewMember.id, {
      renewal: nextRenewalFrom(renewMember.renewal),
      cancelled: false,
      lifetimeValue: renewMember.lifetimeValue + TIER_PRICE[renewMember.tier] * 12,
    })
    logActivity(`${renewMember.name} renewed on the ${renewMember.tier} tier`, 'renewal')
    setRenewDone(true)
    showToast(`${renewMember.name} renewed`)
  }

  const statBreakdown = (key: StatKey) => {
    if (key === 'members') {
      return {
        title: 'Total Members',
        value: totalMembers.toLocaleString('en-US'),
        rows: [
          ...tierRows.map(row => ({ label: `${row.tier} tier`, value: `${row.count.toLocaleString('en-US')} members` })),
          { label: 'New signups this period', value: snapshot.newSignups.toLocaleString('en-US') },
          { label: 'Reactivations', value: snapshot.reactivations.toLocaleString('en-US') },
        ],
        bars: snapshot.growth.map(point => ({ label: point.label, value: point.value })),
        barsLabel: 'New members',
        note: 'Roster changes you make in the Members tab roll into these totals.',
      }
    }
    if (key === 'revenue') {
      return {
        title: 'Monthly Revenue',
        value: currency(monthlyRevenue),
        rows: [
          ...tierRows.map(row => ({ label: `${row.tier} at ${currency(TIER_PRICE[row.tier])}/mo`, value: currency(row.revenue) })),
          { label: 'Average revenue per member', value: `${currency(arpu)}/mo` },
          { label: 'Annualized run rate', value: currency(monthlyRevenue * 12) },
        ],
        bars: tierRows.map(row => ({ label: row.tier, value: row.revenue })),
        barsLabel: 'Revenue by tier',
        note: 'Revenue is calculated from the live tier mix at published tier pricing.',
      }
    }
    if (key === 'active') {
      return {
        title: 'Active Subscriptions',
        value: activeSubs.toLocaleString('en-US'),
        rows: [
          { label: 'Auto-renew on', value: Math.round(activeSubs * 0.87).toLocaleString('en-US') },
          { label: 'Auto-renew off', value: Math.round(activeSubs * 0.13).toLocaleString('en-US') },
          { label: 'Renewing this month', value: renewalCounts.month.toLocaleString('en-US') },
          { label: 'Payment method expiring', value: renewalCounts.past.toLocaleString('en-US') },
        ],
        bars: snapshot.growth.map(point => ({ label: point.label, value: point.value })),
        barsLabel: 'Net new subscriptions',
        note: 'Cancelling a member in the roster drops this count immediately.',
      }
    }
    return {
      title: 'Churn Rate',
      value: snapshot.churn,
      rows: [
        ...snapshot.churnReasons.map(reason => ({ label: reason.label, value: `${reason.value} members` })),
        { label: 'Total cancellations', value: snapshot.cancellations.toLocaleString('en-US') },
        { label: 'Won back', value: snapshot.reactivations.toLocaleString('en-US') },
      ],
      bars: snapshot.churnReasons.map(reason => ({ label: reason.label, value: reason.value })),
      barsLabel: 'Cancellation reasons',
      note: 'Failed payments are the fastest churn source to recover -- work the Renewals tab first.',
    }
  }

  const combinedActivity: ActivityItem[] = [...activity, ...snapshot.activity]

  const activityDotClass = (type: ActivityItem['type']) => {
    if (type === 'signup') return 'bg-green-500'
    if (type === 'renewal') return 'bg-blue-500'
    if (type === 'upgrade') return 'bg-purple-500'
    if (type === 'email') return 'bg-sky-500'
    if (type === 'export') return 'bg-amber-500'
    if (type === 'edit') return 'bg-slate-400'
    return 'bg-red-500'
  }

  const activityDetail = (item: ActivityItem) => {
    if (item.type === 'signup') return 'New membership records were created and the welcome sequence was queued. Payment method captured at signup.'
    if (item.type === 'renewal') return 'Renewals processed against the card on file. Receipts were emailed and the renewal date moved forward one billing cycle.'
    if (item.type === 'upgrade') return 'Tier change applied with prorated billing. Higher-tier content and event access unlocked right away.'
    if (item.type === 'cancellation') return 'Membership set to cancelled. Access continues through the end of the paid term, and the win-back sequence starts seven days later.'
    if (item.type === 'email') return 'Message handed to the outbound queue. Delivery, opens, and replies show up on the member record.'
    if (item.type === 'export') return 'A member export was generated from the current roster. Exports include tier, renewal date, status, and lifetime value.'
    return 'Member record updated by an admin. Every field change is versioned on the member timeline.'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Membership Management</h1>
              <p className="mt-2" style={{ color: colors.textLight }}>Admin Dashboard</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: colors.border }}>
                {PERIODS.map(item => (
                  <button
                    key={item.key}
                    onClick={() => setPeriod(item.key)}
                    className="px-3 py-2 text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: period === item.key ? colors.primary : 'white',
                      color: period === item.key ? 'white' : colors.textLight,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setExportDone(0)
                  setExportOpen(true)
                }}
                className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button
                onClick={() => setAddOpen(true)}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <button
                key={stat.key}
                onClick={() => setStatModal(stat.key)}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: colors.textLight }}>{stat.label}</p>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm" style={{ color: colors.success }}>
                  {stat.change} from previous period
                </p>
                <p className="text-xs mt-3 font-semibold flex items-center gap-1" style={{ color: colors.primary }}>
                  View breakdown
                  <ChevronRight className="w-3 h-3" />
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'members', 'tiers', 'renewals'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors whitespace-nowrap ${
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tier Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Membership Tier Distribution</h2>
              <div className="space-y-6">
                {tierRows.map(row => (
                  <button
                    key={row.tier}
                    onClick={() => setTierModal(row.tier)}
                    className="w-full text-left rounded-lg p-3 -m-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className="font-semibold" style={{ color: colors.text }}>{row.tier}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: colors.text }}>{row.count.toLocaleString('en-US')} members</p>
                        <p className="text-sm" style={{ color: colors.textLight }}>{currency(row.revenue)}</p>
                      </div>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${row.percentage}%`, backgroundColor: colors.primary }}
                      />
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.textLight }}>{row.percentage}% of total members</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('tiers')}
                className="w-full mt-6 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                Open tier performance
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Activity</h2>
                <span className="text-sm" style={{ color: colors.textLight }}>{PERIODS.find(p => p.key === period)?.label}</span>
              </div>
              <div className="space-y-4">
                {combinedActivity.slice(0, 8).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActivityModal(item)}
                    className="w-full text-left flex items-start gap-4 pb-4 border-b last:border-b-0 hover:opacity-80 transition-opacity"
                    style={{ borderColor: colors.border }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${activityDotClass(item.type)}`} />
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: colors.text }}>{item.action}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{item.at ? relTime(item.at) : item.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 mt-1" style={{ color: colors.textLight }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>All Members</h2>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  {filteredMembers.length} of {members.length} records
                  {activeFilterCount > 0 ? ` (${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'} on)` : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search members..."
                    aria-label="Search members"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    className="pl-10 pr-9 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" style={{ color: colors.textLight }} />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(prev => !prev)}
                    className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    style={{
                      borderColor: activeFilterCount > 0 ? colors.primary : colors.border,
                      color: activeFilterCount > 0 ? colors.primary : colors.text,
                    }}
                  >
                    <Filter className="w-5 h-5" />
                    Filter
                    {activeFilterCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: colors.primary }}>
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  {showFilterMenu && (
                    <>
                      <button
                        className="fixed inset-0 z-20 cursor-default"
                        aria-label="Close filters"
                        onClick={() => setShowFilterMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border z-30 p-4" style={{ borderColor: colors.border }}>
                        <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Tier</p>
                        <div className="space-y-2 mb-4">
                          {TIERS.map(tier => (
                            <label key={tier} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: colors.text }}>
                              <input
                                type="checkbox"
                                checked={tierFilter.includes(tier)}
                                onChange={() =>
                                  setTierFilter(prev => (prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]))
                                }
                              />
                              {tier}
                            </label>
                          ))}
                        </div>
                        <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Status</p>
                        <select
                          aria-label="Filter by status"
                          value={statusFilter}
                          onChange={event => setStatusFilter(event.target.value as MemberStatus | 'All')}
                          className="w-full px-3 py-2 rounded-lg border text-sm mb-4 bg-white"
                          style={{ borderColor: colors.border, color: colors.text }}
                        >
                          <option value="All">All statuses</option>
                          <option value="Active">Active</option>
                          <option value="Expiring Soon">Expiring Soon</option>
                          <option value="Past Due">Past Due</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setTierFilter([])
                              setStatusFilter('All')
                            }}
                            className="flex-1 py-2 rounded-lg border text-sm font-semibold hover:bg-gray-50 transition-colors"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => setShowFilterMenu(false)}
                            className="flex-1 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: colors.border }}>
                    {([
                      { key: 'name', label: 'Member' },
                      { key: 'tier', label: 'Tier' },
                      { key: 'joined', label: 'Joined' },
                      { key: 'status', label: 'Status' },
                      { key: 'renewal', label: 'Renewal' },
                    ] as { key: SortKey; label: string }[]).map(column => (
                      <th key={column.key} className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>
                        <button onClick={() => toggleSort(column.key)} className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                          {column.label}
                          <ArrowUpDown className="w-3 h-3" style={{ color: sortKey === column.key ? colors.primary : colors.textLight }} />
                        </button>
                      </th>
                    ))}
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Email</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: colors.text }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedMembers.map(member => {
                    const status = statusOf(member)
                    return (
                      <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                        <td className="py-4 px-4">
                          <button onClick={() => openMember(member.id)} className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                              {initials(member.name)}
                            </div>
                            <span className="font-semibold hover:underline" style={{ color: colors.text }}>{member.name}</span>
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{
                            backgroundColor: member.tier === 'VIP' ? colors.accent + '20' : colors.primary + '20',
                            color: member.tier === 'VIP' ? colors.accent : colors.primary
                          }}>
                            {member.tier}
                          </span>
                        </td>
                        <td className="py-4 px-4" style={{ color: colors.textLight }}>{fmtDate(member.joined)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="py-4 px-4" style={{ color: colors.textLight }}>{fmtDate(member.renewal)}</td>
                        <td className="py-4 px-4" style={{ color: colors.textLight }}>{member.email}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEmailForMember(member.id)}
                              className="p-2 rounded hover:bg-gray-100 transition-colors"
                              title={`Email ${member.name}`}
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                            </button>
                            <button
                              onClick={() => {
                                setRenewDone(false)
                                setRenewTarget(member.id)
                              }}
                              className="p-2 rounded hover:bg-gray-100 transition-colors"
                              title={`Renew ${member.name}`}
                              aria-label={`Renew ${member.name}`}
                            >
                              <RefreshCw className="w-4 h-4" style={{ color: colors.secondary }} />
                            </button>
                            <button
                              onClick={() => openMember(member.id)}
                              className="px-3 py-1 rounded-lg border text-sm font-semibold hover:bg-gray-50 transition-colors"
                              style={{ borderColor: colors.border, color: colors.primary }}
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {pagedMembers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center" style={{ color: colors.textLight }}>
                        No members match the current search and filters.
                        <button
                          onClick={() => {
                            setSearch('')
                            setTierFilter([])
                            setStatusFilter('All')
                          }}
                          className="ml-2 font-semibold hover:underline"
                          style={{ color: colors.primary }}
                        >
                          Reset
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredMembers.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <p className="text-sm" style={{ color: colors.textLight }}>
                  Showing {(safePage - 1) * PAGE_SIZE + 1} to {Math.min(safePage * PAGE_SIZE, filteredMembers.length)} of {filteredMembers.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={safePage === 1}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors disabled:opacity-40"
                    style={{ borderColor: colors.border, color: colors.text }}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className="w-9 h-9 rounded-lg border text-sm font-semibold transition-colors"
                      style={{
                        borderColor: pageNumber === safePage ? colors.primary : colors.border,
                        backgroundColor: pageNumber === safePage ? colors.primary : 'white',
                        color: pageNumber === safePage ? 'white' : colors.text,
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(prev => Math.min(pageCount, prev + 1))}
                    disabled={safePage === pageCount}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors disabled:opacity-40"
                    style={{ borderColor: colors.border, color: colors.text }}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierRows.map(row => (
              <div key={row.tier} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{row.tier}</h3>
                  <Crown className="w-8 h-8" style={{ color: colors.primary }} />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Total Members</p>
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>{row.count.toLocaleString('en-US')}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Monthly Revenue</p>
                    <p className="text-2xl font-bold" style={{ color: colors.success }}>{currency(row.revenue)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Percentage</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div className="h-2 rounded-full" style={{ width: `${row.percentage}%`, backgroundColor: colors.primary }} />
                      </div>
                      <span className="font-bold" style={{ color: colors.text }}>{row.percentage}%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setTierModal(row.tier)}
                  className="w-full py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.primary }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: 'month' as RenewalBucket, label: 'Renewing This Month', value: renewalCounts.month, color: colors.success },
                { key: 'soon' as RenewalBucket, label: 'Expiring Soon', value: renewalCounts.soon, color: colors.warning },
                { key: 'past' as RenewalBucket, label: 'Past Due', value: renewalCounts.past, color: colors.error },
              ].map(card => (
                <button
                  key={card.key}
                  onClick={() => setRenewalBucket(prev => (prev === card.key ? 'all' : card.key))}
                  className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow border-2"
                  style={{ borderColor: renewalBucket === card.key ? card.color : 'transparent' }}
                >
                  <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight }}>{card.label}</p>
                  <p className="text-4xl font-bold" style={{ color: card.color }}>{card.value}</p>
                  <p className="text-xs mt-3 font-semibold" style={{ color: colors.primary }}>
                    {renewalBucket === card.key ? 'Filtering the list below -- tap to clear' : 'Tap to filter the list below'}
                  </p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  {renewalBucket === 'all' ? 'Upcoming Renewals' : renewalBucket === 'month' ? 'Renewing This Month' : renewalBucket === 'soon' ? 'Expiring Within 30 Days' : 'Past Due Accounts'}
                </h2>
                {renewalBucket !== 'all' && (
                  <button
                    onClick={() => setRenewalBucket('all')}
                    className="text-sm font-semibold hover:underline"
                    style={{ color: colors.primary }}
                  >
                    Show all upcoming
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {renewalList.map(member => {
                  const status = statusOf(member)
                  const reminded = reminders[member.id]
                  return (
                    <div key={member.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.secondary }}>
                            {initials(member.name)}
                          </div>
                          <div>
                            <button onClick={() => openMember(member.id)} className="font-bold hover:underline text-left" style={{ color: colors.text }}>
                              {member.name}
                            </button>
                            <p className="text-sm" style={{ color: colors.textLight }}>
                              {member.tier} at {currency(TIER_PRICE[member.tier])}/mo, renews {fmtDate(member.renewal)}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses(status)}`}>{status}</span>
                              {reminded && (
                                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: colors.success }}>
                                  <Check className="w-3 h-3" />
                                  Reminder sent {relTime(reminded)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => sendReminder(member)}
                            className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Clock className="w-4 h-4" />
                            {reminded ? 'Resend Reminder' : 'Send Reminder'}
                          </button>
                          <button
                            onClick={() => {
                              setRenewDone(false)
                              setRenewTarget(member.id)
                            }}
                            className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Process Renewal
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {renewalList.length === 0 && (
                  <div className="py-10 text-center" style={{ color: colors.textLight }}>
                    Nothing in this bucket right now. Every membership here is paid through its next cycle.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stat Breakdown Modal */}
      {statModal && (() => {
        const detail = statBreakdown(statModal)
        const maxBar = Math.max(...detail.bars.map(bar => bar.value), 1)
        return (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setStatModal(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={event => event.stopPropagation()}>
              <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>{detail.title}</h3>
                  <p className="text-3xl font-bold mt-1" style={{ color: colors.primary }}>{detail.value}</p>
                  <p className="text-sm" style={{ color: colors.textLight }}>{PERIODS.find(p => p.key === period)?.label}</p>
                </div>
                <button onClick={() => setStatModal(null)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="space-y-3">
                  {detail.rows.map((row, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span style={{ color: colors.textLight }}>{row.label}</span>
                      <span className="font-bold" style={{ color: colors.text }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold mb-3" style={{ color: colors.text }}>{detail.barsLabel}</p>
                  <div className="space-y-2">
                    {detail.bars.map((bar, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between text-xs mb-1" style={{ color: colors.textLight }}>
                          <span>{bar.label}</span>
                          <span>{bar.value.toLocaleString('en-US')}</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                          <div className="h-2 rounded-full" style={{ width: `${Math.round((bar.value / maxBar) * 100)}%`, backgroundColor: colors.primary }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs p-3 rounded-lg" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>{detail.note}</p>
              </div>
              <div className="p-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: colors.border }}>
                <button
                  onClick={() => {
                    setStatModal(null)
                    setActiveTab(statModal === 'churn' ? 'renewals' : 'members')
                  }}
                  className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  {statModal === 'churn' ? 'Work the renewals queue' : 'Open member roster'}
                </button>
                <button
                  onClick={() => setStatModal(null)}
                  className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Activity Detail Modal */}
      {activityModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setActivityModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={event => event.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${activityDotClass(activityModal.type)}`} />
                <div>
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>{activityModal.action}</h3>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    {activityModal.at ? relTime(activityModal.at) : activityModal.time} | {activityModal.type}
                  </p>
                </div>
              </div>
              <button onClick={() => setActivityModal(null)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>{activityDetail(activityModal)}</p>
              <button
                onClick={() => setActivityModal(null)}
                className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tier Detail Modal */}
      {tierModal && (() => {
        const row = tierRows.find(item => item.tier === tierModal)
        if (!row) return null
        const health = TIER_HEALTH[tierModal]
        const rosterInTier = members.filter(member => member.tier === tierModal)
        return (
          <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setTierModal(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={event => event.stopPropagation()}>
              <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                    <Crown className="w-5 h-5" style={{ color: colors.accent }} />
                    {row.tier} Tier
                  </h3>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    {currency(TIER_PRICE[row.tier])}/month | {row.count.toLocaleString('en-US')} members | {currency(row.revenue)} monthly
                  </p>
                </div>
                <button onClick={() => setTierModal(null)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                    <p className="text-xs" style={{ color: colors.textLight }}>Retention</p>
                    <p className="text-lg font-bold" style={{ color: colors.success }}>{health.retention}</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                    <p className="text-xs" style={{ color: colors.textLight }}>Avg tenure</p>
                    <p className="text-lg font-bold" style={{ color: colors.primary }}>{health.tenure}</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                    <p className="text-xs" style={{ color: colors.textLight }}>Share</p>
                    <p className="text-lg font-bold" style={{ color: colors.secondary }}>{row.percentage}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Included benefits</p>
                  <ul className="space-y-2">
                    {TIER_BENEFITS[row.tier].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm" style={{ color: colors.text }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs mt-3" style={{ color: colors.textLight }}>{health.upgradeRate}</p>
                </div>

                <div>
                  <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>On this tier in your roster ({rosterInTier.length})</p>
                  <div className="space-y-2">
                    {rosterInTier.slice(0, 5).map(member => (
                      <button
                        key={member.id}
                        onClick={() => {
                          setTierModal(null)
                          openMember(member.id)
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-lg border text-left hover:bg-gray-50 transition-colors"
                        style={{ borderColor: colors.border }}
                      >
                        <span className="text-sm font-semibold" style={{ color: colors.text }}>{member.name}</span>
                        <span className="text-xs" style={{ color: colors.textLight }}>renews {fmtDate(member.renewal)}</span>
                      </button>
                    ))}
                    {rosterInTier.length === 0 && (
                      <p className="text-sm" style={{ color: colors.textLight }}>No roster records on this tier yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: colors.border }}>
                <button
                  onClick={() => {
                    setTierFilter([row.tier])
                    setStatusFilter('All')
                    setSearch('')
                    setActiveTab('members')
                    setTierModal(null)
                  }}
                  className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  View {row.tier} members
                </button>
                <button
                  onClick={() => {
                    const tier = row.tier
                    setTierModal(null)
                    openEmailForTier(tier)
                  }}
                  className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <Mail className="w-4 h-4" />
                  Email this tier
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setMemberModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[88vh] flex flex-col" onClick={event => event.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: colors.secondary }}>
                  {initials(selectedMember.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>{selectedMember.name}</h3>
                  <p className="text-sm" style={{ color: colors.textLight }}>{selectedMember.email}</p>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-medium ${statusClasses(statusOf(selectedMember))}`}>
                    {statusOf(selectedMember)}
                  </span>
                </div>
              </div>
              <button onClick={() => setMemberModal(null)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Lifetime value</p>
                  <p className="font-bold" style={{ color: colors.success }}>{currency(selectedMember.lifetimeValue)}</p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Events</p>
                  <p className="font-bold" style={{ color: colors.primary }}>{selectedMember.eventsAttended}</p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Content done</p>
                  <p className="font-bold" style={{ color: colors.primary }}>{selectedMember.contentCompleted}</p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Member since</p>
                  <p className="font-bold text-sm" style={{ color: colors.text }}>{fmtDate(selectedMember.joined)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="member-tier-select" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Membership tier</label>
                  <select
                    id="member-tier-select"
                    value={selectedMember.tier}
                    onChange={event => changeTier(selectedMember, event.target.value as Tier)}
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    {TIERS.map(tier => (
                      <option key={tier} value={tier}>{tier} -- {currency(TIER_PRICE[tier])}/mo</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Next renewal</p>
                  <div className="px-3 py-2 rounded-lg border flex items-center gap-2" style={{ borderColor: colors.border, color: colors.text }}>
                    <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                    {fmtDate(selectedMember.renewal)}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="member-notes" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Internal notes</label>
                <textarea
                  id="member-notes"
                  rows={3}
                  value={notesDraft}
                  onChange={event => setNotesDraft(event.target.value)}
                  className="w-full px-3 py-2 rounded-lg border resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                />
                <button
                  onClick={() => saveNotes(selectedMember)}
                  disabled={notesDraft === selectedMember.notes}
                  className="mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: colors.primary }}
                >
                  Save notes
                </button>
              </div>

              {reminders[selectedMember.id] && (
                <p className="text-sm font-semibold flex items-center gap-2" style={{ color: colors.success }}>
                  <Check className="w-4 h-4" />
                  Last outbound message {relTime(reminders[selectedMember.id])}
                </p>
              )}
            </div>

            <div className="p-5 border-t space-y-3" style={{ borderColor: colors.border }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    const id = selectedMember.id
                    setMemberModal(null)
                    openEmailForMember(id)
                  }}
                  className="py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => {
                    const id = selectedMember.id
                    setMemberModal(null)
                    setRenewDone(false)
                    setRenewTarget(id)
                  }}
                  className="py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Renew
                </button>
                <button
                  onClick={() => toggleCancelled(selectedMember)}
                  className="py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: selectedMember.cancelled ? colors.success : colors.warning }}
                >
                  {selectedMember.cancelled ? 'Reactivate' : 'Cancel plan'}
                </button>
              </div>
              {confirmDelete ? (
                <div className="p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-sm flex-1" style={{ color: colors.text }}>Remove {selectedMember.name} from the roster?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 rounded-lg border text-sm font-semibold hover:bg-white transition-colors"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      Keep
                    </button>
                    <button
                      onClick={() => deleteMember(selectedMember)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: colors.error }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full py-2 rounded-lg text-sm font-semibold hover:underline flex items-center justify-center gap-2"
                  style={{ color: colors.error }}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove member
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {addOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setAddOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[88vh] overflow-y-auto" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                <Plus className="w-5 h-5" style={{ color: colors.primary }} />
                Add Member
              </h3>
              <button onClick={() => setAddOpen(false)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submitAddMember} className="p-6 space-y-4">
              <div>
                <label htmlFor="add-member-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Full name *</label>
                <input
                  id="add-member-name"
                  type="text"
                  required
                  value={addForm.name}
                  onChange={event => setAddForm(prev => ({ ...prev, name: event.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="Jordan Rivers"
                />
              </div>
              <div>
                <label htmlFor="add-member-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Email *</label>
                <input
                  id="add-member-email"
                  type="email"
                  required
                  value={addForm.email}
                  onChange={event => setAddForm(prev => ({ ...prev, email: event.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="jordan@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="add-member-tier" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Tier</label>
                  <select
                    id="add-member-tier"
                    value={addForm.tier}
                    onChange={event => setAddForm(prev => ({ ...prev, tier: event.target.value as Tier }))}
                    className="w-full px-4 py-2 rounded-lg border bg-white"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    {TIERS.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="add-member-joined" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Start date</label>
                  <input
                    id="add-member-joined"
                    type="date"
                    value={addForm.joined}
                    onChange={event => setAddForm(prev => ({ ...prev, joined: event.target.value || TODAY }))}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="add-member-notes" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Notes</label>
                <textarea
                  id="add-member-notes"
                  rows={3}
                  value={addForm.notes}
                  onChange={event => setAddForm(prev => ({ ...prev, notes: event.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: colors.border, color: colors.text }}
                  placeholder="Where did this member come from?"
                />
              </div>
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
                Billing starts at {currency(TIER_PRICE[addForm.tier])}/month and the first renewal lands on {fmtDate(nextRenewalFrom(addForm.joined || TODAY))}.
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Add to roster
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setExportOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[88vh] flex flex-col" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                Export Member Data
              </h3>
              <button onClick={() => setExportOpen(false)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              {exportDone > 0 ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.success + '20' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: colors.success }} />
                  </div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{exportDone} records exported</h4>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    File name: members-{exportScope}-{TODAY}.{exportFormat}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Format</p>
                    <div className="flex gap-3">
                      {(['csv', 'json'] as const).map(format => (
                        <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          className="flex-1 py-2 rounded-lg border font-semibold uppercase text-sm transition-colors"
                          style={{
                            borderColor: exportFormat === format ? colors.primary : colors.border,
                            backgroundColor: exportFormat === format ? colors.primary : 'white',
                            color: exportFormat === format ? 'white' : colors.text,
                          }}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Records</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setExportScope('all')}
                        className="flex-1 py-2 rounded-lg border font-semibold text-sm transition-colors"
                        style={{
                          borderColor: exportScope === 'all' ? colors.primary : colors.border,
                          backgroundColor: exportScope === 'all' ? colors.primary : 'white',
                          color: exportScope === 'all' ? 'white' : colors.text,
                        }}
                      >
                        All members ({members.length})
                      </button>
                      <button
                        onClick={() => setExportScope('filtered')}
                        className="flex-1 py-2 rounded-lg border font-semibold text-sm transition-colors"
                        style={{
                          borderColor: exportScope === 'filtered' ? colors.primary : colors.border,
                          backgroundColor: exportScope === 'filtered' ? colors.primary : 'white',
                          color: exportScope === 'filtered' ? 'white' : colors.text,
                        }}
                      >
                        Current filter ({filteredMembers.length})
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Preview</p>
                <pre className="p-3 rounded-lg text-xs overflow-x-auto max-h-40" style={{ backgroundColor: colors.backgroundAlt, color: colors.text }}>
{buildExport().split('\n').slice(0, 8).join('\n') || 'No records selected'}
                </pre>
              </div>
            </div>
            <div className="p-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: colors.border }}>
              <button
                onClick={runExport}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" />
                {exportDone > 0 ? 'Download again' : 'Download file'}
              </button>
              <button
                onClick={() => setExportOpen(false)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Composer Modal */}
      {emailTarget && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setEmailTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[88vh] flex flex-col" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                  <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                  Compose Message
                </h3>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  To: {emailTarget.kind === 'member'
                    ? `${emailMember?.name || 'Member'} (${emailMember?.email || ''})`
                    : `${(tierRows.find(row => row.tier === emailTarget.tier)?.count || 0).toLocaleString('en-US')} ${emailTarget.tier} members`}
                </p>
              </div>
              <button onClick={() => setEmailTarget(null)} aria-label="Close" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {emailSent ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.success + '20' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: colors.success }} />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Message queued</h4>
                <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                  {emailTarget.kind === 'member'
                    ? `${emailMember?.name || 'The member'} will receive this in the next send window, and it is logged on their timeline.`
                    : `The broadcast is scheduled for the ${emailTarget.tier} segment and logged in recent activity.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setEmailSent(false)}
                    className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Write another
                  </button>
                  <button
                    onClick={() => setEmailTarget(null)}
                    className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={sendEmail} className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label htmlFor="email-template" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Template</label>
                  <select
                    id="email-template"
                    value={emailTemplate}
                    onChange={event => applyTemplate(event.target.value)}
                    className="w-full px-4 py-2 rounded-lg border bg-white"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    {EMAIL_TEMPLATES.map(template => (
                      <option key={template.id} value={template.id}>{template.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="email-subject" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Subject *</label>
                  <input
                    id="email-subject"
                    type="text"
                    required
                    value={emailSubject}
                    onChange={event => setEmailSubject(event.target.value)}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <div>
                  <label htmlFor="email-body" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Message *</label>
                  <textarea
                    id="email-body"
                    required
                    rows={8}
                    value={emailBody}
                    onChange={event => setEmailBody(event.target.value)}
                    className="w-full px-4 py-2 rounded-lg border resize-none focus:outline-none focus:ring-2 text-sm"
                    style={{ borderColor: colors.border, color: colors.text }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Process Renewal Modal */}
      {renewMember && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setRenewTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={event => event.stopPropagation()}>
            {renewDone ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.success + '20' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: colors.success }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Renewal processed</h3>
                <p className="text-sm mb-2" style={{ color: colors.textLight }}>
                  {renewMember.name} is paid through {fmtDate(renewMember.renewal)} and the account is back to Active.
                </p>
                <p className="text-xs mb-6" style={{ color: colors.textLight }}>
                  This is a simulated billing run for the demo. No card was charged.
                </p>
                <button
                  onClick={() => setRenewTarget(null)}
                  className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Back to renewals
                </button>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>Process renewal</h3>
                <p className="text-sm mb-5" style={{ color: colors.textLight }}>{renewMember.name} | {renewMember.email}</p>
                <div className="space-y-2 mb-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span style={{ color: colors.textLight }}>Plan</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{renewMember.tier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: colors.textLight }}>Amount</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{currency(TIER_PRICE[renewMember.tier] * 12)} for 12 months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: colors.textLight }}>Current renewal date</span>
                    <span className="font-semibold" style={{ color: colors.text }}>{fmtDate(renewMember.renewal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: colors.textLight }}>New renewal date</span>
                    <span className="font-semibold" style={{ color: colors.success }}>{fmtDate(nextRenewalFrom(renewMember.renewal))}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg text-xs mb-5" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
                  Charges the card on file and moves the renewal date forward. Simulated for the demo -- no payment is collected.
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setRenewTarget(null)}
                    className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Not now
                  </button>
                  <button
                    onClick={confirmRenewal}
                    className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Confirm renewal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-5 py-3 rounded-xl shadow-2xl text-white font-semibold flex items-center gap-2" style={{ backgroundColor: colors.primary }}>
          <Check className="w-4 h-4" />
          {toast}
        </div>
      )}
    </div>
  )
}
