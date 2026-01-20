"use client";

import { useEffect, useState } from "react";
import { Plus, RefreshCw, Beaker, Pencil, Terminal, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { AddEditCustomAPIModal } from "./add-edit-custom-api-modal";
import { CustomAPISource } from "@/types/sources";
import { cn, useRole } from "@/lib/utils";

export default function CustomAPIPage() {
  const { isAuthenticated } = useAuthContext();
  const { isAdmin, isOwner } = useRole();

  const [sources, setSources] = useState<CustomAPISource[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<
    CustomAPISource | undefined
  >();

  async function loadSources() {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (res.ok) {
      const data = await res.json();
      setSources(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      loadSources();
    }
  }, [isAuthenticated]);

  async function syncSource(id: number) {
    setSyncing(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/${id}/sync/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (res.ok) {
      toast.success("Sync complete");
      setSyncing(false);
      loadSources();
    } else {
      toast.error("Sync failed");
      setSyncing(false);
    }
  }

  async function testSource(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sources/custom/${id}/test/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );

    if (res.ok) {
      toast.success("Connection successful");
    } else {
      toast.error("Test failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
            Custom API Sources
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect your own APIs to power Lighthouse insights.
          </p>
        </div>

        {(isAdmin || isOwner) && (
          <Button
            onClick={() => {
              setEditingSource(undefined);
              setModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Custom API
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : sources.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No Custom APIs connected yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {sources.map((source) => {
            // Derived status: If never synced, it's "New/Idle". If synced, it's "Connected".
            const hasSynced = !!source.last_synced_at;

            return (
              <div
                key={source.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-0 transition-all hover:bg-card/60 hover:border-primary/30"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4">
                  <div className="flex items-start gap-4">
                    {/* The "Beacon" Icon container */}
                    <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Terminal className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black tracking-tight text-foreground uppercase text-sm">
                          {source.name}
                        </h3>

                        {/* Visual Status Indicator */}
                        <div
                          className={cn(
                            "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-wide",
                            hasSynced
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-muted text-muted-foreground border-border",
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              hasSynced
                                ? "bg-primary animate-pulse"
                                : "bg-muted-foreground/50",
                            )}
                          />
                          {hasSynced ? "CONNECTED" : "PENDING SYNC"}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
                        <Globe className="h-3 w-3" />
                        <span className="truncate max-w-[200px] md:max-w-md">
                          {source.base_url}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 mt-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-black">
                            Last Intelligence Sync
                          </span>
                          <span className="text-xs font-bold tabular-nums text-foreground/80">
                            {source.last_synced_at
                              ? new Date(source.last_synced_at).toLocaleString(
                                  [],
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )
                              : "Awaiting initial handshake"}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-black">
                            Method
                          </span>
                          <span className="text-xs font-bold text-foreground/80">
                            {source.auth_type === "none"
                              ? "Public API"
                              : source.auth_type?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Hub - Elevated Glass Buttons */}
                  <div className="flex items-center gap-2 self-end md:self-center bg-secondary/30 p-1.5 rounded-xl border border-border/50">
                    {(isAdmin || isOwner) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 hover:bg-background hover:text-primary font-bold text-[11px] transition-all"
                        onClick={() => {
                          setEditingSource(source);
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-3.5 w-3.5" />
                        Edit
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 hover:bg-background hover:text-primary font-bold text-[11px]"
                      onClick={() => testSource(source.id)}
                    >
                      <Beaker className="mr-2 h-3.5 w-3.5" />
                      Test
                    </Button>

                    <Button
                      size="sm"
                      variant="default"
                      className="h-8 px-4 font-black text-[11px] shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
                      onClick={() => syncSource(source.id)}
                    >
                      <RefreshCw
                        className={cn(
                          "mr-2 h-3.5 w-3.5",
                          syncing && "animate-spin",
                        )}
                      />
                      Sync
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddEditCustomAPIModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        source={editingSource!}
        onSaved={loadSources}
      />
    </div>
  );
}
