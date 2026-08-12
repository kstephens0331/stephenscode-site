'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getStoredConsent, COOKIE_CONSENT_EVENT, type ConsentValue } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = 'G-JE84EH0H09'
const AHREFS_KEY = 'FWknMXQC00ZmslHU5xYYhQ'

/**
 * Consent-gated analytics: Google Analytics + Ahrefs.
 *
 * Nothing renders (and no third-party script loads) until BOTH gates pass:
 * 1. Global Privacy Control -- if the visitor's browser signals GPC, analytics
 *    never loads regardless of any stored consent choice. The check runs
 *    before consent is read, so GPC always wins.
 * 2. Cookie consent -- the visitor must have chosen 'granted' via the banner
 *    (stored client-side in localStorage, see lib/cookie-consent.ts).
 */
export default function AnalyticsScripts() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    // Global Privacy Control: bail before reading consent so a stored
    // 'granted' can never override the browser-level opt-out signal.
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      return
    }

    setGranted(getStoredConsent() === 'granted')

    function handleConsentChange(event: Event) {
      const value = (event as CustomEvent<ConsentValue>).detail
      setGranted(value === 'granted')
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
  }, [])

  if (!granted) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key={AHREFS_KEY}
        strategy="afterInteractive"
      />
    </>
  )
}
