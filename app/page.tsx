'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { CountdownPill } from '@/components/CountdownPill';
import { getRaceState } from '@/lib/utils';
import { Race, RaceState } from '@/types';

async function fetchActiveRaces(): Promise<Race[]> {
  const res = await fetch('/api/races');
  if (!res.ok) throw new Error('Failed to fetch races');
  return res.json();
}

function RaceCard({ race }: { race: Race }) {
  const state = getRaceState(race.betEnd, race.raceEnd, race.finalized);
  
  return (
    <Link href={`/race/${race.address}`}>
      <div className="group relative bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-6 hover:border-duck-primary/50 transition-all hover:scale-[1.02] cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-duck-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">🦆</span>
                <span className="px-2 py-1 bg-duck-primary/20 text-duck-primary text-xs font-bold rounded-full">
                  LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold text-duck-white">
                {race.topic}
              </h3>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-duck-gray">Ducks in Race</span>
              <span className="text-sm font-bold text-duck-white">{race.ducks.length}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-duck-gray">Status</span>
              <span className={`text-sm font-bold ${
                state === RaceState.BETTING ? 'text-duck-primary' :
                state === RaceState.REVEALING ? 'text-duck-yellow' :
                'text-duck-gray'
              }`}>
                {state === RaceState.BETTING ? 'Open for Bets' :
                 state === RaceState.REVEALING ? 'Revealing Soon' :
                 'Finalized'}
              </span>
            </div>
            
            <CountdownPill to={race.betEnd} state={state} />
          </div>
          
          <button className="w-full px-4 py-3 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl hover:shadow-lg hover:shadow-duck-primary/50 transition-all transform group-hover:scale-105">
            Enter Race →
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function LobbyPage() {
  const { data: races = [], isLoading, error } = useQuery({
    queryKey: ['races'],
    queryFn: fetchActiveRaces,
    refetchInterval: 30000,
  });

  return (
    <div className="min-h-screen bg-duck-ink relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-duck-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-duck-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-duck-primary/5 rounded-full blur-3xl" />
      </div>

      <header className="relative border-b border-duck-primary/20 bg-duck-dark/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-duck-primary/20 rounded-2xl">
                <span className="text-4xl">🦆</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-duck-white">
                  AI Secret Duck
                </h1>
                <p className="text-duck-gray mt-1">
                  Humans vs QuackAI — Can you guess her duck?
                </p>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink font-bold rounded-xl hover:shadow-lg hover:shadow-duck-primary/50 transition-all transform hover:scale-105">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-duck-white mb-4">
            Active Duck Races
          </h2>
          <p className="text-duck-gray text-lg">
            Choose your destiny. Pick your ducks. Trust the quack.
          </p>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-duck-primary border-t-transparent" />
              <span className="absolute inset-0 flex items-center justify-center text-2xl">🦆</span>
            </div>
            <p className="text-duck-gray mt-4">Loading races...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400 text-center">
            <p className="text-xl mb-2">Quack! Something went wrong</p>
            <p className="text-sm">The ducks have flown away. Please try again later.</p>
          </div>
        )}

        {!isLoading && !error && races.length === 0 && (
          <div className="bg-duck-dark/50 border border-duck-primary/20 rounded-2xl p-16 text-center">
            <span className="text-6xl mb-4 block animate-bounce">🦆</span>
            <p className="text-duck-gray text-xl mb-2">No active races at the moment</p>
            <p className="text-duck-gray">The AI is still choosing her favorite ducks...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <RaceCard key={race.address} race={race} />
          ))}
        </div>
        
        {/* Fun stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">🏆</p>
            <p className="text-2xl font-bold text-duck-primary">2,847</p>
            <p className="text-duck-gray text-sm">Total Races</p>
          </div>
          <div className="bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">💰</p>
            <p className="text-2xl font-bold text-duck-primary">482,391</p>
            <p className="text-duck-gray text-sm">DUCK Wagered</p>
          </div>
          <div className="bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">🎯</p>
            <p className="text-2xl font-bold text-duck-primary">23%</p>
            <p className="text-duck-gray text-sm">Human Win Rate</p>
          </div>
        </div>
      </main>
    </div>
  );
}