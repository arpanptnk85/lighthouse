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
import { CreditCard, Users, Settings, Shield } from "lucide-react";

// You can import your actual pages here
import UpgradeRequired from "../billing/upgrade-required";

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

// Define settings-specific types
type SettingsComponentType = "general" | "team" | "billing" | "security";

function getSettingsComponent(type: SettingsComponentType) {
  switch (type) {
    case "billing":
      return (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
             {/* This will be replaced by your content in page.tsx */}
             <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Subscription & Billing</h2>
             </div>
             <UpgradeRequired /> 
        </div>
      );
    case "team":
      return (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl">
          <Users className="h-8 w-8 mb-2 opacity-20" />
          <p>Team management coming soon...</p>
        </div>
      );
    default:
      return <div className="text-muted-foreground">Settings module under construction</div>;
  }
}

type SettingsLayoutProps = {
  breadcrumbs: BreadcrumbItemData[];
  componentType: SettingsComponentType;
  children?: React.ReactNode; // Optional: if you prefer to use children instead of getSettingsComponent
};

export function SettingsLayout({
  breadcrumbs,
  componentType,
  children
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
                          <BreadcrumbPage className="font-bold text-foreground">{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href} className="hover:text-primary transition-colors">
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
          {/* The 'Modern' Container: 
              Using the same gradient and shadow as Playground for brand cohesion 
          */}
          <div className="min-h-[100vh] flex-1 rounded-2xl p-6 md:min-h-min bg-gradient-to-br from-secondary/40 via-background to-background border border-primary/10 shadow-2xl shadow-primary/5">
            {children || getSettingsComponent(componentType)}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}