"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Navbar from "@/app/Components/Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = ["/ceo-dashboard", "/employee-dashboard", "/managers-dashboard"].includes(pathname);

  return (
    <SidebarProvider>
      {isDashboard && <AppSidebar />}
      <main>
        {!isDashboard && <Navbar />}
        {isDashboard && <SidebarTrigger />}
        {children}
      </main>
    </SidebarProvider>
  );
}