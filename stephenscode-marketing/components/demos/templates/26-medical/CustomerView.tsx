'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import Layout from './components/Layout'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false)
  const [showPatientPortal, setShowPatientPortal] = useState(false)
  const [showTelehealth, setShowTelehealth] = useState(false)
  const [showPrescriptions, setShowPrescriptions] = useState(false)

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
                <h1 style={{ color: '#0353a4' }} className="text-6xl md:text-7xl font-black leading-tight mb-6">
                  Your Health,<br />Our Priority
                </h1>
                <p style={{ color: '#006ba6' }} className="text-xl leading-relaxed mb-10">
                  Experience comprehensive medical care from board-certified physicians who truly care. From routine
                  checkups to specialized treatments, HealthFirst Medical Group offers the full spectrum of healthcare
                  services with same-day appointments, 24/7 telehealth, and a patient portal for managing your health.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowAppointmentBooking(true)}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="px-10 py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setShowPatientPortal(true)}
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
                <h2 style={{ color: '#0353a4' }} className="text-5xl font-black mb-4">Our Services</h2>
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
                  <div key={service.title} style={{ backgroundColor: '#f5f5f5' }} className="p-6 text-center hover:shadow-xl transition">
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <h3 style={{ color: '#0353a4' }} className="text-xl font-black mb-2">{service.title}</h3>
                    <p style={{ color: '#666666' }} className="text-sm">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24" style={{ backgroundColor: '#0353a4' }}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-black mb-2">35+</div>
                  <div style={{ color: '#ffffff' }} className="font-bold">Years of Excellence</div>
                </div>
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-black mb-2">25</div>
                  <div style={{ color: '#ffffff' }} className="font-bold">Board-Certified Physicians</div>
                </div>
                <div>
                  <div style={{ color: '#0496ff' }} className="text-5xl font-black mb-2">50K+</div>
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
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Medical Services</h1>
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
                    <h3 style={{ color: '#0353a4' }} className="text-3xl font-black mb-3">{service.name}</h3>
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
                      onClick={() => setShowAppointmentBooking(true)}
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
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Our Physicians</h1>
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
                      <h3 style={{ color: '#0353a4' }} className="text-xl font-black mb-2">{doctor.name}</h3>
                      <div style={{ backgroundColor: '#0496ff', color: '#ffffff' }} className="inline-block px-3 py-1 text-xs font-bold uppercase mb-3">
                        {doctor.specialty}
                      </div>
                      <div style={{ color: '#666666' }} className="text-sm space-y-1 mb-4">
                        <div>🎓 {doctor.education}</div>
                        <div>📅 {doctor.experience} experience</div>
                      </div>
                      <button
                        onClick={() => setShowAppointmentBooking(true)}
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
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Patient Portal</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Access your health records and manage your care 24/7
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-4xl mx-auto px-4">
              <div style={{ backgroundColor: '#f5f5f5' }} className="p-12">
                <h2 style={{ color: '#0353a4' }} className="text-3xl font-black text-center mb-8">
                  Portal Login
                </h2>
                <form className="space-y-6 max-w-md mx-auto">
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Email or Username</label>
                    <input
                      type="text"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Password</label>
                    <input
                      type="password"
                      style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => { e.preventDefault(); setShowPatientPortal(true); }}
                    style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                  >
                    Access Patient Portal
                  </button>
                  <div className="text-center">
                    <button style={{ color: '#0496ff' }} className="font-bold text-sm hover:opacity-70">
                      Forgot Password?
                    </button>
                    <span style={{ color: '#666666' }} className="mx-3">|</span>
                    <button style={{ color: '#0496ff' }} className="font-bold text-sm hover:opacity-70">
                      Create Account
                    </button>
                  </div>
                </form>

                <div style={{ backgroundColor: '#ffffff', border: '3px solid #0496ff' }} className="p-8 mt-12">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-black mb-4">Portal Features:</h3>
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
              <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">Telehealth Services</h1>
              <p style={{ color: '#0496ff' }} className="text-xl font-bold">
                Connect with your doctor from anywhere via secure video chat
              </p>
            </div>
          </section>

          <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h2 style={{ color: '#0353a4' }} className="text-3xl font-black mb-6">How It Works</h2>
                  <div className="space-y-6">
                    {[
                      { step: '1', title: 'Book Your Visit', desc: 'Schedule a telehealth appointment online or by phone' },
                      { step: '2', title: 'Get Reminder', desc: 'Receive email/SMS with secure video link 24 hours before' },
                      { step: '3', title: 'Join Video Call', desc: 'Click link at appointment time to connect with your doctor' },
                      { step: '4', title: 'Receive Care', desc: 'Discuss symptoms, get diagnosis, and receive e-prescriptions' }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 style={{ color: '#0353a4' }} className="font-black text-lg mb-1">{item.title}</h3>
                          <p style={{ color: '#666666' }} className="text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-black mb-6">
                    Start Telehealth Visit
                  </h3>
                  <div style={{ backgroundColor: '#0353a4', height: '300px' }} className="flex flex-col items-center justify-center mb-6">
                    <div className="text-9xl mb-4">💻</div>
                    <div style={{ color: '#ffffff' }} className="text-center">
                      <div className="font-black text-xl mb-2">Video Interface</div>
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
                    onClick={() => setShowAppointmentBooking(true)}
                    style={{ backgroundColor: 'transparent', color: '#0353a4', border: '2px solid #0353a4' }}
                    className="w-full py-4 font-bold text-lg hover:opacity-80 transition"
                  >
                    Schedule New Visit
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#e3f2fd' }} className="p-8">
                <h3 style={{ color: '#0353a4' }} className="text-2xl font-black mb-6 text-center">
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
                      <h4 style={{ color: '#0353a4' }} className="font-black text-center mb-3">{category.title}</h4>
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

    // Default fallback
    return (
      <div>
        <section style={{ backgroundColor: '#0353a4' }} className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')}
            </h1>
          </div>
        </section>
        <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-5xl mx-auto px-4">
            <p style={{ color: '#666666' }} className="text-center">Page content for {currentPage}</p>
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
      onAppointmentOpen={() => setShowAppointmentBooking(true)}
    >
      {renderPage()}

      {/* Appointment Booking Modal */}
      {showAppointmentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-black">Book Your Appointment</h3>
              <button onClick={() => setShowAppointmentBooking(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-8">
                <h4 style={{ color: '#0353a4' }} className="text-2xl font-black mb-2">Smart Scheduling System</h4>
                <p style={{ color: '#006ba6' }} className="font-bold">
                  Same-day appointments available • Insurance verification • Automated reminders
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Appointment Type *</label>
                  <select
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Select appointment type</option>
                    <option value="new-patient">New Patient Visit</option>
                    <option value="follow-up">Follow-Up Appointment</option>
                    <option value="annual-physical">Annual Physical</option>
                    <option value="sick-visit">Sick Visit</option>
                    <option value="telehealth">Telehealth Consultation</option>
                    <option value="urgent-care">Urgent Care</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Physician</label>
                  <select
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  >
                    <option value="">Any available doctor</option>
                    <option value="dr-mitchell">Dr. Sarah Mitchell (Family Medicine)</option>
                    <option value="dr-chen">Dr. James Chen (Internal Medicine)</option>
                    <option value="dr-rodriguez">Dr. Emily Rodriguez (Pediatrics)</option>
                    <option value="dr-thompson">Dr. Michael Thompson (Cardiology)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Preferred Time *</label>
                    <select
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (7AM-12PM)</option>
                      <option value="afternoon">Afternoon (12PM-5PM)</option>
                      <option value="evening">Evening (5PM-7PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Reason for Visit *</label>
                  <textarea
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-24"
                    placeholder="Brief description of your symptoms or reason for appointment..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Full Name *</label>
                    <input
                      type="text"
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                  <div>
                    <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                      className="w-full px-4 py-3"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: '#0353a4' }} className="block font-bold mb-2">Insurance Provider</label>
                  <input
                    type="text"
                    style={{ backgroundColor: '#f5f5f5', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
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
          </div>
        </div>
      )}

      {/* Patient Portal Demo Modal */}
      {showPatientPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center sticky top-0">
              <h3 className="text-2xl font-black">My Health Dashboard</h3>
              <button onClick={() => setShowPatientPortal(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Next Appointment', value: 'Mar 15, 2024', sub: '10:00 AM' },
                  { label: 'Unread Messages', value: '3', sub: 'From care team' },
                  { label: 'Test Results', value: '2 New', sub: 'Ready to view' },
                  { label: 'Prescriptions', value: '1 Refill', sub: 'Ready for pickup' }
                ].map((item) => (
                  <div key={item.label} style={{ backgroundColor: '#f5f5f5' }} className="p-6">
                    <div style={{ color: '#666666' }} className="text-sm font-bold mb-2">{item.label}</div>
                    <div style={{ color: '#0353a4' }} className="text-3xl font-black mb-1">{item.value}</div>
                    <div style={{ color: '#666666' }} className="text-sm">{item.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div style={{ backgroundColor: '#f5f5f5' }} className="p-8">
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-black mb-6">Recent Lab Results</h3>
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
                  <h3 style={{ color: '#0353a4' }} className="text-2xl font-black mb-6">Active Prescriptions</h3>
                  <div className="space-y-4">
                    {[
                      { medication: 'Lisinopril 10mg', refills: '2 left', pharmacy: 'CVS Pharmacy' },
                      { medication: 'Metformin 500mg', refills: '1 left', pharmacy: 'CVS Pharmacy' },
                      { medication: 'Atorvastatin 20mg', refills: '3 left', pharmacy: 'CVS Pharmacy' }
                    ].map((rx) => (
                      <div key={rx.medication} style={{ backgroundColor: '#ffffff' }} className="p-4">
                        <div style={{ color: '#0353a4' }} className="font-bold mb-1">{rx.medication}</div>
                        <div style={{ color: '#666666' }} className="text-sm mb-3">
                          {rx.refills} • {rx.pharmacy}
                        </div>
                        <button
                          onClick={() => setShowPrescriptions(true)}
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
              <h3 className="text-2xl font-black">Telehealth Video Consultation</h3>
              <button onClick={() => setShowTelehealth(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#1a1a1a', height: '400px' }} className="flex flex-col items-center justify-center mb-6">
                <div className="text-9xl mb-4">📹</div>
                <div style={{ color: '#ffffff' }} className="text-center">
                  <div className="font-black text-2xl mb-2">Video Call Interface</div>
                  <div style={{ color: '#0496ff' }} className="mb-4">HIPAA-compliant secure connection</div>
                  <button
                    style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                    className="px-8 py-3 font-bold text-lg hover:opacity-90"
                  >
                    Start Video Call
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="py-3 font-bold hover:opacity-70">
                  🎤 Mute
                </button>
                <button style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }} className="py-3 font-bold hover:opacity-70">
                  📹 Camera Off
                </button>
                <button style={{ backgroundColor: '#ef4444', color: '#ffffff' }} className="py-3 font-bold hover:opacity-70">
                  End Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Refill Modal */}
      {showPrescriptions && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: '#ffffff' }} className="max-w-2xl w-full">
            <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="p-6 flex justify-between items-center">
              <h3 className="text-2xl font-black">Prescription Refill System</h3>
              <button onClick={() => setShowPrescriptions(false)} className="text-3xl hover:opacity-70">&times;</button>
            </div>
            <div className="p-8">
              <div style={{ backgroundColor: '#e3f2fd' }} className="p-6 mb-6">
                <h4 style={{ color: '#0353a4' }} className="text-xl font-black mb-2">Online Prescription Management</h4>
                <p style={{ color: '#006ba6' }}>Request refills, transfer prescriptions, and track pharmacy status all in one place</p>
              </div>
              <div className="space-y-4">
                {[
                  'Select medications for refill',
                  'Choose preferred pharmacy',
                  'Confirm request with doctor',
                  'Receive notification when ready',
                  'Pick up or request delivery'
                ].map((step, idx) => (
                  <div key={step} className="flex items-center gap-3">
                    <div style={{ backgroundColor: '#0353a4', color: '#ffffff' }} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div style={{ color: '#1a1a1a' }} className="font-bold">{step}</div>
                  </div>
                ))}
              </div>
              <button
                style={{ backgroundColor: '#0353a4', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 mt-6"
              >
                Submit Refill Request
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
