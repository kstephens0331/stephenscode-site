export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.stephenscode.dev/#organization',
    name: 'StephensCode',
    alternateName: 'StephensCode LLC',
    description: 'Veteran-owned web development company serving Houston and Conroe. Custom websites, business dashboards, and automation solutions with transparent flat-rate pricing.',
    url: 'https://www.stephenscode.dev',
    telephone: '+1-936-323-4527',
    email: 'kyle@stephenscode.dev',
    founder: {
      '@type': 'Person',
      name: 'Kyle Stephens',
      jobTitle: 'Founder & Lead Developer',
    },
    foundingDate: '2011',
    address: {
      '@type': 'PostalAddress',
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
      {
        '@type': 'City',
        name: 'Houston',
        '@id': 'https://www.wikidata.org/wiki/Q16555',
      },
      {
        '@type': 'City',
        name: 'Conroe',
      },
      {
        '@type': 'City',
        name: 'The Woodlands',
      },
      {
        '@type': 'City',
        name: 'Spring',
      },
      {
        '@type': 'City',
        name: 'Tomball',
      },
      {
        '@type': 'City',
        name: 'Katy',
      },
      {
        '@type': 'City',
        name: 'Sugar Land',
      },
      {
        '@type': 'City',
        name: 'Pearland',
      },
    ],
    serviceType: [
      'Web Development',
      'Custom Website Design',
      'E-Commerce Development',
      'Business Dashboard Development',
      'Website Maintenance',
      'SEO Services',
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/stephenscode',
      'https://github.com/stephenscode',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Plug and Play Website',
            description: '4-page professional website',
          },
          price: '250',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Standard Website',
            description: '8-12 page custom website',
          },
          price: '850',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Rebuild',
            description: 'Complete website redesign and optimization',
          },
          price: '600',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-Commerce Store',
            description: 'Full online store with payment processing',
          },
          price: '1100',
          priceCurrency: 'USD',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '12',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
