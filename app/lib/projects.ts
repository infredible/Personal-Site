import fs from 'fs'
import path from 'path'

const projectsDirectory = path.join(process.cwd(), 'app/content/projects')

export async function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory)
    .filter(fileName => fileName.endsWith('.metadata.ts'))

  const allProjectsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.metadata\.ts$/, '')
    const { metadata } = await import(`@/app/content/projects/${id}.metadata`)

    return {
      id,
      ...metadata
    }
  }))

  // Sort by index (lower index values show first)
  return allProjectsData.sort((a, b) => (a.index - b.index))
} 