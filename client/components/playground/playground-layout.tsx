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
import { PlaygroundHistory } from "@/components/playground/history";
import React from "react";
import PlaygroundDatasets from "./datasets/dataset-entry-page";
import PlaygroundAsk from "./ask/ask-entry-page";
import PlaygroundInsights from "./insights/insights-entry-page";

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

type PlaygroundComponentType =
  | "history"
  | "ask"
  | "settings"
  | "datasets"
  | "insights";

function getPlaygroundComponent(type: PlaygroundComponentType) {
  switch (type) {
    case "history":
      return <PlaygroundHistory />;
    case "datasets":
      return <PlaygroundDatasets />;
    case "ask":
      return <PlaygroundAsk />;
    case "insights":
      return <PlaygroundInsights />;
    case "settings":
      // Placeholder for future settings component
      return (
        <div className="text-muted-foreground">
          Settings component coming soon...
        </div>
      );
    default:
      return <div className="text-muted-foreground">Component not found</div>;
  }
}

type PlaygroundLayoutProps = {
  breadcrumbs: BreadcrumbItemData[];
  componentType: PlaygroundComponentType;
};

export function PlaygroundLayout({
  breadcrumbs,
  componentType,
}: PlaygroundLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
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
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href}>
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
          <div className="min-h-[90vh] flex-1 rounded-xl p-6 md:min-h-min bg-gradient-to-b from-secondary/30 via-background to-background border border-primary/10 shadow-xl shadow-primary/5">
            {getPlaygroundComponent(componentType)}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
