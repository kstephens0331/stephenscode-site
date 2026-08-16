import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Wrench,
  Clock,
  TrendingUp,
  AlertCircle,
  Search,
  Plus,
  X,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Truck,
} from 'lucide-react';

interface ServiceCall {
  id: number;
  customer: string;
  service: string;
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Emergency';
  tech: string;
}

interface Appointment {
  id: number;
  day: string;
  time: string;
  customer: string;
  service: string;
  address: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  plan: string;
  lastService: string;
}

interface Invoice {
  id: number;
  number: string;
  customer: string;
  service: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

interface Estimate {
  id: number;
  customer: string;
  service: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Declined';
}

interface AdminSettings {
  companyName: string;
  phone: string;
  emergencyLine: string;
  email: string;
  notifyNewLeads: boolean;
  notifyDailySummary: boolean;
  notifyEmergencies: boolean;
}

interface AdminData {
  serviceCalls: ServiceCall[];
  appointments: Appointment[];
  customers: Customer[];
  invoices: Invoice[];
  estimates: Estimate[];
  settings: AdminSettings;
}

const STORAGE_KEY = 'hvac-demo-admin-v1';

const TECHS = ['Mike Johnson', 'Tom Brown', 'Sarah Williams', 'Lisa Chen', 'Available'];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const defaultData: AdminData = {
  serviceCalls: [
    { id: 1, customer: 'John Smith', service: 'AC Repair', time: '9:00 AM', status: 'In Progress', tech: 'Mike Johnson' },
    { id: 2, customer: 'Sarah Davis', service: 'Heating Install', time: '11:00 AM', status: 'Scheduled', tech: 'Tom Brown' },
    { id: 3, customer: 'Robert Wilson', service: 'Maintenance', time: '1:00 PM', status: 'Completed', tech: 'Mike Johnson' },
    { id: 4, customer: 'Emily Chen', service: 'Emergency AC', time: '2:30 PM', status: 'Emergency', tech: 'Available' },
  ],
  appointments: [
    { id: 1, day: 'Monday', time: '3:00 PM', customer: 'David Lee', service: 'AC Tune-up', address: '123 Oak St' },
    { id: 2, day: 'Monday', time: '4:30 PM', customer: 'Lisa Martinez', service: 'Duct Cleaning', address: '456 Maple Ave' },
    { id: 3, day: 'Tuesday', time: '9:00 AM', customer: 'James Taylor', service: 'Thermostat Install', address: '789 Pine Rd' },
    { id: 4, day: 'Wednesday', time: '10:30 AM', customer: 'Karen White', service: 'Furnace Inspection', address: '221 Birch Ln' },
    { id: 5, day: 'Thursday', time: '1:00 PM', customer: 'Thomas Garcia', service: 'Air Purifier Install', address: '87 Cedar Ct' },
    { id: 6, day: 'Friday', time: '11:00 AM', customer: 'Patricia Lee', service: 'AC Repair', address: '509 Elm St' },
  ],
  customers: [
    { id: 1, name: 'John Smith', phone: '(555) 201-1184', email: 'john.smith@email.com', address: '412 Oak St', plan: 'Total Comfort', lastService: 'May 12, 2024' },
    { id: 2, name: 'Sarah Davis', phone: '(555) 203-9921', email: 'sarah.davis@email.com', address: '87 Willow Ave', plan: 'Basic Care', lastService: 'Apr 30, 2024' },
    { id: 3, name: 'Robert Wilson', phone: '(555) 207-4410', email: 'r.wilson@email.com', address: '15 Summit Dr', plan: 'VIP Protection', lastService: 'May 14, 2024' },
    { id: 4, name: 'Emily Chen', phone: '(555) 208-3372', email: 'emily.chen@email.com', address: '901 Lakeshore Blvd', plan: 'None', lastService: 'May 15, 2024' },
    { id: 5, name: 'David Lee', phone: '(555) 210-6688', email: 'david.lee@email.com', address: '123 Oak St', plan: 'Basic Care', lastService: 'Mar 22, 2024' },
    { id: 6, name: 'Lisa Martinez', phone: '(555) 214-0057', email: 'lmartinez@email.com', address: '456 Maple Ave', plan: 'Total Comfort', lastService: 'Feb 18, 2024' },
  ],
  invoices: [
    { id: 1, number: 'INV-1041', customer: 'Robert Wilson', service: 'Seasonal Maintenance', amount: 159, date: 'May 14, 2024', status: 'Paid' },
    { id: 2, number: 'INV-1042', customer: 'John Smith', service: 'AC Compressor Repair', amount: 1240, date: 'May 12, 2024', status: 'Paid' },
    { id: 3, number: 'INV-1043', customer: 'Karen White', service: 'Furnace Repair', amount: 385, date: 'May 10, 2024', status: 'Pending' },
    { id: 4, number: 'INV-1044', customer: 'Michael Brown', service: 'Commercial RTU Service', amount: 2150, date: 'May 8, 2024', status: 'Paid' },
    { id: 5, number: 'INV-1045', customer: 'Lisa Martinez', service: 'Duct Cleaning', amount: 399, date: 'May 6, 2024', status: 'Overdue' },
    { id: 6, number: 'INV-1046', customer: 'James Taylor', service: 'Heat Pump Install (deposit)', amount: 3500, date: 'May 3, 2024', status: 'Paid' },
  ],
  estimates: [
    { id: 1, customer: 'Emily Chen', service: 'AC Replacement', amount: 4800, status: 'Pending' },
    { id: 2, customer: 'Thomas Garcia', service: 'Whole-Home Air Purifier', amount: 1450, status: 'Pending' },
    { id: 3, customer: 'Patricia Lee', service: 'Smart Thermostat + Zoning', amount: 890, status: 'Pending' },
  ],
  settings: {
    companyName: 'Cool Breeze HVAC',
    phone: '(555) 123-4567',
    emergencyLine: '(555) COOL-NOW',
    email: 'info@coolbreezehvac.com',
    notifyNewLeads: true,
    notifyDailySummary: true,
    notifyEmergencies: true,
  },
};

function loadData(): AdminData {
  if (typeof window === 'undefined') return defaultData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as Partial<AdminData>;
    return {
      ...defaultData,
      ...parsed,
      settings: { ...defaultData.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return defaultData;
  }
}

type ModalType = 'service-call' | 'estimate' | 'dispatch' | 'emergency' | 'customer' | 'invoice' | 'appointment' | null;

export default function AdminView() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [data, setData] = useState<AdminData>(loadData);
  const [modal, setModal] = useState<ModalType>(null);
  const [toast, setToast] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [reportPeriod, setReportPeriod] = useState<'quarter' | 'year'>('quarter');
  const [settingsDraft, setSettingsDraft] = useState<AdminSettings>(data.settings);

  // Generic modal form state (fields reused per modal type)
  const [form, setForm] = useState({
    customer: '',
    service: '',
    time: '',
    day: 'Monday',
    address: '',
    phone: '',
    email: '',
    plan: 'None',
    amount: '',
    tech: TECHS[0],
    callId: 0,
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage unavailable (private mode) -- state still works in-memory
    }
  }, [data]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const nextId = (items: { id: number }[]) =>
    items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

  const resetForm = () =>
    setForm({
      customer: '',
      service: '',
      time: '',
      day: 'Monday',
      address: '',
      phone: '',
      email: '',
      plan: 'None',
      amount: '',
      tech: TECHS[0],
      callId: 0,
    });

  const openModal = (type: ModalType) => {
    resetForm();
    if (type === 'dispatch') {
      const firstOpen = data.serviceCalls.find((c) => c.tech === 'Available' || c.status === 'Emergency');
      setForm((prev) => ({ ...prev, callId: firstOpen ? firstOpen.id : data.serviceCalls[0]?.id ?? 0, tech: 'Mike Johnson' }));
    }
    setModal(type);
  };

  const closeModal = () => setModal(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------- Actions ----------

  const addServiceCall = (status: ServiceCall['status']) => {
    if (!form.customer.trim() || !form.service.trim()) return;
    const call: ServiceCall = {
      id: nextId(data.serviceCalls),
      customer: form.customer.trim(),
      service: form.service.trim(),
      time: form.time.trim() || 'ASAP',
      status,
      tech: status === 'Emergency' ? 'Available' : form.tech,
    };
    setData({ ...data, serviceCalls: [...data.serviceCalls, call] });
    setToast(status === 'Emergency' ? 'Emergency request logged -- dispatch a technician' : 'Service call scheduled');
    closeModal();
  };

  const addEstimate = () => {
    if (!form.customer.trim() || !form.service.trim() || !form.amount) return;
    const estimate: Estimate = {
      id: nextId(data.estimates),
      customer: form.customer.trim(),
      service: form.service.trim(),
      amount: Number(form.amount) || 0,
      status: 'Pending',
    };
    setData({ ...data, estimates: [...data.estimates, estimate] });
    setToast('Estimate created and sent to customer');
    closeModal();
  };

  const setEstimateStatus = (id: number, status: Estimate['status']) => {
    setData({
      ...data,
      estimates: data.estimates.map((est) => (est.id === id ? { ...est, status } : est)),
    });
    setToast(status === 'Approved' ? 'Estimate approved' : 'Estimate declined');
  };

  const dispatchTech = () => {
    if (!form.callId) return;
    setData({
      ...data,
      serviceCalls: data.serviceCalls.map((call) =>
        call.id === form.callId
          ? {
              ...call,
              tech: form.tech,
              status: call.status === 'Emergency' || call.status === 'Scheduled' ? 'In Progress' : call.status,
            }
          : call
      ),
    });
    setToast(`${form.tech} dispatched`);
    closeModal();
  };

  const setCallStatus = (id: number, status: ServiceCall['status']) => {
    setData({
      ...data,
      serviceCalls: data.serviceCalls.map((call) => (call.id === id ? { ...call, status } : call)),
    });
    setToast(`Call marked ${status.toLowerCase()}`);
  };

  const addCustomer = () => {
    if (!form.customer.trim() || !form.phone.trim()) return;
    const customer: Customer = {
      id: nextId(data.customers),
      name: form.customer.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || 'not provided',
      address: form.address.trim() || 'not provided',
      plan: form.plan,
      lastService: 'New customer',
    };
    setData({ ...data, customers: [...data.customers, customer] });
    setToast('Customer added');
    closeModal();
  };

  const removeCustomer = (id: number) => {
    setData({ ...data, customers: data.customers.filter((c) => c.id !== id) });
    setToast('Customer removed');
  };

  const addInvoice = () => {
    if (!form.customer.trim() || !form.service.trim() || !form.amount) return;
    const invoice: Invoice = {
      id: nextId(data.invoices),
      number: `INV-${1040 + nextId(data.invoices)}`,
      customer: form.customer.trim(),
      service: form.service.trim(),
      amount: Number(form.amount) || 0,
      date: 'Today',
      status: 'Pending',
    };
    setData({ ...data, invoices: [invoice, ...data.invoices] });
    setToast('Invoice created');
    closeModal();
  };

  const markInvoicePaid = (id: number) => {
    setData({
      ...data,
      invoices: data.invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv)),
    });
    setToast('Invoice marked paid');
  };

  const addAppointment = () => {
    if (!form.customer.trim() || !form.service.trim() || !form.time.trim()) return;
    const appointment: Appointment = {
      id: nextId(data.appointments),
      day: form.day,
      time: form.time.trim(),
      customer: form.customer.trim(),
      service: form.service.trim(),
      address: form.address.trim() || 'Address on file',
    };
    setData({ ...data, appointments: [...data.appointments, appointment] });
    setToast('Appointment added to calendar');
    closeModal();
  };

  const removeAppointment = (id: number) => {
    setData({ ...data, appointments: data.appointments.filter((a) => a.id !== id) });
    setToast('Appointment removed');
  };

  const saveSettings = () => {
    setData({ ...data, settings: settingsDraft });
    setToast('Settings saved');
  };

  // ---------- Derived values ----------

  const pendingEstimates = data.estimates.filter((e) => e.status === 'Pending');
  const paidRevenue = data.invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstanding = data.invoices
    .filter((inv) => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const stats = [
    { label: 'Service Calls Today', value: String(data.serviceCalls.length), icon: Wrench, color: 'text-[#003049]' },
    { label: 'Pending Estimates', value: String(pendingEstimates.length), icon: FileText, color: 'text-[#d62828]' },
    { label: 'Revenue This Week', value: `$${paidRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-[#f77f00]' },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: TrendingUp, color: 'text-green-600' },
  ];

  const filteredCustomers = data.customers.filter((c) => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return [c.name, c.phone, c.email, c.address, c.plan].join(' ').toLowerCase().includes(q);
  });

  const reportData =
    reportPeriod === 'quarter'
      ? [
          { label: 'Mar', value: 68200 },
          { label: 'Apr', value: 74900 },
          { label: 'May', value: 81400 },
        ]
      : [
          { label: 'Q1', value: 182000 },
          { label: 'Q2', value: 214500 },
          { label: 'Q3', value: 248900 },
          { label: 'Q4', value: 196300 },
        ];
  const reportMax = Math.max(...reportData.map((d) => d.value));

  const serviceMix = [
    { label: 'AC Repair & Service', value: 38, color: 'bg-[#003049]' },
    { label: 'Installations', value: 27, color: 'bg-[#f77f00]' },
    { label: 'Maintenance Plans', value: 18, color: 'bg-[#4a90d9]' },
    { label: 'Emergency Calls', value: 11, color: 'bg-[#d62828]' },
    { label: 'Air Quality', value: 6, color: 'bg-gray-400' },
  ];

  const statusBadge = (status: string) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Completed' || status === 'Paid' || status === 'Approved'
          ? 'bg-green-100 text-green-800'
          : status === 'Emergency' || status === 'Overdue' || status === 'Declined'
          ? 'bg-red-100 text-red-800'
          : status === 'In Progress'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {status}
    </span>
  );

  // ---------- Sections ----------

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#003049]">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#003049]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#003049]">{stat.value}</p>
              </div>
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Service Calls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#003049]">Today&apos;s Service Calls</h2>
          <button
            onClick={() => openModal('service-call')}
            className="bg-[#003049] text-white px-4 py-2 rounded-lg hover:bg-[#004d73] transition"
          >
            New Service Call
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.serviceCalls.map((call) => (
                <tr key={call.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{call.time}</td>
                  <td className="py-3 px-4 font-medium">{call.customer}</td>
                  <td className="py-3 px-4">{call.service}</td>
                  <td className="py-3 px-4">{call.tech}</td>
                  <td className="py-3 px-4">{statusBadge(call.status)}</td>
                  <td className="py-3 px-4">
                    {call.status !== 'Completed' ? (
                      <button
                        onClick={() => setCallStatus(call.id, 'Completed')}
                        className="text-sm text-[#003049] font-semibold hover:text-[#f77f00] transition"
                      >
                        Mark Complete
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Appointments + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#003049] flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Upcoming Appointments
            </h2>
            <button
              onClick={() => setActiveSection('calendar')}
              className="text-sm text-[#003049] font-semibold hover:text-[#f77f00] transition"
            >
              View Calendar →
            </button>
          </div>
          <div className="space-y-4">
            {data.appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="border-l-4 border-[#f77f00] pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-[#003049]">{apt.day} {apt.time}, {apt.customer}</p>
                    <p className="text-sm text-gray-600">{apt.service}</p>
                    <p className="text-xs text-gray-500">{apt.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#003049] to-[#004d73] text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => openModal('service-call')}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left"
            >
              Schedule New Service Call
            </button>
            <button
              onClick={() => openModal('estimate')}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left"
            >
              Create Estimate
            </button>
            <button
              onClick={() => openModal('dispatch')}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg transition text-left"
            >
              Dispatch Technician
            </button>
            <button
              onClick={() => openModal('emergency')}
              className="w-full bg-[#d62828] hover:bg-[#b11f1f] text-white px-4 py-3 rounded-lg transition text-left font-semibold"
            >
              Emergency Service Request
            </button>
          </div>
        </div>
      </div>

      {/* Pending Estimates */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#003049]">Pending Estimates</h2>
          <button
            onClick={() => openModal('estimate')}
            className="text-sm text-[#003049] font-semibold hover:text-[#f77f00] transition"
          >
            + New Estimate
          </button>
        </div>
        {pendingEstimates.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending estimates. Nice work clearing the queue.</p>
        ) : (
          <div className="space-y-3">
            {pendingEstimates.map((est) => (
              <div key={est.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="font-bold text-[#003049]">{est.customer}</p>
                  <p className="text-sm text-gray-600">{est.service}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#003049]">${est.amount.toLocaleString()}</span>
                  <button
                    onClick={() => setEstimateStatus(est.id, 'Approved')}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setEstimateStatus(est.id, 'Declined')}
                    className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#003049]">Customers</h1>
        <button
          onClick={() => openModal('customer')}
          className="bg-[#003049] text-white px-4 py-2 rounded-lg hover:bg-[#004d73] transition flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            aria-label="Search customers"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            placeholder="Search by name, phone, email, or plan..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="border-2 border-gray-100 rounded-xl p-5 hover:border-[#f77f00] transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-11 h-11 bg-[#003049] text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {customer.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-[#003049]">{customer.name}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        customer.plan === 'None'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-orange-100 text-[#e07000]'
                      }`}
                    >
                      {customer.plan === 'None' ? 'No plan' : `${customer.plan} plan`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeCustomer(customer.id)}
                  aria-label={`Remove ${customer.name}`}
                  className="text-gray-400 hover:text-[#d62828] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600">
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-[#f77f00]" />{customer.phone}</p>
                <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-[#f77f00]" />{customer.email}</p>
                <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-[#f77f00]" />{customer.address}</p>
                <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-[#f77f00]" />Last service: {customer.lastService}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <p className="text-center text-gray-500 py-8">No customers match that search.</p>
        )}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#003049]">This Week&apos;s Schedule</h1>
        <button
          onClick={() => openModal('appointment')}
          className="bg-[#003049] text-white px-4 py-2 rounded-lg hover:bg-[#004d73] transition flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {WEEK_DAYS.map((day) => {
          const dayAppointments = data.appointments
            .filter((a) => a.day === day)
            .sort((a, b) => a.time.localeCompare(b.time));
          return (
            <div key={day} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#003049] text-white px-4 py-3 flex items-center justify-between">
                <p className="font-bold">{day}</p>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {dayAppointments.length} job{dayAppointments.length === 1 ? '' : 's'}
                </span>
              </div>
              <div className="p-4 space-y-3 min-h-[100px]">
                {dayAppointments.length === 0 ? (
                  <p className="text-sm text-gray-400">No appointments</p>
                ) : (
                  dayAppointments.map((apt) => (
                    <div key={apt.id} className="border-l-4 border-[#f77f00] bg-gray-50 rounded-r-lg pl-3 pr-2 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-[#003049] text-sm">{apt.time}, {apt.customer}</p>
                          <p className="text-xs text-gray-600">{apt.service}</p>
                          <p className="text-xs text-gray-400">{apt.address}</p>
                        </div>
                        <button
                          onClick={() => removeAppointment(apt.id)}
                          aria-label={`Remove appointment for ${apt.customer}`}
                          className="text-gray-300 hover:text-[#d62828] transition flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#003049]">Invoices</h1>
        <button
          onClick={() => openModal('invoice')}
          className="bg-[#003049] text-white px-4 py-2 rounded-lg hover:bg-[#004d73] transition flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-1">Collected</p>
          <p className="text-3xl font-bold text-[#003049]">${paidRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 mb-1">Outstanding</p>
          <p className="text-3xl font-bold text-[#003049]">${outstanding.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#003049]">
          <p className="text-sm text-gray-600 mb-1">Total Invoices</p>
          <p className="text-3xl font-bold text-[#003049]">{data.invoices.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{invoice.number}</td>
                  <td className="py-3 px-4">{invoice.customer}</td>
                  <td className="py-3 px-4">{invoice.service}</td>
                  <td className="py-3 px-4">{invoice.date}</td>
                  <td className="py-3 px-4 font-bold">${invoice.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">{statusBadge(invoice.status)}</td>
                  <td className="py-3 px-4">
                    {invoice.status !== 'Paid' ? (
                      <button
                        onClick={() => markInvoicePaid(invoice.id)}
                        className="text-sm text-[#003049] font-semibold hover:text-[#f77f00] transition"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#003049]">Reports</h1>
        <div className="flex bg-white rounded-lg shadow overflow-hidden">
          <button
            onClick={() => setReportPeriod('quarter')}
            className={`px-5 py-2 font-semibold text-sm transition ${
              reportPeriod === 'quarter' ? 'bg-[#003049] text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Last 3 Months
          </button>
          <button
            onClick={() => setReportPeriod('year')}
            className={`px-5 py-2 font-semibold text-sm transition ${
              reportPeriod === 'year' ? 'bg-[#003049] text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Last Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003049] mb-6">
            Revenue -- {reportPeriod === 'quarter' ? 'Last 3 Months' : 'Last Year'}
          </h2>
          <div className="flex items-end gap-6 h-56">
            {reportData.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <p className="text-sm font-bold text-[#003049] mb-2">
                  ${(bar.value / 1000).toFixed(0)}k
                </p>
                <div
                  className="w-full bg-gradient-to-t from-[#003049] to-[#4a90d9] rounded-t-lg transition-all duration-500"
                  style={{ height: `${(bar.value / reportMax) * 100}%` }}
                />
                <p className="text-sm text-gray-600 mt-2 font-semibold">{bar.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003049] mb-6">Service Mix</h2>
          <div className="space-y-4">
            {serviceMix.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="font-bold text-[#003049]">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-4xl font-bold text-[#003049] mb-1">
            {data.serviceCalls.filter((c) => c.status === 'Completed').length}/{data.serviceCalls.length}
          </p>
          <p className="text-gray-600 text-sm">Calls completed today</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-4xl font-bold text-[#003049] mb-1">
            {data.estimates.filter((e) => e.status === 'Approved').length}
          </p>
          <p className="text-gray-600 text-sm">Estimates approved</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <p className="text-4xl font-bold text-[#003049] mb-1">{data.customers.length}</p>
          <p className="text-gray-600 text-sm">Active customers</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#003049]">Settings</h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#003049] mb-6">Company Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hvac-admin-company" className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              id="hvac-admin-company"
              type="text"
              value={settingsDraft.companyName}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, companyName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="hvac-admin-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="hvac-admin-email"
              type="email"
              value={settingsDraft.email}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="hvac-admin-phone" className="block text-sm font-semibold text-gray-700 mb-2">Main Phone</label>
            <input
              id="hvac-admin-phone"
              type="tel"
              value={settingsDraft.phone}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="hvac-admin-emergency" className="block text-sm font-semibold text-gray-700 mb-2">Emergency Line</label>
            <input
              id="hvac-admin-emergency"
              type="tel"
              value={settingsDraft.emergencyLine}
              onChange={(e) => setSettingsDraft({ ...settingsDraft, emergencyLine: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#003049] mb-6">Notifications</h2>
        <div className="space-y-4">
          {(
            [
              { key: 'notifyNewLeads', label: 'New lead alerts', description: 'Get notified when a website visitor submits a service request' },
              { key: 'notifyDailySummary', label: 'Daily summary', description: 'Morning recap of today\'s schedule and outstanding invoices' },
              { key: 'notifyEmergencies', label: 'Emergency dispatch alerts', description: 'Immediate alert when an emergency call comes in' },
            ] as { key: 'notifyNewLeads' | 'notifyDailySummary' | 'notifyEmergencies'; label: string; description: string }[]
          ).map((item) => (
            <div key={item.key} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div>
                <p className="font-semibold text-[#003049]">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={settingsDraft[item.key]}
                aria-label={item.label}
                onClick={() =>
                  setSettingsDraft({ ...settingsDraft, [item.key]: !settingsDraft[item.key] })
                }
                className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ${
                  settingsDraft[item.key] ? 'bg-[#f77f00]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-all ${
                    settingsDraft[item.key] ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="bg-[#003049] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004d73] transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );

  // ---------- Modal ----------

  const renderModal = () => {
    if (!modal) return null;

    const titles: Record<Exclude<ModalType, null>, string> = {
      'service-call': 'Schedule Service Call',
      estimate: 'Create Estimate',
      dispatch: 'Dispatch Technician',
      emergency: 'Emergency Service Request',
      customer: 'Add Customer',
      invoice: 'New Invoice',
      appointment: 'Add Appointment',
    };

    const inputClass =
      'w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#003049] focus:outline-none';

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`p-5 flex items-center justify-between text-white ${
              modal === 'emergency' ? 'bg-[#d62828]' : 'bg-[#003049]'
            }`}
          >
            <h2 className="text-xl font-bold flex items-center">
              {modal === 'emergency' && <AlertCircle className="w-6 h-6 mr-2" />}
              {modal === 'dispatch' && <Truck className="w-6 h-6 mr-2" />}
              {titles[modal]}
            </h2>
            <button onClick={closeModal} aria-label="Close" className="text-white/80 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {modal === 'dispatch' ? (
              <>
                <div>
                  <label htmlFor="hvac-admin-dispatch-call" className="block text-sm font-semibold text-gray-700 mb-2">Service Call</label>
                  <select
                    id="hvac-admin-dispatch-call"
                    name="callId"
                    value={form.callId}
                    onChange={(e) => setForm({ ...form, callId: Number(e.target.value) })}
                    className={inputClass}
                  >
                    {data.serviceCalls
                      .filter((c) => c.status !== 'Completed')
                      .map((call) => (
                        <option key={call.id} value={call.id}>
                          {call.time} -- {call.customer} ({call.service}) -- currently: {call.tech}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="hvac-admin-dispatch-tech" className="block text-sm font-semibold text-gray-700 mb-2">Technician</label>
                  <select
                    id="hvac-admin-dispatch-tech"
                    name="tech"
                    value={form.tech}
                    onChange={handleFormChange}
                    className={inputClass}
                  >
                    {TECHS.filter((t) => t !== 'Available').map((tech) => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={dispatchTech}
                  className="w-full bg-[#003049] text-white py-3 rounded-lg font-bold hover:bg-[#004d73] transition"
                >
                  Dispatch Now
                </button>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="hvac-admin-form-customer" className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    id="hvac-admin-form-customer"
                    type="text"
                    name="customer"
                    value={form.customer}
                    onChange={handleFormChange}
                    placeholder="Customer name"
                    className={inputClass}
                  />
                </div>

                {(modal === 'service-call' || modal === 'estimate' || modal === 'emergency' || modal === 'invoice' || modal === 'appointment') && (
                  <div>
                    <label htmlFor="hvac-admin-form-service" className="block text-sm font-semibold text-gray-700 mb-2">
                      {modal === 'emergency' ? 'Emergency Issue *' : 'Service *'}
                    </label>
                    <input
                      id="hvac-admin-form-service"
                      type="text"
                      name="service"
                      value={form.service}
                      onChange={handleFormChange}
                      placeholder={modal === 'emergency' ? 'e.g. No AC, gas smell, water leak' : 'e.g. AC Repair'}
                      className={inputClass}
                    />
                  </div>
                )}

                {(modal === 'service-call' || modal === 'appointment') && (
                  <div>
                    <label htmlFor="hvac-admin-form-time" className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                    <input
                      id="hvac-admin-form-time"
                      type="text"
                      name="time"
                      value={form.time}
                      onChange={handleFormChange}
                      placeholder="e.g. 3:30 PM"
                      className={inputClass}
                    />
                  </div>
                )}

                {modal === 'appointment' && (
                  <div>
                    <label htmlFor="hvac-admin-form-day" className="block text-sm font-semibold text-gray-700 mb-2">Day *</label>
                    <select
                      id="hvac-admin-form-day"
                      name="day"
                      value={form.day}
                      onChange={handleFormChange}
                      className={inputClass}
                    >
                      {WEEK_DAYS.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                )}

                {modal === 'service-call' && (
                  <div>
                    <label htmlFor="hvac-admin-form-tech" className="block text-sm font-semibold text-gray-700 mb-2">Assign Technician</label>
                    <select
                      id="hvac-admin-form-tech"
                      name="tech"
                      value={form.tech}
                      onChange={handleFormChange}
                      className={inputClass}
                    >
                      {TECHS.map((tech) => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>
                )}

                {(modal === 'estimate' || modal === 'invoice') && (
                  <div>
                    <label htmlFor="hvac-admin-form-amount" className="block text-sm font-semibold text-gray-700 mb-2">Amount ($) *</label>
                    <input
                      id="hvac-admin-form-amount"
                      type="number"
                      name="amount"
                      min="0"
                      value={form.amount}
                      onChange={handleFormChange}
                      placeholder="0"
                      className={inputClass}
                    />
                  </div>
                )}

                {(modal === 'customer' || modal === 'emergency') && (
                  <div>
                    <label htmlFor="hvac-admin-form-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone {modal === 'customer' ? '*' : ''}
                    </label>
                    <input
                      id="hvac-admin-form-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </div>
                )}

                {modal === 'customer' && (
                  <>
                    <div>
                      <label htmlFor="hvac-admin-form-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        id="hvac-admin-form-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="customer@email.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="hvac-admin-form-plan" className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Plan</label>
                      <select
                        id="hvac-admin-form-plan"
                        name="plan"
                        value={form.plan}
                        onChange={handleFormChange}
                        className={inputClass}
                      >
                        <option value="None">None</option>
                        <option value="Basic Care">Basic Care</option>
                        <option value="Total Comfort">Total Comfort</option>
                        <option value="VIP Protection">VIP Protection</option>
                      </select>
                    </div>
                  </>
                )}

                {(modal === 'customer' || modal === 'appointment' || modal === 'emergency') && (
                  <div>
                    <label htmlFor="hvac-admin-form-address" className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      id="hvac-admin-form-address"
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleFormChange}
                      placeholder="Street address"
                      className={inputClass}
                    />
                  </div>
                )}

                {modal === 'emergency' && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-sm text-red-800">
                    Emergency requests jump to the top of the dispatch queue. Assign a technician
                    from the Dispatch Technician action once logged.
                  </div>
                )}

                <button
                  onClick={() => {
                    if (modal === 'service-call') addServiceCall('Scheduled');
                    else if (modal === 'emergency') addServiceCall('Emergency');
                    else if (modal === 'estimate') addEstimate();
                    else if (modal === 'customer') addCustomer();
                    else if (modal === 'invoice') addInvoice();
                    else if (modal === 'appointment') addAppointment();
                  }}
                  className={`w-full text-white py-3 rounded-lg font-bold transition ${
                    modal === 'emergency'
                      ? 'bg-[#d62828] hover:bg-[#b11f1f]'
                      : 'bg-[#003049] hover:bg-[#004d73]'
                  }`}
                >
                  {modal === 'emergency' ? 'Log Emergency Request' : titles[modal]}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-[#003049] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{data.settings.companyName}: Admin Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Admin User</span>
              <div className="w-10 h-10 bg-[#f77f00] rounded-full flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-4 h-fit lg:sticky lg:top-8">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'invoices', label: 'Invoices', icon: DollarSign },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeSection === item.id
                      ? 'bg-[#003049] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection === 'customers' && renderCustomers()}
            {activeSection === 'calendar' && renderCalendar()}
            {activeSection === 'invoices' && renderInvoices()}
            {activeSection === 'reports' && renderReports()}
            {activeSection === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      {renderModal()}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#003049] text-white px-6 py-3 rounded-lg shadow-2xl flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
}
