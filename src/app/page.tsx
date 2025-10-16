import Image from 'next/image';
import { btcPrices, poolStats, transactionFeed } from '@/lib/data';
import { DashboardHeader } from '@/components/dashboard/header';
import { PoolStats } from '@/components/dashboard/pool-stats';
import { TransactionFeed } from '@/components/dashboard/transaction-feed';
import { MiningSimulation } from '@/components/dashboard/mining-simulation';
import { EarningsEstimator } from '@/components/dashboard/earnings-estimator';
import { EducationalResources } from '@/components/dashboard/edu-resources';
import imageData from '@/lib/placeholder-images.json';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <Image
        src={imageData.main_background.src}
        alt="Abstract technology background"
        fill
        className="absolute inset-0 object-cover opacity-5 z-0"
        data-ai-hint={imageData.main_background.hint}
        priority
      />
      <div className="relative z-10 flex flex-col">
        <DashboardHeader prices={btcPrices} />
        <main className="flex-1 p-4 md:p-8 container max-w-screen-2xl mx-auto">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight font-headline">
              Mining Dashboard
            </h2>
            <p className="text-muted-foreground">
              Welcome to the Block Forge mining pool. Your gateway to the Bitcoin network.
            </p>
          </div>
          
          <div className="mb-8">
             <PoolStats stats={poolStats} />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <MiningSimulation />
            <EarningsEstimator />
            <TransactionFeed transactions={transactionFeed} />
            <EducationalResources />
          </div>
        </main>
      </div>
    </div>
  );
}
