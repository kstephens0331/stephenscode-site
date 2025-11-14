'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'

interface AdminViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function AdminView({ demo, colors }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'patients' | 'prescriptions' | 'analytics'>('appointments')

  const todayAppointments = [
    { time: '9:00 AM', patient: 'Sarah Johnson', dob: '05/12/1985', type: 'Annual Physical', doctor: 'Dr. Mitchell', status: 'Checked In', insurance: 'Blue Cross' },
    { time: '9:30 AM', patient: 'Michael Chen', dob: '08/22/1992', type: 'Follow-Up', doctor: 'Dr. Chen', status: 'Waiting', insurance: 'Aetna' },
    { time: '10:00 AM', patient: 'Emma Davis', dob: '11/15/1978', type: 'Sick Visit', doctor: 'Dr. Mitchell', status: 'Scheduled', insurance: 'United Healthcare' },
    { time: '10:30 AM', patient: 'Robert Williams', dob: '03/08/1965', type: 'Telehealth', doctor: 'Dr. Rodriguez', status: 'Scheduled', insurance: 'Medicare' }
  ]

  const recentPatients = [
    { name: 'Sarah Johnson', mrn: 'MRN-45821', lastVisit: 'Today', conditions: 'Hypertension, Type 2 Diabetes', physician: 'Dr. Mitchell' },
    { name: 'Michael Chen', mrn: 'MRN-39847', lastVisit: '3 days ago', conditions: 'Asthma', physician: 'Dr. Chen' },
    { name: 'Emma Davis', mrn: 'MRN-51203', lastVisit: 'Today', conditions: 'None', physician: 'Dr. Mitchell' },
    { name: 'Robert Williams', mrn: 'MRN-28456', lastVisit: '1 week ago', conditions: 'COPD, Heart Disease', physician: 'Dr. Thompson' }
  ]

  const pendingPrescriptions = [
    { patient: 'Sarah Johnson', medication: 'Lisinopril 10mg', prescriber: 'Dr. Mitchell', status: 'Pending Approval', submitted: '2 hours ago' },
    { patient: 'Michael Chen', medication: 'Albuterol Inhaler', prescriber: 'Dr. Chen', status: 'Sent to Pharmacy', submitted: '4 hours ago' },
    { patient: 'David Park', medication: 'Metformin 500mg', prescriber: 'Dr. Mitchell', status: 'Pending Approval', submitted: '1 day ago' },
    { patient: 'Jennifer Lee', medication: 'Atorvastatin 20mg', prescriber: 'Dr. Thompson', status: 'Approved', submitted: '2 days ago' }
  ]

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: '#0353a4' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 style={{ color: '#ffffff' }} className="text-4xl font-black mb-2">
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
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Today's Patients</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">47</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">8 walk-ins, 39 scheduled</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Active Patients</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">12,847</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">↑ 234 new this month</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Pending Results</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">28</div>
            <div style={{ color: '#fbbf24' }} className="text-sm font-bold">Requiring review</div>
          </div>
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 shadow-lg">
            <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-2">Patient Satisfaction</div>
            <div style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-1">4.9</div>
            <div style={{ color: '#22c55e' }} className="text-sm font-bold">Excellent rating</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 mb-6">
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
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Today's Schedule</h2>
              <div className="flex gap-3">
                <button style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="px-6 py-3 font-bold">
                  + New Appointment
                </button>
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="px-6 py-3 font-bold">
                  View Calendar
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {todayAppointments.map((apt, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '3px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#0353a4' }} className="text-2xl font-black">{apt.time}</span>
                        <span style={{
                          backgroundColor: apt.status === 'Checked In' ? '#22c55e' :
                                        apt.status === 'Waiting' ? '#fbbf24' : '#9ca3af',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
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
                    <div className="flex gap-2">
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                        Open Chart
                      </button>
                      <button style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                        Start Visit
                      </button>
                      {apt.type === 'Telehealth' && (
                        <button style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                          Join Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div style={{ backgroundColor: '#ffffff' }} className="p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black">Patient Records (EHR System)</h2>
              <button style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="px-6 py-3 font-bold">
                + New Patient
              </button>
            </div>
            <div className="space-y-4">
              {recentPatients.map((patient, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-black">{patient.name}</span>
                        <span style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold">
                          {patient.mrn}
                        </span>
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>👨‍⚕️ Primary: {patient.physician}</div>
                        <div>📅 Last Visit: {patient.lastVisit}</div>
                        <div>🏥 Conditions: {patient.conditions}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                        View Chart
                      </button>
                      <button style={{ backgroundColor: '#6b7280', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                        Portal Access
                      </button>
                      <button style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-6">E-Prescription Management</h2>
            <div className="space-y-4">
              {pendingPrescriptions.map((rx, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#1a1a1a' }} className="text-lg font-black">{rx.medication}</span>
                        <span style={{
                          backgroundColor: rx.status === 'Approved' ? '#22c55e' :
                                        rx.status === 'Sent to Pharmacy' ? '#3b82f6' : '#fbbf24',
                          color: '#ffffff'
                        }} className="px-3 py-1 text-xs font-bold uppercase">
                          {rx.status}
                        </span>
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1">
                        <div>👤 Patient: {rx.patient}</div>
                        <div>👨‍⚕️ Prescriber: {rx.prescriber}</div>
                        <div>🕐 Submitted: {rx.submitted}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {rx.status === 'Pending Approval' && (
                        <>
                          <button style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                            Approve
                          </button>
                          <button style={{ backgroundColor: '#ef4444', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
                            Deny
                          </button>
                        </>
                      )}
                      <button style={{ backgroundColor: '#3b82f6', color: '#ffffff' }} className="px-4 py-2 font-bold text-sm hover:opacity-90">
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
            <h2 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-8">Practice Analytics</h2>
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
                        <span style={{ color: '#0353a4' }} className="font-black">{item.count} patients</span>
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
                <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Key Performance Metrics</h3>
                <div className="space-y-4">
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Average Wait Time</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">12 min</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Appointment Show Rate</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">94%</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Same-Day Appointments</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">87%</div>
                  </div>
                  <div style={{ backgroundColor: '#f8f8f8' }} className="p-4">
                    <div style={{ color: '#666666' }} className="text-sm mb-1">Telehealth Adoption</div>
                    <div style={{ color: '#1a1a1a' }} className="text-3xl font-black">43%</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Top Diagnoses This Month</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { diagnosis: 'Hypertension', count: 847 },
                    { diagnosis: 'Type 2 Diabetes', count: 623 },
                    { diagnosis: 'Upper Respiratory Infection', count: 412 },
                    { diagnosis: 'Anxiety/Depression', count: 389 }
                  ].map((item) => (
                    <div key={item.diagnosis} style={{ backgroundColor: '#f8f8f8' }} className="p-4 text-center">
                      <div style={{ color: '#0353a4' }} className="text-3xl font-black mb-2">{item.count}</div>
                      <div style={{ color: '#666666' }} className="text-sm font-bold">{item.diagnosis}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
}
