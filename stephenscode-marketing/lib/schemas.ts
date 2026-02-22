export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "StephensCode LLC",
  "description": "Veteran-owned web development serving Houston and Conroe",
  "url": "https://stephenscode.dev",
  "telephone": "+1-936-323-4527",
  "email": "kyle@stephenscode.dev",
  "founder": {
    "@type": "Person",
    "name": "Kyle Stephens"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2378 Strong Horse Dr",
    "addressLocality": "Conroe",
    "addressRegion": "TX",
    "postalCode": "77301",
    "addressCountry": "US"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Conroe"
    },
    {
      "@type": "City",
      "name": "Houston"
    },
    {
      "@type": "City",
      "name": "The Woodlands"
    },
    {
      "@type": "City",
      "name": "Montgomery County"
    }
  ],
  "priceRange": "$250-$7500",
  "knowsAbout": [
    "Web Development",
    "Custom Software",
    "Business Automation",
    "Dashboard Development",
    "E-Commerce Solutions"
  ]
}

export function serviceSchema(serviceName: string, price: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "ProfessionalService",
      "name": "StephensCode LLC"
    },
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }
  }
}

export function blogPostSchema(
  title: string,
  datePublished: string,
  dateModified: string,
  description: string,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": "Kyle Stephens"
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "publisher": {
      "@type": "Organization",
      "name": "StephensCode LLC"
    }
  }
}
