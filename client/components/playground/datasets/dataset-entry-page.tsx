"use client";

import { useState } from "react";
import { DatasetList } from "@/components/playground/datasets/dataset-list";
import { DatasetViewer } from "@/components/playground/datasets/dataset-viewer";
import { Database, Filter, Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useDatasets } from "@/hooks/use-datasets";
import { useOrganizations } from "@/hooks/use-organizations";

export default function PlaygroundDatasets() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<number | null>(
    null,
  );

  const { datasets } = useDatasets();
  const { orgs, loading: orgsLoading } = useOrganizations();

  const currentOrg = orgs.find((o) => o.is_current);
  const organizationName = currentOrg?.name ?? "Organization";

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Header Section - Matching Settings/Billing Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
              Datasets
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            High-velocity data warehousing and interrogation engine. Monitor,
            sync, and explore intelligence streams across your global fleet of
            API sources.
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

        {/* Right Content */}
        <main className="col-span-12 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            {/* <span className="text-[11px] font-bold text-muted-foreground italic">
              Showing {datasets.length} recent executions
            </span> */}
            <div className="flex items-center gap-2 px-2 py-1">
              <span className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
                Showing
              </span>
              <span className="text-xs font-mono font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded leading-none">
                {datasets.length}
              </span>
              <span className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-widest">
                Total Datasets for
              </span>
              <span className="text-[11px] font-black text-foreground border-b-2 border-primary/30 pb-0.5">
                {organizationName}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-[10px] font-black uppercase tracking-wider"
            >
              <Filter className="mr-2 size-3" /> Filter Logs
            </Button>
          </div>

          <div className="relative space-y-3">
            {selectedDatasetId ? (
              <DatasetViewer datasetId={selectedDatasetId} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-border/60 bg-muted/5">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Database className="size-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-bold text-foreground">No records found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a dataset to preview.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
