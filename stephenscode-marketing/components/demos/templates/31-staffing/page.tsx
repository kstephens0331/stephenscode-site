'use client';

import React, { useRef, useState } from 'react';
import {
  Briefcase, Users, UserCheck, Clock, FileText, DollarSign, BarChart3,
  Phone, Mail, MapPin, Download, Settings, Bell, User, LogOut,
  TrendingUp, CheckCircle2, Star, Target, Activity, Zap, PieChart,
  FileCheck, UserPlus, Send, Building2, GraduationCap, Shield,
  Edit, Plus, ArrowUpRight, X
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

// Types
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temporary';
  category: string;
  payRate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'Open' | 'Filled' | 'On Hold';
  postedDate: string;
  urgency: 'Low' | 'Medium' | 'High';
  applicants: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  experience: string;
  skills: string[];
  availability: string;
  status: 'Available' | 'Placed' | 'Interview' | 'Not Available';
  rating: number;
  resume: string;
  appliedJobs: number;
}

interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  activeJobs: number;
  totalPlacements: number;
  totalBilled: number;
  status: 'Active' | 'Inactive';
}

interface Timesheet {
  id: string;
  candidate: string;
  client: string;
  weekEnding: string;
  regularHours: number;
  overtimeHours: number;
  rate: number;
  total: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
}

interface Invoice {
  id: string;
  client: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  items: Array<{
    description: string;
    hours: number;
    rate: number;
    amount: number;
  }>;
}

interface ComplianceDocument {
  id: string;
  candidate: string;
  documentType: string;
  status: 'Valid' | 'Expiring' | 'Expired';
  expiryDate: string;
}

type UserRole = 'Admin' | 'Candidate' | 'Client';
type Page = 'home' | 'jobs' | 'candidates' | 'clients' | 'timesheets' | 'invoicing' | 'reports' | 'compliance' | 'resources' | 'contact';

// Sample Data
const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    category: 'Technology',
    payRate: '$120k - $160k/year',
    description: 'Looking for an experienced software engineer to lead our development team.',
    requirements: ['5+ years experience', 'React/Node.js', 'Team leadership', 'Agile methodology'],
    benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Unlimited PTO'],
    status: 'Open',
    postedDate: '2024-05-15',
    urgency: 'High',
    applicants: 47
  },
  {
    id: 'job-2',
    title: 'Registered Nurse',
    company: 'City Medical Center',
    location: 'Chicago, IL',
    type: 'Full-Time',
    category: 'Healthcare',
    payRate: '$35 - $45/hour',
    description: 'Seeking compassionate RN for emergency department.',
    requirements: ['Active RN License', 'BLS/ACLS Certified', '2+ years ER experience', 'Night shift availability'],
    benefits: ['Health Insurance', 'Sign-on Bonus', 'Tuition Reimbursement', 'Shift Differential'],
    status: 'Open',
    postedDate: '2024-05-18',
    urgency: 'High',
    applicants: 23
  },
  {
    id: 'job-3',
    title: 'Warehouse Supervisor',
    company: 'Logistics Plus',
    location: 'Dallas, TX',
    type: 'Full-Time',
    category: 'Logistics',
    payRate: '$55k - $70k/year',
    description: 'Manage warehouse operations and supervise team of 20+ workers.',
    requirements: ['3+ years warehouse management', 'Forklift certified', 'Inventory systems', 'Leadership skills'],
    benefits: ['Health Insurance', 'Paid Training', 'Career Growth', 'Performance Bonus'],
    status: 'Open',
    postedDate: '2024-05-20',
    urgency: 'Medium',
    applicants: 31
  },
  {
    id: 'job-4',
    title: 'Marketing Manager',
    company: 'Brand Builders Co.',
    location: 'New York, NY',
    type: 'Contract',
    category: 'Marketing',
    payRate: '$90k - $110k/year',
    description: 'Lead marketing campaigns for Fortune 500 clients.',
    requirements: ['5+ years marketing', 'Digital marketing expertise', 'Budget management', 'Analytics proficiency'],
    benefits: ['Contract to Hire', 'Flexible Schedule', 'Professional Development'],
    status: 'Open',
    postedDate: '2024-05-12',
    urgency: 'Low',
    applicants: 19
  }
];

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Full Stack Developer',
    experience: '6 years',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    availability: 'Immediate',
    status: 'Available',
    rating: 4.8,
    resume: 'emily_rodriguez_resume.pdf',
    appliedJobs: 3
  },
  {
    id: 'cand-2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 234-5678',
    location: 'Chicago, IL',
    title: 'Registered Nurse',
    experience: '4 years',
    skills: ['Emergency Care', 'Patient Assessment', 'IV Therapy', 'Critical Care'],
    availability: '2 weeks',
    status: 'Interview',
    rating: 4.9,
    resume: 'michael_chen_resume.pdf',
    appliedJobs: 2
  },
  {
    id: 'cand-3',
    name: 'Sarah Thompson',
    email: 'sarah.t@email.com',
    phone: '(555) 345-6789',
    location: 'Dallas, TX',
    title: 'Warehouse Operations Manager',
    experience: '8 years',
    skills: ['Logistics', 'Inventory Management', 'Team Leadership', 'Safety Compliance'],
    availability: 'Immediate',
    status: 'Available',
    rating: 4.7,
    resume: 'sarah_thompson_resume.pdf',
    appliedJobs: 4
  }
];

const CLIENTS: Client[] = [
  {
    id: 'client-1',
    companyName: 'TechCorp Inc.',
    contactName: 'David Wilson',
    email: 'david.wilson@techcorp.com',
    phone: '(555) 111-2222',
    industry: 'Technology',
    activeJobs: 5,
    totalPlacements: 23,
    totalBilled: 450000,
    status: 'Active'
  },
  {
    id: 'client-2',
    companyName: 'City Medical Center',
    contactName: 'Jennifer Lee',
    email: 'jlee@citymedical.org',
    phone: '(555) 222-3333',
    industry: 'Healthcare',
    activeJobs: 8,
    totalPlacements: 45,
    totalBilled: 680000,
    status: 'Active'
  },
  {
    id: 'client-3',
    companyName: 'Logistics Plus',
    contactName: 'Robert Martinez',
    email: 'rmartinez@logisticsplus.com',
    phone: '(555) 333-4444',
    industry: 'Logistics',
    activeJobs: 3,
    totalPlacements: 18,
    totalBilled: 290000,
    status: 'Active'
  }
];

const INITIAL_TIMESHEETS: Timesheet[] = [
  {
    id: 'ts-1',
    candidate: 'Emily Rodriguez',
    client: 'TechCorp Inc.',
    weekEnding: '2024-05-24',
    regularHours: 40,
    overtimeHours: 5,
    rate: 75,
    total: 3375,
    status: 'Pending'
  },
  {
    id: 'ts-2',
    candidate: 'Michael Chen',
    client: 'City Medical Center',
    weekEnding: '2024-05-24',
    regularHours: 36,
    overtimeHours: 8,
    rate: 45,
    total: 2160,
    status: 'Approved'
  },
  {
    id: 'ts-3',
    candidate: 'Sarah Thompson',
    client: 'Logistics Plus',
    weekEnding: '2024-05-24',
    regularHours: 40,
    overtimeHours: 0,
    rate: 32,
    total: 1280,
    status: 'Paid'
  }
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    client: 'TechCorp Inc.',
    invoiceNumber: 'INV-2024-001',
    date: '2024-05-25',
    dueDate: '2024-06-25',
    amount: 13500,
    status: 'Sent',
    items: [
      { description: 'Software Development Services', hours: 160, rate: 75, amount: 12000 },
      { description: 'Project Management', hours: 20, rate: 75, amount: 1500 }
    ]
  },
  {
    id: 'inv-2',
    client: 'City Medical Center',
    invoiceNumber: 'INV-2024-002',
    date: '2024-05-20',
    dueDate: '2024-06-20',
    amount: 8640,
    status: 'Paid',
    items: [
      { description: 'Nursing Services, Week 1', hours: 48, rate: 45, amount: 2160 },
      { description: 'Nursing Services, Week 2', hours: 48, rate: 45, amount: 2160 },
      { description: 'Nursing Services, Week 3', hours: 48, rate: 45, amount: 2160 },
      { description: 'Nursing Services, Week 4', hours: 48, rate: 45, amount: 2160 }
    ]
  }
];

const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'doc-1',
    candidate: 'Emily Rodriguez',
    documentType: 'Background Check',
    status: 'Valid',
    expiryDate: '2025-05-01'
  },
  {
    id: 'doc-2',
    candidate: 'Michael Chen',
    documentType: 'RN License',
    status: 'Expiring',
    expiryDate: '2024-07-15'
  },
  {
    id: 'doc-3',
    candidate: 'Sarah Thompson',
    documentType: 'Forklift Certification',
    status: 'Valid',
    expiryDate: '2025-12-01'
  }
];

const NOTIFICATION_ITEMS = [
  { id: 1, text: '3 new applicants for Senior Software Engineer', time: '10 min ago' },
  { id: 2, text: 'Timesheet from Emily Rodriguez is awaiting approval', time: '1 hour ago' },
  { id: 3, text: 'RN License for Michael Chen expires 7/15', time: 'Yesterday' }
];

const RECENT_PLACEMENTS = [
  { candidate: 'Emily Rodriguez', job: 'Senior Software Engineer', client: 'TechCorp Inc.', date: '2024-05-20' },
  { candidate: 'Michael Chen', job: 'Registered Nurse', client: 'City Medical', date: '2024-05-18' },
  { candidate: 'Sarah Thompson', job: 'Warehouse Supervisor', client: 'Logistics Plus', date: '2024-05-15' }
];

const JOB_CATEGORIES = ['Technology', 'Healthcare', 'Logistics', 'Marketing'];
const JOB_TYPES: Job['type'][] = ['Full-Time', 'Part-Time', 'Contract', 'Temporary'];

const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b] focus:border-transparent';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

// Shared modal shell -- defined at module level so React keeps a stable component
// identity across renders (inputs inside keep focus while typing).
function Modal({ title, onClose, children, maxWidth = 'max-w-2xl' }: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-lg shadow-2xl w-full ${maxWidth} max-h-[85vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1b263b]">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-[#1b263b] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// Client-side demo file download -- generates a small text blob, never touches a server.
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

// Append an entry to a localStorage-backed list -- demo data only.
function appendToStorage(key: string, entry: unknown) {
  try {
    const raw = localStorage.getItem(key);
    const list: unknown[] = raw ? JSON.parse(raw) : [];
    list.push(entry);
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage unavailable (private mode, quota) -- demo continues with in-memory state
  }
}

const PremierStaffingSolutions = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const userRole: UserRole = 'Admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [notifications, setNotifications] = useState(NOTIFICATION_ITEMS.length);
  const [showNotifications, setShowNotifications] = useState(false);

  // Data held in local state so demo actions genuinely change what is on screen
  const [jobList, setJobList] = useState<Job[]>(INITIAL_JOBS);
  const [candidateList, setCandidateList] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [timesheetList, setTimesheetList] = useState<Timesheet[]>(INITIAL_TIMESHEETS);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(INITIAL_INVOICES);

  // Modal / panel state
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [matchJob, setMatchJob] = useState<Job | null>(null);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [editJobForm, setEditJobForm] = useState({ title: '', payRate: '', status: 'Open', urgency: 'Medium', description: '' });
  const [showPostJob, setShowPostJob] = useState(false);
  const [postJobForm, setPostJobForm] = useState({ title: '', company: '', location: '', type: 'Full-Time', category: 'Technology', payRate: '', description: '' });
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', availability: 'Immediate', notes: '' });
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(null);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [addCandidateForm, setAddCandidateForm] = useState({ name: '', email: '', phone: '', location: '', title: '', experience: '', skills: '', availability: 'Immediate' });
  const [detailClient, setDetailClient] = useState<Client | null>(null);
  const [detailInvoice, setDetailInvoice] = useState<Invoice | null>(null);
  const [detailDoc, setDetailDoc] = useState<ComplianceDocument | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ emailAlerts: true, smsAlerts: false, weeklySummary: true });

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = (message: string) => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  };

  // Stats
  const totalJobs = jobList.length;
  const openJobs = jobList.filter(j => j.status === 'Open').length;
  const totalCandidates = candidateList.length;
  const availableCandidates = candidateList.filter(c => c.status === 'Available').length;
  const totalClients = CLIENTS.length;
  const pendingTimesheets = timesheetList.filter(t => t.status === 'Pending').length;
  const totalRevenue = invoiceList.reduce((sum, inv) => sum + inv.amount, 0);

  // ---- Actions ----

  const openApply = (job: Job | null) => {
    setApplyJob(job);
    setApplyForm({ name: '', email: '', phone: '', availability: 'Immediate', notes: '' });
    setApplySubmitted(false);
    setDetailJob(null);
    setApplyOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (applySubmitting) return;
    setApplySubmitting(true);
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Premier Staffing Solutions',
          demoPackage: 'Custom Business Platform ($5,000)',
          demoSlug: 'premier-staffing-solutions',
          clientName: applyForm.name,
          clientPhone: applyForm.phone,
          clientEmail: applyForm.email,
          service: applyJob ? `Job Application: ${applyJob.title} at ${applyJob.company}` : 'General Resume Submission',
          preferredDate: '',
          preferredTime: '',
          notes: `Availability: ${applyForm.availability}${applyForm.notes ? ` -- ${applyForm.notes}` : ''}`
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_job_application', demo_slug: 'premier-staffing-solutions' });
        trackConversion('leadForm');
      }
    } catch {
      // Network/API failure -- the demo still records the application locally below
    }

    appendToStorage('demo_staffing_applications', {
      ...applyForm,
      jobId: applyJob ? applyJob.id : null,
      jobTitle: applyJob ? applyJob.title : 'General resume submission',
      submittedAt: new Date().toISOString()
    });
    if (applyJob) {
      const appliedId = applyJob.id;
      setJobList(prev => prev.map(j => (j.id === appliedId ? { ...j, applicants: j.applicants + 1 } : j)));
    }
    setApplySubmitting(false);
    setApplySubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appendToStorage('demo_staffing_messages', { ...contactForm, submittedAt: new Date().toISOString() });
    setContactSubmitted(true);
  };

  const openEditJob = (job: Job) => {
    setEditJob(job);
    setEditJobForm({
      title: job.title,
      payRate: job.payRate,
      status: job.status,
      urgency: job.urgency,
      description: job.description
    });
  };

  const handleEditJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editJob) return;
    const editedId = editJob.id;
    setJobList(prev => prev.map(j => (j.id === editedId ? {
      ...j,
      title: editJobForm.title,
      payRate: editJobForm.payRate,
      status: editJobForm.status as Job['status'],
      urgency: editJobForm.urgency as Job['urgency'],
      description: editJobForm.description
    } : j)));
    setEditJob(null);
    showToast('Job updated');
  };

  const openPostJob = (company?: string, category?: string) => {
    setPostJobForm({
      title: '',
      company: company || '',
      location: '',
      type: 'Full-Time',
      category: category && JOB_CATEGORIES.includes(category) ? category : 'Technology',
      payRate: '',
      description: ''
    });
    setDetailClient(null);
    setShowPostJob(true);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: postJobForm.title,
      company: postJobForm.company,
      location: postJobForm.location,
      type: postJobForm.type as Job['type'],
      category: postJobForm.category,
      payRate: postJobForm.payRate,
      description: postJobForm.description,
      requirements: ['Full requirements shared during screening'],
      benefits: ['Benefits discussed during placement'],
      status: 'Open',
      postedDate: new Date().toISOString().slice(0, 10),
      urgency: 'Medium',
      applicants: 0
    };
    setJobList(prev => [newJob, ...prev]);
    setShowPostJob(false);
    setCurrentPage('jobs');
    showToast(`Job posted: ${newJob.title}`);
  };

  const handleAddCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      name: addCandidateForm.name,
      email: addCandidateForm.email,
      phone: addCandidateForm.phone,
      location: addCandidateForm.location,
      title: addCandidateForm.title,
      experience: addCandidateForm.experience,
      skills: addCandidateForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      availability: addCandidateForm.availability,
      status: 'Available',
      rating: 4.5,
      resume: `${addCandidateForm.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
      appliedJobs: 0
    };
    setCandidateList(prev => [newCandidate, ...prev]);
    setShowAddCandidate(false);
    setAddCandidateForm({ name: '', email: '', phone: '', location: '', title: '', experience: '', skills: '', availability: 'Immediate' });
    showToast(`Candidate added: ${newCandidate.name}`);
  };

  const approveTimesheet = (id: string) => {
    setTimesheetList(prev => prev.map(t => (t.id === id ? { ...t, status: 'Approved' } : t)));
    showToast('Timesheet approved');
  };

  const sendInvoice = (invoice: Invoice) => {
    if (invoice.status === 'Paid') {
      showToast(`Receipt for ${invoice.invoiceNumber} re-sent to ${invoice.client}`);
      return;
    }
    setInvoiceList(prev => prev.map(inv => (inv.id === invoice.id ? { ...inv, status: 'Sent' } : inv)));
    showToast(`Invoice ${invoice.invoiceNumber} sent to ${invoice.client}`);
  };

  const downloadInvoice = (invoice: Invoice) => {
    const lines = [
      'PREMIER STAFFING SOLUTIONS',
      '456 Staffing Blvd, Suite 200, City, ST 54321',
      '',
      `Invoice: ${invoice.invoiceNumber}`,
      `Client: ${invoice.client}`,
      `Invoice Date: ${invoice.date}`,
      `Due Date: ${invoice.dueDate}`,
      '',
      'LINE ITEMS',
      ...invoice.items.map(item => `- ${item.description}: ${item.hours} hrs @ $${item.rate}/hr = $${item.amount.toLocaleString()}`),
      '',
      `TOTAL DUE: $${invoice.amount.toLocaleString()}`,
      `Status: ${invoice.status}`,
      '',
      'Sample invoice generated by this demo.'
    ];
    downloadTextFile(`${invoice.invoiceNumber}.txt`, lines.join('\n'));
    showToast(`${invoice.invoiceNumber} downloaded`);
  };

  const downloadResume = (candidate: Candidate) => {
    const content = [
      candidate.name.toUpperCase(),
      candidate.title,
      `${candidate.location} | ${candidate.email} | ${candidate.phone}`,
      '',
      `Experience: ${candidate.experience}`,
      `Skills: ${candidate.skills.join(', ')}`,
      `Availability: ${candidate.availability}`,
      '',
      'Sample resume generated by this demo.'
    ].join('\n');
    downloadTextFile(candidate.resume.replace(/\.pdf$/i, '.txt'), content);
    showToast(`Resume downloaded: ${candidate.name}`);
  };

  const generateReport = (title: string) => {
    let content = '';
    if (title === 'Placement Report') {
      content = [
        'Candidate,Job,Client,Date',
        ...RECENT_PLACEMENTS.map(p => `${p.candidate},${p.job},${p.client},${p.date}`)
      ].join('\n');
    } else if (title === 'Revenue Report') {
      content = [
        'Invoice,Client,Date,Amount,Status',
        ...invoiceList.map(i => `${i.invoiceNumber},${i.client},${i.date},${i.amount},${i.status}`)
      ].join('\n');
    } else if (title === 'Client Activity') {
      content = [
        'Client,Industry,Active Jobs,Placements,Total Billed',
        ...CLIENTS.map(c => `${c.companyName},${c.industry},${c.activeJobs},${c.totalPlacements},${c.totalBilled}`)
      ].join('\n');
    } else if (title === 'Candidate Pipeline') {
      content = [
        'Candidate,Title,Status,Availability,Applied Jobs',
        ...candidateList.map(c => `${c.name},${c.title},${c.status},${c.availability},${c.appliedJobs}`)
      ].join('\n');
    } else if (title === 'Time to Fill') {
      content = [
        'Job,Company,Posted,Status,Applicants',
        ...jobList.map(j => `${j.title},${j.company},${j.postedDate},${j.status},${j.applicants}`)
      ].join('\n');
    } else {
      content = [
        'Candidate,Document,Status,Expires',
        ...COMPLIANCE_DOCUMENTS.map(d => `${d.candidate},${d.documentType},${d.status},${d.expiryDate}`)
      ].join('\n');
    }
    downloadTextFile(`${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`, content);
    showToast(`${title} downloaded`);
  };

  const downloadResource = (title: string, desc: string) => {
    downloadTextFile(
      `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`,
      `PREMIER STAFFING SOLUTIONS\n${title}\n\n${desc}\n\nSample document generated by this demo.`
    );
    showToast(`${title} downloaded`);
  };

  // Rank candidates against a job by simple keyword overlap on skills
  const getMatches = (job: Job) => {
    const haystack = `${job.title} ${job.category} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();
    const jobWords = new Set(haystack.split(/[^a-z0-9+]+/).filter(w => w.length > 2));
    return candidateList
      .map(candidate => ({
        candidate,
        score: candidate.skills.reduce((sum, skill) => {
          const hit = skill.toLowerCase().split(/[^a-z0-9+]+/).some(w => w.length > 2 && jobWords.has(w));
          return sum + (hit ? 1 : 0);
        }, 0)
      }))
      .sort((a, b) => b.score - a.score || b.candidate.rating - a.candidate.rating);
  };

  const filteredJobs = jobList.filter(job => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term || `${job.title} ${job.company} ${job.location} ${job.category}`.toLowerCase().includes(term);
    const matchesCategory = categoryFilter === 'All Categories' || job.category === categoryFilter;
    const matchesType = typeFilter === 'All Types' || job.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Navigation
  const renderNavigation = () => (
    <nav className="bg-[#1b263b] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#778da9]" />
            <div>
              <h1 className="text-2xl font-bold">Premier Staffing Solutions</h1>
              <p className="text-xs text-[#778da9]">Connecting Talent with Opportunity</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#415a77] px-3 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-semibold">{userRole}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(v => !v)}
                aria-label="Notifications"
                className="relative hover:text-[#778da9] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-9 w-80 bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-200 z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="font-bold text-[#1b263b]">Notifications</span>
                    <button
                      onClick={() => setNotifications(0)}
                      className="text-xs font-semibold text-[#415a77] hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="divide-y">
                    {NOTIFICATION_ITEMS.map(n => (
                      <div key={n.id} className="px-4 py-3">
                        <p className="text-sm text-gray-800">{n.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="hover:text-[#778da9] transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setCurrentPage('home');
                setShowNotifications(false);
                showToast('Signed out of demo session');
              }}
              className="hover:text-[#778da9] transition-colors"
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Dashboard', icon: BarChart3 },
            { page: 'jobs' as Page, label: 'Job Board', icon: Briefcase },
            { page: 'candidates' as Page, label: 'Candidates', icon: Users },
            { page: 'clients' as Page, label: 'Clients', icon: Building2 },
            { page: 'timesheets' as Page, label: 'Timesheets', icon: Clock },
            { page: 'invoicing' as Page, label: 'Invoicing', icon: DollarSign },
            { page: 'reports' as Page, label: 'Reports', icon: PieChart },
            { page: 'compliance' as Page, label: 'Compliance', icon: Shield },
            { page: 'resources' as Page, label: 'Resources', icon: FileText },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#778da9] text-white font-semibold' : 'bg-[#415a77] hover:bg-[#778da9]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // Page: Dashboard
  const renderDashboardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Staffing Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your staffing operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => setCurrentPage('jobs')}
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#1b263b] text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="w-8 h-8 text-[#1b263b]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Open Jobs</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{openJobs}</p>
          <p className="text-sm text-green-600 mt-2">+{totalJobs - openJobs} filled this month</p>
        </button>

        <button
          onClick={() => setCurrentPage('candidates')}
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#778da9] text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#778da9]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Candidates</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{availableCandidates}</p>
          <p className="text-sm text-gray-600 mt-2">of {totalCandidates} total</p>
        </button>

        <button
          onClick={() => setCurrentPage('invoicing')}
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-[#1b263b]">${(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+12% vs last month</p>
        </button>

        <button
          onClick={() => setCurrentPage('timesheets')}
          className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500 text-left hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-orange-500" />
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Pending Actions</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{pendingTimesheets + 3}</p>
          <p className="text-sm text-gray-600 mt-2">{pendingTimesheets} timesheets, 3 approvals</p>
        </button>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1b263b] mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-[#778da9]" />
            Top Job Categories
          </h2>
          <div className="space-y-4">
            {[
              { category: 'Technology', jobs: 12, percentage: 35, color: 'blue' },
              { category: 'Healthcare', jobs: 10, percentage: 29, color: 'green' },
              { category: 'Logistics', jobs: 7, percentage: 21, color: 'yellow' },
              { category: 'Marketing', jobs: 5, percentage: 15, color: 'purple' }
            ].map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">{cat.category}</span>
                  <span className="text-sm text-gray-600">{cat.jobs} jobs ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`bg-${cat.color}-500 h-3 rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1b263b] mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#778da9]" />
            Recent Placements
          </h2>
          <div className="space-y-4">
            {RECENT_PLACEMENTS.map((placement, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{placement.candidate}</p>
                  <p className="text-sm text-gray-600">{placement.job} at {placement.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(placement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1b263b]">Client Satisfaction</h3>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#1b263b] mb-2">4.8</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on 127 reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1b263b]">Placement Rate</h3>
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">87%</p>
            <p className="text-sm text-gray-600 mb-3">Average time to placement</p>
            <p className="text-2xl font-semibold text-[#1b263b]">12 days</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1b263b]">Active Clients</h3>
            <Building2 className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#1b263b] mb-2">{totalClients}</p>
            <p className="text-sm text-gray-600 mb-3">Companies working with us</p>
            <p className="text-sm text-green-600 font-semibold">+5 new this quarter</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Job Board
  const renderJobBoardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Job Board</h1>
          <p className="text-gray-600">{openJobs} open positions available</p>
        </div>
        <button
          onClick={() => openPostJob()}
          className="bg-[#778da9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b263b] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search jobs..."
              aria-label="Search jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b] focus:border-transparent"
            />
          </div>
          <select
            aria-label="Filter by job category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
          >
            <option>All Categories</option>
            {JOB_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <select
            aria-label="Filter by job type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
          >
            <option>All Types</option>
            {JOB_TYPES.map(type => <option key={type}>{type}</option>)}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-10 text-center">
            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-semibold">No jobs match your search or filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('All Categories'); setTypeFilter('All Types'); }}
              className="mt-3 text-[#415a77] font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-[#1b263b]">{job.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.urgency === 'High' ? 'bg-red-100 text-red-700' :
                    job.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {job.urgency} Priority
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {job.payRate}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ml-6 text-right">
                <div className="bg-blue-50 rounded-lg p-4 mb-3">
                  <p className="text-sm text-gray-600 mb-1">Applicants</p>
                  <p className="text-2xl font-bold text-blue-600">{job.applicants}</p>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  job.status === 'Open' ? 'bg-green-100 text-green-700' :
                  job.status === 'Filled' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {job.status}
                </span>
                <p className="text-xs text-gray-500">Posted {new Date(job.postedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setDetailJob(job)}
                className="flex-1 bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => setMatchJob(job)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Match Candidates
              </button>
              <button
                onClick={() => openEditJob(job)}
                aria-label={`Edit ${job.title}`}
                className="px-4 py-3 border-2 border-[#1b263b] text-[#1b263b] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Candidates
  const renderCandidatesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Candidate Database</h1>
          <p className="text-gray-600">{availableCandidates} active candidates</p>
        </div>
        <button
          onClick={() => setShowAddCandidate(true)}
          className="bg-[#778da9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b263b] transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Candidate
        </button>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidateList.map(candidate => (
          <div key={candidate.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1b263b] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1b263b]">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{candidate.rating}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                {candidate.experience} experience
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-600">Availability</p>
                <p className="font-semibold text-sm">{candidate.availability}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                candidate.status === 'Available' ? 'bg-green-100 text-green-700' :
                candidate.status === 'Interview' ? 'bg-yellow-100 text-yellow-700' :
                candidate.status === 'Placed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {candidate.status}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDetailCandidate(candidate)}
                className="flex-1 bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold"
              >
                View Profile
              </button>
              <button
                onClick={() => downloadResume(candidate)}
                aria-label={`Download resume for ${candidate.name}`}
                className="px-3 py-2 border-2 border-[#1b263b] text-[#1b263b] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Clients
  const renderClientsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Client Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CLIENTS.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1b263b] mb-1">{client.companyName}</h2>
                <p className="text-gray-600">{client.industry}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-semibold">{client.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-sm">{client.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-sm">{client.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-2xl font-bold text-blue-600">{client.activeJobs}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Placements</p>
                <p className="text-2xl font-bold text-green-600">{client.totalPlacements}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Billed</p>
                <p className="text-lg font-bold text-purple-600">${(client.totalBilled / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDetailClient(client)}
                className="flex-1 bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold"
              >
                View Details
              </button>
              <button
                onClick={() => openPostJob(client.companyName, client.industry)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                New Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Timesheets
  const renderTimesheetsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Timesheet Management</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Week Ending</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reg Hours</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">OT Hours</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timesheetList.map(timesheet => (
                <tr key={timesheet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{timesheet.candidate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{timesheet.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(timesheet.weekEnding).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{timesheet.regularHours}h</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{timesheet.overtimeHours}h</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${timesheet.rate}/hr</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">${timesheet.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      timesheet.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      timesheet.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                      timesheet.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {timesheet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {timesheet.status === 'Pending' && (
                      <button
                        onClick={() => approveTimesheet(timesheet.id)}
                        className="text-green-600 hover:underline font-semibold text-sm"
                      >
                        Approve
                      </button>
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

  // Page: Invoicing
  const renderInvoicingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Invoice Management</h1>

      <div className="space-y-6">
        {invoiceList.map(invoice => (
          <div key={invoice.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1b263b] mb-1">{invoice.invoiceNumber}</h2>
                <p className="text-gray-600">Client: {invoice.client}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                invoice.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {invoice.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600">Invoice Date</p>
                <p className="font-semibold">{new Date(invoice.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">${invoice.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-3">Invoice Items</h3>
              <div className="space-y-2">
                {invoice.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.description}</p>
                      <p className="text-sm text-gray-600">{item.hours} hours @ ${item.rate}/hr</p>
                    </div>
                    <p className="font-bold text-lg">${item.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDetailInvoice(invoice)}
                className="flex-1 bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors"
              >
                View Full Invoice
              </button>
              <button
                onClick={() => downloadInvoice(invoice)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button
                onClick={() => sendInvoice(invoice)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Reports
  const renderReportsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Placement Report', desc: 'Track all placements and success rates', icon: UserCheck, color: 'green' },
          { title: 'Revenue Report', desc: 'Analyze billing and revenue trends', icon: DollarSign, color: 'blue' },
          { title: 'Client Activity', desc: 'Client engagement and satisfaction', icon: Building2, color: 'purple' },
          { title: 'Candidate Pipeline', desc: 'Pipeline status and conversion rates', icon: Users, color: 'orange' },
          { title: 'Time to Fill', desc: 'Average days to fill positions', icon: Clock, color: 'red' },
          { title: 'Compliance Status', desc: 'Document compliance overview', icon: Shield, color: 'teal' }
        ].map(report => (
          <div key={report.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <report.icon className={`w-6 h-6 text-${report.color}-600`} />
            </div>
            <h3 className="font-bold text-lg text-[#1b263b] mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
            <button
              onClick={() => generateReport(report.title)}
              className="w-full bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Compliance
  const renderCompliancePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Compliance Tracking</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {COMPLIANCE_DOCUMENTS.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{doc.candidate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{doc.documentType}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(doc.expiryDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doc.status === 'Valid' ? 'bg-green-100 text-green-700' :
                      doc.status === 'Expiring' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setDetailDoc(doc)}
                      className="text-[#1b263b] hover:underline font-semibold text-sm"
                    >
                      View Document
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Page: Resources
  const renderResourcesPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Resources & Documentation</h1>

      <div className="space-y-6">
        {[
          { title: 'Employee Handbook', desc: 'Complete guide for new employees', icon: FileText },
          { title: 'Training Materials', desc: 'Onboarding and skill development', icon: GraduationCap },
          { title: 'Compliance Forms', desc: 'Required documentation templates', icon: FileCheck },
          { title: 'Policy Documents', desc: 'Company policies and procedures', icon: Shield }
        ].map(resource => (
          <div key={resource.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <resource.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#1b263b]">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.desc}</p>
              </div>
              <button
                onClick={() => downloadResource(resource.title, resource.desc)}
                className="bg-[#1b263b] text-white px-6 py-2 rounded-lg hover:bg-[#415a77] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Contact
  const renderContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#1b263b] mb-6">Get in Touch</h2>
          {contactSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1b263b] mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thanks for reaching out. Our team will get back to you within one business day.
              </p>
              <button
                onClick={() => {
                  setContactForm({ name: '', email: '', message: '' });
                  setContactSubmitted(false);
                }}
                className="text-[#415a77] font-semibold hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="staffing-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  id="staffing-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
                />
              </div>
              <div>
                <label htmlFor="staffing-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="staffing-contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
                />
              </div>
              <div>
                <label htmlFor="staffing-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  id="staffing-contact-message"
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#778da9] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1b263b] transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#1b263b] mb-6">Office Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#778da9] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">456 Staffing Blvd, Suite 200<br />City, ST 54321</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#778da9] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#778da9] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@premierstaffing.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1b263b] mb-4">Looking for Work?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Submit your resume and our recruiting team will match you with open positions.
            </p>
            <button
              onClick={() => openApply(null)}
              className="w-full bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const renderFooter = () => (
    <footer className="bg-[#1b263b] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-8 h-8 text-[#778da9]" />
              <span className="text-xl font-bold">Premier Staffing Solutions</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting exceptional talent with outstanding opportunities since 2005.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('jobs')} className="hover:text-white">Browse Jobs</button></li>
              <li><button onClick={() => openApply(null)} className="hover:text-white">Submit Resume</button></li>
              <li><button onClick={() => setCurrentPage('resources')} className="hover:text-white">Career Resources</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => openPostJob()} className="hover:text-white">Post a Job</button></li>
              <li><button onClick={() => setCurrentPage('candidates')} className="hover:text-white">Find Candidates</button></li>
              <li><button onClick={() => setCurrentPage('clients')} className="hover:text-white">Client Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => setShowPrivacy(true)} className="hover:text-white">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#415a77] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Premier Staffing Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // ---- Modals ----

  const renderJobDetailModal = () => detailJob && (
    <Modal title={detailJob.title} onClose={() => setDetailJob(null)} maxWidth="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />{detailJob.company}</span>
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{detailJob.location}</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{detailJob.type}</span>
        <span className="flex items-center gap-1 text-green-600 font-semibold"><DollarSign className="w-4 h-4" />{detailJob.payRate}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          detailJob.status === 'Open' ? 'bg-green-100 text-green-700' :
          detailJob.status === 'Filled' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {detailJob.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          detailJob.urgency === 'High' ? 'bg-red-100 text-red-700' :
          detailJob.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {detailJob.urgency} Priority
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          {detailJob.applicants} applicants
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
          Posted {new Date(detailJob.postedDate).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mb-6">{detailJob.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Requirements:</h4>
          <ul className="space-y-1">
            {detailJob.requirements.map((req, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                {req}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Benefits:</h4>
          <ul className="space-y-1">
            {detailJob.benefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={() => openApply(detailJob)}
          className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Apply Now
        </button>
        <button
          onClick={() => { setMatchJob(detailJob); setDetailJob(null); }}
          className="px-6 py-3 bg-[#1b263b] text-white rounded-lg font-semibold hover:bg-[#415a77] transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Match Candidates
        </button>
      </div>
    </Modal>
  );

  const renderMatchModal = () => matchJob && (
    <Modal title={`Candidate Matches: ${matchJob.title}`} onClose={() => setMatchJob(null)} maxWidth="max-w-3xl">
      <p className="text-sm text-gray-600 mb-4">
        Candidates ranked by skill overlap with this role&apos;s requirements.
      </p>
      <div className="space-y-3">
        {getMatches(matchJob).map(({ candidate, score }) => (
          <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1b263b] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#1b263b]">{candidate.name}</p>
                <p className="text-sm text-gray-600">{candidate.title} | {candidate.availability}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{candidate.rating}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    candidate.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                score >= 2 ? 'bg-green-100 text-green-700' :
                score === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {score >= 2 ? 'Strong match' : score === 1 ? 'Possible match' : 'Low match'}
              </span>
              <div>
                <button
                  onClick={() => { setDetailCandidate(candidate); setMatchJob(null); }}
                  className="text-sm font-semibold text-[#415a77] hover:underline"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );

  const renderEditJobModal = () => editJob && (
    <Modal title={`Edit Job: ${editJob.title}`} onClose={() => setEditJob(null)}>
      <form onSubmit={handleEditJobSubmit} className="space-y-4">
        <div>
          <label htmlFor="staffing-edit-job-title" className={labelClass}>Job Title</label>
          <input
            id="staffing-edit-job-title"
            type="text"
            required
            value={editJobForm.title}
            onChange={(e) => setEditJobForm(prev => ({ ...prev, title: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="staffing-edit-job-pay-rate" className={labelClass}>Pay Rate</label>
          <input
            id="staffing-edit-job-pay-rate"
            type="text"
            required
            value={editJobForm.payRate}
            onChange={(e) => setEditJobForm(prev => ({ ...prev, payRate: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffing-edit-job-status" className={labelClass}>Status</label>
            <select
              id="staffing-edit-job-status"
              value={editJobForm.status}
              onChange={(e) => setEditJobForm(prev => ({ ...prev, status: e.target.value }))}
              className={inputClass}
            >
              <option>Open</option>
              <option>Filled</option>
              <option>On Hold</option>
            </select>
          </div>
          <div>
            <label htmlFor="staffing-edit-job-urgency" className={labelClass}>Urgency</label>
            <select
              id="staffing-edit-job-urgency"
              value={editJobForm.urgency}
              onChange={(e) => setEditJobForm(prev => ({ ...prev, urgency: e.target.value }))}
              className={inputClass}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="staffing-edit-job-description" className={labelClass}>Description</label>
          <textarea
            id="staffing-edit-job-description"
            rows={4}
            required
            value={editJobForm.description}
            onChange={(e) => setEditJobForm(prev => ({ ...prev, description: e.target.value }))}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1b263b] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#415a77] transition-colors"
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );

  const renderPostJobModal = () => showPostJob && (
    <Modal title="Post New Job" onClose={() => setShowPostJob(false)}>
      <form onSubmit={handlePostJobSubmit} className="space-y-4">
        <div>
          <label htmlFor="staffing-post-job-title" className={labelClass}>Job Title</label>
          <input
            id="staffing-post-job-title"
            type="text"
            required
            value={postJobForm.title}
            onChange={(e) => setPostJobForm(prev => ({ ...prev, title: e.target.value }))}
            className={inputClass}
            placeholder="e.g. Staff Accountant"
          />
        </div>
        <div>
          <label htmlFor="staffing-post-job-company" className={labelClass}>Company</label>
          <input
            id="staffing-post-job-company"
            type="text"
            required
            value={postJobForm.company}
            onChange={(e) => setPostJobForm(prev => ({ ...prev, company: e.target.value }))}
            className={inputClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="staffing-post-job-location" className={labelClass}>Location</label>
          <input
            id="staffing-post-job-location"
            type="text"
            required
            value={postJobForm.location}
            onChange={(e) => setPostJobForm(prev => ({ ...prev, location: e.target.value }))}
            className={inputClass}
            placeholder="City, ST"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffing-post-job-type" className={labelClass}>Type</label>
            <select
              id="staffing-post-job-type"
              value={postJobForm.type}
              onChange={(e) => setPostJobForm(prev => ({ ...prev, type: e.target.value }))}
              className={inputClass}
            >
              {JOB_TYPES.map(type => <option key={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="staffing-post-job-category" className={labelClass}>Category</label>
            <select
              id="staffing-post-job-category"
              value={postJobForm.category}
              onChange={(e) => setPostJobForm(prev => ({ ...prev, category: e.target.value }))}
              className={inputClass}
            >
              {JOB_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="staffing-post-job-pay-rate" className={labelClass}>Pay Rate</label>
          <input
            id="staffing-post-job-pay-rate"
            type="text"
            required
            value={postJobForm.payRate}
            onChange={(e) => setPostJobForm(prev => ({ ...prev, payRate: e.target.value }))}
            className={inputClass}
            placeholder="e.g. $25 - $30/hour"
          />
        </div>
        <div>
          <label htmlFor="staffing-post-job-description" className={labelClass}>Description</label>
          <textarea
            id="staffing-post-job-description"
            rows={3}
            required
            value={postJobForm.description}
            onChange={(e) => setPostJobForm(prev => ({ ...prev, description: e.target.value }))}
            className={inputClass}
            placeholder="Brief overview of the role"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#778da9] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1b263b] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post Job
        </button>
      </form>
    </Modal>
  );

  const renderApplyModal = () => applyOpen && (
    <Modal
      title={applyJob ? `Apply: ${applyJob.title}` : 'Submit Your Resume'}
      onClose={() => setApplyOpen(false)}
    >
      {applySubmitted ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#1b263b] mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">
            {applyJob
              ? `Thanks for applying to ${applyJob.title} at ${applyJob.company}. Our recruiting team will contact you within one business day.`
              : 'Thanks for submitting your resume. Our recruiting team will contact you within one business day.'}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setApplyForm({ name: '', email: '', phone: '', availability: 'Immediate', notes: '' });
                setApplySubmitted(false);
              }}
              className="text-[#415a77] font-semibold hover:underline"
            >
              Submit Another
            </button>
            <button
              onClick={() => setApplyOpen(false)}
              className="bg-[#1b263b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#415a77] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleApplySubmit} className="space-y-4">
          {applyJob && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
              Applying for <span className="font-semibold">{applyJob.title}</span> at {applyJob.company} ({applyJob.location})
            </div>
          )}
          <div>
            <label htmlFor="staffing-apply-name" className={labelClass}>Full Name *</label>
            <input
              id="staffing-apply-name"
              type="text"
              required
              value={applyForm.name}
              onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
              className={inputClass}
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label htmlFor="staffing-apply-email" className={labelClass}>Email Address *</label>
            <input
              id="staffing-apply-email"
              type="email"
              required
              value={applyForm.email}
              onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
              className={inputClass}
              placeholder="jane.smith@email.com"
            />
          </div>
          <div>
            <label htmlFor="staffing-apply-phone" className={labelClass}>Phone Number</label>
            <input
              id="staffing-apply-phone"
              type="tel"
              value={applyForm.phone}
              onChange={(e) => setApplyForm(prev => ({ ...prev, phone: e.target.value }))}
              className={inputClass}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label htmlFor="staffing-apply-availability" className={labelClass}>Availability</label>
            <select
              id="staffing-apply-availability"
              value={applyForm.availability}
              onChange={(e) => setApplyForm(prev => ({ ...prev, availability: e.target.value }))}
              className={inputClass}
            >
              <option>Immediate</option>
              <option>2 weeks</option>
              <option>1 month</option>
              <option>Flexible</option>
            </select>
          </div>
          <div>
            <label htmlFor="staffing-apply-notes" className={labelClass}>Experience Summary / Notes</label>
            <textarea
              id="staffing-apply-notes"
              rows={4}
              value={applyForm.notes}
              onChange={(e) => setApplyForm(prev => ({ ...prev, notes: e.target.value }))}
              className={inputClass}
              placeholder="Briefly describe your background, or paste a link to your resume or LinkedIn profile"
            />
          </div>
          <button
            type="submit"
            disabled={applySubmitting}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Send className="w-5 h-5" />
            {applySubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </Modal>
  );

  const renderCandidateModal = () => detailCandidate && (
    <Modal title={detailCandidate.name} onClose={() => setDetailCandidate(null)}>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 bg-[#1b263b] rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-7 h-7 text-white" />
        </div>
        <div>
          <p className="font-bold text-lg text-[#1b263b]">{detailCandidate.title}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{detailCandidate.rating}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              detailCandidate.status === 'Available' ? 'bg-green-100 text-green-700' :
              detailCandidate.status === 'Interview' ? 'bg-yellow-100 text-yellow-700' :
              detailCandidate.status === 'Placed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {detailCandidate.status}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 text-sm text-gray-700">
        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#778da9]" />{detailCandidate.location}</div>
        <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#778da9]" />{detailCandidate.experience} experience</div>
        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#778da9]" />{detailCandidate.email}</div>
        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#778da9]" />{detailCandidate.phone}</div>
        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#778da9]" />Available: {detailCandidate.availability}</div>
        <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#778da9]" />{detailCandidate.appliedJobs} applications on file</div>
      </div>
      <div className="mb-6">
        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase">Skills</p>
        <div className="flex flex-wrap gap-2">
          {detailCandidate.skills.map(skill => (
            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <a
          href={`mailto:${detailCandidate.email}`}
          className="flex-1 bg-[#1b263b] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Candidate
        </a>
        <a
          href={`tel:${detailCandidate.phone.replace(/[^0-9+]/g, '')}`}
          className="px-4 py-3 border-2 border-[#1b263b] text-[#1b263b] rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button
          onClick={() => downloadResume(detailCandidate)}
          className="px-4 py-3 border-2 border-[#1b263b] text-[#1b263b] rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Resume
        </button>
      </div>
    </Modal>
  );

  const renderAddCandidateModal = () => showAddCandidate && (
    <Modal title="Add Candidate" onClose={() => setShowAddCandidate(false)}>
      <form onSubmit={handleAddCandidateSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffing-add-candidate-name" className={labelClass}>Full Name *</label>
            <input
              id="staffing-add-candidate-name"
              type="text"
              required
              value={addCandidateForm.name}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="staffing-add-candidate-title" className={labelClass}>Job Title *</label>
            <input
              id="staffing-add-candidate-title"
              type="text"
              required
              value={addCandidateForm.title}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, title: e.target.value }))}
              className={inputClass}
              placeholder="e.g. Electrician"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffing-add-candidate-email" className={labelClass}>Email *</label>
            <input
              id="staffing-add-candidate-email"
              type="email"
              required
              value={addCandidateForm.email}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, email: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="staffing-add-candidate-phone" className={labelClass}>Phone</label>
            <input
              id="staffing-add-candidate-phone"
              type="tel"
              value={addCandidateForm.phone}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, phone: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffing-add-candidate-location" className={labelClass}>Location</label>
            <input
              id="staffing-add-candidate-location"
              type="text"
              value={addCandidateForm.location}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, location: e.target.value }))}
              className={inputClass}
              placeholder="City, ST"
            />
          </div>
          <div>
            <label htmlFor="staffing-add-candidate-experience" className={labelClass}>Experience</label>
            <input
              id="staffing-add-candidate-experience"
              type="text"
              value={addCandidateForm.experience}
              onChange={(e) => setAddCandidateForm(prev => ({ ...prev, experience: e.target.value }))}
              className={inputClass}
              placeholder="e.g. 5 years"
            />
          </div>
        </div>
        <div>
          <label htmlFor="staffing-add-candidate-skills" className={labelClass}>Skills (comma separated)</label>
          <input
            id="staffing-add-candidate-skills"
            type="text"
            value={addCandidateForm.skills}
            onChange={(e) => setAddCandidateForm(prev => ({ ...prev, skills: e.target.value }))}
            className={inputClass}
            placeholder="e.g. Welding, Blueprint Reading, OSHA 10"
          />
        </div>
        <div>
          <label htmlFor="staffing-add-candidate-availability" className={labelClass}>Availability</label>
          <select
            id="staffing-add-candidate-availability"
            value={addCandidateForm.availability}
            onChange={(e) => setAddCandidateForm(prev => ({ ...prev, availability: e.target.value }))}
            className={inputClass}
          >
            <option>Immediate</option>
            <option>2 weeks</option>
            <option>1 month</option>
            <option>Flexible</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#778da9] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1b263b] transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Candidate
        </button>
      </form>
    </Modal>
  );

  const renderClientModal = () => detailClient && (
    <Modal title={detailClient.companyName} onClose={() => setDetailClient(null)} maxWidth="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-600">{detailClient.industry}</p>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          detailClient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {detailClient.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
          <p className="text-2xl font-bold text-blue-600">{detailClient.activeJobs}</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Placements</p>
          <p className="text-2xl font-bold text-green-600">{detailClient.totalPlacements}</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Billed</p>
          <p className="text-lg font-bold text-purple-600">${(detailClient.totalBilled / 1000).toFixed(0)}K</p>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-700 mb-2 uppercase">Primary Contact</h4>
        <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 font-semibold text-[#1b263b]"><User className="w-4 h-4" />{detailClient.contactName}</div>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#778da9]" />{detailClient.email}</div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#778da9]" />{detailClient.phone}</div>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-700 mb-2 uppercase">Open Positions with Us</h4>
        {jobList.filter(j => j.company === detailClient.companyName).length === 0 ? (
          <p className="text-sm text-gray-600">No positions currently listed on the job board.</p>
        ) : (
          <div className="space-y-2">
            {jobList.filter(j => j.company === detailClient.companyName).map(job => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-[#1b263b]">{job.title}</p>
                  <p className="text-xs text-gray-600">{job.type} | {job.payRate} | {job.applicants} applicants</p>
                </div>
                <button
                  onClick={() => { setDetailJob(job); setDetailClient(null); }}
                  className="text-sm font-semibold text-[#415a77] hover:underline"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <a
          href={`mailto:${detailClient.email}`}
          className="flex-1 bg-[#1b263b] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Contact
        </a>
        <a
          href={`tel:${detailClient.phone.replace(/[^0-9+]/g, '')}`}
          className="px-4 py-3 border-2 border-[#1b263b] text-[#1b263b] rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button
          onClick={() => openPostJob(detailClient.companyName, detailClient.industry)}
          className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </div>
    </Modal>
  );

  const renderInvoiceModal = () => detailInvoice && (
    <Modal title={`Invoice ${detailInvoice.invoiceNumber}`} onClose={() => setDetailInvoice(null)} maxWidth="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <p className="text-gray-600">Billed to: <span className="font-semibold text-[#1b263b]">{detailInvoice.client}</span></p>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
          detailInvoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
          detailInvoice.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
          detailInvoice.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {detailInvoice.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-600">Invoice Date</p>
          <p className="font-semibold">{new Date(detailInvoice.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Due Date</p>
          <p className="font-semibold">{new Date(detailInvoice.dueDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Hours</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Rate</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {detailInvoice.items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-gray-900">{item.description}</td>
                <td className="px-4 py-2 text-right text-gray-700">{item.hours}</td>
                <td className="px-4 py-2 text-right text-gray-700">${item.rate}/hr</td>
                <td className="px-4 py-2 text-right font-semibold">${item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-700">Total Due</td>
              <td className="px-4 py-3 text-right font-bold text-green-600 text-lg">${detailInvoice.amount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => downloadInvoice(detailInvoice)}
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
        <button
          onClick={() => { sendInvoice(detailInvoice); setDetailInvoice(null); }}
          className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send to Client
        </button>
      </div>
    </Modal>
  );

  const renderComplianceModal = () => detailDoc && (
    <Modal title={detailDoc.documentType} onClose={() => setDetailDoc(null)}>
      <div className="p-6 bg-gray-50 rounded-lg text-center mb-5 border border-dashed border-gray-300">
        <FileCheck className="w-12 h-12 text-[#778da9] mx-auto mb-3" />
        <p className="font-semibold text-[#1b263b]">{detailDoc.documentType}</p>
        <p className="text-sm text-gray-600">On file for {detailDoc.candidate}</p>
      </div>
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Candidate</span>
          <span className="font-semibold text-gray-900">{detailDoc.candidate}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Expiry Date</span>
          <span className="font-semibold text-gray-900">{new Date(detailDoc.expiryDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            detailDoc.status === 'Valid' ? 'bg-green-100 text-green-700' :
            detailDoc.status === 'Expiring' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
          }`}>
            {detailDoc.status}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        {detailDoc.status !== 'Valid' && (
          <button
            onClick={() => {
              showToast(`Renewal reminder sent to ${detailDoc.candidate}`);
              setDetailDoc(null);
            }}
            className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Send Renewal Reminder
          </button>
        )}
        <button
          onClick={() => setDetailDoc(null)}
          className="flex-1 bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );

  const renderSettingsModal = () => showSettings && (
    <Modal title="Notification Settings" onClose={() => setShowSettings(false)} maxWidth="max-w-md">
      <div className="space-y-3 mb-6">
        {([
          { key: 'emailAlerts' as const, label: 'Email alerts', desc: 'New applicants, timesheet submissions, and invoice activity' },
          { key: 'smsAlerts' as const, label: 'SMS alerts', desc: 'Urgent notifications for high-priority job orders' },
          { key: 'weeklySummary' as const, label: 'Weekly summary', desc: 'Placement and revenue digest every Monday morning' }
        ]).map(item => (
          <label key={item.key} htmlFor={`staffing-setting-${item.key}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              id={`staffing-setting-${item.key}`}
              type="checkbox"
              checked={settingsForm[item.key]}
              onChange={(e) => {
                const checked = e.target.checked;
                setSettingsForm(prev => ({ ...prev, [item.key]: checked }));
              }}
              className="mt-1 w-4 h-4 accent-[#1b263b]"
            />
            <span>
              <span className="block font-semibold text-sm text-[#1b263b]">{item.label}</span>
              <span className="block text-xs text-gray-600">{item.desc}</span>
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          setShowSettings(false);
          showToast('Notification preferences saved');
        }}
        className="w-full bg-[#1b263b] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#415a77] transition-colors"
      >
        Save Preferences
      </button>
    </Modal>
  );

  const renderPrivacyModal = () => showPrivacy && (
    <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
      <div className="space-y-4 text-sm text-gray-700">
        <p>
          Premier Staffing Solutions collects contact and employment information you provide
          in order to match candidates with open positions and to communicate with clients
          about staffing needs. We do not sell personal information to third parties.
        </p>
        <p>
          Resumes, applications, and timesheet records are retained only as long as needed
          to provide staffing services, and candidates may request removal of their records
          at any time by contacting our office.
        </p>
        <p className="text-xs text-gray-500">
          This is sample policy text for demonstration purposes.
        </p>
      </div>
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <main>
        {currentPage === 'home' && renderDashboardPage()}
        {currentPage === 'jobs' && renderJobBoardPage()}
        {currentPage === 'candidates' && renderCandidatesPage()}
        {currentPage === 'clients' && renderClientsPage()}
        {currentPage === 'timesheets' && renderTimesheetsPage()}
        {currentPage === 'invoicing' && renderInvoicingPage()}
        {currentPage === 'reports' && renderReportsPage()}
        {currentPage === 'compliance' && renderCompliancePage()}
        {currentPage === 'resources' && renderResourcesPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>
      {renderFooter()}

      {renderJobDetailModal()}
      {renderMatchModal()}
      {renderEditJobModal()}
      {renderPostJobModal()}
      {renderApplyModal()}
      {renderCandidateModal()}
      {renderAddCandidateModal()}
      {renderClientModal()}
      {renderInvoiceModal()}
      {renderComplianceModal()}
      {renderSettingsModal()}
      {renderPrivacyModal()}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#1b263b] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default PremierStaffingSolutions;
