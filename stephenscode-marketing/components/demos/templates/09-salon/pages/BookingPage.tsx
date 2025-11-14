import React, { useState } from 'react';
import { Calendar, Clock, User, CreditCard, CheckCircle, ChevronRight } from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    stylist: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const services = [
    { id: 'haircut', name: "Women's Haircut", price: 65, duration: '45 min' },
    { id: 'color', name: 'Single Process Color', price: 85, duration: '90 min' },
    { id: 'highlights', name: 'Full Highlights', price: 165, duration: '3 hrs' },
    { id: 'balayage', name: 'Balayage', price: 185, duration: '3 hrs' },
    { id: 'blowout', name: 'Blowout', price: 45, duration: '45 min' },
    { id: 'updo', name: 'Special Occasion Updo', price: 85, duration: '90 min' },
    { id: 'extensions', name: 'Hair Extensions (Full)', price: 350, duration: '4 hrs' },
    { id: 'keratin', name: 'Keratin Treatment', price: 250, duration: '3 hrs' },
    { id: 'gelmanicure', name: 'Gel Manicure', price: 55, duration: '60 min' },
    { id: 'acrylicfull', name: 'Acrylic Full Set', price: 65, duration: '90 min' },
    { id: 'spapedicure', name: 'Spa Pedicure', price: 75, duration: '90 min' },
    { id: 'bridalhair', name: 'Bridal Hair', price: 150, duration: '2 hrs' },
    { id: 'bridalmakeup', name: 'Bridal Makeup', price: 125, duration: '90 min' },
    { id: 'bridalpackage', name: 'Bridal Hair & Makeup Package', price: 250, duration: '3 hrs' },
  ];

  const stylists = [
    {
      id: 'jessica',
      name: 'Jessica Ramirez',
      title: 'Master Colorist',
      specialties: ['Color', 'Highlights', 'Balayage'],
      image: '👩‍🦰',
    },
    {
      id: 'ashley',
      name: 'Ashley Kim',
      title: 'Extension Specialist',
      specialties: ['Extensions', 'Styling', 'Updos'],
      image: '👱‍♀️',
    },
    {
      id: 'maria',
      name: 'Maria Santos',
      title: 'Bridal Expert',
      specialties: ['Bridal', 'Makeup', 'Special Events'],
      image: '👰‍♀️',
    },
    {
      id: 'taylor',
      name: 'Taylor Johnson',
      title: 'Nail Artist',
      specialties: ['Nails', 'Nail Art', 'Gel'],
      image: '💅',
    },
  ];

  const availableDates = [
    { date: '2024-02-15', day: 'Thu', month: 'Feb' },
    { date: '2024-02-16', day: 'Fri', month: 'Feb' },
    { date: '2024-02-17', day: 'Sat', month: 'Feb' },
    { date: '2024-02-18', day: 'Sun', month: 'Feb' },
    { date: '2024-02-19', day: 'Mon', month: 'Feb' },
    { date: '2024-02-20', day: 'Tue', month: 'Feb' },
    { date: '2024-02-21', day: 'Wed', month: 'Feb' },
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const selectedService = services.find(s => s.id === bookingData.service);
  const selectedStylist = stylists.find(s => s.id === bookingData.stylist);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#d00000] via-[#dc2f02] to-[#e85d04] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Select your service, choose your stylist, and pick your perfect time
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white shadow-md sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Stylist' },
              { num: 3, label: 'Date & Time' },
              { num: 4, label: 'Details' },
            ].map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center">
                  <div
                    className={`${
                      step >= s.num
                        ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                        : 'bg-gray-200 text-gray-500'
                    } w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300`}
                  >
                    {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                  </div>
                  <span
                    className={`${
                      step >= s.num ? 'text-[#d00000] font-semibold' : 'text-gray-500'
                    } ml-2 hidden sm:inline`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < 3 && (
                  <ChevronRight
                    className={`w-5 h-5 ${step > s.num ? 'text-[#d00000]' : 'text-gray-300'}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Select Your Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() =>
                        setBookingData({ ...bookingData, service: service.id })
                      }
                      className={`${
                        bookingData.service === service.id
                          ? 'border-[#d00000] bg-red-50 border-2'
                          : 'border-gray-200 hover:border-[#dc2f02] border'
                      } p-4 rounded-xl text-left transition-all duration-200`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{service.name}</h3>
                        <span className="text-[#d00000] font-bold text-xl">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => bookingData.service && setStep(2)}
                  disabled={!bookingData.service}
                  className="w-full mt-8 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Stylist Selection
                </button>
              </div>
            )}

            {/* Step 2: Select Stylist */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Stylist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      type="button"
                      onClick={() =>
                        setBookingData({ ...bookingData, stylist: stylist.id })
                      }
                      className={`${
                        bookingData.stylist === stylist.id
                          ? 'border-[#d00000] bg-red-50 border-2'
                          : 'border-gray-200 hover:border-[#dc2f02] border'
                      } p-6 rounded-xl text-left transition-all duration-200`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-5xl">{stylist.image}</div>
                        <div>
                          <h3 className="font-bold text-xl mb-1">{stylist.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{stylist.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {stylist.specialties.map((specialty, idx) => (
                              <span
                                key={idx}
                                className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-3 py-1 rounded-full text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => bookingData.stylist && setStep(3)}
                    disabled={!bookingData.stylist}
                    className="flex-1 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Date & Time
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Select Date & Time</h2>

                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4 flex items-center">
                    <Calendar className="w-5 h-5 text-[#d00000] mr-2" />
                    Choose a Date
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.date}
                        type="button"
                        onClick={() =>
                          setBookingData({ ...bookingData, date: dateObj.date })
                        }
                        className={`${
                          bookingData.date === dateObj.date
                            ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white border-0'
                            : 'bg-white border border-gray-200 hover:border-[#dc2f02]'
                        } p-4 rounded-xl text-center transition-all duration-200`}
                      >
                        <div className="text-sm font-medium">{dateObj.day}</div>
                        <div className="text-xs opacity-80">{dateObj.month}</div>
                        <div className="text-lg font-bold">{dateObj.date.split('-')[2]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="font-bold text-xl mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-[#d00000] mr-2" />
                    Choose a Time
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setBookingData({ ...bookingData, time })
                        }
                        className={`${
                          bookingData.time === time
                            ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white border-0'
                            : 'bg-white border border-gray-200 hover:border-[#dc2f02]'
                        } py-3 px-4 rounded-xl text-center font-medium transition-all duration-200`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => bookingData.date && bookingData.time && setStep(4)}
                    disabled={!bookingData.date || !bookingData.time}
                    className="flex-1 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Your Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Details */}
            {step === 4 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Your Details</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingData.firstName}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingData.lastName}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Special Requests or Notes (Optional)
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, notes: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                      placeholder="Any specific preferences or concerns?"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="font-bold text-xl mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stylist:</span>
                      <span className="font-semibold">{selectedStylist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{selectedService?.duration}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-gray-900 font-bold text-lg">Total:</span>
                      <span className="text-[#d00000] font-bold text-2xl">
                        ${selectedService?.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Confirm & Pay
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Payment will be processed securely. Cancellation available up to 24 hours before appointment.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#d00000] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book online in minutes. Choose your preferred stylist and time.
              </p>
            </div>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-[#d00000] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                7 days a week availability. Early morning and evening slots.
              </p>
            </div>
            <div className="text-center">
              <User className="w-12 h-12 text-[#d00000] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Care</h3>
              <p className="text-gray-600">
                Award-winning stylists with years of experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
