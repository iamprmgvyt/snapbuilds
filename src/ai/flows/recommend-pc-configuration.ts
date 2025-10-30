// src/ai/flows/recommend-pc-configuration.ts
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

const prompt = ai.definePrompt({
  name: 'recommendPCConfigurationPrompt',
  input: {schema: RecommendPCConfigurationInputSchema},
  output: {schema: RecommendPCConfigurationOutputSchema},
  prompt: `You are an expert PC and laptop advisor. A user will provide their budget, intended usage, preferred form factor (desktop or laptop), and any specific requirements.

  Based on this information, you will recommend the best PC or laptop configuration for their needs. Explain your reasoning for the recommendation.

  If the recommendation is for a desktop, provide the configuration as a JSON object where keys are the component name (e.g., "CPU", "GPU") and values are the specific part.

  If the recommendation is for a laptop, provide the name of the laptop as a string in the 'recommendation' field.

  Budget: {{{budget}}}
  Intended Usage: {{{intendedUsage}}}
  Preferred Form Factor: {{{preferredFormFactor}}}
  Specific Requirements: {{{specificRequirements}}}
  `,
});

const recommendPCConfigurationFlow = ai.defineFlow(
  {
    name: 'recommendPCConfigurationFlow',
    inputSchema: RecommendPCConfigurationInputSchema,
    outputSchema: RecommendPCConfigurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
