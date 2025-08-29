import { NextRequest, NextResponse } from 'next/server';
import { Race } from '@/types';

// Mock data - same as in races route
const mockRaces: Race[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    topic: 'Famous Ducks in History',
    ducks: [
      { index: 0, title: 'Donald Duck', blurb: 'The famous Disney character with a sailor suit' },
      { index: 1, title: 'Daffy Duck', blurb: 'The zany black duck from Looney Tunes' },
      { index: 2, title: 'Howard the Duck', blurb: 'Marvel\'s anthropomorphic duck from another dimension' },
      { index: 3, title: 'Rubber Duck', blurb: 'The iconic bath toy that floats' },
      { index: 4, title: 'Peking Duck', blurb: 'Famous Chinese cuisine dish' },
      { index: 5, title: 'Duck Hunt Dog', blurb: 'The laughing companion from the NES game' },
      { index: 6, title: 'Scrooge McDuck', blurb: 'The wealthy uncle who swims in money' },
      { index: 7, title: 'Darkwing Duck', blurb: 'The terror that flaps in the night' },
      { index: 8, title: 'Psyduck', blurb: 'The confused Pokemon with psychic powers' },
      { index: 9, title: 'Duckworth', blurb: 'The butler from DuckTales' },
    ],
    betEnd: Math.floor(Date.now() / 1000) + 86400,
    raceEnd: Math.floor(Date.now() / 1000) + 86460,
    commitHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    createdAt: Math.floor(Date.now() / 1000),
    finalized: false,
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    topic: 'Duck Personalities',
    ducks: [
      { index: 0, title: 'The Leader', blurb: 'Always at the front of the V formation' },
      { index: 1, title: 'The Shy One', blurb: 'Hides behind others at the pond' },
      { index: 2, title: 'The Showoff', blurb: 'Does fancy dives to impress' },
      { index: 3, title: 'The Foodie', blurb: 'First to find the bread crumbs' },
      { index: 4, title: 'The Navigator', blurb: 'Never gets lost during migration' },
      { index: 5, title: 'The Singer', blurb: 'Quacks the loudest at dawn' },
      { index: 6, title: 'The Philosopher', blurb: 'Contemplates life while floating' },
      { index: 7, title: 'The Athlete', blurb: 'Fastest swimmer in the pond' },
      { index: 8, title: 'The Romantic', blurb: 'Always looking for a mate' },
      { index: 9, title: 'The Rebel', blurb: 'Swims against the current' },
    ],
    betEnd: Math.floor(Date.now() / 1000) + 43200,
    raceEnd: Math.floor(Date.now() / 1000) + 43260,
    commitHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    createdAt: Math.floor(Date.now() / 1000) - 43200,
    finalized: false,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    
    // Find the race by address
    const race = mockRaces.find(r => r.address.toLowerCase() === address.toLowerCase());
    
    if (!race) {
      return NextResponse.json(
        { error: 'Race not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(race);
  } catch (error) {
    console.error('Failed to fetch race:', error);
    return NextResponse.json(
      { error: 'Failed to fetch race' },
      { status: 500 }
    );
  }
}