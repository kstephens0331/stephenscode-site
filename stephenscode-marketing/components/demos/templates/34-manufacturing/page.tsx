'use client';

import React, { useState } from 'react';
import {
  Factory, Package, Users, TrendingUp, BarChart3, ShoppingBag,
  Truck, Settings, CheckCircle2, AlertTriangle, Clock, Calendar,
  FileText, Download, Upload, Filter, Search, Bell, Menu, X,
  Home, Shield, Activity, Target, Award, Box, Boxes, ClipboardCheck,
  UserCheck, Gauge, Layers, GitBranch, Database, Zap, Phone,
  Mail, MapPin, ChevronRight, ChevronDown, DollarSign, PieChart,
  LineChart, Building, Wrench, HardHat, ListChecks, FileBarChart
} from 'lucide-react';

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

const TechProManufacturing = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Data
  const products: Product[] = [
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
      specs: ['IP65 Rated', '24V DC Input', 'CE Certified', 'Modular Design']
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
      specs: ['5000 RPM Max', '10kW Power', 'High Torque', '3-Year Warranty']
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
      specs: ['20:1 Ratio', 'Low Backlash', 'Hardened Steel', 'Sealed Bearing']
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
      specs: ['Multi-Sensor', 'Digital Output', 'Wide Range', 'Compact Design']
    }
  ];

  const orders: Order[] = [
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
    }
  ];

  const productionJobs: ProductionJob[] = [
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

  const qualityChecks: QualityCheck[] = [
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
    }
  ];

  // Navigation
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
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#ba181b]" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-[#ba181b]" />
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

  // Home Page
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
            { icon: Factory, label: 'Active Production Lines', value: '4', status: 'Running', color: 'text-green-500' },
            { icon: Package, label: 'Units Produced Today', value: '2,847', change: '+12%', color: 'text-blue-500' },
            { icon: ClipboardCheck, label: 'Quality Pass Rate', value: '98.2%', change: '+1.5%', color: 'text-green-500' },
            { icon: TrendingUp, label: 'Production Efficiency', value: '94.7%', change: '+3.2%', color: 'text-green-500' }
          ].map(({ icon: Icon, label, value, status, change, color }) => (
            <div key={label} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
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
            </div>
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
                desc: 'Complete wholesale ordering platform with custom pricing, bulk discounts, and approval workflows'
              },
              {
                icon: Factory,
                title: 'Production Scheduling',
                desc: 'Real-time production tracking across multiple facilities with capacity planning and resource allocation'
              },
              {
                icon: Boxes,
                title: 'Multi-Facility Inventory',
                desc: 'Centralized inventory management with automatic stock transfers and reorder point optimization'
              },
              {
                icon: ClipboardCheck,
                title: 'Quality Control Workflows',
                desc: 'Comprehensive QC system with batch tracking, inspection protocols, and compliance reporting'
              },
              {
                icon: ShoppingBag,
                title: 'Order Management',
                desc: 'End-to-end order processing from quote to delivery with status tracking and customer portal'
              },
              {
                icon: Truck,
                title: 'Supplier Integration',
                desc: 'Direct supplier connectivity for raw materials procurement with EDI and API integration'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Real-time dashboards with predictive insights, KPI tracking, and custom report generation'
              },
              {
                icon: Shield,
                title: 'Security & Compliance',
                desc: 'Role-based access control, audit trails, and industry compliance management'
              },
              {
                icon: Zap,
                title: 'Automation & Integration',
                desc: 'API-first architecture with ERP integration and automated workflow triggers'
              }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#161a1d] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all">
                <Icon className="w-12 h-12 text-[#ba181b] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
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
              className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 hover:border-[#ba181b] transition-all hover:scale-105 flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-[#ba181b]" />
              <span className="font-semibold text-white">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Products Page
  const ProductsPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Product Catalog</h1>
            <p className="text-gray-400">Industrial-grade manufacturing components</p>
          </div>
          {userRole === 'admin' && (
            <button className="bg-[#ba181b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
              <Package className="w-5 h-5" />
              Add Product
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 mb-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
              <select className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]">
                <option>All Categories</option>
                <option>Control Systems</option>
                <option>Motors & Drives</option>
                <option>Transmission</option>
                <option>Sensors</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Availability</label>
              <select className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]">
                <option>All Products</option>
                <option>In Stock</option>
                <option>Made to Order</option>
                <option>Coming Soon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Sort By</label>
              <select className="w-full px-4 py-2 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Stock Level</option>
                <option>Lead Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-[#0b090a] rounded-lg shadow-xl overflow-hidden border border-gray-800 hover:border-[#ba181b] transition-all">
              <div className="h-48 bg-gray-900">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="p-6">
                <span className="px-2 py-1 bg-[#ba181b] text-white rounded text-xs font-semibold">
                  {product.category}
                </span>
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

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    Request Quote
                  </button>
                  <button className="px-4 py-2 border-2 border-[#ba181b] text-[#ba181b] rounded-lg hover:bg-[#ba181b] hover:text-white transition-colors font-semibold">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // B2B Portal Page
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
                { label: 'Account Balance', value: '$47,250', icon: DollarSign, color: 'text-blue-500' },
                { label: 'Active Orders', value: '12', icon: ShoppingBag, color: 'text-green-500' },
                { label: 'Credit Limit', value: '$250K', icon: Award, color: 'text-purple-500' },
                { label: 'Available Credit', value: '$202K', icon: CheckCircle2, color: 'text-green-500' }
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: ShoppingBag, label: 'New Order' },
                  { icon: FileText, label: 'Request Quote' },
                  { icon: Download, label: 'Download Invoices' },
                  { icon: Phone, label: 'Contact Rep' }
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="p-4 border-2 border-gray-800 rounded-lg hover:border-[#ba181b] hover:bg-[#ba181b] hover:text-white transition-all">
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
                    <div key={order.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
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
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Custom Pricing</h3>
                <div className="space-y-4">
                  {products.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                      <div>
                        <p className="font-semibold text-white text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#ba181b]">${(product.price * 0.85).toFixed(2)}</p>
                        <p className="text-xs text-gray-400 line-through">${product.price}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    View Full Catalog
                  </button>
                </div>
              </div>
            </div>

            {/* Contract Information */}
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Contract Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Production Dashboard Page
  const ProductionPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Production Dashboard</h1>
            <p className="text-gray-400">Real-time manufacturing floor monitoring</p>
          </div>
          <select
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
          {[
            { line: 'Line A', status: 'Running', output: '127/h', efficiency: '94%', color: 'bg-green-500' },
            { line: 'Line B', status: 'Running', output: '98/h', efficiency: '87%', color: 'bg-green-500' },
            { line: 'Line C', status: 'Setup', output: '0/h', efficiency: '0%', color: 'bg-yellow-500' },
            { line: 'Line D', status: 'Running', output: '156/h', efficiency: '98%', color: 'bg-green-500' }
          ].map(({ line, status, output, efficiency, color }) => (
            <div key={line} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{line}</h3>
                <div className={`w-3 h-3 rounded-full ${color} animate-pulse`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-white font-semibold">{status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Output</span>
                  <span className="text-white font-semibold">{output}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Efficiency</span>
                  <span className="text-green-400 font-semibold">{efficiency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Production Jobs */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Active Production Jobs</h2>
          <div className="space-y-4">
            {productionJobs.map(job => (
              <div key={job.id} className="border-2 border-gray-800 rounded-lg p-6 hover:border-[#ba181b] transition-all">
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
              </div>
            ))}
          </div>
        </div>

        {/* Production Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Today's Production</h3>
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
            <h3 className="text-xl font-bold text-white mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'Line C scheduled maintenance in 2 hours', time: '10 min ago' },
                { type: 'info', message: 'Material shipment arrived - Bay 3', time: '45 min ago' },
                { type: 'success', message: 'Job JOB-004 completed - 100% pass rate', time: '2 hours ago' },
                { type: 'warning', message: 'Raw material stock low - Item RM-345', time: '3 hours ago' }
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-500 flex-shrink-0" />}
                  {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Inventory Management Page
  const InventoryPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400">Multi-facility stock tracking</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#ba181b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import
            </button>
            <button className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total SKUs', value: '1,247', icon: Package, color: 'text-blue-500' },
            { label: 'Total Value', value: '$2.4M', icon: DollarSign, color: 'text-green-500' },
            { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'text-yellow-500' },
            { label: 'Out of Stock', value: '5', icon: AlertTriangle, color: 'text-red-500' }
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <Icon className={`w-6 h-6 ${color} mb-2`} />
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Inventory by Location */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Inventory by Facility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Main Plant', items: 847, value: '$1.2M', capacity: 85 },
              { name: 'West Facility', items: 234, value: '$680K', capacity: 62 },
              { name: 'East Facility', items: 166, value: '$520K', capacity: 71 }
            ].map(({ name, items, value, capacity }) => (
              <div key={name} className="border border-gray-800 rounded-lg p-4">
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
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Stock Alerts</h3>
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
                {[
                  { product: 'TP-3000-ICP', sku: 'TP-3000-ICP', location: 'Main Plant', current: 15, min: 50, status: 'low' },
                  { product: 'SM-500-HD', sku: 'SM-500-HD', location: 'West', current: 3, min: 20, status: 'critical' },
                  { product: 'PG-200-PRE', sku: 'PG-200-PRE', location: 'East', current: 0, min: 30, status: 'out' },
                  { product: 'IS-100-ARR', sku: 'IS-100-ARR', location: 'Main Plant', current: 45, min: 100, status: 'low' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#161a1d]">
                    <td className="px-6 py-4 text-white font-semibold">{item.product}</td>
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
                      <button className="bg-[#ba181b] text-white px-4 py-1 rounded text-sm font-semibold hover:bg-red-700">
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Quality Control Page
  const QualityControlPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Quality Control Center</h1>

        {/* QC Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Overall Pass Rate', value: '98.2%', icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Pending Inspections', value: '8', icon: Clock, color: 'text-yellow-500' },
            { label: 'Failed Batches', value: '3', icon: AlertTriangle, color: 'text-red-500' },
            { label: 'Completed Today', value: '24', icon: ClipboardCheck, color: 'text-blue-500' }
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <Icon className={`w-8 h-8 ${color} mb-3`} />
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Quality Checks */}
        <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Quality Checks</h2>
          <div className="space-y-4">
            {qualityChecks.map(check => (
              <div key={check.id} className="border-2 border-gray-800 rounded-lg p-6 hover:border-[#ba181b] transition-all">
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
              </div>
            ))}
          </div>
        </div>

        {/* QC Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Inspection Checklist</h3>
            <div className="space-y-3">
              {[
                { item: 'Visual Inspection', status: 'completed' },
                { item: 'Dimensional Check', status: 'completed' },
                { item: 'Functional Test', status: 'in-progress' },
                { item: 'Electrical Safety', status: 'pending' },
                { item: 'Final Documentation', status: 'pending' }
              ].map(({ item, status }) => (
                <div key={item} className="flex items-center justify-between p-3 bg-[#161a1d] rounded-lg border border-gray-800">
                  <span className="text-white font-semibold">{item}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === 'completed' ? 'bg-green-900 text-green-300' :
                    status === 'in-progress' ? 'bg-blue-900 text-blue-300' :
                    'bg-gray-800 text-gray-300'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Defect Categories</h3>
            <div className="space-y-4">
              {[
                { category: 'Dimensional', count: 12, percent: 40, color: 'bg-red-500' },
                { category: 'Surface Finish', count: 8, percent: 27, color: 'bg-orange-500' },
                { category: 'Functional', count: 6, percent: 20, color: 'bg-yellow-500' },
                { category: 'Other', count: 4, percent: 13, color: 'bg-gray-500' }
              ].map(({ category, count, percent, color }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-400">{category}</span>
                    <span className="text-sm font-bold text-white">{count} ({percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Order Management Page
  const OrdersPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Order Management</h1>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {[
            { status: 'Pending', count: 8, color: 'bg-gray-500' },
            { status: 'Production', count: 15, color: 'bg-blue-500' },
            { status: 'QC Check', count: 6, color: 'bg-yellow-500' },
            { status: 'Shipping', count: 12, color: 'bg-purple-500' },
            { status: 'Delivered', count: 234, color: 'bg-green-500' }
          ].map(({ status, count, color }) => (
            <div key={status} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <div className={`w-3 h-3 rounded-full ${color} mb-3`}></div>
              <p className="text-3xl font-bold text-white mb-1">{count}</p>
              <p className="text-gray-400 text-sm">{status}</p>
            </div>
          ))}
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
                {orders.map(order => (
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
                        <button className="p-2 text-[#ba181b] hover:bg-[#ba181b] hover:text-white rounded transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-blue-500 hover:bg-blue-500 hover:text-white rounded transition-colors">
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
    </div>
  );

  // Supplier Portal Page
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
                {[
                  { name: 'Steel Supply Co', category: 'Raw Materials', orders: 45, rating: 4.8, onTime: 98 },
                  { name: 'Electronics Parts Ltd', category: 'Components', orders: 32, rating: 4.9, onTime: 95 },
                  { name: 'Industrial Fasteners Inc', category: 'Hardware', orders: 67, rating: 4.6, onTime: 92 },
                  { name: 'Packaging Solutions', category: 'Packaging', orders: 28, rating: 4.7, onTime: 97 }
                ].map((supplier, idx) => (
                  <div key={idx} className="border border-gray-800 rounded-lg p-4 hover:border-[#ba181b] transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white text-lg">{supplier.name}</h3>
                        <p className="text-sm text-gray-400">{supplier.category}</p>
                      </div>
                      <button className="bg-[#ba181b] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Contact
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
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
                    </div>
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
                  { icon: ShoppingBag, label: 'New Purchase Order' },
                  { icon: FileText, label: 'View Contracts' },
                  { icon: BarChart3, label: 'Supplier Reports' },
                  { icon: Settings, label: 'Manage Suppliers' }
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="w-full flex items-center gap-3 p-3 bg-[#161a1d] rounded-lg hover:bg-[#ba181b] hover:text-white transition-all border border-gray-800">
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#ba181b] text-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Pending Approvals</h3>
              <p className="text-4xl font-bold mb-2">7</p>
              <p className="text-sm mb-4">Purchase orders awaiting approval</p>
              <button className="w-full bg-white text-[#ba181b] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Review Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Analytics Dashboard Page
  const AnalyticsPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Real-time insights and performance metrics</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-[#0b090a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b]"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Revenue', value: '$2.4M', change: '+15.2%', trend: 'up' },
            { label: 'Production Output', value: '87,234', change: '+8.7%', trend: 'up' },
            { label: 'Quality Rate', value: '98.2%', change: '+1.5%', trend: 'up' },
            { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', trend: 'up' }
          ].map(({ label, value, change, trend }) => (
            <div key={label} className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">{label}</p>
              <p className="text-3xl font-bold text-white mb-2">{value}</p>
              <p className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Revenue Trend</h3>
            <div className="h-64 bg-[#161a1d] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <LineChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>Revenue Chart</p>
                <p className="text-sm">(Interactive chart would display here)</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Production by Product</h3>
            <div className="h-64 bg-[#161a1d] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>Production Distribution</p>
                <p className="text-sm">(Interactive chart would display here)</p>
              </div>
            </div>
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

  // Contact Page
  const ContactPage = () => (
    <div className="bg-[#161a1d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Department</label>
                  <select className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent">
                    <option>Sales Inquiry</option>
                    <option>Technical Support</option>
                    <option>Quality Assurance</option>
                    <option>Supplier Relations</option>
                    <option>General Information</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-[#161a1d] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#ba181b] focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ba181b] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0b090a] rounded-lg shadow-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Head Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">TechPro Manufacturing</p>
                    <p className="text-gray-400 text-sm">5000 Industrial Pkwy<br />Detroit, MI 48201</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-gray-400 text-sm">(555) 200-3000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#ba181b] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-400 text-sm">info@techpro-mfg.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#ba181b] text-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
              <p className="text-sm mb-4">For urgent production issues</p>
              <p className="text-2xl font-bold mb-4">(555) 911-PROD</p>
              <p className="text-xs opacity-90">Emergency production support available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
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
              <li><button className="hover:text-white">Control Systems</button></li>
              <li><button className="hover:text-white">Motors & Drives</button></li>
              <li><button className="hover:text-white">Sensors</button></li>
              <li><button className="hover:text-white">Custom Solutions</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white">B2B Portal</button></li>
              <li><button className="hover:text-white">Production</button></li>
              <li><button className="hover:text-white">Quality Control</button></li>
              <li><button className="hover:text-white">Analytics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>(555) 200-3000</li>
              <li>info@techpro-mfg.com</li>
              <li>24/7 Support: (555) 911-PROD</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 TechPro Manufacturing. All rights reserved.</p>
          <p className="mt-2">Enterprise Platform Demo - $7,500 Tier</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-[#161a1d]">
      <Navigation />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'b2b-portal' && <B2BPortalPage />}
        {currentPage === 'production' && <ProductionPage />}
        {currentPage === 'inventory' && <InventoryPage />}
        {currentPage === 'quality-control' && <QualityControlPage />}
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'suppliers' && <SuppliersPage />}
        {currentPage === 'analytics' && <AnalyticsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default TechProManufacturing;
