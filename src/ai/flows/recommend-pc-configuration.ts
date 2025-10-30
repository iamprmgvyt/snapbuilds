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
      amount: z.string().describe('The amount of money to convert, including the currency symbol or code (e.g., "€1500", "1000 CAD").'),
    }),
    outputSchema: z.number().describe('The converted amount in US dollars.'),
  },
  async ({ amount }) => {
    // This is a simplified conversion for demonstration.
    // In a real application, you would use a currency conversion API.
    const currencyRegex = /([€£¥])(\d+)|(\d+)\s*(USD|EUR|GBP|CAD|JPY|AUD)/i;
    const match = amount.match(currencyRegex);
    let value = parseFloat(amount.replace(/[^0-9.]/g, ''));
    let currency = 'USD';

    if (match) {
        if (match[1]) { // symbol like €
            const symbols: { [key: string]: string } = { '€': 'EUR', '£': 'GBP', '¥': 'JPY' };
            currency = symbols[match[1]];
            value = parseFloat(match[2]);
        } else if (match[4]) { // code like CAD
            currency = match[4].toUpperCase();
            value = parseFloat(match[3]);
        }
    } else if (amount.includes('$')) {
        currency = 'USD'; // Assume $ is USD if no other context
    }

    const conversionRates: { [key: string]: number } = {
        'USD': 1,
        'EUR': 1.08,
        'GBP': 1.27,
        'CAD': 0.73,
        'JPY': 0.0064,
        'AUD': 0.66,
    };

    const rate = conversionRates[currency] || 1;
    return value * rate;
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
  Budget: ${input.budget}
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
