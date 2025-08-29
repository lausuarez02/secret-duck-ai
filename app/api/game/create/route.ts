import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { keccak256, encodePacked } from 'viem';

interface CreateGameRequest {
  topic: string;
  nDucks?: number;
  betSecs?: number;
  revealSecs?: number;
}

// AI-generated duck types based on topic
function generateDuckTypes(topic: string, n: number) {
  // This would call an AI API in production
  const duckSets: Record<string, any[]> = {
    default: [
      { title: 'Mallard Max', blurb: 'The classic green-headed beauty' },
      { title: 'Quacker Quinn', blurb: 'Never stops talking at the pond' },
      { title: 'Diving Dave', blurb: 'Goes deep for the best fish' },
      { title: 'Graceful Grace', blurb: 'Elegant swimmer with perfect form' },
      { title: 'Speedy Sam', blurb: 'Fastest wings in the flock' },
      { title: 'Wise Walter', blurb: 'The elder statesman of ducks' },
      { title: 'Adventurous Amy', blurb: 'Always exploring new ponds' },
      { title: 'Hungry Henry', blurb: 'First to spot the bread' },
      { title: 'Sleepy Sarah', blurb: 'Naps on the water all day' },
      { title: 'Playful Pete', blurb: 'Makes everything a game' },
    ],
  };
  
  return duckSets[topic] || duckSets.default;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateGameRequest = await request.json();
    const { 
      topic, 
      nDucks = 10, 
      betSecs = 86400, // 24 hours default
      revealSecs = 60  // 1 minute reveal window
    } = body;
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }
    
    // Generate duck types
    const ducks = generateDuckTypes(topic, nDucks).map((d, i) => ({
      ...d,
      index: i,
    }));
    
    // AI picks a secret duck
    const secretIndex = Math.floor(Math.random() * nDucks);
    const salt = BigInt(Math.floor(Math.random() * 1000000));
    
    // Create commitment hash
    const commitment = keccak256(
      encodePacked(['uint256', 'uint256'], [BigInt(secretIndex), salt])
    );
    
    // In production, this would:
    // 1. Deploy a new Race contract via factory
    // 2. Set AI commitment
    // 3. Place AI's initial bet
    // 4. Store in database
    
    const mockRaceAddress = `0x${Math.random().toString(16).slice(2, 42).padEnd(40, '0')}`;
    
    const race = {
      address: mockRaceAddress,
      topic,
      ducks,
      betEnd: Math.floor(Date.now() / 1000) + betSecs,
      raceEnd: Math.floor(Date.now() / 1000) + betSecs + revealSecs,
      commitHash: commitment,
      createdAt: Math.floor(Date.now() / 1000),
      finalized: false,
      secretIndex,
      salt: salt.toString(),
    };
    
    // Return without secret data
    const { secretIndex: _, salt: __, ...publicRace } = race;
    
    return NextResponse.json({
      success: true,
      race: publicRace,
    });
  } catch (error) {
    console.error('Failed to create game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}