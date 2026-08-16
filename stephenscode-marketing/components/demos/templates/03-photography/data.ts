// Shared demo data store for the Lens & Light Photography demo.
// Inquiries submitted through the customer-facing contact form land in the
// same localStorage keys the admin dashboard reads, so the two views feel
// like one connected product. All names and records are fictional demo data.

export const INQUIRIES_KEY = 'lenslight_inquiries'
export const SESSIONS_KEY = 'lenslight_sessions'
export const PORTFOLIO_KEY = 'lenslight_portfolio'

export type InquiryStatus = 'new' | 'contacted' | 'booked'

export interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  service: string
  preferredDate: string
  message: string
  status: InquiryStatus
  receivedAt: string
}

export type SessionStatus = 'upcoming' | 'completed'

export interface Session {
  id: number
  client: string
  type: string
  date: string
  time: string
  location: string
  status: SessionStatus
}

export interface PortfolioItem {
  id: number
  title: string
  category: string
  location: string
  featured: boolean
}

export const SESSION_TYPES = [
  'Wedding Photography',
  'Engagement Session',
  'Family Portrait',
  'Headshot Session',
  'Corporate Events',
  'Product Photography',
  'Other',
]

export const PORTFOLIO_CATEGORIES = [
  'weddings',
  'families',
  'portraits',
  'corporate',
  'events',
  'lifestyle',
]

export const seedInquiries: Inquiry[] = [
  {
    id: 1,
    name: 'Rachel Nguyen',
    email: 'rachel.n@example.com',
    phone: '(555) 210-8834',
    service: 'Wedding Photography',
    preferredDate: '2026-10-17',
    message: 'Looking for full-day coverage for our October wedding in Malibu. Would love to see wedding album options too.',
    status: 'new',
    receivedAt: '2026-08-12T14:20:00.000Z',
  },
  {
    id: 2,
    name: 'Marcus Bell',
    email: 'marcus.bell@example.com',
    phone: '(555) 448-1290',
    service: 'Headshot Session',
    preferredDate: '',
    message: 'Need updated headshots for LinkedIn and my company bio page. Weekday afternoons work best.',
    status: 'contacted',
    receivedAt: '2026-08-10T09:45:00.000Z',
  },
  {
    id: 3,
    name: 'Priya Shah',
    email: 'priya.shah@example.com',
    phone: '(555) 672-0143',
    service: 'Family Portrait',
    preferredDate: '2026-09-05',
    message: 'Family of five, would love a golden hour session at the beach if possible.',
    status: 'booked',
    receivedAt: '2026-08-06T18:05:00.000Z',
  },
]

export const seedSessions: Session[] = [
  {
    id: 1,
    client: 'Priya Shah',
    type: 'Family Portrait',
    date: '2026-09-05',
    time: '17:30',
    location: 'Santa Monica Beach',
    status: 'upcoming',
  },
  {
    id: 2,
    client: 'TechStart Inc.',
    type: 'Corporate Events',
    date: '2026-09-12',
    time: '09:00',
    location: 'Downtown LA Office',
    status: 'upcoming',
  },
  {
    id: 3,
    client: 'Emma Grace',
    type: 'Headshot Session',
    date: '2026-08-01',
    time: '14:00',
    location: 'Studio City Studio',
    status: 'completed',
  },
]

export const seedPortfolio: PortfolioItem[] = [
  { id: 1, title: 'Sarah & Michael', category: 'weddings', location: 'Malibu, CA', featured: true },
  { id: 2, title: 'The Johnson Family', category: 'families', location: 'Santa Monica, CA', featured: false },
  { id: 3, title: 'Emma Grace', category: 'portraits', location: 'Studio City, CA', featured: false },
  { id: 4, title: 'TechStart Inc.', category: 'corporate', location: 'Los Angeles, CA', featured: false },
  { id: 5, title: 'Annual Gala 2024', category: 'events', location: 'Downtown LA', featured: true },
  { id: 6, title: 'Morning Coffee', category: 'lifestyle', location: 'West Hollywood, CA', featured: false },
]

export function loadList<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return seed
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T[]) : seed
  } catch {
    return seed
  }
}

export function saveList<T>(key: string, list: T[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // Storage unavailable (private browsing quota etc.) -- demo still works in memory
  }
}
