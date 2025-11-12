import { MetadataRoute } from 'next'
import { corePackages, premiumBuilds } from '@/lib/services-data'
import { allDemos } from '@/lib/demos-data'
import { getAllPosts } from '@/lib/blog'

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
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
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
      url: `${baseUrl}/demos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Service pages (0.9 - 0.85) - Individual service offerings
  const allServices = [...corePackages, ...premiumBuilds]
  const servicePages: MetadataRoute.Sitemap = allServices.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: service.category === 'core' ? 0.9 : 0.85,
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

  // Blog category pages (0.7) - Blog organization
  const blogCategories = ['web-development', 'seo', 'business', 'case-studies']
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
    ...servicePages,
    ...blogPostPages,
    ...blogCategoryPages,
    ...demoPages,
  ]
}
