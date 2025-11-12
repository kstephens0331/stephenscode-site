import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.stephenscode.dev'

  // Static pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/services/custom-websites',
    '/services/ecommerce',
    '/services/business-automation',
    '/services/dashboards',
    '/services/premium',
    '/pricing',
    '/work',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.8 : 0.7,
  }))

  // TODO: Add dynamic blog post URLs when blog content is added
  // TODO: Add dynamic portfolio project URLs when work content is added

  return routes
}
