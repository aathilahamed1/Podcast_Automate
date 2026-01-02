"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, ClipboardCopy } from "lucide-react";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy to clipboard">
            {hasCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardCopy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasCopied ? "Copied!" : "Copy content"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
