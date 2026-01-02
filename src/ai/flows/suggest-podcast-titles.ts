'use server';

/**
 * @fileOverview Generates catchy titles and platform-specific hooks for podcast episodes.
 *
 * - suggestPodcastTitles - A function that suggests podcast titles and hooks.
 * - SuggestPodcastTitlesInput - The input type for the suggestPodcastTitles function.
 * - SuggestPodcastTitlesOutput - The return type for the suggestPodcastTitles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPodcastTitlesInputSchema = z.object({
  episodeSummary: z
    .string()
    .describe('A summary of the podcast episode content.'),
  toneStyle: z
    .string()
    .describe(
      'The desired tone style for the titles and hooks (e.g., Formal, Casual, Motivational, Storytelling, Professional).'
    ),
  targetAudience: z
    .string()
    .describe('The target audience for the podcast (e.g., Founders, Students, Tech, Business, General).'),
});
export type SuggestPodcastTitlesInput = z.infer<typeof SuggestPodcastTitlesInputSchema>;

const SuggestPodcastTitlesOutputSchema = z.object({
  titles: z
    .array(z.string())
    .describe('An array of catchy title options for the podcast episode.'),
  hooks: z
    .object({
      linkedIn: z.string().describe('A LinkedIn hook for the podcast episode.'),
      twitter: z.string().describe('A Twitter/X hook for the podcast episode.'),
      instagram: z.string().describe('An Instagram hook for the podcast episode.'),
      youtube: z.string().describe('A YouTube hook for the podcast episode.'),
    })
    .describe('Platform-specific hooks to attract a wider audience.'),
});
export type SuggestPodcastTitlesOutput = z.infer<typeof SuggestPodcastTitlesOutputSchema>;

export async function suggestPodcastTitles(input: SuggestPodcastTitlesInput): Promise<SuggestPodcastTitlesOutput> {
  return suggestPodcastTitlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPodcastTitlesPrompt',
  input: {schema: SuggestPodcastTitlesInputSchema},
  output: {schema: SuggestPodcastTitlesOutputSchema},
  prompt: `You are an expert in creating catchy titles and hooks for podcast episodes.

  Given the following podcast episode summary, tone style, and target audience, generate several catchy title options and platform-specific hooks to attract a wider audience.

  Podcast Episode Summary: {{{episodeSummary}}}
  Tone Style: {{{toneStyle}}}
  Target Audience: {{{targetAudience}}}

  The titles should be engaging, natural, and human-like, while also maintaining the original speaker voice and personality, and be context-aware, platform-optimized, and grammatically perfect.

  The platform-specific hooks should use the correct tone and formatting style for each platform, and include hooks and CTAs.

  Output the titles as an array of strings, and the hooks as an object with LinkedIn, Twitter, Instagram, and YouTube keys.
  `,
});

const suggestPodcastTitlesFlow = ai.defineFlow(
  {
    name: 'suggestPodcastTitlesFlow',
    inputSchema: SuggestPodcastTitlesInputSchema,
    outputSchema: SuggestPodcastTitlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
