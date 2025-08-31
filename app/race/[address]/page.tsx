'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits } from 'viem';
import { CountdownPill } from '@/components/CountdownPill';
import { DuckCard } from '@/components/DuckCard';
import { BetModal } from '@/components/BetModal';
import { AIBanter } from '@/components/AIBanter';
import { ClaimBanner } from '@/components/ClaimBanner';
import { GameRulesModal } from '@/components/GameRulesModal';
import { SelectionDisplay } from '@/components/SelectionDisplay';
import { WalletConnect } from '@/components/WalletConnect';
import { getRaceState, formatTime } from '@/lib/utils';
import { Race, RaceState, EntrantData } from '@/types';
import { RACE_ABI, ERC20_ABI } from '@/lib/contracts/abis';
import { showToast } from '@/components/Toast';

export default function RacePage() {
  const params = useParams();
  const address = params.address as string;
  const { address: userAddress } = useAccount();
  
  const [selectedDuck, setSelectedDuck] = useState<number | null>(null);
  const [selectedDucks, setSelectedDucks] = useState<number[]>([]); // Array to maintain order
  const [showRules, setShowRules] = useState(false);
  const [hasSeenRules, setHasSeenRules] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [betAmount, setBetAmount] = useState<bigint>(BigInt(0));

  // Fetch race metadata
  const { data: race, isLoading: raceLoading } = useQuery({
    queryKey: ['race', address],
    queryFn: async () => {
      const res = await fetch(`/api/race/${address}`);
      if (!res.ok) throw new Error('Failed to fetch race');
      return res.json() as Promise<Race>;
    },
    refetchInterval: 30000,
  });

  // Fetch AI hints
  const { data: hints = [] } = useQuery({
    queryKey: ['hints', address],
    queryFn: async () => {
      const res = await fetch(`/api/ai/hints?raceAddress=${address}`);
      if (!res.ok) return [];
      return res.json() as Promise<string[]>;
    },
    refetchInterval: 60000,
  });

  // Read contract data
  const { data: startTime } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'startTime',
  });

  const { data: duration } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'duration',
  });

  const { data: isActive } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'isActive',
  });

  const { data: winnerId } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'winnerId',
  });

  const { data: totalPool } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'totalPrizePool',
  });

  const { data: entryFee } = useReadContract({
    address: address as `0x${string}`,
    abi: RACE_ABI,
    functionName: 'entryFee',
  });

  // Write contract functions
  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: joinRace, data: joinHash } = useWriteContract();
  const { writeContract: claim, data: claimHash } = useWriteContract();

  const { isLoading: approveLoading } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: joinLoading } = useWaitForTransactionReceipt({ hash: joinHash });
  const { isLoading: claimLoading } = useWaitForTransactionReceipt({ hash: claimHash });

  // Fetch duck pools
  const [duckPools, setDuckPools] = useState<bigint[]>([]);
  const [userBets, setUserBets] = useState<bigint[]>([]);

  // Show rules modal on first visit
  useEffect(() => {
    const rulesKey = `rules-seen-${address}`;
    const seen = localStorage.getItem(rulesKey);
    if (!seen) {
      setShowRules(true);
    }
  }, [address]);

  const handleCloseRules = () => {
    setShowRules(false);
    setHasSeenRules(true);
    localStorage.setItem(`rules-seen-${address}`, 'true');
  };

  useEffect(() => {
    if (!race || !userAddress) return;

    const fetchPools = async () => {
      const pools: bigint[] = [];
      const bets: bigint[] = [];
      
      for (let i = 0; i < race.ducks.length; i++) {
        try {
          // This would be actual contract calls
          pools.push(BigInt(Math.floor(Math.random() * 100) * 10 ** 18));
          bets.push(BigInt(0)); // Start with no bets
        } catch (err) {
          pools.push(BigInt(0));
          bets.push(BigInt(0));
        }
      }
      
      setDuckPools(pools);
      setUserBets(bets);
    };

    fetchPools();
  }, [race, userAddress]);

  const betEndTime = startTime && duration ? Number(startTime) + Number(duration) : 0;
  const raceEndTime = betEndTime + 3600; // 1 hour after betting ends
  
  const state = getRaceState(
    betEndTime,
    raceEndTime,
    !isActive || false
  );

  const handleBet = (duckIndex: number) => {
    const currentIndex = selectedDucks.indexOf(duckIndex);
    
    if (currentIndex !== -1) {
      // Remove from selection
      const newSelection = selectedDucks.filter(id => id !== duckIndex);
      setSelectedDucks(newSelection);
    } else {
      // Add to selection (max 4)
      if (selectedDucks.length >= 4) {
        showToast('warning', 'You can only select exactly 4 ducks!');
        return;
      }
      setSelectedDucks([...selectedDucks, duckIndex]);
    }
  };

  const handlePlaceAllBets = () => {
    if (selectedDucks.length !== 4) {
      showToast('warning', 'You must select exactly 4 ducks in order!');
      return;
    }
    setSelectedDuck(0); // Open bet modal
  };

  const handleConfirmBet = async (amount: bigint) => {
    if (selectedDucks.length !== 4) {
      showToast('error', 'Select exactly 4 ducks in order!');
      return;
    }
    
    setIsApproving(true);
    setBetAmount(amount);
    
    try {
      // Approve DUCK token for total amount
      const totalAmount = amount * BigInt(4);
      await approve({
        address: process.env.NEXT_PUBLIC_DUCK_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_RACE_CORE as `0x${string}`, totalAmount],
      });
      
      setIsApproving(false);
      setIsPlacing(true);
      
      // Join race with first selected duck
      await joinRace({
        address: address as `0x${string}`,
        abi: RACE_ABI,
        functionName: 'joinRace',
        args: [BigInt(selectedDucks[0]), amount, '0x'],
      });
      
      showToast('success', `🎉 Bet placed! Earned 400 QUACK + 800 governance votes!`);
      setIsPlacing(false);
      setSelectedDuck(null);
      setSelectedDucks([]);
    } catch (err) {
      console.error('Bet failed:', err);
      showToast('error', 'Failed to place ordered bet');
      setIsApproving(false);
      setIsPlacing(false);
    }
  };

  const handleClaim = async () => {
    if (winnerId === undefined) return;
    
    await claim({
      address: address as `0x${string}`,
      abi: RACE_ABI,
      functionName: 'claimRewards',
      args: [],
    });
  };

  if (raceLoading || !race) {
    return (
      <div className="min-h-screen bg-duck-ink flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-duck-primary border-t-transparent" />
          <img src="/ducks/king-duck.jpg" alt="Loading" className="absolute inset-2 w-12 h-12 rounded-full object-cover" />
        </div>
      </div>
    );
  }

  const winnerDuck = winnerId !== undefined ? race.ducks[Number(winnerId)] : undefined;
  const claimAmount = winnerId !== undefined && userBets[Number(winnerId)] > BigInt(0)
    ? (userBets[Number(winnerId)] * (totalPool || BigInt(0))) / (duckPools[Number(winnerId)] || BigInt(1))
    : undefined;

  return (
    <div className="min-h-screen bg-duck-ink text-white relative">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="/main-ducks.jpg" 
          alt="Background ducks" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-duck-ink/60" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-duck-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-duck-purple/10 rounded-full blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur-xl bg-duck-dark/80 border-b border-duck-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <img src="/ducks/king-duck.jpg" alt="Bet Duck" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold truncate">{race.topic}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <CountdownPill label="Ends in" to={betEndTime} state={state} />
                  <span className="text-xs sm:text-sm text-duck-gray">Reveals at {formatTime(raceEndTime)}</span>
                  {/* User governance power */}
                  <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-duck-yellow/20 border border-duck-yellow/30 rounded-full">
                    <span className="text-xs text-duck-yellow">🗳️</span>
                    <span className="text-xs text-duck-yellow font-bold">2,450 votes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-48">
        {/* Selection info bar */}
        {state === RaceState.BETTING && (
          <div className="mb-6 p-4 bg-gradient-to-r from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-duck-white">
                  Your Prediction: {selectedDucks.length}/4 ducks (in order)
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-sm text-duck-gray">
                    {selectedDucks.length < 4 
                      ? `Pick ${4 - selectedDucks.length} more ducks in the order you think the AI chose`
                      : 'Perfect! Your 4-duck sequence is ready'}
                  </p>
                  {/* Active protocol features */}
                  <div className="flex items-center gap-1 px-2 py-1 bg-duck-purple/20 border border-duck-purple/30 rounded-full">
                    <span className="text-xs text-duck-purple">🎣 3 hooks active</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-duck-accent/20 border border-duck-accent/30 rounded-full">
                    <span className="text-xs text-duck-accent">🧠 12 DAT assets</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlaceAllBets}
                disabled={selectedDucks.length !== 4}
                className={`px-6 py-3 font-bold rounded-xl transition-all ${
                  selectedDucks.length === 4
                    ? 'bg-gradient-to-r from-duck-primary to-duck-yellow text-duck-ink hover:shadow-lg hover:shadow-duck-primary/50 transform hover:scale-105'
                    : 'bg-duck-dark-gray text-duck-gray cursor-not-allowed opacity-50'
                }`}
              >
                Submit Prediction ({selectedDucks.length}/4)
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          <section className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {race.ducks.map((duck, i) => (
                <DuckCard
                  key={i}
                  index={i + 1}
                  title={duck.title}
                  blurb={duck.blurb}
                  betPool={duckPools[i] || BigInt(0)}
                  yourBet={userBets[i] || BigInt(0)}
                  state={state}
                  isWinner={winnerId === BigInt(i)}
                  isSelected={selectedDucks.includes(i)}
                  selectionOrder={selectedDucks.includes(i) ? selectedDucks.indexOf(i) + 1 : undefined}
                  onBet={() => handleBet(i)}
                />
              ))}
            </div>
            
            {/* Bottom spacer to prevent overlap with prediction bar */}
            <div className="h-44"></div>
            
          </section>
          
          <aside className="space-y-4">
            {state === RaceState.FINALIZED && winnerDuck && (
              <div className="bg-gradient-to-br from-duck-yellow/20 to-duck-primary/20 border border-duck-yellow/50 rounded-2xl p-6">
                <p className="text-sm text-duck-yellow mb-2 font-bold">🎉 AI PICK REVEALED</p>
                <p className="text-2xl font-bold text-duck-white">
                  #{(Number(winnerId) || 0) + 1} {winnerDuck.title}
                </p>
                <p className="text-sm text-duck-gray mt-2">{winnerDuck.blurb}</p>
              </div>
            )}
            
            <AIBanter messages={hints} state={state} />
            
            <div className="bg-gradient-to-br from-duck-dark to-duck-dark-gray border border-duck-primary/20 rounded-2xl p-6">
              <p className="text-sm text-duck-gray mb-2">TOTAL POOL</p>
              <p className="text-3xl font-bold text-duck-primary">
                {formatUnits(totalPool || BigInt(0), 18)} DUCK
              </p>
              <div className="mt-4 pt-4 border-t border-duck-primary/20">
                <p className="text-xs text-duck-gray mb-2">PROTOCOL DISTRIBUTION</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-duck-gray">Winners</span>
                    <span className="text-duck-white">83%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-duck-gray">🧠 DAT Licensing</span>
                    <span className="text-duck-accent">5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-duck-gray">🎣 Hook Fees</span>
                    <span className="text-duck-purple">5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-duck-gray">🗳️ DAO Treasury</span>
                    <span className="text-duck-yellow">7%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* DAT Protocol Stats */}
            <div className="bg-gradient-to-br from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🧠</span>
                <p className="text-sm text-duck-white font-bold">DAT Economic Layer</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-duck-gray">🔐 Data Ownership</span>
                  <span className="text-duck-accent font-bold">ZK Verified</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-duck-gray">🛡️ TEE Inference</span>
                  <span className="text-duck-purple font-bold">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-duck-gray">💰 Revenue Share</span>
                  <span className="text-duck-yellow font-bold">5% Auto</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-duck-gray">📊 Tradable Assets</span>
                  <span className="text-duck-primary font-bold">12 DATs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-duck-gray">🎫 Usage Rights</span>
                  <span className="text-duck-yellow font-bold">Token-Gated</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-duck-purple/20">
                <div className="flex items-center gap-1 text-xs text-duck-gray mb-1">
                  <span>🔗</span>
                  <span>Powered by LazAI + Alith SDK</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-duck-accent">
                  <span>⚡</span>
                  <span>AI → Programmable Economic Assets</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRules(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-duck-purple/20 to-duck-accent/20 border border-duck-purple/30 text-duck-white rounded-xl hover:border-duck-primary/50 hover:bg-gradient-to-r hover:from-duck-primary/20 hover:to-duck-yellow/20 transition-all"
            >
              📖 How to Play
            </button>
          </aside>
        </div>
      </main>

      {/* Selection Display - Fixed at bottom during betting */}
      {selectedDucks.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-10">
          <div className="max-w-4xl mx-auto bg-duck-dark/95 backdrop-blur-xl border border-duck-primary/20 rounded-2xl p-4">
            <SelectionDisplay 
              selectedDucks={selectedDucks} 
              allDucks={race.ducks}
              onRemove={(duckIndex) => {
                setSelectedDucks(selectedDucks.filter(id => id !== duckIndex));
              }}
              onSubmit={handlePlaceAllBets}
            />
          </div>
        </div>
      )}

      <footer className="sticky bottom-0 bg-duck-dark/90 backdrop-blur-xl border-t border-duck-primary/20">
        <ClaimBanner
          state={state}
          winnerId={winnerId !== undefined ? Number(winnerId) : undefined}
          winnerTitle={winnerDuck?.title}
          claimAmount={claimAmount}
          onClaim={handleClaim}
          isClaiming={claimLoading}
        />
      </footer>

      <GameRulesModal isOpen={showRules} onClose={handleCloseRules} />

      {selectedDuck !== null && (
        <BetModal
          isOpen={true}
          duckTitle={`${selectedDucks.length} ducks`}
          duckIndex={selectedDucks.length}
          selectedCount={selectedDucks.length}
          onClose={() => setSelectedDuck(null)}
          onConfirm={handleConfirmBet}
          isApproving={isApproving || approveLoading}
          isPlacing={isPlacing || joinLoading}
        />
      )}
    </div>
  );
}