import { NextRequest, NextResponse } from 'next/server';
import { Race } from '@/types';

// Mock data - same as in races route
const mockRaces: Race[] = [
  {
    address: '0x7C65F77a4EbEa3D56368A73A12234bB4384ACB28',
    topic: 'Epic Duck Squad',
    ducks: [
      { index: 0, title: 'Astronaut', blurb: 'Space-faring duck exploring the cosmos' },
      { index: 1, title: 'CEO', blurb: 'Corporate executive duck running the business' },
      { index: 2, title: 'Chef', blurb: 'Culinary master duck cooking up a storm' },
      { index: 3, title: 'Cowboy', blurb: 'Wild west duck ready to rustle some cattle' },
      { index: 4, title: 'Cyberpunk', blurb: 'High-tech duck from the digital future' },
      { index: 5, title: 'Detective', blurb: 'Crime-solving duck with keen investigation skills' },
      { index: 6, title: 'DJ', blurb: 'Music-mixing duck dropping sick beats' },
      { index: 7, title: 'Doctor', blurb: 'Medical expert duck healing the world' },
      { index: 8, title: 'Firefighter', blurb: 'Heroic duck battling blazes and saving lives' },
      { index: 9, title: 'Football', blurb: 'Athletic duck scoring touchdowns' },
      { index: 10, title: 'Gamer', blurb: 'Pro gamer duck with next-level skills' },
      { index: 11, title: 'King', blurb: 'Royal duck with commanding presence' },
      { index: 12, title: 'Ninja', blurb: 'Stealthy warrior duck moving in shadows' },
      { index: 13, title: 'Pharao', blurb: 'Ancient Egyptian ruler duck with divine wisdom' },
      { index: 14, title: 'Pirate', blurb: 'Treasure-hunting duck sailing the seven seas' },
      { index: 15, title: 'Sailor', blurb: 'Naval duck navigating stormy waters' },
      { index: 16, title: 'Samurai', blurb: 'Honor-bound warrior duck with sword mastery' },
      { index: 17, title: 'Viking', blurb: 'Fearless explorer duck raiding new territories' },
      { index: 18, title: 'Wizard', blurb: 'Magical duck casting spells and seeing the future' },
    ],
    betEnd: Math.floor(Date.now() / 1000) + 86400,
    raceEnd: Math.floor(Date.now() / 1000) + 86460,
    commitHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    createdAt: Math.floor(Date.now() / 1000),
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