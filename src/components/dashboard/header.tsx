import { BtcPrice } from '@/lib/types';
import { Cpu, DollarSign, Euro, PoundSterling } from 'lucide-react';

const currencyIcons = {
  USD: <DollarSign className="size-4 text-muted-foreground" />,
  EUR: <Euro className="size-4 text-muted-foreground" />,
  GBP: <PoundSterling className="size-4 text-muted-foreground" />,
};

export function DashboardHeader({ prices }: { prices: BtcPrice[] }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Cpu className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-xl font-bold font-headline">Block Forge</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {prices.map((price) => (
            <div key={price.currency} className="flex items-center gap-2">
              {currencyIcons[price.currency]}
              <span className="font-mono text-sm font-semibold">
                {price.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-xs text-muted-foreground">{price.currency}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
