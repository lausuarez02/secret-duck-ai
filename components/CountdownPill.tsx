'use client';

import { useEffect, useState } from 'react';
import { formatTimeLeft } from '@/lib/utils';
import { RaceState } from '@/types';

interface CountdownPillProps {
  label?: string;
  to: number;
  state?: RaceState;
}

export function CountdownPill({ label = 'Ends in', to, state }: CountdownPillProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      setTimeLeft(Math.max(0, to - now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [to]);

  const getStateColor = () => {
    if (state === RaceState.BETTING) return 'bg-gradient-to-r from-duck-primary/20 to-duck-yellow/20 text-duck-primary border-duck-primary/30';
    if (state === RaceState.REVEALING) return 'bg-gradient-to-r from-duck-yellow/20 to-duck-accent/20 text-duck-yellow border-duck-yellow/30';
    return 'bg-duck-gray/20 text-duck-gray border-duck-gray/30';
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${getStateColor()}`}>
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      <span className="font-mono font-bold text-sm">{formatTimeLeft(timeLeft)}</span>
    </div>
  );
}