import { createConfig, http } from 'wagmi';
import { createPublicClient } from 'viem';
import { mainnet } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';

const duckChain = {
  id: 5545,
  name: 'DuckChain',
  nativeCurrency: {
    decimals: 18,
    name: 'DUCK',
    symbol: 'DUCK',
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.duckchain.io'] },
    public: { http: [process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.duckchain.io'] },
  },
  blockExplorers: {
    default: { 
      name: 'DuckChain Explorer', 
      url: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://explorer.duckchain.io' 
    },
  },
} as const;

export const config = createConfig({
  chains: [duckChain],
  connectors: [
    injected(),
  ],
  transports: {
    [duckChain.id]: http(duckChain.rpcUrls.default.http[0]),
  },
});

export const publicClient = createPublicClient({
  chain: duckChain,
  transport: http(duckChain.rpcUrls.default.http[0]),
});

export { duckChain };