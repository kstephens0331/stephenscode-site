import type { Metadata } from 'next'
import Link from 'next/link'
import PhoneLink from '@/components/PhoneLink'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist or may have moved. Browse StephensCode's services, pricing, or service areas instead.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  const links = [
    { href: '/services', label: 'Services', desc: 'Custom websites, e-commerce, and business automation' },
    { href: '/pricing', label: 'Pricing', desc: 'Seven flat-rate tiers from $250 to $7,500+' },
    { href: '/work', label: 'Our Work', desc: 'Real projects built for real businesses' },
    { href: '/demos', label: 'Live Demos', desc: '40+ interactive demos you can click through' },
  ]
  return (
    <div className="bg-surface texture-grain">
      <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">404</p>
        <h1 className="mt-4 text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">This page doesn't exist.</h1>
        <p className="mt-6 text-lg leading-8 text-gray-400">The link is broken or the page has moved. Everything below is real and working.</p>
        <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="card-lift rounded-2xl border-2 border-surface-border bg-surface-card p-6 shadow-card">
              <p className="font-bold text-white">{l.label}</p>
              <p className="mt-1 text-sm text-gray-400">{l.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/" className="inline-block rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-700">Back to the homepage</Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Looking for something specific? Call{' '}
          <PhoneLink location="not_found" className="link-underline text-gray-300">(936) 323-4527</PhoneLink>
          {' '}or email <a href="mailto:info@stephenscode.dev" className="link-underline text-gray-300">info@stephenscode.dev</a>.
        </p>
      </div>
    </div>
  )
}
