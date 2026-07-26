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
