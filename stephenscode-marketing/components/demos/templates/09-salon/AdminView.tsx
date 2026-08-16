import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Package,
  Settings,
  Filter,
  Download,
  Bell,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Pencil,
  Search,
} from 'lucide-react';

const STORAGE_KEYS = {
  appointments: 'salon-demo-admin-appointments',
  clients: 'salon-demo-admin-clients',
  services: 'salon-demo-admin-services',
  settings: 'salon-demo-admin-settings',
  readNotifications: 'salon-demo-admin-read-notifications',
};

type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

interface Appointment {
  id: number;
  time: string;
  client: string;
  service: string;
  stylist: string;
  duration: string;
  price: number;
  status: AppointmentStatus;
}

interface Client {
  id: number;
  name: string;
  lastVisit: string;
  totalSpent: number;
  visits: number;
  status: 'VIP' | 'Regular';
}

interface SalonService {
  id: number;
  name: string;
  duration: string;
  price: number;
}

interface SalonSettings {
  salonName: string;
  phone: string;
  email: string;
  address: string;
  openTime: string;
  closeTime: string;
  onlineBooking: boolean;
}

const defaultAppointments: Appointment[] = [
  { id: 1, time: '9:00 AM', client: 'Sarah Mitchell', service: 'Balayage', stylist: 'Jessica Ramirez', duration: '3 hrs', price: 185, status: 'confirmed' },
  { id: 2, time: '10:30 AM', client: 'Emily Chen', service: 'Gel Manicure', stylist: 'Taylor Johnson', duration: '60 min', price: 55, status: 'in-progress' },
  { id: 3, time: '12:00 PM', client: 'Lisa Rodriguez', service: 'Haircut & Style', stylist: 'Ashley Kim', duration: '45 min', price: 65, status: 'confirmed' },
  { id: 4, time: '1:30 PM', client: 'Jennifer Wilson', service: 'Bridal Package', stylist: 'Maria Santos', duration: '3 hrs', price: 250, status: 'confirmed' },
  { id: 5, time: '2:00 PM', client: 'Amanda Taylor', service: 'Full Highlights', stylist: 'Jessica Ramirez', duration: '3 hrs', price: 165, status: 'pending' },
  { id: 6, time: '3:00 PM', client: 'Rachel Green', service: 'Spa Pedicure', stylist: 'Taylor Johnson', duration: '90 min', price: 75, status: 'confirmed' },
];

const defaultClients: Client[] = [
  { id: 1, name: 'Sarah Mitchell', lastVisit: '2024-02-10', totalSpent: 1245, visits: 12, status: 'VIP' },
  { id: 2, name: 'Emily Chen', lastVisit: '2024-02-08', totalSpent: 890, visits: 8, status: 'Regular' },
  { id: 3, name: 'Lisa Rodriguez', lastVisit: '2024-02-05', totalSpent: 2340, visits: 18, status: 'VIP' },
  { id: 4, name: 'Jennifer Wilson', lastVisit: '2024-02-03', totalSpent: 650, visits: 5, status: 'Regular' },
  { id: 5, name: 'Amanda Taylor', lastVisit: '2024-01-28', totalSpent: 480, visits: 4, status: 'Regular' },
  { id: 6, name: 'Rachel Green', lastVisit: '2024-01-25', totalSpent: 1520, visits: 14, status: 'VIP' },
];

const defaultServices: SalonService[] = [
  { id: 1, name: "Women's Haircut", duration: '45 min', price: 65 },
  { id: 2, name: 'Single Process Color', duration: '90 min', price: 85 },
  { id: 3, name: 'Full Highlights', duration: '3 hrs', price: 165 },
  { id: 4, name: 'Balayage', duration: '3 hrs', price: 185 },
  { id: 5, name: 'Blowout', duration: '45 min', price: 45 },
  { id: 6, name: 'Gel Manicure', duration: '60 min', price: 55 },
  { id: 7, name: 'Spa Pedicure', duration: '90 min', price: 75 },
  { id: 8, name: 'Bridal Hair & Makeup Package', duration: '3 hrs', price: 250 },
  { id: 9, name: 'Keratin Treatment', duration: '3 hrs', price: 250 },
];

const defaultSettings: SalonSettings = {
  salonName: 'Glamour Studio',
  phone: '(555) 456-7890',
  email: 'hello@glamourstudio.com',
  address: '123 Fashion Avenue, Style City, SC 12345',
  openTime: '9:00 AM',
  closeTime: '8:00 PM',
  onlineBooking: true,
};

const notificationsSeed = [
  { id: 1, text: 'New booking request from Amanda Taylor (Full Highlights, 2:00 PM)', time: '5 min ago' },
  { id: 2, text: 'Sarah Mitchell left a 5-star review for Jessica Ramirez', time: '1 hr ago' },
  { id: 3, text: 'Low retail stock: Olaplex No. 3 (2 units left)', time: '3 hrs ago' },
];

const stylistNames = ['Jessica Ramirez', 'Ashley Kim', 'Maria Santos', 'Taylor Johnson'];

const appointmentTimes = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM',
];

const statusOptions: { id: 'all' | AppointmentStatus; label: string }[] = [
  { id: 'all', label: 'All Statuses' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable -- changes stay session-only
  }
}

function statusBadgeClass(status: AppointmentStatus) {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-700';
    case 'in-progress':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-gray-200 text-gray-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-yellow-100 text-yellow-700';
  }
}

export default function AdminView() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const [appointments, setAppointments] = useState<Appointment[]>(defaultAppointments);
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [services, setServices] = useState<SalonService[]>(defaultServices);
  const [settings, setSettings] = useState<SalonSettings>(defaultSettings);
  const [readNotifIds, setReadNotifIds] = useState<number[]>([]);

  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    client: '',
    serviceId: '',
    stylist: stylistNames[0],
    time: appointmentTimes[0],
  });

  const [clientSearch, setClientSearch] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');

  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [serviceEditForm, setServiceEditForm] = useState({ name: '', duration: '', price: '' });
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: '', duration: '', price: '' });

  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setAppointments(loadStored(STORAGE_KEYS.appointments, defaultAppointments));
    setClients(loadStored(STORAGE_KEYS.clients, defaultClients));
    setServices(loadStored(STORAGE_KEYS.services, defaultServices));
    setSettings(loadStored(STORAGE_KEYS.settings, defaultSettings));
    setReadNotifIds(loadStored(STORAGE_KEYS.readNotifications, []));
  }, []);

  const updateAppointments = (next: Appointment[]) => {
    setAppointments(next);
    persist(STORAGE_KEYS.appointments, next);
  };

  const updateClients = (next: Client[]) => {
    setClients(next);
    persist(STORAGE_KEYS.clients, next);
  };

  const updateServices = (next: SalonService[]) => {
    setServices(next);
    persist(STORAGE_KEYS.services, next);
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    persist(STORAGE_KEYS.settings, settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const markAllNotificationsRead = () => {
    const allIds = notificationsSeed.map((n) => n.id);
    setReadNotifIds(allIds);
    persist(STORAGE_KEYS.readNotifications, allIds);
  };

  const unreadCount = notificationsSeed.filter((n) => !readNotifIds.includes(n.id)).length;

  const setAppointmentStatus = (id: number, status: AppointmentStatus) => {
    updateAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const deleteAppointment = (id: number) => {
    updateAppointments(appointments.filter((a) => a.id !== id));
    if (selectedAppointmentId === id) setSelectedAppointmentId(null);
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find((s) => s.id === Number(newAppointment.serviceId));
    if (!service || !newAppointment.client.trim()) return;
    const nextId = appointments.reduce((max, a) => Math.max(max, a.id), 0) + 1;
    updateAppointments([
      ...appointments,
      {
        id: nextId,
        time: newAppointment.time,
        client: newAppointment.client.trim(),
        service: service.name,
        stylist: newAppointment.stylist,
        duration: service.duration,
        price: service.price,
        status: 'pending',
      },
    ]);
    setNewAppointment({ client: '', serviceId: '', stylist: stylistNames[0], time: appointmentTimes[0] });
    setShowAddAppointment(false);
  };

  const toggleClientStatus = (id: number) => {
    updateClients(
      clients.map((c) =>
        c.id === id ? { ...c, status: c.status === 'VIP' ? 'Regular' : 'VIP' } : c
      )
    );
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    const nextId = clients.reduce((max, c) => Math.max(max, c.id), 0) + 1;
    updateClients([
      {
        id: nextId,
        name: newClientName.trim(),
        lastVisit: new Date().toISOString().split('T')[0],
        totalSpent: 0,
        visits: 0,
        status: 'Regular',
      },
      ...clients,
    ]);
    setNewClientName('');
    setShowAddClient(false);
  };

  const startEditService = (service: SalonService) => {
    setEditingServiceId(service.id);
    setServiceEditForm({
      name: service.name,
      duration: service.duration,
      price: String(service.price),
    });
  };

  const saveServiceEdit = () => {
    if (editingServiceId === null) return;
    updateServices(
      services.map((s) =>
        s.id === editingServiceId
          ? {
              ...s,
              name: serviceEditForm.name.trim() || s.name,
              duration: serviceEditForm.duration.trim() || s.duration,
              price: Number(serviceEditForm.price) || s.price,
            }
          : s
      )
    );
    setEditingServiceId(null);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim() || !newService.price) return;
    const nextId = services.reduce((max, s) => Math.max(max, s.id), 0) + 1;
    updateServices([
      ...services,
      {
        id: nextId,
        name: newService.name.trim(),
        duration: newService.duration.trim() || '60 min',
        price: Number(newService.price),
      },
    ]);
    setNewService({ name: '', duration: '', price: '' });
    setShowAddService(false);
  };

  const filteredAppointments =
    statusFilter === 'all' ? appointments : appointments.filter((a) => a.status === statusFilter);

  const exportAppointments = () => {
    const rows = [
      ['Time', 'Client', 'Service', 'Stylist', 'Duration', 'Price', 'Status'],
      ...filteredAppointments.map((a) => [
        a.time,
        a.client,
        a.service,
        a.stylist,
        a.duration,
        `$${a.price}`,
        a.status,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'glamour-studio-appointments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeAppointments = appointments.filter((a) => a.status !== 'cancelled');
  const todaysRevenue = activeAppointments.reduce((sum, a) => sum + a.price, 0);
  const selectedAppointment = appointments.find((a) => a.id === selectedAppointmentId) || null;

  const stats = [
    {
      label: "Today's Revenue",
      value: `$${todaysRevenue.toLocaleString()}`,
      change: '+12%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      label: 'Appointments Today',
      value: String(activeAppointments.length),
      change: '+5',
      icon: Calendar,
      color: 'from-[#d00000] to-[#e85d04]',
    },
    {
      label: 'Active Clients',
      value: clients.length.toLocaleString(),
      change: '+2',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      label: 'Avg Rating',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const stylistPerformance = [
    { name: 'Jessica Ramirez', appointments: 156, revenue: '$24,680', rating: 5.0, utilization: 94 },
    { name: 'Ashley Kim', appointments: 142, revenue: '$21,450', rating: 5.0, utilization: 89 },
    { name: 'Maria Santos', appointments: 134, revenue: '$28,900', rating: 5.0, utilization: 92 },
    { name: 'Taylor Johnson', appointments: 167, revenue: '$18,340', rating: 5.0, utilization: 96 },
  ];

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const renderAppointmentsTable = (rows: Appointment[], showDelete: boolean) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stylist</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                No appointments match this filter.
              </td>
            </tr>
          )}
          {rows.map((apt) => (
            <tr key={apt.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">{apt.time}</td>
              <td className="px-6 py-4 text-sm">{apt.client}</td>
              <td className="px-6 py-4 text-sm">{apt.service}</td>
              <td className="px-6 py-4 text-sm">{apt.stylist}</td>
              <td className="px-6 py-4 text-sm">{apt.duration}</td>
              <td className="px-6 py-4 text-sm font-semibold">${apt.price}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(apt.status)}`}>
                  {apt.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedAppointmentId(apt.id)}
                    className="text-[#d00000] hover:text-[#dc2f02] font-medium"
                  >
                    View
                  </button>
                  {showDelete && (
                    <button
                      onClick={() => deleteAppointment(apt.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label={`Delete appointment for ${apt.client}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-white mr-3" />
            <h2 className="text-xl font-bold text-white">Today&apos;s Appointments</h2>
          </div>
          <div className="flex gap-2 relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <Filter className="w-4 h-4 inline mr-1" />
              {statusFilter === 'all'
                ? 'Filter'
                : statusOptions.find((o) => o.id === statusFilter)?.label}
            </button>
            <button
              onClick={exportAppointments}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <Download className="w-4 h-4 inline mr-1" />
              Export
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 w-48 z-40">
                {statusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setStatusFilter(option.id);
                      setShowFilterMenu(false);
                    }}
                    className={`${
                      statusFilter === option.id
                        ? 'text-[#d00000] font-semibold bg-red-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    } block w-full text-left px-4 py-2 text-sm`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {renderAppointmentsTable(filteredAppointments, false)}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-white mr-3" />
              <h2 className="text-xl font-bold text-white">Recent Clients</h2>
            </div>
            <button
              onClick={() => setSelectedTab('clients')}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {clients.slice(0, 4).map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div>
                    <h4 className="font-bold">{client.name}</h4>
                    <p className="text-sm text-gray-500">Last visit: {client.lastVisit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#d00000]">${client.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{client.visits} visits</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status === 'VIP'
                        ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stylist Performance */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] px-6 py-4">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-white mr-3" />
              <h2 className="text-xl font-bold text-white">Stylist Performance (This Month)</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stylistPerformance.map((stylist, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{stylist.name}</h4>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-semibold">{stylist.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Appointments</p>
                      <p className="font-semibold">{stylist.appointments}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-[#d00000]">{stylist.revenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Utilization</p>
                      <p className="font-semibold">{stylist.utilization}%</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#d00000] to-[#e85d04] h-2 rounded-full"
                      style={{ width: `${stylist.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setStatusFilter(option.id)}
              className={`${
                statusFilter === option.id
                  ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              } px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportAppointments}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <Download className="w-4 h-4 inline mr-1" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddAppointment(!showAddAppointment)}
            className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 inline mr-1" />
            Add Appointment
          </button>
        </div>
      </div>

      {showAddAppointment && (
        <form onSubmit={handleAddAppointment} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="salon-admin-appt-client" className="block text-sm font-semibold mb-2">
                Client Name *
              </label>
              <input
                id="salon-admin-appt-client"
                type="text"
                required
                value={newAppointment.client}
                onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                placeholder="Client name"
              />
            </div>
            <div>
              <label htmlFor="salon-admin-appt-service" className="block text-sm font-semibold mb-2">
                Service *
              </label>
              <select
                id="salon-admin-appt-service"
                required
                value={newAppointment.serviceId}
                onChange={(e) => setNewAppointment({ ...newAppointment, serviceId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              >
                <option value="">Select service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="salon-admin-appt-stylist" className="block text-sm font-semibold mb-2">
                Stylist
              </label>
              <select
                id="salon-admin-appt-stylist"
                value={newAppointment.stylist}
                onChange={(e) => setNewAppointment({ ...newAppointment, stylist: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              >
                {stylistNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="salon-admin-appt-time" className="block text-sm font-semibold mb-2">
                Time
              </label>
              <select
                id="salon-admin-appt-time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              >
                {appointmentTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddAppointment(false)}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              Add Appointment
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {renderAppointmentsTable(filteredAppointments, true)}
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000] w-72 max-w-full"
            placeholder="Search clients..."
            aria-label="Search clients"
          />
        </div>
        <button
          onClick={() => setShowAddClient(!showAddClient)}
          className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 inline mr-1" />
          Add Client
        </button>
      </div>

      {showAddClient && (
        <form onSubmit={handleAddClient} className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="salon-admin-new-client" className="block text-sm font-semibold mb-2">
              Client Name *
            </label>
            <input
              id="salon-admin-new-client"
              type="text"
              required
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              placeholder="Full name"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowAddClient(false)}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
          >
            Add Client
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.length === 0 && (
          <p className="text-gray-500 col-span-full bg-white rounded-2xl shadow-lg p-8 text-center">
            No clients match your search.
          </p>
        )}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-bold text-lg">{client.name}</h4>
              <p className="text-sm text-gray-500">Last visit: {client.lastVisit}</p>
              <p className="text-sm text-gray-500">
                {client.visits} visits &middot;{' '}
                <span className="text-[#d00000] font-semibold">
                  ${client.totalSpent.toLocaleString()} lifetime
                </span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  client.status === 'VIP'
                    ? 'bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {client.status}
              </span>
              <button
                onClick={() => toggleClientStatus(client.id)}
                className="text-sm text-[#d00000] hover:text-[#dc2f02] font-medium"
              >
                {client.status === 'VIP' ? 'Remove VIP' : 'Make VIP'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Menu</h2>
        <button
          onClick={() => setShowAddService(!showAddService)}
          className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 inline mr-1" />
          Add Service
        </button>
      </div>

      {showAddService && (
        <form onSubmit={handleAddService} className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="salon-admin-new-service-name" className="block text-sm font-semibold mb-2">
              Service Name *
            </label>
            <input
              id="salon-admin-new-service-name"
              type="text"
              required
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              placeholder="e.g. Root Touch-Up"
            />
          </div>
          <div>
            <label htmlFor="salon-admin-new-service-duration" className="block text-sm font-semibold mb-2">
              Duration
            </label>
            <input
              id="salon-admin-new-service-duration"
              type="text"
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              placeholder="e.g. 60 min"
            />
          </div>
          <div>
            <label htmlFor="salon-admin-new-service-price" className="block text-sm font-semibold mb-2">
              Price ($) *
            </label>
            <input
              id="salon-admin-new-service-price"
              type="number"
              min="0"
              required
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
              placeholder="65"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowAddService(false)}
              className="bg-gray-200 text-gray-700 px-5 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-5 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) =>
                editingServiceId === service.id ? (
                  <tr key={service.id} className="border-t bg-red-50">
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={serviceEditForm.name}
                        onChange={(e) =>
                          setServiceEditForm({ ...serviceEditForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                        aria-label="Service name"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="text"
                        value={serviceEditForm.duration}
                        onChange={(e) =>
                          setServiceEditForm({ ...serviceEditForm, duration: e.target.value })
                        }
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                        aria-label="Service duration"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        min="0"
                        value={serviceEditForm.price}
                        onChange={(e) =>
                          setServiceEditForm({ ...serviceEditForm, price: e.target.value })
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d00000]"
                        aria-label="Service price"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={saveServiceEdit}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingServiceId(null)}
                          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={service.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{service.name}</td>
                    <td className="px-6 py-4 text-sm">{service.duration}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#d00000]">
                      ${service.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => startEditService(service)}
                          className="text-[#d00000] hover:text-[#dc2f02] transition-colors"
                          aria-label={`Edit ${service.name}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateServices(services.filter((s) => s.id !== service.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label={`Delete ${service.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <form onSubmit={saveSettings} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl space-y-6">
      <h2 className="text-2xl font-bold">Salon Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="salon-admin-settings-name" className="block text-sm font-semibold mb-2">
            Salon Name
          </label>
          <input
            id="salon-admin-settings-name"
            type="text"
            value={settings.salonName}
            onChange={(e) => setSettings({ ...settings, salonName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          />
        </div>
        <div>
          <label htmlFor="salon-admin-settings-phone" className="block text-sm font-semibold mb-2">
            Phone
          </label>
          <input
            id="salon-admin-settings-phone"
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          />
        </div>
        <div>
          <label htmlFor="salon-admin-settings-email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="salon-admin-settings-email"
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          />
        </div>
        <div>
          <label htmlFor="salon-admin-settings-address" className="block text-sm font-semibold mb-2">
            Address
          </label>
          <input
            id="salon-admin-settings-address"
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          />
        </div>
        <div>
          <label htmlFor="salon-admin-settings-open" className="block text-sm font-semibold mb-2">
            Opening Time
          </label>
          <select
            id="salon-admin-settings-open"
            value={settings.openTime}
            onChange={(e) => setSettings({ ...settings, openTime: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          >
            {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="salon-admin-settings-close" className="block text-sm font-semibold mb-2">
            Closing Time
          </label>
          <select
            id="salon-admin-settings-close"
            value={settings.closeTime}
            onChange={(e) => setSettings({ ...settings, closeTime: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d00000]"
          >
            {['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.onlineBooking}
          onChange={(e) => setSettings({ ...settings, onlineBooking: e.target.checked })}
          className="w-5 h-5 accent-[#d00000]"
        />
        <span className="font-semibold">Accept online bookings</span>
      </label>

      {settingsSaved && (
        <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Settings saved successfully.
        </p>
      )}

      <button
        type="submit"
        className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
      >
        Save Settings
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d00000] via-[#dc2f02] to-[#e85d04] bg-clip-text text-transparent">
                {settings.salonName} Admin
              </h1>
              <p className="text-sm text-gray-600">Manage your salon operations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-6 h-6 text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-100 w-80 z-50">
                    <div className="px-4 py-3 border-b flex items-center justify-between">
                      <h3 className="font-bold">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close notifications"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notificationsSeed.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b last:border-0 ${
                            readNotifIds.includes(notif.id) ? 'bg-white' : 'bg-red-50'
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    {unreadCount > 0 && (
                      <div className="px-4 py-3 border-t">
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-sm text-[#d00000] hover:text-[#dc2f02] font-semibold"
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-gray-500">Manager</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#d00000] to-[#e85d04] rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'services', label: 'Services', icon: Package },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`${
                  selectedTab === tab.id
                    ? 'border-[#d00000] text-[#d00000]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } flex items-center gap-2 py-4 px-1 border-b-2 font-medium transition-colors whitespace-nowrap`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'dashboard' && renderDashboard()}
        {selectedTab === 'appointments' && renderAppointments()}
        {selectedTab === 'clients' && renderClients()}
        {selectedTab === 'services' && renderServices()}
        {selectedTab === 'settings' && renderSettings()}
      </main>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAppointmentId(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointmentId(null)}
                aria-label="Close appointment details"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-bold">{selectedAppointment.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-bold">{selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-bold">{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stylist</p>
                  <p className="font-bold">{selectedAppointment.stylist}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-bold">{selectedAppointment.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold text-[#d00000]">${selectedAppointment.price}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(
                    selectedAppointment.status
                  )}`}
                >
                  {selectedAppointment.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                {selectedAppointment.status === 'pending' && (
                  <button
                    onClick={() => setAppointmentStatus(selectedAppointment.id, 'confirmed')}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
                  >
                    Confirm
                  </button>
                )}
                {selectedAppointment.status === 'confirmed' && (
                  <button
                    onClick={() => setAppointmentStatus(selectedAppointment.id, 'in-progress')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
                  >
                    Start Service
                  </button>
                )}
                {selectedAppointment.status === 'in-progress' && (
                  <button
                    onClick={() => setAppointmentStatus(selectedAppointment.id, 'completed')}
                    className="bg-gradient-to-r from-[#d00000] to-[#e85d04] text-white px-5 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all"
                  >
                    Mark Completed
                  </button>
                )}
                {selectedAppointment.status !== 'cancelled' &&
                  selectedAppointment.status !== 'completed' && (
                    <button
                      onClick={() => setAppointmentStatus(selectedAppointment.id, 'cancelled')}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full font-semibold text-sm transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  )}
                {(selectedAppointment.status === 'cancelled' ||
                  selectedAppointment.status === 'completed') && (
                  <button
                    onClick={() => setAppointmentStatus(selectedAppointment.id, 'confirmed')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full font-semibold text-sm transition-colors"
                  >
                    Reopen as Confirmed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
