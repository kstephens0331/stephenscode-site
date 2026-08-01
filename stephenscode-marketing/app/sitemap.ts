import { MetadataRoute } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allAddOns } from '@/lib/addons-data'
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
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    // Specialized service pages - high priority for SEO
    {
      url: `${baseUrl}/services/conroe-web-development`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/api-integration`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/web-scraping`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/business-automation`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/custom-websites`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/msp`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sacvpn`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]

  // Important pages (0.85 - 0.8) - Key informational pages
  const importantPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/partners`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/demos`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/custom-solutions`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pricing/add-ons`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-areas`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Service area pages (0.85) - Local SEO pages
  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Service pages (0.9 - 0.85) - Individual service offerings
  const allServices = [...corePackages, ...premiumBuilds]
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: 'weekly' as const,
    priority: service.category === 'core' ? 0.9 : 0.85,
  }))

  // Add-on service pages (0.7) - Individual add-on offerings
  const addOnPages: MetadataRoute.Sitemap = allAddOns.map((addon) => ({
    url: `${baseUrl}/services/${addon.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // MSP service pages (0.85) - IT services
  const mspServicePages: MetadataRoute.Sitemap = allMSPServices.map((service) => ({
    url: `${baseUrl}/msp/${service.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Demo pages (0.7) - Portfolio/demo showcases
  const demoPages: MetadataRoute.Sitemap = allDemos.map((demo) => ({
    url: `${baseUrl}/demos/${demo.slug}`,
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
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Combine all pages in priority order
  return [
    ...corePagesHigh,
    ...importantPages,
    ...serviceAreaPages,
    ...servicePages,
    ...addOnPages,
    ...mspServicePages,
    ...blogPostPages,
    ...blogCategoryPages,
    ...demoPages,
  ]
}
