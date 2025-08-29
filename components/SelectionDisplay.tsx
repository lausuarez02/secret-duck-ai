'use client';

import { DuckAvatar } from './DuckAvatar';
import { Duck } from '@/types';

interface SelectionDisplayProps {
  selectedDucks: number[];
  allDucks: Duck[];
  onRemove: (index: number) => void;
  onSubmit?: () => void;
}

export function SelectionDisplay({ selectedDucks, allDucks, onRemove, onSubmit }: SelectionDisplayProps) {
  const slots = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="bg-gradient-to-r from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-duck-white">Your Prediction ({selectedDucks.length}/4)</h3>
        <p className="text-xs text-duck-gray hidden sm:block">AI will reveal her order</p>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slotIndex) => {
          const duckIndex = selectedDucks[slotIndex];
          const duck = duckIndex !== undefined ? allDucks[duckIndex] : null;
          
          return (
            <div
              key={slotIndex}
              className={`relative p-2 sm:p-3 rounded-xl border-2 border-dashed transition-all ${
                duck 
                  ? 'border-duck-primary/50 bg-duck-primary/10' 
                  : 'border-duck-gray/30 bg-duck-dark-gray/30'
              }`}
            >
              <div className="text-center">
                <div className="mb-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-duck-primary/20 text-duck-primary text-xs font-bold rounded-full">
                    {slotIndex + 1}
                  </span>
                </div>
                
                {duck ? (
                  <div className="space-y-1">
                    <DuckAvatar duckType={duck.title} size="sm" className="mx-auto scale-75 sm:scale-100" />
                    <p className="text-xs text-duck-white font-medium truncate">
                      #{duckIndex + 1}
                    </p>
                    <p className="text-xs text-duck-white font-medium truncate hidden sm:block">
                      {duck.title}
                    </p>
                    <button
                      onClick={() => onRemove(duckIndex)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-duck-accent rounded-full flex items-center justify-center text-white text-xs hover:bg-duck-accent/80 transition-colors shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto border-2 border-dashed border-duck-gray/30 rounded-full flex items-center justify-center">
                      <span className="text-duck-gray text-sm sm:text-lg">🦆</span>
                    </div>
                    <p className="text-xs text-duck-gray">
                      {slotIndex === 0 ? '1st' : slotIndex === 1 ? '2nd' : slotIndex === 2 ? '3rd' : '4th'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      
      {/* Submit button when 4 ducks selected */}
      {selectedDucks.length === 4 && onSubmit && (
        <div className="mt-3 pt-3 border-t border-duck-primary/20">
          <button
            onClick={onSubmit}
            className="w-full py-3 px-4 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl hover:shadow-lg hover:shadow-duck-primary/50 transition-all transform hover:scale-105"
          >
            🎯 Submit Prediction (4/4)
          </button>
        </div>
      )}
      
      <div className="mt-3 p-2 bg-duck-ink/30 rounded-xl">
        <p className="text-xs text-duck-gray text-center">
          💡 Order matters! Perfect match = jackpot, right ducks wrong order = smaller win
        </p>
      </div>
    </div>
  );
}