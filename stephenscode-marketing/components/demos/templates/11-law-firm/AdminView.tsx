import React from 'react';
import { Scale, Users, FileText, Award, DollarSign, TrendingUp, Calendar, BookOpen, X, Download, Plus } from 'lucide-react';

interface AdminViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

interface CaseRecord {
  id: string;
  client: string;
  type: string;
  attorney: string;
  status: string;
  value: string;
  filed: string;
  nextEvent: string;
  notes: string;
}

interface FirmEvent {
  date: string;
  time: string;
  event: string;
  attorney: string;
}

interface ActivityEntry {
  title: string;
  detail: string;
}

const CASES_KEY = 'lawfirm-admin-cases-v1';
const EVENTS_KEY = 'lawfirm-admin-events-v1';
const ACTIVITY_KEY = 'lawfirm-admin-activity-v1';

const DEFAULT_CASES: CaseRecord[] = [
  { id: 'PI-2024-1847', client: 'Johnson, M.', type: 'Personal Injury', attorney: 'Robert Justice', status: 'Active', value: '$850K', filed: 'Aug 12, 2024', nextEvent: 'Deposition, Nov 16', notes: 'Liability conceded by insurer. Damages negotiation in progress.' },
  { id: 'CR-2024-0923', client: 'Chen, L.', type: 'Criminal Defense', attorney: 'Sarah Mitchell', status: 'Trial', value: 'N/A', filed: 'May 3, 2024', nextEvent: 'Trial begins Nov 15', notes: 'Motion to suppress granted in part. Jury selection complete.' },
  { id: 'FL-2024-1556', client: 'Rodriguez, E.', type: 'Family Law', attorney: 'Emily Rodriguez', status: 'Mediation', value: 'N/A', filed: 'Jun 21, 2024', nextEvent: 'Mediation session Nov 15', notes: 'Custody framework agreed. Asset division still contested.' },
  { id: 'BL-2024-1203', client: 'TechStart Inc.', type: 'Business Law', attorney: 'Michael Chen', status: 'Active', value: '$125K', filed: 'Jul 9, 2024', nextEvent: 'Client meeting Nov 16', notes: 'Contract dispute with vendor. Discovery requests served.' },
  { id: 'PI-2024-1799', client: 'Williams, T.', type: 'Personal Injury', attorney: 'Robert Justice', status: 'Settlement', value: '$425K', filed: 'Mar 28, 2024', nextEvent: 'Settlement conference Nov 21', notes: 'Insurer offer at $390K. Countered at $460K.' },
  { id: 'IM-2024-0644', client: 'Park Family', type: 'Immigration', attorney: 'Jennifer Park', status: 'Active', value: 'N/A', filed: 'Feb 14, 2024', nextEvent: 'Immigration hearing Nov 17', notes: 'Family-based petition. Supporting documentation filed.' },
  { id: 'RE-2024-1102', client: 'Hargrove Properties', type: 'Real Estate', attorney: 'David Thompson', status: 'Active', value: '$310K', filed: 'Sep 2, 2024', nextEvent: 'Title review due Nov 22', notes: 'Commercial closing. Lien search returned two open items.' },
  { id: 'EM-2024-0987', client: 'Alvarez, D.', type: 'Employment Law', attorney: 'Jennifer Park', status: 'Mediation', value: '$95K', filed: 'Apr 17, 2024', nextEvent: 'Mediation Dec 2', notes: 'Wrongful termination claim. EEOC right-to-sue letter received.' },
  { id: 'FL-2024-1620', client: 'Bennett, S.', type: 'Family Law', attorney: 'Emily Rodriguez', status: 'Active', value: 'N/A', filed: 'Sep 30, 2024', nextEvent: 'Financial disclosures due Nov 25', notes: 'Uncontested divorce. Drafting settlement agreement.' },
  { id: 'CR-2024-1015', client: 'Osei, K.', type: 'Criminal Defense', attorney: 'Sarah Mitchell', status: 'Settlement', value: 'N/A', filed: 'Aug 25, 2024', nextEvent: 'Plea hearing Dec 4', notes: 'Negotiating reduced charge. Client reviewing plea terms.' },
];

const DEFAULT_EVENTS: FirmEvent[] = [
  { date: 'Nov 15', time: '10:00 AM', event: 'Trial: State v. Chen', attorney: 'Sarah Mitchell' },
  { date: 'Nov 15', time: '2:00 PM', event: 'Mediation: Rodriguez Divorce', attorney: 'Emily Rodriguez' },
  { date: 'Nov 16', time: '9:30 AM', event: 'Client Meeting: TechStart Inc.', attorney: 'Michael Chen' },
  { date: 'Nov 16', time: '3:00 PM', event: 'Deposition: Johnson v. ABC Corp', attorney: 'Robert Justice' },
  { date: 'Nov 17', time: '11:00 AM', event: 'Immigration Hearing: Park Family', attorney: 'Jennifer Park' },
];

const DEFAULT_ACTIVITY: ActivityEntry[] = [
  { title: 'Settlement reached', detail: 'Johnson v. ABC Corp, 2 hours ago' },
  { title: 'New consultation booked', detail: 'Personal Injury, 4 hours ago' },
  { title: 'Document filed', detail: 'Motion to Dismiss, 5 hours ago' },
  { title: 'Court date set', detail: 'Chen trial, 6 hours ago' },
];

const CASE_TYPES = ['Personal Injury', 'Criminal Defense', 'Family Law', 'Estate Planning', 'Business Law', 'Real Estate', 'Immigration', 'Employment Law'];

const TYPE_PREFIX: Record<string, string> = {
  'Personal Injury': 'PI',
  'Criminal Defense': 'CR',
  'Family Law': 'FL',
  'Estate Planning': 'EP',
  'Business Law': 'BL',
  'Real Estate': 'RE',
  'Immigration': 'IM',
  'Employment Law': 'EM',
};

const ATTORNEYS = ['Robert Justice', 'Sarah Mitchell', 'Michael Chen', 'Emily Rodriguez', 'David Thompson', 'Jennifer Park'];

const STATUS_OPTIONS = ['Active', 'Trial', 'Mediation', 'Settlement', 'Closed'];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

function statusColors(status: string) {
  switch (status) {
    case 'Active': return { bg: '#3b82f620', fg: '#3b82f6' };
    case 'Trial': return { bg: '#ef444420', fg: '#ef4444' };
    case 'Settlement': return { bg: '#22c55e20', fg: '#22c55e' };
    case 'Closed': return { bg: '#6b728020', fg: '#6b7280' };
    default: return { bg: '#f59e0b20', fg: '#f59e0b' };
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function shortDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  primaryColor: string;
  wide?: boolean;
}

function ModalShell({ title, onClose, children, primaryColor, wide }: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className={`bg-white rounded-lg shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-bold" style={{ color: primaryColor }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function AdminView({
  primaryColor = '#1a1a2e',
  secondaryColor = '#16213e',
  accentColor = '#c9a227',
}: AdminViewProps) {
  const [cases, setCases] = React.useState<CaseRecord[]>(DEFAULT_CASES);
  const [events, setEvents] = React.useState<FirmEvent[]>(DEFAULT_EVENTS);
  const [activity, setActivity] = React.useState<ActivityEntry[]>(DEFAULT_ACTIVITY);
  const loadedRef = React.useRef(false);

  const [statusFilter, setStatusFilter] = React.useState('All');
  const [showAll, setShowAll] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState<'intake' | 'consult' | 'report' | 'calendar' | null>(null);
  const [selectedCase, setSelectedCase] = React.useState<CaseRecord | null>(null);
  const [editStatus, setEditStatus] = React.useState('Active');
  const [editNotes, setEditNotes] = React.useState('');
  const [confirmation, setConfirmation] = React.useState('');

  const [intakeForm, setIntakeForm] = React.useState({ client: '', type: 'Personal Injury', attorney: 'Robert Justice', value: '', notes: '' });
  const [consultForm, setConsultForm] = React.useState({ client: '', type: 'Personal Injury', attorney: 'Robert Justice', date: '', time: '10:00 AM' });

  React.useEffect(() => {
    try {
      const c = localStorage.getItem(CASES_KEY);
      if (c) setCases(JSON.parse(c));
      const ev = localStorage.getItem(EVENTS_KEY);
      if (ev) setEvents(JSON.parse(ev));
      const act = localStorage.getItem(ACTIVITY_KEY);
      if (act) setActivity(JSON.parse(act));
    } catch { /* corrupted storage falls back to defaults */ }
    loadedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (!loadedRef.current) return;
    try { localStorage.setItem(CASES_KEY, JSON.stringify(cases)); } catch { /* storage unavailable */ }
  }, [cases]);

  React.useEffect(() => {
    if (!loadedRef.current) return;
    try { localStorage.setItem(EVENTS_KEY, JSON.stringify(events)); } catch { /* storage unavailable */ }
  }, [events]);

  React.useEffect(() => {
    if (!loadedRef.current) return;
    try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity)); } catch { /* storage unavailable */ }
  }, [activity]);

  React.useEffect(() => {
    if (!confirmation) return;
    const t = setTimeout(() => setConfirmation(''), 4000);
    return () => clearTimeout(t);
  }, [confirmation]);

  const logActivity = (title: string, detail: string) => {
    setActivity((prev) => [{ title, detail }, ...prev].slice(0, 8));
  };

  const openCase = (record: CaseRecord) => {
    setSelectedCase(record);
    setEditStatus(record.status);
    setEditNotes(record.notes);
  };

  const saveCase = () => {
    if (!selectedCase) return;
    setCases((prev) => prev.map((c) => (c.id === selectedCase.id ? { ...c, status: editStatus, notes: editNotes } : c)));
    if (editStatus !== selectedCase.status) {
      logActivity('Case status updated', `${selectedCase.id} moved to ${editStatus}`);
    } else {
      logActivity('Case notes updated', `${selectedCase.id}, just now`);
    }
    setSelectedCase(null);
    setConfirmation(`Case ${selectedCase.id} updated.`);
  };

  const removeCase = () => {
    if (!selectedCase) return;
    setCases((prev) => prev.filter((c) => c.id !== selectedCase.id));
    logActivity('Case archived', `${selectedCase.id} removed from active list`);
    setSelectedCase(null);
    setConfirmation(`Case ${selectedCase.id} archived.`);
  };

  const submitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = TYPE_PREFIX[intakeForm.type] || 'GN';
    const year = new Date().getFullYear();
    const id = `${prefix}-${year}-${1000 + Math.floor(Math.random() * 9000)}`;
    const filed = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newCase: CaseRecord = {
      id,
      client: intakeForm.client.trim(),
      type: intakeForm.type,
      attorney: intakeForm.attorney,
      status: 'Active',
      value: intakeForm.value.trim() || 'N/A',
      filed,
      nextEvent: 'Initial strategy meeting',
      notes: intakeForm.notes.trim() || 'New intake. Conflict check cleared.',
    };
    setCases((prev) => [newCase, ...prev]);
    logActivity('New case opened', `${id}, ${intakeForm.type}`);
    setIntakeForm({ client: '', type: 'Personal Injury', attorney: 'Robert Justice', value: '', notes: '' });
    setActiveModal(null);
    setConfirmation(`Case ${id} created and assigned to ${newCase.attorney}.`);
  };

  const submitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: FirmEvent = {
      date: consultForm.date ? shortDate(consultForm.date) : 'TBD',
      time: consultForm.time,
      event: `Consultation: ${consultForm.client.trim()} (${consultForm.type})`,
      attorney: consultForm.attorney,
    };
    setEvents((prev) => [...prev, newEvent]);
    logActivity('New consultation booked', `${consultForm.type}, just now`);
    setConsultForm({ client: '', type: 'Personal Injury', attorney: 'Robert Justice', date: '', time: '10:00 AM' });
    setActiveModal(null);
    setConfirmation(`Consultation scheduled for ${newEvent.date} at ${newEvent.time}.`);
  };

  const practiceAreaMetrics = [
    { area: 'Personal Injury', active: 78, winRate: '96%', revenue: '$2.4M' },
    { area: 'Criminal Defense', active: 45, winRate: '92%', revenue: '$850K' },
    { area: 'Family Law', active: 52, winRate: '88%', revenue: '$680K' },
    { area: 'Business Law', active: 31, winRate: '94%', revenue: '$1.2M' },
    { area: 'Real Estate', active: 23, winRate: '98%', revenue: '$560K' },
    { area: 'Immigration', active: 18, winRate: '89%', revenue: '$320K' },
  ];

  const activeCaseCount = 237 + cases.filter((c) => c.status !== 'Closed').length;
  const consultationCount = 38 + events.length;

  const stats = [
    { label: 'Active Cases', value: String(activeCaseCount), icon: FileText, change: '+12%' },
    { label: 'New Consultations', value: String(consultationCount), icon: Users, change: '+8%' },
    { label: 'Cases Won This Month', value: '18', icon: Award, change: '+15%' },
    { label: 'Revenue This Month', value: '$485K', icon: DollarSign, change: '+22%' },
  ];

  const filteredCases = statusFilter === 'All' ? cases : cases.filter((c) => c.status === statusFilter);
  const visibleCases = showAll ? filteredCases : filteredCases.slice(0, 5);

  const generateReport = () => {
    const lines: string[] = [
      'JUSTICE & ASSOCIATES LAW',
      'Monthly Performance Report',
      `Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      '',
      'FIRM SNAPSHOT',
      `  Active cases: ${activeCaseCount}`,
      `  New consultations: ${consultationCount}`,
      '  Cases won this month: 18',
      '  Revenue this month: $485K',
      '',
      'PRACTICE AREA PERFORMANCE',
      ...practiceAreaMetrics.map((m) => `  ${m.area}: ${m.active} active | Win rate ${m.winRate} | Revenue YTD ${m.revenue}`),
      '',
      'RECENT CASES',
      ...cases.map((c) => `  ${c.id} | ${c.client} | ${c.type} | ${c.attorney} | ${c.status} | ${c.value}`),
      '',
      'Demonstration report generated with sample data.',
    ];
    downloadTextFile('justice-associates-monthly-report.txt', lines.join('\n'));
    logActivity('Report generated', 'Monthly performance report, just now');
    setConfirmation('Monthly report downloaded.');
  };

  const groupedEvents = events.reduce<Record<string, FirmEvent[]>>((acc, ev) => {
    (acc[ev.date] = acc[ev.date] || []).push(ev);
    return acc;
  }, {});

  const inputClass = 'w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-gray-400 text-sm';
  const labelClass = 'block text-sm font-bold mb-1';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{ backgroundColor: secondaryColor, color: '#ffffff' }} className="shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <Scale className="w-7 h-7" style={{ color: secondaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Justice & Associates</h1>
                <p className="text-sm" style={{ color: accentColor }}>Admin Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Welcome back,</p>
              <p className="font-bold">Managing Partner</p>
            </div>
          </div>
        </div>
      </header>

      {confirmation && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div
            className="rounded-lg px-4 py-3 text-sm font-medium"
            style={{ backgroundColor: '#22c55e20', color: '#15803d' }}
          >
            {confirmation}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6" style={{ color: accentColor }} />
                  <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                    Recent Cases
                  </h2>
                </div>
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                  style={{ backgroundColor: `${accentColor}20`, color: primaryColor }}
                >
                  {showAll ? 'Show Recent' : `View All (${filteredCases.length})`}
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', ...STATUS_OPTIONS].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                    style={{
                      backgroundColor: statusFilter === status ? accentColor : '#f1f5f9',
                      color: statusFilter === status ? secondaryColor : '#475569',
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: `${accentColor}40` }}>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Case ID
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Client
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Type
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Attorney
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Status
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-bold" style={{ color: primaryColor }}>
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleCases.map((case_) => {
                      const colors = statusColors(case_.status);
                      return (
                        <tr
                          key={case_.id}
                          onClick={() => openCase(case_)}
                          className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="py-3 px-2 text-sm font-mono" style={{ color: accentColor }}>
                            {case_.id}
                          </td>
                          <td className="py-3 px-2 text-sm">{case_.client}</td>
                          <td className="py-3 px-2 text-sm">{case_.type}</td>
                          <td className="py-3 px-2 text-sm">{case_.attorney}</td>
                          <td className="py-3 px-2">
                            <span
                              className="px-2 py-1 rounded text-xs font-medium"
                              style={{ backgroundColor: colors.bg, color: colors.fg }}
                            >
                              {case_.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm font-bold">{case_.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {visibleCases.length === 0 && (
                  <p className="text-sm text-gray-500 py-6 text-center">
                    No cases match this filter. Choose another status or add a new case.
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-3">Click any case row to view and update its details.</p>
            </div>

            {/* Practice Area Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                  Practice Area Performance
                </h2>
              </div>

              <div className="space-y-4">
                {practiceAreaMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: primaryColor }}>{metric.area}</h3>
                      <p className="text-sm text-gray-600">{metric.active} active cases</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-1">
                        <span className="text-gray-600">Win Rate:</span>
                        <span className="font-bold ml-2" style={{ color: accentColor }}>{metric.winRate}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Revenue YTD:</span>
                        <span className="font-bold ml-2" style={{ color: primaryColor }}>{metric.revenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Upcoming Events
                </h2>
              </div>

              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="text-center flex-shrink-0">
                        <div className="text-xs font-bold" style={{ color: accentColor }}>
                          {event.date.split(' ')[0]}
                        </div>
                        <div className="text-xl font-bold" style={{ color: primaryColor }}>
                          {event.date.split(' ')[1]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: primaryColor }}>
                          {event.event}
                        </p>
                        <p className="text-xs text-gray-600">{event.attorney}</p>
                        <p className="text-xs" style={{ color: accentColor }}>{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal('intake')}
                  className="w-full py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: secondaryColor }}
                >
                  New Case Intake
                </button>
                <button
                  onClick={() => setActiveModal('consult')}
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  Schedule Consultation
                </button>
                <button
                  onClick={() => setActiveModal('report')}
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  Generate Report
                </button>
                <button
                  onClick={() => setActiveModal('calendar')}
                  className="w-full py-3 rounded-lg font-medium text-sm border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: `${accentColor}40`, color: primaryColor }}
                >
                  View Calendar
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-6 h-6" style={{ color: accentColor }} />
                <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                {activity.map((entry, index) => (
                  <div key={index} className={index < activity.length - 1 ? 'pb-3 border-b border-gray-100' : ''}>
                    <p className="font-medium" style={{ color: primaryColor }}>{entry.title}</p>
                    <p className="text-xs text-gray-600">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <ModalShell title={`Case ${selectedCase.id}`} onClose={() => setSelectedCase(null)} primaryColor={primaryColor}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Client</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.client}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Practice Area</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Lead Attorney</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.attorney}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Estimated Value</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.value}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Date Filed</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.filed}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Next Event</p>
                <p className="font-bold" style={{ color: primaryColor }}>{selectedCase.nextEvent}</p>
              </div>
            </div>

            <div>
              <label htmlFor="lawfirm-case-status" className={labelClass} style={{ color: primaryColor }}>Status</label>
              <select
                id="lawfirm-case-status"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="lawfirm-case-notes" className={labelClass} style={{ color: primaryColor }}>Case Notes</label>
              <textarea
                id="lawfirm-case-notes"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={saveCase}
                className="flex-1 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: accentColor, color: secondaryColor }}
              >
                Save Changes
              </button>
              <button
                onClick={removeCase}
                className="px-4 py-3 rounded-lg font-bold text-sm border-2 transition-all hover:bg-red-50"
                style={{ borderColor: '#ef444440', color: '#ef4444' }}
              >
                Archive Case
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* New Case Intake Modal */}
      {activeModal === 'intake' && (
        <ModalShell title="New Case Intake" onClose={() => setActiveModal(null)} primaryColor={primaryColor}>
          <form onSubmit={submitIntake} className="space-y-4">
            <div>
              <label htmlFor="lawfirm-intake-client" className={labelClass} style={{ color: primaryColor }}>Client Name *</label>
              <input
                id="lawfirm-intake-client"
                type="text"
                required
                value={intakeForm.client}
                onChange={(e) => setIntakeForm({ ...intakeForm, client: e.target.value })}
                className={inputClass}
                placeholder="Last, First or Company"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lawfirm-intake-type" className={labelClass} style={{ color: primaryColor }}>Practice Area *</label>
                <select
                  id="lawfirm-intake-type"
                  value={intakeForm.type}
                  onChange={(e) => setIntakeForm({ ...intakeForm, type: e.target.value })}
                  className={inputClass}
                >
                  {CASE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="lawfirm-intake-attorney" className={labelClass} style={{ color: primaryColor }}>Assigned Attorney *</label>
                <select
                  id="lawfirm-intake-attorney"
                  value={intakeForm.attorney}
                  onChange={(e) => setIntakeForm({ ...intakeForm, attorney: e.target.value })}
                  className={inputClass}
                >
                  {ATTORNEYS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="lawfirm-intake-value" className={labelClass} style={{ color: primaryColor }}>Estimated Value</label>
              <input
                id="lawfirm-intake-value"
                type="text"
                value={intakeForm.value}
                onChange={(e) => setIntakeForm({ ...intakeForm, value: e.target.value })}
                className={inputClass}
                placeholder="$250K (optional)"
              />
            </div>
            <div>
              <label htmlFor="lawfirm-intake-notes" className={labelClass} style={{ color: primaryColor }}>Intake Notes</label>
              <textarea
                id="lawfirm-intake-notes"
                value={intakeForm.notes}
                onChange={(e) => setIntakeForm({ ...intakeForm, notes: e.target.value })}
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Summary of the matter..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: secondaryColor }}
            >
              <Plus className="w-4 h-4" />
              Open Case
            </button>
          </form>
        </ModalShell>
      )}

      {/* Schedule Consultation Modal */}
      {activeModal === 'consult' && (
        <ModalShell title="Schedule Consultation" onClose={() => setActiveModal(null)} primaryColor={primaryColor}>
          <form onSubmit={submitConsult} className="space-y-4">
            <div>
              <label htmlFor="lawfirm-consult-client" className={labelClass} style={{ color: primaryColor }}>Prospective Client *</label>
              <input
                id="lawfirm-consult-client"
                type="text"
                required
                value={consultForm.client}
                onChange={(e) => setConsultForm({ ...consultForm, client: e.target.value })}
                className={inputClass}
                placeholder="Client name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lawfirm-consult-type" className={labelClass} style={{ color: primaryColor }}>Matter Type *</label>
                <select
                  id="lawfirm-consult-type"
                  value={consultForm.type}
                  onChange={(e) => setConsultForm({ ...consultForm, type: e.target.value })}
                  className={inputClass}
                >
                  {CASE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="lawfirm-consult-attorney" className={labelClass} style={{ color: primaryColor }}>Attorney *</label>
                <select
                  id="lawfirm-consult-attorney"
                  value={consultForm.attorney}
                  onChange={(e) => setConsultForm({ ...consultForm, attorney: e.target.value })}
                  className={inputClass}
                >
                  {ATTORNEYS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lawfirm-consult-date" className={labelClass} style={{ color: primaryColor }}>Date *</label>
                <input
                  id="lawfirm-consult-date"
                  type="date"
                  required
                  value={consultForm.date}
                  onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lawfirm-consult-time" className={labelClass} style={{ color: primaryColor }}>Time *</label>
                <select
                  id="lawfirm-consult-time"
                  value={consultForm.time}
                  onChange={(e) => setConsultForm({ ...consultForm, time: e.target.value })}
                  className={inputClass}
                >
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: secondaryColor }}
            >
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </button>
          </form>
        </ModalShell>
      )}

      {/* Generate Report Modal */}
      {activeModal === 'report' && (
        <ModalShell title="Monthly Performance Report" onClose={() => setActiveModal(null)} primaryColor={primaryColor} wide>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-lg text-center" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="text-2xl font-bold" style={{ color: accentColor }}>{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: primaryColor }}>
                Practice Area Performance
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: `${accentColor}40` }}>
                      <th className="text-left py-2 px-2 font-bold" style={{ color: primaryColor }}>Area</th>
                      <th className="text-right py-2 px-2 font-bold" style={{ color: primaryColor }}>Active</th>
                      <th className="text-right py-2 px-2 font-bold" style={{ color: primaryColor }}>Win Rate</th>
                      <th className="text-right py-2 px-2 font-bold" style={{ color: primaryColor }}>Revenue YTD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practiceAreaMetrics.map((m, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2">{m.area}</td>
                        <td className="py-2 px-2 text-right">{m.active}</td>
                        <td className="py-2 px-2 text-right font-bold" style={{ color: accentColor }}>{m.winRate}</td>
                        <td className="py-2 px-2 text-right font-bold">{m.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={generateReport}
              className="w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: secondaryColor }}
            >
              <Download className="w-4 h-4" />
              Download Full Report
            </button>
          </div>
        </ModalShell>
      )}

      {/* Calendar Modal */}
      {activeModal === 'calendar' && (
        <ModalShell title="Firm Calendar" onClose={() => setActiveModal(null)} primaryColor={primaryColor} wide>
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, dayEvents]) => (
              <div key={date}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                  style={{ backgroundColor: accentColor, color: secondaryColor }}
                >
                  {date}
                </div>
                <div className="space-y-2">
                  {dayEvents.map((ev, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <div className="min-w-0 pr-4">
                        <p className="text-sm font-bold truncate" style={{ color: primaryColor }}>{ev.event}</p>
                        <p className="text-xs text-gray-600">{ev.attorney}</p>
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: accentColor }}>{ev.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setActiveModal('consult');
              }}
              className="w-full py-3 rounded-lg font-bold text-sm border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: `${accentColor}40`, color: primaryColor }}
            >
              Schedule a Consultation
            </button>
          </div>
        </ModalShell>
      )}
    </div>
  );
}
