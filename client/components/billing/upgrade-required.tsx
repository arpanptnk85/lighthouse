"use client";

import React from "react";
import Link from "next/link";
import { Lock, Zap, ArrowRight, ShieldAlert, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/auth-context";

interface UpgradeRequiredProps {
  featureName?: string;
  description?: string;
  tierRequired?: "Pro" | "Enterprise";
}

export default function UpgradeRequired({
  featureName = "Advanced Insights",
  description = "This feature is part of our premium analytics suite designed for high-growth stores.",
  tierRequired = "Pro",
}: UpgradeRequiredProps) {
  const { logout } = useAuthContext();

  return (
    /* Refactored wrapper: flex-1 ensures it fills space in a flex parent, 
       min-h-full ensures it takes up height, and items/justify center handles the alignment */
    <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.20))] w-full p-6 animate-in fade-in zoom-in-95 duration-300">
      <Card className="relative w-full max-w-md overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-xl shadow-2xl">
        {/* Decorative Background Glows */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl opacity-50" />

        <CardHeader className="relative text-center pb-2">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner ring-1 ring-primary/20">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Upgrade to {tierRequired}
          </CardTitle>
          <CardDescription className="text-balance pt-2 text-base">
            <span className="font-semibold text-foreground">{featureName}</span>{" "}
            is restricted. {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-4">
          <div className="rounded-xl bg-muted/30 p-5 border border-border/50 backdrop-blur-sm">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Unlock Premium Capabilities
            </h4>
            <ul className="space-y-3">
              {[
                "Unlimited Data Sources",
                "Advanced AI Playground Chat",
                "Priority Real-time Syncing",
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="rounded-full bg-primary/10 p-1">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="relative flex flex-col gap-3 pt-2">
          <Button
            asChild
            className="w-full h-12 text-base shadow-lg shadow-primary/25 group transition-all hover:scale-[1.02]"
          >
            <Link href="/settings/billing">
              Upgrade Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>

        {/* Secure Status Bar */}
        <div className="relative bg-primary/5 border-t border-primary/10 px-6 py-4 flex items-center justify-center gap-2">
          <ShieldAlert className="h-3.5 w-3.5 text-primary/70" />
          <span className="text-[11px] font-bold text-primary/70 uppercase tracking-widest">
            Enterprise Grade Security
          </span>
        </div>
      </Card>
    </div>
  );
}
