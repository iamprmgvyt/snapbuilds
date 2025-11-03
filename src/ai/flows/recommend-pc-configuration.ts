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
  buildTier: z.enum(['Basic', 'Advanced', 'Super High-End']).describe('The desired build quality tier.'),
  specificRequirements: z
    .string()
    .optional()
    .describe(
      'Are there any specific requirements or preferences you have (e.g., specific brand, screen size, operating system)?'
    ),
});
export type RecommendPCConfigurationInput = z.infer<typeof RecommendPCConfigurationInputSchema>;

const PCPartDetailSchema = z.object({
  name: z.string().describe('The name of the component.'),
  price: z.number().describe('The estimated price of the component in the requested currency.'),
});

const PCPartSchema = z.object({
  CPU: PCPartDetailSchema.optional(),
  GPU: PCPartDetailSchema.optional(),
  Motherboard: PCPartDetailSchema.optional(),
  RAM: PCPartDetailSchema.optional(),
  Storage: PCPartDetailSchema.optional(),
  'Power Supply': PCPartDetailSchema.optional(),
  Case: PCPartDetailSchema.optional(),
});

const LaptopDetailSchema = z.object({
    name: z.string().describe("The name of the laptop."),
    price: z.number().describe("The estimated price of the laptop in the requested currency."),
});

const RecommendPCConfigurationOutputSchema = z.object({
  recommendation: z.union([PCPartSchema, LaptopDetailSchema]).describe('The recommended PC or laptop configuration. If a PC, it is a JSON object with parts. If a laptop, it is an object with name and price.'),
  reasoning: z.string().describe('The reasoning behind the recommendation.'),
  disclaimers: z.array(z.string()).describe("A list of disclaimers regarding pricing and component availability."),
});
export type RecommendPCConfigurationOutput = z.infer<typeof RecommendPCConfigurationOutputSchema>;

export async function recommendPCConfiguration(input: RecommendPCConfigurationInput): Promise<RecommendPCConfigurationOutput> {
  return recommendPCConfigurationFlow(input);
}

const recommendPCConfigurationFlow = ai.defineFlow(
  {
    name: 'recommendPCConfigurationFlow',
    inputSchema: RecommendPCConfigurationInputSchema,
    outputSchema: RecommendPCConfigurationOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      model: 'groq/llama-3.1-8b-instant',
      prompt: `You are an expert PC and laptop advisor. A user will provide their budget, intended usage, preferred form factor (desktop or laptop), build tier, and any specific requirements.

Your response MUST be a JSON object with three keys: "recommendation", "reasoning", and "disclaimers". All three keys are mandatory.

1.  Based on the user's input, recommend the best PC or laptop configuration for their needs.
2.  You MUST build the PC for the right price. The total price of all components MUST NOT exceed the user's budget of ${input.currency} ${input.budget}.
3.  The build tier will guide your component selection:
    - Basic: Focus on essential components, using fewer expensive parts to meet the budget.
    - Advanced: A balanced build with a mix of mid-range components.
    - Super High-End: Prioritize performance with top-tier components, while still staying under budget.
4.  For each component (or the laptop), determine its price in the user's original currency: ${input.currency}.
5.  If the recommendation is for a desktop, the value of the "recommendation" key must be a JSON object where keys are the component name (e.g., "CPU", "GPU"). The value for each key should be an object with "name" and "price" (in ${input.currency}). All component values are optional, but you should try to include them.
6.  If the recommendation is for a laptop, the value of the "recommendation" key should be an object with "name" and "price" (in ${input.currency}).
7.  The "reasoning" key must contain a string explaining your recommendation. This is a mandatory field.
8.  The "disclaimers" key must be an array of strings containing the following two sentences:
    - "The price of each component may be more expensive depending on the place of purchase and store"
    - "The components here are for reference only so the price may be expensive or not"

User Input:
Budget: ${input.currency} ${input.budget}
Intended Usage: ${input.intendedUsage}
Preferred Form Factor: ${input.preferredFormFactor}
Build Tier: ${input.buildTier}
Specific Requirements: ${input.specificRequirements || 'None'}
`,
      output: {
        schema: RecommendPCConfigurationOutputSchema,
      },
      config: {
        temperature: 0.3,
      },
    });
    return output!;
  }
);
