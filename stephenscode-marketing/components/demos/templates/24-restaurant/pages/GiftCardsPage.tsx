'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { trackEvent, trackConversion } from '@/lib/analytics'

interface GiftCardsPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function GiftCardsPage({ colors, onNavigate }: GiftCardsPageProps) {
  const [amount, setAmount] = useState('')
  const [delivery, setDelivery] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [message, setMessage] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [balanceCardNumber, setBalanceCardNumber] = useState('')
  const [balanceResult, setBalanceResult] = useState('')
  const [balanceError, setBalanceError] = useState('')

  const handleBalanceCheck = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = balanceCardNumber.replace(/\D/g, '')
    if (digits.length < 6) {
      setBalanceResult('')
      setBalanceError('Please enter a valid gift card number (at least 6 digits).')
      return
    }
    // Deterministic demo balance derived from the card number
    let hash = 0
    for (const ch of digits) {
      hash = (hash * 31 + ch.charCodeAt(0)) % 100000
    }
    const dollars = 15 + (hash % 14) * 10
    const cents = hash % 2 === 0 ? '00' : '50'
    setBalanceError('')
    setBalanceResult(`$${dollars}.${cents}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demoName: 'Gourmet Kitchen Restaurant',
          demoPackage: 'Premium Build ($2,000)',
          demoSlug: 'gourmet-kitchen-restaurant',
          clientName: buyerName,
          clientPhone: '',
          clientEmail: buyerEmail,
          service: 'Gift Card Purchase',
          preferredDate: '',
          preferredTime: '',
          notes: `Amount: ${amount || 'N/A'}. Delivery: ${delivery || 'N/A'}. Recipient: ${recipientName || 'N/A'} (${recipientEmail || 'N/A'}). Message: ${message}`.trim()
        })
      })

      if (response.ok) {
        trackEvent('generate_lead', {
          form_name: 'gift_card_purchase_form',
          demo_slug: 'gourmet-kitchen-restaurant',
        })
        trackConversion('leadForm')
        setSubmitted(true)
      } else {
        setSubmitError('There was an issue processing your gift card order. Please email info@gourmetkitchen.com.')
      }
    } catch {
      setSubmitError('There was an issue processing your gift card order. Please email info@gourmetkitchen.com.')
    }
  }

  return (
    <div>
      <section style={{ backgroundColor: '#9b2226' }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div style={{ color: '#ee9b00' }} className="text-sm font-bold uppercase tracking-widest mb-3">
            Gift Cards
          </div>
          <h1 style={{ color: '#ffffff' }} className="text-6xl font-bold mb-6">
            Share the Gourmet Experience
          </h1>
          <p style={{ color: '#f5f5f5' }} className="text-xl">
            Give the gift of exceptional Italian dining, perfect for any occasion
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
              <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold mb-6">
                Purchase Gift Card
              </h2>
              {submitted ? (
                <div style={{ backgroundColor: '#ffffff', border: '3px solid #22c55e' }} className="p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-2">Order Received!</h3>
                  <p style={{ color: '#666666' }}>
                    We'll follow up to confirm your gift card order shortly.
                  </p>
                </div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-4">Select Amount</label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {['$25', '$50', '$75', '$100'].map((presetAmount) => (
                      <button
                        key={presetAmount}
                        type="button"
                        onClick={() => setAmount(presetAmount)}
                        style={{
                          backgroundColor: amount === presetAmount ? '#9b2226' : '#ffffff',
                          border: '3px solid #9b2226',
                          color: amount === presetAmount ? '#ffffff' : '#1a1a1a'
                        }}
                        className="py-4 font-bold text-xl hover:bg-red-900 hover:text-white transition"
                      >
                        {presetAmount}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="restaurant-gift-custom-amount" style={{ color: '#666666' }} className="block text-sm mb-2">Or enter custom amount</label>
                    <div className="flex items-center">
                      <span style={{ color: '#1a1a1a' }} className="text-2xl font-bold mr-3">$</span>
                      <input
                        id="restaurant-gift-custom-amount"
                        type="number"
                        min="10"
                        max="500"
                        placeholder="Enter amount"
                        value={amount.replace('$', '')}
                        onChange={(e) => setAmount(e.target.value ? `$${e.target.value}` : '')}
                        style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                        className="flex-1 px-4 py-3"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Delivery Method</label>
                  <div className="space-y-3">
                    <label htmlFor="restaurant-gift-delivery-email" style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input id="restaurant-gift-delivery-email" type="radio" name="delivery" value="email" checked={delivery === 'email'} onChange={(e) => setDelivery(e.target.value)} className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">Email Delivery (Instant)</div>
                        <div style={{ color: '#666666' }} className="text-sm">Delivered within minutes to recipient's inbox</div>
                      </div>
                    </label>
                    <label htmlFor="restaurant-gift-delivery-physical" style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input id="restaurant-gift-delivery-physical" type="radio" name="delivery" value="physical" checked={delivery === 'physical'} onChange={(e) => setDelivery(e.target.value)} className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">Physical Card (Mail)</div>
                        <div style={{ color: '#666666' }} className="text-sm">Beautiful gift card mailed in presentation box (3-5 business days)</div>
                      </div>
                    </label>
                    <label htmlFor="restaurant-gift-delivery-pickup" style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5' }} className="flex items-center p-4 cursor-pointer">
                      <input id="restaurant-gift-delivery-pickup" type="radio" name="delivery" value="pickup" checked={delivery === 'pickup'} onChange={(e) => setDelivery(e.target.value)} className="mr-3" />
                      <div>
                        <div style={{ color: '#1a1a1a' }} className="font-bold">In-Store Pickup</div>
                        <div style={{ color: '#666666' }} className="text-sm">Pick up at restaurant within 2 hours</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="restaurant-gift-recipient-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Recipient Email</label>
                  <input
                    id="restaurant-gift-recipient-email"
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label htmlFor="restaurant-gift-recipient-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Recipient Name</label>
                  <input
                    id="restaurant-gift-recipient-name"
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label htmlFor="restaurant-gift-message" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Personal Message (Optional)</label>
                  <textarea
                    id="restaurant-gift-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3 h-24"
                    placeholder="Add a personal note..."
                  />
                </div>

                <div>
                  <label htmlFor="restaurant-gift-buyer-name" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Your Name</label>
                  <input
                    id="restaurant-gift-buyer-name"
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                <div>
                  <label htmlFor="restaurant-gift-buyer-email" style={{ color: '#1a1a1a' }} className="block font-bold mb-2">Your Email</label>
                  <input
                    id="restaurant-gift-buyer-email"
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #e5e5e5', color: '#1a1a1a' }}
                    className="w-full px-4 py-3"
                  />
                </div>

                {submitError && (
                  <div style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444', color: '#991b1b' }} className="p-4 text-sm font-bold">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  style={{ backgroundColor: '#9b2226', color: '#ffffff' }}
                  className="w-full py-4 font-bold text-lg hover:opacity-90 transition"
                >
                  Purchase Gift Card
                </button>
              </form>
              )}
            </div>

            <div>
              <div style={{ backgroundColor: '#ee9b00' }} className="p-8 mb-8">
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">
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
                <h3 style={{ color: '#1a1a1a' }} className="text-2xl font-bold mb-4">
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
                <h3 className="text-2xl font-bold mb-4">
                  Bulk Gift Cards
                </h3>
                <p className="mb-4">
                  Need 10 or more gift cards? We offer special pricing for corporate orders, holiday gifts,
                  and employee rewards programs.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  style={{ backgroundColor: '#ee9b00', color: '#1a1a1a' }}
                  className="px-6 py-3 font-bold hover:opacity-90 transition"
                >
                  Contact Us About Bulk Orders
                </button>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8f8f8' }} className="p-12">
            <h2 style={{ color: '#1a1a1a' }} className="text-3xl font-bold text-center mb-8">
              Check Gift Card Balance
            </h2>
            <form className="max-w-2xl mx-auto" onSubmit={handleBalanceCheck}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter gift card number"
                  aria-label="Gift card number"
                  value={balanceCardNumber}
                  onChange={(e) => setBalanceCardNumber(e.target.value)}
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
              {balanceError && (
                <p style={{ color: '#991b1b' }} className="mt-4 font-bold text-center">
                  {balanceError}
                </p>
              )}
              {balanceResult && (
                <div style={{ backgroundColor: '#ffffff', border: '3px solid #22c55e' }} className="mt-6 p-6 text-center">
                  <div style={{ color: '#666666' }} className="text-sm font-bold uppercase mb-1">
                    Card ending in {balanceCardNumber.replace(/\D/g, '').slice(-4)}
                  </div>
                  <div style={{ color: '#1a1a1a' }} className="text-4xl font-bold mb-2">{balanceResult}</div>
                  <p style={{ color: '#666666' }} className="text-sm">
                    Available balance (sample lookup for this demo). Valid for dine-in, takeout, delivery, and catering.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
