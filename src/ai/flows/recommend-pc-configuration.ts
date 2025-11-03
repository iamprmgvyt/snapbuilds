'use server';

/**
 * @fileOverview A PC/laptop recommendation AI agent.
 *
 * - recommendPCConfiguration - A function that handles the PC/laptop recommendation process.
 * - RecommendPCConfigurationInput - The input type for the recommendPCConfiguration function.
 * - RecommendPCConfigurationOutput - The return type for the recommendPCConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPCConfigurationInputSchema = z.object({
  budget: z.string().describe('Your budget for the PC or laptop.'),
  currency: z.string().describe('The currency of the budget.'),
  intendedUsage: z
    .string()
    .describe(
      'The intended usage of the PC or laptop (e.g., gaming, office work, video editing).'
    ),
  preferredFormFactor: z
    .string()
    .describe('Do you prefer a desktop PC or a laptop?'),
  specificRequirements: z
    .string()
    .optional()
    .describe(
      'Are there any specific requirements or preferences you have (e.g., specific brand, screen size, operating system)?'
    ),
});
export type RecommendPCConfigurationInput = z.infer<typeof RecommendPCConfigurationInputSchema>;

const PCPartSchema = z.object({
  CPU: z.string().optional(),
  GPU: z.string().optional(),
  Motherboard: z.string().optional(),
  RAM: z.string().optional(),
  Storage: z.string().optional(),
  'Power Supply': z.string().optional(),
  Case: z.string().optional(),
  Laptop: z.string().optional(),
});

const RecommendPCConfigurationOutputSchema = z.object({
  recommendation: z.union([PCPartSchema, z.string()]).describe('The recommended PC or laptop configuration as a JSON object with parts as keys or a single string for laptops.'),
  reasoning: z.string().describe('The reasoning behind the recommendation.'),
});
export type RecommendPCConfigurationOutput = z.infer<typeof RecommendPCConfigurationOutputSchema>;

export async function recommendPCConfiguration(input: RecommendPCConfigurationInput): Promise<RecommendPCConfigurationOutput> {
  return recommendPCConfigurationFlow(input);
}

const convertToUSDTool = ai.defineTool(
  {
    name: 'convertToUSD',
    description: 'Converts a given amount from any currency to US dollars.',
    inputSchema: z.object({
      amount: z.number().describe('The amount of money to convert.'),
      currency: z.string().describe('The currency code (e.g., "EUR", "CAD").'),
    }),
    outputSchema: z.number().describe('The converted amount in US dollars.'),
  },
  async ({ amount, currency }) => {
    // This is a simplified conversion for demonstration with approximate rates.
    // In a real application, you would use a currency conversion API.
    const conversionRates: { [key: string]: number } = {
        'USD': 1, 'EUR': 1.08, 'JPY': 0.0063, 'GBP': 1.27, 'AUD': 0.66,
        'CAD': 0.73, 'CHF': 1.11, 'CNY': 0.14, 'HKD': 0.13, 'NZD': 0.61,
        'SEK': 0.095, 'KRW': 0.00072, 'SGD': 0.74, 'NOK': 0.094, 'MXN': 0.054,
        'INR': 0.012, 'RUB': 0.011, 'ZAR': 0.053, 'TRY': 0.030, 'BRL': 0.18,
        'TWD': 0.031, 'DKK': 0.14, 'PLN': 0.25, 'THB': 0.027, 'IDR': 0.000061,
        'HUF': 0.0027, 'CZK': 0.043, 'ILS': 0.27, 'CLP': 0.0011, 'PHP': 0.017,
        'AED': 0.27, 'COP': 0.00024, 'SAR': 0.27, 'MYR': 0.21, 'RON': 0.22,
    };

    const rate = conversionRates[currency.toUpperCase()] || 1;
    return amount * rate;
  }
);


const recommendPCConfigurationFlow = ai.defineFlow(
  {
    name: 'recommendPCConfigurationFlow',
    inputSchema: RecommendPCConfigurationInputSchema,
    outputSchema: RecommendPCConfigurationOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      model: 'groq/llama-3.1-8b-instant',
      tools: [convertToUSDTool],
      prompt: `You are an expert PC and laptop advisor. A user will provide their budget, intended usage, preferred form factor (desktop or laptop), and any specific requirements.

  First, convert the user's budget to USD using the provided tool. All recommendations should be based on the USD budget.

  Based on this information, you will recommend the best PC or laptop configuration for their needs. Explain your reasoning for the recommendation.

  If the recommendation is for a desktop, provide the configuration as a JSON object where keys are the component name (e.g., "CPU", "GPU") and values are the specific part.

  If the recommendation is for a laptop, provide the name of the laptop as a string in the 'recommendation' field.

  User Input:
  Budget: ${input.currency} ${input.budget}
  Intended Usage: ${input.intendedUsage}
  Preferred Form Factor: ${input.preferredFormFactor}
  Specific Requirements: ${input.specificRequirements || 'None'}
  `,
      output: {
        schema: RecommendPCConfigurationOutputSchema,
      },
      config: {
        temperature: 0.7,
      },
    });
    return output!;
  }
);
