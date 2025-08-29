'use client';

import { useEffect, useState } from 'react';
import { RaceState } from '@/types';

interface AIBanterProps {
  messages: string[];
  state: RaceState;
}

export function AIBanter({ messages, state }: AIBanterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 15000);

    return () => clearInterval(interval);
  }, [messages]);

  if (state !== RaceState.BETTING || messages.length === 0) {
    return null;
  }

  return (
    <div className="bg-duck-dark-gray/50 border border-duck-gray/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🦆</span>
        <div className="flex-1">
          <p className="text-xs text-duck-gray mb-1">AI Hints</p>
          <p
            className={`text-sm text-duck-white transition-opacity duration-300 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {messages[currentIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}