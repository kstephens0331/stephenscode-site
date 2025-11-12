import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Fix multiple lockfiles warning
  outputFileTracingRoot: path.join(__dirname, '../'),

  // Optimize for Vercel deployment
  output: 'standalone',
}

export default nextConfig
