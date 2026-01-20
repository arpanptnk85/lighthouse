"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Star,
  Clock,
  ChevronRight,
  FileText,
  Calendar,
  Layers,
  Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InsightViewModal } from "./detail-insight-modal";
import { useInsights } from "@/hooks/use-insights";

export default function PlaygroundInsights() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { insights, loading, refresh } = useInsights();

  if (loading) {
    return <div className="text-muted-foreground">Loading insights…</div>;
  }

  if (!insights.length) {
    return (
      <div className="text-muted-foreground">
        No insights yet. Save an Ask to create one.
      </div>
    );
  }

  const handleOpenInsight = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-500">
      {/* 1. Header Section - Matching Settings/Billing Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary shadow-sm shadow-primary/5">
              <Archive className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
              Insights Archive
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Access and interrogate processed datasets, review archival
            parameters, and manage high-value insights within a secure
            environment.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {insights.map((insight) => (
          <div
            key={insight.id}
            onClick={() => handleOpenInsight(insight.id)}
            className="group relative flex items-center gap-6 rounded-2xl border border-border/50 bg-card/30 p-5 hover:bg-primary/[0.02] hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
          >
            {/* 1. Leading Status/Icon */}
            <div className="hidden sm:flex flex-col items-center gap-2 border-r border-border/50 pr-6">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl transition-all duration-500",
                  insight.is_starred
                    ? "bg-amber-500/10 text-amber-500 shadow-inner shadow-amber-500/10"
                    : "bg-primary/5 text-primary/40 group-hover:text-primary group-hover:bg-primary/10",
                )}
              >
                {insight.is_starred ? (
                  <Star className="size-5 fill-current" />
                ) : (
                  <FileText className="size-5" />
                )}
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter opacity-40">
                ID-{insight.id.toString().padStart(3, "0")}
              </span>
            </div>

            {/* 2. Content Core */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-black text-sm uppercase tracking-tight text-foreground group-hover:text-primary transition-colors italic">
                  {insight.title}
                </h3>
                {/* Optional: Source Badge if available in your data */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted/50 border border-border/50 text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                  <Layers className="size-2.5" />
                  Stream_Extract
                </div>
              </div>

              <p className="text-xs text-muted-foreground/80 line-clamp-1 font-medium leading-relaxed">
                {insight.description || (
                  <span className="italic opacity-40">
                    No additional contextual metadata provided for this
                    protocol.
                  </span>
                )}
              </p>

              {/* 3. Metadata Footer */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                  <Calendar className="size-3" />
                  {new Date(insight.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                  <Clock className="size-3" />
                  {new Date(insight.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {/* 4. Trailing Action */}
            <div className="flex flex-col items-end gap-2">
              <div className="rounded-full p-2 bg-transparent group-hover:bg-primary/10 transition-colors">
                <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-primary translate-x-0 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Decorative Background Accent */}
            <div className="absolute right-0 top-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-r-2xl" />
          </div>
        ))}

        {/* The Single Reusable Modal */}
        <InsightViewModal
          insightId={selectedId}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onActionComplete={refresh}
        />

        {/* Empty State */}
        {insights.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-border/60 bg-muted/5">
            <FileText className="size-10 text-muted-foreground/20 mb-4" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
              Archive Empty
            </h3>
            <p className="text-[11px] text-muted-foreground/60 mt-2 italic">
              No intelligence has been committed to the archive yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
