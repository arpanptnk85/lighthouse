import type React from "react";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Search,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  Globe,
  Lock,
  Layers,
  Bot,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a shadcn/ui button
import PricingSection from "@/components/landing/pricing-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Hero Section */}
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
              A modern analytics dashboard featuring clear visuals, luminous
              data points, and guided insights. Connect your store and let the
              data shine through the digital noise.
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

      {/* AI & Insights Section */}
      <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Bot className="h-4 w-4" />
                <span>The Beacon AI</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Ask the Keeper. <br /> Get Instant Answers.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't just look at charts—talk to them. Our AI "Keeper" analyzes
                your Django-backed data streams to answer plain English
                questions about inventory, revenue, and customer trends.
              </p>
              <ul className="space-y-4">
                {[
                  "Why did sales drop on Tuesday?",
                  "Show me the top 5 returning customers.",
                  "Forecast inventory needs for next month.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Chat Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" />
              <div className="relative rounded-2xl border border-border bg-background p-6 shadow-xl">
                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                      Why is the conversion rate down today?
                    </div>
                  </div>
                  {/* AI Response */}
                  <div className="flex justify-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                      <Sparkles className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-muted-foreground max-w-[90%]">
                      <p>
                        Traffic from mobile devices increased by{" "}
                        <strong>40%</strong>, but the checkout API latency
                        spiked to 2.5s.
                      </p>
                      <div className="mt-3 h-24 w-full rounded-lg bg-background border border-border flex items-end px-2 pb-2 gap-1">
                        {/* Tiny Chart */}
                        <div className="w-full bg-primary/20 h-[30%] rounded-t-sm" />
                        <div className="w-full bg-primary/20 h-[40%] rounded-t-sm" />
                        <div className="w-full bg-red-400/80 h-[80%] rounded-t-sm" />{" "}
                        {/* Spike */}
                        <div className="w-full bg-primary/20 h-[45%] rounded-t-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Tech Stack Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unified Signal from Every Source
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Lighthouse acts as your secure API proxy. We normalize data from
            disparate sources into a single, radiant dashboard.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tech/Integration Cards */}
            <TechCard
              icon={<Globe className="h-6 w-6" />}
              title="Shopify & Woo"
              sub="Direct API Sync"
            />
            <TechCard
              icon={<Layers className="h-6 w-6" />}
              title="Custom Endpoints"
              sub="REST & GraphQL"
            />
            <TechCard
              icon={<Zap className="h-6 w-6" />}
              title="Real-Time"
              sub="Redis & WebSockets"
            />
            <TechCard
              icon={<Lock className="h-6 w-6" />}
              title="Enterprise Secure"
              sub="OAuth & GDPR Ready"
            />
          </div>
        </div>
      </section>

      {/* Features Section (Original Refined) */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Lighthouse?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for leaders who demand total visibility and actionable
              direction.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="Total Visibility"
              description="High-contrast visualizations and clear markers cut through the fog of raw data."
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6" />}
              title="Drag & Drop Analytics"
              description="Customize your command deck. Pin the metrics that matter most to your daily voyage."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Guiding Compliance"
              description="Built-in role management and data privacy tools ensure your ship stays compliant."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="border-t border-border py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Ready to Clear the Fog?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join 1,000+ merchants using Lighthouse to navigate their growth.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/dashboard">Start Your Trial</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required for sandbox mode.
          </p>
        </div>
      </section>
    </div>
  );
}

// Sub-components

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function TechCard({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors">
      <div className="text-muted-foreground mb-3">{icon}</div>
      <div className="font-semibold text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
