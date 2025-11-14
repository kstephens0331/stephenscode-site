'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell, Calendar, Users, Award, MapPin, BookOpen, UserPlus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  basePath: string;
}

export default function Layout({ children, currentPage, basePath }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: `${basePath}`, icon: Dumbbell },
    { name: 'Classes', href: `${basePath}/classes`, icon: Users },
    { name: 'Training', href: `${basePath}/training`, icon: Award },
    { name: 'Membership', href: `${basePath}/membership`, icon: UserPlus },
    { name: 'Schedule', href: `${basePath}/schedule`, icon: Calendar },
    { name: 'Amenities', href: `${basePath}/amenities`, icon: MapPin },
    { name: 'Success Stories', href: `${basePath}/success-stories`, icon: Award },
    { name: 'Blog', href: `${basePath}/blog`, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={basePath} className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] p-2.5 rounded-lg group-hover:scale-105 transition-transform">
                <Dumbbell className="h-7 w-7 text-[#fdf0d5]" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-zinc-50">
                  IRON TEMPLE
                </div>
                <div className="text-xs text-[#c1121f] font-semibold tracking-wider">
                  FITNESS
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) => {
                const isActive = currentPage === item.name.toLowerCase().replace(/ /g, '-');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#c1121f] text-zinc-50'
                        : 'text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href={`${basePath}/join`}
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/20 transition-all hover:scale-105"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-zinc-800">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.name.toLowerCase().replace(/ /g, '-');
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#c1121f] text-zinc-50'
                          : 'text-zinc-300 hover:text-zinc-50 hover:bg-zinc-800'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <Link
                  href={`${basePath}/join`}
                  className="flex items-center justify-center px-4 py-3 mt-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] p-2 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-[#fdf0d5]" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-lg font-bold text-zinc-50">IRON TEMPLE</div>
                  <div className="text-xs text-[#c1121f] font-semibold">FITNESS</div>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Transform your body and mind at Iron Temple Fitness. State-of-the-art equipment,
                expert trainers, and a community dedicated to helping you achieve your fitness goals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-zinc-50 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`${basePath}/classes`} className="text-zinc-400 hover:text-[#c1121f] transition-colors">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/training`} className="text-zinc-400 hover:text-[#c1121f] transition-colors">
                    Personal Training
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/membership`} className="text-zinc-400 hover:text-[#c1121f] transition-colors">
                    Membership Plans
                  </Link>
                </li>
                <li>
                  <Link href={`${basePath}/schedule`} className="text-zinc-400 hover:text-[#c1121f] transition-colors">
                    Schedule
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-zinc-50 font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>123 Strength Street</li>
                <li>Fitness City, FC 12345</li>
                <li className="pt-2">
                  <a href="tel:555-123-4567" className="hover:text-[#c1121f] transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li>
                  <a href="mailto:info@irontemple.fit" className="hover:text-[#c1121f] transition-colors">
                    info@irontemple.fit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-500">
            <p>&copy; 2024 Iron Temple Fitness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
