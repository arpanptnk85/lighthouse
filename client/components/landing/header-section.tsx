"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeaderSection() {
  return (
    <header className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-primary/5 to-transparent opacity-50" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-inner shadow-primary/20">
            <Sparkles className="h-4 w-4" />
            <span>Lighthouse Insight System v2.0</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Navigate Your Business with{" "}
            <span className="text-primary">Radiant Clarity</span>
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A modern analytics dashboard featuring clear visuals, luminous data
            points, and guided insights. Connect your store and let the data
            shine through the digital noise.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base gap-2 shadow-lg shadow-primary/20"
            >
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* DASHBOARD SCREENSHOT MOCKUP */}
        <div className="mt-20 relative mx-auto max-w-5xl perspective-1000">
          {/* Glow Effect behind the dashboard */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-75" />

          <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Browser Chrome / Header */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="mx-auto w-1/3 h-5 rounded-md bg-muted/50 text-[10px] flex items-center justify-center text-muted-foreground font-mono">
                lighthouse.app/dashboard
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="grid grid-cols-12 gap-0 h-[400px] sm:h-[500px] bg-background">
              {/* Sidebar */}
              <div className="hidden sm:block col-span-2 border-r border-border bg-card/50 p-4 space-y-4">
                <div className="h-8 w-8 rounded-lg bg-primary/20 mb-6" />
                <div className="h-2 w-16 rounded bg-muted" />
                <div className="h-2 w-20 rounded bg-muted" />
                <div className="h-2 w-12 rounded bg-muted" />
              </div>

              {/* Main Area */}
              <div className="col-span-12 sm:col-span-10 p-6 sm:p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="h-8 w-48 rounded bg-foreground/10 mb-2" />
                    <div className="h-4 w-32 rounded bg-muted/50" />
                  </div>
                  <div className="h-10 w-10 rounded-full border border-border bg-card" />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Big Chart */}
                  <div className="col-span-3 sm:col-span-2 h-48 rounded-xl border border-border bg-card/50 p-4 relative overflow-hidden group">
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/10 to-transparent" />
                    <div className="flex items-end justify-between h-full gap-2 px-2 pb-2">
                      {[40, 65, 45, 70, 50, 80, 60, 90].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-full bg-primary/80 rounded-t-sm opacity-80"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stat Cards */}
                  <div className="col-span-3 sm:col-span-1 space-y-6">
                    <div className="h-20 rounded-xl border border-border bg-card/50 p-4">
                      <div className="h-4 w-4 rounded-full bg-emerald-500/20 mb-2" />
                      <div className="h-6 w-24 rounded bg-foreground/10" />
                    </div>
                    <div className="h-20 rounded-xl border border-border bg-card/50 p-4">
                      <div className="h-4 w-4 rounded-full bg-blue-500/20 mb-2" />
                      <div className="h-6 w-24 rounded bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
