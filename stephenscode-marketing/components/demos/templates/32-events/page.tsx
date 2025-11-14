'use client';

import React, { useState } from 'react';
import {
  Calendar, Users, Heart, Star, DollarSign, CheckCircle2, Clock,
  MapPin, Phone, Mail, Settings, Bell, User, LogOut, Search, Filter,
  Plus, Edit, Trash2, Eye, Download, Upload, Send, MessageSquare,
  Package, Gift, Music, Camera, Utensils, Cake, PartyPopper, Sparkles,
  FileText, BarChart3, TrendingUp, AlertCircle, ChevronRight, Target,
  Award, Shield, Clipboard, Building2, Briefcase, CreditCard, Share2,
  BookOpen, Layout, Palette, CheckSquare, UserPlus, Image, Video,
  Activity, Zap, PieChart, ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react';

// Types
interface Event {
  id: string;
  clientName: string;
  eventType: 'Wedding' | 'Corporate' | 'Birthday' | 'Anniversary' | 'Other';
  eventDate: string;
  venue: string;
  guestCount: number;
  budget: number;
  spent: number;
  status: 'Planning' | 'Confirmed' | 'In Progress' | 'Completed';
  completionPercentage: number;
  priority: 'Low' | 'Medium' | 'High';
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventCount: number;
  totalSpent: number;
  status: 'Active' | 'Past Client';
  preferredContact: 'Email' | 'Phone' | 'Text';
}

interface Vendor {
  id: string;
  name: string;
  category: 'Catering' | 'Photography' | 'Videography' | 'Florist' | 'Music/DJ' | 'Venue' | 'Decor' | 'Bakery' | 'Other';
  contactName: string;
  email: string;
  phone: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  availability: 'Available' | 'Booked' | 'Limited';
  eventsCompleted: number;
}

interface BudgetItem {
  id: string;
  category: string;
  vendor: string;
  estimatedCost: number;
  actualCost: number;
  paid: boolean;
  dueDate: string;
}

interface TimelineItem {
  id: string;
  task: string;
  dueDate: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
  category: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  rsvpStatus: 'Pending' | 'Accepted' | 'Declined' | 'Maybe';
  dietaryRestrictions: string;
  plusOne: boolean;
  table: number;
  specialNotes: string;
}

interface Contract {
  id: string;
  vendor: string;
  service: string;
  amount: number;
  depositPaid: number;
  balanceDue: number;
  signedDate: string;
  status: 'Draft' | 'Sent' | 'Signed' | 'Completed';
  documentUrl: string;
}

type UserRole = 'Planner' | 'Client';
type Page = 'home' | 'services' | 'portfolio' | 'clients' | 'vendors' | 'budget' | 'timeline' | 'guests' | 'resources' | 'contact';

const CelebrationEventsCompany = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('Planner');
  const [selectedEvent, setSelectedEvent] = useState<string>('event-1');
  const [notifications, setNotifications] = useState(15);

  // Sample Data
  const events: Event[] = [
    {
      id: 'event-1',
      clientName: 'Sarah & Michael Johnson',
      eventType: 'Wedding',
      eventDate: '2024-08-15',
      venue: 'Grand Ballroom Hotel',
      guestCount: 200,
      budget: 50000,
      spent: 35000,
      status: 'In Progress',
      completionPercentage: 75,
      priority: 'High'
    },
    {
      id: 'event-2',
      clientName: 'TechCorp Inc.',
      eventType: 'Corporate',
      eventDate: '2024-07-10',
      venue: 'Downtown Conference Center',
      guestCount: 300,
      budget: 75000,
      spent: 68000,
      status: 'Confirmed',
      completionPercentage: 90,
      priority: 'High'
    },
    {
      id: 'event-3',
      clientName: 'Emily Davis',
      eventType: 'Birthday',
      eventDate: '2024-06-25',
      venue: 'Sunset Garden Venue',
      guestCount: 50,
      budget: 15000,
      spent: 8500,
      status: 'Planning',
      completionPercentage: 45,
      priority: 'Medium'
    }
  ];

  const clients: Client[] = [
    {
      id: 'client-1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      eventCount: 1,
      totalSpent: 35000,
      status: 'Active',
      preferredContact: 'Email'
    },
    {
      id: 'client-2',
      name: 'David Wilson',
      email: 'dwilson@techcorp.com',
      phone: '(555) 234-5678',
      eventCount: 3,
      totalSpent: 180000,
      status: 'Active',
      preferredContact: 'Email'
    },
    {
      id: 'client-3',
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '(555) 345-6789',
      eventCount: 1,
      totalSpent: 8500,
      status: 'Active',
      preferredContact: 'Phone'
    }
  ];

  const vendors: Vendor[] = [
    {
      id: 'vendor-1',
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      contactName: 'Chef Antonio',
      email: 'antonio@gourmetcatering.com',
      phone: '(555) 111-2222',
      rating: 4.9,
      priceRange: '$$$',
      availability: 'Available',
      eventsCompleted: 156
    },
    {
      id: 'vendor-2',
      name: 'Perfect Moments Photography',
      category: 'Photography',
      contactName: 'Lisa Chen',
      email: 'lisa@perfectmoments.com',
      phone: '(555) 222-3333',
      rating: 4.8,
      priceRange: '$$',
      availability: 'Limited',
      eventsCompleted: 203
    },
    {
      id: 'vendor-3',
      name: 'Bloom & Petals Florist',
      category: 'Florist',
      contactName: 'Maria Garcia',
      email: 'maria@bloomandpetals.com',
      phone: '(555) 333-4444',
      rating: 4.7,
      priceRange: '$$',
      availability: 'Available',
      eventsCompleted: 289
    },
    {
      id: 'vendor-4',
      name: 'Elite DJ Services',
      category: 'Music/DJ',
      contactName: 'DJ Mike',
      email: 'mike@elitedj.com',
      phone: '(555) 444-5555',
      rating: 4.9,
      priceRange: '$$$',
      availability: 'Booked',
      eventsCompleted: 412
    },
    {
      id: 'vendor-5',
      name: 'Sweet Dreams Bakery',
      category: 'Bakery',
      contactName: 'Chef Rachel',
      email: 'rachel@sweetdreams.com',
      phone: '(555) 555-6666',
      rating: 4.8,
      priceRange: '$$',
      availability: 'Available',
      eventsCompleted: 178
    }
  ];

  const budgetItems: BudgetItem[] = [
    {
      id: 'budget-1',
      category: 'Catering',
      vendor: 'Gourmet Catering Co.',
      estimatedCost: 15000,
      actualCost: 15000,
      paid: true,
      dueDate: '2024-08-01'
    },
    {
      id: 'budget-2',
      category: 'Photography',
      vendor: 'Perfect Moments Photography',
      estimatedCost: 5000,
      actualCost: 4800,
      paid: false,
      dueDate: '2024-08-10'
    },
    {
      id: 'budget-3',
      category: 'Venue',
      vendor: 'Grand Ballroom Hotel',
      estimatedCost: 12000,
      actualCost: 12000,
      paid: true,
      dueDate: '2024-07-15'
    },
    {
      id: 'budget-4',
      category: 'Florals',
      vendor: 'Bloom & Petals Florist',
      estimatedCost: 3500,
      actualCost: 3200,
      paid: false,
      dueDate: '2024-08-14'
    },
    {
      id: 'budget-5',
      category: 'Music/DJ',
      vendor: 'Elite DJ Services',
      estimatedCost: 2500,
      actualCost: 2500,
      paid: false,
      dueDate: '2024-08-15'
    }
  ];

  const timelineItems: TimelineItem[] = [
    {
      id: 'task-1',
      task: 'Final venue walkthrough',
      dueDate: '2024-08-10',
      assignedTo: 'Sarah Martinez',
      priority: 'High',
      status: 'In Progress',
      category: 'Venue'
    },
    {
      id: 'task-2',
      task: 'Confirm final headcount with caterer',
      dueDate: '2024-08-08',
      assignedTo: 'Sarah Martinez',
      priority: 'High',
      status: 'Not Started',
      category: 'Catering'
    },
    {
      id: 'task-3',
      task: 'Review photography timeline',
      dueDate: '2024-08-05',
      assignedTo: 'Client',
      priority: 'Medium',
      status: 'Completed',
      category: 'Photography'
    },
    {
      id: 'task-4',
      task: 'Finalize seating chart',
      dueDate: '2024-08-12',
      assignedTo: 'Client',
      priority: 'High',
      status: 'In Progress',
      category: 'Planning'
    }
  ];

  const guests: Guest[] = [
    {
      id: 'guest-1',
      name: 'Jennifer Smith',
      email: 'jennifer.s@email.com',
      phone: '(555) 111-1111',
      rsvpStatus: 'Accepted',
      dietaryRestrictions: 'Vegetarian',
      plusOne: true,
      table: 5,
      specialNotes: ''
    },
    {
      id: 'guest-2',
      name: 'Robert Johnson',
      email: 'robert.j@email.com',
      phone: '(555) 222-2222',
      rsvpStatus: 'Accepted',
      dietaryRestrictions: 'None',
      plusOne: false,
      table: 8,
      specialNotes: ''
    },
    {
      id: 'guest-3',
      name: 'Amanda Lee',
      email: 'amanda.l@email.com',
      phone: '(555) 333-3333',
      rsvpStatus: 'Pending',
      dietaryRestrictions: 'Gluten-free',
      plusOne: true,
      table: 3,
      specialNotes: 'Wheelchair accessible seating needed'
    }
  ];

  const contracts: Contract[] = [
    {
      id: 'contract-1',
      vendor: 'Gourmet Catering Co.',
      service: 'Full Catering Service',
      amount: 15000,
      depositPaid: 7500,
      balanceDue: 7500,
      signedDate: '2024-05-15',
      status: 'Signed',
      documentUrl: 'contract_gourmet_catering.pdf'
    },
    {
      id: 'contract-2',
      vendor: 'Perfect Moments Photography',
      service: '10-Hour Coverage',
      amount: 4800,
      depositPaid: 2400,
      balanceDue: 2400,
      signedDate: '2024-05-20',
      status: 'Signed',
      documentUrl: 'contract_photography.pdf'
    }
  ];

  // Stats
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status !== 'Completed').length;
  const totalRevenue = events.reduce((sum, e) => sum + e.spent, 0);
  const upcomingTasks = timelineItems.filter(t => t.status !== 'Completed').length;

  // Navigation
  const Navigation = () => (
    <nav className="bg-[#d62828] text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <PartyPopper className="w-8 h-8 text-[#fcbf49]" />
            <div>
              <h1 className="text-2xl font-bold">Celebration Events Co.</h1>
              <p className="text-xs text-[#fcbf49]">Creating Unforgettable Moments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#f77f00] px-3 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-semibold">{userRole}</p>
              </div>
            </div>
            <button className="relative hover:text-[#fcbf49] transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#d62828] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>
            <button className="hover:text-[#fcbf49] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="hover:text-[#fcbf49] transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { page: 'home' as Page, label: 'Dashboard', icon: BarChart3 },
            { page: 'services' as Page, label: 'Services', icon: Gift },
            { page: 'portfolio' as Page, label: 'Portfolio', icon: Image },
            { page: 'clients' as Page, label: 'Client Portal', icon: Users },
            { page: 'vendors' as Page, label: 'Vendors', icon: Briefcase },
            { page: 'budget' as Page, label: 'Budget', icon: DollarSign },
            { page: 'timeline' as Page, label: 'Timeline', icon: Calendar },
            { page: 'guests' as Page, label: 'Guest List', icon: UserPlus },
            { page: 'resources' as Page, label: 'Resources', icon: FileText },
            { page: 'contact' as Page, label: 'Contact', icon: Phone }
          ].map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                currentPage === page ? 'bg-[#fcbf49] text-[#d62828] font-semibold' : 'bg-[#f77f00] hover:bg-[#fcbf49] hover:text-[#d62828]'
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
        <h1 className="text-4xl font-bold text-[#d62828] mb-2">Event Planning Dashboard</h1>
        <p className="text-gray-600">Manage all your events and vendors in one place</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#d62828]">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-[#d62828]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Events</h3>
          <p className="text-3xl font-bold text-[#d62828]">{activeEvents}</p>
          <p className="text-sm text-green-600 mt-2">+{totalEvents - activeEvents} completed</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#f77f00]">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#f77f00]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Clients</h3>
          <p className="text-3xl font-bold text-[#d62828]">{clients.length}</p>
          <p className="text-sm text-gray-600 mt-2">{clients.filter(c => c.status === 'Active').length} active</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-[#d62828]">${(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+18% vs last quarter</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-orange-500" />
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Pending Tasks</h3>
          <p className="text-3xl font-bold text-[#d62828]">{upcomingTasks}</p>
          <p className="text-sm text-gray-600 mt-2">Due this week</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#d62828] mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#f77f00]" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()).map(event => (
              <div key={event.id} className="border-l-4 border-[#d62828] bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{event.clientName}</h3>
                    <p className="text-sm text-gray-600">{event.eventType} • {event.venue}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.priority === 'High' ? 'bg-red-500 text-white' :
                    event.priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {event.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.guestCount} guests
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{event.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#d62828] h-2 rounded-full"
                      style={{ width: `${event.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Budget: ${event.budget.toLocaleString()}</span>
                  <span className="font-semibold text-green-600">Spent: ${event.spent.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#d62828] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#f77f00]" />
            Recent Tasks Completed
          </h2>
          <div className="space-y-3">
            {[
              { task: 'Finalized menu with caterer', date: '2024-05-20', client: 'Sarah & Michael' },
              { task: 'Booked photography package', date: '2024-05-19', client: 'TechCorp Inc.' },
              { task: 'Confirmed venue decorations', date: '2024-05-18', client: 'Emily Davis' },
              { task: 'Sent invitations to guests', date: '2024-05-17', client: 'Sarah & Michael' }
            ].map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">{task.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(task.date).toLocaleDateString()}</p>
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
            <h3 className="font-bold text-lg text-[#d62828]">Client Satisfaction</h3>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d62828] mb-2">4.9</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on 87 reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#d62828]">Event Success Rate</h3>
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">98%</p>
            <p className="text-sm text-gray-600 mb-3">Events executed flawlessly</p>
            <p className="text-2xl font-semibold text-[#d62828]">156</p>
            <p className="text-sm text-gray-600">Total events managed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#d62828]">Trusted Vendors</h3>
            <Briefcase className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d62828] mb-2">{vendors.length}</p>
            <p className="text-sm text-gray-600 mb-3">Professional partners</p>
            <p className="text-sm text-green-600 font-semibold">All verified & insured</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page: Services
  const ServicesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Wedding Planning',
            icon: Heart,
            desc: 'Full-service wedding coordination from engagement to honeymoon',
            features: ['Venue selection', 'Vendor management', 'Timeline creation', 'Day-of coordination'],
            price: 'From $5,000'
          },
          {
            title: 'Corporate Events',
            icon: Building2,
            desc: 'Professional event planning for conferences, galas, and meetings',
            features: ['Conference planning', 'Team building', 'Product launches', 'Award ceremonies'],
            price: 'From $3,000'
          },
          {
            title: 'Birthday Parties',
            icon: Cake,
            desc: 'Memorable birthday celebrations for all ages',
            features: ['Theme development', 'Entertainment booking', 'Catering coordination', 'Decor design'],
            price: 'From $1,500'
          },
          {
            title: 'Anniversary Events',
            icon: Star,
            desc: 'Celebrate milestones with elegantly planned anniversary parties',
            features: ['Intimate gatherings', 'Large celebrations', 'Renewal ceremonies', 'Photo booths'],
            price: 'From $2,000'
          },
          {
            title: 'Social Events',
            icon: Users,
            desc: 'Custom planning for any social gathering or celebration',
            features: ['Holiday parties', 'Retirement events', 'Graduations', 'Reunions'],
            price: 'From $1,000'
          },
          {
            title: 'Day-of Coordination',
            icon: Clock,
            desc: 'Professional coordination on your special day',
            features: ['Timeline management', 'Vendor coordination', 'Problem solving', 'Guest assistance'],
            price: 'From $800'
          }
        ].map(service => (
          <div key={service.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center mb-4">
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-xl text-[#d62828] mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map(feature => (
                <li key={feature} className="text-sm text-gray-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="border-t pt-4">
              <p className="text-2xl font-bold text-[#d62828] mb-4">{service.price}</p>
              <button className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Portfolio
  const PortfolioPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Event Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Elegant Garden Wedding', type: 'Wedding', guests: 150, image: 'wedding-1' },
          { title: 'Tech Conference 2024', type: 'Corporate', guests: 500, image: 'corporate-1' },
          { title: 'Sweet 16 Celebration', type: 'Birthday', guests: 80, image: 'birthday-1' },
          { title: 'Golden Anniversary', type: 'Anniversary', guests: 100, image: 'anniversary-1' },
          { title: 'Beachside Wedding', type: 'Wedding', guests: 200, image: 'wedding-2' },
          { title: 'Product Launch Event', type: 'Corporate', guests: 250, image: 'corporate-2' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 bg-gradient-to-br from-[#d62828] to-[#f77f00] flex items-center justify-center">
              <Camera className="w-24 h-24 text-white opacity-50" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-[#d62828] mb-2">{item.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Gift className="w-4 h-4" />
                  {item.type}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {item.guests} guests
                </span>
              </div>
              <button className="w-full bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Client Portal
  const ClientPortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Client Portal</h1>

      {userRole === 'Client' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#d62828] mb-4">My Event Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Event Type</p>
                  <p className="font-semibold">Wedding</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Event Date</p>
                  <p className="font-semibold">August 15, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Venue</p>
                  <p className="font-semibold">Grand Ballroom Hotel</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guest Count</p>
                  <p className="font-semibold">200 guests</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Planning Progress</h3>
                  <span className="text-sm font-semibold text-[#d62828]">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#d62828] h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-green-600">$50,000</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Spent So Far</p>
                  <p className="text-2xl font-bold text-blue-600">$35,000</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#d62828] mb-4">Upcoming Tasks</h2>
              <div className="space-y-3">
                {timelineItems.filter(t => t.assignedTo === 'Client' && t.status !== 'Completed').map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                    <button className="px-4 py-2 bg-[#d62828] text-white rounded-lg hover:bg-[#f77f00] transition-colors text-sm font-semibold">
                      Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#d62828] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-[#d62828] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message Planner
                </button>
                <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  View Documents
                </button>
                <button className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Make Payment
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#d62828] mb-4">Your Planner</h2>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#d62828] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-lg">Sarah Martinez</h3>
                <p className="text-sm text-gray-600 mb-4">Senior Event Planner</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center justify-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    (555) 123-4567
                  </p>
                  <p className="flex items-center justify-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    sarah@celebrations.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#d62828] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#d62828]">{client.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Events</p>
                  <p className="text-lg font-bold text-blue-600">{client.eventCount}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Total Spent</p>
                  <p className="text-lg font-bold text-green-600">${(client.totalSpent / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <button className="w-full bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Page: Vendor Directory
  const VendorDirectoryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#d62828] mb-2">Vendor Directory</h1>
          <p className="text-gray-600">{vendors.length} trusted partners</p>
        </div>
        <button className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]">
            <option>All Categories</option>
            <option>Catering</option>
            <option>Photography</option>
            <option>Florist</option>
            <option>Music/DJ</option>
            <option>Venue</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]">
            <option>All Price Ranges</option>
            <option>$ Budget-Friendly</option>
            <option>$$ Moderate</option>
            <option>$$$ Premium</option>
            <option>$$$$ Luxury</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]">
            <option>All Availability</option>
            <option>Available</option>
            <option>Limited</option>
            <option>Booked</option>
          </select>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#d62828] mb-1">{vendor.name}</h3>
                <p className="text-sm text-gray-600">{vendor.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{vendor.rating}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                {vendor.contactName}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                {vendor.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                {vendor.phone}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-600">Price Range</p>
                <p className="font-bold text-[#d62828]">{vendor.priceRange}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Events Completed</p>
                <p className="font-bold text-[#d62828]">{vendor.eventsCompleted}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                vendor.availability === 'Available' ? 'bg-green-100 text-green-700' :
                vendor.availability === 'Limited' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {vendor.availability}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#d62828] text-white px-4 py-2 rounded-lg hover:bg-[#f77f00] transition-colors text-sm font-semibold">
                View Profile
              </button>
              <button className="px-3 py-2 border-2 border-[#d62828] text-[#d62828] rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Budget Tracker
  const BudgetTrackerPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Budget Tracker</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Budget', amount: 50000, color: 'blue' },
          { label: 'Estimated Total', amount: budgetItems.reduce((sum, i) => sum + i.estimatedCost, 0), color: 'purple' },
          { label: 'Actual Spent', amount: budgetItems.reduce((sum, i) => sum + i.actualCost, 0), color: 'green' },
          { label: 'Balance Remaining', amount: 50000 - budgetItems.reduce((sum, i) => sum + i.actualCost, 0), color: 'orange' }
        ].map(stat => (
          <div key={stat.label} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${stat.color}-500`}>
            <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-[#d62828]">${stat.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Budget Items Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#d62828] mb-6">Budget Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Estimated</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.vendor}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${item.estimatedCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">${item.actualCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(item.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Page: Timeline Builder
  const TimelineBuilderPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Event Timeline</h1>

      <div className="space-y-4">
        {timelineItems.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map(task => (
          <div key={task.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
            task.priority === 'High' ? 'border-red-500' :
            task.priority === 'Medium' ? 'border-yellow-500' : 'border-blue-500'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{task.task}</h3>
                <p className="text-sm text-gray-600">{task.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {task.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Assigned To</p>
                <p className="font-semibold">{task.assignedTo}</p>
              </div>
              <div>
                <p className="text-gray-600">Priority</p>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  task.priority === 'High' ? 'bg-red-100 text-red-700' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>

            {task.status !== 'Completed' && (
              <button className="bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors text-sm">
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Guest Management
  const GuestManagementPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#d62828] mb-2">Guest Management</h1>
          <p className="text-gray-600">{guests.length} guests • {guests.filter(g => g.rsvpStatus === 'Accepted').length} confirmed</p>
        </div>
        <button className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Guest
        </button>
      </div>

      {/* RSVP Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { status: 'Accepted', count: guests.filter(g => g.rsvpStatus === 'Accepted').length, color: 'green' },
          { status: 'Pending', count: guests.filter(g => g.rsvpStatus === 'Pending').length, color: 'yellow' },
          { status: 'Declined', count: guests.filter(g => g.rsvpStatus === 'Declined').length, color: 'red' },
          { status: 'Maybe', count: guests.filter(g => g.rsvpStatus === 'Maybe').length, color: 'blue' }
        ].map(stat => (
          <div key={stat.status} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${stat.color}-500`}>
            <p className="text-gray-600 text-sm font-semibold mb-1">{stat.status}</p>
            <p className="text-3xl font-bold text-[#d62828]">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">RSVP Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Dietary</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Table</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">+1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guests.map(guest => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{guest.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <p>{guest.email}</p>
                    <p className="text-xs text-gray-500">{guest.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guest.rsvpStatus === 'Accepted' ? 'bg-green-100 text-green-700' :
                      guest.rsvpStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      guest.rsvpStatus === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {guest.rsvpStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{guest.dietaryRestrictions}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Table {guest.table}</td>
                  <td className="px-6 py-4">
                    {guest.plusOne ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <span className="text-gray-400">-</span>
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

  // Page: Resources
  const ResourcesPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Event Resources</h1>

      <div className="space-y-6">
        {[
          { title: 'Planning Checklist', desc: 'Complete guide to event planning', icon: CheckSquare },
          { title: 'Vendor Contracts', desc: 'All signed vendor agreements', icon: FileText },
          { title: 'Budget Templates', desc: 'Spreadsheets and calculators', icon: DollarSign },
          { title: 'Design Inspiration', desc: 'Mood boards and color palettes', icon: Palette },
          { title: 'Timeline Templates', desc: 'Sample event timelines', icon: Calendar },
          { title: 'Seating Chart Tool', desc: 'Interactive seating planner', icon: Users }
        ].map(resource => (
          <div key={resource.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                <resource.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#d62828]">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.desc}</p>
              </div>
              <button className="bg-[#d62828] text-white px-6 py-2 rounded-lg hover:bg-[#f77f00] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Access
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
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#d62828] mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]">
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Birthday Party</option>
                <option>Anniversary</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              ></textarea>
            </div>
            <button className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#f77f00] transition-colors">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#d62828] mb-6">Office Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f77f00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">789 Celebration Avenue<br />Suite 300<br />City, ST 67890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#f77f00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 345-6789</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#f77f00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@celebrationevents.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#d62828] text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: By Appointment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#d62828] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PartyPopper className="w-8 h-8 text-[#fcbf49]" />
              <span className="text-xl font-bold">Celebration Events Co.</span>
            </div>
            <p className="text-gray-200 text-sm">
              Creating unforgettable moments and extraordinary events since 2010.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><button className="hover:text-white">Weddings</button></li>
              <li><button className="hover:text-white">Corporate Events</button></li>
              <li><button className="hover:text-white">Birthday Parties</button></li>
              <li><button className="hover:text-white">Day-of Coordination</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><button className="hover:text-white">Planning Tools</button></li>
              <li><button className="hover:text-white">Vendor Directory</button></li>
              <li><button className="hover:text-white">Budget Calculator</button></li>
              <li><button className="hover:text-white">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><button className="hover:text-white">About Us</button></li>
              <li><button className="hover:text-white">Portfolio</button></li>
              <li><button className="hover:text-white">Contact</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#f77f00] pt-8 text-center text-gray-200 text-sm">
          <p>&copy; 2024 Celebration Events Co. All rights reserved. Making your dreams come true, one event at a time.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {currentPage === 'home' && <DashboardPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'portfolio' && <PortfolioPage />}
        {currentPage === 'clients' && <ClientPortalPage />}
        {currentPage === 'vendors' && <VendorDirectoryPage />}
        {currentPage === 'budget' && <BudgetTrackerPage />}
        {currentPage === 'timeline' && <TimelineBuilderPage />}
        {currentPage === 'guests' && <GuestManagementPage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default CelebrationEventsCompany;
