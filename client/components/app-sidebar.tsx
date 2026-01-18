"use client";

import type * as React from "react";
import {
  AlertTriangleIcon,
  BookOpen,
  Bot,
  Command,
  Compass,
  Frame,
  Gauge,
  History,
  LibraryBig,
  LifeBuoy,
  Map,
  Newspaper,
  PieChart,
  Plug,
  ReceiptText,
  ScrollText,
  Send,
  Settings,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  SquareTerminal,
  Star,
  TableOfContents,
  UsersRound,
  Webhook,
  Zap,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/auth-context";
import TrialBanner from "@/components/billing/trial-banner";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Chat",
          url: "/playground/chat",
          subIcon: Sparkles,
        },
        {
          title: "History",
          url: "/playground/history",
          subIcon: History,
        },
        {
          title: "Starred",
          url: "/playground/starred",
          subIcon: Star,
        },
        {
          title: "Settings",
          url: "/playground/settings",
          subIcon: Settings,
        },
      ],
    },
    {
      title: "Data Sources",
      url: "#",
      icon: Plug,
      items: [
        {
          title: "Shopify",
          url: "/sources/shopify",
          subIcon: ShoppingBag,
        },
        {
          title: "WooCommerce",
          url: "/sources/woocommerce",
          subIcon: ShoppingBasket,
        },
        {
          title: "Custom API",
          url: "/sources/custom",
          subIcon: Compass,
        },
        {
          title: "Webhooks",
          url: "/sources/webhooks",
          subIcon: Webhook,
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
          subIcon: TableOfContents,
        },
        {
          title: "Get Started",
          url: "#",
          subIcon: Newspaper,
        },
        {
          title: "Tutorials",
          url: "#",
          subIcon: LibraryBig,
        },
        {
          title: "Changelog",
          url: "#",
          subIcon: ScrollText,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
          subIcon: Settings,
        },
        {
          title: "Team",
          url: "#",
          subIcon: UsersRound,
        },
        {
          title: "Billing",
          url: "/settings/billing/",
          subIcon: ReceiptText,
        },
        {
          title: "Limits",
          url: "/settings/limits/",
          subIcon: Gauge,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const planConfig = {
  starter: {
    label: "Starter",
    textColor: "text-muted-foreground",
    icon: <Star className="h-2.5 w-2.5" />,
    dotColor: "bg-slate-400",
    glow: "group-hover:bg-slate-500/5",
  },
  pro: {
    label: "Pro",
    textColor: "text-primary font-bold",
    icon: <Zap className="h-2.5 w-2.5 fill-current" />,
    dotColor: "bg-primary",
    glow: "bg-primary/5 group-hover:bg-primary/10",
  },
  enterprise: {
    label: "Enterprise",
    textColor: "text-indigo-500 font-bold",
    icon: <ShieldCheck className="h-2.5 w-2.5 fill-current" />,
    dotColor: "bg-indigo-500",
    glow: "bg-indigo-500/5 group-hover:bg-indigo-500/10",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { plan, trialEndsAt, trialActive } = useAuthContext();
  const currentPlan = planConfig[plan!] || planConfig.starter;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Sparkles className="size-4" />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center min-w-0 ml-3">
                  <span className="truncate w-full font-bold text-sm tracking-tight text-foreground leading-none mb-1.5">
                    LightHouse Inc
                  </span>

                  {/* Plan Indicator - Flush Left Alignment */}
                  <div
                    className={`group flex items-center gap-2 py-0.5 px-2 rounded-md transition-all duration-200 ${currentPlan.glow}`}
                  >
                    {/* Status Dot aligned with start of text */}
                    <div className="relative flex h-2 w-2 items-center justify-center">
                      {plan !== "starter" && (
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-20 ${currentPlan.dotColor}`}
                        ></span>
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-1.5 w-1.5 ${currentPlan.dotColor}`}
                      ></span>
                    </div>

                    <div
                      className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.08em] ${currentPlan.textColor}`}
                    >
                      {currentPlan.icon}
                      <span>{currentPlan.label}</span>
                    </div>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {plan === "starter" && trialActive && (
          <TrialBanner trialEndsAt={trialEndsAt} />
        )}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
