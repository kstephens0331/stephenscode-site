'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Truck, Package, Users, DollarSign, TrendingUp, MapPin, X, Plus, Search, Trash2, Pencil, Download, CheckCircle, RotateCcw } from 'lucide-react'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

type ShipmentStatus = 'Processing' | 'Loading' | 'In Transit' | 'Delivering' | 'Delivered'

const STATUS_FLOW: ShipmentStatus[] = ['Processing', 'Loading', 'In Transit', 'Delivering', 'Delivered']

interface Shipment {
  id: string
  customer: string
  origin: string
  destination: string
  driver: string
  service: string
  status: ShipmentStatus
  eta: string
}

interface Vehicle {
  id: string
  type: string
  driver: string
  status: 'Available' | 'En Route' | 'Maintenance'
  location: string
}

interface CustomerRecord {
  id: string
  name: string
  email: string
  phone: string
  shipments: number
  revenue: number
}

const LS_SHIPMENTS = 'sls-admin-shipments'
const LS_FLEET = 'sls-admin-fleet'
const LS_CUSTOMERS = 'sls-admin-customers'

const DEFAULT_SHIPMENTS: Shipment[] = [
  { id: 'SLS789012', customer: 'ABC Corp', origin: 'Los Angeles, CA', destination: 'New York, NY', driver: 'John Smith', service: 'Ground Freight', status: 'In Transit', eta: '2 hrs' },
  { id: 'SLS789013', customer: 'XYZ Inc', origin: 'Chicago, IL', destination: 'Miami, FL', driver: 'Sarah Jones', service: 'Ground Freight', status: 'Loading', eta: '4 hrs' },
  { id: 'SLS789014', customer: 'Tech Solutions', origin: 'Seattle, WA', destination: 'Denver, CO', driver: 'Mike Davis', service: 'Air Freight', status: 'Delivering', eta: '30 min' },
  { id: 'SLS789015', customer: 'Northline Retail', origin: 'Houston, TX', destination: 'Atlanta, GA', driver: 'Rosa Delgado', service: 'Ground Freight', status: 'Processing', eta: 'Tomorrow' },
  { id: 'SLS789016', customer: 'ABC Corp', origin: 'Boston, MA', destination: 'Philadelphia, PA', driver: 'Chris Lee', service: 'Expedited', status: 'Delivered', eta: 'Arrived' }
]

const DEFAULT_FLEET: Vehicle[] = [
  { id: 'TRK-101', type: '53ft Dry Van', driver: 'John Smith', status: 'En Route', location: 'I-80, Nebraska' },
  { id: 'TRK-102', type: 'Refrigerated', driver: 'Sarah Jones', status: 'En Route', location: 'Chicago Depot' },
  { id: 'TRK-103', type: 'Flatbed', driver: 'Mike Davis', status: 'En Route', location: 'Denver Metro' },
  { id: 'TRK-104', type: '26ft Box Truck', driver: 'Rosa Delgado', status: 'Available', location: 'Houston Yard' },
  { id: 'TRK-105', type: '53ft Dry Van', driver: 'Unassigned', status: 'Maintenance', location: 'LA Service Center' },
  { id: 'TRK-106', type: 'Sprinter Van', driver: 'Chris Lee', status: 'Available', location: 'Philadelphia Hub' }
]

const DEFAULT_CUSTOMERS: CustomerRecord[] = [
  { id: 'CUST-001', name: 'ABC Corp', email: 'ops@abccorp.com', phone: '(555) 201-4432', shipments: 48, revenue: 92400 },
  { id: 'CUST-002', name: 'XYZ Inc', email: 'shipping@xyzinc.com', phone: '(555) 318-7765', shipments: 31, revenue: 58900 },
  { id: 'CUST-003', name: 'Tech Solutions', email: 'logistics@techsolutions.io', phone: '(555) 442-9081', shipments: 22, revenue: 41300 },
  { id: 'CUST-004', name: 'Northline Retail', email: 'freight@northline.com', phone: '(555) 590-2210', shipments: 17, revenue: 28750 }
]

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** Builds an id that is guaranteed not to collide with one already on screen */
function nextId(prefix: string, taken: string[], start: number, pad: number): string {
  let n = start
  while (taken.includes(`${prefix}${String(n).padStart(pad, '0')}`)) n += 1
  return `${prefix}${String(n).padStart(pad, '0')}`
}

function saveStored<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode/quota) -- state still lives in React for this session
  }
}

const REPORT_PERIODS = {
  'This Week': {
    metrics: [
      { label: 'Revenue', value: '$284,300', change: '+18%' },
      { label: 'Shipments', value: '312', change: '+11%' },
      { label: 'On-Time Delivery', value: '98.4%', change: '+1.2%' }
    ],
    volume: [65, 45, 80, 55, 70, 90, 85],
    volumeLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    distribution: [
      { service: 'Ground Freight', percentage: 46 },
      { service: 'Air Freight', percentage: 28 },
      { service: 'Ocean Freight', percentage: 19 },
      { service: 'Warehousing', percentage: 7 }
    ]
  },
  'This Month': {
    metrics: [
      { label: 'Revenue', value: '$1.14M', change: '+9%' },
      { label: 'Shipments', value: '1,245', change: '+15%' },
      { label: 'On-Time Delivery', value: '98.2%', change: '+2.1%' }
    ],
    volume: [58, 72, 66, 88],
    volumeLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    distribution: [
      { service: 'Ground Freight', percentage: 45 },
      { service: 'Air Freight', percentage: 30 },
      { service: 'Ocean Freight', percentage: 20 },
      { service: 'Warehousing', percentage: 5 }
    ]
  },
  'This Quarter': {
    metrics: [
      { label: 'Revenue', value: '$3.38M', change: '+14%' },
      { label: 'Shipments', value: '3,690', change: '+12%' },
      { label: 'On-Time Delivery', value: '97.9%', change: '+0.8%' }
    ],
    volume: [70, 84, 95],
    volumeLabels: ['Month 1', 'Month 2', 'Month 3'],
    distribution: [
      { service: 'Ground Freight', percentage: 44 },
      { service: 'Air Freight', percentage: 29 },
      { service: 'Ocean Freight', percentage: 21 },
      { service: 'Warehousing', percentage: 6 }
    ]
  }
} as const

type ReportPeriod = keyof typeof REPORT_PERIODS

const EMPTY_SHIPMENT_FORM = { customer: '', origin: '', destination: '', driver: '', service: 'Ground Freight', eta: 'Tomorrow' }
const EMPTY_VEHICLE_FORM = { type: '53ft Dry Van', driver: '', location: '' }
const EMPTY_CUSTOMER_FORM = { name: '', email: '', phone: '' }

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [shipments, setShipments] = useState<Shipment[]>(() => loadStored(LS_SHIPMENTS, DEFAULT_SHIPMENTS))
  const [fleet, setFleet] = useState<Vehicle[]>(() => loadStored(LS_FLEET, DEFAULT_FLEET))
  const [customers, setCustomers] = useState<CustomerRecord[]>(() => loadStored(LS_CUSTOMERS, DEFAULT_CUSTOMERS))

  // Shipments tab controls
  const [shipmentSearch, setShipmentSearch] = useState('')
  const [shipmentStatusFilter, setShipmentStatusFilter] = useState<'All' | ShipmentStatus>('All')
  const [detailShipment, setDetailShipment] = useState<Shipment | null>(null)
  const [showAddShipment, setShowAddShipment] = useState(false)
  const [shipmentForm, setShipmentForm] = useState(EMPTY_SHIPMENT_FORM)

  // Fleet tab controls
  const [fleetFilter, setFleetFilter] = useState<'All' | Vehicle['status']>('All')
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [vehicleForm, setVehicleForm] = useState(EMPTY_VEHICLE_FORM)

  // Customers tab controls
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null)
  const [customerForm, setCustomerForm] = useState(EMPTY_CUSTOMER_FORM)
  const [detailCustomer, setDetailCustomer] = useState<CustomerRecord | null>(null)

  // Demo data reset
  const [resetNotice, setResetNotice] = useState(false)

  // Reports tab controls
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('This Month')
  const [reportExported, setReportExported] = useState(false)

  // Route optimization modal
  const [showOptimizer, setShowOptimizer] = useState(false)
  const [optimizationApplied, setOptimizationApplied] = useState(false)

  useEffect(() => saveStored(LS_SHIPMENTS, shipments), [shipments])
  useEffect(() => saveStored(LS_FLEET, fleet), [fleet])
  useEffect(() => saveStored(LS_CUSTOMERS, customers), [customers])

  const activeShipments = shipments.filter(s => s.status !== 'Delivered')
  const availableDrivers = fleet.filter(v => v.status === 'Available').length
  const enRouteCount = fleet.filter(v => v.status === 'En Route').length

  const stats = [
    { label: 'Active Shipments', value: String(activeShipments.length), icon: Package, change: `${shipments.length} total on record`, tab: 'shipments' },
    { label: 'Available Vehicles', value: String(availableDrivers), icon: Truck, change: `${enRouteCount} en route`, tab: 'fleet' },
    { label: 'Revenue (Today)', value: '$45,230', icon: DollarSign, change: '+18% vs yesterday', tab: 'reports' },
    { label: 'Active Customers', value: String(customers.length), icon: TrendingUp, change: '4.8/5 avg satisfaction', tab: 'customers' }
  ]

  const filteredShipments = shipments.filter(s => {
    const q = shipmentSearch.trim().toLowerCase()
    const matchesSearch = !q || [s.id, s.customer, s.driver, s.origin, s.destination].some(v => v.toLowerCase().includes(q))
    const matchesStatus = shipmentStatusFilter === 'All' || s.status === shipmentStatusFilter
    return matchesSearch && matchesStatus
  })

  const filteredFleet = fleet.filter(v => fleetFilter === 'All' || v.status === fleetFilter)

  const advanceStatus = (id: string) => {
    setShipments(prev => prev.map(s => {
      if (s.id !== id || s.status === 'Delivered') return s
      const next = STATUS_FLOW[STATUS_FLOW.indexOf(s.status) + 1]
      return { ...s, status: next, eta: next === 'Delivered' ? 'Arrived' : s.eta }
    }))
    setDetailShipment(prev => {
      if (!prev || prev.id !== id || prev.status === 'Delivered') return prev
      const next = STATUS_FLOW[STATUS_FLOW.indexOf(prev.status) + 1]
      return { ...prev, status: next, eta: next === 'Delivered' ? 'Arrived' : prev.eta }
    })
  }

  const deleteShipment = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id))
    setDetailShipment(prev => (prev && prev.id === id ? null : prev))
  }

  const addShipment = () => {
    if (!shipmentForm.customer.trim() || !shipmentForm.origin.trim() || !shipmentForm.destination.trim()) return
    const newShipment: Shipment = {
      id: nextId('SLS', shipments.map(s => s.id), 789017, 6),
      customer: shipmentForm.customer.trim(),
      origin: shipmentForm.origin.trim(),
      destination: shipmentForm.destination.trim(),
      driver: shipmentForm.driver.trim() || 'Unassigned',
      service: shipmentForm.service,
      status: 'Processing',
      eta: shipmentForm.eta.trim() || 'Pending'
    }
    setShipments(prev => [newShipment, ...prev])
    setShipmentForm(EMPTY_SHIPMENT_FORM)
    setShowAddShipment(false)
    setActiveTab('shipments')
  }

  const toggleVehicleStatus = (id: string) => {
    setFleet(prev => prev.map(v => {
      if (v.id !== id) return v
      if (v.status === 'Maintenance') return { ...v, status: 'Available' as const }
      return { ...v, status: 'Maintenance' as const }
    }))
  }

  const deleteVehicle = (id: string) => setFleet(prev => prev.filter(v => v.id !== id))

  const addVehicle = () => {
    if (!vehicleForm.location.trim()) return
    setFleet(prev => [...prev, {
      id: nextId('TRK-', prev.map(v => v.id), 107, 3),
      type: vehicleForm.type,
      driver: vehicleForm.driver.trim() || 'Unassigned',
      status: 'Available',
      location: vehicleForm.location.trim()
    }])
    setVehicleForm(EMPTY_VEHICLE_FORM)
    setShowAddVehicle(false)
  }

  const openAddCustomer = () => {
    setEditingCustomerId(null)
    setCustomerForm(EMPTY_CUSTOMER_FORM)
    setShowCustomerForm(true)
  }

  const openEditCustomer = (c: CustomerRecord) => {
    setEditingCustomerId(c.id)
    setCustomerForm({ name: c.name, email: c.email, phone: c.phone })
    setShowCustomerForm(true)
  }

  const saveCustomer = () => {
    if (!customerForm.name.trim()) return
    if (editingCustomerId) {
      setCustomers(prev => prev.map(c => (c.id === editingCustomerId
        ? { ...c, name: customerForm.name.trim(), email: customerForm.email.trim(), phone: customerForm.phone.trim() }
        : c)))
    } else {
      setCustomers(prev => [...prev, {
        id: nextId('CUST-', prev.map(c => c.id), prev.length + 1, 3),
        name: customerForm.name.trim(),
        email: customerForm.email.trim(),
        phone: customerForm.phone.trim(),
        shipments: 0,
        revenue: 0
      }])
    }
    setShowCustomerForm(false)
    setEditingCustomerId(null)
    setCustomerForm(EMPTY_CUSTOMER_FORM)
  }

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
    setDetailCustomer(prev => (prev && prev.id === id ? null : prev))
  }

  const showCustomerShipments = (name: string) => {
    setDetailCustomer(null)
    setShipmentSearch(name)
    setShipmentStatusFilter('All')
    setActiveTab('shipments')
  }

  const resetDemoData = () => {
    setShipments(DEFAULT_SHIPMENTS)
    setFleet(DEFAULT_FLEET)
    setCustomers(DEFAULT_CUSTOMERS)
    setDetailShipment(null)
    setDetailCustomer(null)
    setShowAddShipment(false)
    setShowAddVehicle(false)
    setShowCustomerForm(false)
    setShowOptimizer(false)
    setOptimizationApplied(false)
    setShipmentSearch('')
    setShipmentStatusFilter('All')
    setFleetFilter('All')
    setResetNotice(true)
    setTimeout(() => setResetNotice(false), 3000)
  }

  const exportReport = () => {
    const data = REPORT_PERIODS[reportPeriod]
    const lines: string[] = [
      `Swift Logistics Services Report,${reportPeriod}`,
      '',
      'Metric,Value,Change',
      ...data.metrics.map(m => `${m.label},${m.value},${m.change}`),
      '',
      'Volume Period,Index',
      ...data.volume.map((v, i) => `${data.volumeLabels[i]},${v}`),
      '',
      'Service,Share %',
      ...data.distribution.map(d => `${d.service},${d.percentage}`)
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `swift-logistics-report-${reportPeriod.toLowerCase().replace(/\s+/g, '-')}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setReportExported(true)
    setTimeout(() => setReportExported(false), 3000)
  }

  const optimizableRoutes = activeShipments.filter(s => s.status === 'In Transit' || s.status === 'Loading')

  const statusPill = (status: string) => (
    <span className="px-3 py-1 rounded-full text-sm whitespace-nowrap" style={{
      backgroundColor: status === 'Delivered' || status === 'Available' ? '#10b98120' : status === 'Maintenance' ? '#ef444420' : `${colors.primary}20`,
      color: status === 'Delivered' || status === 'Available' ? '#059669' : status === 'Maintenance' ? '#dc2626' : colors.primary
    }}>
      {status}
    </span>
  )

  const inputStyle = { borderColor: colors.border }
  const labelClass = 'block text-sm font-medium mb-1'

  const reportData = REPORT_PERIODS[reportPeriod]

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold" style={{ color: colors.text }}>
              Admin Dashboard: Swift Logistics Services
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={resetDemoData}
                className="px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                <RotateCcw className="w-4 h-4" />
                {resetNotice ? 'Demo data restored' : 'Reset Demo Data'}
              </button>
              <span style={{ color: colors.textLight }}>Admin User</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {['dashboard', 'shipments', 'fleet', 'customers', 'reports'].map(tab => (
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
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>Active Shipments</h2>
                {optimizationApplied && (
                  <span className="flex items-center gap-1 text-sm" style={{ color: '#059669' }}>
                    <CheckCircle className="w-4 h-4" /> Routes optimized
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Tracking #</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Route</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Driver</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                      <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>ETA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeShipments.map(shipment => (
                      <tr
                        key={shipment.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        style={{ borderColor: colors.border }}
                        onClick={() => setDetailShipment(shipment)}
                      >
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.id}</td>
                        <td className="p-4" style={{ color: colors.text }}>{shipment.customer}</td>
                        <td className="p-4" style={{ color: colors.textLight }}>{shipment.origin} to {shipment.destination}</td>
                        <td className="p-4" style={{ color: colors.text }}>{shipment.driver}</td>
                        <td className="p-4">{statusPill(shipment.status)}</td>
                        <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.eta}</td>
                      </tr>
                    ))}
                    {activeShipments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center" style={{ color: colors.textLight }}>
                          No active shipments. Add one from the Shipments tab.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button onClick={() => setShowOptimizer(true)} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <MapPin className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Route Optimization</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Optimize delivery routes for efficiency</p>
              </button>
              <button onClick={() => setActiveTab('fleet')} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Truck className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Fleet Management</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Monitor vehicle status and maintenance</p>
              </button>
              <button onClick={() => setActiveTab('customers')} className="p-6 bg-white rounded-lg shadow text-left hover:shadow-lg transition-shadow">
                <Users className="w-8 h-8 mb-3" style={{ color: colors.primary }} />
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>Customer Accounts</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>Manage customer accounts and history</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'shipments' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textLight }} />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    aria-label="Search shipments"
                    value={shipmentSearch}
                    onChange={e => setShipmentSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-lg border bg-white"
                    style={inputStyle}
                  />
                </div>
                <select
                  aria-label="Filter by status"
                  value={shipmentStatusFilter}
                  onChange={e => setShipmentStatusFilter(e.target.value as 'All' | ShipmentStatus)}
                  className="px-4 py-2 rounded-lg border bg-white"
                  style={inputStyle}
                >
                  <option value="All">All Statuses</option>
                  {STATUS_FLOW.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button
                onClick={() => setShowAddShipment(true)}
                className="px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> New Shipment
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Tracking #</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Customer</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Route</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Service</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Status</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map(shipment => (
                    <tr key={shipment.id} className="border-b" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{shipment.id}</td>
                      <td className="p-4" style={{ color: colors.text }}>{shipment.customer}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{shipment.origin} to {shipment.destination}</td>
                      <td className="p-4" style={{ color: colors.textLight }}>{shipment.service}</td>
                      <td className="p-4">{statusPill(shipment.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailShipment(shipment)}
                            className="px-3 py-1 rounded text-sm border"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            View
                          </button>
                          {shipment.status !== 'Delivered' && (
                            <button
                              onClick={() => advanceStatus(shipment.id)}
                              className="px-3 py-1 rounded text-sm font-medium"
                              style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                            >
                              Advance
                            </button>
                          )}
                          <button
                            onClick={() => deleteShipment(shipment.id)}
                            aria-label={`Delete shipment ${shipment.id}`}
                            className="p-1.5 rounded hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" style={{ color: '#dc2626' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredShipments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center" style={{ color: colors.textLight }}>
                        No shipments match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <select
                aria-label="Filter fleet by status"
                value={fleetFilter}
                onChange={e => setFleetFilter(e.target.value as 'All' | Vehicle['status'])}
                className="px-4 py-2 rounded-lg border bg-white"
                style={inputStyle}
              >
                <option value="All">All Vehicles</option>
                <option value="Available">Available</option>
                <option value="En Route">En Route</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <button
                onClick={() => setShowAddVehicle(true)}
                className="px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFleet.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg" style={{ color: colors.text }}>{vehicle.id}</div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{vehicle.type}</div>
                    </div>
                    {statusPill(vehicle.status)}
                  </div>
                  <div className="space-y-1 mb-4 text-sm">
                    <div style={{ color: colors.text }}><span style={{ color: colors.textLight }}>Driver:</span> {vehicle.driver}</div>
                    <div style={{ color: colors.text }}><span style={{ color: colors.textLight }}>Location:</span> {vehicle.location}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVehicleStatus(vehicle.id)}
                      className="flex-1 px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                    >
                      {vehicle.status === 'Maintenance' ? 'Mark Available' : 'Send to Maintenance'}
                    </button>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      aria-label={`Remove vehicle ${vehicle.id}`}
                      className="p-2 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#dc2626' }} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredFleet.length === 0 && (
                <div className="col-span-full bg-white rounded-lg shadow p-8 text-center" style={{ color: colors.textLight }}>
                  No vehicles match this filter.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={openAddCustomer}
                className="px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> Add Customer
              </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: colors.border }}>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Account</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Company</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Contact</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Shipments</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Lifetime Revenue</th>
                    <th className="text-left p-4 text-sm font-semibold" style={{ color: colors.textLight }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id} className="border-b" style={{ borderColor: colors.border }}>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>{customer.id}</td>
                      <td className="p-4" style={{ color: colors.text }}>{customer.name}</td>
                      <td className="p-4">
                        <div style={{ color: colors.text }}>{customer.email || 'No email on file'}</div>
                        <div className="text-sm" style={{ color: colors.textLight }}>{customer.phone || 'No phone on file'}</div>
                      </td>
                      <td className="p-4" style={{ color: colors.text }}>{customer.shipments}</td>
                      <td className="p-4 font-medium" style={{ color: colors.text }}>${customer.revenue.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDetailCustomer(customer)}
                            className="px-3 py-1 rounded text-sm border"
                            style={{ borderColor: colors.border, color: colors.text }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => openEditCustomer(customer)}
                            aria-label={`Edit ${customer.name}`}
                            className="p-1.5 rounded hover:bg-gray-100"
                          >
                            <Pencil className="w-4 h-4" style={{ color: colors.primary }} />
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            aria-label={`Delete ${customer.name}`}
                            className="p-1.5 rounded hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" style={{ color: '#dc2626' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center" style={{ color: colors.textLight }}>
                        No customer accounts yet. Add your first customer above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                {(Object.keys(REPORT_PERIODS) as ReportPeriod[]).map(period => (
                  <button
                    key={period}
                    onClick={() => setReportPeriod(period)}
                    className="px-4 py-2 rounded-lg text-sm font-medium border"
                    style={{
                      backgroundColor: reportPeriod === period ? colors.primary : '#ffffff',
                      color: reportPeriod === period ? '#ffffff' : colors.text,
                      borderColor: reportPeriod === period ? colors.primary : colors.border
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <button
                onClick={exportReport}
                className="px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                <Download className="w-4 h-4" /> {reportExported ? 'Downloaded' : 'Export CSV'}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reportData.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm mb-2" style={{ color: colors.textLight }}>{metric.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold" style={{ color: colors.text }}>{metric.value}</div>
                    <div className="flex items-center gap-1 text-sm" style={{ color: '#10b981' }}>
                      <TrendingUp className="w-4 h-4" />
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Shipment Volume ({reportPeriod})</h2>
                <div className="h-64 flex items-end justify-around gap-2">
                  {reportData.volume.map((height, i) => (
                    <div key={i} className="flex-1 rounded-t-lg transition-all" style={{ backgroundColor: colors.primary, height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-around mt-4 text-sm" style={{ color: colors.textLight }}>
                  {reportData.volumeLabels.map(label => <span key={label}>{label}</span>)}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Service Distribution</h2>
                <div className="space-y-4">
                  {reportData.distribution.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: colors.text }}>{item.service}</span>
                        <span style={{ color: colors.textLight }}>{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                        <div className="h-2 rounded-full transition-all" style={{ backgroundColor: colors.primary, width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipment detail modal */}
      {detailShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setDetailShipment(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{detailShipment.id}</h3>
                <div className="mt-1">{statusPill(detailShipment.status)}</div>
              </div>
              <button onClick={() => setDetailShipment(null)} aria-label="Close shipment detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div style={{ color: colors.textLight }}>Customer</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.customer}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Driver</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.driver}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Origin</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.origin}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Destination</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.destination}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Service</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.service}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>ETA</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailShipment.eta}</div>
              </div>
            </div>
            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Progress</h4>
            <div className="space-y-3 mb-6">
              {STATUS_FLOW.map((step, idx) => {
                const currentIdx = STATUS_FLOW.indexOf(detailShipment.status)
                const done = idx <= currentIdx
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${done ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {done && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span style={{ color: done ? colors.text : colors.textLight }}>{step}</span>
                  </div>
                )
              })}
            </div>
            {detailShipment.status !== 'Delivered' && (
              <button
                onClick={() => advanceStatus(detailShipment.id)}
                className="w-full py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Advance to {STATUS_FLOW[STATUS_FLOW.indexOf(detailShipment.status) + 1]}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add shipment modal */}
      {showAddShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddShipment(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>New Shipment</h3>
              <button onClick={() => setShowAddShipment(false)} aria-label="Close new shipment form" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-ship-customer" className={labelClass} style={{ color: colors.text }}>Customer *</label>
                <input id="admin-ship-customer" type="text" value={shipmentForm.customer} onChange={e => setShipmentForm({ ...shipmentForm, customer: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-ship-origin" className={labelClass} style={{ color: colors.text }}>Origin *</label>
                  <input id="admin-ship-origin" type="text" placeholder="City, ST" value={shipmentForm.origin} onChange={e => setShipmentForm({ ...shipmentForm, origin: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="admin-ship-dest" className={labelClass} style={{ color: colors.text }}>Destination *</label>
                  <input id="admin-ship-dest" type="text" placeholder="City, ST" value={shipmentForm.destination} onChange={e => setShipmentForm({ ...shipmentForm, destination: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-ship-driver" className={labelClass} style={{ color: colors.text }}>Driver</label>
                  <input id="admin-ship-driver" type="text" placeholder="Unassigned" value={shipmentForm.driver} onChange={e => setShipmentForm({ ...shipmentForm, driver: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="admin-ship-service" className={labelClass} style={{ color: colors.text }}>Service</label>
                  <select id="admin-ship-service" value={shipmentForm.service} onChange={e => setShipmentForm({ ...shipmentForm, service: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-white" style={inputStyle}>
                    <option>Ground Freight</option>
                    <option>Air Freight</option>
                    <option>Ocean Freight</option>
                    <option>Expedited</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="admin-ship-eta" className={labelClass} style={{ color: colors.text }}>ETA</label>
                <input id="admin-ship-eta" type="text" placeholder="Tomorrow" value={shipmentForm.eta} onChange={e => setShipmentForm({ ...shipmentForm, eta: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <button
                onClick={addShipment}
                disabled={!shipmentForm.customer.trim() || !shipmentForm.origin.trim() || !shipmentForm.destination.trim()}
                className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Create Shipment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add vehicle modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddVehicle(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>Add Vehicle</h3>
              <button onClick={() => setShowAddVehicle(false)} aria-label="Close add vehicle form" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-veh-type" className={labelClass} style={{ color: colors.text }}>Vehicle Type</label>
                <select id="admin-veh-type" value={vehicleForm.type} onChange={e => setVehicleForm({ ...vehicleForm, type: e.target.value })} className="w-full px-4 py-2 rounded-lg border bg-white" style={inputStyle}>
                  <option>53ft Dry Van</option>
                  <option>Refrigerated</option>
                  <option>Flatbed</option>
                  <option>26ft Box Truck</option>
                  <option>Sprinter Van</option>
                </select>
              </div>
              <div>
                <label htmlFor="admin-veh-driver" className={labelClass} style={{ color: colors.text }}>Assigned Driver</label>
                <input id="admin-veh-driver" type="text" placeholder="Unassigned" value={vehicleForm.driver} onChange={e => setVehicleForm({ ...vehicleForm, driver: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="admin-veh-location" className={labelClass} style={{ color: colors.text }}>Current Location *</label>
                <input id="admin-veh-location" type="text" placeholder="Houston Yard" value={vehicleForm.location} onChange={e => setVehicleForm({ ...vehicleForm, location: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <button
                onClick={addVehicle}
                disabled={!vehicleForm.location.trim()}
                className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Add to Fleet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer add/edit modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowCustomerForm(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                {editingCustomerId ? 'Edit Customer' : 'Add Customer'}
              </h3>
              <button onClick={() => setShowCustomerForm(false)} aria-label="Close customer form" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-cust-name" className={labelClass} style={{ color: colors.text }}>Company Name *</label>
                <input id="admin-cust-name" type="text" value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="admin-cust-email" className={labelClass} style={{ color: colors.text }}>Email</label>
                <input id="admin-cust-email" type="email" value={customerForm.email} onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <div>
                <label htmlFor="admin-cust-phone" className={labelClass} style={{ color: colors.text }}>Phone</label>
                <input id="admin-cust-phone" type="tel" value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border" style={inputStyle} />
              </div>
              <button
                onClick={saveCustomer}
                disabled={!customerForm.name.trim()}
                className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {editingCustomerId ? 'Save Changes' : 'Add Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer detail modal */}
      {detailCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setDetailCustomer(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{detailCustomer.name}</h3>
                <div className="text-sm mt-1" style={{ color: colors.textLight }}>{detailCustomer.id}</div>
              </div>
              <button onClick={() => setDetailCustomer(null)} aria-label="Close customer detail" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div style={{ color: colors.textLight }}>Email</div>
                <div className="font-semibold break-all" style={{ color: colors.text }}>{detailCustomer.email || 'No email on file'}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Phone</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailCustomer.phone || 'No phone on file'}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Lifetime Shipments</div>
                <div className="font-semibold" style={{ color: colors.text }}>{detailCustomer.shipments}</div>
              </div>
              <div>
                <div style={{ color: colors.textLight }}>Lifetime Revenue</div>
                <div className="font-semibold" style={{ color: colors.text }}>${detailCustomer.revenue.toLocaleString()}</div>
              </div>
            </div>

            <h4 className="font-bold mb-3" style={{ color: colors.text }}>Shipments On Record</h4>
            <div className="space-y-2 mb-6">
              {shipments.filter(s => s.customer === detailCustomer.name).map(s => (
                <button
                  key={s.id}
                  onClick={() => { setDetailCustomer(null); setDetailShipment(s) }}
                  className="w-full text-left p-4 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold" style={{ color: colors.text }}>{s.id}</div>
                      <div className="text-sm" style={{ color: colors.textLight }}>{s.origin} to {s.destination}</div>
                    </div>
                    {statusPill(s.status)}
                  </div>
                </button>
              ))}
              {shipments.filter(s => s.customer === detailCustomer.name).length === 0 && (
                <p className="text-sm" style={{ color: colors.textLight }}>
                  No shipments on this account yet. Create one from the Shipments tab.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => showCustomerShipments(detailCustomer.name)}
                className="flex-1 py-3 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Filter Shipments Board
              </button>
              <button
                onClick={() => { const record = detailCustomer; setDetailCustomer(null); openEditCustomer(record) }}
                className="flex-1 py-3 rounded-lg font-semibold border"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Edit Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Route optimization modal */}
      {showOptimizer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowOptimizer(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>Route Optimization</h3>
              <button onClick={() => setShowOptimizer(false)} aria-label="Close route optimizer" className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" style={{ color: colors.textLight }} />
              </button>
            </div>
            {optimizableRoutes.length === 0 ? (
              <p style={{ color: colors.textLight }}>No shipments are currently in transit or loading, so there are no routes to optimize right now.</p>
            ) : (
              <>
                <p className="mb-4" style={{ color: colors.textLight }}>
                  The optimizer analyzed {optimizableRoutes.length} active route{optimizableRoutes.length === 1 ? '' : 's'} against live traffic and fuel data:
                </p>
                <div className="space-y-3 mb-6">
                  {optimizableRoutes.map((s, i) => (
                    <div key={s.id} className="p-4 rounded-lg border" style={{ borderColor: colors.border }}>
                      <div className="font-semibold mb-1" style={{ color: colors.text }}>{s.id}: {s.origin} to {s.destination}</div>
                      <div className="text-sm" style={{ color: colors.textLight }}>
                        Suggested reroute saves {[42, 31, 18, 27, 35][i % 5]} miles and {[38, 26, 15, 22, 30][i % 5]} minutes
                      </div>
                    </div>
                  ))}
                </div>
                {optimizationApplied ? (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-lg" style={{ backgroundColor: '#10b98115', color: '#059669' }}>
                    <CheckCircle className="w-5 h-5" /> Optimized routes dispatched to drivers
                  </div>
                ) : (
                  <button
                    onClick={() => setOptimizationApplied(true)}
                    className="w-full py-3 rounded-lg font-semibold"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    Apply Optimized Routes
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
