'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Building2, Users, MapPin, BarChart3, Package, GraduationCap,
  Megaphone, FileText, Settings, ChevronRight, ChevronDown, TrendingUp, AlertCircle,
  CheckCircle, DollarSign, Calendar, Target, Award, BookOpen, Download,
  Upload, Filter, Search, Bell, Menu, X, Home, Shield, Clock, Zap,
  Globe, Phone, Mail, PieChart, ShoppingCart, Truck, Plus, Minus, Trash2,
  ClipboardCheck, UserCheck, Store, LayoutDashboard, Video, MessageSquare,
  Send, Eye, Copy, Save, RefreshCw, Play, Pause
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

type Page = 'home' | 'locations' | 'franchise-portal' | 'admin' | 'inventory' |
            'reporting' | 'training' | 'marketing' | 'resources' | 'contact';

type UserRole = 'corporate' | 'franchise-owner' | 'manager' | 'guest';

interface Location {
  id: string;
  name: string;
  owner: string;
  address: string;
  phone: string;
  status: 'active' | 'pending' | 'inactive';
  revenue: number;
  compliance: number;
  employees: number;
  openDate: string;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  lastOrdered: string;
}

interface TrainingModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  completed: number;
  total: number;
  mandatory: boolean;
  dueDate?: string;
  lessons: string[];
  custom?: boolean;
}

interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Scheduled';
  reach: number;
  engagement: number;
  budget: number;
  channel: string;
}

interface SupplyOrder {
  id: string;
  itemId: string;
  itemName: string;
  qty: number;
  cost: number;
  supplier: string;
  destination: string;
  placed: string;
  eta: string;
  status: 'in-transit' | 'received' | 'cancelled';
}

interface FieldReport {
  id: string;
  type: string;
  period: string;
  location: string;
  sales: string;
  notes: string;
  submitted: string;
}

interface NetworkUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  active: boolean;
}

interface InfoModalContent {
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  sections?: { heading: string; rows: { label: string; value?: string }[] }[];
  notes?: string[];
  action?: { label: string; run: () => void };
}

interface FastServeFranchiseNetworkProps {
  viewMode?: 'customer' | 'admin';
}

/* ---------------------------------------------------------------- data --- */

const NETWORK_LOCATION_COUNT = 33;
const NETWORK_BASE_30D = 4200000;
const AVG_TICKET = 24.5;

const BASE_LOCATIONS: Location[] = [
  { id: '1', name: 'FastServe Downtown', owner: 'John Smith', address: '123 Main St, Denver, CO 80202', phone: '(555) 123-4567', status: 'active', revenue: 125000, compliance: 98, employees: 12, openDate: '2020-01-15' },
  { id: '2', name: 'FastServe Westside', owner: 'Sarah Johnson', address: '456 West Ave, Denver, CO 80204', phone: '(555) 234-5678', status: 'active', revenue: 98000, compliance: 95, employees: 10, openDate: '2020-06-20' },
  { id: '3', name: 'FastServe Northgate', owner: 'Mike Chen', address: '789 North Blvd, Denver, CO 80205', phone: '(555) 345-6789', status: 'active', revenue: 142000, compliance: 100, employees: 15, openDate: '2019-11-10' },
  { id: '4', name: 'FastServe South Plaza', owner: 'Emily Rodriguez', address: '321 South St, Denver, CO 80203', phone: '(555) 456-7890', status: 'active', revenue: 87000, compliance: 92, employees: 8, openDate: '2021-03-05' },
  { id: '5', name: 'FastServe Airport', owner: 'David Park', address: '555 Airport Way, Denver, CO 80206', phone: '(555) 567-8901', status: 'pending', revenue: 0, compliance: 85, employees: 6, openDate: '2024-08-01' }
];

const BASE_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Premium Coffee Beans', sku: 'COF-001', category: 'Beverages', stock: 450, minStock: 200, price: 12.99, supplier: 'Premium Roasters Inc', lastOrdered: '2024-05-10' },
  { id: '2', name: 'Sandwich Wrap Paper', sku: 'PKG-102', category: 'Packaging', stock: 1200, minStock: 500, price: 0.15, supplier: 'PackPro Supplies', lastOrdered: '2024-05-12' },
  { id: '3', name: 'Fresh Lettuce', sku: 'PRD-203', category: 'Produce', stock: 85, minStock: 100, price: 2.50, supplier: 'Farm Fresh Co', lastOrdered: '2024-05-14' },
  { id: '4', name: 'Disposable Cups (16oz)', sku: 'PKG-105', category: 'Packaging', stock: 3500, minStock: 1000, price: 0.08, supplier: 'PackPro Supplies', lastOrdered: '2024-05-08' },
  { id: '5', name: 'Cleaning Supplies Kit', sku: 'CLN-301', category: 'Supplies', stock: 45, minStock: 30, price: 24.99, supplier: 'CleanPro Distributors', lastOrdered: '2024-05-11' },
  { id: '6', name: 'Cold Brew Concentrate', sku: 'COF-014', category: 'Beverages', stock: 92, minStock: 120, price: 18.40, supplier: 'Premium Roasters Inc', lastOrdered: '2024-05-13' },
  { id: '7', name: 'Sourdough Rolls (24ct)', sku: 'BKR-088', category: 'Produce', stock: 210, minStock: 90, price: 7.25, supplier: 'Farm Fresh Co', lastOrdered: '2024-05-15' },
  { id: '8', name: 'Nitrile Gloves (Box)', sku: 'CLN-318', category: 'Supplies', stock: 640, minStock: 250, price: 9.10, supplier: 'CleanPro Distributors', lastOrdered: '2024-05-09' }
];

const BASE_MODULES: TrainingModule[] = [
  {
    id: '1', title: 'Food Safety & Hygiene Standards', category: 'Compliance', duration: '45 min',
    completed: 28, total: 33, mandatory: true, dueDate: '2024-06-01',
    lessons: ['Temperature control logs', 'Cross-contamination prevention', 'Handwashing protocol', 'Allergen labeling', 'Health inspection walkthrough']
  },
  {
    id: '2', title: 'Customer Service Excellence', category: 'Service', duration: '30 min',
    completed: 33, total: 33, mandatory: true,
    lessons: ['Greeting within 10 seconds', 'Handling a service recovery', 'Upsell without pressure', 'Closing the interaction']
  },
  {
    id: '3', title: 'POS System Training', category: 'Technology', duration: '60 min',
    completed: 31, total: 33, mandatory: true,
    lessons: ['Opening a drawer', 'Split payments and refunds', 'Applying loyalty credits', 'End of day reconciliation', 'Offline mode failover']
  },
  {
    id: '4', title: 'Franchise Operations Manual', category: 'Operations', duration: '90 min',
    completed: 25, total: 33, mandatory: true, dueDate: '2024-05-30',
    lessons: ['Opening checklist', 'Par level management', 'Waste tracking', 'Shift handover', 'Closing checklist', 'Escalation matrix']
  },
  {
    id: '5', title: 'Leadership Development', category: 'Management', duration: '120 min',
    completed: 12, total: 33, mandatory: false,
    lessons: ['Coaching conversations', 'Building a shift schedule', 'Performance reviews', 'Retention playbook']
  }
];

const BASE_CAMPAIGNS: Campaign[] = [
  { id: 'c1', name: 'Summer Menu Launch', status: 'Active', reach: 45000, engagement: 12.3, budget: 5000, channel: 'Social + In-store' },
  { id: 'c2', name: 'Loyalty Program Promotion', status: 'Active', reach: 32000, engagement: 8.7, budget: 3500, channel: 'Email + Mobile app' },
  { id: 'c3', name: 'New Location Opening', status: 'Scheduled', reach: 0, engagement: 0, budget: 7500, channel: 'Local radio + Social' }
];

const BASE_USERS: NetworkUser[] = [
  { id: 'u1', name: 'John Smith', email: 'j.smith@fastserve.com', role: 'franchise-owner', location: 'FastServe Downtown', active: true },
  { id: 'u2', name: 'Sarah Johnson', email: 's.johnson@fastserve.com', role: 'franchise-owner', location: 'FastServe Westside', active: true },
  { id: 'u3', name: 'Mike Chen', email: 'm.chen@fastserve.com', role: 'franchise-owner', location: 'FastServe Northgate', active: true },
  { id: 'u4', name: 'Alicia Moore', email: 'a.moore@fastserve.com', role: 'manager', location: 'FastServe Downtown', active: true },
  { id: 'u5', name: 'Devon Wallace', email: 'd.wallace@fastserve.com', role: 'manager', location: 'FastServe South Plaza', active: false },
  { id: 'u6', name: 'Priya Nair', email: 'p.nair@fastserve.com', role: 'corporate', location: 'Headquarters', active: true }
];

const STAFF_ROSTER = [
  'Alicia Moore', 'Devon Wallace', 'Grace Kim', 'Marcus Hall', 'Nina Patel',
  'Owen Brooks', 'Rosa Delgado', 'Sam Whitfield', 'Tara Nguyen', 'Victor Cole'
];
const SHIFTS = ['Off', 'Open 6a-2p', 'Mid 10a-6p', 'Close 2p-10p'];
const DEFAULT_SCHEDULE: Record<string, string> = {
  'Alicia Moore': 'Open 6a-2p', 'Devon Wallace': 'Open 6a-2p', 'Grace Kim': 'Mid 10a-6p',
  'Marcus Hall': 'Mid 10a-6p', 'Nina Patel': 'Close 2p-10p', 'Owen Brooks': 'Close 2p-10p',
  'Rosa Delgado': 'Mid 10a-6p', 'Sam Whitfield': 'Close 2p-10p', 'Tara Nguyen': 'Off', 'Victor Cole': 'Off'
};

const PERMISSION_KEYS = ['View reports', 'Edit inventory', 'Approve orders', 'Manage users', 'Publish marketing'];
const DEFAULT_PERMISSIONS: Record<string, string[]> = {
  corporate: ['View reports', 'Edit inventory', 'Approve orders', 'Manage users', 'Publish marketing'],
  'franchise-owner': ['View reports', 'Edit inventory', 'Approve orders'],
  manager: ['View reports', 'Edit inventory'],
  guest: []
};

const MARKETING_ASSETS = [
  { id: 'a1', title: 'Summer Promotion Banner', type: 'Social Media', format: 'PNG', size: '2.4 MB', updated: '2024-05-12', desc: 'Hero banner sized for feed and story placements, editable headline layer.' },
  { id: 'a2', title: 'Menu Update Flyer', type: 'Print', format: 'PDF', size: '1.1 MB', updated: '2024-05-09', desc: 'Print-ready 8.5x11 counter flyer with bleed marks and local address block.' },
  { id: 'a3', title: 'Grand Opening Template', type: 'Social Media', format: 'PSD', size: '18 MB', updated: '2024-04-28', desc: 'Layered opening announcement with swap-in location name and date.' },
  { id: 'a4', title: 'Training Video Intro', type: 'Video', format: 'MP4', size: '125 MB', updated: '2024-05-02', desc: 'Ten second branded intro bumper for internal training uploads.' },
  { id: 'a5', title: 'Loyalty Card Insert', type: 'Print', format: 'PDF', size: '640 KB', updated: '2024-05-05', desc: 'Wallet-size loyalty punch card with QR enrollment code.' },
  { id: 'a6', title: 'Drive-Thru Window Cling', type: 'Print', format: 'PDF', size: '3.2 MB', updated: '2024-04-19', desc: 'Weatherproof cling artwork for drive-thru window promotions.' },
  { id: 'a7', title: 'Crew Spotlight Post Kit', type: 'Social Media', format: 'PNG', size: '4.8 MB', updated: '2024-05-14', desc: 'Six-frame template set for featuring crew members on local pages.' },
  { id: 'a8', title: 'New Menu Walkthrough', type: 'Video', format: 'MP4', size: '210 MB', updated: '2024-05-11', desc: 'Three minute product walkthrough for pre-shift huddles.' },
  { id: 'a9', title: 'Catering One-Sheet', type: 'Print', format: 'PDF', size: '890 KB', updated: '2024-03-30', desc: 'Catering package pricing sheet with editable local contact footer.' }
];

const ASSET_CATEGORIES = [
  { type: 'Social Media', icon: Megaphone, count: 142, color: 'bg-blue-500' },
  { type: 'Print', icon: FileText, count: 67, color: 'bg-purple-500' },
  { type: 'Video', icon: Video, count: 23, color: 'bg-red-500' }
];

const RESOURCE_DOCS = [
  { id: 'd1', category: 'Operations', title: 'Franchise Operations Manual', version: 'v4.2', date: '2024-05-01', summary: 'The full operating standard for a FastServe location: open and close procedures, par levels, waste tracking, shift handover and escalation paths.' },
  { id: 'd2', category: 'Legal', title: 'Franchise Agreement Template', version: 'v2.1', date: '2024-04-15', summary: 'Standard ten year agreement with territory definition, royalty schedule, renewal terms and transfer conditions.' },
  { id: 'd3', category: 'Training', title: 'Employee Onboarding Guide', version: 'v3.0', date: '2024-05-10', summary: 'First 30 day plan for new crew: paperwork, required modules, floor shadowing schedule and certification checkpoints.' },
  { id: 'd4', category: 'Marketing', title: 'Brand Guidelines', version: 'v5.3', date: '2024-03-20', summary: 'Logo clear space, color values, typography, photography direction and local co-op advertising rules.' },
  { id: 'd5', category: 'Compliance', title: 'Health & Safety Standards', version: 'v2.8', date: '2024-05-05', summary: 'Temperature logs, allergen handling, incident reporting and the self-audit checklist used before corporate inspections.' }
];

const RESOURCE_FORMS = [
  { id: 'f1', title: 'Incident Report Form', fields: ['Date and time', 'Location', 'People involved', 'Description', 'Corrective action', 'Manager signature'] },
  { id: 'f2', title: 'Employee Schedule Template', fields: ['Week starting', 'Crew member', 'Role', 'Shift block', 'Total hours', 'Overtime flag'] },
  { id: 'f3', title: 'Inventory Order Form', fields: ['Supplier', 'SKU', 'Quantity', 'Unit cost', 'Delivery window', 'Approver'] },
  { id: 'f4', title: 'Customer Feedback Form', fields: ['Visit date', 'Order type', 'Rating', 'Comments', 'Follow up requested'] },
  { id: 'f5', title: 'Maintenance Request', fields: ['Asset', 'Issue', 'Priority', 'Downtime impact', 'Vendor', 'Requested by'] },
  { id: 'f6', title: 'Staff Performance Review', fields: ['Crew member', 'Review period', 'Speed of service', 'Accuracy', 'Teamwork', 'Development plan'] }
];

const TRAINING_RESOURCES = [
  { id: 't1', icon: FileText, title: 'Operations Manual', type: 'PDF', size: '4.2 MB', summary: 'Reference copy of the full operating standard, bookmarked by section.' },
  { id: 't2', icon: Video, title: 'Food Safety Training Video', type: 'Video', size: '125 MB', summary: 'Twenty two minute walkthrough covering temperature logs and allergen handling.' },
  { id: 't3', icon: FileText, title: 'Customer Service Guide', type: 'PDF', size: '1.8 MB', summary: 'Scripts and recovery steps for the ten most common guest situations.' },
  { id: 't4', icon: BookOpen, title: 'Franchise Handbook', type: 'PDF', size: '6.5 MB', summary: 'Ownership handbook: royalties, territory, renewals and support contacts.' }
];

const SESSIONS = [
  { id: 's1', title: 'New Menu Rollout Training', date: '2024-06-15', time: '2:00 PM EST', attendees: 24, host: 'Corporate Culinary Team' },
  { id: 's2', title: 'Leadership Workshop', date: '2024-06-22', time: '10:00 AM EST', attendees: 12, host: 'People Operations' },
  { id: 's3', title: 'Health & Safety Certification', date: '2024-06-28', time: '9:00 AM EST', attendees: 33, host: 'Compliance Office' },
  { id: 's4', title: 'Tech Systems Update', date: '2024-07-05', time: '1:00 PM EST', attendees: 18, host: 'IT Support' }
];

const NOTIFICATIONS = [
  { id: 'n1', type: 'alert', message: 'Low stock alert: Premium Coffee Beans', time: '2 hours ago', page: 'inventory' as Page },
  { id: 'n2', type: 'success', message: 'Daily sales target achieved', time: '4 hours ago', page: 'reporting' as Page },
  { id: 'n3', type: 'info', message: 'New training module available', time: '1 day ago', page: 'training' as Page },
  { id: 'n4', type: 'alert', message: 'Compliance review due next week', time: '2 days ago', page: 'admin' as Page },
  { id: 'n5', type: 'info', message: 'Summer campaign assets published', time: '3 days ago', page: 'marketing' as Page },
  { id: 'n6', type: 'success', message: 'Airport location paperwork approved', time: '4 days ago', page: 'locations' as Page }
];

const SYSTEM_SERVICES = [
  { service: 'POS System', status: 'operational', uptime: '99.98%', note: 'All 33 terminals reporting in the last 5 minutes.' },
  { service: 'Inventory API', status: 'operational', uptime: '99.94%', note: 'Average sync latency 210ms across the network.' },
  { service: 'Training Portal', status: 'operational', uptime: '99.99%', note: 'No incidents recorded in the last 90 days.' },
  { service: 'Reporting Engine', status: 'maintenance', uptime: '99.71%', note: 'Nightly warehouse rebuild runs 1:00am-2:30am EST.' }
];

const FAQS = [
  { q: 'How do I request a new supplier be added?', a: 'Open Inventory, use Add Item to create the SKU, then note the supplier in the item record. Corporate procurement reviews new suppliers weekly and confirms pricing before the SKU goes network wide.' },
  { q: 'When are royalty statements posted?', a: 'Statements post on the third business day of each month and appear in the owner portal under Submitted Reports. Payment is drafted on the tenth.' },
  { q: 'Can I run a local promotion that is not in the asset hub?', a: 'Yes. Local promotions under $1,000 in spend need brand review only. Submit the creative through Contact Corporate with Marketing selected as the department.' },
  { q: 'What happens if a mandatory training module is overdue?', a: 'The location compliance score drops two points per overdue module and the owner receives a reminder. Scores below 90 trigger a support visit.' },
  { q: 'How quickly does corporate respond to support tickets?', a: 'Standard tickets are answered within one business day. POS outages, security issues and critical incidents go to the 24/7 hotline instead.' }
];

const ORDER_ITEMS = ['Turkey club', 'Cold brew', 'Breakfast wrap', 'Chicken caesar', 'Iced latte', 'Soup and roll', 'Veggie panini', 'Fountain drink'];
const ORDER_CHANNELS = ['In-store', 'Drive-thru', 'Mobile app', 'Delivery'];

const RANGE_META: Record<string, { label: string; factor: number; buckets: number; bucketLabel: (i: number) => string }> = {
  '7days': { label: 'Last 7 Days', factor: 7 / 30, buckets: 7, bucketLabel: (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] },
  '30days': { label: 'Last 30 Days', factor: 1, buckets: 10, bucketLabel: (i) => `D${i * 3 + 1}-${i * 3 + 3}` },
  '90days': { label: 'Last 90 Days', factor: 3, buckets: 12, bucketLabel: (i) => `Wk ${i + 1}` },
  year: { label: 'This Year', factor: 12, buckets: 12, bucketLabel: (i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] }
};

/* ------------------------------------------------------------- helpers --- */

function seededUnit(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function money(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

function compactMoney(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function downloadFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`fastserve-demo-${key}`);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* storage unavailable, demo continues with in-memory state */
    }
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(`fastserve-demo-${key}`, JSON.stringify(value));
    } catch {
      /* storage unavailable, demo continues with in-memory state */
    }
  }, [key, value, loaded]);

  return [value, setValue] as const;
}

const PERSIST_KEYS = [
  'locations', 'inventory', 'modules', 'module-progress', 'campaigns', 'sessions',
  'downloads', 'read-notifications', 'settings', 'supply-orders', 'field-reports',
  'schedule', 'users', 'permissions', 'completed-orders', 'audits'
];

/* ---------------------------------------------------------- shared UI ---- */

function Modal({
  title, subtitle, icon: Icon, onClose, children, footer, wide
}: {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${wide ? 'max-w-4xl' : 'max-w-xl'} my-8 md:my-0 max-h-[88vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-200">
          <div className="flex items-start gap-3">
            {Icon && <Icon className="w-6 h-6 text-[#bc4749] flex-shrink-0 mt-0.5" />}
            <div>
              <h3 className="text-xl font-bold text-[#bc4749]">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
        {footer && <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">{footer}</div>}
      </div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-start justify-between gap-4 p-3 rounded-lg hover:bg-gray-50 text-left transition-colors"
    >
      <span>
        <span className="block font-semibold text-gray-800 text-sm">{label}</span>
        {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
      </span>
      <span className={`flex-shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#81b29a]' : 'bg-gray-300'}`}>
        <span className={`block w-5 h-5 bg-white rounded-full shadow mt-0.5 transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
      </span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-700 mb-2">{label}</span>
      {children}
    </label>
  );
}

const inputClass = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent';

const FastServeFranchiseNetwork = ({ viewMode }: FastServeFranchiseNetworkProps = {}) => {
  /* ------------------------------------------------------------ state --- */
  const [currentPage, setCurrentPage] = useState<Page>(viewMode === 'admin' ? 'admin' : 'home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; message: string; tone: 'success' | 'info' | 'warn' } | null>(null);

  // persisted demo data
  const [locations, setLocations] = usePersistedState<Location[]>('locations', BASE_LOCATIONS);
  const [inventory, setInventory] = usePersistedState<InventoryItem[]>('inventory', BASE_INVENTORY);
  const [modules, setModules] = usePersistedState<TrainingModule[]>('modules', BASE_MODULES);
  const [moduleProgress, setModuleProgress] = usePersistedState<Record<string, string[]>>('module-progress', {});
  const [campaigns, setCampaigns] = usePersistedState<Campaign[]>('campaigns', BASE_CAMPAIGNS);
  const [registeredSessions, setRegisteredSessions] = usePersistedState<string[]>('sessions', []);
  const [downloads, setDownloads] = usePersistedState<string[]>('downloads', []);
  const [readNotifications, setReadNotifications] = usePersistedState<string[]>('read-notifications', []);
  const [supplyOrders, setSupplyOrders] = usePersistedState<SupplyOrder[]>('supply-orders', []);
  const [fieldReports, setFieldReports] = usePersistedState<FieldReport[]>('field-reports', []);
  const [schedule, setSchedule] = usePersistedState<Record<string, string>>('schedule', DEFAULT_SCHEDULE);
  const [users, setUsers] = usePersistedState<NetworkUser[]>('users', BASE_USERS);
  const [permissions, setPermissions] = usePersistedState<Record<string, string[]>>('permissions', DEFAULT_PERMISSIONS);
  const [completedOrders, setCompletedOrders] = usePersistedState<string[]>('completed-orders', []);
  const [audits, setAudits] = usePersistedState<{ location: string; date: string }[]>('audits', []);
  const [settings, setSettings] = usePersistedState('settings', {
    compactTables: false,
    highlightLowStock: true,
    autoReorder: true,
    maintenanceMode: false,
    nightlyBackup: true
  });

  // filters
  const [locationSearch, setLocationSearch] = useState('');
  const [locationStatus, setLocationStatus] = useState('all');
  const [locationSort, setLocationSort] = useState('revenue-desc');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inventoryStatus, setInventoryStatus] = useState('all');
  const [inventorySearch, setInventorySearch] = useState('');
  const [dateRange, setDateRange] = useState('30days');
  const [reportLocation, setReportLocation] = useState('all');
  const [matrixSort, setMatrixSort] = useState<'revenue' | 'compliance' | 'employees' | 'name'>('revenue');
  const [trainingCategory, setTrainingCategory] = useState('all');
  const [assetFilter, setAssetFilter] = useState('all');

  // modals
  const [infoModal, setInfoModal] = useState<InfoModalContent | null>(null);
  const [locationDetail, setLocationDetail] = useState<Location | null>(null);
  const [contactLocation, setContactLocation] = useState<Location | null>(null);
  const [addLocationOpen, setAddLocationOpen] = useState(false);
  const [reorderItem, setReorderItem] = useState<InventoryItem | null>(null);
  const [reorderQty, setReorderQty] = useState(0);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<TrainingModule | null>(null);
  const [createModuleOpen, setCreateModuleOpen] = useState(false);
  const [docPreview, setDocPreview] = useState<{ id: string; title: string; meta: string; body: string[]; filename: string; content: string } | null>(null);
  const [assetPreview, setAssetPreview] = useState<(typeof MARKETING_ASSETS)[number] | null>(null);
  const [campaignDetail, setCampaignDetail] = useState<Campaign | null>(null);
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const [portalAction, setPortalAction] = useState<'supplies' | 'report' | 'staff' | 'support' | null>(null);
  const [adminPanel, setAdminPanel] = useState<'users' | 'roles' | 'config' | null>(null);
  const [faqOpen, setFaqOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [supportOpen, setSupportOpen] = useState(false);

  // forms
  const [contactForm, setContactForm] = useState({ name: '', email: '', location: '', department: 'General Inquiry', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');
  const [supplyDraft, setSupplyDraft] = useState<Record<string, number>>({});
  const [chartFocus, setChartFocus] = useState<number | null>(null);

  useEffect(() => {
    setCurrentPage(viewMode === 'admin' ? 'admin' : 'home');
  }, [viewMode]);

  /* --------------------------------------------------------- utilities --- */
  const notify = useCallback((message: string, tone: 'success' | 'info' | 'warn' = 'success') => {
    const id = Date.now();
    setToast({ id, message, tone });
    window.setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 3800);
  }, []);

  const go = useCallback((page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setNotifOpen(false);
    setSettingsOpen(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetDemoData = () => {
    PERSIST_KEYS.forEach((key) => {
      try { window.localStorage.removeItem(`fastserve-demo-${key}`); } catch { /* storage unavailable */ }
    });
    setLocations(BASE_LOCATIONS);
    setInventory(BASE_INVENTORY);
    setModules(BASE_MODULES);
    setModuleProgress({});
    setCampaigns(BASE_CAMPAIGNS);
    setRegisteredSessions([]);
    setDownloads([]);
    setReadNotifications([]);
    setSupplyOrders([]);
    setFieldReports([]);
    setSchedule(DEFAULT_SCHEDULE);
    setUsers(BASE_USERS);
    setPermissions(DEFAULT_PERMISSIONS);
    setCompletedOrders([]);
    setAudits([]);
    setSettings({ compactTables: false, highlightLowStock: true, autoReorder: true, maintenanceMode: false, nightlyBackup: true });
    setSettingsOpen(false);
    notify('Demo data reset to the original sample network', 'info');
  };

  const cellPad = settings.compactTables ? 'px-4 py-2' : 'px-6 py-4';

  /* ------------------------------------------------------ derived data --- */
  const activeLocations = locations.filter((l) => l.status === 'active');

  const filteredLocations = useMemo(() => {
    const term = locationSearch.trim().toLowerCase();
    const list = locations.filter((loc) => {
      const matchesTerm = !term ||
        loc.name.toLowerCase().includes(term) ||
        loc.owner.toLowerCase().includes(term) ||
        loc.address.toLowerCase().includes(term);
      const matchesStatus = locationStatus === 'all' || loc.status === locationStatus;
      return matchesTerm && matchesStatus;
    });
    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (locationSort) {
        case 'revenue-asc': return a.revenue - b.revenue;
        case 'compliance': return b.compliance - a.compliance;
        case 'name': return a.name.localeCompare(b.name);
        case 'opened': return new Date(a.openDate).getTime() - new Date(b.openDate).getTime();
        default: return b.revenue - a.revenue;
      }
    });
    return sorted;
  }, [locations, locationSearch, locationStatus, locationSort]);

  const locationShare = useCallback((itemId: string, locId: string) => {
    if (locId === 'all') return 1;
    return 0.14 + seededUnit(Number(itemId) || 1, Number(locId) || 1) * 0.12;
  }, []);

  const scaledInventory = useMemo(() => inventory.map((item) => {
    const share = locationShare(item.id, selectedLocation);
    return {
      ...item,
      viewStock: Math.max(0, Math.round(item.stock * share)),
      viewMin: Math.max(1, Math.round(item.minStock * share))
    };
  }), [inventory, selectedLocation, locationShare]);

  const filteredInventory = useMemo(() => {
    const term = inventorySearch.trim().toLowerCase();
    return scaledInventory.filter((item) => {
      const matchesTerm = !term ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.supplier.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const low = item.viewStock < item.viewMin;
      const over = item.viewStock > item.viewMin * 3;
      const matchesStatus =
        inventoryStatus === 'all' ? true :
        inventoryStatus === 'low' ? low :
        inventoryStatus === 'in' ? !low && !over :
        over;
      return matchesTerm && matchesCategory && matchesStatus;
    });
  }, [scaledInventory, inventorySearch, selectedCategory, inventoryStatus]);

  const lowStockItems = useMemo(() => inventory.filter((i) => i.stock < i.minStock), [inventory]);
  const pendingSupplyOrders = supplyOrders.filter((o) => o.status === 'in-transit');
  const inventoryValue = filteredInventory.reduce((sum, i) => sum + i.viewStock * i.price, 0);

  const dayOrders = useMemo(() => Array.from({ length: 196 }, (_, i) => ({
    id: `ORD-${2400 + i}`,
    item: ORDER_ITEMS[i % ORDER_ITEMS.length],
    channel: ORDER_CHANNELS[i % ORDER_CHANNELS.length],
    total: 12 + seededUnit(i, 7) * 25,
    placed: `${String(6 + Math.floor(i / 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`
  })), []);

  const openOrders = useMemo(
    () => dayOrders.slice(173).filter((o) => !completedOrders.includes(o.id)),
    [dayOrders, completedOrders]
  );
  const todaysSales = useMemo(() => {
    const base = dayOrders.slice(0, 173).reduce((s, o) => s + o.total, 0);
    const extra = dayOrders.slice(173).filter((o) => completedOrders.includes(o.id)).reduce((s, o) => s + o.total, 0);
    return base + extra;
  }, [dayOrders, completedOrders]);
  const staffOnDuty = STAFF_ROSTER.filter((name) => (schedule[name] || 'Off') !== 'Off').length;

  const range = RANGE_META[dateRange];
  const revenueSeries = useMemo(() => {
    const target = NETWORK_BASE_30D * range.factor;
    const weights = Array.from({ length: range.buckets }, (_, i) => 0.75 + seededUnit(i, range.buckets) * 0.5);
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    return weights.map((w, i) => ({ label: range.bucketLabel(i), value: (w / totalWeight) * target }));
  }, [range]);

  const rangeRevenue = revenueSeries.reduce((s, p) => s + p.value, 0);
  const growthRate = useMemo(() => {
    const half = Math.floor(revenueSeries.length / 2);
    const first = revenueSeries.slice(0, half).reduce((s, p) => s + p.value, 0) / Math.max(half, 1);
    const second = revenueSeries.slice(half).reduce((s, p) => s + p.value, 0) / Math.max(revenueSeries.length - half, 1);
    return ((second / first - 1) * 100);
  }, [revenueSeries]);

  const topLocation = [...locations].sort((a, b) => b.revenue - a.revenue)[0];

  const matrixRows = useMemo(() => {
    const rows = locations
      .filter((l) => reportLocation === 'all' || l.id === reportLocation)
      .map((l) => ({ ...l, rangeRevenue: l.revenue * range.factor }));
    rows.sort((a, b) => {
      if (matrixSort === 'name') return a.name.localeCompare(b.name);
      if (matrixSort === 'compliance') return b.compliance - a.compliance;
      if (matrixSort === 'employees') return b.employees - a.employees;
      return b.rangeRevenue - a.rangeRevenue;
    });
    return rows;
  }, [locations, reportLocation, range.factor, matrixSort]);

  const visibleModules = useMemo(
    () => modules.filter((m) => trainingCategory === 'all' || m.category === trainingCategory),
    [modules, trainingCategory]
  );

  const moduleCompletion = useCallback((m: TrainingModule) => {
    const mine = moduleProgress[m.id] || [];
    const done = mine.length >= m.lessons.length && m.lessons.length > 0;
    return Math.min(m.total, m.completed + (done ? 1 : 0));
  }, [moduleProgress]);

  const networkCompletionRate = useMemo(() => {
    if (modules.length === 0) return 0;
    const pct = modules.reduce((sum, m) => sum + moduleCompletion(m) / m.total, 0) / modules.length;
    return Math.round(pct * 100);
  }, [modules, moduleCompletion]);

  const certifications = useMemo(
    () => modules.reduce((sum, m) => sum + (m.mandatory ? moduleCompletion(m) : 0), 0),
    [modules, moduleCompletion]
  );

  const filteredAssets = useMemo(
    () => MARKETING_ASSETS.filter((a) => assetFilter === 'all' || a.type === assetFilter),
    [assetFilter]
  );

  const unreadCount = NOTIFICATIONS.filter((n) => !readNotifications.includes(n.id)).length;

  const avgCompliance = locations.length
    ? (locations.reduce((s, l) => s + l.compliance, 0) / locations.length)
    : 0;

  /* ---------------------------------------------------------- handlers --- */
  const postLead = useCallback(async (payload: {
    clientName: string; clientEmail: string; clientPhone?: string; service: string; notes: string;
  }) => {
    const response = await fetch('/api/demo-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        demoName: 'FastServe Franchise Network',
        demoSlug: 'fastserve-franchise-network',
        ...payload
      })
    });
    if (response.ok) {
      trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'fastserve-franchise-network' });
      trackConversion('leadForm');
    }
    return response.ok;
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactError('');
    try {
      const ok = await postLead({
        clientName: contactForm.name,
        clientEmail: contactForm.email,
        service: `${contactForm.department} - ${contactForm.subject || 'General'}`,
        notes: `Location: ${contactForm.location || 'Not specified'}\n\n${contactForm.message}`
      });
      if (ok) {
        setContactSubmitted(true);
        setContactForm({ name: '', email: '', location: '', department: 'General Inquiry', subject: '', message: '' });
      } else {
        setContactError('We could not deliver that message. Please try again in a moment.');
      }
    } catch {
      setContactError('Network issue reaching corporate. Please try again in a moment.');
    }
  };

  const markNotificationRead = (id: string) => {
    setReadNotifications((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const toggleDownload = (id: string, filename: string, content: string) => {
    downloadFile(filename, content);
    setDownloads((prev) => (prev.includes(id) ? prev : [...prev, id]));
    notify(`${filename} downloaded`, 'success');
  };

  const confirmReorder = () => {
    if (!reorderItem || reorderQty <= 0) return;
    const dest = selectedLocation === 'all'
      ? 'Network warehouse'
      : (locations.find((l) => l.id === selectedLocation)?.name || 'Network warehouse');
    const order: SupplyOrder = {
      id: `PO-${Math.floor(1000 + seededUnit(supplyOrders.length + 1, 3) * 8999)}`,
      itemId: reorderItem.id,
      itemName: reorderItem.name,
      qty: reorderQty,
      cost: reorderQty * reorderItem.price,
      supplier: reorderItem.supplier,
      destination: dest,
      placed: todayStamp(),
      eta: addDays(3),
      status: 'in-transit'
    };
    setSupplyOrders((prev) => [order, ...prev]);
    setInventory((prev) => prev.map((i) => (i.id === reorderItem.id ? { ...i, lastOrdered: todayStamp() } : i)));
    setReorderItem(null);
    notify(`${order.id} placed with ${order.supplier} -- ${reorderQty} units, ETA ${order.eta}`, 'success');
  };

  const receiveOrder = (order: SupplyOrder) => {
    setSupplyOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: 'received' } : o)));
    setInventory((prev) => prev.map((i) => (i.id === order.itemId ? { ...i, stock: i.stock + order.qty } : i)));
    notify(`${order.id} received -- ${order.qty} units added to stock`, 'success');
  };

  const cancelOrder = (order: SupplyOrder) => {
    setSupplyOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: 'cancelled' } : o)));
    notify(`${order.id} cancelled`, 'warn');
  };

  const toggleLesson = (moduleId: string, lesson: string) => {
    setModuleProgress((prev) => {
      const done = prev[moduleId] || [];
      const next = done.includes(lesson) ? done.filter((l) => l !== lesson) : [...done, lesson];
      return { ...prev, [moduleId]: next };
    });
  };

  const registerSession = (id: string, title: string) => {
    setRegisteredSessions((prev) => {
      if (prev.includes(id)) {
        notify(`Registration cancelled for ${title}`, 'warn');
        return prev.filter((s) => s !== id);
      }
      notify(`You are registered for ${title}. A calendar invite is on its way.`, 'success');
      return [...prev, id];
    });
  };

  /* ------------------------------------------------------------- nav ----- */
  const NAV_ITEMS: { page: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { page: 'home', label: 'Home', icon: Home },
    { page: 'locations', label: 'Locations', icon: MapPin },
    { page: 'franchise-portal', label: 'Portal', icon: Building2 },
    { page: 'admin', label: 'Admin', icon: LayoutDashboard },
    { page: 'inventory', label: 'Inventory', icon: Package },
    { page: 'reporting', label: 'Reports', icon: BarChart3 },
    { page: 'training', label: 'Training', icon: GraduationCap },
    { page: 'marketing', label: 'Marketing', icon: Megaphone },
    { page: 'resources', label: 'Resources', icon: FileText },
    { page: 'contact', label: 'Contact', icon: Phone }
  ];

  const roleSelect = (id: string) => (
    <div className="flex items-center gap-2 bg-[#a33f41] px-3 py-2 rounded-lg">
      <span className="text-sm">Role:</span>
      <select
        id={id}
        aria-label="Role"
        value={userRole}
        onChange={(e) => {
          const next = e.target.value as UserRole;
          setUserRole(next);
          notify(`Viewing as ${next.replace('-', ' ')}`, 'info');
        }}
        className="bg-transparent border-none text-white font-semibold text-sm focus:outline-none"
      >
        <option value="guest">Guest</option>
        <option value="franchise-owner">Franchise Owner</option>
        <option value="manager">Manager</option>
        <option value="corporate">Corporate Admin</option>
      </select>
    </div>
  );

  const renderNavigation = () => (
    <nav className="bg-[#bc4749] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center gap-3 text-left">
            <Store className="w-8 h-8 text-[#f2cc8f]" />
            <div>
              <h1 className="text-2xl font-bold">FastServe</h1>
              <p className="text-xs text-[#f2cc8f]">Franchise Network</p>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-4">
            {roleSelect('franchise-role-desktop')}
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => { setNotifOpen((v) => !v); setSettingsOpen(false); }}
                className="relative p-2 rounded-lg hover:bg-[#a33f41] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#f2cc8f] text-[#bc4749] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <span className="font-bold text-[#bc4749]">Notifications</span>
                    <button
                      onClick={() => { setReadNotifications(NOTIFICATIONS.map((n) => n.id)); notify('All notifications marked read', 'info'); }}
                      className="text-xs font-semibold text-[#81b29a] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => {
                      const unread = !readNotifications.includes(n.id);
                      return (
                        <button
                          key={n.id}
                          onClick={() => { markNotificationRead(n.id); go(n.page); }}
                          className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 border-b border-gray-100 ${unread ? 'bg-[#f2cc8f]/20' : ''}`}
                        >
                          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                            n.type === 'alert' ? 'text-red-600' : n.type === 'success' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                          <span className="flex-1">
                            <span className="block text-sm">{n.message}</span>
                            <span className="block text-xs text-gray-500 mt-0.5">{n.time}</span>
                          </span>
                          {unread && <span className="w-2 h-2 rounded-full bg-[#bc4749] mt-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                aria-label="Settings"
                onClick={() => { setSettingsOpen((v) => !v); setNotifOpen(false); }}
                className="p-2 rounded-lg hover:bg-[#a33f41] transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-2xl z-50 p-2">
                  <p className="px-3 pt-2 pb-1 font-bold text-[#bc4749]">Display &amp; automation</p>
                  <Toggle
                    label="Compact tables"
                    description="Tighter row height on inventory and reports"
                    checked={settings.compactTables}
                    onChange={(v) => setSettings({ ...settings, compactTables: v })}
                  />
                  <Toggle
                    label="Highlight low stock"
                    description="Tint rows that fall under par level"
                    checked={settings.highlightLowStock}
                    onChange={(v) => setSettings({ ...settings, highlightLowStock: v })}
                  />
                  <Toggle
                    label="Suggested reorder quantity"
                    description="Prefill order forms to twice the par level"
                    checked={settings.autoReorder}
                    onChange={(v) => setSettings({ ...settings, autoReorder: v })}
                  />
                  <div className="border-t border-gray-200 mt-2 pt-2 px-1">
                    <button
                      onClick={resetDemoData}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-[#bc4749] hover:text-white font-semibold text-sm transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset demo data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
          <div className="md:hidden mb-3">{roleSelect('franchise-role-mobile')}</div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
            {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
              <button
                key={page}
                onClick={() => go(page)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  currentPage === page ? 'bg-[#f2cc8f] text-[#bc4749]' : 'bg-[#a33f41] hover:bg-[#f2cc8f] hover:text-[#bc4749]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  /* ------------------------------------------------------------- home ---- */
  const renderHome = () => (
    <div>
      <div className="bg-gradient-to-r from-[#bc4749] to-[#81b29a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">FastServe Franchise Network</h1>
          <p className="text-xl mb-6">Enterprise-level franchise management platform powering {NETWORK_LOCATION_COUNT}+ locations nationwide</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => go('franchise-portal')}
              className="bg-[#f2cc8f] text-[#bc4749] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Access Portal
            </button>
            <button
              onClick={() => go('locations')}
              className="bg-white text-[#bc4749] px-8 py-3 rounded-lg font-semibold hover:bg-[#f2cc8f] transition-colors"
            >
              View Locations
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#bc4749] mb-8">Network Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Store, label: 'Active Locations', value: String(NETWORK_LOCATION_COUNT), change: '+3',
              modal: {
                title: 'Active Locations',
                subtitle: `${NETWORK_LOCATION_COUNT} operating stores, 3 opened in the last quarter`,
                stats: [
                  { label: 'Operating', value: String(NETWORK_LOCATION_COUNT) },
                  { label: 'In build-out', value: '4' },
                  { label: 'Signed, not started', value: '7' }
                ],
                sections: [{
                  heading: 'Sample locations in this demo',
                  rows: locations.map((l) => ({ label: l.name, value: l.status }))
                }],
                action: { label: 'Open location directory', run: () => go('locations') }
              } as InfoModalContent
            },
            {
              icon: DollarSign, label: 'Network Revenue', value: compactMoney(NETWORK_BASE_30D), change: '+12%',
              modal: {
                title: 'Network Revenue',
                subtitle: 'Trailing 30 days across all operating locations',
                stats: [
                  { label: 'Total', value: compactMoney(NETWORK_BASE_30D) },
                  { label: 'Avg per store', value: compactMoney(NETWORK_BASE_30D / NETWORK_LOCATION_COUNT) },
                  { label: 'Avg ticket', value: `$${AVG_TICKET.toFixed(2)}` }
                ],
                sections: [{
                  heading: 'Revenue mix',
                  rows: [
                    { label: 'Food sales', value: '50%' },
                    { label: 'Beverage sales', value: '35%' },
                    { label: 'Merchandise', value: '10%' },
                    { label: 'Catering', value: '5%' }
                  ]
                }],
                action: { label: 'Open reporting', run: () => go('reporting') }
              } as InfoModalContent
            },
            {
              icon: Users, label: 'Total Employees', value: '412', change: '+8%',
              modal: {
                title: 'Network Headcount',
                subtitle: '412 crew members across the network',
                stats: [
                  { label: 'Crew', value: '341' },
                  { label: 'Shift leads', value: '48' },
                  { label: 'General managers', value: '23' }
                ],
                sections: [{
                  heading: 'Training status',
                  rows: [
                    { label: 'Completion rate', value: `${networkCompletionRate}%` },
                    { label: 'Certifications issued', value: String(certifications) },
                    { label: 'Modules published', value: String(modules.length) }
                  ]
                }],
                action: { label: 'Open training portal', run: () => go('training') }
              } as InfoModalContent
            },
            {
              icon: TrendingUp, label: 'Avg Compliance', value: `${avgCompliance.toFixed(1)}%`, change: '+2.1%',
              modal: {
                title: 'Compliance Average',
                subtitle: 'Rolling score from self audits and corporate inspections',
                stats: [
                  { label: 'Network average', value: `${avgCompliance.toFixed(1)}%` },
                  { label: 'Above 95', value: String(locations.filter((l) => l.compliance >= 95).length) },
                  { label: 'Below 90', value: String(locations.filter((l) => l.compliance < 90).length) }
                ],
                sections: [{
                  heading: 'By location',
                  rows: locations.map((l) => ({ label: l.name, value: `${l.compliance}%` }))
                }],
                action: { label: 'Open compliance monitoring', run: () => go('admin') }
              } as InfoModalContent
            }
          ].map(({ icon: Icon, label, value, change, modal }) => (
            <button
              key={label}
              onClick={() => setInfoModal(modal)}
              className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-[#bc4749]" />
                <span className="text-sm font-semibold text-green-600">{change}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{label}</p>
              <p className="text-3xl font-bold text-[#bc4749]">{value}</p>
              <p className="text-xs text-[#81b29a] font-semibold mt-3 flex items-center gap-1">
                View breakdown <ChevronRight className="w-3 h-3" />
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#bc4749] mb-8">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: LayoutDashboard, title: 'Multi-Location Dashboard', desc: 'Real-time visibility into all franchise operations from a single control center', page: 'admin' as Page },
              { icon: Package, title: 'Centralized Inventory', desc: 'Synchronized inventory management across all locations with automatic reordering', page: 'inventory' as Page },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Comprehensive reporting with predictive insights and performance benchmarking', page: 'reporting' as Page },
              { icon: GraduationCap, title: 'Training Management', desc: 'Standardized training programs with certification tracking and compliance monitoring', page: 'training' as Page },
              { icon: Megaphone, title: 'Marketing Hub', desc: 'Centralized marketing asset distribution with local customization capabilities', page: 'marketing' as Page },
              { icon: Shield, title: 'Compliance Tracking', desc: 'Automated compliance monitoring with alerts and audit trail documentation', page: 'admin' as Page }
            ].map(({ icon: Icon, title, desc, page }) => (
              <button
                key={title}
                onClick={() => go(page)}
                className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow"
              >
                <Icon className="w-12 h-12 text-[#bc4749] mb-4" />
                <h3 className="text-xl font-bold text-[#bc4749] mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#81b29a]">
                  Open <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#bc4749] mb-8">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: 'View Reports', page: 'reporting' as Page },
            { icon: Package, label: 'Check Inventory', page: 'inventory' as Page },
            { icon: GraduationCap, label: 'Training Portal', page: 'training' as Page },
            { icon: Download, label: 'Download Resources', page: 'resources' as Page }
          ].map(({ icon: Icon, label, page }) => (
            <button
              key={label}
              onClick={() => go(page)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-[#bc4749]" />
              <span className="font-semibold text-[#bc4749]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------- locations ---- */
  const renderLocations = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Franchise Locations</h1>
          <p className="text-gray-600">Manage and monitor all franchise locations</p>
        </div>
        {userRole === 'corporate' ? (
          <button
            onClick={() => setAddLocationOpen(true)}
            className="bg-[#bc4749] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
          >
            <Building2 className="w-5 h-5" />
            Add Location
          </button>
        ) : (
          <button
            onClick={() => { setUserRole('corporate'); notify('Switched to Corporate Admin -- you can now add locations', 'info'); }}
            className="border-2 border-[#bc4749] text-[#bc4749] px-6 py-3 rounded-lg font-semibold hover:bg-[#bc4749] hover:text-white transition-colors flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Switch to corporate to add a location
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="franchise-locations-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="franchise-locations-search"
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search name, owner or address..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="franchise-locations-status" className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              id="franchise-locations-status"
              value={locationStatus}
              onChange={(e) => setLocationStatus(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label htmlFor="franchise-locations-sort" className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              id="franchise-locations-sort"
              value={locationSort}
              onChange={(e) => setLocationSort(e.target.value)}
              className={inputClass}
            >
              <option value="revenue-desc">Revenue (High to Low)</option>
              <option value="revenue-asc">Revenue (Low to High)</option>
              <option value="compliance">Compliance Score</option>
              <option value="name">Name (A-Z)</option>
              <option value="opened">Opening Date</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#81b29a]" />
            Showing {filteredLocations.length} of {locations.length} locations
          </p>
          {(locationSearch || locationStatus !== 'all' || locationSort !== 'revenue-desc') && (
            <button
              onClick={() => { setLocationSearch(''); setLocationStatus('all'); setLocationSort('revenue-desc'); }}
              className="text-sm font-semibold text-[#bc4749] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredLocations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-800">No locations match those filters</p>
          <p className="text-gray-600 mt-1">Try a different search term or status.</p>
          <button
            onClick={() => { setLocationSearch(''); setLocationStatus('all'); }}
            className="mt-6 bg-[#bc4749] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#bc4749] mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600">Owner: {location.owner}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  location.status === 'active' ? 'bg-green-100 text-green-700' :
                  location.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {location.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  {location.address}
                </div>
                <a href={`tel:${location.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#bc4749]">
                  <Phone className="w-4 h-4" />
                  {location.phone}
                </a>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  Opened: {new Date(location.openDate).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#bc4749]">${(location.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#81b29a]">{location.compliance}%</p>
                  <p className="text-xs text-gray-600">Compliance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#bc4749]">{location.employees}</p>
                  <p className="text-xs text-gray-600">Employees</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setLocationDetail(location)}
                  className="flex-1 bg-[#bc4749] text-white px-4 py-2 rounded-lg hover:bg-[#a33f41] transition-colors text-sm font-semibold"
                >
                  View Details
                </button>
                <button
                  onClick={() => setContactLocation(location)}
                  className="px-4 py-2 border-2 border-[#bc4749] text-[#bc4749] rounded-lg hover:bg-[#bc4749] hover:text-white transition-colors text-sm font-semibold"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ----------------------------------------------------------- portal ---- */
  const renderPortal = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Franchise Owner Portal</h1>

      {settings.maintenanceMode && (
        <div className="mb-6 flex items-start gap-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-yellow-800">Maintenance window in progress</p>
            <p className="text-sm text-yellow-700 mt-1">
              Corporate has maintenance mode switched on. You can keep working -- orders and reports queue and sync when it clears.
            </p>
          </div>
          {userRole === 'corporate' && (
            <button
              onClick={() => { setSettings({ ...settings, maintenanceMode: false }); notify('Maintenance mode turned off', 'success'); }}
              className="text-sm font-semibold text-yellow-800 hover:underline whitespace-nowrap"
            >
              Turn off
            </button>
          )}
        </div>
      )}

      {userRole === 'guest' ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Shield className="w-16 h-16 text-[#bc4749] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Access Required</h2>
          <p className="text-gray-600 mb-6">Please log in as a Franchise Owner or Manager to access the portal</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setUserRole('franchise-owner'); notify('Signed in as franchise owner', 'success'); }}
              className="bg-[#bc4749] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
            >
              Switch to Franchise Owner
            </button>
            <button
              onClick={() => { setUserRole('manager'); notify('Signed in as store manager', 'success'); }}
              className="border-2 border-[#bc4749] text-[#bc4749] px-8 py-3 rounded-lg font-semibold hover:bg-[#bc4749] hover:text-white transition-colors"
            >
              Switch to Manager
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Today's Sales", value: money(todaysSales), icon: DollarSign, color: 'text-green-600',
                modal: {
                  title: "Today's Sales",
                  subtitle: `${dayOrders.length - openOrders.length} orders closed so far today`,
                  stats: [
                    { label: 'Net sales', value: money(todaysSales) },
                    { label: 'Orders closed', value: String(dayOrders.length - openOrders.length) },
                    { label: 'Avg ticket', value: `$${(todaysSales / Math.max(dayOrders.length - openOrders.length, 1)).toFixed(2)}` }
                  ],
                  sections: [{
                    heading: 'By channel',
                    rows: ORDER_CHANNELS.map((ch, i) => ({
                      label: ch,
                      value: money(todaysSales * [0.42, 0.31, 0.17, 0.1][i])
                    }))
                  }]
                } as InfoModalContent
              },
              {
                label: 'Active Orders', value: String(openOrders.length), icon: ShoppingCart, color: 'text-blue-600',
                modal: null
              },
              {
                label: 'Staff on Duty', value: String(staffOnDuty), icon: Users, color: 'text-purple-600',
                modal: {
                  title: 'Staff on Duty',
                  subtitle: 'Live from the shift schedule you control in Quick Actions',
                  stats: [
                    { label: 'On duty', value: String(staffOnDuty) },
                    { label: 'Off today', value: String(STAFF_ROSTER.length - staffOnDuty) },
                    { label: 'Roster size', value: String(STAFF_ROSTER.length) }
                  ],
                  sections: [{
                    heading: 'Assignments',
                    rows: STAFF_ROSTER.map((name) => ({ label: name, value: schedule[name] || 'Off' }))
                  }],
                  action: { label: 'Edit the schedule', run: () => { setInfoModal(null); setPortalAction('staff'); } }
                } as InfoModalContent
              },
              {
                label: 'Inventory Alerts', value: String(lowStockItems.length), icon: AlertCircle, color: 'text-red-600',
                modal: {
                  title: 'Inventory Alerts',
                  subtitle: lowStockItems.length ? 'Items below par level right now' : 'Every tracked item is at or above par level',
                  sections: [{
                    heading: 'Below par',
                    rows: lowStockItems.length
                      ? lowStockItems.map((i) => ({ label: i.name, value: `${i.stock} on hand / ${i.minStock} par` }))
                      : [{ label: 'Nothing below par level', value: 'All clear' }]
                  }],
                  action: { label: 'Open inventory', run: () => { setInfoModal(null); go('inventory'); } }
                } as InfoModalContent
              }
            ].map(({ label, value, icon: Icon, color, modal }) => (
              <button
                key={label}
                onClick={() => {
                  if (modal) { setInfoModal(modal); return; }
                  setInfoModal({
                    title: 'Active Orders',
                    subtitle: `${openOrders.length} orders still open on the line`,
                    sections: [{
                      heading: 'Open tickets',
                      rows: openOrders.slice(0, 12).map((o) => ({ label: `${o.id} -- ${o.item}`, value: `${o.channel} - ${money(o.total)}` }))
                    }],
                    notes: openOrders.length > 12 ? [`Showing the first 12 of ${openOrders.length} open tickets.`] : undefined,
                    action: openOrders.length
                      ? {
                          label: `Close ${openOrders[0].id}`,
                          run: () => {
                            const next = openOrders[0];
                            setCompletedOrders((prev) => [...prev, next.id]);
                            setInfoModal(null);
                            notify(`${next.id} closed -- ${money(next.total)} added to today's sales`, 'success');
                          }
                        }
                      : undefined
                  });
                }}
                className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${color}`} />
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
                <p className="text-gray-600 text-sm">{label}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Package, label: 'Order Supplies', action: 'supplies' as const },
                { icon: FileText, label: 'Submit Report', action: 'report' as const },
                { icon: Calendar, label: 'Schedule Staff', action: 'staff' as const },
                { icon: MessageSquare, label: 'Contact Support', action: 'support' as const }
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={() => {
                    if (action === 'supplies') {
                      const draft: Record<string, number> = {};
                      lowStockItems.forEach((i) => { draft[i.id] = settings.autoReorder ? Math.max(i.minStock, i.minStock * 2 - i.stock) : 0; });
                      setSupplyDraft(draft);
                    }
                    setPortalAction(action);
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] hover:bg-[#bc4749] hover:text-white transition-all"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {(pendingSupplyOrders.length > 0 || fieldReports.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingSupplyOrders.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#bc4749] mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Supply Orders In Transit
                  </h3>
                  <div className="space-y-3">
                    {pendingSupplyOrders.map((order) => (
                      <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-800">{order.itemName}</p>
                          <span className="text-sm font-bold text-[#bc4749]">{money(order.cost)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          {order.id} - {order.qty} units - {order.supplier} - ETA {order.eta}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => receiveOrder(order)}
                            className="flex-1 bg-[#81b29a] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#6fa085] transition-colors"
                          >
                            Mark received
                          </button>
                          <button
                            onClick={() => cancelOrder(order)}
                            className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fieldReports.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-[#bc4749] mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5" />
                    Submitted Reports
                  </h3>
                  <div className="space-y-3">
                    {fieldReports.map((report) => (
                      <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800">{report.type}</p>
                          <span className="text-xs font-semibold text-[#81b29a]">{report.id}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.period} - {report.location} - submitted {report.submitted}
                        </p>
                        {report.notes && <p className="text-sm text-gray-700 mt-2">{report.notes}</p>}
                        <button
                          onClick={() => {
                            setFieldReports((prev) => prev.filter((r) => r.id !== report.id));
                            notify(`${report.id} withdrawn`, 'warn');
                          }}
                          className="mt-2 text-xs font-semibold text-[#bc4749] hover:underline"
                        >
                          Withdraw report
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#bc4749]">Recent Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => { setReadNotifications(NOTIFICATIONS.map((n) => n.id)); notify('All notifications marked read', 'info'); }}
                    className="text-xs font-semibold text-[#81b29a] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {NOTIFICATIONS.slice(0, 4).map((notif) => {
                  const unread = !readNotifications.includes(notif.id);
                  return (
                    <button
                      key={notif.id}
                      onClick={() => { markNotificationRead(notif.id); go(notif.page); }}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${unread ? 'bg-[#f2cc8f]/25 hover:bg-[#f2cc8f]/40' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                        notif.type === 'alert' ? 'text-red-600' :
                        notif.type === 'success' ? 'text-green-600' :
                        'text-blue-600'
                      }`} />
                      <span className="flex-1">
                        <span className="block text-sm text-gray-800">{notif.message}</span>
                        <span className="block text-xs text-gray-500 mt-1">{notif.time}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Sales Target', value: 87, color: 'bg-green-500', detail: ['Target for the period: $145,000', 'Booked to date: $126,150', 'Pace: 3 days ahead of plan'] },
                  { label: 'Customer Satisfaction', value: 94, color: 'bg-blue-500', detail: ['Survey responses: 412', 'Five star share: 71%', 'Top complaint: wait time at 12:15pm'] },
                  { label: 'Staff Training', value: 76, color: 'bg-yellow-500', detail: [`Modules published: ${modules.length}`, `Network completion: ${networkCompletionRate}%`, 'Two crew members have overdue mandatory modules'] },
                  { label: 'Compliance Score', value: 98, color: 'bg-green-500', detail: ['Last self audit: passed', 'Open corrective actions: 1', 'Next corporate inspection: 22 days'] }
                ].map(({ label, value, color, detail }) => (
                  <button
                    key={label}
                    onClick={() => setInfoModal({
                      title: label,
                      subtitle: `Current score ${value}%`,
                      sections: [{ heading: 'Detail', rows: detail.map((d) => ({ label: d })) }]
                    })}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                      <span className="text-sm font-bold text-[#bc4749]">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ------------------------------------------------------------ admin ---- */
  const renderAdmin = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Central Administration</h1>

      {userRole !== 'corporate' ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Shield className="w-16 h-16 text-[#bc4749] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Corporate Access Required</h2>
          <p className="text-gray-600 mb-6">This area is restricted to corporate administrators only</p>
          <button
            onClick={() => { setUserRole('corporate'); notify('Signed in as corporate admin', 'success'); }}
            className="bg-[#bc4749] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
          >
            Switch to Corporate Admin
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Network Performance Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  label: 'Total Locations', value: String(NETWORK_LOCATION_COUNT), change: '+9%',
                  rows: locations.map((l) => ({ label: l.name, value: l.status }))
                },
                {
                  label: 'Network Revenue', value: compactMoney(NETWORK_BASE_30D), change: '+12%',
                  rows: [
                    { label: 'Food sales', value: compactMoney(NETWORK_BASE_30D * 0.5) },
                    { label: 'Beverage sales', value: compactMoney(NETWORK_BASE_30D * 0.35) },
                    { label: 'Merchandise', value: compactMoney(NETWORK_BASE_30D * 0.1) },
                    { label: 'Catering', value: compactMoney(NETWORK_BASE_30D * 0.05) }
                  ]
                },
                {
                  label: 'Avg Location Revenue', value: compactMoney(NETWORK_BASE_30D / NETWORK_LOCATION_COUNT), change: '+8%',
                  rows: locations.map((l) => ({ label: l.name, value: compactMoney(l.revenue) }))
                },
                {
                  label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2',
                  rows: [
                    { label: 'Five star', value: '71%' },
                    { label: 'Four star', value: '19%' },
                    { label: 'Three star or below', value: '10%' },
                    { label: 'Responses collected', value: '3,940' }
                  ]
                },
                {
                  label: 'Network Compliance', value: `${avgCompliance.toFixed(1)}%`, change: '+2.1%',
                  rows: locations.map((l) => ({ label: l.name, value: `${l.compliance}%` }))
                }
              ].map(({ label, value, change, rows }) => (
                <button
                  key={label}
                  onClick={() => setInfoModal({ title: label, subtitle: `Current value ${value}`, sections: [{ heading: 'Breakdown', rows }] })}
                  className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-2xl font-bold text-[#bc4749] mb-1">{value}</p>
                  <p className="text-xs text-gray-600 mb-1">{label}</p>
                  <span className="text-xs font-semibold text-green-600">{change}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Settings</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, label: 'User Management', count: `${users.filter((u) => u.active).length} active`, open: () => setAdminPanel('users') },
                  { icon: Shield, label: 'Role Permissions', count: `${Object.keys(permissions).length} roles`, open: () => setAdminPanel('roles') },
                  { icon: Settings, label: 'System Config', count: settings.maintenanceMode ? 'Maintenance' : 'Active', open: () => setAdminPanel('config') },
                  { icon: Bell, label: 'Notifications', count: `${unreadCount} unread`, open: () => setInfoModal({
                    title: 'Notification Center',
                    subtitle: `${unreadCount} unread of ${NOTIFICATIONS.length}`,
                    sections: [{ heading: 'Recent', rows: NOTIFICATIONS.map((n) => ({ label: n.message, value: readNotifications.includes(n.id) ? 'read' : 'unread' })) }],
                    action: { label: 'Mark all read', run: () => { setReadNotifications(NOTIFICATIONS.map((n) => n.id)); setInfoModal(null); notify('All notifications marked read', 'info'); } }
                  }) }
                ].map(({ icon: Icon, label, count, open }) => (
                  <button
                    key={label}
                    onClick={open}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-[#bc4749] hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{label}</span>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-white">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">Compliance Monitoring</h3>
              <div className="space-y-2">
                {[...locations].sort((a, b) => b.compliance - a.compliance).map((loc) => {
                  const status = loc.compliance >= 95 ? 'excellent' : loc.compliance >= 90 ? 'good' : 'needs improvement';
                  const scheduled = audits.find((a) => a.location === loc.name);
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setInfoModal({
                        title: `${loc.name} compliance`,
                        subtitle: `Score ${loc.compliance}% -- ${status}`,
                        stats: [
                          { label: 'Score', value: `${loc.compliance}%` },
                          { label: 'Employees', value: String(loc.employees) },
                          { label: 'Status', value: loc.status }
                        ],
                        sections: [{
                          heading: 'Audit checklist',
                          rows: [
                            { label: 'Temperature logs complete', value: loc.compliance >= 95 ? 'Pass' : 'Review' },
                            { label: 'Allergen labeling', value: 'Pass' },
                            { label: 'Equipment maintenance records', value: loc.compliance >= 92 ? 'Pass' : 'Review' },
                            { label: 'Mandatory training current', value: loc.compliance >= 98 ? 'Pass' : 'Review' },
                            { label: 'Incident log up to date', value: 'Pass' }
                          ]
                        }],
                        notes: scheduled ? [`On-site audit already scheduled for ${scheduled.date}.`] : undefined,
                        action: scheduled ? undefined : {
                          label: 'Schedule on-site audit',
                          run: () => {
                            const date = addDays(14);
                            setAudits((prev) => [...prev, { location: loc.name, date }]);
                            setInfoModal(null);
                            notify(`Audit scheduled for ${loc.name} on ${date}`, 'success');
                          }
                        }
                      })}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{loc.name.replace('FastServe ', '')}</p>
                        <p className="text-xs text-gray-500">{scheduled ? `audit ${scheduled.date}` : status}</p>
                      </div>
                      <p className={`text-2xl font-bold ${
                        loc.compliance >= 95 ? 'text-green-600' :
                        loc.compliance >= 90 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>{loc.compliance}%</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Health</h3>
              <div className="space-y-2">
                {[
                  { metric: 'Database Status', value: 'Healthy', icon: CheckCircle, color: 'text-green-600', detail: ['Primary and replica in sync', 'Last failover test: 12 days ago', `Nightly backup: ${settings.nightlyBackup ? 'enabled' : 'disabled'}`] },
                  { metric: 'API Response Time', value: '145ms', icon: Zap, color: 'text-green-600', detail: ['p50 118ms', 'p95 291ms', 'p99 540ms'] },
                  { metric: 'Active Sessions', value: String(89 + users.filter((u) => u.active).length), icon: Users, color: 'text-blue-600', detail: ['Owner portal 41', 'Manager devices 33', 'Corporate 15'] },
                  { metric: 'Storage Used', value: '67%', icon: Package, color: 'text-yellow-600', detail: ['Media library 380 GB', 'Transaction archive 210 GB', 'Free space 290 GB'] },
                  { metric: 'Backup Status', value: settings.nightlyBackup ? 'Current' : 'Paused', icon: CheckCircle, color: settings.nightlyBackup ? 'text-green-600' : 'text-yellow-600', detail: ['Last snapshot 02:14 EST', 'Retention 35 days', 'Restore drill passed in April'] }
                ].map(({ metric, value, icon: Icon, color, detail }) => (
                  <button
                    key={metric}
                    onClick={() => setInfoModal({
                      title: metric,
                      subtitle: `Reported value ${value}`,
                      sections: [{ heading: 'Detail', rows: detail.map((d) => ({ label: d })) }],
                      action: { label: 'Open system config', run: () => { setInfoModal(null); setAdminPanel('config'); } }
                    })}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </span>
                    <span className="text-sm font-semibold text-[#bc4749]">{value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* -------------------------------------------------------- inventory --- */
  const renderInventory = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Inventory Management</h1>
          <p className="text-gray-600">Centralized inventory tracking across all locations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setNewItemOpen(true)}
            className="border-2 border-[#bc4749] text-[#bc4749] px-6 py-3 rounded-lg font-semibold hover:bg-[#bc4749] hover:text-white transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
          <button
            onClick={() => setBulkImportOpen(true)}
            className="bg-[#bc4749] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Bulk Import
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="franchise-inventory-location" className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              id="franchise-inventory-location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="franchise-inventory-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="franchise-inventory-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Categories</option>
              {Array.from(new Set(inventory.map((i) => i.category))).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="franchise-inventory-status" className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              id="franchise-inventory-status"
              value={inventoryStatus}
              onChange={(e) => setInventoryStatus(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Items</option>
              <option value="low">Low Stock</option>
              <option value="in">In Stock</option>
              <option value="over">Overstocked</option>
            </select>
          </div>
          <div>
            <label htmlFor="franchise-inventory-search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="franchise-inventory-search"
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Item, SKU or supplier..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#81b29a]" />
            {filteredInventory.length} of {inventory.length} SKUs
            {selectedLocation !== 'all' && ` -- allocation for ${locations.find((l) => l.id === selectedLocation)?.name}`}
          </p>
          {(selectedLocation !== 'all' || selectedCategory !== 'all' || inventoryStatus !== 'all' || inventorySearch) && (
            <button
              onClick={() => { setSelectedLocation('all'); setSelectedCategory('all'); setInventoryStatus('all'); setInventorySearch(''); }}
              className="text-sm font-semibold text-[#bc4749] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            label: 'Total Items', value: filteredInventory.reduce((s, i) => s + i.viewStock, 0).toLocaleString(), icon: Package, color: 'text-blue-600',
            onClick: () => { setInventoryStatus('all'); notify('Showing every SKU in view', 'info'); }
          },
          {
            label: 'Low Stock Alerts', value: String(filteredInventory.filter((i) => i.viewStock < i.viewMin).length), icon: AlertCircle, color: 'text-red-600',
            onClick: () => { setInventoryStatus('low'); notify('Filtered to items below par level', 'info'); }
          },
          {
            label: 'Orders In Transit', value: String(pendingSupplyOrders.length), icon: ShoppingCart, color: 'text-yellow-600',
            onClick: () => setInfoModal({
              title: 'Supply orders in transit',
              subtitle: pendingSupplyOrders.length ? 'Placed from this demo session' : 'No open purchase orders yet',
              sections: [{
                heading: 'Open purchase orders',
                rows: pendingSupplyOrders.length
                  ? pendingSupplyOrders.map((o) => ({ label: `${o.id} - ${o.itemName}`, value: `${o.qty} units, ETA ${o.eta}` }))
                  : [{ label: 'Use the cart button on any row to place one', value: '' }]
              }]
            })
          },
          {
            label: 'Total Value', value: compactMoney(inventoryValue), icon: DollarSign, color: 'text-green-600',
            onClick: () => setInfoModal({
              title: 'Inventory value',
              subtitle: 'Extended cost of everything currently in view',
              stats: [
                { label: 'Value', value: money(inventoryValue) },
                { label: 'SKUs', value: String(filteredInventory.length) },
                { label: 'Units', value: filteredInventory.reduce((s, i) => s + i.viewStock, 0).toLocaleString() }
              ],
              sections: [{
                heading: 'By category',
                rows: Array.from(new Set(filteredInventory.map((i) => i.category))).map((cat) => ({
                  label: cat,
                  value: money(filteredInventory.filter((i) => i.category === cat).reduce((s, i) => s + i.viewStock * i.price, 0))
                }))
              }]
            })
          }
        ].map(({ label, value, icon: Icon, color, onClick }) => (
          <button key={label} onClick={onClick} className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow">
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#bc4749] text-white">
              <tr>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Item</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>SKU</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Category</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Stock</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Min Stock</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Price</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Supplier</th>
                <th className={`${cellPad} text-left text-sm font-semibold`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-600">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    No items match these filters.
                    <button
                      onClick={() => { setSelectedCategory('all'); setInventoryStatus('all'); setInventorySearch(''); }}
                      className="block mx-auto mt-4 text-[#bc4749] font-semibold hover:underline"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
              {filteredInventory.map((item) => {
                const low = item.viewStock < item.viewMin;
                return (
                  <tr key={item.id} className={`hover:bg-gray-50 ${low && settings.highlightLowStock ? 'bg-red-50/60' : ''}`}>
                    <td className={cellPad}>
                      <button
                        onClick={() => setInfoModal({
                          title: item.name,
                          subtitle: `${item.sku} -- ${item.category}`,
                          stats: [
                            { label: 'On hand', value: String(item.viewStock) },
                            { label: 'Par level', value: String(item.viewMin) },
                            { label: 'Unit cost', value: `$${item.price.toFixed(2)}` }
                          ],
                          sections: [{
                            heading: 'Supply detail',
                            rows: [
                              { label: 'Supplier', value: item.supplier },
                              { label: 'Last ordered', value: item.lastOrdered },
                              { label: 'Extended value', value: money(item.viewStock * item.price) },
                              { label: 'Status', value: low ? 'Below par level' : item.viewStock > item.viewMin * 3 ? 'Overstocked' : 'Healthy' }
                            ]
                          }],
                          action: {
                            label: 'Reorder this item',
                            run: () => {
                              setInfoModal(null);
                              setReorderItem(item);
                              setReorderQty(settings.autoReorder ? Math.max(item.minStock, item.minStock * 2 - item.stock) : 1);
                            }
                          }
                        })}
                        className="font-semibold text-gray-800 hover:text-[#bc4749] text-left"
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className={`${cellPad} text-sm text-gray-600`}>{item.sku}</td>
                    <td className={cellPad}>
                      <button
                        onClick={() => setSelectedCategory(item.category)}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition-colors"
                      >
                        {item.category}
                      </button>
                    </td>
                    <td className={cellPad}>
                      <span className={`font-bold ${low ? 'text-red-600' : 'text-green-600'}`}>{item.viewStock}</span>
                    </td>
                    <td className={`${cellPad} text-sm text-gray-600`}>{item.viewMin}</td>
                    <td className={`${cellPad} font-semibold text-gray-800`}>${item.price.toFixed(2)}</td>
                    <td className={`${cellPad} text-sm text-gray-600`}>{item.supplier}</td>
                    <td className={cellPad}>
                      <div className="flex gap-2">
                        <button
                          aria-label={`Reorder ${item.name}`}
                          title="Reorder"
                          onClick={() => {
                            setReorderItem(item);
                            setReorderQty(settings.autoReorder ? Math.max(item.minStock, item.minStock * 2 - item.stock) : 1);
                          }}
                          className="p-2 text-[#bc4749] hover:bg-[#bc4749] hover:text-white rounded transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          aria-label={`Edit ${item.name}`}
                          title="Edit item"
                          onClick={() => setEditItem(inventory.find((i) => i.id === item.id) || null)}
                          className="p-2 text-[#81b29a] hover:bg-[#81b29a] hover:text-white rounded transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {supplyOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#bc4749] mb-4 flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Purchase Orders
          </h2>
          <div className="space-y-3">
            {supplyOrders.map((order) => (
              <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{order.id} -- {order.itemName}</p>
                  <p className="text-xs text-gray-500">
                    {order.qty} units - {money(order.cost)} - {order.supplier} - {order.destination} - placed {order.placed}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'in-transit' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'received' ? 'bg-green-100 text-green-700' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {order.status === 'in-transit' ? `In transit, ETA ${order.eta}` : order.status}
                  </span>
                  {order.status === 'in-transit' && (
                    <>
                      <button
                        onClick={() => receiveOrder(order)}
                        className="bg-[#81b29a] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#6fa085] transition-colors"
                      >
                        Mark received
                      </button>
                      <button
                        onClick={() => cancelOrder(order)}
                        className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* -------------------------------------------------------- reporting --- */
  const buildExport = (format: 'csv' | 'json', scope: 'summary' | 'locations' | 'inventory') => {
    if (scope === 'locations') {
      const rows = matrixRows.map((l) => ({
        location: l.name, owner: l.owner, status: l.status,
        revenue: Math.round(l.rangeRevenue),
        orders: Math.round(l.rangeRevenue / AVG_TICKET),
        avgTicket: AVG_TICKET, compliance: l.compliance, employees: l.employees
      }));
      if (format === 'json') return JSON.stringify({ range: range.label, rows }, null, 2);
      const header = 'Location,Owner,Status,Revenue,Orders,Avg Ticket,Compliance,Employees';
      return [header, ...rows.map((r) => `${r.location},${r.owner},${r.status},${r.revenue},${r.orders},${r.avgTicket},${r.compliance},${r.employees}`)].join('\n');
    }
    if (scope === 'inventory') {
      const rows = filteredInventory.map((i) => ({
        item: i.name, sku: i.sku, category: i.category, stock: i.viewStock,
        par: i.viewMin, price: i.price, supplier: i.supplier, value: +(i.viewStock * i.price).toFixed(2)
      }));
      if (format === 'json') return JSON.stringify({ generated: todayStamp(), rows }, null, 2);
      const header = 'Item,SKU,Category,Stock,Par,Unit Price,Supplier,Extended Value';
      return [header, ...rows.map((r) => `${r.item},${r.sku},${r.category},${r.stock},${r.par},${r.price},${r.supplier},${r.value}`)].join('\n');
    }
    const rows = revenueSeries.map((p) => ({ period: p.label, revenue: Math.round(p.value) }));
    if (format === 'json') {
      return JSON.stringify({
        range: range.label,
        totalRevenue: Math.round(rangeRevenue),
        avgPerLocation: Math.round(rangeRevenue / NETWORK_LOCATION_COUNT),
        growthRate: +growthRate.toFixed(1),
        series: rows
      }, null, 2);
    }
    const header = 'Period,Revenue';
    return [
      `FastServe network summary,${range.label}`,
      `Total revenue,${Math.round(rangeRevenue)}`,
      `Avg per location,${Math.round(rangeRevenue / NETWORK_LOCATION_COUNT)}`,
      `Growth rate,${growthRate.toFixed(1)}%`,
      '',
      header,
      ...rows.map((r) => `${r.period},${r.revenue}`)
    ].join('\n');
  };

  const renderReporting = () => {
    const maxValue = Math.max(...revenueSeries.map((p) => p.value));
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Multi-Store Reporting</h1>
            <p className="text-gray-600">Comprehensive analytics across all franchise locations</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              aria-label="Filter by location"
              value={reportLocation}
              onChange={(e) => setReportLocation(e.target.value)}
              className="px-4 py-2 border-2 border-[#bc4749] rounded-lg font-semibold text-[#bc4749] focus:outline-none"
            >
              <option value="all">All Locations</option>
              {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
            <select
              aria-label="Select date range"
              value={dateRange}
              onChange={(e) => { setDateRange(e.target.value); setChartFocus(null); }}
              className="px-4 py-2 border-2 border-[#bc4749] rounded-lg font-semibold text-[#bc4749] focus:outline-none"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={() => setExportOpen(true)}
              className="bg-[#bc4749] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Revenue Overview -- {range.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Revenue', value: compactMoney(rangeRevenue), change: '+12.3%', trend: 'up' },
              { label: 'Avg per Location', value: compactMoney(rangeRevenue / NETWORK_LOCATION_COUNT), change: '+8.1%', trend: 'up' },
              { label: 'Top Performer', value: topLocation ? topLocation.name.replace('FastServe ', '') : 'n/a', change: topLocation ? compactMoney(topLocation.revenue * range.factor) : '', trend: 'neutral' },
              { label: 'Growth Rate', value: `${growthRate >= 0 ? '+' : ''}${growthRate.toFixed(1)}%`, change: 'period over period', trend: growthRate >= 0 ? 'up' : 'neutral' }
            ].map(({ label, value, change, trend }) => (
              <div key={label} className="text-center">
                <p className="text-gray-600 text-sm mb-2">{label}</p>
                <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
                <p className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>{change}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-700 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#bc4749]" />
                Revenue by period
              </p>
              <p className="text-sm text-gray-600">
                {chartFocus === null
                  ? 'Select a bar for the period detail'
                  : `${revenueSeries[chartFocus].label}: ${money(revenueSeries[chartFocus].value)}`}
              </p>
            </div>
            <div className="flex items-end gap-2 h-52">
              {revenueSeries.map((point, idx) => {
                const heightPct = (point.value / maxValue) * 100;
                const active = chartFocus === idx;
                return (
                  <button
                    key={point.label}
                    onClick={() => {
                      setChartFocus(idx);
                      setInfoModal({
                        title: `${point.label} -- ${range.label}`,
                        subtitle: `Network revenue ${money(point.value)}`,
                        stats: [
                          { label: 'Revenue', value: money(point.value) },
                          { label: 'Orders', value: Math.round(point.value / AVG_TICKET).toLocaleString() },
                          { label: 'Share of period', value: `${((point.value / rangeRevenue) * 100).toFixed(1)}%` }
                        ],
                        sections: [{
                          heading: 'Revenue mix for this period',
                          rows: [
                            { label: 'Food sales', value: money(point.value * 0.5) },
                            { label: 'Beverage sales', value: money(point.value * 0.35) },
                            { label: 'Merchandise', value: money(point.value * 0.1) },
                            { label: 'Catering', value: money(point.value * 0.05) }
                          ]
                        }]
                      });
                    }}
                    className="flex-1 h-full flex flex-col justify-end items-center group"
                    title={`${point.label}: ${money(point.value)}`}
                  >
                    <span className={`text-[10px] font-bold mb-1 ${active ? 'text-[#bc4749]' : 'text-transparent group-hover:text-gray-600'}`}>
                      {compactMoney(point.value)}
                    </span>
                    <span
                      className={`w-full rounded-t transition-all ${active ? 'bg-[#bc4749]' : 'bg-[#81b29a] group-hover:bg-[#bc4749]'}`}
                      style={{ height: `${Math.max(heightPct, 4)}%` }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2">
              {revenueSeries.map((point) => (
                <span key={point.label} className="flex-1 text-center text-[10px] text-gray-500 truncate">{point.label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Top Performing Locations</h3>
            <div className="space-y-3">
              {[...locations].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((location, idx) => (
                <button
                  key={location.id}
                  onClick={() => setLocationDetail(location)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-yellow-500' :
                      idx === 1 ? 'bg-gray-400' :
                      idx === 2 ? 'bg-orange-600' :
                      'bg-[#bc4749]'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#bc4749]">{compactMoney(location.revenue * range.factor)}</p>
                    <p className="text-xs text-green-600 font-semibold">{location.status === 'pending' ? 'opening soon' : '+12%'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Category Performance
            </h3>
            <div className="space-y-4">
              {[
                { category: 'Food Sales', percent: 50, color: 'bg-blue-500', detail: ['Sandwiches and wraps lead at 22% of total', 'Breakfast daypart up 9% period over period', 'Waste rate 2.1%'] },
                { category: 'Beverage Sales', percent: 35, color: 'bg-green-500', detail: ['Cold brew is the fastest growing SKU', 'Attach rate 0.81 drinks per order', 'Refill program drives 6% of visits'] },
                { category: 'Merchandise', percent: 10, color: 'bg-purple-500', detail: ['Branded tumblers sell out at 4 locations', 'Margin 62%', 'Restock cadence every 3 weeks'] },
                { category: 'Catering', percent: 5, color: 'bg-orange-500', detail: ['Average catering ticket $312', 'Lead time 48 hours', 'Repeat customer rate 44%'] }
              ].map(({ category, percent, color, detail }) => {
                const value = rangeRevenue * (percent / 100);
                return (
                  <button
                    key={category}
                    onClick={() => setInfoModal({
                      title: category,
                      subtitle: `${percent}% of ${range.label.toLowerCase()} revenue`,
                      stats: [
                        { label: 'Revenue', value: compactMoney(value) },
                        { label: 'Share', value: `${percent}%` },
                        { label: 'Orders', value: Math.round(value / AVG_TICKET).toLocaleString() }
                      ],
                      sections: [{ heading: 'Notes', rows: detail.map((d) => ({ label: d })) }]
                    })}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{category}</span>
                      <span className="text-sm font-bold text-[#bc4749]">
                        {compactMoney(value)} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className={`${color} h-3 rounded-full`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-xl font-bold text-[#bc4749]">Location Comparison Matrix</h3>
            <p className="text-sm text-gray-600">Select a column heading to sort, or a row for the full profile</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {([
                    { key: 'name', label: 'Location' },
                    { key: 'revenue', label: 'Revenue' },
                    { key: 'revenue', label: 'Orders' },
                    { key: 'revenue', label: 'Avg Ticket' },
                    { key: 'compliance', label: 'Compliance' },
                    { key: 'employees', label: 'Staff' }
                  ] as { key: typeof matrixSort; label: string }[]).map(({ key, label }) => (
                    <th key={label} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      <button
                        onClick={() => setMatrixSort(key)}
                        className={`flex items-center gap-1 hover:text-[#bc4749] ${matrixSort === key ? 'text-[#bc4749]' : ''}`}
                      >
                        {label}
                        <ChevronDown className={`w-3 h-3 ${matrixSort === key ? 'opacity-100' : 'opacity-30'}`} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matrixRows.map((location) => (
                  <tr
                    key={location.id}
                    onClick={() => setLocationDetail(location)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-800">{location.name}</td>
                    <td className="px-4 py-3 text-[#bc4749] font-bold">{compactMoney(location.rangeRevenue)}</td>
                    <td className="px-4 py-3 text-gray-700">{Math.round(location.rangeRevenue / AVG_TICKET).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-700">${AVG_TICKET.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        location.compliance >= 95 ? 'bg-green-100 text-green-700' :
                        location.compliance >= 90 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {location.compliance}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{location.employees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* --------------------------------------------------------- training --- */
  const renderTraining = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Training Management Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Active Modules', value: String(modules.length), icon: BookOpen,
            modal: {
              title: 'Active Modules',
              subtitle: 'Published to the network right now',
              sections: [{ heading: 'Catalog', rows: modules.map((m) => ({ label: m.title, value: `${m.category} - ${m.duration}` })) }]
            } as InfoModalContent
          },
          {
            label: 'Total Enrollments', value: String(modules.reduce((s, m) => s + m.total, 0)), icon: Users,
            modal: {
              title: 'Enrollments',
              subtitle: 'Seats assigned across all published modules',
              sections: [{ heading: 'By module', rows: modules.map((m) => ({ label: m.title, value: `${m.total} enrolled` })) }]
            } as InfoModalContent
          },
          {
            label: 'Completion Rate', value: `${networkCompletionRate}%`, icon: CheckCircle,
            modal: {
              title: 'Completion Rate',
              subtitle: 'Average completion across published modules',
              sections: [{
                heading: 'By module',
                rows: modules.map((m) => ({ label: m.title, value: `${Math.round((moduleCompletion(m) / m.total) * 100)}%` }))
              }]
            } as InfoModalContent
          },
          {
            label: 'Certifications', value: String(certifications), icon: Award,
            modal: {
              title: 'Certifications Issued',
              subtitle: 'Mandatory modules completed and signed off',
              sections: [{
                heading: 'By module',
                rows: modules.filter((m) => m.mandatory).map((m) => ({ label: m.title, value: `${moduleCompletion(m)} certified` }))
              }]
            } as InfoModalContent
          }
        ].map(({ label, value, icon: Icon, modal }) => (
          <button
            key={label}
            onClick={() => setInfoModal(modal)}
            className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow"
          >
            <Icon className="w-8 h-8 text-[#bc4749] mb-3" />
            <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#bc4749]">Training Modules</h2>
          <div className="flex flex-wrap gap-3">
            <select
              aria-label="Filter modules by category"
              value={trainingCategory}
              onChange={(e) => setTrainingCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 focus:outline-none focus:border-[#bc4749]"
            >
              <option value="all">All categories</option>
              {Array.from(new Set(modules.map((m) => m.category))).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={() => setCreateModuleOpen(true)}
              className="bg-[#bc4749] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Module
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {visibleModules.length === 0 && (
            <div className="text-center py-10 text-gray-600">
              <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              No modules in that category yet.
              <button onClick={() => setTrainingCategory('all')} className="block mx-auto mt-3 text-[#bc4749] font-semibold hover:underline">
                Show all categories
              </button>
            </div>
          )}
          {visibleModules.map((module) => {
            const completed = moduleCompletion(module);
            const mine = moduleProgress[module.id] || [];
            const myDone = mine.length >= module.lessons.length && module.lessons.length > 0;
            return (
              <div key={module.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#bc4749] transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#bc4749]">{module.title}</h3>
                      {module.mandatory && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">MANDATORY</span>
                      )}
                      {myDone && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> COMPLETED BY YOU
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{module.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{module.duration}</span>
                      <span className="flex items-center gap-1"><Target className="w-4 h-4" />{module.lessons.length} lessons</span>
                      {module.dueDate && (
                        <span className="flex items-center gap-1 text-red-600 font-semibold">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(module.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveModule(module)}
                      className="bg-[#bc4749] text-white px-6 py-2 rounded-lg hover:bg-[#a33f41] transition-colors"
                    >
                      {mine.length > 0 && !myDone ? 'Resume Module' : 'View Module'}
                    </button>
                    {module.custom && (
                      <button
                        onClick={() => {
                          setModules((prev) => prev.filter((m) => m.id !== module.id));
                          notify(`${module.title} removed from the catalog`, 'warn');
                        }}
                        aria-label={`Delete ${module.title}`}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Completion Progress</span>
                    <span className="text-sm font-bold text-[#bc4749]">
                      {completed}/{module.total} ({Math.round((completed / module.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        (completed / module.total) >= 0.9 ? 'bg-green-500' :
                        (completed / module.total) >= 0.7 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${(completed / module.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Resource Library</h3>
          <div className="space-y-3">
            {TRAINING_RESOURCES.map(({ id, icon: Icon, title, type, size, summary }) => (
              <button
                key={id}
                onClick={() => setDocPreview({
                  id,
                  title,
                  meta: `${type} - ${size}`,
                  body: [
                    summary,
                    'This preview shows the opening section of the document. The full copy downloads as a text export from this demo so nothing leaves your browser.',
                    'Sections: purpose and scope, step by step procedure, required records, escalation contacts, revision history.'
                  ],
                  filename: `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`,
                  content: `FastServe Franchise Network\n${title}\n${type} reference copy\n\n${summary}\n\nSections:\n1. Purpose and scope\n2. Step by step procedure\n3. Required records\n4. Escalation contacts\n5. Revision history\n`
                })}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#bc4749]" />
                  <span>
                    <span className="block font-semibold text-gray-800">{title}</span>
                    <span className="block text-xs text-gray-500">{type} - {size}{downloads.includes(id) ? ' - downloaded' : ''}</span>
                  </span>
                </span>
                <Eye className="w-5 h-5 text-[#81b29a]" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {SESSIONS.map((session) => {
              const registered = registeredSessions.includes(session.id);
              return (
                <div key={session.id} className={`p-4 border-2 rounded-lg transition-colors ${registered ? 'border-[#81b29a] bg-[#81b29a]/5' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setInfoModal({
                      title: session.title,
                      subtitle: `${new Date(session.date).toLocaleDateString()} at ${session.time}`,
                      stats: [
                        { label: 'Host', value: session.host },
                        { label: 'Attendees', value: String(session.attendees + (registered ? 1 : 0)) },
                        { label: 'Format', value: 'Live video' }
                      ],
                      sections: [{
                        heading: 'Agenda',
                        rows: [
                          { label: 'Welcome and objectives', value: '5 min' },
                          { label: 'Core walkthrough', value: '30 min' },
                          { label: 'Hands-on practice', value: '15 min' },
                          { label: 'Questions', value: '10 min' }
                        ]
                      }],
                      action: {
                        label: registered ? 'Cancel my registration' : 'Register me',
                        run: () => { registerSession(session.id, session.title); setInfoModal(null); }
                      }
                    })}
                    className="w-full text-left"
                  >
                    <p className="font-semibold text-gray-800 mb-2">{session.title}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(session.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{session.time}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {session.attendees + (registered ? 1 : 0)}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => registerSession(session.id, session.title)}
                    className={`w-full mt-3 px-4 py-2 rounded-lg transition-colors text-sm font-semibold ${
                      registered
                        ? 'bg-[#81b29a] text-white hover:bg-[#6fa085]'
                        : 'bg-[#bc4749] text-white hover:bg-[#a33f41]'
                    }`}
                  >
                    {registered ? 'Registered -- tap to cancel' : 'Register'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------- marketing --- */
  const renderMarketing = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Marketing Asset Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ASSET_CATEGORIES.map(({ type, icon: Icon, count, color }) => {
          const active = assetFilter === type;
          return (
            <button
              key={type}
              onClick={() => setAssetFilter(active ? 'all' : type)}
              className={`bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow border-2 ${active ? 'border-[#bc4749]' : 'border-transparent'}`}
            >
              <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#bc4749] mb-2">{type} Assets</h3>
              <p className="text-gray-600">{count} assets available</p>
              <p className="text-sm font-semibold text-[#81b29a] mt-3">
                {active ? 'Filtering by this category -- tap to clear' : 'Tap to filter the featured list'}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[#bc4749]">
            Featured {assetFilter === 'all' ? 'Marketing' : assetFilter} Assets
          </h2>
          <p className="text-sm text-gray-600">
            Showing {filteredAssets.length} of {MARKETING_ASSETS.length} featured files
            {assetFilter !== 'all' && (
              <button onClick={() => setAssetFilter('all')} className="ml-3 font-semibold text-[#bc4749] hover:underline">
                Clear filter
              </button>
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#bc4749] transition-all">
              <button
                onClick={() => setAssetPreview(asset)}
                className="w-full bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label={`Preview ${asset.title}`}
              >
                {asset.type === 'Video' ? <Video className="w-12 h-12 text-gray-500" /> :
                 asset.type === 'Print' ? <FileText className="w-12 h-12 text-gray-500" /> :
                 <Megaphone className="w-12 h-12 text-gray-500" />}
              </button>
              <h3 className="font-semibold text-gray-800 mb-2">{asset.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{asset.type}</span>
                <span className="px-2 py-1 bg-[#bc4749] text-white rounded text-xs font-semibold">{asset.format}</span>
              </div>
              <button
                onClick={() => toggleDownload(
                  asset.id,
                  `${asset.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-spec.txt`,
                  `FastServe Marketing Asset\n${asset.title}\nType: ${asset.type}\nDelivered format: ${asset.format}\nFile size: ${asset.size}\nLast updated: ${asset.updated}\n\n${asset.desc}\n\nUsage: follow the brand guidelines in Corporate Resources. Local text edits are allowed in the marked layers only.\n`
                )}
                className={`w-full mt-3 px-4 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center justify-center gap-2 ${
                  downloads.includes(asset.id) ? 'bg-[#6fa085] text-white' : 'bg-[#81b29a] text-white hover:bg-[#6fa085]'
                }`}
              >
                <Download className="w-4 h-4" />
                {downloads.includes(asset.id) ? 'Download again' : 'Download'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[#bc4749]">Active Campaigns</h2>
          <button
            onClick={() => setNewCampaignOpen(true)}
            className="border-2 border-[#bc4749] text-[#bc4749] px-5 py-2 rounded-lg font-semibold hover:bg-[#bc4749] hover:text-white transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
        <div className="space-y-4">
          {campaigns.length === 0 && (
            <div className="text-center py-10 text-gray-600">
              <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              No campaigns yet. Create one to see it tracked here.
            </div>
          )}
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{campaign.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{campaign.channel}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'Paused' ? 'bg-gray-200 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const next = campaign.status === 'Active' ? 'Paused' : 'Active';
                      setCampaigns((prev) => prev.map((c) => (c.id === campaign.id ? { ...c, status: next } : c)));
                      notify(`${campaign.name} is now ${next.toLowerCase()}`, next === 'Active' ? 'success' : 'warn');
                    }}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-[#bc4749] hover:text-[#bc4749] transition-colors flex items-center gap-2"
                  >
                    {campaign.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {campaign.status === 'Active' ? 'Pause' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setCampaignDetail(campaign)}
                    className="bg-[#bc4749] text-white px-6 py-2 rounded-lg hover:bg-[#a33f41] transition-colors"
                  >
                    Manage
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#bc4749]">{campaign.reach >= 1000 ? `${(campaign.reach / 1000).toFixed(0)}K` : campaign.reach}</p>
                  <p className="text-xs text-gray-600">Reach</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#81b29a]">{campaign.engagement}%</p>
                  <p className="text-xs text-gray-600">Engagement</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#bc4749]">{money(campaign.budget)}</p>
                  <p className="text-xs text-gray-600">Budget</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* -------------------------------------------------------- resources --- */
  const QUICK_LINKS: { icon: React.ComponentType<{ className?: string }>; label: string; modal: InfoModalContent }[] = [
    {
      icon: Globe, label: 'Corporate Website', modal: {
        title: 'Corporate Website',
        subtitle: 'Public facing site and local store pages',
        sections: [{
          heading: 'What lives here',
          rows: [
            { label: 'Store locator fed by the location directory', value: `${NETWORK_LOCATION_COUNT} pages` },
            { label: 'Careers board', value: '18 openings' },
            { label: 'Franchise inquiry funnel', value: 'Routes to corporate' }
          ]
        }],
        action: { label: 'Open the location directory', run: () => { setInfoModal(null); go('locations'); } }
      }
    },
    {
      icon: Shield, label: 'Compliance Portal', modal: {
        title: 'Compliance Portal',
        subtitle: 'Self audits, corrective actions and inspection history',
        sections: [{
          heading: 'Current state',
          rows: [
            { label: 'Network average score', value: `${avgCompliance.toFixed(1)}%` },
            { label: 'Audits scheduled from this demo', value: String(audits.length) },
            { label: 'Open corrective actions', value: '3' }
          ]
        }],
        action: { label: 'Open compliance monitoring', run: () => { setInfoModal(null); go('admin'); } }
      }
    },
    {
      icon: Users, label: 'HR Resources', modal: {
        title: 'HR Resources',
        subtitle: 'Hiring, onboarding and crew development',
        sections: [{
          heading: 'Available now',
          rows: [
            { label: 'Onboarding checklist', value: '30 day plan' },
            { label: 'Interview scorecards', value: '4 roles' },
            { label: 'Required training modules', value: String(modules.filter((m) => m.mandatory).length) }
          ]
        }],
        action: { label: 'Open training portal', run: () => { setInfoModal(null); go('training'); } }
      }
    },
    {
      icon: DollarSign, label: 'Payroll System', modal: {
        title: 'Payroll System',
        subtitle: 'Hours, tips and royalty reconciliation',
        sections: [{
          heading: 'This pay period',
          rows: [
            { label: 'Scheduled labor hours', value: `${staffOnDuty * 8} hrs` },
            { label: 'Crew on the schedule', value: String(staffOnDuty) },
            { label: 'Next payroll run', value: addDays(6) }
          ]
        }],
        action: { label: 'Edit the shift schedule', run: () => { setInfoModal(null); setUserRole(userRole === 'guest' ? 'franchise-owner' : userRole); go('franchise-portal'); setPortalAction('staff'); } }
      }
    },
    {
      icon: Package, label: 'Supplier Portal', modal: {
        title: 'Supplier Portal',
        subtitle: 'Approved vendors and current purchase orders',
        sections: [{
          heading: 'Approved suppliers',
          rows: Array.from(new Set(inventory.map((i) => i.supplier))).map((s) => ({
            label: s,
            value: `${inventory.filter((i) => i.supplier === s).length} SKUs`
          }))
        }],
        action: { label: 'Open inventory', run: () => { setInfoModal(null); go('inventory'); } }
      }
    },
    {
      icon: MessageSquare, label: 'Support Tickets', modal: {
        title: 'Support Tickets',
        subtitle: 'Open items with the corporate help desk',
        sections: [{
          heading: 'Recent tickets',
          rows: [
            { label: 'TCK-4471 Drive-thru headset static', value: 'In progress' },
            { label: 'TCK-4468 Loyalty credit not applying', value: 'Resolved' },
            { label: 'TCK-4460 Freezer temp alarm', value: 'Resolved' }
          ]
        }],
        action: { label: 'Open a new ticket', run: () => { setInfoModal(null); setSupportOpen(true); } }
      }
    }
  ];

  const renderResources = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Corporate Resources</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Essential Documents</h2>
            <div className="space-y-3">
              {RESOURCE_DOCS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setDocPreview({
                    id: doc.id,
                    title: doc.title,
                    meta: `${doc.category} - ${doc.version} - updated ${doc.date}`,
                    body: [
                      doc.summary,
                      'This preview shows the summary section. Downloading exports a plain text copy generated in your browser for the demo.',
                      'Every document is version controlled. Owners are notified when a new revision publishes and the prior version stays available for 12 months.'
                    ],
                    filename: `${doc.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${doc.version}.txt`,
                    content: `FastServe Franchise Network\n${doc.title} (${doc.version})\nCategory: ${doc.category}\nUpdated: ${doc.date}\n\n${doc.summary}\n\nRevision history:\n- ${doc.version} published ${doc.date}\n- Prior versions retained for 12 months\n`
                  })}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-[#bc4749]" />
                    <span>
                      <span className="block font-semibold text-gray-800">{doc.title}</span>
                      <span className="block text-xs text-gray-500">
                        {doc.category} - {doc.version} - Updated {doc.date}{downloads.includes(doc.id) ? ' - downloaded' : ''}
                      </span>
                    </span>
                  </span>
                  <Eye className="w-5 h-5 text-[#81b29a]" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Forms &amp; Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESOURCE_FORMS.map((form) => (
                <button
                  key={form.id}
                  onClick={() => setDocPreview({
                    id: form.id,
                    title: form.title,
                    meta: `Template - ${form.fields.length} fields`,
                    body: [
                      `Fields on this template: ${form.fields.join(', ')}.`,
                      'Print it for the back office binder or download the text version and load it into your own document tool.'
                    ],
                    filename: `${form.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.txt`,
                    content: `FastServe Franchise Network\n${form.title}\n\n${form.fields.map((f) => `${f}: ______________________`).join('\n\n')}\n\nSubmitted by: ______________________   Date: ____________\n`
                  })}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{form.title}</span>
                    <Eye className="w-5 h-5 text-[#bc4749]" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {form.fields.length} fields{downloads.includes(form.id) ? ' - downloaded' : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Quick Links</h3>
            <div className="space-y-2">
              {QUICK_LINKS.map(({ icon: Icon, label, modal }) => (
                <button
                  key={label}
                  onClick={() => setInfoModal(modal)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#bc4749] hover:text-white transition-all group"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#bc4749] text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-sm mb-4">Our support team is here to assist you</p>
            <div className="space-y-3">
              <button
                onClick={() => setSupportOpen(true)}
                className="w-full bg-white text-[#bc4749] px-4 py-2 rounded-lg font-semibold hover:bg-[#f2cc8f] transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => { setFaqOpen(true); setOpenFaq(0); }}
                className="w-full bg-[#a33f41] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#81b29a] transition-colors"
              >
                View FAQs
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Status</h3>
            <div className="space-y-2">
              {SYSTEM_SERVICES.map(({ service, status, uptime, note }) => (
                <button
                  key={service}
                  onClick={() => setInfoModal({
                    title: service,
                    subtitle: status === 'operational' ? 'Operational' : 'Scheduled maintenance window',
                    stats: [
                      { label: '90 day uptime', value: uptime },
                      { label: 'Status', value: status },
                      { label: 'Last incident', value: status === 'operational' ? 'None recorded' : 'Nightly window' }
                    ],
                    sections: [{ heading: 'Notes', rows: [{ label: note }] }]
                  })}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-700">{service}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------- contact --- */
  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Contact Corporate</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Send a Message</h2>
            {contactSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-14 h-14 text-[#81b29a] mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900">Message sent</p>
                <p className="text-gray-600 mt-2">Corporate will get back to you within one business day.</p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-6 text-[#bc4749] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="franchise-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      id="franchise-contact-name"
                      type="text"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="franchise-contact-location" className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <select
                      id="franchise-contact-location"
                      name="location"
                      value={contactForm.location}
                      onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                    >
                      <option value="">Select your location</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="franchise-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    id="franchise-contact-email"
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="franchise-contact-department" className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    id="franchise-contact-department"
                    name="department"
                    value={contactForm.department}
                    onChange={(e) => setContactForm({ ...contactForm, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                  >
                    {['General Inquiry', 'Operations Support', 'Technical Support', 'Marketing', 'Training', 'Compliance', 'Finance'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="franchise-contact-subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    id="franchise-contact-subject"
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label htmlFor="franchise-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    id="franchise-contact-message"
                    name="message"
                    rows={6}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {contactError && (
                  <p className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {contactError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#bc4749] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#a33f41] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Corporate Office</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#bc4749] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">FastServe Headquarters</p>
                  <p className="text-gray-600 text-sm">1000 Corporate Blvd, Suite 500<br />Denver, CO 80202</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#bc4749] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <a href="tel:5551002000" className="text-gray-600 text-sm hover:text-[#bc4749]">(555) 100-2000</a>
                  <p className="text-gray-500 text-xs">Mon-Fri: 8am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#bc4749] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <a href="mailto:support@fastserve.com" className="text-gray-600 text-sm hover:text-[#bc4749]">support@fastserve.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#81b29a] text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
            <p className="text-sm mb-4">For urgent issues requiring immediate attention</p>
            <p className="font-bold text-lg mb-2">24/7 Hotline</p>
            <a href="tel:5559113278" className="block text-2xl font-bold mb-4 hover:underline">(555) 911-FAST</a>
            <p className="text-xs opacity-90">For POS failures, security issues, or critical incidents</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Department Direct Lines</h3>
            <div className="space-y-3 text-sm">
              {[
                { dept: 'Operations', ext: 'Ext. 201', tel: '5551002201' },
                { dept: 'Training', ext: 'Ext. 202', tel: '5551002202' },
                { dept: 'Marketing', ext: 'Ext. 203', tel: '5551002203' },
                { dept: 'IT Support', ext: 'Ext. 204', tel: '5551002204' },
                { dept: 'Compliance', ext: 'Ext. 205', tel: '5551002205' }
              ].map(({ dept, ext, tel }) => (
                <a
                  key={dept}
                  href={`tel:${tel}`}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-[#bc4749] hover:text-white transition-colors"
                >
                  <span className="font-semibold">{dept}</span>
                  <span className="flex items-center gap-2">{ext}<Phone className="w-3 h-3" /></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ----------------------------------------------------------- footer --- */
  const renderFooter = () => (
    <footer className="bg-[#bc4749] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <button onClick={() => go('home')} className="flex items-center gap-2 mb-4">
              <Store className="w-8 h-8 text-[#f2cc8f]" />
              <span className="text-xl font-bold">FastServe</span>
            </button>
            <p className="text-gray-300 text-sm">
              Enterprise franchise management platform serving {NETWORK_LOCATION_COUNT}+ locations nationwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Franchisees</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => go('franchise-portal')} className="hover:text-white">Owner Portal</button></li>
              <li><button onClick={() => go('training')} className="hover:text-white">Training</button></li>
              <li><button onClick={() => go('resources')} className="hover:text-white">Resources</button></li>
              <li><button onClick={() => setSupportOpen(true)} className="hover:text-white">Support</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Corporate</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button onClick={() => go('admin')} className="hover:text-white">Network Overview</button></li>
              <li><button onClick={() => { setUserRole('corporate'); go('admin'); }} className="hover:text-white">Compliance</button></li>
              <li><button onClick={() => go('marketing')} className="hover:text-white">Marketing</button></li>
              <li><button onClick={() => go('reporting')} className="hover:text-white">Analytics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="tel:5551002000" className="hover:text-white">(555) 100-2000</a></li>
              <li><a href="mailto:support@fastserve.com" className="hover:text-white">support@fastserve.com</a></li>
              <li><a href="tel:5559113278" className="hover:text-white">24/7 Emergency: (555) 911-FAST</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#a33f41] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 FastServe Franchise Network. All rights reserved.</p>
          <p className="mt-2">Enterprise Platform Demo: $7,500 Tier</p>
        </div>
      </div>
    </footer>
  );

  /* ----------------------------------------------------------- render --- */
  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'locations' && renderLocations()}
        {currentPage === 'franchise-portal' && renderPortal()}
        {currentPage === 'admin' && renderAdmin()}
        {currentPage === 'inventory' && renderInventory()}
        {currentPage === 'reporting' && renderReporting()}
        {currentPage === 'training' && renderTraining()}
        {currentPage === 'marketing' && renderMarketing()}
        {currentPage === 'resources' && renderResources()}
        {currentPage === 'contact' && renderContact()}
      </main>
      {renderFooter()}

      {/* ---------------------------------------------------- info modal -- */}
      {infoModal && (
        <Modal
          title={infoModal.title}
          subtitle={infoModal.subtitle}
          icon={BarChart3}
          onClose={() => setInfoModal(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              {infoModal.action && (
                <button
                  onClick={infoModal.action.run}
                  className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
                >
                  {infoModal.action.label}
                </button>
              )}
              <button
                onClick={() => setInfoModal(null)}
                className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          }
        >
          {infoModal.stats && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {infoModal.stats.map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[#bc4749]">{s.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {infoModal.sections?.map((section) => (
            <div key={section.heading} className="mb-5">
              <h4 className="font-bold text-gray-800 mb-2">{section.heading}</h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
                {section.rows.map((row, i) => (
                  <div key={`${row.label}-${i}`} className="flex items-start justify-between gap-4 px-3 py-2">
                    <span className="text-sm text-gray-700">{row.label}</span>
                    {row.value && <span className="text-sm font-semibold text-[#bc4749] whitespace-nowrap">{row.value}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {infoModal.notes?.map((note) => (
            <p key={note} className="text-xs text-gray-500 mt-2">{note}</p>
          ))}
        </Modal>
      )}

      {/* ------------------------------------------------ location detail -- */}
      {locationDetail && (
        <Modal
          title={locationDetail.name}
          subtitle={`Owner ${locationDetail.owner} -- opened ${new Date(locationDetail.openDate).toLocaleDateString()}`}
          icon={Store}
          wide
          onClose={() => setLocationDetail(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => { setSelectedLocation(locationDetail.id); setLocationDetail(null); go('inventory'); }}
                className="border-2 border-[#bc4749] text-[#bc4749] px-5 py-2 rounded-lg font-semibold hover:bg-[#bc4749] hover:text-white transition-colors"
              >
                Inventory for this store
              </button>
              <button
                onClick={() => { const loc = locationDetail; setLocationDetail(null); setContactLocation(loc); }}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
              >
                Message the owner
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Monthly revenue', value: compactMoney(locationDetail.revenue) },
              { label: 'Compliance', value: `${locationDetail.compliance}%` },
              { label: 'Employees', value: String(locationDetail.employees) },
              { label: 'Status', value: locationDetail.status }
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-[#bc4749]">{s.value}</p>
                <p className="text-xs text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-gray-800 mb-2">Six month revenue trend</h4>
          <div className="flex items-end gap-2 h-32 mb-6">
            {Array.from({ length: 6 }, (_, i) => {
              const v = locationDetail.revenue * (0.82 + seededUnit(i, Number(locationDetail.id)) * 0.36);
              const max = locationDetail.revenue * 1.18 || 1;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center h-full" title={money(v)}>
                  <span className="text-[10px] text-gray-500 mb-1">{compactMoney(v)}</span>
                  <span className="w-full bg-[#81b29a] rounded-t" style={{ height: `${Math.max((v / max) * 100, 4)}%` }} />
                  <span className="text-[10px] text-gray-500 mt-1">{['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Store record</h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg text-sm">
                <p className="px-3 py-2 flex justify-between gap-3"><span className="text-gray-600">Address</span><span className="text-right text-gray-800">{locationDetail.address}</span></p>
                <p className="px-3 py-2 flex justify-between gap-3"><span className="text-gray-600">Phone</span><a href={`tel:${locationDetail.phone.replace(/[^0-9]/g, '')}`} className="font-semibold text-[#bc4749] hover:underline">{locationDetail.phone}</a></p>
                <p className="px-3 py-2 flex justify-between gap-3"><span className="text-gray-600">Avg ticket</span><span className="font-semibold text-gray-800">${AVG_TICKET.toFixed(2)}</span></p>
                <p className="px-3 py-2 flex justify-between gap-3"><span className="text-gray-600">Monthly orders</span><span className="font-semibold text-gray-800">{Math.round(locationDetail.revenue / AVG_TICKET).toLocaleString()}</span></p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Recent activity</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />Self audit submitted, score {locationDetail.compliance}%</li>
                <li className="flex items-start gap-2"><Truck className="w-4 h-4 text-[#81b29a] mt-0.5 flex-shrink-0" />Weekly produce delivery received on time</li>
                <li className="flex items-start gap-2"><GraduationCap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />{Math.max(1, Math.round(locationDetail.employees * 0.4))} crew completed a mandatory module</li>
                <li className="flex items-start gap-2"><Megaphone className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />Summer campaign assets pulled for local use</li>
              </ul>
            </div>
          </div>

          {userRole === 'corporate' && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const next: Location['status'] = locationDetail.status === 'active' ? 'pending' : 'active';
                  setLocations((prev) => prev.map((l) => (l.id === locationDetail.id ? { ...l, status: next } : l)));
                  setLocationDetail({ ...locationDetail, status: next });
                  notify(`${locationDetail.name} marked ${next}`, next === 'active' ? 'success' : 'warn');
                }}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-700 hover:border-[#bc4749] hover:text-[#bc4749] transition-colors"
              >
                {locationDetail.status === 'active' ? 'Mark as pending' : 'Mark as active'}
              </button>
              <button
                onClick={() => {
                  setAudits((prev) => [...prev.filter((a) => a.location !== locationDetail.name), { location: locationDetail.name, date: addDays(14) }]);
                  notify(`Audit scheduled for ${locationDetail.name}`, 'success');
                }}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-700 hover:border-[#bc4749] hover:text-[#bc4749] transition-colors"
              >
                Schedule audit
              </button>
            </div>
          )}
        </Modal>
      )}

      {contactLocation && (
        <LeadFormModal
          title={`Message ${contactLocation.owner}`}
          subtitle={`${contactLocation.name} -- corporate relations desk`}
          serviceLabel={`Location message - ${contactLocation.name}`}
          onClose={() => setContactLocation(null)}
          onSend={postLead}
          onSent={() => notify(`Message sent to ${contactLocation.owner}`, 'success')}
        />
      )}

      {supportOpen && (
        <LeadFormModal
          title="Contact Support"
          subtitle="Corporate help desk -- answered within one business day"
          serviceLabel="Support ticket"
          onClose={() => setSupportOpen(false)}
          onSend={postLead}
          onSent={() => notify('Support ticket created. Reference sent to your email.', 'success')}
        />
      )}

      {addLocationOpen && (
        <AddLocationModal
          onClose={() => setAddLocationOpen(false)}
          onSave={(loc) => {
            setLocations((prev) => [...prev, loc]);
            setAddLocationOpen(false);
            notify(`${loc.name} added to the network as pending`, 'success');
          }}
        />
      )}

      {/* --------------------------------------------------- inventory ---- */}
      {reorderItem && (
        <Modal
          title={`Reorder ${reorderItem.name}`}
          subtitle={`${reorderItem.sku} -- ${reorderItem.supplier}`}
          icon={ShoppingCart}
          onClose={() => setReorderItem(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button onClick={() => setReorderItem(null)} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={confirmReorder}
                disabled={reorderQty <= 0}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors disabled:opacity-50"
              >
                Place order -- {money(reorderQty * reorderItem.price)}
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[#bc4749]">{reorderItem.stock}</p>
              <p className="text-xs text-gray-600 mt-1">On hand</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[#bc4749]">{reorderItem.minStock}</p>
              <p className="text-xs text-gray-600 mt-1">Par level</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[#bc4749]">${reorderItem.price.toFixed(2)}</p>
              <p className="text-xs text-gray-600 mt-1">Unit cost</p>
            </div>
          </div>

          <Field label="Quantity to order">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setReorderQty((q) => Math.max(0, q - 25))}
                aria-label="Decrease quantity"
                className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min={0}
                value={reorderQty}
                onChange={(e) => setReorderQty(Math.max(0, Number(e.target.value)))}
                className={`${inputClass} text-center font-bold`}
              />
              <button
                onClick={() => setReorderQty((q) => q + 25)}
                aria-label="Increase quantity"
                className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </Field>

          <div className="mt-5 bg-[#f2cc8f]/25 rounded-lg p-4 text-sm text-gray-700 space-y-1">
            <p className="flex justify-between"><span>Destination</span><span className="font-semibold">{selectedLocation === 'all' ? 'Network warehouse' : locations.find((l) => l.id === selectedLocation)?.name}</span></p>
            <p className="flex justify-between"><span>Estimated delivery</span><span className="font-semibold">{addDays(3)}</span></p>
            <p className="flex justify-between"><span>Order total</span><span className="font-semibold">{money(reorderQty * reorderItem.price)}</span></p>
            <p className="text-xs text-gray-600 pt-2">Simulated purchase order for this demo. No supplier is contacted and nothing is charged.</p>
          </div>
        </Modal>
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={(updated) => {
            setInventory((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
            setEditItem(null);
            notify(`${updated.name} updated`, 'success');
          }}
          onDelete={(id, name) => {
            setInventory((prev) => prev.filter((i) => i.id !== id));
            setEditItem(null);
            notify(`${name} removed from the catalog`, 'warn');
          }}
        />
      )}

      {newItemOpen && (
        <NewItemModal
          onClose={() => setNewItemOpen(false)}
          onSave={(item) => {
            setInventory((prev) => [...prev, item]);
            setNewItemOpen(false);
            notify(`${item.name} added to inventory`, 'success');
          }}
        />
      )}

      {bulkImportOpen && (
        <BulkImportModal
          onClose={() => setBulkImportOpen(false)}
          onImport={(items) => {
            setInventory((prev) => [...prev, ...items]);
            setBulkImportOpen(false);
            notify(`${items.length} SKUs imported`, 'success');
          }}
        />
      )}

      {exportOpen && (
        <ExportModal
          rangeLabel={range.label}
          onClose={() => setExportOpen(false)}
          onExport={(format, scope) => {
            const content = buildExport(format, scope);
            const name = `fastserve-${scope}-${dateRange}.${format}`;
            downloadFile(name, content, format === 'json' ? 'application/json' : 'text/csv;charset=utf-8');
            setExportOpen(false);
            notify(`${name} downloaded`, 'success');
          }}
        />
      )}

      {/* ---------------------------------------------------- training ---- */}
      {activeModule && (() => {
        const done = moduleProgress[activeModule.id] || [];
        const allDone = done.length >= activeModule.lessons.length;
        return (
          <Modal
            title={activeModule.title}
            subtitle={`${activeModule.category} -- ${activeModule.duration} -- ${activeModule.lessons.length} lessons`}
            icon={GraduationCap}
            onClose={() => setActiveModule(null)}
            footer={
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => {
                    setModuleProgress((prev) => ({ ...prev, [activeModule.id]: [] }));
                    notify(`${activeModule.title} progress reset`, 'warn');
                  }}
                  className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Reset progress
                </button>
                <button
                  onClick={() => {
                    setModuleProgress((prev) => ({ ...prev, [activeModule.id]: [...activeModule.lessons] }));
                    setActiveModule(null);
                    notify(`${activeModule.title} completed. Certificate issued.`, 'success');
                  }}
                  disabled={allDone}
                  className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors disabled:opacity-50"
                >
                  {allDone ? 'Module complete' : 'Mark module complete'}
                </button>
              </div>
            }
          >
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Your progress</span>
                <span className="text-sm font-bold text-[#bc4749]">{done.length}/{activeModule.lessons.length} lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-[#81b29a] transition-all"
                  style={{ width: `${(done.length / Math.max(activeModule.lessons.length, 1)) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="font-bold text-gray-800 mb-2">Lessons</h4>
            <div className="space-y-2">
              {activeModule.lessons.map((lesson, idx) => {
                const complete = done.includes(lesson);
                return (
                  <button
                    key={lesson}
                    onClick={() => toggleLesson(activeModule.id, lesson)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors ${
                      complete ? 'border-[#81b29a] bg-[#81b29a]/10' : 'border-gray-200 hover:border-[#bc4749]'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      complete ? 'bg-[#81b29a] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {complete ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                    </span>
                    <span className="flex-1">
                      <span className={`block font-semibold ${complete ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{lesson}</span>
                      <span className="block text-xs text-gray-500">
                        {complete ? 'Completed' : `About ${Math.max(4, Math.round(parseInt(activeModule.duration, 10) / activeModule.lessons.length))} min`}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {activeModule.mandatory && (
              <p className="text-xs text-gray-500 mt-4">
                Mandatory module. Completion is reported to corporate compliance and counts toward the location score.
              </p>
            )}
          </Modal>
        );
      })()}

      {createModuleOpen && (
        <CreateModuleModal
          onClose={() => setCreateModuleOpen(false)}
          onSave={(mod) => {
            setModules((prev) => [...prev, mod]);
            setCreateModuleOpen(false);
            setTrainingCategory('all');
            notify(`${mod.title} published to the network`, 'success');
          }}
        />
      )}

      {/* -------------------------------------------- document previews ---- */}
      {docPreview && (
        <Modal
          title={docPreview.title}
          subtitle={docPreview.meta}
          icon={FileText}
          onClose={() => setDocPreview(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setDocPreview(null)}
                className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => toggleDownload(docPreview.id, docPreview.filename, docPreview.content)}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download copy
              </button>
            </div>
          }
        >
          <div className="space-y-3 text-gray-700">
            {docPreview.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Modal>
      )}

      {assetPreview && (
        <Modal
          title={assetPreview.title}
          subtitle={`${assetPreview.type} -- ${assetPreview.format} -- ${assetPreview.size}`}
          icon={Megaphone}
          onClose={() => setAssetPreview(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setAssetPreview(null)}
                className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => toggleDownload(
                  assetPreview.id,
                  `${assetPreview.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-spec.txt`,
                  `FastServe Marketing Asset\n${assetPreview.title}\nType: ${assetPreview.type}\nFormat: ${assetPreview.format}\nSize: ${assetPreview.size}\nUpdated: ${assetPreview.updated}\n\n${assetPreview.desc}\n`
                )}
                className="bg-[#81b29a] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6fa085] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          }
        >
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-5">
            {assetPreview.type === 'Video' ? <Video className="w-16 h-16 text-gray-400" /> :
             assetPreview.type === 'Print' ? <FileText className="w-16 h-16 text-gray-400" /> :
             <Megaphone className="w-16 h-16 text-gray-400" />}
          </div>
          <p className="text-gray-700 mb-4">{assetPreview.desc}</p>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg text-sm">
            <p className="px-3 py-2 flex justify-between"><span className="text-gray-600">Last updated</span><span className="font-semibold text-gray-800">{assetPreview.updated}</span></p>
            <p className="px-3 py-2 flex justify-between"><span className="text-gray-600">Delivered format</span><span className="font-semibold text-gray-800">{assetPreview.format}</span></p>
            <p className="px-3 py-2 flex justify-between"><span className="text-gray-600">Local edits allowed</span><span className="font-semibold text-gray-800">Marked layers only</span></p>
          </div>
        </Modal>
      )}

      {/* ---------------------------------------------------- campaigns ---- */}
      {campaignDetail && (
        <CampaignModal
          campaign={campaignDetail}
          onClose={() => setCampaignDetail(null)}
          onSave={(updated) => {
            setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setCampaignDetail(null);
            notify(`${updated.name} saved`, 'success');
          }}
          onDuplicate={(campaign) => {
            const copy: Campaign = { ...campaign, id: `c${Date.now()}`, name: `${campaign.name} (copy)`, status: 'Scheduled', reach: 0, engagement: 0 };
            setCampaigns((prev) => [...prev, copy]);
            setCampaignDetail(null);
            notify(`${copy.name} created as a scheduled campaign`, 'success');
          }}
          onDelete={(campaign) => {
            setCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
            setCampaignDetail(null);
            notify(`${campaign.name} archived`, 'warn');
          }}
        />
      )}

      {newCampaignOpen && (
        <NewCampaignModal
          onClose={() => setNewCampaignOpen(false)}
          onSave={(campaign) => {
            setCampaigns((prev) => [...prev, campaign]);
            setNewCampaignOpen(false);
            notify(`${campaign.name} scheduled`, 'success');
          }}
        />
      )}

      {/* ------------------------------------------------ portal actions ---- */}
      {portalAction === 'supplies' && (
        <Modal
          title="Order Supplies"
          subtitle="Items below par level are prefilled with a suggested quantity"
          icon={Package}
          wide
          onClose={() => setPortalAction(null)}
          footer={
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <span className="font-semibold text-gray-700">
                Order total {money(Object.entries(supplyDraft).reduce((sum, [id, qty]) => {
                  const item = inventory.find((i) => i.id === id);
                  return sum + (item ? item.price * qty : 0);
                }, 0))}
              </span>
              <span className="flex gap-3">
                <button onClick={() => setPortalAction(null)} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const entries = Object.entries(supplyDraft).filter(([, qty]) => qty > 0);
                    if (entries.length === 0) { notify('Add at least one item to the order', 'warn'); return; }
                    const orders: SupplyOrder[] = entries.map(([id, qty], idx) => {
                      const item = inventory.find((i) => i.id === id);
                      return {
                        id: `PO-${Math.floor(1000 + seededUnit(supplyOrders.length + idx + 1, 5) * 8999)}`,
                        itemId: id,
                        itemName: item ? item.name : 'Item',
                        qty,
                        cost: item ? item.price * qty : 0,
                        supplier: item ? item.supplier : 'Corporate warehouse',
                        destination: 'My location',
                        placed: todayStamp(),
                        eta: addDays(3),
                        status: 'in-transit'
                      };
                    });
                    setSupplyOrders((prev) => [...orders, ...prev]);
                    setPortalAction(null);
                    notify(`${orders.length} purchase order${orders.length > 1 ? 's' : ''} submitted`, 'success');
                  }}
                  className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
                >
                  Submit order
                </button>
              </span>
            </div>
          }
        >
          <div className="space-y-3">
            {inventory.map((item) => {
              const qty = supplyDraft[item.id] || 0;
              const low = item.stock < item.minStock;
              return (
                <div key={item.id} className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border-2 ${low ? 'border-red-200 bg-red-50/50' : 'border-gray-200'}`}>
                  <div className="min-w-[180px]">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.sku} - {item.stock} on hand / {item.minStock} par - ${item.price.toFixed(2)} each
                      {low && <span className="text-red-600 font-semibold"> - below par</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSupplyDraft((d) => ({ ...d, [item.id]: Math.max(0, (d[item.id] || 0) - 25) }))}
                      aria-label={`Decrease ${item.name}`}
                      className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={0}
                      aria-label={`Quantity for ${item.name}`}
                      value={qty}
                      onChange={(e) => setSupplyDraft((d) => ({ ...d, [item.id]: Math.max(0, Number(e.target.value)) }))}
                      className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-center font-bold"
                    />
                    <button
                      onClick={() => setSupplyDraft((d) => ({ ...d, [item.id]: (d[item.id] || 0) + 25 }))}
                      aria-label={`Increase ${item.name}`}
                      className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="w-20 text-right font-semibold text-[#bc4749]">{money(qty * item.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Simulated ordering for this demo. Submitted orders appear in the portal and in Inventory where you can mark them received.
          </p>
        </Modal>
      )}

      {portalAction === 'report' && (
        <SubmitReportModal
          locations={locations}
          onClose={() => setPortalAction(null)}
          onSubmit={(report) => {
            setFieldReports((prev) => [report, ...prev]);
            setPortalAction(null);
            notify(`${report.type} submitted as ${report.id}`, 'success');
          }}
        />
      )}

      {portalAction === 'staff' && (
        <Modal
          title="Schedule Staff"
          subtitle="Assignments save to this browser and drive the Staff on Duty tile"
          icon={Calendar}
          onClose={() => setPortalAction(null)}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-semibold text-gray-700">{staffOnDuty} of {STAFF_ROSTER.length} scheduled</span>
              <span className="flex gap-3">
                <button
                  onClick={() => { setSchedule(DEFAULT_SCHEDULE); notify('Schedule reset to the default rotation', 'info'); }}
                  className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Reset rotation
                </button>
                <button
                  onClick={() => { setPortalAction(null); notify('Shift schedule published to the crew app', 'success'); }}
                  className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Publish schedule
                </button>
              </span>
            </div>
          }
        >
          <div className="space-y-2">
            {STAFF_ROSTER.map((name) => (
              <div key={name} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  <UserCheck className={`w-4 h-4 ${(schedule[name] || 'Off') === 'Off' ? 'text-gray-400' : 'text-[#81b29a]'}`} />
                  {name}
                </span>
                <select
                  aria-label={`Shift for ${name}`}
                  value={schedule[name] || 'Off'}
                  onChange={(e) => setSchedule({ ...schedule, [name]: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-[#bc4749]"
                >
                  {SHIFTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {portalAction === 'support' && (
        <LeadFormModal
          title="Contact Support"
          subtitle="Operations help desk -- answered within one business day"
          serviceLabel="Owner portal support request"
          onClose={() => setPortalAction(null)}
          onSend={postLead}
          onSent={() => notify('Support request sent to corporate', 'success')}
        />
      )}

      {/* ------------------------------------------------- admin panels ---- */}
      {adminPanel === 'users' && (
        <UserManagementModal
          users={users}
          locations={locations}
          onClose={() => setAdminPanel(null)}
          onChange={(next, message) => { setUsers(next); notify(message, 'success'); }}
        />
      )}

      {adminPanel === 'roles' && (
        <Modal
          title="Role Permissions"
          subtitle="Toggle what each role can do across the network"
          icon={Shield}
          wide
          onClose={() => setAdminPanel(null)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => { setPermissions(DEFAULT_PERMISSIONS); notify('Permissions restored to defaults', 'info'); }}
                className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Restore defaults
              </button>
              <button
                onClick={() => { setAdminPanel(null); notify('Role permissions saved', 'success'); }}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
              >
                Save permissions
              </button>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Permission</th>
                  {Object.keys(permissions).map((role) => (
                    <th key={role} className="px-3 py-2 text-center font-semibold text-gray-700 capitalize">{role.replace('-', ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PERMISSION_KEYS.map((perm) => (
                  <tr key={perm}>
                    <td className="px-3 py-2 text-gray-700">{perm}</td>
                    {Object.keys(permissions).map((role) => {
                      const on = permissions[role].includes(perm);
                      return (
                        <td key={role} className="px-3 py-2 text-center">
                          <button
                            onClick={() => setPermissions({
                              ...permissions,
                              [role]: on ? permissions[role].filter((p) => p !== perm) : [...permissions[role], perm]
                            })}
                            aria-label={`${on ? 'Remove' : 'Grant'} ${perm} for ${role}`}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              on ? 'bg-[#81b29a] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            {on ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      {adminPanel === 'config' && (
        <Modal
          title="System Config"
          subtitle="Network wide switches for this demo environment"
          icon={Settings}
          onClose={() => setAdminPanel(null)}
          footer={
            <div className="flex justify-end">
              <button
                onClick={() => { setAdminPanel(null); notify('System configuration saved', 'success'); }}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
              >
                Save configuration
              </button>
            </div>
          }
        >
          <div className="space-y-1">
            <Toggle
              label="Maintenance mode"
              description="Shows a maintenance banner on the owner portal during releases"
              checked={settings.maintenanceMode}
              onChange={(v) => setSettings({ ...settings, maintenanceMode: v })}
            />
            <Toggle
              label="Suggested reorder quantity"
              description="Prefill purchase orders to twice the par level"
              checked={settings.autoReorder}
              onChange={(v) => setSettings({ ...settings, autoReorder: v })}
            />
            <Toggle
              label="Nightly backup"
              description="Snapshot the transaction warehouse at 2:00am EST"
              checked={settings.nightlyBackup}
              onChange={(v) => setSettings({ ...settings, nightlyBackup: v })}
            />
            <Toggle
              label="Compact tables"
              description="Tighter row height on inventory and reports"
              checked={settings.compactTables}
              onChange={(v) => setSettings({ ...settings, compactTables: v })}
            />
            <Toggle
              label="Highlight low stock"
              description="Tint inventory rows that fall under par level"
              checked={settings.highlightLowStock}
              onChange={(v) => setSettings({ ...settings, highlightLowStock: v })}
            />
          </div>
          {settings.maintenanceMode && (
            <p className="mt-4 flex items-start gap-2 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              Maintenance mode is on. Owners see a banner and write actions are queued until you turn it off.
            </p>
          )}
        </Modal>
      )}

      {/* ---------------------------------------------------------- faq ---- */}
      {faqOpen && (
        <Modal
          title="Frequently Asked Questions"
          subtitle="The questions owners ask corporate most often"
          icon={MessageSquare}
          onClose={() => setFaqOpen(false)}
          footer={
            <div className="flex flex-wrap gap-3 justify-end">
              <button onClick={() => setFaqOpen(false)} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                Close
              </button>
              <button
                onClick={() => { setFaqOpen(false); setSupportOpen(true); }}
                className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
              >
                Still need help
              </button>
            </div>
          }
        >
          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <div key={faq.q} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#bc4749] flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && <p className="px-4 pb-4 text-gray-700 text-sm">{faq.a}</p>}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* -------------------------------------------------------- toast ---- */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[80] max-w-sm">
          <div className={`flex items-start gap-3 rounded-lg shadow-2xl px-4 py-3 text-white ${
            toast.tone === 'success' ? 'bg-[#81b29a]' : toast.tone === 'warn' ? 'bg-[#bc4749]' : 'bg-gray-800'
          }`}>
            {toast.tone === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
            <p className="text-sm font-semibold flex-1">{toast.message}</p>
            <button onClick={() => setToast(null)} aria-label="Dismiss" className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FastServeFranchiseNetwork;

/* ------------------------------------------------------ modal components -- */

function LeadFormModal({ title, subtitle, serviceLabel, onClose, onSend, onSent }: {
  title: string;
  subtitle: string;
  serviceLabel: string;
  onClose: () => void;
  onSend: (payload: { clientName: string; clientEmail: string; clientPhone?: string; service: string; notes: string }) => Promise<boolean>;
  onSent: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const ok = await onSend({
        clientName: form.name,
        clientEmail: form.email,
        clientPhone: form.phone,
        service: serviceLabel,
        notes: form.message
      });
      if (ok) {
        setSent(true);
        onSent();
      } else {
        setError('We could not deliver that message. Please try again in a moment.');
      }
    } catch {
      setError('Network issue reaching corporate. Please try again in a moment.');
    }
    setSending(false);
  };

  return (
    <Modal title={title} subtitle={subtitle} icon={MessageSquare} onClose={onClose}>
      {sent ? (
        <div className="text-center py-8">
          <CheckCircle className="w-14 h-14 text-[#81b29a] mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-900">Message sent</p>
          <p className="text-gray-600 mt-2">You will get a reply within one business day.</p>
          <button onClick={onClose} className="mt-6 bg-[#bc4749] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Your name">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="John Smith"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              placeholder="your@email.com"
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              placeholder="(555) 123-4567"
            />
          </Field>
          <Field label="How can we help?">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
              placeholder="Describe the issue or question"
            />
          </Field>
          {error && (
            <p className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#bc4749] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#a33f41] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Send className="w-4 h-4" />
            {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}
    </Modal>
  );
}

function AddLocationModal({ onClose, onSave }: { onClose: () => void; onSave: (loc: Location) => void }) {
  const [form, setForm] = useState({
    name: '', owner: '', address: '', phone: '', employees: '8', openDate: addDays(60)
  });

  return (
    <Modal
      title="Add Location"
      subtitle="New stores join the network in pending status until the build-out passes inspection"
      icon={Building2}
      onClose={onClose}
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            id: `loc-${Date.now()}`,
            name: form.name.startsWith('FastServe') ? form.name : `FastServe ${form.name}`,
            owner: form.owner,
            address: form.address,
            phone: form.phone || '(555) 000-0000',
            status: 'pending',
            revenue: 0,
            compliance: 85,
            employees: Math.max(1, Number(form.employees) || 1),
            openDate: form.openDate
          });
        }}
      >
        <Field label="Store name">
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Riverfront" />
        </Field>
        <Field label="Franchise owner">
          <input type="text" required value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className={inputClass} placeholder="Taylor Reed" />
        </Field>
        <Field label="Address">
          <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="900 River Rd, Denver, CO 80211" />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Phone">
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(555) 678-9012" />
          </Field>
          <Field label="Planned headcount">
            <input type="number" min={1} value={form.employees} onChange={(e) => setForm({ ...form, employees: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Target open date">
            <input type="date" value={form.openDate} onChange={(e) => setForm({ ...form, openDate: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Add to network
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EditItemModal({ item, onClose, onSave, onDelete }: {
  item: InventoryItem;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const [form, setForm] = useState({
    name: item.name,
    minStock: String(item.minStock),
    stock: String(item.stock),
    price: String(item.price),
    supplier: item.supplier,
    category: item.category
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Modal title={`Edit ${item.name}`} subtitle={`${item.sku} -- last ordered ${item.lastOrdered}`} icon={Settings} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...item,
            name: form.name,
            category: form.category,
            supplier: form.supplier,
            stock: Math.max(0, Number(form.stock) || 0),
            minStock: Math.max(1, Number(form.minStock) || 1),
            price: Math.max(0, Number(form.price) || 0)
          });
        }}
      >
        <Field label="Item name">
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="On hand">
            <input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Par level">
            <input type="number" min={1} value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Unit price">
            <input type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {['Beverages', 'Packaging', 'Produce', 'Supplies'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Supplier">
            <input type="text" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className={inputClass} />
          </Field>
        </div>

        <div className="flex flex-wrap gap-3 justify-between pt-2">
          {confirmDelete ? (
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onDelete(item.id, item.name)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Confirm delete
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="text-sm font-semibold text-gray-600 hover:underline">
                Keep item
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete item
            </button>
          )}
          <span className="flex gap-3">
            <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </span>
        </div>
      </form>
    </Modal>
  );
}

function NewItemModal({ onClose, onSave }: { onClose: () => void; onSave: (item: InventoryItem) => void }) {
  const [form, setForm] = useState({
    name: '', sku: '', category: 'Beverages', stock: '100', minStock: '50', price: '1.00', supplier: ''
  });

  return (
    <Modal title="Add Inventory Item" subtitle="New SKUs sync to every location on the next nightly push" icon={Plus} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            id: `item-${Date.now()}`,
            name: form.name,
            sku: form.sku || `NEW-${Math.floor(100 + Math.random() * 899)}`,
            category: form.category,
            stock: Math.max(0, Number(form.stock) || 0),
            minStock: Math.max(1, Number(form.minStock) || 1),
            price: Math.max(0, Number(form.price) || 0),
            supplier: form.supplier || 'Corporate warehouse',
            lastOrdered: todayStamp()
          });
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Item name">
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Oat Milk (Case)" />
          </Field>
          <Field label="SKU">
            <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inputClass} placeholder="BEV-210" />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Opening stock">
            <input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Par level">
            <input type="number" min={1} value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Unit price">
            <input type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {['Beverages', 'Packaging', 'Produce', 'Supplies'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Supplier">
            <input type="text" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className={inputClass} placeholder="Farm Fresh Co" />
          </Field>
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Add item
          </button>
        </div>
      </form>
    </Modal>
  );
}

function BulkImportModal({ onClose, onImport }: { onClose: () => void; onImport: (items: InventoryItem[]) => void }) {
  const sample = [
    'name,sku,category,stock,minStock,price,supplier',
    'Oat Milk (Case),BEV-210,Beverages,180,80,32.50,Premium Roasters Inc',
    'Paper Straws (5000),PKG-140,Packaging,4200,1500,0.02,PackPro Supplies',
    'Roma Tomatoes,PRD-215,Produce,140,90,1.85,Farm Fresh Co'
  ].join('\n');

  const [text, setText] = useState(sample);
  const [error, setError] = useState('');

  const parse = () => {
    const lines = text.trim().split('\n').filter(Boolean);
    if (lines.length < 2) { setError('Add at least one data row under the header line.'); return; }
    const rows = lines.slice(1);
    const items: InventoryItem[] = [];
    for (let i = 0; i < rows.length; i += 1) {
      const cells = rows[i].split(',').map((c) => c.trim());
      if (cells.length < 7 || !cells[0]) {
        setError(`Row ${i + 1} needs 7 comma separated values: name, sku, category, stock, minStock, price, supplier.`);
        return;
      }
      items.push({
        id: `import-${Date.now()}-${i}`,
        name: cells[0],
        sku: cells[1],
        category: cells[2],
        stock: Math.max(0, Number(cells[3]) || 0),
        minStock: Math.max(1, Number(cells[4]) || 1),
        price: Math.max(0, Number(cells[5]) || 0),
        supplier: cells[6],
        lastOrdered: todayStamp()
      });
    }
    onImport(items);
  };

  return (
    <Modal
      title="Bulk Import"
      subtitle="Paste rows from your supplier catalog, one SKU per line"
      icon={Upload}
      wide
      onClose={onClose}
      footer={
        <div className="flex flex-wrap gap-3 justify-end">
          <button onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={parse} className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import rows
          </button>
        </div>
      }
    >
      <Field label="CSV rows">
        <textarea
          rows={9}
          value={text}
          onChange={(e) => { setText(e.target.value); setError(''); }}
          className={`${inputClass} font-mono text-xs`}
          spellCheck={false}
        />
      </Field>
      {error && (
        <p className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-3">
        The sample rows above are ready to import. Edit them or paste your own, then select Import rows to add them to the catalog.
      </p>
    </Modal>
  );
}

function ExportModal({ rangeLabel, onClose, onExport }: {
  rangeLabel: string;
  onClose: () => void;
  onExport: (format: 'csv' | 'json', scope: 'summary' | 'locations' | 'inventory') => void;
}) {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [scope, setScope] = useState<'summary' | 'locations' | 'inventory'>('summary');

  return (
    <Modal
      title="Export Report"
      subtitle={`Data range: ${rangeLabel}`}
      icon={Download}
      onClose={onClose}
      footer={
        <div className="flex flex-wrap gap-3 justify-end">
          <button onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onExport(format, scope)}
            className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download file
          </button>
        </div>
      }
    >
      <Field label="What to include">
        <select value={scope} onChange={(e) => setScope(e.target.value as typeof scope)} className={inputClass}>
          <option value="summary">Network revenue summary</option>
          <option value="locations">Location comparison matrix</option>
          <option value="inventory">Inventory in current view</option>
        </select>
      </Field>
      <div className="mt-4">
        <span className="block text-sm font-semibold text-gray-700 mb-2">File format</span>
        <div className="flex gap-3">
          {(['csv', 'json'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${
                format === f ? 'border-[#bc4749] text-[#bc4749] bg-[#bc4749]/5' : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        The file is generated in your browser from the data on screen and saved straight to your downloads folder.
      </p>
    </Modal>
  );
}

function CreateModuleModal({ onClose, onSave }: { onClose: () => void; onSave: (m: TrainingModule) => void }) {
  const [form, setForm] = useState({
    title: '', category: 'Operations', duration: '45 min', mandatory: true, dueDate: '', lessons: 'Overview\nStep by step walkthrough\nCommon mistakes\nKnowledge check'
  });

  return (
    <Modal title="Create Training Module" subtitle="Published modules appear in the catalog for every location" icon={GraduationCap} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const lessons = form.lessons.split('\n').map((l) => l.trim()).filter(Boolean);
          onSave({
            id: `mod-${Date.now()}`,
            title: form.title,
            category: form.category,
            duration: form.duration,
            completed: 0,
            total: 33,
            mandatory: form.mandatory,
            dueDate: form.dueDate || undefined,
            lessons: lessons.length ? lessons : ['Overview', 'Knowledge check'],
            custom: true
          });
        }}
      >
        <Field label="Module title">
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Drive-Thru Speed Standards" />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {['Compliance', 'Service', 'Technology', 'Operations', 'Management'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Duration">
            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={inputClass} placeholder="45 min" />
          </Field>
          <Field label="Due date (optional)">
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <Field label="Lessons, one per line">
          <textarea rows={5} value={form.lessons} onChange={(e) => setForm({ ...form, lessons: e.target.value })} className={inputClass} />
        </Field>
        <Toggle
          label="Mandatory module"
          description="Counts toward certification and the location compliance score"
          checked={form.mandatory}
          onChange={(v) => setForm({ ...form, mandatory: v })}
        />
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Publish module
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CampaignModal({ campaign, onClose, onSave, onDuplicate, onDelete }: {
  campaign: Campaign;
  onClose: () => void;
  onSave: (c: Campaign) => void;
  onDuplicate: (c: Campaign) => void;
  onDelete: (c: Campaign) => void;
}) {
  const [form, setForm] = useState({
    name: campaign.name,
    status: campaign.status,
    budget: String(campaign.budget),
    channel: campaign.channel
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Modal
      title={`Manage ${campaign.name}`}
      subtitle={`${campaign.channel} -- ${campaign.status}`}
      icon={Megaphone}
      wide
      onClose={onClose}
    >
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Reach', value: campaign.reach.toLocaleString() },
          { label: 'Engagement', value: `${campaign.engagement}%` },
          { label: 'Cost per 1K reach', value: campaign.reach ? money((campaign.budget / campaign.reach) * 1000) : 'n/a' }
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-[#bc4749]">{s.value}</p>
            <p className="text-xs text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h4 className="font-bold text-gray-800 mb-2">Weekly reach</h4>
      <div className="flex items-end gap-2 h-28 mb-6">
        {Array.from({ length: 8 }, (_, i) => {
          const v = campaign.reach ? campaign.reach * (0.06 + seededUnit(i, campaign.name.length) * 0.12) : 0;
          const max = campaign.reach ? campaign.reach * 0.19 : 1;
          return (
            <div key={i} className="flex-1 flex flex-col justify-end items-center h-full" title={`Week ${i + 1}: ${Math.round(v).toLocaleString()}`}>
              <span className="w-full bg-[#81b29a] rounded-t" style={{ height: `${Math.max((v / max) * 100, 3)}%` }} />
              <span className="text-[10px] text-gray-500 mt-1">W{i + 1}</span>
            </div>
          );
        })}
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...campaign,
            name: form.name,
            status: form.status,
            channel: form.channel,
            budget: Math.max(0, Number(form.budget) || 0)
          });
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Campaign name">
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Channel">
            <input type="text" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Campaign['status'] })} className={inputClass}>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </Field>
          <Field label="Budget">
            <input type="number" min={0} step="100" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass} />
          </Field>
        </div>

        <div className="flex flex-wrap gap-3 justify-between pt-2">
          {confirmDelete ? (
            <span className="flex items-center gap-2">
              <button type="button" onClick={() => onDelete(campaign)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Confirm archive
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="text-sm font-semibold text-gray-600 hover:underline">
                Keep campaign
              </button>
            </span>
          ) : (
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => onDuplicate(campaign)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-600 hover:border-[#bc4749] hover:text-[#bc4749] transition-colors"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Archive
              </button>
            </span>
          )}
          <span className="flex gap-3">
            <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </span>
        </div>
      </form>
    </Modal>
  );
}

function NewCampaignModal({ onClose, onSave }: { onClose: () => void; onSave: (c: Campaign) => void }) {
  const [form, setForm] = useState({ name: '', channel: 'Social + In-store', budget: '2500' });

  return (
    <Modal title="New Campaign" subtitle="Campaigns start scheduled and begin reporting once activated" icon={Megaphone} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            id: `c${Date.now()}`,
            name: form.name,
            status: 'Scheduled',
            reach: 0,
            engagement: 0,
            budget: Math.max(0, Number(form.budget) || 0),
            channel: form.channel
          });
        }}
      >
        <Field label="Campaign name">
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Fall Soup Season" />
        </Field>
        <Field label="Channel mix">
          <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className={inputClass}>
            {['Social + In-store', 'Email + Mobile app', 'Local radio + Social', 'Direct mail', 'Paid search'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <input type="number" min={0} step="100" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass} />
        </Field>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Schedule campaign
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SubmitReportModal({ locations, onClose, onSubmit }: {
  locations: Location[];
  onClose: () => void;
  onSubmit: (r: FieldReport) => void;
}) {
  const [form, setForm] = useState({
    type: 'Weekly Sales Report',
    period: 'Week ending ' + todayStamp(),
    location: locations[0] ? locations[0].name : 'My location',
    sales: '',
    notes: ''
  });

  return (
    <Modal title="Submit Report" subtitle="Reports route to the operations desk and appear in your portal" icon={ClipboardCheck} onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            id: `RPT-${Math.floor(1000 + Math.random() * 8999)}`,
            type: form.type,
            period: form.period,
            location: form.location,
            sales: form.sales,
            notes: form.notes,
            submitted: todayStamp()
          });
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Report type">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
              {['Weekly Sales Report', 'Daily Cash Reconciliation', 'Waste and Shrink Report', 'Incident Report', 'Self Audit Submission'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass}>
              {locations.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Period covered">
            <input type="text" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Reported sales (optional)">
            <input type="text" value={form.sales} onChange={(e) => setForm({ ...form, sales: e.target.value })} className={inputClass} placeholder="$28,400" />
          </Field>
        </div>
        <Field label="Notes for corporate">
          <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass} placeholder="Anything the operations desk should know" />
        </Field>
        <div className="flex gap-3 justify-end pt-2">
          <button type="button" onClick={onClose} className="border-2 border-gray-200 px-5 py-2 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
            <Send className="w-4 h-4" />
            Submit report
          </button>
        </div>
      </form>
    </Modal>
  );
}

function UserManagementModal({ users, locations, onClose, onChange }: {
  users: NetworkUser[];
  locations: Location[];
  onClose: () => void;
  onChange: (next: NetworkUser[], message: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'manager' as UserRole, location: locations[0] ? locations[0].name : 'Headquarters' });

  return (
    <Modal
      title="User Management"
      subtitle={`${users.filter((u) => u.active).length} active of ${users.length} accounts`}
      icon={Users}
      wide
      onClose={onClose}
      footer={
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={() => setAdding((v) => !v)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-gray-200 font-semibold text-gray-700 hover:border-[#bc4749] hover:text-[#bc4749] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {adding ? 'Close new user form' : 'Add user'}
          </button>
          <button onClick={onClose} className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Done
          </button>
        </div>
      }
    >
      {adding && (
        <form
          className="mb-6 p-4 border-2 border-[#bc4749]/30 rounded-lg space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const user: NetworkUser = {
              id: `u${Date.now()}`,
              name: form.name,
              email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '.')}@fastserve.com`,
              role: form.role,
              location: form.location,
              active: true
            };
            onChange([...users, user], `${user.name} added with the ${user.role.replace('-', ' ')} role`);
            setForm({ name: '', email: '', role: 'manager', location: locations[0] ? locations[0].name : 'Headquarters' });
            setAdding(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full name">
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Jordan Blake" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="j.blake@fastserve.com" />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Role">
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })} className={inputClass}>
                <option value="corporate">Corporate</option>
                <option value="franchise-owner">Franchise owner</option>
                <option value="manager">Manager</option>
              </select>
            </Field>
            <Field label="Location">
              <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass}>
                <option value="Headquarters">Headquarters</option>
                {locations.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
            </Field>
          </div>
          <button type="submit" className="bg-[#bc4749] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Create account
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">User</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Role</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Location</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Status</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className={user.active ? '' : 'opacity-60'}>
                <td className="px-3 py-2">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </td>
                <td className="px-3 py-2">
                  <select
                    aria-label={`Role for ${user.name}`}
                    value={user.role}
                    onChange={(e) => onChange(
                      users.map((u) => (u.id === user.id ? { ...u, role: e.target.value as UserRole } : u)),
                      `${user.name} is now ${e.target.value.replace('-', ' ')}`
                    )}
                    className="px-2 py-1 border border-gray-300 rounded text-xs font-semibold"
                  >
                    <option value="corporate">Corporate</option>
                    <option value="franchise-owner">Franchise owner</option>
                    <option value="manager">Manager</option>
                    <option value="guest">Guest</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-gray-700">{user.location}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {user.active ? 'active' : 'disabled'}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onChange(
                        users.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u)),
                        `${user.name} ${user.active ? 'disabled' : 'reactivated'}`
                      )}
                      className="px-3 py-1 rounded border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {user.active ? 'Disable' : 'Reactivate'}
                    </button>
                    <button
                      onClick={() => onChange(users.filter((u) => u.id !== user.id), `${user.name} removed from the network`)}
                      aria-label={`Remove ${user.name}`}
                      className="px-2 py-1 rounded border border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
