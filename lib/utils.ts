import { RaceState } from '@/types';

export function getRaceState(betEnd: number, raceEnd: number, finalized: boolean): RaceState {
  const now = Date.now() / 1000;
  
  if (finalized) {
    return RaceState.FINALIZED;
  }
  
  if (now < betEnd) {
    return RaceState.BETTING;
  }
  
  if (now < raceEnd) {
    return RaceState.REVEALING;
  }
  
  return RaceState.FINALIZED;
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

export function formatTimeLeft(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: bigint): string {
  return (Number(amount) / 10**18).toLocaleString(undefined, { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2 
  });
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}