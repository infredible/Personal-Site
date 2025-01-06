import { getAllPosts } from './lib/posts'
import { siteConfig } from './config/site'

export default async function sitemap() {
  const posts = await getAllPosts()

  const blogs = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.id}`,
    lastModified: post.date,
  }))

  const routes = [''].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...blogs]
} 