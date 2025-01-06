import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'app/content/posts')

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(fileName => fileName.endsWith('.metadata.ts'))

  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.metadata\.ts$/, '')
    const { metadata } = await import(`@/app/content/posts/${id}.metadata`)

    return {
      id,
      ...metadata
    }
  }))

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
} 