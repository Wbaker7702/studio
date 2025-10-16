export type BtcPrice = {
  currency: 'USD' | 'EUR' | 'GBP';
  price: number;
};

export type PoolStats = {
  poolHashrate: number;
  networkDifficulty: number;
  activeMiners: number;
  poolFee: number;
  blockReward: number;
};

export type Transaction = {
  id: string;
  amount: number;
  timestamp: Date;
};
