"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useOrgSelection } from "@/hooks/use-org-selection";
import { useAuthContext } from "@/context/auth-context";
import { useOrganizations } from "@/hooks/use-organizations";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { switchOrganization } = useOrgSelection();
  const { email, organizationId, logout, plan } = useAuthContext();
  const { orgs, loading } = useOrganizations();

  const currentOrg = orgs.find((o) => o.is_current);
  const organizationName = currentOrg?.name ?? "Organization";
  const organizationRole = currentOrg?.role ?? "Member";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg border border-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
                  {organizationName?.charAt(0).toUpperCase() || "O"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                {/* Organization Name as the main label */}
                <span className="truncate font-semibold text-foreground uppercase tracking-tight">
                  {organizationName}
                </span>

                {/* Email and Role combined in a secondary line */}
                <div className="flex items-center gap-1.5 truncate">
                  <span className="truncate text-xs text-muted-foreground max-w-[100px]">
                    {email}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase tracking-wider border border-border">
                    {organizationRole}
                  </span>
                </div>
              </div>

              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
                    {organizationName?.charAt(0).toUpperCase() || "O"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {organizationName}
                  </span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {plan === "starter" && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            {orgs.length > 1 && (
              <>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Switch organization
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                  {orgs.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      disabled={org.id === organizationId}
                      onClick={() => switchOrganization(org.id)}
                      className="flex items-center justify-between"
                    >
                      <span className="truncate">{org.name}</span>

                      {org.is_current && (
                        <span className="text-xs text-primary font-semibold">
                          Current
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
