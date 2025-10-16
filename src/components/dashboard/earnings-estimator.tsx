'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getEarningsEstimate } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BarChart, Bot, Loader, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: null,
  errors: {},
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Estimating...
        </>
      ) : (
        <>
          <BarChart className="mr-2 h-4 w-4" />
          Estimate Earnings
        </>
      )}
    </Button>
  );
}

export function EarningsEstimator() {
  const [state, formAction] = useFormState(getEarningsEstimate, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors && Object.keys(state.errors).length > 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Input',
        description: state.message,
      });
    } else if (state.message && !state.data) {
        toast({
            variant: 'destructive',
            title: 'Estimation Failed',
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Bot className="text-primary" />
            AI Earnings Estimator
        </CardTitle>
        <CardDescription>
          Enter your simulated hashrate (in TH/s) to get a potential earnings estimate from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="simulatedHashrate">Your Hashrate (TH/s)</Label>
            <Input
              id="simulatedHashrate"
              name="simulatedHashrate"
              type="number"
              placeholder="e.g., 110"
              step="0.1"
              required
              aria-describedby="hashrate-error"
            />
            {state?.errors?.simulatedHashrate && (
                <p id="hashrate-error" className="text-sm text-destructive">
                    {state.errors.simulatedHashrate[0]}
                </p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state.data && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
              <TrendingUp className="text-accent" />
              Estimated Earnings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">Daily</p>
                    <p className="font-mono text-lg font-bold text-accent">{state.data.estimatedDailyEarnings.toFixed(6)} BTC</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="font-mono text-lg font-bold text-accent">{state.data.estimatedMonthlyEarnings.toFixed(6)} BTC</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">Yearly</p>
                    <p className="font-mono text-lg font-bold text-accent">{state.data.estimatedYearlyEarnings.toFixed(6)} BTC</p>
                </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI Reasoning:</h4>
              <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md border prose prose-sm prose-invert prose-p:my-2">
                <p>{state.data.reasoning}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
