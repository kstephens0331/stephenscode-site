'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getStoredConsent, setStoredConsent, type ConsentValue } from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
  }, [])

  if (!visible) return null

  const choose = (value: ConsentValue) => {
    setStoredConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-surface-border bg-surface-card/95 backdrop-blur supports-[backdrop-filter]:bg-surface-card/80"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4 md:pr-24">
        <p className="text-sm leading-6 text-gray-300">
          This site uses cookies for analytics to help us understand how visitors use it. See our{' '}
          <Link href="/privacy" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-md border border-surface-border px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-surface-elevated hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
