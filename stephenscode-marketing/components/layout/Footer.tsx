import Link from 'next/link'

export default function Footer() {
  const navigation = {
    services: [
      { name: 'Plug & Play', href: '/services/plug-and-play' },
      { name: 'Website Rebuild', href: '/services/website-rebuild' },
      { name: 'Standard Website', href: '/services/standard-website' },
      { name: 'E-Commerce', href: '/services/ecommerce-website' },
      { name: 'Premium Build', href: '/services/premium-build' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Work', href: '/work' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { name: 'Admin Portal', href: 'https://admin.stephenscode.dev' },
      { name: 'Customer Portal', href: 'https://customer.stephenscode.dev' },
    ],
  }

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="text-2xl font-bold text-white">StephensCode</div>
            <p className="text-sm leading-6 text-gray-300">
              Veteran-owned web development serving Houston and Conroe. 14+ years of experience delivering quality solutions.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium text-white">Veteran-Owned</span>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
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
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="text-sm leading-6 text-gray-300">
                  <a href="tel:+19363234527" className="hover:text-white">
                    (936) 323-4527
                  </a>
                </li>
                <li className="text-sm leading-6 text-gray-300">
                  <a href="mailto:info@stephenscode.dev" className="hover:text-white">
                    info@stephenscode.dev
                  </a>
                </li>
                <li className="text-sm leading-6 text-gray-300">
                  Conroe, TX
                </li>
              </ul>
              <div className="mt-10">
                <h3 className="text-sm font-semibold leading-6 text-white">Portals</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} StephensCode LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
