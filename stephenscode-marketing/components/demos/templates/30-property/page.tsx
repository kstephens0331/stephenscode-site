'use client';

import React, { useState } from 'react';
import {
  Building2, Home, Users, Wrench, CreditCard, FileText, BarChart3,
  MessageSquare, Phone, Mail, MapPin, Calendar, DollarSign,
  CheckCircle2, AlertCircle, Clock, Search, Filter, Download,
  Upload, Settings, Bell, User, LogOut, ChevronRight, TrendingUp,
  Package, Key, Shield, Clipboard, FileCheck, XCircle, UserCheck,
  AlertTriangle, Activity, Zap, Target, PieChart, ArrowUpRight,
  ArrowDownRight, MoreVertical, Edit, Trash2, Eye, Send, Paperclip
} from 'lucide-react';

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

type UserRole = 'Manager' | 'Tenant' | 'Owner';
type Page = 'home' | 'properties' | 'tenants' | 'owners' | 'maintenance' | 'payments' | 'leases' | 'reports' | 'messages' | 'contact';

const ElitePropertyManagement = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('Manager');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(8);

  // Sample Data - 30 Properties
  const properties: Property[] = Array.from({ length: 30 }, (_, i) => ({
    id: `prop-${i + 1}`,
    name: [
      'Sunset Apartments', 'Oak Grove Condos', 'River View Estates', 'Park Place Residences',
      'Downtown Lofts', 'Garden Terrace', 'Highland Towers', 'Maple Street Units',
      'Lakeside Villas', 'Metro Plaza', 'Willow Creek Homes', 'Seaside Complex',
      'Mountain View Apts', 'Central Square', 'Elmwood Gardens', 'Harbor Point',
      'Skyline Residences', 'Pine Ridge Estates', 'Valley Stream Apts', 'Riverside Commons',
      'Summit Place', 'Greenwood Terrace', 'Bay Shore Complex', 'Hillside Manor',
      'Crown Heights Apts', 'Meadowbrook Homes', 'Westgate Plaza', 'Northpoint Towers',
      'Eastside Gardens', 'Southview Residences'
    ][i],
    address: `${1000 + i * 100} ${['Main', 'Oak', 'Elm', 'Maple', 'Pine'][i % 5]} St, City, ST ${10000 + i}`,
    type: ['Apartment', 'Condo', 'Multi-Family', 'Single Family', 'Commercial'][i % 5] as Property['type'],
    units: [12, 8, 24, 16, 4, 32, 6, 20, 10, 28][i % 10],
    occupiedUnits: Math.floor([12, 8, 24, 16, 4, 32, 6, 20, 10, 28][i % 10] * (0.85 + Math.random() * 0.15)),
    monthlyRent: 1200 + (i * 150),
    status: ['Active', 'Active', 'Active', 'Active', 'Maintenance', 'Active'][i % 6] as Property['status'],
    owner: `Owner ${Math.floor(i / 3) + 1}`,
    manager: `Manager ${(i % 5) + 1}`,
    image: `https://images.unsplash.com/photo-${1560184697 + i}?w=800&h=600&fit=crop`
  }));

  const tenants: Tenant[] = [
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

  const owners: Owner[] = [
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

  const maintenanceRequests: MaintenanceRequest[] = [
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

  const leases: Lease[] = [
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

  const payments: Payment[] = [
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

  const messages: Message[] = [
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

  // Stats Calculations
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const occupancyRate = ((occupiedUnits / totalUnits) * 100).toFixed(1);
  const totalMonthlyRevenue = properties.reduce((sum, p) => sum + (p.monthlyRent * p.occupiedUnits), 0);
  const openMaintenanceRequests = maintenanceRequests.filter(m => m.status === 'Open' || m.status === 'In Progress').length;
  const overduePayments = payments.filter(p => p.status === 'Failed').length;

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
              <div className="text-sm">
                <p className="font-semibold">{userRole}</p>
              </div>
            </div>
            <button className="relative hover:text-[#ffc300] transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="hover:text-[#ffc300] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="hover:text-[#ffc300] transition-colors">
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
              onClick={() => setCurrentPage(page)}
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
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#003566]">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 text-[#003566]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Properties</h3>
          <p className="text-3xl font-bold text-[#003566]">{totalProperties}</p>
          <p className="text-sm text-green-600 mt-2">+3 this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#ffc300]">
          <div className="flex items-center justify-between mb-2">
            <Home className="w-8 h-8 text-[#ffc300]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-[#003566]">{occupancyRate}%</p>
          <p className="text-sm text-gray-600 mt-2">{occupiedUnits} of {totalUnits} units</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-[#003566]">${(totalMonthlyRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+8.5% vs last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <Zap className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Issues</h3>
          <p className="text-3xl font-bold text-[#003566]">{openMaintenanceRequests + overduePayments}</p>
          <p className="text-sm text-gray-600 mt-2">{openMaintenanceRequests} maintenance, {overduePayments} overdue</p>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#003566] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#ffc300]" />
            Urgent Maintenance Requests
          </h2>
          <div className="space-y-4">
            {maintenanceRequests.filter(m => m.priority === 'Emergency' || m.priority === 'High').map(request => (
              <div key={request.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{request.property} - {request.unit}</h3>
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
                  <span className="text-sm text-gray-600">Est. Cost: ${request.estimatedCost}</span>
                  <button className="text-sm text-[#003566] font-semibold hover:underline">
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
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow">
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
              </div>
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
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-blue-600 mb-1">{properties.filter(p => p.status === 'Active').length}</h3>
            <p className="text-gray-700">Active Properties</p>
          </div>
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <Wrench className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-yellow-600 mb-1">{properties.filter(p => p.status === 'Maintenance').length}</h3>
            <p className="text-gray-700">Under Maintenance</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Key className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="font-bold text-2xl text-gray-600 mb-1">{totalUnits - occupiedUnits}</h3>
            <p className="text-gray-700">Vacant Units</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Properties
  const PropertiesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#003566] mb-2">Property Portfolio</h1>
          <p className="text-gray-600">Managing {totalProperties} properties with {totalUnits} total units</p>
        </div>
        <button className="bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-semibold hover:bg-[#003566] hover:text-white transition-colors flex items-center gap-2">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566] focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
          <option value="all">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="multi-family">Multi-Family</option>
          <option value="single-family">Single Family</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="vacant">Vacant</option>
        </select>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0, 12).map(property => (
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
                <button className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold">
                  View Details
                </button>
                <button className="px-3 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
          Load More Properties ({properties.length - 12} more)
        </button>
      </div>
    </div>
  );

  // Page: Tenant Portal
  const TenantPortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Tenant Portal</h1>

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
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Appliance</option>
                    <option>Structural</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                    placeholder="Describe the issue in detail..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photos</label>
                  <button type="button" className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#003566] transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Click to upload images
                  </button>
                </div>
                <button className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors">
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pay Rent
                </button>
                <button className="w-full bg-[#003566] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Lease
                </button>
                <button className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message Manager
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">My Requests</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded">
                  <p className="font-semibold text-sm">Kitchen Sink Leak</p>
                  <p className="text-xs text-gray-600">In Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#003566] mb-4">Payment History</h2>
              <div className="space-y-2">
                {['May 2024', 'Apr 2024', 'Mar 2024'].map(month => (
                  <div key={month} className="flex items-center justify-between p-2 border-b">
                    <span className="text-sm text-gray-700">{month}</span>
                    <span className="text-sm font-semibold text-green-600">$1,800</span>
                  </div>
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
                      <button className="text-[#003566] hover:underline font-semibold">View</button>
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
  const OwnerPortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Owner Portal</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {owners.map(owner => (
          <div key={owner.id} className="bg-white rounded-lg shadow-lg p-6">
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
                  <div key={prop} className="text-sm text-gray-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#ffc300]" />
                    {prop}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-[#003566] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#001d3d] transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Maintenance
  const MaintenancePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-[#003566]">Maintenance Requests</h1>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
            <option>All Priorities</option>
            <option>Emergency</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {maintenanceRequests.map(request => (
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
                <p className="text-sm font-bold text-green-600">${request.estimatedCost}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold">
                Update Status
              </button>
              <button className="px-3 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Payments
  const PaymentsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Payment Processing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Collected</h3>
          <p className="text-3xl font-bold text-green-600">${payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Payments</h3>
          <p className="text-3xl font-bold text-yellow-600">${payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Failed Payments</h3>
          <p className="text-3xl font-bold text-red-600">${payments.filter(p => p.status === 'Failed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#003566] mb-6">All Payments</h2>
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
              {payments.map(payment => (
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
                    <button className="text-[#003566] hover:underline font-semibold text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Page: Leases
  const LeasesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#003566] mb-8">Lease Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leases.map(lease => (
          <div key={lease.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-[#003566]">{lease.property}</h3>
                <p className="text-gray-600">{lease.unit}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                lease.status === 'Active' ? 'bg-green-100 text-green-700' :
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
                    <button className="text-[#003566] hover:underline text-sm">Download</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold">
                Renew Lease
              </button>
              <button className="px-4 py-2 border-2 border-[#003566] text-[#003566] rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
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
          { title: 'Revenue Report', desc: 'Monthly income analysis', icon: DollarSign, color: 'green' },
          { title: 'Occupancy Report', desc: 'Unit utilization metrics', icon: Home, color: 'blue' },
          { title: 'Maintenance Report', desc: 'Request tracking & costs', icon: Wrench, color: 'orange' },
          { title: 'Expense Report', desc: 'Operating cost breakdown', icon: BarChart3, color: 'red' },
          { title: 'Owner Statement', desc: 'Property owner financials', icon: UserCheck, color: 'purple' },
          { title: 'Tenant Report', desc: 'Tenant payment history', icon: Users, color: 'teal' }
        ].map(report => (
          <div key={report.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <report.icon className={`w-6 h-6 text-${report.color}-600`} />
            </div>
            <h3 className="font-bold text-lg text-[#003566] mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
            <button className="w-full bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center justify-center gap-2">
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
          {messages.map(message => (
            <div key={message.id} className={`bg-white rounded-lg shadow-lg p-6 ${!message.read ? 'border-l-4 border-[#ffc300]' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-[#003566]">{message.subject}</h3>
                  <p className="text-sm text-gray-600">From: {message.from}</p>
                </div>
                <span className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-4">{message.message}</p>
              {message.attachments.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Paperclip className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{message.attachments.length} attachment(s)</span>
                </div>
              )}
              <button className="bg-[#003566] text-white px-4 py-2 rounded-lg hover:bg-[#001d3d] transition-colors text-sm font-semibold flex items-center gap-2">
                <Send className="w-4 h-4" />
                Reply
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="font-bold text-xl text-[#003566] mb-4">New Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]">
                <option>Select recipient...</option>
                <option>All Tenants</option>
                <option>All Owners</option>
                <option>Property Managers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Message subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button className="w-full bg-[#ffc300] text-[#003566] px-4 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors flex items-center justify-center gap-2">
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
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003566]"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button className="w-full bg-[#ffc300] text-[#003566] px-6 py-3 rounded-lg font-bold hover:bg-[#003566] hover:text-white transition-colors">
              Send Message
            </button>
          </form>
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
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#ffc300] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@elitepm.com</p>
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
            <p className="text-2xl font-bold text-[#ffc300]">(555) 999-9999</p>
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
              <li><button className="hover:text-white">Pay Rent Online</button></li>
              <li><button className="hover:text-white">Submit Maintenance</button></li>
              <li><button className="hover:text-white">Lease Information</button></li>
              <li><button className="hover:text-white">Tenant Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Owners</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">Owner Portal</button></li>
              <li><button className="hover:text-white">Financial Reports</button></li>
              <li><button className="hover:text-white">Property Performance</button></li>
              <li><button className="hover:text-white">Add Property</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Contact</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#001d3d] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Elite Property Management. All rights reserved. Managing {totalProperties} properties with {totalUnits} units.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {currentPage === 'home' && <DashboardPage />}
        {currentPage === 'properties' && <PropertiesPage />}
        {currentPage === 'tenants' && <TenantPortalPage />}
        {currentPage === 'owners' && <OwnerPortalPage />}
        {currentPage === 'maintenance' && <MaintenancePage />}
        {currentPage === 'payments' && <PaymentsPage />}
        {currentPage === 'leases' && <LeasesPage />}
        {currentPage === 'reports' && <ReportsPage />}
        {currentPage === 'messages' && <MessagesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default ElitePropertyManagement;
