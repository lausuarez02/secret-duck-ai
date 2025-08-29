'use client';

import { useState } from 'react';
import { parseAmount, formatAmount } from '@/lib/utils';

interface BetModalProps {
  isOpen: boolean;
  duckTitle: string;
  duckIndex: number;
  selectedCount?: number;
  onClose: () => void;
  onConfirm: (amount: bigint) => void;
  isApproving?: boolean;
  isPlacing?: boolean;
}

export function BetModal({
  isOpen,
  duckTitle,
  duckIndex,
  selectedCount = 1,
  onClose,
  onConfirm,
  isApproving,
  isPlacing,
}: BetModalProps) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const handleConfirm = () => {
    try {
      const parsed = parseAmount(amount);
      if (parsed > BigInt(0)) {
        onConfirm(parsed);
      }
    } catch (err) {
      console.error('Invalid amount:', err);
    }
  };

  const isLoading = isApproving || isPlacing;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/30 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">🦆</span>
          <h2 className="text-2xl font-bold text-duck-white mb-2">Place Your Bets!</h2>
          <p className="text-duck-gray">
            {selectedCount > 1 
              ? `Betting on ${selectedCount} different ducks`
              : `Betting on ${duckTitle}`
            }
          </p>
          {selectedCount > 1 && (
            <div className="mt-2 p-3 bg-duck-primary/10 border border-duck-primary/20 rounded-xl">
              <p className="text-sm text-duck-primary">
                💡 Total cost: {amount} × {selectedCount} = {amount ? (parseFloat(amount) * selectedCount).toFixed(2) : '0'} DUCK
              </p>
            </div>
          )}
          
          {/* Protocol Rewards Preview */}
          {amount && parseFloat(amount) > 0 && (
            <div className="mt-3 p-3 bg-gradient-to-r from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 rounded-xl">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-duck-gray">🚀 QUACK Rewards</span>
                  <span className="text-duck-yellow font-bold">+{selectedCount > 1 ? '400' : '100'} QUACK</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-duck-gray">🗳️ Governance Power</span>
                  <span className="text-duck-primary font-bold">+{selectedCount > 1 ? '800' : '200'} votes (2x staked)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-duck-gray">🧠 DAT License Revenue</span>
                  <span className="text-duck-accent font-bold">5% auto-split</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-duck-gray">🔐 ZK Data Verified</span>
                  <span className="text-duck-purple font-bold">TEE Secured</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-duck-gray mb-2">Amount (DUCK)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 bg-duck-ink border border-duck-gray/30 rounded-lg text-duck-white placeholder-duck-gray/50 focus:border-duck-primary focus:outline-none"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickAmount('1')}
              className="flex-1 px-3 py-1.5 bg-duck-dark-gray border border-duck-gray/30 rounded-lg text-sm text-duck-white hover:border-duck-primary transition-colors"
              disabled={isLoading}
            >
              1 DUCK
            </button>
            <button
              onClick={() => handleQuickAmount('5')}
              className="flex-1 px-3 py-1.5 bg-duck-dark-gray border border-duck-gray/30 rounded-lg text-sm text-duck-white hover:border-duck-primary transition-colors"
              disabled={isLoading}
            >
              5 DUCK
            </button>
            <button
              onClick={() => handleQuickAmount('10')}
              className="flex-1 px-3 py-1.5 bg-duck-dark-gray border border-duck-gray/30 rounded-lg text-sm text-duck-white hover:border-duck-primary transition-colors"
              disabled={isLoading}
            >
              10 DUCK
            </button>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-duck-gray/20 text-duck-gray rounded-lg hover:bg-duck-gray/30 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-duck-primary text-duck-ink font-bold rounded-lg hover:bg-duck-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !amount || amount === '0'}
            >
              {isApproving ? 'Approving...' : isPlacing ? 'Placing Bet...' : 'Confirm Bet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}