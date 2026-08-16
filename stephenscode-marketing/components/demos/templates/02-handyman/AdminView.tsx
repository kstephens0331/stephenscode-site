import React, { useEffect, useState } from 'react';
import {
  Settings, Users, Calendar, DollarSign, BarChart3, Wrench,
  X, Phone, MapPin, Plus, Trash2, Pencil, CheckCircle, ArrowLeft,
} from 'lucide-react';

const colors = {
  primary: '#2c5f2d',
  secondary: '#97bc62',
  accent: '#ff6b35',
};

type Urgency = 'Emergency' | 'Urgent' | 'Standard';
type LeadStatus = 'New' | 'Contacted' | 'Scheduled';
type JobStatus = 'Scheduled' | 'Completed';
type AdminViewName = 'dashboard' | 'leads' | 'schedule' | 'team' | 'reports' | 'settings';

interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  urgency: Urgency;
  received: string;
  status: LeadStatus;
  notes: string;
}

interface Job {
  id: string;
  day: string;
  time: string;
  customer: string;
  service: string;
  location: string;
  status: JobStatus;
  price: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

interface AdminSettings {
  businessName: string;
  phone: string;
  email: string;
  emergencyService: boolean;
  leadAlerts: boolean;
  dailySummary: boolean;
}

interface AdminData {
  leads: Lead[];
  jobs: Job[];
  team: TeamMember[];
  settings: AdminSettings;
}

const STORAGE_KEY = 'fixit-fast-admin-v1';

const SERVICE_OPTIONS = [
  'General Repairs',
  'Electrical Work',
  'Plumbing Fixes',
  'Carpentry',
  'Painting & Drywall',
  'Door & Window Repair',
  'TV Mounting & Assembly',
  'Deck & Fence Repair',
  'Kitchen & Bath Updates',
  'Other',
];

const DAY_OPTIONS = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TIME_OPTIONS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '10:00 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

const SEED_DATA: AdminData = {
  leads: [
    {
      id: 'l1',
      name: 'Sarah Johnson',
      phone: '(555) 201-8834',
      service: 'Electrical Work',
      urgency: 'Emergency',
      received: '10 min ago',
      status: 'New',
      notes: 'Kitchen outlet sparking, breaker keeps tripping. Wants someone out today.',
    },
    {
      id: 'l2',
      name: 'Mike Davis',
      phone: '(555) 342-9917',
      service: 'Deck & Fence Repair',
      urgency: 'Urgent',
      received: '1 hour ago',
      status: 'New',
      notes: 'Two rotted deck boards near the steps and a wobbly railing.',
    },
    {
      id: 'l3',
      name: 'Emily Chen',
      phone: '(555) 478-2203',
      service: 'TV Mounting & Assembly',
      urgency: 'Standard',
      received: '2 hours ago',
      status: 'New',
      notes: '65 inch TV over the fireplace, wants the wires concealed in the wall.',
    },
    {
      id: 'l4',
      name: 'Carlos Rivera',
      phone: '(555) 519-6640',
      service: 'Plumbing Fixes',
      urgency: 'Urgent',
      received: 'Yesterday',
      status: 'Contacted',
      notes: 'Slow drain in the master bath. Quoted $99, waiting on his schedule.',
    },
    {
      id: 'l5',
      name: 'Dana Whitfield',
      phone: '(555) 633-1085',
      service: 'Painting & Drywall',
      urgency: 'Standard',
      received: '2 days ago',
      status: 'Scheduled',
      notes: 'Patch and paint two bedrooms before the in-laws visit next month.',
    },
  ],
  jobs: [
    { id: 'j1', day: 'Today', time: '9:00 AM', customer: 'Robert Williams', service: 'Plumbing Fixes', location: 'Downtown', status: 'Scheduled', price: 145 },
    { id: 'j2', day: 'Today', time: '11:30 AM', customer: 'Lisa Martinez', service: 'Door & Window Repair', location: 'Westside', status: 'Scheduled', price: 220 },
    { id: 'j3', day: 'Today', time: '2:00 PM', customer: 'James Anderson', service: 'Painting & Drywall', location: 'North Hills', status: 'Scheduled', price: 380 },
    { id: 'j4', day: 'Tomorrow', time: '8:30 AM', customer: 'Angela Brooks', service: 'Electrical Work', location: 'South Valley', status: 'Scheduled', price: 165 },
    { id: 'j5', day: 'Tomorrow', time: '1:00 PM', customer: 'Peter Nguyen', service: 'Painting & Drywall', location: 'Eastside', status: 'Scheduled', price: 210 },
    { id: 'j6', day: 'Wednesday', time: '10:00 AM', customer: 'Grace Kim', service: 'Deck & Fence Repair', location: 'Suburban', status: 'Scheduled', price: 425 },
  ],
  team: [
    { id: 't1', name: 'Mike Johnson', role: 'Owner & Master Handyman', active: true },
    { id: 't2', name: 'David Chen', role: 'Licensed Electrician', active: true },
    { id: 't3', name: 'Tom Rodriguez', role: 'Master Plumber', active: true },
    { id: 't4', name: 'Sarah Williams', role: 'Project Coordinator', active: true },
  ],
  settings: {
    businessName: 'Fix-It Fast Handyman Services',
    phone: '(555) 123-4567',
    email: 'info@fixitfast.com',
    emergencyService: true,
    leadAlerts: true,
    dailySummary: false,
  },
};

const MONTHLY_TREND = [
  { month: 'Mar', revenue: 31200 },
  { month: 'Apr', revenue: 34750 },
  { month: 'May', revenue: 33900 },
  { month: 'Jun', revenue: 38400 },
  { month: 'Jul', revenue: 39650 },
  { month: 'Aug', revenue: 42850 },
];

interface JobDraft {
  id: string | null;
  customer: string;
  service: string;
  location: string;
  day: string;
  time: string;
  price: string;
  fromLeadId: string | null;
}

const EMPTY_JOB_DRAFT: JobDraft = {
  id: null,
  customer: '',
  service: SERVICE_OPTIONS[0],
  location: '',
  day: 'Today',
  time: '9:00 AM',
  price: '',
  fromLeadId: null,
};

function newId(): string {
  return `${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}

function urgencyBadgeClasses(urgency: Urgency): string {
  if (urgency === 'Emergency') return 'bg-red-100 text-red-700';
  if (urgency === 'Urgent') return 'bg-orange-100 text-orange-700';
  return 'bg-green-100 text-green-700';
}

function leadStatusBadgeClasses(status: LeadStatus): string {
  if (status === 'New') return 'bg-blue-100 text-blue-700';
  if (status === 'Contacted') return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
}

export default function AdminView() {
  const [data, setData] = useState<AdminData>(SEED_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<AdminViewName>('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jobDraft, setJobDraft] = useState<JobDraft | null>(null);
  const [jobDraftError, setJobDraftError] = useState('');
  const [leadUrgencyFilter, setLeadUrgencyFilter] = useState<'All' | Urgency>('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'All' | LeadStatus>('All');
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [settingsDraft, setSettingsDraft] = useState<AdminSettings>(SEED_DATA.settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load persisted state after mount (localStorage only exists in the browser)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminData;
        if (parsed && parsed.leads && parsed.jobs && parsed.team && parsed.settings) {
          setData(parsed);
          setSettingsDraft(parsed.settings);
        }
      }
    } catch {
      // Corrupt or unavailable storage: fall back to seed data
    }
    setHydrated(true);
  }, []);

  // Persist every change after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or blocked: the UI still works for this session
    }
  }, [data, hydrated]);

  const selectedLead = data.leads.find((lead) => lead.id === selectedLeadId) || null;
  const selectedJob = data.jobs.find((job) => job.id === selectedJobId) || null;

  const totalJobValue = data.jobs.reduce((sum, job) => sum + job.price, 0);

  const stats: { icon: React.ElementType; label: string; value: string; change: string; target: AdminViewName }[] = [
    {
      icon: Calendar,
      label: 'Jobs This Month',
      value: String(137 + data.jobs.length),
      change: '+12%',
      target: 'schedule',
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: `$${(41305 + totalJobValue).toLocaleString()}`,
      change: '+8%',
      target: 'reports',
    },
    {
      icon: Users,
      label: 'New Customers',
      value: '67',
      change: '+15%',
      target: 'leads',
    },
    {
      icon: BarChart3,
      label: 'Avg Rating',
      value: '4.9',
      change: '+0.2',
      target: 'reports',
    },
  ];

  const updateLead = (id: string, patch: Partial<Lead>) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)),
    }));
  };

  const removeLead = (id: string) => {
    setData((prev) => ({ ...prev, leads: prev.leads.filter((lead) => lead.id !== id) }));
    setSelectedLeadId(null);
  };

  const removeJob = (id: string) => {
    setData((prev) => ({ ...prev, jobs: prev.jobs.filter((job) => job.id !== id) }));
    setSelectedJobId(null);
  };

  const updateJob = (id: string, patch: Partial<Job>) => {
    setData((prev) => ({
      ...prev,
      jobs: prev.jobs.map((job) => (job.id === id ? { ...job, ...patch } : job)),
    }));
  };

  const openAddJob = (fromLead?: Lead) => {
    setJobDraftError('');
    setJobDraft(
      fromLead
        ? {
            ...EMPTY_JOB_DRAFT,
            customer: fromLead.name,
            service: SERVICE_OPTIONS.includes(fromLead.service) ? fromLead.service : 'Other',
            fromLeadId: fromLead.id,
          }
        : { ...EMPTY_JOB_DRAFT }
    );
  };

  const openEditJob = (job: Job) => {
    setJobDraftError('');
    setJobDraft({
      id: job.id,
      customer: job.customer,
      service: job.service,
      location: job.location,
      day: job.day,
      time: job.time,
      price: String(job.price),
      fromLeadId: null,
    });
  };

  const saveJobDraft = () => {
    if (!jobDraft) return;
    if (!jobDraft.customer.trim()) {
      setJobDraftError('Customer name is required.');
      return;
    }
    const price = Math.max(0, Math.round(Number(jobDraft.price) || 0));
    if (jobDraft.id) {
      updateJob(jobDraft.id, {
        customer: jobDraft.customer.trim(),
        service: jobDraft.service,
        location: jobDraft.location.trim() || 'Metro Area',
        day: jobDraft.day,
        time: jobDraft.time,
        price,
      });
    } else {
      const job: Job = {
        id: newId(),
        customer: jobDraft.customer.trim(),
        service: jobDraft.service,
        location: jobDraft.location.trim() || 'Metro Area',
        day: jobDraft.day,
        time: jobDraft.time,
        status: 'Scheduled',
        price,
      };
      setData((prev) => ({
        ...prev,
        jobs: [...prev.jobs, job],
        leads: jobDraft.fromLeadId
          ? prev.leads.map((lead) =>
              lead.id === jobDraft.fromLeadId ? { ...lead, status: 'Scheduled' as LeadStatus } : lead
            )
          : prev.leads,
      }));
    }
    setJobDraft(null);
    setSelectedLeadId(null);
    setSelectedJobId(null);
  };

  const addTeamMember = () => {
    if (!newMember.name.trim()) return;
    setData((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        { id: newId(), name: newMember.name.trim(), role: newMember.role.trim() || 'Handyman', active: true },
      ],
    }));
    setNewMember({ name: '', role: '' });
  };

  const saveSettings = () => {
    setData((prev) => ({ ...prev, settings: settingsDraft }));
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 2500);
  };

  const filteredLeads = data.leads.filter((lead) => {
    if (leadUrgencyFilter !== 'All' && lead.urgency !== leadUrgencyFilter) return false;
    if (leadStatusFilter !== 'All' && lead.status !== leadStatusFilter) return false;
    return true;
  });

  const scheduleDays = DAY_OPTIONS.filter((day) => data.jobs.some((job) => job.day === day));

  const revenueByService = SERVICE_OPTIONS.map((service) => ({
    service,
    total: data.jobs.filter((job) => job.service === service).reduce((sum, job) => sum + job.price, 0),
  })).filter((row) => row.total > 0);
  const maxServiceRevenue = Math.max(1, ...revenueByService.map((row) => row.total));
  const maxMonthlyRevenue = Math.max(...MONTHLY_TREND.map((row) => row.revenue));

  const navTabs: { key: AdminViewName; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'leads', label: 'Leads' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'team', label: 'Team' },
    { key: 'reports', label: 'Reports' },
    { key: 'settings', label: 'Settings' },
  ];

  const renderDashboard = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => setView(stat.target)}
            className="bg-white rounded-xl p-6 shadow-sm text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-8 w-8" style={{ color: colors.primary }} />
              <span className="text-sm font-semibold text-green-600">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
              Recent Leads
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.leads.slice(0, 3).map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-600">{lead.service}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${urgencyBadgeClasses(lead.urgency)}`}>
                      {lead.urgency}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{lead.received}</div>
                  </div>
                </button>
              ))}
              {data.leads.length === 0 && (
                <p className="text-gray-500 text-center py-4">No leads yet. New requests will appear here.</p>
              )}
            </div>
            <button
              onClick={() => setView('leads')}
              className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              View All Leads
            </button>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
              Today's Schedule
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.jobs.filter((job) => job.day === 'Today').map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className="w-full flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {job.time.split(' ')[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900">{job.customer}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      {job.service}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{job.location}</div>
                  </div>
                  {job.status === 'Completed' && (
                    <div className="self-center">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">Done</span>
                    </div>
                  )}
                </button>
              ))}
              {data.jobs.filter((job) => job.day === 'Today').length === 0 && (
                <p className="text-gray-500 text-center py-4">Nothing on the books today. Add a job to get started.</p>
              )}
            </div>
            <button
              onClick={() => setView('schedule')}
              className="w-full mt-4 px-4 py-2 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              View Full Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {([
            { label: 'Add Job', icon: Calendar, action: () => openAddJob() },
            { label: 'Manage Team', icon: Users, action: () => setView('team') },
            { label: 'View Reports', icon: BarChart3, action: () => setView('reports') },
            { label: 'Settings', icon: Settings, action: () => setView('settings') },
          ] as { label: string; icon: React.ElementType; action: () => void }[]).map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-current hover:bg-gray-50 transition-all flex flex-col items-center gap-2"
            >
              <action.icon className="h-6 w-6" style={{ color: colors.primary }} />
              <span className="font-semibold text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderLeads = () => (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
          All Leads ({filteredLeads.length})
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {(['All', 'Emergency', 'Urgent', 'Standard'] as const).map((urgency) => (
              <button
                key={urgency}
                onClick={() => setLeadUrgencyFilter(urgency)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  leadUrgencyFilter === urgency ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={leadUrgencyFilter === urgency ? { backgroundColor: colors.primary } : {}}
              >
                {urgency}
              </button>
            ))}
          </div>
          <select
            value={leadStatusFilter}
            onChange={(e) => setLeadStatusFilter(e.target.value as 'All' | LeadStatus)}
            className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700"
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>
      <div className="p-6 space-y-3">
        {filteredLeads.map((lead) => (
          <button
            key={lead.id}
            onClick={() => setSelectedLeadId(lead.id)}
            className="w-full flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-left"
          >
            <div>
              <div className="font-semibold text-gray-900">{lead.name}</div>
              <div className="text-sm text-gray-600">{lead.service}</div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {lead.phone}
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${urgencyBadgeClasses(lead.urgency)}`}>
                {lead.urgency}
              </div>
              <div>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${leadStatusBadgeClasses(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <div className="text-xs text-gray-500">{lead.received}</div>
            </div>
          </button>
        ))}
        {filteredLeads.length === 0 && (
          <p className="text-gray-500 text-center py-8">No leads match the current filters.</p>
        )}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
          Job Schedule
        </h2>
        <button
          onClick={() => openAddJob()}
          className="px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}
        >
          <Plus className="h-4 w-4" />
          Add Job
        </button>
      </div>
      {scheduleDays.map((day) => (
        <div key={day} className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 font-bold" style={{ color: colors.primary }}>
            {day}
          </div>
          <div className="p-6 space-y-3">
            {data.jobs
              .filter((job) => job.day === day)
              .sort((a, b) => TIME_OPTIONS.indexOf(a.time) - TIME_OPTIONS.indexOf(b.time))
              .map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className="w-full flex gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-left items-center"
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: job.status === 'Completed' ? colors.secondary : colors.accent }}
                  >
                    {job.time.split(' ')[0]}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900">{job.customer}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      {job.service}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: colors.primary }}>${job.price}</div>
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                        job.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
      {data.jobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          No jobs scheduled. Use Add Job to book the first one.
        </div>
      )}
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
        Team ({data.team.filter((member) => member.active).length} available)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.team.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: member.active ? colors.primary : '#9ca3af' }}
            >
              {member.name.split(' ').map((part) => part[0]).join('')}
            </div>
            <div className="flex-grow">
              <div className="font-bold text-gray-900">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    team: prev.team.map((m) => (m.id === member.id ? { ...m, active: !m.active } : m)),
                  }))
                }
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  member.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {member.active ? 'Available' : 'Off Duty'}
              </button>
              <button
                onClick={() =>
                  setData((prev) => ({ ...prev, team: prev.team.filter((m) => m.id !== member.id) }))
                }
                className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold mb-4" style={{ color: colors.primary }}>Add Team Member</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Full name"
            aria-label="New member name"
            className="flex-grow px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <input
            type="text"
            value={newMember.role}
            onChange={(e) => setNewMember((prev) => ({ ...prev, role: e.target.value }))}
            placeholder="Role (e.g. Carpenter)"
            aria-label="New member role"
            className="flex-grow px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <button
            onClick={addTeamMember}
            disabled={!newMember.name.trim()}
            className="px-6 py-2.5 rounded-lg font-semibold text-white disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );

  const renderReports = () => {
    const bookedRevenue = data.jobs.filter((job) => job.status === 'Scheduled').reduce((sum, job) => sum + job.price, 0);
    const completedRevenue = data.jobs.filter((job) => job.status === 'Completed').reduce((sum, job) => sum + job.price, 0);
    return (
      <div className="space-y-8">
        <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
          Reports
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Booked Revenue', value: `$${bookedRevenue.toLocaleString()}` },
            { label: 'Completed Revenue', value: `$${completedRevenue.toLocaleString()}` },
            { label: 'Jobs Scheduled', value: String(data.jobs.filter((job) => job.status === 'Scheduled').length) },
            { label: 'Jobs Completed', value: String(data.jobs.filter((job) => job.status === 'Completed').length) },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>{card.value}</div>
              <div className="text-sm text-gray-600 mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-6" style={{ color: colors.primary }}>Pipeline Revenue by Service</h3>
          <div className="space-y-4">
            {revenueByService.map((row) => (
              <div key={row.service}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-700">{row.service}</span>
                  <span className="font-bold" style={{ color: colors.primary }}>${row.total.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.round((row.total / maxServiceRevenue) * 100)}%`, backgroundColor: colors.secondary }}
                  />
                </div>
              </div>
            ))}
            {revenueByService.length === 0 && (
              <p className="text-gray-500 text-center py-4">Schedule jobs to see revenue by service.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold mb-6" style={{ color: colors.primary }}>Revenue Trend (Last 6 Months)</h3>
          <div className="flex items-end gap-4 h-48">
            {MONTHLY_TREND.map((row) => (
              <div key={row.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-xs font-bold" style={{ color: colors.primary }}>
                  ${Math.round(row.revenue / 1000)}k
                </div>
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${Math.round((row.revenue / maxMonthlyRevenue) * 100)}%`,
                    backgroundColor: row.month === 'Aug' ? colors.accent : colors.secondary,
                  }}
                />
                <div className="text-xs font-semibold text-gray-600">{row.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
        Business Settings
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-gray-900">Business Profile</h3>
        <div>
          <label htmlFor="admin-business-name" className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
          <input
            id="admin-business-name"
            type="text"
            value={settingsDraft.businessName}
            onChange={(e) => setSettingsDraft((prev) => ({ ...prev, businessName: e.target.value }))}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="admin-business-phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input
              id="admin-business-phone"
              type="tel"
              value={settingsDraft.phone}
              onChange={(e) => setSettingsDraft((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="admin-business-email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              id="admin-business-email"
              type="email"
              value={settingsDraft.email}
              onChange={(e) => setSettingsDraft((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-1">
        <h3 className="font-bold text-gray-900 mb-3">Preferences</h3>
        {([
          { key: 'emergencyService', label: '24/7 Emergency Service', description: 'Show the emergency banner and accept after-hours calls' },
          { key: 'leadAlerts', label: 'Instant Lead Alerts', description: 'Text the on-call tech when a new lead arrives' },
          { key: 'dailySummary', label: 'Daily Summary Email', description: 'Send a recap of jobs and revenue every evening' },
        ] as { key: 'emergencyService' | 'leadAlerts' | 'dailySummary'; label: string; description: string }[]).map((pref) => (
          <button
            key={pref.key}
            onClick={() => setSettingsDraft((prev) => ({ ...prev, [pref.key]: !prev[pref.key] }))}
            className="w-full flex items-center justify-between py-3 text-left border-b border-gray-100 last:border-b-0"
          >
            <div>
              <div className="font-semibold text-gray-900">{pref.label}</div>
              <div className="text-sm text-gray-600">{pref.description}</div>
            </div>
            <div
              className={`w-12 h-7 rounded-full p-1 transition-colors flex-shrink-0 ${settingsDraft[pref.key] ? '' : 'bg-gray-300'}`}
              style={settingsDraft[pref.key] ? { backgroundColor: colors.primary } : {}}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settingsDraft[pref.key] ? 'translate-x-5' : ''}`}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={saveSettings}
          className="px-8 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.primary }}
        >
          Save Settings
        </button>
        {settingsSaved && (
          <span className="flex items-center gap-2 text-green-700 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Settings saved
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.primary }}
              >
                FF
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.primary }}>
                  Fix-It Fast Admin
                </h1>
                <p className="text-sm text-gray-600">{navTabs.find((tab) => tab.key === view)?.label}</p>
              </div>
            </div>
            <button
              onClick={() => setView('settings')}
              aria-label="Open settings"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: colors.primary }}
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
          {/* Section Tabs */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {navTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  view === tab.key ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={view === tab.key ? { backgroundColor: colors.primary } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view !== 'dashboard' && (
          <button
            onClick={() => setView('dashboard')}
            className="mb-6 flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        )}
        {view === 'dashboard' && renderDashboard()}
        {view === 'leads' && renderLeads()}
        {view === 'schedule' && renderSchedule()}
        {view === 'team' && renderTeam()}
        {view === 'reports' && renderReports()}
        {view === 'settings' && renderSettings()}
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && !jobDraft && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelectedLeadId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Lead Details</h2>
              <button
                onClick={() => setSelectedLeadId(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-900">{selectedLead.name}</div>
                  <a href={`tel:${selectedLead.phone.replace(/\D/g, '')}`} className="text-sm flex items-center gap-1 hover:underline" style={{ color: colors.accent }}>
                    <Phone className="h-3 w-3" />
                    {selectedLead.phone}
                  </a>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${urgencyBadgeClasses(selectedLead.urgency)}`}>
                  {selectedLead.urgency}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Requested Service</div>
                <div className="font-semibold text-gray-900">{selectedLead.service}</div>
                <div className="text-sm text-gray-600 mt-2">{selectedLead.notes}</div>
                <div className="text-xs text-gray-500 mt-2">Received {selectedLead.received}</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</div>
                <div className="flex gap-2">
                  {(['New', 'Contacted', 'Scheduled'] as LeadStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateLead(selectedLead.id, { status })}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                        selectedLead.status === status ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={selectedLead.status === status ? { backgroundColor: colors.primary } : {}}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => openAddJob(selectedLead)}
                  className="w-full px-4 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Calendar className="h-4 w-4" />
                  Create Job from Lead
                </button>
                <button
                  onClick={() => removeLead(selectedLead.id)}
                  className="w-full px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && !jobDraft && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelectedJobId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Job Details</h2>
              <button
                onClick={() => setSelectedJobId(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">{selectedJob.customer}</div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    selectedJob.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {selectedJob.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-semibold text-gray-900">{selectedJob.service}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">When</span><span className="font-semibold text-gray-900">{selectedJob.day}, {selectedJob.time}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-semibold text-gray-900">{selectedJob.location}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Quoted Price</span><span className="font-bold" style={{ color: colors.primary }}>${selectedJob.price}</span></div>
              </div>
              <div className="flex flex-col gap-2">
                {selectedJob.status === 'Scheduled' ? (
                  <button
                    onClick={() => updateJob(selectedJob.id, { status: 'Completed' })}
                    className="w-full px-4 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark Completed
                  </button>
                ) : (
                  <button
                    onClick={() => updateJob(selectedJob.id, { status: 'Scheduled' })}
                    className="w-full px-4 py-3 rounded-lg font-bold border-2 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Reopen Job
                  </button>
                )}
                <button
                  onClick={() => openEditJob(selectedJob)}
                  className="w-full px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit or Reschedule
                </button>
                <button
                  onClick={() => removeJob(selectedJob.id)}
                  className="w-full px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Cancel Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Job Modal */}
      {jobDraft && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60"
          onClick={() => setJobDraft(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                {jobDraft.id ? 'Edit Job' : 'Add Job'}
              </h2>
              <button
                onClick={() => setJobDraft(null)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="job-customer" className="block text-sm font-semibold text-gray-700 mb-1">Customer *</label>
                <input
                  id="job-customer"
                  type="text"
                  value={jobDraft.customer}
                  onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, customer: e.target.value } : prev))}
                  placeholder="Customer name"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label htmlFor="job-service" className="block text-sm font-semibold text-gray-700 mb-1">Service</label>
                <select
                  id="job-service"
                  value={jobDraft.service}
                  onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, service: e.target.value } : prev))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job-location" className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  id="job-location"
                  type="text"
                  value={jobDraft.location}
                  onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, location: e.target.value } : prev))}
                  placeholder="Neighborhood or address"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="job-day" className="block text-sm font-semibold text-gray-700 mb-1">Day</label>
                  <select
                    id="job-day"
                    value={jobDraft.day}
                    onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, day: e.target.value } : prev))}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  >
                    {DAY_OPTIONS.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="job-time" className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                  <select
                    id="job-time"
                    value={jobDraft.time}
                    onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, time: e.target.value } : prev))}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="job-price" className="block text-sm font-semibold text-gray-700 mb-1">Quoted Price ($)</label>
                <input
                  id="job-price"
                  type="number"
                  min="0"
                  value={jobDraft.price}
                  onChange={(e) => setJobDraft((prev) => (prev ? { ...prev, price: e.target.value } : prev))}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>
              {jobDraftError && (
                <p className="text-sm font-semibold text-red-600">{jobDraftError}</p>
              )}
              <button
                onClick={saveJobDraft}
                className="w-full px-4 py-3 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {jobDraft.id ? 'Save Changes' : 'Add to Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
