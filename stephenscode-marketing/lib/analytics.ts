declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

const GOOGLE_ADS_CONVERSION_LABELS = {
  leadForm: 'AW-18347728218/2Q50CO2EytYcENq68KxE',
  phoneCall: 'AW-18347728218/1BtNCPCEytYcENq68KxE',
} as const

export function trackConversion(type: keyof typeof GOOGLE_ADS_CONVERSION_LABELS) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_CONVERSION_LABELS[type] })
  }
}
