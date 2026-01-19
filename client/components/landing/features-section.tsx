"use client";

import { LineChart, Search, Shield } from "lucide-react";

export default function FeaturesSection() {
  return (
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
  );
}

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