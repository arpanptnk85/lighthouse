import type React from "react";

import PricingSection from "@/components/landing/pricing-section";
import CTASection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import IntegrationTechSection from "@/components/landing/integration-tech-section";
import AIInsightsSection from "@/components/landing/ai-insights-section";
import HeaderSection from "@/components/landing/header-section";
import Navbar from "@/components/landing/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeaderSection />

        {/* AI & Insights Section */}
        <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
          <AIInsightsSection />
        </section>

        {/* Integration & Tech Stack Section */}
        <section id="integrations" className="py-24 bg-background">
          <IntegrationTechSection />
        </section>

        {/* Features Section (Original Refined) */}
        <section id="features" className="border-t border-border bg-card/30 py-24">
          <FeaturesSection />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-background">
          <PricingSection />
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-24 bg-card/30">
          <CTASection />
        </section>
      </main>

      <footer className="py-12 border-t border-border bg-card/20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 Lighthouse Inc. All rights reserved. Built for high-volume
          fleets.
        </div>
      </footer>
    </div>
  );
}
