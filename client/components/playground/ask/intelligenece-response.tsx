"use client";

import React from "react";
import { Sparkles, Terminal as TerminalIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaveInsightDialog } from "./save-insight-dialog";

export function IntelligenceResponse({ answer, ask }: { answer: any; ask: any}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text =
      typeof answer === "string" ? answer : JSON.stringify(answer, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 max-w-full">
      {/* Header Row */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="size-3 text-primary animate-pulse" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
            Synthesized Insights
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/10 border border-transparent hover:border-primary/10 transition-all"
          >
            {copied ? (
              <Check className="mr-1.5 size-3 text-emerald-500" />
            ) : (
              <Copy className="mr-1.5 size-3" />
            )}
            {copied ? "Copied" : "Copy Output"}
          </Button>
          <SaveInsightDialog askId={ask.id} />
        </div>
      </div>

      {/* Main Content Terminal */}
      <div className="group relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-background to-background shadow-2xl shadow-black/40">
        {/* Terminal Header Decorator */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-primary/10 bg-primary/5">
          <div className="size-1.5 rounded-full bg-red-500/50" />
          <div className="size-1.5 rounded-full bg-amber-500/50" />
          <div className="size-1.5 rounded-full bg-emerald-500/50" />
          <span className="ml-2 text-[9px] font-mono font-bold text-primary/40 uppercase tracking-widest">
            Intelligence_Output.log
          </span>
        </div>

        {/* Scrollable Area */}
        <div className="relative max-h-[450px] overflow-y-auto custom-scrollbar p-6">
          {/* Background Branding Icon */}
          <TerminalIcon className="absolute -bottom-6 -right-6 size-32 text-primary/5 rotate-12 pointer-events-none group-hover:text-primary/10 transition-colors duration-500" />

          <div className="relative z-10 font-mono text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/30 selection:text-primary-foreground">
            {typeof answer === "string" ? (
              answer
            ) : (
              <pre className="m-0 p-0 bg-transparent border-none">
                {JSON.stringify(answer, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Bottom Fade Gradient (Shows if content is long) */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none rounded-b-2xl opacity-60" />
      </div>

      {/* Footer Meta */}
      <div className="flex justify-end px-2">
        <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
          End of Stream • Secure Interrogation Protocol
        </span>
      </div>
    </div>
  );
}
