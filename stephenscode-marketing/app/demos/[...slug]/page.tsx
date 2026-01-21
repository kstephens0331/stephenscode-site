import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allDemos, Demo } from '@/lib/demos-data'
import DemoFrame from '@/components/demos/DemoFrame'

// Breadcrumb schema for SEO (visual breadcrumbs handled in DemoFrame controls bar)
function getBreadcrumbSchema(demo: Demo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.stephenscode.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Demos',
        item: 'https://www.stephenscode.dev/demos',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: demo.name,
        item: `https://www.stephenscode.dev/demos/${demo.slug}`,
      },
    ],
  }
}

interface DemoPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  // Generate params for base demo pages
  // Sub-pages are handled dynamically via the catch-all route
  return allDemos.map((demo) => ({
    slug: [demo.slug],
  }))
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params
  // First segment is the demo slug, rest are sub-pages
  const demoSlug = slug[0]
  const demo = allDemos.find(d => d.slug === demoSlug)

  if (!demo) {
    return {
      title: 'Demo Not Found',
    }
  }

  return {
    title: `${demo.name} - Live Demo | StephensCode`,
    description: demo.description,
  }
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params
  // First segment is the demo slug, rest are sub-pages handled by client-side routing
  const demoSlug = slug[0]
  const demo = allDemos.find(d => d.slug === demoSlug)

  if (!demo) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(demo)) }}
      />
      {/* Visually hidden H1 for SEO/accessibility */}
      <h1 className="sr-only">{demo.name} - Interactive Website Demo by StephensCode</h1>
      <DemoFrame demo={demo} />
    </>
  )
}
