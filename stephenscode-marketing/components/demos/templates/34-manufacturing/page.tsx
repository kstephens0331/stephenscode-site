'use client';

import React, { useState, useEffect } from 'react';
import {
  Factory, Package, Users, TrendingUp, BarChart3, ShoppingBag,
  Truck, Settings, CheckCircle2, AlertTriangle, Clock, Calendar,
  FileText, Download, Upload, Filter, Search, Bell, Menu, X,
  Home, Shield, Activity, Target, Award, Box, Boxes, ClipboardCheck,
  UserCheck, Gauge, Layers, GitBranch, Database, Zap, Phone,
  Mail, MapPin, ChevronRight, ChevronDown, DollarSign, PieChart,
  LineChart, Building, Wrench, HardHat, ListChecks, FileBarChart,
  ShoppingCart, Trash2, Plus, Minus, Pencil
} from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

type Page = 'home' | 'products' | 'b2b-portal' | 'production' | 'inventory' |
            'quality-control' | 'orders' | 'suppliers' | 'analytics' | 'contact';

type UserRole = 'guest' | 'customer' | 'manager' | 'admin';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  moq: number;
  leadTime: string;
  inStock: number;
  image: string;
  specs: string[];
  availability: 'in-stock' | 'made-to-order';
}

interface Order {
  id: string;
  customer: string;
  products: number;
  total: number;
  status: 'pending' | 'production' | 'quality-check' | 'shipping' | 'delivered';
  date: string;
  deliveryDate: string;
}

interface ProductionJob {
  id: string;
  product: string;
  quantity: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  line: string;
  startDate: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface QualityCheck {
  id: string;
  product: string;
  batchNumber: string;
  date: string;
  inspector: string;
  status: 'passed' | 'failed' | 'pending';
  defects: number;
  passed: number;
  total: number;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  orders: number;
  rating: number;
  onTime: number;
  active: boolean;
  contactEmail: string;
  contactPhone: string;
}

interface Approval {
  id: string;
  supplier: string;
  item: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface DemoNotification {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  time: string;
  read: boolean;
}

interface Prefs {
  defaultFacility: string;
  emailAlerts: boolean;
  weeklySummary: boolean;
}

interface CartLine {
  productId: string;
  qty: number;
}

interface CheckoutDetails {
  company: string;
  poNumber: string;
  contact: string;
  deliveryDate: string;
  shipping: 'standard' | 'expedited' | 'white-glove';
  notes: string;
}

interface LineStatus {
  line: string;
  facility: string;
  status: 'Running' | 'Setup' | 'Paused' | 'Maintenance';
  output: string;
  efficiency: string;
  color: string;
}

interface StockItem {
  product: string;
  sku: string;
  location: string;
  current: number;
  min: number;
  status: 'low' | 'critical' | 'out';
}

interface ChecklistItem {
  item: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface ProdAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  time: string;
}

// ---------- Default mock data (module scope) ----------

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Industrial Control Panel TP-3000',
    sku: 'TP-3000-ICP',
    category: 'Control Systems',
    price: 1499.00,
    moq: 10,
    leadTime: '4-6 weeks',
    inStock: 45,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    specs: ['IP65 Rated', '24V DC Input', 'CE Certified', 'Modular Design'],
    availability: 'in-stock'
  },
  {
    id: '2',
    name: 'Heavy-Duty Servo Motor SM-500',
    sku: 'SM-500-HD',
    category: 'Motors & Drives',
    price: 2299.00,
    moq: 5,
    leadTime: '3-4 weeks',
    inStock: 28,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
    specs: ['5000 RPM Max', '10kW Power', 'High Torque', '3-Year Warranty'],
    availability: 'made-to-order'
  },
  {
    id: '3',
    name: 'Precision Gearbox PG-200',
    sku: 'PG-200-PRE',
    category: 'Transmission',
    price: 849.00,
    moq: 20,
    leadTime: '2-3 weeks',
    inStock: 156,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop',
    specs: ['20:1 Ratio', 'Low Backlash', 'Hardened Steel', 'Sealed Bearing'],
    availability: 'in-stock'
  },
  {
    id: '4',
    name: 'Industrial Sensor Array IS-100',
    sku: 'IS-100-ARR',
    category: 'Sensors',
    price: 599.00,
    moq: 50,
    leadTime: '1-2 weeks',
    inStock: 234,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
    specs: ['Multi-Sensor', 'Digital Output', 'Wide Range', 'Compact Design'],
    availability: 'in-stock'
  }
];

const defaultOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'AutoTech Industries',
    products: 3,
    total: 45780,
    status: 'production',
    date: '2024-05-10',
    deliveryDate: '2024-06-15'
  },
  {
    id: 'ORD-2024-002',
    customer: 'MegaCorp Manufacturing',
    products: 5,
    total: 128950,
    status: 'quality-check',
    date: '2024-05-08',
    deliveryDate: '2024-06-10'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Precision Robotics Ltd',
    products: 2,
    total: 34200,
    status: 'shipping',
    date: '2024-05-05',
    deliveryDate: '2024-05-30'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Industrial Solutions Co',
    products: 4,
    total: 67890,
    status: 'pending',
    date: '2024-05-15',
    deliveryDate: '2024-06-20'
  },
  {
    id: 'ORD-2024-005',
    customer: 'AutoTech Industries',
    products: 2,
    total: 28450,
    status: 'delivered',
    date: '2024-04-02',
    deliveryDate: '2024-04-28'
  },
  {
    id: 'ORD-2024-006',
    customer: 'Northline Assembly Group',
    products: 6,
    total: 96300,
    status: 'delivered',
    date: '2024-03-18',
    deliveryDate: '2024-04-15'
  },
  {
    id: 'ORD-2024-007',
    customer: 'Precision Robotics Ltd',
    products: 3,
    total: 51200,
    status: 'production',
    date: '2024-05-11',
    deliveryDate: '2024-06-18'
  },
  {
    id: 'ORD-2024-008',
    customer: 'Cascade Hydraulics',
    products: 1,
    total: 14900,
    status: 'shipping',
    date: '2024-05-07',
    deliveryDate: '2024-05-29'
  },
  {
    id: 'ORD-2024-009',
    customer: 'MegaCorp Manufacturing',
    products: 4,
    total: 74650,
    status: 'delivered',
    date: '2024-03-01',
    deliveryDate: '2024-03-27'
  },
  {
    id: 'ORD-2024-010',
    customer: 'Harbor Point Fabrication',
    products: 2,
    total: 22100,
    status: 'pending',
    date: '2024-05-16',
    deliveryDate: '2024-06-24'
  },
  {
    id: 'ORD-2024-011',
    customer: 'Sterling Machine Works',
    products: 5,
    total: 88400,
    status: 'quality-check',
    date: '2024-05-09',
    deliveryDate: '2024-06-12'
  },
  {
    id: 'ORD-2024-012',
    customer: 'Northline Assembly Group',
    products: 3,
    total: 39750,
    status: 'delivered',
    date: '2024-02-14',
    deliveryDate: '2024-03-11'
  }
];

const defaultJobs: ProductionJob[] = [
  {
    id: 'JOB-001',
    product: 'TP-3000-ICP',
    quantity: 100,
    status: 'in-progress',
    progress: 67,
    line: 'Line A',
    startDate: '2024-05-10',
    dueDate: '2024-05-25',
    priority: 'high'
  },
  {
    id: 'JOB-002',
    product: 'SM-500-HD',
    quantity: 50,
    status: 'in-progress',
    progress: 42,
    line: 'Line B',
    startDate: '2024-05-12',
    dueDate: '2024-05-28',
    priority: 'urgent'
  },
  {
    id: 'JOB-003',
    product: 'PG-200-PRE',
    quantity: 200,
    status: 'scheduled',
    progress: 0,
    line: 'Line C',
    startDate: '2024-05-20',
    dueDate: '2024-06-05',
    priority: 'medium'
  },
  {
    id: 'JOB-004',
    product: 'IS-100-ARR',
    quantity: 500,
    status: 'completed',
    progress: 100,
    line: 'Line D',
    startDate: '2024-05-01',
    dueDate: '2024-05-15',
    priority: 'low'
  }
];

const defaultQualityChecks: QualityCheck[] = [
  {
    id: 'QC-001',
    product: 'TP-3000-ICP',
    batchNumber: 'BATCH-2024-045',
    date: '2024-05-15',
    inspector: 'Sarah Johnson',
    status: 'passed',
    defects: 2,
    passed: 98,
    total: 100
  },
  {
    id: 'QC-002',
    product: 'SM-500-HD',
    batchNumber: 'BATCH-2024-046',
    date: '2024-05-15',
    inspector: 'Mike Chen',
    status: 'pending',
    defects: 0,
    passed: 0,
    total: 50
  },
  {
    id: 'QC-003',
    product: 'PG-200-PRE',
    batchNumber: 'BATCH-2024-047',
    date: '2024-05-14',
    inspector: 'Emily Rodriguez',
    status: 'passed',
    defects: 5,
    passed: 195,
    total: 200
  },
  {
    id: 'QC-004',
    product: 'IS-100-ARR',
    batchNumber: 'BATCH-2024-044',
    date: '2024-05-13',
    inspector: 'David Park',
    status: 'failed',
    defects: 45,
    passed: 455,
    total: 500
  },
  {
    id: 'QC-005',
    product: 'TP-3000-ICP',
    batchNumber: 'BATCH-2024-048',
    date: '2024-05-16',
    inspector: 'Sarah Johnson',
    status: 'pending',
    defects: 0,
    passed: 0,
    total: 120
  },
  {
    id: 'QC-006',
    product: 'PG-200-PRE',
    batchNumber: 'BATCH-2024-043',
    date: '2024-05-12',
    inspector: 'David Park',
    status: 'passed',
    defects: 3,
    passed: 147,
    total: 150
  }
];

const defaultSuppliers: Supplier[] = [
  { id: 's1', name: 'Steel Supply Co', category: 'Raw Materials', orders: 45, rating: 4.8, onTime: 98, active: true, contactEmail: 'orders@steelsupplyco.example.com', contactPhone: '(555) 301-4400' },
  { id: 's2', name: 'Electronics Parts Ltd', category: 'Components', orders: 32, rating: 4.9, onTime: 95, active: true, contactEmail: 'sales@electroparts.example.com', contactPhone: '(555) 301-4485' },
  { id: 's3', name: 'Industrial Fasteners Inc', category: 'Hardware', orders: 67, rating: 4.6, onTime: 92, active: true, contactEmail: 'support@indfasteners.example.com', contactPhone: '(555) 301-4520' },
  { id: 's4', name: 'Packaging Solutions', category: 'Packaging', orders: 28, rating: 4.7, onTime: 97, active: true, contactEmail: 'quotes@packsolutions.example.com', contactPhone: '(555) 301-4577' }
];

const defaultApprovals: Approval[] = [
  { id: 'PO-1041', supplier: 'Steel Supply Co', item: 'Cold-rolled steel coils (12 tons)', amount: 18400, date: '2024-05-14', status: 'pending' },
  { id: 'PO-1042', supplier: 'Electronics Parts Ltd', item: 'PLC modules (40 units)', amount: 22750, date: '2024-05-14', status: 'pending' },
  { id: 'PO-1043', supplier: 'Industrial Fasteners Inc', item: 'M8 bolt assortment (10K)', amount: 3120, date: '2024-05-13', status: 'pending' },
  { id: 'PO-1044', supplier: 'Packaging Solutions', item: 'Export crates (200 units)', amount: 8600, date: '2024-05-13', status: 'pending' },
  { id: 'PO-1045', supplier: 'Steel Supply Co', item: 'Aluminum sheet stock (5 tons)', amount: 12980, date: '2024-05-12', status: 'pending' },
  { id: 'PO-1046', supplier: 'Electronics Parts Ltd', item: 'Sensor boards (150 units)', amount: 9450, date: '2024-05-12', status: 'pending' },
  { id: 'PO-1047', supplier: 'Packaging Solutions', item: 'Foam inserts (500 units)', amount: 2340, date: '2024-05-11', status: 'pending' }
];

const defaultNotifications: DemoNotification[] = [
  { id: 'n1', type: 'warning', message: 'Line C scheduled maintenance in 2 hours', time: '10 min ago', read: false },
  { id: 'n2', type: 'info', message: 'Material shipment arrived, Bay 3', time: '45 min ago', read: false },
  { id: 'n3', type: 'success', message: 'Job JOB-004 completed, 100% pass rate', time: '2 hours ago', read: false }
];

const defaultLines: LineStatus[] = [
  { line: 'Line A', facility: 'main', status: 'Running', output: '127/h', efficiency: '94%', color: 'bg-green-500' },
  { line: 'Line B', facility: 'main', status: 'Running', output: '98/h', efficiency: '87%', color: 'bg-green-500' },
  { line: 'Line C', facility: 'west', status: 'Setup', output: '0/h', efficiency: '0%', color: 'bg-yellow-500' },
  { line: 'Line D', facility: 'east', status: 'Running', output: '156/h', efficiency: '98%', color: 'bg-green-500' }
];

const lineStatusMeta: Record<LineStatus['status'], { color: string; output: string; efficiency: string }> = {
  Running: { color: 'bg-green-500', output: '118/h', efficiency: '92%' },
  Setup: { color: 'bg-yellow-500', output: '0/h', efficiency: '0%' },
  Paused: { color: 'bg-orange-500', output: '0/h', efficiency: '0%' },
  Maintenance: { color: 'bg-red-500', output: '0/h', efficiency: '0%' }
};

const lineCrews: Record<string, { shift: string; supervisor: string; operators: number; lastService: string }> = {
  'Line A': { shift: 'Shift 1 (06:00 to 14:00)', supervisor: 'Dana Whitfield', operators: 9, lastService: '2024-05-06' },
  'Line B': { shift: 'Shift 1 (06:00 to 14:00)', supervisor: 'Ray Okafor', operators: 7, lastService: '2024-04-29' },
  'Line C': { shift: 'Shift 2 (14:00 to 22:00)', supervisor: 'Nina Alvarez', operators: 6, lastService: '2024-05-15' },
  'Line D': { shift: 'Shift 2 (14:00 to 22:00)', supervisor: 'Tom Bergstrom', operators: 11, lastService: '2024-05-02' }
};

const lineFacility: Record<string, string> = {
  'Line A': 'main',
  'Line B': 'main',
  'Line C': 'west',
  'Line D': 'east'
};

const facilityLabels: Record<string, string> = {
  all: 'All Facilities',
  main: 'Main Plant',
  west: 'West Facility',
  east: 'East Facility'
};

const stockAlerts: StockItem[] = [
  { product: 'Industrial Control Panel TP-3000', sku: 'TP-3000-ICP', location: 'Main Plant', current: 15, min: 50, status: 'low' },
  { product: 'Heavy-Duty Servo Motor SM-500', sku: 'SM-500-HD', location: 'West Facility', current: 3, min: 20, status: 'critical' },
  { product: 'Precision Gearbox PG-200', sku: 'PG-200-PRE', location: 'East Facility', current: 0, min: 30, status: 'out' },
  { product: 'Industrial Sensor Array IS-100', sku: 'IS-100-ARR', location: 'Main Plant', current: 45, min: 100, status: 'low' },
  { product: 'Cold-Rolled Steel Coil 1.2mm', sku: 'RM-345-CRS', location: 'Main Plant', current: 8, min: 40, status: 'critical' },
  { product: 'PLC Module Series 7', sku: 'CMP-712-PLC', location: 'West Facility', current: 62, min: 120, status: 'low' },
  { product: 'Export Crate 48x40', sku: 'PKG-4840-EXP', location: 'East Facility', current: 0, min: 75, status: 'out' },
  { product: 'M8 Bolt Assortment', sku: 'HW-M8-ASST', location: 'Main Plant', current: 340, min: 500, status: 'low' }
];

const stockHistory: Record<string, { date: string; movement: string; qty: number }[]> = {
  default: [
    { date: '2024-05-14', movement: 'Consumed by production', qty: -40 },
    { date: '2024-05-09', movement: 'Received from supplier', qty: 120 },
    { date: '2024-05-02', movement: 'Transferred to West Facility', qty: -25 }
  ]
};

const defaultChecklist: ChecklistItem[] = [
  { item: 'Visual Inspection', status: 'completed' },
  { item: 'Dimensional Check', status: 'completed' },
  { item: 'Functional Test', status: 'in-progress' },
  { item: 'Electrical Safety', status: 'pending' },
  { item: 'Final Documentation', status: 'pending' }
];

const defaultProdAlerts: ProdAlert[] = [
  { id: 'a1', type: 'warning', message: 'Line C scheduled maintenance in 2 hours', time: '10 min ago' },
  { id: 'a2', type: 'info', message: 'Material shipment arrived, Bay 3', time: '45 min ago' },
  { id: 'a3', type: 'success', message: 'Job JOB-004 completed, 100% pass rate', time: '2 hours ago' },
  { id: 'a4', type: 'warning', message: 'Raw material stock low, Item RM-345', time: '3 hours ago' }
];

const facilityStats: Record<string, { name: string; items: number; value: string; capacity: number; key: string }> = {
  main: { name: 'Main Plant', items: 847, value: '$1.2M', capacity: 85, key: 'main' },
  west: { name: 'West Facility', items: 234, value: '$680K', capacity: 62, key: 'west' },
  east: { name: 'East Facility', items: 166, value: '$520K', capacity: 71, key: 'east' }
};

const shippingOptions: { id: CheckoutDetails['shipping']; label: string; detail: string; cost: number }[] = [
  { id: 'standard', label: 'Standard Freight', detail: 'LTL carrier, 5 to 7 business days after production', cost: 0 },
  { id: 'expedited', label: 'Expedited Freight', detail: 'Dedicated truck, 2 business days after production', cost: 1200 },
  { id: 'white-glove', label: 'White Glove Install', detail: 'Delivery plus on-site commissioning by a TechPro tech', cost: 3500 }
];

const invoices = [
  { id: 'INV-2024-118', orderId: 'ORD-2024-001', amount: 45780, date: '2024-05-12' },
  { id: 'INV-2024-117', orderId: 'ORD-2024-002', amount: 128950, date: '2024-05-09' },
  { id: 'INV-2024-116', orderId: 'ORD-2024-003', amount: 34200, date: '2024-05-06' }
];

const transactions = [
  { id: 'TXN-9012', desc: 'ACH payment received', amount: -25000, date: '2024-05-14' },
  { id: 'TXN-8998', desc: 'Invoice INV-2024-118 issued', amount: 45780, date: '2024-05-12' },
  { id: 'TXN-8976', desc: 'Check payment received', amount: -40000, date: '2024-05-02' },
  { id: 'TXN-8950', desc: 'Invoice INV-2024-117 issued', amount: 66470, date: '2024-04-28' }
];

const contracts = [
  { id: 'CT-2023-09', supplier: 'Steel Supply Co', term: 'Jan 2024 to Dec 2025', value: '$420K/yr' },
  { id: 'CT-2023-14', supplier: 'Electronics Parts Ltd', term: 'Mar 2024 to Mar 2026', value: '$310K/yr' },
  { id: 'CT-2022-31', supplier: 'Packaging Solutions', term: 'Aug 2023 to Aug 2025', value: '$95K/yr' }
];

const accountRep = {
  name: 'Marcus Webb',
  title: 'Senior Account Manager',
  phone: '(555) 200-3111',
  email: 'm.webb@techpro-mfg.com'
};

interface RangeData {
  kpis: { label: string; value: string; change: string; trend: 'up' | 'down' }[];
  revenue: { label: string; value: number }[];
  production: { name: string; units: number }[];
}

const analyticsData: Record<string, RangeData> = {
  '7days': {
    kpis: [
      { label: 'Revenue', value: '$142K', change: '+4.1%', trend: 'up' },
      { label: 'Production Output', value: '19,940', change: '+2.3%', trend: 'up' },
      { label: 'Quality Rate', value: '98.6%', change: '+0.4%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.1', trend: 'up' }
    ],
    revenue: [
      { label: 'Mon', value: 18 },
      { label: 'Tue', value: 21 },
      { label: 'Wed', value: 19 },
      { label: 'Thu', value: 24 },
      { label: 'Fri', value: 26 },
      { label: 'Sat', value: 17 },
      { label: 'Sun', value: 17 }
    ],
    production: [
      { name: 'TP-3000-ICP', units: 5200 },
      { name: 'SM-500-HD', units: 3100 },
      { name: 'PG-200-PRE', units: 6400 },
      { name: 'IS-100-ARR', units: 5240 }
    ]
  },
  '30days': {
    kpis: [
      { label: 'Revenue', value: '$612K', change: '+9.8%', trend: 'up' },
      { label: 'Production Output', value: '87,234', change: '+8.7%', trend: 'up' },
      { label: 'Quality Rate', value: '98.2%', change: '+1.5%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', trend: 'up' }
    ],
    revenue: [
      { label: 'Week 1', value: 138 },
      { label: 'Week 2', value: 146 },
      { label: 'Week 3', value: 152 },
      { label: 'Week 4', value: 176 }
    ],
    production: [
      { name: 'TP-3000-ICP', units: 21800 },
      { name: 'SM-500-HD', units: 14200 },
      { name: 'PG-200-PRE', units: 27900 },
      { name: 'IS-100-ARR', units: 23334 }
    ]
  },
  '90days': {
    kpis: [
      { label: 'Revenue', value: '$1.71M', change: '+12.4%', trend: 'up' },
      { label: 'Production Output', value: '248,900', change: '+10.2%', trend: 'up' },
      { label: 'Quality Rate', value: '97.9%', change: '+0.8%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.1', trend: 'up' }
    ],
    revenue: [
      { label: 'Mar', value: 540 },
      { label: 'Apr', value: 560 },
      { label: 'May', value: 612 }
    ],
    production: [
      { name: 'TP-3000-ICP', units: 61200 },
      { name: 'SM-500-HD', units: 40800 },
      { name: 'PG-200-PRE', units: 80100 },
      { name: 'IS-100-ARR', units: 66800 }
    ]
  },
  year: {
    kpis: [
      { label: 'Revenue', value: '$2.4M', change: '+15.2%', trend: 'up' },
      { label: 'Production Output', value: '512,400', change: '+11.6%', trend: 'up' },
      { label: 'Quality Rate', value: '98.2%', change: '+1.5%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', trend: 'up' }
    ],
    revenue: [
      { label: 'Q1', value: 480 },
      { label: 'Q2', value: 590 },
      { label: 'Q3', value: 620 },
      { label: 'Q4', value: 710 }
    ],
    production: [
      { name: 'TP-3000-ICP', units: 126400 },
      { name: 'SM-500-HD', units: 84100 },
      { name: 'PG-200-PRE', units: 164900 },
      { name: 'IS-100-ARR', units: 137000 }
    ]
  }
};

const jobOperations = [
  { name: 'Material Prep', threshold: 10 },
  { name: 'Machining', threshold: 35 },
  { name: 'Assembly', threshold: 60 },
  { name: 'Testing', threshold: 85 },
  { name: 'Packaging', threshold: 100 }
];

const orderStatusSteps: Order['status'][] = ['pending', 'production', 'quality-check', 'shipping', 'delivered'];

const inputCls = 'w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent';

const persist = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode) -- demo still works in-memory
  }
};

const load = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const downloadFile = (filename: string, content: string, mime = 'text/plain') => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

interface TechProManufacturingProps {
  viewMode?: 'customer' | 'admin';
}

const TechProManufacturing = ({ viewMode }: TechProManufacturingProps = {}) => {
  const [currentPage, setCurrentPage] = useState<Page>(viewMode === 'admin' ? 'analytics' : 'home');
  const [userRole, setUserRole] = useState<UserRole>(viewMode === 'admin' ? 'admin' : 'guest');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-asc');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  // Persistent mock data
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [jobs, setJobs] = useState<ProductionJob[]>(defaultJobs);
  const [suppliers, setSuppliers] = useState<Supplier[]>(defaultSuppliers);
  const [approvals, setApprovals] = useState<Approval[]>(defaultApprovals);
  const [reordered, setReordered] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<Prefs>({ defaultFacility: 'all', emailAlerts: true, weeklySummary: false });
  const [qcChecks, setQcChecks] = useState<QualityCheck[]>(defaultQualityChecks);
  const [lineStates, setLineStates] = useState<LineStatus[]>(defaultLines);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);
  const [prodAlerts, setProdAlerts] = useState<ProdAlert[]>(defaultProdAlerts);
  const [cart, setCart] = useState<CartLine[]>([]);

  // Filters
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | Order['status']>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | StockItem['status']>('all');
  const [qcFilter, setQcFilter] = useState<'all' | QualityCheck['status']>('all');

  // UI state
  const [notifications, setNotifications] = useState<DemoNotification[]>(defaultNotifications);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [b2bModal, setB2bModal] = useState<'new-order' | 'invoices' | 'contact-rep' | 'balance' | 'credit' | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [selectedJob, setSelectedJob] = useState<ProductionJob | null>(null);
  const [selectedQC, setSelectedQC] = useState<QualityCheck | null>(null);
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);
  const [orderEdit, setOrderEdit] = useState<Order | null>(null);
  const [supplierContact, setSupplierContact] = useState<Supplier | null>(null);
  const [supplierModal, setSupplierModal] = useState<'po' | 'contracts' | 'reports' | 'manage' | 'approvals' | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedLine, setSelectedLine] = useState<LineStatus | null>(null);
  const [facilityDetail, setFacilityDetail] = useState<string | null>(null);
  const [inventoryStat, setInventoryStat] = useState<'skus' | 'value' | null>(null);
  const [stockDetail, setStockDetail] = useState<StockItem | null>(null);
  const [kpiDetail, setKpiDetail] = useState<string | null>(null);
  const [productEdit, setProductEdit] = useState<Product | null>(null);
  const [supplierDetail, setSupplierDetail] = useState<Supplier | null>(null);
  const [recordQC, setRecordQC] = useState<QualityCheck | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartOrder, setCartOrder] = useState<Order | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [checkout, setCheckout] = useState<CheckoutDetails>({
    company: 'AutoTech Industries',
    poNumber: '',
    contact: '',
    deliveryDate: '',
    shipping: 'standard',
    notes: ''
  });

  useEffect(() => {
    setCurrentPage(viewMode === 'admin' ? 'analytics' : 'home');
    setUserRole(viewMode === 'admin' ? 'admin' : 'guest');
  }, [viewMode]);

  // Hydrate persisted demo state
  useEffect(() => {
    const p = load<Product[]>('techpro-products');
    if (p && Array.isArray(p) && p.length) setProducts(p);
    const o = load<Order[]>('techpro-orders');
    if (o && Array.isArray(o) && o.length) setOrders(o);
    const j = load<ProductionJob[]>('techpro-jobs');
    if (j && Array.isArray(j) && j.length) setJobs(j);
    const s = load<Supplier[]>('techpro-suppliers');
    if (s && Array.isArray(s) && s.length) setSuppliers(s);
    const a = load<Approval[]>('techpro-approvals');
    if (a && Array.isArray(a) && a.length) setApprovals(a);
    const r = load<string[]>('techpro-reordered');
    if (r && Array.isArray(r)) setReordered(r);
    const pr = load<Prefs>('techpro-settings');
    if (pr && typeof pr === 'object') {
      setPrefs(pr);
      if (pr.defaultFacility) setSelectedFacility(pr.defaultFacility);
    }
    const qc = load<QualityCheck[]>('techpro-qc');
    if (qc && Array.isArray(qc) && qc.length) setQcChecks(qc);
    const ls = load<LineStatus[]>('techpro-lines');
    if (ls && Array.isArray(ls) && ls.length) setLineStates(ls);
    const cl = load<ChecklistItem[]>('techpro-checklist');
    if (cl && Array.isArray(cl) && cl.length) setChecklist(cl);
    const ct = load<CartLine[]>('techpro-cart');
    if (ct && Array.isArray(ct)) setCart(ct);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 3200);
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingApprovals = approvals.filter(a => a.status === 'pending');

  const nextOrderId = () => {
    const nums = orders
      .map(o => parseInt(o.id.split('-').pop() || '0', 10))
      .filter(n => !isNaN(n));
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    return `ORD-2024-${String(next).padStart(3, '0')}`;
  };

  const nextPoId = () => {
    const nums = approvals
      .map(a => parseInt(a.id.split('-').pop() || '0', 10))
      .filter(n => !isNaN(n));
    const next = (nums.length ? Math.max(...nums) : 1040) + 1;
    return `PO-${next}`;
  };

  // ---------- Handlers ----------

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setContactError('');
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'TechPro Manufacturing',
          demoSlug: 'techpro-manufacturing',
          clientName: data.get('name'),
          clientEmail: data.get('email'),
          service: `${data.get('department')} (${data.get('company')})`,
          notes: data.get('message'),
        }),
      });
      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_contact_form',
          demo_slug: 'techpro-manufacturing',
        });
        trackConversion('leadForm');

        setContactSubmitted(true);
        form.reset();
        setTimeout(() => setContactSubmitted(false), 4000);
      } else {
        setContactError('There was an issue sending your message. Please try again.');
      }
    } catch {
      setContactError('There was an issue sending your message. Please try again.');
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setQuoteError('');
    const productName = quoteProduct
      ? quoteProduct.name
      : String(data.get('product') || 'General inquiry');
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'TechPro Manufacturing',
          demoSlug: 'techpro-manufacturing',
          clientName: data.get('name'),
          clientEmail: data.get('email'),
          service: `Quote request: ${productName} x ${data.get('quantity')} (${data.get('company') || 'no company'})`,
          notes: data.get('notes'),
        }),
      });
      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'demo_quote_form',
          demo_slug: 'techpro-manufacturing',
        });
        trackConversion('leadForm');
        setQuoteSubmitted(true);
        form.reset();
      } else {
        setQuoteError('There was an issue sending your request. Please try again.');
      }
    } catch {
      setQuoteError('There was an issue sending your request. Please try again.');
    }
  };

  const closeQuote = () => {
    setQuoteOpen(false);
    setQuoteProduct(null);
    setQuoteSubmitted(false);
    setQuoteError('');
  };

  const openQuote = (product: Product | null) => {
    setQuoteProduct(product);
    setQuoteSubmitted(false);
    setQuoteError('');
    setQuoteOpen(true);
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const p: Product = {
      id: `p-${Date.now()}`,
      name: String(d.get('name') || 'New Product'),
      sku: String(d.get('sku') || `SKU-${Date.now()}`),
      category: String(d.get('category') || 'Control Systems'),
      price: parseFloat(String(d.get('price'))) || 0,
      moq: parseInt(String(d.get('moq')), 10) || 1,
      leadTime: String(d.get('leadTime') || '2-3 weeks'),
      inStock: parseInt(String(d.get('inStock')), 10) || 0,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      specs: String(d.get('specs') || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      availability: String(d.get('availability')) === 'made-to-order' ? 'made-to-order' : 'in-stock',
    };
    const next = [...products, p];
    setProducts(next);
    persist('techpro-products', next);
    setAddProductOpen(false);
    showToast(`${p.name} added to catalog`);
  };

  const handleNewOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const product = products.find(p => p.id === String(d.get('productId')));
    if (!product) return;
    const requested = parseInt(String(d.get('quantity')), 10) || product.moq;
    const qty = Math.max(requested, product.moq);
    const total = Math.round(product.price * 0.85 * qty);
    const order: Order = {
      id: nextOrderId(),
      customer: 'AutoTech Industries',
      products: 1,
      total,
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
      deliveryDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    };
    const next = [order, ...orders];
    setOrders(next);
    persist('techpro-orders', next);
    setPlacedOrder(order);
  };

  const handleOrderStatusSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderEdit) return;
    const d = new FormData(e.currentTarget);
    const status = String(d.get('status')) as Order['status'];
    const next = orders.map(o => (o.id === orderEdit.id ? { ...o, status } : o));
    setOrders(next);
    persist('techpro-orders', next);
    showToast(`${orderEdit.id} status updated to ${status}`);
    setOrderEdit(null);
  };

  const updateJobStatus = (id: string, status: ProductionJob['status'], progress?: number) => {
    const next = jobs.map(j =>
      j.id === id ? { ...j, status, progress: progress !== undefined ? progress : j.progress } : j
    );
    setJobs(next);
    persist('techpro-jobs', next);
    setSelectedJob(prev =>
      prev && prev.id === id
        ? { ...prev, status, progress: progress !== undefined ? progress : prev.progress }
        : prev
    );
    showToast(`${id} marked ${status.replace('-', ' ')}`);
  };

  const toggleSupplier = (id: string) => {
    const next = suppliers.map(s => (s.id === id ? { ...s, active: !s.active } : s));
    setSuppliers(next);
    persist('techpro-suppliers', next);
  };

  const handleSupplierMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = supplierContact ? supplierContact.name : 'supplier';
    setSupplierContact(null);
    showToast(`Message sent to ${name}`);
  };

  const handleNewPurchaseOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const po: Approval = {
      id: nextPoId(),
      supplier: String(d.get('supplier') || 'Steel Supply Co'),
      item: `${d.get('item')} (${d.get('quantity')} units)`,
      amount: parseFloat(String(d.get('amount'))) || 0,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    const next = [po, ...approvals];
    setApprovals(next);
    persist('techpro-approvals', next);
    setSupplierModal(null);
    showToast(`${po.id} created and sent for approval`);
  };

  const decideApproval = (id: string, status: 'approved' | 'rejected') => {
    const next = approvals.map(a => (a.id === id ? { ...a, status } : a));
    setApprovals(next);
    persist('techpro-approvals', next);
    showToast(`${id} ${status}`);
  };

  const handleReorder = (sku: string, productName: string) => {
    if (reordered.includes(sku)) return;
    const alert = stockAlerts.find(s => s.sku === sku);
    const product = products.find(p => p.sku === sku);
    const qty = alert ? Math.max(alert.min - alert.current, 1) : 25;
    const amount = product ? Math.round(product.price * qty * 0.6) : 5000;
    const po: Approval = {
      id: nextPoId(),
      supplier: 'Preferred Supplier (auto-assigned)',
      item: `Restock: ${productName} (${qty} units)`,
      amount,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    const nextApprovals = [po, ...approvals];
    setApprovals(nextApprovals);
    persist('techpro-approvals', nextApprovals);
    const nextReordered = [...reordered, sku];
    setReordered(nextReordered);
    persist('techpro-reordered', nextReordered);
    showToast(`${po.id} created: restock ${sku}`);
  };

  const handleImport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const f = d.get('file');
    if (!(f instanceof File)) return;
    const name = f.name || 'inventory.csv';
    let rows: string[][] = [];
    try {
      const text = await f.text();
      rows = text
        .split(/\r?\n/)
        .map(r => r.trim())
        .filter(Boolean)
        .map(r => r.split(',').map(c => c.replace(/^"|"$/g, '').trim()));
    } catch {
      rows = [];
    }
    setImportOpen(false);
    if (rows.length < 2) {
      showToast(`${name} read, but no data rows were found below the header`);
      return;
    }
    const header = rows[0].map(h => h.toLowerCase());
    const skuIdx = header.findIndex(h => h.includes('sku'));
    const qtyIdx = header.findIndex(h => h.includes('quantity') || h.includes('qty') || h.includes('current'));
    const dataRows = rows.slice(1);
    let matched = 0;
    if (skuIdx > -1 && qtyIdx > -1) {
      const updates = new Map<string, number>();
      dataRows.forEach(r => {
        const sku = (r[skuIdx] || '').toUpperCase();
        const qty = parseInt(r[qtyIdx] || '', 10);
        if (sku && !isNaN(qty)) updates.set(sku, qty);
      });
      const nextProducts = products.map(p => {
        const qty = updates.get(p.sku.toUpperCase());
        if (qty === undefined) return p;
        matched += 1;
        return { ...p, inStock: qty };
      });
      if (matched > 0) {
        setProducts(nextProducts);
        persist('techpro-products', nextProducts);
      }
    }
    showToast(
      matched > 0
        ? `${name}: ${dataRows.length} rows read, ${matched} catalog SKU(s) updated`
        : `${name}: ${dataRows.length} rows read, no catalog SKUs matched`
    );
  };

  const handleExportInventory = () => {
    const header = ['Product', 'SKU', 'Location', 'Current', 'Min Level', 'Status'];
    const alertRows = stockAlerts.map(s => [s.product, s.sku, s.location, String(s.current), String(s.min), s.status]);
    const productRows = products.map(p => [p.name, p.sku, 'Main Plant', String(p.inStock), '-', p.availability]);
    const csv = [header, ...alertRows, ...productRows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    downloadFile('techpro-inventory.csv', csv, 'text/csv');
    showToast('Inventory exported to CSV');
  };

  const handleSettingsSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Prefs = {
      defaultFacility: String(d.get('defaultFacility') || 'all'),
      emailAlerts: d.get('emailAlerts') === 'on',
      weeklySummary: d.get('weeklySummary') === 'on',
    };
    setPrefs(next);
    persist('techpro-settings', next);
    setSelectedFacility(next.defaultFacility);
    setSettingsOpen(false);
    showToast('Settings saved');
  };

  const downloadInvoice = (inv: { id: string; orderId: string; amount: number; date: string }) => {
    const text = [
      'TechPro Manufacturing',
      '5000 Industrial Pkwy, Detroit, MI 48201',
      '',
      `Invoice: ${inv.id}`,
      `Order: ${inv.orderId}`,
      `Date: ${inv.date}`,
      `Amount Due: $${inv.amount.toLocaleString()}`,
      'Terms: Net 45',
      '',
      'Demo document generated by the TechPro platform demo. Not a real invoice.',
    ].join('\n');
    downloadFile(`${inv.id}.txt`, text);
    showToast(`${inv.id} downloaded`);
  };

  const downloadQcReport = (check: QualityCheck) => {
    const text = [
      'TechPro Manufacturing -- Quality Control Report',
      '',
      `Report: ${check.id}`,
      `Product: ${check.product}`,
      `Batch: ${check.batchNumber}`,
      `Inspector: ${check.inspector}`,
      `Date: ${check.date}`,
      `Result: ${check.status.toUpperCase()}`,
      `Units Inspected: ${check.total}`,
      `Units Passed: ${check.passed}`,
      `Defects Found: ${check.defects}`,
      '',
      'Demo document generated by the TechPro platform demo.',
    ].join('\n');
    downloadFile(`${check.id}-report.txt`, text);
    showToast(`${check.id} report downloaded`);
  };

  const downloadSupplierReport = () => {
    const header = ['Supplier', 'Category', 'Orders', 'Rating', 'On-Time %', 'Status'];
    const rows = suppliers.map(s => [s.name, s.category, String(s.orders), String(s.rating), String(s.onTime), s.active ? 'Active' : 'Inactive']);
    const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    downloadFile('techpro-supplier-report.csv', csv, 'text/csv');
    showToast('Supplier report downloaded');
  };

  const downloadContract = (c: { id: string; supplier: string; term: string; value: string }) => {
    const text = [
      'TechPro Manufacturing -- Supply Agreement Summary',
      '',
      `Contract: ${c.id}`,
      `Supplier: ${c.supplier}`,
      `Term: ${c.term}`,
      `Annual Value: ${c.value}`,
      '',
      'Demo document generated by the TechPro platform demo.',
    ].join('\n');
    downloadFile(`${c.id}.txt`, text);
    showToast(`${c.id} downloaded`);
  };

  const goToProductsWithCategory = (category: string) => {
    setCategoryFilter(category);
    setAvailabilityFilter('all');
    setSearchTerm('');
    setCurrentPage('products');
  };

  const goToOrdersWithStatus = (status: 'all' | Order['status']) => {
    setOrderStatusFilter(status);
    setOrderSearch('');
    setCurrentPage('orders');
  };

  // ---------- Cart / checkout ----------

  const addToCart = (product: Product, qty?: number) => {
    const amount = qty && qty > 0 ? qty : product.moq;
    const exists = cart.some(l => l.productId === product.id);
    const next = exists
      ? cart.map(l => (l.productId === product.id ? { ...l, qty: l.qty + amount } : l))
      : [...cart, { productId: product.id, qty: amount }];
    setCart(next);
    persist('techpro-cart', next);
    showToast(`${amount} x ${product.sku} added to your order`);
  };

  const setCartQty = (productId: string, qty: number) => {
    const product = products.find(p => p.id === productId);
    const min = product ? product.moq : 1;
    const next = cart.map(l => (l.productId === productId ? { ...l, qty: Math.max(min, qty) } : l));
    setCart(next);
    persist('techpro-cart', next);
  };

  const removeCartLine = (productId: string) => {
    const next = cart.filter(l => l.productId !== productId);
    setCart(next);
    persist('techpro-cart', next);
  };

  const clearCart = () => {
    setCart([]);
    persist('techpro-cart', []);
    showToast('Order draft cleared');
  };

  const openCart = () => {
    setCheckoutStep(0);
    setCartOrder(null);
    setCartOpen(true);
    setNotifOpen(false);
  };

  const closeCart = () => {
    setCartOpen(false);
    setCheckoutStep(0);
    setCartOrder(null);
  };

  const handleCheckoutDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  // ---------- Production lines ----------

  const updateLineStatus = (lineName: string, status: LineStatus['status']) => {
    const meta = lineStatusMeta[status];
    const original = defaultLines.find(l => l.line === lineName);
    const next = lineStates.map(l =>
      l.line === lineName
        ? {
            ...l,
            status,
            color: meta.color,
            output: status === 'Running' ? (original ? original.output : meta.output) : meta.output,
            efficiency: status === 'Running' ? (original ? original.efficiency : meta.efficiency) : meta.efficiency
          }
        : l
    );
    setLineStates(next);
    persist('techpro-lines', next);
    setSelectedLine(prev => (prev && prev.line === lineName ? next.find(l => l.line === lineName) || prev : prev));
    showToast(`${lineName} set to ${status}`);
  };

  const dismissProdAlert = (id: string) => {
    setProdAlerts(prodAlerts.filter(a => a.id !== id));
  };

  const openNotification = (n: DemoNotification) => {
    setNotifications(notifications.map(x => (x.id === n.id ? { ...x, read: true } : x)));
    setNotifOpen(false);
    setCurrentPage(n.type === 'info' ? 'inventory' : 'production');
  };

  // ---------- Quality control ----------

  const advanceChecklist = (item: string) => {
    const cycle: ChecklistItem['status'][] = ['pending', 'in-progress', 'completed'];
    const next = checklist.map(c =>
      c.item === item ? { ...c, status: cycle[(cycle.indexOf(c.status) + 1) % cycle.length] } : c
    );
    setChecklist(next);
    persist('techpro-checklist', next);
  };

  const handleRecordQC = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recordQC) return;
    const d = new FormData(e.currentTarget);
    const inspected = parseInt(String(d.get('inspected')), 10) || recordQC.total;
    const defects = Math.min(Math.max(parseInt(String(d.get('defects')), 10) || 0, 0), inspected);
    const result: QualityCheck['status'] = String(d.get('result')) === 'failed' ? 'failed' : 'passed';
    const inspector = String(d.get('inspector') || recordQC.inspector);
    const next = qcChecks.map(c =>
      c.id === recordQC.id
        ? { ...c, total: inspected, defects, passed: inspected - defects, status: result, inspector }
        : c
    );
    setQcChecks(next);
    persist('techpro-qc', next);
    const updated = next.find(c => c.id === recordQC.id) || null;
    setSelectedQC(prev => (prev && prev.id === recordQC.id ? updated : prev));
    setRecordQC(null);
    showToast(`${recordQC.id} recorded as ${result}`);
  };

  const reopenInspection = (check: QualityCheck) => {
    const next = qcChecks.map(c =>
      c.id === check.id ? { ...c, status: 'pending' as QualityCheck['status'], defects: 0, passed: 0 } : c
    );
    setQcChecks(next);
    persist('techpro-qc', next);
    setSelectedQC(next.find(c => c.id === check.id) || null);
    showToast(`${check.id} reopened for re-inspection`);
  };

  // ---------- Catalog admin ----------

  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productEdit) return;
    const d = new FormData(e.currentTarget);
    const next = products.map(p =>
      p.id === productEdit.id
        ? {
            ...p,
            name: String(d.get('name') || p.name),
            sku: String(d.get('sku') || p.sku),
            category: String(d.get('category') || p.category),
            price: parseFloat(String(d.get('price'))) || p.price,
            moq: parseInt(String(d.get('moq')), 10) || p.moq,
            inStock: parseInt(String(d.get('inStock')), 10) || 0,
            leadTime: String(d.get('leadTime') || p.leadTime),
            availability:
              String(d.get('availability')) === 'made-to-order'
                ? ('made-to-order' as Product['availability'])
                : ('in-stock' as Product['availability']),
            specs: String(d.get('specs') || '')
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          }
        : p
    );
    setProducts(next);
    persist('techpro-products', next);
    showToast(`${productEdit.sku} updated`);
    setProductEdit(null);
  };

  const deleteProduct = (product: Product) => {
    const next = products.filter(p => p.id !== product.id);
    setProducts(next);
    persist('techpro-products', next);
    const nextCart = cart.filter(l => l.productId !== product.id);
    setCart(nextCart);
    persist('techpro-cart', nextCart);
    showToast(`${product.sku} removed from catalog`);
  };

  const handleExportAnalytics = () => {
    const header = ['Section', 'Label', 'Value'];
    const kpiRows = rangeData.kpis.map(k => ['KPI', k.label, `${k.value} (${k.change})`]);
    const revRows = rangeData.revenue.map(r => ['Revenue ($K)', r.label, String(r.value)]);
    const prodRows = rangeData.production.map(p => ['Production (units)', p.name, String(p.units)]);
    const csv = [header, ...kpiRows, ...revRows, ...prodRows]
      .map(r => r.map(c => `"${c}"`).join(','))
      .join('\n');
    downloadFile(`techpro-analytics-${dateRange}.csv`, csv, 'text/csv');
    showToast('Analytics report exported');
  };

  const downloadAgreement = () => {
    const text = [
      'TechPro Manufacturing -- Annual Volume Agreement (Summary)',
      '',
      'Account: AutoTech Industries',
      'Contract Type: Annual Volume Agreement',
      'Renewal Date: December 31, 2024',
      'Volume Commitment: $500,000 per year',
      'Contract Pricing: 15% off published list on all catalog SKUs',
      'Payment Terms: Net 45',
      '',
      'Demo document generated by the TechPro platform demo. Not a real agreement.'
    ].join('\n');
    downloadFile('techpro-volume-agreement.txt', text);
    showToast('Agreement summary downloaded');
  };

  // ---------- Derived data ----------

  const categories = Array.from(new Set(products.map(p => p.category)));

  const visibleProducts = products
    .filter(p => {
      const q = searchTerm.trim().toLowerCase();
      if (q && !`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(q)) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      const avail = p.availability || 'in-stock';
      if (availabilityFilter !== 'all' && avail !== availabilityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return b.inStock - a.inStock;
        case 'lead':
          return (parseInt(a.leadTime, 10) || 0) - (parseInt(b.leadTime, 10) || 0);
        default:
          return a.price - b.price;
      }
    });

  const visibleLines = selectedFacility === 'all'
    ? lineStates
    : lineStates.filter(l => l.facility === selectedFacility);

  const visibleJobs = selectedFacility === 'all'
    ? jobs
    : jobs.filter(j => lineFacility[j.line] === selectedFacility);

  const rangeData = analyticsData[dateRange] || analyticsData['30days'];

  const cartDetail = cart
    .map(l => {
      const product = products.find(p => p.id === l.productId);
      return product ? { product, qty: l.qty } : null;
    })
    .filter((l): l is { product: Product; qty: number } => l !== null);

  const cartUnits = cartDetail.reduce((sum, l) => sum + l.qty, 0);
  const cartListSubtotal = cartDetail.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const cartDiscount = Math.round(cartListSubtotal * 0.15);
  const selectedShipping = shippingOptions.find(o => o.id === checkout.shipping) || shippingOptions[0];
  const cartTotal = Math.round(cartListSubtotal - cartDiscount + selectedShipping.cost);
  const cartLeadTime = cartDetail.reduce((longest, l) => {
    const weeks = parseInt(l.product.leadTime.split('-').pop() || '0', 10) || 0;
    return Math.max(longest, weeks);
  }, 0);

  const orderCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] += 1;
      return acc;
    },
    { pending: 0, production: 0, 'quality-check': 0, shipping: 0, delivered: 0 } as Record<Order['status'], number>
  );

  const visibleOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    const q = orderSearch.trim().toLowerCase();
    if (q && !`${o.id} ${o.customer}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const visibleStock = stockFilter === 'all' ? stockAlerts : stockAlerts.filter(s => s.status === stockFilter);
  const lowStockCount = stockAlerts.filter(s => s.status === 'low').length;
  const criticalStockCount = stockAlerts.filter(s => s.status === 'critical').length;
  const outOfStockCount = stockAlerts.filter(s => s.status === 'out').length;

  const visibleQc = qcFilter === 'all' ? qcChecks : qcChecks.filter(c => c.status === qcFilter);
  const completedQc = qcChecks.filter(c => c.status !== 'pending');
  const qcInspected = completedQc.reduce((sum, c) => sum + c.total, 0);
  const qcPassed = completedQc.reduce((sum, c) => sum + c.passed, 0);
  const qcPassRate = qcInspected ? ((qcPassed / qcInspected) * 100).toFixed(1) : '0.0';
  const qcPendingCount = qcChecks.filter(c => c.status === 'pending').length;
  const qcFailedCount = qcChecks.filter(c => c.status === 'failed').length;
  const qcDefectTotal = completedQc.reduce((sum, c) => sum + c.defects, 0);
  const qcPassedCount = qcChecks.filter(c => c.status === 'passed').length;

  const placeCartOrder = () => {
    if (cartDetail.length === 0) {
      setCheckoutStep(0);
      showToast('Your order draft is empty -- add catalog items first');
      return;
    }
    const order: Order = {
      id: nextOrderId(),
      customer: checkout.company.trim() || 'AutoTech Industries',
      products: cartDetail.length,
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
      deliveryDate:
        checkout.deliveryDate ||
        new Date(Date.now() + Math.max(cartLeadTime, 3) * 7 * 86400000).toISOString().slice(0, 10)
    };
    const nextOrders = [order, ...orders];
    setOrders(nextOrders);
    persist('techpro-orders', nextOrders);
    setCartOrder(order);
    setCart([]);
    persist('techpro-cart', []);
    setCheckoutStep(3);
  };

  // ---------- Shared UI helpers ----------

  const modalShell = (title: string, onClose: () => void, body: React.ReactNode, wide = false) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className={`bg-[#0b090a] border border-gray-700 rounded-lg shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button aria-label="Close" onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{body}</div>
      </div>
    </div>
  );

  const renderBarChart = (data: { label: string; value: number }[]) => {
    const max = Math.max(...data.map(d => d.value), 1);
    return (
      <div>
        <div className="h-56 flex items-end gap-3">
          {data.map(d => (
            <div key={d.label} className="flex-1 h-full flex flex-col items-center justify-end">
              <span className="text-xs font-semibold text-gray-300 mb-1">${d.value}K</span>
              <div
                className="w-full bg-[#ba181b] rounded-t hover:bg-red-600 transition-colors"
                style={{ height: `${(d.value / max) * 85}%` }}
                title={`${d.label}: $${d.value}K`}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          {data.map(d => (
            <div key={d.label} className="flex-1 text-center text-xs text-gray-400">{d.label}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderProductionChart = (data: { name: string; units: number }[]) => {
    const total = data.reduce((sum, d) => sum + d.units, 0);
    const colors = ['bg-[#ba181b]', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
    return (
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={d.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-300">{d.name}</span>
              <span className="text-sm font-bold text-white">
                {d.units.toLocaleString()} units ({Math.round((d.units / total) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className={`${colors[i % colors.length]} h-3 rounded-full`}
                style={{ width: `${(d.units / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-500">Total output: {total.toLocaleString()} units</p>
      </div>
    );
  };

  // ---------- Navigation ----------

  const Navigation = () => (
    <nav className="bg-[#0b090a] text-white sticky top-0 z-40 shadow-lg border-b-2 border-[#ba181b]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Factory className="w-8 h-8 text-[#ba181b]" />
            <div>
              <h1 className="text-2xl font-bold">TechPro</h1>
              <p className="text-xs text-gray-400">Manufacturing Solutions</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#161a1d] px-3 py-2 rounded-lg border border-[#ba181b]">
              <span className="text-sm">Role:</span>
              <select
                aria-label="Role"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent border-none text-white font-semibold text-sm focus:outline-none"
              >
                <option value="guest">Guest</option>
                <option value="customer">B2B Customer</option>
                <option value="manager">Production Manager</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => { setNotifOpen(!notifOpen); }}
                className="relative block"
              >
                <Bell className="w-5 h-5 hover:text-[#ba181b]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ba181b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-9 w-80 bg-[#0b090a] border border-gray-700 rounded-lg shadow-2xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <span className="font-bold text-white text-sm">Notifications</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-[#ba181b] hover:text-red-400 font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-gray-500 text-center">No notifications</p>
                  ) : (
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-gray-800 last:border-b-0 hover:bg-[#161a1d] ${n.read ? 'opacity-60' : ''}`}>
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />}
                          {n.type === 'info' && <Activity className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />}
                          <button onClick={() => openNotification(n)} className="flex-1 text-left">
                            <p className="text-sm text-white">{n.message}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {n.time} <span className="text-[#ba181b] font-semibold">- view</span>
                            </p>
                          </button>
                          <button
                            aria-label={`Dismiss notification: ${n.message}`}
                            onClick={() => setNotifications(notifications.filter(x => x.id !== n.id))}
                            className="text-gray-500 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              aria-label={`Order cart, ${cartUnits} units`}
              onClick={openCart}
              className="relative block"
            >
              <ShoppingCart className="w-5 h-5 hover:text-[#ba181b]" />
              {cartUnits > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ba181b] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                  {cartUnits > 999 ? '999+' : cartUnits}
                </span>
              )}
            </button>
            <button aria-label="Settings" onClick={() => setSettingsOpen(true)} className="block">
              <Settings className="w-5 h-5 hover:text-[#ba181b]" />
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              aria-label={`Order cart, ${cartUnits} units`}
              onClick={openCart}
              className="relative block"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartUnits > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ba181b] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                  {cartUnits > 999 ? '999+' : cartUnits}
                </span>
              )}
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
          <div className="md:hidden mb-4 space-y-3">
            <div className="flex items-center gap-2 bg-[#161a1d] px-3 py-2 rounded-lg border border-[#ba181b]">
              <label htmlFor="manufacturing-role-mobile" className="text-sm">Role:</label>
              <select
                id="manufacturing-role-mobile"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent border-none text-white font-semibold text-sm focus:outline-none flex-1"
              >
                <option value="guest">Guest</option>
                <option value="customer">B2B Customer</option>
                <option value="manager">Production Manager</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#161a1d] border border-gray-800 rounded-lg px-3 py-2 text-sm font-semibold"
              >
                <Bell className="w-4 h-4" />
                Alerts ({unreadCount})
              </button>
              <button
                onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#161a1d] border border-gray-800 rounded-lg px-3 py-2 text-sm font-semibold"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
            {notifOpen && (
              <div className="bg-[#161a1d] border border-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                  <span className="font-bold text-white text-sm">Notifications</span>
                  <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-xs text-[#ba181b] font-semibold"
                  >
                    Mark all read
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <p className="px-4 py-5 text-sm text-gray-500 text-center">No notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-gray-800 last:border-b-0 ${n.read ? 'opacity-60' : ''}`}>
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />}
                      {n.type === 'info' && <Activity className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />}
                      <button
                        onClick={() => { openNotification(n); setMobileMenuOpen(false); }}
                        className="flex-1 text-left"
                      >
                        <p className="text-sm text-white">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {n.time} <span className="text-[#ba181b] font-semibold">- view</span>
                        </p>
                      </button>
                      <button
                        aria-label={`Dismiss notification: ${n.message}`}
                        onClick={() => setNotifications(notifications.filter(x => x.id !== n.id))}
                        className="text-gray-500 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
            {[
              { page: 'home' as Page, label: 'Home', icon: Home },
              { page: 'products' as Page, label: 'Products', icon: Package },
              { page: 'b2b-portal' as Page, label: 'B2B Portal', icon: Building },
              { page: 'production' as Page, label: 'Production', icon: Factory },
              { page: 'inventory' as Page, label: 'Inventory', icon: Boxes },
              { page: 'quality-control' as Page, label: 'QC', icon: ClipboardCheck },
              { page: 'orders' as Page, label: 'Orders', icon: ShoppingBag },
              { page: 'suppliers' as Page, label: 'Suppliers', icon: Truck },
              { page: 'analytics' as Page, label: 'Analytics', icon: BarChart3 },
              { page: 'contact' as Page, label: 'Contact', icon: Phone }
            ].map(({ page, label, icon: Icon }) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                  setNotifOpen(false);
                }}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  currentPage === page
                    ? 'bg-[#ba181b] text-white'
                    : 'bg-[#161a1d] hover:bg-[#ba181b] border border-gray-800'
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

  // ---------- Home Page ----------

  const HomePage = () => (
    <div className="bg-[#161a1d]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0b090a] via-[#161a1d] to-[#ba181b] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">TechPro Manufacturing</h1>
          <p className="text-xl mb-6 text-gray-300">Advanced B2B manufacturing platform with integrated production management</p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-[#ba181b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              View Products
            </button>
            <button
              onClick={() => setCurrentPage('b2b-portal')}
              className="bg-white text-[#0b090a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              B2B Portal
            </button>
          </div>
        </div>
      </div>

      {/* Production Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Production Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Factory,
              label: 'Active Production Lines',
              value: String(lineStates.filter(l => l.status === 'Running').length),
              status: 'Running',
              color: 'text-green-500',
              page: 'production' as Page
            },
            { icon: Package, label: 'Units Produced Today', value: '2,847', change: '+12%', color: 'text-blue-500', page: 'analytics' as Page },
            { icon: ClipboardCheck, label: 'Quality Pass Rate', value: `${qcPassRate}%`, change: '+1.5%', color: 'text-green-500', page: 'quality-control' as Page },
            { icon: TrendingUp, label: 'Production Efficiency', value: '94.7%', change: '+3.2%', color: 'text-green-500', page: 'production' as Page }
          ].map(({ icon: Icon, label, value, status, change, color, page }) => (
            <button
              key={label}
              onClick={() => setCurrentPage(page)}
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${color}`} />
                {(status || change) && (
                  <span className={`text-sm font-semibold ${color}`}>
                    {status || change}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-1">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#ba181b] font-semibold mt-2 flex items-center gap-1">
                View detail <ChevronRight className="w-3 h-3" />
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-[#0b090a] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Enterprise Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: 'B2B Ordering System',
                desc: 'Complete wholesale ordering platform with custom pricing, bulk discounts, and approval workflows',
                page: 'b2b-portal' as Page
              },
              {
                icon: Factory,
                title: 'Production Scheduling',
                desc: 'Real-time production tracking across multiple facilities with capacity planning and resource allocation',
                page: 'production' as Page
              },
              {
                icon: Boxes,
                title: 'Multi-Facility Inventory',
                desc: 'Centralized inventory management with automatic stock transfers and reorder point optimization',
                page: 'inventory' as Page
              },
              {
                icon: ClipboardCheck,
                title: 'Quality Control Workflows',
                desc: 'Comprehensive QC system with batch tracking, inspection protocols, and compliance reporting',
                page: 'quality-control' as Page
              },
              {
                icon: ShoppingBag,
                title: 'Order Management',
                desc: 'End-to-end order processing from quote to delivery with status tracking and customer portal',
                page: 'orders' as Page
              },
              {
                icon: Truck,
                title: 'Supplier Integration',
                desc: 'Direct supplier connectivity for raw materials procurement with EDI and API integration',
                page: 'suppliers' as Page
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Real-time dashboards with predictive insights, KPI tracking, and custom report generation',
                page: 'analytics' as Page
              },
              {
                icon: Shield,
                title: 'Security & Compliance',
                desc: 'Role-based access control, audit trails, and industry compliance management',
                page: 'b2b-portal' as Page
              },
              {
                icon: Zap,
                title: 'Automation & Integration',
                desc: 'API-first architecture with ERP integration and automated workflow triggers',
                page: 'production' as Page
              }
            ].map(({ icon: Icon, title, desc, page }) => (
              <button
                key={title}
                onClick={() => setCurrentPage(page)}
                className="bg-[#161a1d] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
              >
                <Icon className="w-12 h-12 text-[#ba181b] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, label: 'View Analytics', page: 'analytics' as Page },
            { icon: Factory, label: 'Production Status', page: 'production' as Page },
            { icon: ClipboardCheck, label: 'Quality Reports', page: 'quality-control' as Page },
            { icon: ShoppingBag, label: 'Order Pipeline', page: 'orders' as Page }
          ].map(({ icon: Icon, label, page }) => (
            <button
              key={label}
              onClick={() => setCurrentPage(page)}
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-[#ba181b]" />
              <span className="font-semibold text-white">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ---------- Products Page ----------

  const ProductsPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Product Catalog</h1>
            <p className="text-gray-400">
              Industrial-grade manufacturing components -- {visibleProducts.length} of {products.length} shown
            </p>
          </div>
          <div className="flex gap-3">
            {cartDetail.length > 0 && (
              <button
                onClick={openCart}
                className="bg-[#161a1d] border border-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ba181b] transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Review Order ({cartDetail.length})
              </button>
            )}
            {userRole === 'admin' && (
              <button
                onClick={() => setAddProductOpen(true)}
                className="bg-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Add Product
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 mb-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="manufacturing-products-search" className="block text-sm font-semibold text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="manufacturing-products-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="manufacturing-products-category" className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
              <select
                id="manufacturing-products-category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="manufacturing-products-availability" className="block text-sm font-semibold text-gray-300 mb-2">Availability</label>
              <select
                id="manufacturing-products-availability"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="made-to-order">Made to Order</option>
              </select>
            </div>
            <div>
              <label htmlFor="manufacturing-products-sort" className="block text-sm font-semibold text-gray-300 mb-2">Sort By</label>
              <select
                id="manufacturing-products-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Stock Level</option>
                <option value="lead">Lead Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {visibleProducts.length === 0 ? (
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-12 text-center border border-gray-800">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-white font-semibold text-lg mb-2">No products match your filters</p>
            <p className="text-gray-400 mb-6">Try adjusting your search or clearing the filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setAvailabilityFilter('all');
              }}
              className="bg-[#ba181b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map(product => (
              <div key={product.id} className="bg-[#0b090a] rounded-lg shadow-xl overflow-hidden border border-gray-800 hover:border-[#ba181b] transition-all">
                <div className="h-48 bg-gray-900">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#ba181b] text-white rounded text-xs font-semibold">
                      {product.category}
                    </span>
                    {product.availability === 'made-to-order' && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-semibold">
                        Made to Order
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-3 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">SKU: {product.sku}</p>

                  <div className="space-y-2 mb-4">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">MOQ</p>
                      <p className="font-semibold text-white">{product.moq} units</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Lead Time</p>
                      <p className="font-semibold text-white">{product.leadTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">In Stock</p>
                      <p className="font-semibold text-green-500">{product.inStock} units</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-semibold text-[#ba181b]">${product.price}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add {product.moq} to Order
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openQuote(product)}
                        className="flex-1 px-4 py-2 border-2 border-[#ba181b] text-[#ba181b] rounded-lg hover:bg-[#ba181b] hover:text-white transition-colors font-semibold text-sm"
                      >
                        Request Quote
                      </button>
                      <button
                        onClick={() => setDetailProduct(product)}
                        className="flex-1 px-4 py-2 border-2 border-gray-700 text-gray-300 rounded-lg hover:border-[#ba181b] hover:text-white transition-colors font-semibold text-sm"
                      >
                        Details
                      </button>
                    </div>
                    {cart.some(l => l.productId === product.id) && (
                      <button
                        onClick={openCart}
                        className="w-full text-xs font-semibold text-green-400 hover:text-green-300 flex items-center justify-center gap-1 pt-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {cart.find(l => l.productId === product.id)?.qty} units in current order -- review
                      </button>
                    )}
                    {userRole === 'admin' && (
                      <div className="flex gap-2 pt-2 border-t border-gray-800">
                        <button
                          onClick={() => setProductEdit(product)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-[#161a1d] text-gray-300 border border-gray-800 hover:border-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-[#161a1d] text-gray-300 border border-gray-800 hover:border-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ---------- B2B Portal Page ----------

  const B2BPortalPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">B2B Customer Portal</h1>

        {userRole === 'guest' ? (
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-12 text-center border border-gray-800">
            <Shield className="w-16 h-16 text-[#ba181b] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">B2B Access Required</h2>
            <p className="text-gray-400 mb-6">Please log in with your B2B customer credentials to access this portal</p>
            <button
              onClick={() => setUserRole('customer')}
              className="bg-[#ba181b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Switch to B2B Customer
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Account Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { key: 'balance', label: 'Account Balance', value: '$47,250', icon: DollarSign, color: 'text-blue-500' },
                { key: 'orders', label: 'Active Orders', value: String(orders.filter(o => o.status !== 'delivered').length), icon: ShoppingBag, color: 'text-green-500' },
                { key: 'credit', label: 'Credit Limit', value: '$250K', icon: Award, color: 'text-purple-500' },
                { key: 'credit', label: 'Available Credit', value: '$202K', icon: CheckCircle2, color: 'text-green-500' }
              ].map(({ key, label, value, icon: Icon, color }) => (
                <button
                  key={label}
                  onClick={() => {
                    if (key === 'orders') setCurrentPage('orders');
                    else setB2bModal(key as 'balance' | 'credit');
                  }}
                  className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: ShoppingBag, label: 'New Order', action: () => { setPlacedOrder(null); setB2bModal('new-order'); } },
                  { icon: FileText, label: 'Request Quote', action: () => openQuote(null) },
                  { icon: Download, label: 'Download Invoices', action: () => setB2bModal('invoices') },
                  { icon: Phone, label: 'Contact Rep', action: () => setB2bModal('contact-rep') }
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="p-4 border-2 border-gray-800 rounded-lg text-gray-300 hover:border-[#ba181b] hover:bg-[#ba181b] hover:text-white transition-all"
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-semibold">{label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 4).map(order => (
                    <button
                      key={order.id}
                      onClick={() => setOrderDetail(order)}
                      className="w-full flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
                    >
                      <div>
                        <p className="font-semibold text-white">{order.id}</p>
                        <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#ba181b]">${order.total.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'delivered' ? 'bg-green-900 text-green-300' :
                          order.status === 'shipping' ? 'bg-blue-900 text-blue-300' :
                          order.status === 'production' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-800 text-gray-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Custom Pricing</h3>
                <div className="space-y-4">
                  {products.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all">
                      <button onClick={() => setDetailProduct(product)} className="flex-1 text-left">
                        <p className="font-semibold text-white text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.sku} -- view specs</p>
                      </button>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#ba181b]">${(product.price * 0.85).toFixed(2)}</p>
                        <p className="text-xs text-gray-400 line-through">${product.price}</p>
                      </div>
                      <button
                        aria-label={`Add ${product.name} to order`}
                        title="Add to order"
                        onClick={() => addToCart(product)}
                        className="p-2 rounded-lg bg-[#ba181b] text-white hover:bg-red-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setCurrentPage('products')}
                    className="w-full bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    View Full Catalog
                  </button>
                </div>
              </div>
            </div>

            {/* Contract Information */}
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Contract Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Contract Type</p>
                  <p className="text-white font-semibold">Annual Volume Agreement</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Renewal Date</p>
                  <p className="text-white font-semibold">December 31, 2024</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Volume Commitment</p>
                  <p className="text-white font-semibold">$500K/year</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={downloadAgreement}
                  className="flex-1 bg-[#ba181b] text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Agreement Summary
                </button>
                <button
                  onClick={() => setB2bModal('contact-rep')}
                  className="flex-1 border-2 border-gray-700 text-gray-300 px-4 py-3 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Discuss Renewal With Your Rep
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ---------- Production Dashboard Page ----------

  const ProductionPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Production Dashboard</h1>
            <p className="text-gray-400">
              Real-time manufacturing floor monitoring
              {selectedFacility !== 'all' && ` -- ${facilityLabels[selectedFacility]}`}
            </p>
          </div>
          <select
            aria-label="Select facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-4 py-2 bg-[#0b090a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
          >
            <option value="all">All Facilities</option>
            <option value="main">Main Plant</option>
            <option value="west">West Facility</option>
            <option value="east">East Facility</option>
          </select>
        </div>

        {/* Production Line Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {visibleLines.map(item => (
            <button
              key={item.line}
              onClick={() => setSelectedLine(item)}
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{item.line}</h3>
                <div className={`w-3 h-3 rounded-full ${item.color} ${item.status === 'Running' ? 'animate-pulse' : ''}`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Facility</span>
                  <span className="text-white font-semibold">{facilityLabels[item.facility]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-white font-semibold">{item.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Output</span>
                  <span className="text-white font-semibold">{item.output}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Efficiency</span>
                  <span className="text-green-400 font-semibold">{item.efficiency}</span>
                </div>
              </div>
              <p className="text-xs text-[#ba181b] font-semibold mt-4 flex items-center gap-1">
                Line detail and controls <ChevronRight className="w-3 h-3" />
              </p>
            </button>
          ))}
        </div>

        {/* Active Production Jobs */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Active Production Jobs</h2>
          {visibleJobs.length === 0 ? (
            <p className="text-gray-400 py-6 text-center">No active jobs at this facility. Select a different facility to see its jobs.</p>
          ) : (
            <div className="space-y-4">
              {visibleJobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="w-full text-left border-2 border-gray-800 rounded-lg p-6 hover:border-[#ba181b] transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{job.product}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.priority === 'urgent' ? 'bg-red-900 text-red-300' :
                          job.priority === 'high' ? 'bg-orange-900 text-orange-300' :
                          job.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-800 text-gray-300'
                        }`}>
                          {job.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'completed' ? 'bg-green-900 text-green-300' :
                          job.status === 'in-progress' ? 'bg-blue-900 text-blue-300' :
                          job.status === 'scheduled' ? 'bg-purple-900 text-purple-300' :
                          'bg-gray-800 text-gray-300'
                        }`}>
                          {job.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>
                          <p className="text-gray-500">Job ID</p>
                          <p className="text-white font-semibold">{job.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Quantity</p>
                          <p className="text-white font-semibold">{job.quantity} units</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Production Line</p>
                          <p className="text-white font-semibold">{job.line}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Due Date</p>
                          <p className="text-white font-semibold">{new Date(job.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-400">Production Progress</span>
                      <span className="text-sm font-bold text-white">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          job.progress === 100 ? 'bg-green-500' :
                          job.progress >= 50 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Production Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Today&apos;s Production</h3>
            <div className="space-y-4">
              {[
                { label: 'Target Output', value: '3,000', actual: '2,847', percent: 95 },
                { label: 'Quality Pass', value: '2,800', actual: '2,795', percent: 99.8 },
                { label: 'Downtime', value: '< 5%', actual: '2.3%', percent: 54 }
              ].map(({ label, value, actual, percent }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-400">{label}</span>
                    <span className="text-sm font-bold text-white">{actual} / {value}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percent >= 95 ? 'bg-green-500' :
                        percent >= 80 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
              {prodAlerts.length > 0 && (
                <button
                  onClick={() => { setProdAlerts([]); showToast('All floor alerts acknowledged'); }}
                  className="text-xs text-[#ba181b] hover:text-red-400 font-semibold"
                >
                  Acknowledge all
                </button>
              )}
            </div>
            {prodAlerts.length === 0 ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-white font-semibold">No open floor alerts</p>
                <button
                  onClick={() => { setProdAlerts(defaultProdAlerts); showToast('Alert feed restored'); }}
                  className="text-xs text-[#ba181b] hover:text-red-400 font-semibold mt-3"
                >
                  Restore demo alerts
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {prodAlerts.map(alert => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                    {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                    {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                    {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <button
                      onClick={() => dismissProdAlert(alert.id)}
                      className="text-xs font-semibold text-gray-400 hover:text-white border border-gray-700 hover:border-[#ba181b] rounded px-2 py-1"
                    >
                      Ack
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Inventory Management Page ----------

  const InventoryPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400">Multi-facility stock tracking</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setImportOpen(true)}
              className="bg-[#ba181b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import
            </button>
            <button
              onClick={handleExportInventory}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total SKUs', value: '1,247', icon: Package, color: 'text-blue-500', action: () => setInventoryStat('skus'), hint: 'Breakdown by facility' },
            { label: 'Total Value', value: '$2.4M', icon: DollarSign, color: 'text-green-500', action: () => setInventoryStat('value'), hint: 'Valuation detail' },
            { label: 'Low Stock Items', value: String(lowStockCount), icon: AlertTriangle, color: 'text-yellow-500', action: () => setStockFilter('low'), hint: 'Filter alert table' },
            { label: 'Out of Stock', value: String(outOfStockCount), icon: AlertTriangle, color: 'text-red-500', action: () => setStockFilter('out'), hint: 'Filter alert table' }
          ].map(({ label, value, icon: Icon, color, action, hint }) => (
            <button
              key={label}
              onClick={action}
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <Icon className={`w-6 h-6 ${color} mb-2`} />
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
              <p className="text-xs text-[#ba181b] font-semibold mt-2 flex items-center gap-1">
                {hint} <ChevronRight className="w-3 h-3" />
              </p>
            </button>
          ))}
        </div>

        {/* Inventory by Location */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Inventory by Facility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(facilityStats).map(({ name, items, value, capacity, key }) => (
              <button
                key={name}
                onClick={() => setFacilityDetail(key)}
                className="border border-gray-800 rounded-lg p-4 text-left hover:border-[#ba181b] transition-all"
              >
                <h3 className="font-bold text-white mb-4">{name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Items</span>
                    <span className="text-white font-semibold">{items}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Value</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Capacity</span>
                      <span className="text-white font-semibold">{capacity}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          capacity >= 80 ? 'bg-red-500' :
                          capacity >= 60 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${capacity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#ba181b] font-semibold mt-4 flex items-center gap-1">
                  Facility detail <ChevronRight className="w-3 h-3" />
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-xl font-bold text-white">
              Stock Alerts <span className="text-sm font-normal text-gray-400">({visibleStock.length} shown)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {([
                { id: 'all' as const, label: `All (${stockAlerts.length})` },
                { id: 'low' as const, label: `Low (${lowStockCount})` },
                { id: 'critical' as const, label: `Critical (${criticalStockCount})` },
                { id: 'out' as const, label: `Out (${outOfStockCount})` }
              ]).map(f => (
                <button
                  key={f.id}
                  onClick={() => setStockFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    stockFilter === f.id
                      ? 'bg-[#ba181b] text-white border-[#ba181b]'
                      : 'bg-[#161a1d] text-gray-300 border-gray-800 hover:border-[#ba181b]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#161a1d]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Current</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Min Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {visibleStock.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#161a1d]">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setStockDetail(item)}
                        className="text-white font-semibold hover:text-[#ba181b] transition-colors text-left"
                      >
                        {item.product}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{item.sku}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{item.location}</td>
                    <td className="px-6 py-4 text-white font-semibold">{item.current}</td>
                    <td className="px-6 py-4 text-gray-400">{item.min}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'critical' ? 'bg-red-900 text-red-300' :
                        item.status === 'out' ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {reordered.includes(item.sku) ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-semibold bg-green-900 text-green-300">
                          <CheckCircle2 className="w-4 h-4" />
                          PO Created
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReorder(item.sku, item.product)}
                          className="bg-[#ba181b] text-white px-4 py-1 rounded text-sm font-semibold hover:bg-red-700"
                        >
                          Reorder
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibleStock.length === 0 && (
            <div className="text-center py-10">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <p className="text-white font-semibold">No items in this status</p>
              <button
                onClick={() => setStockFilter('all')}
                className="text-sm text-[#ba181b] hover:text-red-400 font-semibold mt-2"
              >
                Show all stock alerts
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <p className="text-xs text-gray-500">Reorder creates a purchase order that appears under Suppliers &gt; Pending Approvals.</p>
            <button
              onClick={() => setCurrentPage('suppliers')}
              className="text-xs font-semibold text-[#ba181b] hover:text-red-400 flex items-center gap-1"
            >
              Go to approval queue <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Quality Control Page ----------

  const QualityControlPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-white">Quality Control Center</h1>
          {qcPendingCount > 0 && (
            <button
              onClick={() => setQcFilter('pending')}
              className="bg-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <ClipboardCheck className="w-5 h-5" />
              {qcPendingCount} inspection{qcPendingCount === 1 ? '' : 's'} awaiting results
            </button>
          )}
        </div>

        {/* QC Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Overall Pass Rate', value: `${qcPassRate}%`, icon: CheckCircle2, color: 'text-green-500', filter: 'all' as const },
            { label: 'Pending Inspections', value: String(qcPendingCount), icon: Clock, color: 'text-yellow-500', filter: 'pending' as const },
            { label: 'Failed Batches', value: String(qcFailedCount), icon: AlertTriangle, color: 'text-red-500', filter: 'failed' as const },
            { label: 'Passed Batches', value: String(qcPassedCount), icon: ClipboardCheck, color: 'text-blue-500', filter: 'passed' as const }
          ].map(({ label, value, icon: Icon, color, filter }) => (
            <button
              key={label}
              onClick={() => setQcFilter(filter)}
              className={`bg-[#0b090a] rounded-lg shadow-xl p-6 border transition-all text-left ${
                qcFilter === filter ? 'border-[#ba181b]' : 'border-gray-800 hover:border-[#ba181b]'
              }`}
            >
              <Icon className={`w-8 h-8 ${color} mb-3`} />
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
              <p className="text-xs text-[#ba181b] font-semibold mt-2">
                {qcFilter === filter ? 'Filtering list' : 'Filter list'}
              </p>
            </button>
          ))}
        </div>

        {/* Recent Quality Checks */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-2xl font-bold text-white">
              Recent Quality Checks <span className="text-sm font-normal text-gray-400">({visibleQc.length} of {qcChecks.length})</span>
            </h2>
            {qcFilter !== 'all' && (
              <button
                onClick={() => setQcFilter('all')}
                className="text-sm font-semibold text-[#ba181b] hover:text-red-400"
              >
                Clear filter
              </button>
            )}
          </div>
          {visibleQc.length === 0 && (
            <div className="text-center py-10">
              <ClipboardCheck className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">No inspections with this status</p>
              <button onClick={() => setQcFilter('all')} className="text-sm text-[#ba181b] font-semibold hover:text-red-400">
                Show all inspections
              </button>
            </div>
          )}
          <div className="space-y-4">
            {visibleQc.map(check => (
              <button
                key={check.id}
                onClick={() => setSelectedQC(check)}
                className="w-full text-left border-2 border-gray-800 rounded-lg p-6 hover:border-[#ba181b] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{check.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        check.status === 'passed' ? 'bg-green-900 text-green-300' :
                        check.status === 'failed' ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {check.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">QC ID</p>
                        <p className="text-white font-semibold">{check.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Batch Number</p>
                        <p className="text-white font-semibold">{check.batchNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Inspector</p>
                        <p className="text-white font-semibold">{check.inspector}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-white font-semibold">{new Date(check.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">{check.passed}</p>
                    <p className="text-sm text-gray-400">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-500">{check.defects}</p>
                    <p className="text-sm text-gray-400">Defects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{check.total}</p>
                    <p className="text-sm text-gray-400">Total Units</p>
                  </div>
                </div>

                {check.status === 'passed' && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-400">Pass Rate</span>
                      <span className="text-sm font-bold text-green-500">
                        {((check.passed / check.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(check.passed / check.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* QC Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Inspection Checklist</h3>
              <button
                onClick={() => { setChecklist(defaultChecklist); persist('techpro-checklist', defaultChecklist); showToast('Checklist reset'); }}
                className="text-xs font-semibold text-[#ba181b] hover:text-red-400"
              >
                Reset
              </button>
            </div>
            <div className="space-y-3">
              {checklist.map(({ item, status }) => (
                <button
                  key={item}
                  onClick={() => advanceChecklist(item)}
                  className="w-full flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
                >
                  <span className="text-white font-semibold">{item}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === 'completed' ? 'bg-green-900 text-green-300' :
                    status === 'in-progress' ? 'bg-blue-900 text-blue-300' :
                    'bg-gray-800 text-gray-300'
                  }`}>
                    {status}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Tap a step to advance it: pending, in progress, completed. Progress is saved on this device.
            </p>
          </div>

          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Defect Categories</h3>
            <div className="space-y-4">
              {[
                { category: 'Dimensional', percent: 40, color: 'bg-red-500' },
                { category: 'Surface Finish', percent: 27, color: 'bg-orange-500' },
                { category: 'Functional', percent: 20, color: 'bg-yellow-500' },
                { category: 'Other', percent: 13, color: 'bg-gray-500' }
              ].map(({ category, percent, color }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-400">{category}</span>
                    <span className="text-sm font-bold text-white">
                      {Math.round((qcDefectTotal * percent) / 100)} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Based on {qcDefectTotal} defects across {completedQc.length} completed inspections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Order Management Page ----------

  const OrdersPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Order Management</h1>
            <p className="text-gray-400">
              {visibleOrders.length} of {orders.length} orders shown
              {orderStatusFilter !== 'all' && ` -- filtered by ${orderStatusFilter.replace('-', ' ')}`}
            </p>
          </div>
          <button
            onClick={openCart}
            className="bg-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartDetail.length > 0 ? `Resume Order Draft (${cartDetail.length})` : 'Start New Order'}
          </button>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {([
            { status: 'Pending', key: 'pending' as const, color: 'bg-gray-500' },
            { status: 'Production', key: 'production' as const, color: 'bg-blue-500' },
            { status: 'QC Check', key: 'quality-check' as const, color: 'bg-yellow-500' },
            { status: 'Shipping', key: 'shipping' as const, color: 'bg-purple-500' },
            { status: 'Delivered', key: 'delivered' as const, color: 'bg-green-500' }
          ]).map(({ status, key, color }) => (
            <button
              key={status}
              onClick={() => setOrderStatusFilter(orderStatusFilter === key ? 'all' : key)}
              className={`bg-[#0b090a] rounded-lg shadow-xl p-6 border transition-all text-left ${
                orderStatusFilter === key ? 'border-[#ba181b]' : 'border-gray-800 hover:border-[#ba181b]'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${color} mb-3`}></div>
              <p className="text-3xl font-bold text-white mb-1">{orderCounts[key]}</p>
              <p className="text-gray-400 text-sm">{status}</p>
              <p className="text-xs text-[#ba181b] font-semibold mt-2">
                {orderStatusFilter === key ? 'Filtering -- tap to clear' : 'Filter'}
              </p>
            </button>
          ))}
        </div>

        {/* Order filters */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 mb-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="manufacturing-orders-search" className="block text-sm font-semibold text-gray-300 mb-2">Search orders</label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="manufacturing-orders-search"
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Order ID or customer name..."
                  className="w-full pl-10 pr-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="manufacturing-orders-status" className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
              <select
                id="manufacturing-orders-status"
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value as 'all' | Order['status'])}
                className={inputCls}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="production">Production</option>
                <option value="quality-check">Quality Check</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#161a1d]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Products</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Delivery</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {visibleOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#161a1d]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{order.id}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-400">{order.products} items</td>
                    <td className="px-6 py-4 font-bold text-[#ba181b]">${order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'delivered' ? 'bg-green-900 text-green-300' :
                        order.status === 'shipping' ? 'bg-purple-900 text-purple-300' :
                        order.status === 'quality-check' ? 'bg-yellow-900 text-yellow-300' :
                        order.status === 'production' ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          aria-label={`View details for ${order.id}`}
                          title="View order details"
                          onClick={() => setOrderDetail(order)}
                          className="p-2 text-[#ba181b] hover:bg-[#ba181b] hover:text-white rounded transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          aria-label={`Update status for ${order.id}`}
                          title="Update order status"
                          onClick={() => setOrderEdit(order)}
                          className="p-2 text-blue-500 hover:bg-blue-500 hover:text-white rounded transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibleOrders.length === 0 && (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-2">No orders match your filters</p>
              <p className="text-gray-400 mb-6">Try a different status or clear the search.</p>
              <button
                onClick={() => { setOrderStatusFilter('all'); setOrderSearch(''); }}
                className="bg-[#ba181b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ---------- Supplier Portal Page ----------

  const SuppliersPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Supplier Portal</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Active Suppliers */}
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Active Suppliers</h2>
              <div className="space-y-4">
                {suppliers.map(supplier => (
                  <div key={supplier.id} className={`border border-gray-800 rounded-lg p-4 hover:border-[#ba181b] transition-all ${supplier.active ? '' : 'opacity-60'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-lg">{supplier.name}</h3>
                          {!supplier.active && (
                            <span className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs font-semibold">Inactive</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{supplier.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSupplierDetail(supplier)}
                          className="border-2 border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:border-[#ba181b] hover:text-white transition-colors text-sm font-semibold"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setSupplierContact(supplier)}
                          className="bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setSupplierDetail(supplier)}
                      className="w-full grid grid-cols-3 gap-4 text-center"
                    >
                      <div>
                        <p className="text-2xl font-bold text-white">{supplier.orders}</p>
                        <p className="text-xs text-gray-400">Orders</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-500">{supplier.rating}</p>
                        <p className="text-xs text-gray-400">Rating</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-500">{supplier.onTime}%</p>
                        <p className="text-xs text-gray-400">On-Time</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: ShoppingBag, label: 'New Purchase Order', action: () => setSupplierModal('po') },
                  { icon: FileText, label: 'View Contracts', action: () => setSupplierModal('contracts') },
                  { icon: BarChart3, label: 'Supplier Reports', action: () => setSupplierModal('reports') },
                  { icon: Settings, label: 'Manage Suppliers', action: () => setSupplierModal('manage') }
                ].map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg text-gray-300 hover:bg-[#ba181b] hover:text-white transition-all border border-gray-800"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#ba181b] text-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Pending Approvals</h3>
              <p className="text-4xl font-bold mb-2">{pendingApprovals.length}</p>
              <p className="text-sm mb-4">Purchase orders awaiting approval</p>
              <button
                onClick={() => setSupplierModal('approvals')}
                className="w-full bg-white text-[#ba181b] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Review Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Analytics Dashboard Page ----------

  const AnalyticsPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Real-time insights and performance metrics</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              aria-label="Select date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-[#0b090a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={handleExportAnalytics}
              className="bg-[#ba181b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {rangeData.kpis.map(({ label, value, change, trend }) => (
            <button
              key={label}
              onClick={() => setKpiDetail(label)}
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <p className="text-gray-400 text-sm mb-2">{label}</p>
              <p className="text-3xl font-bold text-white mb-2">{value}</p>
              <p className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </p>
              <p className="text-xs text-[#ba181b] font-semibold mt-3 flex items-center gap-1">
                Breakdown <ChevronRight className="w-3 h-3" />
              </p>
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-5 h-5 text-[#ba181b]" />
              <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
            </div>
            {renderBarChart(rangeData.revenue)}
          </div>

          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-[#ba181b]" />
              <h3 className="text-xl font-bold text-white">Production by Product</h3>
            </div>
            {renderProductionChart(rangeData.production)}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { metric: 'Production Efficiency', value: 94.7, target: 95, color: 'bg-blue-500' },
              { metric: 'On-Time Delivery', value: 96.5, target: 95, color: 'bg-green-500' },
              { metric: 'Material Utilization', value: 87.3, target: 90, color: 'bg-yellow-500' },
              { metric: 'Customer Retention', value: 92.8, target: 90, color: 'bg-purple-500' }
            ].map(({ metric, value, target, color }) => (
              <div key={metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-400">{metric}</span>
                  <span className="text-sm font-bold text-white">{value}% / {target}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className={`${color} h-3 rounded-full`} style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Contact Page ----------

  const ContactPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              {contactSubmitted ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3 text-white">✓</div>
                  <p className="text-lg font-semibold text-white">Message sent!</p>
                  <p className="text-gray-400 mt-2">A TechPro rep will get back to you soon.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="manufacturing-contact-name" className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                      <input
                        id="manufacturing-contact-name"
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="manufacturing-contact-company" className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                      <input
                        id="manufacturing-contact-company"
                        type="text"
                        name="company"
                        className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="manufacturing-contact-email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                    <input
                      id="manufacturing-contact-email"
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="manufacturing-contact-department" className="block text-sm font-semibold text-gray-300 mb-2">Department</label>
                    <select id="manufacturing-contact-department" name="department" className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent">
                      <option>Sales Inquiry</option>
                      <option>Technical Support</option>
                      <option>Quality Assurance</option>
                      <option>Supplier Relations</option>
                      <option>General Information</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="manufacturing-contact-message" className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                    <textarea
                      id="manufacturing-contact-message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  {contactError && (
                    <p className="text-sm font-semibold text-red-400">{contactError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#ba181b] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Head Office</h3>
              <div className="space-y-4">
                <a
                  href="https://maps.google.com/?q=5000+Industrial+Pkwy+Detroit+MI+48201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-2 -m-2 rounded-lg hover:bg-[#161a1d] transition-colors"
                >
                  <MapPin className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">TechPro Manufacturing</p>
                    <p className="text-gray-400 text-sm">5000 Industrial Pkwy<br />Detroit, MI 48201</p>
                    <p className="text-xs text-[#ba181b] font-semibold mt-1">Open in maps</p>
                  </div>
                </a>
                <a
                  href="tel:5552003000"
                  className="flex items-start gap-3 p-2 -m-2 rounded-lg hover:bg-[#161a1d] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-gray-400 text-sm">(555) 200-3000</p>
                  </div>
                </a>
                <a
                  href="mailto:info@techpro-mfg.com"
                  className="flex items-start gap-3 p-2 -m-2 rounded-lg hover:bg-[#161a1d] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-400 text-sm">info@techpro-mfg.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#ba181b] text-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-sm mb-4">For urgent production issues</p>
              <a href="tel:5559117763" className="block text-2xl font-bold mb-4 underline decoration-white/40 hover:decoration-white">
                (555) 911-PROD
              </a>
              <p className="text-xs opacity-90 mb-4">Emergency production support available 24/7</p>
              <button
                onClick={() => setCurrentPage('production')}
                className="w-full bg-white text-[#ba181b] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Check Line Status First
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Footer ----------

  const Footer = () => (
    <footer className="bg-[#0b090a] text-white mt-16 border-t-2 border-[#ba181b]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Factory className="w-8 h-8 text-[#ba181b]" />
              <span className="text-xl font-bold">TechPro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced B2B manufacturing platform with integrated production management.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => goToProductsWithCategory('Control Systems')} className="hover:text-white">Control Systems</button></li>
              <li><button onClick={() => goToProductsWithCategory('Motors & Drives')} className="hover:text-white">Motors & Drives</button></li>
              <li><button onClick={() => goToProductsWithCategory('Sensors')} className="hover:text-white">Sensors</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Custom Solutions</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => setCurrentPage('b2b-portal')} className="hover:text-white">B2B Portal</button></li>
              <li><button onClick={() => setCurrentPage('production')} className="hover:text-white">Production</button></li>
              <li><button onClick={() => setCurrentPage('quality-control')} className="hover:text-white">Quality Control</button></li>
              <li><button onClick={() => setCurrentPage('analytics')} className="hover:text-white">Analytics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="tel:5552003000" className="hover:text-white">(555) 200-3000</a></li>
              <li><a href="mailto:info@techpro-mfg.com" className="hover:text-white">info@techpro-mfg.com</a></li>
              <li><a href="tel:5559117763" className="hover:text-white">24/7 Support: (555) 911-PROD</a></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Send a message</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 TechPro Manufacturing. All rights reserved.</p>
          <p className="mt-2">Enterprise Platform Demo: $7,500 Tier</p>
        </div>
      </div>
    </footer>
  );

  // ---------- Modals ----------

  const productDetailModal = detailProduct && modalShell(
    detailProduct.name,
    () => setDetailProduct(null),
    (
      <div>
        <div className="h-52 bg-gray-900 rounded-lg overflow-hidden mb-4">
          <img src={detailProduct.image} alt={detailProduct.name} className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-[#ba181b] text-white rounded text-xs font-semibold">{detailProduct.category}</span>
          <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-semibold">
            {detailProduct.availability === 'made-to-order' ? 'Made to Order' : 'In Stock'}
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">SKU: {detailProduct.sku}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Unit Price</p>
            <p className="font-bold text-[#ba181b] text-lg">${detailProduct.price.toLocaleString()}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Minimum Order</p>
            <p className="font-bold text-white text-lg">{detailProduct.moq} units</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Lead Time</p>
            <p className="font-bold text-white text-lg">{detailProduct.leadTime}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Current Stock</p>
            <p className="font-bold text-green-500 text-lg">{detailProduct.inStock} units</p>
          </div>
        </div>
        <h4 className="font-bold text-white mb-2">Specifications</h4>
        <div className="space-y-2 mb-6">
          {detailProduct.specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {spec}
            </div>
          ))}
        </div>
        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 mb-6 text-sm text-gray-300">
          <p className="mb-2">Volume pricing available: 10% off at 2x MOQ, 15% off with an annual volume agreement.</p>
          <p>All units ship with material certs and full QC batch documentation.</p>
        </div>
        <button
          onClick={() => {
            const p = detailProduct;
            setDetailProduct(null);
            openQuote(p);
          }}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          Request Quote for This Product
        </button>
      </div>
    )
  );

  const quoteModal = quoteOpen && modalShell(
    quoteProduct ? `Request Quote: ${quoteProduct.name}` : 'Request a Quote',
    closeQuote,
    quoteSubmitted ? (
      <div className="text-center py-8">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <p className="text-lg font-bold text-white mb-2">Quote request received!</p>
        <p className="text-gray-400 mb-6">Our sales team will send pricing within one business day.</p>
        <button
          onClick={closeQuote}
          className="bg-[#ba181b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    ) : (
      <form className="space-y-4" onSubmit={handleQuoteSubmit}>
        {quoteProduct ? (
          <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white text-sm">{quoteProduct.name}</p>
              <p className="text-xs text-gray-400">SKU: {quoteProduct.sku} | MOQ: {quoteProduct.moq} units</p>
            </div>
            <p className="font-bold text-[#ba181b]">${quoteProduct.price.toLocaleString()}</p>
          </div>
        ) : (
          <div>
            <label htmlFor="manufacturing-quote-product" className="block text-sm font-semibold text-gray-300 mb-2">Product</label>
            <select id="manufacturing-quote-product" name="product" className={inputCls}>
              {products.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-quote-name" className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
            <input id="manufacturing-quote-name" type="text" name="name" required className={inputCls} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="manufacturing-quote-company" className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
            <input id="manufacturing-quote-company" type="text" name="company" className={inputCls} placeholder="Company name" />
          </div>
        </div>
        <div>
          <label htmlFor="manufacturing-quote-email" className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
          <input id="manufacturing-quote-email" type="email" name="email" required className={inputCls} placeholder="your@email.com" />
        </div>
        <div>
          <label htmlFor="manufacturing-quote-quantity" className="block text-sm font-semibold text-gray-300 mb-2">Quantity</label>
          <input
            id="manufacturing-quote-quantity"
            type="number"
            name="quantity"
            min={1}
            defaultValue={quoteProduct ? quoteProduct.moq : 10}
            required
            className={inputCls}
          />
          {quoteProduct && (
            <p className="text-xs text-gray-500 mt-1">Minimum order quantity: {quoteProduct.moq} units</p>
          )}
        </div>
        <div>
          <label htmlFor="manufacturing-quote-notes" className="block text-sm font-semibold text-gray-300 mb-2">Notes</label>
          <textarea id="manufacturing-quote-notes" name="notes" rows={3} className={inputCls} placeholder="Specs, target price, delivery requirements..."></textarea>
        </div>
        {quoteError && <p className="text-sm font-semibold text-red-400">{quoteError}</p>}
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Submit Quote Request
        </button>
      </form>
    )
  );

  const addProductModal = addProductOpen && modalShell(
    'Add Product',
    () => setAddProductOpen(false),
    (
      <form className="space-y-4" onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="manufacturing-add-name" className="block text-sm font-semibold text-gray-300 mb-2">Product Name</label>
          <input id="manufacturing-add-name" type="text" name="name" required className={inputCls} placeholder="e.g. Industrial Relay Module RM-50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-add-sku" className="block text-sm font-semibold text-gray-300 mb-2">SKU</label>
            <input id="manufacturing-add-sku" type="text" name="sku" required className={inputCls} placeholder="RM-50-MOD" />
          </div>
          <div>
            <label htmlFor="manufacturing-add-category" className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
            <select id="manufacturing-add-category" name="category" className={inputCls}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="manufacturing-add-price" className="block text-sm font-semibold text-gray-300 mb-2">Price ($)</label>
            <input id="manufacturing-add-price" type="number" name="price" min={0} step="0.01" required className={inputCls} placeholder="499.00" />
          </div>
          <div>
            <label htmlFor="manufacturing-add-moq" className="block text-sm font-semibold text-gray-300 mb-2">MOQ</label>
            <input id="manufacturing-add-moq" type="number" name="moq" min={1} required className={inputCls} placeholder="10" />
          </div>
          <div>
            <label htmlFor="manufacturing-add-stock" className="block text-sm font-semibold text-gray-300 mb-2">In Stock</label>
            <input id="manufacturing-add-stock" type="number" name="inStock" min={0} required className={inputCls} placeholder="100" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-add-lead" className="block text-sm font-semibold text-gray-300 mb-2">Lead Time</label>
            <input id="manufacturing-add-lead" type="text" name="leadTime" className={inputCls} placeholder="2-3 weeks" />
          </div>
          <div>
            <label htmlFor="manufacturing-add-availability" className="block text-sm font-semibold text-gray-300 mb-2">Availability</label>
            <select id="manufacturing-add-availability" name="availability" className={inputCls}>
              <option value="in-stock">In Stock</option>
              <option value="made-to-order">Made to Order</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="manufacturing-add-specs" className="block text-sm font-semibold text-gray-300 mb-2">Specs (comma separated)</label>
          <input id="manufacturing-add-specs" type="text" name="specs" className={inputCls} placeholder="IP65 Rated, CE Certified, 24V DC" />
        </div>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Add to Catalog
        </button>
      </form>
    )
  );

  const newOrderModal = b2bModal === 'new-order' && modalShell(
    'New B2B Order',
    () => { setB2bModal(null); setPlacedOrder(null); },
    placedOrder ? (
      <div className="text-center py-6">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <p className="text-lg font-bold text-white mb-2">Order Placed</p>
        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 text-left space-y-2 mb-4">
          <div className="flex justify-between text-sm"><span className="text-gray-400">Order ID</span><span className="text-white font-semibold">{placedOrder.id}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Total (B2B pricing)</span><span className="text-[#ba181b] font-bold">${placedOrder.total.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Status</span><span className="text-white font-semibold">Pending</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Est. Delivery</span><span className="text-white font-semibold">{new Date(placedOrder.deliveryDate).toLocaleDateString()}</span></div>
        </div>
        <p className="text-xs text-gray-500 mb-4">Simulated order for demo purposes. No payment was processed.</p>
        <div className="flex gap-3">
          <button
            onClick={() => { setB2bModal(null); setPlacedOrder(null); setCurrentPage('orders'); }}
            className="flex-1 bg-[#ba181b] text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            View Orders
          </button>
          <button
            onClick={() => { setB2bModal(null); setPlacedOrder(null); }}
            className="flex-1 border-2 border-gray-700 text-gray-300 px-4 py-3 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    ) : (
      <form className="space-y-4" onSubmit={handleNewOrder}>
        <div>
          <label htmlFor="manufacturing-order-product" className="block text-sm font-semibold text-gray-300 mb-2">Product</label>
          <select id="manufacturing-order-product" name="productId" className={inputCls}>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (${(p.price * 0.85).toFixed(2)} B2B, MOQ {p.moq})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="manufacturing-order-qty" className="block text-sm font-semibold text-gray-300 mb-2">Quantity</label>
          <input id="manufacturing-order-qty" type="number" name="quantity" min={1} defaultValue={10} required className={inputCls} />
          <p className="text-xs text-gray-500 mt-1">Quantities below the product MOQ are automatically raised to the MOQ.</p>
        </div>
        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 text-sm text-gray-300">
          Your contract pricing (15% off list) is applied automatically. Orders route to your approval workflow before production.
        </div>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Place Order
        </button>
      </form>
    )
  );

  const invoicesModal = b2bModal === 'invoices' && modalShell(
    'Invoices',
    () => setB2bModal(null),
    (
      <div className="space-y-3">
        {invoices.map(inv => (
          <div key={inv.id} className="flex items-center justify-between p-4 bg-[#161a1d] rounded-lg border border-gray-800">
            <div>
              <p className="font-semibold text-white">{inv.id}</p>
              <p className="text-xs text-gray-400">{inv.orderId} | {new Date(inv.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-[#ba181b]">${inv.amount.toLocaleString()}</p>
              <button
                onClick={() => downloadInvoice(inv)}
                className="flex items-center gap-1 bg-[#ba181b] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-500">Downloads are sample demo documents.</p>
      </div>
    )
  );

  const contactRepModal = b2bModal === 'contact-rep' && modalShell(
    'Your Account Rep',
    () => setB2bModal(null),
    (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#ba181b] flex items-center justify-center text-white text-2xl font-bold">
            {accountRep.name.split(' ').map(w => w[0]).join('')}
          </div>
          <div>
            <p className="text-lg font-bold text-white">{accountRep.name}</p>
            <p className="text-sm text-gray-400">{accountRep.title}</p>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <a href={`tel:${accountRep.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all">
            <Phone className="w-5 h-5 text-[#ba181b]" />
            <span className="text-white font-semibold">{accountRep.phone}</span>
          </a>
          <a href={`mailto:${accountRep.email}`} className="flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all">
            <Mail className="w-5 h-5 text-[#ba181b]" />
            <span className="text-white font-semibold">{accountRep.email}</span>
          </a>
        </div>
        <button
          onClick={() => { setB2bModal(null); setCurrentPage('contact'); }}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          Send a Message
        </button>
      </div>
    )
  );

  const balanceModal = b2bModal === 'balance' && modalShell(
    'Account Balance',
    () => setB2bModal(null),
    (
      <div>
        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 mb-4 flex items-center justify-between">
          <span className="text-gray-400 text-sm">Current Balance</span>
          <span className="text-2xl font-bold text-white">$47,250</span>
        </div>
        <h4 className="font-bold text-white mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
              <div>
                <p className="text-sm font-semibold text-white">{t.desc}</p>
                <p className="text-xs text-gray-500">{t.id} | {new Date(t.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-bold ${t.amount < 0 ? 'text-green-500' : 'text-white'}`}>
                {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">Payments reduce your balance; issued invoices increase it. Terms: Net 45.</p>
      </div>
    )
  );

  const creditModal = b2bModal === 'credit' && modalShell(
    'Credit Overview',
    () => setB2bModal(null),
    (
      <div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <span className="text-gray-400 text-sm">Credit Limit</span>
            <span className="font-bold text-white">$250,000</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <span className="text-gray-400 text-sm">Outstanding Balance</span>
            <span className="font-bold text-white">$47,250</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <span className="text-gray-400 text-sm">Available Credit</span>
            <span className="font-bold text-green-500">$202,750</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <span className="text-gray-400 text-sm">Payment Terms</span>
            <span className="font-bold text-white">Net 45</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-400">Credit Utilization</span>
            <span className="text-sm font-bold text-white">19%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: '19%' }}></div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">Need a higher limit? Contact your account rep to request a credit review.</p>
      </div>
    )
  );

  const jobModal = selectedJob && modalShell(
    `${selectedJob.id}: ${selectedJob.product}`,
    () => setSelectedJob(null),
    (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Quantity</p>
            <p className="font-bold text-white">{selectedJob.quantity} units</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Line / Facility</p>
            <p className="font-bold text-white">{selectedJob.line} ({facilityLabels[lineFacility[selectedJob.line]] || 'Main Plant'})</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Started</p>
            <p className="font-bold text-white">{new Date(selectedJob.startDate).toLocaleDateString()}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Due</p>
            <p className="font-bold text-white">{new Date(selectedJob.dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-400">Overall Progress</span>
            <span className="text-sm font-bold text-white">{selectedJob.progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                selectedJob.progress === 100 ? 'bg-green-500' :
                selectedJob.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${selectedJob.progress}%` }}
            ></div>
          </div>
        </div>

        <h4 className="font-bold text-white mb-3">Operations</h4>
        <div className="space-y-2 mb-6">
          {jobOperations.map((op, i) => {
            const done = selectedJob.progress >= op.threshold;
            const prevThreshold = i === 0 ? 0 : jobOperations[i - 1].threshold;
            const active = !done && selectedJob.progress >= prevThreshold && selectedJob.status === 'in-progress';
            return (
              <div key={op.name} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                <span className="text-white font-semibold text-sm">{op.name}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  done ? 'bg-green-900 text-green-300' :
                  active ? 'bg-blue-900 text-blue-300' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {done ? 'Completed' : active ? 'In Progress' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {selectedJob.status === 'in-progress' && (
          <button
            onClick={() => updateJobStatus(selectedJob.id, 'on-hold')}
            className="w-full border-2 border-yellow-600 text-yellow-500 px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 hover:text-white transition-colors"
          >
            Put Job On Hold
          </button>
        )}
        {selectedJob.status === 'on-hold' && (
          <button
            onClick={() => updateJobStatus(selectedJob.id, 'in-progress')}
            className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Resume Job
          </button>
        )}
        {selectedJob.status === 'scheduled' && (
          <button
            onClick={() => updateJobStatus(selectedJob.id, 'in-progress', Math.max(selectedJob.progress, 5))}
            className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Start Job Now
          </button>
        )}
        {selectedJob.status === 'completed' && (
          <div className="flex items-center justify-center gap-2 text-green-500 font-semibold py-2">
            <CheckCircle2 className="w-5 h-5" />
            Job completed
          </div>
        )}
      </div>
    )
  );

  const qcModal = selectedQC && modalShell(
    `${selectedQC.id}: ${selectedQC.product}`,
    () => setSelectedQC(null),
    (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            selectedQC.status === 'passed' ? 'bg-green-900 text-green-300' :
            selectedQC.status === 'failed' ? 'bg-red-900 text-red-300' :
            'bg-yellow-900 text-yellow-300'
          }`}>
            {selectedQC.status.toUpperCase()}
          </span>
          <span className="text-sm text-gray-400">{selectedQC.batchNumber}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Inspector</p>
            <p className="font-bold text-white">{selectedQC.inspector}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Inspection Date</p>
            <p className="font-bold text-white">{new Date(selectedQC.date).toLocaleDateString()}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Units Inspected</p>
            <p className="font-bold text-white">{selectedQC.total}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Defects</p>
            <p className="font-bold text-red-500">{selectedQC.defects}</p>
          </div>
        </div>

        {selectedQC.status === 'pending' ? (
          <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 mb-6 text-sm text-gray-300">
            Inspection is scheduled and awaiting the assigned inspector. Results and defect breakdown will appear here once complete.
          </div>
        ) : (
          <div className="mb-6">
            <h4 className="font-bold text-white mb-3">Defect Breakdown</h4>
            <div className="space-y-3">
              {[
                { category: 'Dimensional', share: 0.4, color: 'bg-red-500' },
                { category: 'Surface Finish', share: 0.27, color: 'bg-orange-500' },
                { category: 'Functional', share: 0.2, color: 'bg-yellow-500' },
                { category: 'Other', share: 0.13, color: 'bg-gray-500' }
              ].map(({ category, share, color }) => {
                const count = Math.round(selectedQC.defects * share);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-400">{category}</span>
                      <span className="text-sm font-bold text-white">{count}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full`} style={{ width: `${share * 100}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedQC.status === 'failed' && (
              <div className="mt-4 bg-red-900/30 border border-red-900 rounded-lg p-4 text-sm text-red-300">
                Batch failed acceptance criteria. Units quarantined for rework review; corrective action request opened with production.
              </div>
            )}
          </div>
        )}

        {selectedQC.status === 'pending' ? (
          <button
            onClick={() => setRecordQC(selectedQC)}
            className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <ClipboardCheck className="w-5 h-5" />
            Record Inspection Result
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => downloadQcReport(selectedQC)}
              className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download QC Report
            </button>
            <button
              onClick={() => reopenInspection(selectedQC)}
              className="w-full border-2 border-gray-700 text-gray-300 px-6 py-3 rounded-lg font-bold hover:border-[#ba181b] hover:text-white transition-colors"
            >
              Reopen for Re-Inspection
            </button>
          </div>
        )}
      </div>
    )
  );

  const recordQcModal = recordQC && modalShell(
    `Record Result: ${recordQC.id}`,
    () => setRecordQC(null),
    (
      <form className="space-y-4" onSubmit={handleRecordQC}>
        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 text-sm">
          <p className="text-white font-semibold">{recordQC.product}</p>
          <p className="text-gray-400 text-xs mt-1">{recordQC.batchNumber} -- scheduled {new Date(recordQC.date).toLocaleDateString()}</p>
        </div>
        <div>
          <label htmlFor="manufacturing-qc-inspector" className="block text-sm font-semibold text-gray-300 mb-2">Inspector</label>
          <input
            id="manufacturing-qc-inspector"
            type="text"
            name="inspector"
            defaultValue={recordQC.inspector}
            required
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-qc-inspected" className="block text-sm font-semibold text-gray-300 mb-2">Units Inspected</label>
            <input
              id="manufacturing-qc-inspected"
              type="number"
              name="inspected"
              min={1}
              defaultValue={recordQC.total}
              required
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="manufacturing-qc-defects" className="block text-sm font-semibold text-gray-300 mb-2">Defects Found</label>
            <input
              id="manufacturing-qc-defects"
              type="number"
              name="defects"
              min={0}
              defaultValue={0}
              required
              className={inputCls}
            />
          </div>
        </div>
        <div>
          <label htmlFor="manufacturing-qc-result" className="block text-sm font-semibold text-gray-300 mb-2">Batch Disposition</label>
          <select id="manufacturing-qc-result" name="result" defaultValue="passed" className={inputCls}>
            <option value="passed">Passed -- release batch</option>
            <option value="failed">Failed -- quarantine for rework</option>
          </select>
        </div>
        <p className="text-xs text-gray-500">
          Recording a result updates the batch record, the pass rate, and the defect breakdown across this demo.
        </p>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Save Inspection Result
        </button>
      </form>
    )
  );

  const orderDetailModal = orderDetail && modalShell(
    `Order ${orderDetail.id}`,
    () => setOrderDetail(null),
    (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Customer</p>
            <p className="font-bold text-white">{orderDetail.customer}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Order Total</p>
            <p className="font-bold text-[#ba181b]">${orderDetail.total.toLocaleString()}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Order Date</p>
            <p className="font-bold text-white">{new Date(orderDetail.date).toLocaleDateString()}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Est. Delivery</p>
            <p className="font-bold text-white">{new Date(orderDetail.deliveryDate).toLocaleDateString()}</p>
          </div>
        </div>

        <h4 className="font-bold text-white mb-3">Line Items</h4>
        <div className="space-y-2 mb-6">
          {products.slice(0, Math.min(orderDetail.products, products.length)).map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
              <div>
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-gray-500">{p.sku} | Qty: {p.moq}</p>
              </div>
              <p className="text-sm font-bold text-white">${(p.price * p.moq).toLocaleString()}</p>
            </div>
          ))}
          {orderDetail.products > products.length && (
            <p className="text-xs text-gray-500">plus {orderDetail.products - products.length} additional line item(s)</p>
          )}
        </div>

        <h4 className="font-bold text-white mb-3">Fulfillment Timeline</h4>
        <div className="space-y-2 mb-6">
          {orderStatusSteps.map((step, i) => {
            const currentIdx = orderStatusSteps.indexOf(orderDetail.status);
            const done = i < currentIdx;
            const current = i === currentIdx;
            return (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  done ? 'bg-green-500' : current ? 'bg-[#ba181b] animate-pulse' : 'bg-gray-700'
                }`}></div>
                <span className={`text-sm font-semibold capitalize ${
                  done ? 'text-green-400' : current ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.replace('-', ' ')}
                  {current && ' (current)'}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => downloadInvoice({ id: `INV-${orderDetail.id}`, orderId: orderDetail.id, amount: orderDetail.total, date: orderDetail.date })}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </button>
      </div>
    )
  );

  const orderEditModal = orderEdit && modalShell(
    `Update ${orderEdit.id}`,
    () => setOrderEdit(null),
    (
      <form className="space-y-4" onSubmit={handleOrderStatusSave}>
        <p className="text-sm text-gray-400">Customer: <span className="text-white font-semibold">{orderEdit.customer}</span></p>
        <div>
          <label htmlFor="manufacturing-order-status" className="block text-sm font-semibold text-gray-300 mb-2">Order Status</label>
          <select id="manufacturing-order-status" name="status" defaultValue={orderEdit.status} className={inputCls}>
            <option value="pending">Pending</option>
            <option value="production">Production</option>
            <option value="quality-check">Quality Check</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Save Status
        </button>
      </form>
    )
  );

  const supplierContactModal = supplierContact && modalShell(
    `Contact ${supplierContact.name}`,
    () => setSupplierContact(null),
    (
      <div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <Phone className="w-5 h-5 text-[#ba181b]" />
            <span className="text-white font-semibold text-sm">{supplierContact.contactPhone}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800">
            <Mail className="w-5 h-5 text-[#ba181b]" />
            <span className="text-white font-semibold text-sm">{supplierContact.contactEmail}</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSupplierMessage}>
          <div>
            <label htmlFor="manufacturing-supplier-message" className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
            <textarea
              id="manufacturing-supplier-message"
              name="message"
              rows={4}
              required
              className={inputCls}
              placeholder="Delivery schedule, pricing question, quality issue..."
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    )
  );

  const poModal = supplierModal === 'po' && modalShell(
    'New Purchase Order',
    () => setSupplierModal(null),
    (
      <form className="space-y-4" onSubmit={handleNewPurchaseOrder}>
        <div>
          <label htmlFor="manufacturing-po-supplier" className="block text-sm font-semibold text-gray-300 mb-2">Supplier</label>
          <select id="manufacturing-po-supplier" name="supplier" className={inputCls}>
            {suppliers.filter(s => s.active).map(s => (
              <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="manufacturing-po-item" className="block text-sm font-semibold text-gray-300 mb-2">Item Description</label>
          <input id="manufacturing-po-item" type="text" name="item" required className={inputCls} placeholder="e.g. Cold-rolled steel coils" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-po-qty" className="block text-sm font-semibold text-gray-300 mb-2">Quantity</label>
            <input id="manufacturing-po-qty" type="number" name="quantity" min={1} required className={inputCls} placeholder="100" />
          </div>
          <div>
            <label htmlFor="manufacturing-po-amount" className="block text-sm font-semibold text-gray-300 mb-2">Est. Amount ($)</label>
            <input id="manufacturing-po-amount" type="number" name="amount" min={0} step="0.01" required className={inputCls} placeholder="5000" />
          </div>
        </div>
        <p className="text-xs text-gray-500">New POs are routed to the approval queue before being sent to the supplier.</p>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Create Purchase Order
        </button>
      </form>
    )
  );

  const contractsModal = supplierModal === 'contracts' && modalShell(
    'Supplier Contracts',
    () => setSupplierModal(null),
    (
      <div className="space-y-3">
        {contracts.map(c => (
          <div key={c.id} className="flex items-center justify-between p-4 bg-[#161a1d] rounded-lg border border-gray-800">
            <div>
              <p className="font-semibold text-white">{c.supplier}</p>
              <p className="text-xs text-gray-400">{c.id} | {c.term} | {c.value}</p>
            </div>
            <button
              onClick={() => downloadContract(c)}
              className="flex items-center gap-1 bg-[#ba181b] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
        <p className="text-xs text-gray-500">Downloads are sample demo documents.</p>
      </div>
    )
  );

  const reportsModal = supplierModal === 'reports' && modalShell(
    'Supplier Performance Report',
    () => setSupplierModal(null),
    (
      <div>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead className="bg-[#161a1d]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">Supplier</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">Orders</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">Rating</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-300">On-Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td className="px-4 py-3 text-white font-semibold">{s.name}</td>
                  <td className="px-4 py-3 text-gray-300">{s.orders}</td>
                  <td className="px-4 py-3 text-green-500 font-semibold">{s.rating}</td>
                  <td className="px-4 py-3 text-blue-400 font-semibold">{s.onTime}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={downloadSupplierReport}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download CSV
        </button>
      </div>
    )
  );

  const manageSuppliersModal = supplierModal === 'manage' && modalShell(
    'Manage Suppliers',
    () => setSupplierModal(null),
    (
      <div className="space-y-3">
        {suppliers.map(s => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-[#161a1d] rounded-lg border border-gray-800">
            <div>
              <p className="font-semibold text-white">{s.name}</p>
              <p className="text-xs text-gray-400">{s.category} | {s.orders} orders | {s.onTime}% on-time</p>
            </div>
            <button
              onClick={() => toggleSupplier(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                s.active
                  ? 'bg-green-900 text-green-300 hover:bg-red-900 hover:text-red-300'
                  : 'bg-gray-800 text-gray-400 hover:bg-green-900 hover:text-green-300'
              }`}
            >
              {s.active ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
        <p className="text-xs text-gray-500">Click a status to toggle the supplier between active and inactive. Inactive suppliers are excluded from new purchase orders.</p>
      </div>
    )
  );

  const approvalsModal = supplierModal === 'approvals' && modalShell(
    `Pending Approvals (${pendingApprovals.length})`,
    () => setSupplierModal(null),
    (
      <div className="space-y-3">
        {pendingApprovals.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-white font-semibold">All caught up!</p>
            <p className="text-gray-400 text-sm mt-1">No purchase orders are waiting for approval.</p>
          </div>
        ) : (
          pendingApprovals.map(a => (
            <div key={a.id} className="p-4 bg-[#161a1d] rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-white">{a.id}</p>
                <p className="font-bold text-[#ba181b]">${a.amount.toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-300 mb-1">{a.item}</p>
              <p className="text-xs text-gray-500 mb-3">{a.supplier} | {new Date(a.date).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => decideApproval(a.id, 'approved')}
                  className="flex-1 bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => decideApproval(a.id, 'rejected')}
                  className="flex-1 bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-900 hover:text-red-300 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
        {approvals.some(a => a.status !== 'pending') && (
          <div>
            <h4 className="font-bold text-white mt-4 mb-2 text-sm">Recently Decided</h4>
            <div className="space-y-2">
              {approvals.filter(a => a.status !== 'pending').slice(0, 5).map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                  <div>
                    <p className="text-sm font-semibold text-white">{a.id}</p>
                    <p className="text-xs text-gray-500">{a.item}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    a.status === 'approved' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );

  const importModal = importOpen && modalShell(
    'Import Inventory',
    () => setImportOpen(false),
    (
      <form className="space-y-4" onSubmit={handleImport}>
        <p className="text-sm text-gray-400">
          Upload a CSV file with columns: SKU, Location, Quantity, Min Level. Matching SKUs are updated; new SKUs are created.
        </p>
        <div>
          <label htmlFor="manufacturing-import-file" className="block text-sm font-semibold text-gray-300 mb-2">CSV File</label>
          <input
            id="manufacturing-import-file"
            type="file"
            name="file"
            accept=".csv,text/csv"
            required
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ba181b] file:text-white file:font-semibold hover:file:bg-red-700"
          />
        </div>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Run Import
        </button>
      </form>
    )
  );

  const cartStepLabels = ['Order Draft', 'Delivery Details', 'Review', 'Confirmed'];

  const cartModal = cartOpen && modalShell(
    checkoutStep === 3 ? 'Order Confirmed' : `Build Order -- ${cartStepLabels[checkoutStep]}`,
    closeCart,
    (
      <div>
        {checkoutStep < 3 && (
          <div className="flex items-center gap-2 mb-6">
            {cartStepLabels.slice(0, 3).map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= checkoutStep ? 'bg-[#ba181b]' : 'bg-gray-800'}`}></div>
                <p className={`text-[11px] mt-1 font-semibold ${i <= checkoutStep ? 'text-white' : 'text-gray-500'}`}>
                  {i + 1}. {label}
                </p>
              </div>
            ))}
          </div>
        )}

        {checkoutStep === 0 && (
          cartDetail.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-white font-semibold text-lg mb-2">Your order draft is empty</p>
              <p className="text-gray-400 mb-6">Add catalog items to build a bulk order at contract pricing.</p>
              <button
                onClick={() => { closeCart(); setCurrentPage('products'); }}
                className="bg-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-3 mb-6">
                {cartDetail.map(({ product, qty }) => (
                  <div key={product.id} className="p-4 bg-[#161a1d] rounded-lg border border-gray-800">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-white text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">
                          {product.sku} -- ${(product.price * 0.85).toFixed(2)} each at contract price
                        </p>
                      </div>
                      <button
                        aria-label={`Remove ${product.name}`}
                        onClick={() => removeCartLine(product.id)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setCartQty(product.id, qty - product.moq)}
                          className="w-8 h-8 rounded-lg bg-[#0b090a] border border-gray-700 text-white flex items-center justify-center hover:border-[#ba181b]"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          aria-label={`Quantity of ${product.name}`}
                          type="number"
                          min={product.moq}
                          value={qty}
                          onChange={(e) => setCartQty(product.id, parseInt(e.target.value, 10) || product.moq)}
                          className="w-20 text-center px-2 py-1 bg-[#0b090a] border border-gray-700 rounded-lg text-white"
                        />
                        <button
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setCartQty(product.id, qty + product.moq)}
                          className="w-8 h-8 rounded-lg bg-[#0b090a] border border-gray-700 text-white flex items-center justify-center hover:border-[#ba181b]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-500 ml-1">MOQ {product.moq}</span>
                      </div>
                      <p className="font-bold text-[#ba181b]">
                        ${Math.round(product.price * 0.85 * qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 space-y-2 mb-6 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">List subtotal</span><span className="text-white">${cartListSubtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Contract discount (15%)</span><span className="text-green-500">-${cartDiscount.toLocaleString()}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-500">Longest lead time in draft</span><span className="text-gray-400">{cartLeadTime || 3} weeks</span></div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setCheckoutStep(1)}
                  className="flex-1 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  Continue to Delivery Details
                </button>
              </div>
            </div>
          )
        )}

        {checkoutStep === 1 && (
          <form className="space-y-4" onSubmit={handleCheckoutDetails}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="manufacturing-checkout-company" className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                <input
                  id="manufacturing-checkout-company"
                  type="text"
                  required
                  value={checkout.company}
                  onChange={(e) => setCheckout({ ...checkout, company: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="manufacturing-checkout-contact" className="block text-sm font-semibold text-gray-300 mb-2">Buyer Contact</label>
                <input
                  id="manufacturing-checkout-contact"
                  type="text"
                  required
                  value={checkout.contact}
                  onChange={(e) => setCheckout({ ...checkout, contact: e.target.value })}
                  placeholder="Name of the buyer on record"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="manufacturing-checkout-po" className="block text-sm font-semibold text-gray-300 mb-2">Your PO Number</label>
                <input
                  id="manufacturing-checkout-po"
                  type="text"
                  value={checkout.poNumber}
                  onChange={(e) => setCheckout({ ...checkout, poNumber: e.target.value })}
                  placeholder="Optional"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="manufacturing-checkout-date" className="block text-sm font-semibold text-gray-300 mb-2">Requested Delivery Date</label>
                <input
                  id="manufacturing-checkout-date"
                  type="date"
                  value={checkout.deliveryDate}
                  onChange={(e) => setCheckout({ ...checkout, deliveryDate: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
            <fieldset>
              <legend className="block text-sm font-semibold text-gray-300 mb-2">Freight Method</legend>
              <div className="space-y-2">
                {shippingOptions.map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checkout.shipping === opt.id ? 'border-[#ba181b] bg-[#161a1d]' : 'border-gray-800 bg-[#161a1d] hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={checkout.shipping === opt.id}
                      onChange={() => setCheckout({ ...checkout, shipping: opt.id })}
                      className="mt-1 accent-[#ba181b]"
                    />
                    <span className="flex-1">
                      <span className="flex items-center justify-between">
                        <span className="text-white font-semibold text-sm">{opt.label}</span>
                        <span className="text-sm font-bold text-[#ba181b]">
                          {opt.cost === 0 ? 'Included' : `+$${opt.cost.toLocaleString()}`}
                        </span>
                      </span>
                      <span className="block text-xs text-gray-400 mt-1">{opt.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="manufacturing-checkout-notes" className="block text-sm font-semibold text-gray-300 mb-2">Notes for production</label>
              <textarea
                id="manufacturing-checkout-notes"
                rows={3}
                value={checkout.notes}
                onChange={(e) => setCheckout({ ...checkout, notes: e.target.value })}
                placeholder="Labeling, packaging, certification, or dock requirements..."
                className={inputCls}
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCheckoutStep(0)}
                className="px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors"
              >
                Back
              </button>
              <button type="submit" className="flex-1 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                Review Order
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 2 && (
          <div>
            <div className="space-y-2 mb-4">
              {cartDetail.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                  <div>
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku} -- {qty} units -- lead time {product.leadTime}</p>
                  </div>
                  <p className="text-sm font-bold text-white">${Math.round(product.price * 0.85 * qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-400">List subtotal</span><span className="text-white">${cartListSubtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Contract discount (15%)</span><span className="text-green-500">-${cartDiscount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">{selectedShipping.label}</span><span className="text-white">{selectedShipping.cost === 0 ? 'Included' : `$${selectedShipping.cost.toLocaleString()}`}</span></div>
              <div className="flex justify-between border-t border-gray-800 pt-2 mt-2">
                <span className="text-white font-bold">Order total</span>
                <span className="text-[#ba181b] font-bold text-lg">${cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 text-sm space-y-1 mb-4">
              <p className="text-gray-400">Bill to: <span className="text-white font-semibold">{checkout.company || 'AutoTech Industries'}</span></p>
              <p className="text-gray-400">Buyer: <span className="text-white font-semibold">{checkout.contact || 'Not provided'}</span></p>
              <p className="text-gray-400">Your PO: <span className="text-white font-semibold">{checkout.poNumber || 'Not provided'}</span></p>
              <p className="text-gray-400">
                Requested delivery: <span className="text-white font-semibold">
                  {checkout.deliveryDate ? new Date(checkout.deliveryDate).toLocaleDateString() : 'Earliest available'}
                </span>
              </p>
              {checkout.notes && <p className="text-gray-400">Notes: <span className="text-white">{checkout.notes}</span></p>}
              <p className="text-gray-400">Terms: <span className="text-white font-semibold">Net 45 against your credit line</span></p>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              This is a demo checkout. Submitting books a simulated order on the account and processes no payment.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setCheckoutStep(1)}
                className="px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={placeCartOrder}
                className="flex-1 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Submit Order on Account
              </button>
            </div>
          </div>
        )}

        {checkoutStep === 3 && cartOrder && (
          <div className="text-center py-4">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-bold text-white mb-2">Order {cartOrder.id} submitted</p>
            <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 text-left space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Account</span><span className="text-white font-semibold">{cartOrder.customer}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Line items</span><span className="text-white font-semibold">{cartOrder.products}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Order total</span><span className="text-[#ba181b] font-bold">${cartOrder.total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Freight</span><span className="text-white font-semibold">{selectedShipping.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Est. delivery</span><span className="text-white font-semibold">{new Date(cartOrder.deliveryDate).toLocaleDateString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Status</span><span className="text-white font-semibold">Pending production release</span></div>
            </div>
            <p className="text-xs text-gray-500 mb-4">Simulated order for demo purposes. No payment was processed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { closeCart(); goToOrdersWithStatus('pending'); }}
                className="flex-1 bg-[#ba181b] text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Track This Order
              </button>
              <button
                onClick={() => { closeCart(); setCurrentPage('products'); }}
                className="flex-1 border-2 border-gray-700 text-gray-300 px-4 py-3 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    ),
    true
  );

  const lineModal = selectedLine && modalShell(
    `${selectedLine.line} -- ${facilityLabels[selectedLine.facility]}`,
    () => setSelectedLine(null),
    (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Status</p>
            <p className="font-bold text-white">{selectedLine.status}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Current Output</p>
            <p className="font-bold text-white">{selectedLine.output}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Efficiency</p>
            <p className="font-bold text-green-500">{selectedLine.efficiency}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Crew Size</p>
            <p className="font-bold text-white">{(lineCrews[selectedLine.line] || { operators: 8 }).operators} operators</p>
          </div>
        </div>

        <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 mb-6 text-sm space-y-1">
          <p className="text-gray-400">Shift: <span className="text-white font-semibold">{(lineCrews[selectedLine.line] || { shift: 'Shift 1' }).shift}</span></p>
          <p className="text-gray-400">Supervisor: <span className="text-white font-semibold">{(lineCrews[selectedLine.line] || { supervisor: 'Unassigned' }).supervisor}</span></p>
          <p className="text-gray-400">
            Last service: <span className="text-white font-semibold">
              {new Date((lineCrews[selectedLine.line] || { lastService: '2024-05-01' }).lastService).toLocaleDateString()}
            </span>
          </p>
        </div>

        <h4 className="font-bold text-white mb-3">Jobs on This Line</h4>
        <div className="space-y-2 mb-6">
          {jobs.filter(j => j.line === selectedLine.line).length === 0 ? (
            <p className="text-sm text-gray-400">No jobs are currently assigned to this line.</p>
          ) : (
            jobs.filter(j => j.line === selectedLine.line).map(j => (
              <button
                key={j.id}
                onClick={() => { setSelectedLine(null); setSelectedJob(j); }}
                className="w-full flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{j.id} -- {j.product}</p>
                  <p className="text-xs text-gray-500">{j.quantity} units -- {j.status.replace('-', ' ')}</p>
                </div>
                <span className="text-sm font-bold text-white">{j.progress}%</span>
              </button>
            ))
          )}
        </div>

        <h4 className="font-bold text-white mb-3">Set Line Status</h4>
        <div className="grid grid-cols-2 gap-2">
          {(['Running', 'Setup', 'Paused', 'Maintenance'] as LineStatus['status'][]).map(s => (
            <button
              key={s}
              onClick={() => updateLineStatus(selectedLine.line, s)}
              className={`px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                selectedLine.status === s
                  ? 'bg-[#ba181b] text-white'
                  : 'bg-[#161a1d] text-gray-300 border border-gray-800 hover:border-[#ba181b] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Line status is saved on this device and reflected across the production dashboard.</p>
      </div>
    )
  );

  const facilityModal = facilityDetail && modalShell(
    facilityLabels[facilityDetail] || 'Facility',
    () => setFacilityDetail(null),
    (
      <div>
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Items</p>
            <p className="font-bold text-white">{facilityStats[facilityDetail].items}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Value</p>
            <p className="font-bold text-white">{facilityStats[facilityDetail].value}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Capacity</p>
            <p className="font-bold text-white">{facilityStats[facilityDetail].capacity}%</p>
          </div>
        </div>

        <h4 className="font-bold text-white mb-3">Production Lines Here</h4>
        <div className="space-y-2 mb-6">
          {lineStates.filter(l => l.facility === facilityDetail).map(l => (
            <button
              key={l.line}
              onClick={() => { setFacilityDetail(null); setCurrentPage('production'); setSelectedFacility(facilityDetail); setSelectedLine(l); }}
              className="w-full flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <span className="text-sm font-semibold text-white">{l.line}</span>
              <span className="text-xs text-gray-400">{l.status} -- {l.output}</span>
            </button>
          ))}
        </div>

        <h4 className="font-bold text-white mb-3">Stock Alerts at This Facility</h4>
        <div className="space-y-2 mb-6">
          {stockAlerts.filter(s => s.location === facilityLabels[facilityDetail]).length === 0 ? (
            <p className="text-sm text-gray-400">No open stock alerts at this facility.</p>
          ) : (
            stockAlerts.filter(s => s.location === facilityLabels[facilityDetail]).map(s => (
              <div key={s.sku} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-white">{s.product}</p>
                  <p className="text-xs text-gray-500">{s.sku} -- {s.current} on hand, min {s.min}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  s.status === 'low' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                }`}>
                  {s.status.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => { setFacilityDetail(null); setCurrentPage('production'); setSelectedFacility(facilityDetail); }}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          Open Production Dashboard for This Facility
        </button>
      </div>
    )
  );

  const inventoryStatModal = inventoryStat && modalShell(
    inventoryStat === 'skus' ? 'SKU Count by Facility' : 'Inventory Valuation',
    () => setInventoryStat(null),
    (
      <div>
        <div className="space-y-2 mb-4">
          {Object.values(facilityStats).map(f => (
            <button
              key={f.key}
              onClick={() => { setInventoryStat(null); setFacilityDetail(f.key); }}
              className="w-full flex items-center justify-between p-4 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
            >
              <div>
                <p className="font-semibold text-white">{f.name}</p>
                <p className="text-xs text-gray-500">{f.capacity}% of storage capacity used</p>
              </div>
              <p className="font-bold text-[#ba181b]">
                {inventoryStat === 'skus' ? `${f.items} SKUs` : f.value}
              </p>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between p-4 bg-[#161a1d] rounded-lg border border-gray-800 mb-4">
          <span className="text-white font-bold">Total</span>
          <span className="text-white font-bold">{inventoryStat === 'skus' ? '1,247 SKUs' : '$2.4M'}</span>
        </div>
        <button
          onClick={() => { setInventoryStat(null); handleExportInventory(); }}
          className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Inventory CSV
        </button>
      </div>
    )
  );

  const stockDetailModal = stockDetail && modalShell(
    stockDetail.product,
    () => setStockDetail(null),
    (
      <div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">SKU</p>
            <p className="font-bold text-white">{stockDetail.sku}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Location</p>
            <p className="font-bold text-white">{stockDetail.location}</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">On Hand</p>
            <p className={`font-bold ${stockDetail.current === 0 ? 'text-red-500' : 'text-white'}`}>{stockDetail.current} units</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-gray-500">Minimum Level</p>
            <p className="font-bold text-white">{stockDetail.min} units</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-400">Stock vs minimum</span>
            <span className="text-sm font-bold text-white">
              {Math.round((stockDetail.current / stockDetail.min) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${stockDetail.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min((stockDetail.current / stockDetail.min) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <h4 className="font-bold text-white mb-3">Recent Movement</h4>
        <div className="space-y-2 mb-6">
          {stockHistory.default.map(h => (
            <div key={h.date} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
              <div>
                <p className="text-sm text-white">{h.movement}</p>
                <p className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-bold text-sm ${h.qty < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {h.qty > 0 ? '+' : ''}{h.qty}
              </p>
            </div>
          ))}
        </div>

        {reordered.includes(stockDetail.sku) ? (
          <div className="flex items-center justify-center gap-2 text-green-500 font-semibold py-3">
            <CheckCircle2 className="w-5 h-5" />
            Restock PO already created
          </div>
        ) : (
          <button
            onClick={() => { handleReorder(stockDetail.sku, stockDetail.product); setStockDetail(null); }}
            className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Create Restock Purchase Order
          </button>
        )}
      </div>
    )
  );

  const kpiModal = kpiDetail && modalShell(
    `${kpiDetail} -- ${dateRange === 'year' ? 'This Year' : `Last ${dateRange.replace('days', ' Days')}`}`,
    () => setKpiDetail(null),
    (
      <div>
        {(() => {
          const kpi = rangeData.kpis.find(k => k.label === kpiDetail);
          return (
            <div className="bg-[#161a1d] rounded-lg p-4 border border-gray-800 mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{kpiDetail}</p>
                <p className="text-3xl font-bold text-white">{kpi ? kpi.value : '--'}</p>
              </div>
              <span className={`font-bold ${kpi && kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi ? kpi.change : ''}
              </span>
            </div>
          );
        })()}

        {kpiDetail === 'Revenue' && renderBarChart(rangeData.revenue)}
        {kpiDetail === 'Production Output' && renderProductionChart(rangeData.production)}
        {kpiDetail === 'Quality Rate' && (
          <div className="space-y-2">
            {qcChecks.map(c => (
              <button
                key={c.id}
                onClick={() => { setKpiDetail(null); setCurrentPage('quality-control'); setSelectedQC(c); }}
                className="w-full flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 hover:border-[#ba181b] transition-all text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{c.product}</p>
                  <p className="text-xs text-gray-500">{c.batchNumber} -- {c.status}</p>
                </div>
                <span className="text-sm font-bold text-white">
                  {c.total ? `${((c.passed / c.total) * 100).toFixed(1)}%` : '--'}
                </span>
              </button>
            ))}
            <p className="text-xs text-gray-500 pt-2">Live pass rate across recorded inspections: {qcPassRate}%</p>
          </div>
        )}
        {kpiDetail === 'Customer Satisfaction' && (
          <div className="space-y-3">
            {[
              { label: 'On-time delivery', score: 96 },
              { label: 'Product quality', score: 94 },
              { label: 'Documentation and certs', score: 91 },
              { label: 'Account support', score: 89 }
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-400">{s.label}</span>
                  <span className="text-sm font-bold text-white">{s.score}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-[#ba181b] h-2 rounded-full" style={{ width: `${s.score}%` }}></div>
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500 pt-2">Rolled up from post-delivery surveys across active accounts.</p>
          </div>
        )}

        <button
          onClick={() => { setKpiDetail(null); handleExportAnalytics(); }}
          className="w-full mt-6 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export This Range
        </button>
      </div>
    )
  );

  const productEditModal = productEdit && modalShell(
    `Edit ${productEdit.sku}`,
    () => setProductEdit(null),
    (
      <form className="space-y-4" onSubmit={handleEditProduct}>
        <div>
          <label htmlFor="manufacturing-edit-name" className="block text-sm font-semibold text-gray-300 mb-2">Product Name</label>
          <input id="manufacturing-edit-name" type="text" name="name" defaultValue={productEdit.name} required className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-edit-sku" className="block text-sm font-semibold text-gray-300 mb-2">SKU</label>
            <input id="manufacturing-edit-sku" type="text" name="sku" defaultValue={productEdit.sku} required className={inputCls} />
          </div>
          <div>
            <label htmlFor="manufacturing-edit-category" className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
            <select id="manufacturing-edit-category" name="category" defaultValue={productEdit.category} className={inputCls}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="manufacturing-edit-price" className="block text-sm font-semibold text-gray-300 mb-2">Price ($)</label>
            <input id="manufacturing-edit-price" type="number" name="price" min={0} step="0.01" defaultValue={productEdit.price} required className={inputCls} />
          </div>
          <div>
            <label htmlFor="manufacturing-edit-moq" className="block text-sm font-semibold text-gray-300 mb-2">MOQ</label>
            <input id="manufacturing-edit-moq" type="number" name="moq" min={1} defaultValue={productEdit.moq} required className={inputCls} />
          </div>
          <div>
            <label htmlFor="manufacturing-edit-stock" className="block text-sm font-semibold text-gray-300 mb-2">In Stock</label>
            <input id="manufacturing-edit-stock" type="number" name="inStock" min={0} defaultValue={productEdit.inStock} required className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="manufacturing-edit-lead" className="block text-sm font-semibold text-gray-300 mb-2">Lead Time</label>
            <input id="manufacturing-edit-lead" type="text" name="leadTime" defaultValue={productEdit.leadTime} className={inputCls} />
          </div>
          <div>
            <label htmlFor="manufacturing-edit-availability" className="block text-sm font-semibold text-gray-300 mb-2">Availability</label>
            <select id="manufacturing-edit-availability" name="availability" defaultValue={productEdit.availability} className={inputCls}>
              <option value="in-stock">In Stock</option>
              <option value="made-to-order">Made to Order</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="manufacturing-edit-specs" className="block text-sm font-semibold text-gray-300 mb-2">Specs (comma separated)</label>
          <input id="manufacturing-edit-specs" type="text" name="specs" defaultValue={productEdit.specs.join(', ')} className={inputCls} />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => { const p = productEdit; setProductEdit(null); deleteProduct(p); }}
            className="px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Delete
          </button>
          <button type="submit" className="flex-1 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    )
  );

  const supplierDetailModal = supplierDetail && modalShell(
    supplierDetail.name,
    () => setSupplierDetail(null),
    (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-[#ba181b] text-white rounded text-xs font-semibold">{supplierDetail.category}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            supplierDetail.active ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'
          }`}>
            {supplierDetail.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-2xl font-bold text-white">{supplierDetail.orders}</p>
            <p className="text-xs text-gray-400">Orders</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-2xl font-bold text-green-500">{supplierDetail.rating}</p>
            <p className="text-xs text-gray-400">Rating</p>
          </div>
          <div className="bg-[#161a1d] rounded-lg p-3 border border-gray-800">
            <p className="text-2xl font-bold text-blue-500">{supplierDetail.onTime}%</p>
            <p className="text-xs text-gray-400">On-Time</p>
          </div>
        </div>

        <h4 className="font-bold text-white mb-3">Purchase Orders</h4>
        <div className="space-y-2 mb-6">
          {approvals.filter(a => a.supplier === supplierDetail.name).length === 0 ? (
            <p className="text-sm text-gray-400">No purchase orders on file for this supplier yet.</p>
          ) : (
            approvals.filter(a => a.supplier === supplierDetail.name).slice(0, 6).map(a => (
              <div key={a.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-white">{a.id}</p>
                  <p className="text-xs text-gray-500">{a.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#ba181b]">${a.amount.toLocaleString()}</p>
                  <p className={`text-xs font-semibold ${
                    a.status === 'approved' ? 'text-green-400' : a.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {a.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <h4 className="font-bold text-white mb-3">Contracts</h4>
        <div className="space-y-2 mb-6">
          {contracts.filter(c => c.supplier === supplierDetail.name).length === 0 ? (
            <p className="text-sm text-gray-400">No master agreement on file. Spot buys only.</p>
          ) : (
            contracts.filter(c => c.supplier === supplierDetail.name).map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                <div>
                  <p className="text-sm font-semibold text-white">{c.id}</p>
                  <p className="text-xs text-gray-500">{c.term} -- {c.value}</p>
                </div>
                <button
                  onClick={() => downloadContract(c)}
                  className="flex items-center gap-1 bg-[#ba181b] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  PDF
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { toggleSupplier(supplierDetail.id); setSupplierDetail({ ...supplierDetail, active: !supplierDetail.active }); }}
            className="px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-[#ba181b] hover:text-white transition-colors"
          >
            {supplierDetail.active ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={() => { const s = supplierDetail; setSupplierDetail(null); setSupplierContact(s); }}
            className="flex-1 bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Message Supplier
          </button>
        </div>
      </div>
    )
  );

  const settingsModal = settingsOpen && modalShell(
    'Platform Settings',
    () => setSettingsOpen(false),
    (
      <form className="space-y-5" onSubmit={handleSettingsSave}>
        <div>
          <label htmlFor="manufacturing-settings-facility" className="block text-sm font-semibold text-gray-300 mb-2">Default Facility</label>
          <select
            id="manufacturing-settings-facility"
            name="defaultFacility"
            defaultValue={prefs.defaultFacility}
            className={inputCls}
          >
            <option value="all">All Facilities</option>
            <option value="main">Main Plant</option>
            <option value="west">West Facility</option>
            <option value="east">East Facility</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Applied to the Production dashboard facility filter.</p>
        </div>
        <label className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 cursor-pointer">
          <span className="text-sm font-semibold text-white">Email production alerts</span>
          <input type="checkbox" name="emailAlerts" defaultChecked={prefs.emailAlerts} className="w-5 h-5 accent-[#ba181b]" />
        </label>
        <label className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800 cursor-pointer">
          <span className="text-sm font-semibold text-white">Weekly performance summary</span>
          <input type="checkbox" name="weeklySummary" defaultChecked={prefs.weeklySummary} className="w-5 h-5 accent-[#ba181b]" />
        </label>
        <button type="submit" className="w-full bg-[#ba181b] text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
          Save Settings
        </button>
      </form>
    )
  );

  return (
    <div className="min-h-screen bg-[#161a1d]">
      {Navigation()}
      <main>
        {currentPage === 'home' && HomePage()}
        {currentPage === 'products' && ProductsPage()}
        {currentPage === 'b2b-portal' && B2BPortalPage()}
        {currentPage === 'production' && ProductionPage()}
        {currentPage === 'inventory' && InventoryPage()}
        {currentPage === 'quality-control' && QualityControlPage()}
        {currentPage === 'orders' && OrdersPage()}
        {currentPage === 'suppliers' && SuppliersPage()}
        {currentPage === 'analytics' && AnalyticsPage()}
        {currentPage === 'contact' && ContactPage()}
      </main>
      {Footer()}

      {/* Modals */}
      {productDetailModal}
      {quoteModal}
      {addProductModal}
      {newOrderModal}
      {invoicesModal}
      {contactRepModal}
      {balanceModal}
      {creditModal}
      {jobModal}
      {qcModal}
      {recordQcModal}
      {cartModal}
      {lineModal}
      {facilityModal}
      {inventoryStatModal}
      {stockDetailModal}
      {kpiModal}
      {productEditModal}
      {supplierDetailModal}
      {orderDetailModal}
      {orderEditModal}
      {supplierContactModal}
      {poModal}
      {contractsModal}
      {reportsModal}
      {manageSuppliersModal}
      {approvalsModal}
      {importModal}
      {settingsModal}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#0b090a] border border-[#ba181b] text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default TechProManufacturing;
