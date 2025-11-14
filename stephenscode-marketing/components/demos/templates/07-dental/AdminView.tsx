import React, { useState } from 'react';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  FileText,
  Star,
  Phone,
  Mail
} from 'lucide-react';

export default function AdminView() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const stats = [
    { label: 'Today\'s Appointments', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'New Patients This Month', value: '24', icon: <UserPlus className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Pending Appointments', value: '8', icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Revenue Today', value: '$4,850', icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      time: '9:00 AM',
      patient: 'Jennifer Martinez',
      type: 'Cleaning & Exam',
      dentist: 'Dr. Johnson',
      status: 'confirmed',
      isNew: false
    },
    {
      id: 2,
      time: '9:30 AM',
      patient: 'Robert Thompson',
      type: 'Crown Placement',
      dentist: 'Dr. Chen',
      status: 'confirmed',
      isNew: false
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Lisa Wong',
      type: 'Pediatric Checkup',
      dentist: 'Dr. Rodriguez',
      status: 'confirmed',
      isNew: false
    },
    {
      id: 4,
      time: '10:30 AM',
      patient: 'David Kim',
      type: 'New Patient Exam',
      dentist: 'Dr. Johnson',
      status: 'pending',
      isNew: true
    },
    {
      id: 5,
      time: '11:00 AM',
      patient: 'Sarah Parker',
      type: 'Invisalign Consultation',
      dentist: 'Dr. Chen',
      status: 'confirmed',
      isNew: true
    },
    {
      id: 6,
      time: '1:00 PM',
      patient: 'Michael Brown',
      type: 'Emergency - Toothache',
      dentist: 'Dr. Johnson',
      status: 'urgent',
      isNew: false
    }
  ];

  const recentInquiries = [
    {
      id: 1,
      name: 'Emma Wilson',
      contact: 'emma.w@email.com',
      subject: 'Insurance Question',
      time: '15 min ago',
      status: 'new'
    },
    {
      id: 2,
      name: 'James Miller',
      contact: '(555) 234-5678',
      subject: 'Schedule Appointment',
      time: '1 hour ago',
      status: 'new'
    },
    {
      id: 3,
      name: 'Olivia Davis',
      contact: 'olivia.d@email.com',
      subject: 'Treatment Question',
      time: '2 hours ago',
      status: 'responded'
    }
  ];

  const todayStats = {
    totalAppointments: 12,
    completed: 5,
    upcoming: 7,
    revenue: 4850,
    newPatients: 2
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#023e8a] to-[#0077b6] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bright Smile Dental</h1>
              <p className="text-blue-100">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-blue-100">Current Time</div>
                <div className="text-lg font-semibold">{new Date().toLocaleTimeString()}</div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#0077b6]" />
                  Today's Schedule
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                />
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Daily Progress</span>
                  <span>{todayStats.completed} of {todayStats.totalAppointments} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] h-3 rounded-full transition-all"
                    style={{ width: `${(todayStats.completed / todayStats.totalAppointments) * 100}%` }}
                  />
                </div>
              </div>

              {/* Appointments List */}
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      appointment.status === 'urgent'
                        ? 'border-red-300 bg-red-50'
                        : appointment.status === 'pending'
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-200 bg-white hover:border-[#48cae4]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-[#023e8a]">{appointment.time}</span>
                          {appointment.isNew && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                              New Patient
                            </span>
                          )}
                          {appointment.status === 'urgent' && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Emergency
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">{appointment.patient}</div>
                        <div className="text-sm text-gray-600">
                          {appointment.type} • {appointment.dentist}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {appointment.status === 'confirmed' ? (
                          <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Confirmed
                          </button>
                        ) : appointment.status === 'pending' ? (
                          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-all flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Confirm
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Urgent
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0077b6]" />
                Monthly Performance
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">Total Patients</div>
                  <div className="text-2xl font-bold text-blue-900">342</div>
                  <div className="text-xs text-blue-600 mt-1">+12% from last month</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="text-sm text-green-700 mb-1">Revenue</div>
                  <div className="text-2xl font-bold text-green-900">$87,450</div>
                  <div className="text-xs text-green-600 mt-1">+8% from last month</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="text-sm text-purple-700 mb-1">Satisfaction</div>
                  <div className="text-2xl font-bold text-purple-900 flex items-center gap-1">
                    4.9 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-xs text-purple-600 mt-1">248 reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0077b6]" />
                Recent Inquiries
              </h3>
              <div className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-gray-900">{inquiry.name}</div>
                      {inquiry.status === 'new' && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{inquiry.subject}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        {inquiry.contact.includes('@') ? (
                          <Mail className="w-3 h-3" />
                        ) : (
                          <Phone className="w-3 h-3" />
                        )}
                        {inquiry.contact}
                      </div>
                      <div className="text-xs text-gray-500">{inquiry.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-[#0077b6] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#023e8a] transition-all">
                View All Messages
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-[#48cae4] text-[#023e8a] px-4 py-3 rounded-lg font-semibold hover:bg-[#0077b6] hover:text-white transition-all flex items-center justify-between">
                  <span>Add Appointment</span>
                  <Calendar className="w-5 h-5" />
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between">
                  <span>Add New Patient</span>
                  <UserPlus className="w-5 h-5" />
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between">
                  <span>Patient Records</span>
                  <FileText className="w-5 h-5" />
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between">
                  <span>Billing & Insurance</span>
                  <DollarSign className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-gradient-to-br from-[#023e8a] to-[#0077b6] rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Total Appointments</span>
                  <span className="font-bold text-xl">{todayStats.totalAppointments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Completed</span>
                  <span className="font-bold text-xl text-green-300">{todayStats.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Upcoming</span>
                  <span className="font-bold text-xl text-yellow-300">{todayStats.upcoming}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                  <span className="text-blue-100">Revenue</span>
                  <span className="font-bold text-xl">${todayStats.revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
