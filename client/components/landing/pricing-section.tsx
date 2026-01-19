"use client";

import { Check, Zap, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$39",
      description: "Perfect for independent merchants needing clear signals.",
      features: [
        "1 Organization workspace",
        "5,000 API requests / mo",
        "1 Primary Data Source",
        "Standard Analytics Dashboard",
        "Email Support",
        "7-Day Full Access Trial",
      ],
      cta: "Start Trial",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$79",
      description: "Advanced AI-driven insights for growing brands.",
      features: [
        "Up to 5 Organization workspaces",
        "50,000 API requests / mo",
        "Unlimited Data Sources",
        "The Beacon AI (Playground & Chat)",
        "Priority Support",
        "Team Management & Roles",
      ],
      cta: "Start 7-Day Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom infrastructure for high-volume fleets.",
      features: [
        "Unlimited Organizations",
        "Millions of API requests",
        "Custom API & Webhook endpoints",
        "Dedicated Data Engineer",
        "SLA & Performance Guarantees",
        "White-glove Onboarding",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Lock className="h-3 w-3" />
          <span>Premium Data Access</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Invest in{" "}
          <span className="text-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            Total Visibility
          </span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          No "free" limitations. Just powerful, professional-grade analytics
          from day one. Try any plan free for 7 days.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl p-8 transition-all duration-500 hover:translate-y-[-4px] ${
              plan.highlight
                ? "bg-card border-2 border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] scale-105 z-10 py-12"
                : "bg-card/40 border border-border backdrop-blur-sm"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-black text-primary-foreground tracking-widest flex items-center gap-1 shadow-xl">
                <Zap className="h-3 w-3 fill-current" />
                RECOMMENDED
              </div>
            )}

            <div className="mb-8">
              <h3
                className={`text-xl font-bold ${plan.highlight ? "text-primary" : ""}`}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-muted-foreground text-sm font-medium">
                    /mo
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed h-10">
                {plan.description}
              </p>
            </div>

            <div className="h-px w-full bg-border/50 mb-8" />

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-medium"
                >
                  <div
                    className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlight ? "default" : "outline"}
              className={`w-full h-12 text-base font-bold group transition-all ${
                plan.highlight
                  ? "shadow-lg shadow-primary/25"
                  : "hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {plan.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        ))}
      </div>

      {/* Security / Trust Footer */}
      {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center justify-center gap-2 font-bold italic">
            SHOPIFY
          </div>
          <div className="flex items-center justify-center gap-2 font-bold italic">
            WOOCOMMERCE
          </div>
          <div className="flex items-center justify-center gap-2 font-bold italic">
            STRIPE
          </div>
          <div className="flex items-center justify-center gap-2 font-bold italic">
            DJANGO
          </div>
        </div> */}
    </div>
  );
}
