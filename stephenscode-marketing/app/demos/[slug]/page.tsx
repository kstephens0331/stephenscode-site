import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allDemos } from '@/lib/demos-data'
import DemoFrame from '@/components/demos/DemoFrame'

interface DemoPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return allDemos.map((demo) => ({
    slug: demo.slug,
  }))
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params
  const demo = allDemos.find(d => d.slug === slug)

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
  const demo = allDemos.find(d => d.slug === slug)

  if (!demo) {
    notFound()
  }

  return <DemoFrame demo={demo} />
}
