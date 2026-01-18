"use client";

import React, { useState } from "react";
import { Check, Zap, ShieldCheck, Loader2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";

type PlanType = "starter" | "pro" | "enterprise";

type Props = {
  currentPlan: PlanType | null;
  trialActive: boolean;
  trialEndsAt: string | null;
  subscriptionActive: boolean;
};

export default function UpgradePlans({ currentPlan, subscriptionActive }: Props) {
  const { hydrateFromServer } = useAuthContext();
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const isStarterPaid = currentPlan === "starter" && subscriptionActive;
  const isStarterTrial = currentPlan === "starter" && !subscriptionActive;

  async function upgrade(plan: "starter" | "pro" | "enterprise") {
    setLoadingPlan(plan);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/upgrade/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ plan }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.detail || "Upgrade failed");
        return;
      }

      await hydrateFromServer();
    } catch (error) {
      console.error("Upgrade error:", error);
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <PlanCard
        name="Starter"
        price="$39"
        description="For small teams getting started with Lighthouse."
        features={[
          "1 Organization workspace",
          "5,000 API requests / mo",
          "1 Primary Data Source",
          "Standard Analytics Dashboard",
          "Email Support",
          "7-Day Full Access Trial",
        ]}
        icon={<Star className="h-5 w-5" />} // Changed to Star for entry-level premium feel
        active={isStarterPaid}
        loading={loadingPlan === "starter"}
        onUpgrade={() => upgrade("starter")}
        highlight={currentPlan === "starter"} // Only highlight if it's their current plan
        ctaLabel={isStarterTrial ? "Buy Starter ($49)" : "Active Plan"}
      />

      <PlanCard
        name="Pro"
        price="$79"
        description="Unlock the full power of AI Playground and unlimited sources."
        features={[
          "5 Organizations",
          "50k API Requests",
          "Full AI History",
          "Priority Support",
        ]}
        icon={<Zap className="h-5 w-5" />}
        active={currentPlan === "pro"}
        loading={loadingPlan === "pro"}
        onUpgrade={() => upgrade("pro")}
        highlight={true}
      />

      <PlanCard
        name="Enterprise"
        price="Custom"
        description="Bescope infrastructure and dedicated support for large fleets."
        features={[
          "Unlimited Everything",
          "Custom Webhooks",
          "Dedicated Engineer",
          "SLA Guarantee",
        ]}
        icon={<ShieldCheck className="h-5 w-5" />}
        active={currentPlan === "enterprise"}
        loading={loadingPlan === "enterprise"}
        onUpgrade={() => upgrade("enterprise")}
      />
    </div>
  );
}

function PlanCard({
  name,
  price,
  description,
  features,
  icon,
  active,
  loading,
  onUpgrade,
  highlight = false,
  ctaLabel,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  active: boolean;
  loading: boolean;
  onUpgrade: () => void;
  highlight?: boolean;
  ctaLabel?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border-2 p-8 transition-all duration-300",
        highlight && !active
          ? "border-primary bg-card shadow-2xl shadow-primary/10"
          : "border-border bg-card/40",
        active && "border-primary/50 bg-primary/5 ring-1 ring-primary/20",
      )}
    >
      {active && (
        <div className="absolute -top-3 left-8 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-foreground">
          <Sparkles className="h-3 w-3 fill-current" />
          Current Plan
        </div>
      )}

      <div className="mb-6 space-y-2">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl mb-4",
            highlight || active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">{price}</span>
          {price !== "Custom" && (
            <span className="text-muted-foreground text-sm font-medium">
              /month
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
          {description}
        </p>
      </div>

      <div className="my-6 h-px w-full bg-border/50" />

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        disabled={active || loading}
        onClick={onUpgrade}
        variant={active ? "outline" : "default"}
        className={cn(
          "h-12 w-full text-base font-bold transition-all",
          !active &&
            "shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]",
        )}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          (ctaLabel ?? (active ? "Active Plan" : `Upgrade to ${name}`))
        )}
      </Button>
    </div>
  );
}
