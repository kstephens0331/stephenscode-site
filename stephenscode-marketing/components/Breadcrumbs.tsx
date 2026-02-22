'use client'

import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = 'https://stephenscode.dev'

  // Build schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${baseUrl}${item.href}`,
      })),
    ],
  }

  return (
    <>
      {/* Schema.org Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visual breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-3 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} className="flex items-center">
                <ChevronRightIcon
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {index === items.length - 1 ? (
                  <span
                    className="ml-2 text-gray-700 font-medium truncate max-w-[200px] sm:max-w-none"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="ml-2 text-gray-500 hover:text-primary-600 transition-colors truncate max-w-[150px] sm:max-w-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
