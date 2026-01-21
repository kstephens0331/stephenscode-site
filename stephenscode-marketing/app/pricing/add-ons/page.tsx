import type { Metadata } from 'next'
import AddOnsClient from './AddOnsClient'

export const metadata: Metadata = {
  title: 'Website Add-Ons | Flat-Rate Features',
  description: 'Enhance your website with powerful add-ons. Contact forms, SEO packages, e-commerce features, and more. All flat-rate pricing with no hidden fees.',
  keywords: ['website add-ons', 'web features', 'website enhancements', 'flat-rate pricing'],
  openGraph: {
    title: 'Website Add-Ons | Flat-Rate Features | StephensCode',
    description: 'Enhance your website with powerful add-ons. Contact forms, SEO packages, e-commerce features, and more. All flat-rate pricing.',
    url: 'https://www.stephenscode.dev/pricing/add-ons',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Add-Ons | Flat-Rate Features | StephensCode',
    description: 'Enhance your website with powerful add-ons. Contact forms, SEO packages, e-commerce features, and more. All flat-rate pricing.',
  },
}

export default function AddOnsPage() {
  return <AddOnsClient />
}
