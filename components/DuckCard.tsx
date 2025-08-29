'use client';

import { formatAmount } from '@/lib/utils';
import { RaceState } from '@/types';
import { DuckAvatar } from './DuckAvatar';

interface DuckCardProps {
  index: number;
  title: string;
  blurb: string;
  betPool: bigint;
  yourBet: bigint;
  state: RaceState;
  isWinner?: boolean;
  isSelected?: boolean;
  selectionOrder?: number; // 1-4 for order position
  onBet: () => void;
}

export function DuckCard({
  index,
  title,
  blurb,
  betPool,
  yourBet,
  state,
  isWinner,
  isSelected,
  selectionOrder,
  onBet,
}: DuckCardProps) {
  const canBet = true; // Always allow selection for demo
  
  const getCardClasses = () => {
    if (isWinner) {
      return 'border-duck-yellow bg-gradient-to-br from-duck-yellow/20 to-duck-primary/10 shadow-lg shadow-duck-yellow/20';
    }
    if (isSelected) {
      return 'border-duck-primary bg-gradient-to-br from-duck-primary/20 to-duck-dark shadow-lg shadow-duck-primary/20 scale-[1.02]';
    }
    if (yourBet > BigInt(0)) {
      return 'border-duck-primary/50 bg-gradient-to-br from-duck-dark to-duck-dark-gray';
    }
    return 'border-duck-gray/30 bg-gradient-to-br from-duck-dark to-duck-dark-gray hover:border-duck-primary/30';
  };

  return (
    <div 
      className={`relative rounded-2xl border-2 p-5 transition-all cursor-pointer group ${getCardClasses()}`}
      onClick={canBet ? onBet : undefined}
    >
      {isWinner && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-duck-yellow to-duck-primary text-duck-ink px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          🏆 WINNER
        </div>
      )}
      
      {isSelected && selectionOrder && (
        <div className="absolute -top-3 -left-3 bg-gradient-to-br from-duck-primary to-duck-yellow text-duck-ink w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-duck-ink">
          {selectionOrder}
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <DuckAvatar duckType={title} size="md" />
          <div>
            <h3 className="text-lg font-bold text-duck-white">
              #{index} {title}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-duck-primary rounded-full animate-pulse"></span>
              <span className="text-xs text-duck-gray uppercase tracking-wide">Available</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-duck-gray line-clamp-2 leading-relaxed">{blurb}</p>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-duck-ink/50 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-duck-gray">Pool Size</span>
            <span className="text-sm font-bold text-duck-primary">
              {formatAmount(betPool)} DUCK
            </span>
          </div>
          
          {yourBet > BigInt(0) && (
            <div className="flex justify-between items-center pt-2 border-t border-duck-gray/20">
              <span className="text-xs text-duck-gray">Your Bet</span>
              <span className="text-sm font-bold text-duck-white">
                {formatAmount(yourBet)} DUCK
              </span>
            </div>
          )}
        </div>
        
        {canBet && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBet();
            }}
            className={`w-full text-center py-3 px-4 rounded-xl font-bold transition-all border-2 ${
              isSelected 
                ? 'bg-duck-primary text-duck-ink border-duck-yellow shadow-lg' 
                : 'bg-duck-dark-gray/50 text-duck-gray border-duck-gray/30 hover:bg-duck-primary/20 hover:text-duck-primary hover:border-duck-primary/50'
            }`}
          >
            {isSelected ? `Selected (#${selectionOrder})` : 'Click to Select'}
          </button>
        )}
      </div>
    </div>
  );
}