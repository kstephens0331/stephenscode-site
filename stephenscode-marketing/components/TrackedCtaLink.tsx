'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'

interface TrackedCtaLinkProps {
  href: string
  cta: string
  location: string
  className?: string
  children: ReactNode
}

export default function TrackedCtaLink({ href, cta, location, className, children }: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent('cta_click', { cta, location })}
    >
      {children}
    </Link>
  )
}
