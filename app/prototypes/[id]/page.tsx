import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getAllPrototypes } from '@/app/lib/prototypes'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const prototypes = await getAllPrototypes()
  const prototype = prototypes.find((p) => p.id === params.id)
  
  if (!prototype) {
    return {
      title: 'Prototype Not Found',
    }
  }

  return {
    title: `${prototype.title} | Prototype`,
    description: prototype.description,
  }
}

export default async function PrototypePage({ params }: { params: { id: string } }) {
  const prototypes = await getAllPrototypes()
  const prototype = prototypes.find((p) => p.id === params.id)
  
  if (!prototype) {
    notFound()
  }

  return (
    <div className="page-content blog-content">
      <div className="back-link">
        <Link href="/">
          <ArrowLeft size={16} />
          <span>Home</span>
        </Link>
      </div>
      
      <article className="prose">
        <h1>{prototype.title}</h1>
        <div className="time-period">{new Date(prototype.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        })}</div>
        
        <p>{prototype.description}</p>
        
        {prototype.videoUrl && (
          <div className="video-container with-border">
            <video 
              controls 
              autoPlay 
              muted
              playsInline
              loop
              src={prototype.videoUrl} 
            />
            <p className="video-caption">{prototype.title} prototype demonstration</p>
          </div>
        )}
      </article>
    </div>
  )
} 