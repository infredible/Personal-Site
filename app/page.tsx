import { Metadata } from 'next'
import { siteConfig } from './config/site'
import { getAllPosts } from './lib/posts'
import { getAllProjects } from './lib/projects'
import { getWeather } from './lib/weather'
import { ArrowUpRight } from 'lucide-react'
import PrototypeStories from './components/PrototypeStories'
import Image from 'next/image'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function Home() {
  const posts = await getAllPosts()
  const projects = await getAllProjects()
  const weather = await getWeather()
  
  // Convert temperature from Celsius to Fahrenheit
  const tempF = Math.round(weather.current.temperature_2m * 9/5 + 32)
  
  // Helper function to get the company icon
  const getCompanyIcon = (company: string | undefined) => {
    if (!company) return null;
    
    if (company.includes('Uniswap')) {
      return '/icons/Uniswap.png';
    } else if (company.includes('TikTok')) {
      return '/icons/TikTok.png';
    }
    return null;
  };
  
  return (
    <div className="page-content">
      {/* Header/Bio Section */}
      <section className="section">
        <div className="title-and-description" style={{ gap: '4px' }}>
          <h2 className="section-title">Fred Zaw</h2>
          <div className="company-and-period text-sm">
              <div>Oakland, CA  •  {tempF}°</div>
          </div>
        </div>
        <p>
          Designer at Uniswap Labs unlocking a more free and open financial system. Before crypto, worked on a breadth of industries including AI and spatial computing.
        </p>
        <div className="section-content"> 
          <PrototypeStories prototypes={[
            { 
              id: 'Drag to Swap', 
              title: 'Drag to Swap', 
              description: 'Drag to Swap', 
              videoUrl: '/projects/swap/drag-to-swap.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'Token Pad', 
              title: 'Token Pad', 
              description: 'Token Pad', 
              videoUrl: '/projects/swap/token-pad.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'Mobile Navigation', 
              title: 'Mobile Navigation', 
              description: 'Mobile Navigation', 
              videoUrl: '/projects/swap/mobile-navigation.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'Permit2', 
              title: 'Permit2', 
              description: 'Permit2', 
              videoUrl: '/projects/swap/Permit2.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'Mini Charts', 
              title: 'Mini Charts', 
              description: 'Mini Charts', 
              videoUrl: '/projects/misc/mini-chart.mp4',
              objectFit: 'contain',
              padding: '52px 0 24px 0',
            },
            { 
              id: 'Trade Type Switcher', 
              title: 'Trade Type Switcher', 
              description: 'Trade Type Switcher', 
              videoUrl: '/projects/swap/trade-type-switcher.mp4',
              objectFit: 'cover',
            },
            // { 
            //   id: 'proto4', 
            //   title: 'Prototype Four', 
            //   description: 'Description for prototype four.', 
            //   videoUrl: '/projects/swap/mini-charts.mp4',
            //   objectFit: 'cover'
            // },
            { 
              id: 'Cortex Install', 
              title: 'Cortex Install', 
              description: 'Cortex Install', 
              videoUrl: '/projects/misc/cortex-install.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'TTEH Demo', 
              title: 'TTEH Demo', 
              description: 'TTEH Demo', 
              videoUrl: '/projects/tiktok/demo.mp4',
              objectFit: 'cover'
            },
            { 
              id: 'MP Tilt', 
              title: 'MP Tilt', 
              description: 'MP Tilt', 
              videoUrl: '/projects/misc/mp-tilt.mp4',
              objectFit: 'contain'
            },
            { 
              id: 'Pan Guidance', 
              title: 'Pan Guidance', 
              description: 'Pan Guidance', 
              videoUrl: '/projects/misc/pan-guidance.mp4',
              objectFit: 'contain'
            },
            { 
              id: 'MP Scan', 
              title: 'MP Scan', 
              description: 'MP Scan', 
              videoUrl: '/projects/misc/mp-scan.mp4',
              objectFit: 'contain'
            },
            { 
              id: 'AR Guidance', 
              title: 'AR Guidance', 
              description: 'AR Guidance', 
              videoUrl: '/projects/misc/ar-guidance.mp4',
              objectFit: 'contain'
            },
            { 
              id: 'Waypoints', 
              title: 'Waypoints', 
              description: 'Waypoints', 
              videoUrl: '/projects/misc/waypoints.mp4',
              objectFit: 'contain'
            },
            { 
              id: 'Ebay Passions', 
              title: 'Ebay Passions', 
              description: 'Ebay Passions', 
              videoUrl: '/projects/misc/ebay-passions.mp4',
              objectFit: 'cover'
            },
            // { 
            //   id: 'Matternet', 
            //   title: 'Matternet', 
            //   description: 'Matternet', 
            //   videoUrl: '/projects/misc/matternet.mp4',
            //   objectFit: 'contain'
            // },

          ]} />
        </div>
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
                  <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center'}}>
                    {project.company && (
                      <>
                        {getCompanyIcon(project.company) && (
                          <Image 
                            src={getCompanyIcon(project.company)!}
                            alt={`${project.company} logo`}
                            width={14}
                            height={14}
                            style={{ display: 'inline-block', marginRight: '6px' , borderRadius: '4px', padding: '2px 0'}}
                          />
                        )}
                        <span>{project.company}</span>
                      </>
                    )}
                  </div>
                  <div>{project.date}</div>
              </div>
            </a>
          ))}
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