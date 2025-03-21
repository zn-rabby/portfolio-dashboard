"use client";

import * as React from "react";
import {
  MessageCircle, // For Contact SMS
  PlusCircle,    // For Create Project
  Folder,        // For Projects
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

const data = {
  navMain: [
    {
      title: "Contact SMS",
      url: "/contact",
      icon: MessageCircle, // Appropriate icon for Contact SMS
      isActive: true,
    },
    {
      title: "Create Project",
      url: "/projects/create-project",
      icon: PlusCircle, // Appropriate icon for Create Project
      isActive: true,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder, // Appropriate icon for Projects
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">Rabby</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}