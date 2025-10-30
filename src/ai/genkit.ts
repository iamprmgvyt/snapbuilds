import {genkit} from 'genkit';
import {groq} from 'genkitx-groq';
import {llama3} from 'genkitx-groq/llms';

export const ai = genkit({
  plugins: [groq({apiKey: process.env.GROQ_API_KEY})],
});

export {llama3};
