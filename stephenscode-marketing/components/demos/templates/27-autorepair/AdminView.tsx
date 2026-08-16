'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Users, Wrench, DollarSign, TrendingUp, FileText, Plus, Trash2, X, Search, Minus } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface Job {
  id: string
  customer: string
  vehicle: string
  service: string
  status: string
  amount: string
}

interface Appointment {
  id: string
  customer: string
  vehicle: string
  service: string
  date: string
  time: string
  technician: string
  status: string
}

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  vehicles: string[]
  totalJobs: number
  lifetimeValue: string
}

interface Part {
  id: string
  name: string
  sku: string
  stock: number
  reorderAt: number
  unitCost: string
}

const JOB_STATUSES = ['Estimating', 'Scheduled', 'In Progress', 'Ready for Pickup', 'Completed']
const APPT_STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

const SEED_JOBS: Job[] = [
  { id: 'J-1023', customer: 'John Smith', vehicle: '2020 Toyota Camry', service: 'Front Bumper Repair', status: 'In Progress', amount: '$1,200' },
  { id: 'J-1024', customer: 'Sarah Johnson', vehicle: '2019 Honda Accord', service: 'Paint & Refinish', status: 'Estimating', amount: '$2,400' },
  { id: 'J-1025', customer: 'Mike Davis', vehicle: '2021 Ford F-150', service: 'Collision Repair', status: 'Scheduled', amount: '$3,800' },
  { id: 'J-1026', customer: 'Emily Chen', vehicle: '2022 Subaru Outback', service: 'Rear Quarter Panel', status: 'In Progress', amount: '$1,850' },
  { id: 'J-1027', customer: 'Robert Wilson', vehicle: '2018 Chevy Silverado', service: 'Hail Damage Repair', status: 'Ready for Pickup', amount: '$2,950' }
]

const SEED_APPOINTMENTS: Appointment[] = [
  { id: 'A-2041', customer: 'Lisa Martinez', vehicle: '2021 Mazda CX-5', service: 'Collision Repair Inspection', date: 'Mon, Aug 17', time: '8:00 AM', technician: 'Dave R.', status: 'Confirmed' },
  { id: 'A-2042', customer: 'Tom Baker', vehicle: '2017 Nissan Altima', service: 'Paint & Refinish Quote', date: 'Mon, Aug 17', time: '10:00 AM', technician: 'Maria S.', status: 'Confirmed' },
  { id: 'A-2043', customer: 'Angela Foster', vehicle: '2023 Kia Telluride', service: 'Insurance Assessment', date: 'Tue, Aug 18', time: '9:00 AM', technician: 'Dave R.', status: 'Pending' },
  { id: 'A-2044', customer: 'Chris Nguyen', vehicle: '2019 BMW 330i', service: 'Detailing & Cleanup', date: 'Tue, Aug 18', time: '1:00 PM', technician: 'Luis P.', status: 'Pending' },
  { id: 'A-2045', customer: 'Dana White', vehicle: '2020 Jeep Wrangler', service: 'Collision Repair Inspection', date: 'Wed, Aug 19', time: '11:00 AM', technician: 'Maria S.', status: 'Confirmed' }
]

const SEED_CUSTOMERS: Customer[] = [
  { id: 'C-501', name: 'John Smith', phone: '(555) 201-4477', email: 'john.smith@email.com', vehicles: ['2020 Toyota Camry'], totalJobs: 3, lifetimeValue: '$4,150' },
  { id: 'C-502', name: 'Sarah Johnson', phone: '(555) 318-9022', email: 'sarah.j@email.com', vehicles: ['2019 Honda Accord', '2016 Honda CR-V'], totalJobs: 5, lifetimeValue: '$7,900' },
  { id: 'C-503', name: 'Mike Davis', phone: '(555) 442-1180', email: 'mdavis@email.com', vehicles: ['2021 Ford F-150'], totalJobs: 2, lifetimeValue: '$5,300' },
  { id: 'C-504', name: 'Emily Chen', phone: '(555) 629-3355', email: 'emily.chen@email.com', vehicles: ['2022 Subaru Outback'], totalJobs: 1, lifetimeValue: '$1,850' },
  { id: 'C-505', name: 'Robert Wilson', phone: '(555) 774-2091', email: 'rwilson@email.com', vehicles: ['2018 Chevy Silverado'], totalJobs: 4, lifetimeValue: '$8,600' }
]

const SEED_PARTS: Part[] = [
  { id: 'P-101', name: 'Front Bumper Cover (Universal Prep)', sku: 'BMP-FRT-U', stock: 6, reorderAt: 3, unitCost: '$240' },
  { id: 'P-102', name: 'Basecoat Paint, White Pearl (Gallon)', sku: 'PNT-WHP-G', stock: 2, reorderAt: 4, unitCost: '$185' },
  { id: 'P-103', name: 'Clearcoat (Gallon)', sku: 'PNT-CLR-G', stock: 9, reorderAt: 4, unitCost: '$130' },
  { id: 'P-104', name: 'Sanding Discs 320 Grit (Box of 50)', sku: 'ABR-320-50', stock: 14, reorderAt: 6, unitCost: '$42' },
  { id: 'P-105', name: 'Body Filler (Gallon)', sku: 'FIL-STD-G', stock: 3, reorderAt: 3, unitCost: '$55' },
  { id: 'P-106', name: 'Masking Film Roll 16ft', sku: 'MSK-16-R', stock: 8, reorderAt: 5, unitCost: '$28' }
]

function loadStored<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return seed
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw) as T[]
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Corrupt storage -- fall back to seed data
  }
  return seed
}

function saveStored<T>(key: string, value: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable -- state still works in memory
  }
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS)
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS)
  const [customers, setCustomers] = useState<Customer[]>(SEED_CUSTOMERS)
  const [parts, setParts] = useState<Part[]>(SEED_PARTS)
  const [hydrated, setHydrated] = useState(false)

  const [showJobModal, setShowJobModal] = useState(false)
  const [jobForm, setJobForm] = useState({ customer: '', vehicle: '', service: '', amount: '', status: 'Estimating' })
  const [showApptModal, setShowApptModal] = useState(false)
  const [apptForm, setApptForm] = useState({ customer: '', vehicle: '', service: 'Collision Repair Inspection', date: '', time: '8:00 AM', technician: 'Dave R.' })
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [customerForm, setCustomerForm] = useState({ name: '', phone: '', email: '', vehicle: '' })
  const [showPartModal, setShowPartModal] = useState(false)
  const [partForm, setPartForm] = useState({ name: '', sku: '', stock: '1', reorderAt: '3', unitCost: '' })
  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  useEffect(() => {
    setJobs(loadStored('autorepair-admin-jobs', SEED_JOBS))
    setAppointments(loadStored('autorepair-admin-appointments', SEED_APPOINTMENTS))
    setCustomers(loadStored('autorepair-admin-customers', SEED_CUSTOMERS))
    setParts(loadStored('autorepair-admin-parts', SEED_PARTS))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveStored('autorepair-admin-jobs', jobs)
  }, [jobs, hydrated])
  useEffect(() => {
    if (hydrated) saveStored('autorepair-admin-appointments', appointments)
  }, [appointments, hydrated])
  useEffect(() => {
    if (hydrated) saveStored('autorepair-admin-customers', customers)
  }, [customers, hydrated])
  useEffect(() => {
    if (hydrated) saveStored('autorepair-admin-parts', parts)
  }, [parts, hydrated])

  const activeJobCount = jobs.filter(j => j.status === 'In Progress' || j.status === 'Scheduled').length
  const pendingEstimates = jobs.filter(j => j.status === 'Estimating').length

  const stats = [
    { label: 'Active Jobs', value: String(activeJobCount), icon: Wrench, change: 'Scheduled + in progress', tab: 'jobs' },
    { label: 'Pending Estimates', value: String(pendingEstimates), icon: FileText, change: 'Awaiting customer approval', tab: 'jobs' },
    { label: 'Revenue (Month)', value: '$45,200', icon: DollarSign, change: '+12% vs last month', tab: 'jobs' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: TrendingUp, change: '156 reviews', tab: 'customers' }
  ]

  const nextJobId = () => {
    const max = jobs.reduce((m, j) => {
      const n = parseInt(j.id.replace('J-', ''), 10)
      return Number.isNaN(n) ? m : Math.max(m, n)
    }, 1000)
    return `J-${max + 1}`
  }

  const addJob = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = jobForm.amount.replace(/[^0-9.]/g, '')
    const newJob: Job = {
      id: nextJobId(),
      customer: jobForm.customer,
      vehicle: jobForm.vehicle,
      service: jobForm.service,
      status: jobForm.status,
      amount: amountNum ? `$${Number(amountNum).toLocaleString()}` : '$0'
    }
    setJobs([newJob, ...jobs])
    setJobForm({ customer: '', vehicle: '', service: '', amount: '', status: 'Estimating' })
    setShowJobModal(false)
    setActiveTab('jobs')
  }

  const updateJobStatus = (id: string, status: string) => {
    setJobs(jobs.map(j => (j.id === id ? { ...j, status } : j)))
  }

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id))
  }

  const addAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    const max = appointments.reduce((m, a) => {
      const n = parseInt(a.id.replace('A-', ''), 10)
      return Number.isNaN(n) ? m : Math.max(m, n)
    }, 2000)
    const newAppt: Appointment = {
      id: `A-${max + 1}`,
      customer: apptForm.customer,
      vehicle: apptForm.vehicle,
      service: apptForm.service,
      date: apptForm.date,
      time: apptForm.time,
      technician: apptForm.technician,
      status: 'Pending'
    }
    setAppointments([...appointments, newAppt])
    setApptForm({ customer: '', vehicle: '', service: 'Collision Repair Inspection', date: '', time: '8:00 AM', technician: 'Dave R.' })
    setShowApptModal(false)
  }

  const updateApptStatus = (id: string, status: string) => {
    setAppointments(appointments.map(a => (a.id === id ? { ...a, status } : a)))
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id))
  }

  const addCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const max = customers.reduce((m, c) => {
      const n = parseInt(c.id.replace('C-', ''), 10)
      return Number.isNaN(n) ? m : Math.max(m, n)
    }, 500)
    const newCustomer: Customer = {
      id: `C-${max + 1}`,
      name: customerForm.name,
      phone: customerForm.phone,
      email: customerForm.email,
      vehicles: customerForm.vehicle ? [customerForm.vehicle] : [],
      totalJobs: 0,
      lifetimeValue: '$0'
    }
    setCustomers([newCustomer, ...customers])
    setCustomerForm({ name: '', phone: '', email: '', vehicle: '' })
    setShowCustomerModal(false)
  }

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id))
    if (selectedCustomerId === id) setSelectedCustomerId(null)
  }

  const addPart = (e: React.FormEvent) => {
    e.preventDefault()
    const max = parts.reduce((m, p) => {
      const n = parseInt(p.id.replace('P-', ''), 10)
      return Number.isNaN(n) ? m : Math.max(m, n)
    }, 100)
    const costNum = partForm.unitCost.replace(/[^0-9.]/g, '')
    const newPart: Part = {
      id: `P-${max + 1}`,
      name: partForm.name,
      sku: partForm.sku,
      stock: Math.max(0, parseInt(partForm.stock, 10) || 0),
      reorderAt: Math.max(0, parseInt(partForm.reorderAt, 10) || 0),
      unitCost: costNum ? `$${Number(costNum).toLocaleString()}` : '$0'
    }
    setParts([...parts, newPart])
    setPartForm({ name: '', sku: '', stock: '1', reorderAt: '3', unitCost: '' })
    setShowPartModal(false)
  }

  const adjustStock = (id: string, delta: number) => {
    setParts(parts.map(p => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)))
  }

  const deletePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id))
  }

  const filteredCustomers = customers.filter(c => {
    const q = customerSearch.trim().toLowerCase()
    if (!q) return true
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.vehicles.some(v => v.toLowerCase().includes(q))
    )
  })

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null
  const selectedCustomerJobs = selectedCustomer ? jobs.filter(j => j.customer === selectedCustomer.name) : []

  const statusColor = (status: string) => {
    if (status === 'Completed' || status === 'Ready for Pickup' || status === 'Confirmed') return colors.success
    if (status === 'Cancelled') return colors.error
    if (status === 'Estimating' || status === 'Pending') return colors.warning
    return colors.accent
  }

  const inputStyle = { borderColor: colors.border }
  const labelStyle = { color: colors.text }

  const modalShell = (title: string, onClose: () => void, children: React.ReactNode) => (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-lg font-bold" style={{ color: colors.text }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-1.5 rounded hover:bg-gray-100 transition-colors" style={{ color: colors.textLight }}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Admin Header */}
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold" style={{ color: colors.text }}>
              Admin Dashboard: Precision Auto Repair
            </h1>
            <div className="flex items-center gap-4">
              <span style={{ color: colors.textLight }}>Admin User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {['dashboard', 'jobs', 'schedule', 'customers', 'inventory'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-3 border-b-2 transition-colors capitalize whitespace-nowrap"
                style={{
                  borderColor: activeTab === tab ? colors.accent : 'transparent',
                  color: activeTab === tab ? colors.accent : colors.textLight
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(stat.tab)}
                  className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{stat.label}</div>
                      <div className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</div>
                    </div>
                    <stat.icon className="w-8 h-8" style={{ color: colors.accent }} />
                  </div>
                  <div className="text-sm" style={{ color: colors.textLight }}>{stat.change}</div>
                </button>
              ))}
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Recent Jobs</h2>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="text-sm font-semibold hover:underline"
                  style={{ color: colors.accent }}
                >
                  View all jobs
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Job ID</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Vehicle</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 3).map(job => (
                      <tr key={job.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{job.id}</td>
                        <td className="p-4" style={{ color: colors.text }}>{job.customer}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{job.vehicle}</td>
                        <td className="p-4" style={{ color: colors.text }}>{job.service}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-sm whitespace-nowrap" style={{
                            backgroundColor: `${statusColor(job.status)}20`,
                            color: statusColor(job.status)
                          }}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 font-semibold" style={{ color: colors.accent }}>{job.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveTab('schedule')}
                className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow"
              >
                <Calendar className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>View Schedule</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage appointments and technician assignments</p>
              </button>
              <button
                onClick={() => {
                  setJobForm({ customer: '', vehicle: '', service: '', amount: '', status: 'Estimating' })
                  setShowJobModal(true)
                }}
                className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow"
              >
                <FileText className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Create Estimate</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Generate new repair estimates</p>
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow"
              >
                <Users className="w-8 h-8 mb-3" style={{ color: colors.accent }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Customer Portal</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage customer accounts and history</p>
              </button>
            </div>
          </div>
        )}

        {/* Jobs */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Jobs & Estimates</h2>
              <button
                onClick={() => {
                  setJobForm({ customer: '', vehicle: '', service: '', amount: '', status: 'Estimating' })
                  setShowJobModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> New Job / Estimate
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Job ID</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Vehicle</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Amount</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{job.id}</td>
                      <td className="p-4" style={{ color: colors.text }}>{job.customer}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{job.vehicle}</td>
                      <td className="p-4" style={{ color: colors.text }}>{job.service}</td>
                      <td className="p-4">
                        <select
                          value={job.status}
                          onChange={e => updateJobStatus(job.id, e.target.value)}
                          aria-label={`Status for job ${job.id}`}
                          className="px-2 py-1.5 rounded-md border text-sm"
                          style={{ borderColor: colors.border, color: statusColor(job.status) }}
                        >
                          {JOB_STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 font-semibold" style={{ color: colors.accent }}>{job.amount}</td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteJob(job.id)}
                          aria-label={`Delete job ${job.id}`}
                          className="p-2 rounded hover:bg-red-50 transition-colors"
                          style={{ color: colors.error }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center" style={{ color: colors.textLight }}>
                        No jobs yet. Create your first estimate above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-bold" style={{ color: colors.text }}>Appointment Schedule</h2>
              <button
                onClick={() => setShowApptModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> Add Appointment
              </button>
            </div>
            <div className="divide-y" style={{ borderColor: colors.border }}>
              {appointments.map(appt => (
                <div key={appt.id} className="p-5 flex flex-wrap items-center gap-4 hover:bg-gray-50">
                  <div className="w-28 flex-shrink-0">
                    <div className="font-bold text-sm" style={{ color: colors.text }}>{appt.date}</div>
                    <div className="text-sm" style={{ color: colors.textLight }}>{appt.time}</div>
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <div className="font-semibold" style={{ color: colors.text }}>{appt.customer}</div>
                    <div className="text-sm" style={{ color: colors.textLight }}>{appt.vehicle} -- {appt.service}</div>
                  </div>
                  <div className="text-sm w-24 flex-shrink-0" style={{ color: colors.textLight }}>
                    Tech: <span className="font-medium" style={{ color: colors.text }}>{appt.technician}</span>
                  </div>
                  <select
                    value={appt.status}
                    onChange={e => updateApptStatus(appt.id, e.target.value)}
                    aria-label={`Status for appointment ${appt.id}`}
                    className="px-2 py-1.5 rounded-md border text-sm"
                    style={{ borderColor: colors.border, color: statusColor(appt.status) }}
                  >
                    {APPT_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteAppointment(appt.id)}
                    aria-label={`Delete appointment ${appt.id}`}
                    className="p-2 rounded hover:bg-red-50 transition-colors"
                    style={{ color: colors.error }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {appointments.length === 0 && (
                <div className="p-8 text-center" style={{ color: colors.textLight }}>
                  No appointments scheduled. Add one above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b space-y-4" style={{ borderColor: colors.border }}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-bold" style={{ color: colors.text }}>Customers</h2>
                  <button
                    onClick={() => setShowCustomerModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                  >
                    <Plus className="w-4 h-4" /> Add Customer
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    value={customerSearch}
                    onChange={e => setCustomerSearch(e.target.value)}
                    placeholder="Search by name, email, phone, or vehicle"
                    aria-label="Search customers"
                    className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div className="divide-y" style={{ borderColor: colors.border }}>
                {filteredCustomers.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCustomerId(c.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    style={{ backgroundColor: selectedCustomerId === c.id ? `${colors.accent}10` : 'transparent' }}
                  >
                    <div>
                      <div className="font-semibold" style={{ color: colors.text }}>{c.name}</div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{c.email} -- {c.phone}</div>
                    </div>
                    <div className="text-right text-sm flex-shrink-0">
                      <div className="font-semibold" style={{ color: colors.accent }}>{c.lifetimeValue}</div>
                      <div style={{ color: colors.textLight }}>{c.totalJobs} jobs</div>
                    </div>
                  </button>
                ))}
                {filteredCustomers.length === 0 && (
                  <div className="p-8 text-center" style={{ color: colors.textLight }}>
                    No customers match that search.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-fit">
              {selectedCustomer ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold" style={{ color: colors.text }}>{selectedCustomer.name}</h3>
                    <button
                      onClick={() => deleteCustomer(selectedCustomer.id)}
                      aria-label={`Delete customer ${selectedCustomer.name}`}
                      className="p-2 rounded hover:bg-red-50 transition-colors"
                      style={{ color: colors.error }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm space-y-1">
                    <div style={{ color: colors.textLight }}>{selectedCustomer.email}</div>
                    <div style={{ color: colors.textLight }}>{selectedCustomer.phone}</div>
                    <div style={{ color: colors.textLight }}>
                      Lifetime value: <span className="font-semibold" style={{ color: colors.accent }}>{selectedCustomer.lifetimeValue}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-2" style={{ color: colors.text }}>Vehicles</div>
                    {selectedCustomer.vehicles.length > 0 ? (
                      <ul className="space-y-1 text-sm" style={{ color: colors.textLight }}>
                        {selectedCustomer.vehicles.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm" style={{ color: colors.textLight }}>No vehicles on file.</p>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-2" style={{ color: colors.text }}>Job History</div>
                    {selectedCustomerJobs.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedCustomerJobs.map(j => (
                          <li key={j.id} className="text-sm rounded-lg p-3" style={{ backgroundColor: colors.backgroundAlt }}>
                            <div className="font-medium" style={{ color: colors.text }}>{j.service}</div>
                            <div style={{ color: colors.textLight }}>{j.id} -- {j.status} -- {j.amount}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm" style={{ color: colors.textLight }}>No jobs on record for this customer.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-10 h-10 mx-auto mb-3" style={{ color: colors.accent }} />
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    Select a customer to view contact info, vehicles, and job history.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex flex-wrap items-center justify-between gap-4" style={{ borderColor: colors.border }}>
              <div>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Parts & Materials Inventory</h2>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>
                  {parts.filter(p => p.stock <= p.reorderAt).length} item(s) at or below reorder level
                </p>
              </div>
              <button
                onClick={() => setShowPartModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Item</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>SKU</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Unit Cost</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Stock</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map(part => (
                    <tr key={part.id} className="border-b hover:bg-gray-50" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{part.name}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{part.sku}</td>
                      <td className="p-4" style={{ color: colors.text }}>{part.unitCost}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustStock(part.id, -1)}
                            aria-label={`Decrease stock for ${part.name}`}
                            className="p-1.5 rounded border hover:bg-gray-100 transition-colors"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-semibold" style={{ color: colors.text }}>{part.stock}</span>
                          <button
                            onClick={() => adjustStock(part.id, 1)}
                            aria-label={`Increase stock for ${part.name}`}
                            className="p-1.5 rounded border hover:bg-gray-100 transition-colors"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-3 py-1 rounded-full text-sm whitespace-nowrap"
                          style={{
                            backgroundColor: part.stock <= part.reorderAt ? `${colors.warning}20` : `${colors.success}20`,
                            color: part.stock <= part.reorderAt ? colors.warning : colors.success
                          }}
                        >
                          {part.stock <= part.reorderAt ? 'Reorder soon' : 'In stock'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deletePart(part.id)}
                          aria-label={`Delete ${part.name}`}
                          className="p-2 rounded hover:bg-red-50 transition-colors"
                          style={{ color: colors.error }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {parts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center" style={{ color: colors.textLight }}>
                        Inventory is empty. Add your first item above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Job Modal */}
      {showJobModal && modalShell('New Job / Estimate', () => setShowJobModal(false), (
        <form onSubmit={addJob} className="space-y-4">
          <div>
            <label htmlFor="admin-job-customer" className="block text-sm font-medium mb-1.5" style={labelStyle}>Customer Name</label>
            <input
              id="admin-job-customer"
              type="text"
              required
              value={jobForm.customer}
              onChange={e => setJobForm({ ...jobForm, customer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="John Smith"
            />
          </div>
          <div>
            <label htmlFor="admin-job-vehicle" className="block text-sm font-medium mb-1.5" style={labelStyle}>Vehicle</label>
            <input
              id="admin-job-vehicle"
              type="text"
              required
              value={jobForm.vehicle}
              onChange={e => setJobForm({ ...jobForm, vehicle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="2020 Toyota Camry"
            />
          </div>
          <div>
            <label htmlFor="admin-job-service" className="block text-sm font-medium mb-1.5" style={labelStyle}>Service</label>
            <input
              id="admin-job-service"
              type="text"
              required
              value={jobForm.service}
              onChange={e => setJobForm({ ...jobForm, service: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="Front Bumper Repair"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-job-amount" className="block text-sm font-medium mb-1.5" style={labelStyle}>Estimated Amount ($)</label>
              <input
                id="admin-job-amount"
                type="text"
                required
                value={jobForm.amount}
                onChange={e => setJobForm({ ...jobForm, amount: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="1200"
              />
            </div>
            <div>
              <label htmlFor="admin-job-status" className="block text-sm font-medium mb-1.5" style={labelStyle}>Status</label>
              <select
                id="admin-job-status"
                value={jobForm.status}
                onChange={e => setJobForm({ ...jobForm, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
              >
                {JOB_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Save Job
          </button>
        </form>
      ))}

      {/* New Appointment Modal */}
      {showApptModal && modalShell('Add Appointment', () => setShowApptModal(false), (
        <form onSubmit={addAppointment} className="space-y-4">
          <div>
            <label htmlFor="admin-appt-customer" className="block text-sm font-medium mb-1.5" style={labelStyle}>Customer Name</label>
            <input
              id="admin-appt-customer"
              type="text"
              required
              value={apptForm.customer}
              onChange={e => setApptForm({ ...apptForm, customer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="Lisa Martinez"
            />
          </div>
          <div>
            <label htmlFor="admin-appt-vehicle" className="block text-sm font-medium mb-1.5" style={labelStyle}>Vehicle</label>
            <input
              id="admin-appt-vehicle"
              type="text"
              required
              value={apptForm.vehicle}
              onChange={e => setApptForm({ ...apptForm, vehicle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="2021 Mazda CX-5"
            />
          </div>
          <div>
            <label htmlFor="admin-appt-service" className="block text-sm font-medium mb-1.5" style={labelStyle}>Service</label>
            <select
              id="admin-appt-service"
              value={apptForm.service}
              onChange={e => setApptForm({ ...apptForm, service: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
            >
              {['Collision Repair Inspection', 'Paint & Refinish Quote', 'Insurance Assessment', 'Detailing & Cleanup'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-appt-date" className="block text-sm font-medium mb-1.5" style={labelStyle}>Date</label>
              <input
                id="admin-appt-date"
                type="text"
                required
                value={apptForm.date}
                onChange={e => setApptForm({ ...apptForm, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="Thu, Aug 20"
              />
            </div>
            <div>
              <label htmlFor="admin-appt-time" className="block text-sm font-medium mb-1.5" style={labelStyle}>Time</label>
              <select
                id="admin-appt-time"
                value={apptForm.time}
                onChange={e => setApptForm({ ...apptForm, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
              >
                {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="admin-appt-tech" className="block text-sm font-medium mb-1.5" style={labelStyle}>Technician</label>
            <select
              id="admin-appt-tech"
              value={apptForm.technician}
              onChange={e => setApptForm({ ...apptForm, technician: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
            >
              {['Dave R.', 'Maria S.', 'Luis P.'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Save Appointment
          </button>
        </form>
      ))}

      {/* New Customer Modal */}
      {showCustomerModal && modalShell('Add Customer', () => setShowCustomerModal(false), (
        <form onSubmit={addCustomer} className="space-y-4">
          <div>
            <label htmlFor="admin-cust-name" className="block text-sm font-medium mb-1.5" style={labelStyle}>Full Name</label>
            <input
              id="admin-cust-name"
              type="text"
              required
              value={customerForm.name}
              onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="Jane Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-cust-phone" className="block text-sm font-medium mb-1.5" style={labelStyle}>Phone</label>
              <input
                id="admin-cust-phone"
                type="tel"
                required
                value={customerForm.phone}
                onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="admin-cust-email" className="block text-sm font-medium mb-1.5" style={labelStyle}>Email</label>
              <input
                id="admin-cust-email"
                type="email"
                required
                value={customerForm.email}
                onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="jane@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="admin-cust-vehicle" className="block text-sm font-medium mb-1.5" style={labelStyle}>Vehicle (optional)</label>
            <input
              id="admin-cust-vehicle"
              type="text"
              value={customerForm.vehicle}
              onChange={e => setCustomerForm({ ...customerForm, vehicle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="2022 Honda Civic"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Save Customer
          </button>
        </form>
      ))}

      {/* New Part Modal */}
      {showPartModal && modalShell('Add Inventory Item', () => setShowPartModal(false), (
        <form onSubmit={addPart} className="space-y-4">
          <div>
            <label htmlFor="admin-part-name" className="block text-sm font-medium mb-1.5" style={labelStyle}>Item Name</label>
            <input
              id="admin-part-name"
              type="text"
              required
              value={partForm.name}
              onChange={e => setPartForm({ ...partForm, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border"
              style={inputStyle}
              placeholder="Basecoat Paint, Jet Black (Gallon)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-part-sku" className="block text-sm font-medium mb-1.5" style={labelStyle}>SKU</label>
              <input
                id="admin-part-sku"
                type="text"
                required
                value={partForm.sku}
                onChange={e => setPartForm({ ...partForm, sku: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="PNT-BLK-G"
              />
            </div>
            <div>
              <label htmlFor="admin-part-cost" className="block text-sm font-medium mb-1.5" style={labelStyle}>Unit Cost ($)</label>
              <input
                id="admin-part-cost"
                type="text"
                required
                value={partForm.unitCost}
                onChange={e => setPartForm({ ...partForm, unitCost: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
                placeholder="185"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="admin-part-stock" className="block text-sm font-medium mb-1.5" style={labelStyle}>Starting Stock</label>
              <input
                id="admin-part-stock"
                type="number"
                min={0}
                required
                value={partForm.stock}
                onChange={e => setPartForm({ ...partForm, stock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="admin-part-reorder" className="block text-sm font-medium mb-1.5" style={labelStyle}>Reorder At</label>
              <input
                id="admin-part-reorder"
                type="number"
                min={0}
                required
                value={partForm.reorderAt}
                onChange={e => setPartForm({ ...partForm, reorderAt: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border"
                style={inputStyle}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Save Item
          </button>
        </form>
      ))}
    </div>
  )
}
