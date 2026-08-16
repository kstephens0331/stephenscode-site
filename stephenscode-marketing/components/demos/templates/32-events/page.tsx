'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar, Users, Heart, Star, DollarSign, CheckCircle2, Clock,
  MapPin, Phone, Mail, Settings, Bell, User, LogOut,
  Plus, Download, Send, MessageSquare,
  Gift, Camera, Cake, PartyPopper,
  FileText, BarChart3, TrendingUp, Target,
  Building2, Briefcase, CreditCard,
  CheckSquare, UserPlus, Image, Palette,
  Activity, Zap, ArrowUpRight, X,
  Search, Trash2, Save, RotateCcw, Eye
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';

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

type VendorCategory = 'Catering' | 'Photography' | 'Videography' | 'Florist' | 'Music/DJ' | 'Venue' | 'Decor' | 'Bakery' | 'Other';
type VendorPriceRange = '$' | '$$' | '$$$' | '$$$$';
type VendorAvailability = 'Available' | 'Booked' | 'Limited';

interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  contactName: string;
  email: string;
  phone: string;
  rating: number;
  priceRange: VendorPriceRange;
  availability: VendorAvailability;
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

type RsvpStatus = 'Pending' | 'Accepted' | 'Declined' | 'Maybe';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  rsvpStatus: RsvpStatus;
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

interface ServiceOffering {
  title: string;
  icon: LucideIcon;
  desc: string;
  features: string[];
  price: string;
  inquiryType: string;
}

interface PortfolioItem {
  title: string;
  type: string;
  guests: number;
  inquiryType: string;
  highlights: string[];
}

interface ResourceItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  fileLines: string[];
}

interface SentMessage {
  to: string;
  body: string;
  sentAt: string;
}

type UserRole = 'Planner' | 'Client';
type Page = 'home' | 'services' | 'portfolio' | 'clients' | 'vendors' | 'budget' | 'timeline' | 'guests' | 'resources' | 'contact';

const STORAGE_KEY = 'demo_celebration_events_v1';

// Sample Data (mock -- demo only)
const initialEvents: Event[] = [
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

const initialClients: Client[] = [
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

const clientEventMap: Record<string, string> = {
  'client-1': 'event-1',
  'client-2': 'event-2',
  'client-3': 'event-3'
};

const initialVendors: Vendor[] = [
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

const initialBudgetItems: BudgetItem[] = [
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

const initialTimelineItems: TimelineItem[] = [
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

const initialGuests: Guest[] = [
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

const serviceOfferings: ServiceOffering[] = [
  {
    title: 'Wedding Planning',
    icon: Heart,
    desc: 'Full-service wedding coordination from engagement to honeymoon',
    features: ['Venue selection', 'Vendor management', 'Timeline creation', 'Day-of coordination'],
    price: 'From $5,000',
    inquiryType: 'Wedding'
  },
  {
    title: 'Corporate Events',
    icon: Building2,
    desc: 'Professional event planning for conferences, galas, and meetings',
    features: ['Conference planning', 'Team building', 'Product launches', 'Award ceremonies'],
    price: 'From $3,000',
    inquiryType: 'Corporate Event'
  },
  {
    title: 'Birthday Parties',
    icon: Cake,
    desc: 'Memorable birthday celebrations for all ages',
    features: ['Theme development', 'Entertainment booking', 'Catering coordination', 'Decor design'],
    price: 'From $1,500',
    inquiryType: 'Birthday Party'
  },
  {
    title: 'Anniversary Events',
    icon: Star,
    desc: 'Celebrate milestones with elegantly planned anniversary parties',
    features: ['Intimate gatherings', 'Large celebrations', 'Renewal ceremonies', 'Photo booths'],
    price: 'From $2,000',
    inquiryType: 'Anniversary'
  },
  {
    title: 'Social Events',
    icon: Users,
    desc: 'Custom planning for any social gathering or celebration',
    features: ['Holiday parties', 'Retirement events', 'Graduations', 'Reunions'],
    price: 'From $1,000',
    inquiryType: 'Other'
  },
  {
    title: 'Day-of Coordination',
    icon: Clock,
    desc: 'Professional coordination on your special day',
    features: ['Timeline management', 'Vendor coordination', 'Problem solving', 'Guest assistance'],
    price: 'From $800',
    inquiryType: 'Other'
  }
];

const portfolioItems: PortfolioItem[] = [
  {
    title: 'Elegant Garden Wedding',
    type: 'Wedding',
    guests: 150,
    inquiryType: 'Wedding',
    highlights: ['Outdoor ceremony with floral arch', 'String quartet during cocktail hour', 'Three-course plated dinner service']
  },
  {
    title: 'Tech Conference 2024',
    type: 'Corporate',
    guests: 500,
    inquiryType: 'Corporate Event',
    highlights: ['Two-day multi-track agenda', 'Keynote stage with full AV production', 'Catered networking reception']
  },
  {
    title: 'Sweet 16 Celebration',
    type: 'Birthday',
    guests: 80,
    inquiryType: 'Birthday Party',
    highlights: ['Custom neon theme and decor', 'Live DJ and photo booth', 'Dessert bar with custom cake']
  },
  {
    title: 'Golden Anniversary',
    type: 'Anniversary',
    guests: 100,
    inquiryType: 'Anniversary',
    highlights: ['Vow renewal ceremony', 'Family slideshow presentation', 'Champagne toast and live band']
  },
  {
    title: 'Beachside Wedding',
    type: 'Wedding',
    guests: 200,
    inquiryType: 'Wedding',
    highlights: ['Sunset ceremony on the shore', 'Tented reception with string lights', 'Late-night bonfire lounge']
  },
  {
    title: 'Product Launch Event',
    type: 'Corporate',
    guests: 250,
    inquiryType: 'Corporate Event',
    highlights: ['Branded stage and demo stations', 'Press and influencer coordination', 'Signature cocktail service']
  }
];

const resourceItems: ResourceItem[] = [
  {
    title: 'Planning Checklist',
    desc: 'Complete guide to event planning',
    icon: CheckSquare,
    fileLines: [
      '12+ months out: set budget, guest count, and shortlist venues',
      '9 months out: book venue, caterer, and photographer',
      '6 months out: send save-the-dates and book entertainment',
      '3 months out: finalize menu, decor, and timeline',
      '1 month out: confirm headcount and vendor arrival times'
    ]
  },
  {
    title: 'Vendor Contracts',
    desc: 'All signed vendor agreements',
    icon: FileText,
    fileLines: [
      'Signed agreements are stored in the client portal.',
      'Each contract lists amount, deposit paid, and balance due.',
      'Contact your planner with any contract questions.'
    ]
  },
  {
    title: 'Budget Templates',
    desc: 'Spreadsheets and calculators',
    icon: DollarSign,
    fileLines: [
      'Suggested allocation: 40% venue and catering',
      '15% photography and videography',
      '10% music and entertainment',
      '10% florals and decor',
      '25% attire, stationery, favors, and contingency'
    ]
  },
  {
    title: 'Design Inspiration',
    desc: 'Mood boards and color palettes',
    icon: Palette,
    fileLines: [
      'Classic: ivory, gold, and deep green',
      'Modern: charcoal, white, and citrus accents',
      'Romantic: blush, burgundy, and soft neutrals',
      'Festive: bold red, orange, and marigold'
    ]
  },
  {
    title: 'Timeline Templates',
    desc: 'Sample event timelines',
    icon: Calendar,
    fileLines: [
      '3:00 PM -- Vendor load-in and setup',
      '5:00 PM -- Guest arrival and cocktail hour',
      '6:00 PM -- Ceremony or main program',
      '7:00 PM -- Dinner service',
      '9:00 PM -- Dancing and entertainment',
      '11:00 PM -- Send-off and breakdown'
    ]
  },
  {
    title: 'Seating Chart Tool',
    desc: 'Interactive seating planner',
    icon: Users,
    fileLines: [
      'Start with tables of 8-10 guests.',
      'Seat guests with dietary or accessibility needs near service points.',
      'Keep a flex table for late RSVPs and plus-ones.'
    ]
  }
];

const notificationItems: { text: string; time: string; target: Page }[] = [
  { text: 'Task due soon: Confirm final headcount with caterer', time: 'Due Aug 8', target: 'timeline' },
  { text: 'Invoice pending: Perfect Moments Photography', time: 'Due Aug 10', target: 'budget' },
  { text: 'New RSVP received from Jennifer Smith', time: 'Yesterday', target: 'guests' }
];

// Mock reviews for this fictional demo company
const clientReviews = [
  {
    name: 'Sarah & Michael J.',
    event: 'Wedding, 200 guests',
    rating: 5,
    quote: 'Every detail was handled before we even thought to ask. We actually got to enjoy our own wedding.'
  },
  {
    name: 'David W., TechCorp Inc.',
    event: 'Corporate conference, 300 guests',
    rating: 5,
    quote: 'Three years running. The run-of-show is always tight and our vendors are never chasing answers.'
  },
  {
    name: 'Emily D.',
    event: 'Milestone birthday, 50 guests',
    rating: 5,
    quote: 'They kept me on budget without making it feel small. The decor came in better than the mood board.'
  },
  {
    name: 'The Alvarez Family',
    event: 'Golden anniversary, 100 guests',
    rating: 4,
    quote: 'Warm, organized, and patient with a very opinionated family. The slideshow moment landed perfectly.'
  }
];

const taskCategories = ['Planning', 'Venue', 'Catering', 'Photography', 'Florals', 'Music/DJ', 'Decor', 'Other'];
const taskAssignees = ['Sarah Martinez', 'Client', 'Vendor Team'];

interface SavedState {
  timeline?: TimelineItem[];
  guestList?: Guest[];
  vendorList?: Vendor[];
  budget?: BudgetItem[];
  sentMessages?: SentMessage[];
  readNotifications?: number[];
}

function downloadTextFile(filename: string, lines: string[], mime = 'text/plain') {
  const blob = new Blob([lines.join('\n')], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function csvCell(value: string | number | boolean) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

// Shared modal shell
function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative bg-white rounded-lg shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[85vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-lg z-10">
          <h3 className="text-xl font-bold text-[#d62828]">{title}</h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-gray-500 hover:text-[#d62828] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Message composer modal (planner or vendor)
function MessageModal({ recipient, onSend, onClose }: { recipient: string; onSend: (body: string) => void; onClose: () => void }) {
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Modal title={`Message ${recipient}`} onClose={onClose}>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent</h4>
          <p className="text-gray-600 mb-6">Your message to {recipient} has been saved in this demo session.</p>
          <button
            onClick={onClose}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend(body);
            setSent(true);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="events-message-body" className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
            <textarea
              id="events-message-body"
              rows={5}
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Write a message to ${recipient}...`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      )}
    </Modal>
  );
}

// Add guest modal
function AddGuestModal({ onAdd, onClose }: { onAdd: (guest: Guest) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    rsvpStatus: 'Pending' as RsvpStatus,
    dietaryRestrictions: '',
    plusOne: false,
    table: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `guest-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      rsvpStatus: form.rsvpStatus,
      dietaryRestrictions: form.dietaryRestrictions || 'None',
      plusOne: form.plusOne,
      table: Math.max(1, parseInt(form.table, 10) || 1),
      specialNotes: ''
    });
  };

  return (
    <Modal title="Add Guest" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="events-guest-name" className="block text-sm font-semibold text-gray-700 mb-2">Guest Name *</label>
          <input
            id="events-guest-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            placeholder="Full name"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-guest-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="events-guest-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              placeholder="guest@email.com"
            />
          </div>
          <div>
            <label htmlFor="events-guest-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              id="events-guest-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-guest-rsvp" className="block text-sm font-semibold text-gray-700 mb-2">RSVP Status</label>
            <select
              id="events-guest-rsvp"
              value={form.rsvpStatus}
              onChange={(e) => setForm({ ...form, rsvpStatus: e.target.value as RsvpStatus })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>
          <div>
            <label htmlFor="events-guest-table" className="block text-sm font-semibold text-gray-700 mb-2">Table Number</label>
            <input
              id="events-guest-table"
              type="number"
              min={1}
              value={form.table}
              onChange={(e) => setForm({ ...form, table: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="events-guest-dietary" className="block text-sm font-semibold text-gray-700 mb-2">Dietary Restrictions</label>
          <input
            id="events-guest-dietary"
            type="text"
            value={form.dietaryRestrictions}
            onChange={(e) => setForm({ ...form, dietaryRestrictions: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            placeholder="None"
          />
        </div>
        <label htmlFor="events-rsvp-plus-one" className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <input
            id="events-rsvp-plus-one"
            type="checkbox"
            checked={form.plusOne}
            onChange={(e) => setForm({ ...form, plusOne: e.target.checked })}
            className="w-4 h-4 accent-[#d62828]"
          />
          Bringing a plus-one
        </label>
        <button
          type="submit"
          className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Guest
        </button>
      </form>
    </Modal>
  );
}

// Add vendor modal
function AddVendorModal({ onAdd, onClose }: { onAdd: (vendor: Vendor) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Catering' as VendorCategory,
    contactName: '',
    email: '',
    phone: '',
    priceRange: '$$' as VendorPriceRange
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `vendor-${Date.now()}`,
      name: form.name,
      category: form.category,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone,
      rating: 0,
      priceRange: form.priceRange,
      availability: 'Available',
      eventsCompleted: 0
    });
  };

  return (
    <Modal title="Add Vendor" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="events-vendor-name" className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
          <input
            id="events-vendor-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            placeholder="Vendor business name"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-vendor-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="events-vendor-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as VendorCategory })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              {['Catering', 'Photography', 'Videography', 'Florist', 'Music/DJ', 'Venue', 'Decor', 'Bakery', 'Other'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="events-vendor-price" className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <select
              id="events-vendor-price"
              value={form.priceRange}
              onChange={(e) => setForm({ ...form, priceRange: e.target.value as VendorPriceRange })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              <option value="$">$ Budget-Friendly</option>
              <option value="$$">$$ Moderate</option>
              <option value="$$$">$$$ Premium</option>
              <option value="$$$$">$$$$ Luxury</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="events-vendor-contact" className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
          <input
            id="events-vendor-contact"
            type="text"
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            placeholder="Contact name"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-vendor-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="events-vendor-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              placeholder="vendor@email.com"
            />
          </div>
          <div>
            <label htmlFor="events-vendor-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              id="events-vendor-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </form>
    </Modal>
  );
}

// Add timeline task modal
function AddTaskModal({ onAdd, onClose }: { onAdd: (task: TimelineItem) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    task: '',
    dueDate: '',
    assignedTo: taskAssignees[0],
    priority: 'Medium' as TimelineItem['priority'],
    category: taskCategories[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `task-${Date.now()}`,
      task: form.task,
      dueDate: form.dueDate || new Date().toISOString().slice(0, 10),
      assignedTo: form.assignedTo,
      priority: form.priority,
      status: 'Not Started',
      category: form.category
    });
  };

  return (
    <Modal title="Add Task" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="events-task-name" className="block text-sm font-semibold text-gray-700 mb-2">Task *</label>
          <input
            id="events-task-name"
            type="text"
            required
            value={form.task}
            onChange={(e) => setForm({ ...form, task: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            placeholder="What needs to happen?"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-task-due" className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
            <input
              id="events-task-due"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
          <div>
            <label htmlFor="events-task-priority" className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
            <select
              id="events-task-priority"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as TimelineItem['priority'] })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-task-owner" className="block text-sm font-semibold text-gray-700 mb-2">Assigned To</label>
            <select
              id="events-task-owner"
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              {taskAssignees.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="events-task-category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              id="events-task-category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              {taskCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </form>
    </Modal>
  );
}

// Guest detail / edit / remove modal
function GuestDetailModal({
  guest,
  onSave,
  onDelete,
  onClose
}: {
  guest: Guest;
  onSave: (guest: Guest) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Guest>(guest);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Modal title={guest.name} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...form, table: Math.max(1, Number(form.table) || 1) });
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="events-edit-guest-name" className="block text-sm font-semibold text-gray-700 mb-2">Guest Name *</label>
          <input
            id="events-edit-guest-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-edit-guest-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="events-edit-guest-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
          <div>
            <label htmlFor="events-edit-guest-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              id="events-edit-guest-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="events-edit-guest-rsvp" className="block text-sm font-semibold text-gray-700 mb-2">RSVP Status</label>
            <select
              id="events-edit-guest-rsvp"
              value={form.rsvpStatus}
              onChange={(e) => setForm({ ...form, rsvpStatus: e.target.value as RsvpStatus })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>
          <div>
            <label htmlFor="events-edit-guest-table" className="block text-sm font-semibold text-gray-700 mb-2">Table Number</label>
            <input
              id="events-edit-guest-table"
              type="number"
              min={1}
              value={form.table}
              onChange={(e) => setForm({ ...form, table: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="events-edit-guest-dietary" className="block text-sm font-semibold text-gray-700 mb-2">Dietary Restrictions</label>
          <input
            id="events-edit-guest-dietary"
            type="text"
            value={form.dietaryRestrictions}
            onChange={(e) => setForm({ ...form, dietaryRestrictions: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
        <div>
          <label htmlFor="events-edit-guest-notes" className="block text-sm font-semibold text-gray-700 mb-2">Special Notes</label>
          <textarea
            id="events-edit-guest-notes"
            rows={3}
            value={form.specialNotes}
            onChange={(e) => setForm({ ...form, specialNotes: e.target.value })}
            placeholder="Seating, accessibility, or service notes"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
        <label htmlFor="events-edit-guest-plus-one" className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <input
            id="events-edit-guest-plus-one"
            type="checkbox"
            checked={form.plusOne}
            onChange={(e) => setForm({ ...form, plusOne: e.target.checked })}
            className="w-4 h-4 accent-[#d62828]"
          />
          Bringing a plus-one
        </label>
        <button
          type="submit"
          className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </form>

      <div className="border-t mt-6 pt-4">
        {confirmDelete ? (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onDelete(guest.id)}
              className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Yes, remove {guest.name}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Keep Guest
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full border-2 border-red-500 text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Remove from Guest List
          </button>
        )}
      </div>
    </Modal>
  );
}

// Budget line item detail / edit modal
function BudgetItemModal({
  item,
  onSave,
  onClose
}: {
  item: BudgetItem;
  onSave: (item: BudgetItem) => void;
  onClose: () => void;
}) {
  const [actualCost, setActualCost] = useState(String(item.actualCost));
  const [dueDate, setDueDate] = useState(item.dueDate);
  const variance = item.estimatedCost - (Number(actualCost) || 0);

  return (
    <Modal title={`${item.category} -- ${item.vendor}`} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Estimated</p>
          <p className="text-xl font-bold text-purple-700">${item.estimatedCost.toLocaleString()}</p>
        </div>
        <div className={`p-4 rounded-lg ${variance >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="text-xs text-gray-600 mb-1">{variance >= 0 ? 'Under Estimate' : 'Over Estimate'}</p>
          <p className={`text-xl font-bold ${variance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ${Math.abs(variance).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="events-budget-actual" className="block text-sm font-semibold text-gray-700 mb-2">Actual Cost</label>
          <input
            id="events-budget-actual"
            type="number"
            min={0}
            value={actualCost}
            onChange={(e) => setActualCost(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
        <div>
          <label htmlFor="events-budget-due" className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
          <input
            id="events-budget-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSave({ ...item, actualCost: Math.max(0, Number(actualCost) || 0), dueDate })}
          className="flex-1 bg-[#d62828] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Line Item
        </button>
        <button
          onClick={() => onSave({ ...item, actualCost: Math.max(0, Number(actualCost) || 0), dueDate, paid: !item.paid })}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            item.paid
              ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {item.paid ? <RotateCcw className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {item.paid ? 'Mark Unpaid' : 'Mark as Paid'}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center mt-3">Demo ledger only -- no real invoice is updated.</p>
    </Modal>
  );
}

// Simulated payment modal -- never a real charge
function PaymentModal({ unpaidItems, onConfirm, onClose }: { unpaidItems: BudgetItem[]; onConfirm: () => void; onClose: () => void }) {
  const [paid, setPaid] = useState(false);
  const totalDue = unpaidItems.reduce((sum, i) => sum + i.actualCost, 0);

  return (
    <Modal title="Make Payment" onClose={onClose}>
      {paid ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Payment Recorded</h4>
          <p className="text-gray-600 mb-2">${totalDue.toLocaleString()} has been marked as paid across your open invoices.</p>
          <p className="text-sm text-gray-500 mb-6">Demo confirmation only -- no real payment was processed.</p>
          <button
            onClick={onClose}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Done
          </button>
        </div>
      ) : unpaidItems.length === 0 ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">All Paid Up</h4>
          <p className="text-gray-600 mb-6">There are no open invoices on your account right now.</p>
          <button
            onClick={onClose}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">Open invoices on your account:</p>
          <div className="space-y-3 mb-6">
            {unpaidItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.category}</p>
                  <p className="text-sm text-gray-600">{item.vendor} -- due {new Date(item.dueDate).toLocaleDateString()}</p>
                </div>
                <p className="font-bold text-[#d62828]">${item.actualCost.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg mb-6">
            <span className="font-semibold text-gray-900">Total Due</span>
            <span className="text-2xl font-bold text-[#d62828]">${totalDue.toLocaleString()}</span>
          </div>
          <button
            onClick={() => {
              setPaid(true);
              onConfirm();
            }}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Pay ${totalDue.toLocaleString()} (Demo)
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">This is a demo. No card is required and no real charge occurs.</p>
        </div>
      )}
    </Modal>
  );
}

// Real lead-capture form -- posts to /api/demo-lead
function EventsContactForm({ initialEventType }: { initialEventType: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: initialEventType,
    eventDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Celebration Events Co.',
          demoPackage: 'Custom Business Platform ($5,000)',
          demoSlug: 'celebration-events-company',
          clientName: formData.name,
          clientPhone: formData.phone,
          clientEmail: formData.email,
          service: formData.eventType,
          preferredDate: formData.eventDate,
          preferredTime: '',
          notes: formData.message
        })
      });

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_contact_form', demo_slug: 'celebration-events-company' });
        trackConversion('leadForm');
        setSubmitted(true);
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#d62828] mb-2">Inquiry Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. A planner will follow up with you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', eventType: initialEventType, eventDate: '', message: '' });
          }}
          className="text-[#d62828] font-semibold hover:text-[#f77f00] transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="events-contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
        <input
          id="events-contact-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
        />
      </div>
      <div>
        <label htmlFor="events-contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
        <input
          id="events-contact-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
        />
      </div>
      <div>
        <label htmlFor="events-contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
        <input
          id="events-contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 000-0000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="events-contact-event-type" className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
          <select
            id="events-contact-event-type"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          >
            <option value="">Select event type...</option>
            <option>Wedding</option>
            <option>Corporate Event</option>
            <option>Birthday Party</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="events-contact-date" className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
          <input
            id="events-contact-date"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="events-contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
        <textarea
          id="events-contact-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your event..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  );
}

const CelebrationEventsCompany = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>('Planner');
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Working demo state (persisted to localStorage)
  const [timeline, setTimeline] = useState<TimelineItem[]>(initialTimelineItems);
  const [guestList, setGuestList] = useState<Guest[]>(initialGuests);
  const [vendorList, setVendorList] = useState<Vendor[]>(initialVendors);
  const [budget, setBudget] = useState<BudgetItem[]>(initialBudgetItems);
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Modal state
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | null>(null);
  const [selectedPortfolioIdx, setSelectedPortfolioIdx] = useState<number | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [messageRecipient, setMessageRecipient] = useState<string | null>(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [selectedResourceTitle, setSelectedResourceTitle] = useState<string | null>(null);

  // Contact form prefill (set from service/portfolio quote buttons)
  const [contactEventType, setContactEventType] = useState('');

  // Vendor directory filters
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [vendorSearch, setVendorSearch] = useState('');

  // Dashboard, timeline, and guest filters
  const [dashboardType, setDashboardType] = useState<'All' | Event['eventType']>('All');
  const [taskStatusFilter, setTaskStatusFilter] = useState<'All' | TimelineItem['status']>('All');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<'All' | TimelineItem['priority']>('All');
  const [rsvpFilter, setRsvpFilter] = useState<'All' | RsvpStatus>('All');
  const [guestSearch, setGuestSearch] = useState('');

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  // Hydrate saved demo state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        if (saved.timeline) setTimeline(saved.timeline);
        if (saved.guestList) setGuestList(saved.guestList);
        if (saved.vendorList) setVendorList(saved.vendorList);
        if (saved.budget) setBudget(saved.budget);
        if (saved.sentMessages) setSentMessages(saved.sentMessages);
        if (saved.readNotifications) setReadNotifications(saved.readNotifications);
      }
    } catch {
      // Corrupt saved state -- fall back to the initial mock data
    }
    setHydrated(true);
  }, []);

  // Persist demo state
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ timeline, guestList, vendorList, budget, sentMessages, readNotifications })
      );
    } catch {
      // Storage unavailable -- demo still works in memory
    }
  }, [hydrated, timeline, guestList, vendorList, budget, sentMessages, readNotifications]);

  const events = initialEvents;
  const clients = initialClients;

  // Stats
  const totalEvents = events.length;
  const activeEvents = events.filter(e => e.status !== 'Completed').length;
  const totalRevenue = events.reduce((sum, e) => sum + e.spent, 0);
  const upcomingTasks = timeline.filter(t => t.status !== 'Completed').length;
  const unpaidBudgetItems = budget.filter(i => !i.paid);
  const unreadNotifications = notificationItems.filter((_, idx) => !readNotifications.includes(idx)).length;

  // Handlers
  const goTo = (page: Page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeTask = (id: string) => {
    setTimeline(prev => prev.map(t => (t.id === id ? { ...t, status: 'Completed' } : t)));
    showToast('Task marked complete');
  };

  const setTaskStatus = (id: string, status: TimelineItem['status']) => {
    setTimeline(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
    showToast(`Task moved to ${status}`);
  };

  const addTask = (task: TimelineItem) => {
    setTimeline(prev => [...prev, task]);
    setShowAddTask(false);
    showToast(`"${task.task}" added to the timeline`);
  };

  const deleteTask = (id: string) => {
    const removed = timeline.find(t => t.id === id);
    setTimeline(prev => prev.filter(t => t.id !== id));
    showToast(removed ? `"${removed.task}" removed` : 'Task removed');
  };

  const addGuest = (guest: Guest) => {
    setGuestList(prev => [...prev, guest]);
    setShowAddGuest(false);
    showToast(`${guest.name} added to the guest list`);
  };

  const saveGuest = (guest: Guest) => {
    setGuestList(prev => prev.map(g => (g.id === guest.id ? guest : g)));
    setSelectedGuestId(null);
    showToast(`${guest.name} updated`);
  };

  const deleteGuest = (id: string) => {
    const removed = guestList.find(g => g.id === id);
    setGuestList(prev => prev.filter(g => g.id !== id));
    setSelectedGuestId(null);
    showToast(removed ? `${removed.name} removed from the guest list` : 'Guest removed');
  };

  const exportGuestList = () => {
    downloadTextFile(
      'guest-list.csv',
      [
        'Name,Email,Phone,RSVP,Dietary,Table,PlusOne,Notes',
        ...guestList.map(g =>
          [g.name, g.email, g.phone, g.rsvpStatus, g.dietaryRestrictions, `Table ${g.table}`, g.plusOne ? 'Yes' : 'No', g.specialNotes]
            .map(csvCell)
            .join(',')
        )
      ],
      'text/csv'
    );
    showToast('Guest list exported');
  };

  const exportBudget = () => {
    downloadTextFile(
      'event-budget.csv',
      [
        'Category,Vendor,Estimated,Actual,DueDate,Status',
        ...budget.map(i =>
          [i.category, i.vendor, i.estimatedCost, i.actualCost, i.dueDate, i.paid ? 'Paid' : 'Pending'].map(csvCell).join(',')
        )
      ],
      'text/csv'
    );
    showToast('Budget exported');
  };

  const saveBudgetItem = (item: BudgetItem) => {
    setBudget(prev => prev.map(i => (i.id === item.id ? item : i)));
    setSelectedBudgetId(null);
    showToast(`${item.category} line item updated`);
  };

  const addVendor = (vendor: Vendor) => {
    setVendorList(prev => [...prev, vendor]);
    setShowAddVendor(false);
    showToast(`${vendor.name} added to the vendor directory`);
  };

  const setVendorAvailability = (id: string, availability: VendorAvailability) => {
    setVendorList(prev => prev.map(v => (v.id === id ? { ...v, availability } : v)));
    showToast(`Availability set to ${availability}`);
  };

  const deleteVendor = (id: string) => {
    const removed = vendorList.find(v => v.id === id);
    setVendorList(prev => prev.filter(v => v.id !== id));
    setSelectedVendorId(null);
    showToast(removed ? `${removed.name} removed from the directory` : 'Vendor removed');
  };

  const openNotification = (idx: number, target: Page) => {
    setReadNotifications(prev => (prev.includes(idx) ? prev : [...prev, idx]));
    setShowNotifications(false);
    goTo(target);
  };

  const sendMessage = (to: string, body: string) => {
    setSentMessages(prev => [...prev, { to, body, sentAt: new Date().toISOString() }]);
  };

  const payAllInvoices = () => {
    setBudget(prev => prev.map(i => ({ ...i, paid: true })));
  };

  const requestQuote = (eventType: string) => {
    setContactEventType(eventType);
    setSelectedServiceTitle(null);
    setSelectedPortfolioIdx(null);
    goTo('contact');
  };

  const resetDemo = () => {
    setTimeline(initialTimelineItems);
    setGuestList(initialGuests);
    setVendorList(initialVendors);
    setBudget(initialBudgetItems);
    setSentMessages([]);
    setReadNotifications([]);
    setUserRole('Planner');
    setContactEventType('');
    setShowLogoutConfirm(false);
    setFilterCategory('All');
    setFilterPrice('All');
    setFilterAvailability('All');
    setVendorSearch('');
    setDashboardType('All');
    setTaskStatusFilter('All');
    setTaskPriorityFilter('All');
    setRsvpFilter('All');
    setGuestSearch('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable -- in-memory state was already reset
    }
    goTo('home');
    showToast('Demo session reset');
  };

  const downloadContract = (contract: Contract) => {
    downloadTextFile(contract.documentUrl.replace('.pdf', '.txt'), [
      'Celebration Events Co. -- Vendor Contract Summary (Demo)',
      '',
      `Vendor: ${contract.vendor}`,
      `Service: ${contract.service}`,
      `Contract Amount: $${contract.amount.toLocaleString()}`,
      `Deposit Paid: $${contract.depositPaid.toLocaleString()}`,
      `Balance Due: $${contract.balanceDue.toLocaleString()}`,
      `Signed: ${new Date(contract.signedDate).toLocaleDateString()}`,
      `Status: ${contract.status}`,
      '',
      'This file was generated by an interactive demo. It is not a real contract.'
    ]);
    showToast('Contract summary downloaded');
  };

  const downloadResource = (resource: ResourceItem) => {
    const slug = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    downloadTextFile(`${slug}.txt`, [
      `Celebration Events Co. -- ${resource.title} (Demo)`,
      resource.desc,
      '',
      ...resource.fileLines,
      '',
      'This file was generated by an interactive demo.'
    ]);
    showToast(`${resource.title} downloaded`);
  };

  // Filtered vendors
  const vendorQuery = vendorSearch.trim().toLowerCase();
  const filteredVendors = vendorList.filter(v =>
    (filterCategory === 'All' || v.category === filterCategory) &&
    (filterPrice === 'All' || v.priceRange === filterPrice) &&
    (filterAvailability === 'All' || v.availability === filterAvailability) &&
    (vendorQuery === '' ||
      v.name.toLowerCase().includes(vendorQuery) ||
      v.category.toLowerCase().includes(vendorQuery) ||
      v.contactName.toLowerCase().includes(vendorQuery))
  );

  // Filtered dashboard events
  const dashboardEvents = [...events]
    .filter(e => dashboardType === 'All' || e.eventType === dashboardType)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  // Filtered timeline tasks
  const filteredTasks = [...timeline]
    .filter(t => (taskStatusFilter === 'All' || t.status === taskStatusFilter) &&
      (taskPriorityFilter === 'All' || t.priority === taskPriorityFilter))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Filtered guests
  const guestQuery = guestSearch.trim().toLowerCase();
  const filteredGuests = guestList.filter(g =>
    (rsvpFilter === 'All' || g.rsvpStatus === rsvpFilter) &&
    (guestQuery === '' ||
      g.name.toLowerCase().includes(guestQuery) ||
      g.email.toLowerCase().includes(guestQuery) ||
      g.dietaryRestrictions.toLowerCase().includes(guestQuery))
  );

  const selectedGuest = guestList.find(g => g.id === selectedGuestId) || null;
  const selectedBudgetItem = budget.find(i => i.id === selectedBudgetId) || null;
  const selectedResource = resourceItems.find(r => r.title === selectedResourceTitle) || null;
  const selectedService = serviceOfferings.find(s => s.title === selectedServiceTitle) || null;
  const selectedPortfolio = selectedPortfolioIdx !== null ? portfolioItems[selectedPortfolioIdx] : null;
  const selectedClient = clients.find(c => c.id === selectedClientId) || null;
  const selectedClientEvent = selectedClient ? events.find(e => e.id === clientEventMap[selectedClient.id]) || null : null;
  const selectedVendor = vendorList.find(v => v.id === selectedVendorId) || null;
  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  // Navigation
  const renderNavigation = () => (
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
            <button
              onClick={() => {
                const next: UserRole = userRole === 'Planner' ? 'Client' : 'Planner';
                setUserRole(next);
                showToast(`Now viewing as ${next}`);
              }}
              title="Switch between the planner and client view"
              className="flex items-center gap-2 bg-[#f77f00] px-3 py-2 rounded-lg hover:bg-[#fcbf49] hover:text-[#d62828] transition-colors"
            >
              <User className="w-5 h-5" />
              <div className="text-sm text-left">
                <p className="font-semibold">{userRole}</p>
              </div>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotifications(v => !v)}
                aria-label="Notifications"
                className="relative hover:text-[#fcbf49] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#d62828] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white text-gray-900 rounded-lg shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b flex items-center justify-between">
                    <span className="font-bold text-[#d62828]">Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                      className="text-gray-500 hover:text-[#d62828]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {unreadNotifications > 0 ? (
                    <div>
                      {notificationItems.map((n, idx) => (
                        <button
                          key={idx}
                          onClick={() => openNotification(idx, n.target)}
                          className={`w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                            readNotifications.includes(idx) ? 'opacity-50' : ''
                          }`}
                        >
                          <p className="text-sm font-semibold text-gray-900">{n.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {n.time} • {readNotifications.includes(idx) ? 'Read' : 'Tap to open'}
                          </p>
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setReadNotifications(notificationItems.map((_, idx) => idx));
                          setShowNotifications(false);
                          showToast('All notifications marked as read');
                        }}
                        className="w-full px-4 py-3 text-sm font-semibold text-[#d62828] hover:bg-red-50 transition-colors"
                      >
                        Mark all as read
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="px-4 py-6 text-sm text-gray-500 text-center">You are all caught up.</p>
                      <button
                        onClick={() => {
                          setReadNotifications([]);
                          showToast('Notifications restored');
                        }}
                        className="w-full px-4 py-3 text-sm font-semibold text-[#d62828] hover:bg-red-50 transition-colors border-t"
                      >
                        Restore demo notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
              className="hover:text-[#fcbf49] transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              aria-label="Sign out"
              className="hover:text-[#fcbf49] transition-colors"
            >
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
              onClick={() => goTo(page)}
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
  const renderDashboardPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#d62828] mb-2">Event Planning Dashboard</h1>
        <p className="text-gray-600">Manage all your events and vendors in one place</p>
      </div>

      {/* Key Metrics -- each card opens the matching workspace */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => goTo('timeline')}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#d62828] hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-[#d62828]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Active Events</h3>
          <p className="text-3xl font-bold text-[#d62828]">{activeEvents}</p>
          <p className="text-sm text-green-600 mt-2">+{totalEvents - activeEvents} completed</p>
        </button>

        <button
          onClick={() => goTo('clients')}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#f77f00] hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#f77f00]" />
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Clients</h3>
          <p className="text-3xl font-bold text-[#d62828]">{clients.length}</p>
          <p className="text-sm text-gray-600 mt-2">{clients.filter(c => c.status === 'Active').length} active</p>
        </button>

        <button
          onClick={() => goTo('budget')}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-[#d62828]">${(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-2">+18% vs last quarter</p>
        </button>

        <button
          onClick={() => {
            setTaskStatusFilter('All');
            goTo('timeline');
          }}
          className="text-left bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-orange-500" />
            <Zap className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-semibold mb-1">Pending Tasks</h3>
          <p className="text-3xl font-bold text-[#d62828]">{upcomingTasks}</p>
          <p className="text-sm text-gray-600 mt-2">Due this week</p>
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#d62828] mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#f77f00]" />
            Upcoming Events
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {(['All', 'Wedding', 'Corporate', 'Birthday'] as const).map(type => (
              <button
                key={type}
                onClick={() => setDashboardType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  dashboardType === type
                    ? 'bg-[#d62828] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#fcbf49] hover:text-[#d62828]'
                }`}
              >
                {type === 'All' ? `All (${events.length})` : `${type} (${events.filter(e => e.eventType === type).length})`}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {dashboardEvents.length === 0 && (
              <p className="text-sm text-gray-600 py-6 text-center">No {dashboardType.toLowerCase()} events on the calendar right now.</p>
            )}
            {dashboardEvents.map(event => (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="w-full text-left border-l-4 border-[#d62828] bg-red-50 p-4 rounded hover:bg-red-100 transition-colors cursor-pointer"
              >
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
              </button>
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

      {/* Quick Stats -- each opens supporting detail */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setShowReviews(true)}
          className="text-left bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
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
            <p className="text-xs font-semibold text-[#f77f00] mt-2">Read reviews</p>
          </div>
        </button>

        <button
          onClick={() => goTo('portfolio')}
          className="text-left bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#d62828]">Event Success Rate</h3>
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">98%</p>
            <p className="text-sm text-gray-600 mb-3">Events executed flawlessly</p>
            <p className="text-2xl font-semibold text-[#d62828]">156</p>
            <p className="text-sm text-gray-600">Total events managed</p>
            <p className="text-xs font-semibold text-[#f77f00] mt-2">See the portfolio</p>
          </div>
        </button>

        <button
          onClick={() => goTo('vendors')}
          className="text-left bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#d62828]">Trusted Vendors</h3>
            <Briefcase className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#d62828] mb-2">{vendorList.length}</p>
            <p className="text-sm text-gray-600 mb-3">Professional partners</p>
            <p className="text-sm text-green-600 font-semibold">All verified & insured</p>
            <p className="text-xs font-semibold text-[#f77f00] mt-2">Open the directory</p>
          </div>
        </button>
      </div>
    </div>
  );

  // Page: Services
  const renderServicesPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceOfferings.map(service => (
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
              <button
                onClick={() => setSelectedServiceTitle(service.title)}
                className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Portfolio
  const renderPortfolioPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Event Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item, idx) => (
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
              <button
                onClick={() => setSelectedPortfolioIdx(idx)}
                className="w-full bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Client Portal
  const renderClientPortalPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-[#d62828]">Client Portal</h1>
        <button
          onClick={() => setUserRole(userRole === 'Planner' ? 'Client' : 'Planner')}
          className="px-4 py-2 border-2 border-[#d62828] text-[#d62828] rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm"
        >
          {userRole === 'Planner' ? 'View as Client' : 'View as Planner'}
        </button>
      </div>

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
                {timeline.filter(t => t.assignedTo === 'Client' && t.status !== 'Completed').length === 0 && (
                  <p className="text-gray-600 text-sm">No open tasks -- you are all caught up.</p>
                )}
                {timeline.filter(t => t.assignedTo === 'Client' && t.status !== 'Completed').map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => completeTask(task.id)}
                      className="px-4 py-2 bg-[#d62828] text-white rounded-lg hover:bg-[#f77f00] transition-colors text-sm font-semibold"
                    >
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
                <button
                  onClick={() => setMessageRecipient('Sarah Martinez')}
                  className="w-full bg-[#d62828] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Message Planner
                </button>
                <button
                  onClick={() => setShowDocuments(true)}
                  className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  View Documents
                </button>
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
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
                  <a
                    href="tel:5551234567"
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (555) 123-4567
                  </a>
                  <a
                    href="mailto:sarah@celebrationevents.com"
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    sarah@celebrationevents.com
                  </a>
                </div>
                <button
                  onClick={() => setMessageRecipient('Sarah Martinez')}
                  className="mt-4 w-full border-2 border-[#d62828] text-[#d62828] px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send a Message
                </button>
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
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {client.email}
                </a>
                <a
                  href={`tel:${client.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {client.phone}
                </a>
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

              <button
                onClick={() => setSelectedClientId(client.id)}
                className="w-full bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Page: Vendor Directory
  const renderVendorDirectoryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#d62828] mb-2">Vendor Directory</h1>
          <p className="text-gray-600">{vendorList.length} trusted partners</p>
        </div>
        <button
          onClick={() => setShowAddVendor(true)}
          className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            aria-label="Search vendors"
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            placeholder="Search by business, category, or contact..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            aria-label="Filter by vendor category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          >
            <option value="All">All Categories</option>
            {['Catering', 'Photography', 'Videography', 'Florist', 'Music/DJ', 'Venue', 'Decor', 'Bakery', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Filter by price range"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          >
            <option value="All">All Price Ranges</option>
            <option value="$">$ Budget-Friendly</option>
            <option value="$$">$$ Moderate</option>
            <option value="$$$">$$$ Premium</option>
            <option value="$$$$">$$$$ Luxury</option>
          </select>
          <select
            aria-label="Filter by availability"
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Limited">Limited</option>
            <option value="Booked">Booked</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredVendors.length} of {vendorList.length} vendors
        </p>
        {(filterCategory !== 'All' || filterPrice !== 'All' || filterAvailability !== 'All' || vendorSearch !== '') && (
          <button
            onClick={() => {
              setFilterCategory('All');
              setFilterPrice('All');
              setFilterAvailability('All');
              setVendorSearch('');
            }}
            className="text-sm font-semibold text-[#d62828] hover:text-[#f77f00] transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>

      {/* Vendor Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-10 text-center">
          <p className="text-gray-600 mb-4">No vendors match the selected filters.</p>
          <button
            onClick={() => {
              setFilterCategory('All');
              setFilterPrice('All');
              setFilterAvailability('All');
              setVendorSearch('');
            }}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#d62828] mb-1">{vendor.name}</h3>
                  <p className="text-sm text-gray-600">{vendor.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{vendor.eventsCompleted === 0 ? 'New' : vendor.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  {vendor.contactName || 'Not provided'}
                </div>
                {vendor.email ? (
                  <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors break-all">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {vendor.email}
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    Not provided
                  </div>
                )}
                {vendor.phone ? (
                  <a href={`tel:${vendor.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-[#d62828] transition-colors">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {vendor.phone}
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    Not provided
                  </div>
                )}
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
                <button
                  onClick={() => setSelectedVendorId(vendor.id)}
                  className="flex-1 bg-[#d62828] text-white px-4 py-2 rounded-lg hover:bg-[#f77f00] transition-colors text-sm font-semibold"
                >
                  View Profile
                </button>
                <button
                  onClick={() => setMessageRecipient(vendor.name)}
                  aria-label={`Message ${vendor.name}`}
                  className="px-3 py-2 border-2 border-[#d62828] text-[#d62828] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Page: Budget Tracker
  const renderBudgetTrackerPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-[#d62828]">Budget Tracker</h1>
        <button
          onClick={exportBudget}
          className="border-2 border-[#d62828] text-[#d62828] px-5 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Budget', amount: 50000, borderClass: 'border-blue-500' },
          { label: 'Estimated Total', amount: budget.reduce((sum, i) => sum + i.estimatedCost, 0), borderClass: 'border-purple-500' },
          { label: 'Actual Spent', amount: budget.reduce((sum, i) => sum + i.actualCost, 0), borderClass: 'border-green-500' },
          { label: 'Balance Remaining', amount: 50000 - budget.reduce((sum, i) => sum + i.actualCost, 0), borderClass: 'border-orange-500' }
        ].map(stat => (
          <div key={stat.label} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${stat.borderClass}`}>
            <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-[#d62828]">${stat.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Budget Items Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[#d62828]">Budget Breakdown</h2>
          <p className="text-sm text-gray-600">Select any line item to edit its cost, due date, or payment status.</p>
        </div>
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
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budget.map(item => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedBudgetId(item.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
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
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveBudgetItem({ ...item, paid: !item.paid });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        item.paid
                          ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {item.paid ? 'Mark Unpaid' : 'Mark Paid'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBudgetId(item.id);
                      }}
                      aria-label={`Edit ${item.category} line item`}
                      className="ml-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-[#d62828] text-[#d62828] hover:bg-red-50 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {unpaidBudgetItems.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowPayment(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Pay Open Invoices (${unpaidBudgetItems.reduce((s, i) => s + i.actualCost, 0).toLocaleString()})
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Page: Timeline Builder
  const renderTimelineBuilderPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#d62828] mb-2">Event Timeline</h1>
          <p className="text-gray-600">
            {timeline.filter(t => t.status === 'Completed').length} of {timeline.length} tasks complete
          </p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Timeline filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-600 uppercase mr-1">Status</span>
          {(['All', 'Not Started', 'In Progress', 'Completed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setTaskStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                taskStatusFilter === status
                  ? 'bg-[#d62828] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#fcbf49] hover:text-[#d62828]'
              }`}
            >
              {status}
              {status !== 'All' && ` (${timeline.filter(t => t.status === status).length})`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-600 uppercase mr-1">Priority</span>
          {(['All', 'High', 'Medium', 'Low'] as const).map(priority => (
            <button
              key={priority}
              onClick={() => setTaskPriorityFilter(priority)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                taskPriorityFilter === priority
                  ? 'bg-[#f77f00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#fcbf49] hover:text-[#d62828]'
              }`}
            >
              {priority}
              {priority !== 'All' && ` (${timeline.filter(t => t.priority === priority).length})`}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-10 text-center">
          <p className="text-gray-600 mb-4">No tasks match these filters.</p>
          <button
            onClick={() => {
              setTaskStatusFilter('All');
              setTaskPriorityFilter('All');
            }}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.map(task => (
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

            <div className="flex flex-wrap gap-2">
              {task.status === 'Not Started' && (
                <button
                  onClick={() => setTaskStatus(task.id, 'In Progress')}
                  className="border-2 border-[#d62828] text-[#d62828] px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Start Task
                </button>
              )}
              {task.status !== 'Completed' && (
                <button
                  onClick={() => completeTask(task.id)}
                  className="bg-[#d62828] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors text-sm flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </button>
              )}
              {task.status === 'Completed' && (
                <button
                  onClick={() => setTaskStatus(task.id, 'In Progress')}
                  className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reopen
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task ${task.task}`}
                className="border-2 border-red-300 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Guest Management
  const renderGuestManagementPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#d62828] mb-2">Guest Management</h1>
          <p className="text-gray-600">{guestList.length} guests • {guestList.filter(g => g.rsvpStatus === 'Accepted').length} confirmed</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportGuestList}
            className="border-2 border-[#d62828] text-[#d62828] px-5 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddGuest(true)}
            className="bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Guest
          </button>
        </div>
      </div>

      {/* RSVP Summary -- click a card to filter the table */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {([
          { status: 'Accepted' as RsvpStatus, borderClass: 'border-green-500' },
          { status: 'Pending' as RsvpStatus, borderClass: 'border-yellow-500' },
          { status: 'Declined' as RsvpStatus, borderClass: 'border-red-500' },
          { status: 'Maybe' as RsvpStatus, borderClass: 'border-blue-500' }
        ]).map(stat => (
          <button
            key={stat.status}
            onClick={() => setRsvpFilter(prev => (prev === stat.status ? 'All' : stat.status))}
            className={`text-left bg-white rounded-lg shadow-lg p-6 border-l-4 ${stat.borderClass} hover:shadow-xl hover:-translate-y-0.5 transition-all ${
              rsvpFilter === stat.status ? 'ring-2 ring-[#d62828]' : ''
            }`}
          >
            <p className="text-gray-600 text-sm font-semibold mb-1">{stat.status}</p>
            <p className="text-3xl font-bold text-[#d62828]">{guestList.filter(g => g.rsvpStatus === stat.status).length}</p>
            <p className="text-xs font-semibold text-[#f77f00] mt-2">
              {rsvpFilter === stat.status ? 'Filtering -- tap to clear' : 'Tap to filter'}
            </p>
          </button>
        ))}
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              aria-label="Search guests"
              value={guestSearch}
              onChange={(e) => setGuestSearch(e.target.value)}
              placeholder="Search by name, email, or dietary need..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d62828]"
            />
          </div>
          <p className="text-sm text-gray-600">
            Showing {filteredGuests.length} of {guestList.length}
          </p>
          {(rsvpFilter !== 'All' || guestSearch !== '') && (
            <button
              onClick={() => {
                setRsvpFilter('All');
                setGuestSearch('');
              }}
              className="text-sm font-semibold text-[#d62828] hover:text-[#f77f00] transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
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
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-600">
                    No guests match this view. Adjust the filters or add a guest.
                  </td>
                </tr>
              )}
              {filteredGuests.map(guest => (
                <tr
                  key={guest.id}
                  onClick={() => setSelectedGuestId(guest.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {guest.name}
                    {guest.specialNotes && <p className="text-xs font-normal text-gray-500 mt-1">{guest.specialNotes}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <p>{guest.email || '--'}</p>
                    <p className="text-xs text-gray-500">{guest.phone}</p>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      aria-label={`RSVP status for ${guest.name}`}
                      value={guest.rsvpStatus}
                      onChange={(e) => {
                        const next = e.target.value as RsvpStatus;
                        setGuestList(prev => prev.map(g => (g.id === guest.id ? { ...g, rsvpStatus: next } : g)));
                        showToast(`${guest.name} marked ${next}`);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:ring-2 focus:ring-[#d62828] ${
                        guest.rsvpStatus === 'Accepted' ? 'bg-green-100 text-green-700' :
                        guest.rsvpStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        guest.rsvpStatus === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                      <option value="Maybe">Maybe</option>
                    </select>
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
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGuestId(guest.id);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-[#d62828] text-[#d62828] hover:bg-red-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteGuest(guest.id);
                      }}
                      aria-label={`Remove ${guest.name}`}
                      className="ml-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Remove
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
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Event Resources</h1>

      <div className="space-y-6">
        {resourceItems.map(resource => (
          <div key={resource.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center">
                <resource.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#d62828]">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedResourceTitle(resource.title)}
                  className="border-2 border-[#d62828] text-[#d62828] px-5 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => downloadResource(resource)}
                  className="bg-[#d62828] text-white px-6 py-2 rounded-lg hover:bg-[#f77f00] transition-colors flex items-center gap-2 font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Access
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Page: Contact
  const renderContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#d62828] mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#d62828] mb-6">Get in Touch</h2>
          <EventsContactForm key={contactEventType} initialEventType={contactEventType} />
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
              <a href="tel:5553456789" className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-[#f77f00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600 group-hover:text-[#d62828] transition-colors">(555) 345-6789</p>
                </div>
              </a>
              <a href="mailto:info@celebrationevents.com" className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-[#f77f00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600 group-hover:text-[#d62828] transition-colors break-all">info@celebrationevents.com</p>
                </div>
              </a>
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
  const renderFooter = () => (
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
              {[
                { label: 'Weddings', service: 'Wedding Planning' },
                { label: 'Corporate Events', service: 'Corporate Events' },
                { label: 'Birthday Parties', service: 'Birthday Parties' },
                { label: 'Day-of Coordination', service: 'Day-of Coordination' }
              ].map(({ label, service }) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      goTo('services');
                      setSelectedServiceTitle(service);
                    }}
                    className="hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><button onClick={() => goTo('resources')} className="hover:text-white">Planning Tools</button></li>
              <li><button onClick={() => goTo('vendors')} className="hover:text-white">Vendor Directory</button></li>
              <li><button onClick={() => goTo('budget')} className="hover:text-white">Budget Calculator</button></li>
              <li>
                <button
                  onClick={() => {
                    goTo('resources');
                    setSelectedResourceTitle('Planning Checklist');
                  }}
                  className="hover:text-white"
                >
                  Planning Guides
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><button onClick={() => setShowAbout(true)} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => goTo('portfolio')} className="hover:text-white">Portfolio</button></li>
              <li><button onClick={() => goTo('contact')} className="hover:text-white">Contact</button></li>
              <li><button onClick={() => setShowPrivacy(true)} className="hover:text-white">Privacy Policy</button></li>
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
      {renderNavigation()}
      <main>
        {currentPage === 'home' && renderDashboardPage()}
        {currentPage === 'services' && renderServicesPage()}
        {currentPage === 'portfolio' && renderPortfolioPage()}
        {currentPage === 'clients' && renderClientPortalPage()}
        {currentPage === 'vendors' && renderVendorDirectoryPage()}
        {currentPage === 'budget' && renderBudgetTrackerPage()}
        {currentPage === 'timeline' && renderTimelineBuilderPage()}
        {currentPage === 'guests' && renderGuestManagementPage()}
        {currentPage === 'resources' && renderResourcesPage()}
        {currentPage === 'contact' && renderContactPage()}
      </main>
      {renderFooter()}

      {/* Service detail modal */}
      {selectedService && (
        <Modal title={selectedService.title} onClose={() => setSelectedServiceTitle(null)}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#d62828] rounded-lg flex items-center justify-center flex-shrink-0">
              <selectedService.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-600">{selectedService.desc}</p>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">What is included</h4>
          <ul className="space-y-2 mb-6">
            {selectedService.features.map(feature => (
              <li key={feature} className="text-sm text-gray-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg mb-6">
            <span className="font-semibold text-gray-900">Pricing</span>
            <span className="text-2xl font-bold text-[#d62828]">{selectedService.price}</span>
          </div>
          <button
            onClick={() => requestQuote(selectedService.inquiryType)}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Request a Quote
          </button>
        </Modal>
      )}

      {/* Portfolio detail modal */}
      {selectedPortfolio && (
        <Modal title={selectedPortfolio.title} onClose={() => setSelectedPortfolioIdx(null)}>
          <div className="h-40 bg-gradient-to-br from-[#d62828] to-[#f77f00] flex items-center justify-center rounded-lg mb-4">
            <Camera className="w-16 h-16 text-white opacity-50" />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Gift className="w-4 h-4" />
              {selectedPortfolio.type}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {selectedPortfolio.guests} guests
            </span>
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Event Highlights</h4>
          <ul className="space-y-2 mb-6">
            {selectedPortfolio.highlights.map(h => (
              <li key={h} className="text-sm text-gray-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {h}
              </li>
            ))}
          </ul>
          <button
            onClick={() => requestQuote(selectedPortfolio.inquiryType)}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Plan a Similar Event
          </button>
        </Modal>
      )}

      {/* Client detail modal */}
      {selectedClient && (
        <Modal title={selectedClient.name} onClose={() => setSelectedClientId(null)}>
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-[#f77f00]" />
              {selectedClient.email}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#f77f00]" />
              {selectedClient.phone}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MessageSquare className="w-4 h-4 text-[#f77f00]" />
              Prefers contact by {selectedClient.preferredContact}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600">Events</p>
              <p className="text-lg font-bold text-blue-600">{selectedClient.eventCount}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-600">Total Spent</p>
              <p className="text-lg font-bold text-green-600">${selectedClient.totalSpent.toLocaleString()}</p>
            </div>
          </div>
          {selectedClientEvent && (
            <div className="border rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Current Event</h4>
              <p className="text-sm text-gray-700 mb-1">{selectedClientEvent.eventType} at {selectedClientEvent.venue}</p>
              <p className="text-sm text-gray-600 mb-3">
                {new Date(selectedClientEvent.eventDate).toLocaleDateString()} • {selectedClientEvent.guestCount} guests • {selectedClientEvent.status}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{selectedClientEvent.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#d62828] h-2 rounded-full" style={{ width: `${selectedClientEvent.completionPercentage}%` }}></div>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              const name = selectedClient.name;
              setSelectedClientId(null);
              setMessageRecipient(name);
            }}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Message Client
          </button>
        </Modal>
      )}

      {/* Vendor profile modal */}
      {selectedVendor && (
        <Modal title={selectedVendor.name} onClose={() => setSelectedVendorId(null)}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">{selectedVendor.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{selectedVendor.eventsCompleted === 0 ? 'New vendor' : `${selectedVendor.rating} rating`}</span>
            </div>
          </div>
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4 text-[#f77f00]" />
              {selectedVendor.contactName || 'Contact not provided'}
            </div>
            {selectedVendor.email ? (
              <a href={`mailto:${selectedVendor.email}`} className="flex items-center gap-2 text-gray-700 hover:text-[#d62828] transition-colors break-all">
                <Mail className="w-4 h-4 text-[#f77f00] flex-shrink-0" />
                {selectedVendor.email}
              </a>
            ) : (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-[#f77f00]" />
                Email not provided
              </div>
            )}
            {selectedVendor.phone ? (
              <a href={`tel:${selectedVendor.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 text-gray-700 hover:text-[#d62828] transition-colors">
                <Phone className="w-4 h-4 text-[#f77f00] flex-shrink-0" />
                {selectedVendor.phone}
              </a>
            ) : (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#f77f00]" />
                Phone not provided
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Price Range</p>
              <p className="font-bold text-[#d62828]">{selectedVendor.priceRange}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Events Done</p>
              <p className="font-bold text-[#d62828]">{selectedVendor.eventsCompleted}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Availability</p>
              <p className="font-bold text-[#d62828]">{selectedVendor.availability}</p>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-2">Update Availability</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {(['Available', 'Limited', 'Booked'] as VendorAvailability[]).map(status => (
              <button
                key={status}
                onClick={() => setVendorAvailability(selectedVendor.id, status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedVendor.availability === status
                    ? 'bg-[#d62828] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-[#fcbf49] hover:text-[#d62828]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const name = selectedVendor.name;
              setSelectedVendorId(null);
              setMessageRecipient(name);
            }}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Send Message
          </button>
          <button
            onClick={() => deleteVendor(selectedVendor.id)}
            className="w-full mt-3 border-2 border-red-300 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Remove from Directory
          </button>
        </Modal>
      )}

      {/* Event detail modal (dashboard) */}
      {selectedEvent && (
        <Modal title={selectedEvent.clientName} onClose={() => setSelectedEventId(null)}>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-gray-600">Event Type</p>
              <p className="font-semibold">{selectedEvent.eventType}</p>
            </div>
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-semibold">{new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Venue</p>
              <p className="font-semibold">{selectedEvent.venue}</p>
            </div>
            <div>
              <p className="text-gray-600">Guests</p>
              <p className="font-semibold">{selectedEvent.guestCount}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-semibold">{selectedEvent.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Priority</p>
              <p className="font-semibold">{selectedEvent.priority}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Planning Progress</span>
              <span>{selectedEvent.completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-[#d62828] h-3 rounded-full" style={{ width: `${selectedEvent.completionPercentage}%` }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Budget</p>
              <p className="text-xl font-bold text-green-600">${selectedEvent.budget.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-1">Spent</p>
              <p className="text-xl font-bold text-blue-600">${selectedEvent.spent.toLocaleString()}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedEventId(null);
              goTo('timeline');
            }}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            View Event Timeline
          </button>
        </Modal>
      )}

      {/* Documents modal */}
      {showDocuments && (
        <Modal title="Your Documents" onClose={() => setShowDocuments(false)} wide>
          <div className="space-y-4">
            {contracts.map(contract => (
              <div key={contract.id} className="border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900">{contract.vendor}</p>
                  <p className="text-sm text-gray-600">{contract.service}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Signed {new Date(contract.signedDate).toLocaleDateString()} • ${contract.amount.toLocaleString()} total • ${contract.balanceDue.toLocaleString()} balance due
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">{contract.status}</span>
                  <button
                    onClick={() => downloadContract(contract)}
                    className="bg-[#d62828] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#f77f00] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Settings modal */}
      {showSettings && (
        <Modal title="Settings" onClose={() => setShowSettings(false)}>
          <h4 className="font-bold text-gray-900 mb-3">Viewing Role</h4>
          <p className="text-sm text-gray-600 mb-4">Switch roles to see how the Client Portal changes for each user type.</p>
          <div className="space-y-3 mb-6">
            {(['Planner', 'Client'] as UserRole[]).map(role => (
              <label key={role} htmlFor={`events-role-${role.toLowerCase()}`} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  id={`events-role-${role.toLowerCase()}`}
                  type="radio"
                  name="events-role"
                  checked={userRole === role}
                  onChange={() => setUserRole(role)}
                  className="w-4 h-4 accent-[#d62828]"
                />
                <div>
                  <p className="font-semibold text-gray-900">{role}</p>
                  <p className="text-xs text-gray-600">
                    {role === 'Planner' ? 'Full access to clients, vendors, budgets, and timelines' : 'Sees their own event, tasks, documents, and payments'}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Done
          </button>
        </Modal>
      )}

      {/* Logout / reset modal */}
      {showLogoutConfirm && (
        <Modal title="Sign Out" onClose={() => setShowLogoutConfirm(false)}>
          <p className="text-gray-600 mb-6">
            Signing out of this demo resets everything you changed -- tasks, guests, vendors, payments, and messages return to their starting state.
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetDemo}
              className="flex-1 bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
            >
              Sign Out & Reset
            </button>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Privacy modal */}
      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p className="text-gray-600 mb-4">
            This is an interactive demo website. Anything you enter here (guests, vendors, tasks, messages) is stored only in your own browser and is cleared when you reset the demo or leave the site.
          </p>
          <p className="text-gray-600 mb-6">
            The only exception is the contact form, which sends your inquiry so a real person can follow up about building a site like this one.
          </p>
          <button
            onClick={() => setShowPrivacy(false)}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Close
          </button>
        </Modal>
      )}

      {/* Message composer */}
      {messageRecipient && (
        <MessageModal
          recipient={messageRecipient}
          onSend={(body) => sendMessage(messageRecipient, body)}
          onClose={() => setMessageRecipient(null)}
        />
      )}

      {/* Add guest */}
      {showAddGuest && <AddGuestModal onAdd={addGuest} onClose={() => setShowAddGuest(false)} />}

      {/* Edit guest */}
      {selectedGuest && (
        <GuestDetailModal
          key={selectedGuest.id}
          guest={selectedGuest}
          onSave={saveGuest}
          onDelete={deleteGuest}
          onClose={() => setSelectedGuestId(null)}
        />
      )}

      {/* Add vendor */}
      {showAddVendor && <AddVendorModal onAdd={addVendor} onClose={() => setShowAddVendor(false)} />}

      {/* Add timeline task */}
      {showAddTask && <AddTaskModal onAdd={addTask} onClose={() => setShowAddTask(false)} />}

      {/* Budget line item */}
      {selectedBudgetItem && (
        <BudgetItemModal
          key={selectedBudgetItem.id}
          item={selectedBudgetItem}
          onSave={saveBudgetItem}
          onClose={() => setSelectedBudgetId(null)}
        />
      )}

      {/* Resource preview */}
      {selectedResource && (
        <Modal title={selectedResource.title} onClose={() => setSelectedResourceTitle(null)} wide>
          <p className="text-gray-600 mb-4">{selectedResource.desc}</p>
          <ul className="space-y-3 mb-6">
            {selectedResource.fileLines.map(line => (
              <li key={line} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {line}
              </li>
            ))}
          </ul>
          <button
            onClick={() => downloadResource(selectedResource)}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download a Copy
          </button>
        </Modal>
      )}

      {/* Client reviews */}
      {showReviews && (
        <Modal title="Client Reviews" onClose={() => setShowReviews(false)} wide>
          <div className="flex items-center gap-3 mb-6">
            <p className="text-4xl font-bold text-[#d62828]">4.9</p>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Average across 87 reviews</p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            {clientReviews.map(review => (
              <div key={review.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-600">{review.event}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.quote}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setShowReviews(false);
              requestQuote('');
            }}
            className="w-full bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
          >
            Start Planning Your Event
          </button>
        </Modal>
      )}

      {/* About the company */}
      {showAbout && (
        <Modal title="About Celebration Events Co." onClose={() => setShowAbout(false)}>
          <p className="text-gray-600 mb-4">
            Since 2010 our team has planned weddings, corporate programs, and milestone celebrations from first walkthrough
            to final send-off. We handle venue selection, vendor contracts, budgets, timelines, and day-of coordination so
            our clients can actually enjoy the event they paid for.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-[#d62828]">156</p>
              <p className="text-xs text-gray-600">Events managed</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-[#d62828]">{vendorList.length}</p>
              <p className="text-xs text-gray-600">Partner vendors</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-[#d62828]">4.9</p>
              <p className="text-xs text-gray-600">Average rating</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setShowAbout(false);
                goTo('portfolio');
              }}
              className="flex-1 border-2 border-[#d62828] text-[#d62828] px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              See Our Work
            </button>
            <button
              onClick={() => {
                setShowAbout(false);
                requestQuote('');
              }}
              className="flex-1 bg-[#d62828] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f77f00] transition-colors"
            >
              Contact the Team
            </button>
          </div>
        </Modal>
      )}

      {/* Payment simulation */}
      {showPayment && (
        <PaymentModal
          unpaidItems={unpaidBudgetItems}
          onConfirm={() => {
            payAllInvoices();
            showToast('Invoices marked as paid (demo)');
          }}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default CelebrationEventsCompany;
