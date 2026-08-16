import React, { useEffect, useState } from 'react';
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  Plus,
  X,
  Upload,
  XCircle,
} from 'lucide-react';

/* ---------- Types ---------- */

interface AdminClient {
  name: string;
  type: string;
  service: string;
  status: 'Active' | 'Pending';
  value: string;
  lastContact: string;
}

interface AdminAppointment {
  id: number;
  client: string;
  advisor: string;
  type: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface AdminTask {
  id: number;
  task: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  done: boolean;
}

interface AdminDocument {
  name: string;
  client: string;
  category: string;
  date: string;
  size: string;
}

interface AdminNotification {
  id: number;
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

interface AdminSettings {
  emailAlerts: boolean;
  taskReminders: boolean;
  weeklySummary: boolean;
}

/* ---------- Storage helpers ---------- */

const STORAGE_KEYS = {
  clients: 'demo_accounting_admin_clients',
  appointments: 'demo_accounting_admin_appointments',
  tasks: 'demo_accounting_admin_tasks',
  documents: 'demo_accounting_admin_documents',
  settings: 'demo_accounting_admin_settings',
};

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable; admin state simply won't persist
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateInput(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/* ---------- Initial data ---------- */

const INITIAL_CLIENTS: AdminClient[] = [
  { name: 'Sarah Johnson', type: 'Business Owner', service: 'Tax Planning', status: 'Active', value: '$450K', lastContact: '2 days ago' },
  { name: 'Michael Torres', type: 'Retired Executive', service: 'Wealth Management', status: 'Active', value: '$1.2M', lastContact: '5 days ago' },
  { name: 'Jennifer Liu', type: 'Tech Entrepreneur', service: 'Investment Advisory', status: 'Active', value: '$875K', lastContact: '1 week ago' },
  { name: 'David Patel', type: 'Small Business', service: 'Business Accounting', status: 'Pending', value: '$180K', lastContact: '3 days ago' },
];

const INITIAL_APPOINTMENTS: AdminAppointment[] = [
  { id: 1, client: 'Robert Williams', advisor: 'Robert Thompson', type: 'Q4 Review', time: 'Today, 2:00 PM', status: 'confirmed' },
  { id: 2, client: 'Emily Chen', advisor: 'Linda Martinez', type: 'Tax Planning', time: 'Today, 4:30 PM', status: 'confirmed' },
  { id: 3, client: 'James Anderson', advisor: 'David Chen', type: 'Portfolio Review', time: 'Tomorrow, 10:00 AM', status: 'pending' },
  { id: 4, client: 'Maria Garcia', advisor: 'Robert Thompson', type: 'Estate Planning', time: 'Tomorrow, 2:00 PM', status: 'confirmed' },
];

const INITIAL_TASKS: AdminTask[] = [
  { id: 1, task: 'Review tax documents for Johnson LLC', assignee: 'Linda Martinez', priority: 'High', due: 'Today', done: false },
  { id: 2, task: 'Prepare Q4 investment report for Torres', assignee: 'David Chen', priority: 'Medium', due: 'Tomorrow', done: false },
  { id: 3, task: 'Complete estate planning docs for Liu', assignee: 'Robert Thompson', priority: 'High', due: 'This Week', done: false },
  { id: 4, task: 'Follow up on consultation request', assignee: 'Linda Martinez', priority: 'Low', due: 'Next Week', done: false },
];

const INITIAL_DOCUMENTS: AdminDocument[] = [
  { name: '2023 Form 1040 - Final', client: 'Sarah Johnson', category: 'Tax Return', date: 'Oct 15, 2024', size: '1.8 MB' },
  { name: 'Q3 Portfolio Statement', client: 'Michael Torres', category: 'Investment', date: 'Nov 1, 2024', size: '2.3 MB' },
  { name: 'Revocable Trust Draft v2', client: 'Jennifer Liu', category: 'Estate', date: 'Sep 28, 2024', size: '3.1 MB' },
  { name: 'September Bookkeeping Package', client: 'David Patel', category: 'Accounting', date: 'Oct 5, 2024', size: '4.6 MB' },
  { name: 'Entity Structuring Memo', client: 'Sarah Johnson', category: 'Advisory', date: 'Aug 22, 2024', size: '0.7 MB' },
  { name: 'Q4 Estimated Tax Vouchers', client: 'Michael Torres', category: 'Tax Return', date: 'Sep 12, 2024', size: '0.4 MB' },
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  { id: 1, title: 'New consultation request', detail: 'Website lead: small business owner asking about bookkeeping services.', time: '25 min ago', read: false },
  { id: 2, title: 'Client document uploaded', detail: 'Michael Torres uploaded 3 files to his secure folder.', time: '2 hours ago', read: false },
  { id: 3, title: 'Deadline reminder', detail: 'Q4 estimated tax payments are due January 15 for 12 clients.', time: 'Yesterday', read: false },
];

const ADVISORS = ['Robert Thompson', 'Linda Martinez', 'David Chen'];
const TIME_SLOTS = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
const CLIENT_TYPES = ['Business Owner', 'Retired Executive', 'Tech Entrepreneur', 'Small Business', 'Individual', 'High Net Worth'];
const SERVICES = ['Tax Planning', 'Wealth Management', 'Investment Advisory', 'Business Accounting', 'Estate Planning', 'Payroll Services'];
const DOC_CATEGORIES = ['Tax Return', 'Investment', 'Estate', 'Accounting', 'Advisory', 'Payroll'];

/* ---------- Shared modal shell ---------- */

function ModalShell({ title, onClose, children }: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button aria-label="Close dialog" onClick={onClose} className="absolute inset-0 bg-black/60 cursor-default" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#14213d] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Modals ---------- */

function AddClientModal({ onClose, onAdd }: { onClose: () => void; onAdd: (client: AdminClient) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState(CLIENT_TYPES[0]);
  const [service, setService] = useState(SERVICES[0]);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      type,
      service,
      status: 'Pending',
      value: value.trim() ? (value.trim().startsWith('$') ? value.trim() : `$${value.trim()}`) : '$0',
      lastContact: 'Just now',
    });
    onClose();
  };

  return (
    <ModalShell title="Add New Client" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-client-name" className="block text-sm font-semibold text-gray-700 mb-1">Client Name</label>
          <input id="admin-client-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-client-type" className="block text-sm font-semibold text-gray-700 mb-1">Client Type</label>
            <select id="admin-client-type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {CLIENT_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="admin-client-service" className="block text-sm font-semibold text-gray-700 mb-1">Primary Service</label>
            <select id="admin-client-service" value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {SERVICES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="admin-client-value" className="block text-sm font-semibold text-gray-700 mb-1">AUM / Engagement Value</label>
          <input id="admin-client-value" type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 250K" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <button type="submit" className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
          Add Client
        </button>
      </form>
    </ModalShell>
  );
}

function AddAppointmentModal({ onClose, onAdd, clients }: {
  onClose: () => void;
  onAdd: (appointment: Omit<AdminAppointment, 'id'>) => void;
  clients: AdminClient[];
}) {
  const [client, setClient] = useState(clients[0]?.name ?? '');
  const [advisor, setAdvisor] = useState(ADVISORS[0]);
  const [type, setType] = useState('Portfolio Review');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) return;
    onAdd({
      client,
      advisor,
      type,
      time: `${formatDateInput(date)}, ${slot}`,
      status: 'pending',
    });
    onClose();
  };

  return (
    <ModalShell title="New Appointment" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-apt-client" className="block text-sm font-semibold text-gray-700 mb-1">Client</label>
          <select id="admin-apt-client" value={client} onChange={(e) => setClient(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
            {clients.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-apt-advisor" className="block text-sm font-semibold text-gray-700 mb-1">Advisor</label>
            <select id="admin-apt-advisor" value={advisor} onChange={(e) => setAdvisor(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {ADVISORS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="admin-apt-type" className="block text-sm font-semibold text-gray-700 mb-1">Meeting Type</label>
            <select id="admin-apt-type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {['Portfolio Review', 'Tax Planning', 'Q4 Review', 'Estate Planning', 'New Client Intake'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="admin-apt-date" className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
          <input id="admin-apt-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div>
          <p className="block text-sm font-semibold text-gray-700 mb-2">Time</p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSlot(time)}
                className={`px-2 py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  slot === time
                    ? 'bg-[#14213d] text-white border-[#14213d]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#fca311]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={!date || !slot || !client}
          className="w-full bg-[#fca311] text-[#14213d] py-3 rounded-lg font-semibold hover:bg-[#e59400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Appointment
        </button>
      </form>
    </ModalShell>
  );
}

function UploadAdminDocModal({ onClose, onAdd, clients }: {
  onClose: () => void;
  onAdd: (doc: AdminDocument) => void;
  clients: AdminClient[];
}) {
  const [name, setName] = useState('');
  const [client, setClient] = useState(clients[0]?.name ?? '');
  const [category, setCategory] = useState(DOC_CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    onAdd({
      name,
      client,
      category,
      date: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
      size: '0.1 MB',
    });
    onClose();
  };

  return (
    <ModalShell title="Add Document" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-doc-name" className="block text-sm font-semibold text-gray-700 mb-1">Document Name</label>
          <input id="admin-doc-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. 2024 Engagement Letter" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-doc-client" className="block text-sm font-semibold text-gray-700 mb-1">Client</label>
            <select id="admin-doc-client" value={client} onChange={(e) => setClient(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {clients.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="admin-doc-category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select id="admin-doc-category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]">
              {DOC_CATEGORIES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
          Save to Client File
        </button>
      </form>
    </ModalShell>
  );
}

function ClientDetailModal({ client, onClose }: { client: AdminClient; onClose: () => void }) {
  const activity = [
    { label: `Engaged for ${client.service}`, when: 'Current engagement' },
    { label: 'Quarterly review meeting completed', when: client.lastContact },
    { label: 'Signed documents received via portal', when: 'Earlier this quarter' },
  ];

  return (
    <ModalShell title="Client Profile" onClose={onClose}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-[#14213d] rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="text-[#fca311]" size={24} />
        </div>
        <div>
          <p className="text-xl font-bold text-[#14213d]">{client.name}</p>
          <p className="text-sm text-gray-600">{client.type}</p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${
          client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {client.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Primary Service</p>
          <p className="font-semibold text-[#14213d]">{client.service}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">AUM / Value</p>
          <p className="font-semibold text-[#14213d]">{client.value}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 col-span-2">
          <p className="text-xs text-gray-500 mb-1">Last Contact</p>
          <p className="font-semibold text-[#14213d]">{client.lastContact}</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</p>
      <div className="space-y-3 mb-6">
        {activity.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="text-[#fca311] flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-[#14213d]">{item.label}</p>
              <p className="text-xs text-gray-500">{item.when}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="w-full bg-[#14213d] text-white py-3 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors">
        Close
      </button>
    </ModalShell>
  );
}

/* ---------- Main component ---------- */

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [clients, setClients] = useState<AdminClient[]>(() => loadStored(STORAGE_KEYS.clients, INITIAL_CLIENTS));
  const [appointments, setAppointments] = useState<AdminAppointment[]>(() => loadStored(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS));
  const [tasks, setTasks] = useState<AdminTask[]>(() => loadStored(STORAGE_KEYS.tasks, INITIAL_TASKS));
  const [documents, setDocuments] = useState<AdminDocument[]>(() => loadStored(STORAGE_KEYS.documents, INITIAL_DOCUMENTS));
  const [settings, setSettings] = useState<AdminSettings>(() => loadStored(STORAGE_KEYS.settings, {
    emailAlerts: true,
    taskReminders: true,
    weeklySummary: false,
  }));

  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [taskFilter, setTaskFilter] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [docSearch, setDocSearch] = useState('');

  const [activeModal, setActiveModal] = useState<'addClient' | 'addAppointment' | 'uploadDoc' | null>(null);
  const [viewClient, setViewClient] = useState<AdminClient | null>(null);

  useEffect(() => { saveStored(STORAGE_KEYS.clients, clients); }, [clients]);
  useEffect(() => { saveStored(STORAGE_KEYS.appointments, appointments); }, [appointments]);
  useEffect(() => { saveStored(STORAGE_KEYS.tasks, tasks); }, [tasks]);
  useEffect(() => { saveStored(STORAGE_KEYS.documents, documents); }, [documents]);
  useEffect(() => { saveStored(STORAGE_KEYS.settings, settings); }, [settings]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const stats = [
    { label: 'Total Clients', value: (1243 + clients.length).toLocaleString('en-US'), change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'AUM', value: '$2.5B', change: '+8.3%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Tax Returns', value: '342', change: '+24%', icon: FileText, color: 'bg-[#fca311]' },
    { label: 'Consultations This Week', value: '28', change: '+15%', icon: Calendar, color: 'bg-purple-500' },
  ];

  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter((task) => task.priority === taskFilter);

  const filteredClients = clients.filter((client) => {
    const query = clientSearch.trim().toLowerCase();
    if (!query) return true;
    return (
      client.name.toLowerCase().includes(query) ||
      client.type.toLowerCase().includes(query) ||
      client.service.toLowerCase().includes(query)
    );
  });

  const filteredDocuments = documents.filter((doc) => {
    const query = docSearch.trim().toLowerCase();
    if (!query) return true;
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.client.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query)
    );
  });

  const toggleTask = (id: number) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const exportTasksCsv = () => {
    const rows = [
      'Task,Assignee,Priority,Due,Status',
      ...filteredTasks.map((task) =>
        [`"${task.task}"`, `"${task.assignee}"`, task.priority, `"${task.due}"`, task.done ? 'Complete' : 'Pending'].join(',')
      ),
    ];
    downloadTextFile('peak-financial-tasks.csv', rows.join('\n'));
  };

  const setAppointmentStatus = (id: number, status: AdminAppointment['status']) => {
    setAppointments((current) => current.map((apt) => (apt.id === id ? { ...apt, status } : apt)));
  };

  const addAppointment = (appointment: Omit<AdminAppointment, 'id'>) => {
    setAppointments((current) => [
      { ...appointment, id: current.reduce((max, apt) => Math.max(max, apt.id), 0) + 1 },
      ...current,
    ]);
  };

  const downloadAdminDocument = (doc: AdminDocument) => {
    const filename = `${doc.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`;
    const content = [
      'PEAK FINANCIAL ADVISORS - INTERNAL DOCUMENT SYSTEM',
      '='.repeat(50),
      '',
      `Document: ${doc.name}`,
      `Client: ${doc.client}`,
      `Category: ${doc.category}`,
      `Filed: ${doc.date}`,
      '',
      'Retrieved from the firm document management system.',
      'Handle in accordance with the firm confidentiality policy.',
    ].join('\n');
    downloadTextFile(filename, content);
  };

  const statusBadge = (status: AdminAppointment['status']) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  /* ---------- Dashboard ---------- */

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#14213d]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#14213d]">Recent Clients</h3>
            <button
              onClick={() => setActiveTab('clients')}
              className="text-[#fca311] font-semibold hover:text-[#e59400]"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {clients.slice(0, 4).map((client, index) => (
              <button
                key={`${client.name}-${index}`}
                onClick={() => setViewClient(client)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#14213d] rounded-full flex items-center justify-center">
                    <Users className="text-[#fca311]" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#14213d]">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.type} • {client.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#14213d]">{client.value}</p>
                  <p className="text-xs text-gray-500">{client.lastContact}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#14213d]">Upcoming Appointments</h3>
            <button
              onClick={() => setActiveModal('addAppointment')}
              className="bg-[#fca311] text-[#14213d] px-4 py-2 rounded-lg font-semibold hover:bg-[#e59400] transition-colors text-sm flex items-center gap-2"
            >
              <Plus size={16} />
              New
            </button>
          </div>
          <div className="space-y-4">
            {appointments.filter((apt) => apt.status !== 'cancelled').slice(0, 4).map((apt) => (
              <div key={apt.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#14213d] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-[#fca311]" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#14213d]">{apt.client}</p>
                    <p className="text-sm text-gray-600">{apt.type}</p>
                    <p className="text-xs text-gray-500 mt-1">with {apt.advisor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{apt.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#14213d]">
            Pending Tasks
            {taskFilter !== 'all' && (
              <span className="ml-3 text-sm font-semibold text-[#fca311]">{taskFilter} priority</span>
            )}
          </h3>
          <div className="flex gap-2 relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              aria-label="Filter tasks by priority"
              className={`p-2 rounded-lg transition-colors ${taskFilter !== 'all' ? 'text-[#fca311] bg-[#fca311]/10' : 'text-gray-600 hover:text-[#14213d]'}`}
            >
              <Filter size={20} />
            </button>
            <button
              onClick={exportTasksCsv}
              aria-label="Export tasks as CSV"
              className="text-gray-600 hover:text-[#14213d] p-2"
            >
              <Download size={20} />
            </button>
            {filterOpen && (
              <>
                <button aria-label="Close filter menu" onClick={() => setFilterOpen(false)} className="fixed inset-0 z-40 cursor-default" />
                <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 w-44">
                  {(['all', 'High', 'Medium', 'Low'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTaskFilter(option);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-gray-50 ${
                        taskFilter === option ? 'text-[#fca311]' : 'text-gray-700'
                      }`}
                    >
                      {option === 'all' ? 'All Priorities' : `${option} Priority`}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No tasks match this filter.</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark task complete: ${task.task}`}
                    className="w-5 h-5 text-[#fca311] border-gray-300 rounded focus:ring-[#fca311] cursor-pointer"
                  />
                  <div className="flex-grow">
                    <p className={`font-semibold ${task.done ? 'text-gray-400 line-through' : 'text-[#14213d]'}`}>{task.task}</p>
                    <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {task.done ? (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">Complete</span>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      task.priority === 'High'
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span className="text-sm">{task.due}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  /* ---------- Clients ---------- */

  const renderClients = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#14213d]">Client Management</h2>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                aria-label="Search clients"
                placeholder="Search clients..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setActiveModal('addClient')}
              className="bg-[#14213d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Client
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Services</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">AUM/Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No clients match &ldquo;{clientSearch}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr key={`${client.name}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#14213d] rounded-full flex items-center justify-center">
                          <Users className="text-[#fca311]" size={18} />
                        </div>
                        <span className="font-semibold text-[#14213d]">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{client.type}</td>
                    <td className="py-4 px-4 text-gray-700">{client.service}</td>
                    <td className="py-4 px-4 font-semibold text-[#14213d]">{client.value}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setViewClient(client)}
                        className="text-[#fca311] hover:text-[#e59400] font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ---------- Appointments ---------- */

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#14213d]">Appointments</h2>
            <p className="text-sm text-gray-600 mt-1">
              {appointments.filter((apt) => apt.status === 'confirmed').length} confirmed • {appointments.filter((apt) => apt.status === 'pending').length} pending
            </p>
          </div>
          <button
            onClick={() => setActiveModal('addAppointment')}
            className="bg-[#fca311] text-[#14213d] px-4 py-2 rounded-lg font-semibold hover:bg-[#e59400] transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            New Appointment
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg ${apt.status === 'cancelled' ? 'bg-gray-50 opacity-60' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#14213d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-[#fca311]" size={18} />
                </div>
                <div>
                  <p className={`font-semibold ${apt.status === 'cancelled' ? 'text-gray-400 line-through' : 'text-[#14213d]'}`}>{apt.client}</p>
                  <p className="text-sm text-gray-600">{apt.type} with {apt.advisor}</p>
                  <p className="text-xs text-gray-500 mt-1">{apt.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusBadge(apt.status)}`}>
                  {apt.status}
                </span>
                {apt.status === 'pending' && (
                  <button
                    onClick={() => setAppointmentStatus(apt.id, 'confirmed')}
                    className="flex items-center gap-1 text-sm font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCircle size={14} />
                    Confirm
                  </button>
                )}
                {apt.status !== 'cancelled' && (
                  <button
                    onClick={() => setAppointmentStatus(apt.id, 'cancelled')}
                    className="flex items-center gap-1 text-sm font-semibold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <XCircle size={14} />
                    Cancel
                  </button>
                )}
                {apt.status === 'cancelled' && (
                  <button
                    onClick={() => setAppointmentStatus(apt.id, 'pending')}
                    className="text-sm font-semibold text-[#fca311] hover:text-[#e59400] px-2 py-1.5"
                  >
                    Restore
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ---------- Documents ---------- */

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#14213d]">Document Management</h2>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                aria-label="Search documents"
                placeholder="Search documents..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fca311]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setActiveModal('uploadDoc')}
              className="bg-[#14213d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a2a4d] transition-colors flex items-center gap-2"
            >
              <Upload size={18} />
              Add Document
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Document</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Filed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No documents match &ldquo;{docSearch}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc, index) => (
                  <tr key={`${doc.name}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#14213d] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="text-[#fca311]" size={18} />
                        </div>
                        <span className="font-semibold text-[#14213d]">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{doc.client}</td>
                    <td className="py-4 px-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">{doc.category}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{doc.date}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{doc.size}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => downloadAdminDocument(doc)}
                        aria-label={`Download ${doc.name}`}
                        className="text-[#fca311] hover:text-[#e59400] flex items-center gap-1 font-semibold"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#14213d] text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#fca311] rounded-lg flex items-center justify-center">
              <span className="text-[#14213d] font-bold">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Peak Financial: Admin Portal</h1>
              <p className="text-xs text-gray-300">Financial Advisory Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setSettingsOpen(false);
              }}
              aria-label="Notifications"
              className="relative p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors"
            >
              <MessageSquare size={20} />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-[#fca311] rounded-full"></span>}
            </button>
            <button
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setNotifOpen(false);
              }}
              aria-label="Settings"
              className="p-2 hover:bg-[#1a2a4d] rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>

            {notifOpen && (
              <>
                <button aria-label="Close notifications" onClick={() => setNotifOpen(false)} className="fixed inset-0 z-40 cursor-default" />
                <div className="absolute right-0 top-12 z-50 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 w-80">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <p className="font-bold text-[#14213d]">Notifications</p>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setNotifications((current) => current.map((n) => ({ ...n, read: true })))}
                        className="text-xs font-semibold text-[#fca311] hover:text-[#e59400]"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() =>
                          setNotifications((current) =>
                            current.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
                          )
                        }
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${notification.read ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start gap-2">
                          {!notification.read && <span className="w-2 h-2 bg-[#fca311] rounded-full mt-1.5 flex-shrink-0" />}
                          <div className={notification.read ? 'pl-4' : ''}>
                            <p className="text-sm font-semibold text-[#14213d]">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{notification.detail}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {settingsOpen && (
              <>
                <button aria-label="Close settings" onClick={() => setSettingsOpen(false)} className="fixed inset-0 z-40 cursor-default" />
                <div className="absolute right-0 top-12 z-50 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 w-72">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-bold text-[#14213d]">Portal Settings</p>
                  </div>
                  <div className="px-4 py-2 divide-y divide-gray-100">
                    {([
                      { key: 'emailAlerts', label: 'Email Alerts', description: 'New leads and client uploads' },
                      { key: 'taskReminders', label: 'Task Reminders', description: 'Daily digest of due tasks' },
                      { key: 'weeklySummary', label: 'Weekly Summary', description: 'Firm metrics every Monday' },
                    ] as const).map((option) => (
                      <div key={option.key} className="flex items-center justify-between gap-3 py-3">
                        <div>
                          <p className="text-sm font-semibold text-[#14213d]">{option.label}</p>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={settings[option.key]}
                          aria-label={option.label}
                          onClick={() => setSettings((current) => ({ ...current, [option.key]: !current[option.key] }))}
                          className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${settings[option.key] ? 'bg-[#fca311]' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[option.key] ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'clients', name: 'Clients', icon: Users },
              { id: 'appointments', name: 'Appointments', icon: Calendar },
              { id: 'documents', name: 'Documents', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#fca311] border-b-2 border-[#fca311]'
                      : 'text-gray-600 hover:text-[#14213d]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'documents' && renderDocuments()}
      </div>

      {/* Modals */}
      {activeModal === 'addClient' && (
        <AddClientModal
          onClose={() => setActiveModal(null)}
          onAdd={(client) => setClients((current) => [client, ...current])}
        />
      )}
      {activeModal === 'addAppointment' && (
        <AddAppointmentModal
          onClose={() => setActiveModal(null)}
          onAdd={addAppointment}
          clients={clients}
        />
      )}
      {activeModal === 'uploadDoc' && (
        <UploadAdminDocModal
          onClose={() => setActiveModal(null)}
          onAdd={(doc) => setDocuments((current) => [doc, ...current])}
          clients={clients}
        />
      )}
      {viewClient && <ClientDetailModal client={viewClient} onClose={() => setViewClient(null)} />}
    </div>
  );
}
