'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Web Dev', href: '/services' },
    { name: 'IT Services', href: '/msp' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Demos', href: '/demos' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-900">
              <div className="w-8 h-8 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/favicon-512.png"
                  alt="StephensCode Logo"
                  width="32"
                  height="32"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to orange S if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-accent-500 rounded-lg flex items-center justify-center"><span class="text-white text-lg font-bold">S</span></div>';
                  }}
                />
              </div>
              <span>StephensCode</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block rounded-lg bg-accent-500 px-3 py-2 text-base font-medium text-white hover:bg-accent-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
