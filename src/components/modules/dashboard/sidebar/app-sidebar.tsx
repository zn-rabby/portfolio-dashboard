"use client";

import * as React from "react";
import {
  MessageCircle,
  PlusCircle,
  Folder,
  LayoutDashboard,
  Settings,
  User,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
    isActive: false,
  },
  {
    title: "Create Project",
    url: "/projects/create",
    icon: PlusCircle,
    isActive: false,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
    isActive: false,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    isActive: false,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r",
        "bg-white shadow-sm transition-all duration-300 ease-in-out",
        "dark:border-gray-800 dark:bg-gray-900"
      )}
      {...props}
    >
      <SidebarHeader className="p-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "w-full bg-gradient-to-r from-[#38C7B0] to-[#2DA897]",
                "text-white hover:from-[#2DA897] hover:to-[#38C7B0]",
                "transition-all duration-300"
              )}
              asChild
            >
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-white/20 p-1.5">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="grid flex-1 text-left">
                    <h2 className="font-bold text-lg">Rabby</h2>
                    <span className="text-xs font-light opacity-90">
                      Dashboard
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-2 overflow-y-auto">
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
