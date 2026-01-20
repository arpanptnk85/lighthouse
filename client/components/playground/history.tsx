"use client";

import { useState } from "react";
import {
  Clock,
  Star,
  Trash2,
  Play,
  MoreHorizontal,
  HistoryIcon,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDatasetsHistory } from "@/hooks/use-datasets-history";
import { useDatasets } from "@/hooks/use-datasets";
import { DatasetList } from "./datasets/dataset-list";
import { Input } from "../ui/input";

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "running" | "failed";
  starred: boolean;
}

function getStatusBadge(status: HistoryItem["status"]) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Completed
        </Badge>
      );
    case "running":
      return (
        <Badge className="bg-primary/20 text-primary border-primary/30">
          Running
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          Failed
        </Badge>
      );
  }
}

export function PlaygroundHistory() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<number | null>(
    null,
  );

  const { histories: historyItems, loading: historyLoading } =
    useDatasetsHistory(selectedDatasetId);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* 1. Header Section - Matching Settings/Billing Style */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
            Runs & History
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Review past executions, interrogation logs, and AI-driven insights
            across your organizations.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all font-bold text-xs px-4 h-10 shadow-sm"
        >
          <Trash2 className="mr-2 size-3.5" />
          Purge History
        </Button>
      </div>

      {/* 2. Unified Workspace Area */}
      <div className="grid grid-cols-12 gap-8 border-t border-border pt-8">
        {/* Left Sidebar: Dataset Selection (3/12) */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search datasets..."
              className="pl-9 bg-muted/30 border-border/50 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-2 mb-2 block">
              Organization Datasets
            </span>
            <DatasetList
              selectedId={selectedDatasetId}
              onSelect={setSelectedDatasetId}
            />
          </div>
        </aside>

        {/* Right Content: The Log Stream (9/12) */}
        <main className="col-span-12 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-[11px] font-bold text-muted-foreground italic">
              Showing {historyItems.length} recent executions
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-[10px] font-black uppercase tracking-wider"
            >
              <Filter className="mr-2 size-3" /> Filter Logs
            </Button>
          </div>

          <div className="max-h-[60vh] overflow-auto relative space-y-3">
            {/* The Timeline Connector Line */}
            <div className="absolute left-[21px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/20 via-border to-transparent hidden sm:block" />

            {historyItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-start gap-4 rounded-2xl border border-border/50 bg-card/40 p-4 transition-all hover:bg-card/80 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Timeline Node */}
                <div className="hidden sm:flex relative z-10 size-11 shrink-0 items-center justify-center rounded-full border bg-background group-hover:border-primary/50 transition-colors shadow-sm">
                  {item.starred ? (
                    <Star className="size-4 fill-primary text-primary" />
                  ) : (
                    <div className="size-2 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground leading-none">
                          {item.title}
                        </h4>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 italic">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg"
                      >
                        <Play className="size-3.5 text-primary" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 hover:bg-primary/10"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-primary/20 bg-card/95 backdrop-blur"
                        >
                          <DropdownMenuItem className="hover:bg-primary/10">
                            <Play className="mr-2 size-4" />
                            Run Again
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-primary/10">
                            <Star className="mr-2 size-4" />
                            {item.starred ? "Unstar" : "Star"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-400">
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Metadata Footer */}
                  <div className="mt-4 flex items-center gap-4 border-t border-border/40 pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/70">
                      <Clock className="size-3" />
                      {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground/30">
                      •
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                      {new Date(item.timestamp).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {!historyLoading && historyItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-border/60 bg-muted/5">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Clock className="size-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-bold text-foreground">No records found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a dataset to view its intelligence stream.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
