'use client';

import React, { useState } from 'react';
import {
  Briefcase, Users, UserCheck, Clock, FileText, DollarSign, BarChart3,
  Phone, Mail, MapPin, Calendar, Search, Filter, Download, Upload,
  Settings, Bell, User, LogOut, ChevronRight, TrendingUp, CheckCircle2,
  AlertCircle, Star, Award, Target, Activity, Zap, PieChart, FileCheck,
  UserPlus, Send, MessageSquare, Paperclip, Building2, GraduationCap,
  Shield, Clipboard, Package, Eye, Edit, Trash2, MoreVertical, Plus,
  ArrowUpRight, ArrowDownRight, Bookmark, ThumbsUp, AlertTriangle
} from 'lucide-react';

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

const PremierStaffingSolutions = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('Admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState(12);

  // Sample Data
  const jobs: Job[] = [
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

  const candidates: Candidate[] = [
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

  const clients: Client[] = [
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

  const timesheets: Timesheet[] = [
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

  const invoices: Invoice[] = [
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
        { description: 'Nursing Services - Week 1', hours: 48, rate: 45, amount: 2160 },
        { description: 'Nursing Services - Week 2', hours: 48, rate: 45, amount: 2160 },
        { description: 'Nursing Services - Week 3', hours: 48, rate: 45, amount: 2160 },
        { description: 'Nursing Services - Week 4', hours: 48, rate: 45, amount: 2160 }
      ]
    }
  ];

  const complianceDocuments: ComplianceDocument[] = [
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

  // Stats
  const totalJobs = jobs.length;
  const openJobs = jobs.filter(j => j.status === 'Open').length;
  const totalCandidates = candidates.length;
  const availableCandidates = candidates.filter(c => c.status === 'Available').length;
  const totalClients = clients.length;
  const pendingTimesheets = timesheets.filter(t => t.status === 'Pending').length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  // Navigation
  const Navigation = () => (
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
            <button className="relative hover:text-[#778da9] transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="hover:text-[#778da9] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="hover:text-[#778da9] transition-colors">
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
  const DashboardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Staffing Dashboard</h1>
        <p className="text-gray-600">Real-time overview of your staffing operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#1b263b]">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="w-8 h-8 text-[#1b263b]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Open Jobs</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{openJobs}</p>
          <p className="text-sm text-green-600 mt-2">+{totalJobs - openJobs} filled this month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#778da9]">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#778da9]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Candidates</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{availableCandidates}</p>
          <p className="text-sm text-gray-600 mt-2">of {totalCandidates} total</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-[#1b263b]">${(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+12% vs last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-orange-500" />
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Pending Actions</h3>
          <p className="text-3xl font-bold text-[#1b263b]">{pendingTimesheets + 3}</p>
          <p className="text-sm text-gray-600 mt-2">{pendingTimesheets} timesheets, 3 approvals</p>
        </div>
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
            {[
              { candidate: 'Emily Rodriguez', job: 'Senior Software Engineer', client: 'TechCorp Inc.', date: '2024-05-20' },
              { candidate: 'Michael Chen', job: 'Registered Nurse', client: 'City Medical', date: '2024-05-18' },
              { candidate: 'Sarah Thompson', job: 'Warehouse Supervisor', client: 'Logistics Plus', date: '2024-05-15' }
            ].map((placement, idx) => (
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
  const JobBoardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Job Board</h1>
          <p className="text-gray-600">{openJobs} open positions available</p>
        </div>
        <button className="bg-[#778da9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b263b] transition-colors flex items-center gap-2">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b] focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Logistics</option>
            <option>Marketing</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]">
            <option>All Types</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Temporary</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map(job => (
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
              <button className="flex-1 bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors">
                View Details
              </button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Match Candidates
              </button>
              <button className="px-4 py-3 border-2 border-[#1b263b] text-[#1b263b] rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Candidates
  const CandidatesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1b263b] mb-2">Candidate Database</h1>
          <p className="text-gray-600">{availableCandidates} active candidates</p>
        </div>
        <button className="bg-[#778da9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1b263b] transition-colors flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Candidate
        </button>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map(candidate => (
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
              <button className="flex-1 bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold">
                View Profile
              </button>
              <button className="px-3 py-2 border-2 border-[#1b263b] text-[#1b263b] rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Clients
  const ClientsPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Client Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map(client => (
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
              <button className="flex-1 bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold">
                View Details
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                New Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Timesheets
  const TimesheetsPage = () => (
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
              {timesheets.map(timesheet => (
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
                      <button className="text-green-600 hover:underline font-semibold text-sm">Approve</button>
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
  const InvoicingPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Invoice Management</h1>

      <div className="space-y-6">
        {invoices.map(invoice => (
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
              <button className="flex-1 bg-[#1b263b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#415a77] transition-colors">
                View Full Invoice
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
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
  const ReportsPage = () => (
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
            <button className="w-full bg-[#1b263b] text-white px-4 py-2 rounded-lg hover:bg-[#415a77] transition-colors text-sm font-semibold flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Compliance
  const CompliancePage = () => (
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
              {complianceDocuments.map(doc => (
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
                    <button className="text-[#1b263b] hover:underline font-semibold text-sm">View Document</button>
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
  const ResourcesPage = () => (
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
              <button className="bg-[#1b263b] text-white px-6 py-2 rounded-lg hover:bg-[#415a77] transition-colors flex items-center gap-2">
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
  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1b263b] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#1b263b] mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b263b]"
              ></textarea>
            </div>
            <button className="w-full bg-[#778da9] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1b263b] transition-colors">
              Send Message
            </button>
          </form>
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
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
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
              <li><button className="hover:text-white">Browse Jobs</button></li>
              <li><button className="hover:text-white">Submit Resume</button></li>
              <li><button className="hover:text-white">Career Resources</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">Post a Job</button></li>
              <li><button className="hover:text-white">Find Candidates</button></li>
              <li><button className="hover:text-white">Client Portal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Contact</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#415a77] pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 Premier Staffing Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {currentPage === 'home' && <DashboardPage />}
        {currentPage === 'jobs' && <JobBoardPage />}
        {currentPage === 'candidates' && <CandidatesPage />}
        {currentPage === 'clients' && <ClientsPage />}
        {currentPage === 'timesheets' && <TimesheetsPage />}
        {currentPage === 'invoicing' && <InvoicingPage />}
        {currentPage === 'reports' && <ReportsPage />}
        {currentPage === 'compliance' && <CompliancePage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default PremierStaffingSolutions;
