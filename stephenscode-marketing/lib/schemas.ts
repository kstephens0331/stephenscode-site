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
