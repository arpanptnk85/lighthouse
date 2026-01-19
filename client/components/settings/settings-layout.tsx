"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Users } from "lucide-react";

import LimitsPage from "./limits";
import BillingPage from "./billing";

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

// Define settings-specific types
type SettingsComponentType = "general" | "team" | "billing" | "limits";

function getSettingsComponent(type: SettingsComponentType) {
  switch (type) {
    case "billing":
      return <BillingPage />;
    case "team":
      return (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl">
          <Users className="h-8 w-8 mb-2 opacity-20" />
          <p>Team management coming soon...</p>
        </div>
      );
    case "limits":
      return <LimitsPage />;
    default:
      return (
        <div className="text-muted-foreground">
          Settings module under construction
        </div>
      );
  }
}

type SettingsLayoutProps = {
  breadcrumbs: BreadcrumbItemData[];
  componentType: SettingsComponentType;
};

export function SettingsLayout({
  breadcrumbs,
  componentType,
}: SettingsLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-all">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={item.label}>
                      <BreadcrumbItem
                        className={index === 0 ? "hidden md:block" : ""}
                      >
                        {isLast ? (
                          <BreadcrumbPage className="font-bold text-foreground">
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={item.href}
                            className="hover:text-primary transition-colors"
                          >
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-2xl p-6 md:min-h-min bg-gradient-to-br from-secondary/40 via-background to-background border border-primary/10 shadow-2xl shadow-primary/5">
            {getSettingsComponent(componentType)}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
