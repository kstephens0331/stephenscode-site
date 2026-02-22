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
    url: 'https://stephenscode.dev/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://stephenscode.dev/blog',
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
    { name: 'All Posts', slug: 'all', icon: '📚', color: 'from-blue-500 to-cyan-500' },
    { name: 'Web Development', slug: 'web-development', icon: '💻', color: 'from-purple-500 to-blue-500' },
    { name: 'SEO', slug: 'seo', icon: '🔍', color: 'from-green-500 to-teal-500' },
    { name: 'Business', slug: 'business', icon: '💼', color: 'from-orange-500 to-red-500' },
    { name: 'E-Commerce', slug: 'ecommerce', icon: '🛒', color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full bg-accent-500/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-accent-500/30 mb-8 animate-fade-in-up">
              📝 Expert Insights & Tips
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-200">
              StephensCode Blog
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 animate-fade-in-up animation-delay-400">
              Expert insights on <span className="font-bold text-accent-400">web development</span>, SEO, and growing your business online. Real-world advice from 14+ years helping Houston businesses succeed.
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={category.slug === 'all' ? '/blog' : `/blog/category/${category.slug}`}
                className="group relative rounded-2xl bg-gradient-to-br from-gray-50 to-white px-6 py-4 shadow-md border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{category.icon}</span>
                  <span className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center">
              <div className="mx-auto max-w-3xl">
                <div className="relative rounded-3xl bg-white p-16 shadow-2xl border-2 border-gray-200">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl shadow-xl">
                      📝
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-4">
                    Valuable Content Coming Soon
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We're crafting in-depth articles on web development, SEO strategies, business automation, and proven growth tactics. Check back soon for expert insights that will help your business thrive online.
                  </p>

                  {/* Featured Topics Preview */}
                  <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-200">
                      <div className="text-3xl mb-3">💻</div>
                      <h3 className="font-bold text-gray-900 mb-2">Web Development</h3>
                      <p className="text-sm text-gray-600">Modern frameworks, best practices, and performance optimization</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200">
                      <div className="text-3xl mb-3">🔍</div>
                      <h3 className="font-bold text-gray-900 mb-2">SEO Strategies</h3>
                      <p className="text-sm text-gray-600">Local SEO, keyword research, and ranking techniques</p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-6 border border-orange-200">
                      <div className="text-3xl mb-3">💼</div>
                      <h3 className="font-bold text-gray-900 mb-2">Business Growth</h3>
                      <p className="text-sm text-gray-600">Automation, conversion optimization, and scaling tips</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="group rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      Get Expert Help Now
                      <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                    </Link>
                    <Link
                      href="/services"
                      className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-600 ring-2 ring-inset ring-primary-600 hover:bg-gray-50 transition-all hover:scale-105"
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
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                  Latest Articles
                </h2>
                <p className="text-lg text-gray-600">
                  Actionable insights to help your business grow online
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                {posts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-primary-300 hover:shadow-2xl transition-all hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {post.image && (
                      <div className="relative h-56 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-bold text-primary-600 shadow-lg">
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
                        <h3 className="text-2xl font-bold leading-8 text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-base leading-7 text-gray-600">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{post.readTime}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-accent-600 transition-colors"
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
      <section className="relative bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-5xl mb-6">📬</div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Get the latest web development tips, SEO strategies, and business growth insights. Join Houston business owners who are growing online.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group rounded-lg bg-white px-8 py-4 text-base font-semibold text-primary-900 shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Subscribe for Updates
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 text-base font-semibold leading-7 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Services
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              💡 Expert insights • 🚀 Growth strategies • 🎯 Actionable tips
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
