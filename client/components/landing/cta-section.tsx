"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function CTASection() {
  return (
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
  );
}
