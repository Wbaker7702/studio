import type { BtcPrice, PoolStats, Transaction } from '@/lib/types';

export const btcPrices: BtcPrice[] = [
  { currency: 'USD', price: 68123.45 },
  { currency: 'EUR', price: 62876.54 },
  { currency: 'GBP', price: 53654.32 },
];

export const poolStats: PoolStats = {
  poolHashrate: 125.67, // in PH/s
  networkDifficulty: 88.1e12,
  activeMiners: 4321,
  poolFee: 0.9, // percentage
  blockReward: 3.125, // BTC
};

export const transactionFeed: Transaction[] = [
  { id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', timestamp: new Date(Date.now() - 1 * 60 * 1000), amount: 0.5234 },
  { id: 'f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4b5a6f1e2', timestamp: new Date(Date.now() - 3 * 60 * 1000), amount: 1.2981 },
  { id: '9a8b7c6d5e4f9a8b7c6d5e4f9a8b7c6d5e4f9a8b7c6d5e4f9a8b7c6d5e4f9a8b', timestamp: new Date(Date.now() - 5 * 60 * 1000), amount: 0.1092 },
  { id: '1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b', timestamp: new Date(Date.now() - 8 * 60 * 1000), amount: 2.7500 },
  { id: 'e1f2a3b4c5d6e1f2a3b4c5d6e1f2a3b4c5d6e1f2a3b4c5d6e1f2a3b4c5d6e1f2', timestamp: new Date(Date.now() - 12 * 60 * 1000), amount: 0.0456 },
];
