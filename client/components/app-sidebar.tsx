"use client";

import type * as React from "react";
import {
  BookOpen,
  Compass,
  Database,
  Frame,
  Gauge,
  Globe,
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
  Sliders,
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
import { cn } from "@/lib/utils";

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
          title: "Ask",
          url: "/playground/ask",
          subIcon: Sparkles,
        },
        {
          title: "Insights",
          url: "/playground/insights",
          subIcon: Star,
        },
        {
          title: "Datasets",
          url: "/playground/datasets",
          subIcon: Database,
        },
        {
          title: "Settings",
          url: "/playground/settings",
          subIcon: Settings,
        },
        {
          title: "Runs & History",
          url: "/playground/history",
          subIcon: History,
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
          subIcon: Sliders,
        },
        {
          title: "Team",
          url: "/settings/team",
          subIcon: UsersRound,
        },
        {
          title: "Billing",
          url: "/settings/billing",
          subIcon: ReceiptText,
        },
        {
          title: "Limits",
          url: "/settings/limits",
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
              <a
                href="/dashboard"
                className="flex items-center group select-none"
              >
                {/* The Beacon Container - Matching Landing Page Scale */}
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all duration-300 group-hover:shadow-primary/50 group-hover:-rotate-6">
                    <Sparkles className="h-5 w-5 text-primary-foreground transition-transform duration-500 group-hover:rotate-12" />
                  </div>

                  {/* The Unified Live Indicator */}
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    {plan !== "starter" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                    )}
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border-2 border-sidebar"></span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-start justify-center min-w-0 ml-3">
                  {/* Primary Brand Name */}
                  <span className="truncate w-full font-black text-sm tracking-tighter text-foreground leading-none">
                    LIGHTHOUSE
                  </span>

                  {/* Dynamic Plan Indicator Area */}
                  <div className="mt-1.5 flex flex-col items-start gap-1">
                    {/* Plan Badge - Your Existing Logic */}
                    <div
                      className={cn(
                        "flex items-center gap-1.5 py-0.5 px-1.5 rounded-md transition-all duration-200 mt-0.5",
                        currentPlan.glow,
                      )}
                    >
                      <div
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-wider flex items-center gap-1",
                          currentPlan.textColor,
                        )}
                      >
                        {currentPlan.icon}
                        <span>{currentPlan.label}</span>
                      </div>
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

