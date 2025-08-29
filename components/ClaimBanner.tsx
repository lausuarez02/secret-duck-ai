'use client';

import { RaceState } from '@/types';
import { formatAmount } from '@/lib/utils';

interface ClaimBannerProps {
  state: RaceState;
  winnerId?: number;
  winnerTitle?: string;
  claimAmount?: bigint;
  onClaim: () => void;
  isClaiming: boolean;
}

export function ClaimBanner({ 
  state, 
  winnerId, 
  winnerTitle, 
  claimAmount, 
  onClaim, 
  isClaiming 
}: ClaimBannerProps) {
  if (state !== RaceState.FINALIZED || winnerId === undefined || !claimAmount || claimAmount <= BigInt(0)) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="bg-gradient-to-r from-duck-yellow/20 to-duck-primary/20 border border-duck-yellow/50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-duck-white mb-1">
              You won! #{winnerId + 1} {winnerTitle} came first!
            </p>
            <p className="text-sm text-duck-gray">
              Claim your winnings: {formatAmount(claimAmount)} DUCK
            </p>
          </div>
          
          <button
            onClick={onClaim}
            disabled={isClaiming}
            className="px-6 py-3 bg-gradient-to-r from-duck-yellow to-duck-primary text-duck-ink font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {isClaiming ? 'Claiming...' : 'Claim Prize'}
          </button>
        </div>
      </div>
    </div>
  );
}