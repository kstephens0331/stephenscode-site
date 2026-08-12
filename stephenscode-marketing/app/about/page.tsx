import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clock, Rocket, Smile, Award, Star, Gem, Handshake,
  DollarSign, MapPin, Zap, ArrowRight,
} from 'lucide-react'
import PhoneLink from '@/components/PhoneLink'
import BracketEyebrow from '@/components/BracketEyebrow'

export const metadata: Metadata = {
  title: 'Veteran Owned Web Developer | About Us | Houston TX',
  description: 'Veteran owned web developer in Conroe, TX. 14+ years building affordable custom websites for small businesses. Call (936) 323-4527.',
  keywords: [
    'veteran owned web developer',
    'Conroe web developer',
    'Houston web development',
    'affordable web design Houston',
    'The Woodlands web developer',
    'small business website Texas',
    'custom website Houston'
  ],
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Veteran Owned Web Developer | About Us | Houston TX',
    description: 'Veteran owned web developer in Conroe TX. 14+ years Houston web development experience. Affordable web design, custom websites for small business.',
    url: 'https://www.stephenscode.dev/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veteran Owned Web Developer | About Us | Houston TX',
    description: 'Veteran owned web developer in Conroe TX. 14+ years Houston web development experience. Affordable web design, custom websites for small business.',
    images: ['/twitter-image'],
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/about',
  },
}

export default function About() {
  const stats = [
    { label: 'Years of Experience', value: '14+', Icon: Clock },
    { label: 'Projects Completed', value: '200+', Icon: Rocket },
    { label: 'Happy Clients', value: '200+', Icon: Smile },
  ]

  const values = [
    {
      name: 'Integrity',
      description: 'We do what we say we\'ll do. No hidden fees, no surprises, no empty promises. Military values guide everything we do.',
      Icon: Award,
    },
    {
      name: 'Excellence',
      description: 'We don\'t cut corners. Every project gets the same attention to detail and commitment to quality, whether it\'s $250 or $7,500.',
      Icon: Star,
    },
    {
      name: 'Transparency',
      description: 'Flat-rate pricing, clear timelines, honest recommendations. You always know where your project stands and what you\'re paying for.',
      Icon: Gem,
    },
    {
      name: 'Service',
      description: 'We serve our clients the way we served our country, with dedication, reliability, and a mission-first mentality.',
      Icon: Handshake,
    },
  ]

  const timeline = [
    {
      year: '2011',
      title: 'Company Founded',
      description: 'Kyle Stephens, U.S. Marine Corps veteran, founded StephensCode to bring honest web development to Houston small businesses.'
    },
    {
      year: '2013',
      title: '50 Projects Milestone',
      description: 'Reached 50 completed projects, serving contractors, restaurants, and service businesses across Houston.'
    },
    {
      year: '2016',
      title: 'Expanded Services',
      description: 'Added e-commerce platforms, admin dashboards, and custom business automation to service offerings.'
    },
    {
      year: '2019',
      title: '100+ Clients',
      description: 'Surpassed 100 satisfied clients, establishing reputation for transparent pricing and quality work.'
    },
    {
      year: '2022',
      title: 'Modern Stack Adoption',
      description: 'Rebuilt the toolchain on Next.js, React, TypeScript, and Firebase. Same flat pricing, faster and more maintainable builds.'
    },
    {
      year: '2025',
      title: 'Full Platform Launch',
      description: 'Launched complete business platform with custom admin dashboards, customer portals, and advanced automation. 200+ projects completed.'
    }
  ]

  return (
    <>
      {/* Entity schema (Person/Organization) is provided sitewide by components/LocalBusinessSchema.tsx */}

      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <BracketEyebrow label="Veteran-Owned & Operated Since 2011" />
            <h1 className="mt-8 text-4xl font-display font-bold tracking-tight text-white sm:text-6xl leading-[1.05]">
              About StephensCode
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              A veteran-owned web development company bringing <span className="font-bold text-accent-400">Marine Corps discipline</span>, technical expertise, and honest service to Houston businesses.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Work With Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface py-16 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex justify-center text-primary-400 group-hover:scale-110 transition-transform">
                  <stat.Icon className="h-12 w-12" strokeWidth={1.75} />
                </div>
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-500/15 px-4 py-2 text-sm font-semibold text-primary-300 mb-6">
                Our Story
              </div>
              <h2 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl mb-8">
                Why I started StephensCode
              </h2>

              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  <span className="font-bold text-white">StephensCode was founded in 2011</span> by Kyle Stephens, a U.S. Marine Corps veteran. After completing his military service and earning a B.S. in Information Technology, Kyle saw a gap in the market: small businesses in Houston needed professional websites but couldn't afford the $3,000-$5,000+ price tags that agencies were charging for basic sites.
                </p>

                <p>
                  The mission was simple: bring <span className="font-semibold text-primary-400">military values of integrity, discipline, and service</span> to web development. No sales pressure, no hidden fees, no cutting corners. Just honest work at fair prices.
                </p>

                <p>
                  What started as building simple websites for local contractors has grown into a full-service web development company serving <span className="font-bold text-white">200+ businesses</span> across Houston, Conroe, The Woodlands, and surrounding areas. We've built everything from $250 starter sites to $7,500 enterprise platforms, always with the same commitment to quality and transparency.
                </p>

                <p>
                  Today, StephensCode specializes in custom websites, e-commerce platforms, business automation, and admin dashboards. We use modern technologies like <span className="font-semibold text-primary-400">Next.js, React, and Firebase</span> to build fast, secure, and scalable solutions that help businesses grow.
                </p>

                <div className="p-6 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl border-l-4 border-primary-600">
                  <p className="text-primary-300 font-bold text-xl italic">
                    "We're not the biggest agency in Houston, but we're proud to be the most honest."
                  </p>
                  <p className="text-sm text-gray-300 mt-2">Kyle Stephens, Founder</p>
                </div>
              </div>
            </div>

            {/* Values panel */}
            <div className="rounded-2xl border border-surface-border bg-surface-card p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">Carried over from the Corps</p>
              <ul className="mt-6 divide-y divide-surface-border">
                {values.map((value) => (
                  <li key={value.name} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="mt-1 h-4 w-4 flex-none text-primary-500">
                      <value.Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{value.name}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-400">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <BracketEyebrow label="Our Journey" />
            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              14+ Years of Growth
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              From humble beginnings to serving 200+ Houston businesses
            </p>
          </div>

          <ol className="relative max-w-3xl border-l border-surface-border pl-8 sm:pl-10 space-y-12">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span aria-hidden="true" className="absolute top-1 -left-[43px] sm:-left-[51px] flex h-5 w-5 items-center justify-center rounded-full border border-primary-500 bg-surface">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                </span>
                <p className="font-mono text-xs tracking-[0.18em] text-primary-500">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-gray-400">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-accent-500/15 px-4 py-2 text-sm font-semibold text-accent-300 mb-4">
              Meet the Team
            </div>
            <h2 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              The developer you actually talk to
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              No account managers, no handoffs. You deal with the person who writes the code.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary-500/10 via-surface-card to-accent-500/10 p-12 shadow-2xl shadow-black/20 border-2 border-surface-border">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Profile Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="h-48 w-48 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white shadow-2xl">
                      <Award className="h-20 w-20" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-surface-card rounded-2xl px-6 py-3 shadow-xl shadow-black/20 border-2 border-accent-500">
                      <div className="text-sm font-bold text-accent-600">USMC Veteran</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-grow text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">Kyle Stephens</h3>
                  <p className="text-xl font-semibold text-primary-600 mb-6">Founder & CTO</p>

                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    Marine Corps veteran. B.S. in Information Technology. 14+ years building websites and business systems for Houston small businesses. If you call the number on this site, this is who answers.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <span className="px-4 py-2 bg-primary-500/15 text-primary-300 rounded-full text-sm font-semibold">Next.js</span>
                    <span className="px-4 py-2 bg-accent-500/15 text-accent-300 rounded-full text-sm font-semibold">React</span>
                    <span className="px-4 py-2 bg-primary-500/25 text-primary-200 rounded-full text-sm font-semibold">TypeScript</span>
                    <span className="px-4 py-2 bg-accent-500/25 text-accent-200 rounded-full text-sm font-semibold">Firebase</span>
                    <span className="px-4 py-2 bg-surface-elevated text-gray-300 border border-surface-border rounded-full text-sm font-semibold">E-commerce</span>
                    <span className="px-4 py-2 bg-surface-elevated text-primary-300 border border-primary-500/30 rounded-full text-sm font-semibold">Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-surface-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Why Choose StephensCode?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              What sets us apart from other web development companies
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="group rounded-3xl bg-surface p-8 shadow-lg shadow-black/20 border border-surface-border hover:border-accent-500 transition-all">
              <div className="mb-6 text-accent-500 group-hover:scale-110 transition-transform">
                <DollarSign className="h-12 w-12" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Transparent Flat-Rate Pricing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Know exactly what you're paying before we start. No hourly rates, no surprise bills. Standard sites from $950, premium builds up to $7,500.
              </p>
            </div>

            <div className="group rounded-3xl bg-surface p-8 shadow-lg shadow-black/20 border border-surface-border hover:border-accent-500 transition-all">
              <div className="mb-6 text-accent-500 group-hover:scale-110 transition-transform">
                <Zap className="h-12 w-12" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Fast Turnaround
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Most projects completed in 1-4 weeks. We respect your time and move quickly without sacrificing quality. Clear timelines from day one.
              </p>
            </div>

            <div className="group rounded-3xl bg-surface p-8 shadow-lg shadow-black/20 border border-surface-border hover:border-accent-500 transition-all">
              <div className="mb-6 text-accent-500 group-hover:scale-110 transition-transform">
                <MapPin className="h-12 w-12" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Local Houston Support
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Based in Conroe, serving Houston, The Woodlands, Spring, Tomball, and surrounding areas. Local service you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="bg-gradient-to-br from-black via-surface to-surface-card py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Serving the Greater Houston Area</h2>
            <p className="text-lg text-gray-200">Professional web development services for businesses throughout Texas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              'Conroe', 'Houston', 'The Woodlands', 'Spring', 'Tomball', 'Magnolia',
              'Willis', 'Montgomery', 'Kingwood', 'Humble', 'Porter', 'New Caney'
            ].map((city, index) => (
              <div
                key={city}
                className="bg-surface-card/60 backdrop-blur-sm rounded-lg px-4 py-3 text-white font-semibold border border-surface-border hover:bg-surface-elevated/80 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {city}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-200 mt-8 text-sm">
            + We also work with clients nationwide through remote collaboration
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-surface py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #ef4e22 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Ready to Work Together?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Tell me what you are trying to build. The consultation is free, and if I am not the right fit for the job, I will say so.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group rounded-lg bg-gradient-to-r from-primary-600 to-accent-700 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all"
              >
                Get in Touch
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">â†’</span>
              </Link>
              <PhoneLink
                location="about_page"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-white hover:text-primary-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (936) 323-4527
              </PhoneLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
