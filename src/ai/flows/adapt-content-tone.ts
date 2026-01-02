'use server';

/**
 * @fileOverview Adapts the generated podcast content to a specified tone and target audience.
 *
 * - adaptContentTone - A function that adapts the content tone based on user preferences.
 * - AdaptContentToneInput - The input type for the adaptContentTone function.
 * - AdaptContentToneOutput - The return type for the adaptContentTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptContentToneInputSchema = z.object({
  episodeSummary: z.string().describe('The summary of the podcast episode.'),
  showNotes: z.string().describe('The professional show notes for the episode.'),
  blogArticle: z.string().describe('The SEO-optimized blog article.'),
  socialMediaContent: z.string().describe('The social media content pack.'),
  emailNewsletterDraft: z.string().describe('The email newsletter draft.'),
  titlesAndHooks: z.string().describe('The catchy title options and platform-specific hooks.'),
  toneStyle: z
    .string()
    .describe(
      'The desired tone style for the content (e.g., Formal, Casual, Motivational, Storytelling, Professional).'
    ),
  targetAudience: z
    .string()
    .describe('The target audience for the content (e.g., Founders, Students, Tech, Business, General).'),
});
export type AdaptContentToneInput = z.infer<typeof AdaptContentToneInputSchema>;

const AdaptContentToneOutputSchema = z.object({
  adaptedEpisodeSummary: z.string().describe('The episode summary adapted to the specified tone and audience.'),
  adaptedShowNotes: z.string().describe('The show notes adapted to the specified tone and audience.'),
  adaptedBlogArticle: z.string().describe('The blog article adapted to the specified tone and audience.'),
  adaptedSocialMediaContent: z.string().describe('The social media content adapted to the specified tone and audience.'),
  adaptedEmailNewsletterDraft: z
    .string()
    .describe('The email newsletter draft adapted to the specified tone and audience.'),
  adaptedTitlesAndHooks: z.string().describe('The titles and hooks adapted to the specified tone and audience.'),
});
export type AdaptContentToneOutput = z.infer<typeof AdaptContentToneOutputSchema>;

export async function adaptContentTone(input: AdaptContentToneInput): Promise<AdaptContentToneOutput> {
  return adaptContentToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptContentTonePrompt',
  input: {schema: AdaptContentToneInputSchema},
  output: {schema: AdaptContentToneOutputSchema},
  prompt: `You are an expert content adapter specializing in tailoring content to specific tones and target audiences.  

You will be provided with podcast content assets (episode summary, show notes, blog article, social media content, email newsletter draft, titles and hooks).

Your task is to adapt these assets to align with the specified tone style and target audience.  Maintain the original content's core message and information while adjusting the language and style.

Tone Style: {{{toneStyle}}}
Target Audience: {{{targetAudience}}}

Original Content:
Episode Summary: {{{episodeSummary}}}
Show Notes: {{{showNotes}}}
Blog Article: {{{blogArticle}}}
Social Media Content: {{{socialMediaContent}}}
Email Newsletter Draft: {{{emailNewsletterDraft}}}
Titles and Hooks: {{{titlesAndHooks}}}


Output the adapted content in the same structure as the original content, modifying each part to reflect the requested tone and target audience.

Adapted Content:
Adapted Episode Summary:
Adapted Show Notes:
Adapted Blog Article:
Adapted Social Media Content:
Adapted Email Newsletter Draft:
Adapted Titles and Hooks: `,
});

const adaptContentToneFlow = ai.defineFlow(
  {
    name: 'adaptContentToneFlow',
    inputSchema: AdaptContentToneInputSchema,
    outputSchema: AdaptContentToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
