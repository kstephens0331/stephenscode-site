import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export default function BookingPage({ onNavigate }: BookingPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    dentist: '',
    visitType: '',
    isNewPatient: '',
    insurance: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const dentists = [
    'Dr. Sarah Johnson - General & Cosmetic',
    'Dr. Michael Chen - Cosmetic & Restorative',
    'Dr. Emily Rodriguez - Pediatric'
  ];

  const visitTypes = [
    'New Patient Exam & Cleaning',
    'Regular Cleaning & Checkup',
    'Cosmetic Consultation',
    'Emergency Visit',
    'Follow-up Appointment',
    'Dental Implant Consultation',
    'Orthodontic Consultation',
    'Pediatric Visit'
  ];

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const benefits = [
    {
      icon: <Calendar className="w-6 h-6 text-[#0077b6]" />,
      title: 'Easy Scheduling',
      description: 'Choose your preferred date and time'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0077b6]" />,
      title: 'Flexible Hours',
      description: 'Evening and weekend appointments available'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-[#0077b6]" />,
      title: 'Quick Confirmation',
      description: 'Receive confirmation within 24 hours'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Appointment</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Schedule your visit online or call us at <a href="tel:555-123-4567" className="underline font-bold hover:text-[#48cae4]">(555) 123-4567</a>
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#023e8a]/5 p-3 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#023e8a] mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {submitted ? (
            <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-[#023e8a] mb-4">Appointment Request Received!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Thank you for choosing Bright Smile Dental. We'll contact you within 24 hours to confirm your appointment.
              </p>
              <div className="bg-[#48cae4]/10 border border-[#48cae4] rounded-xl p-6 mb-6">
                <p className="text-gray-700">
                  <strong>What's Next?</strong><br />
                  Our scheduling team will call or email you to confirm your appointment time and answer any questions.
                  If you don't hear from us within 24 hours, please call <a href="tel:555-123-4567" className="text-[#0077b6] font-semibold">(555) 123-4567</a>.
                </p>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="bg-[#0077b6] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#023e8a] transition-all"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Schedule Your Visit</h2>
                <p>Fill out the form below and we'll confirm your appointment within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {/* New Patient Special */}
                <div className="bg-gradient-to-r from-[#48cae4]/20 to-transparent border-l-4 border-[#0077b6] p-6 rounded-r-xl mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-[#0077b6] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#023e8a] mb-2">New Patient Special - $99</div>
                      <p className="text-gray-700 text-sm">
                        Comprehensive exam, professional cleaning, and digital X-rays (regularly $350).
                        Select "New Patient Exam & Cleaning" below to claim this offer!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#023e8a] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#0077b6]" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                        placeholder="Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                        placeholder="john.smith@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#023e8a] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0077b6]" />
                    Appointment Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Are you a new patient? *
                      </label>
                      <select
                        name="isNewPatient"
                        required
                        value={formData.isNewPatient}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes, I'm a new patient</option>
                        <option value="no">No, I'm an existing patient</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type of Visit *
                      </label>
                      <select
                        name="visitType"
                        required
                        value={formData.visitType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                      >
                        <option value="">Select a service...</option>
                        {visitTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Dentist
                      </label>
                      <select
                        name="dentist"
                        value={formData.dentist}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                      >
                        <option value="">No preference</option>
                        {dentists.map((dentist, index) => (
                          <option key={index} value={dentist}>
                            {dentist}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                      >
                        <option value="">Select a time...</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#023e8a] mb-4">Insurance Information</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you have dental insurance?
                    </label>
                    <select
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="yes">Yes, I have insurance</option>
                      <option value="no">No insurance</option>
                      <option value="not-sure">Not sure</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-2">
                      We'll verify your insurance benefits before your appointment
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#023e8a] mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#0077b6]" />
                    Additional Information
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Is there anything we should know? (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent resize-none"
                      placeholder="Special accommodations, dental anxiety, medical conditions, etc."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0077b6] to-[#48cae4] text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-[#023e8a] hover:to-[#0077b6] transition-all shadow-lg"
                  >
                    Request Appointment
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting this form, you agree to be contacted by our office to confirm your appointment.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#023e8a] mb-4">Prefer to Talk to Someone?</h2>
            <p className="text-xl text-gray-600">Our friendly team is ready to help you schedule</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] rounded-xl p-8 text-white text-center">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-200 mb-4">Speak with our scheduling team</p>
              <a
                href="tel:555-123-4567"
                className="inline-block bg-white text-[#023e8a] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
              >
                (555) 123-4567
              </a>
              <p className="text-sm text-gray-300 mt-4">Mon-Fri: 8am-6pm | Sat: 9am-3pm</p>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-8 text-white text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Emergency?</h3>
              <p className="text-gray-200 mb-4">24/7 emergency dental care</p>
              <a
                href="tel:555-911-CARE"
                className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
              >
                (555) 911-CARE
              </a>
              <p className="text-sm text-red-200 mt-4">Available anytime, day or night</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#023e8a] mb-4">Appointment FAQs</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-[#023e8a] mb-2">How quickly will my appointment be confirmed?</h3>
              <p className="text-gray-700">
                We'll contact you within 24 hours (usually much sooner) to confirm your appointment time.
                For same-day or emergency appointments, please call us directly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-[#023e8a] mb-2">What if I need to cancel or reschedule?</h3>
              <p className="text-gray-700">
                We understand that schedules change. Please call us at least 24 hours in advance at (555) 123-4567
                to cancel or reschedule your appointment without any charges.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-[#023e8a] mb-2">Do you offer weekend or evening appointments?</h3>
              <p className="text-gray-700">
                Yes! We're open until 6:00 PM on weekdays and have Saturday appointments from 9:00 AM to 3:00 PM
                to accommodate busy schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
