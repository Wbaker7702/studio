'use server';

import { z } from 'zod';
import { estimatePotentialEarnings, type EstimatePotentialEarningsInput } from '@/ai/flows/estimate-potential-earnings';
import { poolStats } from '@/lib/data';

const schema = z.object({
  simulatedHashrate: z.coerce.number().positive('Hashrate must be a positive number.'),
});

type State = {
  message?: string | null;
  data?: {
    estimatedDailyEarnings: number;
    estimatedMonthlyEarnings: number;
    estimatedYearlyEarnings: number;
    reasoning: string;
  } | null;
  errors?: {
    simulatedHashrate?: string[];
  };
};

export async function getEarningsEstimate(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    simulatedHashrate: formData.get('simulatedHashrate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input. Please check your hashrate value.',
    };
  }
  
  const { simulatedHashrate } = validatedFields.data;

  const aiInput: EstimatePotentialEarningsInput = {
    simulatedHashrate,
    poolHashrate: poolStats.poolHashrate * 1000, // Convert PH/s to TH/s for the AI model
    blockReward: poolStats.blockReward,
    poolFee: poolStats.poolFee,
  };

  try {
    const result = await estimatePotentialEarnings(aiInput);
    return {
      message: 'Estimation successful.',
      data: result,
    };
  } catch (error) {
    console.error('AI Error:', error);
    return {
      message: 'An error occurred while estimating earnings. Please try again later.',
    };
  }
}
