import { RaceState } from '@/types';

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;
  
  const quotientStr = quotient.toString();
  const remainderStr = remainder.toString().padStart(decimals, '0');
  
  const decimalPart = remainderStr.slice(0, 2);
  
  if (decimalPart === '00') {
    return quotientStr;
  }
  
  return `${quotientStr}.${decimalPart}`;
}

export function parseAmount(amount: string, decimals: number = 18): bigint {
  const [whole, decimal = ''] = amount.split('.');
  const paddedDecimal = decimal.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + paddedDecimal);
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return '00:00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getRaceState(betEnd: number, raceEnd: number, finalized: boolean): RaceState {
  const now = Math.floor(Date.now() / 1000);
  
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

export function calculateImpliedProbability(betPool: bigint, totalPool: bigint): number {
  if (totalPool === BigInt(0)) return 0;
  return Number((betPool * BigInt(10000)) / totalPool) / 100;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(textArea);
  }
}