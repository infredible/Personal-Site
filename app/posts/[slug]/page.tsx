import { notFound } from 'next/navigation'
import { getAllPosts } from '@/app/lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const { metadata } = await import(`@/app/content/posts/${slug}.metadata`)
    const Content = await import(`@/app/content/posts/${slug}.mdx`)

    return (
      <div className="page-content blog-content">
        <Link href="/" className="back-link">
          ← Back
        </Link>
        
        <article>
          <div className="prose dark:prose-invert max-w-none">
            <h1>{metadata.title}</h1>
            <div className="text-sm var(--text-tertiary) mb-8">
              {new Date(metadata.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <Content.default />
          </div>
        </article>
      </div>
    )
  } catch {
    notFound()
  }
} 