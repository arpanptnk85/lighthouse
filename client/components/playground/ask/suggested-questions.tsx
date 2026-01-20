"use client";

import React from "react";
import { Lightbulb, ArrowRight } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  loading?: boolean;
}

export function SuggestedQuestions({ questions, onSelect, loading }: SuggestedQuestionsProps) {
  if (loading || questions.length === 0) return null;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-1">
        <Lightbulb className="size-3 text-primary animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
          Suggested Interrogations
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="group flex items-center gap-3 px-3 py-2 rounded-xl border border-border/50 bg-card/50 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all active:scale-95"
          >
            <span className="truncate max-w-[250px]">{q}</span>
            <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}