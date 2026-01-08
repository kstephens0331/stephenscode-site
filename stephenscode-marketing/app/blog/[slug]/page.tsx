import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import Breadcrumbs from '@/components/Breadcrumbs'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://www.stephenscode.dev/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
          <div>
            <div className="flex items-center gap-x-4 text-sm mb-6">
              <time dateTime={post.date} className="text-gray-200">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="rounded-full bg-white/20 px-3 py-1.5 font-medium backdrop-blur">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
              {post.title}
            </h1>
            <p className="text-xl leading-8 text-gray-200">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🎖️
              </div>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-gray-200">Founder & Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <article className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div
            className="prose prose-lg prose-primary max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-6
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-600 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.stephenscode.dev/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                𝕏
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.stephenscode.dev/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                f
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://www.stephenscode.dev/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                in
              </a>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary-100 flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0">
                🎖️
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">About the Author</h3>
                <p className="text-sm font-medium text-primary-600 mb-2">{post.author}</p>
                <p className="text-gray-600 text-sm leading-6">
                  Kyle Stephens is a Marine Corps veteran and founder of StephensCode, a web development company
                  serving small businesses in the Greater Houston area. With 14+ years of experience building
                  custom websites, he helps local businesses compete online through fast, SEO-optimized websites
                  at transparent flat-rate prices.
                </p>
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/about"
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Learn more about Kyle →
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Get in touch →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-12">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-x-4 text-xs mb-4">
                      <time dateTime={relatedPost.date} className="text-gray-500">
                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary-600">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                      >
                        Read more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary-900 text-white">
        <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Need Help with Your Website?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Let's discuss your project. Free consultation, transparent pricing, veteran-owned quality.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-accent-600"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="text-base font-semibold leading-7 text-white hover:text-gray-200"
              >
                View Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
