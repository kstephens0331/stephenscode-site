'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Building2, Home, Users, Wrench, CreditCard, FileText, BarChart3,
  MessageSquare, Phone, Mail, MapPin, Calendar, DollarSign,
  CheckCircle2, AlertCircle, Clock, Download, Upload, Settings,
  Bell, User, LogOut, TrendingUp, Key, UserCheck, AlertTriangle,
  Activity, Zap, Target, PieChart, ArrowUpRight, Edit, Eye, Send,
  Paperclip, X
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

// Types
interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Single Family' | 'Multi-Family' | 'Apartment' | 'Condo' | 'Commercial';
  units: number;
  occupiedUnits: number;
  monthlyRent: number;
  status: 'Active' | 'Maintenance' | 'Vacant';
  owner: string;
  manager: string;
  image: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  balance: number;
}

interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  properties: string[];
  totalRevenue: number;
  expenses: number;
  netIncome: number;
  paymentSchedule: 'Monthly' | 'Quarterly';
}

interface MaintenanceRequest {
  id: string;
  property: string;
  unit: string;
  tenant: string;
  category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'Structural' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  description: string;
  submittedDate: string;
  assignedTo: string;
  estimatedCost: number;
  images: string[];
}

interface Lease {
  id: string;
  property: string;
  unit: string;
  tenant: string;
  startDate: string;
  endDate: string;
  rent: number;
  deposit: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Renewed';
  documents: string[];
}

interface Payment {
  id: string;
  tenant: string;
  property: string;
  amount: number;
  date: string;
  type: 'Rent' | 'Deposit' | 'Fee' | 'Late Fee';
  method: 'ACH' | 'Credit Card' | 'Check' | 'Cash';
  status: 'Completed' | 'Pending' | 'Failed';
}

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  attachments: string[];
}

interface TenantPayment {
  id: string;
  label: string;
  amount: number;
  method: string;
}

interface DemoSettings {
  emailNotifications: boolean;
  smsAlerts: boolean;
  maintenanceUpdates: boolean;
  monthlyStatements: boolean;
}

type UserRole = 'Manager' | 'Tenant' | 'Owner';
type Page = 'home' | 'properties' | 'tenants' | 'owners' | 'maintenance' | 'payments' | 'leases' | 'reports' | 'messages' | 'contact';

type ModalState =
  | { kind: 'property'; id: string }
  | { kind: 'propertyForm'; id: string | null }
  | { kind: 'maintenance'; id: string }
  | { kind: 'tenant'; id: string }
  | { kind: 'payment'; id: string }
  | { kind: 'payRent' }
  | { kind: 'receipt'; id: string }
  | { kind: 'vacancies' }
  | { kind: 'lease'; id: string }
  | { kind: 'settings' }
  | { kind: 'signOut' }
  | { kind: 'policy'; doc: 'privacy' | 'terms' }
  | null;

// localStorage keys -- all data stays mock/local, this is a demo
const STORAGE_KEYS = {
  maintenance: 'demo_property-management_maintenance',
  tenantPayments: 'demo_property-management_tenant_payments',
  messages: 'demo_property-management_messages',
  settings: 'demo_property-management_settings',
};

const DEFAULT_SETTINGS: DemoSettings = {
  emailNotifications: true,
  smsAlerts: false,
  maintenanceUpdates: true,
  monthlyStatements: true,
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
    // Storage full or unavailable -- demo state simply won't persist
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Sample Data - 30 Properties (deterministic so occupancy doesn't shift between renders)
const PROPERTY_NAMES = [
  'Sunset Apartments', 'Oak Grove Condos', 'River View Estates', 'Park Place Residences',
  'Downtown Lofts', 'Garden Terrace', 'Highland Towers', 'Maple Street Units',
  'Lakeside Villas', 'Metro Plaza', 'Willow Creek Homes', 'Seaside Complex',
  'Mountain View Apts', 'Central Square', 'Elmwood Gardens', 'Harbor Point',
  'Skyline Residences', 'Pine Ridge Estates', 'Valley Stream Apts', 'Riverside Commons',
  'Summit Place', 'Greenwood Terrace', 'Bay Shore Complex', 'Hillside Manor',
  'Crown Heights Apts', 'Meadowbrook Homes', 'Westgate Plaza', 'Northpoint Towers',
  'Eastside Gardens', 'Southview Residences'
];

// Real, stable Unsplash photo IDs (the old procedurally generated IDs 404'd)
const PROPERTY_IMAGES = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
];

const buildProperties = (): Property[] => Array.from({ length: 30 }, (_, i) => {
  const units = [12, 8, 24, 16, 4, 32, 6, 20, 10, 28][i % 10];
  return {
    id: `prop-${i + 1}`,
    name: PROPERTY_NAMES[i],
    address: `${1000 + i * 100} ${['Main', 'Oak', 'Elm', 'Maple', 'Pine'][i % 5]} St, City, ST ${10000 + i}`,
    type: ['Apartment', 'Condo', 'Multi-Family', 'Single Family', 'Commercial'][i % 5] as Property['type'],
    units,
    occupiedUnits: Math.min(units, Math.floor(units * (0.85 + ((i * 7) % 14) / 100))),
    monthlyRent: 1200 + (i * 150),
    status: ['Active', 'Active', 'Active', 'Active', 'Maintenance', 'Active'][i % 6] as Property['status'],
    owner: `Owner ${Math.floor(i / 3) + 1}`,
    manager: `Manager ${(i % 5) + 1}`,
    image: PROPERTY_IMAGES[i % PROPERTY_IMAGES.length]
  };
});

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'ten-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    property: 'Sunset Apartments',
    unit: 'Unit 201',
    leaseStart: '2024-01-01',
    leaseEnd: '2024-12-31',
    rent: 1800,
    paymentStatus: 'Paid',
    balance: 0
  },
  {
    id: 'ten-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    property: 'Oak Grove Condos',
    unit: 'Unit 105',
    leaseStart: '2023-06-01',
    leaseEnd: '2025-05-31',
    rent: 2200,
    paymentStatus: 'Pending',
    balance: 0
  },
  {
    id: 'ten-3',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '(555) 345-6789',
    property: 'River View Estates',
    unit: 'Unit 302',
    leaseStart: '2024-03-01',
    leaseEnd: '2025-02-28',
    rent: 1950,
    paymentStatus: 'Overdue',
    balance: 3900
  }
];

const INITIAL_OWNERS: Owner[] = [
  {
    id: 'own-1',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '(555) 111-2222',
    properties: ['Sunset Apartments', 'Oak Grove Condos', 'River View Estates'],
    totalRevenue: 125000,
    expenses: 35000,
    netIncome: 90000,
    paymentSchedule: 'Monthly'
  },
  {
    id: 'own-2',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    phone: '(555) 222-3333',
    properties: ['Park Place Residences', 'Downtown Lofts'],
    totalRevenue: 95000,
    expenses: 28000,
    netIncome: 67000,
    paymentSchedule: 'Quarterly'
  }
];

const INITIAL_MAINTENANCE: MaintenanceRequest[] = [
  {
    id: 'maint-1',
    property: 'Sunset Apartments',
    unit: 'Unit 201',
    tenant: 'John Smith',
    category: 'Plumbing',
    priority: 'High',
    status: 'In Progress',
    description: 'Kitchen sink is leaking underneath. Water pooling in cabinet.',
    submittedDate: '2024-05-15',
    assignedTo: 'Mike\'s Plumbing',
    estimatedCost: 250,
    images: []
  },
  {
    id: 'maint-2',
    property: 'Oak Grove Condos',
    unit: 'Unit 105',
    tenant: 'Sarah Johnson',
    category: 'HVAC',
    priority: 'Medium',
    status: 'Open',
    description: 'Air conditioning not cooling properly. Temperature not dropping below 75°F.',
    submittedDate: '2024-05-18',
    assignedTo: 'Cool Air Systems',
    estimatedCost: 350,
    images: []
  },
  {
    id: 'maint-3',
    property: 'River View Estates',
    unit: 'Unit 302',
    tenant: 'Michael Brown',
    category: 'Electrical',
    priority: 'Emergency',
    status: 'Open',
    description: 'Power outlet in bedroom sparking. Immediate attention needed.',
    submittedDate: '2024-05-20',
    assignedTo: 'Quick Fix Electric',
    estimatedCost: 450,
    images: []
  }
];

const INITIAL_LEASES: Lease[] = [
  {
    id: 'lease-1',
    property: 'Sunset Apartments',
    unit: 'Unit 201',
    tenant: 'John Smith',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rent: 1800,
    deposit: 1800,
    status: 'Active',
    documents: ['Lease Agreement.pdf', 'Move-in Checklist.pdf', 'Rules & Regulations.pdf']
  },
  {
    id: 'lease-2',
    property: 'Oak Grove Condos',
    unit: 'Unit 105',
    tenant: 'Sarah Johnson',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    rent: 2200,
    deposit: 2200,
    status: 'Active',
    documents: ['Lease Agreement.pdf', 'Pet Addendum.pdf']
  },
  {
    id: 'lease-3',
    property: 'Downtown Lofts',
    unit: 'Unit 405',
    tenant: 'Emily Davis',
    startDate: '2024-04-01',
    endDate: '2024-09-30',
    rent: 2500,
    deposit: 2500,
    status: 'Expiring Soon',
    documents: ['Lease Agreement.pdf', 'Parking Agreement.pdf']
  }
];

const PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    tenant: 'John Smith',
    property: 'Sunset Apartments',
    amount: 1800,
    date: '2024-05-01',
    type: 'Rent',
    method: 'ACH',
    status: 'Completed'
  },
  {
    id: 'pay-2',
    tenant: 'Sarah Johnson',
    property: 'Oak Grove Condos',
    amount: 2200,
    date: '2024-05-03',
    type: 'Rent',
    method: 'Credit Card',
    status: 'Pending'
  },
  {
    id: 'pay-3',
    tenant: 'Michael Brown',
    property: 'River View Estates',
    amount: 1950,
    date: '2024-04-15',
    type: 'Rent',
    method: 'Check',
    status: 'Failed'
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    from: 'John Smith',
    to: 'Property Manager',
    subject: 'Maintenance Follow-up',
    message: 'Hi, just wanted to check on the status of the plumbing repair in my unit. When can I expect someone to come out?',
    date: '2024-05-20',
    read: false,
    attachments: []
  },
  {
    id: 'msg-2',
    from: 'Property Manager',
    to: 'David Wilson',
    subject: 'Monthly Revenue Report',
    message: 'Attached is the monthly revenue report for your properties. Total income is up 5% from last month.',
    date: '2024-05-18',
    read: true,
    attachments: ['Revenue_Report_May2024.pdf']
  }
];

const INITIAL_TENANT_PAYMENTS: TenantPayment[] = [
  { id: 'tp-1', label: 'May 2024', amount: 1800, method: 'ACH' },
  { id: 'tp-2', label: 'Apr 2024', amount: 1800, method: 'ACH' },
  { id: 'tp-3', label: 'Mar 2024', amount: 1800, method: 'ACH' }
];

interface NotificationItem {
  id: string;
  text: string;
  time: string;
  page: Page;
  focus: ModalState;
}

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: 'n-1',
    text: 'Emergency maintenance: sparking outlet at River View Estates, Unit 302',
    time: 'Today',
    page: 'maintenance',
    focus: { kind: 'maintenance', id: 'maint-3' }
  },
  {
    id: 'n-2',
    text: 'Rent payment failed: Michael Brown, River View Estates',
    time: 'Yesterday',
    page: 'payments',
    focus: { kind: 'payment', id: 'pay-3' }
  },
  {
    id: 'n-3',
    text: 'Lease expiring soon: Downtown Lofts, Unit 405 (ends Sep 30)',
    time: '2 days ago',
    page: 'leases',
    focus: null
  }
];

const NEXT_MAINT_STATUS: Record<MaintenanceRequest['status'], MaintenanceRequest['status']> = {
  'Open': 'In Progress',
  'In Progress': 'Completed',
  'Completed': 'Open',
  'Cancelled': 'Open'
};

// Shared modal shell -- module scope so its identity is stable across renders
// (inputs inside keep focus while the parent re-renders).
function DemoModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-[#003566]">{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-gray-500 hover:text-[#003566] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const ElitePropertyManagement = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('Manager');
  const [searchTerm, setSearchTerm] = useState('');
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Data collections (state so demo actions can modify them)
  const [propertiesList, setPropertiesList] = useState<Property[]>(buildProperties);
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceRequest[]>(
    () => loadStored(STORAGE_KEYS.maintenance, INITIAL_MAINTENANCE)
  );
  const [leasesList, setLeasesList] = useState<Lease[]>(INITIAL_LEASES);
  const [messagesList, setMessagesList] = useState<Message[]>(
    () => loadStored(STORAGE_KEYS.messages, INITIAL_MESSAGES)
  );
  const [tenantPayments, setTenantPayments] = useState<TenantPayment[]>(
    () => loadStored(STORAGE_KEYS.tenantPayments, INITIAL_TENANT_PAYMENTS)
  );
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS);
  const tenants = INITIAL_TENANTS;
  const owners = INITIAL_OWNERS;

  // Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const [maintStatusFilter, setMaintStatusFilter] = useState('All Status');
  const [maintPriorityFilter, setMaintPriorityFilter] = useState('All Priorities');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'all' | Payment['status']>('all');

  // Modal + toast
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Maintenance request form (tenant portal) -- the real lead-capture form
  const [maintForm, setMaintForm] = useState({
    name: '', phone: '', email: '', category: 'Plumbing', priority: 'Low', description: ''
  });
  const [maintPhotos, setMaintPhotos] = useState<string[]>([]);
  const [maintSubmitting, setMaintSubmitting] = useState(false);
  const [maintSubmitted, setMaintSubmitted] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Pay rent modal
  const [payMethod, setPayMethod] = useState('ACH');
  const [payState, setPayState] = useState<'idle' | 'processing' | 'done'>('idle');
  const payTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Failed payment retry (manager view)
  const [retryingPaymentId, setRetryingPaymentId] = useState<string | null>(null);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Account settings (persisted locally)
  const [settingsDraft, setSettingsDraft] = useState<DemoSettings>(DEFAULT_SETTINGS);

  // Sign out / sign back in flow
  const [signedOut, setSignedOut] = useState(false);
  const [loginEmail, setLoginEmail] = useState('manager@elitepm.com');
  const [loginPassword, setLoginPassword] = useState('demo-password');

  // Property add/edit form
  const [propertyDraft, setPropertyDraft] = useState({
    name: '', address: '', type: 'Apartment' as Property['type'], units: '10', rent: '1500'
  });

  // Lease edit form
  const [leaseDraft, setLeaseDraft] = useState({ rent: '', status: 'Active' as Lease['status'] });

  // Messages
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', body: '' });
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Contact form (captured locally -- the maintenance form is this demo's lead form)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Persist demo state
  useEffect(() => { saveStored(STORAGE_KEYS.maintenance, maintenanceList); }, [maintenanceList]);
  useEffect(() => { saveStored(STORAGE_KEYS.messages, messagesList); }, [messagesList]);
  useEffect(() => { saveStored(STORAGE_KEYS.tenantPayments, tenantPayments); }, [tenantPayments]);
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (payTimer.current) clearTimeout(payTimer.current);
    if (retryTimer.current) clearTimeout(retryTimer.current);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const goTo = (page: Page) => {
    setCurrentPage(page);
    setNotificationsOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  const closeModal = () => setModal(null);

  const unreadNotifications = NOTIFICATION_ITEMS.filter(n => !readNotificationIds.includes(n.id)).length;

  const handleNotificationClick = (item: NotificationItem) => {
    setReadNotificationIds(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
    goTo(item.page);
    if (item.focus) setModal(item.focus);
  };

  const goToPropertiesWithStatus = (status: string) => {
    setStatusFilter(status);
    setTypeFilter('all');
    setSearchTerm('');
    setVisibleCount(12);
    goTo('properties');
  };

  const goToPaymentsWithStatus = (status: 'all' | Payment['status']) => {
    setPaymentStatusFilter(status);
    goTo('payments');
  };

  const openPropertyByName = (name: string) => {
    const property = propertiesList.find(p => p.name === name);
    if (!property) {
      showToast(`${name} is not in the current portfolio view`);
      return;
    }
    setModal({ kind: 'property', id: property.id });
  };

  const openPropertyForm = (id: string | null) => {
    const existing = id ? propertiesList.find(p => p.id === id) : undefined;
    setPropertyDraft(existing
      ? { name: existing.name, address: existing.address, type: existing.type, units: String(existing.units), rent: String(existing.monthlyRent) }
      : { name: '', address: '', type: 'Apartment', units: '10', rent: '1500' });
    setModal({ kind: 'propertyForm', id });
  };

  const openLeaseEdit = (id: string) => {
    const lease = leasesList.find(l => l.id === id);
    if (!lease) return;
    setLeaseDraft({ rent: String(lease.rent), status: lease.status });
    setModal({ kind: 'lease', id });
  };

  const openPayRent = () => {
    setPayState('idle');
    setPayMethod('ACH');
    setModal({ kind: 'payRent' });
  };

  const openSettings = () => {
    setSettingsDraft(loadStored(STORAGE_KEYS.settings, DEFAULT_SETTINGS));
    setModal({ kind: 'settings' });
    setNotificationsOpen(false);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStored(STORAGE_KEYS.settings, settingsDraft);
    setModal(null);
    showToast('Account settings saved');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedOut(false);
    setUserRole('Manager');
    setCurrentPage('home');
    showToast('Signed in as Property Manager');
  };

  const handleRetryPayment = (id: string) => {
    if (retryingPaymentId) return;
    setRetryingPaymentId(id);
    retryTimer.current = setTimeout(() => {
      setPayments(prev => prev.map(p => p.id === id
        ? { ...p, status: 'Completed', date: new Date().toISOString().slice(0, 10) }
        : p));
      setRetryingPaymentId(null);
      showToast('Payment retried and processed (demo -- no real charge)');
    }, 900);
  };

  const handleSendPaymentReminder = (payment: Payment) => {
    const reminder: Message = {
      id: `msg-${Date.now()}`,
      from: 'Property Manager',
      to: payment.tenant,
      subject: `Payment Reminder -- ${payment.property}`,
      message: `Hi ${payment.tenant}, our records show your rent payment of $${payment.amount.toLocaleString()} for ${payment.property} could not be processed. Please update your payment method or contact our office at (555) 123-4567.`,
      date: new Date().toISOString().slice(0, 10),
      read: true,
      attachments: []
    };
    setMessagesList(prev => [reminder, ...prev]);
    showToast(`Payment reminder sent to ${payment.tenant}`);
  };

  // Stats Calculations
  const totalProperties = propertiesList.length;
  const totalUnits = propertiesList.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = propertiesList.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const occupancyRate = ((occupiedUnits / totalUnits) * 100).toFixed(1);
  const totalMonthlyRevenue = propertiesList.reduce((sum, p) => sum + (p.monthlyRent * p.occupiedUnits), 0);
  const openMaintenanceRequests = maintenanceList.filter(m => m.status === 'Open' || m.status === 'In Progress').length;
  const overduePayments = payments.filter(p => p.status === 'Failed').length;

  const rentPaid = tenantPayments.some(p => p.label === 'Jun 2024');
  const myRequests = maintenanceList.filter(r => r.property === 'Sunset Apartments' && r.unit === 'Unit 201');

  // ---- Handlers ----

  const handleMaintenanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (maintSubmitting) return;
    setMaintSubmitting(true);

    // Capture the request into local demo state
    const newRequest: MaintenanceRequest = {
      id: `maint-${Date.now()}`,
      property: 'Sunset Apartments',
      unit: 'Unit 201',
      tenant: maintForm.name,
      category: maintForm.category as MaintenanceRequest['category'],
      priority: maintForm.priority as MaintenanceRequest['priority'],
      status: 'Open',
      description: maintForm.description,
      submittedDate: new Date().toISOString().slice(0, 10),
      assignedTo: 'Pending assignment',
      estimatedCost: 0,
      images: maintPhotos
    };
    setMaintenanceList(prev => [newRequest, ...prev]);

    // Real lead capture -- same pattern as the other demo templates
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Elite Property Management',
          demoPackage: 'Custom Business Platform ($5,000)',
          demoSlug: 'elite-property-management',
          clientName: maintForm.name,
          clientPhone: maintForm.phone,
          clientEmail: maintForm.email,
          service: `Maintenance Request: ${maintForm.category}`,
          preferredDate: '',
          preferredTime: '',
          notes: `${maintForm.priority} priority. ${maintForm.description}`
        })
      });
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_maintenance_request_form', demo_slug: 'elite-property-management' });
        trackConversion('leadForm');
      }
    } catch {
      // Network/API failure -- the request is still captured in local demo state
    }

    setMaintSubmitting(false);
    setMaintSubmitted(true);
    showToast('Maintenance request submitted');
  };

  const resetMaintenanceForm = () => {
    setMaintForm({ name: '', phone: '', email: '', category: 'Plumbing', priority: 'Low', description: '' });
    setMaintPhotos([]);
    setMaintSubmitted(false);
  };

  const handlePayRent = () => {
    setPayState('processing');
    payTimer.current = setTimeout(() => {
      setTenantPayments(prev => [
        { id: `tp-${Date.now()}`, label: 'Jun 2024', amount: 1800, method: payMethod },
        ...prev
      ]);
      setPayState('done');
      showToast('Rent payment recorded (demo -- no real charge)');
    }, 900);
  };

  const handleDownloadLease = () => {
    downloadTextFile('Lease-Agreement-Unit-201-DEMO.txt', [
      'ELITE PROPERTY MANAGEMENT',
      'RESIDENTIAL LEASE AGREEMENT -- DEMO DOCUMENT',
      '',
      'Property: Sunset Apartments, Unit 201',
      'Tenant: John Smith',
      'Term: Jan 1, 2024 - Dec 31, 2024',
      'Monthly Rent: $1,800',
      'Security Deposit: $1,800',
      '',
      'This is a sample document generated by the Elite Property Management demo.',
      'It is not a real lease and has no legal effect.'
    ].join('\n'));
    showToast('Lease downloaded (demo document)');
  };

  const handleDownloadLeaseDoc = (lease: Lease, doc: string) => {
    downloadTextFile(`${doc.replace(/\.pdf$/i, '')} - DEMO.txt`, [
      'ELITE PROPERTY MANAGEMENT',
      `${doc.replace(/\.pdf$/i, '').toUpperCase()} -- DEMO DOCUMENT`,
      '',
      `Property: ${lease.property}, ${lease.unit}`,
      `Tenant: ${lease.tenant}`,
      `Lease Term: ${new Date(lease.startDate).toLocaleDateString()} - ${new Date(lease.endDate).toLocaleDateString()}`,
      `Monthly Rent: $${lease.rent.toLocaleString()}`,
      '',
      'This is a sample document generated by the Elite Property Management demo.'
    ].join('\n'));
    showToast(`${doc} downloaded (demo document)`);
  };

  const handleDownloadAttachment = (message: Message, attachment: string) => {
    downloadTextFile(`${attachment.replace(/\.pdf$/i, '')}-DEMO.txt`, [
      'ELITE PROPERTY MANAGEMENT',
      `${attachment.replace(/\.pdf$/i, '').replace(/_/g, ' ').toUpperCase()} -- DEMO ATTACHMENT`,
      '',
      `Sent by: ${message.from}`,
      `Sent to: ${message.to}`,
      `Date: ${new Date(message.date).toLocaleDateString()}`,
      `Subject: ${message.subject}`,
      '',
      `Portfolio: ${propertiesList.length} properties`,
      `Monthly Revenue: $${propertiesList.reduce((sum, p) => sum + (p.monthlyRent * p.occupiedUnits), 0).toLocaleString()}`,
      '',
      'Sample data only -- generated by the Elite Property Management demo.'
    ].join('\n'));
    showToast(`${attachment} downloaded (demo document)`);
  };

  const handleMarkMessageRead = (id: string) => {
    setMessagesList(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    showToast('Message marked as read');
  };

  const handleDownloadOwnerReport = (owner: Owner) => {
    downloadTextFile(`Owner-Statement-${owner.name.replace(/\s+/g, '-')}-DEMO.txt`, [
      'ELITE PROPERTY MANAGEMENT',
      'OWNER STATEMENT -- DEMO REPORT',
      '',
      `Owner: ${owner.name}`,
      `Payment Schedule: ${owner.paymentSchedule}`,
      `Properties: ${owner.properties.join(', ')}`,
      '',
      `Total Revenue: $${owner.totalRevenue.toLocaleString()}`,
      `Total Expenses: $${owner.expenses.toLocaleString()}`,
      `Net Income: $${owner.netIncome.toLocaleString()}`,
      '',
      'Sample data only -- generated by the Elite Property Management demo.'
    ].join('\n'));
    showToast(`Owner statement for ${owner.name} downloaded`);
  };

  const handleGenerateReport = (title: string, desc: string) => {
    downloadTextFile(`${title.replace(/\s+/g, '-')}-DEMO.txt`, [
      'ELITE PROPERTY MANAGEMENT',
      `${title.toUpperCase()} -- DEMO REPORT`,
      desc,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `Portfolio: ${totalProperties} properties, ${totalUnits} units`,
      `Occupancy: ${occupancyRate}% (${occupiedUnits} of ${totalUnits} units occupied)`,
      `Monthly Revenue: $${totalMonthlyRevenue.toLocaleString()}`,
      `Open Maintenance Requests: ${openMaintenanceRequests}`,
      `Overdue Payments: ${overduePayments}`,
      '',
      'Sample data only -- generated by the Elite Property Management demo.'
    ].join('\n'));
    showToast(`${title} downloaded`);
  };

  const handleUpdateMaintStatus = (id: string) => {
    const request = maintenanceList.find(r => r.id === id);
    if (!request) return;
    const next = NEXT_MAINT_STATUS[request.status];
    setMaintenanceList(prev => prev.map(r => r.id === id ? { ...r, status: next } : r));
    showToast(`Request at ${request.property}, ${request.unit} marked "${next}"`);
  };

  const handleRenewLease = (id: string) => {
    const lease = leasesList.find(l => l.id === id);
    if (!lease) return;
    if (lease.status === 'Renewed') {
      showToast('This lease has already been renewed');
      return;
    }
    const end = new Date(lease.endDate);
    end.setFullYear(end.getFullYear() + 1);
    const newEnd = end.toISOString().slice(0, 10);
    setLeasesList(prev => prev.map(l => l.id === id ? { ...l, status: 'Renewed', endDate: newEnd } : l));
    showToast(`Lease renewed through ${end.toLocaleDateString()} (demo)`);
  };

  const handleLeaseEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal?.kind !== 'lease') return;
    const rent = Math.max(0, parseInt(leaseDraft.rent, 10) || 0);
    setLeasesList(prev => prev.map(l => l.id === modal.id ? { ...l, rent, status: leaseDraft.status } : l));
    setModal(null);
    showToast('Lease updated');
  };

  const handlePropertyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal?.kind !== 'propertyForm') return;
    const units = Math.max(1, parseInt(propertyDraft.units, 10) || 1);
    const rent = Math.max(0, parseInt(propertyDraft.rent, 10) || 0);
    if (modal.id) {
      setPropertiesList(prev => prev.map(p => p.id === modal.id
        ? { ...p, name: propertyDraft.name, address: propertyDraft.address, type: propertyDraft.type, units, occupiedUnits: Math.min(p.occupiedUnits, units), monthlyRent: rent }
        : p));
      showToast('Property updated');
    } else {
      const newProperty: Property = {
        id: `prop-${Date.now()}`,
        name: propertyDraft.name,
        address: propertyDraft.address,
        type: propertyDraft.type,
        units,
        occupiedUnits: 0,
        monthlyRent: rent,
        status: 'Vacant',
        owner: 'Owner 1',
        manager: 'Manager 1',
        image: PROPERTY_IMAGES[propertiesList.length % PROPERTY_IMAGES.length]
      };
      setPropertiesList(prev => [newProperty, ...prev]);
      showToast(`${newProperty.name} added to the portfolio`);
    }
    setModal(null);
  };

  const handleSendReply = (original: Message) => {
    if (!replyText.trim()) return;
    const reply: Message = {
      id: `msg-${Date.now()}`,
      from: userRole === 'Tenant' ? 'John Smith' : 'Property Manager',
      to: original.from,
      subject: original.subject.startsWith('Re:') ? original.subject : `Re: ${original.subject}`,
      message: replyText.trim(),
      date: new Date().toISOString().slice(0, 10),
      read: true,
      attachments: []
    };
    setMessagesList(prev => [reply, ...prev.map(m => m.id === original.id ? { ...m, read: true } : m)]);
    setReplyingId(null);
    setReplyText('');
    showToast(`Reply sent to ${original.from} (demo)`);
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      from: 'Property Manager',
      to: composeForm.to,
      subject: composeForm.subject,
      message: composeForm.body,
      date: new Date().toISOString().slice(0, 10),
      read: true,
      attachments: []
    };
    setMessagesList(prev => [newMessage, ...prev]);
    setComposeForm({ to: '', subject: '', body: '' });
    showToast(`Message sent to ${newMessage.to} (demo)`);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Real lead capture -- same pattern as the maintenance request form
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Elite Property Management',
          demoPackage: 'Custom Business Platform ($5,000)',
          demoSlug: 'elite-property-management',
          clientName: contactForm.name,
          clientPhone: contactForm.phone,
          clientEmail: contactForm.email,
          service: 'Contact Form Inquiry',
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message
        })
      });
      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'elite-property-management' });
        trackConversion('leadForm');
      }
    } catch {
      // Network/API failure -- the demo confirmation still shows
    }
    setContactSubmitted(true);
    showToast('Message received -- we will get back to you shortly');
  };

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#003566] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[#ffc300]" />
            <div>
              <h1 className="text-2xl font-bold">Elite Property Management</h1>
              <p className="text-xs text-[#ffc300]">Managing 30 Premium Properties</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#001d3d] px-3 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                aria-label="Switch demo role"
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="Manager" className="text-gray-900">Manager</option>
                <option value="Tenant" className="text-gray-900">Tenant</option>
                <option value="Owner" className="text-gray-900">Owner</option>
              </select>
            </div>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(o => !o)}
                aria-label="Notifications"
                className="relative hover:text-[#ffc300] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-9 w-80 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 z-50">
                  <div className="p-3 border-b flex items-center justify-between">
                    <span className="font-bold text-[#003566]">Notifications</span>
                    <button
                      className="text-xs text-[#003566] font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
                      disabled={unreadNotifications === 0}
                      onClick={() => {
                        setReadNotificationIds(NOTIFICATION_ITEMS.map(n => n.id));
                        showToast('All notifications marked as read');
                      }}
                    >
                      {unreadNotifications === 0 ? 'All read' : 'Mark all as read'}
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y">
                    {NOTIFICATION_ITEMS.map(item => {
                      const isUnread = !readNotificationIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNotificationClick(item)}
                          className={`w-full text-left p-3 text-sm hover:bg-gray-50 transition-colors ${isUnread ? 'bg-[#ffc300]/10' : ''}`}
                        >
                          <p className="text-gray-800 flex items-start gap-2">
                            {isUnread && <span className="mt-1.5 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" aria-label="Unread" />}
                            <span>{item.text}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{item.time} &middot; Open in portal</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={openSettings}
              aria-label="Settings"
              className="hover:text-[#ffc300] transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setNotificationsOpen(false); setModal({ kind: 'signOut' }); }}
              aria-label="Log out"
              className="hover:text-[#ffc300] transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Dashboard', icon: BarChart3 },
            { page: 'properties' as Page, label: 'Properties', icon: Building2 },
            { page: 'tenants' as Page, label: 'Tenant Portal', icon: Users },
            { page: 'owners' as Page, label: 'Owner Portal', icon: UserCheck },
            { page: 'maintenance' as Page, label: 'Maintenance', icon: Wrench },
            { page: 'payments' as Page, label: 'Payments', icon: CreditCard },
            { page: 'leases' as Page, label: 'Leases', icon: FileText },
            { page: 'reports' as Page, label: 'Reports', icon: PieChart },
            { page: 'messages' as Page, label: 'Messages', icon: MessageSquare },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#ffc300] text-[#003566] font-semibold' : 'bg-[#001d3d] hover:bg-[#ffc300] hover:text-[#003566]'
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
  const DashboardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#003566] mb-2">Property Management Dashboard</h1>
        <p className="text-gray-600">Real-time overview of all 30 properties</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => goToPropertiesWithStatus('all')}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#003566] hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 text-[#003566]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Properties</h3>
          <p className="text-3xl font-bold text-[#003566]">{totalProperties}</p>
          <p className="text-sm text-green-600 mt-2">+3 this month</p>
          <p className="text-xs text-[#003566] font-semibold mt-3">View portfolio →</p>
        </button>

        <button
          onClick={() => setModal({ kind: 'vacancies' })}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#ffc300] hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <Home className="w-8 h-8 text-[#ffc300]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-[#003566]">{occupancyRate}%</p>
          <p className="text-sm text-gray-600 mt-2">{occupiedUnits} of {totalUnits} units</p>
          <p className="text-xs text-[#003566] font-semibold mt-3">See vacancy breakdown →</p>
        </button>

        <button
          onClick={() => goToPaymentsWithStatus('all')}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-[#003566]">${(totalMonthlyRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+8.5% vs last month</p>
          <p className="text-xs text-[#003566] font-semibold mt-3">Open payments →</p>
        </button>

        <button
          onClick={() => { setMaintStatusFilter('All Status'); setMaintPriorityFilter('All Priorities'); goTo('maintenance'); }}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <Zap className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Issues</h3>
          <p className="text-3xl font-bold text-[#003566]">{openMaintenanceRequests + overduePayments}</p>
          <p className="text-sm text-gray-600 mt-2">{openMaintenanceRequests} maintenance, {overduePayments} overdue</p>
          <p className="text-xs text-[#003566] font-semibold mt-3">Work the queue →</p>
        </button>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003566] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#ffc300]" />
            Urgent Maintenance Requests
          </h2>
          <div className="space-y-4">
            {maintenanceList.filter(m => m.priority === 'Emergency' || m.priority === 'High').map(request => (
              <div key={request.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{request.property}, {request.unit}</h3>
                    <p className="text-sm text-gray-600">{request.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.priority === 'Emergency' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {request.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Est. Cost: {request.estimatedCost > 0 ? `$${request.estimatedCost}` : 'Pending'}</span>
                  <button
                    onClick={() => setModal({ kind: 'maintenance', id: request.id })}
                    className="text-sm text-[#003566] font-semibold hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003566] mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#ffc300]" />
            Recent Payments
          </h2>
          <div className="space-y-3">
            {payments.map(payment => (
              <button
                key={payment.id}
                onClick={() => setModal({ kind: 'payment', id: payment.id })}
                className="w-full flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    payment.status === 'Completed' ? 'bg-green-100' : payment.status === 'Pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${
                      payment.status === 'Completed' ? 'text-green-600' : payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{payment.tenant}</p>
                    <p className="text-sm text-gray-600">{payment.property}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#003566]">${payment.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Performance Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#003566] mb-4 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-[#ffc300]" />
          Property Portfolio Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => goToPropertiesWithStatus('Active')}
            className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-blue-600 mb-1">{propertiesList.filter(p => p.status === 'Active').length}</h3>
            <p className="text-gray-700">Active Properties</p>
            <p className="text-xs text-blue-700 font-semibold mt-2">Filter portfolio →</p>
          </button>
          <button
            onClick={() => goToPropertiesWithStatus('Maintenance')}
            className="text-center p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <Wrench className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-yellow-600 mb-1">{propertiesList.filter(p => p.status === 'Maintenance').length}</h3>
            <p className="text-gray-700">Under Maintenance</p>
            <p className="text-xs text-yellow-700 font-semibold mt-2">Filter portfolio →</p>
          </button>
          <button
            onClick={() => setModal({ kind: 'vacancies' })}
            className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Key className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-gray-600 mb-1">{totalUnits - occupiedUnits}</h3>
            <p className="text-gray-700">Vacant Units</p>
            <p className="text-xs text-gray-700 font-semibold mt-2">See which properties →</p>
          </button>
        </div>
      </div>
    </div>
  );

  // Page: Properties
  const PropertiesPage = () => {
    const filteredProperties = propertiesList
      .filter(p => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return p.name.toLowerCase().includes(term) || p.address.toLowerCase().includes(term);
      })
      .filter(p => typeFilter === 'all' || p.type === typeFilter)
      .filter(p => statusFilter === 'all' || p.status === statusFilter);
    const shown = filteredProperties.slice(0, visibleCount);
    const remaining = filteredProperties.length - shown.length;

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#003566] mb-2">Property Portfolio</h1>
            <p className="text-gray-600">Managing {totalProperties} properties with {totalUnits} total units</p>
          </div>
          <button
            onClick={() => openPropertyForm(null)}
            className="bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-semibold hover:bg-[#003566] hover:text-white transition-colors flex items-center gap-2"
          >
            <Building2 className="w-5 h-5" />
            Add Property
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search properties..."
              aria-label="Search properties"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(12); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent"
            />
          </div>
          <select
            aria-label="Filter by property type"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setVisibleCount(12); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
          >
            <option value="all">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Multi-Family">Multi-Family</option>
            <option value="Single Family">Single Family</option>
            <option value="Commercial">Commercial</option>
          </select>
          <select
            aria-label="Filter by property status"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setVisibleCount(12); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Vacant">Vacant</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === 'Active' ? 'bg-green-500 text-white' :
                    property.status === 'Maintenance' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#003566] mb-1">{property.name}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {property.address}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-semibold">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Units</p>
                    <p className="font-semibold">{property.occupiedUnits}/{property.units}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Rent</p>
                    <p className="font-semibold text-green-600">${property.monthlyRent}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Occupancy</p>
                    <p className="font-semibold">{((property.occupiedUnits / property.units) * 100).toFixed(0)}%</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal({ kind: 'property', id: property.id })}
                    className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openPropertyForm(property.id)}
                    aria-label={`Edit ${property.name}`}
                    className="px-3 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No properties match your filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('all'); setStatusFilter('all'); setVisibleCount(12); }}
              className="bg-[#003566] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {remaining > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(c => c + 12)}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Load More Properties ({remaining} more)
            </button>
          </div>
        )}
      </div>
    );
  };

  // Page: Tenant Portal
  const TenantPortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-[#003566]">Tenant Portal</h1>
        {userRole === 'Tenant' ? (
          <button
            onClick={() => setUserRole('Manager')}
            className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Switch to Manager View
          </button>
        ) : (
          <button
            onClick={() => setUserRole('Tenant')}
            className="px-4 py-2 bg-[#ffc300] text-[#003566] rounded-lg font-semibold hover:bg-[#003566] hover:text-white transition-colors text-sm"
          >
            Preview Tenant View
          </button>
        )}
      </div>

      {userRole === 'Tenant' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#003566] mb-4">My Lease Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Property</p>
                  <p className="font-semibold">Sunset Apartments</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Unit</p>
                  <p className="font-semibold">Unit 201</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Lease Start</p>
                  <p className="font-semibold">Jan 1, 2024</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Lease End</p>
                  <p className="font-semibold">Dec 31, 2024</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Monthly Rent</p>
                  <p className="font-semibold text-green-600">$1,800</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Payment Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Paid</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#003566] mb-4">Submit Maintenance Request</h2>
              {maintSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#003566] mb-2">Request Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Your maintenance request has been logged and appears under My Requests.
                    Our team will reach out to schedule the repair.
                  </p>
                  <button
                    onClick={resetMaintenanceForm}
                    className="text-[#003566] font-semibold hover:underline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleMaintenanceSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="property-maintenance-name" className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                      <input
                        id="property-maintenance-name"
                        type="text"
                        required
                        value={maintForm.name}
                        onChange={(e) => setMaintForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="property-maintenance-phone" className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone *</label>
                      <input
                        id="property-maintenance-phone"
                        type="tel"
                        required
                        value={maintForm.phone}
                        onChange={(e) => setMaintForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="property-maintenance-email" className="block text-sm font-semibold text-gray-700 mb-2">Email (optional)</label>
                    <input
                      id="property-maintenance-email"
                      type="email"
                      value={maintForm.email}
                      onChange={(e) => setMaintForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="property-maintenance-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      id="property-maintenance-category"
                      value={maintForm.category}
                      onChange={(e) => setMaintForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                    >
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>HVAC</option>
                      <option>Appliance</option>
                      <option>Structural</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="property-maintenance-priority" className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select
                      id="property-maintenance-priority"
                      value={maintForm.priority}
                      onChange={(e) => setMaintForm(f => ({ ...f, priority: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="property-maintenance-description" className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea
                      id="property-maintenance-description"
                      rows={4}
                      required
                      value={maintForm.description}
                      onChange={(e) => setMaintForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                      placeholder="Describe the issue in detail..."
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="property-maintenance-photos" className="block text-sm font-semibold text-gray-700 mb-2">Upload Photos</label>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      aria-hidden="true"
                      tabIndex={-1}
                      onChange={(e) => {
                        const names = Array.from(e.target.files ?? []).map(f => f.name);
                        if (names.length) setMaintPhotos(prev => [...prev, ...names]);
                        e.target.value = '';
                      }}
                    />
                    <button
                      id="property-maintenance-photos"
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#003566] transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Click to upload images
                    </button>
                    {maintPhotos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {maintPhotos.map((name, idx) => (
                          <span key={`${name}-${idx}`} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            <Paperclip className="w-3 h-3" />
                            {name}
                            <button
                              type="button"
                              aria-label={`Remove ${name}`}
                              onClick={() => setMaintPhotos(prev => prev.filter((_, i) => i !== idx))}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Demo only -- photos are attached by file name, nothing is uploaded.</p>
                  </div>
                  <button
                    type="submit"
                    disabled={maintSubmitting}
                    className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors disabled:opacity-60"
                  >
                    {maintSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={openPayRent}
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {rentPaid ? 'Rent Paid -- View Receipt' : 'Pay Rent'}
                </button>
                <button
                  onClick={handleDownloadLease}
                  className="w-full bg-[#003566] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Lease
                </button>
                <button
                  onClick={() => {
                    setComposeForm({ to: 'Property Managers', subject: 'Question about Unit 201', body: '' });
                    goTo('messages');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Message Manager
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">My Requests</h2>
              <div className="space-y-3">
                {myRequests.length === 0 && (
                  <p className="text-sm text-gray-600">No maintenance requests yet.</p>
                )}
                {myRequests.map(request => (
                  <button
                    key={request.id}
                    onClick={() => setModal({ kind: 'maintenance', id: request.id })}
                    className={`w-full text-left border-l-4 p-3 rounded ${
                      request.status === 'Completed' ? 'border-green-500 bg-green-50' :
                      request.status === 'In Progress' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
                    }`}
                  >
                    <p className="font-semibold text-sm">
                      {request.category}: {request.description.length > 42 ? `${request.description.slice(0, 42)}...` : request.description}
                    </p>
                    <p className="text-xs text-gray-600">{request.status}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">Payment History</h2>
              <div className="space-y-2">
                {tenantPayments.map(payment => (
                  <button
                    key={payment.id}
                    onClick={() => setModal({ kind: 'receipt', id: payment.id })}
                    className="w-full flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-sm text-gray-700">
                      {payment.label}
                      <span className="block text-xs text-gray-500">{payment.method} &middot; View receipt</span>
                    </span>
                    <span className="text-sm font-semibold text-green-600">${payment.amount.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#003566] mb-6">All Tenants</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tenant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Rent</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tenants.map(tenant => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{tenant.name}</p>
                        <p className="text-sm text-gray-600">{tenant.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{tenant.property}</td>
                    <td className="px-6 py-4 text-gray-700">{tenant.unit}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${tenant.rent}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tenant.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                        tenant.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tenant.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setModal({ kind: 'tenant', id: tenant.id })}
                        className="text-[#003566] hover:underline font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // Page: Owner Portal
  const OwnerCard = ({ owner }: { owner: Owner }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#003566] rounded-full flex items-center justify-center">
          <UserCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-[#003566]">{owner.name}</h2>
          <p className="text-sm text-gray-600">{owner.properties.length} Properties</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${owner.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">${owner.expenses.toLocaleString()}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Net Income</p>
          <p className="text-2xl font-bold text-blue-600">${owner.netIncome.toLocaleString()}</p>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">Properties</p>
        <div className="space-y-2">
          {owner.properties.map(prop => (
            <button
              key={prop}
              onClick={() => openPropertyByName(prop)}
              className="w-full text-sm text-gray-700 flex items-center gap-2 p-2 rounded hover:bg-gray-50 hover:text-[#003566] transition-colors text-left"
            >
              <Building2 className="w-4 h-4 text-[#ffc300] flex-shrink-0" />
              <span className="flex-1">{prop}</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => handleDownloadOwnerReport(owner)}
          className="w-full bg-[#003566] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Report
        </button>
        <button
          onClick={() => { setComposeForm({ to: owner.name, subject: `Portfolio update for ${owner.name}`, body: '' }); goTo('messages'); }}
          className="w-full border-2 border-[#003566] text-[#003566] px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5" />
          Message Owner
        </button>
      </div>
    </div>
  );

  const OwnerPortalPage = () => {
    const myOwner = owners[0];
    const payoutSchedule = [
      { period: 'May 2024', gross: 42500, fees: 3400, net: 39100, status: 'Deposited' },
      { period: 'Apr 2024', gross: 41200, fees: 3296, net: 37904, status: 'Deposited' },
      { period: 'Mar 2024', gross: 41300, fees: 3304, net: 37996, status: 'Deposited' },
      { period: 'Jun 2024', gross: 43100, fees: 3448, net: 39652, status: 'Scheduled' }
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-[#003566]">Owner Portal</h1>
          {userRole === 'Owner' ? (
            <button
              onClick={() => setUserRole('Manager')}
              className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Switch to Manager View
            </button>
          ) : (
            <button
              onClick={() => setUserRole('Owner')}
              className="px-4 py-2 bg-[#ffc300] text-[#003566] rounded-lg font-semibold hover:bg-[#003566] hover:text-white transition-colors text-sm"
            >
              Preview Owner View
            </button>
          )}
        </div>

        {userRole === 'Owner' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#003566] mb-1">Welcome back, {myOwner.name}</h2>
                <p className="text-gray-600 mb-6">{myOwner.paymentSchedule} distributions across {myOwner.properties.length} properties</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Revenue YTD</p>
                    <p className="text-2xl font-bold text-green-600">${myOwner.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Expenses YTD</p>
                    <p className="text-2xl font-bold text-red-600">${myOwner.expenses.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Net Income</p>
                    <p className="text-2xl font-bold text-blue-600">${myOwner.netIncome.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#003566] mb-4">Distribution History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Period</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Gross</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Mgmt Fee</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Net</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payoutSchedule.map(row => (
                        <tr key={row.period} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.period}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">${row.gross.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-red-600">-${row.fees.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-bold text-green-600">${row.net.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              row.status === 'Deposited' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#003566] mb-4">My Properties</h2>
                <div className="space-y-3">
                  {myOwner.properties.map(prop => {
                    const property = propertiesList.find(p => p.name === prop);
                    return (
                      <button
                        key={prop}
                        onClick={() => openPropertyByName(prop)}
                        className="w-full flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-[#ffc300]" />
                          <div>
                            <p className="font-semibold text-gray-900">{prop}</p>
                            <p className="text-sm text-gray-600">
                              {property ? `${property.occupiedUnits}/${property.units} units occupied` : 'Details in portfolio'}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-[#003566]">View →</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#003566] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => handleDownloadOwnerReport(myOwner)}
                    className="w-full bg-[#003566] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Statement
                  </button>
                  <button
                    onClick={() => goTo('reports')}
                    className="w-full bg-[#ffc300] text-[#003566] px-4 py-3 rounded-lg font-semibold hover:bg-[#003566] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <PieChart className="w-5 h-5" />
                    Financial Reports
                  </button>
                  <button
                    onClick={() => { setComposeForm({ to: 'Property Managers', subject: 'Question about my portfolio', body: '' }); goTo('messages'); }}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Message Manager
                  </button>
                  <button
                    onClick={openSettings}
                    className="w-full border-2 border-[#003566] text-[#003566] px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
                    Statement Preferences
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#003566] mb-4">Open Work Orders</h2>
                <div className="space-y-3">
                  {maintenanceList.filter(r => myOwner.properties.includes(r.property) && r.status !== 'Completed').length === 0 && (
                    <p className="text-sm text-gray-600">No open work orders on your properties.</p>
                  )}
                  {maintenanceList
                    .filter(r => myOwner.properties.includes(r.property) && r.status !== 'Completed')
                    .map(request => (
                      <button
                        key={request.id}
                        onClick={() => setModal({ kind: 'maintenance', id: request.id })}
                        className="w-full text-left border-l-4 border-[#ffc300] bg-yellow-50 p-3 rounded"
                      >
                        <p className="font-semibold text-sm text-gray-900">{request.property}, {request.unit}</p>
                        <p className="text-xs text-gray-600">{request.category} &middot; {request.status}</p>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {owners.map(owner => <OwnerCard key={owner.id} owner={owner} />)}
          </div>
        )}
      </div>
    );
  };

  // Page: Maintenance
  const MaintenancePage = () => {
    const filteredRequests = maintenanceList
      .filter(r => maintStatusFilter === 'All Status' || r.status === maintStatusFilter)
      .filter(r => maintPriorityFilter === 'All Priorities' || r.priority === maintPriorityFilter);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#003566]">Maintenance Requests</h1>
          <div className="flex gap-3">
            <select
              aria-label="Filter by request status"
              value={maintStatusFilter}
              onChange={(e) => setMaintStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
            >
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select
              aria-label="Filter by request priority"
              value={maintPriorityFilter}
              onChange={(e) => setMaintPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
            >
              <option>All Priorities</option>
              <option>Emergency</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-600">
            No maintenance requests match your filters.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <div key={request.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
              request.priority === 'Emergency' ? 'border-red-600' :
              request.priority === 'High' ? 'border-orange-500' :
              request.priority === 'Medium' ? 'border-yellow-500' : 'border-blue-500'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#003566]">{request.property}</h3>
                  <p className="text-sm text-gray-600">{request.unit}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  request.priority === 'Emergency' ? 'bg-red-500 text-white' :
                  request.priority === 'High' ? 'bg-orange-500 text-white' :
                  request.priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {request.priority}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Wrench className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold">{request.category}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{request.tenant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(request.submittedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{request.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-600">Assigned To</p>
                  <p className="text-sm font-semibold">{request.assignedTo}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Est. Cost</p>
                  <p className="text-sm font-bold text-green-600">{request.estimatedCost > 0 ? `$${request.estimatedCost}` : 'Pending'}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateMaintStatus(request.id)}
                  className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold"
                >
                  Mark {NEXT_MAINT_STATUS[request.status]}
                </button>
                <button
                  onClick={() => setModal({ kind: 'maintenance', id: request.id })}
                  aria-label="View request details"
                  className="px-3 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Page: Payments
  const PaymentsPage = () => {
    const paymentCards: { status: Payment['status']; label: string; color: string }[] = [
      { status: 'Completed', label: 'Total Collected', color: 'text-green-600' },
      { status: 'Pending', label: 'Pending Payments', color: 'text-yellow-600' },
      { status: 'Failed', label: 'Failed Payments', color: 'text-red-600' }
    ];
    const visiblePayments = payments.filter(p => paymentStatusFilter === 'all' || p.status === paymentStatusFilter);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#003566] mb-8">Payment Processing</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {paymentCards.map(card => {
            const active = paymentStatusFilter === card.status;
            return (
              <button
                key={card.status}
                onClick={() => setPaymentStatusFilter(active ? 'all' : card.status)}
                aria-pressed={active}
                className={`text-left bg-white rounded-lg shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                  active ? 'border-[#003566] ring-2 ring-[#ffc300]' : 'border-transparent'
                }`}
              >
                <h3 className="text-gray-600 text-sm font-semibold mb-2">{card.label}</h3>
                <p className={`text-3xl font-bold ${card.color}`}>
                  ${payments.filter(p => p.status === card.status).reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-[#003566] mt-3">
                  {active ? 'Filtering -- click to clear' : 'Click to filter the table'}
                </p>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#003566]">
              {paymentStatusFilter === 'all' ? 'All Payments' : `${paymentStatusFilter} Payments`}
              <span className="ml-2 text-base font-semibold text-gray-500">({visiblePayments.length})</span>
            </h2>
            <div className="flex items-center gap-3">
              <label htmlFor="property-payment-status" className="text-sm font-semibold text-gray-700">Status</label>
              <select
                id="property-payment-status"
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value as 'all' | Payment['status'])}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tenant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visiblePayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payment.tenant}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.property}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">${payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setModal({ kind: 'payment', id: payment.id })}
                        className="text-[#003566] hover:underline font-semibold text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visiblePayments.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">No {paymentStatusFilter.toLowerCase()} payments right now.</p>
              <button
                onClick={() => setPaymentStatusFilter('all')}
                className="bg-[#003566] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors"
              >
                Show All Payments
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Page: Leases
  const LeasesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Lease Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leasesList.map(lease => (
          <div key={lease.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-[#003566]">{lease.property}</h3>
                <p className="text-gray-600">{lease.unit}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                lease.status === 'Active' ? 'bg-green-100 text-green-700' :
                lease.status === 'Renewed' ? 'bg-blue-100 text-blue-700' :
                lease.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {lease.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Tenant</p>
                <p className="font-semibold">{lease.tenant}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-semibold text-green-600">${lease.rent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-semibold">{new Date(lease.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-semibold">{new Date(lease.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <div className="space-y-2">
                {lease.documents.map(doc => (
                  <div key={doc} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#003566]" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <button
                      onClick={() => handleDownloadLeaseDoc(lease, doc)}
                      className="text-[#003566] hover:underline text-sm"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleRenewLease(lease.id)}
                disabled={lease.status === 'Renewed'}
                className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {lease.status === 'Renewed' ? 'Lease Renewed' : 'Renew Lease'}
              </button>
              <button
                onClick={() => openLeaseEdit(lease.id)}
                className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Reports
  const ReportsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Revenue Report', desc: 'Monthly income analysis', icon: DollarSign, iconBg: 'bg-green-100', iconText: 'text-green-600' },
          { title: 'Occupancy Report', desc: 'Unit utilization metrics', icon: Home, iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
          { title: 'Maintenance Report', desc: 'Request tracking & costs', icon: Wrench, iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
          { title: 'Expense Report', desc: 'Operating cost breakdown', icon: BarChart3, iconBg: 'bg-red-100', iconText: 'text-red-600' },
          { title: 'Owner Statement', desc: 'Property owner financials', icon: UserCheck, iconBg: 'bg-purple-100', iconText: 'text-purple-600' },
          { title: 'Tenant Report', desc: 'Tenant payment history', icon: Users, iconBg: 'bg-teal-100', iconText: 'text-teal-600' }
        ].map(report => (
          <div key={report.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 ${report.iconBg} rounded-lg flex items-center justify-center mb-4`}>
              <report.icon className={`w-6 h-6 ${report.iconText}`} />
            </div>
            <h3 className="font-bold text-lg text-[#003566] mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
            <button
              onClick={() => handleGenerateReport(report.title, report.desc)}
              className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Messages
  const MessagesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Message Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {messagesList.map(message => (
            <div key={message.id} className={`bg-white rounded-lg shadow-lg p-6 ${!message.read ? 'border-l-4 border-[#ffc300]' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-[#003566]">{message.subject}</h3>
                  <p className="text-sm text-gray-600">From: {message.from} &middot; To: {message.to}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">{new Date(message.date).toLocaleDateString()}</span>
                  {!message.read && (
                    <button
                      onClick={() => handleMarkMessageRead(message.id)}
                      className="text-xs font-semibold text-[#003566] hover:underline mt-1"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{message.message}</p>
              {message.attachments.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Paperclip className="w-4 h-4 text-gray-600" />
                  {message.attachments.map(attachment => (
                    <button
                      key={attachment}
                      onClick={() => handleDownloadAttachment(message, attachment)}
                      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-[#003566] text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      {attachment}
                    </button>
                  ))}
                </div>
              )}
              {replyingId === message.id ? (
                <div className="space-y-3">
                  <label htmlFor={`property-reply-${message.id}`} className="sr-only">Reply to {message.from}</label>
                  <textarea
                    id={`property-reply-${message.id}`}
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                    placeholder={`Reply to ${message.from}...`}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSendReply(message)}
                      className="bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Reply
                    </button>
                    <button
                      onClick={() => { setReplyingId(null); setReplyText(''); }}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setReplyingId(message.id); setReplyText(''); }}
                  className="bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="font-bold text-xl text-[#003566] mb-4">New Message</h2>
          <form className="space-y-4" onSubmit={handleComposeSubmit}>
            <div>
              <label htmlFor="property-message-to" className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <select
                id="property-message-to"
                required
                value={composeForm.to}
                onChange={(e) => setComposeForm(f => ({ ...f, to: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              >
                <option value="">Select recipient...</option>
                <optgroup label="Groups">
                  <option>All Tenants</option>
                  <option>All Owners</option>
                  <option>Property Managers</option>
                </optgroup>
                <optgroup label="Tenants">
                  {tenants.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </optgroup>
                <optgroup label="Owners">
                  {owners.map(o => <option key={o.id} value={o.name}>{o.name}</option>)}
                </optgroup>
              </select>
            </div>
            <div>
              <label htmlFor="property-message-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input
                id="property-message-subject"
                type="text"
                required
                value={composeForm.subject}
                onChange={(e) => setComposeForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Message subject..."
              />
            </div>
            <div>
              <label htmlFor="property-message-body" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                id="property-message-body"
                rows={5}
                required
                value={composeForm.body}
                onChange={(e) => setComposeForm(f => ({ ...f, body: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc300] text-[#003566] px-4 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Page: Contact
  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#003566] mb-6">Get in Touch</h2>
          {contactSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#003566] mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thanks for reaching out, {contactForm.name || 'friend'}. Our office will get back to you within one business day.
              </p>
              <button
                onClick={() => { setContactSubmitted(false); setContactForm({ name: '', email: '', phone: '', message: '' }); }}
                className="text-[#003566] font-semibold hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="property-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  id="property-contact-name"
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="property-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  id="property-contact-email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="property-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  id="property-contact-phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="property-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  id="property-contact-message"
                  rows={5}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#003566] mb-6">Office Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ffc300] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">123 Property Lane<br />Suite 100<br />City, ST 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#ffc300] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href="tel:+15551234567" className="text-[#003566] font-semibold hover:underline">(555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#ffc300] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:info@elitepm.com" className="text-[#003566] font-semibold hover:underline">info@elitepm.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#ffc300] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Office Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 2pm<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#003566] text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
            <p className="mb-4">For urgent maintenance issues outside business hours:</p>
            <a href="tel:+15559999999" className="text-2xl font-bold text-[#ffc300] hover:underline block mb-4">(555) 999-9999</a>
            <button
              onClick={() => {
                setUserRole('Tenant');
                setMaintForm(f => ({ ...f, priority: 'Emergency' }));
                setMaintSubmitted(false);
                goTo('tenants');
              }}
              className="w-full bg-[#ffc300] text-[#003566] px-4 py-3 rounded-lg font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Wrench className="w-5 h-5" />
              Report an Emergency Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#003566] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-8 h-8 text-[#ffc300]" />
              <span className="text-xl font-bold">Elite Property Management</span>
            </div>
            <p className="text-gray-300 text-sm">
              Professional property management for 30+ premium properties. Serving owners and tenants with excellence since 2010.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Tenants</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => { setUserRole('Tenant'); goTo('tenants'); openPayRent(); }} className="hover:text-white">Pay Rent Online</button></li>
              <li><button onClick={() => { setUserRole('Tenant'); goTo('tenants'); }} className="hover:text-white">Submit Maintenance</button></li>
              <li><button onClick={() => goTo('leases')} className="hover:text-white">Lease Information</button></li>
              <li><button onClick={() => { setUserRole('Tenant'); goTo('tenants'); }} className="hover:text-white">Tenant Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Owners</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goTo('owners')} className="hover:text-white">Owner Portal</button></li>
              <li><button onClick={() => goTo('reports')} className="hover:text-white">Financial Reports</button></li>
              <li><button onClick={() => goTo('reports')} className="hover:text-white">Property Performance</button></li>
              <li><button onClick={() => { goTo('properties'); openPropertyForm(null); }} className="hover:text-white">Add Property</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => goTo('contact')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => goTo('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => setModal({ kind: 'policy', doc: 'privacy' })} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => setModal({ kind: 'policy', doc: 'terms' })} className="hover:text-white">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#001d3d] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Elite Property Management. All rights reserved. Managing {totalProperties} properties with {totalUnits} units.</p>
        </div>
      </div>
    </footer>
  );

  // ---- Modals ----
  const renderModal = () => {
    if (!modal) return null;

    if (modal.kind === 'property') {
      const property = propertiesList.find(p => p.id === modal.id);
      if (!property) return null;
      return (
        <DemoModal title={property.name} onClose={closeModal}>
          <img src={property.image} alt={property.name} className="w-full h-44 object-cover rounded-lg mb-4" />
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-semibold">{property.address}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-semibold">{property.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-semibold">{property.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Occupancy</p>
              <p className="font-semibold">{property.occupiedUnits}/{property.units} units ({((property.occupiedUnits / property.units) * 100).toFixed(0)}%)</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly Rent (per unit)</p>
              <p className="font-semibold text-green-600">${property.monthlyRent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Est. Monthly Revenue</p>
              <p className="font-semibold text-green-600">${(property.monthlyRent * property.occupiedUnits).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Owner</p>
              <p className="font-semibold">{property.owner}</p>
            </div>
            <div>
              <p className="text-gray-600">Manager</p>
              <p className="font-semibold">{property.manager}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openPropertyForm(property.id)}
              className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold"
            >
              Edit Property
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </DemoModal>
      );
    }

    if (modal.kind === 'propertyForm') {
      const isEdit = Boolean(modal.id);
      return (
        <DemoModal title={isEdit ? 'Edit Property' : 'Add Property'} onClose={closeModal}>
          <form className="space-y-4" onSubmit={handlePropertyFormSubmit}>
            <div>
              <label htmlFor="property-form-name" className="block text-sm font-semibold text-gray-700 mb-2">Property Name *</label>
              <input
                id="property-form-name"
                type="text"
                required
                value={propertyDraft.name}
                onChange={(e) => setPropertyDraft(d => ({ ...d, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="e.g. Sunset Apartments"
              />
            </div>
            <div>
              <label htmlFor="property-form-address" className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
              <input
                id="property-form-address"
                type="text"
                required
                value={propertyDraft.address}
                onChange={(e) => setPropertyDraft(d => ({ ...d, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Street, City, ST ZIP"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="property-form-type" className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select
                  id="property-form-type"
                  value={propertyDraft.type}
                  onChange={(e) => setPropertyDraft(d => ({ ...d, type: e.target.value as Property['type'] }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                >
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Multi-Family</option>
                  <option>Single Family</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label htmlFor="property-form-units" className="block text-sm font-semibold text-gray-700 mb-2">Units</label>
                <input
                  id="property-form-units"
                  type="number"
                  min={1}
                  required
                  value={propertyDraft.units}
                  onChange={(e) => setPropertyDraft(d => ({ ...d, units: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                />
              </div>
              <div>
                <label htmlFor="property-form-rent" className="block text-sm font-semibold text-gray-700 mb-2">Rent ($)</label>
                <input
                  id="property-form-rent"
                  type="number"
                  min={0}
                  required
                  value={propertyDraft.rent}
                  onChange={(e) => setPropertyDraft(d => ({ ...d, rent: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors"
            >
              {isEdit ? 'Save Changes' : 'Add Property'}
            </button>
            <p className="text-xs text-gray-500 text-center">Demo only -- changes live in your browser and reset when demo data is cleared.</p>
          </form>
        </DemoModal>
      );
    }

    if (modal.kind === 'maintenance') {
      const request = maintenanceList.find(r => r.id === modal.id);
      if (!request) return null;
      return (
        <DemoModal title="Maintenance Request Details" onClose={closeModal}>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                request.priority === 'Emergency' ? 'bg-red-500 text-white' :
                request.priority === 'High' ? 'bg-orange-500 text-white' :
                request.priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                {request.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {request.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Property</p>
                <p className="font-semibold">{request.property}</p>
              </div>
              <div>
                <p className="text-gray-600">Unit</p>
                <p className="font-semibold">{request.unit}</p>
              </div>
              <div>
                <p className="text-gray-600">Tenant</p>
                <p className="font-semibold">{request.tenant}</p>
              </div>
              <div>
                <p className="text-gray-600">Category</p>
                <p className="font-semibold">{request.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Submitted</p>
                <p className="font-semibold">{new Date(request.submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Assigned To</p>
                <p className="font-semibold">{request.assignedTo}</p>
              </div>
              <div>
                <p className="text-gray-600">Est. Cost</p>
                <p className="font-semibold text-green-600">{request.estimatedCost > 0 ? `$${request.estimatedCost}` : 'Pending'}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Description</p>
              <p className="text-gray-800 bg-gray-50 rounded p-3">{request.description}</p>
            </div>
            {request.images.length > 0 && (
              <div>
                <p className="text-gray-600 mb-1">Attached Photos</p>
                <div className="flex flex-wrap gap-2">
                  {request.images.map((name, idx) => (
                    <span key={`${name}-${idx}`} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      <Paperclip className="w-3 h-3" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleUpdateMaintStatus(request.id)}
                className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors font-semibold"
              >
                Mark {NEXT_MAINT_STATUS[request.status]}
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </DemoModal>
      );
    }

    if (modal.kind === 'tenant') {
      const tenant = tenants.find(t => t.id === modal.id);
      if (!tenant) return null;
      return (
        <DemoModal title={tenant.name} onClose={closeModal}>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{tenant.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold">{tenant.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Property</p>
              <p className="font-semibold">{tenant.property}</p>
            </div>
            <div>
              <p className="text-gray-600">Unit</p>
              <p className="font-semibold">{tenant.unit}</p>
            </div>
            <div>
              <p className="text-gray-600">Lease Term</p>
              <p className="font-semibold">{new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly Rent</p>
              <p className="font-semibold text-green-600">${tenant.rent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Payment Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                tenant.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                tenant.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {tenant.paymentStatus}
              </span>
            </div>
            <div>
              <p className="text-gray-600">Outstanding Balance</p>
              <p className={`font-semibold ${tenant.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>${tenant.balance.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setComposeForm({ to: tenant.name, subject: `Regarding ${tenant.property}, ${tenant.unit}`, body: '' });
                closeModal();
                goTo('messages');
              }}
              className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold"
            >
              Message Tenant
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </DemoModal>
      );
    }

    if (modal.kind === 'payment') {
      const payment = payments.find(p => p.id === modal.id);
      if (!payment) return null;
      return (
        <DemoModal title="Payment Details" onClose={closeModal}>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-600">Payment ID</p>
              <p className="font-semibold uppercase">{payment.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-semibold">{new Date(payment.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Tenant</p>
              <p className="font-semibold">{payment.tenant}</p>
            </div>
            <div>
              <p className="text-gray-600">Property</p>
              <p className="font-semibold">{payment.property}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-semibold">{payment.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Method</p>
              <p className="font-semibold">{payment.method}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount</p>
              <p className="font-semibold text-green-600">${payment.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                payment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {payment.status}
              </span>
            </div>
          </div>
          {payment.status === 'Failed' && (
            <div className="mb-4 space-y-3">
              <p className="text-sm text-red-600 bg-red-50 rounded p-3">
                This payment failed. Retry the charge or send the tenant a payment reminder.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRetryPayment(payment.id)}
                  disabled={retryingPaymentId === payment.id}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold disabled:opacity-60"
                >
                  {retryingPaymentId === payment.id ? 'Retrying...' : 'Retry Charge'}
                </button>
                <button
                  onClick={() => handleSendPaymentReminder(payment)}
                  className="flex-1 border-2 border-[#003566] text-[#003566] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                >
                  Send Reminder
                </button>
              </div>
            </div>
          )}
          <button
            onClick={closeModal}
            className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold"
          >
            Close
          </button>
        </DemoModal>
      );
    }

    if (modal.kind === 'payRent') {
      const paid = rentPaid || payState === 'done';
      return (
        <DemoModal title="Pay Rent" onClose={closeModal}>
          {paid ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#003566] mb-2">Payment Confirmed</h3>
              <p className="text-gray-600 mb-4">June 2024 rent for Sunset Apartments, Unit 201 is paid.</p>
              <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-2 mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Amount</span><span className="font-semibold">$1,800.00</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Method</span><span className="font-semibold">{tenantPayments.find(p => p.label === 'Jun 2024')?.method ?? payMethod}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Period</span><span className="font-semibold">June 2024</span></div>
              </div>
              <p className="text-xs text-gray-500 mb-4">Demo payment simulation -- no card was entered and no real charge occurred.</p>
              <button
                onClick={closeModal}
                className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Property</span><span className="font-semibold">Sunset Apartments, Unit 201</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Period</span><span className="font-semibold">June 2024</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Amount Due</span><span className="font-bold text-green-600">$1,800.00</span></div>
              </div>
              <div>
                <label htmlFor="property-pay-method" className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  id="property-pay-method"
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                >
                  <option value="ACH">Bank Transfer (ACH)</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              <p className="text-xs text-gray-500">
                Demo payment simulation -- no card details are collected and no real charge is made.
              </p>
              <button
                onClick={handlePayRent}
                disabled={payState === 'processing'}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-60"
              >
                {payState === 'processing' ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          )}
        </DemoModal>
      );
    }

    if (modal.kind === 'receipt') {
      const receipt = tenantPayments.find(p => p.id === modal.id);
      if (!receipt) return null;
      return (
        <DemoModal title={`Rent Receipt -- ${receipt.label}`} onClose={closeModal}>
          <div className="text-center mb-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-[#003566]">${receipt.amount.toLocaleString()}.00</p>
            <p className="text-sm text-gray-600">Paid in full</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2 mb-4">
            <div className="flex justify-between"><span className="text-gray-600">Receipt ID</span><span className="font-semibold uppercase">{receipt.id}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Period</span><span className="font-semibold">{receipt.label}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Method</span><span className="font-semibold">{receipt.method}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Property</span><span className="font-semibold">Sunset Apartments, Unit 201</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Tenant</span><span className="font-semibold">John Smith</span></div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                downloadTextFile(`Rent-Receipt-${receipt.label.replace(/\s+/g, '-')}-DEMO.txt`, [
                  'ELITE PROPERTY MANAGEMENT',
                  'RENT RECEIPT -- DEMO DOCUMENT',
                  '',
                  `Receipt ID: ${receipt.id.toUpperCase()}`,
                  `Period: ${receipt.label}`,
                  `Amount: $${receipt.amount.toLocaleString()}.00`,
                  `Method: ${receipt.method}`,
                  'Property: Sunset Apartments, Unit 201',
                  'Tenant: John Smith',
                  '',
                  'Sample document generated by the Elite Property Management demo.'
                ].join('\n'));
                showToast(`Receipt for ${receipt.label} downloaded`);
              }}
              className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </DemoModal>
      );
    }

    if (modal.kind === 'vacancies') {
      const withVacancies = propertiesList
        .filter(p => p.units - p.occupiedUnits > 0)
        .sort((a, b) => (b.units - b.occupiedUnits) - (a.units - a.occupiedUnits));
      return (
        <DemoModal title="Vacancy Breakdown" onClose={closeModal}>
          <div className="bg-gray-50 rounded-lg p-4 text-sm mb-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-gray-600">Vacant</p>
              <p className="font-bold text-[#003566] text-lg">{totalUnits - occupiedUnits}</p>
            </div>
            <div>
              <p className="text-gray-600">Occupied</p>
              <p className="font-bold text-[#003566] text-lg">{occupiedUnits}</p>
            </div>
            <div>
              <p className="text-gray-600">Occupancy</p>
              <p className="font-bold text-green-600 text-lg">{occupancyRate}%</p>
            </div>
          </div>
          {withVacancies.length === 0 ? (
            <p className="text-sm text-gray-600 mb-4">Every unit in the portfolio is occupied right now.</p>
          ) : (
            <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
              {withVacancies.map(property => (
                <button
                  key={property.id}
                  onClick={() => setModal({ kind: 'property', id: property.id })}
                  className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{property.name}</p>
                    <p className="text-xs text-gray-600">{property.type} &middot; {property.occupiedUnits}/{property.units} occupied</p>
                  </div>
                  <span className="text-sm font-bold text-red-600">{property.units - property.occupiedUnits} vacant</span>
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => { closeModal(); goToPropertiesWithStatus('all'); }}
            className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors font-semibold"
          >
            Open Full Portfolio
          </button>
        </DemoModal>
      );
    }

    if (modal.kind === 'lease') {
      const lease = leasesList.find(l => l.id === modal.id);
      if (!lease) return null;
      return (
        <DemoModal title={`Edit Lease -- ${lease.property}, ${lease.unit}`} onClose={closeModal}>
          <form className="space-y-4" onSubmit={handleLeaseEditSave}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Tenant</p>
                <p className="font-semibold">{lease.tenant}</p>
              </div>
              <div>
                <p className="text-gray-600">Term</p>
                <p className="font-semibold">{new Date(lease.startDate).toLocaleDateString()} - {new Date(lease.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <label htmlFor="property-lease-rent" className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent ($)</label>
              <input
                id="property-lease-rent"
                type="number"
                min={0}
                required
                value={leaseDraft.rent}
                onChange={(e) => setLeaseDraft(d => ({ ...d, rent: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              />
            </div>
            <div>
              <label htmlFor="property-lease-status" className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                id="property-lease-status"
                value={leaseDraft.status}
                onChange={(e) => setLeaseDraft(d => ({ ...d, status: e.target.value as Lease['status'] }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              >
                <option>Active</option>
                <option>Expiring Soon</option>
                <option>Expired</option>
                <option>Renewed</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors"
            >
              Save Changes
            </button>
          </form>
        </DemoModal>
      );
    }

    if (modal.kind === 'settings') {
      const options: { key: keyof DemoSettings; label: string; desc: string }[] = [
        { key: 'emailNotifications', label: 'Email notifications', desc: 'Payment receipts and account activity by email' },
        { key: 'smsAlerts', label: 'SMS alerts', desc: 'Text alerts for emergency maintenance issues' },
        { key: 'maintenanceUpdates', label: 'Maintenance updates', desc: 'Status changes on open maintenance requests' },
        { key: 'monthlyStatements', label: 'Monthly statements', desc: 'Owner and tenant statements on the 1st of each month' }
      ];
      return (
        <DemoModal title="Account Settings" onClose={closeModal}>
          <form className="space-y-4" onSubmit={handleSettingsSave}>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="font-semibold text-gray-900">{userRole === 'Tenant' ? 'John Smith' : userRole === 'Owner' ? 'David Wilson' : 'Property Manager'}</p>
              <p className="text-gray-600">Signed in as {userRole}</p>
            </div>
            {options.map(opt => (
              <label key={opt.key} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={settingsDraft[opt.key]}
                  onChange={(e) => setSettingsDraft(s => ({ ...s, [opt.key]: e.target.checked }))}
                  className="mt-1 w-4 h-4 accent-[#003566]"
                />
                <span>
                  <span className="block font-semibold text-gray-900 text-sm">{opt.label}</span>
                  <span className="block text-xs text-gray-600">{opt.desc}</span>
                </span>
              </label>
            ))}
            <button
              type="submit"
              className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors"
            >
              Save Settings
            </button>
            <p className="text-xs text-gray-500 text-center">Preferences are saved in your browser for this demo.</p>
          </form>
        </DemoModal>
      );
    }

    if (modal.kind === 'signOut') {
      return (
        <DemoModal title="Sign Out" onClose={closeModal}>
          <p className="text-gray-700 mb-6">Sign out of the Elite Property Management portal?</p>
          <div className="flex gap-2">
            <button
              onClick={() => { closeModal(); setSignedOut(true); }}
              className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors font-semibold"
            >
              Sign Out
            </button>
            <button
              onClick={closeModal}
              className="flex-1 border-2 border-[#003566] text-[#003566] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </DemoModal>
      );
    }

    if (modal.kind === 'policy') {
      const isPrivacy = modal.doc === 'privacy';
      const sections = isPrivacy
        ? [
            { heading: 'Information We Collect', body: 'We collect contact details, lease and payment records, and maintenance history you submit through the portal.' },
            { heading: 'How We Use Your Information', body: 'Your information is used to manage leases, process rent payments, coordinate maintenance, and send account notices.' },
            { heading: 'Sharing', body: 'Records are shared only with property owners and service vendors as needed to manage your residence. We never sell your information.' },
            { heading: 'Your Choices', body: 'Update your notification preferences any time in Account Settings, or request a copy of your records from our office.' }
          ]
        : [
            { heading: 'Portal Use', body: 'The portal is provided to tenants and owners of Elite Property Management for managing leases, payments, and maintenance requests.' },
            { heading: 'Payments', body: 'Rent payments submitted through the portal are processed on the next business day. Late fees follow the schedule in your lease.' },
            { heading: 'Maintenance', body: 'Portal requests are triaged by priority. Emergency issues should also be reported by phone at (555) 999-9999.' },
            { heading: 'Accounts', body: 'Keep your sign-in credentials private. Contact our office to close or transfer an account.' }
          ];
      return (
        <DemoModal title={isPrivacy ? 'Privacy Policy' : 'Terms of Service'} onClose={closeModal}>
          <div className="space-y-4 text-sm text-gray-700">
            <p className="text-xs text-gray-500">Sample document for the Elite Property Management demo. Last updated January 2024.</p>
            {sections.map(section => (
              <div key={section.heading}>
                <h4 className="font-bold text-[#003566] mb-1">{section.heading}</h4>
                <p>{section.body}</p>
              </div>
            ))}
            <button
              onClick={closeModal}
              className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </DemoModal>
      );
    }

    return null;
  };

  if (signedOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001d3d] to-[#003566] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Building2 className="w-10 h-10 text-[#ffc300]" />
            <h1 className="text-2xl font-bold text-[#003566]">Elite Property Management</h1>
          </div>
          <p className="text-center text-sm text-gray-600 mb-6">Portal Sign In</p>
          <p className="text-sm text-green-700 bg-green-50 rounded-lg p-3 mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            You have been signed out.
          </p>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="property-login-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                id="property-login-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              />
            </div>
            <div>
              <label htmlFor="property-login-password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                id="property-login-password"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors"
            >
              Sign In
            </button>
            <p className="text-xs text-gray-500 text-center">Demo credentials are pre-filled -- click Sign In to return to the portal.</p>
          </form>
        </div>
        {toast && (
          <div className="fixed bottom-6 right-6 z-[60] bg-[#003566] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-[#ffc300] flex-shrink-0" />
            <span className="text-sm">{toast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {Navigation()}
      <main>
        {currentPage === 'home' && DashboardPage()}
        {currentPage === 'properties' && PropertiesPage()}
        {currentPage === 'tenants' && TenantPortalPage()}
        {currentPage === 'owners' && OwnerPortalPage()}
        {currentPage === 'maintenance' && MaintenancePage()}
        {currentPage === 'payments' && PaymentsPage()}
        {currentPage === 'leases' && LeasesPage()}
        {currentPage === 'reports' && ReportsPage()}
        {currentPage === 'messages' && MessagesPage()}
        {currentPage === 'contact' && ContactPage()}
      </main>
      {Footer()}
      {renderModal()}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#003566] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 max-w-sm">
          <CheckCircle2 className="w-5 h-5 text-[#ffc300] flex-shrink-0" />
          <span className="text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default ElitePropertyManagement;
