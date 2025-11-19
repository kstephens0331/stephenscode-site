import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Fix multiple lockfiles warning
  outputFileTracingRoot: path.join(__dirname, '../'),
}

export default nextConfig
