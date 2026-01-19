"use client";

import { Globe, Layers, Lock, Zap } from "lucide-react";

export default function IntegrationTechSection() {
  return (
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
