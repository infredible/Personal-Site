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
        <p className="section-content bio">
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
                <div className="font-bold">{post.title}</div>
                <div className="content-description">{post.description}</div>
              </div>
              <div className="company-and-period">
                <div className="time-period">
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
              <div className="font-bold">Anyone can <s>cook</s> (provide liquidity to exchange markets)</div>
              <div className="content-description">Building an improved liquidity provision UX for investors.</div>
            </div>
            <div className="company-and-period">
              <div className="company">Uniswap Labs</div>
              <div className="time-period">2025</div>
            </div>
          </div>

          {/* Work item */}
          <div className="work-item disabled-item">
            <div className="title-and-description">
              <div className="font-bold">Making sense of the crypto market</div>
              <div className="content-description">Introducing token exploration and market analysis to our exchange.</div>
            </div>
            <div className="company-and-period">
              <div className="company">Uniswap Labs</div>
              <div className="time-period">2024</div>
            </div>
          </div>

          {/* Work item */}
          <div className="work-item disabled-item">
            <div className="title-and-description">
              <div className="font-bold">Effortless token trading</div>
              <div className="content-description">Improving the trading experience by adding trade types, education, and removing friction.</div>
            </div>
            <div className="company-and-period">
              <div className="company">Uniswap Labs</div>
              <div className="time-period">2024</div>
            </div>
          </div>

          {/* Work item */}
          <a href="https://effecthouse.tiktok.com/" target="_blank" rel="noopener noreferrer" className="work-item">
            <div className="title-and-description">
              <div className="font-bold">Empowering creators with AR and computer vision</div>
              <div className="content-description">Developing TikTok Effect House from zero to one: a desktop application for effects creators.</div>
            </div>
            <div className="company-and-period">
              <div className="company">TikTok</div>
              <div className="time-period">2021</div>
            </div>
          </a>

          {/* Work item */}
          <a href="https://coolhunting.com/tech/make-3d-digital-clones-matterport-capture/" target="_blank" rel="noopener noreferrer" className="work-item">
            <div className="title-and-description">
              <div className="font-bold">Mapping the built world</div>
              <div className="content-description">Leading the design of an intuitive 3D capture system that transforms physical spaces into digital twins.</div>
            </div>
            <div className="company-and-period">
              <div className="company">Matterport</div>
              <div className="time-period">2021</div>
            </div>
          </a>

        </div>
      </section>

      {/* Links Section */}
      <section className="section">
        <h2 className="section-title"></h2>
        <div className="button-group">
          <a href="https://x.com/fredzaw" target="_blank" rel="noopener noreferrer" className="link-button">Twitter</a>
          <a href="https://read.cv/fredzaw" target="_blank" rel="noopener noreferrer" className="link-button">Read.cv</a>
          <a href="https://www.instagram.com/_burmaboy/" target="_blank" rel="noopener noreferrer" className="link-button">Instagram</a>

        </div>
      </section>
    </div>
  );
}