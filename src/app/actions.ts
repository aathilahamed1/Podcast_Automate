"use server";

import {
  generateContentAssets,
  type GenerateContentAssetsOutput,
} from "@/ai/flows/generate-content-assets";
import { z } from "zod";

const FormSchema = z.object({
  podcastSource: z
    .string()
    .min(10, "Podcast source is too short. Please provide a valid URL or a longer transcript."),
  toneStyle: z.enum([
    "Formal",
    "Casual",
    "Motivational",
    "Storytelling",
    "Professional",
  ]),
  targetAudience: z.string(),
  platforms: z.array(z.string()).min(1, "Please select at least one platform."),
});

export async function generateAssetsAction(
  formData: FormData
): Promise<{ data: GenerateContentAssetsOutput | null; error: string | null }> {
  const rawFormData = {
    podcastSource: formData.get("podcastSource"),
    toneStyle: formData.get("toneStyle"),
    targetAudience: formData.get("targetAudience"),
    platforms: formData.getAll("platforms"),
  };

  const validatedFields = FormSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    const firstError = Object.values(
      validatedFields.error.flatten().fieldErrors
    )[0]?.[0];
    return {
      data: null,
      error: firstError || "Invalid form data. Please check your inputs.",
    };
  }

  try {
    const result = await generateContentAssets(validatedFields.data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { data: null, error: `Generation failed: ${errorMessage}` };
  }
}
