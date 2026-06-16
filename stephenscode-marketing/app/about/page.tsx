import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clock, Rocket, Users, Star, ShieldCheck, Award,
  Gem, Handshake, Phone, ArrowRight, Zap, MapPin, DollarSign, Target,
} from 'lucide-react'

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
    url: 'https://www.stephenscode.dev/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/about',
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
    { label: 'Years of Experience', value: '14+', Icon: Clock },
    { label: 'Projects Completed', value: '200+', Icon: Rocket },
    { label: 'Happy Clients', value: '150+', Icon: Users },
    { label: 'Client Satisfaction', value: '98%', Icon: Star },
  ]

  const values = [
    {
      name: 'Integrity',
      description: 'We do what we say we\'ll do. No hidden fees, no surprises, no empty promises. Military values guide everything we do.',
      Icon: ShieldCheck,
    },
    {
      name: 'Excellence',
      description: 'We don\'t cut corners. Every project gets the same attention to detail and commitment to quality, whether it\'s $250 or $7,500.',
      Icon: Award,
    },
    {
      name: 'Transparency',
      description: 'Flat-rate pricing, clear timelines, honest recommendations. You always know where your project stands and what you\'re paying for.',
      Icon: Gem,
    },
    {
      name: 'Service',
      description: 'We serve our clients the way we served our country - with dedication, reliability, and a mission-first mentality.',
      Icon: Handshake,
    },
  ]

  const coreValues = [
    { name: 'Honor', Icon: Award },
    { name: 'Courage', Icon: ShieldCheck },
    { name: 'Commitment', Icon: Handshake },
    { name: 'Mission-Focused', Icon: Target },
    { name: 'Integrity', Icon: Gem },
    { name: 'Service', Icon: Users },
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

  const serviceAreas = [
    'Conroe', 'Houston', 'The Woodlands', 'Spring', 'Tomball', 'Magnolia',
    'Willis', 'Montgomery', 'Kingwood', 'Humble', 'Porter', 'New Caney'
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
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Veteran-Owned &middot; Operated Since 2011</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.02] animate-fade-in-up animation-delay-200">
              About StephensCode
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              A veteran-owned web development company bringing <span className="font-semibold text-accent-400">military discipline</span>, technical expertise, and honest service to Houston businesses.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
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
      <section className="bg-black border-b border-surface-border py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.Icon
              return (
                <div key={stat.label} className="flex flex-col items-center text-center group">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="order-first text-4xl font-bold tracking-tight text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm leading-7 text-gray-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-6">
                <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
                <span>Our Story</span>
                <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
                Built on Military Values, Driven by Results
              </h2>

              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  <span className="font-semibold text-white">StephensCode was founded in 2011</span> by Kyle Stephens, a U.S. military veteran with a passion for technology and service. After completing his military service and earning a B.S. in Information Technology, Kyle saw a gap in the market: small businesses in Houston needed professional websites but couldn't afford the $3,000-$5,000+ price tags that agencies were charging for basic sites.
                </p>

                <p>
                  The mission was simple: bring <span className="font-semibold text-primary-400">military values of integrity, discipline, and service</span> to web development. No sales pressure, no hidden fees, no cutting corners. Just honest work at fair prices.
                </p>

                <p>
                  What started as building simple websites for local contractors has grown into a full-service web development company serving <span className="font-semibold text-white">150+ businesses</span> across Houston, Conroe, The Woodlands, and surrounding areas. We've built everything from $950 starter sites to $7,500 enterprise platforms, always with the same commitment to quality and transparency.
                </p>

                <p>
                  Today, StephensCode specializes in custom websites, e-commerce platforms, business automation, and admin dashboards. We use modern technologies like <span className="font-semibold text-primary-400">Next.js, React, and Firebase</span> to build fast, secure, and scalable solutions that help businesses grow.
                </p>

                <div className="rounded-2xl bg-surface-card border-l-2 border-primary-500 p-6">
                  <p className="text-white font-semibold text-xl italic">
                    "We're not the biggest agency in Houston, but we're proud to be the most honest."
                  </p>
                  <p className="text-sm text-gray-400 mt-2">- Kyle Stephens, Founder</p>
                </div>
              </div>
            </div>

            {/* Core Values Panel */}
            <div>
              <div className="rounded-2xl bg-surface-card ring-1 ring-surface-border p-10">
                <div className="text-center mb-8">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-md border border-primary-500/40 text-primary-500">
                    <Award className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Core Values We Operate By</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {coreValues.map((value) => {
                    const Icon = value.Icon
                    return (
                      <div
                        key={value.name}
                        className="flex items-center gap-3 rounded-md bg-surface-elevated border border-surface-border p-4"
                      >
                        <Icon className="h-5 w-5 flex-none text-primary-500" strokeWidth={1.75} />
                        <span className="text-sm font-semibold text-white">{value.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Our Journey</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              14+ Years of Growth
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              From humble beginnings to serving 150+ Houston businesses
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative pb-12 last:pb-0">
                {/* Connecting line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-px bg-surface-border"></div>
                )}

                <div className="relative flex gap-6 group">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-md border-2 border-primary-500 bg-black flex items-center justify-center text-primary-500 font-bold z-10 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {item.year.slice(2)}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className="bg-surface-card rounded-2xl p-8 ring-1 ring-surface-border group-hover:ring-primary-500/50 transition-all">
                      <div className="text-sm font-semibold text-accent-400 mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-surface-card py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Core Values</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Guiding Principles
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Military service instilled values that guide everything we do.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {values.map((value) => {
              const Icon = value.Icon
              return (
                <div
                  key={value.name}
                  className="group rounded-2xl bg-surface border border-surface-border p-8 hover:border-primary-500/60 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {value.name}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Meet the Team</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Veteran-Led Excellence
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Locally based, veteran-led, and committed to your success.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-surface-card ring-1 ring-surface-border p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Profile */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="h-48 w-48 rounded-2xl border-2 border-primary-500/40 bg-surface-elevated flex items-center justify-center text-primary-500">
                      <Award className="h-20 w-20" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-3 -right-3 rounded-md bg-surface-elevated px-5 py-2 ring-1 ring-surface-border">
                      <div className="text-sm font-bold text-accent-400">U.S. Veteran</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-grow text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">Kyle Stephens</h3>
                  <p className="text-xl font-semibold text-primary-400 mb-6">Founder & Lead Developer</p>

                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    U.S. military veteran with 14+ years of web development experience. B.S. in Information Technology. Passionate about helping Houston small businesses succeed online with transparent pricing and quality work.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {['Next.js', 'React', 'TypeScript', 'Firebase', 'E-commerce', 'Automation'].map((tech) => (
                      <span key={tech} className="px-4 py-2 bg-surface-elevated border border-surface-border text-gray-300 rounded-md text-sm font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-surface-card py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Choose StephensCode?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              What sets us apart from other web development companies
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="group rounded-2xl bg-surface border border-surface-border p-8 hover:border-primary-500/60 transition-colors">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                <DollarSign className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Transparent Flat-Rate Pricing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Know exactly what you're paying before we start. No hourly rates, no surprise bills. Standard sites from $950, premium builds up to $7,500.
              </p>
            </div>

            <div className="group rounded-2xl bg-surface border border-surface-border p-8 hover:border-primary-500/60 transition-colors">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                <Zap className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Fast Turnaround
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Most projects completed in 1-4 weeks. We respect your time and move quickly without sacrificing quality. Clear timelines from day one.
              </p>
            </div>

            <div className="group rounded-2xl bg-surface border border-surface-border p-8 hover:border-primary-500/60 transition-colors">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-primary-500/40 text-primary-500 group-hover:border-primary-500 group-hover:text-primary-400 transition-colors">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
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
      <section className="bg-surface py-24 sm:py-28 border-b border-surface-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 mb-4">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Greater Houston</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Serving the Greater Houston Area</h2>
            <p className="mt-4 text-lg text-gray-400">Professional web development services for businesses throughout Texas</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((city) => (
              <div
                key={city}
                className="group relative rounded-md bg-surface-card ring-1 ring-surface-border p-5 text-center card-lift"
              >
                <p className="relative text-base font-semibold text-white group-hover:text-primary-400 transition-colors">{city}</p>
                <p className="relative text-xs text-gray-500 mt-0.5">Web development</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              <strong className="text-white">Not in your area?</strong> We work with clients nationwide through remote collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Work Together?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-300">
            Let's discuss your project. Free consultation, no obligation, no sales pressure. Experience the StephensCode difference.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+19363234527"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:bg-surface-card transition-colors"
            >
              <Phone className="h-4 w-4" />
              (936) 323-4527
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
