"use client";

import React from "react";
import {
  CheckCircle2,
  CircleDashed,
  AlertCircle,
  Clock,
  Database,
  ChevronRight,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Version = {
  id: number;
  status: string;
  record_count: number;
  started_at: string;
  completed_at: string | null;
};

export function DatasetVersions({ datasetId }: { datasetId: number }) {
  const [versions, setVersions] = React.useState<Version[]>([]);

  React.useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/datasets/${datasetId}/versions/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    )
      .then((r) => r.json())
      .then(setVersions);
  }, [datasetId]);

  return (
    <div className="max-h-[48vh] overflow-auto relative space-y-4">
      {/* Vertical Timeline Thread */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-border to-transparent hidden sm:block" />

      {versions.map((v, i) => {
        const isLatest = i === 0;
        const isSuccess =
          v.status.toLowerCase() === "success" ||
          v.status.toLowerCase() === "completed";
        const isProcessing =
          v.status.toLowerCase() === "processing" ||
          v.status.toLowerCase() === "running";

        return (
          <div
            key={v.id}
            className={cn(
              "group relative flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300",
              isLatest
                ? "bg-primary/[0.03] border-primary/20 shadow-lg shadow-primary/5"
                : "bg-card/40 border-border/50 hover:bg-card/60",
            )}
          >
            {/* Status Icon Indicator */}
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm transition-transform group-hover:scale-110",
                isSuccess
                  ? "text-emerald-500 border-emerald-500/20"
                  : isProcessing
                    ? "text-primary border-primary/20"
                    : "text-muted-foreground",
              )}
            >
              {isSuccess ? (
                <CheckCircle2 className="size-5" />
              ) : isProcessing ? (
                <CircleDashed className="size-5 animate-spin" />
              ) : (
                <AlertCircle className="size-5" />
              )}
            </div>

            {/* Version Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-foreground">
                    Instance #{v.id}
                  </span>
                  {isLatest && (
                    <Badge
                      variant="outline"
                      className="text-[9px] font-black uppercase tracking-tighter bg-primary/10 text-primary border-primary/20 h-5"
                    >
                      Latest Insights
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/70">
                  <Clock className="size-3" />
                  {new Date(v.started_at).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 leading-none mb-1">
                    Capture Status
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wide",
                      isSuccess
                        ? "text-emerald-500"
                        : isProcessing
                          ? "text-primary"
                          : "text-muted-foreground",
                    )}
                  >
                    {v.status}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 leading-none mb-1">
                    Record Count
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                    <Database className="size-3 text-primary/50" />
                    {v.record_count.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Arrow */}
            <div className="self-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ChevronRight className="size-5 text-primary" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
