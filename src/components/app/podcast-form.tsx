"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Link2, Loader2, Type, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TONES = [
  "Professional",
  "Casual",
  "Formal",
  "Motivational",
  "Storytelling",
];
const AUDIENCES = ["General", "Founders", "Students", "Tech", "Business"];
const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter/X" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
];

type PodcastFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export function PodcastForm({ formAction, isPending }: PodcastFormProps) {
  return (
    <form action={formAction} className="space-y-8">
      <Card className="overflow-hidden shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            1. Provide Your Podcast
          </CardTitle>
          <CardDescription>
            Paste a link (YouTube, Spotify, RSS) or provide a transcript.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="url">
                <Link2 className="mr-2 h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="file" disabled>
                <FileUp className="mr-2 h-4 w-4" />
                File
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="mr-2 h-4 w-4" />
                Text
              </TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="pt-4">
              <Label htmlFor="podcast-url" className="sr-only">
                Podcast URL
              </Label>
              <Input
                id="podcast-url"
                name="podcastSource"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </TabsContent>
            <TabsContent value="text" className="pt-4">
              <Label htmlFor="podcast-text" className="sr-only">
                Podcast Transcript
              </Label>
              <Textarea
                id="podcast-text"
                name="podcastSource"
                placeholder="Paste your full podcast transcript here..."
                rows={8}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            2. Customize Your Content
          </CardTitle>
          <CardDescription>
            Tailor the generated assets to match your brand and audience.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tone-style">Tone Style</Label>
            <Select name="toneStyle" defaultValue="Professional">
              <SelectTrigger id="tone-style">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Select name="targetAudience" defaultValue="General">
              <SelectTrigger id="target-audience">
                <SelectValue placeholder="Select an audience" />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCES.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3 md:col-span-2">
            <Label>Platforms for Social Posts</Label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              {PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    name="platforms"
                    value={platform.label}
                    defaultChecked
                  />
                  <Label htmlFor={platform.id} className="font-normal">
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="w-full max-w-xs text-lg"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          {isPending ? "Generating..." : "Generate Content Pack"}
        </Button>
      </div>
    </form>
  );
}
