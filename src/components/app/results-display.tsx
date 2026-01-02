"use client";

import type { GenerateContentAssetsOutput } from "@/ai/flows/generate-content-assets";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookText,
  Bot,
  Clapperboard,
  ClipboardList,
  Instagram,
  Linkedin,
  Mail,
  Newspaper,
  Quote,
  Sparkles,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import { CopyButton } from "./copy-button";
import { ReactNode } from "react";

type ResultsDisplayProps = {
  result: GenerateContentAssetsOutput | null;
  isPending: boolean;
};

const LoadingSkeleton = () => (
  <div className="mt-12 space-y-8">
    <div className="space-y-4 text-center">
        <Skeleton className="h-9 w-72 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-1/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  </div>
);

const ContentTab = ({ value, title, content, icon }: { value: string; title: string; content: string; icon: ReactNode }) => (
    <TabsContent value={value}>
        <Card className="shadow-sm">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
                <CopyButton textToCopy={content} />
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 w-full">
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap p-1 font-body">
                        {content}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    </TabsContent>
);

const SocialContentTab = ({ value, content, icon }: { value: string; content: string; icon: ReactNode }) => (
    <TabsContent value={value} className="mt-4">
        <ScrollArea className="h-72 w-full rounded-md border p-4">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-body">
                {content}
            </div>
        </ScrollArea>
    </TabsContent>
);

export function ResultsDisplay({ result, isPending }: ResultsDisplayProps) {
  if (isPending) {
    return <LoadingSkeleton />;
  }

  if (!result) {
    return (
        <div className="mt-20 text-center text-muted-foreground">
            <Bot size={48} className="mx-auto mb-4"/>
            <p className="font-headline text-xl">Your generated content will appear here.</p>
            <p>Fill out the form above to get started.</p>
        </div>
    );
  }

  const {
    episodeSummary,
    showNotes,
    blogArticle,
    socialMediaContent,
    newsletterEmail,
    titlesAndHooks,
    timestampHighlights,
    keyQuotes,
    ctaSuggestions,
    transcript,
  } = result;

  return (
    <section className="mt-12">
      <h2 className="font-headline text-center text-3xl font-bold tracking-tight mb-8">
        Your Content Pack is Ready
      </h2>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="h-auto justify-start overflow-x-auto p-1.5 -mx-1.5">
          <TabsTrigger value="summary"><ClipboardList className="mr-2 h-4 w-4" />Summary</TabsTrigger>
          <TabsTrigger value="showNotes"><Clapperboard className="mr-2 h-4 w-4" />Show Notes</TabsTrigger>
          <TabsTrigger value="blog"><Newspaper className="mr-2 h-4 w-4" />Blog Article</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="newsletter"><Mail className="mr-2 h-4 w-4" />Newsletter</TabsTrigger>
          <TabsTrigger value="titles"><Sparkles className="mr-2 h-4 w-4" />Titles & Hooks</TabsTrigger>
          <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
          <TabsTrigger value="quotes"><Quote className="mr-2 h-4 w-4" />Key Quotes</TabsTrigger>
          <TabsTrigger value="ctas"><ThumbsUp className="mr-2 h-4 w-4" />CTA Suggestions</TabsTrigger>
          <TabsTrigger value="transcript"><BookText className="mr-2 h-4 w-4" />Transcript</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
            <ContentTab value="summary" title="Episode Summary" content={episodeSummary} icon={<ClipboardList className="h-5 w-5" />}/>
            <ContentTab value="showNotes" title="Show Notes" content={showNotes} icon={<Clapperboard className="h-5 w-5" />} />
            <ContentTab value="blog" title="SEO Blog Article" content={blogArticle} icon={<Newspaper className="h-5 w-5" />}/>
            
            <TabsContent value="social">
                <Card className="shadow-sm">
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="font-headline text-xl">Social Media Content</CardTitle>
                        <CopyButton textToCopy={JSON.stringify(socialMediaContent, null, 2)} />
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="linkedIn" className="w-full">
                            <TabsList>
                                {socialMediaContent.linkedIn && <TabsTrigger value="linkedIn"><Linkedin className="mr-1 h-4 w-4" />LinkedIn</TabsTrigger>}
                                {socialMediaContent.twitterThread && <TabsTrigger value="twitter"><Twitter className="mr-1 h-4 w-4" />Twitter/X</TabsTrigger>}
                                {socialMediaContent.instagramCaption && <TabsTrigger value="instagram"><Instagram className="mr-1 h-4 w-4" />Instagram</TabsTrigger>}
                            </TabsList>
                            {socialMediaContent.linkedIn && <SocialContentTab value="linkedIn" content={socialMediaContent.linkedIn} icon={<Linkedin />}/>}
                            {socialMediaContent.twitterThread && <SocialContentTab value="twitter" content={socialMediaContent.twitterThread} icon={<Twitter />}/>}
                            {socialMediaContent.instagramCaption && <SocialContentTab value="instagram" content={socialMediaContent.instagramCaption} icon={<Instagram />} />}
                        </Tabs>
                    </CardContent>
                </Card>
            </TabsContent>

            <ContentTab value="newsletter" title="Email Newsletter" content={newsletterEmail} icon={<Mail className="h-5 w-5" />}/>
            <ContentTab value="titles" title="Titles & Hooks" content={titlesAndHooks} icon={<Sparkles className="h-5 w-5" />}/>
            <ContentTab value="timestamps" title="Timestamp Highlights" content={timestampHighlights} icon={<Sparkles className="h-5 w-5" />}/>
            <ContentTab value="quotes" title="Key Quotes" content={keyQuotes} icon={<Quote className="h-5 w-5" />}/>
            <ContentTab value="ctas" title="CTA Suggestions" content={ctaSuggestions} icon={<ThumbsUp className="h-5 w-5" />}/>
            <ContentTab value="transcript" title="Full Transcript" content={transcript} icon={<BookText className="h-5 w-5" />}/>
        </div>
      </Tabs>
    </section>
  );
}
