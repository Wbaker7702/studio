'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating potential Bitcoin earnings based on simulated hashrate and current pool statistics.
 *
 * - estimatePotentialEarnings - An async function that takes in user's hashrate and pool statistics to estimate potential Bitcoin earnings.
 * - EstimatePotentialEarningsInput - The input type for the estimatePotentialEarnings function.
 * - EstimatePotentialEarningsOutput - The return type for the estimatePotentialEarnings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimatePotentialEarningsInputSchema = z.object({
  simulatedHashrate: z.number().describe('The user provided simulated hashrate in terahashes per second (TH/s).'),
  poolHashrate: z.number().describe('The current total pool hashrate in terahashes per second (TH/s).'),
  blockReward: z.number().describe('The current block reward amount in Bitcoin.'),
  poolFee: z.number().describe('The percentage of the block reward the pool takes as a fee.'),
});
export type EstimatePotentialEarningsInput = z.infer<typeof EstimatePotentialEarningsInputSchema>;

const EstimatePotentialEarningsOutputSchema = z.object({
  estimatedDailyEarnings: z.number().describe('The estimated daily Bitcoin earnings in BTC.'),
  estimatedMonthlyEarnings: z.number().describe('The estimated monthly Bitcoin earnings in BTC.'),
  estimatedYearlyEarnings: z.number().describe('The estimated yearly Bitcoin earnings in BTC.'),
  reasoning: z.string().describe('A brief explanation of how the earnings were estimated, including the formulas used.'),
});
export type EstimatePotentialEarningsOutput = z.infer<typeof EstimatePotentialEarningsOutputSchema>;

export async function estimatePotentialEarnings(input: EstimatePotentialEarningsInput): Promise<EstimatePotentialEarningsOutput> {
  return estimatePotentialEarningsFlow(input);
}

const estimatePotentialEarningsPrompt = ai.definePrompt({
  name: 'estimatePotentialEarningsPrompt',
  input: {schema: EstimatePotentialEarningsInputSchema},
  output: {schema: EstimatePotentialEarningsOutputSchema},
  prompt: `You are an expert Bitcoin mining profitability estimator. You will take in a simulated hashrate, pool hashrate, block reward, and pool fee, and estimate the daily, monthly, and yearly Bitcoin earnings. You must show the formula used for calculating earnings.\n\nSimulated Hashrate (TH/s): {{{simulatedHashrate}}}\nPool Hashrate (TH/s): {{{poolHashrate}}}\nBlock Reward (BTC): {{{blockReward}}}\nPool Fee (%): {{{poolFee}}}\n\nEstimate the daily, monthly, and yearly Bitcoin earnings in BTC, and provide a brief explanation of how the earnings were estimated, including the formulas used.`, 
});

const estimatePotentialEarningsFlow = ai.defineFlow(
  {
    name: 'estimatePotentialEarningsFlow',
    inputSchema: EstimatePotentialEarningsInputSchema,
    outputSchema: EstimatePotentialEarningsOutputSchema,
  },
  async input => {
    const {output} = await estimatePotentialEarningsPrompt(input);
    return output!;
  }
);
