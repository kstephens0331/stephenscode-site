'use client'

import { useEffect, useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Crown, Users, BookOpen, Award, Calendar, Lock, Star, CheckCircle, X, PlayCircle, Send, Check, Search, MapPin, MessageSquare, ChevronRight } from 'lucide-react'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

type MembershipTier = 'basic' | 'premium' | 'vip'

const LS = {
  tier: 'demo37-tier',
  rsvps: 'demo37-rsvps',
  connections: 'demo37-connections',
  autoRenew: 'demo37-autorenew',
  progress: 'demo37-progress',
  messages: 'demo37-messages'
}

const TIER_RANK: Record<MembershipTier, number> = { basic: 1, premium: 2, vip: 3 }
const TIER_LABEL: Record<MembershipTier, string> = { basic: 'Basic', premium: 'Premium', vip: 'VIP' }

interface ContentItem {
  id: string
  title: string
  type: string
  length: string
  minTier: MembershipTier
  lessons: string[]
}

const exclusiveContent: ContentItem[] = [
  {
    id: 'c1',
    title: 'Advanced Marketing Strategies',
    type: 'Video Course',
    length: '2h 30m',
    minTier: 'basic',
    lessons: ['Positioning and Messaging', 'Building a Funnel That Converts', 'Paid Acquisition Deep Dive', 'Retention and Referrals']
  },
  {
    id: 'c2',
    title: 'Industry Trends Report 2026',
    type: 'PDF Guide',
    length: '45 pages',
    minTier: 'basic',
    lessons: ['Market Overview', 'Consumer Behavior Shifts', 'Technology Adoption', 'Forecasts and Takeaways']
  },
  {
    id: 'c3',
    title: 'Expert Interview Series',
    type: 'Video',
    length: '1h 15m',
    minTier: 'premium',
    lessons: ['Interview: Scaling Past 7 Figures', 'Interview: Community-Led Growth', 'Interview: Pricing Strategy', 'Panel: What Is Working Now']
  },
  {
    id: 'c4',
    title: 'VIP Masterclass Recording',
    type: 'Video',
    length: '3h',
    minTier: 'vip',
    lessons: ['Session 1: Strategy Framework', 'Session 2: Live Teardowns', 'Session 3: Systems and Delegation', 'Q&A With the Coaches']
  }
]

const upcomingEvents = [
  { id: 'e1', name: 'Monthly Networking Mixer', date: 'Aug 27, 2026', time: '6:00 PM EST', attendees: 45, vipOnly: false },
  { id: 'e2', name: 'Expert Webinar: Growth Hacking', date: 'Sep 3, 2026', time: '2:00 PM EST', attendees: 120, vipOnly: false },
  { id: 'e3', name: 'VIP Roundtable Discussion', date: 'Sep 10, 2026', time: '10:00 AM EST', attendees: 15, vipOnly: true }
]

interface DirectoryMember {
  name: string
  title: string
  tier: string
  avatar: string
  location: string
  memberSince: string
  focus: string[]
  bio: string
  mutual: number
}

const directoryMembers: DirectoryMember[] = [
  {
    name: 'Sarah Johnson',
    title: 'Marketing Director',
    tier: 'VIP',
    avatar: 'SJ',
    location: 'Austin, TX',
    memberSince: 'March 2024',
    focus: ['Brand strategy', 'Paid acquisition', 'Team building'],
    bio: 'Runs marketing for a 40 person software company and hosts the quarterly member panel on positioning.',
    mutual: 6
  },
  {
    name: 'Michael Chen',
    title: 'Entrepreneur',
    tier: 'Premium',
    avatar: 'MC',
    location: 'Seattle, WA',
    memberSince: 'August 2024',
    focus: ['Bootstrapping', 'Pricing', 'Product launches'],
    bio: 'Built and sold two service businesses. Currently working on a subscription product and sharing the build in the community.',
    mutual: 4
  },
  {
    name: 'Emily Davis',
    title: 'Business Coach',
    tier: 'Premium',
    avatar: 'ED',
    location: 'Chicago, IL',
    memberSince: 'January 2025',
    focus: ['Coaching', 'Operations', 'Hiring'],
    bio: 'Coaches owner-operators through their first ten hires. Leads the monthly accountability circle for Premium members.',
    mutual: 3
  },
  {
    name: 'David Wilson',
    title: 'CEO',
    tier: 'VIP',
    avatar: 'DW',
    location: 'Denver, CO',
    memberSince: 'May 2023',
    focus: ['Scaling', 'Fundraising', 'Partnerships'],
    bio: 'Founding VIP member. Opens his network for introductions and runs the quarterly VIP roundtable on scaling past 7 figures.',
    mutual: 9
  },
  {
    name: 'Nina Alvarez',
    title: 'Operations Lead',
    tier: 'Premium',
    avatar: 'NA',
    location: 'Miami, FL',
    memberSince: 'June 2025',
    focus: ['Systems', 'Automation', 'Vendor management'],
    bio: 'Documents every process she builds and shares the templates in the member resource library.',
    mutual: 2
  },
  {
    name: 'Owen Brooks',
    title: 'Freelance Designer',
    tier: 'Basic',
    avatar: 'OB',
    location: 'Portland, OR',
    memberSince: 'February 2026',
    focus: ['Brand identity', 'Web design', 'Portfolio reviews'],
    bio: 'Newer member working through the content library. Offers portfolio feedback swaps in the community forum.',
    mutual: 1
  }
]

interface Badge {
  name: string
  detail: string
  earned: boolean
}

const badges: Badge[] = [
  { name: 'First Login', detail: 'Signed in and completed your profile', earned: true },
  { name: 'Course Starter', detail: 'Opened your first video course', earned: true },
  { name: 'Halfway There', detail: 'Reached 50% on any course', earned: true },
  { name: 'Event Attendee', detail: 'Attended your first live event', earned: true },
  { name: 'Networker', detail: 'Made 10 member connections', earned: true },
  { name: 'Bookworm', detail: 'Downloaded 5 PDF guides', earned: true },
  { name: 'Early Bird', detail: 'RSVP the day an event opened', earned: true },
  { name: 'Contributor', detail: 'Posted 25 times in the community', earned: true },
  { name: 'Mentor', detail: 'Answered 10 member questions', earned: true },
  { name: 'Streak Keeper', detail: 'Logged in 30 days in a row', earned: true },
  { name: 'Webinar Regular', detail: 'Joined 5 live webinars', earned: true },
  { name: 'Anniversary', detail: 'Completed one year of membership', earned: true },
  { name: 'Course Finisher', detail: 'Complete every lesson in one course', earned: false },
  { name: 'Super Connector', detail: 'Make 50 member connections', earned: false },
  { name: 'Roundtable Guest', detail: 'Join a VIP roundtable session', earned: false },
  { name: 'Library Master', detail: 'Complete every course in the library', earned: false }
]

const contactTopics = ['Membership question', 'Billing question', 'Upgrade help', 'Events and community', 'Something else']

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [hydrated, setHydrated] = useState(false)

  const [currentTier, setCurrentTier] = useState<MembershipTier>('premium')
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({})
  const [connections, setConnections] = useState<Record<string, boolean>>({})
  const [autoRenew, setAutoRenew] = useState(true)
  const [progress, setProgress] = useState<Record<string, number>>({ c1: 50, c2: 25, c3: 0, c4: 0 })

  const [messages, setMessages] = useState<Record<string, boolean>>({})

  const [planModal, setPlanModal] = useState<MembershipTier | null>(null)
  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [viewerId, setViewerId] = useState<string | null>(null)
  const [cancelModal, setCancelModal] = useState(false)
  const [badgesOpen, setBadgesOpen] = useState(false)
  const [profileName, setProfileName] = useState<string | null>(null)
  const [messageDraft, setMessageDraft] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [directorySearch, setDirectorySearch] = useState('')

  const [contactForm, setContactForm] = useState({ name: 'John Doe', email: '', topic: contactTopics[0], message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  useEffect(() => {
    try {
      const t = localStorage.getItem(LS.tier)
      if (t === 'basic' || t === 'premium' || t === 'vip') setCurrentTier(t)
      const r = localStorage.getItem(LS.rsvps)
      if (r) setRsvps(JSON.parse(r))
      const c = localStorage.getItem(LS.connections)
      if (c) setConnections(JSON.parse(c))
      const a = localStorage.getItem(LS.autoRenew)
      if (a !== null) setAutoRenew(a === '1')
      const p = localStorage.getItem(LS.progress)
      if (p) setProgress(prev => ({ ...prev, ...JSON.parse(p) }))
      const m = localStorage.getItem(LS.messages)
      if (m) setMessages(JSON.parse(m))
    } catch {
      // Ignore storage failures -- demo falls back to defaults
    }
    setHydrated(true)
  }, [])

  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.tier, currentTier) } catch {} }, [currentTier, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.rsvps, JSON.stringify(rsvps)) } catch {} }, [rsvps, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.connections, JSON.stringify(connections)) } catch {} }, [connections, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.autoRenew, autoRenew ? '1' : '0') } catch {} }, [autoRenew, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.progress, JSON.stringify(progress)) } catch {} }, [progress, hydrated])
  useEffect(() => { if (hydrated) try { localStorage.setItem(LS.messages, JSON.stringify(messages)) } catch {} }, [messages, hydrated])

  const membershipTiers: { key: MembershipTier; name: string; price: string; period: string; features: string[]; color: string; popular?: boolean }[] = [
    {
      key: 'basic',
      name: 'Basic',
      price: '$29',
      period: 'month',
      features: ['Access to community', 'Monthly newsletter', 'Basic resources', 'Member directory'],
      color: colors.textLight
    },
    {
      key: 'premium',
      name: 'Premium',
      price: '$79',
      period: 'month',
      features: ['Everything in Basic', 'Exclusive content library', 'Priority support', 'Monthly webinars', 'Networking events'],
      color: colors.primary,
      popular: true
    },
    {
      key: 'vip',
      name: 'VIP',
      price: '$199',
      period: 'month',
      features: ['Everything in Premium', '1-on-1 coaching sessions', 'VIP events', 'Early access to new features', 'Custom dashboard'],
      color: colors.accent
    }
  ]

  const sentCount = Object.values(connections).filter(Boolean).length
  const rsvpCount = Object.values(rsvps).filter(Boolean).length
  const earnedBadges = badges.filter(badge => badge.earned).length
  const openProfile = (name: string) => {
    setMessageDraft('')
    setMessageSent(false)
    setProfileName(name)
  }
  const benefits = [
    {
      icon: BookOpen,
      title: 'Content Library',
      description: '150+ resources accessed',
      progress: 65,
      cta: 'Browse the library',
      action: () => setActiveTab('content')
    },
    {
      icon: Users,
      title: 'Network',
      description: `${23 + sentCount} connections made`,
      progress: Math.min(45 + sentCount * 5, 100),
      cta: 'Open member directory',
      action: () => setActiveTab('directory')
    },
    {
      icon: Calendar,
      title: 'Events',
      description: `${8 + rsvpCount} events attended`,
      progress: Math.min(80 + rsvpCount * 5, 100),
      cta: 'See upcoming events',
      action: () => setActiveTab('events')
    },
    {
      icon: Award,
      title: 'Achievements',
      description: `${earnedBadges} badges earned`,
      progress: Math.round((earnedBadges / badges.length) * 100),
      cta: 'View your badges',
      action: () => setBadgesOpen(true)
    }
  ]

  const filteredDirectory = directoryMembers.filter(member => {
    const query = directorySearch.trim().toLowerCase()
    if (!query) return true
    return `${member.name} ${member.title} ${member.tier} ${member.location} ${member.focus.join(' ')}`.toLowerCase().includes(query)
  })

  const goToPlans = () => {
    setActiveTab('dashboard')
    setTimeout(() => {
      document.getElementById('membership-tiers')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const isLocked = (item: ContentItem) => TIER_RANK[currentTier] < TIER_RANK[item.minTier]

  const openPlanModal = (tier: MembershipTier) => {
    setPlanConfirmed(false)
    setPlanModal(tier)
  }

  const confirmPlan = () => {
    if (planModal) {
      setCurrentTier(planModal)
      setPlanConfirmed(true)
    }
  }

  const handleRsvp = (event: (typeof upcomingEvents)[number]) => {
    if (event.vipOnly && currentTier !== 'vip') {
      openPlanModal('vip')
      return
    }
    setRsvps(prev => ({ ...prev, [event.id]: !prev[event.id] }))
  }

  const toggleConnection = (name: string) => {
    setConnections(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const toggleLesson = (item: ContentItem, lessonIndex: number) => {
    const total = item.lessons.length
    const lessonPct = Math.round(((lessonIndex + 1) / total) * 100)
    const complete = (progress[item.id] || 0) >= lessonPct
    const next = complete ? Math.round((lessonIndex / total) * 100) : lessonPct
    setProgress(prev => ({ ...prev, [item.id]: next }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: demo.name,
          demoPackage: demo.package,
          demoSlug: demo.slug,
          clientName: contactForm.name,
          clientPhone: '',
          clientEmail: contactForm.email,
          service: contactForm.topic,
          preferredDate: '',
          preferredTime: '',
          notes: contactForm.message
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', { form_name: 'demo_membership_contact_form', demo_slug: demo.slug })
        trackConversion('leadForm')
        setContactSubmitted(true)
      }
    } catch {
      // Network/API failure -- no-op, form stays visible so the user can retry
    }
  }

  const viewerItem = viewerId ? exclusiveContent.find(c => c.id === viewerId) : null
  const planTier = planModal ? membershipTiers.find(t => t.key === planModal) : null
  const profileMember = profileName ? directoryMembers.find(m => m.name === profileName) : null

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundAlt }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.primary }}>
                JD
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: colors.text }}>John Doe</h1>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-sm font-semibold" style={{ color: colors.primary }}>{TIER_LABEL[currentTier]} Member</span>
                </div>
              </div>
            </div>
            {currentTier !== 'vip' ? (
              <button
                onClick={() => openPlanModal('vip')}
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Upgrade to VIP
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('benefits')}
                className="px-4 py-2 rounded-lg font-medium border hover:bg-gray-50 transition-colors flex items-center gap-2"
                style={{ borderColor: colors.border, color: colors.primary }}
              >
                <Crown className="w-4 h-4" style={{ color: colors.accent }} />
                Manage Membership
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8 overflow-x-auto">
            {['dashboard', 'content', 'events', 'directory', 'benefits'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'border-b-2' : ''
                }`}
                style={{
                  color: activeTab === tab ? colors.primary : colors.textLight,
                  borderColor: activeTab === tab ? colors.primary : 'transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Benefits Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <button
                    key={index}
                    onClick={benefit.action}
                    className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: colors.text }}>{benefit.title}</h3>
                    <p className="text-sm mb-3" style={{ color: colors.textLight }}>{benefit.description}</p>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${benefit.progress}%`, backgroundColor: colors.primary }} />
                    </div>
                    <p className="text-xs mt-3 font-semibold flex items-center gap-1" style={{ color: colors.primary }}>
                      {benefit.cta}
                      <ChevronRight className="w-3 h-3" />
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Content */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Continue Learning</h2>
                <div className="space-y-4">
                  {exclusiveContent.slice(0, 3).map(item => {
                    const locked = isLocked(item)
                    const pct = progress[item.id] || 0
                    return (
                      <div key={item.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm mb-2" style={{ color: colors.textLight }}>
                              <span>{item.type}</span>
                              <span>{item.length}</span>
                              {!locked && <span className="font-semibold" style={{ color: colors.primary }}>{pct}% complete</span>}
                            </div>
                            {!locked && (
                              <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                                <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors.primary }} />
                              </div>
                            )}
                          </div>
                          {locked ? (
                            <button
                              onClick={() => openPlanModal(item.minTier)}
                              className="px-4 py-2 rounded-lg font-medium border hover:bg-gray-50 transition-colors flex items-center gap-2"
                              style={{ borderColor: colors.border, color: colors.primary }}
                            >
                              <Lock className="w-4 h-4" />
                              Upgrade
                            </button>
                          ) : (
                            <button
                              onClick={() => setViewerId(item.id)}
                              className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: colors.primary }}
                            >
                              {pct > 0 ? 'Resume' : 'Start'}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 2).map(event => {
                    const registered = !!rsvps[event.id]
                    return (
                      <div key={event.id} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                        <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{event.name}</h3>
                        <p className="text-sm mb-1" style={{ color: colors.textLight }}>{event.date}</p>
                        <p className="text-sm mb-3" style={{ color: colors.textLight }}>{event.time}</p>
                        {registered && (
                          <p className="text-sm mb-2 font-semibold flex items-center gap-1" style={{ color: colors.success }}>
                            <Check className="w-4 h-4" />
                            You are registered
                          </p>
                        )}
                        <button
                          onClick={() => handleRsvp(event)}
                          className="w-full py-2 rounded-lg border font-medium hover:bg-white transition-colors"
                          style={{ borderColor: colors.border, color: registered ? colors.textLight : colors.primary }}
                        >
                          {registered ? 'Cancel RSVP' : 'RSVP'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div id="membership-tiers" className="bg-white rounded-xl shadow-lg p-6 scroll-mt-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Membership Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {membershipTiers.map(tier => (
                  <div key={tier.key} className={`rounded-xl p-6 border-2 flex flex-col ${tier.popular ? 'shadow-lg' : ''}`} style={{
                    borderColor: tier.popular ? colors.primary : colors.border,
                    backgroundColor: tier.popular ? colors.backgroundAlt : 'white'
                  }}>
                    {tier.popular && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4" style={{ color: colors.accent }} fill={colors.accent} />
                        <span className="text-sm font-bold" style={{ color: colors.primary }}>Most Popular</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold" style={{ color: tier.color }}>{tier.price}</span>
                      <span className="text-lg" style={{ color: colors.textLight }}>/{tier.period}</span>
                    </div>
                    <ul className="space-y-3 flex-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                          <span className="text-sm" style={{ color: colors.text }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.key === currentTier ? (
                      <div className="w-full mt-6 py-3 rounded-lg border-2 font-semibold text-center flex items-center justify-center gap-2" style={{ borderColor: colors.success, color: colors.success }}>
                        <Check className="w-5 h-5" />
                        Current Plan
                      </div>
                    ) : (
                      <button
                        onClick={() => openPlanModal(tier.key)}
                        className="w-full mt-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Switch to {tier.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact the Membership Team */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Questions About Your Membership?</h2>
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>Send the membership team a message and they will get back to you within one business day.</p>
              {contactSubmitted ? (
                <div className="p-8 text-center rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.success + '20' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: colors.success }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Message Sent</h3>
                  <p className="mb-4" style={{ color: colors.textLight }}>Thanks for reaching out. The membership team will reply to {contactForm.email || 'your email'} shortly.</p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false)
                      setContactForm(prev => ({ ...prev, message: '' }))
                    }}
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="membership-contact-name" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Full Name *</label>
                    <input
                      id="membership-contact-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.border }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="membership-contact-email" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Email Address *</label>
                    <input
                      id="membership-contact-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.border }}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="membership-contact-topic" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Topic *</label>
                    <select
                      id="membership-contact-topic"
                      required
                      value={contactForm.topic}
                      onChange={e => setContactForm(prev => ({ ...prev, topic: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 bg-white"
                      style={{ borderColor: colors.border }}
                    >
                      {contactTopics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="membership-contact-message" className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>Message *</label>
                    <textarea
                      id="membership-contact-message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                      style={{ borderColor: colors.border }}
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Exclusive Content Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exclusiveContent.map(item => {
                const locked = isLocked(item)
                const pct = progress[item.id] || 0
                return (
                  <div key={item.id} className="p-6 rounded-xl border-2" style={{ borderColor: colors.border, opacity: locked ? 0.85 : 1 }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                          <span>{item.type}</span>
                          <span>{item.length}</span>
                        </div>
                      </div>
                      {locked && <Lock className="w-6 h-6" style={{ color: colors.textLight }} />}
                    </div>
                    {!locked && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span style={{ color: colors.textLight }}>Progress</span>
                          <span className="font-semibold" style={{ color: colors.primary }}>{pct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                          <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors.primary }} />
                        </div>
                      </div>
                    )}
                    {locked ? (
                      <button
                        onClick={() => openPlanModal(item.minTier)}
                        className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Lock className="w-4 h-4" />
                        Upgrade to {TIER_LABEL[item.minTier]} to Access
                      </button>
                    ) : (
                      <button
                        onClick={() => setViewerId(item.id)}
                        className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <PlayCircle className="w-5 h-5" />
                        {pct > 0 ? (pct >= 100 ? 'Review Again' : 'Continue Learning') : 'Start Learning'}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => {
                const registered = !!rsvps[event.id]
                const needsVip = event.vipOnly && currentTier !== 'vip'
                return (
                  <div key={event.id} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-xl" style={{ color: colors.text }}>{event.name}</h3>
                          {event.vipOnly && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: colors.accent }}>
                              VIP ONLY
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-6 text-sm mb-2 flex-wrap" style={{ color: colors.textLight }}>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span>{event.time}</span>
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {event.attendees + (registered ? 1 : 0)} attending
                          </span>
                        </div>
                        {registered && (
                          <p className="text-sm font-semibold flex items-center gap-1" style={{ color: colors.success }}>
                            <Check className="w-4 h-4" />
                            You are registered for this event
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRsvp(event)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 ${registered ? 'border' : 'text-white'}`}
                        style={registered
                          ? { borderColor: colors.border, color: colors.textLight, backgroundColor: 'white' }
                          : { backgroundColor: needsVip ? colors.accent : colors.primary }}
                      >
                        {registered ? 'Cancel RSVP' : needsVip ? 'Upgrade to RSVP' : 'RSVP'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Member Directory</h2>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  {filteredDirectory.length} of {directoryMembers.length} members shown, {sentCount} connection request{sentCount === 1 ? '' : 's'} sent
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textLight }} />
                <input
                  type="text"
                  id="membership-directory-search"
                  aria-label="Search the member directory"
                  placeholder="Search name, role, or focus..."
                  value={directorySearch}
                  onChange={e => setDirectorySearch(e.target.value)}
                  className="pl-10 pr-9 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full sm:w-72"
                  style={{ borderColor: colors.border }}
                />
                {directorySearch && (
                  <button
                    onClick={() => setDirectorySearch('')}
                    aria-label="Clear directory search"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" style={{ color: colors.textLight }} />
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDirectory.map((member, index) => {
                const requested = !!connections[member.name]
                return (
                  <div key={index} className="p-6 rounded-xl border text-center hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                    <button onClick={() => openProfile(member.name)} className="w-full" aria-label={`View profile for ${member.name}`}>
                      <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.secondary }}>
                        {member.avatar}
                      </div>
                      <h3 className="font-bold mb-1 hover:underline" style={{ color: colors.text }}>{member.name}</h3>
                      <p className="text-sm mb-1" style={{ color: colors.textLight }}>{member.title}</p>
                      <p className="text-xs mb-3 flex items-center justify-center gap-1" style={{ color: colors.textLight }}>
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </p>
                    </button>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{
                      backgroundColor: member.tier === 'VIP' ? colors.accent + '20' : colors.primary + '20',
                      color: member.tier === 'VIP' ? colors.accent : colors.primary
                    }}>
                      {member.tier}
                    </span>
                    <button
                      onClick={() => toggleConnection(member.name)}
                      className="w-full mt-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      style={{ borderColor: requested ? colors.success : colors.border, color: requested ? colors.success : colors.primary }}
                    >
                      {requested && <Check className="w-4 h-4" />}
                      {requested ? 'Request Sent' : 'Connect'}
                    </button>
                    <button
                      onClick={() => openProfile(member.name)}
                      className="w-full mt-2 py-2 rounded-lg font-medium text-sm hover:underline"
                      style={{ color: colors.primary }}
                    >
                      View Profile
                    </button>
                  </div>
                )
              })}
              {filteredDirectory.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="mb-3" style={{ color: colors.textLight }}>No members match &quot;{directorySearch}&quot;.</p>
                  <button
                    onClick={() => setDirectorySearch('')}
                    className="font-semibold hover:underline"
                    style={{ color: colors.primary }}
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Your Benefits Tracker</h2>
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>Select any benefit to jump straight to it.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <button
                      key={index}
                      onClick={benefit.action}
                      className="p-6 rounded-xl text-left hover:shadow-md transition-shadow"
                      style={{ backgroundColor: colors.backgroundAlt }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                          <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold" style={{ color: colors.text }}>{benefit.title}</h3>
                          <p className="text-sm" style={{ color: colors.textLight }}>{benefit.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div className="w-full h-3 rounded-full" style={{ backgroundColor: 'white' }}>
                        <div className="h-3 rounded-full transition-all" style={{ width: `${benefit.progress}%`, backgroundColor: colors.primary }} />
                      </div>
                      <p className="text-sm mt-2 text-right font-semibold" style={{ color: colors.primary }}>{benefit.progress}% utilized</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Renewal Management</h2>
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{TIER_LABEL[currentTier]} Membership</h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {autoRenew ? 'Renews on: September 15, 2026' : 'Access ends: September 15, 2026 (auto-renew is off)'}
                    </p>
                  </div>
                  {autoRenew ? (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-yellow-100 text-yellow-800">
                      Auto-Renew Off
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {autoRenew ? (
                    <button
                      onClick={() => setCancelModal(true)}
                      className="flex-1 py-3 rounded-lg border font-semibold hover:bg-white transition-colors"
                      style={{ borderColor: colors.border, color: colors.text }}
                    >
                      Cancel Auto-Renew
                    </button>
                  ) : (
                    <button
                      onClick={() => setAutoRenew(true)}
                      className="flex-1 py-3 rounded-lg border-2 font-semibold hover:bg-white transition-colors"
                      style={{ borderColor: colors.success, color: colors.success }}
                    >
                      Turn Auto-Renew Back On
                    </button>
                  )}
                  {currentTier !== 'vip' ? (
                    <button
                      onClick={() => openPlanModal('vip')}
                      className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Upgrade to VIP
                    </button>
                  ) : (
                    <button
                      onClick={goToPlans}
                      className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Compare All Plans
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan Switch Modal */}
      {planModal && planTier && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setPlanModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {planConfirmed ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors.success + '20' }}>
                  <CheckCircle className="w-10 h-10" style={{ color: colors.success }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Welcome to {planTier.name}!</h3>
                <p className="mb-2" style={{ color: colors.textLight }}>
                  Your membership is now on the {planTier.name} plan. Your new benefits are unlocked immediately.
                </p>
                <p className="text-xs mb-6" style={{ color: colors.textLight }}>
                  This is a simulated checkout for the demo. No payment was processed.
                </p>
                <button
                  onClick={() => setPlanModal(null)}
                  className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
                  <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                    <Crown className="w-5 h-5" style={{ color: colors.accent }} />
                    Switch to {planTier.name}
                  </h3>
                  <button
                    onClick={() => setPlanModal(null)}
                    aria-label="Close"
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ color: planTier.color }}>{planTier.price}</span>
                    <span className="text-lg" style={{ color: colors.textLight }}>/{planTier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {planTier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                        <span className="text-sm" style={{ color: colors.text }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg mb-6 text-sm" style={{ backgroundColor: colors.backgroundAlt, color: colors.textLight }}>
                    Confirming switches your plan instantly in this demo. No payment is collected.
                  </div>
                  <button
                    onClick={confirmPlan}
                    className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Confirm {planTier.name} Plan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content Viewer Modal */}
      {viewerItem && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setViewerId(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>{viewerItem.title}</h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{viewerItem.type} | {viewerItem.length}</p>
              </div>
              <button
                onClick={() => setViewerId(null)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold" style={{ color: colors.text }}>Your Progress</span>
                  <span className="font-bold" style={{ color: colors.primary }}>{progress[viewerItem.id] || 0}%</span>
                </div>
                <div className="w-full h-3 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                  <div className="h-3 rounded-full transition-all" style={{ width: `${progress[viewerItem.id] || 0}%`, backgroundColor: colors.primary }} />
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: colors.textLight }}>
                Tap a {viewerItem.type === 'PDF Guide' ? 'chapter' : 'lesson'} to mark it complete. Your progress is saved automatically.
              </p>
              <div className="space-y-3">
                {viewerItem.lessons.map((lesson, idx) => {
                  const lessonPct = Math.round(((idx + 1) / viewerItem.lessons.length) * 100)
                  const complete = (progress[viewerItem.id] || 0) >= lessonPct
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleLesson(viewerItem, idx)}
                      className="w-full p-4 rounded-lg border text-left flex items-center gap-3 hover:shadow-sm transition-shadow"
                      style={{ borderColor: complete ? colors.success : colors.border, backgroundColor: complete ? colors.success + '10' : 'white' }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                        style={{ backgroundColor: complete ? colors.success : colors.backgroundAlt, color: complete ? 'white' : colors.textLight }}
                      >
                        {complete ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className="font-medium text-sm" style={{ color: colors.text }}>{lesson}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="p-5 border-t" style={{ borderColor: colors.border }}>
              <button
                onClick={() => setViewerId(null)}
                className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {(progress[viewerItem.id] || 0) >= 100 ? 'Finished -- Close' : 'Save and Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badges Modal */}
      {badgesOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setBadgesOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.text }}>
                  <Award className="w-5 h-5" style={{ color: colors.accent }} />
                  Your Achievements
                </h3>
                <p className="text-sm" style={{ color: colors.textLight }}>{earnedBadges} of {badges.length} badges earned</p>
              </div>
              <button
                onClick={() => setBadgesOpen(false)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border flex items-start gap-3"
                    style={{
                      borderColor: badge.earned ? colors.success : colors.border,
                      backgroundColor: badge.earned ? colors.success + '10' : 'white',
                      opacity: badge.earned ? 1 : 0.75
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: badge.earned ? colors.success : colors.backgroundAlt }}
                    >
                      {badge.earned
                        ? <Check className="w-4 h-4 text-white" />
                        : <Lock className="w-4 h-4" style={{ color: colors.textLight }} />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: colors.text }}>{badge.name}</p>
                      <p className="text-xs" style={{ color: colors.textLight }}>{badge.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: colors.border }}>
              <button
                onClick={() => {
                  setBadgesOpen(false)
                  setActiveTab('content')
                }}
                className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                Earn the next badge
              </button>
              <button
                onClick={() => setBadgesOpen(false)}
                className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member Profile Modal */}
      {profileMember && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setProfileName(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[88vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: colors.secondary }}>
                  {profileMember.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>{profileMember.name}</h3>
                  <p className="text-sm" style={{ color: colors.textLight }}>{profileMember.title}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold" style={{
                    backgroundColor: profileMember.tier === 'VIP' ? colors.accent + '20' : colors.primary + '20',
                    color: profileMember.tier === 'VIP' ? colors.accent : colors.primary
                  }}>
                    {profileMember.tier} member
                  </span>
                </div>
              </div>
              <button
                onClick={() => setProfileName(null)}
                aria-label="Close"
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              <p className="text-sm" style={{ color: colors.textLight }}>{profileMember.bio}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Location</p>
                  <p className="font-bold text-sm" style={{ color: colors.text }}>{profileMember.location}</p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Member since</p>
                  <p className="font-bold text-sm" style={{ color: colors.text }}>{profileMember.memberSince}</p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <p className="text-xs" style={{ color: colors.textLight }}>Mutual</p>
                  <p className="font-bold text-sm" style={{ color: colors.text }}>{profileMember.mutual}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: colors.text }}>Focus areas</p>
                <div className="flex flex-wrap gap-2">
                  {profileMember.focus.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {messageSent || messages[profileMember.name] ? (
                <div className="p-4 rounded-xl text-center" style={{ backgroundColor: colors.backgroundAlt }}>
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: colors.success }} />
                  <p className="font-semibold" style={{ color: colors.text }}>Message delivered</p>
                  <p className="text-sm mb-3" style={{ color: colors.textLight }}>
                    {profileMember.name.split(' ')[0]} will see it in their member inbox and can reply there.
                  </p>
                  <button
                    onClick={() => {
                      setMessages(prev => {
                        const next = { ...prev }
                        delete next[profileMember.name]
                        return next
                      })
                      setMessageSent(false)
                      setMessageDraft('')
                    }}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: colors.primary }}
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    setMessages(prev => ({ ...prev, [profileMember.name]: true }))
                    setMessageSent(true)
                  }}
                >
                  <label htmlFor="membership-member-message" className="block text-sm font-bold mb-2" style={{ color: colors.text }}>
                    Send a message
                  </label>
                  <textarea
                    id="membership-member-message"
                    required
                    rows={3}
                    value={messageDraft}
                    onChange={e => setMessageDraft(e.target.value)}
                    placeholder={`Hi ${profileMember.name.split(' ')[0]}, I saw your profile in the directory and...`}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none text-sm"
                    style={{ borderColor: colors.border }}
                  />
                  <button
                    type="submit"
                    className="w-full mt-3 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
            <div className="p-5 border-t" style={{ borderColor: colors.border }}>
              <button
                onClick={() => toggleConnection(profileMember.name)}
                className="w-full py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: connections[profileMember.name] ? colors.success : colors.border,
                  color: connections[profileMember.name] ? colors.success : colors.primary
                }}
              >
                {connections[profileMember.name] && <Check className="w-4 h-4" />}
                {connections[profileMember.name] ? 'Connection Request Sent' : `Connect with ${profileMember.name.split(' ')[0]}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Auto-Renew Modal */}
      {cancelModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setCancelModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>Turn off auto-renew?</h3>
              <p className="text-sm mb-6" style={{ color: colors.textLight }}>
                Your {TIER_LABEL[currentTier]} membership stays active until September 15, 2026. After that it will not renew.
                You can turn auto-renew back on anytime before then.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setCancelModal(false)}
                  className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primary }}
                >
                  Keep Auto-Renew
                </button>
                <button
                  onClick={() => {
                    setAutoRenew(false)
                    setCancelModal(false)
                  }}
                  className="flex-1 py-3 rounded-lg border font-semibold hover:bg-gray-50 transition-colors"
                  style={{ borderColor: colors.border, color: colors.error }}
                >
                  Turn Off Auto-Renew
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
