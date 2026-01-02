"use client";

import { useState, useTransition, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { GenerateContentAssetsOutput } from "@/ai/flows/generate-content-assets";
import { generateAssetsAction } from "@/app/actions";
import { PodcastForm } from "@/components/app/podcast-form";
import { ResultsDisplay } from "@/components/app/results-display";
import { Bot } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<GenerateContentAssetsOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      const response = await generateAssetsAction(formData);
      if (response.error) {
        toast({
          variant: "destructive",
          title: "Generation Error",
          description: response.error,
        });
        setResult(null);
      } else {
        setResult(response.data);
        toast({
            title: "Success!",
            description: "Your content pack has been generated.",
        })
      }
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-primary">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">AI Content Automation</span>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Podcast Automate
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Turn your podcast into a content machine. Provide a link or
            transcript and get a full suite of ready-to-publish assets.
          </p>
        </header>

        {isClient && <PodcastForm formAction={handleFormAction} isPending={isPending} />}

        <ResultsDisplay result={result} isPending={isPending} />
      </div>
    </main>
  );
}
