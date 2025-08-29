'use client';

import { RaceState } from '@/types';
import { formatAmount } from '@/lib/utils';

interface ClaimBannerProps {
  state: RaceState;
  winnerId?: number;
  winnerTitle?: string;
  claimAmount?: bigint;
  onClaim: () => void;
  isClaiming?: boolean;
}

export function ClaimBanner({
  state,
  winnerId,
  winnerTitle,
  claimAmount,
  onClaim,
  isClaiming,
}: ClaimBannerProps) {
  if (state === RaceState.BETTING) {
    return (
      <div className="p-4 text-center">
        <p className="text-duck-primary font-bold">Bet on a Duck</p>
        <p className="text-xs text-duck-gray mt-1">Choose wisely, the AI has already picked</p>
      </div>
    );
  }

  if (state === RaceState.REVEALING) {
    return (
      <div className="p-4 text-center">
        <div className="inline-flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-duck-yellow border-t-transparent" />
          <p className="text-duck-yellow font-bold">Revealing AI's choice...</p>
        </div>
      </div>
    );
  }

  if (state === RaceState.FINALIZED && winnerId !== undefined) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div>
            <p className="text-duck-yellow font-bold">
              Winner: #{winnerId} {winnerTitle}
            </p>
            {claimAmount && claimAmount > BigInt(0) && (
              <p className="text-sm text-duck-gray">
                You won {formatAmount(claimAmount)} DUCK!
              </p>
            )}
          </div>
          
          {claimAmount && claimAmount > BigInt(0) && (
            <button
              onClick={onClaim}
              disabled={isClaiming}
              className="px-6 py-2 bg-duck-yellow text-duck-ink font-bold rounded-lg hover:bg-duck-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? 'Claiming...' : `Claim ${formatAmount(claimAmount)} DUCK`}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}