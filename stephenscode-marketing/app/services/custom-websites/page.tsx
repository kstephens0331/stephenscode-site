import Link from 'next/link'
import type { Metadata } from 'next'
import { serviceSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Custom Website Development | From $250 | Houston & Conroe',
  description: 'Professional custom website development for Houston businesses. Responsive design, SEO-optimized, mobile-friendly. Flat-rate pricing from $250. Free consultation.',
  keywords: ['custom website development Houston', 'small business website Conroe TX', 'responsive web design Texas'],
}

export default function CustomWebsitesPage() {
  const packages = [
    {
      name: 'Plug and Play',
      price: '$250',
      description: 'Professional design for WIX, GoDaddy, or similar platforms',
      features: [
        'Custom design on your platform',
        'Up to 5 pages',
        'Mobile responsive',
        'Basic SEO setup',
        'Contact form',
        '1 week delivery',
      ],
    },
    {
      name: 'Website Rebuild',
      price: '$350',
      description: 'Complete website refresh or rebuild on existing platform',
      features: [
        'Modern redesign',
        'Content migration',
        'Mobile optimization',
        'SEO improvements',
        'Speed optimization',
        '2 weeks delivery',
      ],
      popular: true,
    },
    {
      name: 'Standard Website',
      price: '$850',
      description: 'Custom-built website with Home, About, Services, Contact pages',
      features: [
        'Custom design & development',
        'Up to 6 pages',
        'Contact forms',
        'Google Analytics',
        'SEO optimized',
        'Mobile responsive',
        'Free hosting setup',
        '3-4 weeks delivery',
      ],
    },
  ]

  const addOns = [
    { name: 'SEO Boost', price: '$120', description: 'Advanced SEO optimization and sitemap setup' },
    { name: 'Blog Module', price: '$110', description: 'Fully featured blog with categories and tags' },
    { name: 'Contact Forms', price: '$75', description: 'Custom contact forms with email notifications' },
    { name: 'Newsletter Signup', price: '$75', description: 'Email list building with integration' },
    { name: 'Social Media Feeds', price: '$95', description: 'Display your social media content' },
    { name: 'Image Optimizer', price: '$90', description: 'Automatic image compression and WebP conversion' },
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema('Custom Website Development', '850')) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Custom Website Development
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Professional websites designed for your business. From simple landing pages to complex multi-page sites.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                View All Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What We Build
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Custom websites tailored to your business needs and goals.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Business Websites
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Professional websites for local businesses. Showcase your services, build trust, and generate leads.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Landing Pages
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    High-converting landing pages for campaigns, products, or services. Optimized for conversions.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Portfolio Sites
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Showcase your work with beautiful portfolio sites. Perfect for photographers, designers, and artists.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Website Packages
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choose the package that fits your needs and budget.
            </p>
          </div>

          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`flex flex-col rounded-3xl p-8 ${
                  pkg.popular
                    ? 'bg-primary-600 text-white ring-2 ring-primary-600'
                    : 'bg-white text-gray-900 ring-1 ring-gray-200'
                }`}
              >
                {pkg.popular && (
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wide">Most Popular</p>
                )}
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <p className={`mt-4 text-sm ${pkg.popular ? 'text-gray-100' : 'text-gray-600'}`}>
                  {pkg.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">{pkg.price}</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        className={`h-6 w-5 flex-none ${pkg.popular ? 'text-white' : 'text-primary-600'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    pkg.popular
                      ? 'bg-white text-primary-600 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Available Add-Ons
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Enhance your website with additional features.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                  <p className="text-lg font-bold text-primary-600">{addon.price}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="text-base font-semibold text-primary-600 hover:text-primary-700"
            >
              View all 55+ add-ons <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Custom vs Template */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Custom vs Template?
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Better Performance
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Custom sites load faster and rank higher in Google. No bloated templates or unnecessary code.
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Complete Flexibility
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Build exactly what you need. No limitations from template constraints or page builders.
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  SEO Optimized
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Built with SEO best practices from the ground up. Clean code that search engines love.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for a custom website?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Get a free consultation and quote. No obligation, no sales pressure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+19363234527"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                Call (936) 323-4527 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
