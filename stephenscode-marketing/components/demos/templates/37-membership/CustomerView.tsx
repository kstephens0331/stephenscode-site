'use client'

import { useState } from 'react'
import type { Demo } from '@/lib/demos-data'
import type { ColorPalette } from '@/lib/demo-colors'
import { Crown, Users, BookOpen, Award, Calendar, Lock, Star, CheckCircle } from 'lucide-react'

interface CustomerViewProps {
  demo: Demo
  colors: ColorPalette
}

export default function CustomerView({ demo, colors }: CustomerViewProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const currentTier = 'premium'

  const membershipTiers = [
    {
      name: 'Basic',
      price: '$29',
      period: 'month',
      features: ['Access to community', 'Monthly newsletter', 'Basic resources', 'Member directory'],
      color: colors.textLight
    },
    {
      name: 'Premium',
      price: '$79',
      period: 'month',
      features: ['Everything in Basic', 'Exclusive content library', 'Priority support', 'Monthly webinars', 'Networking events'],
      color: colors.primary,
      popular: true
    },
    {
      name: 'VIP',
      price: '$199',
      period: 'month',
      features: ['Everything in Premium', '1-on-1 coaching sessions', 'VIP events', 'Early access to new features', 'Custom dashboard'],
      color: colors.accent
    }
  ]

  const exclusiveContent = [
    { id: '1', title: 'Advanced Marketing Strategies', type: 'Video Course', duration: '2h 30m', locked: false },
    { id: '2', title: 'Industry Trends Report 2024', type: 'PDF Guide', pages: '45 pages', locked: false },
    { id: '3', title: 'Expert Interview Series', type: 'Video', duration: '1h 15m', locked: false },
    { id: '4', title: 'VIP Masterclass Recording', type: 'Video', duration: '3h', locked: currentTier !== 'vip' },
  ]

  const upcomingEvents = [
    { name: 'Monthly Networking Mixer', date: 'Nov 20, 2024', time: '6:00 PM EST', attendees: 45 },
    { name: 'Expert Webinar: Growth Hacking', date: 'Nov 25, 2024', time: '2:00 PM EST', attendees: 120 },
    { name: 'VIP Roundtable Discussion', date: 'Dec 1, 2024', time: '10:00 AM EST', attendees: 15, vipOnly: true },
  ]

  const members = [
    { name: 'Sarah Johnson', title: 'Marketing Director', tier: 'VIP', avatar: 'SJ' },
    { name: 'Michael Chen', title: 'Entrepreneur', tier: 'Premium', avatar: 'MC' },
    { name: 'Emily Davis', title: 'Business Coach', tier: 'Premium', avatar: 'ED' },
    { name: 'David Wilson', title: 'CEO', tier: 'VIP', avatar: 'DW' },
  ]

  const benefits = [
    { icon: BookOpen, title: 'Content Library', description: '150+ resources accessed', progress: 65 },
    { icon: Users, title: 'Network', description: '23 connections made', progress: 45 },
    { icon: Calendar, title: 'Events', description: '8 events attended', progress: 80 },
    { icon: Award, title: 'Achievements', description: '12 badges earned', progress: 60 },
  ]

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
                  <span className="text-sm font-semibold" style={{ color: colors.primary }}>Premium Member</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
              Upgrade to VIP
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b mb-8" style={{ borderColor: colors.border }}>
          <div className="flex gap-8">
            {['dashboard', 'content', 'events', 'directory', 'benefits'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
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
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: colors.text }}>{benefit.title}</h3>
                    <p className="text-sm mb-3" style={{ color: colors.textLight }}>{benefit.description}</p>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${benefit.progress}%`, backgroundColor: colors.primary }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Content */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Continue Learning</h2>
                <div className="space-y-4">
                  {exclusiveContent.slice(0, 3).map(item => (
                    <div key={item.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                            <span>{item.type}</span>
                            <span>{item.duration || item.pages}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                          Resume
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event, index) => (
                    <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{event.name}</h3>
                      <p className="text-sm mb-1" style={{ color: colors.textLight }}>{event.date}</p>
                      <p className="text-sm mb-3" style={{ color: colors.textLight }}>{event.time}</p>
                      <button className="w-full py-2 rounded-lg border font-medium hover:bg-white transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                        RSVP
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>Membership Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {membershipTiers.map((tier, index) => (
                  <div key={index} className={`rounded-xl p-6 border-2 ${tier.popular ? 'shadow-lg' : ''}`} style={{
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
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                          <span className="text-sm" style={{ color: colors.text }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Exclusive Content Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exclusiveContent.map(item => (
                <div key={item.id} className={`p-6 rounded-xl border-2 ${item.locked ? 'opacity-60' : ''}`} style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm" style={{ color: colors.textLight }}>
                        <span>{item.type}</span>
                        <span>{item.duration || item.pages}</span>
                      </div>
                    </div>
                    {item.locked && <Lock className="w-6 h-6" style={{ color: colors.textLight }} />}
                  </div>
                  <button
                    disabled={item.locked}
                    className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {item.locked ? 'Upgrade to Access' : 'Start Learning'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-6 rounded-xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl" style={{ color: colors.text }}>{event.name}</h3>
                        {event.vipOnly && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: colors.accent }}>
                            VIP ONLY
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm mb-4" style={{ color: colors.textLight }}>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span>{event.time}</span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.attendees} attending
                        </span>
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Member Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member, index) => (
                <div key={index} className="p-6 rounded-xl border text-center hover:shadow-md transition-shadow" style={{ borderColor: colors.border }}>
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: colors.secondary }}>
                    {member.avatar}
                  </div>
                  <h3 className="font-bold mb-1" style={{ color: colors.text }}>{member.name}</h3>
                  <p className="text-sm mb-3" style={{ color: colors.textLight }}>{member.title}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{
                    backgroundColor: member.tier === 'VIP' ? colors.accent + '20' : colors.primary + '20',
                    color: member.tier === 'VIP' ? colors.accent : colors.primary
                  }}>
                    {member.tier}
                  </span>
                  <button className="w-full mt-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border, color: colors.primary }}>
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Your Benefits Tracker</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                          <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold" style={{ color: colors.text }}>{benefit.title}</h3>
                          <p className="text-sm" style={{ color: colors.textLight }}>{benefit.description}</p>
                        </div>
                      </div>
                      <div className="w-full h-3 rounded-full" style={{ backgroundColor: 'white' }}>
                        <div className="h-3 rounded-full transition-all" style={{ width: `${benefit.progress}%`, backgroundColor: colors.primary }} />
                      </div>
                      <p className="text-sm mt-2 text-right font-semibold" style={{ color: colors.primary }}>{benefit.progress}% utilized</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Renewal Management</h2>
              <div className="p-6 rounded-xl" style={{ backgroundColor: colors.backgroundAlt }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.text }}>Premium Membership</h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>Renews on: January 15, 2025</p>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-lg border font-semibold hover:bg-white transition-colors" style={{ borderColor: colors.border, color: colors.text }}>
                    Cancel Auto-Renew
                  </button>
                  <button className="flex-1 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                    Upgrade to VIP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
