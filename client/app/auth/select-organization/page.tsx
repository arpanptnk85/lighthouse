"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ChevronRight,
  LogOut,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { useOrgSelection } from "@/hooks/use-org-selection";

export default function SelectOrganizationPage() {
  const router = useRouter();
  const { orgs, loading, selectedId, selectOrganization } = useOrgSelection();

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20 shadow-lg shadow-primary/10">
            <Building2 className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Select Organization
          </h1>
          <p className="mt-2 text-muted-foreground">
            You are a member of multiple organizations. Choose where to dock.
          </p>
        </div>

        <div className="grid gap-3">
          {orgs.map((org) => {
            const isTarget = selectedId === org.id;
            return (
              <button
                key={org.id}
                onClick={() => selectOrganization(org.id)}
                disabled={loading}
                className={`
                  group relative flex items-center justify-between w-full rounded-xl border p-4 text-left transition-all duration-200
                  ${
                    isTarget
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 hover:shadow-md"
                  }
                  ${loading && !isTarget ? "opacity-50 grayscale" : "opacity-100"}
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    flex h-10 w-10 items-center justify-center rounded-lg border transition-colors
                    ${isTarget ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border group-hover:bg-background"}
                  `}
                  >
                    {org.role.toLowerCase() === "admin" ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : (
                      <UserCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {org.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {org.role}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isTarget ? "text-primary" : "text-muted-foreground/50"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              localStorage.clear();
              router.push("/auth");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out of all accounts
          </Button>

          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Lighthouse Insight System Secure Proxy
          </p>
        </div>
      </div>
    </div>
  );
}
