'use client'

import { useEffect, useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Calendar, Award, Package, Gift as GiftIcon } from 'lucide-react'

interface PortalPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

interface Booking {
  id: string
  service: string
  therapist: string
  date: string
  time: string
}

interface Order {
  number: string
  total: number
  date: string
  items: string[]
}

interface PurchasedGift {
  code: string
  amount: number
  recipient: string
  date: string
}

interface Voucher {
  code: string
  label: string
  date: string
}

const BOOKINGS_KEY = 'spa-demo-bookings'
const SEED_FLAG = 'spa-demo-seeded'
const REWARDS_KEY = 'spa-demo-rewards'
const STARTING_POINTS = 850

const REWARD_TIERS = [
  { cost: 500, label: '$25 Spa Credit' },
  { cost: 1000, label: '$50 Spa Credit' },
  { cost: 1500, label: 'Complimentary 60-min Massage' }
]

function futureDate(daysAhead: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  return d.toISOString().split('T')[0]
}

export default function PortalPage({ colors, onNavigate }: PortalPageProps) {
  const [appointments, setAppointments] = useState<Booking[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [gifts, setGifts] = useState<PurchasedGift[]>([])
  const [membership, setMembership] = useState({ plan: 'Premium', note: '2 treatments remaining this month' })
  const [cancelledMsg, setCancelledMsg] = useState('')
  const [points, setPoints] = useState(STARTING_POINTS)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [rewardsLoaded, setRewardsLoaded] = useState(false)
  const [rewardMsg, setRewardMsg] = useState('')

  useEffect(() => {
    try {
      let bookings: Booking[] = []
      const stored = window.localStorage.getItem(BOOKINGS_KEY)
      if (stored) bookings = JSON.parse(stored)

      if (!window.localStorage.getItem(SEED_FLAG)) {
        const seeds: Booking[] = [
          { id: 'SPA-1041', service: 'Swedish Massage (60 min): $120', therapist: 'Sarah Johnson', date: futureDate(5), time: '2:00 PM' },
          { id: 'SPA-1042', service: 'Hydrating Facial (60 min): $130', therapist: 'Emma Williams', date: futureDate(12), time: '10:30 AM' }
        ]
        bookings = [...seeds, ...bookings]
        window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
        window.localStorage.setItem(SEED_FLAG, '1')
      }
      setAppointments(bookings)

      const storedOrders = window.localStorage.getItem('spa-demo-orders')
      if (storedOrders) setOrders(JSON.parse(storedOrders))

      const storedGifts = window.localStorage.getItem('spa-demo-gifts')
      if (storedGifts) setGifts(JSON.parse(storedGifts))

      const storedMembership = window.localStorage.getItem('spa-demo-membership')
      if (storedMembership) {
        const parsed = JSON.parse(storedMembership)
        if (parsed?.plan) setMembership({ plan: parsed.plan, note: `Member since ${parsed.since}` })
      }

      const storedRewards = window.localStorage.getItem(REWARDS_KEY)
      if (storedRewards) {
        const parsed = JSON.parse(storedRewards)
        if (typeof parsed?.points === 'number') setPoints(parsed.points)
        if (Array.isArray(parsed?.vouchers)) setVouchers(parsed.vouchers)
      }
    } catch {
      // localStorage unavailable -- portal shows defaults
    }
    setRewardsLoaded(true)
  }, [])

  useEffect(() => {
    if (!rewardsLoaded) return
    try {
      window.localStorage.setItem(REWARDS_KEY, JSON.stringify({ points, vouchers }))
    } catch {
      // localStorage unavailable -- rewards persist for this session only
    }
  }, [points, vouchers, rewardsLoaded])

  const persistBookings = (next: Booking[]) => {
    setAppointments(next)
    try {
      window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next))
    } catch {
      // localStorage unavailable -- state still updates on screen
    }
  }

  const cancelAppointment = (id: string) => {
    const apt = appointments.find(a => a.id === id)
    persistBookings(appointments.filter(a => a.id !== id))
    if (apt) {
      setCancelledMsg(`Your ${apt.service.split(':')[0].trim()} on ${apt.date} was cancelled.`)
      window.setTimeout(() => setCancelledMsg(''), 4000)
    }
  }

  const rescheduleAppointment = (apt: Booking) => {
    try {
      window.localStorage.setItem('spa-demo-book-prefill', apt.service)
      window.localStorage.setItem('spa-demo-book-therapist', apt.therapist)
      // The original booking is kept until the replacement is confirmed on the
      // booking page, so backing out of a reschedule loses nothing.
      window.localStorage.setItem('spa-demo-reschedule-id', apt.id)
    } catch {
      // localStorage unavailable -- booking page still works without prefill
    }
    onNavigate('book')
  }

  const nextTier = REWARD_TIERS.find(tier => tier.cost > points)

  const redeemReward = (tier: { cost: number; label: string }) => {
    if (points < tier.cost) return
    const code = `SPA-RWD-${Math.floor(10000 + Math.random() * 90000)}`
    setPoints(prev => prev - tier.cost)
    setVouchers(prev => [{ code, label: tier.label, date: new Date().toISOString().split('T')[0] }, ...prev])
    setRewardMsg(`${tier.label} redeemed. Use code ${code} at checkout or at the front desk.`)
    window.setTimeout(() => setRewardMsg(''), 5000)
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold font-serif" style={{ color: colors.text }}>Member Portal</h1>
          <button
            onClick={() => onNavigate('book')}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            Book New Treatment
          </button>
        </div>
        {cancelledMsg && (
          <div className="mb-6 px-4 py-3 rounded-lg font-medium" style={{ backgroundColor: `${colors.success}15`, color: colors.success }}>
            {cancelledMsg}
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Upcoming Appointments</h2>
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textLight }} />
                  <p className="mb-4" style={{ color: colors.textLight }}>No upcoming appointments.</p>
                  <button
                    onClick={() => onNavigate('book')}
                    className="px-6 py-3 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Book a Treatment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold" style={{ color: colors.text }}>{apt.service.split(':')[0].trim()}</h3>
                          <p className="text-sm" style={{ color: colors.textLight }}>with {apt.therapist}</p>
                        </div>
                        <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <p className="text-sm mt-2" style={{ color: colors.textLight }}>{apt.date} at {apt.time}</p>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => rescheduleAppointment(apt)}
                          className="px-4 py-2 rounded-lg text-sm font-semibold border-2"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-4 py-2 rounded-lg text-sm font-semibold border-2"
                          style={{ borderColor: colors.error, color: colors.error }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {orders.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Recent Orders</h2>
                <div className="space-y-4">
                  {orders.slice().reverse().map((order) => (
                    <div key={order.number} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold" style={{ color: colors.text }}>{order.number}</h3>
                          <p className="text-sm" style={{ color: colors.textLight }}>{order.items.join(', ')}</p>
                        </div>
                        <Package className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span style={{ color: colors.textLight }}>Placed {order.date}</span>
                        <span className="font-bold" style={{ color: colors.primary }}>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full mt-4 py-2 rounded-lg text-sm font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Shop Products
                </button>
              </div>
            )}

            {gifts.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: colors.text }}>Gift Certificates You Sent</h2>
                <div className="space-y-4">
                  {gifts.slice().reverse().map((gift) => (
                    <div key={gift.code} className="p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold font-mono" style={{ color: colors.primary }}>{gift.code}</h3>
                          <p className="text-sm truncate" style={{ color: colors.textLight }}>Sent to {gift.recipient}</p>
                        </div>
                        <GiftIcon className="w-6 h-6 shrink-0" style={{ color: colors.primary }} />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span style={{ color: colors.textLight }}>Purchased {gift.date}</span>
                        <span className="font-bold" style={{ color: colors.text }}>${gift.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('gifts')}
                  className="w-full mt-4 py-2 rounded-lg text-sm font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Send Another Gift
                </button>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 font-serif" style={{ color: colors.text }}>Membership Status</h2>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                <Award className="w-12 h-12 mx-auto mb-2" style={{ color: colors.primary }} />
                <div className="font-bold" style={{ color: colors.text }}>{membership.plan} Member</div>
                <div className="text-sm" style={{ color: colors.textLight }}>{membership.note}</div>
              </div>
              <button
                onClick={() => onNavigate('memberships')}
                className="w-full mt-4 py-2 rounded-lg text-sm font-semibold border-2"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                View Plans
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 font-serif" style={{ color: colors.text }}>Rewards Points</h2>
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: colors.primary }}>{points}</div>
                {nextTier ? (
                  <>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {nextTier.cost - points} points to {nextTier.label}
                    </p>
                    <div className="w-full h-2 rounded-full mt-3" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ backgroundColor: colors.primary, width: `${Math.min(100, (points / nextTier.cost) * 100)}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm" style={{ color: colors.textLight }}>Every reward tier unlocked</p>
                )}
                <p className="text-xs mt-2" style={{ color: colors.textLight }}>Earn 1 point per $1 spent on treatments and products</p>
              </div>

              {rewardMsg && (
                <div className="mt-4 px-3 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: `${colors.success}15`, color: colors.success }}>
                  {rewardMsg}
                </div>
              )}

              <div className="mt-5 space-y-3">
                {REWARD_TIERS.map(tier => {
                  const affordable = points >= tier.cost
                  return (
                    <div key={tier.cost} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.backgroundAlt }}>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: colors.text }}>{tier.label}</div>
                        <div className="text-xs" style={{ color: colors.textLight }}>{tier.cost} points</div>
                      </div>
                      <button
                        onClick={() => redeemReward(tier)}
                        disabled={!affordable}
                        className="px-3 py-2 rounded-lg text-xs font-semibold shrink-0 disabled:cursor-not-allowed"
                        style={
                          affordable
                            ? { backgroundColor: colors.primary, color: '#ffffff' }
                            : { backgroundColor: 'transparent', color: colors.textLight, border: `1px solid ${colors.border}` }
                        }
                      >
                        {affordable ? 'Redeem' : `Need ${tier.cost - points}`}
                      </button>
                    </div>
                  )
                })}
              </div>

              {vouchers.length > 0 && (
                <div className="mt-5 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <h3 className="text-sm font-bold mb-3" style={{ color: colors.text }}>Your Rewards</h3>
                  <div className="space-y-2">
                    {vouchers.map(voucher => (
                      <div key={voucher.code} className="p-3 rounded-lg border-2 border-dashed" style={{ borderColor: colors.primary }}>
                        <div className="text-sm font-semibold" style={{ color: colors.text }}>{voucher.label}</div>
                        <div className="font-mono text-sm tracking-wide" style={{ color: colors.primary }}>{voucher.code}</div>
                        <div className="text-xs" style={{ color: colors.textLight }}>Redeemed {voucher.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
