'use client';

import { useState } from 'react';

interface BetModalProps {
  isOpen: boolean;
  duckTitle: string;
  duckIndex: number;
  selectedCount: number;
  onClose: () => void;
  onConfirm: (amount: bigint) => void;
  isApproving: boolean;
  isPlacing: boolean;
}

export function BetModal({ 
  isOpen, 
  duckTitle, 
  duckIndex, 
  selectedCount,
  onClose, 
  onConfirm, 
  isApproving, 
  isPlacing 
}: BetModalProps) {
  const [amount, setAmount] = useState('1');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const amountWei = BigInt(Math.floor(parseFloat(amount) * 10**18));
    onConfirm(amountWei);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-duck-dark border border-duck-primary/30 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-duck-white mb-4">
          Place Bet on {selectedCount} Ducks
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm text-duck-gray mb-2">Amount per duck (DUCK)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-duck-dark-gray border border-duck-gray/30 rounded-xl text-duck-white"
            placeholder="Enter amount..."
            step="0.01"
          />
          <p className="text-xs text-duck-gray mt-2">
            Total: {(parseFloat(amount) * selectedCount).toFixed(2)} DUCK
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-duck-gray/20 text-duck-gray rounded-xl hover:bg-duck-gray/30 transition-all"
            disabled={isApproving || isPlacing}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isApproving || isPlacing || !amount}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {isApproving ? 'Approving...' : isPlacing ? 'Placing Bet...' : 'Confirm Bet'}
          </button>
        </div>
      </div>
    </div>
  );
}