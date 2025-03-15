import { Metadata } from 'next'
import { siteConfig } from './config/site'
import { getAllPosts } from './lib/posts'
import { getAllProjects } from './lib/projects'
import { getAllPrototypes } from './lib/prototypes'
import { ArrowUpRight } from 'lucide-react'
import PrototypeStack from './components/PrototypeStack'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function Home() {
  const posts = await getAllPosts()
  const projects = await getAllProjects()
  const prototypes = await getAllPrototypes()
  
  return (
    <div className="page-content">
      {/* Header/Bio Section */}
      <section className="section">
        <h2 className="section-title">Fred Zaw</h2>
        <p>
          Designer at Uniswap Labs unlocking a more free and open financial system. Before crypto, worked on a breadth of industries including AI and spatial computing.
        </p>
      </section>


      {/* Projects Section */}
      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="section-content">
          {projects.map((project) => (
            <a 
              key={project.id}
              href={`/projects/${project.id}`} 
              className="work-item"
            >
              <div className="title-and-description">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="company-and-period text-sm">
                  <div>{project.company && <span>{project.company}</span>}</div>
                  <div>{project.date}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Prototypes Section */}
      <section className="section">
        <h2 className="section-title">Prototypes</h2>
        <div className="section-content">
          {prototypes.length > 0 ? (
            <PrototypeStack prototypes={prototypes} />
          ) : (
            <p className="text-sm text-tertiary">No prototypes available yet.</p>
          )}
        </div>
      </section>

      {/* Thoughts Section */}
      <section className="section">
        <h2 className="section-title">Thoughts</h2>
        <div className="section-content">
          {posts.map((post) => (
            <a 
              key={post.id}
              href={`/posts/${post.id}`} 
              className="work-item"
            >
              <div className="title-and-description">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <div className="company-and-period">
                <div className="text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>



      {/* Links Section */}
      <section className="section">
        <h2 className="section-title">Elsewhere</h2>
        <div className="button-group">
          <a href="https://x.com/fredzaw" target="_blank" rel="noopener noreferrer">Twitter <ArrowUpRight size={14} /></a>
          <a href="https://read.cv/fredzaw" target="_blank" rel="noopener noreferrer">Read.cv <ArrowUpRight size={14} /></a>
          <a href="https://www.instagram.com/_burmaboy/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a>
        </div>
      </section>
    </div>
  );
}