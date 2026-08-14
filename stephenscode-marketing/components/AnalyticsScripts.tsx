'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getStoredConsent, COOKIE_CONSENT_EVENT, type ConsentValue } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = 'G-JE84EH0H09'
const GOOGLE_ADS_ID = 'AW-18347728218'
const AHREFS_KEY = 'FWknMXQC00ZmslHU5xYYhQ'

/**
 * Analytics with Google Consent Mode v2.
 *
 * Two privacy gates, one measurement model:
 *
 * 1. Global Privacy Control -- if the browser signals GPC, nothing here loads
 *    at all, regardless of any stored banner choice. GPC always wins.
 * 2. Cookie consent (banner, lib/cookie-consent.ts) -- gtag.js loads for every
 *    non-GPC visitor, but with consent DEFAULTED TO DENIED before config runs.
 *    In that state Google sets no cookies and receives only anonymous,
 *    cookieless pings (which it uses for modeled reporting). Only after the
 *    visitor clicks Accept does a consent update to 'granted' enable cookies.
 *    Decline keeps the denied default: still zero cookies, matching the
 *    banner's promise, without losing all measurement signal.
 *
 * Ahrefs has no consent-mode equivalent, so it stays hard-gated on Accept.
 *
 * The Google Ads container is config'd alongside GA4 so conversion events
 * (lib/analytics.ts trackConversion) attribute correctly instead of firing
 * into an unconfigured send_to target.
 */

function applyConsentUpdate(value: ConsentValue, attempt = 0) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: value,
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
    })
  } else if (attempt < 10) {
    // gtag.js injects afterInteractive; if the visitor answers the banner
    // before the stub exists, retry briefly rather than dropping the update.
    setTimeout(() => applyConsentUpdate(value, attempt + 1), 300)
  }
}

export default function AnalyticsScripts() {
  const [gpcAllowed, setGpcAllowed] = useState<boolean | null>(null)
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) {
      setGpcAllowed(false)
      return
    }
    setGpcAllowed(true)

    if (getStoredConsent() === 'granted') {
      setGranted(true)
      applyConsentUpdate('granted')
    }

    function handleConsentChange(event: Event) {
      const value = (event as CustomEvent<ConsentValue>).detail
      setGranted(value === 'granted')
      applyConsentUpdate(value)
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
  }, [])

  if (gpcAllowed !== true) return null

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
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${GOOGLE_ADS_ID}');
          `,
        }}
      />
      {granted && (
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="afterInteractive"
        />
      )}
    </>
  )
}
