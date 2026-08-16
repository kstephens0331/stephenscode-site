'use client'

import { useState } from 'react'
import type { ColorPalette } from '@/lib/demo-colors'
import { Gift, CheckCircle } from 'lucide-react'

interface GiftsPageProps {
  colors: ColorPalette
  onNavigate: (page: string) => void
}

export default function GiftsPage({ colors, onNavigate }: GiftsPageProps) {
  const amounts = [50, 100, 150, 250, 500, 1000]

  const [amount, setAmount] = useState<number | null>(null)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [purchased, setPurchased] = useState<null | { code: string; amount: number; recipient: string }>(null)

  const handlePurchase = () => {
    if (!amount) {
      setError('Please select a gift certificate amount.')
      return
    }
    if (!recipientEmail.trim() || !recipientEmail.includes('@')) {
      setError('Please enter a valid recipient email address.')
      return
    }
    setError('')
    const code = `SPA-GIFT-${Math.floor(10000 + Math.random() * 90000)}`
    try {
      const stored = window.localStorage.getItem('spa-demo-gifts')
      const gifts = stored ? JSON.parse(stored) : []
      gifts.push({ code, amount, recipient: recipientEmail, message, date: new Date().toISOString().split('T')[0] })
      window.localStorage.setItem('spa-demo-gifts', JSON.stringify(gifts))
    } catch {
      // localStorage unavailable -- confirmation still shows
    }
    setPurchased({ code, amount, recipient: recipientEmail })
  }

  const resetForm = () => {
    setPurchased(null)
    setAmount(null)
    setRecipientEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.backgroundAlt }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif" style={{ color: colors.text }}>Gift Certificates</h1>
        <div className="bg-white rounded-lg shadow-xl p-8">
          {purchased ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
              <h2 className="text-2xl font-bold mb-2 font-serif" style={{ color: colors.text }}>Gift Certificate Purchased</h2>
              <p className="mb-6" style={{ color: colors.textLight }}>
                A ${purchased.amount} digital gift certificate is on its way to {purchased.recipient}.
              </p>
              <div className="rounded-lg p-6 max-w-md mx-auto mb-6 border-2 border-dashed" style={{ borderColor: colors.primary, backgroundColor: colors.backgroundAlt }}>
                <Gift className="w-10 h-10 mx-auto mb-3" style={{ color: colors.primary }} />
                <div className="text-sm mb-1" style={{ color: colors.textLight }}>Certificate Code</div>
                <div className="text-2xl font-bold tracking-wider" style={{ color: colors.primary }}>{purchased.code}</div>
                <div className="text-3xl font-bold mt-3" style={{ color: colors.text }}>${purchased.amount}</div>
              </div>
              <p className="text-xs mb-6" style={{ color: colors.textLight }}>
                Demo purchase: no payment was charged.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={resetForm}
                  className="px-8 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Purchase Another
                </button>
                <button
                  onClick={() => onNavigate('portal')}
                  className="px-8 py-3 rounded-lg font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  View in Member Portal
                </button>
                <button
                  onClick={() => onNavigate('book')}
                  className="px-8 py-3 rounded-lg font-semibold border-2"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Book a Treatment
                </button>
              </div>
            </div>
          ) : (
            <>
              <Gift className="w-16 h-16 mx-auto mb-6" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-bold mb-6 text-center font-serif" style={{ color: colors.text }}>Purchase Digital Gift Certificate</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>Select Amount</label>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map(amt => (
                      <button
                        key={amt}
                        onClick={() => { setAmount(amt); setError('') }}
                        className="p-4 rounded-lg border-2 transition-all"
                        style={{
                          borderColor: amount === amt ? colors.primary : colors.border,
                          backgroundColor: amount === amt ? `${colors.primary}15` : 'transparent',
                          color: amount === amt ? colors.primary : colors.text,
                          fontWeight: amount === amt ? 700 : 400
                        }}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="spa-gift-recipient-email" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Recipient Email</label>
                  <input
                    id="spa-gift-recipient-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@email.com"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label htmlFor="spa-gift-message" className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Personal Message</label>
                  <textarea
                    id="spa-gift-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a note for the recipient (optional)"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                {error && <p className="text-sm font-medium" style={{ color: colors.error }}>{error}</p>}
                <button
                  onClick={handlePurchase}
                  className="w-full py-4 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Purchase Gift Certificate{amount ? `: $${amount}` : ''}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
