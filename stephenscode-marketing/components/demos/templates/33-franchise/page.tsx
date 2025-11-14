'use client';

import React, { useState } from 'react';
import {
  Building2, Users, MapPin, BarChart3, Package, GraduationCap,
  Megaphone, FileText, Settings, ChevronRight, TrendingUp, AlertCircle,
  CheckCircle, DollarSign, Calendar, Target, Award, BookOpen, Download,
  Upload, Filter, Search, Bell, Menu, X, Home, Shield, Clock, Zap,
  Globe, Phone, Mail, ChevronDown, PieChart, ShoppingCart, Truck,
  ClipboardCheck, UserCheck, Store, LayoutDashboard, Video, MessageSquare
} from 'lucide-react';

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
}

const FastServeFranchiseNetwork = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample Data
  const locations: Location[] = [
    {
      id: '1',
      name: 'FastServe Downtown',
      owner: 'John Smith',
      address: '123 Main St, Denver, CO 80202',
      phone: '(555) 123-4567',
      status: 'active',
      revenue: 125000,
      compliance: 98,
      employees: 12,
      openDate: '2020-01-15'
    },
    {
      id: '2',
      name: 'FastServe Westside',
      owner: 'Sarah Johnson',
      address: '456 West Ave, Denver, CO 80204',
      phone: '(555) 234-5678',
      status: 'active',
      revenue: 98000,
      compliance: 95,
      employees: 10,
      openDate: '2020-06-20'
    },
    {
      id: '3',
      name: 'FastServe Northgate',
      owner: 'Mike Chen',
      address: '789 North Blvd, Denver, CO 80205',
      phone: '(555) 345-6789',
      status: 'active',
      revenue: 142000,
      compliance: 100,
      employees: 15,
      openDate: '2019-11-10'
    },
    {
      id: '4',
      name: 'FastServe South Plaza',
      owner: 'Emily Rodriguez',
      address: '321 South St, Denver, CO 80203',
      phone: '(555) 456-7890',
      status: 'active',
      revenue: 87000,
      compliance: 92,
      employees: 8,
      openDate: '2021-03-05'
    },
    {
      id: '5',
      name: 'FastServe Airport',
      owner: 'David Park',
      address: '555 Airport Way, Denver, CO 80206',
      phone: '(555) 567-8901',
      status: 'pending',
      revenue: 0,
      compliance: 85,
      employees: 6,
      openDate: '2024-08-01'
    }
  ];

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Premium Coffee Beans',
      sku: 'COF-001',
      category: 'Beverages',
      stock: 450,
      minStock: 200,
      price: 12.99,
      supplier: 'Premium Roasters Inc',
      lastOrdered: '2024-05-10'
    },
    {
      id: '2',
      name: 'Sandwich Wrap Paper',
      sku: 'PKG-102',
      category: 'Packaging',
      stock: 1200,
      minStock: 500,
      price: 0.15,
      supplier: 'PackPro Supplies',
      lastOrdered: '2024-05-12'
    },
    {
      id: '3',
      name: 'Fresh Lettuce',
      sku: 'PRD-203',
      category: 'Produce',
      stock: 85,
      minStock: 100,
      price: 2.50,
      supplier: 'Farm Fresh Co',
      lastOrdered: '2024-05-14'
    },
    {
      id: '4',
      name: 'Disposable Cups (16oz)',
      sku: 'PKG-105',
      category: 'Packaging',
      stock: 3500,
      minStock: 1000,
      price: 0.08,
      supplier: 'PackPro Supplies',
      lastOrdered: '2024-05-08'
    },
    {
      id: '5',
      name: 'Cleaning Supplies Kit',
      sku: 'CLN-301',
      category: 'Supplies',
      stock: 45,
      minStock: 30,
      price: 24.99,
      supplier: 'CleanPro Distributors',
      lastOrdered: '2024-05-11'
    }
  ];

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Food Safety & Hygiene Standards',
      category: 'Compliance',
      duration: '45 min',
      completed: 28,
      total: 33,
      mandatory: true,
      dueDate: '2024-06-01'
    },
    {
      id: '2',
      title: 'Customer Service Excellence',
      category: 'Service',
      duration: '30 min',
      completed: 33,
      total: 33,
      mandatory: true
    },
    {
      id: '3',
      title: 'POS System Training',
      category: 'Technology',
      duration: '60 min',
      completed: 31,
      total: 33,
      mandatory: true
    },
    {
      id: '4',
      title: 'Franchise Operations Manual',
      category: 'Operations',
      duration: '90 min',
      completed: 25,
      total: 33,
      mandatory: true,
      dueDate: '2024-05-30'
    },
    {
      id: '5',
      title: 'Leadership Development',
      category: 'Management',
      duration: '120 min',
      completed: 12,
      total: 33,
      mandatory: false
    }
  ];

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#bc4749] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 text-[#f2cc8f]" />
            <div>
              <h1 className="text-2xl font-bold">FastServe</h1>
              <p className="text-xs text-[#f2cc8f]">Franchise Network</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#a33f41] px-3 py-2 rounded-lg">
              <span className="text-sm">Role:</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent border-none text-white font-semibold text-sm focus:outline-none"
              >
                <option value="guest">Guest</option>
                <option value="franchise-owner">Franchise Owner</option>
                <option value="manager">Manager</option>
                <option value="corporate">Corporate Admin</option>
              </select>
            </div>
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#f2cc8f]" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-[#f2cc8f]" />
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
            {[
              { page: 'home' as Page, label: 'Home', icon: Home },
              { page: 'locations' as Page, label: 'Locations', icon: MapPin },
              { page: 'franchise-portal' as Page, label: 'Portal', icon: Building2 },
              { page: 'admin' as Page, label: 'Admin', icon: LayoutDashboard },
              { page: 'inventory' as Page, label: 'Inventory', icon: Package },
              { page: 'reporting' as Page, label: 'Reports', icon: BarChart3 },
              { page: 'training' as Page, label: 'Training', icon: GraduationCap },
              { page: 'marketing' as Page, label: 'Marketing', icon: Megaphone },
              { page: 'resources' as Page, label: 'Resources', icon: FileText },
              { page: 'contact' as Page, label: 'Contact', icon: Phone }
            ].map(({ page, label, icon: Icon }) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
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

  // Home Page
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#bc4749] to-[#81b29a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">FastServe Franchise Network</h1>
          <p className="text-xl mb-6">Enterprise-level franchise management platform powering 33+ locations nationwide</p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('franchise-portal')}
              className="bg-[#f2cc8f] text-[#bc4749] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Access Portal
            </button>
            <button
              onClick={() => setCurrentPage('locations')}
              className="bg-white text-[#bc4749] px-8 py-3 rounded-lg font-semibold hover:bg-[#f2cc8f] transition-colors"
            >
              View Locations
            </button>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#bc4749] mb-8">Network Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Store, label: 'Active Locations', value: '33', change: '+3', color: 'text-green-600' },
            { icon: DollarSign, label: 'Network Revenue', value: '$4.2M', change: '+12%', color: 'text-green-600' },
            { icon: Users, label: 'Total Employees', value: '412', change: '+8%', color: 'text-green-600' },
            { icon: TrendingUp, label: 'Avg Compliance', value: '96.5%', change: '+2.1%', color: 'text-green-600' }
          ].map(({ icon: Icon, label, value, change, color }) => (
            <div key={label} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-[#bc4749]" />
                <span className={`text-sm font-semibold ${color}`}>{change}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{label}</p>
              <p className="text-3xl font-bold text-[#bc4749]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#bc4749] mb-8">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: LayoutDashboard,
                title: 'Multi-Location Dashboard',
                desc: 'Real-time visibility into all franchise operations from a single control center'
              },
              {
                icon: Package,
                title: 'Centralized Inventory',
                desc: 'Synchronized inventory management across all locations with automatic reordering'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Comprehensive reporting with predictive insights and performance benchmarking'
              },
              {
                icon: GraduationCap,
                title: 'Training Management',
                desc: 'Standardized training programs with certification tracking and compliance monitoring'
              },
              {
                icon: Megaphone,
                title: 'Marketing Hub',
                desc: 'Centralized marketing asset distribution with local customization capabilities'
              },
              {
                icon: Shield,
                title: 'Compliance Tracking',
                desc: 'Automated compliance monitoring with alerts and audit trail documentation'
              }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <Icon className="w-12 h-12 text-[#bc4749] mb-4" />
                <h3 className="text-xl font-bold text-[#bc4749] mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
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
              onClick={() => setCurrentPage(page)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-[#bc4749]" />
              <span className="font-semibold text-[#bc4749]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Locations Page
  const LocationsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Franchise Locations</h1>
          <p className="text-gray-600">Manage and monitor all franchise locations</p>
        </div>
        {userRole === 'corporate' && (
          <button className="bg-[#bc4749] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Add Location
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search locations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent">
              <option>Revenue (High to Low)</option>
              <option>Revenue (Low to High)</option>
              <option>Compliance Score</option>
              <option>Name (A-Z)</option>
              <option>Opening Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map(location => (
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
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4" />
                {location.phone}
              </div>
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
              <button className="flex-1 bg-[#bc4749] text-white px-4 py-2 rounded-lg hover:bg-[#a33f41] transition-colors text-sm font-semibold">
                View Details
              </button>
              <button className="px-4 py-2 border-2 border-[#bc4749] text-[#bc4749] rounded-lg hover:bg-[#bc4749] hover:text-white transition-colors text-sm font-semibold">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Franchise Portal Page
  const FranchisePortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Franchise Owner Portal</h1>

      {userRole === 'guest' ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Shield className="w-16 h-16 text-[#bc4749] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Access Required</h2>
          <p className="text-gray-600 mb-6">Please log in as a Franchise Owner or Manager to access the portal</p>
          <button
            onClick={() => setUserRole('franchise-owner')}
            className="bg-[#bc4749] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
          >
            Switch to Franchise Owner
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Today\'s Sales', value: '$4,235', icon: DollarSign, color: 'text-green-600' },
              { label: 'Active Orders', value: '23', icon: ShoppingCart, color: 'text-blue-600' },
              { label: 'Staff on Duty', value: '8', icon: Users, color: 'text-purple-600' },
              { label: 'Inventory Alerts', value: '3', icon: AlertCircle, color: 'text-red-600' }
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${color}`} />
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
                <p className="text-gray-600 text-sm">{label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Package, label: 'Order Supplies' },
                { icon: FileText, label: 'Submit Report' },
                { icon: Calendar, label: 'Schedule Staff' },
                { icon: MessageSquare, label: 'Contact Support' }
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] hover:bg-[#bc4749] hover:text-white transition-all">
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {[
                  { type: 'alert', message: 'Low stock alert: Premium Coffee Beans', time: '2 hours ago' },
                  { type: 'success', message: 'Daily sales target achieved!', time: '4 hours ago' },
                  { type: 'info', message: 'New training module available', time: '1 day ago' },
                  { type: 'alert', message: 'Compliance review due next week', time: '2 days ago' }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                      notif.type === 'alert' ? 'text-red-600' :
                      notif.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: 'Sales Target', value: 87, color: 'bg-green-500' },
                  { label: 'Customer Satisfaction', value: 94, color: 'bg-blue-500' },
                  { label: 'Staff Training', value: 76, color: 'bg-yellow-500' },
                  { label: 'Compliance Score', value: 98, color: 'bg-green-500' }
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                      <span className="text-sm font-bold text-[#bc4749]">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Central Admin Page
  const CentralAdminPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Central Administration</h1>

      {userRole !== 'corporate' ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Shield className="w-16 h-16 text-[#bc4749] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#bc4749] mb-4">Corporate Access Required</h2>
          <p className="text-gray-600 mb-6">This area is restricted to corporate administrators only</p>
          <button
            onClick={() => setUserRole('corporate')}
            className="bg-[#bc4749] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors"
          >
            Switch to Corporate Admin
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Network Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Network Performance Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: 'Total Locations', value: '33', change: '+9%' },
                { label: 'Network Revenue', value: '$4.2M', change: '+12%' },
                { label: 'Avg Location Revenue', value: '$127K', change: '+8%' },
                { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2' },
                { label: 'Network Compliance', value: '96.5%', change: '+2.1%' }
              ].map(({ label, value, change }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-[#bc4749] mb-1">{value}</p>
                  <p className="text-xs text-gray-600 mb-1">{label}</p>
                  <span className="text-xs font-semibold text-green-600">{change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Settings</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, label: 'User Management', count: '412 users' },
                  { icon: Shield, label: 'Role Permissions', count: '5 roles' },
                  { icon: Settings, label: 'System Config', count: 'Active' },
                  { icon: Bell, label: 'Notifications', count: '23 pending' }
                ].map(({ icon: Icon, label, count }) => (
                  <button key={label} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-[#bc4749] hover:text-white transition-all group">
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
              <div className="space-y-4">
                {[
                  { location: 'Northgate', score: 100, status: 'excellent' },
                  { location: 'Downtown', score: 98, status: 'excellent' },
                  { location: 'Westside', score: 95, status: 'good' },
                  { location: 'South Plaza', score: 92, status: 'good' },
                  { location: 'Airport', score: 85, status: 'needs-improvement' }
                ].map(({ location, score, status }) => (
                  <div key={location} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{location}</p>
                      <p className="text-xs text-gray-500">{status.replace('-', ' ')}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        score >= 95 ? 'text-green-600' :
                        score >= 90 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>{score}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Database Status', value: 'Healthy', icon: CheckCircle, color: 'text-green-600' },
                  { metric: 'API Response Time', value: '145ms', icon: Zap, color: 'text-green-600' },
                  { metric: 'Active Sessions', value: '89', icon: Users, color: 'text-blue-600' },
                  { metric: 'Storage Used', value: '67%', icon: Package, color: 'text-yellow-600' },
                  { metric: 'Backup Status', value: 'Current', icon: CheckCircle, color: 'text-green-600' }
                ].map(({ metric, value, icon: Icon, color }) => (
                  <div key={metric} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#bc4749]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Inventory Management Page - CONTINUE IN NEXT MESSAGE
  const InventoryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Inventory Management</h1>
          <p className="text-gray-600">Centralized inventory tracking across all locations</p>
        </div>
        <button className="bg-[#bc4749] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Bulk Import
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749]"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749]"
            >
              <option value="all">All Categories</option>
              <option value="Beverages">Beverages</option>
              <option value="Packaging">Packaging</option>
              <option value="Produce">Produce</option>
              <option value="Supplies">Supplies</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749]">
              <option>All Items</option>
              <option>Low Stock</option>
              <option>In Stock</option>
              <option>Overstocked</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Items', value: '1,247', icon: Package, color: 'text-blue-600' },
          { label: 'Low Stock Alerts', value: '8', icon: AlertCircle, color: 'text-red-600' },
          { label: 'Reorder Pending', value: '15', icon: ShoppingCart, color: 'text-yellow-600' },
          { label: 'Total Value', value: '$47.2K', icon: DollarSign, color: 'text-green-600' }
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6">
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#bc4749] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Min Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventoryItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.sku}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${
                      item.stock < item.minStock ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.minStock}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${item.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.supplier}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-[#bc4749] hover:bg-[#bc4749] hover:text-white rounded transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#81b29a] hover:bg-[#81b29a] hover:text-white rounded transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Multi-Store Reporting Page
  const ReportingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#bc4749] mb-2">Multi-Store Reporting</h1>
          <p className="text-gray-600">Comprehensive analytics across all franchise locations</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border-2 border-[#bc4749] rounded-lg font-semibold text-[#bc4749] focus:outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-[#bc4749] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Revenue Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$4.2M', change: '+12.3%', trend: 'up' },
            { label: 'Avg per Location', value: '$127K', change: '+8.1%', trend: 'up' },
            { label: 'Top Performer', value: 'Northgate', change: '$142K', trend: 'neutral' },
            { label: 'Growth Rate', value: '15.2%', change: '+3.4%', trend: 'up' }
          ].map(({ label, value, change, trend }) => (
            <div key={label} className="text-center">
              <p className="text-gray-600 text-sm mb-2">{label}</p>
              <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
              <p className={`text-sm font-semibold ${
                trend === 'up' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {change}
              </p>
            </div>
          ))}
        </div>

        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p>Revenue Trend Chart</p>
            <p className="text-sm">(Interactive chart would display here)</p>
          </div>
        </div>
      </div>

      {/* Performance by Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Top Performing Locations</h3>
          <div className="space-y-3">
            {locations
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 5)
              .map((location, idx) => (
                <div key={location.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    <p className="font-bold text-[#bc4749]">${(location.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-600 font-semibold">+12%</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Category Performance</h3>
          <div className="space-y-4">
            {[
              { category: 'Food Sales', value: 2100000, percent: 50, color: 'bg-blue-500' },
              { category: 'Beverage Sales', value: 1470000, percent: 35, color: 'bg-green-500' },
              { category: 'Merchandise', value: 420000, percent: 10, color: 'bg-purple-500' },
              { category: 'Catering', value: 210000, percent: 5, color: 'bg-orange-500' }
            ].map(({ category, value, percent, color }) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{category}</span>
                  <span className="text-sm font-bold text-[#bc4749]">
                    ${(value / 1000000).toFixed(2)}M ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`${color} h-3 rounded-full`} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#bc4749] mb-4">Location Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Orders</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Avg Ticket</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Compliance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.slice(0, 4).map(location => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">{location.name}</td>
                  <td className="px-4 py-3 text-[#bc4749] font-bold">${(location.revenue / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-gray-700">{Math.floor(location.revenue / 25)}</td>
                  <td className="px-4 py-3 text-gray-700">$24.50</td>
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

  // Training Portal Page
  const TrainingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Training Management Portal</h1>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Modules', value: '24', icon: BookOpen },
          { label: 'Total Enrollments', value: '412', icon: Users },
          { label: 'Completion Rate', value: '84%', icon: CheckCircle },
          { label: 'Certifications', value: '327', icon: Award }
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6">
            <Icon className="w-8 h-8 text-[#bc4749] mb-3" />
            <p className="text-3xl font-bold text-[#bc4749] mb-1">{value}</p>
            <p className="text-gray-600 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Training Modules */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#bc4749]">Training Modules</h2>
          <button className="bg-[#bc4749] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a33f41] transition-colors">
            Create Module
          </button>
        </div>

        <div className="space-y-4">
          {trainingModules.map(module => (
            <div key={module.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#bc4749] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#bc4749]">{module.title}</h3>
                    {module.mandatory && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                        MANDATORY
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {module.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </span>
                    {module.dueDate && (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(module.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button className="bg-[#bc4749] text-white px-6 py-2 rounded-lg hover:bg-[#a33f41] transition-colors">
                  View Module
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Completion Progress</span>
                    <span className="text-sm font-bold text-[#bc4749]">
                      {module.completed}/{module.total} ({Math.round((module.completed / module.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        (module.completed / module.total) >= 0.9 ? 'bg-green-500' :
                        (module.completed / module.total) >= 0.7 ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${(module.completed / module.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Resource Library</h3>
          <div className="space-y-3">
            {[
              { icon: FileText, title: 'Operations Manual', type: 'PDF', size: '4.2 MB' },
              { icon: Video, title: 'Food Safety Training Video', type: 'Video', size: '125 MB' },
              { icon: FileText, title: 'Customer Service Guide', type: 'PDF', size: '1.8 MB' },
              { icon: BookOpen, title: 'Franchise Handbook', type: 'PDF', size: '6.5 MB' }
            ].map(({ icon: Icon, title, type, size }) => (
              <div key={title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#bc4749]" />
                  <div>
                    <p className="font-semibold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{type} • {size}</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-[#81b29a]" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#bc4749] mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {[
              { title: 'New Menu Rollout Training', date: '2024-06-15', time: '2:00 PM EST', attendees: 24 },
              { title: 'Leadership Workshop', date: '2024-06-22', time: '10:00 AM EST', attendees: 12 },
              { title: 'Health & Safety Certification', date: '2024-06-28', time: '9:00 AM EST', attendees: 33 },
              { title: 'Tech Systems Update', date: '2024-07-05', time: '1:00 PM EST', attendees: 18 }
            ].map((session, idx) => (
              <div key={idx} className="p-4 border-2 border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">{session.title}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {session.attendees}
                  </span>
                </div>
                <button className="w-full mt-3 bg-[#bc4749] text-white px-4 py-2 rounded-lg hover:bg-[#a33f41] transition-colors text-sm font-semibold">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Marketing Tools Page
  const MarketingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Marketing Asset Hub</h1>

      {/* Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Megaphone, title: 'Social Media Assets', count: 142, color: 'bg-blue-500' },
          { icon: FileText, title: 'Print Materials', count: 67, color: 'bg-purple-500' },
          { icon: Video, title: 'Video Content', count: 23, color: 'bg-red-500' }
        ].map(({ icon: Icon, title, count, color }) => (
          <div key={title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#bc4749] mb-2">{title}</h3>
            <p className="text-gray-600">{count} assets available</p>
          </div>
        ))}
      </div>

      {/* Recent Assets */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Featured Marketing Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Summer Promotion Banner', type: 'Social Media', format: 'PNG' },
            { title: 'Menu Update Flyer', type: 'Print', format: 'PDF' },
            { title: 'Grand Opening Template', type: 'Social Media', format: 'PSD' },
            { title: 'Training Video Intro', type: 'Video', format: 'MP4' }
          ].map((asset, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#bc4749] transition-all">
              <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                <Megaphone className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{asset.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{asset.type}</span>
                <span className="px-2 py-1 bg-[#bc4749] text-white rounded text-xs font-semibold">
                  {asset.format}
                </span>
              </div>
              <button className="w-full mt-3 bg-[#81b29a] text-white px-4 py-2 rounded-lg hover:bg-[#6fa085] transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Manager */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Active Campaigns</h2>
        <div className="space-y-4">
          {[
            { name: 'Summer Menu Launch', status: 'Active', reach: '45K', engagement: '12.3%', budget: '$5,000' },
            { name: 'Loyalty Program Promotion', status: 'Active', reach: '32K', engagement: '8.7%', budget: '$3,500' },
            { name: 'New Location Opening', status: 'Scheduled', reach: '0', engagement: '0%', budget: '$7,500' }
          ].map((campaign, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{campaign.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <button className="bg-[#bc4749] text-white px-6 py-2 rounded-lg hover:bg-[#a33f41] transition-colors">
                  Manage
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#bc4749]">{campaign.reach}</p>
                  <p className="text-xs text-gray-600">Reach</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#81b29a]">{campaign.engagement}</p>
                  <p className="text-xs text-gray-600">Engagement</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#bc4749]">{campaign.budget}</p>
                  <p className="text-xs text-gray-600">Budget</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Corporate Resources Page
  const ResourcesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Corporate Resources</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Essential Documents</h2>
            <div className="space-y-3">
              {[
                { category: 'Operations', title: 'Franchise Operations Manual', version: 'v4.2', date: '2024-05-01' },
                { category: 'Legal', title: 'Franchise Agreement Template', version: 'v2.1', date: '2024-04-15' },
                { category: 'Training', title: 'Employee Onboarding Guide', version: 'v3.0', date: '2024-05-10' },
                { category: 'Marketing', title: 'Brand Guidelines', version: 'v5.3', date: '2024-03-20' },
                { category: 'Compliance', title: 'Health & Safety Standards', version: 'v2.8', date: '2024-05-05' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-[#bc4749]" />
                    <div>
                      <p className="font-semibold text-gray-800">{doc.title}</p>
                      <p className="text-xs text-gray-500">
                        {doc.category} • {doc.version} • Updated {doc.date}
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-[#81b29a]" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Forms & Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Incident Report Form',
                'Employee Schedule Template',
                'Inventory Order Form',
                'Customer Feedback Form',
                'Maintenance Request',
                'Staff Performance Review'
              ].map((form, idx) => (
                <div key={idx} className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#bc4749] transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{form}</span>
                    <Download className="w-5 h-5 text-[#bc4749]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links & Support */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { icon: Globe, label: 'Corporate Website' },
                { icon: Shield, label: 'Compliance Portal' },
                { icon: Users, label: 'HR Resources' },
                { icon: DollarSign, label: 'Payroll System' },
                { icon: Package, label: 'Supplier Portal' },
                { icon: MessageSquare, label: 'Support Tickets' }
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#bc4749] hover:text-white transition-all group">
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
              <button className="w-full bg-white text-[#bc4749] px-4 py-2 rounded-lg font-semibold hover:bg-[#f2cc8f] transition-colors">
                Contact Support
              </button>
              <button className="w-full bg-[#a33f41] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#81b29a] transition-colors">
                View FAQs
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">System Status</h3>
            <div className="space-y-3">
              {[
                { service: 'POS System', status: 'operational' },
                { service: 'Inventory API', status: 'operational' },
                { service: 'Training Portal', status: 'operational' },
                { service: 'Reporting Engine', status: 'maintenance' }
              ].map(({ service, status }) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{service}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    status === 'operational' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#bc4749] mb-8">Contact Corporate</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#bc4749] mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent">
                    <option>Select your location</option>
                    {locations.map(loc => (
                      <option key={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Operations Support</option>
                  <option>Technical Support</option>
                  <option>Marketing</option>
                  <option>Training</option>
                  <option>Compliance</option>
                  <option>Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                  placeholder="Brief subject line"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bc4749] focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#bc4749] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#a33f41] transition-colors"
              >
                Send Message
              </button>
            </form>
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
                  <p className="text-gray-600 text-sm">(555) 100-2000</p>
                  <p className="text-gray-500 text-xs">Mon-Fri: 8am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#bc4749] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600 text-sm">support@fastserve.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#81b29a] text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
            <p className="text-sm mb-4">For urgent issues requiring immediate attention</p>
            <p className="font-bold text-lg mb-2">24/7 Hotline</p>
            <p className="text-2xl font-bold mb-4">(555) 911-FAST</p>
            <p className="text-xs opacity-90">For POS failures, security issues, or critical incidents</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#bc4749] mb-4">Department Direct Lines</h3>
            <div className="space-y-3 text-sm">
              {[
                { dept: 'Operations', ext: 'Ext. 201' },
                { dept: 'Training', ext: 'Ext. 202' },
                { dept: 'Marketing', ext: 'Ext. 203' },
                { dept: 'IT Support', ext: 'Ext. 204' },
                { dept: 'Compliance', ext: 'Ext. 205' }
              ].map(({ dept, ext }) => (
                <div key={dept} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-semibold text-gray-700">{dept}</span>
                  <span className="text-gray-600">{ext}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#bc4749] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-8 h-8 text-[#f2cc8f]" />
              <span className="text-xl font-bold">FastServe</span>
            </div>
            <p className="text-gray-300 text-sm">
              Enterprise franchise management platform serving 33+ locations nationwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Franchisees</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">Owner Portal</button></li>
              <li><button className="hover:text-white">Training</button></li>
              <li><button className="hover:text-white">Resources</button></li>
              <li><button className="hover:text-white">Support</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Corporate</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">Network Overview</button></li>
              <li><button className="hover:text-white">Compliance</button></li>
              <li><button className="hover:text-white">Marketing</button></li>
              <li><button className="hover:text-white">Analytics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>(555) 100-2000</li>
              <li>support@fastserve.com</li>
              <li>24/7 Emergency: (555) 911-FAST</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#a33f41] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 FastServe Franchise Network. All rights reserved.</p>
          <p className="mt-2">Enterprise Platform Demo - $7,500 Tier</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'locations' && <LocationsPage />}
        {currentPage === 'franchise-portal' && <FranchisePortalPage />}
        {currentPage === 'admin' && <CentralAdminPage />}
        {currentPage === 'inventory' && <InventoryPage />}
        {currentPage === 'reporting' && <ReportingPage />}
        {currentPage === 'training' && <TrainingPage />}
        {currentPage === 'marketing' && <MarketingPage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default FastServeFranchiseNetwork;
