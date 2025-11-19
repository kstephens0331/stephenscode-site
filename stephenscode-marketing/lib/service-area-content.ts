import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content/service-areas')

export interface ServiceAreaContent {
  slug: string
  content: string
  // Optional frontmatter overrides
  title?: string
  metaDescription?: string
  heroSubtitle?: string
}

// Ensure the directory exists
function ensureDirectory() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true })
  }
}

export async function getServiceAreaContent(slug: string): Promise<ServiceAreaContent | null> {
  ensureDirectory()

  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      content: contentHtml,
      title: data.title,
      metaDescription: data.metaDescription,
      heroSubtitle: data.heroSubtitle,
    }
  } catch (error) {
    console.error(`Error loading service area content for ${slug}:`, error)
    return null
  }
}

export function hasServiceAreaContent(slug: string): boolean {
  ensureDirectory()
  const fullPath = path.join(contentDirectory, `${slug}.md`)
  return fs.existsSync(fullPath)
}

export function getAllServiceAreaContentSlugs(): string[] {
  ensureDirectory()

  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}
