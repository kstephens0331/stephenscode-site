import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  image?: string
  readTime?: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  category: string
  tags: string[]
  image?: string
  readTime?: string
}

// Ensure the blog directory exists
function ensureBlogDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

export function getAllPosts(): BlogPostMetadata[] {
  ensureBlogDirectory()

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        author: data.author || 'Kyle Stephens',
        excerpt: data.excerpt || '',
        category: data.category || 'General',
        tags: data.tags || [],
        image: data.image || '',
        readTime: data.readTime || '5 min read',
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureBlogDirectory()

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      author: data.author || 'Kyle Stephens',
      excerpt: data.excerpt || '',
      content: contentHtml,
      category: data.category || 'General',
      tags: data.tags || [],
      image: data.image || '',
      readTime: data.readTime || '5 min read',
    }
  } catch (error) {
    return null
  }
}

export function getPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts.map(post => post.category)
  return Array.from(new Set(categories))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap(post => post.tags)
  return Array.from(new Set(tags))
}
