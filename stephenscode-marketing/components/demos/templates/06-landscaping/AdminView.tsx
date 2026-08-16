'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  Mail,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  Award,
  BarChart3,
  X,
  Download,
  Filter,
  Send
} from 'lucide-react';

interface AdminViewProps {
  onSwitchToCustomer?: () => void;
}

type LeadStatus = 'new' | 'contacted' | 'quoted';

interface Lead {
  id: number;
  name: string;
  service: string;
  date: string;
  status: LeadStatus;
  value: string;
  email: string;
  phone: string;
}

interface Appointment {
  id: number;
  client: string;
  service: string;
  date: string;
  location: string;
}

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  status: 'published' | 'pending';
  date: string;
  text: string;
}

interface GalleryProject {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'draft';
  images: number;
}

interface SettingsData {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

type ModalState =
  | { type: 'lead-view'; id: number }
  | { type: 'lead-edit'; id: number }
  | { type: 'appointment-add' }
  | { type: 'testimonial-add' }
  | { type: 'testimonial-view'; id: number }
  | { type: 'testimonial-edit'; id: number }
  | { type: 'testimonial-delete'; id: number }
  | { type: 'project-add' }
  | { type: 'project-view'; id: number }
  | { type: 'project-edit'; id: number }
  | { type: 'email-compose' }
  | { type: 'quote-create' }
  | { type: 'reports' }
  | null;

const STORAGE_KEY = 'demo-landscaping-admin';

const defaultLeads: Lead[] = [
  { id: 1, name: 'Sarah Mitchell', service: 'Landscape Design', date: '2 hours ago', status: 'new', value: '$3,500', email: 'sarah.m@example.com', phone: '(555) 201-4478' },
  { id: 2, name: 'Michael Chen', service: 'Hardscaping', date: '5 hours ago', status: 'contacted', value: '$8,200', email: 'mchen@example.com', phone: '(555) 335-9821' },
  { id: 3, name: 'Jennifer Rodriguez', service: 'Lawn Care', date: '1 day ago', status: 'quoted', value: '$850', email: 'jrodriguez@example.com', phone: '(555) 442-1076' },
  { id: 4, name: 'David Thompson', service: 'Irrigation System', date: '1 day ago', status: 'new', value: '$2,400', email: 'dthompson@example.com', phone: '(555) 518-6390' },
  { id: 5, name: 'Lisa Anderson', service: 'Seasonal Cleanup', date: '2 days ago', status: 'contacted', value: '$450', email: 'landerson@example.com', phone: '(555) 623-8845' }
];

const defaultAppointments: Appointment[] = [
  { id: 1, client: 'Robert Williams', service: 'Site Consultation', date: 'Today, 2:00 PM', location: 'Highland Park' },
  { id: 2, client: 'Emily Parker', service: 'Project Review', date: 'Tomorrow, 10:00 AM', location: 'Cedar Lane' },
  { id: 3, client: 'James Martin', service: 'Final Walkthrough', date: 'Mar 15, 3:00 PM', location: 'Forest View' }
];

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: 'Amanda Taylor', rating: 5, status: 'published', date: 'Mar 10, 2024', text: 'The outdoor kitchen exceeded all expectations! We now entertain outdoors year-round. The quality of materials and installation is outstanding.' },
  { id: 2, name: 'Christopher Lee', rating: 5, status: 'pending', date: 'Mar 12, 2024', text: 'Best lawn care service we have ever used! They take pride in their work and it shows. Our lawn is the envy of the neighborhood.' },
  { id: 3, name: 'Patricia Hughes', rating: 5, status: 'published', date: 'Mar 11, 2024', text: 'The front yard redesign completely transformed the look of our home. Professional crew, on schedule, and spotless cleanup.' }
];

const defaultProjects: GalleryProject[] = [
  { id: 1, title: 'Modern Backyard Transformation', category: 'Landscape Design', status: 'published', images: 2 },
  { id: 2, title: 'Custom Stone Patio', category: 'Hardscaping', status: 'published', images: 2 },
  { id: 3, title: 'Lawn Restoration', category: 'Lawn Care', status: 'draft', images: 2 }
];

const defaultSettings: SettingsData = {
  businessName: 'Green Valley Landscaping',
  phone: '(555) 012-3456',
  email: 'info@greenvalley.com',
  address: '123 Garden Lane, Green Valley, ST 12345',
  description: 'Professional landscaping services for over 15 years. We create beautiful, sustainable outdoor environments.'
};

const serviceOptions = [
  'Lawn Care',
  'Landscape Design',
  'Hardscaping',
  'Irrigation System',
  'Tree & Shrub Care',
  'Seasonal Cleanup',
  'Outdoor Lighting',
  'Mulching & Edging'
];

const monthlyRevenue = [
  { month: 'March', value: 32400 },
  { month: 'April', value: 38900 },
  { month: 'May', value: 45100 },
  { month: 'June', value: 41800 },
  { month: 'July', value: 46600 },
  { month: 'August', value: 48250 }
];

const leadSources = [
  { source: 'Referrals', share: 38 },
  { source: 'Google Search', share: 27 },
  { source: 'Repeat Clients', share: 21 },
  { source: 'Social Media', share: 14 }
];

const inputCls = 'w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#a7c957] focus:outline-none transition-colors';
const labelCls = 'block text-sm font-semibold text-[#386641] mb-2';

const formatDateTime = (dateStr: string, timeStr: string) => {
  const date = new Date(`${dateStr}T${timeStr || '09:00'}`);
  if (isNaN(date.getTime())) return `${dateStr}, ${timeStr}`;
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
};

const todayLabel = () =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function AdminView({ onSwitchToCustomer }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(defaultLeads);
  const [appointments, setAppointments] = useState<Appointment[]>(defaultAppointments);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>(defaultProjects);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [leadFilter, setLeadFilter] = useState<'all' | LeadStatus>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted admin data after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.leads)) setLeads(data.leads);
        if (Array.isArray(data.appointments)) setAppointments(data.appointments);
        if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
        if (Array.isArray(data.galleryProjects)) setGalleryProjects(data.galleryProjects);
        if (data.settings) setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch {
      // Corrupt or unavailable storage: fall back to defaults
    }
    setHydrated(true);
  }, []);

  // Persist admin data whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ leads, appointments, testimonials, galleryProjects, settings })
      );
    } catch {
      // Storage full or unavailable: state still works in-memory
    }
  }, [hydrated, leads, appointments, testimonials, galleryProjects, settings]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const openModal = (next: Exclude<ModalState, null>, initial: Record<string, string> = {}) => {
    setDraft(initial);
    setModal(next);
  };

  const closeModal = () => setModal(null);

  const setField = (key: string, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const stats = [
    { label: 'Total Leads', value: String(42 + leads.length), change: '+12%', icon: <Users />, color: 'from-[#386641] to-[#6a994e]' },
    { label: 'Active Projects', value: String(20 + galleryProjects.length), change: '+5', icon: <FileText />, color: 'from-[#6a994e] to-[#a7c957]' },
    { label: 'This Month Revenue', value: '$48,250', change: '+18%', icon: <DollarSign />, color: 'from-[#386641] to-[#6a994e]' },
    { label: 'Customer Rating', value: '4.9', change: '+0.2', icon: <Award />, color: 'from-[#6a994e] to-[#a7c957]' }
  ];

  const visibleLeads = leadFilter === 'all' ? leads : leads.filter((l) => l.status === leadFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'quoted':
        return 'bg-purple-100 text-purple-700';
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // ---- Action handlers ----

  const saveLeadEdit = (id: number) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              name: draft.name || l.name,
              service: draft.service || l.service,
              value: draft.value || l.value,
              status: (draft.status as LeadStatus) || l.status
            }
          : l
      )
    );
    closeModal();
    setToast('Lead updated');
  };

  const exportLeads = () => {
    const rows = [
      ['Name', 'Service', 'Value', 'Status', 'Date', 'Email', 'Phone'],
      ...visibleLeads.map((l) => [l.name, l.service, l.value, l.status, l.date, l.email, l.phone])
    ];
    const csv = rows
      .map((r) => r.map((f) => `"${String(f).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'green-valley-leads.csv';
    a.click();
    URL.revokeObjectURL(url);
    setToast(`Exported ${visibleLeads.length} leads to CSV`);
  };

  const addAppointment = () => {
    setAppointments((prev) => [
      ...prev,
      {
        id: Date.now(),
        client: draft.client || '',
        service: draft.service || 'Site Consultation',
        date: formatDateTime(draft.date || '', draft.time || ''),
        location: draft.location || ''
      }
    ]);
    closeModal();
    setToast(`Appointment scheduled with ${draft.client}`);
  };

  const addTestimonial = () => {
    setTestimonials((prev) => [
      {
        id: Date.now(),
        name: draft.name || '',
        rating: Number(draft.rating || 5),
        status: (draft.status as 'published' | 'pending') || 'pending',
        date: todayLabel(),
        text: draft.text || ''
      },
      ...prev
    ]);
    closeModal();
    setToast('Testimonial added');
  };

  const saveTestimonialEdit = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              name: draft.name || t.name,
              rating: Number(draft.rating || t.rating),
              status: (draft.status as 'published' | 'pending') || t.status,
              text: draft.text ?? t.text
            }
          : t
      )
    );
    closeModal();
    setToast('Testimonial updated');
  };

  const deleteTestimonial = (id: number) => {
    const removed = testimonials.find((t) => t.id === id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    closeModal();
    setToast(removed ? `Testimonial from ${removed.name} deleted` : 'Testimonial deleted');
  };

  const addProject = () => {
    setGalleryProjects((prev) => [
      {
        id: Date.now(),
        title: draft.title || '',
        category: draft.category || 'Landscape Design',
        status: (draft.status as 'published' | 'draft') || 'draft',
        images: Number(draft.images || 2)
      },
      ...prev
    ]);
    closeModal();
    setActiveTab('gallery');
    setToast('Project added to gallery');
  };

  const saveProjectEdit = (id: number) => {
    setGalleryProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: draft.title || p.title,
              category: draft.category || p.category,
              status: (draft.status as 'published' | 'draft') || p.status,
              images: Number(draft.images || p.images)
            }
          : p
      )
    );
    closeModal();
    setToast('Project updated');
  };

  const sendEmail = () => {
    closeModal();
    setToast(`Email sent to ${draft.to || 'client'}`);
  };

  const createQuote = () => {
    const amount = Number(draft.amount || 0);
    setLeads((prev) => [
      {
        id: Date.now(),
        name: draft.client || '',
        service: draft.service || 'Landscape Design',
        date: 'Just now',
        status: 'quoted',
        value: `$${amount.toLocaleString()}`,
        email: '',
        phone: ''
      },
      ...prev
    ]);
    closeModal();
    setActiveTab('leads');
    setToast(`Quote created for ${draft.client}`);
  };

  const saveSettings = () => {
    setToast('Settings saved');
  };

  // ---- Modal rendering ----

  const renderModal = () => {
    if (!modal) return null;

    let title = '';
    let body: React.ReactNode = null;

    const lead = 'id' in modal ? leads.find((l) => l.id === modal.id) : undefined;
    const testimonial = 'id' in modal ? testimonials.find((t) => t.id === modal.id) : undefined;
    const project = 'id' in modal ? galleryProjects.find((p) => p.id === modal.id) : undefined;

    switch (modal.type) {
      case 'lead-view': {
        if (!lead) return null;
        title = 'Lead Details';
        body = (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-[#386641]">{lead.name}</div>
                <div className="text-sm text-gray-500">{lead.date}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Service Requested</div>
                <div className="font-semibold text-[#386641]">{lead.service}</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Estimated Value</div>
                <div className="font-bold text-[#6a994e]">{lead.value}</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold text-[#386641] break-all">{lead.email || 'Not provided'}</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Phone</div>
                <div className="font-semibold text-[#386641]">{lead.phone || 'Not provided'}</div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() =>
                  openModal(
                    { type: 'lead-edit', id: lead.id },
                    { name: lead.name, service: lead.service, value: lead.value, status: lead.status }
                  )
                }
                className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all"
              >
                Edit Lead
              </button>
              <button
                onClick={() => openModal({ type: 'email-compose' }, { to: lead.name, subject: `Your ${lead.service} estimate` })}
                className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all"
              >
                Email {lead.name.split(' ')[0]}
              </button>
            </div>
          </div>
        );
        break;
      }

      case 'lead-edit': {
        if (!lead) return null;
        title = 'Edit Lead';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveLeadEdit(lead.id);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-lead-name" className={labelCls}>Name</label>
              <input id="gv-lead-name" type="text" required value={draft.name || ''} onChange={(e) => setField('name', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label htmlFor="gv-lead-service" className={labelCls}>Service</label>
              <select id="gv-lead-service" value={draft.service || ''} onChange={(e) => setField('service', e.target.value)} className={inputCls}>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
                {draft.service && !serviceOptions.includes(draft.service) && (
                  <option value={draft.service}>{draft.service}</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="gv-lead-value" className={labelCls}>Estimated Value</label>
              <input id="gv-lead-value" type="text" required value={draft.value || ''} onChange={(e) => setField('value', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label htmlFor="gv-lead-status" className={labelCls}>Status</label>
              <select id="gv-lead-status" value={draft.status || 'new'} onChange={(e) => setField('status', e.target.value)} className={inputCls}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all">
                Save Changes
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'appointment-add': {
        title = 'Schedule Appointment';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addAppointment();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-apt-client" className={labelCls}>Client Name</label>
              <input id="gv-apt-client" type="text" required value={draft.client || ''} onChange={(e) => setField('client', e.target.value)} className={inputCls} placeholder="Client name" />
            </div>
            <div>
              <label htmlFor="gv-apt-service" className={labelCls}>Appointment Type</label>
              <select id="gv-apt-service" value={draft.service || 'Site Consultation'} onChange={(e) => setField('service', e.target.value)} className={inputCls}>
                <option>Site Consultation</option>
                <option>Project Review</option>
                <option>Final Walkthrough</option>
                <option>Maintenance Visit</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gv-apt-date" className={labelCls}>Date</label>
                <input id="gv-apt-date" type="date" required value={draft.date || ''} onChange={(e) => setField('date', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="gv-apt-time" className={labelCls}>Time</label>
                <input id="gv-apt-time" type="time" required value={draft.time || ''} onChange={(e) => setField('time', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="gv-apt-location" className={labelCls}>Location</label>
              <input id="gv-apt-location" type="text" required value={draft.location || ''} onChange={(e) => setField('location', e.target.value)} className={inputCls} placeholder="Neighborhood or address" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all">
                Schedule
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'testimonial-add':
      case 'testimonial-edit': {
        const isEdit = modal.type === 'testimonial-edit';
        if (isEdit && !testimonial) return null;
        title = isEdit ? 'Edit Testimonial' : 'Add Testimonial';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isEdit && testimonial) {
                saveTestimonialEdit(testimonial.id);
              } else {
                addTestimonial();
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-testimonial-name" className={labelCls}>Customer Name</label>
              <input id="gv-testimonial-name" type="text" required value={draft.name || ''} onChange={(e) => setField('name', e.target.value)} className={inputCls} placeholder="Customer name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gv-testimonial-rating" className={labelCls}>Rating</label>
                <select id="gv-testimonial-rating" value={draft.rating || '5'} onChange={(e) => setField('rating', e.target.value)} className={inputCls}>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} star{r > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gv-testimonial-status" className={labelCls}>Status</label>
                <select id="gv-testimonial-status" value={draft.status || 'pending'} onChange={(e) => setField('status', e.target.value)} className={inputCls}>
                  <option value="pending">Pending</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="gv-testimonial-text" className={labelCls}>Testimonial</label>
              <textarea id="gv-testimonial-text" required rows={4} value={draft.text || ''} onChange={(e) => setField('text', e.target.value)} className={`${inputCls} resize-none`} placeholder="What did the customer say?" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all">
                {isEdit ? 'Save Changes' : 'Add Testimonial'}
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'testimonial-view': {
        if (!testimonial) return null;
        title = 'Testimonial';
        body = (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-[#386641]">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.date}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(testimonial.status)}`}>
                {testimonial.status}
              </span>
            </div>
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Award key={i} className="h-5 w-5 text-[#a7c957] fill-[#a7c957]" />
              ))}
            </div>
            <p className="text-gray-700 italic bg-stone-50 rounded-xl p-4">
              &quot;{testimonial.text}&quot;
            </p>
            <button
              onClick={() =>
                openModal(
                  { type: 'testimonial-edit', id: testimonial.id },
                  { name: testimonial.name, rating: String(testimonial.rating), status: testimonial.status, text: testimonial.text }
                )
              }
              className="w-full px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all"
            >
              Edit Testimonial
            </button>
          </div>
        );
        break;
      }

      case 'testimonial-delete': {
        if (!testimonial) return null;
        title = 'Delete Testimonial';
        body = (
          <div className="space-y-6">
            <p className="text-gray-700">
              Remove the testimonial from <strong>{testimonial.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
              >
                Delete
              </button>
              <button onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </div>
        );
        break;
      }

      case 'project-add':
      case 'project-edit': {
        const isEdit = modal.type === 'project-edit';
        if (isEdit && !project) return null;
        title = isEdit ? 'Edit Project' : 'Add Project';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isEdit && project) {
                saveProjectEdit(project.id);
              } else {
                addProject();
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-project-title" className={labelCls}>Project Title</label>
              <input id="gv-project-title" type="text" required value={draft.title || ''} onChange={(e) => setField('title', e.target.value)} className={inputCls} placeholder="Project title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gv-project-category" className={labelCls}>Category</label>
                <select id="gv-project-category" value={draft.category || 'Landscape Design'} onChange={(e) => setField('category', e.target.value)} className={inputCls}>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gv-project-status" className={labelCls}>Status</label>
                <select id="gv-project-status" value={draft.status || 'draft'} onChange={(e) => setField('status', e.target.value)} className={inputCls}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="gv-project-images" className={labelCls}>Number of Images</label>
              <input id="gv-project-images" type="number" min="1" max="30" required value={draft.images || '2'} onChange={(e) => setField('images', e.target.value)} className={inputCls} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all">
                {isEdit ? 'Save Changes' : 'Add Project'}
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'project-view': {
        if (!project) return null;
        title = 'Project Details';
        body = (
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-[#6a994e] to-[#a7c957] rounded-xl flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-white opacity-50" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#386641]">{project.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="font-semibold text-[#386641]">{project.category}</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-1">Images</div>
                <div className="font-semibold text-[#386641]">{project.images} photos</div>
              </div>
            </div>
            <button
              onClick={() =>
                openModal(
                  { type: 'project-edit', id: project.id },
                  { title: project.title, category: project.category, status: project.status, images: String(project.images) }
                )
              }
              className="w-full px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all"
            >
              Edit Project
            </button>
          </div>
        );
        break;
      }

      case 'email-compose': {
        title = 'Email Client';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-email-to" className={labelCls}>To</label>
              <select id="gv-email-to" required value={draft.to || ''} onChange={(e) => setField('to', e.target.value)} className={inputCls}>
                <option value="">Select a client...</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.name}>
                    {l.name}{l.email ? ` (${l.email})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gv-email-subject" className={labelCls}>Subject</label>
              <input id="gv-email-subject" type="text" required value={draft.subject || ''} onChange={(e) => setField('subject', e.target.value)} className={inputCls} placeholder="Subject" />
            </div>
            <div>
              <label htmlFor="gv-email-message" className={labelCls}>Message</label>
              <textarea id="gv-email-message" required rows={5} value={draft.message || ''} onChange={(e) => setField('message', e.target.value)} className={`${inputCls} resize-none`} placeholder="Write your message..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send Email
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'quote-create': {
        title = 'Create Quote';
        body = (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createQuote();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="gv-quote-client" className={labelCls}>Client Name</label>
              <input id="gv-quote-client" type="text" required value={draft.client || ''} onChange={(e) => setField('client', e.target.value)} className={inputCls} placeholder="Client name" />
            </div>
            <div>
              <label htmlFor="gv-quote-service" className={labelCls}>Service</label>
              <select id="gv-quote-service" value={draft.service || 'Landscape Design'} onChange={(e) => setField('service', e.target.value)} className={inputCls}>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gv-quote-amount" className={labelCls}>Quote Amount ($)</label>
              <input id="gv-quote-amount" type="number" min="1" required value={draft.amount || ''} onChange={(e) => setField('amount', e.target.value)} className={inputCls} placeholder="2500" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 px-4 py-3 bg-[#386641] text-white rounded-lg font-semibold hover:bg-[#6a994e] transition-all">
                Create Quote
              </button>
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-stone-100 text-[#386641] rounded-lg font-semibold hover:bg-stone-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        );
        break;
      }

      case 'reports': {
        title = 'Business Reports';
        const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));
        body = (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#386641] mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Revenue
              </h3>
              <div className="space-y-3">
                {monthlyRevenue.map((m) => (
                  <div key={m.month} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-gray-600">{m.month}</div>
                    <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#386641] to-[#a7c957] rounded-full"
                        style={{ width: `${(m.value / maxRevenue) * 100}%` }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-bold text-[#386641]">
                      ${m.value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#386641] mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Lead Sources
              </h3>
              <div className="space-y-3">
                {leadSources.map((s) => (
                  <div key={s.source} className="flex items-center gap-3">
                    <div className="w-28 text-sm text-gray-600">{s.source}</div>
                    <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6a994e] to-[#a7c957] rounded-full"
                        style={{ width: `${s.share}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-bold text-[#386641]">{s.share}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-stone-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#386641]">$253K</div>
                <div className="text-xs text-gray-600">6-Month Revenue</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#386641]">187</div>
                <div className="text-xs text-gray-600">Jobs Completed</div>
              </div>
              <div className="bg-stone-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#386641]">64%</div>
                <div className="text-xs text-gray-600">Quote Win Rate</div>
              </div>
            </div>
          </div>
        );
        break;
      }
    }

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeModal}>
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-bold text-[#386641]">{title}</h2>
            <button
              onClick={closeModal}
              aria-label="Close"
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="p-6">{body}</div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal({ type: 'reports' })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal({ type: 'reports' });
                    }
                  }}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-[#a7c957] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                      {React.cloneElement(stat.icon, { className: 'h-6 w-6' })}
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#386641] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#386641] flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Recent Leads
                  </h2>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-[#6a994e] hover:text-[#386641] font-semibold text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => openModal({ type: 'lead-view', id: lead.id })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal({ type: 'lead-view', id: lead.id });
                        }
                      }}
                      className="flex items-center justify-between p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-all cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-[#386641]">{lead.name}</div>
                        <div className="text-sm text-gray-600">{lead.service}</div>
                        <div className="text-xs text-gray-500 mt-1">{lead.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#6a994e] mb-2">{lead.value}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#386641] flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Appointments
                  </h2>
                  <button
                    onClick={() => openModal({ type: 'appointment-add' })}
                    className="text-[#6a994e] hover:text-[#386641] font-semibold text-sm"
                  >
                    Schedule
                  </button>
                </div>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-gradient-to-r from-[#a7c957]/10 to-transparent rounded-lg border-l-4 border-[#a7c957]">
                      <div className="font-semibold text-[#386641]">{apt.client}</div>
                      <div className="text-sm text-gray-600 mt-1">{apt.service}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          {apt.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#386641] mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => openModal({ type: 'project-add' }, { category: 'Landscape Design', status: 'draft', images: '2' })}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#386641] to-[#6a994e] text-white rounded-lg hover:from-[#6a994e] hover:to-[#a7c957] transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-semibold">New Project</span>
                </button>
                <button
                  onClick={() => openModal({ type: 'email-compose' })}
                  className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold">Email Client</span>
                </button>
                <button
                  onClick={() => openModal({ type: 'quote-create' })}
                  className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold">Create Quote</span>
                </button>
                <button
                  onClick={() => openModal({ type: 'reports' })}
                  className="flex items-center gap-3 p-4 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-semibold">View Reports</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-[#386641]">Lead Management</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((prev) => !prev)}
                    className="px-4 py-2 bg-stone-100 text-[#386641] rounded-lg hover:bg-stone-200 transition-all flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {leadFilter === 'all' ? 'Filter' : `Filter: ${leadFilter}`}
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20">
                      {(['all', 'new', 'contacted', 'quoted'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setLeadFilter(status);
                            setFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                            leadFilter === status
                              ? 'bg-[#a7c957]/20 text-[#386641] font-semibold'
                              : 'text-gray-700 hover:bg-stone-50'
                          }`}
                        >
                          {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={exportLeads}
                  className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Service</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Value</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-[#386641] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-stone-50">
                      <td className="py-4 px-4 font-semibold text-[#386641]">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-600">{lead.service}</td>
                      <td className="py-4 px-4 font-bold text-[#6a994e]">{lead.value}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">{lead.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal({ type: 'lead-view', id: lead.id })}
                            aria-label={`View ${lead.name}`}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-all"
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() =>
                              openModal(
                                { type: 'lead-edit', id: lead.id },
                                { name: lead.name, service: lead.service, value: lead.value, status: lead.status }
                              )
                            }
                            aria-label={`Edit ${lead.name}`}
                            className="p-2 hover:bg-green-100 rounded-lg transition-all"
                          >
                            <Edit className="h-4 w-4 text-green-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleLeads.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No {leadFilter} leads right now. Try a different filter.
                </div>
              )}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#386641]">Testimonials</h2>
              <button
                onClick={() => openModal({ type: 'testimonial-add' }, { rating: '5', status: 'pending' })}
                className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Testimonial
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#a7c957] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-[#386641]">{testimonial.name}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-4 w-4 text-[#a7c957] fill-[#a7c957]" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">{testimonial.date}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal({ type: 'testimonial-view', id: testimonial.id })}
                      className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          { type: 'testimonial-edit', id: testimonial.id },
                          { name: testimonial.name, rating: String(testimonial.rating), status: testimonial.status, text: testimonial.text }
                        )
                      }
                      className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModal({ type: 'testimonial-delete', id: testimonial.id })}
                      aria-label={`Delete testimonial from ${testimonial.name}`}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {testimonials.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No testimonials yet. Click Add Testimonial to create one.
              </div>
            )}
          </div>
        );

      case 'gallery':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#386641]">Gallery Projects</h2>
              <button
                onClick={() => openModal({ type: 'project-add' }, { category: 'Landscape Design', status: 'draft', images: '2' })}
                className="px-4 py-2 bg-[#386641] text-white rounded-lg hover:bg-[#6a994e] transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryProjects.map((project) => (
                <div key={project.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#a7c957] transition-all">
                  <div className="aspect-video bg-gradient-to-br from-[#6a994e] to-[#a7c957] flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-white opacity-50" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[#386641]">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">{project.category}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <ImageIcon className="h-4 w-4" />
                      {project.images} images
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal({ type: 'project-view', id: project.id })}
                        className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          openModal(
                            { type: 'project-edit', id: project.id },
                            { title: project.title, category: project.category, status: project.status, images: String(project.images) }
                          )
                        }
                        className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#386641] mb-6">Site Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveSettings();
              }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="landscaping-admin-business-name" className={labelCls}>Business Name</label>
                  <input
                    id="landscaping-admin-business-name"
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, businessName: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="landscaping-admin-phone" className={labelCls}>Phone Number</label>
                  <input
                    id="landscaping-admin-phone"
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="landscaping-admin-email" className={labelCls}>Email Address</label>
                  <input
                    id="landscaping-admin-email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="landscaping-admin-address" className={labelCls}>Address</label>
                  <input
                    id="landscaping-admin-address"
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="landscaping-admin-description" className={labelCls}>Business Description</label>
                <textarea
                  id="landscaping-admin-description"
                  rows={4}
                  value={settings.description}
                  onChange={(e) => setSettings((prev) => ({ ...prev, description: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="bg-[#386641] text-white px-8 py-3 rounded-lg hover:bg-[#6a994e] transition-all font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                Save Changes
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-[#386641] to-[#6a994e] text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-200">{settings.businessName}</p>
              </div>
            </div>
            <button
              onClick={onSwitchToCustomer}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
            >
              <Eye className="h-4 w-4" />
              <span className="font-semibold">View Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp /> },
              { id: 'leads', label: 'Leads', icon: <Mail /> },
              { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare /> },
              { id: 'gallery', label: 'Gallery', icon: <ImageIcon /> },
              { id: 'settings', label: 'Settings', icon: <Settings /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#386641] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {React.cloneElement(tab.icon, { className: 'h-4 w-4' })}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Action Modal */}
      {renderModal()}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#386641] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-[#a7c957]" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
}
