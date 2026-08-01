export default function LocalBusinessSchema() {
  // Person schema for founder (referenced by @id from Organization.founder)
  const founderPersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.stephenscode.dev/#kyle-stephens',
    name: 'Kyle Stephens',
    jobTitle: 'Founder & CTO',
    description: 'Marine Corps veteran with 14+ years of IT and web development experience',
    url: 'https://www.stephenscode.dev/about',
    worksFor: { '@id': 'https://www.stephenscode.dev/#organization' },
    knowsAbout: [
      'Web Development',
      'Managed IT Services',
      'Cybersecurity',
      'Enterprise VPN',
      'Business Automation',
    ],
  }

  // WebSite schema (enables sitelinks search box, ties site identity to Organization)
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.stephenscode.dev/#website',
    url: 'https://www.stephenscode.dev',
    name: 'StephensCode',
    description: 'Veteran-owned web development, managed IT services, and enterprise VPN solutions based in Conroe, TX.',
    publisher: { '@id': 'https://www.stephenscode.dev/#organization' },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.stephenscode.dev/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Main Organization + LocalBusiness Schema
  // Combined into one entity (single @id) since this is one physical business playing both
  // roles -- keeping them as two separate, unlinked @ids fragments the entity graph.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': 'https://www.stephenscode.dev/#organization',
    name: 'StephensCode LLC',
    alternateName: ['StephensCode', 'StephensCode Web Development', 'StephensCode MSP'],
    description: 'Veteran-owned web development company specializing in custom websites, API integration, web scraping, and business automation. 14+ years experience, 200+ completed projects.',
    url: 'https://www.stephenscode.dev',
    logo: 'https://www.stephenscode.dev/logo.png',
    image: 'https://www.stephenscode.dev/logo.png',
    telephone: '+1-936-323-4527',
    email: 'info@stephenscode.dev',
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'ACH'],
    currenciesAccepted: 'USD',
    founder: { '@id': 'https://www.stephenscode.dev/#kyle-stephens' },
    foundingDate: '2011',
    additionalType: 'https://schema.org/VeteranOwned',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2378 Strong Horse Dr',
      addressLocality: 'Conroe',
      addressRegion: 'TX',
      postalCode: '77301',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2855,
      longitude: -95.4103,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Conroe' },
      { '@type': 'City', name: 'The Woodlands' },
      { '@type': 'AdministrativeArea', name: 'Montgomery County' },
      { '@type': 'City', name: 'Houston', '@id': 'https://www.wikidata.org/wiki/Q16555' },
      { '@type': 'City', name: 'Magnolia' },
      { '@type': 'City', name: 'Montgomery' },
      { '@type': 'City', name: 'Willis' },
      { '@type': 'City', name: 'Pinehurst' },
      { '@type': 'City', name: 'Shenandoah' },
      { '@type': 'City', name: 'Oak Ridge North' },
      { '@type': 'City', name: 'Panorama Village' },
      { '@type': 'City', name: 'Cut and Shoot' },
      { '@type': 'City', name: 'New Caney' },
      { '@type': 'City', name: 'Porter' },
      { '@type': 'City', name: 'Splendora' },
      { '@type': 'City', name: 'Spring' },
      { '@type': 'City', name: 'Tomball' },
      { '@type': 'City', name: 'Cypress' },
      { '@type': 'City', name: 'Humble' },
      { '@type': 'City', name: 'Kingwood' },
      { '@type': 'City', name: 'Atascocita' },
      { '@type': 'City', name: 'Midtown Houston' },
      { '@type': 'City', name: 'The Heights' },
      { '@type': 'City', name: 'Montrose' },
      { '@type': 'City', name: 'Downtown Houston' },
      { '@type': 'City', name: 'Galleria / Uptown Houston' },
      { '@type': 'City', name: 'Memorial' },
      { '@type': 'City', name: 'Energy Corridor' },
      { '@type': 'City', name: 'West University Place' },
      { '@type': 'City', name: 'Bellaire' },
      { '@type': 'City', name: 'Katy' },
      { '@type': 'City', name: 'Sugar Land' },
      { '@type': 'City', name: 'Missouri City' },
      { '@type': 'City', name: 'Richmond' },
      { '@type': 'City', name: 'Pearland' },
      { '@type': 'City', name: 'League City' },
      { '@type': 'City', name: 'Friendswood' },
      { '@type': 'City', name: 'Webster' },
      { '@type': 'City', name: 'Huntsville' },
      { '@type': 'State', name: 'Texas' },
    ],
    knowsAbout: [
      'Web Development',
      'Custom Website Design',
      'E-Commerce Development',
      'API Integration',
      'Web Scraping',
      'Business Process Automation',
      'Managed IT Services',
      'Cybersecurity',
      'Network Security',
      'Enterprise VPN',
      'Cloud Solutions',
      'Microsoft 365',
      'IT Support',
      'SEO',
      'Python Development',
      'React Development',
      'Next.js Development',
    ],
    sameAs: [
      'https://www.linkedin.com/company/stephenscode',
      'https://www.facebook.com/stephenscodedev',
    ],
  }

  // Web Development Service Schema
  const webDevServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.stephenscode.dev/#webdev-service',
    name: 'Web Development Services',
    serviceType: 'Web Development',
    provider: { '@id': 'https://www.stephenscode.dev/#organization' },
    areaServed: { '@type': 'State', name: 'Texas' },
    description: 'Custom website development for small businesses. Flat-rate tiers from Plug and Play ($250) to Enterprise Platform ($7,500+), all with 90 days post-launch support. Standard Website ($950) is the typical entry tier for a full small-business site. Custom SaaS and platform builds quoted on top of the catalog.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Tiers',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Plug and Play', description: 'Fast-turnaround starter site for brand-new businesses. Mobile, contact form, basic SEO, 90 days post-launch support.' },
          price: '250',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Website Rebuild', description: 'Modern rebuild of an existing outdated or template-based website. 90 days post-launch support.' },
          price: '350',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Standard Website', description: 'Custom-built small-business website (up to 6 pages) with CMS-free custom code, SEO foundation, GA4, and revisions. The typical entry tier. 90 days post-launch support.' },
          price: '950',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'E-Commerce Website', description: 'Full online store with product catalog, cart, and secure checkout. 90 days post-launch support.' },
          price: '1100',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Premium Build', description: 'Custom full-stack web application with admin portal and analytics dashboard. Up to 15 pages. 90 days post-launch support.' },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Custom Business Platform', description: 'CRM, customer and staff portals, booking, invoicing, Stripe payments, automation, dashboards, third-party integrations. 90 days post-launch support.' },
          price: '5000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Enterprise Platform', description: 'Multi-tenant architecture, SSO, audit logs, workflow builder, CI-ready, performance monitoring. 90 days post-launch support plus roadmap workshop.' },
          price: '7500',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  // MSP Service Schema
  const mspServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.stephenscode.dev/#msp-service',
    name: 'Managed IT Services',
    alternateName: ['MSP Services', 'IT Support', 'Managed Service Provider'],
    serviceType: 'Managed IT Services',
    provider: { '@id': 'https://www.stephenscode.dev/#organization' },
    areaServed: [
      { '@type': 'City', name: 'Houston' },
      { '@type': 'City', name: 'Conroe' },
      { '@type': 'City', name: 'The Woodlands' },
      { '@type': 'City', name: 'Spring' },
    ],
    description: 'Comprehensive managed IT services for Houston-area businesses. 24/7 monitoring, cybersecurity, helpdesk support, and cloud solutions. Predictable per-user pricing starting at $99/user/month.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Managed IT Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Essential IT', description: 'Core IT support with email security and password management' },
          price: '99',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '99', priceCurrency: 'USD', unitText: 'per user per month' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Business Pro', description: 'Enhanced IT with backup, dark web monitoring, and MFA' },
          price: '129',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '129', priceCurrency: 'USD', unitText: 'per user per month' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Complete IT', description: 'Full-service IT with EDR, SIEM, and security training' },
          price: '179',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '179', priceCurrency: 'USD', unitText: 'per user per month' },
        },
      ],
    },
  }

  // VPN Service Schema
  const vpnServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.stephenscode.dev/#vpn-service',
    name: 'SACVPN Enterprise VPN',
    alternateName: ['SACVPN', 'Enterprise VPN', 'Business VPN'],
    serviceType: 'Virtual Private Network',
    provider: { '@id': 'https://www.stephenscode.dev/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    description: 'Zero-log enterprise VPN solution for businesses. Secure remote access, site-to-site connectivity, and privacy-focused networking. Per-user pricing for teams of any size.',
    url: 'https://sacvpn.com',
    offers: {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'SACVPN Enterprise', description: 'Zero-log enterprise VPN with unlimited bandwidth' },
      priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: 'USD', unitText: 'per user per month' },
    },
  }

  // NOTE: FAQPage schema is intentionally NOT added here -- this component renders on every
  // route, and a sitewide FAQPage block would not match the visible content on most pages.
  // Individual pages with real, visible FAQ content (app/faq, app/pricing, app/service-areas/[slug],
  // app/services/web-scraping, app/services/business-automation, app/services/api-integration, etc.)
  // define and render their own page-scoped FAQPage schema instead.
  const schemas = [webSiteSchema, organizationSchema, founderPersonSchema, webDevServiceSchema, mspServiceSchema, vpnServiceSchema]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
