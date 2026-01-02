'use server';

/**
 * @fileOverview Generates content assets from a podcast audio file or link.
 *
 * - generateContentAssets - A function that generates content assets from a podcast.
 * - GenerateContentAssetsInput - The input type for the generateContentAssets function.
 * - GenerateContentAssetsOutput - The return type for the generateContentAssets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentAssetsInputSchema = z.object({
  podcastSource: z.string().describe('Raw podcast audio, YouTube/Spotify/RSS link, or transcript.'),
  toneStyle: z.enum([
    'Formal',
    'Casual',
    'Motivational',
    'Storytelling',
    'Professional',
  ]).default('Professional').describe('Preferred tone style for the content.'),
  targetAudience: z.string().default('General').describe('Target audience for the content.'),
  platforms: z.array(z.string()).default(['LinkedIn', 'Twitter', 'Instagram', 'YouTube']).describe('Platforms needed for social media content.'),
});
export type GenerateContentAssetsInput = z.infer<typeof GenerateContentAssetsInputSchema>;

const GenerateContentAssetsOutputSchema = z.object({
  episodeSummary: z.string().describe('Clear, engaging, and structured episode summary.'),
  showNotes: z.string().describe('Professional show notes with summary, key topics, timestamps, guest intro, and resources.'),
  blogArticle: z.string().describe('Well-structured SEO blog article with headings, sub-headings, engaging narrative, and SEO-optimized keywords.'),
  socialMediaContent: z.object({
    linkedIn: z.string().describe('LinkedIn post with correct tone, formatting style, hooks, and CTAs.'),
    twitterThread: z.string().describe('Twitter/X thread with correct tone, formatting style, hooks, and CTAs.'),
    instagramCaption: z.string().describe('Instagram caption with correct tone, formatting style, hooks, and CTAs.'),
    youtubeDescription: z.string().describe('YouTube description with correct tone, formatting style, hooks, and CTAs.'),
  }).describe('Platform-tailored social media posts.'),
  newsletterEmail: z.string().describe('Email newsletter draft with a strong subject line, engaging intro, core highlights, and CTA.'),
  titlesAndHooks: z.string().describe('10 catchy title options and platform-specific hooks.'),
  timestampHighlights: z.string().describe('Notable sections with timestamps.'),
  keyQuotes: z.string().describe('Best punchlines and speaker-attributed quotes.'),
  ctaSuggestions: z.string().describe('Audience growth focused CTA suggestions.'),
  transcript: z.string().describe('Full podcast transcript.'),
  progress: z.string().describe('Progress of the content asset generation.'),
});
export type GenerateContentAssetsOutput = z.infer<typeof GenerateContentAssetsOutputSchema>;

export async function generateContentAssets(input: GenerateContentAssetsInput): Promise<GenerateContentAssetsOutput> {
  return generateContentAssetsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentAssetsPrompt',
  input: {schema: GenerateContentAssetsInputSchema},
  output: {schema: GenerateContentAssetsOutputSchema},
  prompt: `# Podcast Content Pack\n\nYou are an AI Content Repurposing Agent specialized in podcast automation. Your job is to convert podcast recordings into high-quality, platform-ready content assets with minimal user effort.\n\nGiven the following podcast information, generate the content pack according to the user's specifications.\n\nPodcast Source: {{{podcastSource}}}\nTone Style: {{{toneStyle}}}\nTarget Audience: {{{targetAudience}}}\nPlatforms: {{{platforms}}}\n\n## 1. Episode Summary\n...\n\n## 2. Show Notes\n...\n\n## 3. Blog Article\n...\n\n## 4. Social Media Content\n### LinkedIn\n...\n### Twitter Thread\n...\n### Instagram Caption\n...\n\n## 5. Newsletter Email\n...\n\n## 6. Titles & Hooks\n...\n\n## 7. Key Highlights + Timestamps\n...\n\n## 8. Quotes\n...\n\n## 9. CTA Suggestions\n...`,
});

const generateContentAssetsFlow = ai.defineFlow(
  {
    name: 'generateContentAssetsFlow',
    inputSchema: GenerateContentAssetsInputSchema,
    outputSchema: GenerateContentAssetsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated initial content assets from the podcast source.',
    };
  }
);
