'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Users, TrendingUp, DollarSign, Gift, Award, X, Plus, Minus, Search } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface AdminAppointment {
  id: string
  time: string
  client: string
  service: string
  therapist: string
  status: string
}

interface Member {
  id: string
  name: string
  email: string
  plan: string
  joined: string
  visits: number
}

interface InventoryItem {
  name: string
  category: string
  price: number
  stock: number
}

interface GiftCert {
  code: string
  recipient: string
  amount: number
  status: 'Active' | 'Redeemed'
}

const STATUSES = ['Pending', 'Confirmed', 'Checked In', 'Completed']

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '10:30 AM', '11:30 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:30 PM', '4:00 PM', '5:00 PM', '6:00 PM']

const SERVICE_OPTIONS = [
  'Swedish Massage', 'Deep Tissue Massage', 'Hot Stone Massage',
  'Hydrating Facial', 'Anti-Aging Facial', 'Microdermabrasion',
  'Body Scrub', 'Body Wrap', 'Hydrotherapy'
]

const THERAPIST_OPTIONS = ['Sarah J.', 'Michael C.', 'Emma W.', 'David M.']

const PRODUCT_CATEGORIES = ['Skincare', 'Wellness', 'Body Care', 'Tools']

function timeToMinutes(value: string): number {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return 0
  let hours = parseInt(match[1], 10) % 12
  if (match[3].toUpperCase() === 'PM') hours += 12
  return hours * 60 + parseInt(match[2], 10)
}

const DEFAULT_APPOINTMENTS: AdminAppointment[] = [
  { id: 'a1', time: '9:00 AM', client: 'Rachel Kim', service: 'Hot Stone Massage', therapist: 'Michael C.', status: 'Completed' },
  { id: 'a2', time: '10:00 AM', client: 'Emma Davis', service: 'Swedish Massage', therapist: 'Sarah J.', status: 'Confirmed' },
  { id: 'a3', time: '11:30 AM', client: 'John Smith', service: 'Facial Treatment', therapist: 'Emma W.', status: 'Checked In' },
  { id: 'a4', time: '12:00 PM', client: 'Priya Patel', service: 'Body Scrub', therapist: 'David M.', status: 'Confirmed' },
  { id: 'a5', time: '2:00 PM', client: 'Lisa Chen', service: 'Body Wrap', therapist: 'Michael C.', status: 'Pending' },
  { id: 'a6', time: '3:30 PM', client: 'Tom Nguyen', service: 'Deep Tissue Massage', therapist: 'Sarah J.', status: 'Pending' },
  { id: 'a7', time: '4:00 PM', client: 'Grace Lee', service: 'Anti-Aging Facial', therapist: 'Emma W.', status: 'Confirmed' },
  { id: 'a8', time: '6:00 PM', client: 'Mark Rivera', service: 'Hydrotherapy', therapist: 'David M.', status: 'Pending' }
]

const DEFAULT_MEMBERS: Member[] = [
  { id: 'm1', name: 'Emma Davis', email: 'emma.d@email.com', plan: 'Premium', joined: '2025-03-14', visits: 22 },
  { id: 'm2', name: 'John Smith', email: 'jsmith@email.com', plan: 'Wellness', joined: '2025-06-02', visits: 9 },
  { id: 'm3', name: 'Lisa Chen', email: 'lchen@email.com', plan: 'Elite', joined: '2024-11-20', visits: 48 },
  { id: 'm4', name: 'Priya Patel', email: 'priya.p@email.com', plan: 'Premium', joined: '2025-08-09', visits: 15 },
  { id: 'm5', name: 'Tom Nguyen', email: 'tomn@email.com', plan: 'Wellness', joined: '2026-01-17', visits: 6 },
  { id: 'm6', name: 'Grace Lee', email: 'grace.lee@email.com', plan: 'Elite', joined: '2025-02-28', visits: 37 },
  { id: 'm7', name: 'Mark Rivera', email: 'mrivera@email.com', plan: 'Premium', joined: '2025-10-05', visits: 12 },
  { id: 'm8', name: 'Rachel Kim', email: 'rkim@email.com', plan: 'Wellness', joined: '2026-04-22', visits: 4 }
]

const DEFAULT_INVENTORY: InventoryItem[] = [
  { name: 'Hydrating Serum', category: 'Skincare', price: 89, stock: 24 },
  { name: 'Aromatherapy Oil Set', category: 'Wellness', price: 65, stock: 8 },
  { name: 'Luxury Face Cream', category: 'Skincare', price: 120, stock: 15 },
  { name: 'Essential Oil Diffuser', category: 'Wellness', price: 45, stock: 31 },
  { name: 'Body Butter Collection', category: 'Body Care', price: 55, stock: 6 },
  { name: 'Jade Roller Set', category: 'Tools', price: 38, stock: 19 }
]

const DEFAULT_GIFTS: GiftCert[] = [
  { code: 'SPA-GIFT-20431', recipient: 'anna.b@email.com', amount: 250, status: 'Active' },
  { code: 'SPA-GIFT-18852', recipient: 'chris.w@email.com', amount: 100, status: 'Redeemed' },
  { code: 'SPA-GIFT-22107', recipient: 'maria.g@email.com', amount: 500, status: 'Active' }
]

const REPORT_DATA: Record<string, { weeks: { label: string; revenue: number }[]; services: { name: string; bookings: number }[] }> = {
  'This Month': {
    weeks: [
      { label: 'Week 1', revenue: 15200 },
      { label: 'Week 2', revenue: 17800 },
      { label: 'Week 3', revenue: 16400 },
      { label: 'Week 4', revenue: 19100 }
    ],
    services: [
      { name: 'Swedish Massage', bookings: 86 },
      { name: 'Hydrating Facial', bookings: 64 },
      { name: 'Deep Tissue Massage', bookings: 52 },
      { name: 'Hot Stone Massage', bookings: 38 },
      { name: 'Body Wrap', bookings: 27 }
    ]
  },
  'Last Month': {
    weeks: [
      { label: 'Week 1', revenue: 13900 },
      { label: 'Week 2', revenue: 14600 },
      { label: 'Week 3', revenue: 15800 },
      { label: 'Week 4', revenue: 13700 }
    ],
    services: [
      { name: 'Swedish Massage', bookings: 79 },
      { name: 'Deep Tissue Massage', bookings: 58 },
      { name: 'Hydrating Facial', bookings: 55 },
      { name: 'Body Scrub', bookings: 31 },
      { name: 'Hot Stone Massage', bookings: 29 }
    ]
  },
  'This Quarter': {
    weeks: [
      { label: 'Month 1', revenue: 58000 },
      { label: 'Month 2', revenue: 61500 },
      { label: 'Month 3', revenue: 68500 }
    ],
    services: [
      { name: 'Swedish Massage', bookings: 241 },
      { name: 'Hydrating Facial', bookings: 178 },
      { name: 'Deep Tissue Massage', bookings: 163 },
      { name: 'Hot Stone Massage', bookings: 102 },
      { name: 'Body Wrap', bookings: 84 }
    ]
  }
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loaded, setLoaded] = useState(false)

  const [adminAppointments, setAdminAppointments] = useState<AdminAppointment[]>(DEFAULT_APPOINTMENTS)
  const [statusFilter, setStatusFilter] = useState('All')
  const [showAddAppt, setShowAddAppt] = useState(false)
  const [newAppt, setNewAppt] = useState({ time: '9:00 AM', client: '', service: SERVICE_OPTIONS[0], therapist: THERAPIST_OPTIONS[0] })
  const [apptError, setApptError] = useState('')

  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS)
  const [memberSearch, setMemberSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All')
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', email: '', plan: 'Wellness' })
  const [memberError, setMemberError] = useState('')

  const [inventory, setInventory] = useState<InventoryItem[]>(DEFAULT_INVENTORY)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', category: PRODUCT_CATEGORIES[0], price: '', stock: '' })
  const [productError, setProductError] = useState('')

  const [reportPeriod, setReportPeriod] = useState('This Month')

  const [showGifts, setShowGifts] = useState(false)
  const [gifts, setGifts] = useState<GiftCert[]>(DEFAULT_GIFTS)

  useEffect(() => {
    try {
      const storedAppts = window.localStorage.getItem('spa-demo-admin-appts')
      if (storedAppts) setAdminAppointments(JSON.parse(storedAppts))
      const storedMembers = window.localStorage.getItem('spa-demo-admin-members')
      if (storedMembers) setMembers(JSON.parse(storedMembers))
      const storedInventory = window.localStorage.getItem('spa-demo-admin-products')
      if (storedInventory) setInventory(JSON.parse(storedInventory))

      const storedGifts = window.localStorage.getItem('spa-demo-admin-gifts')
      let giftList: GiftCert[] = storedGifts ? JSON.parse(storedGifts) : [...DEFAULT_GIFTS]
      const purchased = window.localStorage.getItem('spa-demo-gifts')
      if (purchased) {
        const parsed = JSON.parse(purchased) as { code: string; amount: number; recipient: string }[]
        for (const g of parsed) {
          if (!giftList.some(existing => existing.code === g.code)) {
            giftList = [...giftList, { code: g.code, recipient: g.recipient, amount: g.amount, status: 'Active' }]
          }
        }
      }
      setGifts(giftList)
    } catch {
      // localStorage unavailable -- defaults are used
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem('spa-demo-admin-appts', JSON.stringify(adminAppointments))
      window.localStorage.setItem('spa-demo-admin-members', JSON.stringify(members))
      window.localStorage.setItem('spa-demo-admin-products', JSON.stringify(inventory))
      window.localStorage.setItem('spa-demo-admin-gifts', JSON.stringify(gifts))
    } catch {
      // localStorage unavailable -- changes persist for this session only
    }
  }, [adminAppointments, members, inventory, gifts, loaded])

  const stats = [
    { label: 'Today\'s Appointments', value: String(adminAppointments.length), icon: Calendar, change: `${adminAppointments.filter(a => a.status === 'Pending').length} pending`, tab: 'appointments' },
    { label: 'Active Members', value: String(240 + members.length - DEFAULT_MEMBERS.length + 5), icon: Users, change: '+12 this month', tab: 'members' },
    { label: 'Revenue (Month)', value: '$68,500', icon: DollarSign, change: '+18% vs last month', tab: 'reports' },
    { label: 'Average Rating', value: '4.9/5', icon: TrendingUp, change: '234 reviews', tab: 'reports' }
  ]

  const setAppointmentStatus = (id: string, status: string) => {
    setAdminAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status } : apt))
  }

  const sortedAppointments = [...adminAppointments].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))

  const filteredAppointments = statusFilter === 'All'
    ? sortedAppointments
    : sortedAppointments.filter(apt => apt.status === statusFilter)

  const addAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAppt.client.trim()) {
      setApptError('Client name is required.')
      return
    }
    setApptError('')
    setAdminAppointments(prev => [
      ...prev,
      { id: `a-${Date.now()}`, time: newAppt.time, client: newAppt.client.trim(), service: newAppt.service, therapist: newAppt.therapist, status: 'Pending' }
    ])
    setNewAppt({ time: '9:00 AM', client: '', service: SERVICE_OPTIONS[0], therapist: THERAPIST_OPTIONS[0] })
    setShowAddAppt(false)
    setStatusFilter('All')
  }

  const removeAppointment = (id: string) => {
    setAdminAppointments(prev => prev.filter(apt => apt.id !== id))
  }

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const price = Number(newProduct.price)
    const stock = Number(newProduct.stock)
    if (!newProduct.name.trim()) {
      setProductError('Product name is required.')
      return
    }
    if (inventory.some(item => item.name.toLowerCase() === newProduct.name.trim().toLowerCase())) {
      setProductError('A product with that name already exists.')
      return
    }
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(stock) || stock < 0) {
      setProductError('Enter a price above zero and a stock count of zero or more.')
      return
    }
    setProductError('')
    setInventory(prev => [
      { name: newProduct.name.trim(), category: newProduct.category, price: Math.round(price), stock: Math.round(stock) },
      ...prev
    ])
    setNewProduct({ name: '', category: PRODUCT_CATEGORIES[0], price: '', stock: '' })
    setShowAddProduct(false)
  }

  const removeProduct = (name: string) => {
    setInventory(prev => prev.filter(item => item.name !== name))
  }

  const filteredMembers = members.filter(m => {
    const matchesSearch = !memberSearch.trim()
      || m.name.toLowerCase().includes(memberSearch.toLowerCase())
      || m.email.toLowerCase().includes(memberSearch.toLowerCase())
    const matchesPlan = planFilter === 'All' || m.plan === planFilter
    return matchesSearch && matchesPlan
  })

  const addMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMember.name.trim() || !newMember.email.trim()) {
      setMemberError('Name and email are required.')
      return
    }
    setMemberError('')
    setMembers(prev => [
      { id: `m-${Date.now()}`, name: newMember.name, email: newMember.email, plan: newMember.plan, joined: new Date().toISOString().split('T')[0], visits: 0 },
      ...prev
    ])
    setNewMember({ name: '', email: '', plan: 'Wellness' })
    setShowAddMember(false)
  }

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  const adjustStock = (name: string, delta: number) => {
    setInventory(prev => prev.map(item => item.name === name ? { ...item, stock: Math.max(0, item.stock + delta) } : item))
  }

  const toggleGift = (code: string) => {
    setGifts(prev => prev.map(g => g.code === code ? { ...g, status: g.status === 'Active' ? 'Redeemed' : 'Active' } : g))
  }

  const report = REPORT_DATA[reportPeriod]
  const maxRevenue = Math.max(...report.weeks.map(w => w.revenue))
  const maxBookings = Math.max(...report.services.map(s => s.bookings))

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      'Pending': colors.warning,
      'Confirmed': colors.primary,
      'Checked In': colors.secondary,
      'Completed': colors.success
    }
    return map[status] || colors.primary
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold font-serif" style={{ color: colors.text }}>
              Admin Dashboard: Serenity Spa & Wellness
            </h1>
            <span style={{ color: colors.textLight }}>Admin User</span>
          </div>
        </div>
      </div>

      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {['dashboard', 'appointments', 'members', 'products', 'reports'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-3 border-b-2 transition-colors capitalize whitespace-nowrap"
                style={{
                  borderColor: activeTab === tab ? colors.primary : 'transparent',
                  color: activeTab === tab ? colors.primary : colors.textLight
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <button key={idx} onClick={() => setActiveTab(stat.tab)} className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                      <div className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</div>
                    </div>
                    <stat.icon className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <div className="text-sm" style={{ color: colors.textLight }}>{stat.change}</div>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
                <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Today&apos;s Appointments</h2>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: colors.primary }}
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Time</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Client</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Therapist</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments.slice(0, 4).map((apt) => (
                      <tr key={apt.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{apt.time}</td>
                        <td className="p-4" style={{ color: colors.text }}>{apt.client}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{apt.service}</td>
                        <td className="p-4" style={{ color: colors.text }}>{apt.therapist}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm" style={{
                            backgroundColor: `${statusBadge(apt.status)}20`,
                            color: statusBadge(apt.status)
                          }}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button onClick={() => setActiveTab('appointments')} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Calendar className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Manage Schedule</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>View and manage therapist schedules</p>
              </button>
              <button onClick={() => setShowGifts(true)} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Gift className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Gift Certificates</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage digital gift certificates</p>
              </button>
              <button onClick={() => setActiveTab('members')} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Award className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2 font-serif" style={{ color: colors.text }}>Memberships</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage member accounts and billing</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Today&apos;s Schedule</h2>
              <div className="flex flex-wrap items-center gap-2">
                {['All', ...STATUSES].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
                    style={{
                      borderColor: statusFilter === status ? colors.primary : colors.border,
                      backgroundColor: statusFilter === status ? `${colors.primary}15` : 'transparent',
                      color: statusFilter === status ? colors.primary : colors.textLight
                    }}
                  >
                    {status}
                  </button>
                ))}
                <button
                  onClick={() => { setShowAddAppt(!showAddAppt); setApptError('') }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {showAddAppt ? 'Close' : 'Add Appointment'}
                </button>
              </div>
            </div>
            {showAddAppt && (
              <form onSubmit={addAppointment} className="p-6 border-b grid sm:grid-cols-5 gap-3 items-end" style={{ borderColor: colors.border, backgroundColor: colors.backgroundAlt }}>
                <div>
                  <label htmlFor="spa-admin-appt-time" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Time</label>
                  <select id="spa-admin-appt-time" value={newAppt.time} onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border, color: colors.text }}>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="spa-admin-appt-client" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Client</label>
                  <input id="spa-admin-appt-client" type="text" value={newAppt.client} onChange={(e) => setNewAppt({ ...newAppt, client: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <label htmlFor="spa-admin-appt-service" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Service</label>
                  <select id="spa-admin-appt-service" value={newAppt.service} onChange={(e) => setNewAppt({ ...newAppt, service: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border, color: colors.text }}>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="spa-admin-appt-therapist" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Therapist</label>
                  <select id="spa-admin-appt-therapist" value={newAppt.therapist} onChange={(e) => setNewAppt({ ...newAppt, therapist: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border, color: colors.text }}>
                    {THERAPIST_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: colors.primary }}>
                    Book Slot
                  </button>
                  {apptError && <p className="text-xs mt-1 font-medium" style={{ color: colors.error }}>{apptError}</p>}
                </div>
              </form>
            )}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Time</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Client</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Therapist</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{apt.time}</td>
                      <td className="p-4" style={{ color: colors.text }}>{apt.client}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{apt.service}</td>
                      <td className="p-4" style={{ color: colors.text }}>{apt.therapist}</td>
                      <td className="p-4">
                        <select
                          value={apt.status}
                          onChange={(e) => setAppointmentStatus(apt.id, e.target.value)}
                          aria-label={`Status for ${apt.client}`}
                          className="px-3 py-1.5 rounded-lg text-sm border font-medium"
                          style={{ borderColor: colors.border, color: statusBadge(apt.status) }}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => removeAppointment(apt.id)}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: colors.error }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAppointments.length === 0 && (
                <p className="p-8 text-center" style={{ color: colors.textLight }}>No appointments with this status today.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Members</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Search members..."
                    aria-label="Search members"
                    className="pl-9 pr-4 py-2 rounded-lg border text-sm"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  aria-label="Filter by plan"
                  className="px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: colors.border, color: colors.text }}
                >
                  {['All', 'Wellness', 'Premium', 'Elite'].map(p => <option key={p} value={p}>{p === 'All' ? 'All Plans' : p}</option>)}
                </select>
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {showAddMember ? 'Close' : 'Add Member'}
                </button>
              </div>
            </div>
            {showAddMember && (
              <form onSubmit={addMember} className="p-6 border-b grid sm:grid-cols-4 gap-3 items-end" style={{ borderColor: colors.border, backgroundColor: colors.backgroundAlt }}>
                <div>
                  <label htmlFor="spa-admin-member-name" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Name</label>
                  <input id="spa-admin-member-name" type="text" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <label htmlFor="spa-admin-member-email" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Email</label>
                  <input id="spa-admin-member-email" type="email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <label htmlFor="spa-admin-member-plan" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Plan</label>
                  <select id="spa-admin-member-plan" value={newMember.plan} onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border, color: colors.text }}>
                    {['Wellness', 'Premium', 'Elite'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: colors.primary }}>
                    Save Member
                  </button>
                  {memberError && <p className="text-xs mt-1 font-medium" style={{ color: colors.error }}>{memberError}</p>}
                </div>
              </form>
            )}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Name</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Email</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Plan</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Joined</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Visits</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{member.name}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{member.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                          {member.plan}
                        </span>
                      </td>
                      <td className="p-4" style={{ color: colors.textLight }}>{member.joined}</td>
                      <td className="p-4" style={{ color: colors.text }}>{member.visits}</td>
                      <td className="p-4">
                        <button
                          onClick={() => removeMember(member.id)}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: colors.error }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredMembers.length === 0 && (
                <p className="p-8 text-center" style={{ color: colors.textLight }}>No members match your search.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <div>
                <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Product Inventory</h2>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Adjust stock levels as products sell or restock arrives</p>
              </div>
              <button
                onClick={() => { setShowAddProduct(!showAddProduct); setProductError('') }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {showAddProduct ? 'Close' : 'Add Product'}
              </button>
            </div>
            {showAddProduct && (
              <form onSubmit={addProduct} className="p-6 border-b grid sm:grid-cols-5 gap-3 items-end" style={{ borderColor: colors.border, backgroundColor: colors.backgroundAlt }}>
                <div>
                  <label htmlFor="spa-admin-product-name" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Product</label>
                  <input id="spa-admin-product-name" type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <label htmlFor="spa-admin-product-category" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Category</label>
                  <select id="spa-admin-product-category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border, color: colors.text }}>
                    {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="spa-admin-product-price" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Price ($)</label>
                  <input id="spa-admin-product-price" type="number" min="1" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <label htmlFor="spa-admin-product-stock" className="block text-xs font-medium mb-1" style={{ color: colors.text }}>Stock</label>
                  <input id="spa-admin-product-stock" type="number" min="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: colors.border }} />
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: colors.primary }}>
                    Save Product
                  </button>
                </div>
                {productError && <p className="sm:col-span-5 text-xs font-medium" style={{ color: colors.error }}>{productError}</p>}
              </form>
            )}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Product</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Category</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Price</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Stock</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Adjust</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.name} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{item.name}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{item.category}</td>
                      <td className="p-4" style={{ color: colors.text }}>${item.price}</td>
                      <td className="p-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: item.stock < 10 ? `${colors.warning}20` : `${colors.success}20`,
                            color: item.stock < 10 ? colors.warning : colors.success
                          }}
                        >
                          {item.stock} {item.stock < 10 ? '(low)' : ''}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustStock(item.name, -1)}
                            aria-label={`Decrease ${item.name} stock`}
                            className="p-1.5 rounded border"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => adjustStock(item.name, 1)}
                            aria-label={`Increase ${item.name} stock`}
                            className="p-1.5 rounded border"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => removeProduct(item.name)}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: colors.error }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inventory.length === 0 && (
                <p className="p-8 text-center" style={{ color: colors.textLight }}>No products in inventory. Use Add Product to stock the shop.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold font-serif" style={{ color: colors.text }}>Revenue</h2>
                <div className="flex gap-2">
                  {Object.keys(REPORT_DATA).map(period => (
                    <button
                      key={period}
                      onClick={() => setReportPeriod(period)}
                      className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
                      style={{
                        borderColor: reportPeriod === period ? colors.primary : colors.border,
                        backgroundColor: reportPeriod === period ? `${colors.primary}15` : 'transparent',
                        color: reportPeriod === period ? colors.primary : colors.textLight
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {report.weeks.map((week) => (
                  <div key={week.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: colors.text }}>{week.label}</span>
                      <span className="font-semibold" style={{ color: colors.primary }}>${week.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ backgroundColor: colors.primary, width: `${(week.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-6 pt-4 border-t font-semibold" style={{ borderColor: colors.border, color: colors.text }}>
                Total: ${report.weeks.reduce((sum, w) => sum + w.revenue, 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold font-serif mb-6" style={{ color: colors.text }}>Top Services ({reportPeriod})</h2>
              <div className="space-y-4">
                {report.services.map((service) => (
                  <div key={service.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: colors.text }}>{service.name}</span>
                      <span className="font-semibold" style={{ color: colors.textLight }}>{service.bookings} bookings</span>
                    </div>
                    <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ backgroundColor: colors.secondary, width: `${(service.bookings / maxBookings) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showGifts && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowGifts(false)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-xl font-bold font-serif flex items-center gap-2" style={{ color: colors.text }}>
                <Gift className="w-5 h-5" style={{ color: colors.primary }} />
                Gift Certificates
              </h3>
              <button onClick={() => setShowGifts(false)} aria-label="Close" className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.textLight }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-3 text-sm font-semibold" style={{ color: colors.textLight }}>Code</th>
                      <th className="text-left p-3 text-sm font-semibold" style={{ color: colors.textLight }}>Recipient</th>
                      <th className="text-left p-3 text-sm font-semibold" style={{ color: colors.textLight }}>Amount</th>
                      <th className="text-left p-3 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                      <th className="text-left p-3 text-sm font-semibold" style={{ color: colors.textLight }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gifts.map((gift) => (
                      <tr key={gift.code} className="border-b" style={{ borderColor: colors.border }}>
                        <td className="p-3 font-mono text-sm" style={{ color: colors.text }}>{gift.code}</td>
                        <td className="p-3 text-sm" style={{ color: colors.textLight }}>{gift.recipient}</td>
                        <td className="p-3 font-semibold" style={{ color: colors.primary }}>${gift.amount}</td>
                        <td className="p-3">
                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: gift.status === 'Active' ? `${colors.success}20` : `${colors.textLight}20`,
                              color: gift.status === 'Active' ? colors.success : colors.textLight
                            }}
                          >
                            {gift.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleGift(gift.code)}
                            className="text-sm font-semibold hover:underline"
                            style={{ color: colors.primary }}
                          >
                            {gift.status === 'Active' ? 'Mark Redeemed' : 'Reactivate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-4" style={{ color: colors.textLight }}>
                Certificates purchased through the customer site appear here automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
