import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Veteran Owned Web Developer | About StephensCode | Houston TX',
  description: 'Veteran owned web developer in Conroe TX. 14+ years Houston web development experience. Affordable web design, custom websites for small business. Call (936) 323-4527.',
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
    title: 'Veteran Owned Web Developer | About StephensCode | Houston TX',
    description: 'Veteran owned web developer in Conroe TX. 14+ years Houston web development experience. Affordable web design, custom websites for small business.',
    url: 'https://stephenscode.dev/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stephenscode.dev/about',
  },
}

// Person schema for Kyle Stephens
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kyle Stephens",
  "jobTitle": "Founder & Lead Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "StephensCode LLC"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Information Technology Program"
  },
  "description": "U.S. military veteran with 14+ years of web development experience. Founder of StephensCode, serving Houston businesses with transparent pricing and military values.",
  "knowsAbout": [
    "Web Development",
    "React",
    "Next.js",
    "E-commerce",
    "Business Automation",
    "Custom Software"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Conroe",
    "addressRegion": "TX",
    "addressCountry": "US"
  }
}

// Organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "StephensCode LLC",
  "foundingDate": "2011",
  "founder": {
    "@type": "Person",
    "name": "Kyle Stephens"
  },
  "description": "Veteran-owned web development company providing transparent, flat-rate web development services to Houston businesses since 2011.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Conroe",
    "addressRegion": "TX",
    "postalCode": "77304",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  },
  "numberOfEmployees": "1-10",
  "slogan": "Military values. Honest pricing. Quality work."
}

export default function About() {
  const stats = [
    { label: 'Years of Experience', value: '14+', icon: '📅' },
    { label: 'Projects Completed', value: '200+', icon: '🚀' },
    { label: 'Happy Clients', value: '150+', icon: '😊' },
    { label: 'Client Satisfaction', value: '98%', icon: '⭐' },
  ]

  const values = [
    {
      name: 'Integrity',
      description: 'We do what we say we\'ll do. No hidden fees, no surprises, no empty promises. Military values guide everything we do.',
      icon: '🎖️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Excellence',
      description: 'We don\'t cut corners. Every project gets the same attention to detail and commitment to quality, whether it\'s $250 or $7,500.',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Transparency',
      description: 'Flat-rate pricing, clear timelines, honest recommendations. You always know where your project stands and what you\'re paying for.',
      icon: '💎',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Service',
      description: 'We serve our clients the way we served our country - with dedication, reliability, and a mission-first mentality.',
      icon: '🤝',
      color: 'from-green-500 to-teal-500'
    },
  ]

  const timeline = [
    {
      year: '2011',
      title: 'Company Founded',
      description: 'Kyle Stephens, U.S. military veteran, founded StephensCode with a mission to bring honest web development to Houston small businesses.'
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
      description: 'Fully transitioned to cutting-edge technologies: Next.js, React, TypeScript, Firebase, and Supabase for faster, more powerful websites and applications.'
    },
    {
      year: '2025',
      title: 'Full Platform Launch',
      description: 'Launched complete business platform with custom admin dashboards, customer portals, and advanced automation. 200+ projects completed with 98% client satisfaction.'
    }
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <span className="text-3xl">🇺🇸</span>
              <span className="text-base">Veteran-Owned & Operated Since 2011</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-200">
              About StephensCode
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 animate-fade-in-up animation-delay-400">
              A veteran-owned web development company bringing <span className="font-bold text-accent-400">military discipline</span>, technical expertise, and honest service to Houston businesses.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                Work With Us
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <Link
                href="/work"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                View Our Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-900 mb-6">
                📖 Our Story
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
                Built on Military Values, Driven by Results
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <span className="font-bold text-gray-900">StephensCode was founded in 2011</span> by Kyle Stephens, a U.S. military veteran with a passion for technology and service. After completing his military service and earning a B.S. in Information Technology, Kyle saw a gap in the market: small businesses in Houston needed professional websites but couldn't afford the $3,000-$5,000+ price tags that agencies were charging for basic sites.
                </p>

                <p>
                  The mission was simple: bring <span className="font-semibold text-primary-700">military values of integrity, discipline, and service</span> to web development. No sales pressure, no hidden fees, no cutting corners. Just honest work at fair prices.
                </p>

                <p>
                  What started as building simple websites for local contractors has grown into a full-service web development company serving <span className="font-bold text-gray-900">150+ businesses</span> across Houston, Conroe, The Woodlands, and surrounding areas. We've built everything from $250 starter sites to $7,500 enterprise platforms, always with the same commitment to quality and transparency.
                </p>

                <p>
                  Today, StephensCode specializes in custom websites, e-commerce platforms, business automation, and admin dashboards. We use modern technologies like <span className="font-semibold text-primary-700">Next.js, React, and Firebase</span> to build fast, secure, and scalable solutions that help businesses grow.
                </p>

                <div className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border-l-4 border-primary-600">
                  <p className="text-primary-900 font-bold text-xl italic">
                    "We're not the biggest agency in Houston, but we're proud to be the most honest."
                  </p>
                  <p className="text-sm text-gray-700 mt-2">— Kyle Stephens, Founder</p>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-accent-600 p-12 shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-8xl mb-6">🎖️</div>
                  <h3 className="text-3xl font-bold mb-4">USMC Core Values</h3>
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">🎖️</div>
                      <div className="text-sm font-semibold">Honor</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">💪</div>
                      <div className="text-sm font-semibold">Courage</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">🤝</div>
                      <div className="text-sm font-semibold">Commitment</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-sm font-semibold">Mission-Focused</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">💎</div>
                      <div className="text-sm font-semibold">Integrity</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">🛡️</div>
                      <div className="text-sm font-semibold">Service</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-sm font-semibold">Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-accent-100 px-4 py-2 text-sm font-semibold text-accent-900 mb-4">
              ⏰ Our Journey
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              14+ Years of Growth
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From humble beginnings to serving 150+ Houston businesses
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pb-12 last:pb-0">
                {/* Connecting line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>
                )}

                <div className="relative flex gap-6 group">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform z-10">
                    {item.year.slice(2)}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 group-hover:border-primary-300 group-hover:shadow-xl transition-all">
                      <div className="text-sm font-semibold text-accent-600 mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-900 mb-4">
              💎 Core Values
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Guiding Principles
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Military service instilled values that guide everything we do.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={value.name}
                className="group relative rounded-3xl bg-white p-10 shadow-lg border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-4xl shadow-xl transform group-hover:rotate-12 transition-transform`}>
                  {value.icon}
                </div>
                <div className="ml-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-900 mb-4">
              👥 Meet the Team
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Veteran-Led Excellence
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Locally based, veteran-led, and committed to your success.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50 p-12 shadow-2xl border-2 border-primary-200">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Profile Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="h-48 w-48 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-7xl shadow-2xl">
                      🎖️
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-accent-500">
                      <div className="text-sm font-bold text-accent-600">U.S. Veteran</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-grow text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Kyle Stephens</h3>
                  <p className="text-xl font-semibold text-primary-600 mb-6">Founder & Lead Developer</p>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    U.S. military veteran with 14+ years of web development experience. B.S. in Information Technology. Passionate about helping Houston small businesses succeed online with transparent pricing and quality work.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">Next.js</span>
                    <span className="px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold">React</span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">TypeScript</span>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Firebase</span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">E-commerce</span>
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Why Choose StephensCode?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              What sets us apart from other web development companies
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="group rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:border-accent-500 hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Transparent Flat-Rate Pricing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Know exactly what you're paying before we start. No hourly rates, no surprise bills. Core packages from $250, premium builds up to $7,500.
              </p>
            </div>

            <div className="group rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:border-accent-500 hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Turnaround
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Most projects completed in 1-4 weeks. We respect your time and move quickly without sacrificing quality. Clear timelines from day one.
              </p>
            </div>

            <div className="group rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:border-accent-500 hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Local Houston Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Based in Conroe, serving Houston, The Woodlands, Spring, Tomball, and surrounding areas. Local service you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-16">
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
                className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
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
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1e40af 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Ready to Work Together?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Let's discuss your project. Free consultation, no obligation, no sales pressure. Experience the StephensCode difference.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Get in Touch
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <a
                href="tel:+19363234527"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-gray-900 hover:text-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (936) 323-4527
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
