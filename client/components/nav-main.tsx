"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | undefined; // Added ? here too just in case
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      subIcon?: LucideIcon | undefined; // Change this: add the '?' to make it optional
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Is parent or any child active
          const isParentActive = pathname === item.url;
          const isChildActive = item.items?.some((sub) => pathname === sub.url);
          const isOpen = isParentActive || isChildActive;

          return (
            <Collapsible key={item.title} asChild defaultOpen={isOpen}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "transition-colors",
                    isOpen
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  <a href={item.url}>
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "size-4",
                          isOpen ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    )}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "relative transition-all duration-200",
                                  isSubActive
                                    ? "bg-primary/5 text-primary font-bold shadow-[inset_1px_0_0_rgba(var(--primary))]"
                                    : "text-muted-foreground hover:text-foreground",
                                )}
                              >
                                <a href={subItem.url}>
                                  {subItem.subIcon ? (
                                    <subItem.subIcon
                                      className={cn(
                                        "size-4 transition-transform duration-200 group-hover/menu-button:scale-110",
                                        isSubActive
                                          ? "text-primary"
                                          : "text-muted-foreground",
                                      )}
                                    />
                                  ) : null}
                                  <span>{subItem.title}</span>
                                  {/* Active Indicator Line */}
                                  {isSubActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                                  )}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
