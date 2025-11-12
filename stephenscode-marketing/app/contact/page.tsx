import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Free Consultation & Quote | Houston Web Development',
  description: 'Get your free consultation and custom quote for web development services. Fast response, no obligation. Call (936) 323-4527 or submit a form. Serving Houston, Conroe, The Woodlands, and all of Texas. Veteran-owned business.',
  keywords: [
    'contact web developer Houston',
    'web development consultation Conroe TX',
    'free website quote Texas',
    'Houston web design contact',
    'veteran web developer',
    'local web development Houston',
    'get quote web development'
  ],
}

// LocalBusiness schema with complete contact information
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://stephenscode.dev/#organization",
  "name": "StephensCode LLC",
  "description": "Professional web development and digital solutions for businesses in Houston, Conroe, and throughout Texas.",
  "url": "https://stephenscode.dev",
  "telephone": "+1-936-323-4527",
  "email": "info@stephenscode.dev",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Conroe",
    "addressRegion": "TX",
    "postalCode": "77304",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.3119,
    "longitude": -95.4560
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Houston",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "Conroe",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    {
      "@type": "City",
      "name": "The Woodlands",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$250-$7500",
  "sameAs": [
    "https://www.facebook.com/stephenscode",
    "https://www.linkedin.com/company/stephenscode"
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a typical web development project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple websites (Plug and Play, Website Rebuild) take 1-2 weeks. Standard custom websites take 3-4 weeks. E-commerce sites take 4-6 weeks. Premium builds range from 6-16 weeks depending on complexity. Each service page shows the estimated timeline."
      }
    },
    {
      "@type": "Question",
      "name": "Do you require payment upfront?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We typically split payments: 50% to start, 50% on completion. For larger projects, we can discuss milestone-based payments. We're flexible and want to work within your budget and cash flow."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer ongoing website maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our Maintenance Plan add-on ($50-75/mo) includes updates, security monitoring, backups, and minor changes. We also offer hourly support for larger updates or changes outside the maintenance scope."
      }
    },
    {
      "@type": "Question",
      "name": "Can you work with my existing website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Our Website Rebuild package ($350) is perfect for refreshing existing sites. We can also add features to existing sites or migrate you to a better platform if needed."
      }
    },
    {
      "@type": "Question",
      "name": "Do you only work with local Houston businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While we're based in Conroe and love working with Houston-area businesses, we work with clients anywhere in the US. All communication can happen via phone, video call, and email."
      }
    }
  ]
}

export default function ContactPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full bg-accent-500/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-accent-500/30 mb-8 animate-fade-in-up">
              💬 Free Consultation Available
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-200">
              Let's Build Something Great
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 animate-fade-in-up animation-delay-400">
              Get a <span className="font-bold text-accent-400">free consultation</span> and custom quote. <strong className="text-white">Located in Houston, working with clients nationwide.</strong> No obligation, no sales pressure. Let's discuss your project and how we can help bring your vision to life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animation-delay-600">
              <a
                href="tel:+19363234527"
                className="group flex items-center gap-3 rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (936) 323-4527
              </a>
              <a
                href="mailto:info@stephenscode.dev"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@stephenscode.dev
              </a>
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

      {/* Quick Response Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl mb-3">⚡</div>
              <div className="text-2xl font-bold text-primary-900">24 Hours</div>
              <div className="text-sm text-gray-600 mt-2">Average Response Time</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-2xl font-bold text-primary-900">100% Free</div>
              <div className="text-sm text-gray-600 mt-2">Consultation & Quote</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-4xl mb-3">🤝</div>
              <div className="text-2xl font-bold text-primary-900">No Pressure</div>
              <div className="text-sm text-gray-600 mt-2">Zero Obligation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg leading-8 text-gray-600 mb-10">
                Ready to start your project or have questions? We're here to help. Choose your preferred way to connect.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6 mb-10">
                <a
                  href="tel:+19363234527"
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900 mb-1">Phone</div>
                    <div className="text-2xl font-bold text-primary-600 group-hover:text-accent-600 transition-colors">
                      (936) 323-4527
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Mon-Fri, 9am-6pm CST</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="mailto:info@stephenscode.dev"
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900 mb-1">Email</div>
                    <div className="text-lg font-bold text-primary-600 group-hover:text-accent-600 transition-colors break-all">
                      info@stephenscode.dev
                    </div>
                    <div className="text-sm text-gray-600 mt-1">We respond within 24 hours</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900 mb-1">Location</div>
                    <div className="text-lg font-bold text-gray-900">Conroe, TX 77304</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Serving Houston, Conroe, The Woodlands & all of Texas
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl border border-primary-200">
                  <div className="text-3xl mb-3">🇺🇸</div>
                  <h3 className="font-bold text-gray-900 mb-2">Veteran-Owned</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Proudly serving businesses with military values: integrity, dedication, and excellence.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-green-200">
                  <div className="text-3xl mb-3">⭐</div>
                  <h3 className="font-bold text-gray-900 mb-2">14+ Years Experience</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Proven track record with 200+ successful projects and 98% client satisfaction.
                  </p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-8 p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                      <span className="text-accent-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Quick Response</div>
                      <div className="text-sm text-gray-600">We'll get back to you within 24 hours</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                      <span className="text-accent-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Free Consultation</div>
                      <div className="text-sm text-gray-600">30-45 minute call to discuss your needs</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                      <span className="text-accent-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Custom Quote</div>
                      <div className="text-sm text-gray-600">Detailed pricing based on your requirements</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                      <span className="text-accent-600 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Zero Pressure</div>
                      <div className="text-sm text-gray-600">No obligation - take your time to decide</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl bg-white p-8 lg:p-12 shadow-2xl border border-gray-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Serving the Greater Houston Area</h2>
            <p className="text-lg text-gray-200">Professional web development services for businesses throughout Texas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              'Houston', 'Conroe', 'The Woodlands', 'Spring', 'Tomball', 'Magnolia',
              'Cypress', 'Kingwood', 'Humble', 'Porter', 'New Caney', 'Willis'
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
            + Serving clients throughout Texas and the United States
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Common Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get answers before reaching out
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How long does a typical project take?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simple websites (Plug and Play, Website Rebuild) take 1-2 weeks. Standard custom websites take 3-4 weeks. E-commerce sites take 4-6 weeks. Premium builds range from 6-16 weeks depending on complexity. Each service page shows the estimated timeline.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you require payment upfront?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We typically split payments: 50% to start, 50% on completion. For larger projects, we can discuss milestone-based payments. We're flexible and want to work within your budget and cash flow.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you offer ongoing maintenance?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Our Maintenance Plan add-on ($50-75/mo) includes updates, security monitoring, backups, and minor changes. We also offer hourly support for larger updates or changes outside the maintenance scope.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Can you work with my existing website?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! Our Website Rebuild package ($350) is perfect for refreshing existing sites. We can also add features to existing sites or migrate you to a better platform if needed.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you only work with local businesses?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                While we're based in Conroe and love working with Houston-area businesses, we work with clients anywhere in the US. All communication can happen via phone, video call, and email.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What information should I have ready for the consultation?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                It helps to have an idea of your business goals, target audience, desired features, and budget range. But don't worry if you're not sure yet - we'll guide you through the process and help you figure out exactly what you need.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How quickly can we get started?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Once we agree on the scope and you've made the initial payment, we can typically start within 1-3 business days. Rush projects may be available for an additional fee if our schedule permits.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What happens after I submit the contact form?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We'll respond within 24 hours (usually much faster). We'll schedule a free consultation call to discuss your project, answer questions, and provide a custom quote if needed. No pressure, no obligation.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you offer free consultations?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Every initial consultation is 100% free with zero obligation. We'll discuss your needs, explain your options, and provide honest advice - even if we're not the right fit for your project.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Can I see examples of similar projects you've built?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! Check out our <Link href="/demos" className="text-primary-600 font-semibold hover:text-primary-700">Demos page</Link> with 40+ live examples, or visit our <Link href="/work" className="text-primary-600 font-semibold hover:text-primary-700">Work page</Link> to see real client projects with testimonials.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What if I'm not sure what package I need?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                That's perfectly fine! During the free consultation, we'll discuss your business needs and recommend the package and add-ons that best fit your goals and budget. We'll explain all your options clearly.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Do you provide hosting and domain registration?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We can handle domain registration and hosting setup for you (approximately $120/year total). We'll recommend reliable providers and handle all technical configuration so you don't have to worry about it.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Will I be able to update the website myself?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We build websites that you can easily update yourself. We provide training and documentation, and we're always here if you need help. Or you can use our maintenance plans and we'll handle updates for you.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:border-primary-300 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What makes StephensCode different from other web developers?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We combine military discipline with transparent flat-rate pricing, fast turnaround, and 14+ years of experience. No sales pressure, no hidden fees, just honest work delivered on time. Our 98% client satisfaction rate speaks for itself.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="tel:+19363234527"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-primary-700 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
