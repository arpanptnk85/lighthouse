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
import React from "react";
import CustomAPIPage from "./custom-api";

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

type SourcesComponentType = "shopify" | "woocommerce" | "custom" | "webhook";

function getSourcesComponent(type: SourcesComponentType) {
  switch (type) {
    case "shopify":
      return (
        <div className="text-muted-foreground">
          Starred component coming soon...
        </div>
      );
    case "woocommerce":
      // Placeholder for future starred component
      return (
        <div className="text-muted-foreground">
          Starred component coming soon...
        </div>
      );
    case "custom":
      // Placeholder for future settings component
      return <CustomAPIPage />
    case "webhook":
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

type SourcesLayoutProps = {
  breadcrumbs: BreadcrumbItemData[];
  componentType: SourcesComponentType;
};

export function SourcesLayout({
  breadcrumbs,
  componentType,
}: SourcesLayoutProps) {
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
          <div className="min-h-[100vh] flex-1 rounded-xl p-6 md:min-h-min bg-gradient-to-b from-secondary/30 via-background to-background border border-primary/10 shadow-xl shadow-primary/5">
            {getSourcesComponent(componentType)}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
