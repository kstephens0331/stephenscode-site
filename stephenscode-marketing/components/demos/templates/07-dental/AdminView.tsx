import React, { useEffect, useState } from 'react';
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
  Mail,
  X,
  Search,
  ArrowLeft
} from 'lucide-react';

type ApptStatus = 'pending' | 'confirmed' | 'urgent' | 'completed';

interface Appointment {
  id: number;
  time: string;
  patient: string;
  type: string;
  dentist: string;
  status: ApptStatus;
  isNew: boolean;
}

interface Inquiry {
  id: number;
  name: string;
  contact: string;
  subject: string;
  time: string;
  status: 'new' | 'responded';
  message: string;
}

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextVisit: string;
  balance: number;
  notes: string;
}

interface Claim {
  id: number;
  patient: string;
  insurer: string;
  procedure: string;
  amount: number;
  status: 'pending' | 'paid';
}

const STORAGE_KEY = 'demo-dental-admin-v1';

const SEED_APPOINTMENTS: Appointment[] = [
  { id: 1, time: '9:00 AM', patient: 'Jennifer Martinez', type: 'Cleaning & Exam', dentist: 'Dr. Johnson', status: 'confirmed', isNew: false },
  { id: 2, time: '9:30 AM', patient: 'Robert Thompson', type: 'Crown Placement', dentist: 'Dr. Chen', status: 'confirmed', isNew: false },
  { id: 3, time: '10:00 AM', patient: 'Lisa Wong', type: 'Pediatric Checkup', dentist: 'Dr. Rodriguez', status: 'confirmed', isNew: false },
  { id: 4, time: '10:30 AM', patient: 'David Kim', type: 'New Patient Exam', dentist: 'Dr. Johnson', status: 'pending', isNew: true },
  { id: 5, time: '11:00 AM', patient: 'Sarah Parker', type: 'Invisalign Consultation', dentist: 'Dr. Chen', status: 'confirmed', isNew: true },
  { id: 6, time: '1:00 PM', patient: 'Michael Brown', type: 'Emergency: Toothache', dentist: 'Dr. Johnson', status: 'urgent', isNew: false }
];

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    name: 'Emma Wilson',
    contact: 'emma.w@email.com',
    subject: 'Insurance Question',
    time: '15 min ago',
    status: 'new',
    message: 'Hi, I recently switched jobs and now have Guardian insurance. Do you accept Guardian, and can your office verify my benefits before my next cleaning? My old plan was Delta Dental. Thanks!'
  },
  {
    id: 2,
    name: 'James Miller',
    contact: '(555) 234-5678',
    subject: 'Schedule Appointment',
    time: '1 hour ago',
    status: 'new',
    message: 'I would like to schedule a cleaning and exam for next week, ideally Tuesday or Wednesday afternoon. I am an existing patient of Dr. Johnson. Please call me back at this number.'
  },
  {
    id: 3,
    name: 'Olivia Davis',
    contact: 'olivia.d@email.com',
    subject: 'Treatment Question',
    time: '2 hours ago',
    status: 'responded',
    message: 'My daughter needs a filling and I had a question about sedation options for kids. What do you recommend for a nervous 8 year old? Is nitrous oxide safe at that age?'
  },
  {
    id: 4,
    name: 'Noah Garcia',
    contact: '(555) 876-2210',
    subject: 'Billing Question',
    time: 'Yesterday',
    status: 'responded',
    message: 'I think I was charged twice for my last visit copay. Can someone review my statement from earlier this month and give me a call?'
  },
  {
    id: 5,
    name: 'Sophia Turner',
    contact: 'sophia.t@email.com',
    subject: 'New Patient Information',
    time: 'Yesterday',
    status: 'responded',
    message: 'Do you have any new patient specials, and are you currently accepting new patients? I saw the $99 exam offer on your website and wanted to confirm it is still available.'
  },
  {
    id: 6,
    name: 'Liam Johnson',
    contact: 'liam.j@email.com',
    subject: 'Treatment Question',
    time: '2 days ago',
    status: 'responded',
    message: 'Dr. Chen recommended a crown at my last visit. How long does the same day crown appointment take, and will I need a follow-up visit afterward?'
  }
];

const SEED_PATIENTS: Patient[] = [
  { id: 1, name: 'Jennifer Martinez', phone: '(555) 234-1187', email: 'jmartinez@email.com', lastVisit: 'Jun 12, 2026', nextVisit: 'Today, 9:00 AM', balance: 0, notes: 'Prefers morning appointments. Cleaning every 6 months.' },
  { id: 2, name: 'Robert Thompson', phone: '(555) 342-8865', email: 'rthompson@email.com', lastVisit: 'Aug 2, 2026', nextVisit: 'Today, 9:30 AM', balance: 425, notes: 'Crown placement in progress. Balance is patient portion after Delta Dental.' },
  { id: 3, name: 'Lisa Wong', phone: '(555) 418-9902', email: 'lwong@email.com', lastVisit: 'Jul 28, 2026', nextVisit: 'Today, 10:00 AM', balance: 0, notes: 'Two children also seen here. Sees Dr. Rodriguez.' },
  { id: 4, name: 'David Kim', phone: '(555) 227-4431', email: 'dkim@email.com', lastVisit: 'New patient', nextVisit: 'Today, 10:30 AM', balance: 0, notes: 'New patient exam scheduled. Claimed $99 new patient special.' },
  { id: 5, name: 'Sarah Parker', phone: '(555) 665-1120', email: 'sparker@email.com', lastVisit: 'Mar 3, 2026', nextVisit: 'Today, 11:00 AM', balance: 60, notes: 'Invisalign consultation. Interested in financing options.' },
  { id: 6, name: 'Michael Brown', phone: '(555) 903-7748', email: 'mbrown@email.com', lastVisit: 'Jan 22, 2026', nextVisit: 'Today, 1:00 PM', balance: 180, notes: 'Emergency toothache, lower right molar. History of grinding.' }
];

const SEED_CLAIMS: Claim[] = [
  { id: 1, patient: 'Robert Thompson', insurer: 'Delta Dental', procedure: 'Crown (D2740)', amount: 1150, status: 'pending' },
  { id: 2, patient: 'Jennifer Martinez', insurer: 'Cigna', procedure: 'Prophylaxis (D1110)', amount: 180, status: 'paid' },
  { id: 3, patient: 'Michael Brown', insurer: 'MetLife', procedure: 'Emergency Exam (D0140)', amount: 320, status: 'pending' },
  { id: 4, patient: 'Sarah Parker', insurer: 'Aetna', procedure: 'Ortho Records (D8090)', amount: 250, status: 'pending' },
  { id: 5, patient: 'Lisa Wong', insurer: 'Guardian', procedure: 'Pediatric Exam (D0120)', amount: 120, status: 'paid' },
  { id: 6, patient: 'David Kim', insurer: 'Blue Cross', procedure: 'New Patient Exam (D0150)', amount: 99, status: 'paid' }
];

const FEES: Record<string, number> = {
  'Cleaning & Exam': 180,
  'Crown Placement': 1150,
  'Pediatric Checkup': 120,
  'New Patient Exam': 99,
  'Invisalign Consultation': 250,
  'Emergency: Toothache': 320,
  'Filling': 240,
  'Whitening Session': 350,
  'Invisalign Check': 150,
  'Root Canal': 950
};

const APPT_TYPES = Object.keys(FEES);
const DENTIST_OPTIONS = ['Dr. Johnson', 'Dr. Chen', 'Dr. Rodriguez'];
const TIME_SLOT_OPTIONS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

const PATIENT_POOL = ['Amanda Foster', 'Brian Lee', 'Carla Nguyen', 'Derek Hall', 'Elena Petrov', 'Frank Osborne', 'Grace Liu', 'Hector Ramirez'];
const TYPE_POOL = ['Cleaning & Exam', 'Filling', 'Crown Placement', 'Whitening Session', 'Invisalign Check', 'Pediatric Checkup'];
const GEN_TIME_POOL = ['8:30 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM'];

function timeToMinutes(t: string): number {
  const [hm, ap] = t.split(' ');
  const [h, m] = hm.split(':').map(Number);
  return ((h % 12) + (ap === 'PM' ? 12 : 0)) * 60 + m;
}

function dayOfWeek(dateStr: string): number {
  return new Date(dateStr + 'T12:00:00').getDay();
}

function generateScheduleFor(dateStr: string): Appointment[] {
  const day = dayOfWeek(dateStr);
  if (day === 0) return [];
  const hash = dateStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const count = day === 6 ? 3 : 4 + (hash % 3);
  const start = hash % GEN_TIME_POOL.length;
  const appts: Appointment[] = [];
  for (let i = 0; i < count; i++) {
    appts.push({
      id: hash * 100 + i,
      time: GEN_TIME_POOL[(start + i) % GEN_TIME_POOL.length],
      patient: PATIENT_POOL[(hash + i * 5) % PATIENT_POOL.length],
      type: TYPE_POOL[(hash + i * 2) % TYPE_POOL.length],
      dentist: DENTIST_OPTIONS[(hash + i) % DENTIST_OPTIONS.length],
      status: i === count - 1 ? 'pending' : 'confirmed',
      isNew: (hash + i) % 4 === 0
    });
  }
  return appts.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}

function Modal({ title, onClose, children, wide }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} max-h-[85vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#023e8a]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

type ActiveModal = null | 'addAppointment' | 'addPatient' | 'patientRecords' | 'billing' | 'messages';

export default function AdminView() {
  const todayKey = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [apptsByDate, setApptsByDate] = useState<Record<string, Appointment[]>>({ [todayKey]: SEED_APPOINTMENTS });
  const [inquiries, setInquiries] = useState<Inquiry[]>(SEED_INQUIRIES);
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS);
  const [claims, setClaims] = useState<Claim[]>(SEED_CLAIMS);
  const [hydrated, setHydrated] = useState(false);

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const [patientSearch, setPatientSearch] = useState('');
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null);
  const [billingFilter, setBillingFilter] = useState<'all' | 'pending' | 'paid'>('all');

  const [apptForm, setApptForm] = useState({ patient: '', date: todayKey, time: '', type: '', dentist: DENTIST_OPTIONS[0], isNew: false });
  const [apptAdded, setApptAdded] = useState(false);
  const [patientForm, setPatientForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [patientAdded, setPatientAdded] = useState(false);

  // Load persisted state once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.apptsByDate) setApptsByDate(stored.apptsByDate);
        if (stored.inquiries) setInquiries(stored.inquiries);
        if (stored.patients) setPatients(stored.patients);
      }
    } catch {
      // Corrupt or unavailable storage -- fall back to seed data
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ apptsByDate, inquiries, patients }));
    } catch {
      // Storage full or unavailable -- demo continues with in-memory state
    }
  }, [apptsByDate, inquiries, patients, hydrated]);

  // Generate a schedule for any date we have not seen yet
  useEffect(() => {
    if (!hydrated) return;
    setApptsByDate((prev) => {
      if (prev[selectedDate]) return prev;
      const list = selectedDate === todayKey ? SEED_APPOINTMENTS : generateScheduleFor(selectedDate);
      return { ...prev, [selectedDate]: list };
    });
  }, [selectedDate, hydrated, todayKey]);

  const selectedList = apptsByDate[selectedDate] ?? [];
  const todayList = apptsByDate[todayKey] ?? SEED_APPOINTMENTS;
  const isToday = selectedDate === todayKey;
  const isSunday = dayOfWeek(selectedDate) === 0;

  // Derived numbers: earlier-in-day baseline plus live list state
  const completedBase = isToday ? 5 : 0;
  const totalBase = isToday ? 6 : 0;
  const completedCount = completedBase + selectedList.filter((a) => a.status === 'completed').length;
  const totalCount = totalBase + selectedList.length;

  const todayCompletedFees = todayList
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + (FEES[a.type] ?? 150), 0);
  const todayRevenue = 4850 + todayCompletedFees;
  const todayTotal = 6 + todayList.length;
  const todayCompleted = 5 + todayList.filter((a) => a.status === 'completed').length;
  const todayUpcoming = todayTotal - todayCompleted;
  const pendingCount = 7 + todayList.filter((a) => a.status === 'pending').length;
  const newPatientsThisMonth = 24 + Math.max(0, patients.length - SEED_PATIENTS.length);

  const stats = [
    { label: "Today's Appointments", value: String(todayTotal), icon: <Calendar className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'New Patients This Month', value: String(newPatientsThisMonth), icon: <UserPlus className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Pending Appointments', value: String(pendingCount), icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Revenue Today', value: `$${todayRevenue.toLocaleString()}`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' }
  ];

  const handleApptAction = (id: number) => {
    setApptsByDate((prev) => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] ?? []).map((a) => {
        if (a.id !== id) return a;
        const next: ApptStatus =
          a.status === 'pending' ? 'confirmed'
          : a.status === 'urgent' ? 'confirmed'
          : a.status === 'confirmed' ? 'completed'
          : 'confirmed';
        return { ...a, status: next };
      })
    }));
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const date = apptForm.date || todayKey;
    const newAppt: Appointment = {
      id: Date.now(),
      time: apptForm.time,
      patient: apptForm.patient.trim(),
      type: apptForm.type,
      dentist: apptForm.dentist,
      status: 'confirmed',
      isNew: apptForm.isNew
    };
    setApptsByDate((prev) => {
      const base = prev[date] ?? (date === todayKey ? SEED_APPOINTMENTS : generateScheduleFor(date));
      const merged = [...base, newAppt].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
      return { ...prev, [date]: merged };
    });
    setSelectedDate(date);
    setApptAdded(true);
    setTimeout(() => {
      setApptAdded(false);
      setActiveModal(null);
      setApptForm({ patient: '', date: todayKey, time: '', type: '', dentist: DENTIST_OPTIONS[0], isNew: false });
    }, 1400);
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Date.now(),
      name: patientForm.name.trim(),
      phone: patientForm.phone.trim(),
      email: patientForm.email.trim(),
      lastVisit: 'New patient',
      nextVisit: 'Not scheduled',
      balance: 0,
      notes: patientForm.notes.trim() || 'Added from admin dashboard.'
    };
    setPatients((prev) => [newPatient, ...prev]);
    setPatientAdded(true);
    setTimeout(() => {
      setPatientAdded(false);
      setActiveModal(null);
      setPatientForm({ name: '', phone: '', email: '', notes: '' });
    }, 1400);
  };

  const markResponded = (id: number) => {
    setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'responded' } : q)));
  };

  const markClaimPaid = (id: number) => {
    setClaims((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'paid' } : c)));
  };

  const openMessage = (id: number | null) => {
    setSelectedInquiryId(id);
    setActiveModal('messages');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedInquiryId(null);
    setPatientSearch('');
    setExpandedPatientId(null);
  };

  const selectedInquiry = inquiries.find((q) => q.id === selectedInquiryId) ?? null;
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase())
  );
  const filteredClaims = claims.filter((c) => billingFilter === 'all' || c.status === billingFilter);
  const outstandingTotal = claims.filter((c) => c.status === 'pending').reduce((s, c) => s + c.amount, 0);
  const openClaimCount = claims.filter((c) => c.status === 'pending').length;

  const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent';

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
                  {isToday ? "Today's Schedule" : 'Schedule'}
                </h2>
                <input
                  type="date"
                  aria-label="Schedule date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                />
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{isToday ? 'Daily Progress' : `Progress for ${selectedDate}`}</span>
                  <span>{completedCount} of {totalCount} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] h-3 rounded-full transition-all"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Appointments List */}
              {isSunday && selectedList.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <Clock className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">Office closed on Sundays</p>
                  <p className="text-sm text-gray-500 mt-1">The emergency line remains available 24/7 at (555) 911-CARE.</p>
                </div>
              ) : selectedList.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">No appointments scheduled</p>
                  <p className="text-sm text-gray-500 mt-1">Use Quick Actions to add an appointment to this day.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedList.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        appointment.status === 'urgent'
                          ? 'border-red-300 bg-red-50'
                          : appointment.status === 'pending'
                          ? 'border-yellow-300 bg-yellow-50'
                          : appointment.status === 'completed'
                          ? 'border-gray-200 bg-gray-50 opacity-80'
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
                            <button
                              onClick={() => handleApptAction(appointment.id)}
                              title="Mark this appointment complete"
                              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Complete
                            </button>
                          ) : appointment.status === 'pending' ? (
                            <button
                              onClick={() => handleApptAction(appointment.id)}
                              title="Confirm this appointment"
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-all flex items-center gap-1"
                            >
                              <Clock className="w-4 h-4" />
                              Confirm
                            </button>
                          ) : appointment.status === 'urgent' ? (
                            <button
                              onClick={() => handleApptAction(appointment.id)}
                              title="Mark this emergency as triaged and confirmed"
                              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Triage
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApptAction(appointment.id)}
                              title="Undo completion"
                              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                {inquiries.slice(0, 3).map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => openMessage(inquiry.id)}
                    className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
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
                  </button>
                ))}
              </div>
              <button
                onClick={() => openMessage(null)}
                className="w-full mt-4 bg-[#0077b6] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#023e8a] transition-all"
              >
                View All Messages
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setApptForm((f) => ({ ...f, date: selectedDate }));
                    setActiveModal('addAppointment');
                  }}
                  className="w-full bg-[#48cae4] text-[#023e8a] px-4 py-3 rounded-lg font-semibold hover:bg-[#0077b6] hover:text-white transition-all flex items-center justify-between"
                >
                  <span>Add Appointment</span>
                  <Calendar className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveModal('addPatient')}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between"
                >
                  <span>Add New Patient</span>
                  <UserPlus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveModal('patientRecords')}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between"
                >
                  <span>Patient Records</span>
                  <FileText className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveModal('billing')}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-between"
                >
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
                  <span className="font-bold text-xl">{todayTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Completed</span>
                  <span className="font-bold text-xl text-green-300">{todayCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Upcoming</span>
                  <span className="font-bold text-xl text-yellow-300">{todayUpcoming}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                  <span className="text-blue-100">Revenue</span>
                  <span className="font-bold text-xl">${todayRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {activeModal === 'addAppointment' && (
        <Modal title="Add Appointment" onClose={closeModal}>
          {apptAdded ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-xl font-bold text-[#023e8a]">Appointment added to the schedule</p>
              <p className="text-gray-600 mt-1">{apptForm.patient} on {apptForm.date} at {apptForm.time}</p>
            </div>
          ) : (
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label htmlFor="admin-appt-patient" className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                <input
                  id="admin-appt-patient"
                  type="text"
                  required
                  value={apptForm.patient}
                  onChange={(e) => setApptForm({ ...apptForm, patient: e.target.value })}
                  className={inputClass}
                  placeholder="Full name"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-appt-date" className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    id="admin-appt-date"
                    type="date"
                    required
                    value={apptForm.date}
                    onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="admin-appt-time" className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                  <select
                    id="admin-appt-time"
                    required
                    value={apptForm.time}
                    onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select a time...</option>
                    {TIME_SLOT_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-appt-type" className="block text-sm font-semibold text-gray-700 mb-2">Visit Type *</label>
                  <select
                    id="admin-appt-type"
                    required
                    value={apptForm.type}
                    onChange={(e) => setApptForm({ ...apptForm, type: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select a type...</option>
                    {APPT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="admin-appt-dentist" className="block text-sm font-semibold text-gray-700 mb-2">Dentist *</label>
                  <select
                    id="admin-appt-dentist"
                    required
                    value={apptForm.dentist}
                    onChange={(e) => setApptForm({ ...apptForm, dentist: e.target.value })}
                    className={inputClass}
                  >
                    {DENTIST_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={apptForm.isNew}
                  onChange={(e) => setApptForm({ ...apptForm, isNew: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#0077b6] focus:ring-[#0077b6]"
                />
                This is a new patient
              </label>
              <button
                type="submit"
                className="w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#023e8a] transition-all"
              >
                Add to Schedule
              </button>
            </form>
          )}
        </Modal>
      )}

      {/* Add Patient Modal */}
      {activeModal === 'addPatient' && (
        <Modal title="Add New Patient" onClose={closeModal}>
          {patientAdded ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-xl font-bold text-[#023e8a]">Patient record created</p>
              <p className="text-gray-600 mt-1">{patientForm.name} was added to Patient Records.</p>
            </div>
          ) : (
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label htmlFor="admin-patient-name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  id="admin-patient-name"
                  type="text"
                  required
                  value={patientForm.name}
                  onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                  className={inputClass}
                  placeholder="Full name"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-patient-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    id="admin-patient-phone"
                    type="tel"
                    required
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    className={inputClass}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="admin-patient-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="admin-patient-email"
                    type="email"
                    value={patientForm.email}
                    onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                    className={inputClass}
                    placeholder="name@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="admin-patient-notes" className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  id="admin-patient-notes"
                  rows={3}
                  value={patientForm.notes}
                  onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Insurance, referral source, medical notes..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0077b6] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#023e8a] transition-all"
              >
                Create Patient Record
              </button>
            </form>
          )}
        </Modal>
      )}

      {/* Patient Records Modal */}
      {activeModal === 'patientRecords' && (
        <Modal title="Patient Records" onClose={closeModal} wide>
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search patients"
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className={`${inputClass} pl-10`}
              placeholder="Search patients by name..."
            />
          </div>
          {filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No patients match "{patientSearch}".</p>
          ) : (
            <div className="space-y-2">
              {filteredPatients.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedPatientId(expandedPatientId === p.id ? null : p.id)}
                    className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.phone}{p.email ? ` • ${p.email}` : ''}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${p.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {p.balance > 0 ? `Balance: $${p.balance}` : 'Paid in full'}
                      </div>
                      <div className="text-xs text-gray-500">Last visit: {p.lastVisit}</div>
                    </div>
                  </button>
                  {expandedPatientId === p.id && (
                    <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-700 space-y-2">
                      <div className="grid md:grid-cols-2 gap-2">
                        <div><span className="font-semibold text-[#023e8a]">Next visit:</span> {p.nextVisit}</div>
                        <div><span className="font-semibold text-[#023e8a]">Account balance:</span> ${p.balance}</div>
                      </div>
                      <div><span className="font-semibold text-[#023e8a]">Notes:</span> {p.notes}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setActiveModal('addPatient')}
            className="w-full mt-4 bg-[#48cae4] text-[#023e8a] px-4 py-3 rounded-lg font-semibold hover:bg-[#0077b6] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add New Patient
          </button>
        </Modal>
      )}

      {/* Billing & Insurance Modal */}
      {activeModal === 'billing' && (
        <Modal title="Billing & Insurance" onClose={closeModal} wide>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="text-sm text-green-700 mb-1">Collected This Month</div>
              <div className="text-2xl font-bold text-green-900">$87,450</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
              <div className="text-sm text-red-700 mb-1">Outstanding Claims</div>
              <div className="text-2xl font-bold text-red-900">${outstandingTotal.toLocaleString()}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="text-sm text-blue-700 mb-1">Open Claims</div>
              <div className="text-2xl font-bold text-blue-900">{openClaimCount}</div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {(['all', 'pending', 'paid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setBillingFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billingFilter === f
                    ? 'bg-[#0077b6] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'All Claims' : f === 'pending' ? 'Pending' : 'Paid'}
              </button>
            ))}
          </div>

          {filteredClaims.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No {billingFilter} claims.</p>
          ) : (
            <div className="space-y-2">
              {filteredClaims.map((c) => (
                <div key={c.id} className="border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{c.patient}</div>
                    <div className="text-sm text-gray-500">{c.procedure} • {c.insurer}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-[#023e8a]">${c.amount.toLocaleString()}</div>
                    {c.status === 'pending' ? (
                      <button
                        onClick={() => markClaimPaid(c.id)}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-100 hover:text-green-800 transition-all"
                        title="Mark this claim as paid"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Paid
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {/* Messages Modal */}
      {activeModal === 'messages' && (
        <Modal title={selectedInquiry ? 'Message Detail' : 'All Messages'} onClose={closeModal} wide>
          {selectedInquiry ? (
            <div>
              <button
                onClick={() => setSelectedInquiryId(null)}
                className="flex items-center gap-2 text-[#0077b6] font-semibold hover:text-[#023e8a] transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all messages
              </button>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xl font-bold text-gray-900">{selectedInquiry.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    {selectedInquiry.contact.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    {selectedInquiry.contact}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{selectedInquiry.time}</div>
                  {selectedInquiry.status === 'new' ? (
                    <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                  ) : (
                    <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Responded</span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-2">
                <div className="text-sm font-semibold text-[#023e8a] mb-2">Subject: {selectedInquiry.subject}</div>
                <p className="text-gray-700 leading-relaxed">{selectedInquiry.message}</p>
              </div>
              {selectedInquiry.status === 'new' ? (
                <button
                  onClick={() => markResponded(selectedInquiry.id)}
                  className="w-full mt-4 bg-[#0077b6] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#023e8a] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark as Responded
                </button>
              ) : (
                <p className="text-center text-sm text-green-700 mt-4 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  This inquiry has been responded to.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {inquiries.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedInquiryId(q.id)}
                  className="w-full text-left border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-gray-900">{q.name}</div>
                    {q.status === 'new' ? (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Responded</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{q.subject}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-500">{q.contact}</div>
                    <div className="text-xs text-gray-500">{q.time}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
