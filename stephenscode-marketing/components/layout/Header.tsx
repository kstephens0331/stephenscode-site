'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface DropdownProps {
  label: string
  items: { name: string; href: string; external?: boolean }[]
}

function Dropdown({ label, items }: DropdownProps) {
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
        className="flex items-center gap-1 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 w-48 z-50" role="menu" aria-label={label}>
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
            {items.map((item, index) => (
              item.external ? (
                <a
                  key={item.name}
                  ref={el => { itemRefs.current[index] = el }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
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
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
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

  const servicesItems = [
    { name: 'Web Development', href: '/services' },
    { name: 'IT Services', href: '/msp' },
    { name: 'Support Portal', href: 'https://psa.stephenscode.dev', external: true },
  ]

  const aboutItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Work', href: '/work' },
    { name: 'Blog', href: '/blog' },
  ]

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-900">
              <Image
                src="/images/favicon-512.png"
                alt="StephensCode Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
              />
              <span>StephensCode</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Dropdown label="Services" items={servicesItems} />
            <a
              href="https://sacvpn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              SACVPN
            </a>
            <Link href="/pricing" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="/demos" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Demos
            </Link>
            <Dropdown label="About" items={aboutItems} />
            <Link href="/contact" className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center rounded-md bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600 transition-colors"
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
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
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
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    <a
                      href="https://customer.stephenscode.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      onKeyDown={(e) => { if (e.key === 'Escape') { setLoginOpen(false) } }}
                    >
                      Customer Portal
                    </a>
                    <a
                      href="https://admin.stephenscode.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600"
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
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
            <div className="space-y-1">
              {/* Services Section */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Services
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
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
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              <a
                href="https://sacvpn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                SACVPN
              </a>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/demos"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demos
              </Link>

              {/* About Section */}
              <div>
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  aria-expanded={aboutOpen}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  About
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {aboutOpen && (
                  <div className="pl-4 space-y-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
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
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg bg-accent-500 px-3 py-2 text-base font-medium text-white hover:bg-accent-600 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>

              {/* Login Links */}
              <div className="border-t border-gray-100 mt-3 pt-3">
                <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Login</p>
                <a
                  href="https://customer.stephenscode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Customer Portal
                </a>
                <a
                  href="https://admin.stephenscode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
