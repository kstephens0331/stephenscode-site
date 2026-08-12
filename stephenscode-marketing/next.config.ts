import type { NextConfig } from 'next'

// Static security headers, served from Vercel's routing layer with zero
// runtime cost. This replaced the old middleware.ts per-request CSP nonce:
// the nonce forced every route to render dynamically while buying no real
// security (the allowlisted googletagmanager/doubleclick hosts plus
// 'unsafe-eval' already made the policy bypassable, and Trusted Types was
// never enforced). With no nonce present, 'unsafe-inline' governs Next's
// inline bootstrap scripts, so nothing breaks. The deprecated
// X-XSS-Protection header is deliberately dropped (ignored by all current
// browsers; OWASP recommends removal).
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.ahrefs.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' https: data: blob:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.google-analytics.com https://stats.g.doubleclick.net https://analytics.ahrefs.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://ad.doubleclick.net https://formspree.io",
  "frame-src 'self' https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: cspHeader },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  experimental: {
    // Workaround for Next 16.1.0 Turbopack panic on cold builds:
    // "Dependency tracking is disabled so invalidation is not allowed"
    // Enabling the filesystem cache makes the dependency tracker active
    // through the build and prevents the panic when caches are absent.
    turbopackFileSystemCacheForBuild: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
