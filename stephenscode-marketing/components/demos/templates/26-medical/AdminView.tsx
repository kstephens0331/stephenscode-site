'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

interface AdminAppointment {
  id: string
  time: string
  patient: string
  dob: string
  type: string
  doctor: string
  status: string
  insurance: string
}

interface AdminPatient {
  id: string
  name: string
  mrn: string
  lastVisit: string
  conditions: string
  physician: string
  portalActive: boolean
}

interface AdminRx {
  id: string
  patient: string
  medication: string
  prescriber: string
  status: string
  submitted: string
}

interface ChartTarget {
  name: string
  mrn: string
  dob: string
  conditions: string
  physician: string
}

const STORAGE_KEY = 'demo-26-medical-admin-v1'

const defaultAppointments: AdminAppointment[] = [
  { id: 'a1', time: '9:00 AM', patient: 'Sarah Johnson', dob: '05/12/1985', type: 'Annual Physical', doctor: 'Dr. Mitchell', status: 'Checked In', insurance: 'Blue Cross' },
  { id: 'a2', time: '9:30 AM', patient: 'Michael Chen', dob: '08/22/1992', type: 'Follow-Up', doctor: 'Dr. Chen', status: 'Waiting', insurance: 'Aetna' },
  { id: 'a3', time: '10:00 AM', patient: 'Emma Davis', dob: '11/15/1978', type: 'Sick Visit', doctor: 'Dr. Mitchell', status: 'Scheduled', insurance: 'United Healthcare' },
  { id: 'a4', time: '10:30 AM', patient: 'Robert Williams', dob: '03/08/1965', type: 'Telehealth', doctor: 'Dr. Rodriguez', status: 'Scheduled', insurance: 'Medicare' }
]

const defaultPatients: AdminPatient[] = [
  { id: 'p1', name: 'Sarah Johnson', mrn: 'MRN-45821', lastVisit: 'Today', conditions: 'Hypertension, Type 2 Diabetes', physician: 'Dr. Mitchell', portalActive: true },
  { id: 'p2', name: 'Michael Chen', mrn: 'MRN-39847', lastVisit: '3 days ago', conditions: 'Asthma', physician: 'Dr. Chen', portalActive: true },
  { id: 'p3', name: 'Emma Davis', mrn: 'MRN-51203', lastVisit: 'Today', conditions: 'None', physician: 'Dr. Mitchell', portalActive: false },
  { id: 'p4', name: 'Robert Williams', mrn: 'MRN-28456', lastVisit: '1 week ago', conditions: 'COPD, Heart Disease', physician: 'Dr. Thompson', portalActive: false }
]

const defaultPrescriptions: AdminRx[] = [
  { id: 'rx1', patient: 'Sarah Johnson', medication: 'Lisinopril 10mg', prescriber: 'Dr. Mitchell', status: 'Pending Approval', submitted: '2 hours ago' },
  { id: 'rx2', patient: 'Michael Chen', medication: 'Albuterol Inhaler', prescriber: 'Dr. Chen', status: 'Sent to Pharmacy', submitted: '4 hours ago' },
  { id: 'rx3', patient: 'David Park', medication: 'Metformin 500mg', prescriber: 'Dr. Mitchell', status: 'Pending Approval', submitted: '1 day ago' },
  { id: 'rx4', patient: 'Jennifer Lee', medication: 'Atorvastatin 20mg', prescriber: 'Dr. Thompson', status: 'Approved', submitted: '2 days ago' }
]

const rxDetails: Record<string, { sig: string; quantity: string; refills: string; pharmacy: string; diagnosis: string }> = {
  'Lisinopril 10mg': { sig: 'Take 1 tablet by mouth once daily', quantity: '30 tablets', refills: '3 authorized', pharmacy: 'CVS Pharmacy - Main Street', diagnosis: 'Hypertension (I10)' },
  'Albuterol Inhaler': { sig: 'Inhale 2 puffs every 4-6 hours as needed', quantity: '1 inhaler (8.5g)', refills: '2 authorized', pharmacy: 'Walgreens - Downtown Seattle', diagnosis: 'Asthma (J45.909)' },
  'Metformin 500mg': { sig: 'Take 1 tablet by mouth twice daily with meals', quantity: '60 tablets', refills: '3 authorized', pharmacy: 'CVS Pharmacy - Main Street', diagnosis: 'Type 2 Diabetes (E11.9)' },
  'Atorvastatin 20mg': { sig: 'Take 1 tablet by mouth at bedtime', quantity: '30 tablets', refills: '5 authorized', pharmacy: 'Rite Aid - Medical Plaza', diagnosis: 'Hyperlipidemia (E78.5)' }
}

const calendarSchedules: Record<string, { time: string; patient: string; type: string; doctor: string }[]> = {
  Tomorrow: [
    { time: '8:00 AM', patient: 'Linda Torres', type: 'Annual Physical', doctor: 'Dr. Mitchell' },
    { time: '9:30 AM', patient: 'Kevin Wright', type: 'Follow-Up', doctor: 'Dr. Thompson' },
    { time: '11:00 AM', patient: 'Amy Foster', type: 'Telehealth', doctor: 'Dr. Rodriguez' },
    { time: '2:00 PM', patient: 'Brian Hall', type: 'Sick Visit', doctor: 'Dr. Chen' }
  ],
  Wednesday: [
    { time: '8:30 AM', patient: 'Nancy Green', type: 'Follow-Up', doctor: 'Dr. Mitchell' },
    { time: '10:00 AM', patient: 'Paul Rivera', type: 'New Patient Visit', doctor: 'Dr. Park' },
    { time: '1:30 PM', patient: 'Diane Cooper', type: 'Annual Physical', doctor: 'Dr. Williams' }
  ],
  Thursday: [
    { time: '9:00 AM', patient: 'Steve Morgan', type: 'Telehealth', doctor: 'Dr. Chen' },
    { time: '11:30 AM', patient: 'Karen Bell', type: 'Sick Visit', doctor: 'Dr. Mitchell' },
    { time: '3:00 PM', patient: 'Tom Reed', type: 'Follow-Up', doctor: 'Dr. Thompson' }
  ],
  Friday: [
    { time: '8:00 AM', patient: 'Julia Sanders', type: 'Annual Physical', doctor: 'Dr. Park' },
    { time: '10:30 AM', patient: 'Mark Bailey', type: 'New Patient Visit', doctor: 'Dr. Rodriguez' }
  ]
}

const analyticsByPeriod: Record<string, {
  waitTime: string
  showRate: string
  sameDay: string
  telehealth: string
  diagnoses: { diagnosis: string; count: number }[]
}> = {
  'This Month': {
    waitTime: '12 min',
    showRate: '94%',
    sameDay: '87%',
    telehealth: '43%',
    diagnoses: [
      { diagnosis: 'Hypertension', count: 847 },
      { diagnosis: 'Type 2 Diabetes', count: 623 },
      { diagnosis: 'Upper Respiratory Infection', count: 412 },
      { diagnosis: 'Anxiety/Depression', count: 389 }
    ]
  },
  'Last Month': {
    waitTime: '14 min',
    showRate: '92%',
    sameDay: '84%',
    telehealth: '39%',
    diagnoses: [
      { diagnosis: 'Hypertension', count: 812 },
      { diagnosis: 'Upper Respiratory Infection', count: 587 },
      { diagnosis: 'Type 2 Diabetes', count: 598 },
      { diagnosis: 'Anxiety/Depression', count: 355 }
    ]
  },
  'Year to Date': {
    waitTime: '13 min',
    showRate: '93%',
    sameDay: '85%',
    telehealth: '41%',
    diagnoses: [
      { diagnosis: 'Hypertension', count: 6204 },
      { diagnosis: 'Type 2 Diabetes', count: 4517 },
      { diagnosis: 'Upper Respiratory Infection', count: 3892 },
      { diagnosis: 'Anxiety/Depression', count: 2941 }
    ]
  }
}

const doctorOptions = ['Dr. Mitchell', 'Dr. Chen', 'Dr. Rodriguez', 'Dr. Thompson', 'Dr. Park', 'Dr. Williams']
const apptTypeOptions = ['Annual Physical', 'Follow-Up', 'Sick Visit', 'New Patient Visit', 'Telehealth', 'Urgent Care']
const timeSlotOptions = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']

const emptyNewAppt = { patient: '', dob: '', time: '8:00 AM', type: 'Annual Physical', doctor: 'Dr. Mitchell', insurance: '' }
const emptyNewPatient = { name: '', dob: '', conditions: '', physician: 'Dr. Mitchell' }

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'patients' | 'prescriptions' | 'analytics'>('appointments')

  const [appointments, setAppointments] = useState<AdminAppointment[]>(defaultAppointments)
  const [patients, setPatients] = useState<AdminPatient[]>(defaultPatients)
  const [prescriptions, setPrescriptions] = useState<AdminRx[]>(defaultPrescriptions)
  const [loaded, setLoaded] = useState(false)

  // Modals and panels
  const [showNewAppt, setShowNewAppt] = useState(false)
  const [newApptForm, setNewApptForm] = useState(emptyNewAppt)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDay, setCalendarDay] = useState('Today')
  const [chartTarget, setChartTarget] = useState<ChartTarget | null>(null)
  const [videoAppt, setVideoAppt] = useState<AdminAppointment | null>(null)
  const [videoAdmitted, setVideoAdmitted] = useState(false)
  const [showNewPatient, setShowNewPatient] = useState(false)
  const [newPatientForm, setNewPatientForm] = useState(emptyNewPatient)
  const [portalPatientId, setPortalPatientId] = useState<string | null>(null)
  const [portalInviteSent, setPortalInviteSent] = useState(false)
  const [messageTarget, setMessageTarget] = useState<string | null>(null)
  const [messageForm, setMessageForm] = useState({ subject: '', body: '' })
  const [messageSent, setMessageSent] = useState(false)
  const [rxDetailTarget, setRxDetailTarget] = useState<AdminRx | null>(null)
  const [analyticsPeriod, setAnalyticsPeriod] = useState('This Month')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.appointments)) setAppointments(parsed.appointments)
        if (Array.isArray(parsed.patients)) setPatients(parsed.patients)
        if (Array.isArray(parsed.prescriptions)) setPrescriptions(parsed.prescriptions)
      }
    } catch {
      // Corrupted or unavailable storage -- keep in-memory defaults
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ appointments, patients, prescriptions }))
    } catch {
      // Storage unavailable -- state still works in memory
    }
  }, [loaded, appointments, patients, prescriptions])

  const apptStatusColor = (status: string) => {
    if (status === 'Checked In') return '#22c55e'
    if (status === 'Waiting') return '#fbbf24'
    if (status === 'In Progress') return '#3b82f6'
    if (status === 'Completed') return '#16a34a'
    if (status === 'Cancelled') return '#ef4444'
    return '#9ca3af'
  }

  const rxStatusColor = (status: string) => {
    if (status === 'Approved') return '#22c55e'
    if (status === 'Sent to Pharmacy') return '#3b82f6'
    if (status === 'Denied') return '#ef4444'
    return '#fbbf24'
  }

  const setApptStatus = (id: string, status: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const removeAppt = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  const setRxStatus = (id: string, status: string) => {
    setPrescriptions((prev) => prev.map((rx) => (rx.id === id ? { ...rx, status } : rx)))
  }

  const openChartFor = (name: string, dob?: string) => {
    const record = patients.find((p) => p.name === name)
    setChartTarget({
      name,
      mrn: record ? record.mrn : 'MRN-' + Math.floor(10000 + Math.random() * 90000),
      dob: dob || 'On file',
      conditions: record ? record.conditions : 'None on record',
      physician: record ? record.physician : 'Unassigned'
    })
  }

  const handleNewApptSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const appt: AdminAppointment = {
      id: `a-${Date.now()}`,
      time: newApptForm.time,
      patient: newApptForm.patient,
      dob: newApptForm.dob || 'On file',
      type: newApptForm.type,
      doctor: newApptForm.doctor,
      status: 'Scheduled',
      insurance: newApptForm.insurance || 'Self-Pay'
    }
    setAppointments((prev) => [...prev, appt])
    setNewApptForm(emptyNewAppt)
    setShowNewAppt(false)
  }

  const handleNewPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const patient: AdminPatient = {
      id: `p-${Date.now()}`,
      name: newPatientForm.name,
      mrn: 'MRN-' + Math.floor(10000 + Math.random() * 90000),
      lastVisit: 'New patient',
      conditions: newPatientForm.conditions || 'None',
      physician: newPatientForm.physician,
      portalActive: false
    }
    setPatients((prev) => [...prev, patient])
    setNewPatientForm(emptyNewPatient)
    setShowNewPatient(false)
  }

  const sendPortalInvite = (id: string) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, portalActive: true } : p)))
    setPortalInviteSent(true)
  }

  const closeMessage = () => {
    setMessageTarget(null)
    setMessageForm({ subject: '', body: '' })
    setMessageSent(false)
  }

  const closeVideo = () => {
    setVideoAppt(null)
    setVideoAdmitted(false)
  }

  const portalPatient = portalPatientId ? patients.find((p) => p.id === portalPatientId) : null
  const analytics = analyticsByPeriod[analyticsPeriod]

  const modalInput = { backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#0353a4' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-bold mb-2">
            Medical Practice Dashboard
          </h1>
          <p style={{ color: '#0496ff' }} className="text-lg font-bold">
            Patient management, scheduling, and clinical workflows
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Today&apos;s Patients</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">47</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">8 walk-ins, 39 scheduled</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Active Patients</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">12,847</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 234 new this month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Pending Results</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">28</div>
            <div style={{ color: '#fbbf24' }} className="text-sm font-bold">Requiring review</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Patient Satisfaction</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-1">4.9</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">Excellent rating</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'appointments' as const, label: 'Appointments', icon: '📅' },
            { id: 'patients' as const, label: 'Patient Records', icon: '📋' },
            { id: 'prescriptions' as const, label: 'Prescriptions', icon: '💊' },
            { id: 'analytics' as const, label: 'Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#0353a4' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#1a1a1a'
              }}
              className="px-6 py-3 font-bold hover:opacity-80 transition"
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Today&apos;s Schedule</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewAppt(true)}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="px-6 py-3 font-bold hover:opacity-90 transition"
                >
                  + New Appointment
                </button>
                <button
                  onClick={() => { setCalendarDay('Today'); setShowCalendar(true) }}
                  style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }}
                  className="px-6 py-3 font-bold hover:opacity-70 transition"
                >
                  View Calendar
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} style={{ backgroundColor: '#f8f8f8', border: '3px solid #e5e5e5' }} className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span style={{ color: '#0353a4' }} className="text-2xl font-bold">{apt.time}</span>
                        <span style={{ backgroundColor: apptStatusColor(apt.status), color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {apt.status}
                        </span>
                        <span style={{ backgroundColor: '#0496ff', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {apt.type}
                        </span>
                      </div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold text-lg mb-1">{apt.patient}</div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>🆔 DOB: {apt.dob}</div>
                        <div>👨‍⚕️ With {apt.doctor}</div>
                        <div>🏥 Insurance: {apt.insurance}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openChartFor(apt.patient, apt.dob)}
                        style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        Open Chart
                      </button>
                      {apt.status !== 'In Progress' && apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => setApptStatus(apt.id, 'In Progress')}
                          style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Start Visit
                        </button>
                      )}
                      {apt.status === 'In Progress' && (
                        <button
                          onClick={() => setApptStatus(apt.id, 'Completed')}
                          style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Complete Visit
                        </button>
                      )}
                      {apt.type === 'Telehealth' && apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => { setVideoAppt(apt); setVideoAdmitted(false) }}
                          style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Join Video
                        </button>
                      )}
                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => setApptStatus(apt.id, 'Cancelled')}
                          style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Cancel
                        </button>
                      )}
                      {(apt.status === 'Cancelled' || apt.status === 'Completed') && (
                        <button
                          onClick={() => removeAppt(apt.id)}
                          style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Remove from Schedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {appointments.length === 0 && (
                <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #e5e5e5' }} className="p-10 text-center">
                  <p style={{ color: '#666666' }} className="font-bold mb-4">No appointments on the schedule.</p>
                  <button
                    onClick={() => setShowNewAppt(true)}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="px-6 py-3 font-bold hover:opacity-90 transition"
                  >
                    + New Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Patient Records (EHR System)</h2>
              <button
                onClick={() => setShowNewPatient(true)}
                style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                className="px-6 py-3 font-bold hover:opacity-90 transition"
              >
                + New Patient
              </button>
            </div>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div key={patient.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-bold">{patient.name}</span>
                        <span style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold">
                          {patient.mrn}
                        </span>
                        {patient.portalActive && (
                          <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                            Portal Active
                          </span>
                        )}
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>👨‍⚕️ Primary: {patient.physician}</div>
                        <div>📅 Last Visit: {patient.lastVisit}</div>
                        <div>🏥 Conditions: {patient.conditions}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openChartFor(patient.name)}
                        style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        View Chart
                      </button>
                      <button
                        onClick={() => { setPortalPatientId(patient.id); setPortalInviteSent(false) }}
                        style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        Portal Access
                      </button>
                      <button
                        onClick={() => { setMessageTarget(patient.name); setMessageSent(false); setMessageForm({ subject: '', body: '' }) }}
                        style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-6">E-Prescription Management</h2>
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div key={rx.id} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-bold">{rx.medication}</span>
                        <span style={{ backgroundColor: rxStatusColor(rx.status), color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                          {rx.status}
                        </span>
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>👤 Patient: {rx.patient}</div>
                        <div>👨‍⚕️ Prescriber: {rx.prescriber}</div>
                        <div>🕐 Submitted: {rx.submitted}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rx.status === 'Pending Approval' && (
                        <>
                          <button
                            onClick={() => setRxStatus(rx.id, 'Approved')}
                            style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                            className="px-4 py-2 font-bold text-sm hover:opacity-90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRxStatus(rx.id, 'Denied')}
                            style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                            className="px-4 py-2 font-bold text-sm hover:opacity-90"
                          >
                            Deny
                          </button>
                        </>
                      )}
                      {rx.status === 'Approved' && (
                        <button
                          onClick={() => setRxStatus(rx.id, 'Sent to Pharmacy')}
                          style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Send to Pharmacy
                        </button>
                      )}
                      {rx.status === 'Denied' && (
                        <button
                          onClick={() => setRxStatus(rx.id, 'Pending Approval')}
                          style={{ backgroundColor: '#fbbf24', color: '#1a1a1a' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Reopen Request
                        </button>
                      )}
                      <button
                        onClick={() => setRxDetailTarget(rx)}
                        style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                        className="px-4 py-2 font-bold text-sm hover:opacity-90"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-bold">Practice Analytics</h2>
              <div className="flex gap-2">
                {Object.keys(analyticsByPeriod).map((period) => (
                  <button
                    key={period}
                    onClick={() => setAnalyticsPeriod(period)}
                    style={{
                      backgroundColor: analyticsPeriod === period ? '#0353a4' : '#f5f5f5',
                      color: analyticsPeriod === period ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-4 py-2 font-bold text-sm hover:opacity-80 transition"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Patient Demographics</h3>
                <div className="space-y-4">
                  {[
                    { category: 'Age 0-18', count: 2847, percentage: 22 },
                    { category: 'Age 19-40', count: 4231, percentage: 33 },
                    { category: 'Age 41-64', count: 3615, percentage: 28 },
                    { category: 'Age 65+', count: 2154, percentage: 17 }
                  ].map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#1a1a1a' }} className="font-bold">{item.category}</span>
                        <span style={{ color: '#0353a4' }} className="font-bold">{item.count} patients</span>
                      </div>
                      <div style={{ backgroundColor: '#e5e5e5' }} className="h-3 rounded-full overflow-hidden">
                        <div
                          style={{ backgroundColor: '#0353a4', width: `${item.percentage}%` }}
                          className="h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Key Performance Metrics ({analyticsPeriod})</h3>
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Average Wait Time</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{analytics.waitTime}</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Appointment Show Rate</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{analytics.showRate}</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Same-Day Appointments</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{analytics.sameDay}</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Telehealth Adoption</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-bold">{analytics.telehealth}</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Top Diagnoses ({analyticsPeriod})</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {analytics.diagnoses.map((item) => (
                    <div key={item.diagnosis} style={{ backgroundColor: '#f8f8f8' }} className="p-4 text-center">
                      <div style={{ color: '#0353a4' }} className="text-3xl font-bold mb-2">{item.count}</div>
                      <div style={{ color: '#666666' }} className="text-sm font-bold">{item.diagnosis}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewAppt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">New Appointment</h3>
              <button onClick={() => setShowNewAppt(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={handleNewApptSubmit} className="p-8 space-y-5">
              <div>
                <label htmlFor="admin-appt-patient" style={{ color: '#0353a4' }} className="block font-bold mb-2">Patient Name *</label>
                <input
                  id="admin-appt-patient"
                  type="text"
                  required
                  value={newApptForm.patient}
                  onChange={(e) => setNewApptForm({ ...newApptForm, patient: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="admin-appt-dob" style={{ color: '#0353a4' }} className="block font-bold mb-2">Date of Birth</label>
                <input
                  id="admin-appt-dob"
                  type="text"
                  value={newApptForm.dob}
                  onChange={(e) => setNewApptForm({ ...newApptForm, dob: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="admin-appt-time" style={{ color: '#0353a4' }} className="block font-bold mb-2">Time Slot *</label>
                  <select
                    id="admin-appt-time"
                    required
                    value={newApptForm.time}
                    onChange={(e) => setNewApptForm({ ...newApptForm, time: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3"
                  >
                    {timeSlotOptions.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-appt-type" style={{ color: '#0353a4' }} className="block font-bold mb-2">Visit Type *</label>
                  <select
                    id="admin-appt-type"
                    required
                    value={newApptForm.type}
                    onChange={(e) => setNewApptForm({ ...newApptForm, type: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3"
                  >
                    {apptTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="admin-appt-doctor" style={{ color: '#0353a4' }} className="block font-bold mb-2">Physician *</label>
                  <select
                    id="admin-appt-doctor"
                    required
                    value={newApptForm.doctor}
                    onChange={(e) => setNewApptForm({ ...newApptForm, doctor: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3"
                  >
                    {doctorOptions.map((doc) => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-appt-insurance" style={{ color: '#0353a4' }} className="block font-bold mb-2">Insurance</label>
                  <input
                    id="admin-appt-insurance"
                    type="text"
                    value={newApptForm.insurance}
                    onChange={(e) => setNewApptForm({ ...newApptForm, insurance: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3"
                    placeholder="e.g., Blue Cross"
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Add to Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">Practice Calendar</h3>
              <button onClick={() => setShowCalendar(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setCalendarDay(day)}
                    style={{
                      backgroundColor: calendarDay === day ? '#0353a4' : '#f5f5f5',
                      color: calendarDay === day ? '#ffffff' : '#1a1a1a'
                    }}
                    className="px-5 py-2 font-bold text-sm hover:opacity-80 transition"
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {(calendarDay === 'Today'
                  ? appointments.map((a) => ({ time: a.time, patient: a.patient, type: a.type, doctor: a.doctor }))
                  : calendarSchedules[calendarDay] || []
                ).map((slot, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-4 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#0353a4' }} className="font-bold text-lg w-20">{slot.time}</span>
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">{slot.patient}</div>
                        <div style={{ color: '#666666' }} className="text-sm">{slot.type} • {slot.doctor}</div>
                      </div>
                    </div>
                    <span style={{ backgroundColor: '#0496ff', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                      {slot.type}
                    </span>
                  </div>
                ))}
                {calendarDay === 'Today' && appointments.length === 0 && (
                  <p style={{ color: '#666666' }} className="text-center py-8 font-bold">No appointments scheduled today.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Chart Modal */}
      {chartTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">Patient Chart: {chartTarget.name}</h3>
              <button onClick={() => setChartTarget(null)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
                  <h4 style={{ color: '#0353a4' }} className="font-bold text-lg mb-3">Demographics</h4>
                  <div style={{ color: '#333333' }} className="text-sm space-y-2">
                    <div><span style={{ color: '#666666' }}>MRN: </span><span className="font-bold">{chartTarget.mrn}</span></div>
                    <div><span style={{ color: '#666666' }}>DOB: </span><span className="font-bold">{chartTarget.dob}</span></div>
                    <div><span style={{ color: '#666666' }}>Primary: </span><span className="font-bold">{chartTarget.physician}</span></div>
                    <div><span style={{ color: '#666666' }}>Conditions: </span><span className="font-bold">{chartTarget.conditions}</span></div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6">
                  <h4 style={{ color: '#0353a4' }} className="font-bold text-lg mb-3">Latest Vitals</h4>
                  <div style={{ color: '#333333' }} className="text-sm space-y-2">
                    <div><span style={{ color: '#666666' }}>Blood Pressure: </span><span className="font-bold">128/82 mmHg</span></div>
                    <div><span style={{ color: '#666666' }}>Heart Rate: </span><span className="font-bold">72 bpm</span></div>
                    <div><span style={{ color: '#666666' }}>Temperature: </span><span className="font-bold">98.6 F</span></div>
                    <div><span style={{ color: '#666666' }}>BMI: </span><span className="font-bold">26.4</span></div>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 mb-6">
                <h4 style={{ color: '#0353a4' }} className="font-bold text-lg mb-3">Allergies</h4>
                <p style={{ color: '#333333' }} className="text-sm">
                  {chartTarget.name === 'Sarah Johnson' ? 'Penicillin (rash)' : 'No known drug allergies'}
                </p>
              </div>
              <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 mb-6">
                <h4 style={{ color: '#0353a4' }} className="font-bold text-lg mb-3">Most Recent Note</h4>
                <p style={{ color: '#333333' }} className="text-sm leading-relaxed">
                  Patient seen for routine follow-up. Vitals stable, medications reviewed and reconciled. Labs ordered:
                  CBC, CMP, lipid panel. Continue current treatment plan and follow up in 3 months, sooner if symptoms change.
                </p>
              </div>
              <button
                onClick={() => setChartTarget(null)}
                style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                className="w-full py-3 font-bold hover:opacity-90 transition"
              >
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provider Video Modal */}
      {videoAppt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-3xl w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Telehealth: {videoAppt.patient}</h3>
              <button onClick={closeVideo} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#1a1a1a', height: '320px' }} className="flex flex-col items-center justify-center mb-6">
                {videoAdmitted ? (
                  <div style={{ color: '#ffffff' }} className="text-center px-6">
                    <div className="font-bold text-2xl mb-2">In Session with {videoAppt.patient}</div>
                    <div style={{ color: '#22c55e' }} className="font-bold mb-2">Secure connection active</div>
                    <div style={{ color: '#cccccc' }} className="text-sm">{videoAppt.type} • {videoAppt.doctor}</div>
                  </div>
                ) : (
                  <div style={{ color: '#ffffff' }} className="text-center px-6">
                    <div className="font-bold text-2xl mb-2">{videoAppt.patient} is in the virtual waiting room</div>
                    <div style={{ color: '#0496ff' }} className="mb-6">HIPAA-compliant secure connection ready</div>
                    <button
                      onClick={() => { setVideoAdmitted(true); setApptStatus(videoAppt.id, 'In Progress') }}
                      style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                      className="px-8 py-3 font-bold text-lg hover:opacity-90"
                    >
                      Admit Patient
                    </button>
                  </div>
                )}
              </div>
              {videoAdmitted && (
                <button
                  onClick={() => { setApptStatus(videoAppt.id, 'Completed'); closeVideo() }}
                  style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                  className="w-full py-3 font-bold hover:opacity-90 transition"
                >
                  End Session & Complete Visit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Patient Modal */}
      {showNewPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">New Patient Record</h3>
              <button onClick={() => setShowNewPatient(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <form onSubmit={handleNewPatientSubmit} className="p-8 space-y-5">
              <div>
                <label htmlFor="admin-patient-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                <input
                  id="admin-patient-name"
                  type="text"
                  required
                  value={newPatientForm.name}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="admin-patient-dob" style={{ color: '#0353a4' }} className="block font-bold mb-2">Date of Birth</label>
                <input
                  id="admin-patient-dob"
                  type="text"
                  value={newPatientForm.dob}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, dob: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div>
                <label htmlFor="admin-patient-conditions" style={{ color: '#0353a4' }} className="block font-bold mb-2">Known Conditions</label>
                <input
                  id="admin-patient-conditions"
                  type="text"
                  value={newPatientForm.conditions}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, conditions: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                  placeholder="e.g., Hypertension"
                />
              </div>
              <div>
                <label htmlFor="admin-patient-physician" style={{ color: '#0353a4' }} className="block font-bold mb-2">Primary Physician *</label>
                <select
                  id="admin-patient-physician"
                  required
                  value={newPatientForm.physician}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, physician: e.target.value })}
                  style={modalInput}
                  className="w-full px-4 py-3"
                >
                  {doctorOptions.map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Create Patient Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Portal Access Modal */}
      {portalPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-lg w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Portal Access</h3>
              <button onClick={() => setPortalPatientId(null)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8 text-center">
              <div style={{ color: '#1a1a1a' }} className="text-xl font-bold mb-2">{portalPatient.name}</div>
              <div style={{ color: '#666666' }} className="text-sm mb-6">{portalPatient.mrn}</div>
              {portalPatient.portalActive ? (
                <div>
                  <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-4 py-2 text-sm font-bold uppercase">
                    Portal Account Active
                  </span>
                  <p style={{ color: '#333333' }} className="mt-6 mb-6">
                    {portalInviteSent
                      ? 'Portal invite accepted. This patient can now view records, message the care team, and request refills online.'
                      : 'This patient has full portal access: records, secure messaging, refill requests, and online bill pay.'}
                  </p>
                  <button
                    onClick={() => setPortalPatientId(null)}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  <span style={{ backgroundColor: '#fbbf24', color: '#1a1a1a' }} className="px-4 py-2 text-sm font-bold uppercase">
                    No Portal Account
                  </span>
                  <p style={{ color: '#333333' }} className="mt-6 mb-6">
                    Send a secure email invite so this patient can activate their portal account and manage care online.
                  </p>
                  <button
                    onClick={() => sendPortalInvite(portalPatient.id)}
                    style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Send Portal Invite
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message Patient Modal */}
      {messageTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-xl w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Secure Message: {messageTarget}</h3>
              <button onClick={closeMessage} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            {messageSent ? (
              <div className="p-8 text-center">
                <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">✓</div>
                <h4 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-3">Message Sent</h4>
                <p style={{ color: '#333333' }} className="mb-6">
                  Your secure message was delivered to {messageTarget}&apos;s patient portal inbox. They will also receive an email notification.
                </p>
                <button
                  onClick={closeMessage}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="px-8 py-3 font-bold hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setMessageSent(true)
                }}
                className="p-8 space-y-5"
              >
                <div>
                  <label htmlFor="admin-msg-subject" style={{ color: '#0353a4' }} className="block font-bold mb-2">Subject *</label>
                  <input
                    id="admin-msg-subject"
                    type="text"
                    required
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3"
                  />
                </div>
                <div>
                  <label htmlFor="admin-msg-body" style={{ color: '#0353a4' }} className="block font-bold mb-2">Message *</label>
                  <textarea
                    id="admin-msg-body"
                    required
                    value={messageForm.body}
                    onChange={(e) => setMessageForm({ ...messageForm, body: e.target.value })}
                    style={modalInput}
                    className="w-full px-4 py-3 h-32"
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Send Secure Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Prescription Details Modal */}
      {rxDetailTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-xl w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Prescription Details</h3>
              <button onClick={() => setRxDetailTarget(null)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span style={{ color: '#1a1a1a' }} className="text-xl font-bold">{rxDetailTarget.medication}</span>
                <span style={{ backgroundColor: rxStatusColor(rxDetailTarget.status), color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                  {rxDetailTarget.status}
                </span>
              </div>
              <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 space-y-3 mb-6">
                {(() => {
                  const detail = rxDetails[rxDetailTarget.medication] || {
                    sig: 'Take as directed by prescriber',
                    quantity: '30-day supply',
                    refills: 'Per prescriber authorization',
                    pharmacy: 'CVS Pharmacy - Main Street',
                    diagnosis: 'See chart'
                  }
                  return (
                    <>
                      <div><span style={{ color: '#666666' }}>Patient: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{rxDetailTarget.patient}</span></div>
                      <div><span style={{ color: '#666666' }}>Prescriber: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{rxDetailTarget.prescriber}</span></div>
                      <div><span style={{ color: '#666666' }}>Directions: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{detail.sig}</span></div>
                      <div><span style={{ color: '#666666' }}>Quantity: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{detail.quantity}</span></div>
                      <div><span style={{ color: '#666666' }}>Refills: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{detail.refills}</span></div>
                      <div><span style={{ color: '#666666' }}>Pharmacy: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{detail.pharmacy}</span></div>
                      <div><span style={{ color: '#666666' }}>Diagnosis: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{detail.diagnosis}</span></div>
                      <div><span style={{ color: '#666666' }}>Submitted: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{rxDetailTarget.submitted}</span></div>
                    </>
                  )
                })()}
              </div>
              {rxDetailTarget.status === 'Pending Approval' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => { setRxStatus(rxDetailTarget.id, 'Approved'); setRxDetailTarget(null) }}
                    style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                    className="py-3 font-bold hover:opacity-90 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => { setRxStatus(rxDetailTarget.id, 'Denied'); setRxDetailTarget(null) }}
                    style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                    className="py-3 font-bold hover:opacity-90 transition"
                  >
                    Deny
                  </button>
                </div>
              )}
              <button
                onClick={() => setRxDetailTarget(null)}
                style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }}
                className="w-full py-3 font-bold hover:opacity-70 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-20"></div>
    </div>
  )
}
