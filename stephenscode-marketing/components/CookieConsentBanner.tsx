'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getStoredConsent, setStoredConsent, type ConsentValue } from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
  }, [])

  // Publish the banner height as --consent-offset so fixed bottom elements
  // (FloatingContactButton) can ride above the banner instead of being buried.
  useEffect(() => {
    const el = bannerRef.current
    if (!visible || !el) {
      document.documentElement.style.removeProperty('--consent-offset')
      return
    }
    const set = () =>
      document.documentElement.style.setProperty('--consent-offset', `${el.offsetHeight}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => {
      ro.disconnect()
      document.documentElement.style.removeProperty('--consent-offset')
    }
  }, [visible])

  if (!visible) return null

  const choose = (value: ConsentValue) => {
    setStoredConsent(value)
    setVisible(false)
  }

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-surface-border bg-surface-card/95 backdrop-blur supports-[backdrop-filter]:bg-surface-card/80 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4">
        <p className="text-sm leading-6 text-gray-300">
          This site uses cookies for analytics to help us understand how visitors use it. See our{' '}
          <Link href="/privacy" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          for details.
        </p>
        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-surface-border px-5 py-2 text-sm font-semibold text-gray-300 hover:bg-surface-elevated hover:text-white transition-colors sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
