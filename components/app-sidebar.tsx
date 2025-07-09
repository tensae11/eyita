"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartSplineIcon,
  Clapperboard,
  LayoutDashboardIcon,
  MegaphoneIcon,
  TvMinimalPlayIcon,
  Hash,
} from "lucide-react";
import { NavMain } from "./app-nav-menu";
import { NavUser } from "./app-nav-user";
import { UserProps } from "@/lib/interface";
import { useRouter } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Video Management",
      url: "/admin/video",
      icon: TvMinimalPlayIcon,
    },
    {
      title: "Category Management",
      url: "/admin/category",
      icon: ChartSplineIcon,
    },
    {
      title: "Tags Management",
      url: "/admin/tags",
      icon: Hash,
    },
    {
      title: "Advertisement Management",
      url: "/admin/ads",
      icon: MegaphoneIcon,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: { user: UserProps } & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Clapperboard className="!size-5" />
                <span className="text-base font-semibold">Movie Stream</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
