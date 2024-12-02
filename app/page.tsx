export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen font-sans">
      {/* Header/Bio Section */}
      <section className="mb-24 grid grid-cols-[8rem_1fr] gap-8 pt-[160px] pb-[24px]">
        <h2 className="text-xl max-w-36">Fred</h2>
        <p className="text-gray-800 leading-relaxed max-w-2xl text-xl">
          Designer at Uniswap Labs bringing the world on-chain and unlocking more free and open financial system. Before crypto, worked on a wide breadth of industries including AI and spatial computing.
        </p>
      </section>

      {/* Work Section */}
      <section className="mb-24 grid grid-cols-[8rem_1fr] gap-8 py-[40px]">
        <h2 className="text-xl mb-8 max-w-36">Work</h2>
        <div>
        {workItems.map((item) => (
          <div key={item.title} className="grid grid-cols-[3fr_1fr] gap-8 mb-8 py-1 max-w-2xl">
            <div>
              <a href={item.url} className="name-and-title">
                <div className="font-bold">{item.title}</div>
                <div>{item.description}</div>
              </a>
            </div>
            <div className="company-and-period">
              <div>{item.company}</div>
              <div className="time-period">{item.period}</div>
            </div>
          </div>
        ))}
        </div>
      </section>

      {/* Thoughts Section */}
      <section className="mb-24 grid grid-cols-[8rem_1fr] gap-8 py-[24px]">
        <h2 className="text-xl mb-8 max-w-36">Thoughts</h2>
        {thoughtItems.map((item) => (
          <div key={item.title} className={`grid grid-cols-[3fr_1fr] gap-8 mb-8 py-1 max-w-2xl ${item.url === '' ? 'disabled-item' : ''}`}>
            <div>
              <div className="font-bold">{item.title}</div>
              <div className="text-gray-600">{item.description}</div>
            </div>
            <div className="time-period">{item.year}</div>
          </div>
        ))}
      </section>

      {/* Links Section */}
      <section className="mb-24 grid grid-cols-[8rem_1fr] gap-8 py-[24px]">
        <h2 className="text-xl mb-4 max-w-36">Links</h2>
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
    url: ''
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
