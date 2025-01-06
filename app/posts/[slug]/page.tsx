import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/app/lib/posts'
import Link from 'next/link'
import { siteConfig } from '@/app/config/site'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { metadata } = await import(`@/app/content/posts/${params.slug}.metadata`)
    
    // Ensure we have a base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL is not set')
    }

    const ogUrl = new URL('/api/og', baseUrl)
    ogUrl.searchParams.set('title', metadata.title)
    ogUrl.searchParams.set('date', metadata.date)
    
    const ogImage = ogUrl.toString()
    console.log('Generated OG Image URL:', ogImage) // Debug log

    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: 'article',
        publishedTime: metadata.date,
        authors: [siteConfig.name],
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
        creator: '@fredzaw',
        images: [ogImage],
      },
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {}
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
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