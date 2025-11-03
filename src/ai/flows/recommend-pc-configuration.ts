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
  recommendation: z.union([PCPartSchema, LaptopDetailSchema, z.string()]).describe('The recommended PC or laptop configuration. If a PC, it is a JSON object with parts. If a laptop, it can be an object with name and price, or a single string.'),
  reasoning: z.string().describe('The reasoning behind the recommendation.'),
  disclaimers: z.array(z.string()).describe("A list of disclaimers regarding pricing and component availability."),
});
export type RecommendPCConfigurationOutput = z.infer<typeof RecommendPCConfigurationOutputSchema>;

export async function recommendPCConfiguration(input: RecommendPCConfigurationInput): Promise<RecommendPCConfigurationOutput> {
  return recommendPCConfigurationFlow(input);
}

const conversionRates: { [key: string]: number } = {
    'USD': 1, 'EUR': 1.08, 'JPY': 0.0063, 'GBP': 1.27, 'AUD': 0.66,
    'CAD': 0.73, 'CHF': 1.11, 'CNY': 0.14, 'HKD': 0.13, 'NZD': 0.61,
    'SEK': 0.095, 'KRW': 0.00072, 'SGD': 0.74, 'NOK': 0.094, 'MXN': 0.054,
    'INR': 0.012, 'RUB': 0.011, 'ZAR': 0.053, 'TRY': 0.030, 'BRL': 0.18,
    'TWD': 0.031, 'DKK': 0.14, 'PLN': 0.25, 'THB': 0.027, 'IDR': 0.000061,
    'HUF': 0.0027, 'CZK': 0.043, 'ILS': 0.27, 'CLP': 0.0011, 'PHP': 0.017,
    'AED': 0.27, 'COP': 0.00024, 'SAR': 0.27, 'MYR': 0.21, 'RON': 0.22,
    'AFN': 0.014, 'ALL': 0.011, 'AMD': 0.0026, 'ANG': 0.56, 'AOA': 0.0012,
    'ARS': 0.0011, 'AWG': 0.56, 'AZN': 0.59, 'BAM': 0.55, 'BBD': 0.50,
    'BDT': 0.0085, 'BGN': 0.55, 'BHD': 2.65, 'BIF': 0.00035, 'BMD': 1.00,
    'BND': 0.74, 'BOB': 0.14, 'BSD': 1.00, 'BTN': 0.012, 'BWP': 0.071,
    'BYN': 0.31, 'BZD': 0.50, 'CDF': 0.00036, 'CRC': 0.0019, 'CUP': 0.042,
    'CVE': 0.0098, 'DJF': 0.0056, 'DOP': 0.017, 'DZD': 0.0074, 'EGP': 0.021,
    'ERN': 0.067, 'ETB': 0.017, 'FJD': 0.45, 'FKP': 1.27, 'FOK': 0.14,
    'GEL': 0.35, 'GGP': 1.27, 'GHS': 0.067, 'GIP': 1.27, 'GMD': 0.015,
    'GNF': 0.00012, 'GTQ': 0.13, 'GYD': 0.0048, 'HNL': 0.040, 'HRK': 0.14,
    'HTG': 0.0076, 'IQD': 0.00076, 'IRR': 0.000024, 'ISK': 0.0072, 'JEP': 1.27,
    'JMD': 0.0064, 'JOD': 1.41, 'KES': 0.0078, 'KGS': 0.011, 'KHR': 0.00024,
    'KID': 0.66, 'KMF': 0.0022, 'KWD': 3.26, 'KYD': 1.20, 'KZT': 0.0021,
    'LAK': 0.000046, 'LBP': 0.000011, 'LKR': 0.0033, 'LRD': 0.0052, 'LSL': 0.053,
    'LYD': 0.21, 'MAD': 0.10, 'MDL': 0.056, 'MGA': 0.00022, 'MKD': 0.018,
    'MMK': 0.00048, 'MNT': 0.00029, 'MOP': 0.12, 'MRU': 0.025, 'MUR': 0.021,
    'MVR': 0.065, 'MWK': 0.00058, 'MZN': 0.016, 'NAD': 0.053, 'NGN': 0.00067,
    'NIO': 0.027, 'NPR': 0.0075, 'OMR': 2.60, 'PAB': 1.00, 'PEN': 0.26,
    'PGK': 0.26, 'PKR': 0.0036, 'PYG': 0.00013, 'QAR': 0.27, 'RSD': 0.0092,
    'RWF': 0.00077, 'SBD': 0.12, 'SCR': 0.072, 'SDG': 0.0017, 'SHP': 1.27,
    'SLE': 0.043, 'SOS': 0.0017, 'SRD': 0.028, 'SSP': 0.00065, 'STN': 0.043,
    'SYP': 0.000077, 'SZL': 0.053, 'TJS': 0.092, 'TMT': 0.29, 'TND': 0.32,
    'TOP': 0.42, 'TTD': 0.15, 'TVD': 0.66, 'TZS': 0.00038, 'UAH': 0.025,
    'UGX': 0.00027, 'UYU': 0.025, 'UZS': 0.000079, 'VES': 0.027, 'VND': 0.000039,
    'VUV': 0.0083, 'WST': 0.36, 'XAF': 0.0016, 'XCD': 0.37, 'XDR': 1.32,
    'XOF': 0.0016, 'XPF': 0.0090, 'YER': 0.0040, 'ZMW': 0.039, 'ZWL': 0.0031
};


const convertCurrency = (amount: number, from: string, to: string) => {
    const fromRate = conversionRates[from.toUpperCase()] || 1;
    const toRate = conversionRates[to.toUpperCase()] || 1;
    const amountInUSD = amount * fromRate;
    return amountInUSD / toRate;
};

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
    return convertCurrency(amount, currency, 'USD');
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

Your response MUST be a JSON object with three keys: "recommendation", "reasoning", and "disclaimers".

1.  First, convert the user's budget to USD to understand the price point. Let's say the result is X.
2.  Based on this information, you will recommend the best PC or laptop configuration for their needs. You MUST build the PC for the right price based on the budget.
3.  For each component (or the laptop), determine its price in USD.
4.  Then, convert each component's USD price back to the user's original currency: ${input.currency}.
5.  If the recommendation is for a desktop, the value of the "recommendation" key should be a JSON object where keys are the component name (e.g., "CPU", "GPU"). The value for each key should be an object with "name" and "price" (in ${input.currency}).
6.  If the recommendation is for a laptop, the value of the "recommendation" key should be an object with "name" and "price" (in ${input.currency}).
7.  The "reasoning" key should contain a string explaining your recommendation.
8.  The "disclaimers" key should be an array of strings containing the following two sentences:
    - "The price of each component may be more expensive depending on the place of purchase and store"
    - "The components here are for reference only so the price may be expensive or not"

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
