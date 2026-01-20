"use client";

import { useEffect, useState } from "react";
import { DatasetPreviewTable } from "./dataset-preview-table";
import { DatasetVersions } from "./dataset-versions";

export function DatasetViewer({ datasetId }: { datasetId: number }) {
  const [activeTab, setActiveTab] = useState<"preview" | "versions">("preview");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {["preview", "versions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
          >
            {tab === "preview" ? "Preview" : "Versions"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <DatasetPreviewTable datasetId={datasetId} />
      ) : (
        <DatasetVersions datasetId={datasetId} />
      )}
    </div>
  );
}
