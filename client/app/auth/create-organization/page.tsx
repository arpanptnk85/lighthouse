"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Rocket,
  Sparkles,
  Building2,
  LayoutPanelLeft,
  Loader2,
} from "lucide-react";
import { useCreateOrganization } from "@/hooks/use-create-organization";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { createOrganization, loading, error } = useCreateOrganization();
  const [name, setName] = useState("");

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20 shadow-xl shadow-primary/5">
            <Building2 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Set Your Workspace
          </h1>
          <p className="text-muted-foreground text-lg">
            Give your organization a name to begin your voyage.
          </p>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle accent line at top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-primary/80">
              Identity
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="org-name" className="text-base">
                Organization Name
              </Label>
              <div className="relative group">
                <Input
                  id="org-name"
                  placeholder="e.g. Blue Horizon E-comm"
                  value={name}
                  disabled={loading}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg px-4 bg-background/50 border-muted group-hover:border-primary/50 transition-colors"
                  autoFocus
                />
                <div className="absolute right-3 top-3 text-muted-foreground/30 group-focus-within:text-primary transition-colors">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* INTERACTIVE PREVIEW CARD */}
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 space-y-3">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                Workspace Preview
              </span>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-foreground/10 mb-1">
                    <span className="text-sm font-semibold px-1">
                      {name || "Your Brand Name"}
                    </span>
                  </div>
                  <div className="h-3 w-20 rounded bg-muted-foreground/10" />
                </div>
                <div className="h-6 w-6 rounded-full bg-muted-foreground/10" />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                {error}
              </div>
            )}

            <Button
              className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              disabled={loading || !name}
              onClick={() => createOrganization(name)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Building Workspace...
                </>
              ) : (
                <>
                  Launch Command Center
                  <Rocket className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't worry, you can change your workspace name later in settings.
        </p>
      </div>
    </div>
  );
}
