import React, { useEffect, useState } from 'react';
import {
  Settings,
  FileText,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Wrench,
  MapPin,
  X,
  Trash2,
  Search,
  Plus
} from 'lucide-react';

type JobStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed';

interface Job {
  id: string;
  customer: string;
  service: string;
  status: JobStatus;
  technician: string;
  time: string;
  priority: 'high' | 'normal';
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Invoice {
  id: string;
  customer: string;
  service: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
}

interface EmergencyCall {
  id: string;
  caller: string;
  issue: string;
  area: string;
  received: string;
}

interface AdminSettings {
  businessName: string;
  phone: string;
  email: string;
  responseTarget: string;
  notifyEmergency: boolean;
  notifyInvoices: boolean;
}

const STORAGE_KEY = 'plumbing-demo-admin-v1';

const technicianNames = ['Mike T.', 'Tom B.', 'Sarah L.', 'John D.'];

const serviceOptions = [
  'Drain Cleaning',
  'Leak Detection',
  'Leak Repair',
  'Water Heater Installation',
  'Water Heater Repair',
  'Pipe Repair',
  'Fixture Installation',
  'Sewer Line Inspection',
  'Sewer Line Repair',
  'Hydro-Jetting',
  'Emergency Service',
  'Other'
];

const defaultJobs: Job[] = [
  { id: 'JOB-1234', customer: 'Sarah Johnson', service: 'Emergency Leak Repair', status: 'In Progress', technician: 'Mike T.', time: '2 hours ago', priority: 'high' },
  { id: 'JOB-1235', customer: 'Robert Chen', service: 'Water Heater Installation', status: 'Scheduled', technician: 'Tom B.', time: 'Tomorrow 9:00 AM', priority: 'normal' },
  { id: 'JOB-1236', customer: 'Lisa Martinez', service: 'Drain Cleaning', status: 'Completed', technician: 'Mike T.', time: '1 hour ago', priority: 'normal' },
  { id: 'JOB-1237', customer: 'David Wilson', service: 'Sewer Line Inspection', status: 'Pending', technician: 'Unassigned', time: 'Today 2:00 PM', priority: 'normal' },
  { id: 'JOB-1238', customer: 'Karen Mitchell', service: 'Fixture Installation', status: 'Scheduled', technician: 'Sarah L.', time: 'Friday 10:00 AM', priority: 'normal' },
  { id: 'JOB-1239', customer: 'Steve Douglas', service: 'Hydro-Jetting', status: 'Completed', technician: 'John D.', time: 'Yesterday', priority: 'normal' }
];

const defaultCustomers: Customer[] = [
  { id: 'CUST-101', name: 'Sarah Johnson', phone: '(555) 201-3341', email: 'sarah.j@example.com', address: '12 Oak Street, Downtown' },
  { id: 'CUST-102', name: 'Robert Chen', phone: '(555) 204-8820', email: 'r.chen@example.com', address: '48 Birch Lane, North Hills' },
  { id: 'CUST-103', name: 'Lisa Martinez', phone: '(555) 209-1174', email: 'lisa.m@example.com', address: '230 Cedar Avenue, West End' },
  { id: 'CUST-104', name: 'David Wilson', phone: '(555) 212-6633', email: 'd.wilson@example.com', address: '75 Elm Court, East Harbor' },
  { id: 'CUST-105', name: 'Karen Mitchell', phone: '(555) 218-9057', email: 'karen.m@example.com', address: '19 Maple Drive, Suburbs' },
  { id: 'CUST-106', name: 'Steve Douglas', phone: '(555) 223-4415', email: 's.douglas@example.com', address: '310 Pine Street, South District' }
];

const defaultInvoices: Invoice[] = [
  { id: 'INV-2042', customer: 'Sarah Johnson', service: 'Emergency Leak Repair', amount: 540, status: 'Pending', date: 'Nov 2, 2024' },
  { id: 'INV-2041', customer: 'Lisa Martinez', service: 'Drain Cleaning', amount: 285, status: 'Paid', date: 'Oct 28, 2024' },
  { id: 'INV-2040', customer: 'Steve Douglas', service: 'Hydro-Jetting', amount: 450, status: 'Paid', date: 'Oct 25, 2024' },
  { id: 'INV-2039', customer: 'Miller Office Group', service: 'Backflow Testing', amount: 1200, status: 'Overdue', date: 'Oct 12, 2024' },
  { id: 'INV-2038', customer: 'Robert Chen', service: 'Water Heater Deposit', amount: 600, status: 'Paid', date: 'Oct 10, 2024' }
];

const defaultEmergencyQueue: EmergencyCall[] = [
  { id: 'EM-501', caller: 'Gloria Sanchez', issue: 'Burst pipe in kitchen', area: 'Downtown', received: '12 min ago' },
  { id: 'EM-502', caller: 'Hank Peterson', issue: 'Sewer backup in basement', area: 'North Hills', received: '25 min ago' },
  { id: 'EM-503', caller: "Rivera's Cafe", issue: 'Water heater leaking near electrical', area: 'West End', received: '41 min ago' }
];

const defaultSettings: AdminSettings = {
  businessName: 'Premier Plumbing Pros',
  phone: '(555) 765-8237',
  email: 'info@premierplumbing.com',
  responseTarget: '60 minutes',
  notifyEmergency: true,
  notifyInvoices: true
};

const reportPeriods = ['This Week', 'This Month', 'This Quarter'] as const;
type ReportPeriod = (typeof reportPeriods)[number];

const reportData: Record<
  ReportPeriod,
  {
    revenue: string;
    jobs: number;
    newCustomers: number;
    avgTicket: string;
    topServices: { name: string; revenue: string; pct: number }[];
  }
> = {
  'This Week': {
    revenue: '$11,240',
    jobs: 34,
    newCustomers: 9,
    avgTicket: '$331',
    topServices: [
      { name: 'Drain Cleaning', revenue: '$3,120', pct: 28 },
      { name: 'Water Heaters', revenue: '$2,890', pct: 26 },
      { name: 'Leak Repair', revenue: '$2,240', pct: 20 },
      { name: 'Sewer Lines', revenue: '$1,760', pct: 16 },
      { name: 'Fixtures', revenue: '$1,230', pct: 10 }
    ]
  },
  'This Month': {
    revenue: '$48,500',
    jobs: 142,
    newCustomers: 31,
    avgTicket: '$342',
    topServices: [
      { name: 'Water Heaters', revenue: '$13,580', pct: 28 },
      { name: 'Drain Cleaning', revenue: '$11,640', pct: 24 },
      { name: 'Sewer Lines', revenue: '$9,700', pct: 20 },
      { name: 'Leak Repair', revenue: '$8,245', pct: 17 },
      { name: 'Fixtures', revenue: '$5,335', pct: 11 }
    ]
  },
  'This Quarter': {
    revenue: '$139,800',
    jobs: 415,
    newCustomers: 87,
    avgTicket: '$337',
    topServices: [
      { name: 'Water Heaters', revenue: '$39,144', pct: 28 },
      { name: 'Sewer Lines', revenue: '$32,154', pct: 23 },
      { name: 'Drain Cleaning', revenue: '$29,358', pct: 21 },
      { name: 'Leak Repair', revenue: '$23,766', pct: 17 },
      { name: 'Fixtures', revenue: '$15,378', pct: 11 }
    ]
  }
};

const technicians = [
  { name: 'Mike Thompson', status: 'On Job', location: 'Downtown', jobs: 3 },
  { name: 'Tom Bradley', status: 'Available', location: 'Office', jobs: 2 },
  { name: 'Sarah Lee', status: 'On Job', location: 'North Side', jobs: 4 },
  { name: 'John Davis', status: 'Break', location: 'West End', jobs: 2 }
];

const statusBadgeClass = (status: JobStatus) =>
  status === 'Completed'
    ? 'bg-green-100 text-green-700'
    : status === 'In Progress'
      ? 'bg-blue-100 text-blue-700'
      : status === 'Scheduled'
        ? 'bg-purple-100 text-purple-700'
        : 'bg-gray-100 text-gray-700';

const invoiceBadgeClass = (status: Invoice['status']) =>
  status === 'Paid'
    ? 'bg-green-100 text-green-700'
    : status === 'Pending'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-red-100 text-red-700';

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US')}`;

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [invoices, setInvoices] = useState<Invoice[]>(defaultInvoices);
  const [emergencyQueue, setEmergencyQueue] = useState<EmergencyCall[]>(defaultEmergencyQueue);
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [hydrated, setHydrated] = useState(false);

  const [jobFilter, setJobFilter] = useState<'All' | JobStatus>('All');
  const [customerSearch, setCustomerSearch] = useState('');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('This Month');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [dispatchTech, setDispatchTech] = useState<Record<string, string>>({});
  const [dispatchConfirmation, setDispatchConfirmation] = useState('');

  const [newJobForm, setNewJobForm] = useState({
    customer: '',
    service: serviceOptions[0],
    technician: 'Unassigned',
    time: '',
    priority: 'normal' as 'normal' | 'high'
  });
  const [newCustomerForm, setNewCustomerForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [newInvoiceForm, setNewInvoiceForm] = useState({ customer: '', service: serviceOptions[0], amount: '' });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        if (Array.isArray(stored.jobs)) setJobs(stored.jobs);
        if (Array.isArray(stored.customers)) setCustomers(stored.customers);
        if (Array.isArray(stored.invoices)) setInvoices(stored.invoices);
        if (Array.isArray(stored.emergencyQueue)) setEmergencyQueue(stored.emergencyQueue);
        if (stored.settings) setSettings({ ...defaultSettings, ...stored.settings });
      }
    } catch {
      // Corrupted store -- fall back to defaults
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ jobs, customers, invoices, emergencyQueue, settings })
    );
  }, [jobs, customers, invoices, emergencyQueue, settings, hydrated]);

  const nextJobId = () => {
    const max = jobs.reduce((acc, job) => {
      const num = parseInt(job.id.replace('JOB-', ''), 10);
      return Number.isNaN(num) ? acc : Math.max(acc, num);
    }, 1233);
    return `JOB-${max + 1}`;
  };

  const nextInvoiceId = () => {
    const max = invoices.reduce((acc, invoice) => {
      const num = parseInt(invoice.id.replace('INV-', ''), 10);
      return Number.isNaN(num) ? acc : Math.max(acc, num);
    }, 2037);
    return `INV-${max + 1}`;
  };

  const nextCustomerId = () => {
    const max = customers.reduce((acc, customer) => {
      const num = parseInt(customer.id.replace('CUST-', ''), 10);
      return Number.isNaN(num) ? acc : Math.max(acc, num);
    }, 100);
    return `CUST-${max + 1}`;
  };

  const updateJob = (id: string, changes: Partial<Job>) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...changes } : job)));
    setActiveJob((prev) => (prev && prev.id === id ? { ...prev, ...changes } : prev));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setActiveJob((prev) => (prev && prev.id === id ? null : prev));
  };

  const handleNewJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = {
      id: nextJobId(),
      customer: newJobForm.customer.trim(),
      service: newJobForm.service,
      status: newJobForm.technician === 'Unassigned' ? 'Pending' : 'Scheduled',
      technician: newJobForm.technician,
      time: newJobForm.time.trim() || 'To be scheduled',
      priority: newJobForm.priority
    };
    setJobs((prev) => [job, ...prev]);
    setShowNewJobModal(false);
    setNewJobForm({ customer: '', service: serviceOptions[0], technician: 'Unassigned', time: '', priority: 'normal' });
    setActiveTab('jobs');
    setJobFilter('All');
  };

  const handleDispatch = (call: EmergencyCall) => {
    const tech = dispatchTech[call.id] || 'Tom B.';
    const job: Job = {
      id: nextJobId(),
      customer: call.caller,
      service: `Emergency: ${call.issue}`,
      status: 'In Progress',
      technician: tech,
      time: 'Dispatched just now',
      priority: 'high'
    };
    setJobs((prev) => [job, ...prev]);
    setEmergencyQueue((prev) => prev.filter((item) => item.id !== call.id));
    setDispatchConfirmation(`${tech} dispatched to ${call.caller} (${call.area}).`);
  };

  const handleNewCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: nextCustomerId(),
      name: newCustomerForm.name.trim(),
      phone: newCustomerForm.phone.trim(),
      email: newCustomerForm.email.trim(),
      address: newCustomerForm.address.trim()
    };
    setCustomers((prev) => [customer, ...prev]);
    setShowNewCustomerModal(false);
    setNewCustomerForm({ name: '', phone: '', email: '', address: '' });
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    setActiveCustomer((prev) => (prev && prev.id === id ? null : prev));
  };

  const handleNewInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newInvoiceForm.amount);
    if (Number.isNaN(amount) || amount <= 0) return;
    const invoice: Invoice = {
      id: nextInvoiceId(),
      customer: newInvoiceForm.customer.trim(),
      service: newInvoiceForm.service,
      amount: Math.round(amount),
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setInvoices((prev) => [invoice, ...prev]);
    setShowNewInvoiceModal(false);
    setNewInvoiceForm({ customer: '', service: serviceOptions[0], amount: '' });
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) => prev.map((invoice) => (invoice.id === id ? { ...invoice, status: 'Paid' } : invoice)));
  };

  const stats = [
    { label: 'Pending Jobs', value: String(jobs.filter((j) => j.status === 'Pending').length), icon: FileText, color: 'bg-blue-500' },
    { label: 'Scheduled Jobs', value: String(jobs.filter((j) => j.status === 'Scheduled').length), icon: Calendar, color: 'bg-green-500' },
    { label: 'Active Technicians', value: String(technicians.length), icon: Users, color: 'bg-purple-500' },
    { label: 'Monthly Revenue', value: reportData['This Month'].revenue, icon: DollarSign, color: 'bg-yellow-500' }
  ];

  const filteredJobs = jobFilter === 'All' ? jobs : jobs.filter((job) => job.status === jobFilter);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearch.trim().toLowerCase())
  );

  const outstandingTotal = invoices
    .filter((invoice) => invoice.status !== 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const collectedTotal = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const jobsForCustomer = (name: string) => jobs.filter((job) => job.customer === name);

  const renderJobCard = (job: Job, compact: boolean) => (
    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#0466c8] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900">{job.id}</span>
            {job.priority === 'high' && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                URGENT
              </span>
            )}
          </div>
          <p className="text-gray-600">{job.customer}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadgeClass(job.status)}`}>
          {job.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{job.service}</p>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{job.technician}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{job.time}</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveJob(job)}
            className="text-[#0466c8] font-semibold hover:text-[#0353a4]"
          >
            View Details
          </button>
          {!compact && (
            <button
              onClick={() => deleteJob(job.id)}
              aria-label={`Delete ${job.id}`}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Jobs & Technicians */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-[#0466c8] font-semibold hover:text-[#0353a4] text-sm"
            >
              View All Jobs →
            </button>
          </div>
          <div className="space-y-4">
            {jobs.slice(0, 4).map((job) => renderJobCard(job, true))}
          </div>
        </div>

        {/* Technician Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Technician Status</h2>
          <div className="space-y-4">
            {technicians.map((tech, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{tech.name}</p>
                  <span className={`w-3 h-3 rounded-full ${
                    tech.status === 'Available' ? 'bg-green-500' :
                    tech.status === 'On Job' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}></span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{tech.status}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{tech.location}</span>
                  </span>
                  <span>{tech.jobs} jobs today</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
        <button
          onClick={() => setShowNewJobModal(true)}
          className="bg-[#0466c8] hover:bg-[#0353a4] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Job</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {(['All', 'Pending', 'Scheduled', 'In Progress', 'Completed'] as const).map((status) => {
          const count = status === 'All' ? jobs.length : jobs.filter((job) => job.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setJobFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                jobFilter === status
                  ? 'bg-[#0466c8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>
      {filteredJobs.length === 0 ? (
        <p className="text-gray-600 py-8 text-center">
          No {jobFilter === 'All' ? '' : jobFilter.toLowerCase() + ' '}jobs right now. Create one with the New Job button.
        </p>
      ) : (
        <div className="space-y-4">{filteredJobs.map((job) => renderJobCard(job, false))}</div>
      )}
    </div>
  );

  const renderCustomers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Database</h2>
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="bg-[#0466c8] hover:bg-[#0353a4] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </button>
      </div>
      <div className="relative mb-6">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          aria-label="Search customers"
          placeholder="Search customers by name..."
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
        />
      </div>
      {filteredCustomers.length === 0 ? (
        <p className="text-gray-600 py-8 text-center">No customers match that search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#0466c8] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-500">{customer.id}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                  {jobsForCustomer(customer.name).length} job{jobsForCustomer(customer.name).length === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{customer.phone}</p>
              <p className="text-sm text-gray-600">{customer.email}</p>
              <p className="text-sm text-gray-600 mb-3">{customer.address}</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveCustomer(customer)}
                  className="text-[#0466c8] font-semibold hover:text-[#0353a4] text-sm"
                >
                  View History
                </button>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                  aria-label={`Delete ${customer.name}`}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderInvoicing = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm text-gray-600">Collected</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(collectedTotal)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm text-gray-600">Outstanding</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(outstandingTotal)}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Invoicing & Payments</h2>
          <button
            onClick={() => setShowNewInvoiceModal(true)}
            className="bg-[#0466c8] hover:bg-[#0353a4] text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Invoice</span>
          </button>
        </div>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">{invoice.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${invoiceBadgeClass(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{invoice.customer} -- {invoice.service}</p>
                <p className="text-xs text-gray-500">{invoice.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-xl font-bold text-gray-900">{formatCurrency(invoice.amount)}</p>
                {invoice.status !== 'Paid' && (
                  <button
                    onClick={() => markInvoicePaid(invoice.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Mark Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => {
    const data = reportData[reportPeriod];
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <div className="flex space-x-2">
            {reportPeriods.map((period) => (
              <button
                key={period}
                onClick={() => setReportPeriod(period)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  reportPeriod === period
                    ? 'bg-[#0466c8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{data.revenue}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Jobs Completed</p>
            <p className="text-2xl font-bold text-gray-900">{data.jobs}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">New Customers</p>
            <p className="text-2xl font-bold text-gray-900">{data.newCustomers}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Avg. Ticket</p>
            <p className="text-2xl font-bold text-gray-900">{data.avgTicket}</p>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Service ({reportPeriod})</h3>
        <div className="space-y-4">
          {data.topServices.map((service) => (
            <div key={service.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-semibold text-gray-900">{service.name}</span>
                <span className="text-gray-600">{service.revenue} ({service.pct}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#0466c8] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${service.pct}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSettingsSaved(true);
        }}
        className="space-y-5"
      >
        <div>
          <label htmlFor="plumbing-admin-business-name" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            id="plumbing-admin-business-name"
            type="text"
            value={settings.businessName}
            onChange={(e) => {
              setSettings({ ...settings, businessName: e.target.value });
              setSettingsSaved(false);
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="plumbing-admin-phone" className="block text-sm font-medium text-gray-700 mb-2">
              Dispatch Phone
            </label>
            <input
              id="plumbing-admin-phone"
              type="text"
              value={settings.phone}
              onChange={(e) => {
                setSettings({ ...settings, phone: e.target.value });
                setSettingsSaved(false);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="plumbing-admin-email" className="block text-sm font-medium text-gray-700 mb-2">
              Office Email
            </label>
            <input
              id="plumbing-admin-email"
              type="email"
              value={settings.email}
              onChange={(e) => {
                setSettings({ ...settings, email: e.target.value });
                setSettingsSaved(false);
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label htmlFor="plumbing-admin-response" className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Response Target
          </label>
          <select
            id="plumbing-admin-response"
            value={settings.responseTarget}
            onChange={(e) => {
              setSettings({ ...settings, responseTarget: e.target.value });
              setSettingsSaved(false);
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
          >
            <option>30 minutes</option>
            <option>45 minutes</option>
            <option>60 minutes</option>
            <option>90 minutes</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifyEmergency}
              onChange={(e) => {
                setSettings({ ...settings, notifyEmergency: e.target.checked });
                setSettingsSaved(false);
              }}
              className="h-5 w-5 rounded border-gray-300 text-[#0466c8] focus:ring-[#0466c8]"
            />
            <span className="text-gray-700">Notify all technicians on new emergency calls</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifyInvoices}
              onChange={(e) => {
                setSettings({ ...settings, notifyInvoices: e.target.checked });
                setSettingsSaved(false);
              }}
              className="h-5 w-5 rounded border-gray-300 text-[#0466c8] focus:ring-[#0466c8]"
            />
            <span className="text-gray-700">Email reminders for overdue invoices</span>
          </label>
        </div>
        {settingsSaved && (
          <p className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>Settings saved.</span>
          </p>
        )}
        <button
          type="submit"
          className="bg-[#0466c8] hover:bg-[#0353a4] text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'jobs':
        return renderJobs();
      case 'customers':
        return renderCustomers();
      case 'invoicing':
        return renderInvoicing();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#023e7d] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#0466c8] p-2 rounded-lg">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{settings.businessName}</h1>
                <p className="text-sm text-blue-200">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setDispatchConfirmation('');
                  setShowEmergencyModal(true);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency Queue ({emergencyQueue.length})</span>
              </button>
              <button
                onClick={() => setShowNewJobModal(true)}
                className="bg-[#0466c8] hover:bg-[#0353a4] px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                New Job
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'jobs', label: 'Jobs', icon: Wrench },
                { id: 'customers', label: 'Customers', icon: Users },
                { id: 'invoicing', label: 'Invoicing', icon: DollarSign },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#0466c8] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Job Detail Modal */}
      {activeJob && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveJob(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#023e7d] p-6 text-white flex items-start justify-between rounded-t-2xl">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold">{activeJob.id}</h3>
                  {activeJob.priority === 'high' && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-blue-200">{activeJob.customer}</p>
              </div>
              <button
                onClick={() => setActiveJob(null)}
                aria-label="Close job details"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Service</p>
                  <p className="font-semibold text-gray-900">{activeJob.service}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Scheduled</p>
                  <p className="font-semibold text-gray-900">{activeJob.time}</p>
                </div>
              </div>
              <div>
                <label htmlFor="plumbing-admin-job-status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="plumbing-admin-job-status"
                  value={activeJob.status}
                  onChange={(e) => updateJob(activeJob.id, { status: e.target.value as JobStatus })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                >
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="plumbing-admin-job-tech" className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Technician
                </label>
                <select
                  id="plumbing-admin-job-tech"
                  value={activeJob.technician}
                  onChange={(e) => updateJob(activeJob.id, { technician: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                >
                  <option>Unassigned</option>
                  {technicianNames.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="plumbing-admin-job-priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="plumbing-admin-job-priority"
                  value={activeJob.priority}
                  onChange={(e) => updateJob(activeJob.id, { priority: e.target.value as 'high' | 'normal' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="high">Urgent</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setActiveJob(null)}
                  className="flex-1 bg-[#0466c8] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => deleteJob(activeJob.id)}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {activeCustomer && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveCustomer(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#023e7d] p-6 text-white flex items-start justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold mb-1">{activeCustomer.name}</h3>
                <p className="text-blue-200 text-sm">{activeCustomer.id}</p>
              </div>
              <button
                onClick={() => setActiveCustomer(null)}
                aria-label="Close customer details"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <p className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#0466c8]" />
                  <span>{activeCustomer.phone}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-[#0466c8]" />
                  <span>{activeCustomer.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#0466c8]" />
                  <span>{activeCustomer.address}</span>
                </p>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Job History</h4>
              {jobsForCustomer(activeCustomer.name).length === 0 ? (
                <p className="text-gray-600 text-sm mb-6">No jobs on file for this customer yet.</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {jobsForCustomer(activeCustomer.name).map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{job.id}</p>
                        <p className="text-sm text-gray-600">{job.service}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => {
                  setNewJobForm({ ...newJobForm, customer: activeCustomer.name });
                  setActiveCustomer(null);
                  setShowNewJobModal(true);
                }}
                className="w-full bg-[#0466c8] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Create Job for {activeCustomer.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Job Modal */}
      {showNewJobModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewJobModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#023e7d] p-6 text-white flex items-start justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold">Create New Job</h3>
              <button
                onClick={() => setShowNewJobModal(false)}
                aria-label="Close new job form"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNewJobSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="plumbing-admin-new-job-customer" className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  id="plumbing-admin-new-job-customer"
                  type="text"
                  required
                  value={newJobForm.customer}
                  onChange={(e) => setNewJobForm({ ...newJobForm, customer: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label htmlFor="plumbing-admin-new-job-service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  id="plumbing-admin-new-job-service"
                  value={newJobForm.service}
                  onChange={(e) => setNewJobForm({ ...newJobForm, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                >
                  {serviceOptions.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="plumbing-admin-new-job-tech" className="block text-sm font-medium text-gray-700 mb-2">
                    Technician
                  </label>
                  <select
                    id="plumbing-admin-new-job-tech"
                    value={newJobForm.technician}
                    onChange={(e) => setNewJobForm({ ...newJobForm, technician: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  >
                    <option>Unassigned</option>
                    {technicianNames.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="plumbing-admin-new-job-priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="plumbing-admin-new-job-priority"
                    value={newJobForm.priority}
                    onChange={(e) => setNewJobForm({ ...newJobForm, priority: e.target.value as 'normal' | 'high' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="plumbing-admin-new-job-time" className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Time
                </label>
                <input
                  id="plumbing-admin-new-job-time"
                  type="text"
                  value={newJobForm.time}
                  onChange={(e) => setNewJobForm({ ...newJobForm, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  placeholder="e.g. Tomorrow 9:00 AM"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0466c8] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Create Job
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewCustomerModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#023e7d] p-6 text-white flex items-start justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold">Add Customer</h3>
              <button
                onClick={() => setShowNewCustomerModal(false)}
                aria-label="Close add customer form"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNewCustomerSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="plumbing-admin-new-cust-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="plumbing-admin-new-cust-name"
                  type="text"
                  required
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="plumbing-admin-new-cust-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    id="plumbing-admin-new-cust-phone"
                    type="tel"
                    required
                    value={newCustomerForm.phone}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="plumbing-admin-new-cust-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="plumbing-admin-new-cust-email"
                    type="email"
                    value={newCustomerForm.email}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="plumbing-admin-new-cust-address" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Address
                </label>
                <input
                  id="plumbing-admin-new-cust-address"
                  type="text"
                  value={newCustomerForm.address}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0466c8] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Add Customer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewInvoiceModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#023e7d] p-6 text-white flex items-start justify-between rounded-t-2xl">
              <h3 className="text-xl font-bold">Create Invoice</h3>
              <button
                onClick={() => setShowNewInvoiceModal(false)}
                aria-label="Close create invoice form"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNewInvoiceSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="plumbing-admin-new-inv-customer" className="block text-sm font-medium text-gray-700 mb-2">
                  Customer *
                </label>
                <input
                  id="plumbing-admin-new-inv-customer"
                  type="text"
                  required
                  list="plumbing-admin-customer-list"
                  value={newInvoiceForm.customer}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, customer: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  placeholder="Customer name"
                />
                <datalist id="plumbing-admin-customer-list">
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="plumbing-admin-new-inv-service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  id="plumbing-admin-new-inv-service"
                  value={newInvoiceForm.service}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                >
                  {serviceOptions.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="plumbing-admin-new-inv-amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD) *
                </label>
                <input
                  id="plumbing-admin-new-inv-amount"
                  type="number"
                  required
                  min="1"
                  step="1"
                  value={newInvoiceForm.amount}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                  placeholder="450"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0466c8] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#0353a4] transition-colors"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Queue Modal */}
      {showEmergencyModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowEmergencyModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-600 p-6 text-white flex items-start justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold mb-1">Emergency Queue</h3>
                <p className="text-red-100 text-sm">
                  {emergencyQueue.length === 0
                    ? 'All emergency calls handled'
                    : `${emergencyQueue.length} call${emergencyQueue.length === 1 ? '' : 's'} waiting for dispatch`}
                </p>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                aria-label="Close emergency queue"
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {dispatchConfirmation && (
                <p className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{dispatchConfirmation}</span>
                </p>
              )}
              {emergencyQueue.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-900 font-bold mb-1">Queue clear</p>
                  <p className="text-gray-600 text-sm">
                    No emergency calls waiting right now. New calls will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {emergencyQueue.map((call) => (
                    <div key={call.id} className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{call.caller}</p>
                          <p className="text-sm text-gray-700">{call.issue}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{call.received}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-3">
                        <MapPin className="h-3 w-3" />
                        <span>{call.area}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          aria-label={`Technician for ${call.caller}`}
                          value={dispatchTech[call.id] || 'Tom B.'}
                          onChange={(e) =>
                            setDispatchTech({ ...dispatchTech, [call.id]: e.target.value })
                          }
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          {technicianNames.map((name) => (
                            <option key={name}>{name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDispatch(call)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                          Dispatch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
