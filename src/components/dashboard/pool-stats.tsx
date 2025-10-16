import type { PoolStats as PoolStatsType } from '@/lib/types';
import { StatCard } from './stat-card';
import { Network, Server, Users, Percent } from 'lucide-react';

export function PoolStats({ stats }: { stats: PoolStatsType }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pool Hashrate"
        value={`${stats.poolHashrate.toFixed(2)} PH/s`}
        icon={<Server className="h-4 w-4 text-muted-foreground" />}
        description="Total mining power of the pool"
      />
      <StatCard
        title="Network Difficulty"
        value={`${(stats.networkDifficulty / 1e12).toFixed(2)} T`}
        icon={<Network className="h-4 w-4 text-muted-foreground" />}
        description="Current Bitcoin network difficulty"
      />
      <StatCard
        title="Active Miners"
        value={stats.activeMiners.toLocaleString()}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="Miners currently connected to the pool"
      />
      <StatCard
        title="Pool Fee"
        value={`${stats.poolFee}%`}
        icon={<Percent className="h-4 w-4 text-muted-foreground" />}
        description="Fee for mining in this pool"
      />
    </div>
  );
}
