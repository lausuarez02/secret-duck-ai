import { NextResponse } from 'next/server';
import { Race } from '@/types';

// Mock data for now - replace with actual DB queries
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
    betEnd: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
    raceEnd: Math.floor(Date.now() / 1000) + 86460, // 24 hours + 1 minute
    commitHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    createdAt: Math.floor(Date.now() / 1000),
    finalized: false,
  },
];

export async function GET() {
  try {
    // Return only the first active race
    const activeRaces = mockRaces.filter(race => !race.finalized);
    const singleRace = activeRaces.length > 0 ? [activeRaces[0]] : [];
    
    return NextResponse.json(singleRace);
  } catch (error) {
    console.error('Failed to fetch races:', error);
    return NextResponse.json(
      { error: 'Failed to fetch races' },
      { status: 500 }
    );
  }
}