"use client";

import { useAuthContext } from "@/context/auth-context";
import UpgradeRequired from "@/components/billing/upgrade-required";
import { Loader2 } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { plan, trialActive, hydrated, subscriptionActive } = useAuthContext();

  // Wait for /me hydration
  if (!hydrated) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary/20" />
          <div className="absolute h-5 w-5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </div>
        <span className="mt-4 text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Initializing Lighthouse
        </span>
      </div>
    );
  }

  // Allow them to see the layout only if they are on Pro/Enterprise OR have an active trial.
  const isBlocked = plan === "starter" && !trialActive && !subscriptionActive;

  // Starter plan + trial expired → block ALL paid areas
  if (isBlocked) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background px-6">
        <UpgradeRequired
          featureName="Premium Access"
          description="Your trial period has concluded. To continue accessing your data and insights, please upgrade your plan."
        />
      </div>
    );
  }

  return <>{children}</>;
}
