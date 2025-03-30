"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Settings,
  User,
  Home,
  PlusSquare,
  MessageSquareText,
  FolderKanban,
  BookMarked,
  BookPlus,
  Wrench,
  Plus,
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
    icon: LayoutDashboard, // Perfect for overview
    isActive: true,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User, // Standard for user profile
    isActive: false,
  },
  {
    title: "Manage SMS",
    url: "/messages",
    icon: MessageSquareText, // More specific than MessageCircle
    isActive: false,
  },
  {
    title: "Manage Projects",
    url: "/projects",
    icon: FolderKanban, // Better for project management
    isActive: false,
  },
  {
    title: "Create Project",
    url: "/projects/create-project",
    icon: PlusSquare, // Good for creation actions
    isActive: false,
  },
  {
    title: "Manage Blogs",
    url: "/blogs",
    icon: BookMarked, // Better for blog management
    isActive: false,
  },
  {
    title: "Create Blog",
    url: "/blogs/create-blog",
    icon: BookPlus, // Specifically for adding blog posts
    isActive: false,
  },
  {
    title: "Manage Skills",
    url: "/skill",
    icon: Wrench, // Represents skills/tools
    isActive: false,
  },
  {
    title: "Create Skill",
    url: "/skill/create-skill",
    icon: Plus, // Simple for creation
    isActive: false,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings, // Standard for settings
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
                    <span className="text-sm font-light opacity-90">
                      Dashboard
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-2 overflow-y-auto text-lg">
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
