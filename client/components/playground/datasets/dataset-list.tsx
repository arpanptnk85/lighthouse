"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IntegrationType, INTEGRATION_LABELS } from "@/types/sources";
import { useDatasets } from "@/hooks/use-datasets";

type Dataset = {
  id: number;
  name: string;
  source_name: IntegrationType;
};

export function DatasetList({
  selectedId,
  onSelect,
}: {
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const { datasets, loading: datasetsLoading } = useDatasets();
  const renderContent = () => {
    if (datasetsLoading) {
      return <div className="...">Loading datasets...</div>;
    }

    if (!datasets || datasets.length === 0) {
      return <div className="...">No datasets found.</div>;
    }

    return datasets.map((ds) => (
      <button
        key={ds.id}
        onClick={() => onSelect(ds.id)}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left text-sm transition",
          selectedId === ds.id
            ? "bg-primary/10 text-primary"
            : "hover:bg-muted",
        )}
      >
        <div className="font-medium">{ds.name}</div>
        <div className="text-xs text-muted-foreground">
          <span className={`badge badge-${ds.source_name}`}>
            {INTEGRATION_LABELS[ds.source_name] || "Unknown Type"}
          </span>
        </div>
      </button>
    ));
  };

  return <div className="space-y-1">{renderContent()}</div>;
}
