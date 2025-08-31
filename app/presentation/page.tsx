'use client';

import { useState, useEffect } from 'react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "QuackDerby Protocol",
      subtitle: "The Future of Prediction Gaming",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center gap-4 mb-8">
            <img src="/ducks/king-duck.jpg" alt="King" className="w-20 h-20 rounded-full object-cover border-4 border-duck-primary/50 hover:scale-110 transition-transform" />
            <img src="/ducks/wizard-duck.jpg" alt="Wizard" className="w-20 h-20 rounded-full object-cover border-4 border-duck-purple/50 hover:scale-110 transition-transform" />
            <img src="/ducks/ninja-duck.jpg" alt="Ninja" className="w-20 h-20 rounded-full object-cover border-4 border-duck-accent/50 hover:scale-110 transition-transform" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-duck-white mb-4">
              Guess the Duck, Win Big
            </p>
            <p className="text-lg text-duck-gray">
              Strategic prediction game meets DeFi rewards
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-duck-dark/80 border border-duck-primary/30 rounded-xl p-4 text-center">
              <img src="/ducks/gamer-duck.jpg" alt="Play" className="w-12 h-12 mx-auto mb-2 rounded-full object-cover" />
              <p className="text-duck-primary font-bold">Easy to Play</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-yellow/30 rounded-xl p-4 text-center">
              <img src="/ducks/ceo-duck.jpg" alt="Earn" className="w-12 h-12 mx-auto mb-2 rounded-full object-cover" />
              <p className="text-duck-yellow font-bold">Real Rewards</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-purple/30 rounded-xl p-4 text-center">
              <img src="/ducks/viking-duck.jpg" alt="Battle" className="w-12 h-12 mx-auto mb-2 rounded-full object-cover" />
              <p className="text-duck-purple font-bold">Epic Battles</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Game",
      subtitle: "How QuackDerby Works",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-duck-dark/80 border border-duck-primary/30 rounded-2xl p-6 text-center">
              <img src="/ducks/detective-duck.jpg" alt="Choose" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-primary mb-2">1. Choose</h3>
              <p className="text-sm text-duck-gray">Pick 4 ducks in order</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-yellow/30 rounded-2xl p-6 text-center">
              <img src="/ducks/ceo-duck.jpg" alt="Bet" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-yellow mb-2">2. Bet</h3>
              <p className="text-sm text-duck-gray">Stake your DUCK tokens</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-purple/30 rounded-2xl p-6 text-center">
              <img src="/ducks/wizard-duck.jpg" alt="Wait" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-purple mb-2">3. Reveal</h3>
              <p className="text-sm text-duck-gray">QuackAI shows her picks</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-accent/30 rounded-2xl p-6 text-center">
              <img src="/ducks/viking-duck.jpg" alt="Win" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-accent mb-2">4. Win</h3>
              <p className="text-sm text-duck-gray">Claim your rewards</p>
            </div>
          </div>
          <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-2xl p-6 text-center">
            <p className="text-xl text-duck-white font-bold mb-2">
              Perfect Match = Jackpot
            </p>
            <p className="text-duck-gray">
              Right ducks, wrong order = smaller win. Strategy matters!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Token Economy", 
      subtitle: "Three Tokens, One Ecosystem",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-2xl p-6 text-center">
              <img src="/ducks/king-duck.jpg" alt="DUCK Token" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="font-bold text-duck-primary mb-2">DUCK Token</h3>
              <p className="text-sm text-duck-gray mb-3">Main betting currency</p>
              <div className="text-xs text-duck-white bg-duck-primary/20 rounded-lg p-2">
                Used for all game bets
              </div>
            </div>
            <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-2xl p-6 text-center">
              <img src="/ducks/pirate-duck.jpg" alt="QUACK Token" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="font-bold text-duck-yellow mb-2">QUACK Token</h3>
              <p className="text-sm text-duck-gray mb-3">Governance & voting</p>
              <div className="text-xs text-duck-white bg-duck-yellow/20 rounded-lg p-2">
                Earned by playing
              </div>
            </div>
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-2xl p-6 text-center">
              <img src="/ducks/wizard-duck.jpg" alt="DAT Tokens" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="font-bold text-duck-accent mb-2">DAT Tokens</h3>
              <p className="text-sm text-duck-gray mb-3">Revenue sharing</p>
              <div className="text-xs text-duck-white bg-duck-accent/20 rounded-lg p-2">
                5% of all bets
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-duck-primary/20 to-duck-yellow/20 border border-duck-primary/30 rounded-xl p-6 text-center">
            <img src="/ducks/samurai-duck.jpg" alt="Strategy" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
            <p className="text-duck-white font-bold text-lg">
              Play → Earn → Govern → Profit
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Why QuackDerby?",
      subtitle: "Fair Play Meets Big Rewards",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-2xl p-6">
              <img src="/ducks/detective-duck.jpg" alt="Fair" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-primary mb-4 text-center">100% Fair Game</h3>
              <ul className="space-y-3 text-duck-gray">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-primary rounded-full"></span>
                  No cheating possible
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-primary rounded-full"></span>
                  Transparent results
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-primary rounded-full"></span>
                  Provably random
                </li>
              </ul>
            </div>
            <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-2xl p-6">
              <img src="/ducks/ceo-duck.jpg" alt="Rewards" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-yellow mb-4 text-center">Real Rewards</h3>
              <ul className="space-y-3 text-duck-gray">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-yellow rounded-full"></span>
                  DUCK token prizes
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-yellow rounded-full"></span>
                  Governance voting power
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-duck-yellow rounded-full"></span>
                  Revenue sharing
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-duck-dark/50 border border-duck-accent/30 rounded-2xl p-6 text-center">
            <img src="/ducks/samurai-duck.jpg" alt="Honor" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
            <p className="text-duck-accent font-bold text-lg">
              Built on blockchain for maximum security and trust
            </p>
          </div>
        </div>
      )
    },
    {
      title: "The Ducks",
      subtitle: "Meet Your Champions",
      content: (
        <div className="space-y-8">
          <p className="text-center text-xl text-duck-gray mb-6">
            19 unique ducks, each with special powers and personalities
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center group">
              <img src="/ducks/astronaout-duck.jpg" alt="Astronaut" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Astronaut</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/ceo-duck.jpg" alt="CEO" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">CEO</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/chef-duck.jpg" alt="Chef" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Chef</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/cowboy-duck.jpg" alt="Cowboy" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Cowboy</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/cyberpunk-duck.jpg" alt="Cyberpunk" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Cyberpunk</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/detective-duck.jpg" alt="Detective" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Detective</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/dj-duck.jpg" alt="DJ" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">DJ</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/doctor-duck.jpg" alt="Doctor" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Doctor</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/firefighter-duck.jpg" alt="Firefighter" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Firefighter</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/football-duck.jpg" alt="Football" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Football</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/gamer-duck.jpg" alt="Gamer" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Gamer</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/king-duck.jpg" alt="King" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">King</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/ninja-duck.jpg" alt="Ninja" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Ninja</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/pharao-duck.jpg" alt="Pharao" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Pharao</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/pirate-duck.jpg" alt="Pirate" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Pirate</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/sailor-duck.jpg" alt="Sailor" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Sailor</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/samurai-duck.jpg" alt="Samurai" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Samurai</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/viking-duck.jpg" alt="Viking" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Viking</p>
            </div>
            <div className="text-center group">
              <img src="/ducks/wizard-duck.jpg" alt="Wizard" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-duck-primary/30 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-duck-gray mt-2">Wizard</p>
            </div>
          </div>
          
          <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-2xl p-6 text-center">
            <p className="text-lg text-duck-white font-bold">
              Each duck has unique traits that affect their chances
            </p>
            <p className="text-duck-gray mt-2">
              Learn their personalities to predict QuackAI's choices!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "Prediction Gaming Meets DeFi",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-duck-primary/20 border border-duck-primary/30 rounded-xl p-4">
              <img src="/ducks/ceo-duck.jpg" alt="Market" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
              <div className="text-2xl font-bold text-duck-primary">$2.8B</div>
              <div className="text-sm text-duck-gray">Prediction Markets</div>
            </div>
            <div className="bg-duck-yellow/20 border border-duck-yellow/30 rounded-xl p-4">
              <img src="/ducks/gamer-duck.jpg" alt="Gaming" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
              <div className="text-2xl font-bold text-duck-yellow">$180B</div>
              <div className="text-sm text-duck-gray">Gaming Market</div>
            </div>
            <div className="bg-duck-accent/20 border border-duck-accent/30 rounded-xl p-4">
              <img src="/ducks/pirate-duck.jpg" alt="DeFi" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
              <div className="text-2xl font-bold text-duck-accent">$60B</div>
              <div className="text-sm text-duck-gray">DeFi TVL</div>
            </div>
            <div className="bg-duck-purple/20 border border-duck-purple/30 rounded-xl p-4">
              <img src="/ducks/astronaout-duck.jpg" alt="Innovation" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
              <div className="text-2xl font-bold text-duck-purple">First</div>
              <div className="text-sm text-duck-gray">To Market</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-2xl p-6">
              <img src="/ducks/detective-duck.jpg" alt="Problem" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-primary mb-4 text-center">The Gap</h3>
              <ul className="space-y-2 text-duck-gray text-sm">
                <li>• Prediction markets lack engagement</li>
                <li>• DeFi protocols need fun use cases</li>
                <li>• Gaming needs real economic value</li>
                <li>• No fair way to monetize predictions</li>
              </ul>
            </div>
            <div className="bg-duck-dark/50 border border-duck-yellow/20 rounded-2xl p-6">
              <img src="/ducks/wizard-duck.jpg" alt="Solution" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h3 className="text-lg font-bold text-duck-yellow mb-4 text-center">Our Solution</h3>
              <ul className="space-y-2 text-duck-gray text-sm">
                <li>• Gamified prediction experience</li>
                <li>• Real crypto rewards & governance</li>
                <li>• Provably fair blockchain mechanics</li>
                <li>• Sustainable multi-token economy</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-duck-primary/20 to-duck-yellow/20 border border-duck-primary/30 rounded-2xl p-6 text-center">
            <img src="/ducks/viking-duck.jpg" alt="Opportunity" className="w-12 h-12 mx-auto mb-3 rounded-full object-cover" />
            <p className="text-xl font-bold text-duck-white">
              First mover advantage in prediction gaming
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Play?",
      subtitle: "Join the Duck Revolution",
      content: (
        <div className="space-y-8 text-center">
          <div className="flex justify-center gap-4 mb-8">
            <img src="/ducks/astronaout-duck.jpg" alt="Adventure" className="w-24 h-24 rounded-full object-cover border-4 border-duck-primary/50 animate-bounce" />
            <img src="/ducks/cyberpunk-duck.jpg" alt="Future" className="w-24 h-24 rounded-full object-cover border-4 border-duck-purple/50 animate-bounce delay-100" />
            <img src="/ducks/ninja-duck.jpg" alt="Stealth" className="w-24 h-24 rounded-full object-cover border-4 border-duck-accent/50 animate-bounce delay-200" />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-duck-white">
              Think You Can Beat QuackAI?
            </h3>
            <p className="text-xl text-duck-gray max-w-2xl mx-auto">
              Join thousands of players in the ultimate prediction battle. 
              Strategy, luck, and a little quack magic!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-duck-dark/80 border border-duck-primary/30 rounded-2xl p-6">
              <img src="/ducks/football-duck.jpg" alt="Compete" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h4 className="font-bold text-duck-primary mb-2">Compete & Win</h4>
              <p className="text-duck-gray">Battle other players and QuackAI for the ultimate prize pool</p>
            </div>
            <div className="bg-duck-dark/80 border border-duck-yellow/30 rounded-2xl p-6">
              <img src="/ducks/chef-duck.jpg" alt="Community" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
              <h4 className="font-bold text-duck-yellow mb-2">Join the Community</h4>
              <p className="text-duck-gray">Be part of the growing QuackDerby universe</p>
            </div>
          </div>
          
          <div className="mt-12">
            <a href="/race/0x1234567890123456789012345678901234567890" className="inline-block px-12 py-6 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-2xl text-2xl hover:shadow-2xl hover:shadow-duck-primary/30 transition-all transform hover:scale-105">
              Start Playing Now
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
    <div className="min-h-screen bg-duck-ink text-white relative">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="/main-ducks.jpg" 
          alt="Background ducks" 
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-duck-ink/70" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-duck-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-duck-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with progress */}
        <header className="p-6 border-b border-duck-primary/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="hover:scale-110 transition-transform"><img src="/ducks/king-duck.jpg" alt="Home" className="w-8 h-8 rounded-full object-cover" /></a>
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