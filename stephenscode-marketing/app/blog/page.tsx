import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Web Development Tips & Houston Business Growth | StephensCode',
  description: 'Expert insights on web development, SEO, and business automation. Tips and strategies for Houston small businesses to grow online.',
  keywords: [
    'web development blog Houston',
    'SEO tips Texas',
    'small business marketing',
    'website optimization',
    'Houston digital marketing',
    'business automation tips',
    'web design best practices'
  ],
  openGraph: {
    title: 'Blog | Web Development Tips & Houston Business Growth | StephensCode',
    description: 'Expert insights on web development, SEO, and business automation. Tips and strategies for Houston small businesses to grow online.',
    url: 'https://www.stephenscode.dev/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.stephenscode.dev/blog',
  },
}

// Blog schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "StephensCode Blog",
  "description": "Expert web development, SEO, and business growth insights for Houston businesses",
  "publisher": {
    "@type": "Organization",
    "name": "StephensCode LLC"
  }
}

export default function BlogPage() {
  const posts = getAllPosts()

  const categories = [
    { name: 'All Posts', slug: 'all' },
    { name: 'Web Development', slug: 'web-development' },
    { name: 'SEO', slug: 'seo' },
    { name: 'Business', slug: 'business' },
    { name: 'E-Commerce', slug: 'ecommerce' },
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-black border-b border-surface-border overflow-hidden">
        {/* Soft vertical sheen — barely there, gives the canvas depth without halo */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-card/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500 animate-fade-in-up">
              <span aria-hidden="true" className="font-mono text-primary-500/80">&lt;</span>
              <span>Expert Insights</span>
              <span aria-hidden="true" className="font-mono text-primary-500/80">/&gt;</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl animate-fade-in-up animation-delay-200">
              StephensCode Blog
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 animate-fade-in-up animation-delay-400">
              Practical insights on <span className="font-semibold text-primary-400">web development</span>, SEO, and growing your business online. Real-world advice from 14+ years helping Houston businesses succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface border-b border-surface-border py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={category.slug === 'all' ? '/blog' : `/blog/category/${category.slug}`}
                className="group inline-flex items-center rounded-md bg-surface-card px-5 py-2.5 ring-1 ring-surface-border hover:border-primary-500/60 hover:ring-primary-500/60 transition-colors"
              >
                <span className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-2xl bg-surface-card p-16 ring-1 ring-surface-border">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Valuable Content Coming Soon
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    We're crafting in-depth articles on web development, SEO strategies, business automation, and proven growth tactics. Check back soon for insights that will help your business thrive online.
                  </p>

                  {/* Featured Topics Preview */}
                  <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
                    <div className="rounded-lg bg-surface-elevated p-6 border border-surface-border">
                      <h3 className="font-bold text-white mb-2">Web Development</h3>
                      <p className="text-sm text-gray-400">Modern frameworks, best practices, and performance optimization</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated p-6 border border-surface-border">
                      <h3 className="font-bold text-white mb-2">SEO Strategies</h3>
                      <p className="text-sm text-gray-400">Local SEO, keyword research, and ranking techniques</p>
                    </div>
                    <div className="rounded-lg bg-surface-elevated p-6 border border-surface-border">
                      <h3 className="font-bold text-white mb-2">Business Growth</h3>
                      <p className="text-sm text-gray-400">Automation, conversion optimization, and scaling tips</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
                    >
                      Get Expert Help
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface transition-colors"
                    >
                      View Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                  Latest Articles
                </h2>
                <p className="text-lg text-gray-400">
                  Actionable insights to help your business grow online
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                {posts.map((post) => (
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
            Stay Updated
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
            Get the latest web development tips, SEO strategies, and business growth insights. Join Houston business owners who are growing online.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-base font-semibold text-white hover:bg-primary-600 transition-colors"
            >
              Subscribe for Updates
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-6 py-3 text-base font-semibold text-white hover:border-primary-500/60 hover:bg-surface-card transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
