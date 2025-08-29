'use client';

import { useState, useEffect } from 'react';

interface GameRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameRulesModal({ isOpen, onClose }: GameRulesModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      emoji: '🧠',
      title: 'Meet QuackAI',
      content: 'The AI has secretly picked 4 ducks in a specific ORDER using verifiable ZK proofs and TEE security. Her choices are locked via cryptographic commitment.',
    },
    {
      emoji: '📝',
      title: 'Your Challenge',
      content: 'Pick exactly 4 ducks in the ORDER you think the AI chose them. Position 1, 2, 3, 4 - order matters A LOT!',
    },
    {
      emoji: '💰',
      title: 'Triple Token Rewards',
      content: 'Win DUCK tokens from the prize pool + earn QUACK governance tokens automatically + DAT holders get 5% revenue share from all bets!',
    },
    {
      emoji: '🗳️',
      title: 'Governance Power',
      content: 'Every bet earns you QUACK tokens = voting rights in the protocol! Stake them for 2x voting power and help decide the future.',
    },
    {
      emoji: '🎣',
      title: 'Advanced Protocol',
      content: 'Built on modular hooks + DAT economic assets + ZK-verified AI data. Your simple duck picks power a sophisticated DeFi protocol!',
    },
    {
      emoji: '⚡',
      title: 'Game Flow',
      content: '24h to choose your 4 ducks in order → AI reveals with ZK proof → Payouts in DUCK + QUACK governance rewards + DAT revenue sharing!',
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-duck-dark border border-duck-primary/30 rounded-2xl p-8 max-w-md w-full transform transition-all animate-bounce-in">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl animate-pulse">
          {currentStep.emoji}
        </div>
        
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-duck-primary mb-4">
            {currentStep.title}
          </h2>
          
          <p className="text-duck-light-gray text-lg mb-8">
            {currentStep.content}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-8 bg-duck-primary' : 'w-2 bg-duck-gray/50'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-3 bg-duck-dark-gray text-duck-gray rounded-xl hover:bg-duck-dark-gray/80 transition-colors"
              >
                Back
              </button>
            )}
            
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 px-6 py-3 bg-duck-primary text-duck-ink font-bold rounded-xl hover:bg-duck-yellow/90 transition-all transform hover:scale-105"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl hover:shadow-lg hover:shadow-duck-primary/50 transition-all transform hover:scale-105"
              >
                Let\'s Quack! 🦆
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}