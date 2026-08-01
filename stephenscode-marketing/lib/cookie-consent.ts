/**
 * Shared client-side cookie-consent state.
 *
 * Consent is stored in localStorage only (never sent to the server) and is
 * used purely to gate whether the Google Analytics script tags are injected
 * into the page. The existing Global Privacy Control (GPC) opt-out check in
 * GoogleAnalytics.tsx runs server-side and independently of this -- if GPC is
 * present, analytics never loads regardless of the value stored here.
 */

export const COOKIE_CONSENT_KEY = 'sc-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'sc-cookie-consent-change'

export type ConsentValue = 'granted' | 'denied'

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    // localStorage can throw in private browsing modes on some browsers.
    return null
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    // If storage is unavailable, still dispatch so the banner/analytics
    // update for this page view even though the choice won't persist.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(COOKIE_CONSENT_EVENT, { detail: value }))
}
