import type { NextConfig } from 'next'

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
}

export default nextConfig
