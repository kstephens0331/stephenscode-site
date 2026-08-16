'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'
import Layout from './components/Layout'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

const DEMO_NAME = 'HealthFirst Medical Group'
const DEMO_SLUG = 'healthfirst-medical-group'
const DEMO_PACKAGE = 'Premium Build ($2,000)'

const activePrescriptions = [
  { medication: 'Lisinopril 10mg', refills: '2 left', pharmacy: 'CVS Pharmacy' },
  { medication: 'Metformin 500mg', refills: '1 left', pharmacy: 'CVS Pharmacy' },
  { medication: 'Atorvastatin 20mg', refills: '3 left', pharmacy: 'CVS Pharmacy' }
]

const acceptedPlans = [
  'Blue Cross Blue Shield',
  'Aetna',
  'UnitedHealthcare',
  'Cigna',
  'Medicare',
  'Medicaid',
  'Humana',
  'Kaiser Permanente'
]

const resourceGuides = [
  {
    id: 'new-patient',
    title: 'New Patient Checklist',
    summary: 'What to bring to your first visit',
    items: [
      'Photo ID and insurance card',
      'Complete list of current medications and dosages',
      'Immunization records if available',
      'Records from your previous physician',
      'Arrive 15 minutes early to complete intake forms'
    ]
  },
  {
    id: 'visit-prep',
    title: 'Preparing for Your Appointment',
    summary: 'Get the most out of your visit',
    items: [
      'Write down symptoms, when they started, and what makes them better or worse',
      'List questions you want to ask your physician',
      'Fast for 8-12 hours before lab work if instructed',
      'Bring a family member or friend if you want a second set of ears',
      'Wear loose clothing for physical exams'
    ]
  },
  {
    id: 'med-safety',
    title: 'Medication Safety Basics',
    summary: 'Take medications safely and effectively',
    items: [
      'Take medications exactly as prescribed, even when you feel better',
      'Keep an updated medication list in your wallet or phone',
      'Use one pharmacy so interactions can be caught automatically',
      'Never share prescription medications with others',
      'Ask your pharmacist before adding over-the-counter drugs or supplements'
    ]
  },
  {
    id: 'preventive',
    title: 'Preventive Care Schedule',
    summary: 'Recommended screenings by age',
    items: [
      'Annual physical exam and blood pressure check for all adults',
      'Cholesterol screening every 4-6 years starting at age 20',
      'Diabetes screening every 3 years starting at age 45',
      'Colon cancer screening starting at age 45',
      'Annual flu vaccine and staying current on boosters'
    ]
  },
  {
    id: 'billing-faq',
    title: 'Billing & Insurance FAQ',
    summary: 'Common questions about payments and coverage',
    items: [
      'Copays are due at the time of your visit',
      'We bill your insurance directly and send a statement for any remaining balance',
      'Payment plans are available for balances over $200 -- ask our billing team',
      'Self-pay visit pricing is available if you are uninsured',
      'You can pay any balance online through the Pay Bill link at the top of this site'
    ]
  }
]

const portalMessages = [
  {
    id: 'm1',
    from: 'Dr. Sarah Mitchell',
    subject: 'Your lab results have been reviewed',
    date: 'Mar 8',
    body: 'I reviewed your recent blood work. Your CBC and A1C look great. Your lipid panel is slightly elevated, so we will discuss diet adjustments at your March 15 visit. No medication changes are needed right now.'
  },
  {
    id: 'm2',
    from: 'Nurse Kelly Brooks',
    subject: 'Blood pressure log reminder',
    date: 'Mar 6',
    body: 'Friendly reminder to keep logging your morning blood pressure readings this week. Bring the log to your Mar 15 appointment so Dr. Mitchell can review your trends.'
  },
  {
    id: 'm3',
    from: 'Billing Team',
    subject: 'New statement available',
    date: 'Mar 3',
    body: 'Your statement for your recent office visit is ready. Your insurance has been applied and the remaining balance is $145.00. You can pay online any time through the Pay Bill link at the top of the site.'
  }
]

const emptyApptForm = {
  type: '',
  physician: '',
  date: '',
  time: '',
  reason: '',
  name: '',
  dob: '',
  phone: '',
  email: '',
  insurance: ''
}

const emptyContactForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')

  // Appointment booking
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false)
  const [apptForm, setApptForm] = useState(emptyApptForm)
  const [apptSubmitted, setApptSubmitted] = useState(false)
  const [apptConfirmation, setApptConfirmation] = useState('')

  // Patient portal
  const [showPatientPortal, setShowPatientPortal] = useState(false)
  const [portalAux, setPortalAux] = useState<'none' | 'forgot' | 'create'>('none')
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '' })
  const [createDone, setCreateDone] = useState(false)

  // Telehealth call simulation
  const [showTelehealth, setShowTelehealth] = useState(false)
  const [callState, setCallState] = useState<'idle' | 'active' | 'ended'>('idle')
  const [callSeconds, setCallSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)

  // Prescription refill flow
  const [showPrescriptions, setShowPrescriptions] = useState(false)
  const [refillMeds, setRefillMeds] = useState<string[]>([])
  const [refillPharmacy, setRefillPharmacy] = useState('CVS Pharmacy - Main Street')
  const [refillMethod, setRefillMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [refillError, setRefillError] = useState(false)
  const [refillSubmitted, setRefillSubmitted] = useState(false)
  const [refillRef, setRefillRef] = useState('')

  // Pay bill flow
  const [showPayBill, setShowPayBill] = useState(false)
  const [payForm, setPayForm] = useState({ amount: '145.00', nameOnCard: '', cardNumber: '', expiry: '', cvc: '' })
  const [paySubmitted, setPaySubmitted] = useState(false)
  const [payRef, setPayRef] = useState('')

  // Contact page
  const [contactForm, setContactForm] = useState(emptyContactForm)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Insurance page
  const [insForm, setInsForm] = useState({ name: '', provider: '', memberId: '' })
  const [insChecked, setInsChecked] = useState(false)

  // Resources page
  const [openResource, setOpenResource] = useState<string | null>(null)

  // Patient portal dashboard details
  const [portalDetail, setPortalDetail] = useState<'appointment' | 'messages' | 'results' | null>(null)
  const [readMessages, setReadMessages] = useState<string[]>([])
  const [openMessageId, setOpenMessageId] = useState<string | null>(null)

  useEffect(() => {
    if (!showTelehealth || callState !== 'active') return
    const interval = setInterval(() => setCallSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [showTelehealth, callState])

  const formatDuration = (total: number) => {
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const openAppointment = () => {
    setApptSubmitted(false)
    setShowAppointmentBooking(true)
  }

  const closeAppointment = () => {
    setShowAppointmentBooking(false)
    if (apptSubmitted) {
      setApptForm(emptyApptForm)
      setApptSubmitted(false)
    }
  }

  const openPortal = () => {
    setShowPatientPortal(true)
  }

  const closePortal = () => {
    setShowPatientPortal(false)
    setPortalDetail(null)
    setOpenMessageId(null)
  }

  const unreadCount = portalMessages.filter((m) => !readMessages.includes(m.id)).length

  const openPayBill = () => {
    setPaySubmitted(false)
    setShowPayBill(true)
  }

  const closePayBill = () => {
    setShowPayBill(false)
    setPaySubmitted(false)
    setPayForm({ amount: '145.00', nameOnCard: '', cardNumber: '', expiry: '', cvc: '' })
  }

  const closeTelehealth = () => {
    setShowTelehealth(false)
    setCallState('idle')
    setCallSeconds(0)
    setMuted(false)
    setCameraOff(false)
  }

  const openRefill = (medication?: string) => {
    setRefillSubmitted(false)
    setRefillError(false)
    setRefillMeds(medication ? [medication] : [])
    setShowPrescriptions(true)
  }

  const closeRefill = () => {
    setShowPrescriptions(false)
    setRefillSubmitted(false)
    setRefillError(false)
    setRefillMeds([])
  }

  const toggleRefillMed = (medication: string) => {
    setRefillError(false)
    setRefillMeds((prev) =>
      prev.includes(medication) ? prev.filter((m) => m !== medication) : [...prev, medication]
    )
  }

  const handleRefillSubmit = () => {
    if (refillMeds.length === 0) {
      setRefillError(true)
      return
    }
    setRefillRef(`RX-${Math.floor(100000 + Math.random() * 900000)}`)
    setRefillSubmitted(true)
  }

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPayRef(`PMT-${Math.floor(100000 + Math.random() * 900000)}`)
    setPaySubmitted(true)
  }

  const handleInsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInsChecked(true)
  }

  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: DEMO_NAME,
          demoPackage: DEMO_PACKAGE,
          demoSlug: DEMO_SLUG,
          clientName: apptForm.name,
          clientPhone: apptForm.phone,
          clientEmail: apptForm.email,
          service: apptForm.physician ? `${apptForm.type} with ${apptForm.physician}` : apptForm.type,
          preferredDate: apptForm.date,
          preferredTime: apptForm.time,
          notes: [apptForm.reason, apptForm.insurance ? `Insurance: ${apptForm.insurance}` : '']
            .filter(Boolean)
            .join(' | ')
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_appointment_form', demo_slug: DEMO_SLUG })
        trackConversion('leadForm')
        setApptConfirmation(`HF-${Math.floor(100000 + Math.random() * 900000)}`)
        setApptSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: DEMO_NAME,
          demoPackage: DEMO_PACKAGE,
          demoSlug: DEMO_SLUG,
          clientName: contactForm.name,
          clientPhone: contactForm.phone,
          clientEmail: contactForm.email,
          service: contactForm.subject,
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: DEMO_SLUG })
        trackConversion('leadForm')
        setContactSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const inputStyle = { backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }

  const renderPage = () => {
    if (currentPage === 'home') {
      return (
        <div>
          <section style={{ backgroundColor: '#e3f2fd', minHeight: '600px' }} className="py-32">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl">
                <div style={{ color: '#0353a4' }} className="text-sm font-bold uppercase tracking-widest mb-4">
                  Trusted Healthcare Provider Since 1985
                </div>
                <h1 style={{ color: '#0353a4' }} className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                  Your Health,<br />Our Priority
                </h1>
                <p style={{ color: '#006ba6' }} className="text-xl leading-relaxed mb-10">
                  Experience comprehensive medical care from board-certified physicians who truly care. From routine
                  checkups to specialized treatments, HealthFirst Medical Group offers the full spectrum of healthcare
                  services with same-day appointments, 24/7 telehealth, and a patient portal for managing your health.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={openAppointment}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={openPortal}
                    style={{ backgroundColor: 'transparent', color: '#0353a4', border: '2px solid #0353a4' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-80 transition"
                  >
                    Patient Portal Login
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 style={{ color: '#0353a4' }} className="text-5xl font-bold mb-4">Our Services</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { icon: '🩺', title: 'Primary Care', desc: 'Comprehensive wellness and preventive care' },
                  { icon: '💊', title: 'Chronic Care', desc: 'Management of diabetes, hypertension, asthma' },
                  { icon: '🏃', title: 'Sports Medicine', desc: 'Injury treatment and performance optimization' },
                  { icon: '❤️', title: 'Cardiology', desc: 'Heart health and cardiovascular care' },
                  { icon: '🧠', title: 'Mental Health', desc: 'Counseling and psychiatric services' },
                  { icon: '👶', title: 'Pediatrics', desc: 'Complete care for children & adolescents' },
                  { icon: '👵', title: 'Geriatrics', desc: 'Specialized care for seniors' },
                  { icon: '🩹', title: 'Urgent Care', desc: '24/7 walk-in clinic for minor emergencies' }
                ].map((service) => (
                  <button
                    key={service.title}
                    onClick={() => setCurrentPage('services')}
                    style={{ backgroundColor: '#f5f5f5' }}
                    className="p-6 text-center hover:shadow-xl transition cursor-pointer"
                  >
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">{service.title}</h3>
                    <p style={{ color: '#666666' }} className="text-sm">{service.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#0353a4' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-bold mb-2">35+</div>
                  <div style={{ color: '#ffffff' }} className="font-bold">Years of Excellence</div>
                </div>
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-bold mb-2">25</div>
                  <div style={{ color: '#ffffff' }} className="font-bold">Board-Certified Physicians</div>
                </div>
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-bold mb-2">50K+</div>
                  <div style={{ color: '#ffffff' }} className="font-bold">Patients Served Annually</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'services') {
      const services = [
        {
          name: 'Primary Care & Wellness',
          description: 'Annual physicals, preventive screenings, vaccinations, and wellness counseling',
          features: ['Comprehensive physical exams', 'Health risk assessments', 'Immunizations', 'Lab work on-site', 'Nutrition counseling']
        },
        {
          name: 'Chronic Disease Management',
          description: 'Expert care for diabetes, hypertension, COPD, asthma, and other ongoing conditions',
          features: ['Personalized treatment plans', 'Medication management', 'Regular monitoring', 'Education & support', 'Coordination with specialists']
        },
        {
          name: 'Urgent Care Services',
          description: '24/7 walk-in clinic for non-life-threatening injuries and illnesses',
          features: ['No appointment needed', 'X-rays & diagnostics', 'Minor injury treatment', 'Illness care', 'Open nights & weekends']
        },
        {
          name: 'Telehealth Consultations',
          description: 'Virtual visits with your doctor from the comfort of home',
          features: ['Video appointments', 'E-prescriptions', 'Follow-up care', 'Same-day availability', 'HIPAA compliant platform']
        }
      ]

      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Medical Services</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Comprehensive healthcare solutions for the entire family
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="space-y-8">
                {services.map((service) => (
                  <div key={service.name} style={{ backgroundColor: '#f5f5f5', border: '3px solid #0496ff' }} className="p-8">
                    <h3 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-3">{service.name}</h3>
                    <p style={{ color: '#666666' }} className="text-lg mb-6">{service.description}</p>
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span style={{ color: '#0496ff' }}>✓</span>
                          <span style={{ color: '#333333' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={openAppointment}
                      style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                      className="px-8 py-3 font-bold hover:opacity-90 transition"
                    >
                      Schedule Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'doctors') {
      const doctors = [
        { name: 'Dr. Sarah Mitchell, MD', specialty: 'Family Medicine', experience: '15 years', education: 'Harvard Medical School', image: '👩‍⚕️' },
        { name: 'Dr. James Chen, MD', specialty: 'Internal Medicine', experience: '20 years', education: 'Johns Hopkins University', image: '👨‍⚕️' },
        { name: 'Dr. Emily Rodriguez, MD', specialty: 'Pediatrics', experience: '12 years', education: 'Stanford Medical School', image: '👩‍⚕️' },
        { name: 'Dr. Michael Thompson, MD', specialty: 'Cardiology', experience: '18 years', education: 'Mayo Clinic', image: '👨‍⚕️' },
        { name: 'Dr. Jennifer Park, DO', specialty: 'Sports Medicine', experience: '10 years', education: 'UC San Francisco', image: '👩‍⚕️' },
        { name: 'Dr. Robert Williams, MD', specialty: 'Geriatrics', experience: '22 years', education: 'Yale School of Medicine', image: '👨‍⚕️' }
      ]

      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Our Physicians</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Board-certified doctors dedicated to your health and wellness
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {doctors.map((doctor) => (
                  <div key={doctor.name} style={{ backgroundColor: '#f5f5f5' }} className="overflow-hidden hover:shadow-xl transition">
                    <div style={{ backgroundColor: '#0353a4', height: '250px' }} className="flex items-center justify-center text-9xl">
                      {doctor.image}
                    </div>
                    <div className="p-6">
                      <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">{doctor.name}</h3>
                      <div style={{ backgroundColor: '#0496ff', color: '#ffffff' }} className="inline-block px-3 py-1 text-xs font-bold uppercase mb-3">
                        {doctor.specialty}
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1 mb-4">
                        <div>🎓 {doctor.education}</div>
                        <div>📅 {doctor.experience} experience</div>
                      </div>
                      <button
                        onClick={() => {
                          setApptForm((prev) => ({ ...prev, physician: `${doctor.name.replace(', MD', '').replace(', DO', '')} (${doctor.specialty})` }))
                          openAppointment()
                        }}
                        style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                        className="w-full py-3 font-bold hover:opacity-90 transition"
                      >
                        Book with Dr. {doctor.name.split(' ')[1]}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'patient-portal') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Patient Portal</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Access your health records and manage your care 24/7
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-4xl mx-auto px-4">
              <div style={{ backgroundColor: '#f5f5f5' }} className="p-12">
                {portalAux === 'none' && (
                  <>
                    <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold text-center mb-8">
                      Portal Login
                    </h2>
                    <form
                      className="space-y-6 max-w-md mx-auto"
                      onSubmit={(e) => {
                        e.preventDefault()
                        openPortal()
                      }}
                    >
                      <div>
                        <label htmlFor="medical-login-username" style={{ color: '#0353a4' }} className="block font-bold mb-2">Email or Username</label>
                        <input
                          id="medical-login-username"
                          type="text"
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3"
                        />
                      </div>
                      <div>
                        <label htmlFor="medical-login-password" style={{ color: '#0353a4' }} className="block font-bold mb-2">Password</label>
                        <input
                          id="medical-login-password"
                          type="password"
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3"
                        />
                      </div>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                        className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                      >
                        Access Patient Portal
                      </button>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={() => { setPortalAux('forgot'); setForgotSent(false); setForgotEmail('') }}
                          style={{ color: '#0496ff' }}
                          className="font-bold text-sm hover:opacity-70"
                        >
                          Forgot Password?
                        </button>
                        <span style={{ color: '#666666' }} className="mx-3">|</span>
                        <button
                          type="button"
                          onClick={() => { setPortalAux('create'); setCreateDone(false); setCreateForm({ name: '', email: '', password: '' }) }}
                          style={{ color: '#0496ff' }}
                          className="font-bold text-sm hover:opacity-70"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {portalAux === 'forgot' && (
                  <div className="max-w-md mx-auto">
                    <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold text-center mb-8">
                      Reset Password
                    </h2>
                    {forgotSent ? (
                      <div className="text-center">
                        <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">✓</div>
                        <p style={{ color: '#333333' }} className="mb-6">
                          If an account exists for <span className="font-bold">{forgotEmail}</span>, a password reset link is on its way. Check your inbox within the next few minutes.
                        </p>
                        <button
                          onClick={() => setPortalAux('none')}
                          style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                          className="px-8 py-3 font-bold hover:opacity-90 transition"
                        >
                          Back to Login
                        </button>
                      </div>
                    ) : (
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault()
                          setForgotSent(true)
                        }}
                      >
                        <div>
                          <label htmlFor="medical-forgot-email" style={{ color: '#0353a4' }} className="block font-bold mb-2">Account Email *</label>
                          <input
                            id="medical-forgot-email"
                            type="email"
                            required
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <button
                          type="submit"
                          style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                          className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                        >
                          Send Reset Link
                        </button>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setPortalAux('none')}
                            style={{ color: '#0496ff' }}
                            className="font-bold text-sm hover:opacity-70"
                          >
                            Back to Login
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {portalAux === 'create' && (
                  <div className="max-w-md mx-auto">
                    <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold text-center mb-8">
                      Create Portal Account
                    </h2>
                    {createDone ? (
                      <div className="text-center">
                        <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">✓</div>
                        <p style={{ color: '#333333' }} className="mb-6">
                          Welcome, <span className="font-bold">{createForm.name}</span>! Your portal account is ready. You now have access to your records, messaging, and refill requests.
                        </p>
                        <button
                          onClick={() => { setPortalAux('none'); openPortal() }}
                          style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                          className="px-8 py-3 font-bold hover:opacity-90 transition"
                        >
                          Open Patient Portal
                        </button>
                      </div>
                    ) : (
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault()
                          setCreateDone(true)
                        }}
                      >
                        <div>
                          <label htmlFor="medical-create-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                          <input
                            id="medical-create-name"
                            type="text"
                            required
                            value={createForm.name}
                            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="medical-create-email" style={{ color: '#0353a4' }} className="block font-bold mb-2">Email *</label>
                          <input
                            id="medical-create-email"
                            type="email"
                            required
                            value={createForm.email}
                            onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="medical-create-password" style={{ color: '#0353a4' }} className="block font-bold mb-2">Password *</label>
                          <input
                            id="medical-create-password"
                            type="password"
                            required
                            value={createForm.password}
                            onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <button
                          type="submit"
                          style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                          className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                        >
                          Create Account
                        </button>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setPortalAux('none')}
                            style={{ color: '#0496ff' }}
                            className="font-bold text-sm hover:opacity-70"
                          >
                            Back to Login
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                <div style={{ backgroundColor: '#ffffff', border: '3px solid #0496ff' }} className="p-8 mt-12">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-4">Portal Features:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'View test results & medical records',
                      'Request prescription refills',
                      'Message your care team',
                      'Schedule & manage appointments',
                      'Pay bills online',
                      'Update insurance information',
                      'Access visit summaries',
                      'Download health records (PDF)'
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span style={{ color: '#0496ff' }}>✓</span>
                        <span style={{ color: '#333333' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'telehealth') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Telehealth Services</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Connect with your doctor from anywhere via secure video chat
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-6">How It Works</h2>
                  <div className="space-y-6">
                    {[
                      { step: '1', title: 'Book Your Visit', desc: 'Schedule a telehealth appointment online or by phone' },
                      { step: '2', title: 'Get Reminder', desc: 'Receive email/SMS with secure video link 24 hours before' },
                      { step: '3', title: 'Join Video Call', desc: 'Click link at appointment time to connect with your doctor' },
                      { step: '4', title: 'Receive Care', desc: 'Discuss symptoms, get diagnosis, and receive e-prescriptions' }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 style={{ color: '#0353a4' }} className="font-bold text-lg mb-1">{item.title}</h3>
                          <p style={{ color: '#666666' }} className="text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-6">
                    Start Telehealth Visit
                  </h3>
                  <div style={{ backgroundColor: '#0353a4', height: '300px' }} className="flex flex-col items-center justify-center mb-6">
                    <div className="text-9xl mb-4">💻</div>
                    <div style={{ color: '#ffffff' }} className="text-center">
                      <div className="font-bold text-xl mb-2">Video Interface</div>
                      <div style={{ color: '#0496ff' }}>HIPAA-compliant platform</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTelehealth(true)}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition mb-4"
                  >
                    Join Video Appointment
                  </button>
                  <button
                    onClick={openAppointment}
                    style={{ backgroundColor: 'transparent', color: '#0353a4', border: '2px solid #0353a4' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-80 transition"
                  >
                    Schedule New Visit
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#e3f2fd' }} className="p-8">
                <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-6 text-center">
                  What Can Be Treated via Telehealth?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: '🤧', title: 'Cold & Flu', items: ['Cough', 'Sore throat', 'Congestion', 'Fever'] },
                    { icon: '🤕', title: 'Minor Ailments', items: ['Headaches', 'Rashes', 'Allergies', 'Infections'] },
                    { icon: '💊', title: 'Ongoing Care', items: ['Medication refills', 'Follow-ups', 'Chronic condition checks', 'Lab result reviews'] }
                  ].map((category) => (
                    <div key={category.title} style={{ backgroundColor: '#ffffff' }} className="p-6">
                      <div className="text-5xl mb-3 text-center">{category.icon}</div>
                      <h4 style={{ color: '#0353a4' }} className="font-bold text-center mb-3">{category.title}</h4>
                      <ul style={{ color: '#666666' }} className="text-sm space-y-1">
                        {category.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span style={{ color: '#0496ff' }}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'prescriptions') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Prescription Center</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Request refills, transfer prescriptions, and track status online
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-6">Your Active Prescriptions</h2>
                  <div className="space-y-4 mb-6">
                    {activePrescriptions.map((rx) => (
                      <div key={rx.medication} style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5' }} className="p-6">
                        <div style={{ color: '#0353a4' }} className="font-bold text-lg mb-1">{rx.medication}</div>
                        <div style={{ color: '#666666' }} className="text-sm mb-3">
                          {rx.refills} • {rx.pharmacy}
                        </div>
                        <button
                          onClick={() => openRefill(rx.medication)}
                          style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
                          className="px-5 py-2 font-bold text-sm hover:opacity-90 transition"
                        >
                          Request Refill
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setRefillSubmitted(false)
                      setRefillError(false)
                      setRefillMeds(activePrescriptions.map((rx) => rx.medication))
                      setShowPrescriptions(true)
                    }}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Refill All Medications
                  </button>
                </div>

                <div>
                  <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-6">How Refills Work</h2>
                  <div className="space-y-6 mb-8">
                    {[
                      { step: '1', title: 'Submit Your Request', desc: 'Select medications and your preferred pharmacy' },
                      { step: '2', title: 'Physician Review', desc: 'Your doctor reviews and approves within 1 business day' },
                      { step: '3', title: 'Pharmacy Fills It', desc: 'The prescription is sent electronically to your pharmacy' },
                      { step: '4', title: 'Pick Up or Delivery', desc: 'Get notified the moment your medication is ready' }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 style={{ color: '#0353a4' }} className="font-bold text-lg mb-1">{item.title}</h3>
                          <p style={{ color: '#666666' }} className="text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: '#e3f2fd' }} className="p-6">
                    <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Need a prescription transferred?</h3>
                    <p style={{ color: '#006ba6' }} className="text-sm mb-4">
                      Moving your prescriptions to a new pharmacy takes one message. Tell us the medication and your new pharmacy and we handle the rest.
                    </p>
                    <button
                      onClick={() => setCurrentPage('contact')}
                      style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                      className="px-6 py-3 font-bold hover:opacity-90 transition"
                    >
                      Send Us a Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'insurance') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Insurance & Billing</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                We work with most major insurance plans
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-8 text-center">Accepted Insurance Plans</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-16">
                {acceptedPlans.map((plan) => (
                  <div key={plan} style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5' }} className="p-6 text-center">
                    <span style={{ color: '#0496ff' }} className="block text-2xl mb-2">✓</span>
                    <span style={{ color: '#0353a4' }} className="font-bold">{plan}</span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-6">Check Your Coverage</h3>
                  {insChecked ? (
                    <div>
                      <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-4">✓</div>
                      <h4 style={{ color: '#0353a4' }} className="text-xl font-bold mb-3">Good news, {insForm.name.split(' ')[0]}!</h4>
                      <p style={{ color: '#333333' }} className="mb-4">
                        <span className="font-bold">{insForm.provider}</span> plans are accepted at HealthFirst Medical Group. Our billing team will verify your specific benefits before your first visit -- just bring your member ID card.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={openAppointment}
                          style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                          className="px-6 py-3 font-bold hover:opacity-90 transition"
                        >
                          Book Appointment
                        </button>
                        <button
                          onClick={() => { setInsChecked(false); setInsForm({ name: '', provider: '', memberId: '' }) }}
                          style={{ backgroundColor: 'transparent', color: '#0353a4', border: '2px solid #0353a4' }}
                          className="px-6 py-3 font-bold hover:opacity-80 transition"
                        >
                          Check Another Plan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleInsSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="medical-ins-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                        <input
                          id="medical-ins-name"
                          type="text"
                          required
                          value={insForm.name}
                          onChange={(e) => setInsForm({ ...insForm, name: e.target.value })}
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3"
                        />
                      </div>
                      <div>
                        <label htmlFor="medical-ins-provider" style={{ color: '#0353a4' }} className="block font-bold mb-2">Insurance Provider *</label>
                        <select
                          id="medical-ins-provider"
                          required
                          value={insForm.provider}
                          onChange={(e) => setInsForm({ ...insForm, provider: e.target.value })}
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3"
                        >
                          <option value="">Select your provider</option>
                          {acceptedPlans.map((plan) => (
                            <option key={plan} value={plan}>{plan}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="medical-ins-member" style={{ color: '#0353a4' }} className="block font-bold mb-2">Member ID</label>
                        <input
                          id="medical-ins-member"
                          type="text"
                          value={insForm.memberId}
                          onChange={(e) => setInsForm({ ...insForm, memberId: e.target.value })}
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3"
                          placeholder="Found on your insurance card"
                        />
                      </div>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                        className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                      >
                        Check My Coverage
                      </button>
                    </form>
                  )}
                </div>

                <div>
                  <div style={{ backgroundColor: '#e3f2fd' }} className="p-8 mb-8">
                    <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-3">No Insurance? No Problem.</h3>
                    <p style={{ color: '#006ba6' }} className="mb-4">
                      Transparent self-pay pricing starts at $99 for a standard office visit. Payment plans are available for balances over $200 -- no credit check required.
                    </p>
                    <button
                      onClick={openAppointment}
                      style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                      className="px-6 py-3 font-bold hover:opacity-90 transition"
                    >
                      Book a Self-Pay Visit
                    </button>
                  </div>
                  <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                    <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-3">Have a Balance?</h3>
                    <p style={{ color: '#666666' }} className="mb-4">
                      Pay your statement online in under a minute. No login required -- all you need is your statement number.
                    </p>
                    <button
                      onClick={openPayBill}
                      style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
                      className="px-6 py-3 font-bold hover:opacity-90 transition"
                    >
                      Pay Bill Online
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'resources') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Patient Resources</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Guides and answers to help you get the best care
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-4xl mx-auto px-4">
              <div className="space-y-4 mb-12">
                {resourceGuides.map((guide) => {
                  const isOpen = openResource === guide.id
                  return (
                    <div key={guide.id} style={{ backgroundColor: '#f5f5f5', border: isOpen ? '3px solid #0496ff' : '3px solid #e5e5e5' }}>
                      <button
                        onClick={() => setOpenResource(isOpen ? null : guide.id)}
                        className="w-full p-6 flex justify-between items-center text-left hover:opacity-80 transition"
                      >
                        <div>
                          <h3 style={{ color: '#0353a4' }} className="text-xl font-bold">{guide.title}</h3>
                          <p style={{ color: '#666666' }} className="text-sm">{guide.summary}</p>
                        </div>
                        <span style={{ color: '#0496ff' }} className="text-3xl font-bold flex-shrink-0 ml-4">
                          {isOpen ? '-' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <ul className="space-y-2">
                            {guide.items.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span style={{ color: '#0496ff' }} className="flex-shrink-0">✓</span>
                                <span style={{ color: '#333333' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{ backgroundColor: '#e3f2fd' }} className="p-8 text-center">
                <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-3">Still have questions?</h3>
                <p style={{ color: '#006ba6' }} className="mb-6">
                  Our care team is happy to help you prepare for your visit or understand your care plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="px-8 py-3 font-bold hover:opacity-90 transition"
                  >
                    Contact Us
                  </button>
                  <a
                    href="tel:5554325841"
                    style={{ backgroundColor: 'transparent', color: '#0353a4', border: '2px solid #0353a4' }}
                    className="px-8 py-3 font-bold hover:opacity-80 transition inline-block"
                  >
                    Call (555) HEALTH-1
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }

    if (currentPage === 'contact') {
      return (
        <div>
          <section style={{ backgroundColor: '#0353a4' }} className="py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">Contact Us</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                We respond to every message within one business day
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-center">
                  <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Phone</h3>
                  <a href="tel:5554325841" style={{ color: '#0496ff' }} className="font-bold hover:opacity-70">
                    (555) HEALTH-1
                  </a>
                  <p style={{ color: '#666666' }} className="text-sm mt-2">24/7 Urgent Care line</p>
                </div>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-center">
                  <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Email</h3>
                  <a href="mailto:info@healthfirst.com" style={{ color: '#0496ff' }} className="font-bold hover:opacity-70">
                    info@healthfirst.com
                  </a>
                  <p style={{ color: '#666666' }} className="text-sm mt-2">For non-urgent questions</p>
                </div>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-center">
                  <h3 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Visit</h3>
                  <p style={{ color: '#333333' }} className="font-bold">1234 Medical Plaza Dr</p>
                  <p style={{ color: '#333333' }}>Seattle, WA 98101</p>
                  <p style={{ color: '#666666' }} className="text-sm mt-2">Mon-Fri 7AM-7PM • Sat 8AM-4PM • Sun 9AM-3PM</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#f5f5f5' }} className="p-8 md:p-12 max-w-3xl mx-auto">
                {contactSubmitted ? (
                  <div className="text-center py-8">
                    <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">✓</div>
                    <h3 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-3">Message Sent!</h3>
                    <p style={{ color: '#333333' }} className="mb-6">
                      Thank you for reaching out. A member of our care team will respond within one business day.
                    </p>
                    <button
                      onClick={() => { setContactSubmitted(false); setContactForm(emptyContactForm) }}
                      style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                      className="px-8 py-3 font-bold hover:opacity-90 transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="medical-contact-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                          <input
                            id="medical-contact-name"
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="medical-contact-email" style={{ color: '#0353a4' }} className="block font-bold mb-2">Email *</label>
                          <input
                            id="medical-contact-email"
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="medical-contact-phone" style={{ color: '#0353a4' }} className="block font-bold mb-2">Phone</label>
                          <input
                            id="medical-contact-phone"
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="medical-contact-subject" style={{ color: '#0353a4' }} className="block font-bold mb-2">Subject *</label>
                          <select
                            id="medical-contact-subject"
                            required
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                            className="w-full px-4 py-3"
                          >
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Appointment Question">Appointment Question</option>
                            <option value="Prescription Transfer">Prescription Transfer</option>
                            <option value="Insurance Question">Insurance Question</option>
                            <option value="Billing Question">Billing Question</option>
                            <option value="Medical Records Request">Medical Records Request</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="medical-contact-message" style={{ color: '#0353a4' }} className="block font-bold mb-2">Message *</label>
                        <textarea
                          id="medical-contact-message"
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                          className="w-full px-4 py-3 h-32"
                          placeholder="How can we help?"
                        />
                      </div>
                      <button
                        type="submit"
                        style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                        className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      )
    }

    // Default fallback
    return (
      <div>
        <section style={{ backgroundColor: '#0353a4' }} className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')}
            </h1>
          </div>
        </section>
        <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p style={{ color: '#666666' }} className="mb-6">This page has moved. Head back home to keep exploring.</p>
            <button
              onClick={() => setCurrentPage('home')}
              style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
              className="px-8 py-3 font-bold hover:opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <Layout
      colors={colors}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onAppointmentOpen={openAppointment}
      onPortalOpen={openPortal}
      onPayBill={openPayBill}
    >
      {renderPage()}

      {/* Appointment Booking Modal */}
      {showAppointmentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">Book Your Appointment</h3>
              <button onClick={closeAppointment} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            {apptSubmitted ? (
              <div className="p-8 text-center">
                <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">✓</div>
                <h4 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-2">Appointment Request Received</h4>
                <p style={{ color: '#666666' }} className="mb-6">Confirmation number: <span style={{ color: '#0353a4' }} className="font-bold">{apptConfirmation}</span></p>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-left max-w-md mx-auto mb-6 space-y-2">
                  <div><span style={{ color: '#666666' }}>Visit type: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{apptForm.type}</span></div>
                  <div><span style={{ color: '#666666' }}>Physician: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{apptForm.physician || 'First available doctor'}</span></div>
                  <div><span style={{ color: '#666666' }}>Requested: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{apptForm.date} • {apptForm.time}</span></div>
                  <div><span style={{ color: '#666666' }}>Patient: </span><span style={{ color: '#1a1a1a' }} className="font-bold">{apptForm.name}</span></div>
                </div>
                <p style={{ color: '#333333' }} className="max-w-lg mx-auto mb-8">
                  Our scheduling team will call you within one business day to confirm your visit. An automated reminder will be sent 24 hours before your appointment.
                </p>
                <button
                  onClick={closeAppointment}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-8">
                  <h4 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-2">Smart Scheduling System</h4>
                  <p style={{ color: '#006ba6' }} className="font-bold">
                    Same-day appointments available • Insurance verification • Automated reminders
                  </p>
                </div>

                <form onSubmit={handleApptSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="medical-appt-type" style={{ color: '#0353a4' }} className="block font-bold mb-2">Appointment Type *</label>
                    <select
                      id="medical-appt-type"
                      required
                      value={apptForm.type}
                      onChange={(e) => setApptForm({ ...apptForm, type: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                    >
                      <option value="">Select appointment type</option>
                      <option value="New Patient Visit">New Patient Visit</option>
                      <option value="Follow-Up Appointment">Follow-Up Appointment</option>
                      <option value="Annual Physical">Annual Physical</option>
                      <option value="Sick Visit">Sick Visit</option>
                      <option value="Telehealth Consultation">Telehealth Consultation</option>
                      <option value="Urgent Care">Urgent Care</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="medical-appt-physician" style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Physician</label>
                    <select
                      id="medical-appt-physician"
                      value={apptForm.physician}
                      onChange={(e) => setApptForm({ ...apptForm, physician: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                    >
                      <option value="">Any available doctor</option>
                      <option value="Dr. Sarah Mitchell (Family Medicine)">Dr. Sarah Mitchell (Family Medicine)</option>
                      <option value="Dr. James Chen (Internal Medicine)">Dr. James Chen (Internal Medicine)</option>
                      <option value="Dr. Emily Rodriguez (Pediatrics)">Dr. Emily Rodriguez (Pediatrics)</option>
                      <option value="Dr. Michael Thompson (Cardiology)">Dr. Michael Thompson (Cardiology)</option>
                      <option value="Dr. Jennifer Park (Sports Medicine)">Dr. Jennifer Park (Sports Medicine)</option>
                      <option value="Dr. Robert Williams (Geriatrics)">Dr. Robert Williams (Geriatrics)</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="medical-appt-date" style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Date *</label>
                      <input
                        id="medical-appt-date"
                        type="date"
                        required
                        value={apptForm.date}
                        onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      />
                    </div>
                    <div>
                      <label htmlFor="medical-appt-time" style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Time *</label>
                      <select
                        id="medical-appt-time"
                        required
                        value={apptForm.time}
                        onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      >
                        <option value="">Select time</option>
                        <option value="Morning (7AM-12PM)">Morning (7AM-12PM)</option>
                        <option value="Afternoon (12PM-5PM)">Afternoon (12PM-5PM)</option>
                        <option value="Evening (5PM-7PM)">Evening (5PM-7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="medical-appt-reason" style={{ color: '#0353a4' }} className="block font-bold mb-2">Reason for Visit *</label>
                    <textarea
                      id="medical-appt-reason"
                      required
                      value={apptForm.reason}
                      onChange={(e) => setApptForm({ ...apptForm, reason: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3 h-24"
                      placeholder="Brief description of your symptoms or reason for appointment..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="medical-appt-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                      <input
                        id="medical-appt-name"
                        type="text"
                        required
                        value={apptForm.name}
                        onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      />
                    </div>
                    <div>
                      <label htmlFor="medical-appt-dob" style={{ color: '#0353a4' }} className="block font-bold mb-2">Date of Birth *</label>
                      <input
                        id="medical-appt-dob"
                        type="date"
                        required
                        value={apptForm.dob}
                        onChange={(e) => setApptForm({ ...apptForm, dob: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="medical-appt-phone" style={{ color: '#0353a4' }} className="block font-bold mb-2">Phone *</label>
                      <input
                        id="medical-appt-phone"
                        type="tel"
                        required
                        value={apptForm.phone}
                        onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      />
                    </div>
                    <div>
                      <label htmlFor="medical-appt-email" style={{ color: '#0353a4' }} className="block font-bold mb-2">Email *</label>
                      <input
                        id="medical-appt-email"
                        type="email"
                        required
                        value={apptForm.email}
                        onChange={(e) => setApptForm({ ...apptForm, email: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="medical-appt-insurance" style={{ color: '#0353a4' }} className="block font-bold mb-2">Insurance Provider</label>
                    <input
                      id="medical-appt-insurance"
                      type="text"
                      value={apptForm.insurance}
                      onChange={(e) => setApptForm({ ...apptForm, insurance: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                      placeholder="e.g., Blue Cross Blue Shield"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Confirm Appointment
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Patient Portal Demo Modal */}
      {showPatientPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">My Health Dashboard</h3>
              <button onClick={closePortal} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {([
                  { key: 'appointment', label: 'Next Appointment', value: 'Mar 15, 2024', sub: '10:00 AM' },
                  { key: 'messages', label: 'Unread Messages', value: String(unreadCount), sub: unreadCount === 0 ? 'All caught up' : 'From care team' },
                  { key: 'results', label: 'Test Results', value: '2 New', sub: 'Ready to view' },
                  { key: 'rx', label: 'Prescriptions', value: '1 Refill', sub: 'Ready for pickup' }
                ] as { key: 'appointment' | 'messages' | 'results' | 'rx'; label: string; value: string; sub: string }[]).map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.key === 'rx') {
                        openRefill()
                      } else {
                        setPortalDetail(portalDetail === item.key ? null : item.key)
                      }
                    }}
                    style={{
                      backgroundColor: portalDetail === item.key ? '#e3f2fd' : '#f5f5f5',
                      border: portalDetail === item.key ? '2px solid #0496ff' : '2px solid transparent'
                    }}
                    className="p-6 text-left hover:shadow-lg transition cursor-pointer"
                  >
                    <div style={{ color: '#666666' }} className="text-sm font-bold mb-2">{item.label}</div>
                    <div style={{ color: '#0353a4' }} className="text-3xl font-bold mb-1">{item.value}</div>
                    <div style={{ color: '#666666' }} className="text-sm">{item.sub}</div>
                  </button>
                ))}
              </div>

              {portalDetail === 'appointment' && (
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-8">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h4 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Upcoming Appointment</h4>
                      <div style={{ color: '#333333' }} className="text-sm space-y-1">
                        <div><span style={{ color: '#666666' }}>Date: </span><span className="font-bold">Friday, Mar 15, 2024 at 10:00 AM</span></div>
                        <div><span style={{ color: '#666666' }}>Physician: </span><span className="font-bold">Dr. Sarah Mitchell (Family Medicine)</span></div>
                        <div><span style={{ color: '#666666' }}>Visit type: </span><span className="font-bold">Annual Physical</span></div>
                        <div><span style={{ color: '#666666' }}>Location: </span><span className="font-bold">1234 Medical Plaza Dr, Suite 210</span></div>
                        <div><span style={{ color: '#666666' }}>Reminder: </span><span className="font-bold">Fast for 8-12 hours before arrival for lab work</span></div>
                      </div>
                    </div>
                    <button
                      onClick={() => { closePortal(); openAppointment() }}
                      style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                      className="px-6 py-3 font-bold hover:opacity-90 transition"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              )}

              {portalDetail === 'messages' && (
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-8">
                  <h4 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">Care Team Messages</h4>
                  <div className="space-y-3">
                    {portalMessages.map((msg) => {
                      const isRead = readMessages.includes(msg.id)
                      const isOpen = openMessageId === msg.id
                      return (
                        <div key={msg.id} style={{ backgroundColor: '#ffffff', border: isOpen ? '2px solid #0496ff' : '2px solid transparent' }}>
                          <button
                            onClick={() => {
                              setOpenMessageId(isOpen ? null : msg.id)
                              if (!isRead) setReadMessages((prev) => [...prev, msg.id])
                            }}
                            className="w-full p-4 flex justify-between items-center text-left hover:opacity-80 transition"
                          >
                            <div>
                              <div style={{ color: '#0353a4' }} className={isRead ? 'font-medium' : 'font-bold'}>{msg.subject}</div>
                              <div style={{ color: '#666666' }} className="text-sm">{msg.from} • {msg.date}</div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                              {!isRead && (
                                <span style={{ backgroundColor: '#0496ff', color: '#ffffff' }} className="px-2 py-1 text-xs font-bold uppercase">New</span>
                              )}
                              <span style={{ color: '#0496ff' }} className="text-2xl font-bold">{isOpen ? '-' : '+'}</span>
                            </div>
                          </button>
                          {isOpen && (
                            <p style={{ color: '#333333' }} className="px-4 pb-4 text-sm leading-relaxed">{msg.body}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {portalDetail === 'results' && (
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-8">
                  <h4 style={{ color: '#0353a4' }} className="text-xl font-bold mb-4">New Test Results</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div style={{ backgroundColor: '#ffffff' }} className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: '#0353a4' }} className="font-bold">Complete Blood Count</span>
                        <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">Normal</span>
                      </div>
                      <div style={{ color: '#333333' }} className="text-sm space-y-1">
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>WBC</span><span className="font-bold">6.8 K/uL (4.0-11.0)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>RBC</span><span className="font-bold">4.9 M/uL (4.2-5.8)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>Hemoglobin</span><span className="font-bold">14.2 g/dL (12.0-16.0)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>Platelets</span><span className="font-bold">245 K/uL (150-400)</span></div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff' }} className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: '#0353a4' }} className="font-bold">Lipid Panel</span>
                        <span style={{ backgroundColor: '#fbbf24', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">Review Required</span>
                      </div>
                      <div style={{ color: '#333333' }} className="text-sm space-y-1">
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>Total Cholesterol</span><span className="font-bold">212 mg/dL (under 200)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>LDL</span><span className="font-bold">138 mg/dL (under 100)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>HDL</span><span className="font-bold">52 mg/dL (over 40)</span></div>
                        <div className="flex justify-between"><span style={{ color: '#666666' }}>Triglycerides</span><span className="font-bold">142 mg/dL (under 150)</span></div>
                      </div>
                      <p style={{ color: '#666666' }} className="text-xs mt-3">
                        Dr. Mitchell will review these values with you at your Mar 15 visit. See her message in your inbox for details.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-6">Recent Lab Results</h3>
                  <div className="space-y-4">
                    {[
                      { test: 'Complete Blood Count', date: '3 days ago', status: 'Normal' },
                      { test: 'Lipid Panel', date: '3 days ago', status: 'Review Required' },
                      { test: 'Hemoglobin A1C', date: '1 week ago', status: 'Normal' }
                    ].map((result) => (
                      <div key={result.test} style={{ backgroundColor: '#ffffff' }} className="p-4 flex justify-between items-center">
                        <div>
                          <div style={{ color: '#0353a4' }} className="font-bold">{result.test}</div>
                          <div style={{ color: '#666666' }} className="text-sm">{result.date}</div>
                        </div>
                        <div>
                          <span style={{
                            backgroundColor: result.status === 'Normal' ? '#22c55e' : '#fbbf24',
                            color: '#ffffff'
                          }} className="px-3 py-1 text-xs font-bold uppercase">
                            {result.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-bold mb-6">Active Prescriptions</h3>
                  <div className="space-y-4">
                    {activePrescriptions.map((rx) => (
                      <div key={rx.medication} style={{ backgroundColor: '#ffffff' }} className="p-4">
                        <div style={{ color: '#0353a4' }} className="font-bold mb-1">{rx.medication}</div>
                        <div style={{ color: '#666666' }} className="text-sm mb-3">
                          {rx.refills} • {rx.pharmacy}
                        </div>
                        <button
                          onClick={() => openRefill(rx.medication)}
                          style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
                          className="px-4 py-2 font-bold text-sm hover:opacity-90"
                        >
                          Request Refill
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Telehealth Video Interface Modal */}
      {showTelehealth && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-5xl w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">Telehealth Video Consultation</h3>
              <button onClick={closeTelehealth} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#1a1a1a', height: '400px' }} className="flex flex-col items-center justify-center mb-6">
                {callState === 'idle' && (
                  <>
                    <div className="text-9xl mb-4">📹</div>
                    <div style={{ color: '#ffffff' }} className="text-center">
                      <div className="font-bold text-2xl mb-2">Ready to Join Your Visit</div>
                      <div style={{ color: '#0496ff' }} className="mb-4">HIPAA-compliant secure connection</div>
                      <button
                        onClick={() => { setCallState('active'); setCallSeconds(0) }}
                        style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                        className="px-8 py-3 font-bold text-lg hover:opacity-90"
                      >
                        Start Video Call
                      </button>
                    </div>
                  </>
                )}
                {callState === 'active' && (
                  <>
                    <div className="text-9xl mb-4">{cameraOff ? '📹' : '👩‍⚕️'}</div>
                    <div style={{ color: '#ffffff' }} className="text-center">
                      <div className="font-bold text-2xl mb-2">Connected with Dr. Sarah Mitchell</div>
                      <div style={{ color: '#22c55e' }} className="font-bold text-xl mb-2">{formatDuration(callSeconds)}</div>
                      <div className="flex gap-3 justify-center">
                        {muted && (
                          <span style={{ backgroundColor: '#fbbf24', color: '#1a1a1a' }} className="px-3 py-1 text-xs font-bold uppercase">
                            Microphone muted
                          </span>
                        )}
                        {cameraOff && (
                          <span style={{ backgroundColor: '#fbbf24', color: '#1a1a1a' }} className="px-3 py-1 text-xs font-bold uppercase">
                            Camera off
                          </span>
                        )}
                        {!muted && !cameraOff && (
                          <span style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="px-3 py-1 text-xs font-bold uppercase">
                            Audio & video live
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {callState === 'ended' && (
                  <div style={{ color: '#ffffff' }} className="text-center px-6">
                    <div className="font-bold text-3xl mb-3">Call Ended</div>
                    <div style={{ color: '#0496ff' }} className="text-xl mb-4">Duration: {formatDuration(callSeconds)}</div>
                    <p style={{ color: '#cccccc' }} className="mb-6 max-w-md mx-auto">
                      Your visit summary and any e-prescriptions from Dr. Mitchell will appear in your patient portal within the hour.
                    </p>
                    <button
                      onClick={() => { setCallState('active'); setCallSeconds(0) }}
                      style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                      className="px-8 py-3 font-bold text-lg hover:opacity-90"
                    >
                      Start New Call
                    </button>
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setMuted(!muted)}
                  style={{ backgroundColor: muted ? '#fbbf24' : '#f5f5f5', color: '#1a1a1a' }}
                  className="py-3 font-bold hover:opacity-70"
                >
                  🎤 {muted ? 'Unmute' : 'Mute'}
                </button>
                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  style={{ backgroundColor: cameraOff ? '#fbbf24' : '#f5f5f5', color: '#1a1a1a' }}
                  className="py-3 font-bold hover:opacity-70"
                >
                  📹 {cameraOff ? 'Camera On' : 'Camera Off'}
                </button>
                <button
                  onClick={() => {
                    if (callState === 'active') {
                      setCallState('ended')
                    } else {
                      closeTelehealth()
                    }
                  }}
                  style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                  className="py-3 font-bold hover:opacity-70"
                >
                  {callState === 'active' ? 'End Call' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Refill Modal */}
      {showPrescriptions && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">Prescription Refill System</h3>
              <button onClick={closeRefill} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            {refillSubmitted ? (
              <div className="p-8 text-center">
                <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">✓</div>
                <h4 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-2">Refill Request Submitted</h4>
                <p style={{ color: '#666666' }} className="mb-6">Reference number: <span style={{ color: '#0353a4' }} className="font-bold">{refillRef}</span></p>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-left mb-6 space-y-2">
                  <div style={{ color: '#0353a4' }} className="font-bold mb-2">Medications requested:</div>
                  {refillMeds.map((med) => (
                    <div key={med} className="flex items-center gap-2">
                      <span style={{ color: '#0496ff' }}>✓</span>
                      <span style={{ color: '#1a1a1a' }}>{med}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <span style={{ color: '#666666' }}>Pharmacy: </span>
                    <span style={{ color: '#1a1a1a' }} className="font-bold">{refillPharmacy}</span>
                  </div>
                  <div>
                    <span style={{ color: '#666666' }}>Fulfillment: </span>
                    <span style={{ color: '#1a1a1a' }} className="font-bold">{refillMethod === 'pickup' ? 'Pharmacy pickup' : 'Home delivery'}</span>
                  </div>
                </div>
                <p style={{ color: '#333333' }} className="mb-8">
                  Your physician will review this request within one business day. You will get a text and portal notification the moment your medication is ready.
                </p>
                <button
                  onClick={closeRefill}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-6">
                  <h4 style={{ color: '#0353a4' }} className="text-xl font-bold mb-2">Online Prescription Management</h4>
                  <p style={{ color: '#006ba6' }}>Select the medications you need, choose your pharmacy, and submit -- your doctor handles the rest</p>
                </div>

                <div className="mb-6">
                  <div style={{ color: '#0353a4' }} className="font-bold mb-3">1. Select medications for refill *</div>
                  <div className="space-y-3">
                    {activePrescriptions.map((rx) => (
                      <label
                        key={rx.medication}
                        style={{
                          backgroundColor: refillMeds.includes(rx.medication) ? '#e3f2fd' : '#f5f5f5',
                          border: refillMeds.includes(rx.medication) ? '2px solid #0496ff' : '2px solid #e5e5e5'
                        }}
                        className="flex items-center gap-3 p-4 cursor-pointer hover:opacity-90 transition"
                      >
                        <input
                          type="checkbox"
                          checked={refillMeds.includes(rx.medication)}
                          onChange={() => toggleRefillMed(rx.medication)}
                          className="w-5 h-5"
                        />
                        <div>
                          <div style={{ color: '#0353a4' }} className="font-bold">{rx.medication}</div>
                          <div style={{ color: '#666666' }} className="text-sm">{rx.refills} • {rx.pharmacy}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {refillError && (
                    <p style={{ color: '#ef4444' }} className="font-bold text-sm mt-2">Select at least one medication to continue.</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="medical-refill-pharmacy" style={{ color: '#0353a4' }} className="block font-bold mb-3">2. Choose preferred pharmacy</label>
                  <select
                    id="medical-refill-pharmacy"
                    value={refillPharmacy}
                    onChange={(e) => setRefillPharmacy(e.target.value)}
                    style={inputStyle}
                    className="w-full px-4 py-3"
                  >
                    <option value="CVS Pharmacy - Main Street">CVS Pharmacy - Main Street</option>
                    <option value="Walgreens - Downtown Seattle">Walgreens - Downtown Seattle</option>
                    <option value="HealthFirst In-House Pharmacy">HealthFirst In-House Pharmacy</option>
                    <option value="Rite Aid - Medical Plaza">Rite Aid - Medical Plaza</option>
                  </select>
                </div>

                <div className="mb-8">
                  <div style={{ color: '#0353a4' }} className="font-bold mb-3">3. Pickup or delivery</div>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      style={{
                        backgroundColor: refillMethod === 'pickup' ? '#e3f2fd' : '#f5f5f5',
                        border: refillMethod === 'pickup' ? '2px solid #0496ff' : '2px solid #e5e5e5'
                      }}
                      className="flex items-center gap-3 p-4 cursor-pointer hover:opacity-90 transition"
                    >
                      <input
                        type="radio"
                        name="medical-refill-method"
                        checked={refillMethod === 'pickup'}
                        onChange={() => setRefillMethod('pickup')}
                        className="w-5 h-5"
                      />
                      <span style={{ color: '#1a1a1a' }} className="font-bold">Pharmacy Pickup</span>
                    </label>
                    <label
                      style={{
                        backgroundColor: refillMethod === 'delivery' ? '#e3f2fd' : '#f5f5f5',
                        border: refillMethod === 'delivery' ? '2px solid #0496ff' : '2px solid #e5e5e5'
                      }}
                      className="flex items-center gap-3 p-4 cursor-pointer hover:opacity-90 transition"
                    >
                      <input
                        type="radio"
                        name="medical-refill-method"
                        checked={refillMethod === 'delivery'}
                        onChange={() => setRefillMethod('delivery')}
                        className="w-5 h-5"
                      />
                      <span style={{ color: '#1a1a1a' }} className="font-bold">Home Delivery</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleRefillSubmit}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90"
                >
                  Submit Refill Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pay Bill Modal */}
      {showPayBill && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-2xl font-bold">Pay Bill Online</h3>
              <button onClick={closePayBill} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            {paySubmitted ? (
              <div className="p-8 text-center">
                <div style={{ backgroundColor: '#22c55e', color: '#ffffff' }} className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">✓</div>
                <h4 style={{ color: '#0353a4' }} className="text-3xl font-bold mb-2">Payment Received</h4>
                <p style={{ color: '#666666' }} className="mb-6">Confirmation number: <span style={{ color: '#0353a4' }} className="font-bold">{payRef}</span></p>
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-left max-w-sm mx-auto mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: '#666666' }}>Amount paid</span>
                    <span style={{ color: '#1a1a1a' }} className="font-bold">${payForm.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#666666' }}>Statement</span>
                    <span style={{ color: '#1a1a1a' }} className="font-bold">ST-20260731</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#666666' }}>Remaining balance</span>
                    <span style={{ color: '#22c55e' }} className="font-bold">$0.00</span>
                  </div>
                </div>
                <p style={{ color: '#333333' }} className="mb-8">A receipt has been sent to the email on file. Thank you!</p>
                <button
                  onClick={closePayBill}
                  style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                  className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 style={{ color: '#0353a4' }} className="text-xl font-bold">Current Statement</h4>
                    <span style={{ color: '#006ba6' }} className="text-sm font-bold">ST-20260731</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div style={{ color: '#006ba6' }} className="text-sm">
                      Office visit 07/18 • Insurance adjustments applied
                    </div>
                    <div style={{ color: '#0353a4' }} className="text-3xl font-bold">$145.00</div>
                  </div>
                </div>

                <form onSubmit={handlePaySubmit} className="space-y-5">
                  <div>
                    <label htmlFor="medical-pay-amount" style={{ color: '#0353a4' }} className="block font-bold mb-2">Payment Amount *</label>
                    <input
                      id="medical-pay-amount"
                      type="text"
                      required
                      value={payForm.amount}
                      onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="medical-pay-name" style={{ color: '#0353a4' }} className="block font-bold mb-2">Name on Card *</label>
                    <input
                      id="medical-pay-name"
                      type="text"
                      required
                      value={payForm.nameOnCard}
                      onChange={(e) => setPayForm({ ...payForm, nameOnCard: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="medical-pay-card" style={{ color: '#0353a4' }} className="block font-bold mb-2">Card Number *</label>
                    <input
                      id="medical-pay-card"
                      type="text"
                      required
                      inputMode="numeric"
                      value={payForm.cardNumber}
                      onChange={(e) => setPayForm({ ...payForm, cardNumber: e.target.value })}
                      style={inputStyle}
                      className="w-full px-4 py-3"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="medical-pay-expiry" style={{ color: '#0353a4' }} className="block font-bold mb-2">Expiry *</label>
                      <input
                        id="medical-pay-expiry"
                        type="text"
                        required
                        value={payForm.expiry}
                        onChange={(e) => setPayForm({ ...payForm, expiry: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="medical-pay-cvc" style={{ color: '#0353a4' }} className="block font-bold mb-2">CVC *</label>
                      <input
                        id="medical-pay-cvc"
                        type="text"
                        required
                        inputMode="numeric"
                        value={payForm.cvc}
                        onChange={(e) => setPayForm({ ...payForm, cvc: e.target.value })}
                        style={inputStyle}
                        className="w-full px-4 py-3"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Pay ${payForm.amount}
                  </button>
                  <p style={{ color: '#999999' }} className="text-xs text-center">
                    Demo checkout simulation -- no real payment is processed and no card data is stored.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}
