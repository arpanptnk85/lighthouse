"use client";

import { useState } from "react";
import { Loader2, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SuggestedQuestions } from "./suggested-questions";
import { IntelligenceResponse } from "./intelligenece-response";
import { SaveInsightDialog } from "./save-insight-dialog";
import { cn } from "@/lib/utils";

export function DatasetAsk({
  datasetId,
  schemaColumns,
}: {
  datasetId: number;
  schemaColumns: string[];
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [askResponse, setAskResponse] = useState<any | null>(null);

  async function ask() {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/playground/datasets/${datasetId}/ask/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ question }),
        },
      );

      const data = await res.json();
      setAskResponse(data);
      setAnswer(data.response);
    } catch (error) {
      console.error("Interrogation failed", error);
    } finally {
      setLoading(false);
    }
  }

  const generateSuggestions = (cols: string[]) => {
    if (!cols || cols.length === 0)
      return ["Analyze this dataset", "Summarize key trends", "Show anomalies"];
    return [
      `Summarize the distribution of ${cols[0]}`,
      `Show me the top 5 records by ${cols[1] || cols[0]}`,
      `Are there any statistical anomalies in this dataset?`,
    ];
  };

  const suggestions = generateSuggestions(schemaColumns);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* 1. Interrogation Input Area */}
      <div className="relative group overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-1 focus-within:border-primary/40 transition-all shadow-2xl shadow-black/20">
        {/* 1. Icon Alignment: Increased top and left for breathing room */}
        <MessageSquare className="absolute top-4 left-4 size-4 text-primary/50 group-focus-within:text-primary transition-colors z-10" />

        <Textarea
          className={cn(
            "w-full min-h-[120px] bg-transparent border-none focus-visible:ring-0 resize-none placeholder:text-muted-foreground/50",
            "pl-12 pt-3.5 pb-14 text-sm leading-relaxed", // 2. Matched padding
          )}
          placeholder="Enter intelligence query or interrogation parameters..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hidden sm:block">
            Lighthouse Intelligence Protocol v1.0
          </span>
          <Button
            onClick={ask}
            disabled={loading || !question}
            className="h-9 px-5 font-black text-xs uppercase tracking-tighter shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
          >
            {loading ? (
              <Loader2 className="mr-2 size-3.5 animate-spin" />
            ) : (
              <Zap className="mr-2 size-3.5 fill-current" />
            )}
            {loading ? "Interrogating..." : "Execute Query"}
          </Button>
        </div>
      </div>

      {/* 2. Reusable Follow-up Section (Visible when not loading) */}
      {!loading && !answer && (
        <SuggestedQuestions
          questions={suggestions}
          onSelect={(q) => {
            setQuestion(q);
            // Optional: auto-trigger ask() here
          }}
        />
      )}

      {/* 3. Reusable Response Section */}
      {answer && <IntelligenceResponse answer={answer} ask={askResponse} />}
    </div>
  );
}
