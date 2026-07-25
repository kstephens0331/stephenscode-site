import Script from 'next/script'
import { headers } from 'next/headers'

const GA_MEASUREMENT_ID = 'G-JE84EH0H09'

export default async function GoogleAnalytics() {
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  // Global Privacy Control: browsers/extensions send this on every request
  // when the visitor has opted out of sale/sharing of personal information.
  if (headersList.get('sec-gpc') === '1') {
    return null
  }

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
