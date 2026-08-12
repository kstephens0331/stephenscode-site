'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { trackEvent } from '@/lib/analytics'

interface DropdownProps {
  label: string
  items: { name: string; href: string; external?: boolean }[]
  isActive?: boolean
}

function Dropdown({ label, items, isActive }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setOpen(prev => !prev)
        break
      case 'Escape':
        setOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) {
          setOpen(true)
        } else {
          itemRefs.current[0]?.focus()
        }
        break
    }
  }, [open])

  const handleItemKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        itemRefs.current[index + 1]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index === 0) {
          containerRef.current?.querySelector('button')?.focus()
        } else {
          itemRefs.current[index - 1]?.focus()
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        containerRef.current?.querySelector('button')?.focus()
        break
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`nav-link flex items-center gap-1 text-base font-medium transition-colors duration-200 ease-brand hover:text-white ${isActive ? 'text-white' : 'text-gray-300'}`}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ease-brand ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 w-48 z-50" role="menu" aria-label={label}>
          <div className="bg-surface-elevated rounded-lg shadow-xl border border-surface-border py-2 animate-dropdown">
            {items.map((item, index) => (
              item.external ? (
                <a
                  key={item.name}
                  ref={el => { itemRefs.current[index] = el }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-surface-border hover:text-primary-400 transition-colors duration-150"
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  ref={el => { itemRefs.current[index] = el as HTMLAnchorElement | null }}
                  href={item.href}
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-surface-border hover:text-primary-400 transition-colors duration-150"
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const loginRef = useRef<HTMLDivElement>(null)
  const loginTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const servicesItems = [
    { name: 'Web Development', href: '/services' },
    { name: 'IT Services', href: '/msp' },
    { name: 'Support Portal', href: 'https://psa.stephenscode.dev', external: true },
  ]

  const aboutItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ]

  const navLinkClass = (href: string) =>
    `nav-link text-base font-medium transition-colors duration-200 ease-brand hover:text-white ${
      pathname === href ? 'text-white' : 'text-gray-300'
    }`

  const servicesActive = pathname.startsWith('/services') || pathname === '/msp'
  const aboutActive = ['/about', '/blog'].some((p) => pathname.startsWith(p))

  // Close login dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false)
      }
    }
    if (loginOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [loginOpen])

  // Lock body scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="bg-surface/85 backdrop-blur-xl border-b border-surface-border/60 sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5 text-xl font-semibold text-white" aria-label="StephensCode home">
                <Image
                  src="/logo-mark.png"
                  alt="StephensCode"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                  priority
                />
                <span className="tracking-tight">StephensCode</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <Dropdown label="Services" items={servicesItems} isActive={servicesActive} />
              <Link
                href="/work"
                className={navLinkClass('/work')}
                aria-current={pathname === '/work' ? 'page' : undefined}
              >
                Work
              </Link>
              <Link
                href="/pricing"
                className={navLinkClass('/pricing')}
                aria-current={pathname === '/pricing' ? 'page' : undefined}
              >
                Pricing
              </Link>
              <Link
                href="/demos"
                className={navLinkClass('/demos')}
                aria-current={pathname === '/demos' ? 'page' : undefined}
              >
                Demos
              </Link>
              <a
                href="https://sacvpn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 ease-brand"
              >
                SACVPN
              </a>
              <Link
                href="/service-areas"
                className={navLinkClass('/service-areas')}
                aria-current={pathname === '/service-areas' ? 'page' : undefined}
              >
                Service Areas
              </Link>
              <Dropdown label="About" items={aboutItems} isActive={aboutActive} />
              <Link
                href="/contact"
                className={navLinkClass('/contact')}
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                aria-label="Get started, request a free quote"
                className="ml-4 btn-primary px-4 py-2 text-sm"
                onClick={() => trackEvent('cta_click', { cta: 'Get Started', location: 'header_desktop' })}
              >
                Get Started
              </Link>

              {/* Login Dropdown */}
              <div
                ref={loginRef}
                className="relative ml-2"
                onMouseEnter={() => {
                  if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current)
                  setLoginOpen(true)
                }}
                onMouseLeave={() => {
                  loginTimeoutRef.current = setTimeout(() => setLoginOpen(false), 150)
                }}
              >
                <button
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  onClick={() => setLoginOpen(!loginOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLoginOpen(prev => !prev) }
                    if (e.key === 'Escape') setLoginOpen(false)
                    if (e.key === 'ArrowDown') { e.preventDefault(); setLoginOpen(true) }
                  }}
                  aria-expanded={loginOpen}
                  aria-haspopup="true"
                >
                  Login
                  <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
                </button>
                {loginOpen && (
                  <div className="absolute right-0 top-full pt-2 w-40 z-50" role="menu" aria-label="Login options">
                    <div className="bg-surface-elevated rounded-lg shadow-xl border border-surface-border py-2 animate-dropdown">
                      <a
                        href="https://customer.stephenscode.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-surface-border hover:text-primary-400 transition-colors duration-150"
                        onKeyDown={(e) => { if (e.key === 'Escape') { setLoginOpen(false) } }}
                      >
                        Customer Portal
                      </a>
                      <a
                        href="https://admin.stephenscode.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-surface-border hover:text-primary-400 transition-colors duration-150"
                        onKeyDown={(e) => { if (e.key === 'Escape') { setLoginOpen(false) } }}
                      >
                        Admin Login
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
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
        </nav>
      </header>

      {/* Mobile menu -- rendered as a sibling of <header>, NOT inside it: the
          header's backdrop-blur-xl makes it a containing block for fixed
          descendants, which would break the fixed overlay positioning. */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop -- header stays clickable above it at z-50 */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel. 69px = header py-4 (32px) + h-9 logo (36px) + 1px border;
              this offset must track the header height if it ever changes. */}
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[69px] z-40 max-h-[calc(100dvh-69px)] overflow-y-auto overscroll-contain border-b border-surface-border bg-surface/95 backdrop-blur-xl animate-menu-panel"
          >
            <nav aria-label="Mobile" className="menu-stagger space-y-1 px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {/* Services Section */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                >
                  Services
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ease-brand ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {servicesOpen && (
                  <div className="pl-4 space-y-1">
                    {servicesItems.map((item) => (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-3 text-sm text-gray-400 hover:bg-surface-card rounded-lg transition-colors duration-150"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-3 text-sm text-gray-400 hover:bg-surface-card rounded-lg transition-colors duration-150"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/work"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
              <a
                href="https://sacvpn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                SACVPN
              </a>
              <Link
                href="/pricing"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/demos"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demos
              </Link>
              <Link
                href="/service-areas"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Service Areas
              </Link>

              {/* About Section */}
              <div>
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  aria-expanded={aboutOpen}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                >
                  About
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ease-brand ${aboutOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {aboutOpen && (
                  <div className="pl-4 space-y-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-3 text-sm text-gray-400 hover:bg-surface-card rounded-lg transition-colors duration-150"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="mt-2 btn-primary w-full px-4 py-3 text-base"
                onClick={() => {
                  trackEvent('cta_click', { cta: 'Get Started', location: 'header_mobile' })
                  setMobileMenuOpen(false)
                }}
              >
                Get Started
              </Link>

              {/* Login Links */}
              <div className="border-t border-surface-border mt-3 pt-3">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Login</p>
                <a
                  href="https://customer.stephenscode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Customer Portal
                </a>
                <a
                  href="https://admin.stephenscode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 text-base font-medium text-gray-300 hover:bg-surface-card rounded-lg transition-colors duration-150"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
