export default function LocalBusinessSchema() {
  // Person schema for founder (referenced by @id from Organization.founder)
  const founderPersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://stephenscode.dev/#kyle-stephens',
    name: 'Kyle Stephens',
    jobTitle: 'Founder & CTO',
    description: 'Marine Corps veteran with 14+ years of IT and web development experience',
    url: 'https://stephenscode.dev/about',
    worksFor: { '@id': 'https://stephenscode.dev/#organization' },
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
    '@id': 'https://stephenscode.dev/#website',
    url: 'https://stephenscode.dev',
    name: 'StephensCode',
    description: 'Veteran-owned web development, managed IT services, and enterprise VPN solutions based in Conroe, TX.',
    publisher: { '@id': 'https://stephenscode.dev/#organization' },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://stephenscode.dev/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Main Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.stephenscode.dev/#organization',
    name: 'StephensCode LLC',
    alternateName: ['StephensCode', 'StephensCode Web Development', 'StephensCode MSP'],
    description: 'Veteran-owned web development company specializing in custom websites, API integration, web scraping, and business automation. 14+ years experience, 2,600+ completed projects.',
    url: 'https://www.stephenscode.dev',
    logo: 'https://www.stephenscode.dev/images/logo.png',
    telephone: '+1-936-323-4527',
    email: 'kyle@stephenscode.dev',
    founder: { '@id': 'https://stephenscode.dev/#kyle-stephens' },
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
      latitude: 30.3119,
      longitude: -95.4561,
    },
    areaServed: [
      { '@type': 'City', name: 'Conroe' },
      { '@type': 'City', name: 'The Woodlands' },
      { '@type': 'AdministrativeArea', name: 'Montgomery County' },
      { '@type': 'City', name: 'Houston', '@id': 'https://www.wikidata.org/wiki/Q16555' },
      { '@type': 'City', name: 'Spring' },
      { '@type': 'City', name: 'Tomball' },
      { '@type': 'City', name: 'Magnolia' },
      { '@type': 'City', name: 'Willis' },
      { '@type': 'City', name: 'Montgomery' },
      { '@type': 'City', name: 'Katy' },
      { '@type': 'City', name: 'Sugar Land' },
      { '@type': 'City', name: 'Pearland' },
      { '@type': 'City', name: 'Cypress' },
      { '@type': 'City', name: 'Humble' },
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
      'https://github.com/stephenscode',
      'https://www.facebook.com/stephenscodedev',
      'https://sacvpn.com',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '15',
      bestRating: '5',
      worstRating: '1',
    },
  }

  // Local Business Schema for Houston-area services
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.stephenscode.dev/#localbusiness',
    name: 'StephensCode',
    image: 'https://www.stephenscode.dev/images/logo.png',
    telephone: '+1-936-323-4527',
    email: 'kyle@stephenscode.dev',
    url: 'https://www.stephenscode.dev',
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'ACH'],
    currenciesAccepted: 'USD',
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
      latitude: 30.3119,
      longitude: -95.4561,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
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
    description: 'Custom website development for small businesses. Six flat-rate tiers from Starter ($250) to Enterprise Platform ($7,500+), all with 90 days post-launch support. Standard small business sites are $950 and are the typical entry tier. Custom SaaS and platform builds quoted on top of the catalog.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Tiers',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Starter', description: '3-4 page flyer site for brand-new businesses. Mobile, contact form, basic SEO, 90 days post-launch support.' },
          price: '250',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Basic', description: '5-7 page campaign or landing site with lead form and basic SEO. 90 days post-launch support.' },
          price: '500',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Standard', description: '8-12 page small-business website with CMS, SEO foundation, GA4, and 2 rounds of revisions. The typical entry tier. 90 days post-launch support.' },
          price: '950',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Advanced', description: 'Custom full-stack site with admin portal and KPI dashboard. CMS, conversion UX, lead forms. 90 days post-launch support.' },
          price: '2000',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Business System', description: 'CRM, customer and staff portals, booking, invoicing, Stripe payments, automation, dashboards, third-party integrations. 90 days post-launch support.' },
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

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a custom website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'StephensCode offers six flat-rate website tiers, all with 90 days of post-launch support. Starter is $250 (3-4 page flyer for brand-new businesses). Basic is $500 (campaign or landing site). Standard is $950 (full 8-12 page small-business website with CMS, the typical entry tier). Advanced is $2,000 (custom full-stack with admin portal and KPI dashboard). Business System is $5,000 (CRM, portals, booking, payments, automation, integrations). Enterprise Platform starts at $7,500 (multi-tenant, SSO, audit logs, workflow builder). Custom SaaS and platform builds are quoted as flat-rate projects above the catalog. No hourly billing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in managed IT services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our managed IT services include 24/7 system monitoring, helpdesk support, cybersecurity protection, backup and disaster recovery, Microsoft 365 management, and strategic IT planning. Pricing starts at $99 per user per month with our Essential IT package.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide IT support in Houston?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, StephensCode provides on-site and remote IT support throughout the Houston area including Conroe, The Woodlands, Spring, Tomball, Katy, Sugar Land, and Pearland. We offer same-day response for critical issues.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes SACVPN different from other VPN services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SACVPN is a zero-log enterprise VPN designed for businesses. Unlike consumer VPNs, SACVPN provides centralized management, team access controls, dedicated IP options, and enterprise-grade security without logging user activity.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is StephensCode a veteran-owned business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, StephensCode is a veteran-owned business founded by Kyle Stephens, a Marine Corps veteran with over 14 years of IT and web development experience. We bring military discipline and attention to detail to every project.',
        },
      },
    ],
  }

  const schemas = [webSiteSchema, organizationSchema, founderPersonSchema, localBusinessSchema, webDevServiceSchema, mspServiceSchema, vpnServiceSchema, faqSchema]

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
