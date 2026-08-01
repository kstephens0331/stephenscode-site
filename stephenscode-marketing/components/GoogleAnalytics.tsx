import { headers } from 'next/headers'
import GoogleAnalyticsClient from './GoogleAnalyticsClient'

export default async function GoogleAnalytics() {
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  // Global Privacy Control: browsers/extensions send this on every request
  // when the visitor has opted out of sale/sharing of personal information.
  // This check runs server-side and short-circuits before the client-side
  // cookie-consent check below ever gets a chance to load anything.
  if (headersList.get('sec-gpc') === '1') {
    return null
  }

  // Beyond the GPC check above, script loading is also gated on the
  // visitor's cookie-consent choice (stored client-side in localStorage) --
  // see GoogleAnalyticsClient.tsx and lib/cookie-consent.ts.
  return <GoogleAnalyticsClient nonce={nonce} />
}
