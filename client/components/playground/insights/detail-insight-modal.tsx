"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Database,
  Share2,
  Trash2,
  Terminal as TerminalIcon,
  Copy,
  Check,
  ShieldCheck,
  X,
  Loader2,
  Star,
  Terminal,
  Clock,
  Eye,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { InsightRenderer } from "./insight-renderer";

interface InsightViewModalProps {
  insightId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionComplete: () => void;
}

export function InsightViewModal({
  insightId,
  open,
  onOpenChange,
  onActionComplete,
}: InsightViewModalProps) {
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(insight?.is_starred ?? false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (insightId && open) {
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/${insightId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      )
        .then((r) => r.json())
        .then((data) => {
          setInsight(data);
          setStarred(data.is_starred);
          setLoading(false);
        });
    }
  }, [insightId, open]);

  async function toggleStar() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/${insight.id}/star/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    setStarred((prev: boolean) => !prev);
    onActionComplete();
  }

  async function deleteInsight() {
    if (!confirm("Delete this insight permanently?")) return;

    setDeleting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insights/${insight.id}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (res.ok) {
      onOpenChange(false); // close modal
      onActionComplete();
    }

    setDeleting(false);
  }

  const handleCopy = () => {
    if (!insight) return;
    navigator.clipboard.writeText(JSON.stringify(insight.result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-hidden bg-[#030303]/95 backdrop-blur-3xl border-white/5 shadow-[0_8px_80px_-12px_rgba(0,0,0,0.8)] p-0 gap-0 rounded-2xl">
        <VisuallyHidden>
          <DialogTitle>Archival Intelligence Dossier</DialogTitle>
        </VisuallyHidden>

        {loading || !insight ? (
          <div className="flex flex-col items-center justify-center py-32 gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full animate-ping" />
              <Loader2
                className="size-12 text-primary animate-spin relative"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/90">
                Establishing Secure Connection
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider">
                Authenticating archival access...
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl flex flex-col h-full max-h-[92vh]">
            {/* Compact Header with Status Bar */}
            <header className="flex flex-col border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="size-3 text-muted-foreground/40" />
                    <span className="text-[9px] font-mono text-muted-foreground/60">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <span className="text-[9px] font-mono text-muted-foreground/60">
                    REF: 0x{insight.id.toString().padStart(6, "0")}
                  </span>
                </div>
              </div>

              {/* Main Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
                      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-sm" />
                      <ShieldCheck
                        className="size-5 text-primary relative"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                        Archival Intelligence
                      </span>
                      <span className="text-[10px] text-muted-foreground/60">
                        Security Protocol Active
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg hover:bg-white/5 text-muted-foreground/60 hover:text-white/80 transition-colors"
                    >
                      <Share2 className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg hover:bg-white/5 text-muted-foreground/60 hover:text-white/80 transition-colors"
                    >
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="px-6 py-8 space-y-8">
                {/* Title Section */}
                <section className="space-y-5">
                  <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
                    {insight.title}
                  </h1>

                  {/* Description */}
                  {insight.description && (
                    <div className="relative pl-4 border-l-2 border-primary/30">
                      <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-3xl">
                        {insight.description}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-2 p-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                        <Calendar className="size-3.5 text-primary/70" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {new Date(insight.created_at).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <Database className="size-3.5 text-primary" />
                        <span className="text-[11px] font-semibold text-primary">
                          Archive Ready
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                        <Eye className="size-3.5 text-muted-foreground/70" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          Classified
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 px-3 rounded-lg hover:bg-white/5 transition-all text-xs font-medium gap-2",
                            copied
                              ? "text-emerald-500"
                              : "text-muted-foreground hover:text-white",
                          )}
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <>
                              <Check className="size-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5" />
                              Copy
                            </>
                          )}
                        </Button>

                        <div className="w-px h-4 bg-white/10" />

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg hover:bg-white/5 transition-all text-xs font-medium gap-2"
                          onClick={toggleStar}
                        >
                          <Star
                            className={cn(
                              "size-3.5 transition-all",
                              starred
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground",
                            )}
                          />
                          {starred ? "Starred" : "Star"}
                        </Button>

                        <div className="w-px h-4 bg-white/10" />

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all text-xs font-medium gap-2"
                          onClick={deleteInsight}
                          disabled={deleting}
                        >
                          {deleting ? (
                            <>
                              <Loader2 className="size-3.5 animate-spin" />
                              Deleting
                            </>
                          ) : (
                            <>
                              <Trash2 className="size-3.5" />
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Payload */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <Terminal className="size-4 text-primary/80" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Data Payload
                    </span>
                  </div>

                  <div className="relative rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl p-2">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.04)_50%)] bg-[length:100%_4px] opacity-30" />

                    <InsightRenderer result={insight.result} />

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
