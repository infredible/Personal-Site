import fs from 'fs'
import path from 'path'

const prototypesDirectory = path.join(process.cwd(), 'app/content/prototypes')

export async function getAllPrototypes() {
  // Create the directory if it doesn't exist
  if (!fs.existsSync(prototypesDirectory)) {
    fs.mkdirSync(prototypesDirectory, { recursive: true });
    return []; // Return empty array if no prototypes exist yet
  }

  const fileNames = fs.readdirSync(prototypesDirectory)
    .filter(fileName => fileName.endsWith('.metadata.ts'))

  const allPrototypesData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.metadata\.ts$/, '')
    const { metadata } = await import(`@/app/content/prototypes/${id}.metadata`)

    return {
      id,
      ...metadata
    }
  }))

  // Sort by index (lower index values show first)
  return allPrototypesData.sort((a, b) => (a.index - b.index))
} 