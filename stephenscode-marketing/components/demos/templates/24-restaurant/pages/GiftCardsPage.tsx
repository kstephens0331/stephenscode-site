'use client'

import type { ColorPalette } from '@/lib/demo-colors'

interface GiftCardsPageProps {
  colors: ColorPalette
}

export default function GiftCardsPage({ colors }: GiftCardsPageProps) {
  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Gift Cards
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-black mb-6">
            Share the Gourmet Experience
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Give the gift of exceptional Italian dining - perfect for any occasion
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black mb-6">
                Purchase Gift Card
              </h2>
              <form className="space-y-6">
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-4">Select Amount</label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {['$25', '$50', '$75', '$100'].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        style={{ backgroundColor: '#ffffff', border: '3px solid #9b2226', color: '#1a1a1a' }}
                        className="py-4 font-black text-xl hover:bg-red-900 hover:text-white transition"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label style={{ color: '#666666' }} className="block text-sm mb-2">Or enter custom amount</label>
                    <div className="flex items-center">
                      <span style={{ color: '#1a1a1a' }} className="text-2xl font-bold mr-3">$</span>
                      <input
                        type="number"
                        min="10"
                        max="500"
                        placeholder="Enter amount"
                        style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                        className="flex-1 px-4 py-3"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Delivery Method</label>
                  <div className="space-y-3">
                    <label style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input type="radio" name="delivery" value="email" className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">Email Delivery (Instant)</div>
                        <div style={{ color: '#666666' }} className="text-sm">Delivered within minutes to recipient's inbox</div>
                      </div>
                    </label>
                    <label style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input type="radio" name="delivery" value="physical" className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">Physical Card (Mail)</div>
                        <div style={{ color: '#666666' }} className="text-sm">Beautiful gift card mailed in presentation box (3-5 business days)</div>
                      </div>
                    </label>
                    <label style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input type="radio" name="delivery" value="pickup" className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">In-Store Pickup</div>
                        <div style={{ color: '#666666' }} className="text-sm">Pick up at restaurant within 2 hours</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Recipient Email</label>
                  <input
                    type="email"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Recipient Name</label>
                  <input
                    type="text"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Personal Message (Optional)</label>
                  <textarea
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-24"
                    placeholder="Add a personal note..."
                  />
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Purchase Gift Card
                </button>
              </form>
            </div>

            <div>
              <div style={{ backgroundColor: '#ee9b00' }} className="p-8 mb-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-4">
                  Why Choose Our Gift Cards?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold">Never Expires</div>
                      <div style={{ color: '#333333' }} className="text-sm">No expiration dates or hidden fees</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold">Use Anywhere</div>
                      <div style={{ color: '#333333' }} className="text-sm">Valid for dine-in, takeout, delivery, and catering</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold">Easy Balance Check</div>
                      <div style={{ color: '#333333' }} className="text-sm">Check balance online anytime</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div style={{ color: '#1a1a1a' }} className="font-bold">Reloadable</div>
                      <div style={{ color: '#333333' }} className="text-sm">Add funds to existing cards</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f8f8' }} className="p-8 mb-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-black mb-4">
                  Perfect For:
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Birthdays',
                    'Anniversaries',
                    'Weddings',
                    'Graduations',
                    'Thank You Gifts',
                    'Corporate Gifts',
                    'Holidays',
                    'Just Because'
                  ].map((occasion) => (
                    <div key={occasion} style={{ backgroundColor: '#ffffff' }} className="p-3 text-center">
                      <span style={{ color: '#1a1a1a' }} className="font-bold text-sm">{occasion}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#9b2226', color: '#ffffff' }} className="p-8">
                <h3 className="text-2xl font-black mb-4">
                  Bulk Gift Cards
                </h3>
                <p className="mb-4">
                  Need 10 or more gift cards? We offer special pricing for corporate orders, holiday gifts,
                  and employee rewards programs.
                </p>
                <button
                  style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
                  className="px-6 py-3 font-bold hover:opacity-90 transition"
                >
                  Contact Us About Bulk Orders
                </button>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-black text-center mb-8">
              Check Gift Card Balance
            </h2>
            <form className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter gift card number"
                  style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                  className="flex-1 px-4 py-3"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="px-8 py-3 font-bold hover:opacity-90 transition"
                >
                  Check Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
