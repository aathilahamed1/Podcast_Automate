import { config } from 'dotenv';
config();

import '@/ai/flows/generate-content-assets.ts';
import '@/ai/flows/suggest-podcast-titles.ts';
import '@/ai/flows/adapt-content-tone.ts';