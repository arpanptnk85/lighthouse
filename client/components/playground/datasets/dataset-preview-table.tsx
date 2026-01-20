"use client";

import React from "react";
import { Braces, ChevronDown, Hash, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { JsonInspector } from "./dataset-json-viewer";

export function DatasetPreviewTable({ datasetId }: { datasetId: number }) {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [inspectingData, setInspectingData] = React.useState<any>(null);
  const getColIcon = (col: string) => {
    const sample = rows[0]?.[col];
    if (typeof sample === "number") return <Hash className="size-3" />;
    if (typeof sample === "object") return <Braces className="size-3" />;
    return <Type className="size-3" />;
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/datasets/${datasetId}/preview/?limit=20`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    )
      .then((r) => r.json())
      .then((data) => {
        const extracted = data.rows.map((r: any) => r.data);
        setRows(extracted);

        if (extracted.length > 0) {
          setColumns(Object.keys(extracted[0]));
        }
      });
  }, [datasetId]);

  if (rows.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No data available.</div>
    );
  }

  return (
    <>
      <div className="max-h-[50vh] overflow-auto relative flex flex-col rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
        {/* 1. Technical Meta Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
              Live Data Stream
            </span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground bg-background/50 px-2 py-0.5 rounded border">
            {rows.length} RECORDED ENTRIES
          </div>
        </div>

        {/* 2. Scrollable Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-separate border-spacing-0 text-left">
            <thead className="sticky top-0 z-20">
              <tr className="bg-background/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(var(--border),0.5)]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 border-b border-border/50 transition-colors hover:text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary/50">{getColIcon(col)}</span>
                      {col}
                      <ChevronDown className="size-3 opacity-30" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="group transition-colors hover:bg-primary/[0.03]"
                >
                  {columns.map((col) => {
                    const val = row[col];
                    const isObject = typeof val === "object" && val !== null;

                    return (
                      <td
                        key={col}
                        className="px-4 py-2.5 font-mono text-[11px] text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap"
                      >
                        {isObject ? (
                          <button
                            onClick={() => setInspectingData(val)}
                            className="flex items-center gap-1.5 text-primary font-bold bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10 hover:bg-primary/10 hover:scale-105 transition-all active:scale-95"
                          >
                            <Braces className="size-3" />
                            Inspect Object
                          </button>
                        ) : (
                          String(val ?? "—")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Footer Branding */}
        <div className="p-3 bg-muted/10 border-t border-border/50 flex justify-end">
          <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-[9px] font-black uppercase tracking-tighter">
              Powered by Lighthouse
            </span>
          </div>
        </div>
      </div>

      {/* The Sub-function/Component rendered as a Sheet */}
      <JsonInspector
        data={inspectingData}
        isOpen={!!inspectingData}
        onClose={() => setInspectingData(null)}
      />
    </>
  );
}
