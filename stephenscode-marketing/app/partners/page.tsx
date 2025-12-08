import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners & Recognition | StephensCode',
  description: 'StephensCode is recognized by leading industry directories and platforms. See our partnerships and featured listings.',
}

interface Partner {
  name: string
  description: string
  url: string
  category: 'directory' | 'partner' | 'certification'
}

interface Client {
  name: string
  description: string
  url: string
}

const partners: Partner[] = [
  {
    name: 'DesignRush',
    description: 'Featured in Top Texas Web Development Companies',
    url: 'https://www.designrush.com/agency/web-development-companies/texas',
    category: 'directory',
  },
  // Add more partners here as they come
]

const clients: Client[] = [
  // Add client websites here for backlinking
  // Example:
  // {
  //   name: 'Client Name',
  //   description: 'Brief description of the project',
  //   url: 'https://clientwebsite.com',
  // },
]

export default function PartnersPage() {
  const directories = partners.filter(p => p.category === 'directory')
  const certifications = partners.filter(p => p.category === 'certification')
  const partnersList = partners.filter(p => p.category === 'partner')

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Partners & Recognition
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              StephensCode is proud to be recognized by leading industry directories and platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Directories */}
      {directories.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured On</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {directories.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-primary-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    View Listing
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Certifications</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-gray-50 p-6 hover:border-accent-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
                    Learn More
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partnersList.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Partners</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnersList.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-primary-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    Visit Partner
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Websites */}
      {clients.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Clients</h2>
            <p className="text-gray-600 mb-8">Websites we&apos;ve built for businesses across Texas</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border-2 border-gray-200 bg-gray-50 p-6 hover:border-accent-500 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors mb-2">
                    {client.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {client.description}
                  </p>
                  <span className="text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
                    Visit Website
                    <span aria-hidden="true" className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the businesses who trust StephensCode for their web development needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-accent-600 transition-all hover:scale-105"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
