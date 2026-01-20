"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Gauge, Zap, Activity, Globe, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsage } from "@/hooks/use-usage";

export default function LimitsPage() {
  const { usage, loading } = useUsage();
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Gauge className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-black tracking-tight text-foreground uppercase italic">
            Usage & Limits
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Monitor your organization's resource consumption. Limits are based on
          your current tier and reset at the start of every billing cycle.
        </p>
      </div>

      {/* Usage Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <UsageSkeleton />
        ) : (
          <>
            {/* Primary API Usage Card */}
            <LimitCard
              title="API Requests"
              icon={<Zap className="h-4 w-4" />}
              used={usage?.used ?? 0}
              limit={usage?.limit ?? 3000}
              unit="requests"
              description="Total API calls made from your connected data sources."
            />

            {/* Endpoints Usage Card */}
            <LimitCard
              title="Endpoints"
              icon={<Globe className="h-4 w-4" />}
              used={1} // Static based on your Starter logic earlier
              limit={1}
              unit="endpoint"
              description="Active webhook and custom API endpoints."
            />
          </>
        )}
      </div>

      {/* Detailed Breakdown Table */}
      <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Resource Breakdown
          </h3>
          <Activity className="h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              <tr>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4 text-right">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              <BreakdownRow
                label="Organization Workspaces"
                current="1"
                total="1"
              />
              <BreakdownRow label="Data Integrations" current="1" total="1" />
              <BreakdownRow
                label="AI Chat History"
                current="Retained"
                total="Limited"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* --- Sub-Components --- */

function LimitCard({ title, icon, used, limit, unit, description }: any) {
  const percentage = Math.min((used / limit) * 100, 100);
  const isUrgent = percentage > 85;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card/50 p-6 transition-all hover:bg-card/80">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-secondary p-2 text-secondary-foreground">
            {icon}
          </div>
          <h3 className="font-bold text-foreground">{title}</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground opacity-40" />
            </TooltipTrigger>
            <TooltipContent>{description}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-2xl font-black tracking-tight tabular-nums">
            {used.toLocaleString()}{" "}
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest ml-1">
              {unit}
            </span>
          </span>
          <span className="text-muted-foreground font-medium">
            of {limit.toLocaleString()}
          </span>
        </div>

        {/* CUSTOM PROGRESS BAR */}
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/50 border border-border/20">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-in-out rounded-full",
              isUrgent
                ? "bg-destructive shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                : "bg-primary shadow-[0_0_12px_rgba(var(--primary),0.3)]",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[11px] text-muted-foreground/70 font-medium">
          {percentage.toFixed(1)}% of your monthly capacity consumed.
        </p>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  current,
  total,
}: {
  label: string;
  current: string;
  total: string;
}) {
  return (
    <tr className="group hover:bg-muted/20 transition-colors">
      <td className="px-6 py-4 font-medium text-foreground">{label}</td>
      <td className="px-6 py-4">
        <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/5 border border-primary/10 uppercase">
          {current}
        </span>
      </td>
      <td className="px-6 py-4 text-right text-muted-foreground tabular-nums">
        {total}
      </td>
    </tr>
  );
}

function UsageSkeleton() {
  return (
    <>
      <Skeleton className="h-[200px] w-full rounded-2xl bg-muted/40" />
      <Skeleton className="h-[200px] w-full rounded-2xl bg-muted/40" />
    </>
  );
}
