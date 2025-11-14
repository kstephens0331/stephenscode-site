'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface LayoutProps {
  children: React.ReactNode
  colors: ColorPalette
  currentPage: string
  onNavigate: (page: string) => void
  onAppointmentOpen: () => void
}

export default function Layout({ children, colors, currentPage, onNavigate, onAppointmentOpen }: LayoutProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'patient-portal', label: 'Patient Portal' },
    { id: 'appointments', label: 'Book Appointment' },
    { id: 'telehealth', label: 'Telehealth' },
    { id: 'prescriptions', label: 'Prescriptions' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div>
      <div style={{ backgroundColor: '#e3f2fd' }} className="py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div style={{ color: '#0353a4' }} className="font-bold">
              24/7 Urgent Care Available • (555) HEALTH-1
            </div>
            <div className="flex gap-4">
              <button style={{ color: '#0353a4' }} className="hover:opacity-70">Patient Portal Login</button>
              <button style={{ color: '#0353a4' }} className="hover:opacity-70">Pay Bill Online</button>
            </div>
          </div>
        </div>
      </div>

      <header style={{ backgroundColor: '#0353a4' }} className="sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="text-4xl">⚕️</div>
              <div>
                <div style={{ color: '#ffffff' }} className="text-2xl font-black">HealthFirst Medical Group</div>
                <div style={{ color: '#0496ff' }} className="text-xs font-bold uppercase tracking-wide">Compassionate Care Since 1985</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'appointments' ? onAppointmentOpen() : onNavigate(item.id)}
                  style={{
                    color: currentPage === item.id ? '#0496ff' : '#ffffff',
                    borderBottom: currentPage === item.id ? '3px solid #0496ff' : 'none'
                  }}
                  className="font-bold hover:opacity-80 pb-1 transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              onClick={onAppointmentOpen}
              style={{ backgroundColor: '#0496ff', color: '#ffffff' }}
              className="px-6 py-3 font-bold hover:opacity-90 transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">⚕️</div>
                <div style={{ color: '#0496ff' }} className="text-xl font-black">HealthFirst</div>
              </div>
              <p style={{ color: '#999999' }} className="text-sm">
                Providing exceptional healthcare with compassion and expertise for over 35 years.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#0496ff' }} className="font-bold mb-4">Quick Links</h4>
              <div style={{ color: '#cccccc' }} className="space-y-2 text-sm">
                {['Book Appointment', 'Patient Portal', 'Telehealth', 'Pay Bill'].map((link) => (
                  <div key={link}>{link}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: '#0496ff' }} className="font-bold mb-4">Hours</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>Mon-Fri: 7:00 AM - 7:00 PM</div>
                <div>Saturday: 8:00 AM - 4:00 PM</div>
                <div>Sunday: 9:00 AM - 3:00 PM</div>
                <div className="pt-2 font-bold">24/7 Urgent Care</div>
              </div>
            </div>
            <div>
              <h4 style={{ color: '#0496ff' }} className="font-bold mb-4">Contact</h4>
              <div style={{ color: '#cccccc' }} className="text-sm space-y-2">
                <div>(555) HEALTH-1</div>
                <div>info@healthfirst.com</div>
                <div>1234 Medical Plaza Dr</div>
                <div>Seattle, WA 98101</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333333' }} className="pt-8 text-center">
            <p style={{ color: '#666666' }} className="text-sm">
              &copy; 2024 HealthFirst Medical Group. HIPAA Compliant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
