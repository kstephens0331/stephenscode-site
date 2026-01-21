import { MetadataRoute } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allMSPServices } from '@/lib/msp-services-data'
import { allDemos } from '@/lib/demos-data'
import { getAllPosts } from '@/lib/blog'
import { serviceAreas } from '@/lib/service-areas-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.stephenscode.dev'
  const currentDate = new Date()

  // High priority pages (1.0 - 0.9) - Core business pages
  const corePagesHigh: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Specialized service pages - high priority for SEO
    {
      url: `${baseUrl}/services/conroe-web-development`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/api-integration`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/web-scraping`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/business-automation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/msp`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sacvpn`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  // Important pages (0.85 - 0.8) - Key informational pages
  const importantPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/demos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/custom-solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pricing/add-ons`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Service area pages (0.85) - Local SEO pages
  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Service pages (0.9 - 0.85) - Individual service offerings
  const allServices = [...corePackages, ...premiumBuilds]
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: service.category === 'core' ? 0.9 : 0.85,
  }))

  // MSP service pages (0.85) - IT services
  const mspServicePages: MetadataRoute.Sitemap = allMSPServices.map((service) => ({
    url: `${baseUrl}/msp/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Demo pages (0.7) - Portfolio/demo showcases
  const demoPages: MetadataRoute.Sitemap = allDemos.map((demo) => ({
    url: `${baseUrl}/demos/${demo.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts (0.75) - Content marketing
  const blogPosts = getAllPosts()
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Blog category pages (0.7) - Blog organization (must match categoryMap in blog/category/[category]/page.tsx)
  const blogCategories = ['web-development', 'seo', 'business', 'ecommerce']
  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combine all pages in priority order
  return [
    ...corePagesHigh,
    ...importantPages,
    ...serviceAreaPages,
    ...servicePages,
    ...mspServicePages,
    ...blogPostPages,
    ...blogCategoryPages,
    ...demoPages,
  ]
}
