'use client';

import { useState } from 'react';
import { formatAddress, copyToClipboard } from '@/lib/utils';

interface AICommitPillProps {
  hash: string;
}

export function AICommitPill({ hash }: AICommitPillProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-duck-dark-gray/50 border border-duck-gray/30 hover:border-duck-primary/50 transition-all group"
    >
      <span className="text-xs text-duck-gray hidden sm:inline">AI committed:</span>
      <span className="text-xs font-mono text-duck-white group-hover:text-duck-primary transition-colors">
        {formatAddress(hash)}
      </span>
      {copied && (
        <span className="text-xs text-duck-primary animate-pulse">Copied!</span>
      )}
    </button>
  );
}