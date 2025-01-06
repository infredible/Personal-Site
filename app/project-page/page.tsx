export default function ProjectPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 10H4.16666M4.16666 10L9.16666 15M4.16666 10L9.16666 5" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Home
        </Link>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-gray-600">Next project</span>
        </div>
      </nav>

      {/* Project Header */}
      <header className="mb-16">
        <div className="mb-4">
          <span className="text-gray-600">Uniswap Labs</span>
          <span className="text-gray-600 mx-2">·</span>
          <span className="text-gray-600">2022 - 2024</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Making sense of the market</h1>
        <p className="text-xl text-gray-800 max-w-2xl">
          Introducing token exploration and market analysis to our exchange.
        </p>
      </header>

      {/* Project Content */}
      <div className="prose max-w-2xl">
        <p>
          In the fast-paced world of decentralized finance (DeFi), informed decision-making is key to successful trading. 
          At Uniswap Labs, we recognized a significant gap in our platform: while users could trade tokens easily, they 
          lacked the tools to explore and analyze the market effectively. To address this, we embarked on a project 
          to introduce token exploration and market analysis features, empowering our users with the information 
          they need to navigate the world of decentralized exchanges.
        </p>

        <p>
          The challenge was multifaceted. First, our users had no way to discover new tokens or evaluate trending ones 
          without relying on third-party tools. This not only fragmented their experience but also reduced the time 
          spent on our platform. Additionally, for both new and experienced traders, the wealth of market data—such 
          as price trends, liquidity, and volume—could feel overwhelming and inaccessible without proper guidance.
        </p>
      </div>
    </div>
  );
} 