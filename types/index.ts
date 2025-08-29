export enum RaceState {
  BETTING = 'BETTING',
  REVEALING = 'REVEALING', 
  FINALIZED = 'FINALIZED'
}

export interface EntrantData {
  index: number;
  title: string;
  blurb: string;
}

export interface Race {
  address: string;
  topic: string;
  ducks: EntrantData[];
  betEnd: number;
  raceEnd: number;
  finalized: boolean;
  commitHash: string;
  createdAt: number;
}