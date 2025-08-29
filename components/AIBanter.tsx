'use client';

import { RaceState } from '@/types';

interface AIBanterProps {
  messages: string[];
  state: RaceState;
}

export function AIBanter({ messages, state }: AIBanterProps) {
  if (state === RaceState.FINALIZED) {
    return (
      <div className="bg-gradient-to-br from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🤖</span>
          <p className="text-sm text-duck-white font-bold">QuackAI Says</p>
        </div>
        <p className="text-sm text-duck-gray">
          The race is complete! Check the results above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🤖</span>
        <p className="text-sm text-duck-white font-bold">QuackAI Hints</p>
      </div>
      
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-duck-gray italic">
            The AI is keeping her choices secret... for now 🤫
          </p>
        ) : (
          messages.map((message, i) => (
            <div key={i} className="p-3 bg-duck-dark/50 rounded-xl border border-duck-gray/20">
              <p className="text-sm text-duck-white">{message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}