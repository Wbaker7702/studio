import type { Transaction } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, Link as LinkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export function TransactionFeed({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions</CardTitle>
        <CardDescription>Live feed of transactions from the pool.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-full bg-muted flex-shrink-0">
                  <Bitcoin className="h-5 w-5 text-accent" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-mono text-sm truncate">
                    {tx.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-mono font-semibold text-accent whitespace-nowrap">
                  {tx.amount.toFixed(4)} BTC
                </span>
                <Link
                  href={`https://www.blockchain.com/btc/tx/${tx.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`View transaction ${tx.id} on block explorer`}
                >
                  <LinkIcon className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
