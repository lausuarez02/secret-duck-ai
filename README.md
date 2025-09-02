# 🦆 QuackDerby Protocol

*Where DeFi meets Duck Racing Excellence - The Ultimate AI-Powered Prediction Market*

A sophisticated decentralized prediction platform where users bet DUCK tokens by predicting which 4 ducks an AI agent will choose in order. Built on a modular hook architecture with DAT economic assets and triple-token governance.

## Contracts code

https://github.com/tomi204/quack-contracts


## 🎯 Core Game

**Simple for Users**: Pick 4 ducks in the order you think the AI chose them
**Sophisticated Backend**: ZK-verified AI predictions + programmable economic assets + governance

## ⚡ Protocol Features

- **🧠 DAT Economic Layer**: AI agents own tradable data assets with automatic revenue sharing
- **🗳️ Triple Token System**: DUCK (betting) + QUACK (governance) + DAT (AI licensing)
- **🎣 Modular Hooks**: Uniswap v4-inspired extensible architecture  
- **🔐 ZK + TEE Security**: Verifiable AI predictions with trusted execution
- **💰 Auto Rewards**: Earn governance tokens and voting power by playing
- **📊 DeFi Integration**: Pari-mutuel betting with sophisticated pool distribution

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Blockchain**: viem, wagmi, DuckChain RPC
- **State Management**: React Query for polling
- **Smart Contracts**: Race & BookMarket contracts (pari-mutuel betting)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- DuckChain wallet with DUCK tokens

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd bet-duck
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```
NEXT_PUBLIC_RPC_URL=https://rpc.duckchain.io
NEXT_PUBLIC_DUCK_TOKEN=<DUCK token address>
NEXT_PUBLIC_RACE_FACTORY=<Race factory address>
AI_PK=<AI wallet private key>
HOST_PK=<Host wallet private key>
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧠 DAT System Explained

### What are DATs?
**Digital Autonomous Tokens** = AI agents that own their data/predictions as tradable crypto assets

### Why ZK + TEE?
- **ZK Proofs**: AI proves predictions are legit WITHOUT revealing training data secrets
- **TEE Security**: AI runs in tamper-proof hardware - no one can cheat or manipulate
- **Result**: Provably fair AI that can monetize its intelligence

### Economic Model
1. **AI Agent** creates prediction model → mints DAT representing ownership
2. **Users** buy/hold DATs → get revenue share from AI's predictions (5% of all bets)
3. **ZK Verification** → AI proves accuracy without revealing secret sauce
4. **Automatic Payouts** → Smart contracts split revenue to DAT holders

**Simple Example**: QuackAI's prediction algorithm becomes a $10k DAT. You buy 10% of the DAT tokens. Every time someone bets, you automatically earn 0.5% of the pool (10% of the 5% DAT share).

## 🎮 Game Flow

1. **AI Commits**: QuackAI picks 4 ducks in secret order using ZK commitment
2. **Betting Phase** (24h): Users predict the AI's 4-duck sequence 
3. **Earn Rewards**: Get DUCK winnings + QUACK governance tokens + DAT revenue share
4. **ZK Reveal**: AI proves its choices with cryptographic verification
5. **Claim**: Winners get proportional payouts, everyone gets governance power

## Project Structure

```
app/
├── page.tsx              # Lobby page
├── race/[address]/       # Individual race page
├── api/
│   ├── races/           # List active races
│   ├── race/[address]/  # Get race details
│   ├── game/create/     # Create new race
│   ├── game/finalize/   # Reveal AI choice
│   └── ai/hints/        # Get AI hint messages
components/
├── DuckCard.tsx         # Duck betting card
├── BetModal.tsx         # Bet placement modal
├── CountdownPill.tsx    # Timer component
├── AICommitPill.tsx     # Commitment hash display
├── AIBanter.tsx         # Rotating AI hints
└── ClaimBanner.tsx      # Winner claim interface
lib/
├── wagmi.ts            # Blockchain configuration
├── contracts/abis.ts   # Smart contract ABIs
└── utils.ts            # Helper functions
```

## 🏗️ Protocol Architecture

### Core Contracts

#### **RaceCore.sol** - Main Game Engine
- `placeBet(duckSequence[], amount)`: Place ordered 4-duck prediction
- `finalizeWithReveal(secretSequence[], zkProof)`: ZK-verified AI reveal
- `claim()`: Claim DUCK winnings + mint QUACK governance rewards
- Hook execution at every interaction point

#### **QuackToken.sol** - Governance Layer  
- ERC20Votes with staking (2x voting multiplier)
- Auto-minted rewards: 100 QUACK per win, 10 per participation
- DAO proposal and voting system

#### **DATRegistry.sol** - AI Economic Assets
- AI agent registration and DAT minting
- Automatic 5% revenue distribution to DAT holders
- ZK proof verification for prediction accuracy
- TEE attestation for secure inference

### Hook System (Uniswap v4 Inspired)
- **FeeHook**: Configurable protocol fees
- **ReferralHook**: Multi-tier bonus system  
- **DATRevenueHook**: AI agent revenue sharing
- **GovernanceHook**: Proposal-triggered actions

## Development

### Build for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting:
- Vercel (recommended)
- Netlify
- Self-hosted

3. Configure production environment variables

## 💡 Why This Matters

### For Users
- **Easy**: Just click ducks to play
- **Rewarding**: Earn governance tokens automatically  
- **Fair**: ZK proofs ensure AI isn't cheating
- **Profitable**: DAT revenue sharing = passive income

### For AI Agents  
- **Monetization**: Turn predictions into tradable assets
- **Ownership**: Cryptographic proof of data contributions
- **Revenue**: Automatic splits from every bet placed
- **Protection**: TEE security prevents tampering

### For the Ecosystem
- **Innovation**: First prediction market with AI economic assets
- **Governance**: Community controls protocol evolution
- **Scalability**: Modular hooks enable infinite features
- **Sustainability**: Multi-token economy aligns all incentives

## 🔒 Security & Trust

- **ZK Proofs**: AI proves accuracy without revealing secrets
- **TEE Hardware**: Tamper-proof execution environment  
- **Smart Contract Audits**: Multi-signature governance with timelock
- **Open Source**: All code publicly verifiable
- **Rate Limiting**: API protection and DoS prevention

## License

MIT
