import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/app/lib/posts'
import Link from 'next/link'
import { siteConfig } from '@/app/config/site'
import { PageProps } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { metadata } = await import(`@/app/content/posts/${params.slug}.metadata`)
    
    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: 'article',
        publishedTime: metadata.date,
        authors: [siteConfig.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
        creator: '@fredzaw',
      },
    }
  } catch {
    return {}
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

type Props = PageProps<{
  params: {
    slug: string
  }
}>

export default async function PostPage({ params }: Props) {
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