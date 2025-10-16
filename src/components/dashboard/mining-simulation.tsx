'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useMemo } from 'react';
import { CheckCircle, Cpu, Loader } from 'lucide-react';

const TARGET_ZEROS = 4;

export function MiningSimulation() {
  const [isMining, setIsMining] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [hash, setHash] = useState('0000000000000000000000000000000000000000000000000000000000000000');
  const [minedBlock, setMinedBlock] = useState<string | null>(null);

  const blockData = useMemo(() => "BlockForge" + Date.now(), [minedBlock]);

  useEffect(() => {
    let animationFrameId: number;
    if (isMining && !minedBlock) {
      const mine = () => {
        const newNonce = nonce + 1;
        setNonce(newNonce);
        
        // This is a fake hash generation for visualization
        const newHash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
            return (Math.random() * 16 | 0).toString(16);
        });
        
        const partialHash = newNonce.toString(16) + newHash;
        setHash(partialHash.substring(0, 64));

        // Simulate finding a block
        if (newNonce % (Math.floor(Math.random() * 500) + 250) === 0) {
          const foundHash = '0'.repeat(TARGET_ZEROS) + partialHash.substring(TARGET_ZEROS, 64);
          setHash(foundHash);
          setMinedBlock(foundHash);
          setIsMining(false);
        } else {
          animationFrameId = requestAnimationFrame(mine);
        }
      };
      animationFrameId = requestAnimationFrame(mine);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMining, nonce, minedBlock]);

  const startMining = () => {
    setMinedBlock(null);
    setNonce(0);
    setHash('');
    setIsMining(true);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Cpu className="text-primary"/> Mining Simulator
        </CardTitle>
        <CardDescription>
          Click 'Start Mining' to simulate solving a block.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted font-mono text-sm space-y-2 break-all">
          <p><span className="text-muted-foreground">Data:</span> {blockData}</p>
          <p><span className="text-muted-foreground">Nonce:</span> <span className="text-primary">{nonce.toLocaleString()}</span></p>
          <p><span className="text-muted-foreground">Hash:</span> <span className={minedBlock ? 'text-accent' : 'text-foreground/80'}>{hash}</span></p>
        </div>
        
        {minedBlock ? (
          <div className="p-4 rounded-lg bg-accent/10 text-accent flex items-center gap-3">
             <CheckCircle className="h-6 w-6"/>
             <div>
                <p className="font-bold">Block Solved!</p>
                <p className="text-xs">Your contribution has been added to the pool.</p>
             </div>
          </div>
        ) : null}

        <Button onClick={startMining} disabled={isMining} className="w-full">
          {isMining ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Mining...
            </>
          ) : (
            minedBlock ? 'Mine Next Block' : 'Start Mining'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
