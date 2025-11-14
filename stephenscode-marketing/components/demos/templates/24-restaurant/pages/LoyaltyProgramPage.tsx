'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface LoyaltyProgramPageProps {
  colors: ColorPalette
}

export default function LoyaltyProgramPage({ colors }: LoyaltyProgramPageProps) {
  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            VIP Rewards Program
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Gourmet Kitchen Rewards
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Earn points with every purchase and unlock exclusive perks and rewards
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black mb-6">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  1️⃣
                </div>
                <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Sign Up Free</h3>
                <p style={{ color: '#666666' }} className="text-sm">
                  Join online or in-restaurant. No fees ever.
                </p>
              </div>
              <div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  2️⃣
                </div>
                <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Earn Points</h3>
                <p style={{ color: '#666666' }} className="text-sm">
                  Get 1 point per $1 spent on food and drinks.
                </p>
              </div>
              <div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  3️⃣
                </div>
                <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Unlock Rewards</h3>
                <p style={{ color: '#666666' }} className="text-sm">
                  Redeem points for discounts and free items.
                </p>
              </div>
              <div>
                <div style={{ backgroundColor: '#f8f8f8' }} className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  4️⃣
                </div>
                <h3 style={{ color: '#1a1a1a' }} className="font-bold mb-2">Enjoy Perks</h3>
                <p style={{ color: '#666666' }} className="text-sm">
                  Birthday rewards, early access, and more.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-4xl font-black text-center mb-12">
              Membership Tiers
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🥉</div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-2">Bronze</h3>
                  <div style={{ color: '#666666' }} className="text-sm">$0 - $499 annual spend</div>
                </div>
                <div className="space-y-3">
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Earn 1 point per $1</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Birthday dessert</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Exclusive member offers</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Free WiFi access</span>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8', border: '3px solid #ee9b00' }} className="p-8 transform scale-105">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🥈</div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-2">Silver</h3>
                  <div style={{ color: '#666666' }} className="text-sm">$500 - $999 annual spend</div>
                </div>
                <div className="space-y-3">
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Earn 1.25 points per $1</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>All Bronze benefits</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Priority reservations</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>15% off catering orders</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Complimentary appetizer monthly</span>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8', border: '2px solid #e5e5e5' }} className="p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🥇</div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-2">Gold</h3>
                  <div style={{ color: '#666666' }} className="text-sm">$1,000+ annual spend</div>
                </div>
                <div className="space-y-3">
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Earn 1.5 points per $1</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>All Silver benefits</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>VIP table reserved on request</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>20% off catering orders</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Exclusive chef's table events</span>
                  </div>
                  <div style={{ color: '#333333' }} className="flex items-start gap-2 text-sm">
                    <span style={{ color: '#ee9b00' }}>✓</span>
                    <span>Annual anniversary dinner (free)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8f8f8' }} className="p-12 mb-16">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black text-center mb-8">
              Rewards Redemption
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">Free Appetizer</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">100 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Choose any appetizer from our menu</p>
              </div>
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">Free Dessert</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">75 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Any dessert on the house</p>
              </div>
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">$10 Off Order</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">200 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Discount on any dine-in or takeout order</p>
              </div>
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">$25 Off Order</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">450 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Bigger discount for loyal members</p>
              </div>
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">Free Pasta Night</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">300 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Complimentary pasta dish of your choice</p>
              </div>
              <div style={{ backgroundColor: '#ffffff' }} className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 style={{ color: '#1a1a1a' }} className="text-xl font-bold">Wine Tasting for 2</h3>
                  <div style={{ color: '#9b2226' }} className="font-black">600 pts</div>
                </div>
                <p style={{ color: '#666666' }} className="text-sm">Exclusive wine tasting with sommelier</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ee9b00' }} className="p-12 text-center">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-6">
              Join Today and Get 50 Bonus Points
            </h2>
            <p style={{ color: '#333333' }} className="text-lg mb-8">
              Sign up now and start earning rewards on your next visit
            </p>
            <form className="max-w-2xl mx-auto space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  style={{ backgroundColor: '#ffffff', border: '2px solid #9b2226', color: '#1a1a1a' }}
                  className="px-4 py-3 w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  style={{ backgroundColor: '#ffffff', border: '2px solid #9b2226', color: '#1a1a1a' }}
                  className="px-4 py-3 w-full"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                style={{ backgroundColor: '#ffffff', border: '2px solid #9b2226', color: '#1a1a1a' }}
                className="px-4 py-3 w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                style={{ backgroundColor: '#ffffff', border: '2px solid #9b2226', color: '#1a1a1a' }}
                className="px-4 py-3 w-full"
              />
              <input
                type="date"
                placeholder="Birthday (for special rewards)"
                style={{ backgroundColor: '#ffffff', border: '2px solid #9b2226', color: '#1a1a1a' }}
                className="px-4 py-3 w-full"
              />
              <button
                type="submit"
                style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
              >
                Join Rewards Program
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
