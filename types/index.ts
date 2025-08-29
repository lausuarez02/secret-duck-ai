export interface Duck {
  index: number;
  title: string;
  blurb: string;
}

export interface Race {
  address: string;
  topic: string;
  ducks: Duck[];
  betEnd: number;
  raceEnd: number;
  commitHash: string;
  createdAt: number;
  finalized: boolean;
  winnerId?: number;
}

export interface EntrantData {
  creator: string;
  betPool: bigint;
  tipTotal: bigint;
}

export enum RaceState {
  BETTING = 'BETTING',
  REVEALING = 'REVEALING',
  FINALIZED = 'FINALIZED',
}

export interface BetData {
  entrantId: number;
  amount: bigint;
  userBet: bigint;
}

export interface BookMarket {
  address: string;
  raceAddress: string;
  question: string;
  marketEnd: number;
  finalized: boolean;
  outcome?: number;
  yesPool: bigint;
  noPool: bigint;
}