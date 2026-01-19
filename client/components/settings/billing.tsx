import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUsage } from "@/hooks/use-usage";
import { useAuthContext } from "@/context/auth-context";
import { UsageCard } from "@/components/billing/usage-card";
import UpgradePlans from "@/components/billing/upgrade-plans";
import { PaymentMethodCard } from "@/components/billing/payment-method-card";

export default function BillingPage() {
  const { plan, trialActive, trialEndsAt, subscriptionActive, hydrated } =
    useAuthContext();

  const { usage, loading: usageLoading } = useUsage();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Billing & Plans
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Manage your subscription, view active plans, and update payment
          methods. Your current billing cycle determines your resource
          availability and feature access.
        </p>
      </div>

      {/* ───────────────── Plan Management ───────────────── */}
      <section>
        <UpgradePlans
          currentPlan={plan}
          trialActive={trialActive}
          trialEndsAt={trialEndsAt}
          subscriptionActive={subscriptionActive}
        />
      </section>

      {/* ───────────────── Usage + Payment ───────────────── */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Usage */}
        {usageLoading ? (
          <div className="rounded-2xl border border-border bg-card/40 p-6 text-sm text-muted-foreground">
            Loading usage…
          </div>
        ) : usage ? (
          <UsageCard usage={usage} />
        ) : (
          <div className="rounded-2xl border border-border bg-card/40 p-6 text-sm text-muted-foreground">
            Usage data unavailable.
          </div>
        )}

        {/* Payment Method */}
        <div className="flex flex-col gap-4">
          <h4 className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Payment Method
          </h4>
          <PaymentMethodCard />
        </div>
      </section>

      {/* ───────────────── Billing History ───────────────── */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card/20">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                Date
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                Plan
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                Amount
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
                Status
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/50">
            {/* Mock row — Stripe will replace this later */}
            <tr>
              <td className="px-6 py-4 font-medium">Jan 18, 2026</td>
              <td className="px-6 py-4">{plan ? plan.toUpperCase() : "-"}</td>
              <td className="px-6 py-4">$39.00</td>
              <td className="px-6 py-4 font-bold text-emerald-500">Paid</td>
              <td className="px-6 py-4 text-right">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Receipt
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
