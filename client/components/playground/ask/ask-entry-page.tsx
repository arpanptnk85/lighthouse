"use client";

import React, { useState, useEffect } from "react";
import {
  Database,
  Plus,
  RefreshCw,
  MessageSquareText,
  Search,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatasetList } from "../datasets/dataset-list";
import { DatasetAsk } from "@/components/playground/ask/dataset-ask";
import { useSchema } from "@/hooks/use-schema";

export default function PlaygroundAsk() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<number | null>(
    null,
  );
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isFetchingSchema, setIsFetchingSchema] = useState(false);

  // Derive columns from preview data
  const schemaColumns = useSchema(previewData);

  // Fetch preview whenever dataset selection changes
  useEffect(() => {
    if (!selectedDatasetId) return;

    async function fetchPreview() {
      setIsFetchingSchema(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/datasets/${selectedDatasetId}/preview/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        const data = await res.json();
        setPreviewData(data || []);
      } catch (err) {
        console.error("Failed to load schema", err);
      } finally {
        setIsFetchingSchema(false);
      }
    }

    fetchPreview();
  }, [selectedDatasetId]);

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary shadow-sm shadow-primary/5">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
              Ask
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Execute natural language queries against your high-velocity data
            stores. Lighthouse AI interrogates raw streams to synthesize
            actionable insights.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center bg-secondary/30 p-1.5 rounded-xl border border-border/50">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 hover:bg-background hover:text-primary font-bold text-[11px] transition-all"
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            Register Source
          </Button>

          <Button
            size="sm"
            variant="default"
            className="h-8 px-4 font-black text-[11px] shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
          >
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Sync All
          </Button>
        </div>
      </div>

      {/* 2. Unified Workspace Area */}
      <div className="grid grid-cols-12 gap-8 border-t border-border pt-8">
        {/* Left Sidebar: Dataset Selection (3/12) */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search intelligence..."
              className="pl-9 bg-muted/20 border-border/50 h-9 text-xs focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 ml-2 mb-2 block">
              Active Repositories
            </span>
            <DatasetList
              selectedId={selectedDatasetId}
              onSelect={(id) => {
                setPreviewData([]); // Reset preview when switching
                setSelectedDatasetId(id);
              }}
            />
          </div>
        </aside>

        {/* Right Content (9/12) */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          {selectedDatasetId ? (
            <div className="flex flex-col gap-8">
              {/* Active Intelligence Indicator */}
              <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-2xl px-5 py-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest">
                    Connected to Dataset #
                    {selectedDatasetId}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-primary/70 font-bold bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                  {schemaColumns.length} SCHEMA FIELDS DETECTED
                </div>
              </div>

              {/* Your Wired Component */}
              <DatasetAsk
                datasetId={Number(selectedDatasetId)}
                schemaColumns={schemaColumns}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-border/60 bg-muted/5 opacity-60">
              <div className="p-4 rounded-2xl bg-muted mb-4">
                <Database className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="font-black text-foreground uppercase tracking-tight">
                Handshake Required
              </h3>
              <p className="text-xs font-medium text-muted-foreground mt-2">
                Select a repository from the sidebar to begin AI interrogation.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
