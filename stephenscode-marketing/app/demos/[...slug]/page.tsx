import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allDemos } from '@/lib/demos-data'
import DemoFrame from '@/components/demos/DemoFrame'

type Props = {
  params: Promise<{ slug: string[] }>
}

// Pre-render a page for every demo slug. The route is a catch-all so that
// deep links like /demos/<slug>/services still resolve to the demo (the
// template handles its own in-page navigation client-side).
export function generateStaticParams() {
  return allDemos.map((demo) => ({ slug: [demo.slug] }))
}

function findDemo(slug: string[] | undefined) {
  const first = slug?.[0]
  if (!first) return undefined
  return allDemos.find((demo) => demo.slug === first)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const demo = findDemo(slug)

  if (!demo) {
    return {
      title: 'Demo Not Found | StephensCode',
      description: 'The demo you are looking for could not be found.',
    }
  }

  const title = `${demo.name} Demo | StephensCode`
  const description = demo.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.stephenscode.dev/demos/${demo.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.stephenscode.dev/demos/${demo.slug}`,
      type: 'website',
      siteName: 'StephensCode',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function DemoSlugPage({ params }: Props) {
  const { slug } = await params
  const demo = findDemo(slug)

  if (!demo) {
    notFound()
  }

  return <DemoFrame demo={demo} />
}
