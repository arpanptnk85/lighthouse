"use client";

import { useAuthContext } from "@/context/auth-context";
import UpgradeRequired from "@/components/billing/upgrade-required";
import { Loader2 } from "lucide-react";
import AppLoader from "@/components/app-loader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { plan, trialActive, hydrated, subscriptionActive } = useAuthContext();

  // Wait for /me hydration
  if (!hydrated) {
    <AppLoader />
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
