'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Car, FileText, Calendar, Shield, Plus, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

interface ServiceRecord {
  date: string
  service: string
  amount: string
  status: string
}

interface Vehicle {
  id: number
  year: string
  make: string
  model: string
  vin: string
  lastService: string
  history: ServiceRecord[]
}

const VEHICLES_STORAGE_KEY = 'autorepair-portal-vehicles'
const PLAN_STORAGE_KEY = 'autorepair-maintenance-plan'

const SEED_VEHICLES: Vehicle[] = [
  {
    id: 1,
    year: '2020',
    make: 'Toyota',
    model: 'Camry',
    vin: '1234567890ABCDEFG',
    lastService: '2026-01-15',
    history: [
      { date: '2026-01-15', service: 'Front Bumper Repair', amount: '$1,200', status: 'Completed' },
      { date: '2025-08-02', service: 'Paint Touch-Up, Hood', amount: '$180', status: 'Completed' },
      { date: '2025-03-11', service: 'Annual Inspection', amount: '$0 (plan)', status: 'Completed' }
    ]
  },
  {
    id: 2,
    year: '2018',
    make: 'Honda',
    model: 'Accord',
    vin: 'ZYXWVUTS0987654321',
    lastService: '2025-11-20',
    history: [
      { date: '2025-11-20', service: 'Rear Quarter Panel Dent Repair', amount: '$640', status: 'Completed' },
      { date: '2025-05-30', service: 'Full Exterior Detail', amount: '$150', status: 'Completed' }
    ]
  }
]

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(SEED_VEHICLES)
  const [hydrated, setHydrated] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState({ year: '', make: '', model: '', vin: '' })
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(VEHICLES_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Vehicle[]
        if (Array.isArray(parsed)) setVehicles(parsed)
      }
    } catch {
      // Corrupt storage -- fall back to seed data
    }
    try {
      const plan = window.localStorage.getItem(PLAN_STORAGE_KEY)
      if (plan) setCurrentPlan(plan)
    } catch {
      // Storage unavailable
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles))
    } catch {
      // Storage unavailable -- state still works in memory
    }
  }, [vehicles, hydrated])

  const addVehicle = (e: React.FormEvent) => {
    e.preventDefault()
    const nextId = vehicles.reduce((m, v) => Math.max(m, v.id), 0) + 1
    setVehicles([
      ...vehicles,
      {
        id: nextId,
        year: form.year,
        make: form.make,
        model: form.model,
        vin: form.vin || 'Pending -- we can pull this at your first visit',
        lastService: 'No service yet',
        history: []
      }
    ])
    setForm({ year: '', make: '', model: '', vin: '' })
    setShowAddModal(false)
  }

  const removeVehicle = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold" style={{ color: colors.text }}>Customer Portal</h1>
          {currentPlan && (
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: `${colors.success}20`, color: colors.success }}
            >
              <Shield className="w-4 h-4" />
              {currentPlan} Maintenance Plan Active
            </span>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Vehicle History */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Your Vehicles</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </div>
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>VIN: {vehicle.vin}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-8 h-8" style={{ color: colors.accent }} />
                    <button
                      onClick={() => removeVehicle(vehicle.id)}
                      aria-label={`Remove ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="p-2 rounded hover:bg-red-50 transition-colors"
                      style={{ color: colors.error }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.textLight }}>
                    <Calendar className="w-4 h-4" />
                    <span>Last Service: {vehicle.lastService}</span>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === vehicle.id ? null : vehicle.id)}
                    className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: colors.accent }}
                  >
                    {expandedId === vehicle.id ? 'Hide Service History' : 'View Service History'}
                    {expandedId === vehicle.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                {expandedId === vehicle.id && (
                  <div className="mt-4 border-t pt-4" style={{ borderColor: colors.border }}>
                    {vehicle.history.length > 0 ? (
                      <ul className="space-y-3">
                        {vehicle.history.map((record, i) => (
                          <li
                            key={i}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm"
                            style={{ backgroundColor: colors.backgroundAlt }}
                          >
                            <div>
                              <div className="font-medium" style={{ color: colors.text }}>{record.service}</div>
                              <div style={{ color: colors.textLight }}>{record.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold" style={{ color: colors.accent }}>{record.amount}</div>
                              <div style={{ color: colors.success }}>{record.status}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm" style={{ color: colors.textLight }}>
                        No service records yet for this vehicle.{' '}
                        <button
                          onClick={() => onNavigate('schedule')}
                          className="font-semibold hover:underline"
                          style={{ color: colors.accent }}
                        >
                          Schedule its first service
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {vehicles.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Car className="w-10 h-10 mx-auto mb-3" style={{ color: colors.accent }} />
                <p className="mb-4" style={{ color: colors.textLight }}>No vehicles on file yet.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: colors.accent, color: '#ffffff' }}
                >
                  Add Your First Vehicle
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => onNavigate('schedule')}
                className="w-full p-4 rounded-lg text-left shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#ffffff' }}
              >
                <Calendar className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
                <div className="font-semibold" style={{ color: colors.text }}>Schedule Service</div>
              </button>
              <button
                onClick={() => onNavigate('estimate')}
                className="w-full p-4 rounded-lg text-left shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#ffffff' }}
              >
                <FileText className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
                <div className="font-semibold" style={{ color: colors.text }}>Get Estimate</div>
              </button>
              <button
                onClick={() => onNavigate('maintenance')}
                className="w-full p-4 rounded-lg text-left shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#ffffff' }}
              >
                <Shield className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
                <div className="font-semibold" style={{ color: colors.text }}>
                  {currentPlan ? 'Manage Maintenance Plan' : 'Join a Maintenance Plan'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <h3 className="text-lg font-bold" style={{ color: colors.text }}>Add Vehicle</h3>
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                style={{ color: colors.textLight }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addVehicle} className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="portal-vehicle-year" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Year</label>
                  <input
                    id="portal-vehicle-year"
                    type="text"
                    required
                    placeholder="2022"
                    value={form.year}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="portal-vehicle-make" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Make</label>
                  <input
                    id="portal-vehicle-make"
                    type="text"
                    required
                    placeholder="Honda"
                    value={form.make}
                    onChange={e => setForm({ ...form, make: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="portal-vehicle-model" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Model</label>
                  <input
                    id="portal-vehicle-model"
                    type="text"
                    required
                    placeholder="Civic"
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="portal-vehicle-vin" className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>VIN (optional)</label>
                <input
                  id="portal-vehicle-vin"
                  type="text"
                  placeholder="17-character VIN"
                  value={form.vin}
                  onChange={e => setForm({ ...form, vin: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border"
                  style={{ borderColor: colors.border }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: '#ffffff' }}
              >
                Save Vehicle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
