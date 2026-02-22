import Link from 'next/link'

export default function Footer() {
  const navigation = {
    webdev: [
      { name: 'Conroe Web Developer', href: '/services/conroe-web-development' },
      { name: 'Plug & Play', href: '/services/plug-and-play' },
      { name: 'Standard Website', href: '/services/standard-website' },
      { name: 'E-Commerce', href: '/services/ecommerce-website' },
      { name: 'Premium Build', href: '/services/premium-build' },
      { name: 'All Web Services', href: '/services' },
    ],
    developer: [
      { name: 'API Integration', href: '/services/api-integration' },
      { name: 'Web Scraping', href: '/services/web-scraping' },
      { name: 'Business Automation', href: '/services/business-automation' },
    ],
    msp: [
      { name: 'Essential IT', href: '/msp/essential-it' },
      { name: 'Business Pro', href: '/msp/business-pro' },
      { name: 'Complete IT', href: '/msp/complete-it' },
      { name: 'Cybersecurity', href: '/msp/advanced-threat-protection' },
      { name: 'All IT Services', href: '/msp' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Work', href: '/work' },
      { name: 'Portfolio', href: '/partners' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'FAQ', href: '/faq' },
    ],
    products: [
      { name: 'SACVPN', href: '/sacvpn' },
      { name: 'Custom Solutions', href: '/custom-solutions' },
      { name: 'Website Demos', href: '/demos' },
    ],
    serviceAreas: [
      { name: 'Conroe', href: '/service-areas/conroe' },
      { name: 'The Woodlands', href: '/service-areas/the-woodlands' },
      { name: 'Houston', href: '/service-areas/houston' },
      { name: 'Midtown', href: '/service-areas/midtown-houston' },
      { name: 'The Heights', href: '/service-areas/the-heights-houston' },
      { name: 'Spring', href: '/service-areas/spring' },
      { name: 'Katy', href: '/service-areas/katy' },
      { name: 'Sugar Land', href: '/service-areas/sugar-land' },
      { name: 'Pinehurst', href: '/service-areas/pinehurst' },
      { name: 'Kingwood', href: '/service-areas/kingwood' },
    ],
  }

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Business Signature */}
          <div className="space-y-6">
            <div className="text-2xl font-bold text-white">StephensCode LLC</div>

            {/* Veteran Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 border border-white/20">
              <span className="text-3xl">🎖️</span>
              <div>
                <span className="block text-xs text-gray-300 uppercase tracking-wide">USMC Veteran</span>
                <span className="block text-sm font-bold text-white">Veteran-Owned Business</span>
              </div>
            </div>

            <p className="text-sm leading-6 text-gray-300">
              Veteran-owned web development company specializing in custom websites, API integration, web scraping, and business automation. 14+ years experience, 2,600+ projects completed.
            </p>

            {/* Business Signature */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm font-bold text-white">Kyle Stephens</p>
              <p className="text-xs text-gray-300">Founder & CTO</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-300">
                  <a href="tel:+19363234527" className="hover:text-white">(936) 323-4527</a>
                </p>
                <p className="text-sm text-gray-300">
                  <a href="mailto:kyle@stephenscode.dev" className="hover:text-white">kyle@stephenscode.dev</a>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/stephenscode" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/stephenscode" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white" aria-label="GitHub">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/stephenscodedev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Web Development</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.webdev.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Developer Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.developer.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-semibold leading-6 text-white mt-8">Products</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.products.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm font-semibold leading-6 text-white mt-8">IT Services</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.msp.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Service Areas</h3>
                <ul role="list" className="mt-6 space-y-2">
                  {navigation.serviceAreas.map((area) => (
                    <li key={area.name}>
                      <Link href={area.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/service-areas" className="mt-4 block text-xs font-semibold text-primary-400 hover:text-primary-300">
                  View all 35+ areas →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs leading-5 text-gray-300">
              &copy; {new Date().getFullYear()} StephensCode LLC. All rights reserved. Veteran-Owned Business.
            </p>
            <p className="text-xs leading-5 text-gray-500">
              Conroe, Texas | <a href="https://stephenscode.dev" className="hover:text-gray-300">stephenscode.dev</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
