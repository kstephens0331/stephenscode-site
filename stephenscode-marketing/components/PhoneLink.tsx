'use client'

import { trackEvent } from '@/lib/analytics'

interface PhoneLinkProps {
  location: string
  className?: string
  children: React.ReactNode
}

export default function PhoneLink({ location, className, children }: PhoneLinkProps) {
  return (
    <a
      href="tel:+19363234527"
      className={className}
      onClick={() => trackEvent('phone_call_click', { link_location: location })}
    >
      {children}
    </a>
  )
}
