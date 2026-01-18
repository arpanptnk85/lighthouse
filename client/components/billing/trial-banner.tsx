"use client";

import Link from "next/link";
import { getTrialDaysLeft } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  trialEndsAt: string | null;
};

export default function TrialBanner({ trialEndsAt }: Props) {
  const pathname = usePathname();
  if (pathname === "/pricing") return null;

  const daysLeft = getTrialDaysLeft(trialEndsAt);

  if (daysLeft === null || daysLeft <= 0) return null;

  // Determine color intensity based on urgency
  const isUrgent = daysLeft <= 2;

  return (
    <Link href="/settings/billing" className="block w-full px-2 py-2">
      <div className="group relative flex items-center gap-3 overflow-hidden rounded-[1.25rem] bg-secondary/50 p-2.5 backdrop-blur-md transition-all hover:bg-secondary/80 border border-border/50 shadow-sm">
        {/* Apple Calendar-style Date Block */}
        <div className="flex h-12 w-12 shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-transform group-hover:scale-105">
          <div
            className={`flex h-4 items-center justify-center text-[10px] font-black uppercase tracking-tighter text-white ${isUrgent ? "bg-destructive" : "bg-primary"}`}
          >
            Days
          </div>
          <div className="flex flex-1 items-center justify-center bg-card">
            <span className="text-xl font-bold tabular-nums tracking-tight text-foreground">
              {daysLeft}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-semibold text-foreground leading-tight">
              Trial Period
            </span>
            <Sparkles
              className={`h-3 w-3 ${isUrgent ? "text-destructive" : "text-primary"} fill-current animate-pulse`}
            />
          </div>
          <p className="truncate text-[11px] font-medium text-muted-foreground leading-tight mt-0.5">
            Upgrade for full access
          </p>
        </div>

        {/* Subtle Decorative Gradient Overaly */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      </div>
    </Link>
  );
}
