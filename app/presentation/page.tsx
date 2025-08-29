'use client';

import { useState, useEffect } from 'react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "🦆 QuackDerby Protocol",
      subtitle: "Where DeFi Meets Duck Racing Excellence",
      content: (
        <div className="space-y-6">
          <div className="text-6xl text-center animate-bounce">🦆</div>
          <p className="text-xl text-duck-gray text-center">
            The Ultimate AI-Powered Prediction Market
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-3 py-1 bg-duck-primary/20 border border-duck-primary/30 rounded-full text-sm text-duck-primary">
              🧠 AI Economic Assets
            </span>
            <span className="px-3 py-1 bg-duck-purple/20 border border-duck-purple/30 rounded-full text-sm text-duck-purple">
              🎣 Modular Hooks
            </span>
            <span className="px-3 py-1 bg-duck-accent/20 border border-duck-accent/30 rounded-full text-sm text-duck-accent">
              🗳️ DAO Governance
            </span>
          </div>
        </div>
      )
    },
    {
      title: "🎯 The Problem",
      subtitle: "AI Agents Can't Own Their Intelligence",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-duck-accent mb-4">❌ Current State</h3>
              <ul className="space-y-2 text-duck-gray">
                <li>• AI creates valuable predictions</li>
                <li>• No way to prove ownership</li>
                <li>• Can't monetize intelligence</li>
                <li>• Users don't trust AI fairness</li>
                <li>• No economic incentives</li>
              </ul>
            </div>
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-duck-primary mb-4">✅ QuackDerby Solution</h3>
              <ul className="space-y-2 text-duck-gray">
                <li>• AI owns data as tradable DATs</li>
                <li>• ZK proofs verify authenticity</li>
                <li>• Automatic revenue sharing</li>
                <li>• TEE ensures tamper-proof AI</li>
                <li>• Sustainable token economics</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🧠 DAT Economic Layer",
      subtitle: "AI Agents as Programmable Economic Assets",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-duck-white mb-4">Digital Autonomous Tokens (DATs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-bold text-duck-primary">Data Ownership</h4>
                <p className="text-sm text-duck-gray">Cryptographic certificates proving AI created the prediction model</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎫</div>
                <h4 className="font-bold text-duck-yellow">Usage Rights</h4>
                <p className="text-sm text-duck-gray">Token-gated access to premium AI features and predictions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-bold text-duck-accent">Revenue Share</h4>
                <p className="text-sm text-duck-gray">Automatic 5% of all betting revenue distributed to DAT holders</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-duck-primary">
              <strong>Result:</strong> AI predictions become investable assets with provable value
            </p>
          </div>
        </div>
      )
    },
    {
      title: "🔐 ZK + TEE Security",
      subtitle: "Provably Fair AI Without Revealing Secrets",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-duck-purple/20 border border-duck-purple/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-duck-purple mb-4">🧮 Zero-Knowledge Proofs</h3>
              <ul className="space-y-2 text-duck-gray">
                <li>• AI proves predictions are legitimate</li>
                <li>• Training data stays secret</li>
                <li>• Mathematical verification</li>
                <li>• No trust required</li>
              </ul>
            </div>
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-duck-accent mb-4">🛡️ Trusted Execution</h3>
              <ul className="space-y-2 text-duck-gray">
                <li>• AI runs in secure hardware</li>
                <li>• Tamper-proof predictions</li>
                <li>• Verifiable randomness</li>
                <li>• No manipulation possible</li>
              </ul>
            </div>
          </div>
          <div className="text-center bg-duck-yellow/20 border border-duck-yellow/30 rounded-2xl p-4">
            <p className="text-duck-yellow font-bold">
              ⚡ Powered by LazAI + Alith SDK for verifiable AI inference
            </p>
          </div>
        </div>
      )
    },
    {
      title: "🗳️ Triple Token Economy",
      subtitle: "DUCK + QUACK + DAT = Sustainable Protocol",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🦆</div>
              <h3 className="font-bold text-duck-primary mb-2">DUCK Token</h3>
              <p className="text-sm text-duck-gray">Native currency for betting and gas fees</p>
              <div className="mt-3 text-xs text-duck-white">
                Primary betting asset
              </div>
            </div>
            <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-duck-yellow mb-2">QUACK Token</h3>
              <p className="text-sm text-duck-gray">Governance rights and protocol voting</p>
              <div className="mt-3 text-xs text-duck-white">
                Earned automatically by playing
              </div>
            </div>
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold text-duck-accent mb-2">DAT Tokens</h3>
              <p className="text-sm text-duck-gray">AI agent economic assets</p>
              <div className="mt-3 text-xs text-duck-white">
                Revenue share from AI licensing
              </div>
            </div>
          </div>
          <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-xl p-4">
            <p className="text-center text-duck-primary font-bold">
              🎯 All three tokens work together to create a sustainable, self-governing ecosystem
            </p>
          </div>
        </div>
      )
    },
    {
      title: "🎮 Game Experience",
      subtitle: "Simple UI, Sophisticated Backend",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-duck-white mb-4">👆 User Experience</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-duck-primary/10 rounded-lg">
                  <span className="text-2xl">1️⃣</span>
                  <span className="text-duck-gray">Click 4 ducks in order</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-primary/10 rounded-lg">
                  <span className="text-2xl">2️⃣</span>
                  <span className="text-duck-gray">Set bet amount in DUCK</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-primary/10 rounded-lg">
                  <span className="text-2xl">3️⃣</span>
                  <span className="text-duck-gray">Wait for AI reveal</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-primary/10 rounded-lg">
                  <span className="text-2xl">4️⃣</span>
                  <span className="text-duck-gray">Claim rewards</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-duck-white mb-4">⚡ Protocol Magic</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-duck-purple/10 rounded-lg">
                  <span className="text-2xl">🧠</span>
                  <span className="text-duck-gray">DAT revenue auto-distributed</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-purple/10 rounded-lg">
                  <span className="text-2xl">🗳️</span>
                  <span className="text-duck-gray">QUACK governance minted</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-purple/10 rounded-lg">
                  <span className="text-2xl">🎣</span>
                  <span className="text-duck-gray">Hooks execute automatically</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-duck-purple/10 rounded-lg">
                  <span className="text-2xl">🔐</span>
                  <span className="text-duck-gray">ZK proof validates AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🚀 Market Opportunity",
      subtitle: "First Mover in AI Economic Assets",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-duck-primary/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-duck-primary">$2.8B</div>
              <div className="text-sm text-duck-gray">Prediction Market Size</div>
            </div>
            <div className="bg-duck-yellow/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-duck-yellow">$50B</div>
              <div className="text-sm text-duck-gray">AI Market Size</div>
            </div>
            <div className="bg-duck-accent/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-duck-accent">$180B</div>
              <div className="text-sm text-duck-gray">DeFi TVL</div>
            </div>
            <div className="bg-duck-purple/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-duck-purple">0</div>
              <div className="text-sm text-duck-gray">AI Economic Platforms</div>
            </div>
          </div>
          <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-duck-primary mb-4 text-center">
              🎯 We're First to Market
            </h3>
            <ul className="space-y-2 text-duck-gray">
              <li>• No existing platforms for AI economic assets</li>
              <li>• Massive untapped market at intersection of AI + DeFi</li>
              <li>• First-mover advantage in DAT tokenization</li>
              <li>• Built on proven Uniswap v4 hook architecture</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "🏗️ Technical Architecture",
      subtitle: "Built for Scale and Security",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-duck-primary/10 border border-duck-primary/20 rounded-xl p-4">
              <h3 className="font-bold text-duck-primary mb-3">Core Contracts</h3>
              <ul className="text-sm text-duck-gray space-y-1">
                <li>• RaceCore.sol - Game engine</li>
                <li>• QuackToken.sol - Governance</li>
                <li>• DATRegistry.sol - AI assets</li>
                <li>• RaceFactory.sol - Race creation</li>
              </ul>
            </div>
            <div className="bg-duck-purple/10 border border-duck-purple/20 rounded-xl p-4">
              <h3 className="font-bold text-duck-purple mb-3">Hook Ecosystem</h3>
              <ul className="text-sm text-duck-gray space-y-1">
                <li>• FeeHook - Protocol fees</li>
                <li>• ReferralHook - Growth system</li>
                <li>• DATRevenueHook - AI revenue</li>
                <li>• GovernanceHook - DAO actions</li>
              </ul>
            </div>
          </div>
          <div className="bg-duck-accent/10 border border-duck-accent/20 rounded-xl p-4">
            <h3 className="font-bold text-duck-accent mb-3 text-center">🔐 Security Stack</h3>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl">🧮</div>
                <div className="text-sm text-duck-gray">ZK Proofs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">🛡️</div>
                <div className="text-sm text-duck-gray">TEE Hardware</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">📊</div>
                <div className="text-sm text-duck-gray">Smart Audits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">⏰</div>
                <div className="text-sm text-duck-gray">Timelock Governance</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "💡 Business Model",
      subtitle: "Multi-Revenue Stream Protocol",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-duck-primary/10 border border-duck-primary/20 rounded-xl p-6">
              <h3 className="font-bold text-duck-primary mb-4">📈 Revenue Streams</h3>
              <ul className="space-y-3 text-duck-gray">
                <li className="flex justify-between">
                  <span>Protocol fees</span>
                  <span className="text-duck-yellow font-bold">7%</span>
                </li>
                <li className="flex justify-between">
                  <span>Hook marketplace</span>
                  <span className="text-duck-yellow font-bold">5%</span>
                </li>
                <li className="flex justify-between">
                  <span>DAT trading fees</span>
                  <span className="text-duck-yellow font-bold">2.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>Premium AI access</span>
                  <span className="text-duck-yellow font-bold">Variable</span>
                </li>
              </ul>
            </div>
            <div className="bg-duck-accent/10 border border-duck-accent/20 rounded-xl p-6">
              <h3 className="font-bold text-duck-accent mb-4">🎯 Value Proposition</h3>
              <ul className="space-y-2 text-duck-gray text-sm">
                <li>• First AI economic asset platform</li>
                <li>• Self-governing protocol via QUACK DAO</li>
                <li>• Network effects from hook ecosystem</li>
                <li>• Sustainable revenue model</li>
                <li>• Scaling with AI adoption</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-duck-primary/20 to-duck-yellow/20 border border-duck-primary/30 rounded-xl p-4 text-center">
            <p className="text-duck-primary font-bold">
              💰 Total Addressable Market: AI + DeFi + Gaming = $280B+
            </p>
          </div>
        </div>
      )
    },
    {
      title: "🛣️ Roadmap",
      subtitle: "From MVP to Protocol Dominance",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-xl p-4">
                <h3 className="font-bold text-duck-primary mb-2">🎯 Phase 1: MVP (Current)</h3>
                <ul className="text-sm text-duck-gray space-y-1">
                  <li>✅ Core duck prediction game</li>
                  <li>✅ Basic smart contracts</li>
                  <li>✅ Mobile-optimized UI</li>
                  <li>✅ QUACK governance tokens</li>
                </ul>
              </div>
              <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-xl p-4">
                <h3 className="font-bold text-duck-yellow mb-2">🚀 Phase 2: Protocol</h3>
                <ul className="text-sm text-duck-gray space-y-1">
                  <li>• Full hook system deployment</li>
                  <li>• DAT registry and trading</li>
                  <li>• ZK + TEE integration</li>
                  <li>• DAO governance launch</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-duck-purple/20 border border-duck-purple/30 rounded-xl p-4">
                <h3 className="font-bold text-duck-purple mb-2">🌟 Phase 3: Ecosystem</h3>
                <ul className="text-sm text-duck-gray space-y-1">
                  <li>• Multiple AI agent onboarding</li>
                  <li>• Cross-chain DAT trading</li>
                  <li>• Advanced prediction markets</li>
                  <li>• Partnership integrations</li>
                </ul>
              </div>
              <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-xl p-4">
                <h3 className="font-bold text-duck-accent mb-2">🌍 Phase 4: Dominance</h3>
                <ul className="text-sm text-duck-gray space-y-1">
                  <li>• Standard for AI economic assets</li>
                  <li>• Institutional adoption</li>
                  <li>• Protocol franchise model</li>
                  <li>• Global AI marketplace</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🎯 Call to Action",
      subtitle: "Join the AI Economic Revolution",
      content: (
        <div className="space-y-8 text-center">
          <div className="text-6xl animate-pulse">🚀</div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-duck-primary">
              Ready to Build the Future?
            </h3>
            <p className="text-lg text-duck-gray">
              QuackDerby isn't just a game - it's the foundation for AI economic assets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-xl p-4">
              <div className="text-2xl mb-2">🔨</div>
              <h4 className="font-bold text-duck-primary">For Builders</h4>
              <p className="text-sm text-duck-gray">Deploy hooks, create DATs, build on our protocol</p>
            </div>
            <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-xl p-4">
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-bold text-duck-yellow">For AI Agents</h4>
              <p className="text-sm text-duck-gray">Monetize your intelligence, own your data</p>
            </div>
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-xl p-4">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-bold text-duck-accent">For Investors</h4>
              <p className="text-sm text-duck-gray">Early access to AI economic asset revolution</p>
            </div>
          </div>
          <div className="mt-8">
            <a href="/race/0x2345678901234567890123456789012345678901" className="inline-block px-8 py-4 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl text-xl hover:shadow-lg hover:shadow-duck-primary/50 transition-all transform hover:scale-105">
              🦆 Try QuackDerby Now
            </a>
          </div>
        </div>
      )
    }
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-duck-ink text-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-duck-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-duck-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with progress */}
        <header className="p-6 border-b border-duck-primary/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl hover:scale-110 transition-transform">🦆</a>
              <div>
                <h1 className="text-xl font-bold text-duck-primary">QuackDerby Protocol</h1>
                <p className="text-sm text-duck-gray">Pitch Presentation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-duck-gray">
                {currentSlide + 1} / {slides.length}
              </div>
              <div className="flex gap-1">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentSlide ? 'w-8 bg-duck-primary' : 'w-2 bg-duck-gray/50 hover:bg-duck-gray'
                    }`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main slide content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-duck-white mb-4">
                {currentSlideData.title}
              </h2>
              <p className="text-xl text-duck-primary">
                {currentSlideData.subtitle}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {currentSlideData.content}
            </div>
          </div>
        </main>

        {/* Navigation footer */}
        <footer className="p-6 border-t border-duck-primary/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 bg-duck-dark-gray text-duck-gray rounded-lg hover:bg-duck-dark-gray/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            <div className="text-center">
              <p className="text-sm text-duck-gray mb-1">Use arrow keys or click to navigate</p>
              <div className="flex items-center gap-2 text-xs text-duck-gray">
                <span>🎯</span>
                <span>Built with QuackDerby Protocol</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-duck-primary text-duck-ink font-bold rounded-lg hover:bg-duck-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}