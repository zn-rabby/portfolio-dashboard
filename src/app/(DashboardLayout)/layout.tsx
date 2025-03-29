"use client";

import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 z-40 h-full w-64 bg-white dark:bg-gray-900 transition-transform transform md:translate-x-0 -translate-x-full md:block">
          <AppSidebar />
        </div>

        {/* Main Content Area */}
        <SidebarInset className="relative flex flex-1 flex-col transition-all duration-300 ease-in-out md:ml-64">
          {/* Sticky Header */}
          <header className="sticky top-0 z-20 flex h-16 w-full items-center border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all dark:border-gray-800 dark:bg-gray-900/80">
            <div className="flex w-full items-center gap-4 px-4 md:px-6">
              <SidebarTrigger
                className={cn(
                  "-ml-2 flex h-9 w-9 items-center justify-center rounded-md md:hidden",
                  "hover:bg-gray-100 hover:text-gray-900",
                  "dark:hover:bg-gray-800 dark:hover:text-gray-50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </SidebarTrigger>

              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Dashboard
                </h1>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                {/* Add your header actions here */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative w-full overflow-y-auto px-2 py-3 md:px-3">
            <div className="mx-auto w-full max-w-[1800px]">
              <div className="rounded border border-gray-100 bg-white  dark:border-gray-800 dark:bg-gray-950 p-3">
                {children}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
