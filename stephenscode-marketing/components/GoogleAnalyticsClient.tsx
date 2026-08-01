'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getStoredConsent, COOKIE_CONSENT_EVENT, type ConsentValue } from '@/lib/cookie-consent'

const GA_MEASUREMENT_ID = 'G-JE84EH0H09'

export default function GoogleAnalyticsClient({ nonce }: { nonce: string }) {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
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
        nonce={nonce}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        nonce={nonce}
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
    </>
  )
}
