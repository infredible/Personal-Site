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
          Designer at Uniswap Labs bringing the world on-chain and unlocking a more free and open financial system. Before crypto, worked on a breadth of industries including AI and spatial computing.
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
                <div>{post.description}</div>
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
              <div>Building an improved liquidity provision UX for investors.</div>
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
              <div>Introducing token exploration and market analysis to our exchange.</div>
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
              <div>Improving the trading experience by adding trade types, education, and removing friction.</div>
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
              <div>Developing TikTok Effect House from zero to one: a desktop application for effects creators.</div>
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
              <div>Leading the design of an intuitive 3D capture system that transforms physical spaces into digital twins.</div>
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
        <div className="flex gap-2">
          <a href="https://x.com/fredzaw" target="_blank" rel="noopener noreferrer" className="link-button">Twitter</a>
          <a href="https://read.cv/fredzaw" target="_blank" rel="noopener noreferrer" className="link-button">Read.cv</a>
          <a href="https://www.instagram.com/_burmaboy/" target="_blank" rel="noopener noreferrer" className="link-button">Instagram</a>

        </div>
      </section>
    </div>
  );
}

interface WorkItem {
  title: string;
  description: string;
  company: string;
  period: string;
  url: string;
}

interface ThoughtItem {
  title: string;
  description: string;
  year: string;
}

export const workItems: WorkItem[] = [
  {
    title: "Anyone can cook (provide liquidity to exchange markets)",
    description: "Building an improved liquidity provision UX for investors.",
    company: "Uniswap Labs", 
    period: "2022 - Present",
    url: "/project-page"
  },
  {
    title: "Making sense of the crypto market",
    description: "Introducing token exploration and market analysis to our exchange.",
    company: "Uniswap Labs",
    period: "2022 - Present",
    url: "#"
  },
  {
    title: "Effortless token trading",
    description: "Improving the trading experience by adding trade types, education, and removing friction.",
    company: "Uniswap Labs",
    period: "2022 - Present",
    url: "#"
  },
  {
    title: "Empowering creators with AR and computer vision",
    description: "Developing TikTok Effect House from zero to one: a desktop application for effects creators.",
    company: "TikTok",
    period: "2021",
    url: "#"
  },
  {
    title: "Mapping the built world",
    description: "Leading the design of an intuitive 3D capture system that transforms physical spaces into digital twins.",
    company: "Matterport",
    period: "2019 - 2021",
    url: "#"
  },
  {
    title: "Redefining shopping wth AR and AI",
    description: "An innovative shopping experience for enthusiasts, incorporating AR try-ons, visual search, and chat-based AI.",
    company: "Ebay",
    period: "2017 - 2018",
    url: "#"
  },
  // Add other work items...
];

export const thoughtItems: ThoughtItem[] = [
  {
    title: "Why our crypto experiment at the farmers market failed",
    description: "Introducing token exploration and market analysis to our exchange.",
    year: "2024"
  },
  // Add other thought items...
];
