import Link from 'next/link'
import { organizationSchema } from '@/lib/schemas'
import HomeClient from '@/components/HomeClient'

// Advanced Schema Markup for Homepage
const homepageSchemas = {
  organization: organizationSchema,
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.stephenscode.dev/#business",
    "name": "StephensCode LLC",
    "image": "https://www.stephenscode.dev/logo.png",
    "telephone": "+1-936-323-4527",
    "email": "info@stephenscode.dev",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Conroe",
      "addressLocality": "Conroe",
      "addressRegion": "TX",
      "postalCode": "77304",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3119",
      "longitude": "-95.4560"
    },
    "url": "https://www.stephenscode.dev",
    "priceRange": "$250-$7500",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Houston",
        "containedIn": { "@type": "State", "name": "Texas" }
      },
      {
        "@type": "City",
        "name": "Conroe",
        "containedIn": { "@type": "State", "name": "Texas" }
      },
      {
        "@type": "City",
        "name": "The Woodlands",
        "containedIn": { "@type": "State", "name": "Texas" }
      }
    ]
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a custom website cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our custom websites start at $250 for a Plug and Play 4-page site. Standard professional websites are $850, e-commerce sites are $1,100, and premium builds start at $2,000. All pricing is flat-rate with no hidden fees."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most websites are completed in 1-2 weeks. Simple sites can be done in 3-5 days, while complex e-commerce or premium builds may take 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you serve businesses outside Houston?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! While we're based in Conroe, TX and serve the greater Houston area, we work with clients nationwide through remote collaboration."
        }
      }
    ]
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.stephenscode.dev"
      }
    ]
  }
}

export default function Home() {
  const packages = [
    {
      name: 'Plug and Play',
      price: '$250',
      description: 'Perfect starter website for new businesses. Get online fast with a professional 4-page site.',
      features: ['4 Pages', 'Mobile Responsive', 'Contact Form', '1 Week Delivery'],
      href: '/services/plug-and-play',
      popular: false
    },
    {
      name: 'Standard Website',
      price: '$850',
      description: 'Most popular choice for established businesses. Comprehensive 8-12 page professional website.',
      features: ['8-12 Pages', 'SEO Optimized', 'Blog Setup', 'Google Analytics'],
      href: '/services/standard-website',
      popular: true
    },
    {
      name: 'E-Commerce',
      price: '$1,100',
      description: 'Complete online store with payment processing, inventory management, and shopping cart.',
      features: ['Unlimited Products', 'Stripe Payment', 'Order Management', 'Customer Accounts'],
      href: '/services/ecommerce-website',
      popular: false
    },
    {
      name: 'Premium Build',
      price: '$2,000+',
      description: 'Advanced full-stack applications with custom features, admin dashboards, and business automation.',
      features: ['Custom Features', 'Admin Dashboard', 'Database Design', 'API Integration'],
      href: '/services/premium-build',
      popular: false
    }
  ]

  const stats = [
    { label: 'Years Experience', value: '14+', icon: '⏱️' },
    { label: 'Projects Delivered', value: '200+', icon: '🚀' },
    { label: 'Happy Clients', value: '150+', icon: '😊' },
    { label: 'Client Satisfaction', value: '98%', icon: '⭐' }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We discuss your business, goals, and requirements. No sales pressure, just honest advice.',
      icon: '💬'
    },
    {
      number: '02',
      title: 'Transparent Quote',
      description: 'You get a clear, flat-rate price before we start. No hourly rates, no surprise bills.',
      icon: '💰'
    },
    {
      number: '03',
      title: 'Fast Development',
      description: 'Most sites completed in 1-2 weeks. We keep you updated throughout the process.',
      icon: '⚡'
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Your site goes live with training and documentation. Post-launch support included.',
      icon: '🎯'
    }
  ]

  const testimonials = [
    {
      quote: "StephensCode built our complete scheduling and workflow automation platform. The system handles everything from client bookings to automated reminders seamlessly.",
      author: "CalenFlow Team",
      company: "CalenFlow",
      result: "Full automation platform"
    },
    {
      quote: "Kyle developed our secure VPN management platform with advanced authentication and monitoring. The system is rock-solid and handles our enterprise clients flawlessly.",
      author: "SACVPN Team",
      company: "SACVPN",
      result: "Enterprise-grade security"
    },
    {
      quote: "Our online gaming safety platform was built exactly to spec. StephensCode delivered a powerful system that streamlines our entire operation.",
      author: "SentinelForge Team",
      company: "SentinelForge - Online Gaming Safety",
      result: "Platform protecting gamers"
    }
  ]

  const serviceAreas = [
    'Houston', 'Conroe', 'The Woodlands', 'Spring',
    'Tomball', 'Magnolia', 'Kingwood', 'Humble',
    'Montgomery', 'Willis', 'Porter', 'New Caney'
  ]

  return (
    <>
      {/* Advanced Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemas.breadcrumb) }}
      />

      <HomeClient />

      {/* Hero Section with Advanced Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Veteran Badge with Animation */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-lg border border-white/20 shadow-2xl animate-fade-in-up">
              <span className="text-3xl">🇺🇸</span>
              <span className="text-white">Veteran-Owned | Founded 2011 | Full Platform 2025</span>
            </div>

            {/* Main Headline - SEO Optimized */}
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-8 animate-fade-in-up animation-delay-200">
              Houston Web Development
              <span className="block text-accent-400 mt-2">Built by Veterans, Trusted by Business</span>
            </h1>

            {/* SEO-Rich Subheadline */}
            <p className="mt-8 text-xl leading-8 text-gray-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
              Custom websites, e-commerce platforms, and business automation for Houston, Conroe, and The Woodlands businesses. <strong className="text-white">Serving clients nationwide through remote collaboration.</strong> Flat-rate pricing from $250. No hourly rates, no surprises. 14+ years of experience, 200+ successful projects.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-accent-500 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:bg-accent-600 transition-all hover:scale-105 hover:shadow-accent-500/50"
              >
                <span>Get Free Quote</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>View 40 Live Demos</span>
                <span>→</span>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all"
              >
                <span>📞</span>
                <span>(936) 323-4527</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 animate-fade-in-up animation-delay-800">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Marine Corps Veteran Badge */}
                <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/20">
                  <span className="text-2xl">🎖️</span>
                  <div className="text-left">
                    <span className="block text-xs text-gray-300 uppercase tracking-wide">USMC Veteran</span>
                    <span className="block text-sm font-bold text-white">Marine Corps Owned</span>
                  </div>
                </div>
                {/* Experience Badge */}
                <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/20">
                  <span className="text-2xl">⭐</span>
                  <div className="text-left">
                    <span className="block text-xs text-gray-300 uppercase tracking-wide">Since 2011</span>
                    <span className="block text-sm font-bold text-white">14+ Years Experience</span>
                  </div>
                </div>
                {/* Projects Badge */}
                <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/20">
                  <span className="text-2xl">🚀</span>
                  <div className="text-left">
                    <span className="block text-xs text-gray-300 uppercase tracking-wide">Track Record</span>
                    <span className="block text-sm font-bold text-white">200+ Projects Delivered</span>
                  </div>
                </div>
                {/* Local Badge */}
                <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/20">
                  <span className="text-2xl">📍</span>
                  <div className="text-left">
                    <span className="block text-xs text-gray-300 uppercase tracking-wide">Based In</span>
                    <span className="block text-sm font-bold text-white">Conroe, Texas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center text-center group hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{stat.icon}</div>
                <dt className="text-base leading-7 text-gray-600 font-semibold">{stat.label}</dt>
                <dd className="order-first text-5xl font-black tracking-tight text-primary-600 mb-2">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Packages Section - SEO Rich Content */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32" id="packages">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Transparent Pricing</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Website Packages That Fit Your Budget
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Flat-rate pricing with no hourly rates or hidden fees. Choose the package that fits your needs, from simple starter sites to complex e-commerce and business platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {packages.map((pkg, index) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col rounded-3xl p-8 shadow-xl ring-1 transition-all hover:scale-105 hover:shadow-2xl ${
                  pkg.popular
                    ? 'bg-primary-600 text-white ring-primary-600 lg:scale-105'
                    : 'bg-white ring-gray-200 hover:ring-primary-500'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                    <div className="rounded-full bg-accent-500 px-4 py-1 text-center text-sm font-bold text-white">
                      Most Popular
                    </div>
                  </div>
                )}

                <h3 className={`text-2xl font-bold ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>

                <p className={`mt-4 text-sm leading-6 ${pkg.popular ? 'text-gray-100' : 'text-gray-600'}`}>
                  {pkg.description}
                </p>

                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className={`text-5xl font-black tracking-tight ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.price}
                  </span>
                  {!pkg.price.includes('+') && (
                    <span className={`text-sm font-semibold leading-6 ${pkg.popular ? 'text-gray-100' : 'text-gray-600'}`}>
                      flat rate
                    </span>
                  )}
                </p>

                <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 flex-1 ${pkg.popular ? 'text-gray-100' : 'text-gray-600'}`}>
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg className={`h-6 w-5 flex-none ${pkg.popular ? 'text-white' : 'text-primary-600'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pkg.href}
                  className={`mt-8 block rounded-lg px-6 py-4 text-center text-sm font-bold transition-all ${
                    pkg.popular
                      ? 'bg-white text-primary-600 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Learn More →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-lg font-bold text-primary-600 hover:text-primary-700"
            >
              <span>View Complete Pricing & Add-Ons</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Simple Process</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              How We Work Together
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transparent, efficient, and collaborative. From consultation to launch in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative group">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary-600 to-primary-200 -translate-x-1/2"></div>
                )}
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-white text-4xl mb-6 group-hover:scale-110 transition-transform shadow-xl">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Client Success Stories</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Real Results for Houston Businesses
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all hover:scale-105">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6 text-lg">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 mb-2">{testimonial.company}</p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span>{testimonial.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
            >
              <span>View All Case Studies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas - SEO Gold */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Serving Greater Houston</h2>
            <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Web Development Near You
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Proudly serving businesses throughout Houston, Conroe, The Woodlands, and surrounding areas. Local service you can trust.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((city) => (
              <div key={city} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-center shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <p className="relative text-lg font-bold text-white">{city}</p>
                <p className="relative text-xs text-gray-200">Web Development</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              <strong className="text-gray-900">Not in your area?</strong> We work with clients nationwide through remote collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl mb-8">
              Ready to Grow Your Business Online?
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-gray-200 mb-12">
              Join 150+ Houston businesses who trust StephensCode for their web development needs. Free consultation, transparent pricing, fast delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-accent-500 px-10 py-5 text-xl font-bold text-white shadow-2xl hover:bg-accent-600 transition-all hover:scale-110 hover:shadow-accent-500/50"
              >
                <span>Start Your Project</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+19363234527"
                className="inline-flex items-center gap-3 rounded-lg bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-lg border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>📞</span>
                <span>(936) 323-4527</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-300">
              No pressure sales calls. Just honest advice and transparent pricing.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
