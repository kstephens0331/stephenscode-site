import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'

// Map URL slugs to category names (must match blog post frontmatter categories exactly)
const categoryMap: { [key: string]: string } = {
  'web-development': 'Web Development',
  'seo': 'SEO',
  'business': 'Business',
  'ecommerce': 'E-Commerce',
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: 'Category Not Found | StephensCode Blog',
    }
  }

  const titles: { [key: string]: string } = {
    'Web Development': 'Web Development Tips & Best Practices | StephensCode Blog',
    'SEO': 'SEO Strategies & Local Search Tips | StephensCode Blog',
    'Business': 'Small Business Growth & Marketing Tips | StephensCode Blog',
    'E-Commerce': 'E-Commerce Tips & Online Store Guides | StephensCode Blog',
  }

  const descriptions: { [key: string]: string } = {
    'Web Development': 'Expert web development tips, coding best practices, and modern framework tutorials. Learn from 14+ years of building custom websites and applications.',
    'SEO': 'Proven SEO strategies, local search optimization, and ranking techniques for Houston small businesses. Increase visibility and drive organic traffic.',
    'Business': 'Business growth strategies, marketing automation, and conversion optimization tips for small businesses. Real advice that drives results.',
    'E-Commerce': 'E-commerce strategies, online store optimization, and sales conversion tips for Houston retailers. Build and grow your online store.',
  }

  return {
    title: titles[categoryName] || `${categoryName} | StephensCode Blog`,
    description: descriptions[categoryName] || `Browse ${categoryName} articles from StephensCode`,
    keywords: [`${categoryName.toLowerCase()}`, 'Houston web development', 'small business tips', 'digital marketing'],
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const allPosts = getAllPosts()
  const categoryPosts = allPosts.filter(post => post.category === categoryName)

  const categories = [
    { name: 'All Posts', slug: 'all' },
    { name: 'Web Development', slug: 'web-development' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Business', slug: 'business' },
    { name: 'E-Commerce', slug: 'ecommerce' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        {/* Soft vertical sheen — barely there, gives the canvas depth without halo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md bg-surface-card px-4 py-2 text-sm font-semibold text-white ring-1 ring-surface-border mb-8 hover:text-primary-400 hover:ring-primary-500/60 transition-colors"
            >
              ← Back to All Posts
            </Link>
            <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Category</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl animate-fade-in-up">
              {categoryName}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 animate-fade-in-up animation-delay-200">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} in this category
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-surface border-b border-surface-border py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = category.name === categoryName
              return (
                <Link
                  key={category.slug}
                  href={category.slug === 'all' ? '/blog' : `/blog/category/${category.slug}`}
                  className={`group inline-flex items-center rounded-md px-5 py-2.5 ring-1 transition-colors ${
                    isActive
                      ? 'bg-primary-500 ring-primary-500'
                      : 'bg-surface-card ring-surface-border hover:ring-primary-500/60'
                  }`}
                >
                  <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-white group-hover:text-primary-400'}`}>
                    {category.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {categoryPosts.length === 0 ? (
            <div className="text-center">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl bg-surface-card p-16 ring-1 ring-surface-border">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Coming Soon: {categoryName} Content
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    We're working on articles about {categoryName.toLowerCase()}. Check back soon for in-depth insights and actionable tips.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/blog"
                      className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
                    >
                      View All Articles
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface transition-colors"
                    >
                      Get Expert Help
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                  {categoryName} Articles
                </h2>
                <p className="text-lg text-gray-400">
                  Expert insights and actionable tips
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                {categoryPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col bg-surface-card rounded-2xl overflow-hidden ring-1 ring-surface-border hover:ring-primary-500/50 transition-all"
                  >
                    {post.image && (
                      <div className="relative h-56 bg-surface-elevated overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-primary-400">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <div className="flex items-center gap-x-4 text-sm mb-4">
                        <time dateTime={post.date} className="text-gray-500 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold leading-8 text-white mb-4 group-hover:text-primary-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-base leading-7 text-gray-400">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-surface-border pt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{post.readTime}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          Read Article
                          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-surface border-t border-surface-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Need Expert Help?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
            Get professional {categoryName.toLowerCase()} services tailored to your business needs. Veteran-owned quality with transparent pricing.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Get Started
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
