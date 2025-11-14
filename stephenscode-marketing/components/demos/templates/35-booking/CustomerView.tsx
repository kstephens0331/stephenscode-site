'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Clock, Users, Mail, MessageSquare, CheckCircle, X } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const services = [
    { id: '1', name: 'Haircut & Style', duration: '45 min', price: '$45' },
    { id: '2', name: 'Hair Coloring', duration: '90 min', price: '$85' },
    { id: '3', name: 'Deep Conditioning', duration: '30 min', price: '$35' },
    { id: '4', name: 'Massage Therapy', duration: '60 min', price: '$75' },
  ]

  const staff = [
    { id: '1', name: 'Sarah Johnson', specialty: 'Hair Styling', avatar: 'SJ' },
    { id: '2', name: 'Mike Chen', specialty: 'Coloring Expert', avatar: 'MC' },
    { id: '3', name: 'Lisa Anderson', specialty: 'Massage Therapist', avatar: 'LA' },
  ]

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

  const handleBooking = () => {
    setShowConfirmation(true)
  }

  const resetBooking = () => {
    setSelectedService(null)
    setSelectedStaff(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setShowConfirmation(false)
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.backgroundAlt }}>
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: colors.primary + '20' }}>
              <CheckCircle className="w-12 h-12" style={{ color: colors.primary }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>Booking Confirmed!</h2>
            <p className="text-lg mb-8" style={{ color: colors.textLight }}>
              Your appointment has been successfully scheduled.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Date & Time</p>
                    <p style={{ color: colors.textLight }}>{selectedDate} at {selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Staff Member</p>
                    <p style={{ color: colors.textLight }}>{staff.find(s => s.id === selectedStaff)?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
                  <div>
                    <p className="font-semibold" style={{ color: colors.text }}>Service</p>
                    <p style={{ color: colors.textLight }}>{services.find(s => s.id === selectedService)?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-sm" style={{ color: colors.textLight }}>Email reminder sent</p>
              </div>
              <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <MessageSquare className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-sm" style={{ color: colors.textLight }}>SMS reminder sent</p>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>Perfect Appointments</h1>
          <p className="mt-2" style={{ color: colors.textLight }}>Book your appointment with ease</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Steps */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Service */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                  1
                </div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Service</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedService === service.id ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{
                      borderColor: selectedService === service.id ? colors.primary : colors.border,
                      backgroundColor: selectedService === service.id ? colors.backgroundAlt : 'white'
                    }}
                  >
                    <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{service.name}</h3>
                    <p className="text-sm mb-2" style={{ color: colors.textLight }}>{service.duration}</p>
                    <p className="font-bold" style={{ color: colors.primary }}>{service.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Staff */}
            {selectedService && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                    2
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Staff Member</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {staff.map(member => (
                    <button
                      key={member.id}
                      onClick={() => setSelectedStaff(member.id)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        selectedStaff === member.id ? 'shadow-lg' : 'hover:shadow-md'
                      }`}
                      style={{
                        borderColor: selectedStaff === member.id ? colors.primary : colors.border,
                        backgroundColor: selectedStaff === member.id ? colors.backgroundAlt : 'white'
                      }}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.secondary }}>
                        {member.avatar}
                      </div>
                      <h3 className="font-semibold mb-1" style={{ color: colors.text }}>{member.name}</h3>
                      <p className="text-sm" style={{ color: colors.textLight }}>{member.specialty}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {selectedStaff && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.primary }}>
                    3
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Select Date & Time</h2>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Date</label>
                  <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.border }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Available Times</label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-lg border-2 font-medium transition-all ${
                            selectedTime === time ? 'shadow-lg' : 'hover:shadow-md'
                          }`}
                          style={{
                            borderColor: selectedTime === time ? colors.primary : colors.border,
                            backgroundColor: selectedTime === time ? colors.primary : 'white',
                            color: selectedTime === time ? 'white' : colors.text
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Booking Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Service</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedService ? services.find(s => s.id === selectedService)?.name : 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Staff Member</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedStaff ? staff.find(s => s.id === selectedStaff)?.name : 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Date</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedDate || 'Not selected'}
                  </p>
                </div>

                <div className="pb-4 border-b" style={{ borderColor: colors.border }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Time</p>
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {selectedTime || 'Not selected'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: colors.textLight }}>Total</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                    {selectedService ? services.find(s => s.id === selectedService)?.price : '$0'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedService || !selectedStaff || !selectedDate || !selectedTime}
                className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Confirm Booking
              </button>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
                <p className="text-sm font-semibold mb-3" style={{ color: colors.text }}>Included Features:</p>
                <ul className="space-y-2 text-sm" style={{ color: colors.textLight }}>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Email reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    SMS notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Calendar sync
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                    Easy rescheduling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
