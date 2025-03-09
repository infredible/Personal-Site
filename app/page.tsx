import { Metadata } from 'next'
import { siteConfig } from './config/site'
import { getAllPosts } from './lib/posts'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function Home() {
  const posts = await getAllPosts()
  
  return (
    <div className="page-content">
      {/* Header/Bio Section */}
      <section className="section">
        <h2 className="section-title">Fred</h2>
        <p>
          Designer at Uniswap Labs unlocking a more free and open financial system. Before crypto, worked on a breadth of industries including AI and spatial computing.
        </p>
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

      {/* Work Section */}
      <section className="section">
        <h2 className="section-title">Work</h2>
        <div className="section-content">

          {/* Work item */}
          <div className="work-item disabled-item">
            <div className="title-and-description">
              <h3>Anyone can <s>cook</s> (provide liquidity to exchange markets)</h3>
              <p>Building an improved liquidity provision UX for investors.</p>
            </div>
            <div className="company-and-period text-sm">
              <div>Uniswap Labs</div>
              <div>2025</div>
            </div>
          </div>

          {/* Work item */}
          <div className="work-item disabled-item">
            <div className="title-and-description">
              <h3>Making sense of the crypto market</h3>
              <p>Introducing token exploration and market analysis to our exchange.</p>
            </div>
            <div className="company-and-period text-sm">
              <div>Uniswap Labs</div>
              <div>2024</div>
            </div>
          </div>

          {/* Work item */}
          <div className="work-item disabled-item">
            <div className="title-and-description">
              <h3>Effortless token trading</h3>
              <p>Improving the trading experience by adding trade types, education, and removing friction.</p>
            </div>
            <div className="company-and-period text-sm">
              <div>Uniswap Labs</div>
              <div>2024</div>
            </div>
          </div>

          {/* Work item */}
          <a href="https://effecthouse.tiktok.com/" target="_blank" rel="noopener noreferrer" className="work-item">
            <div className="title-and-description">
              <h3>Empowering creators with AR and computer vision</h3>
              <p>Developing TikTok Effect House from zero to one: a desktop application for effects creators.</p>
            </div>
            <div className="company-and-period text-sm">
              <div>TikTok</div>
              <div>2021</div>
            </div>
          </a>

          {/* Work item */}
          <a href="https://coolhunting.com/tech/make-3d-digital-clones-matterport-capture/" target="_blank" rel="noopener noreferrer" className="work-item">
            <div className="title-and-description">
              <h3>Mapping the built world</h3>
              <p>Leading the design of an intuitive 3D capture system that transforms physical spaces into digital twins.</p>
            </div>
            <div className="company-and-period text-sm">
              <div>Matterport</div>
              <div>2021</div>
            </div>
          </a>

        </div>
      </section>

      {/* Links Section */}
      <section className="section">
        <h2 className="section-title">Elsewhere</h2>
        <div className="button-group">
          <a href="https://x.com/fredzaw" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://read.cv/fredzaw" target="_blank" rel="noopener noreferrer">Read.cv</a>
          <a href="https://www.instagram.com/_burmaboy/" target="_blank" rel="noopener noreferrer">Instagram</a>

        </div>
      </section>
    </div>
  );
}